import { NextRequest, NextResponse } from "next/server"
import { sql } from "@vercel/postgres"

/**
 * POST /api/auth/validate-reset-token
 * Valida si un token de recuperación es válido y no ha expirado
 */
export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json()

    if (!token) {
      return NextResponse.json(
        { valid: false, error: "Token requerido" },
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
      return NextResponse.json({ valid: false })
    }

    const user = result.rows[0]
    const expiryDate = new Date(user.reset_token_expiry)
    const now = new Date()

    // Verificar si el token ha expirado
    if (expiryDate < now) {
      return NextResponse.json({ valid: false, error: "Token expirado" })
    }

    return NextResponse.json({ valid: true })
  } catch (error) {
    console.error("Error validating token:", error)
    return NextResponse.json(
      { valid: false, error: "Error al validar token" },
      { status: 500 }
    )
  }
}
