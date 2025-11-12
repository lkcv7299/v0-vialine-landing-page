/**
 * Actualiza products.ts con las galerías de los 14 productos procesados
 */
const fs = require('fs');
const path = require('path');

const PUBLIC_DIR_MUJER = path.join(__dirname, '..', 'public', 'productos', 'mujer');
const PUBLIC_DIR_NINA = path.join(__dirname, '..', 'public', 'productos', 'nina');
const PRODUCTS_TS = path.join(__dirname, '..', 'data', 'products.ts');
const BACKUP_DIR = path.join(__dirname, '..', 'data', 'backups');

// 14 productos procesados
const PRODUCTS_TO_UPDATE = [
  // MUJER
  { slug: 'top-perla', category: 'tops', gender: 'mujer' },
  { slug: 'top-soporte', category: 'tops', gender: 'mujer' },
  { slug: 'top-venus', category: 'tops', gender: 'mujer' },
  { slug: 'top-zafiro', category: 'tops', gender: 'mujer' },

  // NIÑA
  { slug: 'cafarena-nina', category: 'cafarenas', gender: 'nina' },
  { slug: 'enterizo-manga-corta-nina', category: 'enterizos', gender: 'nina' },
  { slug: 'enterizo-manga-larga-nina', category: 'enterizos', gender: 'nina' },
  { slug: 'legging-nina', category: 'leggings', gender: 'nina' },
  { slug: 'maxi-short-nina', category: 'shorts', gender: 'nina' },
  { slug: 'panty-nina', category: 'pantys', gender: 'nina' },
  { slug: 'short-juvenil-nina', category: 'shorts', gender: 'nina' },
  { slug: 'top-jazmin', category: 'tops', gender: 'nina' },
  { slug: 'top-margarita', category: 'tops', gender: 'nina' },
  { slug: 'top-vani', category: 'tops', gender: 'nina' }
];

// Mapeo de colores → hex
const COLOR_HEX = {
  'amarillo': '#FFD700',
  'aqua': '#00CED1',
  'azulino': '#87CEEB',
  'azulmarino': '#1B3A6B',
  'beige': '#F5F5DC',
  'blanco': '#FFFFFF',
  'charcoal': '#36454F',
  'lila': '#C8A2C8',
  'melange': '#D3D3D3',
  'melon': '#FEBAAD',
  'negro': '#000000',
  'rojo': '#FF0000',
  'rosa': '#FFC0CB',
  'rosado': '#FFB6C1',
  'verde': '#00FF00',
  'violeta': '#8F00FF'
};

// Display names
function toDisplayName(slug) {
  const map = {
    'amarillo': 'Amarillo',
    'aqua': 'Aqua',
    'azulino': 'Azulino',
    'azulmarino': 'Azul Marino',
    'beige': 'Beige',
    'blanco': 'Blanco',
    'charcoal': 'Charcoal',
    'lila': 'Lila',
    'melange': 'Melange',
    'melon': 'Melon',
    'negro': 'Negro',
    'rojo': 'Rojo',
    'rosa': 'Rosa',
    'rosado': 'Rosado',
    'verde': 'Verde',
    'violeta': 'Violeta'
  };
  return map[slug] || slug.charAt(0).toUpperCase() + slug.slice(1);
}

// Crear backup
function createBackup() {
  if (!fs.existsSync(BACKUP_DIR)) {
    fs.mkdirSync(BACKUP_DIR, { recursive: true });
  }
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
  const backupPath = path.join(BACKUP_DIR, `products-nov12-${timestamp}.ts`);
  fs.copyFileSync(PRODUCTS_TS, backupPath);
  console.log(`✅ Backup creado: products-nov12-${timestamp}.ts\n`);
  return backupPath;
}

