#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

const productsPath = path.join(__dirname, '..', 'data', 'products.ts')
const content = fs.readFileSync(productsPath, 'utf-8')

console.log('🔍 Analyzing color formats in products.ts...\n')

// Find all color arrays
const productRegex = /\{\s*slug:\s*["']([^"']+)["'][^}]*?colors:\s*\[([\s\S]*?)\]/g
const issues = []
const uppercaseProducts = []
const emojiProducts = []

let match
while ((match = productRegex.exec(content)) !== null) {
  const slug = match[1]
  const colorsStr = match[2]

  // Check for uppercase colors (2+ consecutive uppercase letters)
  const uppercaseMatches = colorsStr.match(/["']([A-ZÁÉÍÓÚ]{2,}[A-ZÁÉÍÓÚ\s]*)["']/g)
  if (uppercaseMatches) {
    uppercaseProducts.push({
      slug,
      colors: uppercaseMatches.map(c => c.replace(/['"]/g, '')).slice(0, 5)
    })
  }

  // Check for emojis (common color emojis)
  const emojiMatch = colorsStr.match(/[\u{1F534}\u{26AB}\u{26AA}\u{1F7E4}\u{1F535}\u{1F7E2}\u{1F7E1}\u{1F7E3}\u{1F7E0}⚫⚪🔴🟡🟢🔵🟣🟠🟤]/u)
  if (emojiMatch) {
    // Extract a sample of the color string
    const sample = colorsStr.substring(0, 150).replace(/\s+/g, ' ')
    emojiProducts.push({ slug, sample })
  }
}

console.log(`Total products analyzed: ${content.match(/slug:/g)?.length || 0}`)
console.log(`Products with UPPERCASE colors: ${uppercaseProducts.length}`)
console.log(`Products with EMOJI colors: ${emojiProducts.length}`)

if (uppercaseProducts.length > 0) {
  console.log('\n📋 Products with uppercase colors:')
  uppercaseProducts.slice(0, 10).forEach((p, i) => {
    console.log(`  ${i + 1}. ${p.slug}`)
    console.log(`     Colors: ${p.colors.join(', ')}`)
  })
  if (uppercaseProducts.length > 10) {
    console.log(`     ... and ${uppercaseProducts.length - 10} more`)
  }
}

if (emojiProducts.length > 0) {
  console.log('\n🎨 Products with emoji colors:')
  emojiProducts.slice(0, 5).forEach((p, i) => {
    console.log(`  ${i + 1}. ${p.slug}`)
    console.log(`     Sample: ${p.sample}...`)
  })
  if (emojiProducts.length > 5) {
    console.log(`     ... and ${emojiProducts.length - 5} more`)
  }
}

console.log('\n✅ Analysis complete')
