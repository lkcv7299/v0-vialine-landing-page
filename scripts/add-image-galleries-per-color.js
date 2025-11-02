const fs = require('fs');
const path = require('path');

console.log('\n🎨 SCRIPT: Agregar galerías de imágenes por color\n');

// Leer products.ts actual
const productsPath = 'data/products.ts';
let productsContent = fs.readFileSync(productsPath, 'utf8');

// Función para encontrar TODAS las imágenes de un color específico
function findAllColorImages(productSlug, colorSlug, baseImagePath) {
  const allImages = [];

  // Extraer directorio y patrón base de la imagen actual
  const dir = path.dirname(baseImagePath.replace(/^\//, ''));
  const fullDir = path.join('public', dir);

  if (!fs.existsSync(fullDir)) {
    return [baseImagePath]; // Fallback a imagen original
  }

  // Extraer el patrón base del archivo (sin el número final)
  // Ejemplo: "camiseta-cuello-alto-azul-marino-cuello-alto-azulmarino1.webp"
  // → "camiseta-cuello-alto-azul-marino-cuello-alto-azulmarino"
  const baseFilename = path.basename(baseImagePath);
  const basePattern = baseFilename.replace(/\d+\.webp$/, ''); // Quitar número y extensión

  // Leer todos los archivos del directorio
  const files = fs.readdirSync(fullDir);

  // Buscar archivos que coincidan con el patrón base EXACTO del producto
  const matchingFiles = files
    .filter(f => {
      // Debe empezar con el mismo patrón base Y terminar en número.webp
      return f.startsWith(basePattern) && /\d+\.webp$/.test(f);
    })
    .sort((a, b) => {
      // Extraer número al final del archivo
      const numA = parseInt(a.match(/(\d+)\.webp$/)?.[1] || '999');
      const numB = parseInt(b.match(/(\d+)\.webp$/)?.[1] || '999');
      return numA - numB;
    });

  // Construir paths completos
  matchingFiles.forEach(file => {
    const fullPath = `/${dir}/${file}`;
    allImages.push(fullPath);
  });

  // Si no encontramos nada, usar la imagen original
  if (allImages.length === 0) {
    return [baseImagePath];
  }

  return allImages;
}

// Buscar bloques de colores con regex multi-línea
// Patrón: { name: "...", slug: "...", hex: "...", image: "..." }
// Ahora soporta formato multi-línea con trailing commas
const colorBlockRegex = /\{\s*name:\s*["']([^"']+)["']\s*,\s*slug:\s*["']([^"']+)["']\s*,\s*hex:\s*["']([^"']+)["']\s*,\s*image:\s*["']([^"']+)["']\s*,?\s*\}/gs;

const updates = [];
let match;

while ((match = colorBlockRegex.exec(productsContent)) !== null) {
  const fullMatch = match[0];
  const colorName = match[1];
  const colorSlug = match[2];
  const colorHex = match[3];
  const imagePath = match[4];

  // Extraer slug del producto buscando hacia atrás
  const beforeMatch = productsContent.substring(Math.max(0, match.index - 2000), match.index);
  const slugMatch = beforeMatch.match(/slug:\s*["']([^"']+)["'][^]*?$/);

  if (!slugMatch) continue;

  const productSlug = slugMatch[1];

  // Buscar todas las imágenes de este color
  const allImages = findAllColorImages(productSlug, colorSlug, imagePath);

  if (allImages.length > 1) {
    // Construir nuevo bloque con images array
    const imagesFormatted = allImages
      .map(img => `        "${img}"`)
      .join(',\n');

    const newBlock = `{
      name: "${colorName}",
      slug: "${colorSlug}",
      hex: "${colorHex}",
      images: [
${imagesFormatted}
      ]
    }`;

    updates.push({
      original: fullMatch,
      replacement: newBlock,
      productSlug,
      colorSlug,
      colorName,
      imageCount: allImages.length
    });
  }
}

console.log(`📊 Análisis completado:`);
console.log(`   Bloques de color encontrados: ${updates.length}`);

if (updates.length === 0) {
  console.log('\n❌ No se encontraron colores con múltiples imágenes.');
  console.log('   Verifica que existan imágenes como: producto-color-1.webp, producto-color-2.webp, etc.\n');
  process.exit(0);
}

// Agrupar por producto
const byProduct = {};
updates.forEach(u => {
  if (!byProduct[u.productSlug]) byProduct[u.productSlug] = [];
  byProduct[u.productSlug].push(u);
});

console.log(`\n📋 Vista previa de cambios:\n`);
Object.keys(byProduct).slice(0, 10).forEach(slug => {
  const colors = byProduct[slug];
  const totalImages = colors.reduce((sum, c) => sum + c.imageCount, 0);
  console.log(`   ${slug}:`);
  colors.slice(0, 3).forEach(c => {
    console.log(`      - ${c.colorName}: ${c.imageCount} imágenes`);
  });
  if (colors.length > 3) {
    console.log(`      ... y ${colors.length - 3} colores más`);
  }
});

if (Object.keys(byProduct).length > 10) {
  console.log(`   ... y ${Object.keys(byProduct).length - 10} productos más`);
}

console.log(`\n🔄 Aplicando ${updates.length} cambios a products.ts...\n`);

// Aplicar reemplazos (en orden inverso para mantener índices correctos)
updates.reverse().forEach(u => {
  productsContent = productsContent.replace(u.original, u.replacement);
});

// Guardar archivo actualizado
fs.writeFileSync(productsPath, productsContent, 'utf8');

const totalImages = updates.reduce((sum, u) => sum + u.imageCount, 0);

console.log('✅ Actualización completada:\n');
console.log(`   Colores actualizados: ${updates.length}`);
console.log(`   Productos afectados: ${Object.keys(byProduct).length}`);
console.log(`   Total imágenes en galerías: ${totalImages}`);
console.log(`   Promedio por color: ${Math.round(totalImages / updates.length)} imágenes`);

console.log('\n📝 Archivo actualizado: data/products.ts');
console.log('   Campo cambiado: image → images (array)\n');
