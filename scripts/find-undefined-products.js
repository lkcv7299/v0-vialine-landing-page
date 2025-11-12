/**
 * Encuentra productos undefined o con estructura inválida
 */
const fs = require('fs');
const path = require('path');

const PRODUCTS_TS = path.join(__dirname, '..', 'data', 'products.ts');

console.log('🔍 Buscando productos undefined o inválidos...\n');

// Leer archivo
const content = fs.readFileSync(PRODUCTS_TS, 'utf8');

// Extraer el array de productos
const match = content.match(/export const products: Product\[\] = \[([\s\S]*?)\n\]/);
if (!match) {
  console.error('❌ No se pudo encontrar el array de productos');
  process.exit(1);
}

const productsBlock = match[1];

// Buscar comas dobles o elementos vacíos
const lines = productsBlock.split('\n');
let issues = [];

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  const lineNum = i + 24; // Offset por el tipo Product

  // Buscar patrones problemáticos
  if (line.trim() === ',,' || line.trim() === ', ,') {
    issues.push({ line: lineNum, issue: 'Doble coma', content: line });
  }

  if (line.match(/\},\s*,/)) {
    issues.push({ line: lineNum, issue: 'Coma extra después de }', content: line });
  }

  if (line.match(/\[\s*,/) || line.match(/,\s*\]/)) {
    issues.push({ line: lineNum, issue: 'Array con coma inicial/final', content: line });
  }
}

if (issues.length > 0) {
  console.log('❌ Problemas encontrados:\n');
  issues.forEach(({ line, issue, content }) => {
    console.log(`  Línea ${line}: ${issue}`);
    console.log(`    "${content.trim()}"\n`);
  });
} else {
  console.log('✅ No se encontraron comas dobles o arrays vacíos\n');
}

// Buscar productos con estructura mínima
const productStrings = [];
let currentProduct = '';
let braceCount = 0;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];

  // Contar llaves
  for (const char of line) {
    if (char === '{') braceCount++;
    if (char === '}') braceCount--;
  }

  currentProduct += line + '\n';

  // Si llegamos a braceCount 0 y hay contenido
  if (braceCount === 0 && currentProduct.trim()) {
    if (currentProduct.includes('slug:')) {
      productStrings.push(currentProduct.trim());
    } else if (currentProduct.length > 10) {
      console.log('⚠️  Posible producto sin slug:');
      console.log(currentProduct.substring(0, 200));
      console.log('...\n');
    }
    currentProduct = '';
  }
}

console.log(`📊 Productos válidos encontrados: ${productStrings.length}\n`);

// Verificar si hay elementos vacíos entre productos
console.log('🔍 Buscando elementos vacíos entre productos...\n');

const productSeparators = productsBlock.match(/\},\s*\n\s*\{/g);
const emptyElements = productsBlock.match(/\},\s*,\s*\{/g);

if (emptyElements && emptyElements.length > 0) {
  console.log(`❌ Se encontraron ${emptyElements.length} elementos vacíos (},, {)`);
} else {
  console.log('✅ No hay elementos vacíos entre productos');
}

console.log('\n✅ Análisis completo');
