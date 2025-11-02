#!/usr/bin/env node

/**
 * CONVERTIDOR MASIVO JPG/PNG → WebP
 * Usa Sharp para conversión de alta calidad
 */

const fs = require('fs')
const path = require('path')
const sharp = require('sharp')

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

async function convertToWebP(inputPath, outputPath) {
  try {
    await sharp(inputPath)
      .webp({ quality: 85 })
      .toFile(outputPath)
    return true
  } catch (error) {
    log.error(`Error convirtiendo ${path.basename(inputPath)}: ${error.message}`)
    return false
  }
}

function generateSlug(text) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

async function main() {
  log.title('🔄 CONVERTIDOR MASIVO JPG/PNG → WebP')

  const csvPath = path.join(__dirname, 'products-mapped.csv')
  const outputDir = path.join(__dirname, '..', 'public', 'products')

  if (!fs.existsSync(csvPath)) {
    log.error('No se encontró products-mapped.csv')
    process.exit(1)
  }

  // Crear carpeta output si no existe
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true })
    log.info(`Carpeta creada: ${outputDir}`)
  }

  log.info('Leyendo CSV...')
  const csvContent = fs.readFileSync(csvPath, 'utf-8')
  const lines = csvContent.split('\n').slice(1) // Skip header

  log.info(`Total de imágenes: ${lines.length}`)
  log.warning('⏱️  Esto puede tardar 5-10 minutos...\n')

  let processed = 0
  let errors = 0
  let skipped = 0

  for (const line of lines) {
    if (!line.trim()) continue

    try {
      // Parse CSV line
      const regex = /"([^"]*)"(?:,|$)|([^,]+)(?:,|$)/g
      const values = []
      let match

      while ((match = regex.exec(line)) !== null) {
        values.push(match[1] !== undefined ? match[1] : match[2])
      }

      if (values.length < 3) continue

      const [imagePath, productName, color] = values

      if (!fs.existsSync(imagePath)) {
        log.warning(`Imagen no encontrada: ${path.basename(imagePath)}`)
        errors++
        continue
      }

      // Generar nombre WebP
      const baseSlug = generateSlug(productName)
      const colorSlug = generateSlug(color)
      const ext = path.extname(imagePath)
      const basename = path.basename(imagePath, ext)

      // Generar un nombre único basado en el archivo original
      const outputFilename = `${baseSlug}-${colorSlug}-${basename}.webp`
      const outputPath = path.join(outputDir, outputFilename)

      // Verificar si ya existe
      if (fs.existsSync(outputPath)) {
        skipped++
        continue
      }

      // Convertir
      const success = await convertToWebP(imagePath, outputPath)

      if (success) {
        processed++

        if (processed % 20 === 0) {
          log.info(`Procesadas: ${processed}/${lines.length} (${Math.round(processed/lines.length*100)}%)`)
        }
      } else {
        errors++
      }

    } catch (error) {
      log.error(`Error procesando línea: ${error.message}`)
      errors++
    }
  }

  log.title('📊 RESUMEN FINAL')
  console.log(`✅ Convertidas exitosamente: ${processed}`)
  console.log(`⏭️  Ya existían (skip): ${skipped}`)
  console.log(`❌ Errores: ${errors}`)
  console.log(`📁 Ubicación: ${outputDir}\n`)

  if (processed > 0) {
    log.success('✓ Conversión completada!')
    log.info('Próximo paso: Mergear data/products-generated.ts con data/products.ts')
  } else if (skipped > 0) {
    log.warning('Todas las imágenes ya estaban convertidas')
  }
}

main().catch(error => {
  log.error(`Error fatal: ${error.message}`)
  console.error(error.stack)
  process.exit(1)
})
