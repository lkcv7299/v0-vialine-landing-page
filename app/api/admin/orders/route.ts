import { NextRequest, NextResponse } from "next/server"
import { sql } from "@vercel/postgres"

// GET - Obtener todas las órdenes
export async function GET() {
  try {
    const result = await sql`
      SELECT 
        id,
        order_id,
        customer_first_name,
        customer_last_name,
        customer_email,
        customer_phone,
        total,
        status,
        payment_method,
        created_at
      FROM orders
      ORDER BY created_at DESC
    `

    return NextResponse.json({
      success: true,
      orders: result.rows
    })

  } catch (error) {
    console.error("Error obteniendo órdenes:", error)
    return NextResponse.json(
      { error: "Error obteniendo órdenes" },
      { status: 500 }
    )
  }
}

// PATCH - Actualizar estado de orden
export async function PATCH(request: NextRequest) {
  try {
    const { orderId, status } = await request.json()

    if (!orderId || !status) {
      return NextResponse.json(
        { error: "Datos incompletos" },
        { status: 400 }
      )
    }

    await sql`
      UPDATE orders
      SET 
        status = ${status},
        updated_at = CURRENT_TIMESTAMP
      WHERE order_id = ${orderId}
    `

    return NextResponse.json({
      success: true,
      message: "Estado actualizado"
    })

  } catch (error) {
    console.error("Error actualizando estado:", error)
    return NextResponse.json(
      { error: "Error actualizando estado" },
      { status: 500 }
    )
  }
}