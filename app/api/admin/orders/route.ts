import { NextRequest, NextResponse } from "next/server"
import { sql } from "@vercel/postgres"
import { sendOrderStatusEmail } from "@/lib/order-status-email"

// GET - Obtener todas las órdenes
export async function GET(request: NextRequest) {
  try {
    console.log("📦 Consultando todas las órdenes...")

    const result = await sql`
      SELECT * FROM orders
      ORDER BY created_at DESC
    `

    console.log(`✅ Se encontraron ${result.rows.length} órdenes`)

    return NextResponse.json({
      success: true,
      orders: result.rows
    })

  } catch (error) {
    console.error("❌ Error obteniendo órdenes:", error)
    return NextResponse.json(
      { error: "Error al obtener órdenes" },
      { status: 500 }
    )
  }
}

// PATCH - Actualizar estado de una orden
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json()
    const { orderId, status } = body

    if (!orderId || !status) {
      return NextResponse.json(
        { error: "orderId y status son requeridos" },
        { status: 400 }
      )
    }

    console.log(`🔄 Actualizando orden ${orderId} a estado: ${status}`)

    // Primero obtener los datos de la orden para el email
    const orderResult = await sql`
      SELECT 
        order_id,
        customer_first_name,
        customer_last_name,
        customer_email
      FROM orders
      WHERE order_id = ${orderId}
      LIMIT 1
    `

    if (orderResult.rows.length === 0) {
      return NextResponse.json(
        { error: "Orden no encontrada" },
        { status: 404 }
      )
    }

    const order = orderResult.rows[0]

    // Actualizar el estado en la base de datos
    await sql`
      UPDATE orders
      SET 
        status = ${status},
        updated_at = CURRENT_TIMESTAMP
      WHERE order_id = ${orderId}
    `

    console.log(`✅ Estado actualizado - Orden ${orderId}`)

    // Enviar email de notificación al cliente
    const trackingUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'https://vialineperu.com'}/orden/${orderId}`
    
    sendOrderStatusEmail({
      orderId: order.order_id,
      customerName: `${order.customer_first_name} ${order.customer_last_name}`,
      customerEmail: order.customer_email,
      status: status,
      trackingUrl: trackingUrl
    })
      .then(success => {
        if (success) {
          console.log(`✅ Email de actualización enviado - Orden ${orderId}`)
        } else {
          console.log(`⚠️ No se pudo enviar email de actualización - Orden ${orderId}`)
        }
      })
      .catch(err => console.error(`❌ Error enviando email de actualización:`, err))

    return NextResponse.json({
      success: true,
      message: "Estado actualizado exitosamente",
      orderId: orderId,
      newStatus: status
    })

  } catch (error) {
    console.error("❌ Error actualizando estado:", error)
    return NextResponse.json(
      { error: "Error al actualizar el estado" },
      { status: 500 }
    )
  }
}