/**
 * Actualiza los nombres de los 5 tops nuevos
 */
const fs = require('fs');
const path = require('path');

const PRODUCTS_TS = path.join(__dirname, '..', 'data', 'products.ts');

console.log('🔧 Actualizando nombres de tops...\n');

let content = fs.readFileSync(PRODUCTS_TS, 'utf8');

// Mapeo de cambios
const changes = [
  {
    from: { slug: 'top-cod710', title: 'Top COD.710' },
    to: { slug: 'top-soporte', title: 'Top Soporte' }
  },
  {
    from: { slug: 'top-cod902', title: 'Top COD.902' },
    to: { slug: 'top-urban', title: 'Top Urban' }
  },
  {
    from: { slug: 'top-cod402', title: 'Top COD.402' },
    to: { slug: 'top-zafiro', title: 'Top Zafiro' }
  },
  {
    from: { slug: 'top-cod391', title: 'Top COD.391' },
    to: { slug: 'top-arena', title: 'Top Arena' }
  },
  {
    from: { slug: 'top-cod901', title: 'Top COD.901' },
    to: { slug: 'top-perla', title: 'Top Perla' }
  }
];

// Aplicar cambios
changes.forEach(change => {
  const slugPattern = new RegExp(`slug: "${change.from.slug}"`, 'g');
  const titlePattern = new RegExp(`title: "${change.from.title}"`, 'g');

  const slugBefore = (content.match(slugPattern) || []).length;
  const titleBefore = (content.match(titlePattern) || []).length;

  content = content.replace(slugPattern, `slug: "${change.to.slug}"`);
  content = content.replace(titlePattern, `title: "${change.to.title}"`);

  const slugAfter = (content.match(new RegExp(`slug: "${change.to.slug}"`, 'g')) || []).length;
  const titleAfter = (content.match(new RegExp(`title: "${change.to.title}"`, 'g')) || []).length;

  console.log(`✅ ${change.from.slug} → ${change.to.slug}`);
  console.log(`   ${change.from.title} → ${change.to.title}`);
  console.log(`   Cambios: ${slugBefore} slugs, ${titleBefore} titles\n`);
});

// Escribir archivo
fs.writeFileSync(PRODUCTS_TS, content, 'utf8');

console.log('✅ Nombres actualizados en data/products.ts');
console.log('\n📊 Resumen:');
console.log('   COD.710 → Top Soporte');
console.log('   COD.902 → Top Urban');
console.log('   COD.402 → Top Zafiro');
console.log('   COD.391 → Top Arena');
console.log('   COD.901 → Top Perla');
