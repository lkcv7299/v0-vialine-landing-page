/**
 * Actualiza SOLO precios, tallas, descripciones y códigos de productos de niña
 * MANTIENE todas las imágenes, galerías y configuraciones existentes
 */
const fs = require('fs');
const path = require('path');

const CATALOG_JSON = path.join(__dirname, '..', 'data', 'catalogo-nina-final.json');
const PRODUCTS_TS = path.join(__dirname, '..', 'data', 'products.ts');
const BACKUP_DIR = path.join(__dirname, '..', 'data', 'backups');

// Mapeo manual catálogo niña → sistema
const CATALOG_TO_SYSTEM_MAP = {
  "Cafarena": "cafarena-nina",
  "Panty": "panty-nina",
  "Enterizo Manga Corta": "enterizo-manga-corta-nina",
  "Enterizo Manga Larga": "enterizo-manga-larga-nina",
  "Legging": "legging-nina",
  "Maxi Short": "maxi-short-nina",
  "Short Juvenil": "short-juvenil-nina",
  "Top Orquídea": "top-orquidea",
  "Top Tulipán": "top-tulipan",
  "Top Margarita": "top-margarita",
  "Top Jazmín": "top-jazmin",
  "Top Vani": "top-vani"
};

// Crear backup
function createBackup() {
  if (!fs.existsSync(BACKUP_DIR)) {
    fs.mkdirSync(BACKUP_DIR, { recursive: true });
  }
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
  const backupPath = path.join(BACKUP_DIR, `products-${timestamp}.ts`);
  fs.copyFileSync(PRODUCTS_TS, backupPath);
  console.log(`✅ Backup creado: ${backupPath}`);
  return backupPath;
}

// Leer catálogo
console.log('📖 Leyendo catálogo de niña...');
const catalogData = JSON.parse(fs.readFileSync(CATALOG_JSON, 'utf8'));
console.log(`✅ ${catalogData.totalProducts} productos en catálogo\n`);

// Crear mapa de slug → datos del catálogo
const catalogBySlug = {};
const notMapped = [];

catalogData.products.forEach(cp => {
  const systemSlug = CATALOG_TO_SYSTEM_MAP[cp.nombre];
  if (systemSlug) {
    catalogBySlug[systemSlug] = cp;
  } else {
    notMapped.push(cp.nombre);
  }
});

console.log(`📊 Productos mapeados: ${Object.keys(catalogBySlug).length}`);
if (notMapped.length > 0) {
  console.log(`⚠️  Productos NO mapeados (${notMapped.length}):`);
  notMapped.forEach(n => console.log(`   - ${n}`));
  console.log();
}

// Leer products.ts
console.log('📖 Leyendo products.ts actual...');
const content = fs.readFileSync(PRODUCTS_TS, 'utf8');

// Extraer productos
const productsMatch = content.match(/export const products: Product\[\] = \[([\s\S]*?)\n\]\s*\n/);
if (!productsMatch) {
  console.error('❌ No se pudo encontrar el array de productos');
  process.exit(1);
}

const productsArray = productsMatch[1];
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

console.log(`✅ ${products.length} productos en sistema\n`);

// Actualizar productos de niña
console.log('🔨 Actualizando productos de niña...\n');

let updated = 0;

const updatedProducts = products.map(productCode => {
  // Extraer slug
  const slugMatch = productCode.match(/slug:\s*["']([^"']+)["']/);
  if (!slugMatch) return productCode;

  const slug = slugMatch[1];
  const catalogProduct = catalogBySlug[slug];

  if (!catalogProduct) {
    // No es un producto de niña o no está en catálogo
    return productCode;
  }

  // Actualizar precio
  let updatedCode = productCode.replace(
    /price:\s*\d+\.?\d*/,
    `price: ${catalogProduct.precio}`
  );

  // Actualizar tallas
  const tallasStr = JSON.stringify(catalogProduct.tallas);
  updatedCode = updatedCode.replace(
    /sizes:\s*\[[^\]]*\]/,
    `sizes: ${tallasStr}`
  );

  // Agregar/actualizar tags con código
  const codigoTag = `COD.${catalogProduct.codigo}`;

  if (updatedCode.includes('tags:')) {
    // Ya tiene tags, agregar código si no existe
    const tagsMatch = updatedCode.match(/tags:\s*\[([\s\S]*?)\]/);
    if (tagsMatch) {
      const existingTags = tagsMatch[1];
      if (!existingTags.includes(codigoTag)) {
        // Agregar código al inicio
        updatedCode = updatedCode.replace(
          /tags:\s*\[/,
          `tags: [\n      "${codigoTag}",`
        );
      }
    }
  } else {
    // No tiene tags, agregarlos antes de inventory o attributes
    const tagsBlock = `    tags: ["${codigoTag}", "${catalogProduct.coleccion}", "${catalogProduct.material}"],\n`;

    if (updatedCode.includes('inventory:')) {
      updatedCode = updatedCode.replace(/(\s+)inventory:/, `${tagsBlock}$1inventory:`);
    } else if (updatedCode.includes('attributes:')) {
      updatedCode = updatedCode.replace(/(\s+)attributes:/, `${tagsBlock}$1attributes:`);
    } else {
      // Agregar antes del cierre del objeto
      updatedCode = updatedCode.replace(/(\s+)\}$/, `${tagsBlock}$1}`);
    }
  }

  // Actualizar o agregar attributes
  const newAttributes = {
    material: catalogProduct.material,
    detalles: catalogProduct.caracteristicas,
    beneficios: []
  };

  if (updatedCode.includes('attributes:')) {
    // Reemplazar attributes existente
    updatedCode = updatedCode.replace(
      /attributes:\s*\{[\s\S]*?\n\s*\}/,
      `attributes: ${JSON.stringify(newAttributes, null, 4).replace(/\n/g, '\n    ')}`
    );
  } else {
    // Agregar attributes nuevo antes del cierre
    const attributesStr = JSON.stringify(newAttributes, null, 6).replace(/\n/g, '\n    ');
    updatedCode = updatedCode.replace(/(\s+)\}$/, `,\n    attributes: ${attributesStr}$1}`);
  }

  updated++;
  console.log(`✅ ${slug.padEnd(35)} → $${catalogProduct.precio} | Tallas: ${tallasStr} | COD.${catalogProduct.codigo}`);

  return updatedCode;
});

console.log(`\n📊 Productos de niña actualizados: ${updated}`);

// Reconstruir archivo
const headerEnd = content.indexOf('export const products: Product[] = [') + 37;
const footerStart = content.indexOf(']\n\nexport const findProduct');

const header = content.substring(0, headerEnd);
const footer = content.substring(footerStart);

const newContent = header + '\n  ' + updatedProducts.join(',\n\n  ') + '\n' + footer;

// Crear backup
createBackup();

// Escribir archivo
fs.writeFileSync(PRODUCTS_TS, newContent, 'utf8');
console.log('\n✅ Archivo actualizado: data/products.ts');
console.log('\n🎉 COMPLETADO - Productos de niña actualizados con catálogo');
