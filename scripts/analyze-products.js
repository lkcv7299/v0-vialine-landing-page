#!/usr/bin/env node

/**
 * ANALIZADOR DE PRODUCTOS
 * Identifica productos nuevos vs existentes y genera reporte
 */

const fs = require('fs')
const path = require('path')

const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  cyan: '\x1b[36m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  magenta: '\x1b[35m'
}

const log = {
  info: (msg) => console.log(`${colors.cyan}ℹ${colors.reset} ${msg}`),
  success: (msg) => console.log(`${colors.green}✓${colors.reset} ${msg}`),
  warning: (msg) => console.log(`${colors.yellow}⚠${colors.reset} ${msg}`),
  error: (msg) => console.log(`${colors.red}✗${colors.reset} ${msg}`),
  title: (msg) => console.log(`\n${colors.bright}${colors.magenta}${msg}${colors.reset}\n`)
}

function generateSlug(text) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

const categoryFolders = {
  'bodys': 'bodys',
  'camisetas': 'camisetas',
  'leggings': 'legging',
  'shorts': 'short',
  'tops': 'tops',
  'enterizos': 'enterizo',
  'pescador': 'pescador',
  'torero': 'torero'
}

async function main() {
  log.title('🔍 ANALIZADOR DE PRODUCTOS')

  const csvPath = path.join(__dirname, 'products-mapped.csv')
  const productsPath = path.join(__dirname, '..', 'data', 'products.ts')

  // Leer CSV
  log.info('Leyendo CSV...')
  const csvContent = fs.readFileSync(csvPath, 'utf-8')
  const lines = csvContent.split('\n').slice(1)

  // Leer products.ts para extraer slugs existentes
  log.info('Leyendo products.ts...')
  const productsContent = fs.readFileSync(productsPath, 'utf-8')

  // Extraer slugs existentes
  const slugRegex = /slug:\s*"([^"]+)"/g
  const existingSlugs = new Set()
  let match
  while ((match = slugRegex.exec(productsContent)) !== null) {
    existingSlugs.add(match[1])
  }

  log.info(`Productos existentes en products.ts: ${existingSlugs.size}`)

  // Procesar CSV para identificar productos
  const productsFromCSV = new Map()

  for (const line of lines) {
    if (!line.trim()) continue

    try {
      const regex = /"([^"]*)"|([^,]+)/g
      const values = []
      let m

      while ((m = regex.exec(line)) !== null) {
        values.push(m[1] !== undefined ? m[1] : m[2])
      }

      if (values.length < 4) continue

      const [imagePath, productName, color, category, audience, fabric] = values

      const baseSlug = generateSlug(productName)

      if (!productsFromCSV.has(baseSlug)) {
        productsFromCSV.set(baseSlug, {
          name: productName,
          slug: baseSlug,
          category: category || 'unknown',
          audience: audience || 'mujer',
          fabric: fabric || 'algodon',
          colors: new Set(),
          isNew: !existingSlugs.has(baseSlug)
        })
      }

      const product = productsFromCSV.get(baseSlug)
      product.colors.add(color)
    } catch (error) {
      // Skip error lines
    }
  }

  // Clasificar productos
  const newProducts = []
  const existingProducts = []

  for (const [slug, product] of productsFromCSV) {
    if (product.isNew) {
      newProducts.push(product)
    } else {
      existingProducts.push(product)
    }
  }

  log.title('📊 REPORTE')

  console.log(`Total de productos en CSV: ${productsFromCSV.size}`)
  console.log(`Productos NUEVOS: ${newProducts.length}`)
  console.log(`Productos EXISTENTES (actualizar): ${existingProducts.length}\n`)

  if (newProducts.length > 0) {
    log.title('✨ PRODUCTOS NUEVOS (agregar a products.ts)')
    newProducts.forEach(p => {
      const categoryFolder = categoryFolders[p.category] || p.category
      const colors = Array.from(p.colors).sort()
      console.log(`\n  {`)
      console.log(`    slug: "${p.slug}",`)
      console.log(`    title: "${p.name}",`)
      console.log(`    price: 45,`)
      console.log(`    image: "/productos/${p.audience}/${categoryFolder}/${p.slug}-${generateSlug(colors[0])}.webp",`)
      console.log(`    category: "${p.category}",`)
      console.log(`    fabric: "${p.fabric}",`)
      console.log(`    colors: ${JSON.stringify(colors)},`)
      console.log(`    sizes: ["XS", "S", "M", "L", "XL"],`)
      console.log(`    audience: "${p.audience}",`)
      console.log(`  },`)
    })
  }

  if (existingProducts.length > 0) {
    log.title('🔄 PRODUCTOS EXISTENTES (actualizar colores)')
    existingProducts.forEach(p => {
      const colors = Array.from(p.colors).sort()
      console.log(`${p.slug}: ${JSON.stringify(colors)}`)
    })
  }

  // Guardar reporte
  const reportPath = path.join(__dirname, 'products-report.json')
  fs.writeFileSync(reportPath, JSON.stringify({
    new: newProducts.map(p => ({
      slug: p.slug,
      name: p.name,
      category: p.category,
      colors: Array.from(p.colors).sort()
    })),
    existing: existingProducts.map(p => ({
      slug: p.slug,
      name: p.name,
      category: p.category,
      colors: Array.from(p.colors).sort()
    }))
  }, null, 2))

  log.success(`Reporte guardado: ${reportPath}`)
}

main().catch(error => {
  log.error(`Error fatal: ${error.message}`)
  console.error(error.stack)
  process.exit(1)
})
