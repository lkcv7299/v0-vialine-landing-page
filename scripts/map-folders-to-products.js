#!/usr/bin/env node

/**
 * 🗺️ FOLDER TO PRODUCTS MAPPER
 *
 * Mapea la estructura de carpetas de Google Drive
 * con los productos scrapeados de vialineperu.com
 *
 * Input:
 *  - Carpeta raíz con productos (ej: C:\Downloads\VIALINE\)
 *  - vialine-products.json (generado por scrape-vialine.js)
 *
 * Output:
 *  - products-mapped.csv (listo para image-wizard.js)
 */

const fs = require('fs')
const path = require('path')
const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

const prompt = (question) => new Promise((resolve) => rl.question(question, resolve))

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

log.title('🗺️ FOLDER TO PRODUCTS MAPPER')

// Estructura de carpeta típica:
// VIALINE/
//   BODY MANGA LARGA - ALGODON PREMIUM/
//     NEGRO/
//       IMG001.jpg
//       IMG002.jpg
//     FUCSIA/
//       IMG003.jpg

function normalizeName(name) {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Quitar acentos
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function extractCategoryFromFolderName(folderName) {
  const normalized = normalizeName(folderName)

  if (normalized.includes('legging')) return 'leggings'
  if (normalized.includes('biker')) return 'bikers'
  if (normalized.includes('short')) return 'shorts'
  if (normalized.includes('top')) return 'tops'
  if (normalized.includes('body')) return 'bodys'
  if (normalized.includes('conjunto')) return 'conjuntos'
  if (normalized.includes('buzo')) return 'buzos'
  if (normalized.includes('camiseta')) return 'tops'
  if (normalized.includes('enterizo')) return 'bodys'
  if (normalized.includes('falda')) return 'faldas'

  return 'leggings' // default
}

function extractFabricFromFolderName(folderName) {
  const normalized = normalizeName(folderName)

  if (normalized.includes('algodon')) return 'algodon'
  if (normalized.includes('french terry')) return 'french-terry'
  if (normalized.includes('ribb')) return 'ribb'
  if (normalized.includes('suplex')) return 'suplex'

  return 'suplex' // default
}

function cleanProductName(folderName) {
  // Remove fabric/material suffixes
  return folderName
    .replace(/\s*-\s*(ALGODON|SUPLEX|FRENCH TERRY|RIBB)\s*(PREMIUM|LISO)?\s*$/i, '')
    .trim()
}

function findMatchingProduct(folderName, scrapedProducts) {
  const cleanName = normalizeName(cleanProductName(folderName))

  // Buscar match exacto
  let match = scrapedProducts.find(p => {
    const productName = normalizeName(p.title)
    return productName.includes(cleanName) || cleanName.includes(productName)
  })

  if (match) return match

  // Buscar por palabras clave
  const keywords = cleanName.split(' ').filter(w => w.length > 3)

  match = scrapedProducts.find(p => {
    const productName = normalizeName(p.title)
    return keywords.some(keyword => productName.includes(keyword))
  })

  return match
}

async function scanFolderStructure(rootPath) {
  log.info('Escaneando estructura de carpetas...\n')

  const productFolders = fs.readdirSync(rootPath, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)

  const mappedData = []

  for (const productFolder of productFolders) {
    const productPath = path.join(rootPath, productFolder)

    console.log(`${colors.bright}${productFolder}${colors.reset}`)

    // Buscar subcarpetas de colores
    const colorFolders = fs.readdirSync(productPath, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name)

    if (colorFolders.length === 0) {
      // No hay subcarpetas de color, todas las imágenes están en raíz
      const images = fs.readdirSync(productPath)
        .filter(f => /\.(jpg|jpeg|png)$/i.test(f))

      if (images.length > 0) {
        mappedData.push({
          productFolder,
          color: 'Negro', // Default
          images,
          basePath: productPath
        })

        console.log(`  └─ ${images.length} imágenes (sin subcarpetas de color)`)
      }
    } else {
      // Hay subcarpetas de color
      for (const colorFolder of colorFolders) {
        const colorPath = path.join(productPath, colorFolder)
        const images = fs.readdirSync(colorPath)
          .filter(f => /\.(jpg|jpeg|png)$/i.test(f))

        if (images.length > 0) {
          mappedData.push({
            productFolder,
            color: colorFolder,
            images,
            basePath: colorPath
          })

          console.log(`  └─ ${colorFolder}: ${images.length} imágenes`)
        }
      }
    }

    console.log()
  }

  return mappedData
}

async function generateCSV(mappedData, scrapedProducts) {
  log.info('Generando CSV con datos scrapeados...\n')

  const csvRows = ['filename,product_name,color,category,audience,fabric,price,stock,folder']

  for (const item of mappedData) {
    const { productFolder, color, images, basePath } = item

    // Buscar producto en datos scrapeados
    const matchedProduct = findMatchingProduct(productFolder, scrapedProducts)

    const productName = matchedProduct
      ? matchedProduct.title
      : cleanProductName(productFolder)

    const price = matchedProduct ? matchedProduct.price : 45.00
    const fabric = matchedProduct
      ? matchedProduct.fabric
      : extractFabricFromFolderName(productFolder)

    const category = extractCategoryFromFolderName(productFolder)

    // Determinar audiencia por nombre o tags
    let audience = 'mujer'
    if (productFolder.toLowerCase().includes('nina') ||
        productFolder.toLowerCase().includes('niña')) {
      audience = 'nina'
    } else if (matchedProduct && matchedProduct.tags.includes('nina')) {
      audience = 'nina'
    }

    // Agregar cada imagen como una fila
    for (const image of images) {
      const imagePath = path.join(basePath, image)

      csvRows.push(
        `"${imagePath}","${productName}","${color}","${category}","${audience}","${fabric}",${price},10,"${productFolder}"`
      )
    }

    if (matchedProduct) {
      log.success(`✓ ${productFolder} → Matched: ${matchedProduct.title}`)
    } else {
      log.warning(`⚠ ${productFolder} → No match, usando defaults`)
    }
  }

  const outputPath = path.join(__dirname, 'products-mapped.csv')
  fs.writeFileSync(outputPath, csvRows.join('\n'))

  log.title('📊 RESUMEN')
  console.log(`Total filas generadas: ${csvRows.length - 1}`)
  console.log(`Archivo generado: ${outputPath}\n`)

  log.success('✓ CSV generado exitosamente!')
  log.info('Ahora ejecuta: npm run images (opción 1 - Batch mode)')
  log.info(`CSV path: ${outputPath}`)
}

async function main() {
  // Verificar que existe vialine-products.json
  const scrapedDataPath = path.join(__dirname, 'vialine-products.json')

  let scrapedProducts = []

  if (fs.existsSync(scrapedDataPath)) {
    log.success('Datos scrapeados encontrados: vialine-products.json')
    scrapedProducts = JSON.parse(fs.readFileSync(scrapedDataPath, 'utf-8'))
    console.log(`Productos scrapeados: ${scrapedProducts.length}\n`)
  } else {
    log.warning('No se encontró vialine-products.json')
    log.info('Ejecuta primero: node scripts/scrape-vialine.js')
    log.info('O continúa sin datos scrapeados (usará defaults)\n')

    const continueAnyway = await prompt('¿Continuar sin datos scrapeados? (s/n): ')
    if (continueAnyway.toLowerCase() !== 's') {
      process.exit(0)
    }
  }

  // Preguntar por carpeta raíz
  const rootPath = await prompt('\nRuta a la carpeta raíz con productos: ')

  if (!fs.existsSync(rootPath)) {
    log.error('Carpeta no encontrada')
    process.exit(1)
  }

  // Escanear estructura
  const mappedData = await scanFolderStructure(rootPath)

  if (mappedData.length === 0) {
    log.error('No se encontraron imágenes en la estructura de carpetas')
    process.exit(1)
  }

  // Generar CSV
  await generateCSV(mappedData, scrapedProducts)

  rl.close()
}

main().catch(error => {
  log.error(`Error fatal: ${error.message}`)
  rl.close()
  process.exit(1)
})
