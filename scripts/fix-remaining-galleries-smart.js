const fs = require('fs');
const path = require('path');

console.log('\n🔧 SOLUCIÓN INTELIGENTE - Procesando 17 casos problemáticos\n');

const productsPath = 'data/products.ts';
let productsContent = fs.readFileSync(productsPath, 'utf8');

// Leer el reporte de análisis
const report = JSON.parse(fs.readFileSync('gallery-analysis-report.json', 'utf8'));
const problematicColors = report.hasGallery;

console.log(`📋 Analizando ${problematicColors.length} colores problemáticos...\n`);

let totalConverted = 0;
let totalImages = 0;

// Función para encontrar imágenes relacionadas con más inteligencia
function findRelatedImages(currentImageName, directory) {
  if (!fs.existsSync(directory)) return [];

  const files = fs.readdirSync(directory).filter(f => f.endsWith('.webp'));

  // Extraer componentes del nombre actual
  // Ejemplo: "camiseta-manga-larga-azul-marino-manga-larga-zul-marino1.webp"
  const parts = currentImageName.replace(/\.webp$/, '').split('-');

  // Buscar archivos que tengan partes similares
  const relatedFiles = files.filter(f => {
    const fParts = f.replace(/\.webp$/, '').split('-');

    // Contar cuántas partes coinciden
    let matchCount = 0;
    for (const part of parts) {
      if (part.length > 3 && fParts.some(fp => fp.includes(part) || part.includes(fp))) {
        matchCount++;
      }
    }

    // Si más del 60% de las partes coinciden, es relacionado
    return matchCount > parts.length * 0.6;
  });

  return relatedFiles.sort((a, b) => {
    const numA = parseInt(a.match(/(\d+)\.webp$/)?.[1] || '0');
    const numB = parseInt(b.match(/(\d+)\.webp$/)?.[1] || '0');
    return numA - numB;
  });
}

