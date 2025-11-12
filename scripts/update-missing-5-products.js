/**
 * Actualiza los 5 productos nina que quedaron sin galería
 */
const fs = require('fs');
const path = require('path');

const PRODUCTS_TS = path.join(__dirname, '..', 'data', 'products.ts');
const BACKUP_DIR = path.join(__dirname, '..', 'data', 'backups');

const COLOR_HEX = {
  'amarillo': '#FFD700',
  'aqua': '#00CED1',
  'azulino': '#87CEEB',
  'azulmarino': '#1B3A6B',
  'beige': '#F5F5DC',
  'blanco': '#FFFFFF',
  'charcoal': '#36454F',
  'lila': '#C8A2C8',
  'menta': '#98FF98',
  'morado': '#800080',
  'negro': '#000000',
  'rojo': '#FF0000',
  'rosado': '#FFB6C1',
  'turquesa': '#40E0D0',
  'verde': '#00FF00',
  'vinotinto': '#722F37'
};

const DISPLAY_NAMES = {
  'amarillo': 'Amarillo',
  'aqua': 'Aqua',
  'azulino': 'Azulino',
  'azulmarino': 'Azul Marino',
  'beige': 'Beige',
  'blanco': 'Blanco',
  'charcoal': 'Charcoal',
  'lila': 'Lila',
  'menta': 'Menta',
  'morado': 'Morado',
  'negro': 'Negro',
  'rojo': 'Rojo',
  'rosado': 'Rosado',
  'turquesa': 'Turquesa',
  'verde': 'Verde',
  'vinotinto': 'Vino Tinto'
};

const PRODUCTS = [
  { slug: 'enterizo-manga-corta-nina', gender: 'nina', category: 'enterizos' },
  { slug: 'enterizo-manga-larga-nina', gender: 'nina', category: 'enterizos' },
  { slug: 'legging-nina', gender: 'nina', category: 'leggings' },
  { slug: 'maxi-short-nina', gender: 'nina', category: 'shorts' },
  { slug: 'short-juvenil-nina', gender: 'nina', category: 'shorts' }
];

// Crear backup
function createBackup() {
  if (!fs.existsSync(BACKUP_DIR)) {
    fs.mkdirSync(BACKUP_DIR, { recursive: true });
  }
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
  const backupPath = path.join(BACKUP_DIR, `products-final5-${timestamp}.ts`);
  fs.copyFileSync(PRODUCTS_TS, backupPath);
  console.log(`✅ Backup creado: ${path.basename(backupPath)}\n`);
  return backupPath;
}

// Obtener imágenes
function getProductImages(slug, gender, category) {
  const dir = path.join(__dirname, '..', 'public', 'productos', gender, category);

  if (!fs.existsSync(dir)) {
    console.log(`⚠️  Directorio no existe: ${dir}`);
    return {};
  }

  const files = fs.readdirSync(dir);
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

  // Ordenar por número
  Object.keys(imagesByColor).forEach(color => {
    imagesByColor[color].sort((a, b) => a.number - b.number);
  });

  return imagesByColor;
}

// Construir estructura de colores
function buildColors(imagesByColor) {
  return Object.keys(imagesByColor).sort().map(colorSlug => {
    const images = imagesByColor[colorSlug];
    return {
      name: DISPLAY_NAMES[colorSlug] || colorSlug,
      slug: colorSlug,
      hex: COLOR_HEX[colorSlug] || '#000000',
      image: images[0].path,
      images: images.map(img => img.path)
    };
  });
}

console.log('🔨 Actualizando 5 productos restantes...\n');

// Crear backup
const backupPath = createBackup();

// Leer archivo
let content = fs.readFileSync(PRODUCTS_TS, 'utf8');
let updatedCount = 0;

PRODUCTS.forEach(({ slug, gender, category }) => {
  const imagesByColor = getProductImages(slug, gender, category);

  if (Object.keys(imagesByColor).length === 0) {
    console.log(`⚠️  ${slug}: No se encontraron imágenes`);
    return;
  }

  const colors = buildColors(imagesByColor);
  const mainImage = colors[0].image;

  // Buscar el producto y reemplazar colors e image
  const slugPattern = new RegExp(
    `(\\{[\\s\\S]*?slug:\\s*"${slug}"[\\s\\S]*?)(image:\\s*"[^"]*")([\\s\\S]*?)(colors:\\s*\\[[\\s\\S]*?\\n\\s*\\])([\\s\\S]*?\\n  \\})`,
    'm'
  );

  const match = content.match(slugPattern);

  if (!match) {
    console.log(`⚠️  ${slug}: No se encontró en products.ts`);
    return;
  }

  const colorsJson = JSON.stringify(colors, null, 4)
    .split('\n')
    .map((line, i) => i === 0 ? line : '    ' + line)
    .join('\n');

  const replacement =
    match[1] +
    `image: "${mainImage}"` +
    match[3] +
    `colors: ${colorsJson}` +
    match[5];

  content = content.replace(match[0], replacement);
  updatedCount++;

  const totalImages = colors.reduce((sum, c) => sum + c.images.length, 0);
  console.log(`✅ ${slug.padEnd(30)} ${colors.length} colores, ${totalImages} imágenes`);
});

// Escribir archivo
fs.writeFileSync(PRODUCTS_TS, content, 'utf8');

console.log(`\n📊 Productos actualizados: ${updatedCount}/${PRODUCTS.length}`);
console.log('✅ ¡Todos los productos actualizados correctamente!');
console.log(`\n💾 Backup guardado en: ${path.basename(backupPath)}`);