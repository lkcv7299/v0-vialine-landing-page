import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { sql } from "@vercel/postgres"

/**
 * GET /api/account/stats
 * 
 * Obtiene estadísticas del usuario autenticado:
 * - Número de órdenes totales
 * - Número de direcciones guardadas
 * 
 * Wishlist se cuenta del lado del cliente (localStorage)
 * 
 * @returns {object} { success: true, stats: { orders: number, addresses: number } }
 */
export async function GET() {
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
    // PASO 3: CONTAR ÓRDENES Y CALCULAR TOTAL GASTADO
    // ====================================
    const ordersResult = await sql`
      SELECT
        COUNT(*) as total_orders,
        COALESCE(SUM(total), 0) as total_spent
      FROM orders
      WHERE user_id = ${userId}
    `

    const totalOrders = parseInt(ordersResult.rows[0].total_orders) || 0
    const totalSpent = parseFloat(ordersResult.rows[0].total_spent) || 0

    // ====================================
    // PASO 3.5: CONTAR PEDIDOS PENDIENTES
    // ====================================
    const pendingOrdersResult = await sql`
      SELECT COUNT(*) as pending_orders
      FROM orders
      WHERE user_id = ${userId}
        AND status IN ('pending_payment', 'pending')
    `

    const pendingOrders = parseInt(pendingOrdersResult.rows[0].pending_orders) || 0

    // ====================================
    // PASO 4: CONTAR DIRECCIONES DEL USUARIO
    // ====================================
    const addressesResult = await sql`
      SELECT COUNT(*) as total
      FROM user_addresses
      WHERE user_id = ${userId}
    `

    const savedAddresses = parseInt(addressesResult.rows[0].total) || 0

    // ====================================
    // PASO 5: CONTAR ITEMS EN WISHLIST
    // ====================================
    const wishlistResult = await sql`
      SELECT COUNT(*) as total
      FROM wishlist
      WHERE user_id = ${userId}
    `

    const wishlistItems = parseInt(wishlistResult.rows[0].total) || 0

    // ====================================
    // PASO 6: RETORNAR ESTADÍSTICAS
    // ====================================
    return NextResponse.json({
      totalOrders,
      totalSpent,
      savedAddresses,
      wishlistItems,
      pendingOrders,
    })
  } catch (error) {
    console.error("❌ Error en GET /api/account/stats:", error)
    
    return NextResponse.json(
      { 
        error: "Error al obtener estadísticas",
        // Solo mostrar detalles en desarrollo
        details: process.env.NODE_ENV === "development" ? String(error) : undefined
      },
      { status: 500 }
    )
  }
}