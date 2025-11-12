/**
 * Actualiza solo los 3 tops de niña con sus galerías
 */
const fs = require('fs');
const path = require('path');

const TOPS_DIR = path.join(__dirname, '..', 'public', 'productos', 'nina', 'tops');
const PRODUCTS_TS = path.join(__dirname, '..', 'data', 'products.ts');
const BACKUP_DIR = path.join(__dirname, '..', 'data', 'backups');

const COLOR_HEX = {
  'beige': '#F5F5DC',
  'blanco': '#FFFFFF',
  'negro': '#000000',
  'rojo': '#FF0000'
};

const DISPLAY_NAMES = {
  'beige': 'Beige',
  'blanco': 'Blanco',
  'negro': 'Negro',
  'rojo': 'Rojo'
};

// Crear backup
function createBackup() {
  if (!fs.existsSync(BACKUP_DIR)) {
    fs.mkdirSync(BACKUP_DIR, { recursive: true });
  }
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
  const backupPath = path.join(BACKUP_DIR, `products-nina-tops-${timestamp}.ts`);
  fs.copyFileSync(PRODUCTS_TS, backupPath);
  console.log(`✅ Backup creado: ${path.basename(backupPath)}\n`);
}

// Obtener imágenes para un top
function getTopImages(slug) {
  const files = fs.readdirSync(TOPS_DIR);
  const topFiles = files.filter(f => f.startsWith(`${slug}-`) && f.endsWith('.webp'));

  const imagesByColor = {};

  topFiles.forEach(file => {
    const match = file.match(new RegExp(`${slug}-([a-z]+)(\\d+)\\.webp`));
    if (match) {
      const [, color, number] = match;
      if (!imagesByColor[color]) {
        imagesByColor[color] = [];
      }
      imagesByColor[color].push({
        path: `/productos/nina/tops/${file}`,
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

console.log('🔨 Actualizando tops de niña...\n');

// Crear backup
createBackup();

// Leer archivo
let content = fs.readFileSync(PRODUCTS_TS, 'utf8');

const tops = ['top-jazmin', 'top-margarita', 'top-vani'];

tops.forEach(slug => {
  const imagesByColor = getTopImages(slug);

  if (Object.keys(imagesByColor).length === 0) {
    console.log(`⚠️  ${slug}: No se encontraron imágenes`);
    return;
  }

  const colors = buildColors(imagesByColor);
  const mainImage = colors[0].image;

  // Buscar el producto y reemplazar
  const slugPattern = new RegExp(`(\\{[\\s\\S]*?slug:\\s*["']${slug}["'][\\s\\S]*?)(image:\\s*["'][^"']*["'])([\\s\\S]*?)(colors:\\s*\\[[\\s\\S]*?\\n\\s*\\])([\\s\\S]*?\\n  \\})`, 'm');

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

  const totalImages = colors.reduce((sum, c) => sum + c.images.length, 0);
  console.log(`✅ ${slug.padEnd(20)} ${colors.length} colores, ${totalImages} imágenes`);
});

// Escribir archivo
fs.writeFileSync(PRODUCTS_TS, content, 'utf8');

console.log('\n✅ Tops de niña actualizados con éxito');
