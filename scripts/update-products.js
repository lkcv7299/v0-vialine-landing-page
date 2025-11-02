#!/usr/bin/env node

/**
 * ACTUALIZADOR AUTOMATICO DE PRODUCTOS
 * Actualiza colores y rutas de imágenes basándose en products-report.json
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
  log.title('🔄 ACTUALIZADOR DE PRODUCTOS')

  const reportPath = path.join(__dirname, 'products-report.json')
  const productsPath = path.join(__dirname, '..', 'data', 'products.ts')

  // Leer reporte
  log.info('Leyendo reporte...')
  const report = JSON.parse(fs.readFileSync(reportPath, 'utf-8'))

  // Leer products.ts
  log.info('Leyendo products.ts...')
  let productsContent = fs.readFileSync(productsPath, 'utf-8')

  // Actualizar productos existentes
  log.title('🔄 ACTUALIZANDO PRODUCTOS EXISTENTES')
  let updated = 0

  for (const product of report.existing) {
    const { slug, colors: newColors, category } = product

    // Buscar el producto en el contenido
    const slugRegex = new RegExp(`slug:\\s*"${slug}"[\\s\\S]*?\\},\\s*\\}`, 'g')
    const match = slugRegex.exec(productsContent)

    if (!match) {
      log.warning(`No se encontró el producto: ${slug}`)
      continue
    }

    const productBlock = match[0]
    let updatedBlock = productBlock

    // Actualizar colors array
    const colorsMatch = productBlock.match(/colors:\s*\[[^\]]+\]/)
    if (colorsMatch) {
      const newColorsStr = `colors: ${JSON.stringify(newColors)}`
      updatedBlock = updatedBlock.replace(/colors:\s*\[[^\]]+\]/, newColorsStr)
    }

    // Actualizar imagen principal (primera del color)
    const categoryFolder = categoryFolders[category] || category
    const firstColor = generateSlug(newColors[0])
    const imageMatch = productBlock.match(/image:\s*"([^"]+)"/)
    if (imageMatch) {
      const newImage = `/productos/mujer/${categoryFolder}/${slug}-${firstColor}.webp`
      updatedBlock = updatedBlock.replace(/image:\s*"[^"]+"/, `image: "${newImage}"`)
    }

    // Corregir material para productos de algodón
    if (productBlock.includes('fabric: "algodon"') && productBlock.includes('material: "Suplex liso"')) {
      updatedBlock = updatedBlock.replace(/material: "Suplex liso"/, 'material: "Algodón Premium"')
    }

    // Reemplazar en el contenido
    productsContent = productsContent.replace(productBlock, updatedBlock)
    updated++
    log.success(`Actualizado: ${slug}`)
  }

  log.title(`✅ Actualizados: ${updated} productos existentes`)

  // Agregar productos nuevos
  log.title('✨ AGREGANDO PRODUCTOS NUEVOS')

  const insertPosition = productsContent.lastIndexOf(']')
  let newProductsCode = '\n  // NUEVOS PRODUCTOS AUTO-GENERADOS\n'

  for (const product of report.new) {
    const {slug, name, category, colors: productColors, fabric = 'suplex', audience = 'mujer'} = product
    const categoryFolder = categoryFolders[category] || category
    const firstColor = generateSlug(productColors[0])

    newProductsCode += `  {\n`
    newProductsCode += `    slug: "${slug}",\n`
    newProductsCode += `    title: "${name}",\n`
    newProductsCode += `    price: 45,\n`
    newProductsCode += `    image: "/productos/${audience}/${categoryFolder}/${slug}-${firstColor}.webp",\n`
    newProductsCode += `    category: "${category}",\n`
    newProductsCode += `    fabric: "${fabric}",\n`
    newProductsCode += `    colors: ${JSON.stringify(productColors)},\n`
    newProductsCode += `    sizes: ["XS", "S", "M", "L", "XL"],\n`
    newProductsCode += `    audience: "${audience}",\n`
    newProductsCode += `    attributes: {\n`
    newProductsCode += `      material: "${fabric === 'algodon' ? 'Algodón Premium' : 'Suplex liso'}",\n`
    newProductsCode += `      detalles: [\n`
    if (category === 'bodys') {
      newProductsCode += `        "Ajuste ceñido que define la silueta",\n`
      newProductsCode += `        "Diseño ergonómico",\n`
      newProductsCode += `        "Cierre práctico"\n`
    } else if (category === 'leggings') {
      newProductsCode += `        "Pretina ancha para mejor soporte",\n`
      newProductsCode += `        "Corte ajustado sin transparencias",\n`
      newProductsCode += `        "Costuras planas"\n`
    } else if (category === 'shorts') {
      newProductsCode += `        "Pretina elástica confortable",\n`
      newProductsCode += `        "Ajuste perfecto sin marcar",\n`
      newProductsCode += `        "Largo ideal"\n`
    } else {
      newProductsCode += `        "Diseño deportivo elegante",\n`
      newProductsCode += `        "Soporte medio confortable",\n`
      newProductsCode += `        "Tejido elástico"\n`
    }
    newProductsCode += `      ],\n`
    newProductsCode += `      beneficios: [\n`
    if (category === 'leggings' || category === 'shorts' || category === 'bodys') {
      newProductsCode += `        "Se adapta al cuerpo como una segunda piel",\n`
      newProductsCode += `        "Te mantiene fresca y seca durante el entrenamiento",\n`
      newProductsCode += `        "Alta resistencia y durabilidad"\n`
    } else {
      newProductsCode += `        "Comodidad absoluta",\n`
      newProductsCode += `        "Transpirable y fresco",\n`
      newProductsCode += `        "Perfecto para el día a día"\n`
    }
    newProductsCode += `      ]\n`
    newProductsCode += `    },\n`
    newProductsCode += `  },\n`
  }

  // Insertar antes del cierre del array
  productsContent = productsContent.slice(0, insertPosition) + newProductsCode + productsContent.slice(insertPosition)

  // Guardar archivo
  fs.writeFileSync(productsPath, productsContent)

  log.success(`✓ Archivo actualizado: ${productsPath}`)
  log.title('📊 RESUMEN')
  console.log(`✅ Productos existentes actualizados: ${updated}`)
  console.log(`✨ Productos nuevos agregados: ${report.new.length}`)
  console.log(`\n🎉 ¡Todo listo! Ahora puedes ver los productos en tu web con npm run dev`)
}

main().catch(error => {
  log.error(`Error fatal: ${error.message}`)
  console.error(error.stack)
  process.exit(1)
})
