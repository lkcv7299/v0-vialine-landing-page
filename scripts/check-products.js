/**
 * Valida que products.ts no tenga undefined
 */
const fs = require('fs');
const path = require('path');

const PRODUCTS_TS = path.join(__dirname, '..', 'data', 'products.ts');
const content = fs.readFileSync(PRODUCTS_TS, 'utf8');

// Extraer el array de productos
const match = content.match(/export const products: Product\[\] = \[([\s\S]*?)\n\]\n/);
if (!match) {
  console.error('❌ No se pudo encontrar el array de productos');
  process.exit(1);
}

const productsArray = match[1];

// Buscar patrones problemáticos
const issues = [];

// 1. Buscar ,, (doble coma)
if (productsArray.includes(',,')) {
  issues.push('Encontrado patrón de doble coma (,,)');
}

// 2. Buscar }, ] (coma + cierre de array)
if (productsArray.match(/\},\s*\]/)) {
  issues.push('Encontrado trailing comma antes del cierre del array');
}

// 3. Contar productos de forma básica
const productCount = (productsArray.match(/audience:/g) || []).length;
console.log(`📊 Productos encontrados (por audience): ${productCount}`);

// 4. Verificar que cada { tiene su correspondiente }
let braceCount = 0;
for (let char of productsArray) {
  if (char === '{') braceCount++;
  if (char === '}') braceCount--;
  if (braceCount < 0) {
    issues.push('Encontrado desbalance de llaves (más } que {)');
    break;
  }
}
if (braceCount > 0) {
  issues.push(`Encontrado desbalance de llaves (${braceCount} llaves sin cerrar)`);
}

// 5. Buscar productos con campos requeridos
const requiredFields = ['slug', 'title', 'price', 'image', 'category', 'fabric', 'colors', 'sizes', 'audience'];
const productBlocks = [];
let depth = 0;
let currentBlock = '';
let inProduct = false;

for (let i = 0; i < productsArray.length; i++) {
  const char = productsArray[i];

  if (char === '{') {
    if (depth === 0) {
      inProduct = true;
      currentBlock = '';
    }
    depth++;
  }

  if (inProduct) {
    currentBlock += char;
  }

  if (char === '}') {
    depth--;
    if (depth === 0 && inProduct) {
      productBlocks.push(currentBlock);
      inProduct = false;
    }
  }
}

console.log(`📊 Bloques de productos encontrados: ${productBlocks.length}`);

// Validar cada bloque
productBlocks.forEach((block, idx) => {
  requiredFields.forEach(field => {
    if (!block.includes(`${field}:`)) {
      issues.push(`Producto #${idx + 1} está faltando el campo: ${field}`);
    }
  });
});

// Reporte
console.log('\n' + '='.repeat(60));
if (issues.length === 0) {
  console.log('✅ No se encontraron problemas obvios en el archivo');
  console.log('='.repeat(60));
  console.log('\nEl error de TypeScript puede ser debido a:');
  console.log('1. Algún campo con valor undefined en lugar de un valor real');
  console.log('2. Alguna función que retorna Product | undefined');
  console.log('3. Un problema de inferencia de tipos de TypeScript');
  console.log('\nIntentando validar con TypeScript...');
} else {
  console.log('❌ PROBLEMAS ENCONTRADOS:');
  console.log('='.repeat(60));
  issues.forEach((issue, idx) => {
    console.log(`${idx + 1}. ${issue}`);
  });
}
