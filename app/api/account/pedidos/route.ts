import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { sql } from "@vercel/postgres"

/**
 * GET /api/account/pedidos
 * 
 * Obtiene todas las órdenes del usuario autenticado con sus items
 * 
 * Query params opcionales:
 * - limit: Número de órdenes a retornar (default: 50, max: 100)
 * - offset: Para paginación (default: 0)
 * - status: Filtrar por estado (opcional)
 * 
 * @returns {object} { success: true, orders: Order[], pagination: {...} }
 */
export async function GET(request: Request) {
  try {
    // ====================================
    // PASO 1: VALIDAR SESIÓN
    // ====================================
    const session = await auth()

    if (!session || !session.user?.email) {
      return NextResponse.json(
        { error: "No autenticado" },
        { status: 401 }
      )
    }

    // ====================================
    // PASO 2: OBTENER USER_ID
    // ====================================
    const userResult = await sql`
      SELECT id FROM users 
      WHERE email = ${session.user.email}
      LIMIT 1
    `

    if (userResult.rows.length === 0) {
      return NextResponse.json(
        { error: "Usuario no encontrado" },
        { status: 404 }
      )
    }

    const userId = userResult.rows[0].id

    // ====================================
    // PASO 3: PARSEAR QUERY PARAMS
    // ====================================
    const { searchParams } = new URL(request.url)
    
    // Validar y limitar el límite
    let limit = parseInt(searchParams.get("limit") || "50")
    if (limit < 1) limit = 50
    if (limit > 100) limit = 100
    
    const offset = parseInt(searchParams.get("offset") || "0")
    const statusFilter = searchParams.get("status") // opcional

    // ====================================
    // PASO 4: CONTAR TOTAL DE ÓRDENES
    // ====================================
    let countQuery
    
    if (statusFilter) {
      countQuery = sql`
        SELECT COUNT(*) as total
        FROM orders
        WHERE user_id = ${userId} AND status = ${statusFilter}
      `
    } else {
      countQuery = sql`
        SELECT COUNT(*) as total
        FROM orders
        WHERE user_id = ${userId}
      `
    }

    const countResult = await countQuery
    const total = parseInt(countResult.rows[0].total) || 0

    // ====================================
    // PASO 5: OBTENER ÓRDENES
    // ====================================
    let ordersQuery
    
    if (statusFilter) {
      ordersQuery = sql`
        SELECT 
          id,
          order_number,
          user_id,
          customer_email,
          customer_name,
          customer_lastname,
          customer_phone,
          shipping_address,
          shipping_district,
          shipping_city,
          shipping_postal_code,
          shipping_reference,
          payment_method,
          subtotal,
          shipping_cost,
          total,
          status,
          culqi_charge_id,
          culqi_payment_code,
          notes,
          created_at,
          updated_at
        FROM orders
        WHERE user_id = ${userId} AND status = ${statusFilter}
        ORDER BY created_at DESC
        LIMIT ${limit}
        OFFSET ${offset}
      `
    } else {
      ordersQuery = sql`
        SELECT 
          id,
          order_number,
          user_id,
          customer_email,
          customer_name,
          customer_lastname,
          customer_phone,
          shipping_address,
          shipping_district,
          shipping_city,
          shipping_postal_code,
          shipping_reference,
          payment_method,
          subtotal,
          shipping_cost,
          total,
          status,
          culqi_charge_id,
          culqi_payment_code,
          notes,
          created_at,
          updated_at
        FROM orders
        WHERE user_id = ${userId}
        ORDER BY created_at DESC
        LIMIT ${limit}
        OFFSET ${offset}
      `
    }

    const ordersResult = await ordersQuery

    // ====================================
    // PASO 6: OBTENER ITEMS DE CADA ORDEN
    // ====================================
    const ordersWithItems = await Promise.all(
      ordersResult.rows.map(async (order) => {
        const itemsResult = await sql`
          SELECT 
            id,
            order_id,
            product_id,
            product_name,
            product_slug,
            product_image,
            variant_color,
            variant_size,
            quantity,
            unit_price,
            total_price
          FROM order_items
          WHERE order_id = ${order.id}
          ORDER BY id ASC
        `

        return {
          ...order,
          items: itemsResult.rows,
        }
      })
    )

    // ====================================
    // PASO 7: RETORNAR ÓRDENES CON PAGINACIÓN
    // ====================================
    return NextResponse.json({
      success: true,
      orders: ordersWithItems,
      pagination: {
        total,
        limit,
        offset,
        hasMore: offset + limit < total,
        currentPage: Math.floor(offset / limit) + 1,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("❌ Error en GET /api/account/pedidos:", error)
    
    return NextResponse.json(
      { 
        error: "Error al obtener pedidos",
        details: process.env.NODE_ENV === "development" ? String(error) : undefined
      },
      { status: 500 }
    )
  }
}