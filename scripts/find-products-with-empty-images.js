const fs = require('fs');

console.log('\n🔍 Buscando productos con campos image vacíos...\n');

const content = fs.readFileSync('data/products.ts', 'utf8');

const problems = [];

// Buscar todos los objetos de producto
const productRegex = /\{\s*slug:\s*["']([^"']+)["'][^}]*?title:\s*["']([^"']+)["'][^}]*?image:\s*["']([^"']*)["']/gs;

let match;
while ((match = productRegex.exec(content)) !== null) {
  const slug = match[1];
  const title = match[2];
  const image = match[3];

  if (image.trim() === "") {
    problems.push({
      slug,
      title,
      issue: 'Campo "image" vacío en producto principal'
    });
  }
}

// También buscar en colores
const colorWithImageRegex = /name:\s*["']([^"']+)["']\s*,\s*slug:\s*["']([^"']+)["'][^}]*?image:\s*["']([^"']*)["']/gs;

while ((match = colorWithImageRegex.exec(content)) !== null) {
  const colorName = match[1];
  const colorSlug = match[2];
  const image = match[3];

  if (image.trim() === "") {
    // Buscar el producto al que pertenece
    const beforeMatch = content.substring(Math.max(0, match.index - 500), match.index);
    const productSlugMatch = beforeMatch.match(/slug:\s*["']([^"']+)["']/);
    const productTitleMatch = beforeMatch.match(/title:\s*["']([^"']+)["']/);

    problems.push({
      slug: productSlugMatch ? productSlugMatch[1] : 'unknown',
      title: productTitleMatch ? productTitleMatch[1] : 'unknown',
      colorName,
      colorSlug,
      issue: `Campo "image" vacío en color "${colorName}"`
    });
  }
}

if (problems.length === 0) {
  console.log('✅ No se encontraron campos "image" vacíos\n');
} else {
  console.log(`❌ ENCONTRADOS ${problems.length} PROBLEMAS:\n`);

  problems.forEach((p, i) => {
    console.log(`${i + 1}. Producto: ${p.title}`);
    console.log(`   Slug: ${p.slug}`);
    if (p.colorName) {
      console.log(`   Color: ${p.colorName} (${p.colorSlug})`);
    }
    console.log(`   Problema: ${p.issue}`);
    console.log('');
  });
}

console.log('\n📊 Análisis completo.\n');
