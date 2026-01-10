// app/api/wishlist/route.ts
import { NextRequest, NextResponse } from "next/server"
import { createClient, createServiceClient } from "@/lib/supabase/server"

// ====================================
// GET - OBTENER WISHLIST DEL USUARIO
// ====================================
export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    // Si no hay sesión, retornar wishlist vacío (guest user)
    if (!user?.id) {
      return NextResponse.json({
        success: true,
        items: [],
      })
    }

    // Obtener wishlist del usuario con join a productos para obtener slugs
    const { data: wishlistData, error } = await supabase
      .from('wishlist')
      .select(`
        id,
        product_id,
        products!inner(slug)
      `)
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    if (error) throw error

    // Extraer los slugs de los productos
    const items = (wishlistData || []).map((row: any) => row.products?.slug).filter(Boolean)

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
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user?.id) {
      return NextResponse.json(
        { error: "Debes iniciar sesión para guardar favoritos" },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { productSlug } = body

    if (!productSlug) {
      return NextResponse.json(
        { error: "productSlug es requerido" },
        { status: 400 }
      )
    }

    // Primero obtener el product_id desde el slug
    const serviceClient = await createServiceClient()
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

    // Verificar si ya está en wishlist
    const { data: existing } = await supabase
      .from('wishlist')
      .select('id')
      .eq('user_id', user.id)
      .eq('product_id', product.id)
      .single()

    if (existing) {
      return NextResponse.json({
        success: true,
        message: "Producto ya está en favoritos",
      })
    }

    // Agregar a wishlist
    const { error } = await supabase
      .from('wishlist')
      .insert({
        user_id: user.id,
        product_id: product.id
      })

    if (error) throw error

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
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user?.id) {
      return NextResponse.json({ error: "No autenticado" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const productSlug = searchParams.get("productSlug")

    if (!productSlug) {
      return NextResponse.json(
        { error: "productSlug es requerido" },
        { status: 400 }
      )
    }

    // Primero obtener el product_id desde el slug
    const serviceClient = await createServiceClient()
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

    // Remover de wishlist
    const { error } = await supabase
      .from('wishlist')
      .delete()
      .eq('user_id', user.id)
      .eq('product_id', product.id)

    if (error) throw error

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
