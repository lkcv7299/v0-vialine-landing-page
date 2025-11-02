#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

const productsPath = path.join(__dirname, '..', 'data', 'products.ts')

console.log('🔧 Reverting products without color variants to simple strings...\n')

// Products that DON'T have color variants (only main image)
const productsWithoutVariants = {
  'camiseta-cuello-alto': {
    image: '/productos/mujer/camisetas/camiseta-cuello-alto.webp',
    colors: ['Azul Marino', 'Beige', 'Blanco', 'Negro', 'Rojo', 'Turquesa', 'Verde Petróleo', 'Vino']
  },
  'camiseta-manga-larga': {
    image: '/productos/mujer/camisetas/camiseta-manga-larga.webp',
    colors: ['Azul Marino', 'Beige', 'Blanco', 'Negro', 'Rojo', 'Turquesa', 'Vino']
  },
  'camiseta-manga-corta': {
    image: '/productos/mujer/camisetas/camiseta-manga-corta.webp',
    colors: ['Azul Marino', 'Beige', 'Blanco', 'Negro', 'Rojo']
  },
  'camiseta-gia': {
    image: '/productos/mujer/camisetas/camiseta-gia.webp',
    colors: ['Blanco', 'Negro', 'Vino']
  }
}

let content = fs.readFileSync(productsPath, 'utf-8')
let updatedCount = 0

Object.entries(productsWithoutVariants).forEach(([productSlug, data]) => {
  // Find and replace color objects array with simple strings
  const productRegex = new RegExp(
    `(\\{\\s*slug:\\s*["']${productSlug}["'][\\s\\S]*?image:\\s*["'])[^"']+([^}]*?colors:\\s*)\\[[\\s\\S]*?\\]`,
    ''
  )

  const match = content.match(productRegex)
  if (!match) {
    console.log(`⚠ Product not found: ${productSlug}`)
    return
  }

  const colorsArray = JSON.stringify(data.colors)
  const replacement = `$1${data.image}$2${colorsArray}`

  content = content.replace(productRegex, replacement)

  updatedCount++
  console.log(`✅ Reverted ${productSlug} to simple color strings`)
})

if (updatedCount > 0) {
  fs.writeFileSync(productsPath, content, 'utf-8')
  console.log(`\n✅ Successfully reverted ${updatedCount} products\n`)
} else {
  console.log('\n⚠ No products were updated\n')
}