// Analizar imágenes disponibles
function getProductImages(slug, category, gender) {
  const publicDir = gender === 'mujer' ? PUBLIC_DIR_MUJER : PUBLIC_DIR_NINA;
  const categoryDir = path.join(publicDir, category);

  if (!fs.existsSync(categoryDir)) {
    console.log(`⚠️  Directorio no existe: ${categoryDir}`);
    return {};
  }

  const files = fs.readdirSync(categoryDir);
  const productFiles = files.filter(f => f.startsWith(`${slug}-`) && f.endsWith('.webp'));

  const imagesByColor = {};

  productFiles.forEach(file => {
    const match = file.match(new RegExp(`${slug}-([a-z]+)(\\d+)\\.webp`));
    if (match) {
      const [, color, number] = match;
      if (!imagesByColor[color]) {
        imagesByColor[color] = [];
      }
      imagesByColor[color].push({
        path: `/productos/${gender}/${category}/${file}`,
        number: parseInt(number)
      });
    }
  });

  Object.keys(imagesByColor).forEach(color => {
    imagesByColor[color].sort((a, b) => a.number - b.number);
  });

  return imagesByColor;
}

// Construir estructura de colores
function buildColorsStructure(imagesByColor) {
  const colors = [];

  Object.keys(imagesByColor).sort().forEach(colorSlug => {
    const images = imagesByColor[colorSlug];
    const colorName = toDisplayName(colorSlug);
    const hex = COLOR_HEX[colorSlug] || '#000000';

    colors.push({
      name: colorName,
      slug: colorSlug,
      hex: hex,
      image: images[0].path,
      images: images.map(img => img.path)
    });
  });

  return colors;
}

console.log('🚀 Actualizando products.ts con 14 productos...\n');

// Crear backup
createBackup();

// Leer products.ts
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

console.log(`📊 ${products.length} productos en sistema`);
console.log(`🔨 Actualizando galerías...\n`);

let updated = 0;

const updatedProducts = products.map(productCode => {
  const slugMatch = productCode.match(/slug:\s*["']([^"']+)["']/);
  if (!slugMatch) return productCode;

  const slug = slugMatch[1];
  const productConfig = PRODUCTS_TO_UPDATE.find(p => p.slug === slug);

  if (!productConfig) {
    return productCode;
  }

  const { category, gender } = productConfig;
  const imagesByColor = getProductImages(slug, category, gender);

  if (Object.keys(imagesByColor).length === 0) {
    console.log(`⚠️  ${slug}: No se encontraron imágenes`);
    return productCode;
  }

  const colorsStructure = buildColorsStructure(imagesByColor);
  const mainImage = colorsStructure[0].image;

  // Actualizar imagen principal
  let updatedCode = productCode.replace(
    /image:\s*["'][^"']*["']/,
    `image: "${mainImage}"`
  );

  // Reemplazar colors completa
  const colorsJson = JSON.stringify(colorsStructure, null, 4)
    .split('\n')
    .map((line, i) => i === 0 ? line : '    ' + line)
    .join('\n');

  updatedCode = updatedCode.replace(
    /colors:\s*\[[\s\S]*?\n\s*\]/,
    `colors: ${colorsJson}`
  );

  const totalImages = Object.values(imagesByColor).reduce((sum, imgs) => sum + imgs.length, 0);
  console.log(`✅ ${slug.padEnd(30)} ${Object.keys(imagesByColor).length} colores, ${totalImages} imágenes`);

  updated++;
  return updatedCode;
});

console.log(`\n📊 Productos actualizados: ${updated}/${PRODUCTS_TO_UPDATE.length}`);

// Reconstruir archivo
const headerEnd = content.indexOf('export const products: Product[] = [') + 37;
const footerStart = content.indexOf(']\n\nexport const findProduct');

const header = content.substring(0, headerEnd);
const footer = content.substring(footerStart);

const newContent = header + '\n  ' + updatedProducts.join(',\n\n  ') + '\n' + footer;

// Escribir archivo
fs.writeFileSync(PRODUCTS_TS, newContent, 'utf8');
console.log('\n✅ Archivo actualizado: data/products.ts');
console.log('🎉 ¡Galerías actualizadas con éxito!');
