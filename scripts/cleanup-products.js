#!/usr/bin/env node

/**
 * LIMPIADOR DE PRODUCTOS
 * Elimina duplicados y corrige rutas incorrectas en products.ts
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
  log.title('🧹 LIMPIADOR DE PRODUCTOS')

  const productsPath = path.join(__dirname, '..', 'data', 'products.ts')

  log.info('Leyendo products.ts...')
  let content = fs.readFileSync(productsPath, 'utf-8')
  const lines = content.split('\n')

  log.title('📊 ANÁLISIS DEL ARCHIVO')
  console.log(`Total de líneas: ${lines.length}`)

  // Eliminar sección duplicada 1: líneas 856-1291
  log.title('🗑️  ELIMINANDO DUPLICADOS (líneas 856-1291)')

  // Encontrar el comentario que marca el inicio de los duplicados
  const duplicateStart = '  // PRODUCTOS NUEVOS AUTO-GENERADOS (desde imágenes de Google Drive)'
  const startIndex = lines.findIndex(line => line.trim() === duplicateStart.trim())

  if (startIndex !== -1) {
    log.info(`Encontrado inicio de duplicados en línea ${startIndex + 1}`)

    // Encontrar el final de esta sección (antes del comentario // ENTERIZOS)
    let endIndex = -1
    for (let i = startIndex; i < lines.length; i++) {
      if (lines[i].includes('// ENTERIZOS')) {
        endIndex = i
        break
      }
    }

    if (endIndex !== -1) {
      const removed = endIndex - startIndex
      log.warning(`Eliminando ${removed} líneas (${startIndex + 1} a ${endIndex})`)
      lines.splice(startIndex, removed)
      log.success(`Sección duplicada eliminada`)
    }
  }

  // Unir líneas de nuevo
  content = lines.join('\n')

  // Corregir rutas incorrectas que apuntan a /products/
  log.title('🔧 CORRIGIENDO RUTAS /products/ → /productos/')

  const productsPathCount = (content.match(/\/products\//g) || []).length
  if (productsPathCount > 0) {
    log.warning(`Encontradas ${productsPathCount} rutas con /products/`)
    content = content.replace(/\/products\//g, '/productos/mujer/bodys/')
    log.success(`Rutas /products/ corregidas`)
  }

  // Corregir indentación en attributes
  log.title('📐 CORRIGIENDO INDENTACIÓN')

  content = content.replace(/attributes: {\n {2}material:/g, 'attributes: {\n      material:')
  content = content.replace(/\n {2}detalles: \[/g, '\n      detalles: [')
  content = content.replace(/\n {2}beneficios: \[/g, '\n      beneficios: [')
  content = content.replace(/\n {4}"([^"]+)"/g, '\n        "$1"')

  log.success('Indentación corregida')

  // Guardar archivo con backup
  const backupPath = productsPath + '.backup'
  fs.writeFileSync(backupPath, fs.readFileSync(productsPath, 'utf-8'))
  log.info(`Backup guardado en: ${backupPath}`)

  fs.writeFileSync(productsPath, content)

  log.title('✅ LIMPIEZA COMPLETADA')
  log.success(`Archivo actualizado: ${productsPath}`)

  // Contar productos finales
  const productMatches = content.match(/slug: "/g)
  if (productMatches) {
    console.log(`\n📦 Total de productos: ${productMatches.length}`)
  }
}

main().catch(error => {
  log.error(`Error fatal: ${error.message}`)
  console.error(error.stack)
  process.exit(1)
})
