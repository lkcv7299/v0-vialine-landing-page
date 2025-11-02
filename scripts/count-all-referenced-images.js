const fs = require('fs');
const path = require('path');

console.log('\n📊 Conteo PRECISO de imágenes referenciadas\n');

const productsContent = fs.readFileSync('data/products.ts', 'utf8');
const allReferences = new Set();

// 1. Extraer todas las referencias de single image: image: "..."
const singleImageMatches = productsContent.matchAll(/image:\s*["']([^"']+\.webp)["']/g);
for (const match of singleImageMatches) {
  allReferences.add(match[1]);
}

// 2. Extraer todas las referencias de images arrays: images: ["...", "...", ...]
const imagesArrayMatches = productsContent.matchAll(/images:\s*\[([\s\S]*?)\]/g);
for (const match of imagesArrayMatches) {
  const arrayContent = match[1];
  const imageMatches = arrayContent.matchAll(/["']([^"']+\.webp)["']/g);
  for (const imgMatch of imageMatches) {
    allReferences.add(imgMatch[1]);
  }
}

console.log('✅ Imágenes referenciadas en products.ts:', allReferences.size);

// Ahora contar imágenes físicas
const publicDir = 'public';
const imageExtensions = ['.webp'];
let physicalImages = 0;

function countImagesInDir(dir) {
  let count = 0;
  const items = fs.readdirSync(dir);

  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      count += countImagesInDir(fullPath);
    } else if (imageExtensions.some(ext => item.endsWith(ext))) {
      count++;
    }
  }

  return count;
}

physicalImages = countImagesInDir(path.join(publicDir, 'productos'));

console.log('📁 Imágenes físicas en /public/productos:', physicalImages);
console.log('❌ Imágenes sin usar:', physicalImages - allReferences.size);

const usagePercent = (allReferences.size / physicalImages * 100).toFixed(1);
console.log(`📈 Porcentaje de uso: ${usagePercent}%`);

// Desglose por tipo
const singleCount = (productsContent.match(/image:\s*["']/g) || []).length;
const arrayCount = (productsContent.match(/images:\s*\[/g) || []).length;

console.log('\n📋 Desglose de estructura:');
console.log(`   Colores con single image: ${singleCount}`);
console.log(`   Colores con images array: ${arrayCount}`);
console.log(`   Total colores: ${singleCount + arrayCount}`);

// Calcular promedio de imágenes por color con array
const imagesInArrays = [];
for (const match of productsContent.matchAll(/images:\s*\[([\s\S]*?)\]/g)) {
  const arrayContent = match[1];
  const count = (arrayContent.match(/["'][^"']+\.webp["']/g) || []).length;
  imagesInArrays.push(count);
}

if (imagesInArrays.length > 0) {
  const avgImages = (imagesInArrays.reduce((a, b) => a + b, 0) / imagesInArrays.length).toFixed(1);
  const maxImages = Math.max(...imagesInArrays);
  const minImages = Math.min(...imagesInArrays);

  console.log('\n📸 Estadísticas de galleries:');
  console.log(`   Promedio de imágenes por gallery: ${avgImages}`);
  console.log(`   Mínimo: ${minImages} imágenes`);
  console.log(`   Máximo: ${maxImages} imágenes`);
}

console.log('\n');
