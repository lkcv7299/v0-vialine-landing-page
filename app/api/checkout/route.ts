import { NextRequest, NextResponse } from "next/server"
import { createClient, createServiceClient } from "@/lib/supabase/server"
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
  paymentMethod: "culqi" | "contra_entrega"
  notes: string
}

// ====================================
// FUNCIÓN AUXILIAR: Generar Order ID
// ====================================
function generateOrderId(): string {
  // Formato simplificado: VL-XXXXX (5 caracteres alfanuméricos)
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let id = ''
  for (let i = 0; i < 5; i++) {
    id += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return `VL-${id}`
}

// ====================================
// FUNCIÓN AUXILIAR: Guardar en BD (Supabase)
// ====================================
async function saveOrderToDatabase(orderData: CheckoutRequest & { orderId: string; createdAt: string; status: string; userId?: string }) {
  const supabase = await createServiceClient()

  try {
    if (process.env.NODE_ENV === 'development') {
      console.log(`💾 Guardando orden ${orderData.orderId} en base de datos...`)
    }

    // Insertar orden principal
    const { data: newOrder, error: orderError } = await supabase
      .from('orders')
      .insert({
        order_number: orderData.orderId,
        user_id: orderData.userId || null,
        customer_name: `${orderData.customer.firstName} ${orderData.customer.lastName}`.trim(),
        customer_email: orderData.customer.email,
        customer_phone: orderData.customer.phone,
        shipping_address: {
          address: orderData.shippingAddress.address,
          district: orderData.shippingAddress.district,
          city: orderData.shippingAddress.city,
          postalCode: orderData.shippingAddress.postalCode,
          reference: orderData.shippingAddress.reference
        },
        subtotal: orderData.subtotal,
        shipping_cost: orderData.shippingCost,
        total: orderData.total,
        payment_method: orderData.paymentMethod,
        customer_notes: orderData.notes,
        status: orderData.status,
        created_at: orderData.createdAt
      })
      .select('id')
      .single()

    if (orderError) throw orderError

    // Insertar items de la orden usando el UUID interno
    const orderItems = orderData.items.map(item => ({
      order_id: newOrder.id,
      product_slug: item.productSlug,
      product_title: item.productTitle,
      product_price: item.productPrice,
      product_image: item.productImage,
      color_name: item.selectedColor,
      size: item.selectedSize,
      quantity: item.quantity,
      item_total: item.productPrice * item.quantity
    }))

    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItems)

    if (itemsError) throw itemsError

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

    // ====================================
    // OBTENER USER_ID si está logueado (Supabase Auth)
    // ====================================
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    let userId: string | undefined = undefined

    if (user?.id) {
      userId = user.id
      if (process.env.NODE_ENV === 'development') {
        console.log(`👤 Orden para usuario ID: ${userId}`)
      }
    }

    // Generar ID único para la orden
    const orderId = generateOrderId()

    // Preparar datos de la orden
    const orderData = {
      ...body,
      orderId,
      userId, // ✅ Incluir user_id
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
    // ✅ NO ENVIAR EMAILS AL CREAR LA ORDEN
    // ====================================
    // Los emails se enviarán SOLO cuando el pago se confirme (endpoint PATCH)
    // Evita spam de órdenes que nunca se pagan
    if (process.env.NODE_ENV === 'development') {
      console.log(`⏳ Orden ${orderId} creada - Esperando confirmación de pago`)
    }

    // Retornar respuesta
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

    // Obtener datos de la orden para enviar email (Supabase)
    const supabase = await createServiceClient()

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
    const { data: orderItems, error: itemsError } = await supabase
      .from('order_items')
      .select('*')
      .eq('order_id', order.id)

    if (itemsError) {
      console.error("Error obteniendo items:", itemsError)
    }

    // Actualizar estado en BD
    const { error: updateError } = await supabase
      .from('orders')
      .update({
        payment_id: paymentId || null,
        payment_status: status || 'paid',
        status: status === 'paid' ? 'paid' : 'pending',
        updated_at: new Date().toISOString()
      })
      .eq('id', order.id)

    if (updateError) throw updateError

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
      
      // Parse customer name into first/last for email
      const nameParts = (order.customer_name || '').trim().split(' ')
      const firstName = nameParts[0] || ''
      const lastName = nameParts.slice(1).join(' ') || ''

      // Parse shipping address JSON
      const shippingAddr = order.shipping_address as any || {}

      const emailData = {
        orderId: order.order_number,
        customer: {
          firstName,
          lastName,
          email: order.customer_email,
          phone: order.customer_phone
        },
        shippingAddress: {
          address: shippingAddr.address || '',
          district: shippingAddr.district || '',
          city: shippingAddr.city || '',
          postalCode: shippingAddr.postalCode || '',
          reference: shippingAddr.reference || ''
        },
        items: (orderItems || []).map((item: any) => ({
          productTitle: item.product_title,
          productPrice: item.product_price,
          quantity: item.quantity,
          selectedColor: item.color_name,
          selectedSize: item.size
        })),
        subtotal: order.subtotal,
        shippingCost: order.shipping_cost,
        total: order.total,
        paymentMethod: (order.payment_method || 'contra_entrega') as "culqi" | "contra_entrega",
        notes: order.customer_notes || '',
        createdAt: order.created_at || new Date().toISOString()
      }

      // ✅ Enviar emails de confirmación (pago confirmado)
      // Enviamos con await + delay para evitar problemas de socket
      console.log(`📧 Enviando emails de confirmación para orden ${orderId}...`)

      try {
        // Email al cliente primero
        const clientEmailSent = await sendCustomerConfirmation(emailData)
        if (clientEmailSent) {
          console.log(`✅ Email enviado al cliente - Orden ${orderId}`)
        } else {
          console.warn(`⚠️ Email al cliente falló - Orden ${orderId}`)
        }

        // Esperar 1 segundo antes del siguiente email para evitar sobrecarga
        await new Promise(resolve => setTimeout(resolve, 1000))

        // Email al admin
        const adminEmailSent = await sendAdminNotification({
          ...emailData,
          paymentConfirmed: true
        })
        if (adminEmailSent) {
          console.log(`✅ Email enviado al admin - Orden ${orderId}`)
        } else {
          console.warn(`⚠️ Email al admin falló - Orden ${orderId}`)
        }
      } catch (emailError) {
        console.error(`❌ Error enviando emails de confirmación - Orden ${orderId}:`, emailError)
        // No bloqueamos la respuesta aunque fallen los emails
      }
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