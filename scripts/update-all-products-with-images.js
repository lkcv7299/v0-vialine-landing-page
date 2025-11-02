#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

const productsPath = path.join(__dirname, '..', 'data', 'products.ts')
const publicPath = path.join(__dirname, '..', 'public')
const diagnosticPath = path.join(__dirname, '..', 'diagnostic-report.json')

console.log('🚀 ACTUALIZACIÓN MASIVA DE PRODUCTOS CON TODAS LAS IMÁGENES\n')

// Mapa de colores
const colorMap = {
  'azul-marino': { name: 'Azul Marino', hex: '#1E3A8A' },
  'azulmarino': { name: 'Azul Marino', hex: '#1E3A8A' },
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
  'tuqrquesa': { name: 'Turquesa', hex: '#40E0D0' },
  'tuquesa': { name: 'Turquesa', hex: '#40E0D0' },
  'verde-petroleo': { name: 'Verde Petróleo', hex: '#00534E' },
  'petroleo': { name: 'Verde Petróleo', hex: '#00534E' },
  'verde': { name: 'Verde', hex: '#00534E' },
  'amarillo': { name: 'Amarillo', hex: '#FFD700' },
  'morado': { name: 'Morado', hex: '#800080' },
  'camel': { name: 'Camel', hex: '#C19A6B' },
  'aqua': { name: 'Aqua', hex: '#00FFFF' },
}

// Leer diagnostic report
const diagnostic = JSON.parse(fs.readFileSync(diagnosticPath, 'utf-8'))
console.log(`📊 Productos en diagnostic: ${diagnostic.diagnostics.length}\n`)

// Leer products.ts
let content = fs.readFileSync(productsPath, 'utf-8')

let updatedCount = 0

diagnostic.diagnostics.forEach((product, index) => {
  console.log(`\n[${index + 1}/${diagnostic.diagnostics.length}] 📦 ${product.slug}`)

  // Construir ruta al directorio de imágenes
  const imageDir = path.join(publicPath, product.imageDir)

  if (!fs.existsSync(imageDir)) {
    console.log(`   ⚠️  Directorio no existe`)
    return
  }

  // Leer todas las imágenes
  const allFiles = fs.readdirSync(imageDir)
  const productImages = allFiles.filter(f =>
    f.startsWith(product.slug) && f.endsWith('.webp')
  )

  console.log(`   📁 ${productImages.length} imágenes encontradas`)

  // Agrupar por color
  const colorGroups = {}

  productImages.forEach(img => {
    // Remover slug del principio
    const afterSlug = img.replace(product.slug + '-', '')
    const parts = afterSlug.toLowerCase().split('-')

    // Detectar color (puede ser compuesto)
    let detectedColor = null

    for (let i = 1; i <= Math.min(3, parts.length); i++) {
      const testColor = parts.slice(0, i).join('-')
      if (colorMap[testColor]) {
        detectedColor = testColor
        break
      }
    }

    if (!detectedColor && parts.length > 0) {
      detectedColor = parts[0]
    }

    if (detectedColor) {
      if (!colorGroups[detectedColor]) {
        colorGroups[detectedColor] = []
      }
      colorGroups[detectedColor].push(`/${product.imageDir}/${img}`)
    }
  })

  const colors = Object.keys(colorGroups)
  console.log(`   🎨 ${colors.length} colores: ${colors.join(', ')}`)

  if (colors.length === 0) {
    console.log(`   ⏭️  Sin colores detectados, skip`)
    return
  }

  // Crear array de objetos
  const colorObjects = colors.map(colorSlug => {
    const colorInfo = colorMap[colorSlug] || {
      name: colorSlug.charAt(0).toUpperCase() + colorSlug.slice(1),
      hex: '#CCCCCC'
    }

    return {
      name: colorInfo.name,
      slug: colorSlug,
      hex: colorInfo.hex,
      image: colorGroups[colorSlug][0] // Primera imagen
    }
  })

  // Formatear como string
  const colorsStr = `[\n      ${colorObjects.map(c =>
    `{\n        name: "${c.name}",\n        slug: "${c.slug}",\n        hex: "${c.hex}",\n        image: "${c.image}",\n      }`
  ).join(',\n      ')},\n    ]`

  // Nueva miniatura (primera imagen del primer color)
  const newThumb = colorObjects[0].image

  // Regex para reemplazar
  const regex = new RegExp(
    `(\\{[^{}]*slug:\\s*["']${product.slug}["'][^{}]*image:\\s*["'])([^"']+)(["'][^{}]*colors:\\s*)\\[[^\\]]*\\]`,
    's'
  )

  if (content.match(regex)) {
    content = content.replace(regex, `$1${newThumb}$3${colorsStr}`)
    console.log(`   ✅ Actualizado con ${colorObjects.length} colores`)
    updatedCount++
  } else {
    console.log(`   ⚠️  No se pudo actualizar (regex no coincide)`)
  }
})

if (updatedCount > 0) {
  fs.writeFileSync(productsPath, content, 'utf-8')
  console.log(`\n\n✅ COMPLETADO: ${updatedCount} productos actualizados`)
} else {
  console.log(`\n\n⚠️  No se actualizó ningún producto`)
}
