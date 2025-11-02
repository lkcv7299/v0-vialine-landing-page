#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

const productsPath = path.join(__dirname, '..', 'data', 'products.ts')
const publicPath = path.join(__dirname, '..', 'public')
const diagnosticPath = path.join(__dirname, '..', 'diagnostic-report.json')

console.log('🚀 ACTUALIZACIÓN FINAL - DETECTANDO TODOS LOS COLORES\n')

// Todos los colores posibles
const colorMap = {
  'azulmarino': { name: 'Azul Marino', hex: '#1E3A8A' },
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
  'charcol': { name: 'Charcoal', hex: '#5A5A5A' },
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
  'acero': { name: 'Acero', hex: '#808080' },
}

function detectColorInFilename(filename, productSlug) {
  // Remover el slug del producto y extensión
  let rest = filename.replace(productSlug + '-', '').replace('.webp', '')

  // Buscar después de patrones comunes
  const patterns = [
    /suplex-liso-premium-([a-z-]+)/,
    /algodon-premium-([a-z-]+)/,
    /manga-\w+-([a-z-]+)/,
    /cuello-alto-([a-z-]+)/,
    /camiseta-([a-z-]+)/,
    /enterizo-([a-z-]+)/,
    /paradise-([a-z-]+)/,
    /afrodita-([a-z-]+)/,
    /brasil-([a-z-]+)/,
    /short-([a-z-]+)/,
    /legging-([a-z-]+)/,
    /body-([a-z-]+)/,
  ]

  for (const pattern of patterns) {
    const match = rest.match(pattern)
    if (match) {
      const colorCandidate = match[1]
      // Verificar si es un color válido
      for (let i = 1; i <= Math.min(3, colorCandidate.split('-').length); i++) {
        const testColor = colorCandidate.split('-').slice(0, i).join('-')
        if (colorMap[testColor]) {
          return testColor
        }
      }
    }
  }

  // Si no funciona, buscar directamente colores conocidos en el nombre
  const lowerRest = rest.toLowerCase()
  for (const color of Object.keys(colorMap)) {
    if (lowerRest.includes(color)) {
      return color
    }
  }

  return null
}

// Leer diagnostic
const diagnostic = JSON.parse(fs.readFileSync(diagnosticPath, 'utf-8'))
let content = fs.readFileSync(productsPath, 'utf-8')

let updatedCount = 0

diagnostic.diagnostics.forEach((product, index) => {
  console.log(`\n[${index + 1}/${diagnostic.diagnostics.length}] 📦 ${product.slug}`)

  const imageDir = path.join(publicPath, product.imageDir)
  if (!fs.existsSync(imageDir)) {
    console.log(`   ⚠️  Directorio no existe`)
    return
  }

  const allFiles = fs.readdirSync(imageDir)
  const productImages = allFiles.filter(f =>
    f.startsWith(product.slug) && f.endsWith('.webp')
  )

  console.log(`   📁 ${productImages.length} imágenes`)

  // Detectar colores
  const colorGroups = {}

  productImages.forEach(img => {
    const color = detectColorInFilename(img, product.slug)
    if (color) {
      if (!colorGroups[color]) {
        colorGroups[color] = []
      }
      colorGroups[color].push(`/${product.imageDir}/${img}`)
    }
  })

  const colors = Object.keys(colorGroups)
  console.log(`   🎨 ${colors.length} colores: ${colors.join(', ')}`)

  if (colors.length === 0) {
    console.log(`   ⏭️  Sin colores`)
    return
  }

  const colorObjects = colors.map(colorSlug => {
    const colorInfo = colorMap[colorSlug]
    return {
      name: colorInfo.name,
      slug: colorSlug,
      hex: colorInfo.hex,
      image: colorGroups[colorSlug][0]
    }
  })

  const colorsStr = `[\n      ${colorObjects.map(c =>
    `{\n        name: "${c.name}",\n        slug: "${c.slug}",\n        hex: "${c.hex}",\n        image: "${c.image}",\n      }`
  ).join(',\n      ')},\n    ]`

  const newThumb = colorObjects[0].image
  const regex = new RegExp(
    `(\\{[^{}]*slug:\\s*["']${product.slug}["'][^{}]*image:\\s*["'])([^"']+)(["'][^{}]*colors:\\s*)\\[[^\\]]*\\]`,
    's'
  )

  if (content.match(regex)) {
    content = content.replace(regex, `$1${newThumb}$3${colorsStr}`)
    console.log(`   ✅ Actualizado: ${colorObjects.length} colores`)
    updatedCount++
  } else {
    console.log(`   ❌ No match en regex`)
  }
})

if (updatedCount > 0) {
  fs.writeFileSync(productsPath, content, 'utf-8')
  console.log(`\n\n✅ COMPLETADO: ${updatedCount} productos actualizados`)
} else {
  console.log(`\n\n⚠️  No se actualizó ningún producto`)
}
