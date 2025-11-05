/**
 * Valida que products.ts no tenga undefined - versión detallada
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
const startIndex = match.index + match[0].indexOf('[') + 1;

console.log('Buscando }, ]...');
const trailingCommaMatch = productsArray.match(/\},\s*\]/);
if (trailingCommaMatch) {
  const idx = productsArray.indexOf(trailingCommaMatch[0]);
  console.log('Encontrado en posición:', idx);
  console.log('Contexto (200 chars antes):');
  console.log(productsArray.substring(Math.max(0, idx - 200), idx + 20));
  console.log('\n^--- AQUÍ ESTÁ EL PROBLEMA');
} else {
  console.log('No encontrado con regex /\\},\\s*\\]/');

  // Buscar solo } seguido de ]
  const simpleMatch = productsArray.match(/\}\s*\]/);
  if (simpleMatch) {
    const idx = productsArray.indexOf(simpleMatch[0]);
    console.log('\nEncontrado patrón } ] sin coma en posición:', idx);
    console.log('Contexto (200 chars antes):');
    console.log(productsArray.substring(Math.max(0, idx - 200), idx + 20));
  }
}
