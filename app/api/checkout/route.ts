import { NextRequest, NextResponse } from "next/server"
import { sql } from "@vercel/postgres"

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
// GUARDAR EN BASE DE DATOS
// ====================================

async function saveOrderToDatabase(orderData: CheckoutRequest & { orderId: string, status: string }) {
  try {
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

    console.log(`✅ Orden ${orderData.orderId} guardada en base de datos`)
    return true
  } catch (error) {
    console.error("❌ Error guardando en base de datos:", error)
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

    // ====================================
    // GUARDAR EN BASE DE DATOS
    // ====================================
    const dbSaved = await saveOrderToDatabase(orderData)
    
    if (!dbSaved) {
      console.warn("⚠️ Orden NO guardada en DB, pero continuando con emails...")
    }

    // ====================================
    // EMAIL AL ADMIN
    // ====================================
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
          <p>¡Recibimos tu pedido correctamente! Estamos preparando todo para enviártelo.</p>
          
          <div style="background: white; padding: 20px; margin: 20px 0; border-radius: 8px; border: 1px solid #e5e7eb;">
            <h2 style="color: #e11d48; margin-top: 0;">📦 Resumen de tu pedido</h2>
            ${orderData.items.map(item => `
              <div style="border-bottom: 1px solid #e5e7eb; padding: 10px 0;">
                <p style="margin: 5px 0;">${item.productTitle}</p>
                <p style="margin: 5px 0; color: #666; font-size: 14px;">
                  ${item.selectedColor} • ${item.selectedSize} • Cantidad: ${item.quantity}
                </p>
              </div>
            `).join('')}
            
            <div style="margin-top: 15px; padding-top: 15px; border-top: 2px solid #e5e7eb;">
              <p><strong>Total:</strong> S/ ${orderData.total.toFixed(2)}</p>
            </div>
          </div>
          
          <div style="background: #dcfce7; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 5px 0;"><strong>🚚 Tiempo de entrega:</strong></p>
            <p style="margin: 5px 0;">Lima: 24-48 horas</p>
            <p style="margin: 5px 0;">Provincias: 3-7 días hábiles</p>
          </div>
          
          <p>Nos pondremos en contacto contigo pronto para coordinar la entrega.</p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="https://wa.me/51972327236" 
               style="display: inline-block; background: #25D366; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold;">
              Contáctanos por WhatsApp
            </a>
          </div>
          
          <p style="color: #666; font-size: 14px; text-align: center;">
            ¿Dudas? Responde este email o contáctanos por WhatsApp
          </p>
        </div>
      </div>
    `

    // Enviar emails
    await sendEmail("osinpacha@gmail.com", `🎉 Nueva Orden: ${orderId}`, adminHTML)
    await sendEmail(orderData.customer.email, "Confirmación de tu pedido en Vialine", customerHTML)

    // Retornar respuesta
    return NextResponse.json({
      success: true,
      orderId: orderId,
      message: "Orden procesada exitosamente",
    })

  } catch (error) {
    console.error("❌ Error procesando orden:", error)
    return NextResponse.json(
      { error: "Error procesando la orden" },
      { status: 500 }
    )
  }
}