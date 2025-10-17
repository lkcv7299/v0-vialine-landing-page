import { NextRequest, NextResponse } from "next/server"

const ADMIN_CREDENTIALS = {
  email: "admin@vialine.pe",
  password: "vialine2025"
}

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (email !== ADMIN_CREDENTIALS.email || password !== ADMIN_CREDENTIALS.password) {
      return NextResponse.json(
        { error: "Credenciales incorrectas" },
        { status: 401 }
      )
    }

    const token = Buffer.from(`${email}:${Date.now()}`).toString("base64")

    return NextResponse.json({
      success: true,
      token,
      user: { email }
    })

  } catch (error) {
    console.error("Error en login:", error)
    return NextResponse.json(
      { error: "Error del servidor" },
      { status: 500 }
    )
  }
}