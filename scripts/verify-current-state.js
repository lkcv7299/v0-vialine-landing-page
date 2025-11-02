const fs = require('fs');
const path = require('path');

// Leer products.ts
const productsContent = fs.readFileSync('data/products.ts', 'utf8');

// Extraer TODAS las referencias de imágenes
const imageRegex = /image:\s*["']([^"']+)["']/g;
const referencedImages = new Set();
let match;

while ((match = imageRegex.exec(productsContent)) !== null) {
  const imgPath = match[1].replace(/^\//, '');
  referencedImages.add(imgPath);
}

// Contar imágenes en filesystem
function countImages(dir) {
  let count = 0;
  if (!fs.existsSync(dir)) return 0;

  const items = fs.readdirSync(dir);
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      count += countImages(fullPath);
    } else if (item.match(/\.(webp|jpg|jpeg|png)$/i)) {
      count++;
    }
  }
  return count;
}

const totalImages = countImages('public/productos');

console.log('\n=== ESTADO ACTUAL DEL SISTEMA ===\n');
console.log('Imágenes referenciadas en products.ts:', referencedImages.size);
console.log('Imágenes totales en filesystem:', totalImages);
console.log('Imágenes SIN USAR:', totalImages - referencedImages.size);
console.log('Porcentaje de uso:', Math.round((referencedImages.size / totalImages) * 100) + '%');
console.log('\n=================================\n');

// Verificar estructura de colores actual
console.log('Verificando estructura de colores...\n');

// Check top-paradise
const topParadiseMatch = productsContent.match(/slug:\s*"top-paradise"[\s\S]{1,2000}colors:\s*\[[\s\S]{1,3000}\]/);
if (topParadiseMatch) {
  const hasImagesArray = topParadiseMatch[0].includes('images:');
  console.log('top-paradise usa images[] (plural):', hasImagesArray ? 'SÍ' : 'NO');

  if (!hasImagesArray) {
    const colorCount = (topParadiseMatch[0].match(/image:\s*["']/g) || []).length;
    console.log('top-paradise tiene', colorCount, 'colores con 1 imagen cada uno');
  }
}

// Contar cuántas imágenes hay por color en filesystem
console.log('\nEjemplo: camiseta-cuello-alto-negro');
const negroImages = fs.readdirSync('public/productos/mujer/camisetas').filter(f =>
  f.startsWith('camiseta-cuello-alto-negro') && f.endsWith('.webp')
);
console.log('Imágenes en filesystem:', negroImages.length);
console.log('Archivos:', negroImages);

// Check if only using img1
const usingOnly1 = productsContent.includes('camiseta-cuello-alto-negro-cuello-alto-negro1.webp');
console.log('products.ts solo usa negro1:', usingOnly1 ? 'SÍ (las otras 3 están sin usar)' : 'NO');
