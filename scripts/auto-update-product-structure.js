#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

const productsPath = path.join(__dirname, '..', 'data', 'products.ts')
const publicPath = path.join(__dirname, '..', 'public')
const reportPath = path.join(__dirname, '..', 'diagnostic-report.json')

console.log('🔧 ACTUALIZANDO ESTRUCTURA DE PRODUCTOS CON IMÁGENES\n')

// Leer reporte de diagnóstico
const report = JSON.parse(fs.readFileSync(reportPath, 'utf-8'))
const productsToUpdate = report.diagnostics.filter(d => d.needsUpdate)

console.log(`📊 Productos a actualizar: ${productsToUpdate.length}\n`)

// Mapa de colores a hex
const colorHexMap = {
  'azul marino': '#1E3A8A',
  'azul': '#1E3A8A',
  'azulino': '#3A53A4',
  'beige': '#F5F5DC',
  'blanco': '#FFFFFF',
  'negro': '#000000',
  'rojo': '#D22B2B',
  'rosado': '#FFC0CB',
  'gris': '#9CA3AF',
  'charcoal': '#5A5A5A',
  'melange': '#B8B8B8',
  'vino': '#722F37',
  'turquesa': '#40E0D0',
  'verde petróleo': '#00534E',
  'verde': '#00534E',
}

function normalizeColorForFilename(color) {
  const map = {
    'azul marino': 'azul-marino',
    'beige': 'beige',
    'blanco': 'blanco',
    'negro': 'negro',
    'rojo': 'rojo',
    'rosado': 'rosado',
    'gris': 'gris',
    'charcoal': 'charcoal',
    'vino': 'vino',
    'turquesa': 'turquesa',
    'verde petróleo': 'verde-petroleo',
    'verde': 'verde-petroleo',
  }
  const normalized = color.toLowerCase()
  return map[normalized] || normalized.replace(/\s+/g, '-').replace(/ó/g, 'o')
}

// Función para buscar la imagen real en el sistema de archivos
function findActualImage(productSlug, colorSlug, imageDir) {
  const fullDir = path.join(publicPath, imageDir)

  if (!fs.existsSync(fullDir)) {
    return null
  }

  // Leer todos los archivos en el directorio
  const files = fs.readdirSync(fullDir)

  // Buscar archivos que coincidan con el patrón:
  // {slug}-{color}-*.webp
  const pattern = new RegExp(`^${productSlug}-${colorSlug}-.*\\.webp$`)
  const matchingFiles = files.filter(f => pattern.test(f))

  if (matchingFiles.length === 0) {
    return null
  }

  // Preferir archivos que terminen en "1.webp"
  const primaryImage = matchingFiles.find(f => f.match(/1\.webp$/))

  return primaryImage || matchingFiles[0]
}

let content = fs.readFileSync(productsPath, 'utf-8')
let updatedCount = 0

productsToUpdate.forEach(product => {
  console.log(`\n🔄 Actualizando: ${product.slug}`)
  console.log(`   Colores: ${product.colorNames.join(', ')}`)

  // Construir objetos de colores con imágenes
  const colorObjects = product.colorNames.map(colorName => {
    const colorSlug = normalizeColorForFilename(colorName)
    const hex = colorHexMap[colorName.toLowerCase()] || '#CCCCCC'

    // Buscar la imagen real en el sistema de archivos
    const actualImageName = findActualImage(product.slug, colorSlug, product.imageDir)

    if (actualImageName) {
      const imagePath = `${product.imageDir}/${actualImageName}`
      console.log(`   ✅ ${colorName}: /${imagePath}`)

      return {
        name: colorName,
        slug: colorSlug,
        hex,
        image: `/${imagePath}`
      }
    } else {
      console.log(`   ⚠️  ${colorName}: No se encontró imagen`)

      // Usar imagen genérica si no existe
      return {
        name: colorName,
        slug: colorSlug,
        hex,
        image: `/${product.imageDir}/${product.slug}.webp`
      }
    }
  })

  // Crear el array de objetos formateado
  const colorsArrayStr = `[\n      ${colorObjects.map(c =>
    `{\n        name: "${c.name}",\n        slug: "${c.slug}",\n        hex: "${c.hex}",\n        image: "${c.image}",\n      }`
  ).join(',\n      ')},\n    ]`

  // Regex para encontrar y reemplazar el array de colores
  const slugPattern = new RegExp(
    `(\\{[^{}]*slug:\\s*["']${product.slug}["'][^{}]*colors:\\s*)\\[([^\\]]+)\\]`,
    's'
  )

  const match = content.match(slugPattern)
  if (match) {
    const replacement = match[1] + colorsArrayStr
    content = content.replace(slugPattern, replacement)
    console.log(`   ✅ Actualizado con ${colorObjects.length} objetos de color`)
    updatedCount++
  } else {
    console.log(`   ❌ No se pudo encontrar el producto en products.ts`)
  }
})

if (updatedCount > 0) {
  fs.writeFileSync(productsPath, content, 'utf-8')
  console.log(`\n✅ Successfully updated ${updatedCount}/${productsToUpdate.length} products`)
} else {
  console.log(`\n⚠️  No products were updated`)
}
