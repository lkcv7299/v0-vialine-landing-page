#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

const productsPath = path.join(__dirname, '..', 'data', 'products.ts')
const publicPath = path.join(__dirname, '..', 'public')

console.log('🔍 DIAGNÓSTICO COMPLETO DE PRODUCTOS E IMÁGENES\n')
console.log('='.repeat(80))

// Leer products.ts
const content = fs.readFileSync(productsPath, 'utf-8')

// Extraer todos los productos
const productRegex = /\{[^{}]*slug:\s*["']([^"']+)["'][^{}]*\}/gs
const matches = [...content.matchAll(productRegex)]

console.log(`\n📊 ESTADÍSTICAS GENERALES`)
console.log(`Total de productos en products.ts: ${matches.length}`)

// Analizar cada producto
const diagnostics = []
const productSlugs = []

// Extraer productos con más detalle
const detailedProductRegex = /\{\s*slug:\s*["']([^"']+)["'][^}]*?image:\s*["']([^"']+)["'][^}]*?colors:\s*(\[[^\]]*\])/gs

let match
let productIndex = 0
while ((match = detailedProductRegex.exec(content)) !== null) {
  productIndex++
  const slug = match[1]
  const mainImage = match[2]
  const colorsStr = match[3]

  productSlugs.push(slug)

  // Detectar si usa objetos o strings para colores
  const hasColorObjects = colorsStr.includes('name:')
  const isStringArray = !hasColorObjects

  // Extraer nombres de colores
  let colorNames = []
  if (hasColorObjects) {
    const nameMatches = [...colorsStr.matchAll(/name:\s*["']([^"']+)["']/g)]
    colorNames = nameMatches.map(m => m[1])
  } else {
    const stringMatches = [...colorsStr.matchAll(/["']([^"']+)["']/g)]
    colorNames = stringMatches.map(m => m[1])
  }

  // Detectar carpeta del producto
  const imagePath = mainImage.replace(/^\//, '')
  const imageDir = path.dirname(imagePath)
  const fullImageDir = path.join(publicPath, imageDir)

  // Contar imágenes existentes
  let existingImages = []
  let imageCount = 0
  if (fs.existsSync(fullImageDir)) {
    const allFiles = fs.readdirSync(fullImageDir)
    existingImages = allFiles.filter(f => {
      return f.startsWith(slug) && (f.endsWith('.webp') || f.endsWith('.jpg') || f.endsWith('.png'))
    })
    imageCount = existingImages.length
  }

  // Calcular imágenes esperadas (1 principal + 1 por color)
  const expectedImages = 1 + colorNames.length

  // Verificar si cada color tiene su imagen
  const missingColorImages = []
  if (hasColorObjects) {
    // Ya tiene objetos, verificar si las imágenes existen
    colorNames.forEach(colorName => {
      const colorSlug = colorName.toLowerCase().replace(/\s+/g, '-').replace(/ó/g, 'o')
      const colorImageName = `${slug}-${colorSlug}.webp`
      if (!existingImages.includes(colorImageName)) {
        missingColorImages.push(colorName)
      }
    })
  } else {
    // Usa strings, verificar si existen imágenes de colores
    colorNames.forEach(colorName => {
      const colorSlug = colorName.toLowerCase().replace(/\s+/g, '-').replace(/ó/g, 'o')
      const colorImageName = `${slug}-${colorSlug}.webp`
      if (existingImages.includes(colorImageName)) {
        // Existe la imagen pero no está en la estructura
        missingColorImages.push(`${colorName} (imagen existe pero no está en estructura)`)
      }
    })
  }

  const diagnostic = {
    index: productIndex,
    slug,
    mainImage,
    colorType: hasColorObjects ? 'objects' : 'strings',
    colorCount: colorNames.length,
    colorNames,
    imageDir: imageDir,
    existingImageCount: imageCount,
    existingImages,
    expectedImages,
    missingColorImages,
    status: imageCount >= expectedImages ? 'OK' : 'INCOMPLETE',
    needsUpdate: isStringArray && existingImages.length > 1
  }

  diagnostics.push(diagnostic)
}

console.log(`\n📁 ANÁLISIS POR CARPETA`)
const byFolder = {}
diagnostics.forEach(d => {
  const folder = d.imageDir.split('/').slice(-1)[0]
  if (!byFolder[folder]) {
    byFolder[folder] = {
      total: 0,
      withObjects: 0,
      withStrings: 0,
      incomplete: 0,
      needsUpdate: 0
    }
  }
  byFolder[folder].total++
  if (d.colorType === 'objects') byFolder[folder].withObjects++
  if (d.colorType === 'strings') byFolder[folder].withStrings++
  if (d.status === 'INCOMPLETE') byFolder[folder].incomplete++
  if (d.needsUpdate) byFolder[folder].needsUpdate++
})

Object.entries(byFolder).sort().forEach(([folder, stats]) => {
  console.log(`\n  ${folder}/`)
  console.log(`    Total productos: ${stats.total}`)
  console.log(`    Con objetos de color: ${stats.withObjects}`)
  console.log(`    Con strings de color: ${stats.withStrings}`)
  console.log(`    Incompletos (faltan imágenes): ${stats.incomplete}`)
  console.log(`    Necesitan actualización: ${stats.needsUpdate}`)
})

console.log(`\n\n❌ PRODUCTOS INCOMPLETOS O CON PROBLEMAS`)
console.log('='.repeat(80))

const problematicProducts = diagnostics.filter(d =>
  d.status === 'INCOMPLETE' || d.needsUpdate || d.missingColorImages.length > 0
)

if (problematicProducts.length === 0) {
  console.log('✅ No se encontraron productos con problemas')
} else {
  problematicProducts.forEach(d => {
    console.log(`\n${d.index}. ${d.slug}`)
    console.log(`   Tipo de colores: ${d.colorType}`)
    console.log(`   Colores definidos: ${d.colorCount} (${d.colorNames.join(', ')})`)
    console.log(`   Imágenes existentes: ${d.existingImageCount}/${d.expectedImages}`)
    console.log(`   Carpeta: ${d.imageDir}`)

    if (d.missingColorImages.length > 0) {
      console.log(`   ⚠️  Colores con problemas: ${d.missingColorImages.join(', ')}`)
    }

    if (d.needsUpdate) {
      console.log(`   🔧 NECESITA ACTUALIZACIÓN: Tiene imágenes de colores pero usa strings`)
    }

    if (d.status === 'INCOMPLETE') {
      console.log(`   ❌ INCOMPLETO: Faltan ${d.expectedImages - d.existingImageCount} imágenes`)
    }
  })
}

console.log(`\n\n✅ PRODUCTOS CORRECTOS`)
console.log('='.repeat(80))
const correctProducts = diagnostics.filter(d =>
  d.status === 'OK' && !d.needsUpdate && d.missingColorImages.length === 0
)
console.log(`Total: ${correctProducts.length}/${diagnostics.length}`)
correctProducts.slice(0, 10).forEach(d => {
  console.log(`  ✓ ${d.slug} (${d.colorCount} colores, ${d.existingImageCount} imágenes)`)
})
if (correctProducts.length > 10) {
  console.log(`  ... y ${correctProducts.length - 10} más`)
}

console.log(`\n\n📋 RESUMEN FINAL`)
console.log('='.repeat(80))
console.log(`Total productos: ${diagnostics.length}`)
console.log(`Productos correctos: ${correctProducts.length}`)
console.log(`Productos con problemas: ${problematicProducts.length}`)
console.log(`  - Incompletos (faltan imágenes): ${diagnostics.filter(d => d.status === 'INCOMPLETE').length}`)
console.log(`  - Necesitan actualización de estructura: ${diagnostics.filter(d => d.needsUpdate).length}`)
console.log(`  - Con imágenes de colores faltantes: ${diagnostics.filter(d => d.missingColorImages.length > 0).length}`)

// Guardar diagnóstico completo
const reportPath = path.join(__dirname, '..', 'diagnostic-report.json')
fs.writeFileSync(reportPath, JSON.stringify({
  timestamp: new Date().toISOString(),
  totalProducts: diagnostics.length,
  correctProducts: correctProducts.length,
  problematicProducts: problematicProducts.length,
  byFolder,
  diagnostics,
  problematicProducts: problematicProducts.map(d => ({
    slug: d.slug,
    issues: {
      incomplete: d.status === 'INCOMPLETE',
      needsUpdate: d.needsUpdate,
      missingColorImages: d.missingColorImages
    }
  }))
}, null, 2))

console.log(`\n📄 Reporte completo guardado en: diagnostic-report.json`)
