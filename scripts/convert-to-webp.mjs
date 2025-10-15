// scripts/convert-to-webp.mjs
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const publicDir = path.join(projectRoot, 'public');

let converted = 0;
let skipped = 0;
let errors = 0;

async function convertToWebP(filePath) {
  try {
    // Solo convertir si no existe ya la versión WebP
    const ext = path.extname(filePath).toLowerCase();
    if (!['.jpg', '.jpeg', '.png'].includes(ext)) {
      return;
    }

    const webpPath = filePath.replace(/\.(jpg|jpeg|png)$/i, '.webp');
    
    // Si ya existe WebP, skip
    if (fs.existsSync(webpPath)) {
      skipped++;
      return;
    }

    // Convertir a WebP con compresión de calidad 85
    await sharp(filePath)
      .webp({ quality: 85 })
      .toFile(webpPath);

    console.log(`✅ Converted: ${path.relative(publicDir, filePath)}`);
    converted++;

  } catch (error) {
    console.error(`❌ Error converting ${filePath}:`, error.message);
    errors++;
  }
}

async function processDirectory(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      await processDirectory(fullPath);
    } else if (entry.isFile()) {
      await convertToWebP(fullPath);
    }
  }
}

async function main() {
  console.log('🚀 Starting WebP conversion...\n');
  console.log(`📂 Processing directory: ${publicDir}\n`);

  await processDirectory(publicDir);

  console.log('\n✨ Conversion complete!');
  console.log(`✅ Converted: ${converted} images`);
  console.log(`⏭️  Skipped: ${skipped} images (already WebP)`);
  console.log(`❌ Errors: ${errors}`);
  
  if (converted > 0) {
    console.log('\n💡 Next steps:');
    console.log('1. Update your product images in data/products.ts to use .webp extension');
    console.log('2. You can delete the original .jpg/.png files to save space');
  }
}

main().catch(console.error);
