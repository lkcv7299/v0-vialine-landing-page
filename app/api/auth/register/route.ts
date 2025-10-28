import { NextResponse } from "next/server"
import { sql } from "@vercel/postgres"

// ✅ OPTIMIZATION: Dynamic import for consistency and tree-shaking
async function hashPassword(password: string): Promise<string> {
  const bcrypt = await import("bcryptjs")
  return bcrypt.default.hash(password, 10)
}

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json()

    // Validaciones básicas
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Todos los campos son requeridos" },
        { status: 400 }
      )
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "La contraseña debe tener al menos 6 caracteres" },
        { status: 400 }
      )
    }

    // Verificar si el email ya existe
    const existingUser = await sql`
      SELECT id FROM users WHERE email = ${email} LIMIT 1
    `

    if (existingUser.rows.length > 0) {
      return NextResponse.json(
        { error: "Este email ya está registrado" },
        { status: 400 }
      )
    }

    // ✅ FIXED: Use dynamic import
    const passwordHash = await hashPassword(password)

    // Crear usuario
    const result = await sql`
      INSERT INTO users (name, email, password_hash, created_at, updated_at)
      VALUES (${name}, ${email}, ${passwordHash}, NOW(), NOW())
      RETURNING id, name, email, created_at
    `

    const newUser = result.rows[0]

    return NextResponse.json(
      {
        message: "Usuario creado exitosamente",
        user: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
        },
      },
      { status: 201 }
    )
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json(
      { error: "Error al crear la cuenta. Por favor intenta de nuevo." },
      { status: 500 }
    )
  }
}