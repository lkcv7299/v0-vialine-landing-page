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
 * Envía email de notificación al ADMIN
 * ✅ FIX: Diferencia entre métodos de pago
 */
export async function sendAdminNotification(orderData: OrderData): Promise<boolean> {
  const BREVO_API_KEY = process.env.BREVO_API_KEY || process.env.NEXT_PUBLIC_BREVO_API_KEY

  if (!BREVO_API_KEY) {
    console.error("❌ BREVO_API_KEY no configurada")
    return false
  }

  try {
    // ✅ NUEVO: Configuración diferenciada por método de pago
    let emailConfig = {
      subject: "",
      headerTitle: "",
      headerColor: "",
      statusEmoji: "",
      statusTitle: "",
      statusMessage: "",
      statusBgColor: "",
      statusBorderColor: "",
    }

    if (orderData.paymentMethod === "culqi") {
      emailConfig = {
        subject: `⏳ PENDIENTE DE PAGO - Orden #${orderData.orderId}`,
        headerTitle: "⏳ ORDEN PENDIENTE DE PAGO",
        headerColor: "#f59e0b", // Amarillo/naranja
        statusEmoji: "⏳",
        statusTitle: "PENDIENTE DE PAGO CON TARJETA",
        statusMessage: "El cliente creó esta orden pero AÚN NO ha completado el pago con tarjeta de crédito/débito. La orden se confirmará automáticamente cuando pague.",
        statusBgColor: "#fef3c7",
        statusBorderColor: "#f59e0b",
      }
    } else if (orderData.paymentMethod === "contraentrega") {
      emailConfig = {
        subject: `✅ NUEVA ORDEN - Pago Contra Entrega #${orderData.orderId}`,
        headerTitle: "✅ NUEVA ORDEN CONFIRMADA",
        headerColor: "#10b981", // Verde
        statusEmoji: "💵",
        statusTitle: "PAGO CONTRA ENTREGA",
        statusMessage: "El cliente pagará en efectivo al momento de la entrega. Esta orden está CONFIRMADA y lista para procesar. No esperes ningún pago online.",
        statusBgColor: "#d1fae5",
        statusBorderColor: "#10b981",
      }
    } else if (orderData.paymentMethod === "yape") {
      emailConfig = {
        subject: `📱 YAPE - Confirmar Pago - Orden #${orderData.orderId}`,
        headerTitle: "📱 ORDEN YAPE - CONFIRMAR PAGO",
        headerColor: "#8b5cf6", // Morado
        statusEmoji: "📱",
        statusTitle: "PAGO POR YAPE - PENDIENTE CONFIRMACIÓN",
        statusMessage: "El cliente hará el pago por Yape. IMPORTANTE: Verifica el pago en tu app Yape antes de procesar la orden. Una vez confirmado el pago, marca la orden como pagada.",
        statusBgColor: "#ede9fe",
        statusBorderColor: "#8b5cf6",
      }
    }

    const adminEmailHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: ${emailConfig.headerColor}; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
          .order-info { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
          .item { border-bottom: 1px solid #e5e7eb; padding: 15px 0; }
          .item:last-child { border-bottom: none; }
          .total { font-size: 20px; font-weight: bold; color: #e11d48; margin-top: 20px; }
          .label { font-weight: bold; color: #6b7280; }
          .value { color: #111827; }
          .status-box { background: ${emailConfig.statusBgColor}; border-left: 4px solid ${emailConfig.statusBorderColor}; padding: 15px; margin: 20px 0; border-radius: 4px; }
          .button { display: inline-block; background: #e11d48; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin: 10px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>${emailConfig.headerTitle}</h1>
            <p style="margin: 0;">Orden #${orderData.orderId}</p>
          </div>
          
          <div class="content">
            <div class="status-box">
              <h3 style="margin-top: 0;">${emailConfig.statusEmoji} ${emailConfig.statusTitle}</h3>
              <p style="margin-bottom: 0;">${emailConfig.statusMessage}</p>
            </div>

            <div class="order-info">
              <h2 style="margin-top: 0; color: #e11d48;">Información del Cliente</h2>
              <p><span class="label">Nombre:</span> <span class="value">${orderData.customer.firstName} ${orderData.customer.lastName}</span></p>
              <p><span class="label">Email:</span> <span class="value">${orderData.customer.email}</span></p>
              <p><span class="label">Teléfono:</span> <span class="value">${orderData.customer.phone}</span></p>
            </div>

            <div class="order-info">
              <h2 style="margin-top: 0; color: #e11d48;">Dirección de Envío</h2>
              <p class="value">${orderData.shippingAddress.address}</p>
              <p class="value">${orderData.shippingAddress.district}, ${orderData.shippingAddress.city}</p>
              ${orderData.shippingAddress.postalCode ? `<p class="value">CP: ${orderData.shippingAddress.postalCode}</p>` : ''}
              ${orderData.shippingAddress.reference ? `<p><span class="label">Referencia:</span> <span class="value">${orderData.shippingAddress.reference}</span></p>` : ''}
            </div>

            <div class="order-info">
              <h2 style="margin-top: 0; color: #e11d48;">Productos Ordenados</h2>
              ${orderData.items.map(item => `
                <div class="item">
                  <p style="margin: 0 0 5px 0; font-weight: 600;">${item.productTitle}</p>
                  <p style="margin: 0; color: #6b7280; font-size: 14px;">
                    Color: ${item.selectedColor} | Talla: ${item.selectedSize} | 
                    Cantidad: ${item.quantity} | 
                    Precio: S/ ${item.productPrice.toFixed(2)}
                  </p>
                  <p style="margin: 5px 0 0 0; font-weight: 600;">
                    Subtotal: S/ ${(item.productPrice * item.quantity).toFixed(2)}
                  </p>
                </div>
              `).join('')}
              
              <div style="margin-top: 20px; padding-top: 15px; border-top: 2px solid #e5e7eb;">
                <p style="display: flex; justify-content: space-between; margin: 10px 0;">
                  <span class="label">Subtotal:</span>
                  <span>S/ ${orderData.subtotal.toFixed(2)}</span>
                </p>
                <p style="display: flex; justify-content: space-between; margin: 10px 0;">
                  <span class="label">Envío:</span>
                  <span>${orderData.shippingCost === 0 ? 'GRATIS' : `S/ ${orderData.shippingCost.toFixed(2)}`}</span>
                </p>
                <p class="total" style="display: flex; justify-content: space-between; margin: 15px 0 0 0;">
                  <span>TOTAL:</span>
                  <span>S/ ${orderData.total.toFixed(2)}</span>
                </p>
              </div>
            </div>

            <div class="order-info">
              <h2 style="margin-top: 0; color: #e11d48;">Método de Pago</h2>
              <p class="value" style="text-transform: capitalize; font-weight: 600; font-size: 16px;">
                ${orderData.paymentMethod === 'culqi' ? '💳 Tarjeta de Crédito/Débito (Culqi)' : 
                  orderData.paymentMethod === 'contraentrega' ? '💵 Pago Contra Entrega' : 
                  '📱 Yape'}
              </p>
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

    console.log(`📤 Enviando email al admin (${orderData.paymentMethod})...`)

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
        subject: `${emailConfig.subject} - S/ ${orderData.total.toFixed(2)}`,
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
          .header { background: #e11d48; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
          .order-info { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
          .item { border-bottom: 1px solid #e5e7eb; padding: 15px 0; }
          .item:last-child { border-bottom: none; }
          .total { font-size: 20px; font-weight: bold; color: #e11d48; margin-top: 20px; }
          .label { font-weight: bold; color: #6b7280; }
          .value { color: #111827; }
          .success-box { background: #d1fae5; border-left: 4px solid #10b981; padding: 15px; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>✅ ¡Gracias por tu compra!</h1>
            <p style="margin: 0;">Orden #${orderData.orderId}</p>
          </div>
          
          <div class="content">
            <div class="success-box">
              <h3 style="margin-top: 0;">🎉 Tu orden ha sido confirmada</h3>
              <p>Hola ${orderData.customer.firstName}, hemos recibido tu pedido y lo estamos preparando con mucho cariño.</p>
            </div>

            <div class="order-info">
              <h2 style="margin-top: 0; color: #e11d48;">Detalles de tu Orden</h2>
              ${orderData.items.map(item => `
                <div class="item">
                  <p style="margin: 0 0 5px 0; font-weight: 600;">${item.productTitle}</p>
                  <p style="margin: 0; color: #6b7280; font-size: 14px;">
                    Color: ${item.selectedColor} | Talla: ${item.selectedSize} | 
                    Cantidad: ${item.quantity}
                  </p>
                  <p style="margin: 5px 0 0 0; font-weight: 600;">
                    S/ ${(item.productPrice * item.quantity).toFixed(2)}
                  </p>
                </div>
              `).join('')}
              
              <div style="margin-top: 20px; padding-top: 15px; border-top: 2px solid #e5e7eb;">
                <p style="display: flex; justify-content: space-between; margin: 10px 0;">
                  <span class="label">Subtotal:</span>
                  <span>S/ ${orderData.subtotal.toFixed(2)}</span>
                </p>
                <p style="display: flex; justify-content: space-between; margin: 10px 0;">
                  <span class="label">Envío:</span>
                  <span>${orderData.shippingCost === 0 ? 'GRATIS' : `S/ ${orderData.shippingCost.toFixed(2)}`}</span>
                </p>
                <p class="total" style="display: flex; justify-content: space-between; margin: 15px 0 0 0;">
                  <span>TOTAL:</span>
                  <span>S/ ${orderData.total.toFixed(2)}</span>
                </p>
              </div>
            </div>

            <div class="order-info">
              <h2 style="margin-top: 0; color: #e11d48;">Dirección de Envío</h2>
              <p class="value">${orderData.shippingAddress.address}</p>
              <p class="value">${orderData.shippingAddress.district}, ${orderData.shippingAddress.city}</p>
            </div>

            <div class="order-info">
              <h2 style="margin-top: 0; color: #e11d48;">¿Qué sigue?</h2>
              <p>📦 Prepararemos tu pedido con amor</p>
              <p>📱 Te contactaremos por WhatsApp al ${orderData.customer.phone}</p>
              <p>🚚 Tiempo de entrega: Lima 24-48h, Provincias 3-7 días</p>
            </div>

            <p style="text-align: center; color: #6b7280; margin-top: 30px;">
              ¿Dudas? Escríbenos al WhatsApp: +51 972 327 236
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
          email: "no-reply@vialineperu.com"
        },
        to: [
          {
            email: orderData.customer.email,
            name: `${orderData.customer.firstName} ${orderData.customer.lastName}`
          }
        ],
        subject: `✅ Confirmación de Pedido #${orderData.orderId} - Vialine`,
        htmlContent: customerEmailHTML,
      }),
    })

    if (response.ok) {
      console.log("✅ Email de confirmación enviado al cliente")
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