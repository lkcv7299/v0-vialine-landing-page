/**
 * Restaura las imágenes reales de los productos desde el backup
 */
const fs = require('fs');
const path = require('path');

const ORIGINAL_FILE = path.join(__dirname, '..', 'data', 'products-original-with-images.ts');
const CURRENT_FILE = path.join(__dirname, '..', 'data', 'products.ts');
const OUTPUT_FILE = path.join(__dirname, '..', 'data', 'products-restored.ts');

// Extraer productos del archivo original
function extractProductsFromFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');

  const match = content.match(/export const products: Product\[\] = \[([\s\S]*?)\n\]\s*\n/);
  if (!match) {
    console.error('No se pudo encontrar el array de productos en:', filePath);
    return [];
  }

  const productsArray = match[1];
  const products = [];

  let depth = 0;
  let currentProduct = '';
  let inProduct = false;

  for (let i = 0; i < productsArray.length; i++) {
    const char = productsArray[i];

    if (char === '{') {
      if (depth === 0) {
        inProduct = true;
        currentProduct = '';
      }
      depth++;
    }

    if (inProduct) {
      currentProduct += char;
    }

    if (char === '}') {
      depth--;
      if (depth === 0 && inProduct) {
        products.push(currentProduct);
        inProduct = false;
      }
    }
  }

  return products;
}

// Extraer slug e imágenes de un producto
function extractProductData(productCode) {
  const slugMatch = productCode.match(/slug:\s*["']([^"']+)["']/);
  const slug = slugMatch ? slugMatch[1] : null;

  const imageMatch = productCode.match(/image:\s*["']([^"']+)["']/);
  const mainImage = imageMatch ? imageMatch[1] : null;

  // Extraer array de colores completo
  const colorsMatch = productCode.match(/colors:\s*(\[[\s\S]*?\n\s*\])/);
  let colors = null;
  if (colorsMatch) {
    colors = colorsMatch[1];
  }

  return { slug, mainImage, colors };
}

console.log('🔍 Extrayendo imágenes del archivo original...');
const originalProducts = extractProductsFromFile(ORIGINAL_FILE);
console.log(`✅ ${originalProducts.length} productos encontrados en original`);

// Crear mapa de slug -> datos de imagen
const imageMap = {};
originalProducts.forEach(productCode => {
  const { slug, mainImage, colors } = extractProductData(productCode);
  if (slug) {
    imageMap[slug] = { mainImage, colors };
  }
});

console.log(`✅ ${Object.keys(imageMap).length} productos mapeados con imágenes`);

console.log('\n🔍 Procesando archivo actual...');
const currentProducts = extractProductsFromFile(CURRENT_FILE);
console.log(`✅ ${currentProducts.length} productos en archivo actual`);

// Reemplazar imágenes en productos actuales
let restoredCount = 0;
let newCount = 0;

const restoredProducts = currentProducts.map(productCode => {
  const { slug } = extractProductData(productCode);

  if (slug && imageMap[slug]) {
    // Producto existente - restaurar imágenes
    const originalData = imageMap[slug];

    // Reemplazar image
    if (originalData.mainImage) {
      productCode = productCode.replace(
        /image:\s*["'][^"']+["']/,
        `image: "${originalData.mainImage}"`
      );
    }

    // Reemplazar colors completo
    if (originalData.colors) {
      productCode = productCode.replace(
        /colors:\s*\[[\s\S]*?\n\s*\]/,
        `colors: ${originalData.colors}`
      );
    }

    restoredCount++;
    console.log(`✅ Restaurado: ${slug}`);
  } else {
    // Producto nuevo - mantener placeholders
    newCount++;
    if (slug) {
      console.log(`🆕 Nuevo producto: ${slug}`);
    }
  }

  return productCode;
});

console.log(`\n📊 Productos con imágenes restauradas: ${restoredCount}`);
console.log(`📊 Productos nuevos (placeholders): ${newCount}`);

// Leer archivo actual para obtener header y footer
const currentContent = fs.readFileSync(CURRENT_FILE, 'utf8');
const headerMatch = currentContent.match(/([\s\S]*?export const products: Product\[\] = \[)/);
const footerMatch = currentContent.match(/(\]\s*\nexport const allProducts[\s\S]*$)/);

if (!headerMatch || !footerMatch) {
  console.error('❌ No se pudo extraer header/footer del archivo actual');
  process.exit(1);
}

// Construir archivo completo
const header = headerMatch[1];
const footer = footerMatch[1];
const productsString = restoredProducts.join(',\n\n  ');

const finalContent = header + '\n  ' + productsString + '\n' + footer;

// Escribir archivo
fs.writeFileSync(OUTPUT_FILE, finalContent, 'utf8');
console.log(`\n✅ Archivo restaurado guardado en: ${OUTPUT_FILE}`);
console.log('\nPara aplicar los cambios:');
console.log(`  copy "${OUTPUT_FILE}" "${CURRENT_FILE}"`);
