#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

const productsPath = path.join(__dirname, '..', 'data', 'products.ts')
const publicPath = path.join(__dirname, '..', 'public', 'productos')

console.log('🚀 ACTUALIZACIÓN COMPLETA DE PRODUCTOS\n')
console.log('='.repeat(80))

// Mapa de colores a hex
const colorHexMap = {
  'azul-marino': { name: 'Azul Marino', hex: '#1E3A8A' },
  'azul': { name: 'Azul', hex: '#1E3A8A' },
  'azulino': { name: 'Azulino', hex: '#3A53A4' },
  'beige': { name: 'Beige', hex: '#F5F5DC' },
  'blanco': { name: 'Blanco', hex: '#FFFFFF' },
  'negro': { name: 'Negro', hex: '#000000' },
  'rojo': { name: 'Rojo', hex: '#D22B2B' },
  'rosado': { name: 'Rosado', hex: '#FFC0CB' },
  'rosa': { name: 'Rosa', hex: '#FFC0CB' },
  'gris': { name: 'Gris', hex: '#9CA3AF' },
  'charcoal': { name: 'Charcoal', hex: '#5A5A5A' },
  'melange': { name: 'Melange', hex: '#B8B8B8' },
  'vino': { name: 'Vino', hex: '#722F37' },
  'turquesa': { name: 'Turquesa', hex: '#40E0D0' },
  'verde-petroleo': { name: 'Verde Petróleo', hex: '#00534E' },
  'verde': { name: 'Verde', hex: '#00534E' },
  'amarillo': { name: 'Amarillo', hex: '#FFD700' },
  'morado': { name: 'Morado', hex: '#800080' },
  'camel': { name: 'Camel', hex: '#C19A6B' },
  'aqua': { name: 'Aqua', hex: '#00FFFF' },
}

// Leer products.ts
let content = fs.readFileSync(productsPath, 'utf-8')

// Extraer productos con su info completa
const productRegex = /\{\s*slug:\s*["']([^"']+)["'][^}]*?image:\s*["']([^"']+)["'][^}]*?category:\s*["']([^"']+)["'][^}]*?audience:\s*["']([^"']+)["']/gs

let match
const products = []

while ((match = productRegex.exec(content)) !== null) {
  const slug = match[1]
  const mainImage = match[2]
  const category = match[3]
  const audience = match[4]

  products.push({ slug, mainImage, category, audience })
}

console.log(`📊 Productos encontrados: ${products.length}\n`)

// Para cada producto, buscar TODAS sus imágenes
let updatedCount = 0

products.forEach((product, index) => {
  console.log(`\n[${index + 1}/${products.length}] 📦 ${product.slug}`)

  // Determinar directorio de imágenes
  const imageDir = path.dirname(product.mainImage.replace(/^\//, ''))
  const fullImageDir = path.join(publicPath, imageDir.replace('productos/', ''))

  if (!fs.existsSync(fullImageDir)) {
    console.log(`   ⚠️  Directorio no existe: ${fullImageDir}`)
    return
  }

  // Leer todas las imágenes del producto
  const allFiles = fs.readdirSync(fullImageDir)
  const productImages = allFiles.filter(f =>
    f.startsWith(product.slug) && f.endsWith('.webp')
  )

  console.log(`   📁 Imágenes encontradas: ${productImages.length}`)

  // Agrupar imágenes por color
  const imagesByColor = {}

  productImages.forEach(img => {
    // Extraer color del nombre de archivo
    // Patrón: {slug}-{color}-...webp
    const withoutSlug = img.replace(`${product.slug}-`, '')
    const parts = withoutSlug.split('-')

    // Intentar detectar color (puede ser compuesto como "azul-marino")
    let colorSlug = null
    let colorName = null

    // Intentar con 1-3 palabras para el color
    for (let i = 1; i <= Math.min(3, parts.length); i++) {
      const testColor = parts.slice(0, i).join('-')
      if (colorHexMap[testColor]) {
        colorSlug = testColor
        colorName = colorHexMap[testColor].name
        break
      }
    }

    // Si no se encontró, usar el primer segmento
    if (!colorSlug) {
      colorSlug = parts[0]
      colorName = parts[0].charAt(0).toUpperCase() + parts[0].slice(1)
    }

    if (!imagesByColor[colorSlug]) {
      imagesByColor[colorSlug] = {
        name: colorName,
        slug: colorSlug,
        hex: colorHexMap[colorSlug]?.hex || '#CCCCCC',
        images: []
      }
    }

    imagesByColor[colorSlug].images.push(`/${imageDir}/${img}`)
  })

  const colors = Object.values(imagesByColor)

  if (colors.length === 0) {
    console.log(`   ⚠️  No se encontraron colores`)
    return
  }

  console.log(`   🎨 Colores detectados: ${colors.length}`)
  colors.forEach(color => {
    console.log(`      - ${color.name}: ${color.images.length} imágenes`)
  })

  // Crear array de objetos de colores
  const colorsArray = colors.map(color => ({
    name: color.name,
    slug: color.slug,
    hex: color.hex,
    image: color.images[0] // Usar primera imagen como principal
  }))

  // Crear string formateado
  const colorsArrayStr = `[\n      ${colorsArray.map(c =>
    `{\n        name: "${c.name}",\n        slug: "${c.slug}",\n        hex: "${c.hex}",\n        image: "${c.image}",\n      }`
  ).join(',\n      ')},\n    ]`

  // Actualizar miniatura con primera imagen del primer color
  const newMainImage = colorsArray[0].image

  // Regex para encontrar y reemplazar
  const productPattern = new RegExp(
    `(\\{[^{}]*slug:\\s*["']${product.slug}["'][^{}]*image:\\s*["'])([^"']+)(["'][^{}]*colors:\\s*)\\[[^\\]]*\\]`,
    's'
  )

  const productMatch = content.match(productPattern)
  if (productMatch) {
    const replacement = `${productMatch[1]}${newMainImage}${productMatch[3]}${colorsArrayStr}`
    content = content.replace(productPattern, replacement)
    console.log(`   ✅ Actualizado: ${colorsArray.length} colores, miniatura → ${newMainImage}`)
    updatedCount++
  } else {
    console.log(`   ❌ No se pudo actualizar en products.ts`)
  }
})

// Guardar archivo actualizado
if (updatedCount > 0) {
  fs.writeFileSync(productsPath, content, 'utf-8')
  console.log(`\n\n✅ COMPLETADO: ${updatedCount}/${products.length} productos actualizados`)
} else {
  console.log(`\n\n⚠️  No se actualizó ningún producto`)
}

console.log('\n' + '='.repeat(80))
