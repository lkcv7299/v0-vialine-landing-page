#!/usr/bin/env node

/**
 * 🕷️ VIALINE WEB SCRAPER
 *
 * Extrae TODA la información de productos desde vialineperu.com
 * incluyendo: nombre, color, precio, material, tallas, tags, imágenes, etc.
 *
 * Genera un JSON completo que se usa para mapear las carpetas.
 */

const fs = require('fs')
const path = require('path')
const https = require('https')

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

log.title('🕷️ VIALINE WEB SCRAPER')

console.log('Este script extrae información de productos de vialineperu.com')
console.log('Generará un archivo JSON con toda la data necesaria.\n')

// URL base de la web antigua
const BASE_URL = 'https://vialineperu.com'

// Categorías a scrapear
const CATEGORIES = [
  '/categoria-producto/mujer/',
  '/categoria-producto/nina/',
  '/categoria-producto/leggings/',
  '/categoria-producto/tops/',
  '/categoria-producto/bodys/',
  '/categoria-producto/shorts/',
  '/categoria-producto/conjuntos/'
]

let scrapedProducts = []

async function fetchHTML(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = ''
      res.on('data', chunk => data += chunk)
      res.on('end', () => resolve(data))
    }).on('error', reject)
  })
}

function parseProductHTML(html, url) {
  // Regex patterns para extraer información
  // Ajustar según estructura real de vialineperu.com

  const titleMatch = html.match(/<h1[^>]*class="[^"]*product[_-]title[^"]*"[^>]*>([^<]+)<\/h1>/i)
  const priceMatch = html.match(/<span[^>]*class="[^"]*woocommerce-Price-amount[^"]*"[^>]*>.*?([0-9,.]+).*?<\/span>/i)
  const descMatch = html.match(/<div[^>]*class="[^"]*product[_-]description[^"]*"[^>]*>([\s\S]*?)<\/div>/i)
  const imageMatch = html.match(/<img[^>]*class="[^"]*wp-post-image[^"]*"[^>]*src="([^"]+)"/i)

  // Extraer variaciones de color
  const colorMatches = html.matchAll(/<option[^>]*value="([^"]*)"[^>]*>([^<]+)<\/option>/gi)
  const colors = []
  for (const match of colorMatches) {
    if (match[2] && !match[2].includes('Elige')) {
      colors.push(match[2].trim())
    }
  }

  // Extraer tallas
  const sizeMatches = html.matchAll(/data-size="([^"]+)"/gi)
  const sizes = []
  for (const match of sizeMatches) {
    if (!sizes.includes(match[1])) {
      sizes.push(match[1])
    }
  }

  // Extraer material/tela
  let fabric = 'suplex' // default
  const fabricMatch = html.match(/(?:material|tela|fabric):\s*([^<\n]+)/i)
  if (fabricMatch) {
    const f = fabricMatch[1].toLowerCase()
    if (f.includes('algodon') || f.includes('algodón')) fabric = 'algodon'
    else if (f.includes('french terry')) fabric = 'french-terry'
    else if (f.includes('ribb')) fabric = 'ribb'
  }

  // Extraer tags/categorías
  const tags = []
  const categoryMatches = html.matchAll(/<a[^>]*rel="tag"[^>]*>([^<]+)<\/a>/gi)
  for (const match of categoryMatches) {
    tags.push(match[1].trim().toLowerCase())
  }

  return {
    title: titleMatch ? titleMatch[1].trim() : null,
    price: priceMatch ? parseFloat(priceMatch[1].replace(',', '')) : 0,
    description: descMatch ? descMatch[1].replace(/<[^>]+>/g, '').trim() : '',
    image: imageMatch ? imageMatch[1] : null,
    colors: colors.length > 0 ? colors : ['Negro'], // Default si no se detecta
    sizes: sizes.length > 0 ? sizes : ['S', 'M', 'L'],
    fabric,
    tags,
    url
  }
}

async function scrapeCategory(categoryUrl) {
  log.info(`Scrapeando: ${categoryUrl}`)

  try {
    const html = await fetchHTML(BASE_URL + categoryUrl)

    // Extraer URLs de productos
    const productUrlMatches = html.matchAll(/<a[^>]*href="([^"]*\/producto\/[^"]+)"[^>]*>/gi)
    const productUrls = [...new Set([...productUrlMatches].map(m => m[1]))]

    log.success(`Encontrados ${productUrls.length} productos en ${categoryUrl}`)

    for (const productUrl of productUrls) {
      await scrapeProduct(productUrl)
      // Delay para no sobrecargar el servidor
      await new Promise(resolve => setTimeout(resolve, 1000))
    }

  } catch (error) {
    log.error(`Error scrapeando ${categoryUrl}: ${error.message}`)
  }
}

async function scrapeProduct(productUrl) {
  try {
    log.info(`  → ${productUrl}`)

    const html = await fetchHTML(productUrl)
    const product = parseProductHTML(html, productUrl)

    if (product.title) {
      scrapedProducts.push(product)
      log.success(`    ✓ ${product.title} (${product.colors.length} colores)`)
    }

  } catch (error) {
    log.error(`    ✗ Error: ${error.message}`)
  }
}

async function main() {
  log.info('Iniciando scraping de vialineperu.com...\n')

  // Scrapear cada categoría
  for (const category of CATEGORIES) {
    await scrapeCategory(category)
  }

  // Guardar resultados
  const outputPath = path.join(__dirname, 'vialine-products.json')
  fs.writeFileSync(outputPath, JSON.stringify(scrapedProducts, null, 2))

  log.title('📊 RESUMEN')
  console.log(`Total productos scrapeados: ${scrapedProducts.length}`)
  console.log(`Archivo generado: ${outputPath}\n`)

  // Generar resumen por categorías
  const byCategoryTitle = {}
  scrapedProducts.forEach(p => {
    p.tags.forEach(tag => {
      if (!byCategoryTitle[tag]) byCategoryTitle[tag] = 0
      byCategoryTitle[tag]++
    })
  })

  console.log('Productos por categoría:')
  Object.entries(byCategoryTitle)
    .sort((a, b) => b[1] - a[1])
    .forEach(([cat, count]) => {
      console.log(`  ${cat}: ${count}`)
    })

  log.success('\n✓ Scraping completado!')
  log.info('Ahora ejecuta: node scripts/map-folders-to-products.js')
}

main().catch(error => {
  log.error(`Error fatal: ${error.message}`)
  process.exit(1)
})
