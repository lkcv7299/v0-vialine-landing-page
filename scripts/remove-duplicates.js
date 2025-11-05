/**
 * Elimina los 5 tops duplicados que se agregaron por error
 */
const fs = require('fs');
const path = require('path');

const PRODUCTS_TS = path.join(__dirname, '..', 'data', 'products.ts');
const BACKUP_DIR = path.join(__dirname, '..', 'data', 'backups');

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

console.log('🗑️  Eliminando tops duplicados...\n');

createBackup();

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

console.log(`📊 Total productos antes: ${products.length}`);

// Slugs de los duplicados a eliminar
const duplicateSlugs = ['top-soporte', 'top-urban', 'top-zafiro', 'top-arena', 'top-perla'];

// Contar ocurrencias de cada slug
const slugCounts = {};
duplicateSlugs.forEach(slug => {
  slugCounts[slug] = products.filter(p => p.includes(`slug: "${slug}"`)).length;
});

console.log('\n🔍 Ocurrencias encontradas:');
Object.entries(slugCounts).forEach(([slug, count]) => {
  console.log(`   ${slug}: ${count}x`);
});

// Filtrar productos: mantener solo la PRIMERA ocurrencia de cada duplicado
const seenSlugs = new Set();
const filteredProducts = products.filter(productCode => {
  // Extraer slug del producto
  const slugMatch = productCode.match(/slug:\s*["']([^"']+)["']/);
  if (!slugMatch) return true;

  const slug = slugMatch[1];

  // Si es uno de los duplicados
  if (duplicateSlugs.includes(slug)) {
    if (seenSlugs.has(slug)) {
      console.log(`🗑️  Eliminando duplicado: ${slug}`);
      return false; // Eliminar segunda ocurrencia
    } else {
      seenSlugs.add(slug);
      console.log(`✅ Manteniendo original: ${slug}`);
      return true; // Mantener primera ocurrencia
    }
  }

  return true; // Mantener todos los demás
});

console.log(`\n📊 Total productos después: ${filteredProducts.length}`);
console.log(`📊 Productos eliminados: ${products.length - filteredProducts.length}`);

// Reconstruir archivo
const headerEnd = content.indexOf('export const products: Product[] = [') + 37;
const footerStart = content.indexOf(']\n\nexport const findProduct');

const header = content.substring(0, headerEnd);
const footer = content.substring(footerStart);

const newContent = header + '\n  ' + filteredProducts.join(',\n\n  ') + '\n' + footer;

// Escribir archivo
fs.writeFileSync(PRODUCTS_TS, newContent, 'utf8');

console.log('\n✅ Archivo actualizado: data/products.ts');
console.log('🎉 Duplicados eliminados con éxito');
