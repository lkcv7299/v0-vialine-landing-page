/**
 * Script de migración de productos a Supabase
 *
 * Ejecutar con: npx tsx scripts/migrate-products.ts
 */

import { createClient } from '@supabase/supabase-js'
import { products, type Product } from '../data/products'

// Inicializar cliente Supabase con service role (bypass RLS)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
)

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

interface CategoryRow {
  id: string
  slug: string
}

interface FabricRow {
  id: string
  slug: string
}

async function main() {
  console.log('🚀 Iniciando migración de productos...\n')

  // 1. Cargar categorías y tejidos
  const { data: categories, error: catError } = await supabase
    .from('categories')
    .select('id, slug')

  if (catError) {
    console.error('❌ Error cargando categorías:', catError)
    process.exit(1)
  }

  const { data: fabrics, error: fabError } = await supabase
    .from('fabrics')
    .select('id, slug')

  if (fabError) {
    console.error('❌ Error cargando tejidos:', fabError)
    process.exit(1)
  }

  // Crear mapas de lookup
  const categoryLookup = new Map((categories as CategoryRow[]).map(c => [c.slug, c.id]))
  const fabricLookup = new Map((fabrics as FabricRow[]).map(f => [f.slug, f.id]))

  console.log(`📦 Categorías cargadas: ${categories?.length}`)
  console.log(`🧵 Tejidos cargados: ${fabrics?.length}`)
  console.log(`📋 Productos a migrar: ${products.length}\n`)

  let successCount = 0
  let errorCount = 0

  for (const product of products) {
    try {
      // Mapear categoría
      const categorySlug = CATEGORY_MAP[product.category] || product.category
      const categoryId = categoryLookup.get(categorySlug)

      // Mapear tejido
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
        console.error(`❌ Error insertando producto "${product.slug}":`, productError.message)
        errorCount++
        continue
      }

      const productId = newProduct.id

      // 2. Insertar colores e imágenes
      for (let colorIndex = 0; colorIndex < product.colors.length; colorIndex++) {
        const color = product.colors[colorIndex]

        // Determinar si es color simple o con detalles
        const isSimpleColor = typeof color === 'string'
        const colorName = isSimpleColor ? color : color.name
        const colorSlug = isSimpleColor ? color.toLowerCase().replace(/\s+/g, '-') : color.slug
        const colorHex = isSimpleColor ? '#808080' : color.hex
        const colorImages = isSimpleColor
          ? [product.image]
          : (color.images || (color.image ? [color.image] : []))

        // Insertar color
        const { data: newColor, error: colorError } = await supabase
          .from('product_colors')
          .insert({
            product_id: productId,
            name: colorName,
            slug: colorSlug,
            hex: colorHex,
            position: colorIndex,
            is_active: true
          })
          .select('id')
          .single()

        if (colorError) {
          console.error(`  ⚠️ Error insertando color "${colorName}":`, colorError.message)
          continue
        }

        const colorId = newColor.id

        // Insertar imágenes del color
        for (let imgIndex = 0; imgIndex < colorImages.length; imgIndex++) {
          const imageUrl = colorImages[imgIndex]

          await supabase
            .from('product_images')
            .insert({
              product_id: productId,
              color_id: colorId,
              url: imageUrl,
              alt_text: `${product.title} - ${colorName}`,
              position: imgIndex,
              is_primary: imgIndex === 0
            })
        }
      }

      // 3. Insertar variantes (tallas) - una por talla, sin color específico
      for (const size of product.sizes) {
        await supabase
          .from('product_variants')
          .insert({
            product_id: productId,
            size: size,
            stock: product.inventory || 10, // Stock por defecto
            is_active: true
          })
      }

      successCount++
      console.log(`✅ [${successCount}/${products.length}] ${product.title}`)

    } catch (error) {
      console.error(`❌ Error procesando "${product.slug}":`, error)
      errorCount++
    }
  }

  console.log('\n' + '='.repeat(50))
  console.log(`📊 RESUMEN DE MIGRACIÓN`)
  console.log('='.repeat(50))
  console.log(`✅ Productos migrados: ${successCount}`)
  console.log(`❌ Errores: ${errorCount}`)
  console.log(`📦 Total procesados: ${products.length}`)
}

// Ejecutar
main()
  .then(() => {
    console.log('\n🎉 Migración completada!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('\n💥 Error fatal:', error)
    process.exit(1)
  })
