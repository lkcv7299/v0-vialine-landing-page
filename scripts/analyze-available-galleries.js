const fs = require('fs');
const path = require('path');

console.log('\n🔍 Análisis DETALLADO de imágenes disponibles vs usadas\n');

const productsPath = 'data/products.ts';
const productsContent = fs.readFileSync(productsPath, 'utf8');

// Regex para encontrar colores con SINGLE image
const colorBlockRegex = /\{\s*name:\s*["']([^"']+)["']\s*,\s*slug:\s*["']([^"']+)["']\s*,\s*hex:\s*["']([^"']+)["']\s*,\s*image:\s*["']([^"']+)["']\s*,?\s*\}/gs;

const results = [];
let match;

while ((match = colorBlockRegex.exec(productsContent)) !== null) {
  const colorName = match[1];
  const colorSlug = match[2];
  const imagePath = match[4];

  // Extraer info del path
  const dir = path.dirname(imagePath.replace(/^\//, ''));
  const fullDir = path.join('public', dir);
  const baseFilename = path.basename(imagePath);

  if (!fs.existsSync(fullDir)) {
    results.push({
      colorName,
      colorSlug,
      currentImage: baseFilename,
      status: 'DIR_NOT_FOUND',
      availableImages: 0
    });
    continue;
  }

  // Buscar imágenes relacionadas con este color
  const files = fs.readdirSync(fullDir);

  // Extraer el slug del producto y el color del nombre del archivo
  // Ejemplo: "camiseta-cuello-alto-turquesa-cuello-alto-turquesa1.webp"
  // → producto: "camiseta-cuello-alto", color: "turquesa"

  const basePattern = baseFilename
    .replace(/\.webp$/, '')
    .replace(/[-_]?\d+$/, '')
    .toLowerCase();

  // Buscar todas las imágenes que coincidan (considerando typos)
  const matchingFiles = files.filter(f => {
    if (!f.endsWith('.webp')) return false;

    const fPattern = f
      .replace(/\.webp$/, '')
      .replace(/[-_]?\d+$/, '')
      .toLowerCase();

    // Coincidencia exacta o muy similar
    return fPattern === basePattern ||
           fPattern.includes(basePattern.substring(0, 20)) ||
           basePattern.includes(fPattern.substring(0, 20));
  });

  results.push({
    colorName,
    colorSlug,
    currentImage: baseFilename,
    status: matchingFiles.length > 1 ? 'HAS_GALLERY' : 'SINGLE_ONLY',
    availableImages: matchingFiles.length,
    samples: matchingFiles.slice(0, 5)
  });
}

// Análisis de resultados
const hasGallery = results.filter(r => r.status === 'HAS_GALLERY');
const singleOnly = results.filter(r => r.status === 'SINGLE_ONLY');
const dirNotFound = results.filter(r => r.status === 'DIR_NOT_FOUND');

console.log('📊 RESUMEN:\n');
console.log(`   Total colores con single image: ${results.length}`);
console.log(`   Colores con gallery disponible: ${hasGallery.length} ✅`);
console.log(`   Colores con solo 1 imagen: ${singleOnly.length} ⚠️`);
console.log(`   Directorio no encontrado: ${dirNotFound.length} ❌`);

console.log('\n\n🎨 COLORES CON GALLERY DISPONIBLE (pueden convertirse):\n');
hasGallery.slice(0, 30).forEach((r, i) => {
  console.log(`${i + 1}. ${r.colorName} (${r.colorSlug})`);
  console.log(`   Actual: ${r.currentImage}`);
  console.log(`   Disponibles: ${r.availableImages} imágenes`);
  console.log(`   ${r.samples.join(', ')}`);
  console.log('');
});

if (hasGallery.length > 30) {
  console.log(`   ... y ${hasGallery.length - 30} más\n`);
}

console.log('\n⚠️ COLORES CON SOLO 1 IMAGEN (no se pueden convertir):\n');
console.log(`   ${singleOnly.length} colores - Estos productos solo tienen 1 imagen disponible`);
console.log(`   Ejemplos: ${singleOnly.slice(0, 10).map(r => r.colorName).join(', ')}`);

// Guardar reporte detallado
const report = {
  summary: {
    total: results.length,
    hasGallery: hasGallery.length,
    singleOnly: singleOnly.length,
    dirNotFound: dirNotFound.length
  },
  hasGallery,
  singleOnly: singleOnly.slice(0, 50), // Solo primeros 50
  dirNotFound
};

fs.writeFileSync('gallery-analysis-report.json', JSON.stringify(report, null, 2));

console.log('\n\n📝 Reporte detallado guardado en: gallery-analysis-report.json\n');
