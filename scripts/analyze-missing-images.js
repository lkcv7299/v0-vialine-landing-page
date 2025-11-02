#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

const downloadsPath = 'C:\\Users\\USER\\Downloads\\Fotos para Web v1-20251101T230753Z-1-001\\Fotos para Web v1'
const publicPath = path.join(__dirname, '..', 'public', 'productos')
const reportPath = path.join(__dirname, '..', 'missing-images-report.json')

console.log('🔍 ANÁLISIS EXHAUSTIVO DE IMÁGENES FALTANTES\n')
console.log('='.repeat(80))

// Función para normalizar nombres de archivo
function normalizeFilename(filename) {
  return filename.toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/ó/g, 'o')
    .replace(/á/g, 'a')
    .replace(/é/g, 'e')
    .replace(/í/g, 'i')
    .replace(/ú/g, 'u')
}

// Mapeo de nombres de carpetas a slugs y categorías
const folderMapping = {
  'BODY MANGA CORTA - ALGODON PREMIUM': { slug: 'body-manga-corta', category: 'bodys', audience: 'mujer' },
  'BODY MANGA CORTA - SUPLEX LISO PREMIUM': { slug: 'body-manga-corta-suplex', category: 'bodys', audience: 'mujer' },
  'BODY MANGA LARGA - ALGODON PREMIUM': { slug: 'body-manga-larga', category: 'bodys', audience: 'mujer' },
  'BODY MANGA LARGA - SUPLEX LISO PREMIUM': { slug: 'body-manga-larga-suplex', category: 'bodys', audience: 'mujer' },
  'CAMISETA CUELLO ALTO - ALGODON PREMIUM': { slug: 'camiseta-cuello-alto', category: 'camisetas', audience: 'mujer' },
  'CAMISETA GIA - ALGODON PREMIUM': { slug: 'camiseta-gia', category: 'camisetas', audience: 'mujer' },
  'CAMISETA MANGA CORTA - ALGODON PREMIUM': { slug: 'camiseta-manga-corta', category: 'camisetas', audience: 'mujer' },
  'CAMISETA MANGA LARGA - ALGODON PREMIUM': { slug: 'camiseta-manga-larga', category: 'camisetas', audience: 'mujer' },
  'ENTERIZO MANGA CERO - SUPLEX LISO PREMIUM': { slug: 'enterizo-manga-cero', category: 'enterizo', audience: 'mujer' },
  'ENTERIZO TIRAS - SUPLEX LISO PREMIUM': { slug: 'enterizo-tiras', category: 'enterizo', audience: 'mujer' },
  'LEGGING PUSH UP - SUPLEX LISO PREMIUM': { slug: 'legging-push-up', category: 'legging', audience: 'mujer' },
  'LEGGING REALCE - SUPLEX LISO PREMIUM': { slug: 'legging-realce', category: 'legging', audience: 'mujer' },
  'LEGGING SLIM - SUPLEX LISO PREMIUM': { slug: 'legging-slim', category: 'legging', audience: 'mujer' },
  'MAXI SHORT - ALGODON PREMIUM': { slug: 'maxi-short', category: 'short', audience: 'mujer' },
  'MINI SHORT - ALGODON PREMIUM': { slug: 'mini-short', category: 'short', audience: 'mujer' },
  'SHORT BRASIL - ALGODON PREMIUM': { slug: 'short-brasil', category: 'short', audience: 'mujer' },
  'SHORT PUSH UP - SUPLEX LISO PREMIUM': { slug: 'short-push-up', category: 'short', audience: 'mujer' },
  'SHORT SLIM - SUPLEX LISO PREMIUM': { slug: 'short-slim', category: 'short', audience: 'mujer' },
  'TOP AFRODITA - SUPLEX LISO PREMIUM': { slug: 'top-afrodita', category: 'tops', audience: 'mujer' },
  'TOP PARADISE - SUPLEX LISO PREMIUM': { slug: 'top-paradise', category: 'tops', audience: 'mujer' },
}

console.log(`\n📁 Analizando carpeta de descargas: ${downloadsPath}`)
console.log(`📁 Comparando con: ${publicPath}\n`)

// Recopilar todas las imágenes de descargas
const downloadedImages = {}
const missingImages = {}
const existingImages = {}
let totalDownloaded = 0
let totalMissing = 0
let totalExisting = 0

// Leer todas las carpetas de productos
const folders = fs.readdirSync(downloadsPath)

