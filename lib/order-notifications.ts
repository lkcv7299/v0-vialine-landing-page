/**
 * SISTEMA DE NOTIFICACIONES DE ÓRDENES
 * Envía emails automáticos cuando hay una nueva orden
 */

type OrderData = {
  orderId: string
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
    productTitle: string
    productPrice: number
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

/**
 * Envía email de notificación al ADMIN (orden PENDIENTE)
 */
export async function sendAdminNotification(orderData: OrderData): Promise<boolean> {
  const BREVO_API_KEY = process.env.BREVO_API_KEY || process.env.NEXT_PUBLIC_BREVO_API_KEY

  if (!BREVO_API_KEY) {
    console.error("❌ BREVO_API_KEY no configurada")
    return false
  }

  try {
    const adminEmailHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #f59e0b; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
          .order-info { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
          .item { border-bottom: 1px solid #e5e7eb; padding: 15px 0; }
          .item:last-child { border-bottom: none; }
          .total { font-size: 20px; font-weight: bold; color: #e11d48; margin-top: 20px; }
          .label { font-weight: bold; color: #6b7280; }
          .value { color: #111827; }
          .urgent { background: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; margin: 20px 0; }
          .button { display: inline-block; background: #e11d48; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin: 10px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>⏳ NUEVA ORDEN PENDIENTE</h1>
            <p style="margin: 0;">Orden #${orderData.orderId}</p>
          </div>
          
          <div class="content">
            <div class="urgent">
              <h3 style="margin-top: 0;">⚠️ PENDIENTE DE PAGO</h3>
              <p>Esta orden fue creada pero el cliente AÚN NO ha completado el pago. Recibirás otro email cuando el pago se confirme.</p>
            </div>

            <div class="order-info">
              <h2 style="margin-top: 0; color: #e11d48;">Información del Cliente</h2>
              <p><span class="label">Nombre:</span> <span class="value">${orderData.customer.firstName} ${orderData.customer.lastName}</span></p>
              <p><span class="label">Email:</span> <span class="value">${orderData.customer.email}</span></p>
              <p><span class="label">Teléfono:</span> <span class="value">${orderData.customer.phone}</span></p>
            </div>

            <div class="order-info">
              <h2 style="margin-top: 0; color: #e11d48;">Dirección de Envío</h2>
              <p class="value">
                ${orderData.shippingAddress.address}<br>
                ${orderData.shippingAddress.district}, ${orderData.shippingAddress.city}<br>
                CP: ${orderData.shippingAddress.postalCode}
              </p>
              ${orderData.shippingAddress.reference ? `<p><span class="label">Referencia:</span> ${orderData.shippingAddress.reference}</p>` : ''}
            </div>

            <div class="order-info">
              <h2 style="margin-top: 0; color: #e11d48;">Productos</h2>
              ${orderData.items.map(item => `
                <div class="item">
                  <p style="margin: 0; font-weight: bold;">${item.productTitle}</p>
                  <p style="margin: 5px 0 0 0; color: #6b7280; font-size: 14px;">
                    Color: ${item.selectedColor} | Talla: ${item.selectedSize} | Cantidad: ${item.quantity}
                  </p>
                  <p style="margin: 5px 0 0 0; font-weight: bold; color: #e11d48;">
                    S/ ${(item.productPrice * item.quantity).toFixed(2)}
                  </p>
                </div>
              `).join('')}

              <div style="margin-top: 20px; padding-top: 20px; border-top: 2px solid #e5e7eb;">
                <p style="display: flex; justify-content: space-between; margin: 5px 0;">
                  <span class="label">Subtotal:</span>
                  <span class="value">S/ ${orderData.subtotal.toFixed(2)}</span>
                </p>
                <p style="display: flex; justify-content: space-between; margin: 5px 0;">
                  <span class="label">Envío:</span>
                  <span class="value">${orderData.shippingCost === 0 ? 'GRATIS' : `S/ ${orderData.shippingCost.toFixed(2)}`}</span>
                </p>
                <p class="total" style="display: flex; justify-content: space-between; margin: 15px 0 0 0;">
                  <span>TOTAL:</span>
                  <span>S/ ${orderData.total.toFixed(2)}</span>
                </p>
              </div>
            </div>

            <div class="order-info">
              <h2 style="margin-top: 0; color: #e11d48;">Método de Pago</h2>
              <p class="value" style="text-transform: capitalize;">${orderData.paymentMethod}</p>
              ${orderData.notes ? `
                <h2 style="margin-top: 20px; color: #e11d48;">Notas del Cliente</h2>
                <p class="value">${orderData.notes}</p>
              ` : ''}
            </div>

            <div style="text-align: center; margin: 30px 0;">
              <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'https://vialineperu.com'}/admin/dashboard" class="button" style="color: white; text-decoration: none;">
                Ver en Dashboard Admin
              </a>
            </div>

            <p style="text-align: center; color: #6b7280; font-size: 14px;">
              Fecha de orden: ${new Date(orderData.createdAt).toLocaleString('es-PE')}
            </p>
          </div>
        </div>
      </body>
      </html>
    `

    console.log("📤 Enviando email al admin (orden pendiente)...")

    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "accept": "application/json",
        "api-key": BREVO_API_KEY,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        sender: {
          name: "Vialine",
          email: "no-reply@vialineperu.com"
        },
        to: [
          {
            email: "osinpacha@gmail.com",
            name: "Admin Vialine"
          }
        ],
        subject: `⏳ Nueva Orden PENDIENTE #${orderData.orderId} - S/ ${orderData.total.toFixed(2)}`,
        htmlContent: adminEmailHTML,
      }),
    })

    if (response.ok) {
      console.log("✅ Email al admin enviado correctamente")
      return true
    } else {
      const errorText = await response.text()
      console.error("❌ Error enviando email al admin:", errorText)
      return false
    }
  } catch (error) {
    console.error("❌ Error en sendAdminNotification:", error)
    return false
  }
}

/**
 * Envía email de confirmación al CLIENTE (cuando paga)
 */
export async function sendCustomerConfirmation(orderData: OrderData): Promise<boolean> {
  const BREVO_API_KEY = process.env.BREVO_API_KEY || process.env.NEXT_PUBLIC_BREVO_API_KEY

  if (!BREVO_API_KEY) {
    console.error("❌ BREVO_API_KEY no configurada")
    return false
  }

  try {
    const customerEmailHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #e11d48; color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
          .order-box { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
          .item { border-bottom: 1px solid #e5e7eb; padding: 10px 0; }
          .total { font-size: 24px; font-weight: bold; color: #e11d48; text-align: center; margin: 20px 0; }
          .button { display: inline-block; background: #25D366; color: white; padding: 15px 30px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎉 ¡Gracias por tu compra!</h1>
            <p style="font-size: 18px; margin: 10px 0;">Orden #${orderData.orderId}</p>
          </div>
          
          <div class="content">
            <p>Hola <strong>${orderData.customer.firstName}</strong>,</p>
            <p>¡Recibimos tu pedido y tu pago fue confirmado exitosamente! 🎊</p>
            
            <div class="order-box">
              <h2 style="color: #e11d48; margin-top: 0;">Resumen de tu Orden</h2>
              ${orderData.items.map(item => `
                <div class="item">
                  <p style="margin: 0; font-weight: bold;">${item.productTitle}</p>
                  <p style="margin: 5px 0; color: #6b7280; font-size: 14px;">
                    ${item.selectedColor} | Talla ${item.selectedSize} | Cantidad: ${item.quantity}
                  </p>
                  <p style="margin: 5px 0; font-weight: bold;">S/ ${(item.productPrice * item.quantity).toFixed(2)}</p>
                </div>
              `).join('')}
              
              <div class="total">
                TOTAL: S/ ${orderData.total.toFixed(2)}
              </div>
            </div>

            <div class="order-box">
              <h2 style="color: #e11d48; margin-top: 0;">¿Qué sigue?</h2>
              <ol style="padding-left: 20px;">
                <li style="margin-bottom: 10px;">Preparamos tu pedido con mucho cuidado</li>
                <li style="margin-bottom: 10px;">Te contactaremos para coordinar la entrega</li>
                <li style="margin-bottom: 10px;">¡Recibirás tu pedido en la puerta de tu casa!</li>
              </ol>
              
              <p><strong>Tiempo de entrega:</strong></p>
              <ul style="list-style: none; padding: 0;">
                <li>📍 Lima: 24-48 horas</li>
                <li>📍 Provincias: 3-7 días hábiles</li>
              </ul>
            </div>

            <div style="text-align: center;">
              <a href="https://wa.me/51972327236?text=Hola, tengo una consulta sobre mi orden ${orderData.orderId}" class="button" style="color: white; text-decoration: none;">
                💬 Contactar por WhatsApp
              </a>
            </div>
            
            <p style="text-align: center; color: #6b7280; font-size: 14px;">
              ¿Tienes dudas?<br>
              Escríbenos al WhatsApp: +51 972 327 236<br>
              O responde este email
            </p>
          </div>
        </div>
      </body>
      </html>
    `

    console.log("📤 Enviando email al cliente (pago confirmado)...")

    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "accept": "application/json",
        "api-key": BREVO_API_KEY,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        sender: {
          name: "Vialine",
          email: "no-reply@vialineperu.com"
        },
        to: [
          {
            email: orderData.customer.email,
            name: `${orderData.customer.firstName} ${orderData.customer.lastName}`
          }
        ],
        subject: `✅ ¡Pago Confirmado! Orden #${orderData.orderId} - Vialine`,
        htmlContent: customerEmailHTML,
      }),
    })

    if (response.ok) {
      console.log("✅ Email al cliente enviado correctamente")
      return true
    } else {
      const errorText = await response.text()
      console.error("❌ Error enviando email al cliente:", errorText)
      return false
    }
  } catch (error) {
    console.error("❌ Error en sendCustomerConfirmation:", error)
    return false
  }
}