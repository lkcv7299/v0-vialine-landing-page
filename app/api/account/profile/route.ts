// app/api/account/profile/route.ts
import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { sql } from "@vercel/postgres"

// ====================================
// PATCH - ACTUALIZAR PERFIL DEL USUARIO
// ====================================
export async function PATCH(request: NextRequest) {
  try {
    const session = await auth()

    if (!session || !session.user?.id) {
      return NextResponse.json({ error: "No autenticado" }, { status: 401 })
    }

    const userId = session.user.id
    const body = await request.json()
    const { name, email } = body

    // Validaciones
    if (!name || !name.trim()) {
      return NextResponse.json({ error: "El nombre es requerido" }, { status: 400 })
    }

    if (!email || !email.trim()) {
      return NextResponse.json({ error: "El email es requerido" }, { status: 400 })
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Email inválido" }, { status: 400 })
    }

    // Verificar si el email ya está en uso por otro usuario
    const existingUser = await sql`
      SELECT id FROM users
      WHERE email = ${email.toLowerCase()}
      AND id != ${userId}
      LIMIT 1
    `

    if (existingUser.rows.length > 0) {
      return NextResponse.json(
        { error: "Este email ya está en uso" },
        { status: 400 }
      )
    }

    // Actualizar usuario
    await sql`
      UPDATE users
      SET 
        name = ${name.trim()},
        email = ${email.toLowerCase()},
        updated_at = NOW()
      WHERE id = ${userId}
    `

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