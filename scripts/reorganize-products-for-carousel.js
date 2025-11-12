/**
 * Reorganiza products.ts para que los productos CON FOTO aparezcan primero en el carrusel
 * Mueve productos sin foto (placeholder) al final de su género
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
  const backupPath = path.join(BACKUP_DIR, `products-carousel-reorg-${timestamp}.ts`);
  fs.copyFileSync(PRODUCTS_TS, backupPath);
  console.log(`✅ Backup creado: ${path.basename(backupPath)}\n`);
  return backupPath;
}

console.log('🔄 Reorganizando products.ts para carrusel...\n');

// Crear backup
createBackup();

// Leer archivo
let content = fs.readFileSync(PRODUCTS_TS, 'utf8');

// Extraer la sección de products
const match = content.match(/(export const products: Product\[\] = \[)([\s\S]*?)(\]\s*export const findProduct)/);
if (!match) {
  console.error('❌ No se pudo parsear products.ts');
  process.exit(1);
}

const before = match[1];
const productsBlock = match[2];
const after = match[3];

// Separar productos individuales
// Usar un delimitador más robusto - buscar el patrón "  },\n\n  {" que separa productos
const productStrings = [];
let currentProduct = '';
let braceCount = 0;
let inProduct = false;

const lines = productsBlock.split('\n');
for (let i = 0; i < lines.length; i++) {
  const line = lines[i];

  // Contar llaves
  for (const char of line) {
    if (char === '{') braceCount++;
    if (char === '}') braceCount--;
  }

  currentProduct += line + '\n';

  // Si llegamos a braceCount 0 y hay contenido, es un producto completo
  if (braceCount === 0 && currentProduct.trim() && currentProduct.includes('slug:')) {
    productStrings.push(currentProduct.trim());
    currentProduct = '';
    inProduct = false;
  }
}

console.log(`📊 Productos encontrados: ${productStrings.length}\n`);

// Parsear cada producto y clasificar
const products = productStrings.map(str => {
  const slugMatch = str.match(/slug:\s*"([^"]+)"/);
  const imageMatch = str.match(/image:\s*"([^"]+)"/);
  const audienceMatch = str.match(/audience:\s*"([^"]+)"/);

  const hasPhoto = imageMatch && !imageMatch[1].includes('placeholder.svg');

  return {
    raw: str,
    slug: slugMatch ? slugMatch[1] : 'unknown',
    image: imageMatch ? imageMatch[1] : '/placeholder.svg',
    audience: audienceMatch ? audienceMatch[1] : 'unknown',
    hasPhoto
  };
});

// Separar por género y reorganizar
const mujer = products.filter(p => p.audience === 'mujer');
const nina = products.filter(p => p.audience === 'nina');

console.log(`👩 MUJER: ${mujer.length} productos`);
const mujerWithPhoto = mujer.filter(p => p.hasPhoto);
const mujerWithoutPhoto = mujer.filter(p => !p.hasPhoto);
console.log(`  - CON FOTO: ${mujerWithPhoto.length}`);
console.log(`  - SIN FOTO: ${mujerWithoutPhoto.length}`);

console.log(`\n👧 NIÑA: ${nina.length} productos`);
const ninaWithPhoto = nina.filter(p => p.hasPhoto);
const ninaWithoutPhoto = nina.filter(p => !p.hasPhoto);
console.log(`  - CON FOTO: ${ninaWithPhoto.length}`);
console.log(`  - SIN FOTO: ${ninaWithoutPhoto.length}`);

// Reorganizar: con foto primero, sin foto después
const reorganized = [
  ...mujerWithPhoto,
  ...mujerWithoutPhoto,
  ...ninaWithPhoto,
  ...ninaWithoutPhoto
];

console.log('\n🔄 Reorganizando...\n');

// Mostrar primeros 12 de cada género después de reorganizar
const newMujer = [...mujerWithPhoto, ...mujerWithoutPhoto];
const newNina = [...ninaWithPhoto, ...ninaWithoutPhoto];

console.log('📸 CARRUSEL MUJER (primeros 12):');
newMujer.slice(0, 12).forEach((p, i) => {
  const status = p.hasPhoto ? '✅' : '❌';
  console.log(`  ${(i + 1).toString().padStart(2)}. ${status} ${p.slug}`);
});

console.log('\n📸 CARRUSEL NIÑA (primeros 12):');
newNina.slice(0, 12).forEach((p, i) => {
  const status = p.hasPhoto ? '✅' : '❌';
  console.log(`  ${(i + 1).toString().padStart(2)}. ${status} ${p.slug}`);
});

// Reconstruir el archivo
const newProductsBlock = reorganized.map(p => p.raw).join(',\n\n  ');
const newContent = before + '\n  ' + newProductsBlock + '\n\n' + after;

// Escribir archivo
fs.writeFileSync(PRODUCTS_TS, newContent, 'utf8');

console.log('\n✅ products.ts reorganizado correctamente');
console.log('📊 Ahora el carrusel mostrará solo productos con foto');
