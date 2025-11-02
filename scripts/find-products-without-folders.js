#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

const productsPath = path.join(__dirname, '..', 'data', 'products.ts')
const downloadsPath = 'C:\\Users\\USER\\Downloads\\Fotos para Web v1-20251101T230753Z-1-001\\Fotos para Web v1'

console.log('🔍 IDENTIFICANDO PRODUCTOS SIN CARPETAS DE IMÁGENES\n')
console.log('='.repeat(80))

// Mapeo de slugs a nombres de carpetas esperadas
const folderMapping = {
  'body-manga-corta': 'BODY MANGA CORTA - ALGODON PREMIUM',
  'body-manga-corta-suplex': 'BODY MANGA CORTA - SUPLEX LISO PREMIUM',
  'body-manga-larga': 'BODY MANGA LARGA - ALGODON PREMIUM',
  'body-manga-larga-suplex': 'BODY MANGA LARGA - SUPLEX LISO PREMIUM',
  'camiseta-cuello-alto': 'CAMISETA CUELLO ALTO - ALGODON PREMIUM',
  'camiseta-gia': 'CAMISETA GIA - ALGODON PREMIUM',
  'camiseta-manga-corta': 'CAMISETA MANGA CORTA - ALGODON PREMIUM',
  'camiseta-manga-larga': 'CAMISETA MANGA LARGA - ALGODON PREMIUM',
  'enterizo-manga-cero': 'ENTERIZO MANGA CERO - SUPLEX LISO PREMIUM',
  'enterizo-tiras': 'ENTERIZO TIRAS - SUPLEX LISO PREMIUM',
  'legging-push-up': 'LEGGING PUSH UP - SUPLEX LISO PREMIUM',
  'legging-realce': 'LEGGING REALCE - SUPLEX LISO PREMIUM',
  'legging-slim': 'LEGGING SLIM - SUPLEX LISO PREMIUM',
  'maxi-short': 'MAXI SHORT - ALGODON PREMIUM',
  'mini-short': 'MINI SHORT - ALGODON PREMIUM',
  'short-brasil': 'SHORT BRASIL - ALGODON PREMIUM',
  'short-push-up': 'SHORT PUSH UP - SUPLEX LISO PREMIUM',
  'short-slim': 'SHORT SLIM - SUPLEX LISO PREMIUM',
  'top-afrodita': 'TOP AFRODITA - SUPLEX LISO PREMIUM',
  'top-paradise': 'TOP PARADISE - SUPLEX LISO PREMIUM',
}

// Leer products.ts y extraer todos los slugs de productos
const content = fs.readFileSync(productsPath, 'utf-8')
const productRegex = /\{\s*slug:\s*["']([^"']+)["'][^}]*?category:/g

let match
const allProductSlugs = []
const seenSlugs = new Set()

while ((match = productRegex.exec(content)) !== null) {
  const slug = match[1]
  if (!seenSlugs.has(slug)) {
    seenSlugs.add(slug)
    allProductSlugs.push(slug)
  }
}

console.log(`📊 Total de productos en products.ts: ${allProductSlugs.length}\n`)

// Productos con carpetas
const productsWithFolders = Object.keys(folderMapping)
console.log(`📁 Productos con carpetas de imágenes: ${productsWithFolders.length}\n`)

// Encontrar productos sin carpetas
const productsWithoutFolders = allProductSlugs.filter(slug => !folderMapping[slug])

console.log(`\n${'='.repeat(80)}`)
console.log(`❌ PRODUCTOS SIN CARPETAS DE IMÁGENES (${productsWithoutFolders.length})`)
console.log('='.repeat(80) + '\n')

// Agrupar por categoría
const byCategory = {}

productsWithoutFolders.forEach(slug => {
  // Extraer info del producto
  const productMatch = content.match(new RegExp(
    `\\{[^{}]*slug:\\s*["']${slug}["'][^{}]*category:\\s*["']([^"']+)["'][^{}]*audience:\\s*["']([^"']+)["']`,
    's'
  ))

  if (productMatch) {
    const category = productMatch[1]
    const audience = productMatch[2]

    if (!byCategory[category]) {
      byCategory[category] = []
    }

    byCategory[category].push({
      slug,
      audience
    })
  } else {
    if (!byCategory['unknown']) {
      byCategory['unknown'] = []
    }
    byCategory['unknown'].push({ slug, audience: 'unknown' })
  }
})

// Mostrar por categoría
Object.keys(byCategory).sort().forEach(category => {
  console.log(`\n📦 ${category.toUpperCase()} (${byCategory[category].length} productos):`)
  byCategory[category].forEach(product => {
    console.log(`   - ${product.slug} (${product.audience})`)
  })
})

console.log(`\n\n${'='.repeat(80)}`)
console.log('✅ PRODUCTOS CON CARPETAS DE IMÁGENES')
console.log('='.repeat(80))
console.log(productsWithFolders.join('\n'))

// Guardar reporte
const report = {
  timestamp: new Date().toISOString(),
  summary: {
    totalProducts: allProductSlugs.length,
    withFolders: productsWithFolders.length,
    withoutFolders: productsWithoutFolders.length,
    percentageWithFolders: Math.round((productsWithFolders.length / allProductSlugs.length) * 100)
  },
  productsWithFolders,
  productsWithoutFolders: productsWithoutFolders.map(slug => {
    const cat = Object.keys(byCategory).find(c => byCategory[c].some(p => p.slug === slug))
    const product = byCategory[cat]?.find(p => p.slug === slug)
    return {
      slug,
      category: cat,
      audience: product?.audience
    }
  })
}

const reportPath = path.join(__dirname, '..', 'products-without-folders-report.json')
fs.writeFileSync(reportPath, JSON.stringify(report, null, 2))

console.log(`\n\n📄 Reporte guardado en: products-without-folders-report.json`)
console.log(`\n📊 Resumen:`)
console.log(`   Total: ${allProductSlugs.length} productos`)
console.log(`   Con carpetas: ${productsWithFolders.length} (${report.summary.percentageWithFolders}%)`)
console.log(`   Sin carpetas: ${productsWithoutFolders.length} (${100 - report.summary.percentageWithFolders}%)`)
