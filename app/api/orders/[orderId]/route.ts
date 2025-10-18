import { NextRequest, NextResponse } from "next/server"
import { sql } from "@vercel/postgres"

// GET - Obtener una orden específica por ID
export async function GET(
  request: NextRequest,
  { params }: { params: { orderId: string } }
) {
  try {
    const orderId = params.orderId

    console.log(`📦 Buscando orden: ${orderId}`)

    const result = await sql`
      SELECT * FROM orders
      WHERE order_id = ${orderId}
      LIMIT 1
    `

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: "Orden no encontrada" },
        { status: 404 }
      )
    }

    const order = result.rows[0]

    console.log(`✅ Orden encontrada: ${orderId}`)

    return NextResponse.json({
      success: true,
      order: order
    })

  } catch (error) {
    console.error("❌ Error obteniendo orden:", error)
    return NextResponse.json(
      { error: "Error al obtener la orden" },
      { status: 500 }
    )
  }
}