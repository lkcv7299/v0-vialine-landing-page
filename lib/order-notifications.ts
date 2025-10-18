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
 * Envía email de notificación al ADMIN (tú)
 */
export async function sendAdminNotification(orderData: OrderData): Promise<boolean> {
  const BREVO_API_KEY = process.env.NEXT_PUBLIC_BREVO_API_KEY

  if (!BREVO_API_KEY) {
    console.error("❌ BREVO API KEY no configurada")
    return false
  }

  try {
    // Email HTML para el admin
    const adminEmailHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #e11d48; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
          .order-info { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
          .item { border-bottom: 1px solid #e5e7eb; padding: 15px 0; }
          .item:last-child { border-bottom: none; }
          .total { font-size: 20px; font-weight: bold; color: #e11d48; margin-top: 20px; }
          .label { font-weight: bold; color: #6b7280; }
          .value { color: #111827; }
          .urgent { background: #fef2f2; border-left: 4px solid #e11d48; padding: 15px; margin: 20px 0; }
          .button { display: inline-block; background: #e11d48; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin: 10px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎉 ¡NUEVA ORDEN RECIBIDA!</h1>
            <p style="margin: 0;">Orden #${orderData.orderId}</p>
          </div>
          
          <div class="content">
            <div class="urgent">
              <h3 style="margin-top: 0;">⚡ ACCIÓN REQUERIDA</h3>
              <p>Tienes una nueva orden que requiere atención inmediata.</p>
              <a href="https://wa.me/${orderData.customer.phone.replace(/\D/g, '')}" class="button" style="color: white; text-decoration: none;">
                📱 Contactar Cliente por WhatsApp
              </a>
            </div>

            <div class="order-info">
              <h3 style="margin-top: 0;">👤 Información del Cliente</h3>
              <p><span class="label">Nombre:</span> <span class="value">${orderData.customer.firstName} ${orderData.customer.lastName}</span></p>
              <p><span class="label">Email:</span> <span class="value">${orderData.customer.email}</span></p>
              <p><span class="label">Teléfono:</span> <span class="value">${orderData.customer.phone}</span></p>
            </div>

            <div class="order-info">
              <h3 style="margin-top: 0;">📦 Dirección de Envío</h3>
              <p><span class="label">Dirección:</span> <span class="value">${orderData.shippingAddress.address}</span></p>
              <p><span class="label">Distrito:</span> <span class="value">${orderData.shippingAddress.district}</span></p>
              <p><span class="label">Ciudad:</span> <span class="value">${orderData.shippingAddress.city}</span></p>
              ${orderData.shippingAddress.postalCode ? `<p><span class="label">Código Postal:</span> <span class="value">${orderData.shippingAddress.postalCode}</span></p>` : ''}
              ${orderData.shippingAddress.reference ? `<p><span class="label">Referencia:</span> <span class="value">${orderData.shippingAddress.reference}</span></p>` : ''}
            </div>

            <div class="order-info">
              <h3 style="margin-top: 0;">🛍️ Productos</h3>
              ${orderData.items.map(item => `
                <div class="item">
                  <p style="margin: 0; font-weight: bold;">${item.productTitle}</p>
                  <p style="margin: 5px 0; color: #6b7280; font-size: 14px;">
                    Color: ${item.selectedColor} | Talla: ${item.selectedSize} | Cantidad: ${item.quantity}
                  </p>
                  <p style="margin: 0; color: #e11d48; font-weight: bold;">S/ ${item.productPrice.toFixed(2)} c/u</p>
                </div>
              `).join('')}
              
              <p style="margin-top: 15px;"><span class="label">Subtotal:</span> <span class="value">S/ ${orderData.subtotal.toFixed(2)}</span></p>
              <p><span class="label">Envío:</span> <span class="value">${orderData.shippingCost === 0 ? '¡GRATIS!' : `S/ ${orderData.shippingCost.toFixed(2)}`}</span></p>
              <p class="total">TOTAL: S/ ${orderData.total.toFixed(2)}</p>
              <p style="margin-top: 10px;">
                <span class="label">Método de pago:</span> 
                <span class="value" style="font-weight: bold;">
                  ${orderData.paymentMethod === 'culqi' ? '💳 Tarjeta (Culqi)' : 
                    orderData.paymentMethod === 'yape' ? '📱 Yape' : 
                    '💵 Contra entrega'}
                </span>
              </p>
              ${orderData.notes ? `<p style="background: #fef3c7; padding: 10px; border-radius: 4px; margin-top: 10px;"><span class="label">Notas:</span> ${orderData.notes}</p>` : ''}
            </div>
            
            <div class="urgent">
              <h3 style="margin-top: 0;">📋 Siguiente paso:</h3>
              <ol style="margin: 10px 0;">
                <li>Contacta al cliente por WhatsApp (botón arriba)</li>
                <li>Confirma la dirección y coordina entrega</li>
                <li>Prepara el pedido</li>
                <li>${orderData.paymentMethod === 'contraentrega' ? 'Cliente paga al recibir' : 
                     orderData.paymentMethod === 'yape' ? 'Envía QR de Yape al cliente' : 
                     'Pago con tarjeta ya procesado'}</li>
              </ol>
            </div>
            
            <p style="text-align: center; color: #6b7280; margin-top: 30px; font-size: 14px;">
              Orden recibida: ${new Date(orderData.createdAt).toLocaleString('es-PE', { 
                dateStyle: 'full', 
                timeStyle: 'short',
                timeZone: 'America/Lima'
              })}
            </p>
          </div>
        </div>
      </body>
      </html>
    `

    // ⚠️ CAMBIAR ESTE EMAIL POR TU EMAIL REAL
    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "accept": "application/json",
        "api-key": BREVO_API_KEY,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        sender: {
          name: "Vialine - Sistema de Órdenes",
          email: "no-reply@trials.brevo.com"
        },
        to: [
          {
            email: "osinpacha@gmail.com", // ⚠️ CAMBIAR POR TU EMAIL REAL
            name: "Admin Vialine"
          }
        ],
        subject: `🎉 Nueva Orden #${orderData.orderId} - S/ ${orderData.total.toFixed(2)}`,
        htmlContent: adminEmailHTML,
      }),
    })

    if (response.ok) {
      console.log("✅ Email enviado al admin correctamente")
      return true
    } else {
      const error = await response.text()
      console.error("❌ Error enviando email al admin:", error)
      return false
    }
  } catch (error) {
    console.error("❌ Error en sendAdminNotification:", error)
    return false
  }
}

/**
 * Envía email de confirmación al CLIENTE
 */
export async function sendCustomerConfirmation(orderData: OrderData): Promise<boolean> {
  const BREVO_API_KEY = process.env.NEXT_PUBLIC_BREVO_API_KEY

  if (!BREVO_API_KEY) {
    console.error("❌ BREVO API KEY no configurada")
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
            <p>¡Recibimos tu pedido correctamente! Nos pondremos en contacto contigo muy pronto para coordinar la entrega.</p>
            
            <div class="order-box">
              <h3 style="margin-top: 0;">📦 Resumen de tu orden</h3>
              ${orderData.items.map(item => `
                <div class="item">
                  <p style="margin: 0; font-weight: bold;">${item.productTitle}</p>
                  <p style="margin: 5px 0; color: #6b7280; font-size: 14px;">
                    Color: ${item.selectedColor} | Talla: ${item.selectedSize} | Cantidad: ${item.quantity}
                  </p>
                  <p style="margin: 0;">S/ ${item.productPrice.toFixed(2)} c/u</p>
                </div>
              `).join('')}
              
              <p style="margin-top: 15px; padding-top: 15px; border-top: 2px solid #e5e7eb;">
                Subtotal: S/ ${orderData.subtotal.toFixed(2)}
              </p>
              <p>Envío: ${orderData.shippingCost === 0 ? '¡GRATIS!' : `S/ ${orderData.shippingCost.toFixed(2)}`}</p>
              <p class="total">TOTAL: S/ ${orderData.total.toFixed(2)}</p>
            </div>
            
            <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="margin-top: 0;">📍 Envío a:</h3>
              <p style="margin: 5px 0;">${orderData.shippingAddress.address}</p>
              <p style="margin: 5px 0;">${orderData.shippingAddress.district}, ${orderData.shippingAddress.city}</p>
              ${orderData.shippingAddress.reference ? `<p style="margin: 5px 0; color: #6b7280;">Ref: ${orderData.shippingAddress.reference}</p>` : ''}
            </div>
            
            <div style="background: #eff6ff; border-left: 4px solid #3b82f6; padding: 15px; border-radius: 4px; margin: 20px 0;">
              <h3 style="margin-top: 0;">⏱️ ¿Cuándo recibiré mi pedido?</h3>
              <ul style="margin: 10px 0; padding-left: 20px;">
                <li><strong>Lima Metropolitana:</strong> 24-48 horas</li>
                <li><strong>Provincias:</strong> 3-7 días hábiles</li>
              </ul>
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="https://wa.me/51972327236?text=Hola! Tengo una consulta sobre mi orden ${orderData.orderId}" class="button" style="color: white; text-decoration: none;">
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
          email: "no-reply@trials.brevo.com"
        },
        to: [
          {
            email: orderData.customer.email,
            name: `${orderData.customer.firstName} ${orderData.customer.lastName}`
          }
        ],
        subject: `✅ Orden Confirmada #${orderData.orderId} - Vialine`,
        htmlContent: customerEmailHTML,
      }),
    })

    if (response.ok) {
      console.log("✅ Email enviado al cliente correctamente")
      return true
    } else {
      const error = await response.text()
      console.error("❌ Error enviando email al cliente:", error)
      return false
    }
  } catch (error) {
    console.error("❌ Error en sendCustomerConfirmation:", error)
    return false
  }
}