#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

const productsPath = path.join(__dirname, '..', 'data', 'products.ts')
const publicPath = path.join(__dirname, '..', 'public')

console.log('🔧 Updating color structure to include images...\n')

// Products to update (the 9 that were normalized)
const productsToUpdate = [
  'camiseta-cuello-alto',
  'camiseta-manga-larga',
  'camiseta-manga-corta',
  'camiseta-gia',
  'short-brasil',
  'maxi-short',
  'mini-short',
  'body-manga-corta',
  'body-manga-larga'
]

// Color hex map
const colorHexMap = {
  'azul marino': '#1E3A8A',
  'azul': '#1E3A8A',
  'azulino': '#3A53A4',
  'beige': '#F5F5DC',
  'blanco': '#FFFFFF',
  'negro': '#000000',
  'rojo': '#D22B2B',
  'rosado': '#FFC0CB',
  'vino': '#722F37'
}

function normalizeColorForFilename(color) {
  const colorMap = {
    'azul marino': 'azul-marino',
    'azul': 'azul-marino',
    'beige': 'beige',
    'blanco': 'blanco',
    'negro': 'negro',
    'rojo': 'rojo',
    'rosado': 'rosado',
    'vino': 'vino'
  }
  const normalized = color.toLowerCase()
  return colorMap[normalized] || normalized.replace(/\s+/g, '-')
}

function checkImageExists(imagePath) {
  const fullPath = path.join(publicPath, imagePath)
  return fs.existsSync(fullPath)
}

let content = fs.readFileSync(productsPath, 'utf-8')
let updatedCount = 0

productsToUpdate.forEach(productSlug => {
  // Find the product in the file
  const productRegex = new RegExp(
    `(\\{\\s*slug:\\s*["']${productSlug}["'][^}]*?image:\\s*["']([^"']+)["'][^}]*?colors:\\s*)(\\[[^\\]]*\\])`,
    's'
  )

  const match = content.match(productRegex)
  if (!match) {
    console.log(`⚠ Product not found: ${productSlug}`)
    return
  }

  const prefix = match[1]
  const mainImage = match[2]
  const colorsStr = match[3]

  // Extract base path from main image
  const basePath = mainImage.substring(0, mainImage.lastIndexOf('/'))

  // Extract color strings
  const colorMatches = colorsStr.match(/["']([^"']+)["']/g)
  if (!colorMatches) {
    console.log(`⚠ No colors found for: ${productSlug}`)
    return
  }

  const colors = colorMatches.map(c => c.replace(/["']/g, ''))

  // Build color objects with images
  const colorObjects = colors.map(colorName => {
    const colorSlug = normalizeColorForFilename(colorName)
    const imagePath = `${basePath}/${productSlug}-${colorSlug}.webp`
    const imageExists = checkImageExists(imagePath)

    if (!imageExists) {
      console.log(`  ⚠ Image not found: ${imagePath}`)
    }

    return {
      name: colorName,
      slug: colorSlug,
      hex: colorHexMap[colorName.toLowerCase()] || '#CCCCCC',
      image: imagePath
    }
  })

  // Format the new colors array
  const newColorsArray = `[\n      ${colorObjects.map(c =>
    `{\n        name: "${c.name}",\n        slug: "${c.slug}",\n        hex: "${c.hex}",\n        image: "${c.image}",\n      }`
  ).join(',\n      ')},\n    ]`

  // Replace in content
  const newProductDef = prefix + newColorsArray
  content = content.replace(productRegex, newProductDef)

  updatedCount++
  console.log(`✅ Updated ${productSlug} with ${colorObjects.length} color objects`)
})

if (updatedCount > 0) {
  fs.writeFileSync(productsPath, content, 'utf-8')
  console.log(`\n✅ Successfully updated ${updatedCount} products\n`)
} else {
  console.log('\n⚠ No products were updated\n')
}
