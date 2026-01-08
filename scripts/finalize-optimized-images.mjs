// scripts/finalize-optimized-images.mjs
// Finaliza la optimización moviendo archivos .tmp a sus ubicaciones finales
// Ejecutar después de detener el servidor de desarrollo

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const publicDir = path.join(projectRoot, 'public');

let replaced = 0;
let deleted = 0;
let errors = 0;

function formatBytes(bytes) {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
}

function processDirectory(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      processDirectory(fullPath);
    } else if (entry.isFile()) {
      // Procesar archivos .optimized.webp (los respaldos optimizados)
      if (entry.name.endsWith('.optimized.webp')) {
        const originalName = entry.name.replace('.optimized.webp', '.webp');
        const originalPath = path.join(dir, originalName);

        try {
          // Eliminar original y renombrar optimizado
          if (fs.existsSync(originalPath)) {
            fs.unlinkSync(originalPath);
          }
          fs.renameSync(fullPath, originalPath);
          console.log(`✅ ${path.relative(publicDir, originalPath)}`);
          replaced++;
        } catch (error) {
          console.error(`❌ Error: ${entry.name}: ${error.message}`);
          errors++;
        }
      }

      // Procesar archivos .tmp (temporales de optimización fallida)
      if (entry.name.endsWith('.tmp')) {
        const originalName = entry.name.replace('.webp.tmp', '.webp');
        const originalPath = path.join(dir, originalName);

        try {
          // Eliminar original si existe y renombrar tmp
          if (fs.existsSync(originalPath)) {
            const originalSize = fs.statSync(originalPath).size;
            const newSize = fs.statSync(fullPath).size;

            fs.unlinkSync(originalPath);
            fs.renameSync(fullPath, originalPath);
            console.log(`✅ ${path.relative(publicDir, originalPath)} (${formatBytes(originalSize)} → ${formatBytes(newSize)})`);
            replaced++;
          } else {
            // No existe el original, solo renombrar
            fs.renameSync(fullPath, originalPath);
            console.log(`✅ ${path.relative(publicDir, originalPath)} (new)`);
            replaced++;
          }
        } catch (error) {
          console.error(`❌ Error: ${entry.name}: ${error.message}`);
          errors++;
        }
      }

      // Eliminar archivos innecesarios
      const unnecessaryPatterns = ['.mov', '.mp4', '.avi', '.DS_Store', 'Thumbs.db'];
      const ext = path.extname(entry.name).toLowerCase();
      if (unnecessaryPatterns.some(p => entry.name.includes(p) || ext === p)) {
        try {
          const size = fs.statSync(fullPath).size;
          fs.unlinkSync(fullPath);
          console.log(`🗑️  Deleted: ${path.relative(publicDir, fullPath)} (${formatBytes(size)})`);
          deleted++;
        } catch (error) {
          console.error(`❌ Error deleting ${entry.name}: ${error.message}`);
          errors++;
        }
      }
    }
  }
}

console.log('🔄 Finalizing optimized images...\n');
console.log('📂 Processing:', publicDir, '\n');

processDirectory(publicDir);

console.log('\n================================');
console.log('📊 RESULTS');
console.log('================================');
console.log(`✅ Replaced: ${replaced} files`);
console.log(`🗑️  Deleted: ${deleted} files`);
console.log(`❌ Errors: ${errors}`);

if (replaced > 0 || deleted > 0) {
  console.log('\n✨ Optimization finalized!');
  console.log('💡 Run "du -sh public/" to verify the new size');
}
