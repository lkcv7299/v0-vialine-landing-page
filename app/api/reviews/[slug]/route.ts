import { NextRequest, NextResponse } from "next/server"
import { sql } from "@vercel/postgres"

/**
 * GET /api/reviews/[slug]
 *
 * Obtiene todas las reviews de un producto específico
 */
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await context.params

    // Crear tabla si no existe
    await sql`
      CREATE TABLE IF NOT EXISTS product_reviews (
        id SERIAL PRIMARY KEY,
        product_slug VARCHAR(255) NOT NULL,
        user_id INTEGER,
        user_name VARCHAR(255) NOT NULL,
        user_email VARCHAR(255) NOT NULL,
        rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
        title VARCHAR(255),
        comment TEXT NOT NULL,
        verified_purchase BOOLEAN DEFAULT false,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `

    // Obtener reviews del producto
    const reviews = await sql`
      SELECT
        id,
        product_slug,
        user_name,
        rating,
        title,
        comment,
        verified_purchase,
        created_at
      FROM product_reviews
      WHERE product_slug = ${slug}
      ORDER BY created_at DESC
    `

    // Obtener estadísticas
    const stats = await sql`
      SELECT
        COUNT(*) as total_reviews,
        AVG(rating) as average_rating,
        COUNT(CASE WHEN rating = 5 THEN 1 END) as five_star,
        COUNT(CASE WHEN rating = 4 THEN 1 END) as four_star,
        COUNT(CASE WHEN rating = 3 THEN 1 END) as three_star,
        COUNT(CASE WHEN rating = 2 THEN 1 END) as two_star,
        COUNT(CASE WHEN rating = 1 THEN 1 END) as one_star
      FROM product_reviews
      WHERE product_slug = ${slug}
    `

    return NextResponse.json({
      reviews: reviews.rows,
      stats: stats.rows[0] || {
        total_reviews: 0,
        average_rating: 0,
        five_star: 0,
        four_star: 0,
        three_star: 0,
        two_star: 0,
        one_star: 0,
      },
    })
  } catch (error) {
    console.error("Error fetching reviews:", error)
    return NextResponse.json(
      { error: "Error al obtener reviews" },
      { status: 500 }
    )
  }
}
