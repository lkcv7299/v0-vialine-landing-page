import { NextRequest, NextResponse } from "next/server"
import { sql } from "@vercel/postgres"

export async function GET(
  request: NextRequest,
  { params }: { params: { orderId: string } }
) {
  try {
    const orderId = params.orderId

    // Obtener orden principal
    const orderResult = await sql`
      SELECT *
      FROM orders
      WHERE order_id = ${orderId}
    `

    if (orderResult.rows.length === 0) {
      return NextResponse.json(
        { error: "Orden no encontrada" },
        { status: 404 }
      )
    }

    const order = orderResult.rows[0]

    // Obtener items de la orden
    const itemsResult = await sql`
      SELECT *
      FROM order_items
      WHERE order_id = ${orderId}
    `

    // Combinar datos
    const orderWithItems = {
      ...order,
      items: itemsResult.rows
    }

    return NextResponse.json({
      success: true,
      order: orderWithItems
    })

  } catch (error) {
    console.error("Error obteniendo detalle de orden:", error)
    return NextResponse.json(
      { error: "Error obteniendo detalle" },
      { status: 500 }
    )
  }
}