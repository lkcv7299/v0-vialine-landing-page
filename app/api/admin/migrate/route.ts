import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { products, type Product } from '@/data/products'

// Mapeo de categorías del archivo a slugs de Supabase
const CATEGORY_MAP: Record<string, string> = {
  'leggings': 'legging',
  'bikers': 'bikers',
  'shorts': 'shorts',
  'tops': 'tops',
  'bodysuits': 'bodys',
  'camisetas': 'camisetas',
  'enterizos': 'enterizo',
  'pescador': 'pescador',
  'torero': 'torero',
  'cafarenas': 'cafarenas',
  'pantys': 'pantys'
}

// Mapeo de tejidos legacy a nuevos slugs
const FABRIC_MAP: Record<string, string> = {
  'suplex': 'suplex-liso-premium',
  'algodon': 'algodon-premium',
  'suplex-liso-premium': 'suplex-liso-premium',
  'suplex-perchado': 'suplex-perchado',
  'algodon-premium': 'algodon-premium',
  'algodon-french-terry': 'algodon-french-terry',
  'algodon-gamusa': 'algodon-gamusa'
}

export async function POST(request: Request) {
  // Verificar secret key para autorización
  const { searchParams } = new URL(request.url)
  const secret = searchParams.get('secret')

  if (secret !== process.env.MIGRATION_SECRET && secret !== 'vialine-migrate-2025') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // Crear cliente con service role (bypass RLS)
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      auth: { autoRefreshToken: false, persistSession: false }
    }
  )

  try {
    // 1. Cargar categorías y tejidos
    const { data: categories } = await supabase.from('categories').select('id, slug')
    const { data: fabrics } = await supabase.from('fabrics').select('id, slug')

    const categoryLookup = new Map(categories?.map(c => [c.slug, c.id]) || [])
    const fabricLookup = new Map(fabrics?.map(f => [f.slug, f.id]) || [])

    const results = {
      total: products.length,
      success: 0,
      errors: [] as string[]
    }

    for (const product of products) {
      try {
        // Mapear categoría y tejido
        const categorySlug = CATEGORY_MAP[product.category] || product.category
        const categoryId = categoryLookup.get(categorySlug)
        const fabricSlug = FABRIC_MAP[product.fabric] || product.fabric
        const fabricId = fabricLookup.get(fabricSlug)

        // 1. Insertar producto
        const { data: newProduct, error: productError } = await supabase
          .from('products')
          .insert({
            slug: product.slug,
            title: product.title,
            price: product.price,
            original_price: product.originalPrice || null,
            category_id: categoryId || null,
            fabric_id: fabricId || null,
            audience: product.audience,
            badge: product.badge || null,
            tags: product.tags || [],
            attributes: product.attributes || {},
            is_active: true,
            published_at: new Date().toISOString()
          })
          .select('id')
          .single()

        if (productError) {
          results.errors.push(`${product.slug}: ${productError.message}`)
          continue
        }

        const productId = newProduct.id

        // 2. Insertar colores e imágenes
        for (let i = 0; i < product.colors.length; i++) {
          const color = product.colors[i]
          const isSimple = typeof color === 'string'

          const colorName = isSimple ? color : color.name
          const colorSlug = isSimple ? color.toLowerCase().replace(/\s+/g, '-') : color.slug
          const colorHex = isSimple ? '#808080' : color.hex
          const colorImages = isSimple
            ? [product.image]
            : (color.images || (color.image ? [color.image] : []))

          const { data: newColor } = await supabase
            .from('product_colors')
            .insert({
              product_id: productId,
              name: colorName,
              slug: colorSlug,
              hex: colorHex,
              position: i,
              is_active: true
            })
            .select('id')
            .single()

          if (newColor) {
            // Insertar imágenes
            for (let j = 0; j < colorImages.length; j++) {
              await supabase.from('product_images').insert({
                product_id: productId,
                color_id: newColor.id,
                url: colorImages[j],
                alt_text: `${product.title} - ${colorName}`,
                position: j,
                is_primary: j === 0
              })
            }
          }
        }

        // 3. Insertar variantes (tallas)
        for (const size of product.sizes) {
          await supabase.from('product_variants').insert({
            product_id: productId,
            size: size,
            stock: product.inventory || 10,
            is_active: true
          })
        }

        results.success++
      } catch (err) {
        results.errors.push(`${product.slug}: ${String(err)}`)
      }
    }

    return NextResponse.json({
      message: 'Migración completada',
      results
    })

  } catch (error) {
    return NextResponse.json({
      error: 'Error en migración',
      details: String(error)
    }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Endpoint de migración de productos',
    usage: 'POST /api/admin/migrate?secret=vialine-migrate-2025',
    products_count: products.length
  })
}
