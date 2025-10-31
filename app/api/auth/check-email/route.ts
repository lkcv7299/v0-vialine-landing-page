import { NextRequest, NextResponse } from "next/server"
import { sql } from "@vercel/postgres"

/**
 * POST /api/auth/check-email
 * Verifica si un email existe en la base de datos
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

    // Verificar si el email existe
    const result = await sql`
      SELECT id FROM users
      WHERE email = ${email}
      LIMIT 1
    `

    return NextResponse.json({
      exists: result.rows.length > 0,
    })
  } catch (error) {
    console.error("Error checking email:", error)
    return NextResponse.json(
      { error: "Error al verificar email" },
      { status: 500 }
    )
  }
}