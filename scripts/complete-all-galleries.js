const fs = require('fs');
const path = require('path');

console.log('\n🔧 Convirtiendo TODOS los colores con single image → images array\n');

const productsPath = 'data/products.ts';
let productsContent = fs.readFileSync(productsPath, 'utf8');

/**
 * Función para buscar todas las imágenes de un color
 * Dado un path como "/productos/mujer/camisetas/camiseta-cuello-alto-turquesa-cuello-alto-turquesa.webp"
 * Busca TODAS las variantes: turquesa1.webp, turquesa2.webp, etc.
 */
function findAllImagesForColor(baseImagePath) {
  // Extraer directorio y patrón base de la imagen actual
  const dir = path.dirname(baseImagePath.replace(/^\//, ''));
  const fullDir = path.join('public', dir);

  if (!fs.existsSync(fullDir)) {
    console.warn(`   ⚠️  Directorio no existe: ${fullDir}`);
    return [baseImagePath]; // Fallback a imagen original
  }

  // Extraer el patrón base del archivo (sin el número final)
  // Ejemplo: "camiseta-cuello-alto-turquesa-cuello-alto-turquesa.webp"
  // → "camiseta-cuello-alto-turquesa-cuello-alto-turquesa"
  const baseFilename = path.basename(baseImagePath);

  // Remover extensión y número final si existe
  // Soporta: "nombre.webp" o "nombre1.webp" o "nombre-1.webp"
  const basePattern = baseFilename
    .replace(/\.webp$/, '')      // Quitar extensión
    .replace(/[-_]?\d+$/, '');   // Quitar número final con o sin guion/underscore

  // Leer todos los archivos del directorio
  const files = fs.readdirSync(fullDir);

  // Buscar archivos que coincidan con el patrón base
  const matchingFiles = files
    .filter(f => {
      // Debe terminar en .webp
      if (!f.endsWith('.webp')) return false;

      // Remover extensión y número para comparar
      const fBase = f
        .replace(/\.webp$/, '')
        .replace(/[-_]?\d+$/, '');

      // Comparar patrones base (case insensitive para typos)
      return fBase.toLowerCase() === basePattern.toLowerCase();
    })
    .sort((a, b) => {
      // Extraer número del nombre del archivo
      const numA = parseInt(a.match(/[-_]?(\d+)\.webp$/)?.[1] || '0');
      const numB = parseInt(b.match(/[-_]?(\d+)\.webp$/)?.[1] || '0');
      return numA - numB;
    });

  if (matchingFiles.length === 0) {
    console.warn(`   ⚠️  No se encontraron imágenes para: ${basePattern}`);
    return [baseImagePath];
  }

  // Convertir a paths absolutos con /
  const allImages = matchingFiles.map(f => {
    return `/${dir}/${f}`.replace(/\\/g, '/');
  });

  return allImages;
}

// Regex para encontrar bloques de color con SINGLE image (no images array)
// Patrón: { name: "...", slug: "...", hex: "...", image: "..." }
const colorBlockRegex = /\{\s*name:\s*["']([^"']+)["']\s*,\s*slug:\s*["']([^"']+)["']\s*,\s*hex:\s*["']([^"']+)["']\s*,\s*image:\s*["']([^"']+)["']\s*,?\s*\}/gs;

const updates = [];
let match;
let totalConverted = 0;
let totalNewImages = 0;

console.log('📊 Escaneando colors con single image...\n');

// Recolectar todos los matches primero
const matches = [];
while ((match = colorBlockRegex.exec(productsContent)) !== null) {
  matches.push({
    fullMatch: match[0],
    colorName: match[1],
    colorSlug: match[2],
    colorHex: match[3],
    imagePath: match[4],
    index: match.index
  });
}

console.log(`✅ Encontrados ${matches.length} colores con single image\n`);
console.log('🔍 Buscando imágenes adicionales para cada color...\n');

// Procesar cada match en orden inverso (para no afectar los índices)
matches.reverse().forEach((m, i) => {
  const colorName = m.colorName;
  const colorSlug = m.colorSlug;
  const colorHex = m.colorHex;
  const imagePath = m.imagePath;

  // Buscar todas las imágenes para este color
  const allImages = findAllImagesForColor(imagePath);

  // Solo actualizar si encontramos más de 1 imagen
  if (allImages.length > 1) {
    console.log(`${i + 1}. ${colorName} (${colorSlug})`);
    console.log(`   Antes: 1 imagen`);
    console.log(`   Después: ${allImages.length} imágenes`);
    console.log(`   ${allImages.map(img => path.basename(img)).join(', ')}\n`);

    // Crear el nuevo bloque con images array
    const newBlock = `{
      name: "${colorName}",
      slug: "${colorSlug}",
      hex: "${colorHex}",
      images: [
        ${allImages.map(img => `"${img}"`).join(',\n        ')}
      ]
    }`;

    // Reemplazar en el contenido
    productsContent = productsContent.replace(m.fullMatch, newBlock);

    totalConverted++;
    totalNewImages += (allImages.length - 1); // -1 porque ya tenía 1 imagen
  } else {
    console.log(`   ⚠️  ${colorName} (${colorSlug}) - Solo 1 imagen encontrada, no se modifica`);
  }
});

// Guardar el archivo actualizado
fs.writeFileSync(productsPath, productsContent, 'utf8');

console.log('\n✅ Conversión completada:\n');
console.log(`   Colores convertidos: ${totalConverted}`);
console.log(`   Imágenes adicionales agregadas: ${totalNewImages}`);
console.log(`   Colores sin cambios: ${matches.length - totalConverted}`);

// Verificar estado final
const finalImagesArrays = (productsContent.match(/images:\s*\[/g) || []).length;
const finalSingleImages = (productsContent.match(/image:\s*["']/g) || []).length;

console.log('\n📊 Estado final:');
console.log(`   Colores con images (array): ${finalImagesArrays}`);
console.log(`   Colores con image (single): ${finalSingleImages}`);

console.log('\n📝 Archivo actualizado: data/products.ts\n');
