/**
 * Script simple para extraer productos de niña del backup
 */

const fs = require('fs');
const path = require('path');

const BACKUP_PATH = path.join(__dirname, '..', 'data', 'backups', 'products-2025-11-04T22-43-10.ts');
const OUTPUT_PATH = path.join(__dirname, '..', 'data', 'nina-products.json');

// Leer archivo
const content = fs.readFileSync(BACKUP_PATH, 'utf8');

// Extraer solo el código TypeScript del array de productos
const match = content.match(/export const products: Product\[\] = \[([\s\S]*)\n\]\n\nexport const allProducts/);

if (!match) {
  console.error('No se pudo encontrar el array de productos');
  process.exit(1);
}

const productsCode = match[1];

// Separar productos individuales buscando patrones de inicio
const products = [];
let currentProduct = '';
let braceCount = 0;
let inProduct = false;

for (let i = 0; i < productsCode.length; i++) {
  const char = productsCode[i];
  const prevChar = i > 0 ? productsCode[i - 1] : '';
  const nextChar = i < productsCode.length - 1 ? productsCode[i + 1] : '';

  // Detectar inicio de producto (después de coma o inicio, luego {)
  if (char === '{' && (prevChar === ',' || prevChar === '[' || prevChar === '\n' || prevChar === ' ')) {
    if (braceCount === 0) {
      inProduct = true;
      currentProduct = '';
    }
  }

  if (inProduct) {
    currentProduct += char;
    if (char === '{') braceCount++;
    if (char === '}') braceCount--;

    // Fin del producto
    if (braceCount === 0) {
      // Verificar si es de niña
      if (currentProduct.includes('audience: "nina"')) {
        products.push(currentProduct);
      }
      inProduct = false;
      currentProduct = '';
    }
  }
}

console.log(`✅ Productos de niña encontrados: ${products.length}`);

// Guardar
fs.writeFileSync(OUTPUT_PATH, JSON.stringify(products, null, 2), 'utf8');
console.log(`💾 Guardado en: ${OUTPUT_PATH}`);

// También escribir a un archivo .ts temporal
const tsContent = products.join(',\n\n  ');
fs.writeFileSync(OUTPUT_PATH.replace('.json', '.ts'), tsContent, 'utf8');
console.log(`💾 También guardado en: ${OUTPUT_PATH.replace('.json', '.ts')}`);
