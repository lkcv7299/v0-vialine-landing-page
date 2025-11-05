/**
 * Reconstruye products.ts desde el catálogo PRESERVANDO las imágenes reales
 */
const fs = require('fs');
const path = require('path');

const CATALOG_JSON = path.join(__dirname, '..', 'data', 'catalogo-productos-final.json');
const ORIGINAL_PRODUCTS = path.join(__dirname, '..', 'data', 'products-original-with-images.ts');
const OUTPUT_TS = path.join(__dirname, '..', 'data', 'products.ts');

// Importar funciones del script original
const { catalogToProduct } = require('./rebuild-products-from-catalog.js');

// Extraer productos del archivo original
function extractOriginalProducts(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');

  const match = content.match(/export const products: Product\[\] = \[([\s\S]*?)\n\]\s*\n/);
  if (!match) {
    return {};
  }

  const productsArray = match[1];
  const productsMap = {};

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
        // Extraer slug
        const slugMatch = currentProduct.match(/slug:\s*["']([^"']+)["']/);
        if (slugMatch) {
          const slug = slugMatch[1];

          // Extraer image
          const imageMatch = currentProduct.match(/image:\s*["']([^"']+)["']/);
          const mainImage = imageMatch ? imageMatch[1] : null;

          // Extraer colors array completo
          const colorsMatch = currentProduct.match(/colors:\s*(\[[^\]]*?\]|\[[\s\S]*?\n\s*\])/);
          const colors = colorsMatch ? colorsMatch[1] : null;

          productsMap[slug] = { mainImage, colors, fullCode: currentProduct };
        }

        inProduct = false;
      }
    }
  }

  return productsMap;
}

console.log('🔍 Leyendo productos originales...');
const originalMap = extractOriginalProducts(ORIGINAL_PRODUCTS);
console.log(`✅ ${Object.keys(originalMap).length} productos originales encontrados`);

console.log('\n📖 Leyendo catálogo...');
const catalogData = JSON.parse(fs.readFileSync(CATALOG_JSON, 'utf8'));
console.log(`✅ ${catalogData.totalProducts} productos en catálogo`);

console.log('\n🔨 Generando productos con imágenes preservadas...');

// Mapear slugs del catálogo a productos originales
function createSlug(nombre) {
  return nombre
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .trim();
}

let restored = 0;
let newProducts = 0;

const catalogProducts = catalogData.products.map(cp => {
  const product = catalogToProduct(cp);
  const slug = product.slug;

  // Si existe en los productos originales, usar sus imágenes
  if (originalMap[slug]) {
    const original = originalMap[slug];

    if (original.mainImage && !original.mainImage.includes('placeholder')) {
      product.image = original.mainImage;
    }

    if (original.colors) {
      // Parsear colors del original
      try {
        const evalStr = `(${original.colors})`;
        const originalColors = eval(evalStr);

        // Verificar que tenga imágenes reales
        if (Array.isArray(originalColors) && originalColors.length > 0) {
          const hasRealImages = originalColors.some(c =>
            (c.images && c.images.length > 0 && !c.images[0].includes('placeholder')) ||
            (c.image && !c.image.includes('placeholder'))
          );

          if (hasRealImages) {
            product.colors = originalColors;
          }
        }
      } catch (e) {
        console.warn(`⚠️  No se pudo parsear colors de: ${slug}`);
      }
    }

    restored++;
    console.log(`✅ ${slug} - imágenes restauradas`);
  } else {
    newProducts++;
    console.log(`🆕 ${slug} - producto nuevo`);
  }

  return product;
});

console.log(`\n📊 Productos con imágenes restauradas: ${restored}`);
console.log(`📊 Productos nuevos: ${newProducts}`);

// Extraer productos de niña del original
console.log('\n📖 Extrayendo productos de niña...');
const ninaProducts = [];
Object.keys(originalMap).forEach(slug => {
  const prod = originalMap[slug];
  if (prod.fullCode && prod.fullCode.includes('audience: "nina"')) {
    ninaProducts.push(prod.fullCode);
  }
});
console.log(`✅ ${ninaProducts.length} productos de niña encontrados`);

// Generar TypeScript
console.log('\n🔨 Generando archivo TypeScript...');

const lines = [];

