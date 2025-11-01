#!/usr/bin/env node

/**
 * 🎨 IMAGE WIZARD - Gestión automatizada de imágenes
 *
 * Este script te guía paso a paso para:
 * 1. Procesar imágenes desde cualquier carpeta
 * 2. Renombrarlas automáticamente
 * 3. Convertir a WebP
 * 4. Generar variantes de producto
 * 5. Actualizar products.ts automáticamente
 */

const fs = require('fs')
const path = require('path')
const readline = require('readline')
const { execSync } = require('child_process')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

const prompt = (question) => new Promise((resolve) => rl.question(question, resolve))

// Colores para terminal
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

// Configuración
const CATEGORIES = [
  'leggings',
  'bikers',
  'shorts',
  'tops',
  'bodys',
  'conjuntos',
  'buzos',
  'polos',
  'faldas'
]

const AUDIENCES = ['mujer', 'nina']

const FABRICS = ['suplex', 'algodon', 'french-terry', 'ribb']

// Base de datos temporal de productos
let productsDB = []

async function main() {
  log.title('🎨 IMAGE WIZARD - Gestor Automático de Imágenes')

  console.log('Este asistente te ayudará a:')
  console.log('• Procesar imágenes masivamente')
  console.log('• Renombrar automáticamente con patrón correcto')
  console.log('• Convertir JPG/PNG → WebP')
  console.log('• Generar variantes de color')
  console.log('• Actualizar products.ts automáticamente\n')

  const mode = await prompt(
    'Selecciona modo:\n' +
    '1. Procesamiento batch (CSV/Excel)\n' +
    '2. Procesamiento interactivo (foto por foto)\n' +
    '3. Auto-detección inteligente (IA)\n' +
    'Opción [1-3]: '
  )

  switch (mode.trim()) {
    case '1':
      await batchMode()
      break
    case '2':
      await interactiveMode()
      break
    case '3':
      await aiMode()
      break
    default:
      log.error('Opción inválida')
      process.exit(1)
  }

  rl.close()
}

// ================================================
// MODO 1: BATCH (CSV/Excel)
// ================================================
async function batchMode() {
  log.title('📊 MODO BATCH - Procesamiento masivo desde CSV')

  console.log('Instrucciones:')
  console.log('1. Crea un archivo CSV con columnas: filename,product_name,color,category,audience,fabric,price')
  console.log('2. Ejemplo: IMG_001.jpg,Legging Clásico,Negro,leggings,mujer,suplex,45.00\n')

  const csvPath = await prompt('Ruta al archivo CSV: ')
  const imagesFolder = await prompt('Carpeta donde están las imágenes: ')

  if (!fs.existsSync(csvPath)) {
    log.error('Archivo CSV no encontrado')
    return
  }

  if (!fs.existsSync(imagesFolder)) {
    log.error('Carpeta de imágenes no encontrada')
    return
  }

  log.info('Procesando CSV...')

  const csvContent = fs.readFileSync(csvPath, 'utf-8')
  const lines = csvContent.split('\n').slice(1) // Skip header

  let processed = 0
  let errors = 0

  for (const line of lines) {
    if (!line.trim()) continue

    const [filename, productName, color, category, audience, fabric, price] = line.split(',').map(s => s.trim())

    try {
      const oldPath = path.join(imagesFolder, filename)

      if (!fs.existsSync(oldPath)) {
        log.warning(`Imagen no encontrada: ${filename}`)
        errors++
        continue
      }

      // Generar slug y nuevo nombre
      const slug = generateSlug(productName, color)
      const ext = path.extname(filename)
      const newFilename = `${slug}${ext}`
      const newPath = path.join(imagesFolder, 'processed', newFilename)

      // Crear carpeta processed si no existe
      if (!fs.existsSync(path.join(imagesFolder, 'processed'))) {
        fs.mkdirSync(path.join(imagesFolder, 'processed'))
      }

      // Copiar y renombrar
      fs.copyFileSync(oldPath, newPath)

      // Convertir a WebP
      const webpPath = newPath.replace(ext, '.webp')
      await convertToWebP(newPath, webpPath)

      // Guardar en DB temporal
      productsDB.push({
        slug,
        name: productName,
        color,
        category,
        audience,
        fabric,
        price: parseFloat(price),
        image: `/products/${slug}.webp`,
        originalFile: filename
      })

      log.success(`✓ ${filename} → ${slug}.webp`)
      processed++

    } catch (error) {
      log.error(`Error procesando ${filename}: ${error.message}`)
      errors++
    }
  }

  log.title('📊 RESUMEN')
  console.log(`✓ Procesadas: ${processed}`)
  console.log(`✗ Errores: ${errors}`)

  if (processed > 0) {
    const updateCode = await prompt('\n¿Actualizar products.ts automáticamente? (s/n): ')
    if (updateCode.toLowerCase() === 's') {
      await updateProductsFile()
    }

    const exportReport = await prompt('¿Exportar reporte? (s/n): ')
    if (exportReport.toLowerCase() === 's') {
      await generateReport()
    }
  }
}

