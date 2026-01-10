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
  paymentMethod: "culqi" | "contra_entrega"
  notes: string
  createdAt: string
  paymentConfirmed?: boolean // Nuevo flag para indicar si el pago ya fue confirmado
}

/**
 * Envía email de notificación al ADMIN
 * ✅ FIX: Diferencia entre métodos de pago
 */
export async function sendAdminNotification(orderData: OrderData): Promise<boolean> {
  console.log(`📨 sendAdminNotification iniciado para orden ${orderData.orderId}`)
  console.log(`📨 Payment method recibido: ${orderData.paymentMethod}`)
  console.log(`📨 Payment confirmed: ${orderData.paymentConfirmed}`)

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

    // Solo hay un método de pago: Culqi (incluye Tarjeta y Yape)
    if (orderData.paymentConfirmed) {
      // Email cuando el pago YA fue confirmado (caso normal)
      emailConfig = {
        subject: `✅ NUEVO PEDIDO PAGADO - #${orderData.orderId}`,
        headerTitle: "✅ NUEVO PEDIDO CONFIRMADO",
        headerColor: "#10b981", // Verde
        statusEmoji: "💳",
        statusTitle: "PAGO CONFIRMADO",
        statusMessage: "El cliente completó el pago exitosamente vía Culqi (Tarjeta o Yape). La orden está lista para procesar.",
        statusBgColor: "#d1fae5",
        statusBorderColor: "#10b981",
      }
    } else {
      // Caso edge: orden creada pero no pagada (no debería recibir email normalmente)
      emailConfig = {
        subject: `⏳ Orden Pendiente - #${orderData.orderId}`,
        headerTitle: "⏳ ORDEN PENDIENTE",
        headerColor: "#f59e0b",
        statusEmoji: "⏳",
        statusTitle: "PENDIENTE DE PAGO",
        statusMessage: "Orden creada, esperando confirmación de pago vía Culqi.",
        statusBgColor: "#fef3c7",
        statusBorderColor: "#f59e0b",
      }
    }

    console.log(`📧 Email config determinado:`)
    console.log(`   Subject: ${emailConfig.subject}`)
    console.log(`   Header: ${emailConfig.headerTitle}`)

    if (!emailConfig.subject || !emailConfig.headerTitle) {
      console.error(`❌ Error: emailConfig tiene valores vacíos!`)
      console.error(`   Payment method: ${orderData.paymentMethod}`)
      console.error(`   Payment confirmed: ${orderData.paymentConfirmed}`)
      return false
    }

    const adminEmailHTML = `
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title>Nueva Orden - Vialine</title>
        <!--[if mso]>
        <style type="text/css">
          body, table, td { font-family: Arial, sans-serif !important; }
        </style>
        <![endif]-->
      </head>
      <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5; line-height: 1.6;">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f5f5f5; padding: 40px 0;">
          <tr>
            <td align="center">
              <!-- Main Container -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="max-width: 600px; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.07);">

                <!-- Header -->
                <tr>
                  <td style="background: linear-gradient(135deg, ${emailConfig.headerColor} 0%, ${emailConfig.headerColor}dd 100%); padding: 40px 30px; text-align: center;">
                    <h1 style="margin: 0 0 8px 0; font-size: 28px; font-weight: 700; color: #ffffff; letter-spacing: -0.5px;">
                      ${emailConfig.statusEmoji} ${emailConfig.headerTitle}
                    </h1>
                    <p style="margin: 0; font-size: 16px; color: rgba(255, 255, 255, 0.95); font-weight: 500;">
                      Orden #${orderData.orderId}
                    </p>
                  </td>
                </tr>

                <!-- Status Banner -->
                <tr>
                  <td style="padding: 0;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                      <tr>
                        <td style="background-color: ${emailConfig.statusBgColor}; border-left: 5px solid ${emailConfig.statusBorderColor}; padding: 20px 30px;">
                          <p style="margin: 0 0 8px 0; font-size: 18px; font-weight: 700; color: #111827;">
                            ${emailConfig.statusTitle}
                          </p>
                          <p style="margin: 0; font-size: 14px; color: #374151; line-height: 1.6;">
                            ${emailConfig.statusMessage}
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Content Padding -->
                <tr>
                  <td style="padding: 30px;">

                    <!-- Customer Info Card -->
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom: 24px; background-color: #f9fafb; border-radius: 8px; overflow: hidden;">
                      <tr>
                        <td style="padding: 20px;">
                          <h2 style="margin: 0 0 16px 0; font-size: 16px; font-weight: 700; color: #e11d48; text-transform: uppercase; letter-spacing: 0.5px;">
                            👤 Información del Cliente
                          </h2>
                          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                            <tr>
                              <td style="padding: 8px 0;">
                                <span style="font-weight: 600; color: #6b7280; font-size: 14px;">Nombre:</span>
                                <span style="color: #111827; font-size: 14px; margin-left: 8px;">${orderData.customer.firstName} ${orderData.customer.lastName}</span>
                              </td>
                            </tr>
                            <tr>
                              <td style="padding: 8px 0;">
                                <span style="font-weight: 600; color: #6b7280; font-size: 14px;">Email:</span>
                                <span style="color: #111827; font-size: 14px; margin-left: 8px;">${orderData.customer.email}</span>
                              </td>
                            </tr>
                            <tr>
                              <td style="padding: 8px 0;">
                                <span style="font-weight: 600; color: #6b7280; font-size: 14px;">Teléfono:</span>
                                <span style="color: #111827; font-size: 14px; margin-left: 8px;">${orderData.customer.phone}</span>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>

                    <!-- Shipping Address Card -->
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom: 24px; background-color: #f9fafb; border-radius: 8px; overflow: hidden;">
                      <tr>
                        <td style="padding: 20px;">
                          <h2 style="margin: 0 0 16px 0; font-size: 16px; font-weight: 700; color: #e11d48; text-transform: uppercase; letter-spacing: 0.5px;">
                            📍 Dirección de Envío
                          </h2>
                          <p style="margin: 0 0 6px 0; color: #111827; font-size: 14px; line-height: 1.6;">
                            ${orderData.shippingAddress.address}
                          </p>
                          <p style="margin: 0 0 6px 0; color: #111827; font-size: 14px; line-height: 1.6;">
                            ${orderData.shippingAddress.district}, ${orderData.shippingAddress.city}
                          </p>
                          ${orderData.shippingAddress.postalCode ? `
                          <p style="margin: 0 0 6px 0; color: #6b7280; font-size: 14px;">
                            CP: ${orderData.shippingAddress.postalCode}
                          </p>
                          ` : ''}
                          ${orderData.shippingAddress.reference ? `
                          <p style="margin: 12px 0 0 0; padding: 12px; background-color: #ffffff; border-radius: 6px; color: #111827; font-size: 13px; line-height: 1.6;">
                            <strong style="color: #e11d48;">Referencia:</strong> ${orderData.shippingAddress.reference}
                          </p>
                          ` : ''}
                        </td>
                      </tr>
                    </table>

                    <!-- Products Card -->
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom: 24px; background-color: #ffffff; border: 2px solid #f3f4f6; border-radius: 8px; overflow: hidden;">
                      <tr>
                        <td style="padding: 24px;">
                          <h2 style="margin: 0 0 20px 0; font-size: 16px; font-weight: 700; color: #e11d48; text-transform: uppercase; letter-spacing: 0.5px;">
                            🛍️ Productos Ordenados
                          </h2>

                          ${orderData.items.map((item, index) => `
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom: ${index < orderData.items.length - 1 ? '16px' : '0'}; padding-bottom: ${index < orderData.items.length - 1 ? '16px' : '0'}; border-bottom: ${index < orderData.items.length - 1 ? '1px solid #e5e7eb' : 'none'};">
                              <tr>
                                <td style="vertical-align: top; padding-right: 16px;">
                                  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                    <tr>
                                      <td>
                                        <p style="margin: 0 0 8px 0; font-size: 15px; font-weight: 600; color: #111827; line-height: 1.4;">
                                          ${item.productTitle}
                                        </p>
                                        <p style="margin: 0 0 4px 0; font-size: 13px; color: #6b7280;">
                                          <span style="display: inline-block; padding: 4px 10px; background-color: #f3f4f6; border-radius: 4px; margin-right: 6px; margin-bottom: 4px;">
                                            <strong>Color:</strong> ${item.selectedColor}
                                          </span>
                                          <span style="display: inline-block; padding: 4px 10px; background-color: #f3f4f6; border-radius: 4px; margin-right: 6px; margin-bottom: 4px;">
                                            <strong>Talla:</strong> ${item.selectedSize}
                                          </span>
                                          <span style="display: inline-block; padding: 4px 10px; background-color: #f3f4f6; border-radius: 4px; margin-bottom: 4px;">
                                            <strong>Cant:</strong> ${item.quantity}
                                          </span>
                                        </p>
                                        <p style="margin: 8px 0 0 0; font-size: 14px; color: #6b7280;">
                                          S/ ${item.productPrice.toFixed(2)} × ${item.quantity}
                                        </p>
                                      </td>
                                    </tr>
                                  </table>
                                </td>
                                <td style="text-align: right; vertical-align: top; white-space: nowrap;">
                                  <p style="margin: 0; font-size: 16px; font-weight: 700; color: #111827;">
                                    S/ ${(item.productPrice * item.quantity).toFixed(2)}
                                  </p>
                                </td>
                              </tr>
                            </table>
                          `).join('')}

                          <!-- Totals -->
                          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-top: 24px; padding-top: 20px; border-top: 2px solid #e5e7eb;">
                            <tr>
                              <td style="padding: 8px 0;">
                                <span style="font-size: 14px; color: #6b7280; font-weight: 500;">Subtotal:</span>
                              </td>
                              <td style="text-align: right; padding: 8px 0;">
                                <span style="font-size: 14px; color: #111827; font-weight: 600;">S/ ${orderData.subtotal.toFixed(2)}</span>
                              </td>
                            </tr>
                            <tr>
                              <td style="padding: 8px 0;">
                                <span style="font-size: 14px; color: #6b7280; font-weight: 500;">Envío:</span>
                              </td>
                              <td style="text-align: right; padding: 8px 0;">
                                <span style="font-size: 14px; color: ${orderData.shippingCost === 0 ? '#10b981' : '#111827'}; font-weight: 600;">
                                  ${orderData.shippingCost === 0 ? 'GRATIS 🎉' : `S/ ${orderData.shippingCost.toFixed(2)}`}
                                </span>
                              </td>
                            </tr>
                            <tr>
                              <td style="padding: 16px 0 0 0;">
                                <span style="font-size: 18px; color: #111827; font-weight: 700;">TOTAL:</span>
                              </td>
                              <td style="text-align: right; padding: 16px 0 0 0;">
                                <span style="font-size: 22px; color: #e11d48; font-weight: 700;">S/ ${orderData.total.toFixed(2)}</span>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>

                    <!-- Payment Method & Notes -->
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom: 24px; background-color: #f9fafb; border-radius: 8px; overflow: hidden;">
                      <tr>
                        <td style="padding: 20px;">
                          <h2 style="margin: 0 0 12px 0; font-size: 16px; font-weight: 700; color: #e11d48; text-transform: uppercase; letter-spacing: 0.5px;">
                            💳 Método de Pago
                          </h2>
                          <p style="margin: 0; font-size: 15px; font-weight: 600; color: #111827; padding: 12px; background-color: #ffffff; border-radius: 6px;">
                            ${orderData.paymentMethod === 'culqi' ? '💳 Tarjeta de Crédito/Débito (Culqi)' :
                              '💵 Pago Contra Entrega'}
                          </p>
                          ${orderData.notes ? `
                          <h2 style="margin: 20px 0 12px 0; font-size: 16px; font-weight: 700; color: #e11d48; text-transform: uppercase; letter-spacing: 0.5px;">
                            📝 Notas del Cliente
                          </h2>
                          <p style="margin: 0; font-size: 14px; color: #374151; line-height: 1.6; padding: 12px; background-color: #ffffff; border-radius: 6px;">
                            ${orderData.notes}
                          </p>
                          ` : ''}
                        </td>
                      </tr>
                    </table>

                    <!-- CTA Button -->
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: 32px 0;">
                      <tr>
                        <td align="center">
                          <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'https://vialineperu.com'}/admin/dashboard"
                             style="display: inline-block; padding: 16px 40px; background-color: #e11d48; color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: 700; font-size: 15px; letter-spacing: 0.3px; box-shadow: 0 4px 6px rgba(225, 29, 72, 0.25);">
                            Ver en Dashboard Admin →
                          </a>
                        </td>
                      </tr>
                    </table>

                    <!-- Order Date -->
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                      <tr>
                        <td align="center" style="padding: 16px 0;">
                          <p style="margin: 0; font-size: 13px; color: #9ca3af;">
                            📅 Fecha de orden: ${new Date(orderData.createdAt).toLocaleString('es-PE', {
                              weekday: 'long',
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </p>
                        </td>
                      </tr>
                    </table>

                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td style="background-color: #111827; padding: 30px; text-align: center;">
                    <h3 style="margin: 0 0 8px 0; font-size: 18px; font-weight: 700; color: #ffffff; letter-spacing: 0.5px;">
                      VIALINE
                    </h3>
                    <p style="margin: 0 0 4px 0; font-size: 13px; color: #9ca3af;">
                      Activewear & Fitness
                    </p>
                    <p style="margin: 0 0 16px 0; font-size: 13px; color: #9ca3af;">
                      📱 +51 972 327 236
                    </p>
                    <p style="margin: 0; font-size: 11px; color: #6b7280;">
                      © ${new Date().getFullYear()} Vialine. Todos los derechos reservados.
                    </p>
                  </td>
                </tr>

              </table>
            </td>
          </tr>
        </table>
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
 * Verifica si un email pertenece a un usuario registrado en Supabase Auth
 */
async function isRegisteredUser(email: string): Promise<boolean> {
  try {
    // Import dinámico para evitar problemas con Edge Runtime
    const { createServiceClient } = await import('@/lib/supabase/server')
    const supabase = await createServiceClient()

    // Intentar generar un magic link - si el usuario no existe, dará error
    const { error } = await supabase.auth.admin.generateLink({
      type: 'magiclink',
      email: email,
    })

    // Si no hay error, el usuario existe
    if (!error) {
      return true
    }

    // Si el error indica que el usuario no existe
    if (error.message.includes('User not found')) {
      return false
    }

    // Otro tipo de error, asumimos que existe para no romper el flujo
    console.error("Error verificando usuario:", error)
    return false
  } catch (error) {
    console.error("Error verificando usuario registrado:", error)
    // En caso de error, asumimos que no está registrado (fallback a tracking público)
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
    // ✅ SMART LINK: Detectar si es usuario registrado
    const hasAccount = await isRegisteredUser(orderData.customer.email)
    const trackingUrl = hasAccount
      ? `${process.env.NEXT_PUBLIC_SITE_URL || 'https://vialineperu.com'}/account/pedidos`
      : `${process.env.NEXT_PUBLIC_SITE_URL || 'https://vialineperu.com'}/orden/${orderData.orderId}`

    console.log(`📧 Usuario ${orderData.customer.email} - Cuenta: ${hasAccount ? 'SÍ' : 'NO'} - Link: ${trackingUrl}`)
    const customerEmailHTML = `
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title>Confirmación de Pedido - Vialine</title>
        <!--[if mso]>
        <style type="text/css">
          body, table, td { font-family: Arial, sans-serif !important; }
        </style>
        <![endif]-->
      </head>
      <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5; line-height: 1.6;">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f5f5f5; padding: 40px 0;">
          <tr>
            <td align="center">
              <!-- Main Container -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="max-width: 600px; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.07);">

                <!-- Hero Header -->
                <tr>
                  <td style="background: linear-gradient(135deg, #e11d48 0%, #be123c 100%); padding: 48px 30px; text-align: center;">
                    <h1 style="margin: 0 0 12px 0; font-size: 32px; font-weight: 700; color: #ffffff; letter-spacing: -0.5px;">
                      🎉 ¡Gracias por tu compra!
                    </h1>
                    <p style="margin: 0 0 8px 0; font-size: 15px; color: rgba(255, 255, 255, 0.9);">
                      Hola ${orderData.customer.firstName}, tu pedido está confirmado
                    </p>
                    <p style="margin: 0; font-size: 18px; color: #ffffff; font-weight: 600; background-color: rgba(255, 255, 255, 0.15); display: inline-block; padding: 8px 20px; border-radius: 20px;">
                      Orden #${orderData.orderId}
                    </p>
                  </td>
                </tr>

                <!-- Success Banner -->
                <tr>
                  <td style="padding: 0;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                      <tr>
                        <td style="background: linear-gradient(90deg, #d1fae5 0%, #a7f3d0 100%); border-left: 5px solid #10b981; padding: 24px 30px;">
                          <p style="margin: 0 0 8px 0; font-size: 18px; font-weight: 700; color: #047857;">
                            ✅ Pedido Confirmado
                          </p>
                          <p style="margin: 0; font-size: 14px; color: #065f46; line-height: 1.6;">
                            Hemos recibido tu pedido y lo estamos preparando con mucho cariño. ¡Pronto estará en tus manos!
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Content Padding -->
                <tr>
                  <td style="padding: 32px;">

                    <!-- Products Card -->
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom: 28px; background-color: #ffffff; border: 2px solid #f3f4f6; border-radius: 10px; overflow: hidden;">
                      <tr>
                        <td style="padding: 28px;">
                          <h2 style="margin: 0 0 24px 0; font-size: 18px; font-weight: 700; color: #111827; letter-spacing: -0.3px;">
                            🛍️ Tus Productos
                          </h2>

                          ${orderData.items.map((item, index) => `
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom: ${index < orderData.items.length - 1 ? '20px' : '0'}; padding-bottom: ${index < orderData.items.length - 1 ? '20px' : '0'}; border-bottom: ${index < orderData.items.length - 1 ? '2px solid #f3f4f6' : 'none'};">
                              <tr>
                                <td style="vertical-align: top; padding-right: 16px;">
                                  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                    <tr>
                                      <td>
                                        <p style="margin: 0 0 10px 0; font-size: 16px; font-weight: 700; color: #111827; line-height: 1.4;">
                                          ${item.productTitle}
                                        </p>
                                        <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                                          <tr>
                                            <td style="padding: 6px 12px; background-color: #fce7f3; border-radius: 6px; margin-right: 8px;">
                                              <span style="font-size: 13px; font-weight: 600; color: #9f1239;">
                                                ${item.selectedColor}
                                              </span>
                                            </td>
                                            <td style="padding: 0 8px;"></td>
                                            <td style="padding: 6px 12px; background-color: #f3f4f6; border-radius: 6px; margin-right: 8px;">
                                              <span style="font-size: 13px; font-weight: 600; color: #374151;">
                                                Talla ${item.selectedSize}
                                              </span>
                                            </td>
                                            <td style="padding: 0 8px;"></td>
                                            <td style="padding: 6px 12px; background-color: #f3f4f6; border-radius: 6px;">
                                              <span style="font-size: 13px; font-weight: 600; color: #374151;">
                                                Cant. ${item.quantity}
                                              </span>
                                            </td>
                                          </tr>
                                        </table>
                                      </td>
                                    </tr>
                                  </table>
                                </td>
                                <td style="text-align: right; vertical-align: top; white-space: nowrap;">
                                  <p style="margin: 0; font-size: 18px; font-weight: 700; color: #e11d48;">
                                    S/ ${(item.productPrice * item.quantity).toFixed(2)}
                                  </p>
                                </td>
                              </tr>
                            </table>
                          `).join('')}

                          <!-- Totals -->
                          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-top: 28px; padding-top: 24px; border-top: 3px solid #e5e7eb;">
                            <tr>
                              <td style="padding: 10px 0;">
                                <span style="font-size: 15px; color: #6b7280; font-weight: 500;">Subtotal</span>
                              </td>
                              <td style="text-align: right; padding: 10px 0;">
                                <span style="font-size: 15px; color: #111827; font-weight: 600;">S/ ${orderData.subtotal.toFixed(2)}</span>
                              </td>
                            </tr>
                            <tr>
                              <td style="padding: 10px 0;">
                                <span style="font-size: 15px; color: #6b7280; font-weight: 500;">Envío</span>
                              </td>
                              <td style="text-align: right; padding: 10px 0;">
                                <span style="font-size: 15px; color: ${orderData.shippingCost === 0 ? '#10b981' : '#111827'}; font-weight: 700;">
                                  ${orderData.shippingCost === 0 ? '¡GRATIS! 🎉' : `S/ ${orderData.shippingCost.toFixed(2)}`}
                                </span>
                              </td>
                            </tr>
                            <tr>
                              <td style="padding: 20px 0 0 0; border-top: 2px solid #e5e7eb;">
                                <span style="font-size: 20px; color: #111827; font-weight: 700;">Total Pagado</span>
                              </td>
                              <td style="text-align: right; padding: 20px 0 0 0; border-top: 2px solid #e5e7eb;">
                                <span style="font-size: 26px; color: #e11d48; font-weight: 700;">S/ ${orderData.total.toFixed(2)}</span>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>

                    <!-- Shipping Address Card -->
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom: 28px; background-color: #f9fafb; border-radius: 10px; overflow: hidden;">
                      <tr>
                        <td style="padding: 24px;">
                          <h2 style="margin: 0 0 16px 0; font-size: 16px; font-weight: 700; color: #111827; letter-spacing: -0.2px;">
                            📍 Enviaremos a
                          </h2>
                          <p style="margin: 0 0 6px 0; color: #374151; font-size: 15px; line-height: 1.6; font-weight: 500;">
                            ${orderData.shippingAddress.address}
                          </p>
                          <p style="margin: 0; color: #374151; font-size: 15px; line-height: 1.6; font-weight: 500;">
                            ${orderData.shippingAddress.district}, ${orderData.shippingAddress.city}
                          </p>
                        </td>
                      </tr>
                    </table>

                    <!-- What's Next Card -->
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom: 28px; background: linear-gradient(135deg, #fce7f3 0%, #fbcfe8 100%); border-radius: 10px; overflow: hidden;">
                      <tr>
                        <td style="padding: 28px;">
                          <h2 style="margin: 0 0 20px 0; font-size: 18px; font-weight: 700; color: #9f1239; letter-spacing: -0.3px;">
                            ✨ ¿Qué sigue ahora?
                          </h2>
                          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                            <tr>
                              <td style="padding: 12px 0;">
                                <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                                  <tr>
                                    <td style="vertical-align: top; padding-right: 12px;">
                                      <span style="font-size: 24px;">📦</span>
                                    </td>
                                    <td>
                                      <p style="margin: 0; font-size: 15px; color: #881337; line-height: 1.6;">
                                        <strong>Preparamos tu pedido</strong><br>
                                        <span style="color: #9f1239;">Con amor y dedicación para ti</span>
                                      </p>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                            <tr>
                              <td style="padding: 12px 0;">
                                <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                                  <tr>
                                    <td style="vertical-align: top; padding-right: 12px;">
                                      <span style="font-size: 24px;">📱</span>
                                    </td>
                                    <td>
                                      <p style="margin: 0; font-size: 15px; color: #881337; line-height: 1.6;">
                                        <strong>Te contactamos</strong><br>
                                        <span style="color: #9f1239;">Por WhatsApp al ${orderData.customer.phone}</span>
                                      </p>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                            <tr>
                              <td style="padding: 12px 0;">
                                <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                                  <tr>
                                    <td style="vertical-align: top; padding-right: 12px;">
                                      <span style="font-size: 24px;">🚚</span>
                                    </td>
                                    <td>
                                      <p style="margin: 0; font-size: 15px; color: #881337; line-height: 1.6;">
                                        <strong>Enviamos tu pedido</strong><br>
                                        <span style="color: #9f1239;">Lima 24-48h • Provincias 3-7 días</span>
                                      </p>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>

                    <!-- Tracking CTA -->
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: 32px 0 16px 0;">
                      <tr>
                        <td align="center">
                          <a href="${trackingUrl}"
                             style="display: inline-block; padding: 18px 40px; background-color: #e11d48; color: #ffffff; text-decoration: none; border-radius: 10px; font-weight: 700; font-size: 16px; box-shadow: 0 4px 6px rgba(225, 29, 72, 0.3);">
                            ${hasAccount ? '📋 Ver mis pedidos' : '📦 Seguir mi pedido'}
                          </a>
                        </td>
                      </tr>
                    </table>

                    <!-- WhatsApp CTA -->
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: 16px 0 32px 0;">
                      <tr>
                        <td align="center">
                          <a href="https://wa.me/51972327236?text=Hola,%20tengo%20una%20consulta%20sobre%20mi%20orden%20%23${orderData.orderId}"
                             style="display: inline-block; padding: 18px 36px; background-color: #25D366; color: #ffffff; text-decoration: none; border-radius: 10px; font-weight: 700; font-size: 16px; box-shadow: 0 4px 6px rgba(37, 211, 102, 0.3);">
                            💬 ¿Dudas? Chatea con nosotros
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <td align="center" style="padding-top: 16px;">
                          <p style="margin: 0; font-size: 14px; color: #6b7280;">
                            WhatsApp: +51 972 327 236
                          </p>
                        </td>
                      </tr>
                    </table>

                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td style="background-color: #111827; padding: 36px; text-align: center;">
                    <h3 style="margin: 0 0 8px 0; font-size: 20px; font-weight: 700; color: #ffffff; letter-spacing: 1px;">
                      VIALINE
                    </h3>
                    <p style="margin: 0 0 4px 0; font-size: 14px; color: #d1d5db;">
                      Activewear & Fitness
                    </p>
                    <p style="margin: 0 0 20px 0; font-size: 14px; color: #d1d5db;">
                      📱 +51 972 327 236
                    </p>
                    <p style="margin: 0 0 8px 0; font-size: 13px; color: #9ca3af;">
                      Gracias por confiar en nosotros 💕
                    </p>
                    <p style="margin: 0; font-size: 12px; color: #6b7280;">
                      © ${new Date().getFullYear()} Vialine. Todos los derechos reservados.
                    </p>
                  </td>
                </tr>

              </table>
            </td>
          </tr>
        </table>
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