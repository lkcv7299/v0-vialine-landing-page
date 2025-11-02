const fs = require('fs');

console.log('\n🔍 Buscando strings vacíos en arrays de imágenes...\n');

const content = fs.readFileSync('data/products.ts', 'utf8');

// Buscar todos los arrays de images
const imagesArrayRegex = /images:\s*\[([\s\S]*?)\]/g;
let match;
let foundIssues = false;

while ((match = imagesArrayRegex.exec(content)) !== null) {
  const arrayContent = match[1];

  // Verificar si hay strings vacíos
  if (arrayContent.includes('""') || arrayContent.includes("''")) {
    foundIssues = true;

    // Extraer contexto del producto
    const start = Math.max(0, match.index - 300);
    const beforeMatch = content.substring(start, match.index);

    // Buscar slug del producto
    const slugMatch = beforeMatch.match(/slug:\s*["']([^"']+)["']/);
    const nameMatch = beforeMatch.match(/name:\s*["']([^"']+)["']/);

    console.log('❌ ENCONTRADO STRING VACÍO:');
    console.log(`   Producto: ${nameMatch ? nameMatch[1] : 'desconocido'}`);
    console.log(`   Slug: ${slugMatch ? slugMatch[1] : 'desconocido'}`);
    console.log(`   Array completo: ${match[0]}`);
    console.log('\n---\n');
  }
}

if (!foundIssues) {
  console.log('✅ No se encontraron strings vacíos en arrays de imágenes');
} else {
  console.log('\n📊 Análisis completo. Problemas encontrados arriba.\n');
}

// También verificar si hay arrays vacíos
const emptyArrayRegex = /images:\s*\[\s*\]/g;
let emptyMatch;
let foundEmpty = false;

console.log('🔍 Buscando arrays vacíos...\n');

while ((emptyMatch = emptyArrayRegex.exec(content)) !== null) {
  foundEmpty = true;

  const start = Math.max(0, emptyMatch.index - 300);
  const beforeMatch = content.substring(start, emptyMatch.index);

  const slugMatch = beforeMatch.match(/slug:\s*["']([^"']+)["']/);
  const nameMatch = beforeMatch.match(/name:\s*["']([^"']+)["']/);

  console.log('⚠️  ENCONTRADO ARRAY VACÍO:');
  console.log(`   Producto: ${nameMatch ? nameMatch[1] : 'desconocido'}`);
  console.log(`   Slug: ${slugMatch ? slugMatch[1] : 'desconocido'}`);
  console.log('\n---\n');
}

if (!foundEmpty) {
  console.log('✅ No se encontraron arrays vacíos\n');
}
