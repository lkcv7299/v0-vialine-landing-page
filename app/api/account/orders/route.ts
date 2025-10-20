import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { sql } from "@vercel/postgres"

/**
 * GET /api/account/orders
 * Retorna todos los pedidos del usuario autenticado
 */
export async function GET(request: NextRequest) {
  try {
    // Verificar autenticación
    const session = await auth()
    
    if (!session || !session.user?.email) {
      return NextResponse.json(
        { error: "No autorizado" },
        { status: 401 }
      )
    }

    const userEmail = session.user.email

    // Obtener todos los pedidos del usuario ordenados por fecha (más recientes primero)
    const ordersResult = await sql`
      SELECT 
        order_id,
        status,
        payment_status,
        total,
        created_at,
        payment_method
      FROM orders 
      WHERE customer_email = ${userEmail}
      ORDER BY created_at DESC
    `

    // Para cada pedido, contar los items
    const ordersWithItems = await Promise.all(
      ordersResult.rows.map(async (order) => {
        const itemsResult = await sql`
          SELECT COUNT(*) as count, SUM(quantity) as total_items
          FROM order_items 
          WHERE order_id = ${order.order_id}
        `
        
        return {
          id: order.order_id,
          order_number: order.order_id,
          status: order.status,
          payment_status: order.payment_status,
          total: parseFloat(order.total),
          created_at: order.created_at,
          payment_method: order.payment_method,
          items_count: parseInt(itemsResult.rows[0].total_items) || 0,
        }
      })
    )

    return NextResponse.json({
      success: true,
      orders: ordersWithItems
    })

  } catch (error) {
    console.error("Error en /api/account/orders:", error)
    return NextResponse.json(
      { error: "Error al obtener pedidos" },
      { status: 500 }
    )
  }
}