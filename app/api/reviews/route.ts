import { NextRequest, NextResponse } from "next/server"
import { sql } from "@vercel/postgres"
import { auth } from "@/lib/auth"

/**
 * POST /api/reviews
 *
 * Crea una nueva review para un producto
 */
export async function POST(request: NextRequest) {
  try {
    const session = await auth()

    if (!session || !session.user?.email) {
      return NextResponse.json(
        { error: "Debes iniciar sesión para dejar una reseña" },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { productSlug, rating, title, comment } = body

    // Validaciones
    if (!productSlug || !rating || !comment) {
      return NextResponse.json(
        { error: "Faltan campos requeridos" },
        { status: 400 }
      )
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: "El rating debe estar entre 1 y 5" },
        { status: 400 }
      )
    }

    if (comment.length < 10) {
      return NextResponse.json(
        { error: "El comentario debe tener al menos 10 caracteres" },
        { status: 400 }
      )
    }

    // Obtener user_id
    const userResult = await sql`
      SELECT id FROM users
      WHERE email = ${session.user.email}
      LIMIT 1
    `

    const userId = userResult.rows.length > 0 ? userResult.rows[0].id : null
    const userName = session.user.name || session.user.email.split("@")[0]

    // Verificar si el usuario ya dejó una review para este producto
    const existingReview = await sql`
      SELECT id FROM product_reviews
      WHERE product_slug = ${productSlug}
        AND user_email = ${session.user.email}
      LIMIT 1
    `

    if (existingReview.rows.length > 0) {
      return NextResponse.json(
        { error: "Ya has dejado una reseña para este producto" },
        { status: 400 }
      )
    }

    // Verificar si el usuario compró el producto (con orden pagada)
    const purchaseCheck = await sql`
      SELECT o.id
      FROM orders o
      INNER JOIN order_items oi ON o.id = oi.order_id
      WHERE o.user_id = ${userId}
        AND (o.status = 'paid' OR o.payment_status = 'paid')
        AND oi.product_slug = ${productSlug}
      LIMIT 1
    `

    const verifiedPurchase = purchaseCheck.rows.length > 0

    // Insertar la review
    const result = await sql`
      INSERT INTO product_reviews (
        product_slug,
        user_id,
        user_name,
        user_email,
        rating,
        title,
        comment,
        verified_purchase
      )
      VALUES (
        ${productSlug},
        ${userId},
        ${userName},
        ${session.user.email},
        ${rating},
        ${title || null},
        ${comment},
        ${verifiedPurchase}
      )
      RETURNING id, created_at
    `

    return NextResponse.json({
      success: true,
      review: result.rows[0],
    })
  } catch (error) {
    console.error("Error creating review:", error)
    return NextResponse.json(
      { error: "Error al crear la reseña" },
      { status: 500 }
    )
  }
}
