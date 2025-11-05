/**
 * Actualiza SOLO precios, tallas, descripciones y códigos del catálogo
 * MANTIENE todas las imágenes, galerías y configuraciones existentes
 */
const fs = require('fs');
const path = require('path');

const CATALOG_JSON = path.join(__dirname, '..', 'data', 'catalogo-productos-final.json');
const PRODUCTS_TS = path.join(__dirname, '..', 'data', 'products.ts');
const BACKUP_DIR = path.join(__dirname, '..', 'data', 'backups');

// Mapeo manual catálogo → sistema
const CATALOG_TO_SYSTEM_MAP = {
  "Body Suplex Manga Corta": "body-manga-corta-suplex",
  "Enterizo Tiras Suplex": "enterizo-tiras",
  "Enterizo Manga Cero Suplex": "enterizo-manga-cero",
  "Slim Suplex Perchado": "legging-slim-suplex-perchado",
  "Slim Legging Suplex Liso": "legging-slim",
  "Legging Functional": "legging-functional",
  "Realce Pescador": "pescador-realce",
  "Slim Short": "short-slim",
  "Astrid": "top-astrid",
  "Short Lux": "short-lux",
  "Ciclista Active": "short-ciclista-active",
  "Torero Energy": "torero-energy",
  "Pescador Dynamic": "pescador-dynamic",
  "Legging Harmony": "legging-harmony",
  "Top Afrodita": "top-afrodita",
  "Top Venus": "top-venus",
  "Top Minerva": "top-minerva",
  "Top Paradise": "top-paradise",
  "Top Jungle": "top-jungle",
  "Top Athena": "top-athena",
  "Top Jolie": "top-jolie",
  "Top Brigid": "top-brigid",
  "Top COD.710": "top-soporte",
  "Top COD.902": "top-urban",
  "Top COD.402": "top-zafiro",
  "Top COD.391": "top-arena",
  "Top COD.901": "top-perla",
  "Top Straple": "straple-chanel",
  "Top Deportivo": "top-deportivo",
  "Top Tiras Finas": "top-tira-fijas",
  "Short Brasil": "short-brasil",
  "Maxi Short": "maxi-short",
  "Short Clásico": "short-clasico",
  "Mini Short": "mini-short",
  "Camiseta Manga Larga": "camiseta-manga-larga",
  "Camiseta Manga Corta": "camiseta-manga-corta",
  "Camiseta Cuello Alto": "camiseta-cuello-alto",
  "Camiseta Deportiva": "camiseta-deportiva",
  "Camiseta Tiras Finas": "camiseta-tiras-fijas",
  "Camiseta Tropical": "camiseta-tropical",
  "Body Manga Corta": "body-manga-corta",
  "Body Manga Larga": "body-manga-larga",
  "Legging Realce Fresh Terry": "legging-realce-fresh-terry",
  "Legging Clásica Algodón Gamusa (NICE)": "legging-clasica-gamuza",
  "Legging Clásica Algodón Licra (NICE)": "legging-clasica"
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
console.log('📖 Leyendo catálogo...');
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

// Actualizar productos
console.log('🔨 Actualizando productos...\n');

let updated = 0;
let notInCatalog = [];

const updatedProducts = products.map(productCode => {
  // Extraer slug
  const slugMatch = productCode.match(/slug:\s*["']([^"']+)["']/);
  if (!slugMatch) return productCode;

  const slug = slugMatch[1];
  const catalogProduct = catalogBySlug[slug];

  if (!catalogProduct) {
    // Producto no está en catálogo
    const audienceMatch = productCode.match(/audience:\s*["']([^"']+)["']/);
    const audience = audienceMatch ? audienceMatch[1] : 'unknown';
    if (audience !== 'nina') {
      notInCatalog.push(slug);
    }
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

console.log(`\n📊 Productos actualizados: ${updated}`);
console.log(`📊 Productos NO en catálogo (${notInCatalog.length}):`);
notInCatalog.forEach(slug => console.log(`   - ${slug}`));

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
console.log('\n🎉 COMPLETADO - Precios, tallas, códigos y descripciones actualizados');
