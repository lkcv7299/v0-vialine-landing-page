const fs = require('fs');
const path = require('path');

console.log('\n🔧 Convirtiendo los 17 colores restantes con galleries disponibles\n');

const productsPath = 'data/products.ts';
let productsContent = fs.readFileSync(productsPath, 'utf8');

// Leer el reporte de análisis
const report = JSON.parse(fs.readFileSync('gallery-analysis-report.json', 'utf8'));
const colorsToConvert = report.hasGallery;

console.log(`✅ Encontrados ${colorsToConvert.length} colores para convertir\n`);

let totalConverted = 0;
let totalImages = 0;

// Procesar cada color
colorsToConvert.forEach((colorData, i) => {
  const { colorName, colorSlug, currentImage, samples } = colorData;

  console.log(`${i + 1}. Procesando: ${colorName} (${colorSlug})`);

  // Buscar el path completo de la imagen actual
  const imagePath = samples.find(s => s.includes(currentImage));

  if (!imagePath) {
    console.log(`   ⚠️  No se encontró imagen actual: ${currentImage}`);
    return;
  }

  const fullImagePath = `/${path.dirname(imagePath.replace(/^\//, '')).replace(/\\/g, '/')}/${currentImage}`;

  // Buscar el bloque exacto en products.ts
  // Patrón: { name: "...", slug: "...", hex: "...", image: "..." }
  const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

  // Buscar el bloque con este slug específico
  const blockRegex = new RegExp(
    `\\{\\s*name:\\s*["']${escapeRegex(colorName)}["']\\s*,\\s*slug:\\s*["']${escapeRegex(colorSlug)}["']\\s*,\\s*hex:\\s*["']([^"']+)["']\\s*,\\s*image:\\s*["'][^"']*${escapeRegex(currentImage)}[^"']*["']\\s*,?\\s*\\}`,
    's'
  );

  const match = productsContent.match(blockRegex);

  if (!match) {
    console.log(`   ⚠️  No se encontró el bloque en products.ts`);
    return;
  }

  const fullMatch = match[0];
  const colorHex = match[1];

  // Obtener el directorio de la imagen
  const dir = path.dirname(fullImagePath.replace(/^\//, ''));
  const fullDir = path.join('public', dir);

  if (!fs.existsSync(fullDir)) {
    console.log(`   ⚠️  Directorio no existe: ${fullDir}`);
    return;
  }

  // Leer archivos del directorio
  const files = fs.readdirSync(fullDir);

  // Extraer patrón base del nombre del archivo
  const basePattern = currentImage
    .replace(/\.webp$/, '')
    .replace(/[-_]?\d+\.?\.?$/, '')  // Remover números y puntos dobles
    .toLowerCase();

  // Buscar archivos que coincidan
  const matchingFiles = files.filter(f => {
    if (!f.endsWith('.webp')) return false;

    const fPattern = f
      .replace(/\.webp$/, '')
      .replace(/[-_]?\d+\.?\.?$/, '')
      .toLowerCase();

    return fPattern === basePattern ||
           fPattern.includes(basePattern.substring(0, 20)) ||
           basePattern.includes(fPattern.substring(0, 20));
  }).sort((a, b) => {
    const numA = parseInt(a.match(/[-_]?(\d+)\.?\.?\.webp$/)?.[1] || '0');
    const numB = parseInt(b.match(/[-_]?(\d+)\.?\.?\.webp$/)?.[1] || '0');
    return numA - numB;
  });

  if (matchingFiles.length <= 1) {
    console.log(`   ⚠️  Solo 1 imagen encontrada`);
    return;
  }

  // Convertir a paths absolutos
  const allImages = matchingFiles.map(f => `/${dir}/${f}`.replace(/\\/g, '/'));

  // Crear el nuevo bloque con images array
  const newBlock = `{
      name: "${colorName}",
      slug: "${colorSlug}",
      hex: "${colorHex}",
      images: [
        ${allImages.slice(0, 6).map(img => `"${img}"`).join(',\n        ')}
      ]
    }`;

  // Reemplazar en el contenido
  productsContent = productsContent.replace(fullMatch, newBlock);

  console.log(`   ✅ Convertido: ${allImages.length} imágenes agregadas`);
  console.log(`      ${allImages.slice(0, 3).map(p => path.basename(p)).join(', ')}...\n`);

  totalConverted++;
  totalImages += allImages.length;
});

// Guardar el archivo actualizado
fs.writeFileSync(productsPath, productsContent, 'utf8');

console.log('\n✅ Conversión completada:\n');
console.log(`   Colores convertidos: ${totalConverted}`);
console.log(`   Total imágenes agregadas: ${totalImages}`);

// Verificar estado final
const finalImagesArrays = (productsContent.match(/images:\s*\[/g) || []).length;
const finalSingleImages = (productsContent.match(/image:\s*["']/g) || []).length;

console.log('\n📊 Estado final:');
console.log(`   Colores con images (array): ${finalImagesArrays}`);
console.log(`   Colores con image (single): ${finalSingleImages}`);

console.log('\n📝 Archivo actualizado: data/products.ts\n');
