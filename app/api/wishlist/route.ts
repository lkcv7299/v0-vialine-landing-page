// app/api/wishlist/route.ts
import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { sql } from "@vercel/postgres"

// ====================================
// GET - OBTENER WISHLIST DEL USUARIO
// ====================================
export async function GET(request: NextRequest) {
  try {
    const session = await auth()

    // Si no hay sesión, retornar wishlist vacío (guest user)
    if (!session || !session.user?.id) {
      return NextResponse.json({
        success: true,
        items: [],
      })
    }

    const userId = session.user.id

    // Obtener wishlist del usuario
    const result = await sql`
      SELECT product_slug
      FROM wishlist
      WHERE user_id = ${userId}
      ORDER BY created_at DESC
    `

    const items = result.rows.map((row) => row.product_slug)

    return NextResponse.json({
      success: true,
      items,
    })
  } catch (error) {
    console.error("❌ Error en GET /api/wishlist:", error)
    return NextResponse.json(
      { error: "Error al obtener wishlist" },
      { status: 500 }
    )
  }
}

// ====================================
// POST - AGREGAR A WISHLIST
// ====================================
export async function POST(request: NextRequest) {
  try {
    const session = await auth()

    if (!session || !session.user?.id) {
      return NextResponse.json(
        { error: "Debes iniciar sesión para guardar favoritos" },
        { status: 401 }
      )
    }

    const userId = session.user.id
    const body = await request.json()
    const { productSlug } = body

    if (!productSlug) {
      return NextResponse.json(
        { error: "productSlug es requerido" },
        { status: 400 }
      )
    }

    // Verificar si ya está en wishlist
    const existing = await sql`
      SELECT id FROM wishlist
      WHERE user_id = ${userId} AND product_slug = ${productSlug}
      LIMIT 1
    `

    if (existing.rows.length > 0) {
      return NextResponse.json({
        success: true,
        message: "Producto ya está en favoritos",
      })
    }

    // Agregar a wishlist
    await sql`
      INSERT INTO wishlist (user_id, product_slug, created_at)
      VALUES (${userId}, ${productSlug}, NOW())
    `

    return NextResponse.json({
      success: true,
      message: "Producto agregado a favoritos",
    })
  } catch (error) {
    console.error("❌ Error en POST /api/wishlist:", error)
    return NextResponse.json(
      { error: "Error al agregar a favoritos" },
      { status: 500 }
    )
  }
}

// ====================================
// DELETE - REMOVER DE WISHLIST
// ====================================
export async function DELETE(request: NextRequest) {
  try {
    const session = await auth()

    if (!session || !session.user?.id) {
      return NextResponse.json({ error: "No autenticado" }, { status: 401 })
    }

    const userId = session.user.id
    const { searchParams } = new URL(request.url)
    const productSlug = searchParams.get("productSlug")

    if (!productSlug) {
      return NextResponse.json(
        { error: "productSlug es requerido" },
        { status: 400 }
      )
    }

    // Remover de wishlist
    await sql`
      DELETE FROM wishlist
      WHERE user_id = ${userId} AND product_slug = ${productSlug}
    `

    return NextResponse.json({
      success: true,
      message: "Producto removido de favoritos",
    })
  } catch (error) {
    console.error("❌ Error en DELETE /api/wishlist:", error)
    return NextResponse.json(
      { error: "Error al remover de favoritos" },
      { status: 500 }
    )
  }
}