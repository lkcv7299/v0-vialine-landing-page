import { NextRequest, NextResponse } from "next/server"
import { createServiceClient } from "@/lib/supabase/server"

// GET - Obtener una orden específica por ID CON sus items
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ orderId: string }> }
) {
  try {
    const { orderId } = await params
    const supabase = await createServiceClient()

    console.log(`📦 Buscando orden: ${orderId}`)

    // Obtener orden principal por order_number
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .select('*')
      .eq('order_number', orderId)
      .single()

    if (orderError || !order) {
      return NextResponse.json(
        { error: "Orden no encontrada" },
        { status: 404 }
      )
    }

    // Obtener items de la orden usando el UUID interno
    const { data: itemsData, error: itemsError } = await supabase
      .from('order_items')
      .select('*')
      .eq('order_id', order.id)

    if (itemsError) {
      console.error("Error obteniendo items:", itemsError)
    }

    // Parse customer name into first/last for frontend compatibility
    const nameParts = (order.customer_name || '').trim().split(' ')
    const customerFirstName = nameParts[0] || ''
    const customerLastName = nameParts.slice(1).join(' ') || ''

    // Parse shipping address JSON
    const shippingAddr = order.shipping_address as any || {}

    // Combinar orden con items Y PARSEAR TODOS LOS NÚMEROS
    const orderWithItems = {
      order_id: order.order_number,
      status: order.status,
      customer_first_name: customerFirstName,
      customer_last_name: customerLastName,
      customer_name: order.customer_name,
      customer_email: order.customer_email,
      customer_phone: order.customer_phone,
      shipping_address: shippingAddr.address || '',
      shipping_district: shippingAddr.district || '',
      shipping_city: shippingAddr.city || '',
      shipping_postal_code: shippingAddr.postalCode || '',
      shipping_reference: shippingAddr.reference || '',
      subtotal: order.subtotal,
      shipping_cost: order.shipping_cost,
      total: order.total,
      payment_method: order.payment_method,
      payment_status: order.payment_status,
      notes: order.customer_notes,
      created_at: order.created_at,
      updated_at: order.updated_at,
      items: (itemsData || []).map((item: any) => ({
        productTitle: item.product_title,
        productPrice: item.product_price,
        quantity: item.quantity,
        selectedColor: item.color_name,
        selectedSize: item.size,
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
