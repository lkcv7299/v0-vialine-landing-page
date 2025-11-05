/**
 * Procesa y convierte todas las fotos nuevas
 */
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const SOURCE_DIR = 'D:\\v0-vialine-landing-page\\drive-download-20251105T205308Z-1-001';
const PUBLIC_DIR = path.join(__dirname, '..', 'public', 'productos', 'mujer');

// Mapeo de productos a slugs y categorías
const PRODUCT_MAP = {
  'SHORT CICLISTA ACTIVE - SUPLEX LISO PREMIUM': { slug: 'short-ciclista-active', category: 'bikers' },
  'SHORT CLASICO - ALGODON PREMIUM': { slug: 'short-clasico', category: 'shorts' },
  'SHORT LUX - SUPLEX LISO PREMIUM': { slug: 'short-lux', category: 'shorts' },
  'TOP ARENA - ALGODON PREMIUM': { slug: 'top-arena', category: 'tops' },
  'TOP JUNGLE - SUPLEX LISO PREMIUM': { slug: 'top-jungle', category: 'tops' },
  'TOP LUNA - ALGODON PREMIUM': { slug: 'top-luna', category: 'tops' },
  'TOP PERLA - ALGODON PREMIUM': { slug: 'top-perla', category: 'tops' },
  'TOP SOPORTE - ALGODON PREMIUM': { slug: 'top-soporte', category: 'tops' },
  'TOP VENUS - SUPLEX LISO PREMIUM': { slug: 'top-venus', category: 'tops' },
  'TOP ZAFIRO - ALGODON PREMIUM': { slug: 'top-zafiro', category: 'tops' }
};

// Normalizar nombres de colores
function normalizeColor(color) {
  const map = {
    'AQUA': 'aqua',
    'AZULINO': 'azulino',
    'BLANCO': 'blanco',
    'CHARCOAL': 'charcoal',
    'CHARCOL': 'charcoal',
    'MELANGE': 'melange',
    'MELON': 'melon',
    'NEGRO': 'negro',
    'ROJO': 'rojo',
    'BEIGE': 'beige'
  };
  return map[color.toUpperCase()] || color.toLowerCase();
}

async function processPhotos() {
  console.log('🚀 Iniciando procesamiento de fotos...\n');

  const results = {
    processed: 0,
    skipped: 0,
    errors: 0
  };

  const folders = fs.readdirSync(SOURCE_DIR);

  for (const folder of folders) {
    const folderPath = path.join(SOURCE_DIR, folder);
    const stats = fs.statSync(folderPath);

    if (!stats.isDirectory()) continue;

    const productInfo = PRODUCT_MAP[folder];
    if (!productInfo) {
      console.log(`⚠️  Producto no mapeado: ${folder}`);
      continue;
    }

    const { slug, category } = productInfo;
    console.log(`\n📦 Procesando: ${slug}`);

    // Crear directorio de destino
    const destDir = path.join(PUBLIC_DIR, category);
    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }

    // Procesar colores
    const colors = fs.readdirSync(folderPath);

    for (const color of colors) {
      const colorPath = path.join(folderPath, color);
      const colorStats = fs.statSync(colorPath);

      if (!colorStats.isDirectory()) continue;

      const colorSlug = normalizeColor(color);
      console.log(`  ├─ Color: ${color} → ${colorSlug}`);

      // Obtener imágenes
      const images = fs.readdirSync(colorPath)
        .filter(f => f.toLowerCase().endsWith('.jpg') || f.toLowerCase().endsWith('.png'))
        .sort();

      for (let i = 0; i < images.length; i++) {
        const image = images[i];
        const sourcePath = path.join(colorPath, image);
        const number = i + 1;
        const destFilename = `${slug}-${colorSlug}${number}.webp`;
        const destPath = path.join(destDir, destFilename);

        try {
          // Convertir a WebP
          await sharp(sourcePath)
            .resize(800, 1200, {
              fit: 'inside',
              withoutEnlargement: true
            })
            .webp({ quality: 85 })
            .toFile(destPath);

          console.log(`     ├─ ✅ ${image} → ${destFilename}`);
          results.processed++;
        } catch (error) {
          console.log(`     ├─ ❌ Error: ${image} - ${error.message}`);
          results.errors++;
        }
      }
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log('📊 RESUMEN');
  console.log('='.repeat(60));
  console.log(`✅ Procesadas: ${results.processed}`);
  console.log(`❌ Errores: ${results.errors}`);
  console.log('\n🎉 Procesamiento completado!');
}

// Ejecutar
processPhotos().catch(error => {
  console.error('\n💥 Error fatal:', error);
  process.exit(1);
});
