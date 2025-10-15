/**
 * Integración con Brevo (antes Sendinblue)
 * Documentación: https://developers.brevo.com/
 */

export type SubscribeResult = {
  success: boolean
  message: string
  couponCode?: string
}

/**
 * Suscribe un email a la newsletter de Brevo
 * @param email - Email del usuario
 * @param firstName - Nombre del usuario (opcional)
 * @returns Resultado de la suscripción
 */
export async function subscribeToNewsletter(
  email: string,
  firstName?: string
): Promise<SubscribeResult> {
  try {
    // Validar email
    if (!email || !isValidEmail(email)) {
      return {
        success: false,
        message: "Por favor ingresa un email válido",
      }
    }

    // Obtener API key desde variables de entorno
    const apiKey = process.env.NEXT_PUBLIC_BREVO_API_KEY

    if (!apiKey) {
      console.error("BREVO API KEY not found")
      return {
        success: false,
        message: "Error de configuración. Por favor contacta soporte.",
      }
    }

    // Llamar a la API de Brevo
    const response = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        "accept": "application/json",
        "api-key": apiKey,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email,
        attributes: {
          FIRSTNAME: firstName || "",
          SOURCE: "popup-website",
          SIGNUP_DATE: new Date().toISOString().split("T")[0], // YYYY-MM-DD
        },
        listIds: [2], // ID de la lista "Newsletter Subscribers" en Brevo
        updateEnabled: true, // Actualizar si ya existe
      }),
    })

    // Manejar respuestas
    if (response.ok) {
      return {
        success: true,
        message: "¡Bienvenida! Revisa tu email para el cupón de 10% OFF",
        couponCode: "BIENVENIDA10",
      }
    }

    // Si el contacto ya existe (código 400)
    if (response.status === 400) {
      const error = await response.json()
      if (error.code === "duplicate_parameter") {
        return {
          success: true,
          message: "Ya estás suscrita. Revisa tu email para el cupón",
          couponCode: "BIENVENIDA10",
        }
      }
    }

    // Otros errores
    console.error("Brevo API error:", response.status, await response.text())
    return {
      success: false,
      message: "Ocurrió un error. Por favor intenta nuevamente.",
    }
  } catch (error) {
    console.error("Newsletter subscription error:", error)
    return {
      success: false,
      message: "Error de conexión. Verifica tu internet e intenta nuevamente.",
    }
  }
}

/**
 * Valida formato de email
 */
function isValidEmail(email: string): boolean {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return regex.test(email)
}

/**
 * Obtener estadísticas de la newsletter (opcional)
 * Solo para uso interno/admin
 */
export async function getNewsletterStats() {
  try {
    const apiKey = process.env.NEXT_PUBLIC_BREVO_API_KEY
    if (!apiKey) return null

    const response = await fetch("https://api.brevo.com/v3/contacts/lists/2", {
      headers: {
        "accept": "application/json",
        "api-key": apiKey,
      },
    })

    if (response.ok) {
      const data = await response.json()
      return {
        totalSubscribers: data.totalSubscribers || 0,
        totalBlacklisted: data.totalBlacklisted || 0,
      }
    }

    return null
  } catch (error) {
    console.error("Error fetching newsletter stats:", error)
    return null
  }
}