// app/api/account/change-password/route.ts
import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

// ====================================
// POST - CAMBIAR CONTRASEÑA (Supabase Auth)
// ====================================
export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user?.id) {
      return NextResponse.json({ error: "No autenticado" }, { status: 401 })
    }

    const body = await request.json()
    const { newPassword } = body

    // Validaciones
    if (!newPassword) {
      return NextResponse.json(
        { error: "La nueva contraseña es requerida" },
        { status: 400 }
      )
    }

    if (newPassword.length < 6) {
      return NextResponse.json(
        { error: "La nueva contraseña debe tener al menos 6 caracteres" },
        { status: 400 }
      )
    }

    // Verificar que no sea usuario OAuth (sin identidad de email)
    const emailIdentity = user.identities?.find(id => id.provider === 'email')
    if (!emailIdentity && user.app_metadata?.provider !== 'email') {
      return NextResponse.json(
        { error: "Esta cuenta usa autenticación externa (Google). No puedes cambiar la contraseña." },
        { status: 400 }
      )
    }

    // Actualizar contraseña usando Supabase Auth
    const { error: updateError } = await supabase.auth.updateUser({
      password: newPassword
    })

    if (updateError) {
      console.error("Error cambiando contraseña:", updateError)

      // Manejar errores específicos de Supabase
      if (updateError.message.includes('same password')) {
        return NextResponse.json(
          { error: "La nueva contraseña debe ser diferente a la actual" },
          { status: 400 }
        )
      }

      return NextResponse.json(
        { error: "Error al cambiar contraseña" },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: "Contraseña actualizada correctamente",
    })
  } catch (error) {
    console.error("❌ Error en POST /api/account/change-password:", error)
    return NextResponse.json(
      { error: "Error al cambiar contraseña" },
      { status: 500 }
    )
  }
}
