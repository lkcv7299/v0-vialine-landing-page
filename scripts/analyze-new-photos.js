/**
 * Analiza estructura de las nuevas fotos
 */
const fs = require('fs');
const path = require('path');

const PHOTOS_DIR = 'D:\\v0-vialine-landing-page\\drive-download-20251105T205308Z-1-001';

console.log('📸 Analizando estructura de fotos...\n');

const folders = fs.readdirSync(PHOTOS_DIR);

const analysis = {};

folders.forEach(folder => {
  const folderPath = path.join(PHOTOS_DIR, folder);
  const stats = fs.statSync(folderPath);

  if (!stats.isDirectory()) return;

  const colors = fs.readdirSync(folderPath);
  const colorData = {};

  colors.forEach(color => {
    const colorPath = path.join(folderPath, color);
    const colorStats = fs.statSync(colorPath);

    if (!colorStats.isDirectory()) return;

    const images = fs.readdirSync(colorPath).filter(f =>
      f.toLowerCase().endsWith('.jpg') ||
      f.toLowerCase().endsWith('.png') ||
      f.toLowerCase().endsWith('.webp')
    );

    colorData[color] = {
      count: images.length,
      files: images
    };
  });

  analysis[folder] = colorData;
});

console.log('📊 Estructura encontrada:\n');

Object.entries(analysis).forEach(([product, colors]) => {
  console.log(`${product}`);
  const colorCount = Object.keys(colors).length;
  const totalImages = Object.values(colors).reduce((sum, c) => sum + c.count, 0);
  console.log(`  └─ ${colorCount} colores, ${totalImages} imágenes`);

  Object.entries(colors).forEach(([color, data]) => {
    console.log(`     ├─ ${color}: ${data.count} fotos`);
  });
  console.log();
});

// Mapeo a slugs del sistema
const productMap = {
  'SHORT CICLISTA ACTIVE - SUPLEX LISO PREMIUM': 'short-ciclista-active',
  'SHORT CLASICO - ALGODON PREMIUM': 'short-clasico',
  'SHORT LUX - SUPLEX LISO PREMIUM': 'short-lux',
  'TOP ARENA - ALGODON PREMIUM': 'top-arena',
  'TOP JUNGLE - SUPLEX LISO PREMIUM': 'top-jungle',
  'TOP LUNA - ALGODON PREMIUM': 'top-luna',
  'TOP PERLA - ALGODON PREMIUM': 'top-perla',
  'TOP SOPORTE - ALGODON PREMIUM': 'top-soporte',
  'TOP VENUS - SUPLEX LISO PREMIUM': 'top-venus',
  'TOP ZAFIRO - ALGODON PREMIUM': 'top-zafiro'
};

console.log('🗺️  Mapeo productos → sistema:\n');
Object.entries(productMap).forEach(([original, slug]) => {
  console.log(`  ${original}`);
  console.log(`    → ${slug}`);
});

console.log('\n✅ Análisis completado');