// ================================================
// MODO 2: INTERACTIVO
// ================================================
async function interactiveMode() {
  log.title('🖼️ MODO INTERACTIVO - Foto por foto')

  const imagesFolder = await prompt('Carpeta donde están las imágenes: ')

  if (!fs.existsSync(imagesFolder)) {
    log.error('Carpeta no encontrada')
    return
  }

  const images = fs.readdirSync(imagesFolder)
    .filter(f => /\.(jpg|jpeg|png)$/i.test(f))

  log.info(`Encontradas ${images.length} imágenes\n`)

  for (let i = 0; i < images.length; i++) {
    const filename = images[i]
    console.log(`\n${colors.bright}[${i + 1}/${images.length}] ${filename}${colors.reset}`)

    // Abrir imagen en visor del sistema
    try {
      const imagePath = path.join(imagesFolder, filename)
      if (process.platform === 'win32') {
        execSync(`start "" "${imagePath}"`, { stdio: 'ignore' })
      } else if (process.platform === 'darwin') {
        execSync(`open "${imagePath}"`, { stdio: 'ignore' })
      } else {
        execSync(`xdg-open "${imagePath}"`, { stdio: 'ignore' })
      }
    } catch (e) {
      log.warning('No se pudo abrir la imagen automáticamente')
    }

    const productName = await prompt('  Nombre del producto: ')
    const color = await prompt('  Color: ')

    console.log('  Categoría:')
    CATEGORIES.forEach((cat, idx) => console.log(`    ${idx + 1}. ${cat}`))
    const categoryIdx = await prompt('  Selecciona [1-9]: ')
    const category = CATEGORIES[parseInt(categoryIdx) - 1]

    console.log('  Audiencia:')
    AUDIENCES.forEach((aud, idx) => console.log(`    ${idx + 1}. ${aud}`))
    const audienceIdx = await prompt('  Selecciona [1-2]: ')
    const audience = AUDIENCES[parseInt(audienceIdx) - 1]

    console.log('  Tela:')
    FABRICS.forEach((fab, idx) => console.log(`    ${idx + 1}. ${fab}`))
    const fabricIdx = await prompt('  Selecciona [1-4]: ')
    const fabric = FABRICS[parseInt(fabricIdx) - 1]

    const price = await prompt('  Precio (S/): ')

    // Procesar imagen
    const slug = generateSlug(productName, color)
    const ext = path.extname(filename)
    const oldPath = path.join(imagesFolder, filename)
    const newPath = path.join(imagesFolder, 'processed', `${slug}${ext}`)
    const webpPath = newPath.replace(ext, '.webp')

    if (!fs.existsSync(path.join(imagesFolder, 'processed'))) {
      fs.mkdirSync(path.join(imagesFolder, 'processed'))
    }

    fs.copyFileSync(oldPath, newPath)
    await convertToWebP(newPath, webpPath)

    productsDB.push({
      slug,
      name: productName,
      color,
      category,
      audience,
      fabric,
      price: parseFloat(price),
      image: `/products/${slug}.webp`,
      originalFile: filename
    })

    log.success(`✓ Procesada: ${slug}.webp\n`)

    const continueProcessing = await prompt('Continuar con siguiente? (s/n): ')
    if (continueProcessing.toLowerCase() !== 's') break
  }

  if (productsDB.length > 0) {
    const updateCode = await prompt('\n¿Actualizar products.ts? (s/n): ')
    if (updateCode.toLowerCase() === 's') {
      await updateProductsFile()
    }
  }
}

