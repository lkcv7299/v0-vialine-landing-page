/**
 * Procesa TODAS las fotos nuevas del 12 de noviembre 2025
 * - 4 tops de mujer
 * - 10 productos de niña
 */
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const SOURCE_DIR = 'D:\\v0-vialine-landing-page\\drive-download-20251112T211216Z-1-001';
const PUBLIC_DIR_MUJER = path.join(__dirname, '..', 'public', 'productos', 'mujer');
const PUBLIC_DIR_NINA = path.join(__dirname, '..', 'public', 'productos', 'nina');

// Mapeo completo de productos
const PRODUCT_MAP = {
  // MUJER - TOPS
  'TOP PERLA - ALGODON PREMIUM': {
    slug: 'top-perla',
    category: 'tops',
    gender: 'mujer'
  },
  'TOP SOPORTE - ALGODON PREMIUM': {
    slug: 'top-soporte',
    category: 'tops',
    gender: 'mujer'
  },
  'TOP VENUS - SUPLEX LISO PREMIUM': {
    slug: 'top-venus',
    category: 'tops',
    gender: 'mujer'
  },
  'TOP ZAFIRO - ALGODON PREMIUM': {
    slug: 'top-zafiro',
    category: 'tops',
    gender: 'mujer'
  },

  // NIÑA - PRODUCTOS
  'CAFARENA': {
    slug: 'cafarena-nina',
    category: 'cafarenas',
    gender: 'nina'
  },
  'ENTERIZO MANGA CORTA': {
    slug: 'enterizo-manga-corta-nina',
    category: 'enterizos',
    gender: 'nina'
  },
  'ENTERIZO MANGA LARGA': {
    slug: 'enterizo-manga-larga-nina',
    category: 'enterizos',
    gender: 'nina'
  },
  'LEGGIN NIÑA': {
    slug: 'legging-nina',
    category: 'leggings',
    gender: 'nina'
  },
  'MAXI SHORT': {
    slug: 'maxi-short-nina',
    category: 'shorts',
    gender: 'nina'
  },
  'PANTYS': {
    slug: 'panty-nina',
    category: 'pantys',
    gender: 'nina'
  },
  'SHORT JUVENIL': {
    slug: 'short-juvenil-nina',
    category: 'shorts',
    gender: 'nina'
  },
  'TOP JAZMIN': {
    slug: 'top-jazmin-nina',
    category: 'tops',
    gender: 'nina'
  },
  'TOP MARGARITA': {
    slug: 'top-margarita-nina',
    category: 'tops',
    gender: 'nina'
  },
  'TOP VANI': {
    slug: 'top-vani-nina',
    category: 'tops',
    gender: 'nina'
  }
};

// Normalizar nombres de colores
function normalizeColor(color) {
  const map = {
    'AQUA': 'aqua',
    'AZUL MARINO': 'azulmarino',
    'AZULINO': 'azulino',
    'BEIGE': 'beige',
    'BLANCO': 'blanco',
    'CHARCOAL': 'charcoal',
    'CHARCOL': 'charcoal',
    'MELANGE': 'melange',
    'MELON': 'melon',
    'NEGRO': 'negro',
    'ROJO': 'rojo',
    'ROSA': 'rosa',
    'VIOLETA': 'violeta'
  };
  return map[color.toUpperCase()] || color.toLowerCase().replace(/\s+/g, '');
}

async function processPhotos() {
  console.log('🚀 Iniciando procesamiento de TODAS las fotos del 12-nov-2025...\n');

  const results = {
    processed: 0,
    skipped: 0,
    errors: 0,
    byProduct: {}
  };

  // Procesar carpeta raíz (tops de mujer)
  const rootFolders = fs.readdirSync(SOURCE_DIR);

  for (const folder of rootFolders) {
    const folderPath = path.join(SOURCE_DIR, folder);
    const stats = fs.statSync(folderPath);

    if (!stats.isDirectory()) continue;

    // Es carpeta Niñas?
    if (folder === 'Niñas') {
      await processNinaFolder(folderPath, results);
      continue;
    }

    // Es top de mujer
    const productInfo = PRODUCT_MAP[folder];
    if (!productInfo) {
      console.log(`⚠️  Producto no mapeado: ${folder}`);
      continue;
    }

    await processProduct(folder, folderPath, productInfo, results);
  }

  // Resumen
  console.log('\n' + '='.repeat(70));
  console.log('📊 RESUMEN COMPLETO');
  console.log('='.repeat(70));
  console.log(`✅ Total procesadas: ${results.processed}`);
  console.log(`❌ Errores: ${results.errors}`);
  console.log(`\nPor producto:`);
  Object.keys(results.byProduct).sort().forEach(product => {
    console.log(`  ${product.padEnd(30)} ${results.byProduct[product]} imágenes`);
  });
  console.log('\n🎉 Procesamiento completado!');
}

async function processNinaFolder(ninaPath, results) {
  console.log('\n👧 === PROCESANDO PRODUCTOS DE NIÑA ===\n');

  const ninaProducts = fs.readdirSync(ninaPath);

  for (const product of ninaProducts) {
    const productPath = path.join(ninaPath, product);
    const stats = fs.statSync(productPath);

    if (!stats.isDirectory()) continue;

    const productInfo = PRODUCT_MAP[product];
    if (!productInfo) {
      console.log(`⚠️  Producto niña no mapeado: ${product}`);
      continue;
    }

    await processProduct(product, productPath, productInfo, results);
  }
}

async function processProduct(productName, productPath, productInfo, results) {
  const { slug, category, gender } = productInfo;

  console.log(`\n📦 ${productName}`);
  console.log(`   Slug: ${slug} | Categoría: ${category} | Género: ${gender}`);

  results.byProduct[slug] = 0;

  // Crear directorio de destino
  const publicDir = gender === 'mujer' ? PUBLIC_DIR_MUJER : PUBLIC_DIR_NINA;
  const destDir = path.join(publicDir, category);

  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
    console.log(`   📁 Creado directorio: ${destDir}`);
  }

  // Procesar colores
  const colors = fs.readdirSync(productPath);

  for (const color of colors) {
    const colorPath = path.join(productPath, color);
    const colorStats = fs.statSync(colorPath);

    if (!colorStats.isDirectory()) continue;

    const colorSlug = normalizeColor(color);
    console.log(`   ├─ Color: ${color} → ${colorSlug}`);

    // Obtener imágenes
    const images = fs.readdirSync(colorPath)
      .filter(f => {
        const ext = f.toLowerCase();
        return ext.endsWith('.jpg') || ext.endsWith('.jpeg') || ext.endsWith('.png');
      })
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

        console.log(`      ├─ ✅ ${image} → ${destFilename}`);
        results.processed++;
        results.byProduct[slug]++;
      } catch (error) {
        console.log(`      ├─ ❌ Error: ${image} - ${error.message}`);
        results.errors++;
      }
    }
  }
}

// Ejecutar
processPhotos().catch(error => {
  console.error('\n💥 Error fatal:', error);
  process.exit(1);
});
