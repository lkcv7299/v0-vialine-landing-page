import { NextRequest, NextResponse } from "next/server"
import { sql } from "@vercel/postgres"

// ====================================
// TYPES
// ====================================
interface CheckoutRequest {
  customer: {
    firstName: string
    lastName: string
    email: string
    phone: string
  }
  shippingAddress: {
    address: string
    district: string
    city: string
    postalCode?: string
    reference?: string
  }
  items: Array<{
    productSlug: string
    productTitle: string
    productPrice: number
    productImage: string
    quantity: number
    selectedColor: string
    selectedSize: string
  }>
  subtotal: number
  shippingCost: number
  total: number
  paymentMethod: string
  notes?: string
}

// ====================================
// GENERAR ORDER ID
// ====================================
function generateOrderId(): string {
  const timestamp = Date.now().toString()
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0')
  return `VL${timestamp}${random}`
}

// ====================================
// GUARDAR EN BASE DE DATOS
// ====================================
async function saveOrderToDatabase(orderData: any) {
  try {
    console.log(`💾 Guardando orden ${orderData.orderId} en base de datos...`)

    // 1. Insertar orden principal
    await sql`
      INSERT INTO orders (
        order_id,
        customer_first_name,
        customer_last_name,
        customer_email,
        customer_phone,
        shipping_address,
        shipping_district,
        shipping_city,
        shipping_postal_code,
        shipping_reference,
        subtotal,
        shipping_cost,
        total,
        payment_method,
        notes,
        status
      ) VALUES (
        ${orderData.orderId},
        ${orderData.customer.firstName},
        ${orderData.customer.lastName},
        ${orderData.customer.email},
        ${orderData.customer.phone},
        ${orderData.shippingAddress.address},
        ${orderData.shippingAddress.district},
        ${orderData.shippingAddress.city},
        ${orderData.shippingAddress.postalCode || null},
        ${orderData.shippingAddress.reference || null},
        ${orderData.subtotal},
        ${orderData.shippingCost},
        ${orderData.total},
        ${orderData.paymentMethod},
        ${orderData.notes || null},
        ${orderData.status}
      )
    `

    // 2. Insertar items de la orden
    for (const item of orderData.items) {
      await sql`
        INSERT INTO order_items (
          order_id,
          product_slug,
          product_title,
          product_price,
          product_image,
          selected_color,
          selected_size,
          quantity,
          item_total
        ) VALUES (
          ${orderData.orderId},
          ${item.productSlug},
          ${item.productTitle},
          ${item.productPrice},
          ${item.productImage},
          ${item.selectedColor},
          ${item.selectedSize},
          ${item.quantity},
          ${item.productPrice * item.quantity}
        )
      `
    }

    console.log(`✅ Orden ${orderData.orderId} guardada exitosamente`)
    return true
  } catch (error) {
    console.error("❌ Error guardando orden en base de datos:", error)
    throw error
  }
}

// ====================================
// POST - CREAR ORDEN
// ====================================
export async function POST(request: NextRequest) {
  try {
    const body: CheckoutRequest = await request.json()

    // Validar datos requeridos
    if (!body.customer || !body.items || body.items.length === 0) {
      return NextResponse.json(
        { error: "Datos incompletos" },
        { status: 400 }
      )
    }

    // Generar ID único para la orden
    const orderId = generateOrderId()
    
    // Preparar datos de la orden
    const orderData = {
      ...body,
      orderId,
      status: "pending_payment", // Estado inicial
      createdAt: new Date().toISOString(),
    }

    console.log(`🆕 Creando nueva orden: ${orderId}`)

    // Guardar en base de datos
    await saveOrderToDatabase(orderData)

    // Retornar respuesta exitosa
    return NextResponse.json({
      success: true,
      orderId: orderId,
      message: "Orden creada exitosamente"
    })

  } catch (error) {
    console.error("❌ Error en POST /api/checkout:", error)
    return NextResponse.json(
      { error: "Error al crear la orden" },
      { status: 500 }
    )
  }
}

// ====================================
// PATCH - ACTUALIZAR ORDEN (después del pago)
// ====================================
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json()
    const { orderId, paymentId, status } = body

    // Validar datos requeridos
    if (!orderId) {
      return NextResponse.json(
        { error: "orderId es requerido" },
        { status: 400 }
      )
    }

    console.log(`🔄 Actualizando orden ${orderId}...`)
    console.log(`   - Payment ID: ${paymentId || 'N/A'}`)
    console.log(`   - Nuevo status: ${status || 'N/A'}`)

    // Actualizar orden en base de datos
    await sql`
      UPDATE orders
      SET 
        payment_id = ${paymentId || null},
        payment_status = ${status || 'paid'},
        status = ${status === 'paid' ? 'paid' : 'pending'},
        updated_at = CURRENT_TIMESTAMP
      WHERE order_id = ${orderId}
    `

    console.log(`✅ Orden ${orderId} actualizada exitosamente`)

    return NextResponse.json({
      success: true,
      orderId: orderId,
      message: "Orden actualizada exitosamente"
    })

  } catch (error) {
    console.error("❌ Error en PATCH /api/checkout:", error)
    return NextResponse.json(
      { error: "Error al actualizar la orden" },
      { status: 500 }
    )
  }
}