// app/api/auth/forgot-password/route.ts
import { NextRequest, NextResponse } from "next/server"
import { createServiceClient } from "@/lib/supabase/server"

/**
 * POST /api/auth/forgot-password
 * Envía email de recuperación de contraseña usando Supabase Auth + Brevo
 */
export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json(
        { error: "Email es requerido" },
        { status: 400 }
      )
    }

    const supabase = await createServiceClient()

    // Generar link de recuperación usando Supabase Auth Admin
    const { data, error } = await supabase.auth.admin.generateLink({
      type: 'recovery',
      email: email,
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/auth/callback?next=/restablecer-contrasena`
      }
    })

    if (error) {
      // Si el usuario no existe, Supabase devuelve un error
      if (error.message.includes('User not found')) {
        return NextResponse.json(
          { error: "Este email no está registrado" },
          { status: 404 }
        )
      }
      console.error("Error generando link de recuperación:", error)
      return NextResponse.json(
        { error: "Error al procesar la solicitud" },
        { status: 500 }
      )
    }

    // Obtener el nombre del usuario si está disponible
    const userName = data.user?.user_metadata?.full_name ||
                     data.user?.user_metadata?.name ||
                     'Usuario'

    // Enviar email con Brevo usando nuestro template personalizado
    const BREVO_API_KEY = process.env.BREVO_API_KEY || process.env.NEXT_PUBLIC_BREVO_API_KEY

    if (!BREVO_API_KEY) {
      console.error("❌ BREVO_API_KEY no configurada")
      return NextResponse.json(
        { error: "Servicio de email no configurado" },
        { status: 500 }
      )
    }

    // El link generado por Supabase
    const resetUrl = data.properties?.action_link

    if (!resetUrl) {
      console.error("❌ No se pudo generar el link de recuperación")
      return NextResponse.json(
        { error: "Error al generar enlace de recuperación" },
        { status: 500 }
      )
    }

    const emailHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f5f5f5;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 20px;">
          <tr>
            <td align="center">
              <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">

                <!-- Header -->
                <tr>
                  <td style="background: linear-gradient(135deg, #e11d48 0%, #be123c 100%); padding: 40px 20px; text-align: center;">
                    <h1 style="color: #ffffff; margin: 0; font-size: 28px;">Vialine</h1>
                    <p style="color: #ffffff; margin: 10px 0 0 0; font-size: 16px;">Recuperación de contraseña</p>
                  </td>
                </tr>

                <!-- Content -->
                <tr>
                  <td style="padding: 40px 30px;">
                    <h2 style="color: #1f2937; margin: 0 0 20px 0; font-size: 24px;">
                      Hola ${userName},
                    </h2>
                    <p style="color: #4b5563; margin: 0 0 20px 0; font-size: 16px; line-height: 1.6;">
                      Recibimos una solicitud para restablecer la contraseña de tu cuenta en Vialine.
                    </p>
                    <p style="color: #4b5563; margin: 0 0 30px 0; font-size: 16px; line-height: 1.6;">
                      Haz clic en el botón de abajo para crear una nueva contraseña:
                    </p>

                    <!-- CTA Button -->
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td align="center" style="padding: 20px 0;">
                          <a href="${resetUrl}" style="display: inline-block; background-color: #e11d48; color: #ffffff; text-decoration: none; padding: 14px 40px; border-radius: 6px; font-size: 16px; font-weight: 600;">
                            Restablecer contraseña
                          </a>
                        </td>
                      </tr>
                    </table>

                    <p style="color: #6b7280; margin: 30px 0 0 0; font-size: 14px; line-height: 1.6;">
                      O copia y pega este enlace en tu navegador:
                    </p>
                    <p style="color: #e11d48; margin: 10px 0 0 0; font-size: 14px; word-break: break-all;">
                      ${resetUrl}
                    </p>

                    <div style="margin-top: 40px; padding-top: 30px; border-top: 1px solid #e5e7eb;">
                      <p style="color: #6b7280; margin: 0; font-size: 14px; line-height: 1.6;">
                        <strong>⚠️ Importante:</strong> Este enlace expirará en 1 hora.
                      </p>
                      <p style="color: #6b7280; margin: 15px 0 0 0; font-size: 14px; line-height: 1.6;">
                        Si no solicitaste restablecer tu contraseña, ignora este email y tu contraseña no cambiará.
                      </p>
                    </div>
                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td style="background-color: #f9fafb; padding: 30px; text-align: center; border-top: 1px solid #e5e7eb;">
                    <p style="color: #6b7280; margin: 0 0 10px 0; font-size: 14px;">
                      © ${new Date().getFullYear()} Vialine. Todos los derechos reservados.
                    </p>
                    <p style="color: #9ca3af; margin: 0; font-size: 12px;">
                      Lima, Perú
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

    // Enviar email con Brevo
    const brevoResponse = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "api-key": BREVO_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sender: {
          name: "Vialine",
          email: "no-reply@vialineperu.com",
        },
        to: [
          {
            email: email,
            name: userName,
          },
        ],
        subject: "Recuperación de contraseña - Vialine",
        htmlContent: emailHTML,
      }),
    })

    if (!brevoResponse.ok) {
      console.error("Error enviando email:", await brevoResponse.text())
      return NextResponse.json(
        { error: "Error al enviar el email" },
        { status: 500 }
      )
    }

    console.log(`✅ Email de recuperación enviado a ${email}`)

    return NextResponse.json({
      success: true,
      message: "Email de recuperación enviado",
    })
  } catch (error) {
    console.error("Error en forgot-password:", error)
    return NextResponse.json(
      { error: "Error al procesar la solicitud" },
      { status: 500 }
    )
  }
}
