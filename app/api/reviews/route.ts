import { NextRequest, NextResponse } from "next/server"
import { createClient, createServiceClient } from "@/lib/supabase/server"

/**
 * POST /api/reviews
 *
 * Crea una nueva review para un producto
 */
export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user?.id || !user?.email) {
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

    // Usamos service client para operaciones admin
    const serviceClient = await createServiceClient()

    // Primero obtener el product_id desde el slug
    const { data: product, error: productError } = await serviceClient
      .from('products')
      .select('id')
      .eq('slug', productSlug)
      .single()

    if (productError || !product) {
      return NextResponse.json(
        { error: "Producto no encontrado" },
        { status: 404 }
      )
    }

    // Verificar si el usuario ya dejó una review para este producto
    const { data: existingReview } = await serviceClient
      .from('reviews')
      .select('id')
      .eq('product_id', product.id)
      .eq('user_id', user.id)
      .single()

    if (existingReview) {
      return NextResponse.json(
        { error: "Ya has dejado una reseña para este producto" },
        { status: 400 }
      )
    }

    // Verificar si el usuario compró el producto (con orden pagada)
    const { data: purchaseData } = await serviceClient
      .from('orders')
      .select(`
        id,
        order_items!inner(product_slug)
      `)
      .eq('user_id', user.id)
      .or('status.eq.paid,payment_status.eq.paid')
      .eq('order_items.product_slug', productSlug)
      .limit(1)

    const verifiedPurchase = (purchaseData && purchaseData.length > 0)

    // Insertar la review
    const { data: newReview, error } = await serviceClient
      .from('reviews')
      .insert({
        product_id: product.id,
        user_id: user.id,
        rating,
        title: title || null,
        comment,
        is_verified_purchase: verifiedPurchase,
        is_approved: false // Reviews need admin approval
      })
      .select('id, created_at')
      .single()

    if (error) throw error

    return NextResponse.json({
      success: true,
      review: newReview,
    })
  } catch (error) {
    console.error("Error creating review:", error)
    return NextResponse.json(
      { error: "Error al crear la reseña" },
      { status: 500 }
    )
  }
}
