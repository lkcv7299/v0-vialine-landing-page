#!/usr/bin/env node

/**
 * CORRECTOR INTELIGENTE DE RUTAS
 * Busca las imágenes reales y corrige las rutas
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

const categoryFolders = {
  'bodys': 'bodys',
  'camisetas': 'camisetas',
  'leggings': 'legging',
  'shorts': 'short',
  'tops': 'tops',
  'enterizos': 'enterizo',
  'pescador': 'pescador',
  'torero': 'torero',
  'bikers': 'short'
}

function findFirstImage(baseDir, slug) {
  if (!fs.existsSync(baseDir)) return null

  const files = fs.readdirSync(baseDir)
  const matching = files.filter(f =>
    f.startsWith(slug) &&
    f.endsWith('.webp') &&
    !f.includes('-suplex-liso-premium') // Evitar versiones premium si buscamos la base
  )

  if (matching.length === 0) return null

  // Preferir la imagen sin sufijos numericos al final
  const preferred = matching.find(f => {
    const withoutExt = path.basename(f, '.webp')
    return withoutExt === slug || withoutExt.match(new RegExp(`^${slug}-[a-z-]+$`))
  })

  return preferred || matching[0]
}

async function main() {
  log.title('🔍 CORRECTOR INTELIGENTE DE RUTAS')

  const productsPath = path.join(__dirname, '..', 'data', 'products.ts')
  const publicDir = path.join(__dirname, '..', 'public')

  log.info('Leyendo products.ts...')
  let content = fs.readFileSync(productsPath, 'utf-8')

  let fixed = 0
  let notFound = 0

  // Corregir rutas que apuntan a /products/ (carpeta incorrecta)
  log.title('📝 CORRIGIENDO RUTAS DE /products/ A /productos/')

  // Encontrar todos los productos con rutas a /products/
  const wrongPathPattern = /(slug:\s*"([^"]+)"[\s\S]*?category:\s*"([^"]+)"[\s\S]*?fabric:\s*"([^"]+)"[\s\S]*?)image:\s*"\/products\/([^"]+)"/g

  content = content.replace(wrongPathPattern, (fullMatch, beforeImage, slug, category, fabric, filename) => {
    const audience = fullMatch.includes('audience: "nina"') ? 'nina' : 'mujer'
    const categoryFolder = categoryFolders[category] || category
    const baseDir = path.join(publicDir, 'productos', audience, categoryFolder)

    // Buscar la primera imagen que coincida con el slug
    const foundImage = findFirstImage(baseDir, slug)

    if (foundImage) {
      const newPath = `/productos/${audience}/${categoryFolder}/${foundImage}`
      fixed++
      log.success(`✓ ${slug}: ${newPath}`)
      return `${beforeImage}image: "${newPath}"`
    } else {
      notFound++
      log.warning(`⚠ ${slug}: No se encontró imagen en ${baseDir}`)
      return fullMatch
    }
  })

  // Guardar archivo
  fs.writeFileSync(productsPath, content)

  log.title('📊 RESUMEN')
  console.log(`✅ Rutas corregidas: ${fixed}`)
  console.log(`⚠️  No encontradas: ${notFound}`)
  log.success(`✓ Archivo actualizado: ${productsPath}`)
}

main().catch(error => {
  log.error(`Error fatal: ${error.message}`)
  console.error(error.stack)
  process.exit(1)
})
