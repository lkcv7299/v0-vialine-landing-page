import { NextRequest, NextResponse } from "next/server"

// ====================================
// TYPES
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

function generateOrderId(): string {
  const timestamp = Date.now().toString(36)
  const random = Math.random().toString(36).substring(2, 7)
  return `VL-${timestamp}-${random}`.toUpperCase()
}

async function sendEmail(to: string, subject: string, html: string) {
  const RESEND_API_KEY = process.env.RESEND_API_KEY

  if (!RESEND_API_KEY) {
    console.error("❌ RESEND_API_KEY no configurada")
    return false
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Vialine <onboarding@resend.dev>",
        to: [to],
        subject: subject,
        html: html,
      }),
    })

    if (response.ok) {
      console.log(`✅ Email enviado a ${to}`)
      return true
    } else {
      const error = await response.text()
      console.error(`❌ Error enviando email: ${error}`)
      return false
    }
  } catch (error) {
    console.error("❌ Error:", error)
    return false
  }
}

// ====================================
// API ROUTE
// ====================================

export async function POST(request: NextRequest) {
  try {
    const body: CheckoutRequest = await request.json()

    if (!body.customer || !body.items || body.items.length === 0) {
      return NextResponse.json({ error: "Datos incompletos" }, { status: 400 })
    }

    const orderId = generateOrderId()
    
    const orderData = {
      ...body,
      orderId,
      status: "pending",
      createdAt: new Date().toISOString(),
    }

    console.log("\n════════════════════════════════════")
    console.log("🎉 NUEVA ORDEN:", orderId)
    console.log("════════════════════════════════════")
    console.log("👤 Cliente:", orderData.customer.firstName, orderData.customer.lastName)
    console.log("📧 Email:", orderData.customer.email)
    console.log("📱 Teléfono:", orderData.customer.phone)
    console.log("💰 Total: S/", orderData.total)
    console.log("🛍️ Items:", orderData.items.length)
    console.log("════════════════════════════════════\n")

    // EMAIL AL ADMIN
    const adminHTML = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #e11d48; color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
          <h1 style="margin: 0;">🎉 NUEVA ORDEN</h1>
          <p style="font-size: 20px; margin: 10px 0;">Orden #${orderId}</p>
        </div>
        
        <div style="padding: 20px; background: #f9fafb;">
          <div style="background: #fef2f2; border-left: 4px solid #e11d48; padding: 15px; margin-bottom: 20px;">
            <strong>⚡ ACCIÓN REQUERIDA:</strong> Contactar al cliente y preparar pedido
          </div>
          
          <div style="background: white; padding: 20px; margin: 10px 0; border-radius: 8px; border: 1px solid #e5e7eb;">
            <h2 style="color: #e11d48; margin-top: 0;">👤 Cliente</h2>
            <p><strong>Nombre:</strong> ${orderData.customer.firstName} ${orderData.customer.lastName}</p>
            <p><strong>Email:</strong> <a href="mailto:${orderData.customer.email}">${orderData.customer.email}</a></p>
            <p><strong>Teléfono:</strong> ${orderData.customer.phone}</p>
            <a href="https://wa.me/51${orderData.customer.phone.replace(/\D/g, '')}" 
               style="display: inline-block; background: #25D366; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin-top: 10px;">
              📱 Contactar por WhatsApp
            </a>
          </div>
          
          <div style="background: white; padding: 20px; margin: 10px 0; border-radius: 8px; border: 1px solid #e5e7eb;">
            <h2 style="color: #e11d48; margin-top: 0;">🏠 Dirección</h2>
            <p style="margin: 5px 0;">${orderData.shippingAddress.address}</p>
            <p style="margin: 5px 0;">${orderData.shippingAddress.district}, ${orderData.shippingAddress.city}</p>
            ${orderData.shippingAddress.reference ? `<p style="margin: 5px 0;"><strong>Referencia:</strong> ${orderData.shippingAddress.reference}</p>` : ''}
          </div>
          
          <div style="background: white; padding: 20px; margin: 10px 0; border-radius: 8px; border: 1px solid #e5e7eb;">
            <h2 style="color: #e11d48; margin-top: 0;">🛍️ Productos (${orderData.items.length})</h2>
            ${orderData.items.map(item => `
              <div style="border-bottom: 1px solid #e5e7eb; padding: 12px 0;">
                <p style="margin: 5px 0; font-weight: bold;">${item.productTitle}</p>
                <p style="margin: 5px 0; color: #666; font-size: 14px;">
                  Color: ${item.selectedColor} | Talla: ${item.selectedSize} | Cantidad: ${item.quantity}
                </p>
                <p style="margin: 5px 0; color: #e11d48; font-weight: bold;">
                  S/ ${item.productPrice.toFixed(2)} × ${item.quantity} = S/ ${(item.productPrice * item.quantity).toFixed(2)}
                </p>
              </div>
            `).join('')}
          </div>
          
          <div style="background: white; padding: 20px; margin: 10px 0; border-radius: 8px; border: 1px solid #e5e7eb;">
            <h2 style="color: #e11d48; margin-top: 0;">💰 Resumen</h2>
            <p>Subtotal: S/ ${orderData.subtotal.toFixed(2)}</p>
            <p>Envío: ${orderData.shippingCost === 0 ? '<strong style="color: #16a34a;">¡GRATIS!</strong>' : `S/ ${orderData.shippingCost.toFixed(2)}`}</p>
            <p style="font-size: 22px; font-weight: bold; color: #e11d48; margin-top: 15px;">
              TOTAL: S/ ${orderData.total.toFixed(2)}
            </p>
            <p style="margin-top: 15px;">
              <strong>Método de pago:</strong> 
              ${orderData.paymentMethod === 'culqi' ? '💳 Tarjeta' : 
                orderData.paymentMethod === 'yape' ? '📱 Yape' : 
                '💵 Contra entrega'}
            </p>
            ${orderData.notes ? `
              <div style="background: #fef3c7; padding: 12px; margin-top: 15px; border-radius: 6px;">
                <strong>📝 Notas del cliente:</strong><br>
                ${orderData.notes}
              </div>
            ` : ''}
          </div>
        </div>
      </div>
    `

    // EMAIL AL CLIENTE
    const customerHTML = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #e11d48; color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
          <h1 style="margin: 0;">🎉 ¡Gracias por tu compra!</h1>
          <p style="font-size: 18px; margin: 10px 0;">Orden #${orderId}</p>
        </div>
        
        <div style="padding: 20px; background: #f9fafb;">
          <p>Hola <strong>${orderData.customer.firstName}</strong>,</p>
          <p>¡Recibimos tu pedido correctamente! 🎊</p>
          
          <div style="background: white; padding: 20px; margin: 15px 0; border-radius: 8px; border: 1px solid #e5e7eb;">
            <h2 style="color: #e11d48; margin-top: 0;">📦 Tu pedido:</h2>
            ${orderData.items.map(item => `
              <div style="padding: 10px 0; border-bottom: 1px solid #eee;">
                <p style="margin: 5px 0; font-weight: bold;">${item.productTitle}</p>
                <p style="margin: 5px 0; color: #666; font-size: 14px;">
                  ${item.selectedColor} • ${item.selectedSize} • Cantidad: ${item.quantity}
                </p>
              </div>
            `).join('')}
            <div style="font-size: 24px; font-weight: bold; color: #e11d48; text-align: center; margin: 20px 0;">
              Total: S/ ${orderData.total.toFixed(2)}
            </div>
          </div>
          
          <div style="background: #dcfce7; padding: 15px; margin: 15px 0; border-radius: 8px; border: 1px solid #86efac;">
            <h3 style="margin-top: 0; color: #166534;">⏱️ Tiempo de entrega:</h3>
            <p style="margin: 5px 0;"><strong>Lima:</strong> 24-48 horas</p>
            <p style="margin: 5px 0;"><strong>Provincias:</strong> 3-7 días hábiles</p>
          </div>
          
          <div style="text-align: center; margin: 20px 0;">
            <p><strong>Te contactaremos pronto por WhatsApp para coordinar la entrega 📱</strong></p>
          </div>
          
          <div style="text-align: center; color: #666; font-size: 14px; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
            <p>¿Dudas? Escríbenos al WhatsApp: <strong>+51 972 327 236</strong></p>
            <p style="margin-top: 10px;">Vialine - Ropa deportiva para mujeres empoderadas 💪</p>
          </div>
        </div>
      </div>
    `

    // ENVIAR AMBOS EMAILS
    console.log("📧 Enviando emails...")
    
    await Promise.all([
      sendEmail(
        "osinpacha@gmail.com", // ⚠️ CAMBIA ESTO POR TU EMAIL
        `🎉 Nueva Orden #${orderId} - S/ ${orderData.total.toFixed(2)}`,
        adminHTML
      ),
      sendEmail(
        orderData.customer.email,
        `✅ Orden Confirmada #${orderId} - Vialine`,
        customerHTML
      )
    ])

    console.log("✅ Emails procesados\n")

    return NextResponse.json({ 
      orderId,
      success: true,
      redirect: `/checkout/confirmacion?orderId=${orderId}`
    })
  } catch (error) {
    console.error("❌ Error procesando orden:", error)
    return NextResponse.json({ error: "Error procesando orden" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const orderId = searchParams.get("orderId")
  
  if (!orderId) {
    return NextResponse.json({ error: "Order ID requerido" }, { status: 400 })
  }
  
  return NextResponse.json({ orderId, status: "pending" })
}
