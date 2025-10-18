import { NextRequest, NextResponse } from "next/server"
import { sql } from "@vercel/postgres"

// GET - Obtener una orden específica por ID CON sus items
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ orderId: string }> }
) {
  try {
    // ✅ Next.js 15: await params antes de usar
    const { orderId } = await params

    console.log(`📦 Buscando orden: ${orderId}`)

    // Obtener orden principal
    const orderResult = await sql`
      SELECT * FROM orders
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

    // Obtener items de la orden desde order_items
    const itemsResult = await sql`
      SELECT * FROM order_items
      WHERE order_id = ${orderId}
    `

    // ✅ Combinar orden con items Y PARSEAR TODOS LOS NÚMEROS
    const orderWithItems = {
      order_id: order.order_id,
      status: order.status,
      customer_first_name: order.customer_first_name,
      customer_last_name: order.customer_last_name,
      customer_email: order.customer_email,
      customer_phone: order.customer_phone,
      shipping_address: order.shipping_address,
      shipping_district: order.shipping_district,
      shipping_city: order.shipping_city,
      shipping_postal_code: order.shipping_postal_code,
      shipping_reference: order.shipping_reference,
      // ✅ PARSEAR NÚMEROS - CRÍTICO
      subtotal: parseFloat(order.subtotal),
      shipping_cost: parseFloat(order.shipping_cost),
      total: parseFloat(order.total),
      payment_method: order.payment_method,
      payment_status: order.payment_status,
      notes: order.notes,
      created_at: order.created_at,
      updated_at: order.updated_at,
      // ✅ Items parseados
      items: itemsResult.rows.map((item: any) => ({
        productTitle: item.product_title,
        productPrice: parseFloat(item.product_price),
        quantity: item.quantity,
        selectedColor: item.selected_color,
        selectedSize: item.selected_size,
        productImage: item.product_image,
        productSlug: item.product_slug
      }))
    }

    console.log(`✅ Orden encontrada: ${orderId}`)

    return NextResponse.json({
      success: true,
      order: orderWithItems
    })

  } catch (error) {
    console.error("❌ Error obteniendo orden:", error)
    return NextResponse.json(
      { error: "Error al obtener la orden" },
      { status: 500 }
    )
  }
}