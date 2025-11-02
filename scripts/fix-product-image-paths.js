#!/usr/bin/env node

/**
 * CORRECTOR DE RUTAS DE IMÁGENES
 * Actualiza las rutas de imágenes para que apunten a la primera imagen de color disponible
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

function normalizeColorForFilename(color) {
  const colorMap = {
    'Azul Marino': 'azul-marino',
    'Azul': 'azul-marino',  // Fix: Azul should map to azul-marino when that's what exists
    'Azulino': 'azulino',
    'Beige': 'beige',
    'Blanco': 'blanco',
    'Negro': 'negro',
    'Rojo': 'rojo',
    'Rosado': 'rosado',
    'Charcoal': 'charcoal',
    'Melange': 'melange',
    'Vino': 'vino',
    'Acero': 'acero',
    'Aqua': 'aqua',
    'Camel': 'camel',
    'Turquesa': 'turquesa',
    'Verde Petróleo': 'verde-petroleo',
    'Verde': 'verde-petroleo',  // Fix: Verde should map to verde-petroleo
    'Amarillo': 'amarillo',
    'Gris': 'gris',
    'Suplex': 'suplex'
  }
  return colorMap[color] || color.toLowerCase().replace(/\s+/g, '-')
}

async function main() {
  log.title('🔧 CORRECTOR DE RUTAS DE IMÁGENES')

  const reportPath = path.join(__dirname, 'products-colors-report.json')
  const productsPath = path.join(__dirname, '..', 'data', 'products.ts')
  const publicDir = path.join(__dirname, '..', 'public')

  log.info('Leyendo reporte de colores...')
  const report = JSON.parse(fs.readFileSync(reportPath, 'utf-8'))

  log.info('Leyendo products.ts...')
  let content = fs.readFileSync(productsPath, 'utf-8')

  let updated = 0
  let notFound = 0

  log.title('📝 ACTUALIZANDO RUTAS DE IMÁGENES')

  for (const product of report) {
    const { slug, colors, category } = product

    // Obtener el primer color
    const firstColor = colors[0]
    const colorSlug = normalizeColorForFilename(firstColor)

    // Construir la ruta de la imagen
    const audience = 'mujer' // Por ahora asumimos mujer, luego podemos mejorar esto
    const imagePath = `/productos/${audience}/${category}/${slug}-${colorSlug}.webp`

    // Verificar si la imagen existe
    const fullPath = path.join(publicDir, imagePath.replace(/^\//, ''))
    if (!fs.existsSync(fullPath)) {
      log.warning(`⚠ Imagen no existe: ${imagePath}`)
      continue
    }

    // Buscar y reemplazar la ruta de la imagen en products.ts
    const slugPattern = new RegExp(
      `(\\{[^}]*slug:\\s*"${slug.replace(/[-/]/g, '\\$&')}"[^}]*image:\\s*")[^"]*"`,
      'gs'
    )

    const match = content.match(slugPattern)

    if (match) {
      const newContent = content.replace(
        slugPattern,
        `$1${imagePath}"`
      )

      if (newContent !== content) {
        content = newContent
        updated++
        log.success(`✓ ${slug}: ${imagePath}`)
      }
    } else {
      notFound++
      log.warning(`⚠ ${slug}: No encontrado en products.ts`)
    }
  }

  // Guardar archivo actualizado
  fs.writeFileSync(productsPath, content)

  log.title('📊 RESUMEN')
  console.log(`✅ Rutas actualizadas: ${updated}`)
  console.log(`⚠️  No actualizadas: ${notFound}`)
  log.success(`✓ Archivo guardado: ${productsPath}`)
}

main().catch(error => {
  log.error(`Error fatal: ${error.message}`)
  console.error(error.stack)
  process.exit(1)
})
