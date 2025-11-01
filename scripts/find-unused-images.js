#!/usr/bin/env node

/**
 * 🔍 FIND UNUSED IMAGES
 *
 * Detecta imágenes en public/products/ que no están siendo
 * usadas en data/products.ts
 *
 * Útil para:
 * - Limpiar imágenes viejas
 * - Identificar productos sin código
 * - Optimizar espacio en disco
 */

const fs = require('fs')
const path = require('path')

const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  cyan: '\x1b[36m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m'
}

console.log(`${colors.bright}${colors.cyan}`)
console.log('════════════════════════════════════════')
console.log('  🔍 FIND UNUSED IMAGES')
console.log('════════════════════════════════════════')
console.log(colors.reset)

// Leer todas las imágenes en public/products/
const productsDir = path.join(__dirname, '..', 'public', 'products')

if (!fs.existsSync(productsDir)) {
  console.log(`${colors.red}✗ Carpeta no encontrada: ${productsDir}${colors.reset}`)
  process.exit(1)
}

const allImages = fs.readdirSync(productsDir)
  .filter(f => /\.(webp|jpg|jpeg|png)$/i.test(f))

console.log(`${colors.cyan}ℹ${colors.reset} Imágenes en carpeta: ${allImages.length}\n`)

// Leer products.ts y extraer todas las referencias de imágenes
const productsFile = path.join(__dirname, '..', 'data', 'products.ts')

if (!fs.existsSync(productsFile)) {
  console.log(`${colors.red}✗ Archivo no encontrado: ${productsFile}${colors.reset}`)
  process.exit(1)
}

const productsContent = fs.readFileSync(productsFile, 'utf-8')

// Extraer rutas de imágenes: /products/nombre.webp
const imageMatches = productsContent.match(/\/products\/[a-z0-9\-_.]+\.(webp|jpg|jpeg|png)/gi)

if (!imageMatches) {
  console.log(`${colors.yellow}⚠${colors.reset} No se encontraron referencias de imágenes en products.ts`)
  process.exit(0)
}

const usedImages = imageMatches.map(match => {
  return match.replace('/products/', '')
})

console.log(`${colors.cyan}ℹ${colors.reset} Imágenes referenciadas en código: ${new Set(usedImages).size}\n`)

// Encontrar imágenes no usadas
const unusedImages = allImages.filter(img => !usedImages.includes(img))

if (unusedImages.length === 0) {
  console.log(`${colors.green}✓ ¡Todas las imágenes están siendo usadas!${colors.reset}`)
  process.exit(0)
}

console.log(`${colors.yellow}⚠${colors.reset} Imágenes NO usadas (${unusedImages.length}):\n`)

let totalSize = 0

unusedImages.forEach((img, idx) => {
  const fullPath = path.join(productsDir, img)
  const stats = fs.statSync(fullPath)
  const sizeKB = (stats.size / 1024).toFixed(1)
  totalSize += stats.size

  console.log(`  ${idx + 1}. ${img} (${sizeKB} KB)`)
})

console.log(`\n${colors.cyan}ℹ${colors.reset} Espacio total: ${(totalSize / 1024 / 1024).toFixed(2)} MB`)

console.log(`\n${colors.bright}Opciones:${colors.reset}`)
console.log(`  1. Revisar manualmente y eliminar`)
console.log(`  2. Mover a backup: node scripts/backup-unused-images.js`)
console.log(`  3. Ignorar si son imágenes de futuro uso\n`)

// Guardar lista en archivo
const reportPath = path.join(__dirname, 'unused-images-report.txt')
const report = `REPORTE DE IMÁGENES NO USADAS
Fecha: ${new Date().toISOString()}
Total: ${unusedImages.length} imágenes
Tamaño: ${(totalSize / 1024 / 1024).toFixed(2)} MB

LISTADO:
${unusedImages.map((img, idx) => `${idx + 1}. ${img}`).join('\n')}

UBICACIÓN:
${productsDir}

ACCIÓN RECOMENDADA:
- Revisar si son imágenes antiguas o de futuro uso
- Mover a carpeta backup si no se necesitan
- Eliminar permanentemente si están obsoletas
`

fs.writeFileSync(reportPath, report)
console.log(`${colors.green}✓${colors.reset} Reporte guardado: ${reportPath}\n`)