folders.forEach(folder => {
  const folderPath = path.join(downloadsPath, folder)

  if (!fs.statSync(folderPath).isDirectory()) {
    return
  }

  const productInfo = folderMapping[folder]

  if (!productInfo) {
    console.log(`⚠️  Carpeta no mapeada: ${folder}`)
    return
  }

  console.log(`\n📦 Procesando: ${folder}`)
  console.log(`   Slug: ${productInfo.slug}`)
  console.log(`   Categoría: ${productInfo.category}`)

  // Leer imágenes de la carpeta (recursivamente en subcarpetas de colores)
  let imageFiles = []
  const items = fs.readdirSync(folderPath)

  items.forEach(item => {
    const itemPath = path.join(folderPath, item)
    const stat = fs.statSync(itemPath)

    if (stat.isDirectory()) {
      // Es una carpeta de color, leer imágenes dentro
      const colorFiles = fs.readdirSync(itemPath)
      const colorImages = colorFiles.filter(f =>
        f.toLowerCase().endsWith('.jpg') ||
        f.toLowerCase().endsWith('.jpeg') ||
        f.toLowerCase().endsWith('.png') ||
        f.toLowerCase().endsWith('.webp')
      ).map(f => ({
        file: f,
        color: item,
        fullPath: path.join(itemPath, f)
      }))
      imageFiles.push(...colorImages)
    } else if (
      item.toLowerCase().endsWith('.jpg') ||
      item.toLowerCase().endsWith('.jpeg') ||
      item.toLowerCase().endsWith('.png') ||
      item.toLowerCase().endsWith('.webp')
    ) {
      // Es una imagen directa
      imageFiles.push({
        file: item,
        color: null,
        fullPath: itemPath
      })
    }
  })

  console.log(`   Imágenes en descarga: ${imageFiles.length}`)

  // Inicializar arrays para este producto
  if (!downloadedImages[productInfo.slug]) {
    downloadedImages[productInfo.slug] = []
    missingImages[productInfo.slug] = []
    existingImages[productInfo.slug] = []
  }

  // Ruta de destino en public
  const targetDir = path.join(publicPath, productInfo.audience, productInfo.category)

  imageFiles.forEach(imageObj => {
    const imageFile = imageObj.file
    const sourcePath = imageObj.fullPath
    const colorFolder = imageObj.color
    totalDownloaded++

    downloadedImages[productInfo.slug].push({
      original: imageFile,
      source: sourcePath,
      folder: folder,
      color: colorFolder
    })

    // Buscar si esta imagen ya existe en public/productos
    // Buscar por nombre base sin extensión
    const baseName = path.basename(imageFile, path.extname(imageFile))
    const normalizedBase = normalizeFilename(baseName)
    const normalizedColor = colorFolder ? normalizeFilename(colorFolder) : ''

    // Sugerir nombre de archivo
    const suggestedName = colorFolder
      ? `${productInfo.slug}-${normalizedColor}-${normalizedBase}.webp`
      : `${productInfo.slug}-${normalizedBase}.webp`

    // Verificar si existe en el directorio de destino
    if (fs.existsSync(targetDir)) {
      const existingFiles = fs.readdirSync(targetDir)

      // Buscar coincidencias exactas o parciales
      const found = existingFiles.find(existing => {
        const existingNormalized = normalizeFilename(path.basename(existing, path.extname(existing)))
        const searchTerms = [normalizedBase, normalizedColor, productInfo.slug]
        return searchTerms.every(term => term === '' || existingNormalized.includes(term))
      })

      if (found) {
        existingImages[productInfo.slug].push({
          original: imageFile,
          existing: found,
          target: path.join(targetDir, found),
          color: colorFolder
        })
        totalExisting++
      } else {
        missingImages[productInfo.slug].push({
          original: imageFile,
          source: sourcePath,
          targetDir: targetDir,
          suggestedName: suggestedName,
          color: colorFolder
        })
        totalMissing++
      }
    } else {
      missingImages[productInfo.slug].push({
        original: imageFile,
        source: sourcePath,
        targetDir: targetDir,
        suggestedName: suggestedName,
        color: colorFolder,
        note: 'Directorio no existe'
      })
      totalMissing++
    }
  })

  console.log(`   ✅ Existentes: ${existingImages[productInfo.slug].length}`)
  console.log(`   ❌ Faltantes: ${missingImages[productInfo.slug].length}`)
})

// Generar reporte detallado
console.log(`\n\n${'='.repeat(80)}`)
console.log('📊 RESUMEN GENERAL')
console.log('='.repeat(80))
console.log(`Total de imágenes en descargas: ${totalDownloaded}`)
console.log(`Imágenes ya existentes en proyecto: ${totalExisting}`)
console.log(`Imágenes faltantes: ${totalMissing}`)

console.log(`\n\n${'='.repeat(80)}`)
console.log('❌ IMÁGENES FALTANTES POR PRODUCTO')
console.log('='.repeat(80))

Object.keys(missingImages).forEach(slug => {
  const missing = missingImages[slug]
  if (missing.length > 0) {
    console.log(`\n${slug} (${missing.length} faltantes):`)
    missing.slice(0, 5).forEach(img => {
      console.log(`   - ${img.original}`)
      console.log(`     → ${img.suggestedName}`)
    })
    if (missing.length > 5) {
      console.log(`   ... y ${missing.length - 5} más`)
    }
  }
})

// Guardar reporte completo
const report = {
  timestamp: new Date().toISOString(),
  summary: {
    totalDownloaded,
    totalExisting,
    totalMissing,
    percentageComplete: Math.round((totalExisting / totalDownloaded) * 100)
  },
  byProduct: Object.keys(downloadedImages).map(slug => ({
    slug,
    totalDownloaded: downloadedImages[slug].length,
    existing: existingImages[slug].length,
    missing: missingImages[slug].length,
    missingFiles: missingImages[slug]
  })),
  missingImages
}

fs.writeFileSync(reportPath, JSON.stringify(report, null, 2))

console.log(`\n\n📄 Reporte completo guardado en: missing-images-report.json`)
console.log(`\n✅ Completado: ${Math.round((totalExisting / totalDownloaded) * 100)}% de las imágenes ya están en el proyecto`)
console.log(`⚠️  Faltan: ${totalMissing} imágenes (${Math.round((totalMissing / totalDownloaded) * 100)}%)`)
