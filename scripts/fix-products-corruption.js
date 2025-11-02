#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

const productsPath = path.join(__dirname, '..', 'data', 'products.ts')

console.log('Reading products.ts...')
const lines = fs.readFileSync(productsPath, 'utf-8').split('\n')

console.log(`Total lines: ${lines.length}`)

// Keep lines 0-1558 (0-indexed, so line 1559 is index 1558)
// Skip lines 1559-1821 (indices 1559-1821)
// Keep lines 1822+ (index 1822+)

const fixedLines = [
  ...lines.slice(0, 1559),
  ...lines.slice(1822)
]

console.log(`Fixed lines: ${fixedLines.length}`)

fs.writeFileSync(productsPath, fixedLines.join('\n'))

console.log('✅ File fixed!')
