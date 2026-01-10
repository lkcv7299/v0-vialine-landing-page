// app/api/auth/check-email/route.ts
import { NextRequest, NextResponse } from "next/server"
import { createServiceClient } from "@/lib/supabase/server"

/**
 * POST /api/auth/check-email
 * Verifica si un email existe en Supabase Auth
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

    // Buscar usuario por email usando Admin API
    const { data, error } = await supabase.auth.admin.listUsers({
      page: 1,
      perPage: 1,
    })

    if (error) {
      console.error("Error checking email:", error)
      return NextResponse.json(
        { error: "Error al verificar email" },
        { status: 500 }
      )
    }

    // Buscar específicamente el email
    const userExists = data.users.some(
      (user) => user.email?.toLowerCase() === email.toLowerCase()
    )

    // Si no encontramos en la primera página, buscar directamente
    if (!userExists && data.users.length > 0) {
      // Intentar buscar directamente por email
      // Nota: listUsers no tiene filtro por email, así que usamos generateLink como workaround
      try {
        const { error: linkError } = await supabase.auth.admin.generateLink({
          type: 'magiclink',
          email: email,
        })

        // Si no hay error, el usuario existe
        if (!linkError) {
          return NextResponse.json({ exists: true })
        }

        // Si el error es "User not found", el usuario no existe
        if (linkError.message.includes('User not found')) {
          return NextResponse.json({ exists: false })
        }
      } catch {
        // Ignorar errores y asumir que no existe
      }
    }

    return NextResponse.json({
      exists: userExists,
    })
  } catch (error) {
    console.error("Error checking email:", error)
    return NextResponse.json(
      { error: "Error al verificar email" },
      { status: 500 }
    )
  }
}
