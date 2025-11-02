#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

const sourceDir = path.join(__dirname, '..', 'public', 'products')
const targetBaseDir = path.join(__dirname, '..', 'public', 'productos', 'mujer')

console.log('📦 REORGANIZANDO IMÁGENES DE PRODUCTOS\n')

// Mapeo de prefijos a carpetas
const categoryMap = {
  'body-': 'bodys',
  'short-': 'short',
  'maxi-short-': 'short',
  'mini-short-': 'short',
  'camiseta-': 'camisetas',
  'enterizo-': 'enterizo',
  'legging-': 'legging',
  'top-': 'tops',
  'pescador-': 'pescador',
  'torero-': 'torero',
}

if (!fs.existsSync(sourceDir)) {
  console.log('❌ Carpeta source no existe:', sourceDir)
  process.exit(1)
}

const files = fs.readdirSync(sourceDir)
console.log(`📊 Total archivos en /public/products: ${files.length}\n`)

let moved = 0
let skipped = 0
let errors = 0

files.forEach(file => {
  if (!file.endsWith('.webp') && !file.endsWith('.jpg') && !file.endsWith('.png')) {
    skipped++
    return
  }

  // Determinar categoría basándose en el prefijo del nombre
  let category = null
  for (const [prefix, cat] of Object.entries(categoryMap)) {
    if (file.startsWith(prefix)) {
      category = cat
      break
    }
  }

  if (!category) {
    console.log(`⚠️  No se pudo determinar categoría para: ${file}`)
    skipped++
    return
  }

  const sourcePath = path.join(sourceDir, file)
  const targetDir = path.join(targetBaseDir, category)
  const targetPath = path.join(targetDir, file)

  // Crear carpeta si no existe
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true })
  }

  // Mover archivo
  try {
    if (fs.existsSync(targetPath)) {
      console.log(`⏭️  Ya existe: ${category}/${file}`)
      skipped++
    } else {
      fs.copyFileSync(sourcePath, targetPath)
      console.log(`✓ Movido: ${category}/${file}`)
      moved++
    }
  } catch (error) {
    console.log(`❌ Error con ${file}: ${error.message}`)
    errors++
  }
})

console.log(`\n📊 RESUMEN:`)
console.log(`   Movidos: ${moved}`)
console.log(`   Saltados (ya existen): ${skipped}`)
console.log(`   Errores: ${errors}`)
console.log(`\n✅ Reorganización completa!`)
