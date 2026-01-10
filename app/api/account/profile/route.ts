// app/api/account/profile/route.ts
import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

// ====================================
// PATCH - ACTUALIZAR PERFIL DEL USUARIO (Supabase Auth)
// ====================================
export async function PATCH(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user?.id) {
      return NextResponse.json({ error: "No autenticado" }, { status: 401 })
    }

    const body = await request.json()
    const { name } = body

    // Validaciones
    if (!name || !name.trim()) {
      return NextResponse.json({ error: "El nombre es requerido" }, { status: 400 })
    }

    // Actualizar user metadata en Supabase Auth
    const { error: updateError } = await supabase.auth.updateUser({
      data: {
        full_name: name.trim(),
        name: name.trim()
      }
    })

    if (updateError) {
      console.error("Error actualizando perfil:", updateError)
      return NextResponse.json(
        { error: "Error al actualizar perfil" },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: "Perfil actualizado correctamente",
    })
  } catch (error) {
    console.error("❌ Error en PATCH /api/account/profile:", error)
    return NextResponse.json(
      { error: "Error al actualizar perfil" },
      { status: 500 }
    )
  }
}