// Header
lines.push('export type Product = {');
lines.push('  slug: string');
lines.push('  title: string');
lines.push('  price: number');
lines.push('  image: string // path under /public/productos/<category>/<slug>.jpg');
lines.push('  category: "leggings" | "bikers" | "shorts" | "tops" | "bodysuits" | "camisetas" | "enterizos" | "pescador" | "torero"');
lines.push('  fabric: "suplex" | "algodon"');
lines.push('  colors: string[] | { name: string; slug: string; hex: string; image?: string; images?: string[] }[] // Support single image or gallery');
lines.push('  sizes: string[]');
lines.push('  audience: "mujer" | "nina"');
lines.push('  // Optional detailed attributes for products with variants');
lines.push('  tags?: string[]');
lines.push('  attributes?: {');
lines.push('    material: string');
lines.push('    detalles: string[]');
lines.push('    beneficios: string[]');
lines.push('  }');
lines.push('  inventory?: number');
lines.push('  badge?: "nuevo" | "oferta" // Badge visual para el producto');
lines.push('  originalPrice?: number // Precio original (para mostrar tachado en ofertas)');
lines.push('}');
lines.push('');
lines.push('export const products: Product[] = [');

// Agrupar por categoría
const byCategory = {};
catalogProducts.forEach(p => {
  if (!byCategory[p.category]) {
    byCategory[p.category] = [];
  }
  byCategory[p.category].push(p);
});

const categoryOrder = ['camisetas', 'tops', 'bodysuits', 'enterizos', 'leggings', 'pescador', 'torero', 'bikers', 'shorts'];

let allProducts = [];

categoryOrder.forEach(cat => {
  if (byCategory[cat] && byCategory[cat].length > 0) {
    allProducts = allProducts.concat(byCategory[cat]);
  }
});

// Agregar productos del catálogo
allProducts.forEach((product, idx) => {
  lines.push('  {');
  lines.push(`    slug: "${product.slug}",`);
  lines.push(`    title: "${product.title}",`);
  lines.push(`    price: ${product.price},`);
  lines.push(`    image: "${product.image}",`);
  lines.push(`    category: "${product.category}",`);
  lines.push(`    fabric: "${product.fabric}",`);

  // Colors
  lines.push('    colors: ' + JSON.stringify(product.colors, null, 6).replace(/^/gm, '    ').trim() + ',');

  // Sizes
  lines.push(`    sizes: ${JSON.stringify(product.sizes)},`);
  lines.push(`    audience: "${product.audience}",`);

  // Tags
  if (product.tags && product.tags.length > 0) {
    lines.push('    tags: ' + JSON.stringify(product.tags, null, 6).replace(/^/gm, '    ').trim() + ',');
  }

  // Attributes
  if (product.attributes) {
    lines.push('    attributes: {');
    lines.push(`      material: "${product.attributes.material}",`);
    lines.push('      detalles: ' + JSON.stringify(product.attributes.detalles, null, 8).replace(/^/gm, '      ').trim() + ',');
    lines.push('      beneficios: ' + JSON.stringify(product.attributes.beneficios, null, 8).replace(/^/gm, '      ').trim());
    lines.push('    }');
  }

  lines.push('  }' + (idx < allProducts.length - 1 || ninaProducts.length > 0 ? ',' : ''));
  lines.push('');
});

// Productos de niña
if (ninaProducts.length > 0) {
  lines.push('  // PRODUCTOS DE NIÑA');
  ninaProducts.forEach((code, idx) => {
    const comma = idx < ninaProducts.length - 1 ? ',' : '';
    lines.push('  ' + code + comma);
    if (idx < ninaProducts.length - 1) {
      lines.push('');
    }
  });
}

lines.push(']');
lines.push('');
lines.push('export const allProducts = products');
lines.push('');
lines.push('// Helper functions');
lines.push('export function byAudience(audience: "mujer" | "nina") {');
lines.push('  return products.filter((p) => p.audience === audience)');
lines.push('}');
lines.push('');
lines.push('export function byFabric(fabric: "suplex" | "algodon") {');
lines.push('  return products.filter((p) => p.fabric === fabric)');
lines.push('}');
lines.push('');
lines.push('export function findProduct(slug: string) {');
lines.push('  return products.find((p) => p.slug === slug)');
lines.push('}');
lines.push('');

const finalContent = lines.join('\n');

fs.writeFileSync(OUTPUT_TS, finalContent, 'utf8');
console.log(`\n✅ Archivo generado: ${OUTPUT_TS}`);
console.log('\n✅ COMPLETADO - Las imágenes reales han sido preservadas');
