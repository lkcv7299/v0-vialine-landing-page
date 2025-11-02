#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

const productsPath = path.join(__dirname, '..', 'data', 'products.ts')

console.log('🔧 Normalizing color names in products.ts...\n')

let content = fs.readFileSync(productsPath, 'utf-8')
let changesCount = 0

// Map of UPPERCASE colors to proper format (first letter capitalized)
const colorNormalizations = {
  'AZUL MARINO': 'Azul Marino',
  'AZUL': 'Azul',
  'AZULINO': 'Azulino',
  'BEIGE': 'Beige',
  'BLANCO': 'Blanco',
  'NEGRO': 'Negro',
  'ROJO': 'Rojo',
  'ROSADO': 'Rosado',
  'CHARCOAL': 'Charcoal',
  'MELANGE': 'Melange',
  'VINO': 'Vino',
  'ACERO': 'Acero',
  'AQUA': 'Aqua',
  'CAMEL': 'Camel',
  'TURQUESA': 'Turquesa',
  'VERDE PETRÓLEO': 'Verde Petróleo',
  'VERDE': 'Verde',
  'AMARILLO': 'Amarillo',
  'GRIS': 'Gris',
  'SUPLEX': 'Suplex',
  'ROSA': 'Rosa',
  'MORADO': 'Morado'
}

// Replace UPPERCASE colors with proper format
Object.entries(colorNormalizations).forEach(([uppercase, proper]) => {
  // Match colors in arrays, both as strings and in objects
  const patterns = [
    new RegExp(`["']${uppercase}["']`, 'g'),
    new RegExp(`name:\\s*["']${uppercase}["']`, 'g')
  ]

  patterns.forEach(pattern => {
    const matches = content.match(pattern)
    if (matches) {
      changesCount += matches.length
      content = content.replace(pattern, (match) => {
        if (match.includes('name:')) {
          return `name: "${proper}"`
        }
        return `"${proper}"`
      })
    }
  })
})

// Remove emoji colors (if any exist)
// Common emoji patterns: ⚫ Negro, ⚪ Blanco, 🔴 Rojo, etc.
const emojiPattern = /["'][⚫⚪🔴🟡🟢🔵🟣🟠🟤]\s*([^"']+)["']/g
const emojiMatches = content.match(emojiPattern)
if (emojiMatches) {
  console.log(`Found ${emojiMatches.length} emoji colors, removing emojis...`)
  content = content.replace(emojiPattern, (match, colorName) => {
    changesCount++
    return `"${colorName.trim()}"`
  })
}

if (changesCount > 0) {
  fs.writeFileSync(productsPath, content, 'utf-8')
  console.log(`✅ Normalized ${changesCount} color names`)
  console.log('📝 All colors now use proper format: "Negro", "Blanco", etc.\n')
} else {
  console.log('✅ No color normalization needed\n')
}
