import { NextRequest, NextResponse } from "next/server"
import { sql } from "@vercel/postgres"
import bcrypt from "bcryptjs"

/**
 * POST /api/auth/reset-password
 * Restablece la contraseña del usuario usando el token
 */
export async function POST(request: NextRequest) {
  try {
    const { token, password } = await request.json()

    if (!token || !password) {
      return NextResponse.json(
        { error: "Token y contraseña son requeridos" },
        { status: 400 }
      )
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "La contraseña debe tener al menos 6 caracteres" },
        { status: 400 }
      )
    }

    // Buscar usuario con ese token
    const result = await sql`
      SELECT id, reset_token_expiry
      FROM users
      WHERE reset_token = ${token}
      LIMIT 1
    `

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: "Token inválido" },
        { status: 400 }
      )
    }

    const user = result.rows[0]
    const expiryDate = new Date(user.reset_token_expiry)
    const now = new Date()

    // Verificar si el token ha expirado
    if (expiryDate < now) {
      return NextResponse.json(
        { error: "Este enlace ha expirado. Por favor solicita uno nuevo." },
        { status: 400 }
      )
    }

    // Hashear la nueva contraseña
    const hashedPassword = await bcrypt.hash(password, 10)

    // Actualizar contraseña y eliminar token
    await sql`
      UPDATE users
      SET password = ${hashedPassword},
          reset_token = NULL,
          reset_token_expiry = NULL
      WHERE id = ${user.id}
    `

    console.log(`✅ Contraseña actualizada para usuario ${user.id}`)

    return NextResponse.json({
      success: true,
      message: "Contraseña actualizada correctamente",
    })
  } catch (error) {
    console.error("Error resetting password:", error)
    return NextResponse.json(
      { error: "Error al restablecer contraseña" },
      { status: 500 }
    )
  }
}
