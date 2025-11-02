#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

const productsPath = path.join(__dirname, '..', 'data', 'products.ts')
const publicPath = path.join(__dirname, '..', 'public')
const backupDir = path.join(publicPath, 'old-images-backup')

console.log('🔍 ACTUALIZANDO MINIATURAS DE PRODUCTOS\n')
console.log('='.repeat(80))

// Crear directorio de backup si no existe
if (!fs.existsSync(backupDir)) {
  fs.mkdirSync(backupDir, { recursive: true })
  console.log(`📁 Creado directorio de backup: ${backupDir}\n`)
}

// Leer products.ts
const content = fs.readFileSync(productsPath, 'utf-8')

// Extraer productos con objetos de color
const productRegex = /\{\s*slug:\s*["']([^"']+)["'][^}]*?image:\s*["']([^"']+)["'][^}]*?colors:\s*(\[[^\]]*\{[^\]]*name:[^\]]*\])/gs

let match
let updatedCount = 0
let totalAnalyzed = 0
const updates = []

while ((match = productRegex.exec(content)) !== null) {
  totalAnalyzed++
  const slug = match[1]
  const currentImage = match[2]
  const colorsStr = match[3]

  // Extraer la primera imagen de color del array de objetos
  const imageMatch = colorsStr.match(/image:\s*["']([^"']+)["']/)

  if (!imageMatch) {
    console.log(`⏭️  ${slug}: No tiene objetos de color con imágenes, skip`)
    continue
  }

  const firstColorImage = imageMatch[1]

  // Determinar la ruta del directorio
  const currentImagePath = currentImage.replace(/^\//, '')
  const imageDir = path.dirname(currentImagePath)
  const imageDirFull = path.join(publicPath, imageDir)

  if (!fs.existsSync(imageDirFull)) {
    console.log(`⚠️  ${slug}: Directorio no existe: ${imageDir}`)
    continue
  }

  // Buscar imagen "simple" (antigua)
  const simpleImageName = `${slug}.webp`
  const simpleImagePath = path.join(imageDirFull, simpleImageName)

  // Buscar imágenes con patrón de color
  const allFiles = fs.readdirSync(imageDirFull)
  const colorImages = allFiles.filter(f => {
    // Patrón: {slug}-{color}-*.webp
    return f.startsWith(`${slug}-`) && f.endsWith('.webp') && f !== simpleImageName
  })

  console.log(`\n📊 ${slug}:`)
  console.log(`   Miniatura actual: ${currentImage}`)
  console.log(`   Primera imagen de color: ${firstColorImage}`)
  console.log(`   Imágenes de colores encontradas: ${colorImages.length}`)

  // Detectar si hay imagen antigua
  if (fs.existsSync(simpleImagePath) && colorImages.length > 0) {
    // Obtener stats de la imagen simple
    const simpleStats = fs.statSync(simpleImagePath)
    const simpleSize = simpleStats.size

    console.log(`   ⚠️  Imagen antigua detectada: ${simpleImageName} (${Math.round(simpleSize / 1024)}KB)`)

    // Si la miniatura actual es la imagen antigua, necesita actualización
    if (currentImage.includes(simpleImageName)) {
      updates.push({
        slug,
        oldImage: currentImage,
        newImage: firstColorImage,
        oldImagePath: simpleImagePath,
        needsBackup: true
      })
      console.log(`   ✅ Necesita actualización: ${currentImage} → ${firstColorImage}`)
    } else if (currentImage !== firstColorImage) {
      // La miniatura no es la antigua, pero tampoco es la primera imagen de color
      updates.push({
        slug,
        oldImage: currentImage,
        newImage: firstColorImage,
        oldImagePath: simpleImagePath,
        needsBackup: true
      })
      console.log(`   🔄 Actualizará a primera imagen de color: ${firstColorImage}`)
    } else {
      console.log(`   ✅ Ya está actualizado correctamente`)
      // Aún así, mover la imagen antigua a backup
      const backupPath = path.join(backupDir, `${slug}-old.webp`)
      fs.renameSync(simpleImagePath, backupPath)
      console.log(`   📦 Imagen antigua movida a backup: ${backupPath}`)
    }
  } else if (!fs.existsSync(simpleImagePath)) {
    console.log(`   ✓ No hay imagen antigua (solo imágenes de colores)`)

    // Verificar si la miniatura es la primera imagen de color
    if (currentImage !== firstColorImage) {
      updates.push({
        slug,
        oldImage: currentImage,
        newImage: firstColorImage,
        oldImagePath: null,
        needsBackup: false
      })
      console.log(`   🔄 Actualizará miniatura: ${currentImage} → ${firstColorImage}`)
    } else {
      console.log(`   ✅ Miniatura correcta`)
    }
  } else {
    console.log(`   ⚠️  Solo tiene imagen simple, sin imágenes de colores`)
  }
}

console.log(`\n\n${'='.repeat(80)}`)
console.log(`📊 RESUMEN`)
console.log(`${'='.repeat(80)}`)
console.log(`Productos analizados: ${totalAnalyzed}`)
console.log(`Productos que necesitan actualización: ${updates.length}`)

if (updates.length === 0) {
  console.log('\n✅ Todos los productos ya tienen miniaturas correctas!')
  process.exit(0)
}

console.log(`\n\n${'='.repeat(80)}`)
console.log(`🔧 APLICANDO ACTUALIZACIONES`)
console.log(`${'='.repeat(80)}`)

let productContent = content

updates.forEach((update, index) => {
  console.log(`\n${index + 1}. ${update.slug}`)

  // Mover imagen antigua a backup si existe
  if (update.needsBackup && update.oldImagePath && fs.existsSync(update.oldImagePath)) {
    const backupPath = path.join(backupDir, `${update.slug}-old.webp`)
    fs.renameSync(update.oldImagePath, backupPath)
    console.log(`   📦 Backup: ${path.basename(update.oldImagePath)} → ${backupPath}`)
  }

  // Actualizar products.ts
  const oldImageRegex = new RegExp(
    `(\\{[^{}]*slug:\\s*["']${update.slug}["'][^{}]*image:\\s*["'])${update.oldImage.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(["'])`,
    's'
  )

  if (productContent.match(oldImageRegex)) {
    productContent = productContent.replace(oldImageRegex, `$1${update.newImage}$2`)
    console.log(`   ✅ Actualizado en products.ts: ${update.newImage}`)
    updatedCount++
  } else {
    console.log(`   ⚠️  No se pudo actualizar en products.ts (regex no coincide)`)
  }
})

// Guardar products.ts actualizado
if (updatedCount > 0) {
  fs.writeFileSync(productsPath, productContent, 'utf-8')
  console.log(`\n\n✅ Se actualizaron ${updatedCount}/${updates.length} productos en products.ts`)
  console.log(`📦 Imágenes antiguas guardadas en: ${backupDir}`)
} else {
  console.log(`\n\n⚠️  No se pudo actualizar ningún producto`)
}