// Casos especiales conocidos
const manualFixes = [
  {
    // camiseta-manga-larga Azul Marino
    match: /\{\s*name:\s*["']Azul Marino["']\s*,\s*slug:\s*["']azul-marino["']\s*,\s*hex:\s*["']#1E3A8A["']\s*,\s*image:\s*["']\/productos\/mujer\/camisetas\/camiseta-manga-larga-azul-marino-manga-larga-zul-marino1\.webp["']\s*,?\s*\}/s,
    replacement: {
      name: "Azul Marino",
      slug: "azul-marino",
      hex: "#1E3A8A",
      images: [
        "/productos/mujer/camisetas/camiseta-manga-larga-azul-marino-manga-larga-zul-marino1.webp",
        "/productos/mujer/camisetas/camiseta-manga-larga-azul-marino-manga-larga-azul-marino2.webp",
        "/productos/mujer/camisetas/camiseta-manga-larga-azul-marino-manga-larga-azul-marino3.webp",
        "/productos/mujer/camisetas/camiseta-manga-larga-azul-marino-manga-larga-azul-marino4.webp",
        "/productos/mujer/camisetas/camiseta-manga-larga-azul-marino-manga-larga-azul-marino5.webp"
      ]
    }
  },
  {
    // camiseta-manga-larga Turquesa (typo: tuqrquesa)
    match: /\{\s*name:\s*["']Turquesa["']\s*,\s*slug:\s*["']tuqrquesa["']\s*,\s*hex:\s*["']#40E0D0["']\s*,\s*image:\s*["']\/productos\/mujer\/camisetas\/camiseta-manga-larga-turquesa-manga-larga-tuqrquesa4\.webp["']\s*,?\s*\}/s,
    replacement: {
      name: "Turquesa",
      slug: "tuqrquesa",
      hex: "#40E0D0",
      images: [
        "/productos/mujer/camisetas/camiseta-manga-larga-turquesa-manga-larga-tuqrquesa4.webp",
        "/productos/mujer/camisetas/camiseta-manga-larga-turquesa-manga-larga-turquesa1.webp",
        "/productos/mujer/camisetas/camiseta-manga-larga-turquesa-manga-larga-turquesa2.webp",
        "/productos/mujer/camisetas/camiseta-manga-larga-turquesa-manga-larga-turquesa3.webp",
        "/productos/mujer/camisetas/camiseta-manga-larga-turquesa-manga-larga-turquesa5.webp"
      ]
    }
  },
  {
    // mini-short Negro
    match: /\{\s*name:\s*["']Negro["']\s*,\s*slug:\s*["']negro["']\s*,\s*hex:\s*["']#000000["']\s*,\s*image:\s*["']\/productos\/mujer\/short\/mini-short-negro-mini-short-negro\.webp["']\s*,?\s*\}/s,
    replacement: {
      name: "Negro",
      slug: "negro",
      hex: "#000000",
      images: [
        "/productos/mujer/short/mini-short-negro-mini-short-negro.webp",
        "/productos/mujer/short/mini-short-negro-mini-short-negro2..webp",
        "/productos/mujer/short/mini-short-negro-mini-short-negro3..webp",
        "/productos/mujer/short/mini-short-negro-mini-short-negro4..webp",
        "/productos/mujer/short/mini-short-negro-mini-short-negro5..webp"
      ]
    }
  },
  {
    // legging-slim Azul (azulino)
    match: /\{\s*name:\s*["']Azul["']\s*,\s*slug:\s*["']azul["']\s*,\s*hex:\s*["']#4A90E2["']\s*,\s*image:\s*["']\/productos\/mujer\/legging\/legging-slim-azulino\.webp["']\s*,?\s*\}/s,
    replacement: {
      name: "Azul",
      slug: "azul",
      hex: "#4A90E2",
      images: [
        "/productos/mujer/legging/legging-slim-azulino.webp",
        "/productos/mujer/legging/legging-slim-suplex-liso-premium-azulino-legging-slim-azulino-1.webp",
        "/productos/mujer/legging/legging-slim-suplex-liso-premium-azulino-legging-slim-azulino-2.webp",
        "/productos/mujer/legging/legging-slim-suplex-liso-premium-azulino-legging-slim-azulino-3.webp",
        "/productos/mujer/legging/legging-slim-suplex-liso-premium-azulino-legging-slim-azulino-4.webp"
      ]
    }
  },
  {
    // legging-slim Blanco
    match: /\{\s*name:\s*["']Blanco["']\s*,\s*slug:\s*["']blanco["']\s*,\s*hex:\s*["']#FFFFFF["']\s*,\s*image:\s*["']\/productos\/mujer\/legging\/legging-slim-blanco\.webp["']\s*,?\s*\}/s,
    replacement: {
      name: "Blanco",
      slug: "blanco",
      hex: "#FFFFFF",
      images: [
        "/productos/mujer/legging/legging-slim-blanco.webp",
        "/productos/mujer/legging/legging-slim-suplex-liso-premium-blanco-legging-slim-blanco1.webp",
        "/productos/mujer/legging/legging-slim-suplex-liso-premium-blanco-legging-slim-blanco2.webp",
        "/productos/mujer/legging/legging-slim-suplex-liso-premium-blanco-legging-slim-blanco3.webp",
        "/productos/mujer/legging/legging-slim-suplex-liso-premium-blanco-legging-slim-blanco4.webp"
      ]
    }
  },
  {
    // legging-clasica-gamuza Blanco
    match: /\{\s*name:\s*["']Blanco["']\s*,\s*slug:\s*["']blanco["']\s*,\s*hex:\s*["']#FFFFFF["']\s*,\s*image:\s*["']\/productos\/mujer\/legging\/legging-clasica-gamusa-blanco\.webp["']\s*,?\s*\}/s,
    replacement: {
      name: "Blanco",
      slug: "blanco",
      hex: "#FFFFFF",
      images: [
        "/productos/mujer/legging/legging-clasica-gamusa-blanco.webp",
        "/productos/mujer/legging/legging-clasica-gamusa-azul-marino.webp",
        "/productos/mujer/legging/legging-clasica-gamusa-melange.webp",
        "/productos/mujer/legging/legging-clasica-gamusa-negro.webp"
      ]
    }
  },
  {
    // legging-clasica-gamuza Melange
    match: /\{\s*name:\s*["']Melange["']\s*,\s*slug:\s*["']melange["']\s*,\s*hex:\s*["']#A0A0A0["']\s*,\s*image:\s*["']\/productos\/mujer\/legging\/legging-clasica-gamusa-melange\.webp["']\s*,?\s*\}/s,
    replacement: {
      name: "Melange",
      slug: "melange",
      hex: "#A0A0A0",
      images: [
        "/productos/mujer/legging/legging-clasica-gamusa-melange.webp",
        "/productos/mujer/legging/legging-clasica-gamusa-azul-marino.webp",
        "/productos/mujer/legging/legging-clasica-gamusa-blanco.webp",
        "/productos/mujer/legging/legging-clasica-gamusa-negro.webp"
      ]
    }
  },
  {
    // legging-clasica-gamuza Negro
    match: /\{\s*name:\s*["']Negro["']\s*,\s*slug:\s*["']negro["']\s*,\s*hex:\s*["']#000000["']\s*,\s*image:\s*["']\/productos\/mujer\/legging\/legging-clasica-gamusa-negro\.webp["']\s*,?\s*\}/s,
    replacement: {
      name: "Negro",
      slug: "negro",
      hex: "#000000",
      images: [
        "/productos/mujer/legging/legging-clasica-gamusa-negro.webp",
        "/productos/mujer/legging/legging-clasica-gamusa-azul-marino.webp",
        "/productos/mujer/legging/legging-clasica-gamusa-blanco.webp",
        "/productos/mujer/legging/legging-clasica-gamusa-melange.webp"
      ]
    }
  }
];

console.log('🎯 Aplicando correcciones manuales inteligentes...\n');

manualFixes.forEach((fix, i) => {
  const match = productsContent.match(fix.match);

  if (match) {
    const newBlock = `{
      name: "${fix.replacement.name}",
      slug: "${fix.replacement.slug}",
      hex: "${fix.replacement.hex}",
      images: [
        ${fix.replacement.images.map(img => `"${img}"`).join(',\n        ')}
      ]
    }`;

    productsContent = productsContent.replace(fix.match, newBlock);

    console.log(`${i + 1}. ✅ ${fix.replacement.name} (${fix.replacement.slug})`);
    console.log(`   Imágenes agregadas: ${fix.replacement.images.length}`);
    console.log(`   ${fix.replacement.images.slice(0, 3).map(p => path.basename(p)).join(', ')}...\n`);

    totalConverted++;
    totalImages += fix.replacement.images.length;
  } else {
    console.log(`${i + 1}. ⚠️  No se encontró: ${fix.replacement.name} (${fix.replacement.slug})`);
  }
});

// Guardar el archivo actualizado
fs.writeFileSync(productsPath, productsContent, 'utf8');

console.log('\n✅ Conversión completada:\n');
console.log(`   Colores convertidos: ${totalConverted}`);
console.log(`   Total imágenes agregadas: ${totalImages}`);

// Verificar estado final
const finalImagesArrays = (productsContent.match(/images:\s*\[/g) || []).length;
const finalSingleImages = (productsContent.match(/image:\s*["']/g) || []).length;

console.log('\n📊 Estado final:');
console.log(`   Colores con images (array): ${finalImagesArrays}`);
console.log(`   Colores con image (single): ${finalSingleImages}`);

console.log('\n📝 Archivo actualizado: data/products.ts\n');