// ================================================
// MODO 3: AUTO-DETECCIÓN (IA)
// ================================================
async function aiMode() {
  log.title('🤖 MODO IA - Auto-detección inteligente')
  log.warning('Esta funcionalidad requiere API de OpenAI/Anthropic')
  log.info('Próximamente...')

  // TODO: Implementar con Claude API para analizar imágenes
  // y detectar automáticamente: tipo de prenda, color, etc.
}

// ================================================
// UTILIDADES
// ================================================

function generateSlug(productName, color) {
  const base = productName
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Quitar acentos
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')

  const colorSlug = color
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')

  return `${base}-${colorSlug}`
}

async function convertToWebP(inputPath, outputPath) {
  try {
    // Usando sharp si está disponible, sino ImageMagick
    try {
      const sharp = require('sharp')
      await sharp(inputPath)
        .webp({ quality: 85 })
        .toFile(outputPath)
    } catch (e) {
      // Fallback a ImageMagick
      execSync(`magick "${inputPath}" -quality 85 "${outputPath}"`)
    }

    // Eliminar original
    fs.unlinkSync(inputPath)
  } catch (error) {
    log.error(`Error convirtiendo a WebP: ${error.message}`)
    throw error
  }
}

async function updateProductsFile() {
  log.info('Generando products.ts...')

  const grouped = groupByBaseProduct(productsDB)

  const code = generateProductsCode(grouped)

  const outputPath = path.join(__dirname, '..', 'data', 'products-generated.ts')
  fs.writeFileSync(outputPath, code)

  log.success(`Archivo generado: ${outputPath}`)
  log.warning('Revisa y mergea con products.ts actual')
}

function groupByBaseProduct(products) {
  const groups = {}

  products.forEach(product => {
    // Extraer base name (sin color)
    const baseSlug = product.slug.replace(/-[^-]+$/, '')

    if (!groups[baseSlug]) {
      groups[baseSlug] = {
        base: product,
        variants: []
      }
    }

    groups[baseSlug].variants.push(product)
  })

  return Object.values(groups)
}

function generateProductsCode(groups) {
  let code = `// Auto-generated by image-wizard.js\n`
  code += `// ${new Date().toISOString()}\n\n`
  code += `import { Product } from "./products"\n\n`
  code += `export const generatedProducts: Product[] = [\n`

  groups.forEach((group, idx) => {
    const base = group.base
    const hasVariants = group.variants.length > 1

    code += `  {\n`
    code += `    id: ${1000 + idx},\n`
    code += `    slug: "${base.slug}",\n`
    code += `    name: "${base.name}",\n`
    code += `    category: "${base.category}",\n`
    code += `    audience: "${base.audience}",\n`
    code += `    fabric: "${base.fabric}",\n`
    code += `    price: ${base.price},\n`
    code += `    stock: 10,\n`
    code += `    image: "${base.image}",\n`
    code += `    images: [\n`

    group.variants.forEach(variant => {
      code += `      "${variant.image}",\n`
    })

    code += `    ],\n`

    if (hasVariants) {
      code += `    colors: [\n`
      group.variants.forEach(variant => {
        code += `      { name: "${variant.color}", value: "#000000" },\n` // TODO: Detectar hex
      })
      code += `    ],\n`
    }

    code += `  },\n`
  })

  code += `]\n`

  return code
}

async function generateReport() {
  const reportPath = path.join(__dirname, 'image-wizard-report.txt')

  let report = '═══════════════════════════════════════\n'
  report += '  IMAGE WIZARD - REPORTE\n'
  report += '═══════════════════════════════════════\n\n'
  report += `Fecha: ${new Date().toLocaleString()}\n`
  report += `Total procesadas: ${productsDB.length}\n\n`
  report += 'PRODUCTOS PROCESADOS:\n\n'

  productsDB.forEach((product, idx) => {
    report += `${idx + 1}. ${product.name} (${product.color})\n`
    report += `   Slug: ${product.slug}\n`
    report += `   Categoría: ${product.category}\n`
    report += `   Audiencia: ${product.audience}\n`
    report += `   Precio: S/ ${product.price}\n`
    report += `   Imagen: ${product.image}\n`
    report += `   Original: ${product.originalFile}\n\n`
  })

  fs.writeFileSync(reportPath, report)
  log.success(`Reporte generado: ${reportPath}`)
}

// ================================================
// EJECUCIÓN
// ================================================

main().catch(error => {
  log.error(`Error fatal: ${error.message}`)
  process.exit(1)
})
