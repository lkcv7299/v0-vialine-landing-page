/**
 * Valida que todos los productos tengan la estructura correcta
 */
const fs = require('fs');
const path = require('path');

const PRODUCTS_TS = path.join(__dirname, '..', 'data', 'products.ts');

console.log('🔍 Validando estructura de productos...\n');

// Leer archivo
const content = fs.readFileSync(PRODUCTS_TS, 'utf8');

// Extraer el array de productos usando regex
const match = content.match(/export const products: Product\[\] = \[([\s\S]*?)\n\]/);
if (!match) {
  console.error('❌ No se pudo encontrar el array de productos');
  process.exit(1);
}

const productsBlock = match[1];

// Separar productos
const productStrings = [];
let currentProduct = '';
let braceCount = 0;

const lines = productsBlock.split('\n');
for (let i = 0; i < lines.length; i++) {
  const line = lines[i];

  // Contar llaves
  for (const char of line) {
    if (char === '{') braceCount++;
    if (char === '}') braceCount--;
  }

  currentProduct += line + '\n';

  // Si llegamos a braceCount 0 y hay contenido, es un producto completo
  if (braceCount === 0 && currentProduct.trim() && currentProduct.includes('slug:')) {
    productStrings.push(currentProduct.trim());
    currentProduct = '';
  }
}

console.log(`📊 Total productos encontrados: ${productStrings.length}\n`);

// Validar cada producto
let errors = 0;
const requiredFields = ['slug', 'title', 'price', 'image', 'category', 'fabric', 'colors', 'sizes', 'audience'];

productStrings.forEach((str, index) => {
  const missingFields = [];

  requiredFields.forEach(field => {
    const regex = new RegExp(`${field}:\\s*`);
    if (!regex.test(str)) {
      missingFields.push(field);
    }
  });

  // Extraer slug para identificar el producto
  const slugMatch = str.match(/slug:\s*"([^"]+)"/);
  const slug = slugMatch ? slugMatch[1] : `UNKNOWN-${index}`;

  if (missingFields.length > 0) {
    console.log(`❌ Producto ${index + 1}: "${slug}"`);
    console.log(`   Campos faltantes: ${missingFields.join(', ')}`);
    errors++;
  }

  // Validar que slug no sea vacío
  if (slug === '' || slug === 'undefined' || slug === 'null') {
    console.log(`❌ Producto ${index + 1}: slug inválido: "${slug}"`);
    errors++;
  }
});

if (errors === 0) {
  console.log('✅ Todos los productos tienen estructura válida\n');

  // Mostrar primeros 10 slugs
  console.log('📋 Primeros 10 productos:');
  productStrings.slice(0, 10).forEach((str, i) => {
    const slugMatch = str.match(/slug:\s*"([^"]+)"/);
    const slug = slugMatch ? slugMatch[1] : 'UNKNOWN';
    console.log(`  ${(i + 1).toString().padStart(2)}. ${slug}`);
  });

  // Mostrar últimos 10 slugs
  console.log('\n📋 Últimos 10 productos:');
  productStrings.slice(-10).forEach((str, i) => {
    const slugMatch = str.match(/slug:\s*"([^"]+)"/);
    const slug = slugMatch ? slugMatch[1] : 'UNKNOWN';
    const actualIndex = productStrings.length - 10 + i;
    console.log(`  ${(actualIndex + 1).toString().padStart(2)}. ${slug}`);
  });
} else {
  console.log(`\n❌ Se encontraron ${errors} errores\n`);
  process.exit(1);
}

console.log('\n✅ Validación completa');
