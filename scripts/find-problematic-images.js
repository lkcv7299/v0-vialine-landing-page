const fs = require('fs');

console.log('\n🔍 Análisis exhaustivo de imágenes problemáticas...\n');

const content = fs.readFileSync('data/products.ts', 'utf8');

// Buscar todos los objetos de color completos
const colorObjectRegex = /\{\s*name:\s*["']([^"']+)["']\s*,\s*slug:\s*["']([^"']+)["']\s*,\s*hex:\s*["']([^"']+)["']\s*,\s*(image|images):\s*([^}]+)\}/gs;

let match;
let problems = [];

while ((match = colorObjectRegex.exec(content)) !== null) {
  const colorName = match[1];
  const colorSlug = match[2];
  const colorHex = match[3];
  const imageType = match[4]; // "image" or "images"
  const imageValue = match[5].trim();

  // Buscar el producto al que pertenece este color
  const beforeMatch = content.substring(Math.max(0, match.index - 500), match.index);
  const productSlugMatch = beforeMatch.match(/slug:\s*["']([^"']+)["']/);
  const productNameMatch = beforeMatch.match(/title:\s*["']([^"']+)["']/);

  const productSlug = productSlugMatch ? productSlugMatch[1] : 'unknown';
  const productName = productNameMatch ? productNameMatch[1] : 'unknown';

  // Verificar problemas específicos
  if (imageType === 'image') {
    // Verificar si image es un string vacío
    if (imageValue.includes('""') || imageValue.includes("''")) {
      problems.push({
        product: productName,
        productSlug,
        color: colorName,
        colorSlug,
        issue: 'STRING VACÍO en campo "image"',
        value: imageValue
      });
    }
  } else if (imageType === 'images') {
    // Verificar si images contiene strings vacíos
    if (imageValue.includes('""') || imageValue.includes("''")) {
      problems.push({
        product: productName,
        productSlug,
        color: colorName,
        colorSlug,
        issue: 'STRING VACÍO en array "images"',
        value: imageValue
      });
    }

    // Verificar si el array termina prematuramente (trailing comma sin valor)
    if (imageValue.match(/,\s*\]/)) {
      problems.push({
        product: productName,
        productSlug,
        color: colorName,
        colorSlug,
        issue: 'TRAILING COMMA en array "images" (puede causar undefined)',
        value: imageValue
      });
    }
  }
}

if (problems.length === 0) {
  console.log('✅ No se encontraron problemas obvios en la estructura de datos\n');
  console.log('🔍 Buscando otros posibles problemas...\n');

  // Buscar otros patrones problemáticos
  const trailingCommaRegex = /images:\s*\[[^\]]*,\s*\]/g;
  let trailingMatch;

  while ((trailingMatch = trailingCommaRegex.exec(content)) !== null) {
    console.log('⚠️  Posible trailing comma encontrado:');
    const start = Math.max(0, trailingMatch.index - 200);
    const end = Math.min(content.length, trailingMatch.index + trailingMatch[0].length + 50);
    console.log(content.substring(start, end));
    console.log('\n---\n');
  }

} else {
  console.log(`❌ ENCONTRADOS ${problems.length} PROBLEMAS:\n`);

  problems.forEach((p, i) => {
    console.log(`${i + 1}. Producto: ${p.product}`);
    console.log(`   Slug: ${p.productSlug}`);
    console.log(`   Color: ${p.color} (${p.colorSlug})`);
    console.log(`   Problema: ${p.issue}`);
    console.log(`   Valor: ${p.value.substring(0, 100)}...`);
    console.log('');
  });
}

console.log('\n📊 Análisis completo.\n');
