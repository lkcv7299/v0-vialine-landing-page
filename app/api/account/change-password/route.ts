// app/api/account/change-password/route.ts
import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { sql } from "@vercel/postgres"
import bcrypt from "bcryptjs"

// ====================================
// POST - CAMBIAR CONTRASEÑA
// ====================================
export async function POST(request: NextRequest) {
  try {
    const session = await auth()

    if (!session || !session.user?.id) {
      return NextResponse.json({ error: "No autenticado" }, { status: 401 })
    }

    const userId = session.user.id
    const body = await request.json()
    const { currentPassword, newPassword } = body

    // Validaciones
    if (!currentPassword) {
      return NextResponse.json(
        { error: "La contraseña actual es requerida" },
        { status: 400 }
      )
    }

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

    if (currentPassword === newPassword) {
      return NextResponse.json(
        { error: "La nueva contraseña debe ser diferente a la actual" },
        { status: 400 }
      )
    }

    // Obtener usuario con contraseña hasheada
    const userResult = await sql`
      SELECT id, password
      FROM users
      WHERE id = ${userId}
      LIMIT 1
    `

    if (userResult.rows.length === 0) {
      return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 })
    }

    const user = userResult.rows[0]

    // Verificar que el usuario tenga contraseña (no OAuth)
    if (!user.password) {
      return NextResponse.json(
        { error: "Esta cuenta usa autenticación externa (Google). No puedes cambiar la contraseña." },
        { status: 400 }
      )
    }

    // Verificar contraseña actual
    const isPasswordCorrect = await bcrypt.compare(currentPassword, user.password)

    if (!isPasswordCorrect) {
      return NextResponse.json(
        { error: "La contraseña actual es incorrecta" },
        { status: 401 }
      )
    }

    // Hashear nueva contraseña
    const hashedPassword = await bcrypt.hash(newPassword, 10)

    // Actualizar contraseña
    await sql`
      UPDATE users
      SET 
        password = ${hashedPassword},
        updated_at = NOW()
      WHERE id = ${userId}
    `

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