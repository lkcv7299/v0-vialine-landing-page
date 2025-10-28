import { NextRequest, NextResponse } from "next/server"
import { sql } from "@vercel/postgres"
import { sendAdminNotification, sendCustomerConfirmation } from "@/lib/order-notifications"

// ====================================
// TIPOS
// ====================================
type CheckoutRequest = {
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
    postalCode: string
    reference: string
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
  paymentMethod: "culqi" | "yape" | "contraentrega"
  notes: string
}

// ====================================
// FUNCIÓN AUXILIAR: Generar Order ID
// ====================================
function generateOrderId(): string {
  const timestamp = Date.now()
  const random = Math.floor(Math.random() * 10000)
  return `VL${timestamp}${random}`
}

// ====================================
// FUNCIÓN AUXILIAR: Guardar en BD
// ====================================
async function saveOrderToDatabase(orderData: CheckoutRequest & { orderId: string; createdAt: string; status: string }) {
  try {
    // ✅ FIXED: Solo log en desarrollo
    if (process.env.NODE_ENV === 'development') {
      console.log(`💾 Guardando orden ${orderData.orderId} en base de datos...`)
    }

    // Insertar orden principal
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
        status,
        created_at
      ) VALUES (
        ${orderData.orderId},
        ${orderData.customer.firstName},
        ${orderData.customer.lastName},
        ${orderData.customer.email},
        ${orderData.customer.phone},
        ${orderData.shippingAddress.address},
        ${orderData.shippingAddress.district},
        ${orderData.shippingAddress.city},
        ${orderData.shippingAddress.postalCode},
        ${orderData.shippingAddress.reference},
        ${orderData.subtotal},
        ${orderData.shippingCost},
        ${orderData.total},
        ${orderData.paymentMethod},
        ${orderData.notes},
        ${orderData.status},
        ${orderData.createdAt}
      )
    `

    // Insertar items de la orden en tabla separada
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

    // ✅ FIXED: Solo log en desarrollo
    if (process.env.NODE_ENV === 'development') {
      console.log(`✅ Orden ${orderData.orderId} guardada exitosamente`)
    }
  } catch (error) {
    console.error(`❌ Error guardando orden ${orderData.orderId}:`, error)
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
      status: "pending_payment",
      createdAt: new Date().toISOString(),
    }

    // ✅ FIXED: Solo log en desarrollo
    if (process.env.NODE_ENV === 'development') {
      console.log(`🆕 Creando nueva orden: ${orderId}`)
    }

    // Guardar en base de datos
    await saveOrderToDatabase(orderData)

    // ====================================
    // 📧 SOLO EMAIL AL ADMIN (Nueva orden pendiente)
    // ====================================
    // ✅ FIXED: Solo log en desarrollo
    if (process.env.NODE_ENV === 'development') {
      console.log(`📧 Enviando notificación al admin...`)
    }
    
    const emailData = {
      orderId: orderData.orderId,
      customer: orderData.customer,
      shippingAddress: orderData.shippingAddress,
      items: orderData.items.map(item => ({
        productTitle: item.productTitle,
        productPrice: item.productPrice,
        quantity: item.quantity,
        selectedColor: item.selectedColor,
        selectedSize: item.selectedSize,
      })),
      subtotal: orderData.subtotal,
      shippingCost: orderData.shippingCost,
      total: orderData.total,
      paymentMethod: orderData.paymentMethod,
      notes: orderData.notes,
      createdAt: orderData.createdAt,
    }

    // ✅ Solo enviar email al admin (orden pendiente)
    sendAdminNotification(emailData)
      .then(success => {
        if (success) {
          console.log(`✅ Email al admin enviado - Orden ${orderId}`)
        } else {
          console.log(`⚠️ No se pudo enviar email al admin - Orden ${orderId}`)
        }
      })
      .catch(err => console.error(`❌ Error email admin:`, err))

    // ❌ NO enviar email al cliente todavía (esperar confirmación de pago)

    // Retornar respuesta inmediata
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
// PATCH - ACTUALIZAR ORDEN (Después del pago)
// ====================================
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json()
    const { orderId, paymentId, status } = body

    if (!orderId) {
      return NextResponse.json(
        { error: "orderId es requerido" },
        { status: 400 }
      )
    }

    // ✅ FIXED: Solo log en desarrollo
    if (process.env.NODE_ENV === 'development') {
      console.log(`🔄 Actualizando orden ${orderId}...`)
    }

    // Obtener datos de la orden para enviar email
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

    // Obtener items de la orden
    const itemsResult = await sql`
      SELECT * FROM order_items
      WHERE order_id = ${orderId}
    `

    // Actualizar estado en BD
    await sql`
      UPDATE orders
      SET 
        payment_id = ${paymentId || null},
        payment_status = ${status || 'paid'},
        status = ${status === 'paid' ? 'paid' : 'pending'},
        updated_at = CURRENT_TIMESTAMP
      WHERE order_id = ${orderId}
    `

    // ✅ FIXED: Solo log en desarrollo
    if (process.env.NODE_ENV === 'development') {
      console.log(`✅ Orden ${orderId} actualizada a status: ${status || 'paid'}`)
    }

    // ====================================
    // 📧 ENVIAR EMAIL AL CLIENTE (Pago confirmado)
    // ====================================
    if (status === 'paid' || !status) {
      // ✅ FIXED: Solo log en desarrollo
      if (process.env.NODE_ENV === 'development') {
        console.log(`📧 Enviando confirmación al cliente...`)
      }
      
      const emailData = {
        orderId: order.order_id,
        customer: {
          firstName: order.customer_first_name,
          lastName: order.customer_last_name,
          email: order.customer_email,
          phone: order.customer_phone
        },
        shippingAddress: {
          address: order.shipping_address,
          district: order.shipping_district,
          city: order.shipping_city,
          postalCode: order.shipping_postal_code,
          reference: order.shipping_reference
        },
        items: itemsResult.rows.map((item: any) => ({
          productTitle: item.product_title,
          productPrice: parseFloat(item.product_price),
          quantity: item.quantity,
          selectedColor: item.selected_color,
          selectedSize: item.selected_size
        })),
        subtotal: parseFloat(order.subtotal),
        shippingCost: parseFloat(order.shipping_cost),
        total: parseFloat(order.total),
        paymentMethod: order.payment_method,
        notes: order.notes,
        createdAt: order.created_at
      }

      // ✅ Ahora SÍ enviar email al cliente (pago confirmado)
      sendCustomerConfirmation(emailData)
        .then(success => {
          if (success) {
            console.log(`✅ Email de confirmación enviado al cliente - Orden ${orderId}`)
          } else {
            console.log(`⚠️ No se pudo enviar email al cliente - Orden ${orderId}`)
          }
        })
        .catch(err => console.error(`❌ Error email cliente:`, err))
    }

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