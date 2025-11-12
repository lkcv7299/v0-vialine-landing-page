/**
 * Genera entradas de transforms para los 14 nuevos productos
 */
const fs = require('fs');
const path = require('path');

const PRODUCTS_TS = path.join(__dirname, '..', 'data', 'products.ts');

const PRODUCTS = [
  'top-perla',
  'top-soporte',
  'top-venus',
  'top-zafiro',
  'cafarena-nina',
  'enterizo-manga-corta-nina',
  'enterizo-manga-larga-nina',
  'legging-nina',
  'maxi-short-nina',
  'panty-nina',
  'short-juvenil-nina',
  'top-jazmin',
  'top-margarita',
  'top-vani'
];

console.log('🔍 Extrayendo primer color de cada producto...\\n');

const content = fs.readFileSync(PRODUCTS_TS, 'utf8');

const transforms = [];

PRODUCTS.forEach(slug => {
  const pattern = new RegExp(
    `slug: "${slug}"[\\s\\S]*?colors: \\[[\\s\\S]*?"slug":\\s*"([^"]+)"`,
    'm'
  );

  const match = content.match(pattern);

  if (match) {
    const firstColor = match[1];
    console.log(`✅ ${slug.padEnd(30)} → ${firstColor}`);

    transforms.push({
      slug,
      color: firstColor
    });
  } else {
    console.log(`⚠️  ${slug.padEnd(30)} → No encontrado`);
  }
});

console.log('\\n📝 Generando código de transforms...\\n');

// Generar código
const transformCode = transforms
  .map(
    ({ slug, color }) =>
      `  "${slug}": {\n` +
      `    "${color}": {\n` +
      `      "0": {\n` +
      `        "card": { "x": 0, "y": 0, "scale": 1, "context": "card", "containerWidth": 220 }\n` +
      `      }\n` +
      `    }\n` +
      `  }`
  )
  .join(',\\n');

console.log(transformCode);
console.log('\\n✅ Código generado. Copiar al archivo ImageTransformLoader.tsx');
