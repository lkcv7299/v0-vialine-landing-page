#!/usr/bin/env node

/**
 * SINCRONIZADOR DE PRODUCTOS CON IMÁGENES
 * Analiza todas las imágenes disponibles y actualiza products.ts
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

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

function normalizeColorName(color) {
  const colorMap = {
    'azul-marino': 'Azul Marino',
    'azulino': 'Azulino',
    'beige': 'Beige',
    'blanco': 'Blanco',
    'negro': 'Negro',
    'rojo': 'Rojo',
    'rosado': 'Rosado',
    'charcoal': 'Charcoal',
    'melange': 'Melange',
    'vino': 'Vino',
    'acero': 'Acero',
    'aqua': 'Aqua',
    'camel': 'Camel',
    'turquesa': 'Turquesa',
    'verde-petroleo': 'Verde Petróleo',
    'amarillo': 'Amarillo',
    'gris': 'Gris',
    'azul': 'Azul'
  }
  return colorMap[color] || capitalize(color)
}

function extractProductInfo(filename) {
  // Remover .webp
  const name = filename.replace('.webp', '')

  // Patrones para detectar productos y colores
  // Ejemplo: body-manga-corta-beige.webp
  // Ejemplo: body-manga-corta-suplex-liso-premium-azul-marino.webp

  const parts = name.split('-')

  // Detectar el tipo de producto
  let productSlug = ''
  let colorName = ''

  // Casos especiales
  if (name.includes('body-manga-corta-suplex-liso-premium-')) {
    productSlug = 'body-manga-corta-suplex-liso-premium'
    colorName = name.replace('body-manga-corta-suplex-liso-premium-', '').split('-')[0]
  } else if (name.includes('body-manga-larga-suplex-liso-premium-')) {
    productSlug = 'body-manga-larga-suplex-liso-premium'
    colorName = name.replace('body-manga-larga-suplex-liso-premium-', '').split('-')[0]
  } else if (name.includes('body-manga-corta-')) {
    productSlug = 'body-manga-corta'
    colorName = name.replace('body-manga-corta-', '').split('-')[0]
  } else if (name.includes('body-manga-larga-')) {
    productSlug = 'body-manga-larga'
    colorName = name.replace('body-manga-larga-', '').split('-')[0]
  } else if (name.includes('camiseta-cuello-alto-')) {
    productSlug = 'camiseta-cuello-alto'
    colorName = name.replace('camiseta-cuello-alto-', '').split('-')[0]
  } else if (name.includes('maxi-short-')) {
    productSlug = 'maxi-short'
    colorName = name.replace('maxi-short-', '').split('-')[0]
  } else if (name.includes('mini-short-')) {
    productSlug = 'mini-short'
    colorName = name.replace('mini-short-', '').split('-')[0]
  } else if (name.includes('short-brasil-')) {
    productSlug = 'short-brasil'
    colorName = name.replace('short-brasil-', '').split('-')[0]
  } else if (name.includes('short-push-up-suplex-liso-premium-')) {
    productSlug = 'short-push-up-suplex-liso-premium'
    colorName = name.replace('short-push-up-suplex-liso-premium-', '').split('-')[0]
  } else if (name.includes('short-slim-suplex-liso-premium-')) {
    productSlug = 'short-slim-suplex-liso-premium'
    colorName = name.replace('short-slim-suplex-liso-premium-', '').split('-')[0]
  } else if (name.includes('legging-slim-suplex-liso-premium-')) {
    productSlug = 'legging-slim-suplex-liso-premium'
    colorName = name.replace('legging-slim-suplex-liso-premium-', '').split('-')[0]
  } else if (name.includes('legging-realce-suplex-liso-premium-')) {
    productSlug = 'legging-realce-suplex-liso-premium'
    colorName = name.replace('legging-realce-suplex-liso-premium-', '').split('-')[0]
  }

  // Si es una imagen con números al final, ignorarla (son imágenes adicionales)
  if (/\d+$/.test(name)) {
    return null
  }

  return {
    productSlug,
    colorName: normalizeColorName(colorName)
  }
}

function analyzeImages() {
  log.title('📸 ANÁLISIS DE IMÁGENES DISPONIBLES')

  const productosDir = path.join(__dirname, '..', 'public', 'productos', 'mujer')
  const categories = ['bodys', 'camisetas', 'legging', 'short', 'tops']

  const productsMap = new Map()

  for (const category of categories) {
    const categoryDir = path.join(productosDir, category)
    if (!fs.existsSync(categoryDir)) continue

    const files = fs.readdirSync(categoryDir)

    for (const file of files) {
      if (!file.endsWith('.webp')) continue
      if (file.includes('-1.webp') || file.includes('-2.webp') || file.includes('-3.webp') ||
          file.includes('-4.webp') || file.includes('-5.webp') || file.includes('-6.webp')) {
        continue // Skip numbered variants
      }

      const info = extractProductInfo(file)
      if (!info || !info.productSlug || !info.colorName) continue

      const key = info.productSlug
      if (!productsMap.has(key)) {
        productsMap.set(key, {
          slug: info.productSlug,
          category: category,
          colors: new Set(),
          mainImage: `/productos/mujer/${category}/${file}`
        })
      }

      productsMap.get(key).colors.add(info.colorName)
    }
  }

  log.title('📊 PRODUCTOS ENCONTRADOS')

  const report = []
  for (const [slug, data] of productsMap) {
    const colorsArray = Array.from(data.colors).sort()
    log.info(`${slug}: ${colorsArray.join(', ')}`)
    report.push({
      slug,
      category: data.category,
      colors: colorsArray,
      mainImage: data.mainImage
    })
  }

  return report
}

function generateProductUpdates(report) {
  log.title('📝 GENERANDO ACTUALIZACIONES')

  const updates = []

  for (const product of report) {
    updates.push({
      slug: product.slug,
      colors: product.colors,
      image: product.mainImage,
      category: product.category
    })
  }

  return updates
}

async function main() {
  log.title('🔄 SINCRONIZADOR DE PRODUCTOS CON IMÁGENES')

  const report = analyzeImages()
  const updates = generateProductUpdates(report)

  // Guardar reporte
  const reportPath = path.join(__dirname, 'products-colors-report.json')
  fs.writeFileSync(reportPath, JSON.stringify(updates, null, 2))

  log.success(`Reporte generado: ${reportPath}`)
  log.title('✅ ANÁLISIS COMPLETADO')
  console.log(`\nTotal de productos analizados: ${updates.length}`)
}

main().catch(error => {
  log.error(`Error fatal: ${error.message}`)
  console.error(error.stack)
  process.exit(1)
})
