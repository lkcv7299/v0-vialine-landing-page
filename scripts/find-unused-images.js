#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

const productsPath = path.join(__dirname, '..', 'data', 'products.ts')
const publicPath = path.join(__dirname, '..', 'public', 'productos')

console.log('Finding unused images...\n')

// Leer products.ts
const content = fs.readFileSync(productsPath, 'utf-8')

// Extraer todas las rutas de imágenes referenciadas
const imagePathRegex = /image:\s*["']([^"']+)["']/g
const referencedImages = new Set()

let match
while ((match = imagePathRegex.exec(content)) !== null) {
  const imagePath = match[1].replace(/^\//, '')
  referencedImages.add(imagePath)
}

console.log(`Referenced in products.ts: ${referencedImages.size}`)

// Encontrar todas las imágenes físicas
const allImageFiles = []

function scanDirectory(dir) {
  const items = fs.readdirSync(dir)
  items.forEach(item => {
    const fullPath = path.join(dir, item)
    const stat = fs.statSync(fullPath)
    if (stat.isDirectory()) {
      scanDirectory(fullPath)
    } else if (item.match(/\.(webp|jpg|jpeg|png)$/i)) {
      const relativePath = path.relative(publicPath, fullPath).split(path.sep).join('/')
      allImageFiles.push({
        filename: item,
        relativePath: `productos/${relativePath}`,
        size: stat.size
      })
    }
  })
}

scanDirectory(publicPath)

console.log(`Physical images found: ${allImageFiles.length}`)

// Encontrar no utilizadas
const unusedImages = allImageFiles.filter(img => !referencedImages.has(img.relativePath))

console.log(`\nUNUSED IMAGES: ${unusedImages.length}`)

// Agrupar por producto
const byProduct = {}

unusedImages.forEach(img => {
  const parts = img.filename.split('-')
  let productSlug = 'unknown'

  if (parts.length >= 2) {
    for (let i = 2; i <= Math.min(4, parts.length); i++) {
      const testSlug = parts.slice(0, i).join('-').replace(/\.webp$/, '')
      if (content.includes(`slug: "${testSlug}"`) || content.includes(`slug: '${testSlug}'`)) {
        productSlug = testSlug
        break
      }
    }
  }

  if (!byProduct[productSlug]) {
    byProduct[productSlug] = { images: [], totalSize: 0 }
  }

  byProduct[productSlug].images.push(img)
  byProduct[productSlug].totalSize += img.size
})

// Mostrar top 10 productos con más imágenes sin usar
const sorted = Object.entries(byProduct).sort((a, b) => b[1].images.length - a[1].images.length)

console.log('\nTop products with unused images:')
sorted.slice(0, 10).forEach(([slug, data]) => {
  const sizeMB = (data.totalSize / (1024 * 1024)).toFixed(2)
  console.log(`\n${slug}: ${data.images.length} images (${sizeMB}MB)`)
  data.images.slice(0, 5).forEach(img => {
    console.log(`  - ${img.filename}`)
  })
  if (data.images.length > 5) {
    console.log(`  ... and ${data.images.length - 5} more`)
  }
})

const totalUnusedMB = (unusedImages.reduce((sum, img) => sum + img.size, 0) / (1024 * 1024)).toFixed(2)
console.log(`\nTotal unused: ${totalUnusedMB}MB (${Math.round((unusedImages.length / allImageFiles.length) * 100)}%)`)

// Guardar reporte
const reportPath = path.join(__dirname, '..', 'unused-images-report.json')
fs.writeFileSync(reportPath, JSON.stringify({
  summary: {
    totalImages: allImageFiles.length,
    referenced: referencedImages.size,
    unused: unusedImages.length,
    unusedSizeMB: parseFloat(totalUnusedMB)
  },
  byProduct
}, null, 2))

console.log(`\nReport saved: unused-images-report.json`)
