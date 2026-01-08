// scripts/optimize-images.mjs
// Optimiza imágenes del proyecto - reduce tamaño manteniendo calidad
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const publicDir = path.join(projectRoot, 'public');

// Configuración
const CONFIG = {
  // Tamaño máximo en bytes para considerar optimización (500KB)
  maxSizeBytes: 500 * 1024,
  // Calidad WebP (0-100)
  webpQuality: 80,
  // Ancho máximo para imágenes de productos
  maxProductWidth: 800,
  // Ancho máximo para imágenes hero
  maxHeroWidth: 1920,
  // Modo dry-run (no modifica archivos)
  dryRun: process.argv.includes('--dry-run'),
  // Solo mostrar resumen
  quiet: process.argv.includes('--quiet'),
};

// Estadísticas
const stats = {
  processed: 0,
  optimized: 0,
  skipped: 0,
  errors: 0,
  savedBytes: 0,
  originalTotal: 0,
  newTotal: 0,
};

function formatBytes(bytes) {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
}

function isProductImage(filePath) {
  return filePath.includes('/productos/') || filePath.includes('\\productos\\');
}

function isHeroImage(filePath) {
  const name = path.basename(filePath).toLowerCase();
  return name.includes('hero') || name.includes('banner');
}

async function optimizeImage(filePath) {
  try {
    const ext = path.extname(filePath).toLowerCase();
    if (!['.webp', '.jpg', '.jpeg', '.png'].includes(ext)) {
      return;
    }

    const originalStats = fs.statSync(filePath);
    const originalSize = originalStats.size;
    stats.originalTotal += originalSize;
    stats.processed++;

    // Si es pequeña, skip
    if (originalSize <= CONFIG.maxSizeBytes) {
      stats.skipped++;
      stats.newTotal += originalSize;
      return;
    }

    // Determinar tamaño máximo según tipo
    const maxWidth = isHeroImage(filePath) ? CONFIG.maxHeroWidth : CONFIG.maxProductWidth;

    // Leer imagen y obtener metadata
    const image = sharp(filePath);
    const metadata = await image.metadata();

    // Calcular nuevo tamaño
    let resizeOptions = {};
    if (metadata.width && metadata.width > maxWidth) {
      resizeOptions = { width: maxWidth, withoutEnlargement: true };
    }

    // Crear imagen optimizada
    let pipeline = sharp(filePath);

    if (Object.keys(resizeOptions).length > 0) {
      pipeline = pipeline.resize(resizeOptions);
    }

    // Convertir a WebP con compresión
    const outputPath = filePath.replace(/\.(jpg|jpeg|png)$/i, '.webp');
    const tempPath = filePath + '.tmp';

    await pipeline
      .webp({ quality: CONFIG.webpQuality, effort: 4 })
      .toFile(tempPath);

    const newStats = fs.statSync(tempPath);
    const newSize = newStats.size;
    const saved = originalSize - newSize;

    if (!CONFIG.dryRun) {
      // En Windows, usar copyFile + unlink es más seguro que rename
      const finalPath = ext !== '.webp' ? outputPath : filePath;

      try {
        // Copiar el archivo optimizado sobre el original
        fs.copyFileSync(tempPath, finalPath);
        fs.unlinkSync(tempPath);

        // Si convertimos de jpg/png a webp, eliminar el original
        if (ext !== '.webp' && fs.existsSync(filePath)) {
          try {
            fs.unlinkSync(filePath);
          } catch (e) {
            // Ignorar si no podemos eliminar el original
          }
        }
      } catch (copyError) {
        // Si falla el copy, intentar con rename
        try {
          fs.renameSync(tempPath, finalPath);
        } catch (renameError) {
          console.error(`  ⚠️ Could not replace file (locked?). Saving as ${path.basename(tempPath)}`);
          // Guardar con sufijo .optimized para procesamiento manual
          const optimizedPath = filePath.replace(/(\.[^.]+)$/, '.optimized$1');
          fs.renameSync(tempPath, optimizedPath);
        }
      }
    } else {
      fs.unlinkSync(tempPath);
    }

    stats.optimized++;
    stats.savedBytes += saved;
    stats.newTotal += newSize;

    if (!CONFIG.quiet) {
      const relativePath = path.relative(publicDir, filePath);
      console.log(`✅ ${relativePath}`);
      console.log(`   ${formatBytes(originalSize)} → ${formatBytes(newSize)} (${((saved / originalSize) * 100).toFixed(1)}% saved)`);
    }

  } catch (error) {
    console.error(`❌ Error: ${path.relative(publicDir, filePath)}:`, error.message);
    stats.errors++;
  }
}

async function processDirectory(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      await processDirectory(fullPath);
    } else if (entry.isFile()) {
      await optimizeImage(fullPath);
    }
  }
}

async function removeUnnecessaryFiles() {
  // Archivos que no deberían estar en public
  const unnecessaryPatterns = ['.mov', '.mp4', '.avi', '.DS_Store', 'Thumbs.db'];
  let removed = 0;

  function scanDir(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        scanDir(fullPath);
      } else {
        const ext = path.extname(entry.name).toLowerCase();
        if (unnecessaryPatterns.some(p => entry.name.includes(p) || ext === p)) {
          const size = fs.statSync(fullPath).size;
          console.log(`🗑️  Removing: ${path.relative(publicDir, fullPath)} (${formatBytes(size)})`);
          if (!CONFIG.dryRun) {
            fs.unlinkSync(fullPath);
          }
          stats.savedBytes += size;
          removed++;
        }
      }
    }
  }

  scanDir(publicDir);
  return removed;
}

async function main() {
  console.log('🖼️  Image Optimization Script');
  console.log('================================\n');

  if (CONFIG.dryRun) {
    console.log('⚠️  DRY RUN MODE - No files will be modified\n');
  }

  console.log('📂 Removing unnecessary files...\n');
  const removedCount = await removeUnnecessaryFiles();
  console.log(`\n🗑️  Removed ${removedCount} files\n`);

  console.log('📂 Optimizing images...\n');
  await processDirectory(publicDir);

  console.log('\n================================');
  console.log('📊 RESULTS');
  console.log('================================');
  console.log(`📁 Processed: ${stats.processed} images`);
  console.log(`✅ Optimized: ${stats.optimized} images`);
  console.log(`⏭️  Skipped (already small): ${stats.skipped} images`);
  console.log(`❌ Errors: ${stats.errors}`);
  console.log('');
  console.log(`📦 Original size: ${formatBytes(stats.originalTotal)}`);
  console.log(`📦 New size: ${formatBytes(stats.newTotal)}`);
  console.log(`💾 Space saved: ${formatBytes(stats.savedBytes)} (${((stats.savedBytes / stats.originalTotal) * 100).toFixed(1)}%)`);

  if (CONFIG.dryRun) {
    console.log('\n⚠️  This was a dry run. Run without --dry-run to apply changes.');
  }
}

main().catch(console.error);
