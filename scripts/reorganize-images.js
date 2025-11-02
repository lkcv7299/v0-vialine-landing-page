#!/usr/bin/env node

/**
 * REORGANIZADOR DE IMÁGENES WebP
 * Mueve imágenes de public/products/ a public/productos/mujer/{categoría}/
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

// Mapeo de categorías (plural -> singular)
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
  log.title('📁 REORGANIZADOR DE IMÁGENES WebP')

  const csvPath = path.join(__dirname, 'products-mapped.csv')
  const sourceDir = path.join(__dirname, '..', 'public', 'products')
  const targetBaseDir = path.join(__dirname, '..', 'public', 'productos', 'mujer')

  if (!fs.existsSync(csvPath)) {
    log.error('No se encontró products-mapped.csv')
    process.exit(1)
  }

  if (!fs.existsSync(sourceDir)) {
    log.error(`No se encontró la carpeta: ${sourceDir}`)
    process.exit(1)
  }

  log.info('Leyendo CSV...')
  const csvContent = fs.readFileSync(csvPath, 'utf-8')
  const lines = csvContent.split('\n').slice(1) // Skip header

  let moved = 0
  let errors = 0
  let skipped = 0

  // Agrupar por producto base para tener una imagen principal
  const productsMap = new Map()

  for (const line of lines) {
    if (!line.trim()) continue

    try {
      // Parse CSV line
      const regex = /"([^"]*)"|([^,]+)/g
      const values = []
      let match

      while ((match = regex.exec(line)) !== null) {
        values.push(match[1] !== undefined ? match[1] : match[2])
      }

      if (values.length < 3) continue

      const [imagePath, productName, color, category] = values

      // Generar slugs
      const baseSlug = generateSlug(productName)
      const colorSlug = generateSlug(color)
      const ext = path.extname(imagePath)
      const basename = path.basename(imagePath, ext)

      // Nombre del archivo WebP en source
      const sourceFilename = `${baseSlug}-${colorSlug}-${basename}.webp`
      const sourceFile = path.join(sourceDir, sourceFilename)

      if (!fs.existsSync(sourceFile)) {
        log.warning(`No encontrado: ${sourceFilename}`)
        errors++
        continue
      }

      // Determinar carpeta de categoría
      const categoryFolder = categoryFolders[category] || category
      const targetDir = path.join(targetBaseDir, categoryFolder)

      // Crear carpeta si no existe
      if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true })
        log.info(`Carpeta creada: ${categoryFolder}/`)
      }

      // Determinar nombre final (primera imagen de cada color)
      const targetFilename = `${baseSlug}-${colorSlug}.webp`
      const targetFile = path.join(targetDir, targetFilename)

      // Solo mover la primera imagen de cada producto-color
      const key = `${baseSlug}-${colorSlug}`
      if (!productsMap.has(key)) {
        // Mover archivo
        fs.copyFileSync(sourceFile, targetFile)
        productsMap.set(key, {
          source: sourceFilename,
          target: `productos/mujer/${categoryFolder}/${targetFilename}`
        })
        moved++

        if (moved % 20 === 0) {
          log.info(`Movidas: ${moved}`)
        }
      } else {
        skipped++
      }

    } catch (error) {
      log.error(`Error procesando línea: ${error.message}`)
      errors++
    }
  }

  log.title('📊 RESUMEN FINAL')
  console.log(`✅ Imágenes movidas: ${moved}`)
  console.log(`⏭️  Duplicados (skip): ${skipped}`)
  console.log(`❌ Errores: ${errors}`)
  console.log(`📁 Ubicación: ${targetBaseDir}\n`)

  // Mostrar muestra de rutas generadas
  log.title('🔍 MUESTRA DE RUTAS GENERADAS')
  let count = 0
  for (const [key, data] of productsMap) {
    if (count++ < 5) {
      console.log(`/${data.target}`)
    } else {
      break
    }
  }

  if (moved > 0) {
    log.success('✓ Reorganización completada!')
    log.info('Próximo paso: Actualizar rutas en data/products.ts')
  }
}

main().catch(error => {
  log.error(`Error fatal: ${error.message}`)
  console.error(error.stack)
  process.exit(1)
})
