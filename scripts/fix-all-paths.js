#!/usr/bin/env node

/**
 * CORRECTOR DE RUTAS DE IMÁGENES
 * Corrige todas las rutas en products.ts para que apunten a la estructura correcta
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

async function main() {
  log.title('🔧 CORRECTOR DE RUTAS DE IMÁGENES')

  const productsPath = path.join(__dirname, '..', 'data', 'products.ts')

  log.info('Leyendo products.ts...')
  let content = fs.readFileSync(productsPath, 'utf-8')

  let fixed = 0

  // Patrón 1: Corregir rutas que apuntan a /products/
  const productsPattern = /image:\s*"\/products\//g
  const productsMatches = content.match(productsPattern)
  if (productsMatches) {
    log.warning(`Encontradas ${productsMatches.length} rutas con /products/ (incorrecto)`)
  }

  // Patrón 2: Corregir rutas de camisetas que apuntan a /tops/
  const wrongCamisetasPattern = /category:\s*"camisetas"[\s\S]*?image:\s*"\/productos\/mujer\/tops\//g
  content = content.replace(wrongCamisetasPattern, (match) => {
    fixed++
    return match.replace('/productos/mujer/tops/', '/productos/mujer/camisetas/')
  })

  // Extraer todos los productos y corregir sus rutas
  const productRegex = /{\s*slug:\s*"([^"]+)"[\s\S]*?category:\s*"([^"]+)"[\s\S]*?image:\s*"([^"]+)"[\s\S]*?audience:\s*"([^"]+)"/g
  let match

  const fixes = []
  while ((match = productRegex.exec(content)) !== null) {
    const [fullMatch, slug, category, imagePath, audience] = match

    // Determinar la carpeta correcta
    const correctFolder = categoryFolders[category] || category
    const correctBasePath = `/productos/${audience}/${correctFolder}/`

    // Verificar si la ruta es incorrecta
    if (!imagePath.startsWith(correctBasePath)) {
      // Extraer el nombre del archivo
      const filename = path.basename(imagePath)
      const correctPath = `${correctBasePath}${filename}`

      fixes.push({
        slug,
        category,
        oldPath: imagePath,
        newPath: correctPath
      })
    }
  }

  log.info(`Encontrados ${fixes.length} productos con rutas incorrectas`)

  // Aplicar correcciones
  for (const fix of fixes) {
    // Escapar caracteres especiales en la ruta antigua
    const oldPathEscaped = fix.oldPath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    const regex = new RegExp(`image:\\s*"${oldPathEscaped}"`, 'g')

    if (content.match(regex)) {
      content = content.replace(regex, `image: "${fix.newPath}"`)
      fixed++
      log.success(`✓ ${fix.slug}: ${fix.newPath}`)
    }
  }

  // Guardar archivo
  fs.writeFileSync(productsPath, content)

  log.title('📊 RESUMEN')
  console.log(`✅ Rutas corregidas: ${fixed}`)
  log.success(`✓ Archivo actualizado: ${productsPath}`)
}

main().catch(error => {
  log.error(`Error fatal: ${error.message}`)
  console.error(error.stack)
  process.exit(1)
})
