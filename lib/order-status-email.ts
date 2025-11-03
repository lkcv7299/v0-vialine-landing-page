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

    const emailHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
          .container { max-width: 600px; margin: 0 auto; }
          .header { background: ${config.color}; color: white; padding: 40px 20px; text-align: center; }
          .header h1 { margin: 0; font-size: 28px; }
          .content { background: #f9fafb; padding: 40px 20px; }
          .card { background: white; border-radius: 12px; padding: 30px; margin: 20px 0; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
          .order-number { font-size: 24px; font-weight: bold; color: #111827; margin: 20px 0; text-align: center; }
          .message { font-size: 16px; color: #4b5563; text-align: center; margin: 20px 0; line-height: 1.8; }
          .button { display: inline-block; background: ${config.color}; color: white; padding: 14px 32px; text-decoration: none; border-radius: 8px; font-weight: bold; margin: 20px 0; }
          .info-box { background: #f3f4f6; border-left: 4px solid ${config.color}; padding: 20px; margin: 20px 0; border-radius: 4px; }
          .footer { text-align: center; padding: 30px 20px; color: #6b7280; font-size: 14px; }
          .whatsapp-btn { display: inline-block; background: #25D366; color: white; padding: 12px 28px; text-decoration: none; border-radius: 8px; font-weight: bold; margin: 10px 0; }
          @media only screen and (max-width: 600px) {
            .content { padding: 20px 10px; }
            .card { padding: 20px; }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <!-- Header -->
          <div class="header">
            <h1>${config.title}</h1>
          </div>

          <!-- Content -->
          <div class="content">
            <div class="card">
              <p style="margin: 0 0 10px 0; color: #6b7280; text-align: center;">Orden</p>
              <div class="order-number">#${data.orderId}</div>
              
              <div class="message">
                ${config.message}
              </div>

              ${data.status === "shipped" ? `
                <div class="info-box">
                  <p style="margin: 0; font-weight: bold; color: #111827;">📦 Información de Envío</p>
                  <p style="margin: 10px 0 0 0; color: #4b5563;">
                    <strong>Lima:</strong> 24-48 horas<br>
                    <strong>Provincias:</strong> 3-7 días hábiles<br>
                    <br>
                    Te contactaremos por teléfono o WhatsApp para coordinar la entrega.
                  </p>
                </div>
              ` : ''}

              <div style="text-align: center; margin-top: 30px;">
                <a href="${data.trackingUrl}" class="button">
                  Ver Estado de mi Pedido
                </a>
              </div>
            </div>

            <!-- WhatsApp Contact -->
            <div style="text-align: center; margin-top: 20px;">
              <p style="color: #6b7280; margin-bottom: 10px;">¿Necesitas ayuda?</p>
              <a href="https://wa.me/51972327236" class="whatsapp-btn">
                📱 Contactar por WhatsApp
              </a>
            </div>
          </div>

          <!-- Footer -->
          <div class="footer">
            <p style="margin: 0 0 10px 0;"><strong>Vialine</strong></p>
            <p style="margin: 0 0 5px 0;">Activewear & Fitness</p>
            <p style="margin: 0;">+51 972 327 236</p>
            <p style="margin: 10px 0 0 0; font-size: 12px; color: #9ca3af;">
              © ${new Date().getFullYear()} Vialine. Todos los derechos reservados.
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