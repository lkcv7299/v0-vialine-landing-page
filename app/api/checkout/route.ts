import { NextRequest, NextResponse } from "next/server"

// ====================================
// TYPES (Usando tu estructura actual)
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
  createdAt: string
}

// ====================================
// HELPER FUNCTIONS
// ====================================

// Generar ID único para la orden
function generateOrderId(): string {
  const timestamp = Date.now().toString(36)
  const random = Math.random().toString(36).substring(2, 7)
  return `VL-${timestamp}-${random}`.toUpperCase()
}

// Enviar notificación a WhatsApp (usando la API de WhatsApp Business)
async function sendWhatsAppNotification(orderData: CheckoutRequest & { orderId: string }) {
  // NOTA: Esto requiere configurar WhatsApp Business API
  // Por ahora, solo logueamos
  console.log("📱 Nueva orden para WhatsApp:", orderData.orderId)
  console.log("   Cliente:", orderData.customer.firstName, orderData.customer.lastName)
  console.log("   Total: S/", orderData.total)
  console.log("   Items:", orderData.items.length)
  
  // TODO: Implementar envío real a WhatsApp
  // Ejemplo con Twilio:
  // await fetch('https://api.twilio.com/2010-04-01/Accounts/YOUR_ACCOUNT_SID/Messages.json', {
  //   method: 'POST',
  //   headers: {
  //     'Authorization': 'Basic ' + Buffer.from(`${TWILIO_ACCOUNT_SID}:${TWILIO_AUTH_TOKEN}`).toString('base64'),
  //     'Content-Type': 'application/x-www-form-urlencoded',
  //   },
  //   body: new URLSearchParams({
  //     To: 'whatsapp:+51972327236',
  //     From: 'whatsapp:+YOUR_TWILIO_NUMBER',
  //     Body: `🎉 Nueva orden ${orderData.orderId}\nCliente: ${orderData.customer.firstName}\nTotal: S/ ${orderData.total}`
  //   })
  // })
}

// Enviar email de confirmación al cliente
async function sendConfirmationEmail(orderData: CheckoutRequest & { orderId: string }) {
  // NOTA: Esto requiere configurar SendGrid o Resend
  // Por ahora, solo logueamos
  console.log("📧 Email de confirmación para:", orderData.customer.email)
  console.log("   Orden:", orderData.orderId)
  
  // TODO: Implementar envío real de email
  // Ejemplo con Resend:
  // const { Resend } = await import('resend')
  // const resend = new Resend(process.env.RESEND_API_KEY)
  // 
  // await resend.emails.send({
  //   from: 'Vialine <pedidos@vialine.pe>',
  //   to: orderData.customer.email,
  //   subject: `Confirmación de pedido ${orderData.orderId}`,
  //   html: `
  //     <h1>¡Gracias por tu compra ${orderData.customer.firstName}!</h1>
  //     <p>Tu pedido ${orderData.orderId} ha sido recibido y está siendo procesado.</p>
  //     <h2>Detalles de tu orden:</h2>
  //     <ul>
  //       ${orderData.items.map(item => `
  //         <li>${item.productTitle} - ${item.selectedColor} / ${item.selectedSize} x${item.quantity} - S/ ${item.productPrice}</li>
  //       `).join('')}
  //     </ul>
  //     <p><strong>Total: S/ ${orderData.total}</strong></p>
  //   `
  // })
}

// Guardar orden en base de datos (o archivo JSON por ahora)
async function saveOrder(orderData: CheckoutRequest & { orderId: string }) {
  // NOTA: Esto debería guardar en una base de datos real
  // Por ahora, solo logueamos
  console.log("💾 Guardando orden:", orderData.orderId)
  console.log("   Datos completos:", JSON.stringify(orderData, null, 2))
  
  // TODO: Implementar guardado en base de datos
  // Ejemplo con MongoDB:
  // const { MongoClient } = await import('mongodb')
  // const client = new MongoClient(process.env.MONGODB_URI)
  // await client.connect()
  // const db = client.db('vialine')
  // await db.collection('orders').insertOne(orderData)
  // await client.close()
  
  // O con Prisma:
  // const { PrismaClient } = await import('@prisma/client')
  // const prisma = new PrismaClient()
  // await prisma.order.create({ data: orderData })
}

