import { NextRequest, NextResponse } from "next/server"
import { createServiceClient } from "@/lib/supabase/server"

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
    const supabase = await createServiceClient()

    // Primero obtener el product_id desde el slug
    const { data: product, error: productError } = await supabase
      .from('products')
      .select('id')
      .eq('slug', slug)
      .single()

    if (productError || !product) {
      return NextResponse.json({
        reviews: [],
        stats: {
          total_reviews: 0,
          average_rating: 0,
          five_star: 0,
          four_star: 0,
          three_star: 0,
          two_star: 0,
          one_star: 0,
        }
      })
    }

    // Obtener reviews del producto (solo las aprobadas)
    const { data: reviews, error: reviewsError } = await supabase
      .from('reviews')
      .select('id, product_id, rating, title, comment, is_verified_purchase, created_at, user_id')
      .eq('product_id', product.id)
      .eq('is_approved', true)
      .order('created_at', { ascending: false })

    if (reviewsError) throw reviewsError

    // Calcular estadísticas manualmente
    const reviewsData = (reviews || []).map(r => ({
      ...r,
      product_slug: slug,
      user_name: 'Cliente verificado', // Default name since we don't store it
      verified_purchase: r.is_verified_purchase
    }))
    const total_reviews = reviewsData.length
    const average_rating = total_reviews > 0
      ? reviewsData.reduce((sum, r) => sum + r.rating, 0) / total_reviews
      : 0
    const five_star = reviewsData.filter(r => r.rating === 5).length
    const four_star = reviewsData.filter(r => r.rating === 4).length
    const three_star = reviewsData.filter(r => r.rating === 3).length
    const two_star = reviewsData.filter(r => r.rating === 2).length
    const one_star = reviewsData.filter(r => r.rating === 1).length

    const stats = {
      total_reviews,
      average_rating,
      five_star,
      four_star,
      three_star,
      two_star,
      one_star,
    }

    return NextResponse.json({
      reviews: reviewsData,
      stats,
    })
  } catch (error) {
    console.error("Error fetching reviews:", error)
    return NextResponse.json(
      { error: "Error al obtener reviews" },
      { status: 500 }
    )
  }
}
