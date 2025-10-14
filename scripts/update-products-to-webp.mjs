// scripts/update-products-to-webp.mjs
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const productsFile = path.join(projectRoot, 'data', 'products.ts');

async function main() {
  console.log('🚀 Updating products.ts to use WebP images...\n');

  // Leer el archivo
  let content = fs.readFileSync(productsFile, 'utf-8');
  
  // Contar cuántos cambios haremos
  const jpgCount = (content.match(/\.jpg/gi) || []).length;
  const jpegCount = (content.match(/\.jpeg/gi) || []).length;
  const pngCount = (content.match(/\.png/gi) || []).length;
  
  console.log(`Found ${jpgCount + jpegCount + pngCount} images to convert:`);
  console.log(`  - .jpg: ${jpgCount}`);
  console.log(`  - .jpeg: ${jpegCount}`);
  console.log(`  - .png: ${pngCount}\n`);

  // Reemplazar todas las extensiones
  content = content.replace(/\.jpg/gi, '.webp');
  content = content.replace(/\.jpeg/gi, '.webp');
  content = content.replace(/\.png/gi, '.webp');

  // Crear backup del archivo original
  const backupFile = productsFile.replace('.ts', '.backup.ts');
  fs.writeFileSync(backupFile, fs.readFileSync(productsFile, 'utf-8'));
  console.log(`✅ Backup created: ${backupFile}`);

  // Escribir el archivo actualizado
  fs.writeFileSync(productsFile, content, 'utf-8');
  console.log(`✅ Updated: ${productsFile}\n`);

  console.log('✨ Done! All image references now point to .webp files');
  console.log('💡 If something goes wrong, restore from backup:');
  console.log(`   mv ${backupFile} ${productsFile}`);
}

main().catch(console.error);