#!/usr/bin/env node

/**
 * 🖼️ FIND MISSING IMAGES
 *
 * Detecta productos en data/products.ts que referencian
 * imágenes que NO existen en public/products/
 *
 * Útil para:
 * - Identificar productos sin foto
 * - Detectar errores de naming
 * - Validar integridad del catálogo
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

console.log(`${colors.bright}${colors.red}`)
console.log('════════════════════════════════════════')
console.log('  🖼️  FIND MISSING IMAGES')
console.log('════════════════════════════════════════')
console.log(colors.reset)

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

const referencedImages = [...new Set(imageMatches)].map(match => {
  return match.replace('/products/', '')
})

console.log(`${colors.cyan}ℹ${colors.reset} Imágenes referenciadas: ${referencedImages.length}\n`)

// Leer imágenes existentes
const productsDir = path.join(__dirname, '..', 'public', 'products')

if (!fs.existsSync(productsDir)) {
  console.log(`${colors.red}✗ Carpeta no encontrada: ${productsDir}${colors.reset}`)
  process.exit(1)
}

const existingImages = fs.readdirSync(productsDir)
  .filter(f => /\.(webp|jpg|jpeg|png)$/i.test(f))

console.log(`${colors.cyan}ℹ${colors.reset} Imágenes existentes: ${existingImages.length}\n`)

// Encontrar imágenes referenciadas pero que NO existen
const missingImages = referencedImages.filter(img => !existingImages.includes(img))

if (missingImages.length === 0) {
  console.log(`${colors.green}✓ ¡Todas las imágenes referenciadas existen!${colors.reset}`)
  process.exit(0)
}

console.log(`${colors.red}✗ Imágenes FALTANTES (${missingImages.length}):\n`)

// Encontrar en qué productos están las imágenes faltantes
const productMatches = productsContent.match(/\{[^}]*id:\s*\d+[^}]*\}/gs)

const problematicProducts = []

missingImages.forEach((img, idx) => {
  console.log(`  ${idx + 1}. ${img}`)

  // Buscar en qué producto está
  if (productMatches) {
    const found = productMatches.find(p => p.includes(img))
    if (found) {
      const nameMatch = found.match(/name:\s*"([^"]+)"/)
      const slugMatch = found.match(/slug:\s*"([^"]+)"/)

      if (nameMatch || slugMatch) {
        const productName = nameMatch ? nameMatch[1] : slugMatch ? slugMatch[1] : 'Unknown'
        console.log(`     └─ Producto: ${productName}`)

        problematicProducts.push({
          image: img,
          product: productName,
          slug: slugMatch ? slugMatch[1] : null
        })
      }
    }
  }
})

console.log(`\n${colors.bright}Productos afectados:${colors.reset}\n`)

const uniqueProducts = [...new Map(problematicProducts.map(p => [p.product, p])).values()]

uniqueProducts.forEach((p, idx) => {
  console.log(`  ${idx + 1}. ${p.product}`)
  console.log(`     Slug: ${p.slug || 'N/A'}`)
  console.log(`     Imagen faltante: ${p.image}\n`)
})

console.log(`${colors.yellow}⚠${colors.reset} ACCIÓN REQUERIDA:`)
console.log(`  1. Verificar si las imágenes tienen otro nombre`)
console.log(`  2. Agregar las imágenes faltantes a public/products/`)
console.log(`  3. Actualizar products.ts con los nombres correctos\n`)

// Sugerencias de nombres similares
console.log(`${colors.cyan}ℹ${colors.reset} Buscando nombres similares...\n`)

missingImages.forEach(missing => {
  const baseName = missing.replace(/\.(webp|jpg|jpeg|png)$/i, '')
  const similar = existingImages.filter(existing => {
    const existingBase = existing.replace(/\.(webp|jpg|jpeg|png)$/i, '')
    return existingBase.includes(baseName) || baseName.includes(existingBase)
  })

  if (similar.length > 0) {
    console.log(`  ${missing} → Similares encontradas:`)
    similar.forEach(s => console.log(`    • ${s}`))
    console.log()
  }
})

// Guardar reporte
const reportPath = path.join(__dirname, 'missing-images-report.txt')
const report = `REPORTE DE IMÁGENES FALTANTES
Fecha: ${new Date().toISOString()}
Total: ${missingImages.length} imágenes

PRODUCTOS AFECTADOS:
${uniqueProducts.map((p, idx) => `${idx + 1}. ${p.product} (${p.slug})
   Imagen: ${p.image}`).join('\n')}

IMÁGENES FALTANTES:
${missingImages.map((img, idx) => `${idx + 1}. ${img}`).join('\n')}

SOLUCIÓN:
1. Buscar las imágenes originales
2. Renombrarlas al formato correcto
3. Convertir a WebP si es necesario
4. Copiar a: ${productsDir}
`

fs.writeFileSync(reportPath, report)
console.log(`${colors.green}✓${colors.reset} Reporte guardado: ${reportPath}\n`)
