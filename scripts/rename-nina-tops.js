/**
 * Renombra las imágenes de tops nina para que coincidan con los slugs en products.ts
 */
const fs = require('fs');
const path = require('path');

const TOPS_DIR = path.join(__dirname, '..', 'public', 'productos', 'nina', 'tops');

const RENAME_MAP = {
  'top-jazmin-nina': 'top-jazmin',
  'top-margarita-nina': 'top-margarita',
  'top-vani-nina': 'top-vani'
};

console.log('🔄 Renombrando imágenes de tops nina...\n');

const files = fs.readdirSync(TOPS_DIR);
let renamed = 0;

files.forEach(file => {
  if (!file.endsWith('.webp')) return;

  for (const [oldSlug, newSlug] of Object.entries(RENAME_MAP)) {
    if (file.startsWith(oldSlug + '-')) {
      const newName = file.replace(oldSlug, newSlug);
      const oldPath = path.join(TOPS_DIR, file);
      const newPath = path.join(TOPS_DIR, newName);

      fs.renameSync(oldPath, newPath);
      console.log(`✅ ${file} → ${newName}`);
      renamed++;
      break;
    }
  }
});

console.log(`\n📊 Total renombrados: ${renamed} archivos`);
console.log('✅ ¡Listo!');
