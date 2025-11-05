/**
 * Actualiza products.ts con las galerías reales de las fotos procesadas
 */
const fs = require('fs');
const path = require('path');

const PUBLIC_DIR = path.join(__dirname, '..', 'public', 'productos', 'mujer');
const PRODUCTS_TS = path.join(__dirname, '..', 'data', 'products.ts');
const BACKUP_DIR = path.join(__dirname, '..', 'data', 'backups');

// Productos a actualizar
const PRODUCTS_TO_UPDATE = [
  { slug: 'short-ciclista-active', category: 'bikers' },
  { slug: 'short-clasico', category: 'shorts' },
  { slug: 'short-lux', category: 'shorts' },
  { slug: 'top-arena', category: 'tops' },
  { slug: 'top-jungle', category: 'tops' },
  { slug: 'top-luna', category: 'tops' },
  { slug: 'top-perla', category: 'tops' },
  { slug: 'top-soporte', category: 'tops' },
  { slug: 'top-venus', category: 'tops' },
  { slug: 'top-zafiro', category: 'tops' }
];

// Mapeo de colores slug → nombre display
const COLOR_DISPLAY_NAMES = {
  'aqua': 'Aqua',
  'azulino': 'Azulino',
  'blanco': 'Blanco',
  'charcoal': 'Charcoal',
  'melange': 'Melange',
  'melon': 'Melon',
  'negro': 'Negro',
  'rojo': 'Rojo',
  'beige': 'Beige'
};

// Mapeo de colores → hex
const COLOR_HEX = {
  'aqua': '#00CED1',
  'azulino': '#87CEEB',
  'blanco': '#FFFFFF',
  'charcoal': '#36454F',
  'melange': '#D3D3D3',
  'melon': '#FEBAAD',
  'negro': '#000000',
  'rojo': '#FF0000',
  'beige': '#F5F5DC'
};

// Crear backup
function createBackup() {
  if (!fs.existsSync(BACKUP_DIR)) {
    fs.mkdirSync(BACKUP_DIR, { recursive: true });
  }
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
  const backupPath = path.join(BACKUP_DIR, `products-${timestamp}.ts`);
  fs.copyFileSync(PRODUCTS_TS, backupPath);
  console.log(`✅ Backup creado: ${backupPath}\n`);
  return backupPath;
}

// Analizar imágenes disponibles para un producto
function getProductImages(slug, category) {
  const categoryDir = path.join(PUBLIC_DIR, category);

  if (!fs.existsSync(categoryDir)) {
    console.log(`⚠️  Directorio no existe: ${categoryDir}`);
    return {};
  }

  const files = fs.readdirSync(categoryDir);
  const productFiles = files.filter(f => f.startsWith(`${slug}-`) && f.endsWith('.webp'));

  // Agrupar por color
  const imagesByColor = {};

  productFiles.forEach(file => {
    // Extraer color del nombre: slug-color#.webp
    const match = file.match(new RegExp(`${slug}-([a-z]+)(\\d+)\\.webp`));
    if (match) {
      const [, color, number] = match;
      if (!imagesByColor[color]) {
        imagesByColor[color] = [];
      }
      imagesByColor[color].push({
        path: `/productos/mujer/${category}/${file}`,
        number: parseInt(number)
      });
    }
  });

  // Ordenar imágenes por número
  Object.keys(imagesByColor).forEach(color => {
    imagesByColor[color].sort((a, b) => a.number - b.number);
  });

  return imagesByColor;
}

// Construir estructura de colores para products.ts
function buildColorsStructure(imagesByColor) {
  const colors = [];

  Object.keys(imagesByColor).sort().forEach(colorSlug => {
    const images = imagesByColor[colorSlug];
    const colorName = COLOR_DISPLAY_NAMES[colorSlug] || colorSlug;
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

// Leer products.ts
console.log('📖 Leyendo products.ts...\n');
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
console.log('🔨 Actualizando galerías...\n');

let updated = 0;

const updatedProducts = products.map(productCode => {
  // Extraer slug
  const slugMatch = productCode.match(/slug:\s*["']([^"']+)["']/);
  if (!slugMatch) return productCode;

  const slug = slugMatch[1];
  const productConfig = PRODUCTS_TO_UPDATE.find(p => p.slug === slug);

  if (!productConfig) {
    // No es uno de los productos a actualizar
    return productCode;
  }

  const { category } = productConfig;
  const imagesByColor = getProductImages(slug, category);

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

  // Reemplazar estructura de colors completa
  const colorsJson = JSON.stringify(colorsStructure, null, 4)
    .split('\n')
    .map((line, i) => i === 0 ? line : '    ' + line)
    .join('\n');

  updatedCode = updatedCode.replace(
    /colors:\s*\[[\s\S]*?\n\s*\]/,
    `colors: ${colorsJson}`
  );

  const totalImages = Object.values(imagesByColor).reduce((sum, imgs) => sum + imgs.length, 0);
  console.log(`✅ ${slug.padEnd(25)} → ${Object.keys(imagesByColor).length} colores, ${totalImages} imágenes`);

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

// Crear backup
createBackup();

// Escribir archivo
fs.writeFileSync(PRODUCTS_TS, newContent, 'utf8');
console.log('\n✅ Archivo actualizado: data/products.ts');
console.log('🎉 Galerías actualizadas con éxito');
