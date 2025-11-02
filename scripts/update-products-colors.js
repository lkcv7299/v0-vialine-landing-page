#!/usr/bin/env node

/**
 * ACTUALIZADOR DE COLORES EN PRODUCTS.TS
 * Lee el reporte de colores y actualiza products.ts
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

async function main() {
  log.title('🔄 ACTUALIZADOR DE COLORES EN PRODUCTS.TS')

  const reportPath = path.join(__dirname, 'products-colors-report.json')
  const productsPath = path.join(__dirname, '..', 'data', 'products.ts')

  log.info('Leyendo reporte de colores...')
  const report = JSON.parse(fs.readFileSync(reportPath, 'utf-8'))

  log.info('Leyendo products.ts...')
  let content = fs.readFileSync(productsPath, 'utf-8')

  let updated = 0
  let notFound = 0

  log.title('📝 ACTUALIZANDO COLORES')

  for (const product of report) {
    const { slug, colors, image } = product

    // Buscar el producto en el archivo
    // Pattern: slug: "producto-slug",...colors: ["color1", "color2"]
    const slugPattern = new RegExp(
      `(\\{[^}]*slug:\\s*"${slug.replace(/[-/]/g, '\\$&')}"[^}]*colors:\\s*\\[)[^\\]]*\\]`,
      'gs'
    )

    const match = content.match(slugPattern)

    if (match) {
      // Reemplazar el array de colores
      const newColorsArray = JSON.stringify(colors)
      const replacement = content.replace(
        slugPattern,
        `$1${newColorsArray.slice(1, -1)}]`
      )

      if (replacement !== content) {
        content = replacement
        updated++
        log.success(`✓ ${slug}: ${colors.join(', ')}`)
      }
    } else {
      notFound++
      log.warning(`⚠ ${slug}: No encontrado en products.ts`)
    }
  }

  // Guardar archivo actualizado
  fs.writeFileSync(productsPath, content)

  log.title('📊 RESUMEN')
  console.log(`✅ Productos actualizados: ${updated}`)
  console.log(`⚠️  No encontrados: ${notFound}`)
  log.success(`✓ Archivo guardado: ${productsPath}`)
}

main().catch(error => {
  log.error(`Error fatal: ${error.message}`)
  console.error(error.stack)
  process.exit(1)
})
