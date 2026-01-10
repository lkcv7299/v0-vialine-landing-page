/**
 * EMAILS DE ACTUALIZACIÓN DE ESTADO
 * Envía notificaciones cuando el estado de una orden cambia
 */

type OrderStatusEmailData = {
  orderId: string
  customerName: string
  customerEmail: string
  status: string
  trackingUrl: string
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
    return false
  }
}

export async function sendOrderStatusEmail(data: OrderStatusEmailData): Promise<boolean> {
  const BREVO_API_KEY = process.env.BREVO_API_KEY || process.env.NEXT_PUBLIC_BREVO_API_KEY

  if (!BREVO_API_KEY) {
    console.error("❌ BREVO_API_KEY no configurada")
    return false
  }

  // Configuración de estado
  const statusConfig: Record<string, { title: string; message: string; color: string }> = {
    paid: {
      title: "¡Pago Confirmado!",
      message: "Tu pago ha sido confirmado exitosamente. Ahora comenzaremos a preparar tu pedido.",
      color: "#10b981"
    },
    processing: {
      title: "Preparando tu Pedido",
      message: "Estamos preparando tu pedido con mucho cuidado. Pronto estará listo para el envío.",
      color: "#3b82f6"
    },
    shipped: {
      title: "¡Pedido Enviado!",
      message: "Tu pedido está en camino. Recibirás una llamada para coordinar la entrega.",
      color: "#8b5cf6"
    },
    delivered: {
      title: "¡Pedido Entregado!",
      message: "Tu pedido ha sido entregado exitosamente. ¡Esperamos que disfrutes tus productos!",
      color: "#10b981"
    },
    cancelled: {
      title: "Pedido Cancelado",
      message: "Tu pedido ha sido cancelado. Si tienes alguna duda, contáctanos por WhatsApp.",
      color: "#ef4444"
    }
  }

  const config = statusConfig[data.status] || statusConfig.processing

  try {
    console.log(`📧 Enviando email de actualización - Orden ${data.orderId} - Estado: ${data.status}`)

    // ✅ SMART LINK: Detectar si es usuario registrado
    const hasAccount = await isRegisteredUser(data.customerEmail)
    const smartTrackingUrl = hasAccount
      ? `${process.env.NEXT_PUBLIC_SITE_URL || 'https://vialineperu.com'}/account/pedidos`
      : data.trackingUrl // Ya viene con /orden/[orderId]

    console.log(`📧 Usuario ${data.customerEmail} - Cuenta: ${hasAccount ? 'SÍ' : 'NO'} - Link: ${smartTrackingUrl}`)

    const emailHTML = `
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title>Actualización de Pedido - Vialine</title>
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
                  <td style="background: linear-gradient(135deg, ${config.color} 0%, ${config.color}dd 100%); padding: 48px 30px; text-align: center;">
                    <h1 style="margin: 0 0 16px 0; font-size: 32px; font-weight: 700; color: #ffffff; letter-spacing: -0.5px;">
                      ${config.title}
                    </h1>
                    <p style="margin: 0 0 4px 0; font-size: 14px; color: rgba(255, 255, 255, 0.8); text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">
                      Orden
                    </p>
                    <p style="margin: 0; font-size: 24px; color: #ffffff; font-weight: 700; background-color: rgba(255, 255, 255, 0.15); display: inline-block; padding: 10px 24px; border-radius: 8px;">
                      #${data.orderId}
                    </p>
                  </td>
                </tr>

                <!-- Content Padding -->
                <tr>
                  <td style="padding: 40px 32px;">

                    <!-- Status Message Card -->
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom: 32px; background-color: #ffffff; border: 3px solid ${config.color}; border-radius: 12px; overflow: hidden;">
                      <tr>
                        <td style="padding: 32px; text-align: center;">
                          <p style="margin: 0 0 16px 0; font-size: 20px; font-weight: 700; color: #111827; line-height: 1.4;">
                            ${config.message}
                          </p>
                          ${data.status === 'delivered' ? `
                          <p style="margin: 0; font-size: 48px;">🎉</p>
                          ` : data.status === 'shipped' ? `
                          <p style="margin: 0; font-size: 48px;">📦</p>
                          ` : data.status === 'processing' ? `
                          <p style="margin: 0; font-size: 48px;">⚡</p>
                          ` : data.status === 'paid' ? `
                          <p style="margin: 0; font-size: 48px;">✅</p>
                          ` : ''}
                        </td>
                      </tr>
                    </table>

                    ${data.status === "shipped" ? `
                    <!-- Shipping Info Card -->
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom: 32px; background: linear-gradient(135deg, #ede9fe 0%, #ddd6fe 100%); border-radius: 10px; overflow: hidden;">
                      <tr>
                        <td style="padding: 28px;">
                          <h2 style="margin: 0 0 20px 0; font-size: 18px; font-weight: 700; color: #5b21b6; letter-spacing: -0.3px;">
                            📦 Información de Envío
                          </h2>
                          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                            <tr>
                              <td style="padding: 12px 0;">
                                <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                                  <tr>
                                    <td style="vertical-align: top; padding-right: 12px;">
                                      <span style="font-size: 24px;">🏙️</span>
                                    </td>
                                    <td>
                                      <p style="margin: 0; font-size: 15px; color: #6b21a8; line-height: 1.6;">
                                        <strong>Lima:</strong> 24-48 horas
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
                                      <span style="font-size: 24px;">🗺️</span>
                                    </td>
                                    <td>
                                      <p style="margin: 0; font-size: 15px; color: #6b21a8; line-height: 1.6;">
                                        <strong>Provincias:</strong> 3-7 días hábiles
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
                                      <p style="margin: 0; font-size: 15px; color: #6b21a8; line-height: 1.6;">
                                        Te contactaremos por teléfono o WhatsApp para coordinar la entrega.
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
                    ` : ''}

                    <!-- CTA Button -->
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: 32px 0;">
                      <tr>
                        <td align="center">
                          <a href="${smartTrackingUrl}"
                             style="display: inline-block; padding: 18px 40px; background-color: ${config.color}; color: #ffffff; text-decoration: none; border-radius: 10px; font-weight: 700; font-size: 16px; letter-spacing: 0.3px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.15);">
                            ${hasAccount ? '📋 Ver mis pedidos →' : '📦 Ver estado de mi pedido →'}
                          </a>
                        </td>
                      </tr>
                    </table>

                    <!-- Divider -->
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: 40px 0 32px 0;">
                      <tr>
                        <td style="border-top: 2px solid #e5e7eb;"></td>
                      </tr>
                    </table>

                    <!-- WhatsApp Contact -->
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                      <tr>
                        <td align="center">
                          <p style="margin: 0 0 16px 0; font-size: 15px; color: #6b7280; font-weight: 500;">
                            ¿Necesitas ayuda con tu pedido?
                          </p>
                          <a href="https://wa.me/51972327236?text=Hola,%20tengo%20una%20consulta%20sobre%20mi%20orden%20%23${data.orderId}"
                             style="display: inline-block; padding: 16px 32px; background-color: #25D366; color: #ffffff; text-decoration: none; border-radius: 10px; font-weight: 700; font-size: 15px; box-shadow: 0 4px 6px rgba(37, 211, 102, 0.3);">
                            📱 Contactar por WhatsApp
                          </a>
                          <p style="margin: 12px 0 0 0; font-size: 13px; color: #9ca3af;">
                            +51 972 327 236
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
                      Gracias por elegirnos 💕
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
            email: data.customerEmail,
            name: data.customerName
          }
        ],
        subject: `Vialine - ${config.title} - Orden #${data.orderId}`,
        htmlContent: emailHTML
      })
    })

    if (response.ok) {
      console.log(`✅ Email de estado enviado - Orden ${data.orderId}`)
      return true
    } else {
      const errorData = await response.json()
      console.error("❌ Error enviando email de estado:", errorData)
      return false
    }

  } catch (error) {
    console.error("❌ Error en sendOrderStatusEmail:", error)
    return false
  }
}