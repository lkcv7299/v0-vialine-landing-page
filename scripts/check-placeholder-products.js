/**
 * Identifica productos con placeholder en el top 12 de mujer y niña
 */
const fs = require('fs');
const path = require('path');

// Importar products manualmente
const PRODUCTS_TS = path.join(__dirname, '..', 'data', 'products.ts');
const content = fs.readFileSync(PRODUCTS_TS, 'utf8');

// Extraer productos
const productsMatch = content.match(/export const products: Product\[\] = \[([\s\S]*)\]\s*export const findProduct/);
if (!productsMatch) {
  console.error('❌ No se pudo parsear products.ts');
  process.exit(1);
}

// Parsear productos (simplificado - solo necesitamos slug, image, audience)
const productStrings = productsMatch[1].split(/\n\s*\},\s*\n\s*\{/);
const products = [];

productStrings.forEach((str, idx) => {
  // Agregar llaves si no es el primer o último
  let productStr = str;
  if (idx > 0) productStr = '{' + productStr;
  if (idx < productStrings.length - 1) productStr = productStr + '}';

  const slugMatch = productStr.match(/slug:\s*"([^"]+)"/);
  const imageMatch = productStr.match(/image:\s*"([^"]+)"/);
  const audienceMatch = productStr.match(/audience:\s*"([^"]+)"/);

  if (slugMatch && imageMatch && audienceMatch) {
    products.push({
      slug: slugMatch[1],
      image: imageMatch[1],
      audience: audienceMatch[1]
    });
  }
});

console.log(`📊 Total productos encontrados: ${products.length}\n`);

// Separar por género
const mujer = products.filter(p => p.audience === 'mujer');
const nina = products.filter(p => p.audience === 'nina');

console.log(`👩 Productos mujer: ${mujer.length}`);
console.log(`👧 Productos niña: ${nina.length}\n`);

// Verificar top 12 de cada género
console.log('🔍 MUJER - Primeros 12 productos (los que aparecen en carrusel):\n');
const mujerTop12 = mujer.slice(0, 12);
let mujerPlaceholders = [];

mujerTop12.forEach((p, i) => {
  const hasPlaceholder = p.image.includes('placeholder.svg');
  const status = hasPlaceholder ? '❌ SIN FOTO' : '✅ CON FOTO';
  console.log(`  ${(i + 1).toString().padStart(2)}. ${p.slug.padEnd(50)} ${status}`);

  if (hasPlaceholder) {
    mujerPlaceholders.push({ index: i, slug: p.slug });
  }
});

console.log('\n🔍 NIÑA - Primeros 12 productos (los que aparecen en carrusel):\n');
const ninaTop12 = nina.slice(0, 12);
let ninaPlaceholders = [];

ninaTop12.forEach((p, i) => {
  const hasPlaceholder = p.image.includes('placeholder.svg');
  const status = hasPlaceholder ? '❌ SIN FOTO' : '✅ CON FOTO';
  console.log(`  ${(i + 1).toString().padStart(2)}. ${p.slug.padEnd(50)} ${status}`);

  if (hasPlaceholder) {
    ninaPlaceholders.push({ index: i, slug: p.slug });
  }
});

// Resumen
console.log('\n📊 RESUMEN:\n');
console.log(`  Mujer: ${mujerPlaceholders.length}/12 productos SIN FOTO en carrusel`);
if (mujerPlaceholders.length > 0) {
  console.log('    Productos a mover/eliminar:');
  mujerPlaceholders.forEach(p => {
    console.log(`      - ${p.slug}`);
  });
}

console.log(`\n  Niña: ${ninaPlaceholders.length}/12 productos SIN FOTO en carrusel`);
if (ninaPlaceholders.length > 0) {
  console.log('    Productos a mover/eliminar:');
  ninaPlaceholders.forEach(p => {
    console.log(`      - ${p.slug}`);
  });
}

// Buscar productos CON foto para reemplazar
if (mujerPlaceholders.length > 0) {
  console.log('\n\n🔄 MUJER - Productos disponibles CON FOTO (fuera del top 12):');
  const mujerAfter12 = mujer.slice(12);
  const mujerWithPhotos = mujerAfter12.filter(p => !p.image.includes('placeholder.svg'));
  console.log(`  Encontrados: ${mujerWithPhotos.length} productos`);
  mujerWithPhotos.slice(0, mujerPlaceholders.length + 3).forEach(p => {
    console.log(`    ✅ ${p.slug}`);
  });
}

if (ninaPlaceholders.length > 0) {
  console.log('\n🔄 NIÑA - Productos disponibles CON FOTO (fuera del top 12):');
  const ninaAfter12 = nina.slice(12);
  const ninaWithPhotos = ninaAfter12.filter(p => !p.image.includes('placeholder.svg'));
  console.log(`  Encontrados: ${ninaWithPhotos.length} productos`);
  ninaWithPhotos.slice(0, ninaPlaceholders.length + 3).forEach(p => {
    console.log(`    ✅ ${p.slug}`);
  });
}

console.log('\n✅ Análisis completo');