// Crear pago con Culqi
async function createCulqiPayment(orderData: CheckoutRequest & { orderId: string }) {
  // NOTA: Esto requiere configurar cuenta de Culqi
  // Documentación: https://docs.culqi.com/
  
  const CULQI_SECRET_KEY = process.env.CULQI_SECRET_KEY || ""
  
  if (!CULQI_SECRET_KEY) {
    console.warn("⚠️ CULQI_SECRET_KEY no configurado - usando modo test")
    // Retornar URL de test por ahora
    return {
      paymentUrl: `/checkout/confirmacion?orderId=${orderData.orderId}&test=true`,
    }
  }

  try {
    // Crear order en Culqi
    const response = await fetch("https://api.culqi.com/v2/orders", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${CULQI_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: Math.round(orderData.total * 100), // Convertir a centavos
        currency_code: "PEN",
        description: `Orden Vialine ${orderData.orderId}`,
        order_number: orderData.orderId,
        client_details: {
          first_name: orderData.customer.firstName,
          last_name: orderData.customer.lastName,
          email: orderData.customer.email,
          phone_number: orderData.customer.phone,
        },
        expiration_date: Math.floor(Date.now() / 1000) + 3600, // 1 hora
      }),
    })

    const culqiOrder = await response.json()
    
    if (!response.ok) {
      throw new Error(culqiOrder.message || "Error creating Culqi order")
    }

    return {
      paymentUrl: culqiOrder.payment_url || `/checkout/confirmacion?orderId=${orderData.orderId}`,
    }
  } catch (error) {
    console.error("Error creating Culqi payment:", error)
    // Fallback a confirmación directa
    return {
      paymentUrl: `/checkout/confirmacion?orderId=${orderData.orderId}&error=culqi`,
    }
  }
}

// ====================================
// API ROUTE
// ====================================

export async function POST(request: NextRequest) {
  try {
    const body: CheckoutRequest = await request.json()

    // Validar datos básicos
    if (!body.customer || !body.items || body.items.length === 0) {
      return NextResponse.json(
        { error: "Datos incompletos" },
        { status: 400 }
      )
    }

    // Generar ID de orden
    const orderId = generateOrderId()
    
    const orderData = {
      ...body,
      orderId,
      status: "pending",
      createdAt: new Date().toISOString(),
    }

    // Guardar orden
    await saveOrder(orderData)

    // Enviar notificaciones
    await Promise.all([
      sendWhatsAppNotification(orderData),
      sendConfirmationEmail(orderData),
    ])

    // Procesar según método de pago
    let response: any = { orderId }

    if (body.paymentMethod === "culqi") {
      const culqiResponse = await createCulqiPayment(orderData)
      response.paymentUrl = culqiResponse.paymentUrl
    } else if (body.paymentMethod === "yape") {
      // Para Yape, retornar orderId para mostrar QR
      response.qrCode = "https://yape-qr-url.com" // TODO: Generar QR real
    }

    return NextResponse.json(response, { status: 200 })
  } catch (error) {
    console.error("Checkout error:", error)
    return NextResponse.json(
      { error: "Error al procesar la orden" },
      { status: 500 }
    )
  }
}

// ====================================
// GET - Para consultar estado de orden
// ====================================

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const orderId = searchParams.get("orderId")

  if (!orderId) {
    return NextResponse.json(
      { error: "Order ID requerido" },
      { status: 400 }
    )
  }

  // TODO: Buscar orden en base de datos
  // Por ahora, retornamos mock data
  return NextResponse.json({
    orderId,
    status: "pending",
    message: "Orden encontrada",
  })
}