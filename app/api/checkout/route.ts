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

// Enviar notificación a WhatsApp
async function sendWhatsAppNotification(orderData: CheckoutRequest & { orderId: string }) {
  console.log("📱 Nueva orden para WhatsApp:", orderData.orderId)
  console.log("   Cliente:", orderData.customer.firstName, orderData.customer.lastName)
  console.log("   Total: S/", orderData.total)
  console.log("   Items:", orderData.items.length)
  
  // TODO: Implementar Twilio WhatsApp API cuando estés listo
}

// Enviar email de confirmación al cliente
async function sendConfirmationEmail(orderData: CheckoutRequest & { orderId: string }) {
  console.log("📧 Email de confirmación para:", orderData.customer.email)
  console.log("   Orden:", orderData.orderId)
  
  // TODO: Implementar Resend o SendGrid cuando estés listo
}

// Guardar orden (por ahora solo logs)
async function saveOrder(orderData: CheckoutRequest & { orderId: string }) {
  console.log("💾 Guardando orden:", orderData.orderId)
  console.log("   Datos completos:", JSON.stringify(orderData, null, 2))
  
  // TODO: Implementar guardado real cuando tengas base de datos
}

// Crear pago con Culqi
async function createCulqiPayment(orderData: CheckoutRequest & { orderId: string }) {
  const CULQI_SECRET_KEY = process.env.CULQI_SECRET_KEY || ""
  
  if (!CULQI_SECRET_KEY) {
    console.warn("⚠️ CULQI_SECRET_KEY no configurado - usando modo test")
    return {
      paymentUrl: `/checkout/confirmacion?orderId=${orderData.orderId}&test=true`,
    }
  }

  try {
    const response = await fetch("https://api.culqi.com/v2/orders", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${CULQI_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: Math.round(orderData.total * 100),
        currency_code: "PEN",
        description: `Orden Vialine ${orderData.orderId}`,
        order_number: orderData.orderId,
        client_details: {
          first_name: orderData.customer.firstName,
          last_name: orderData.customer.lastName,
          email: orderData.customer.email,
          phone_number: orderData.customer.phone,
        },
        expiration_date: Math.floor(Date.now() / 1000) + 3600,
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
      response.qrCode = "https://yape-qr-url.com"
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

  return NextResponse.json({
    orderId,
    status: "pending",
    message: "Orden encontrada",
  })
}