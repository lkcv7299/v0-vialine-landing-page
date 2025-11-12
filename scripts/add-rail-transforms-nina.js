/**
 * Agrega transforms "rail" a los 10 productos de niña
 * Basado en los transforms de productos de mujer similares
 */
const fs = require('fs');
const path = require('path');

const TRANSFORMS_FILE = path.join(__dirname, '..', 'components', 'ImageTransformLoader.tsx');

// Transforms rail basados en productos mujer similares
const RAIL_TRANSFORMS = {
  // TOPS NIÑA - basado en tops mujer (y: 110-133, scale: 1.62-1.68)
  'top-jazmin': {
    color: 'beige',
    rail: { x: 0, y: 120, scale: 1.65, context: 'rail', containerWidth: 483 }
  },
  'top-margarita': {
    color: 'beige',
    rail: { x: 0, y: 120, scale: 1.65, context: 'rail', containerWidth: 483 }
  },
  'top-vani': {
    color: 'blanco',
    rail: { x: 0, y: 120, scale: 1.65, context: 'rail', containerWidth: 483 }
  },

  // ENTERIZOS NIÑA - cuerpo completo, centrado
  'enterizo-manga-corta-nina': {
    color: 'amarillo',
    rail: { x: 0, y: 0, scale: 1.5, context: 'rail', containerWidth: 483 }
  },
  'enterizo-manga-larga-nina': {
    color: 'amarillo',
    rail: { x: 0, y: 0, scale: 1.5, context: 'rail', containerWidth: 483 }
  },

  // SHORTS/LEGGINGS/PANTY NIÑA - basado en shorts mujer (y: -99 a -158, scale: 1.51-1.68)
  'maxi-short-nina': {
    color: 'azulmarino',
    rail: { x: 0, y: -110, scale: 1.55, context: 'rail', containerWidth: 483 }
  },
  'short-juvenil-nina': {
    color: 'azulmarino',
    rail: { x: 0, y: -110, scale: 1.55, context: 'rail', containerWidth: 483 }
  },
  'cafarena-nina': {
    color: 'azulmarino',
    rail: { x: 0, y: -110, scale: 1.55, context: 'rail', containerWidth: 483 }
  },
  'legging-nina': {
    color: 'blanco',
    rail: { x: 0, y: -110, scale: 1.55, context: 'rail', containerWidth: 483 }
  },
  'panty-nina': {
    color: 'azulmarino',
    rail: { x: 0, y: -110, scale: 1.55, context: 'rail', containerWidth: 483 }
  }
};

console.log('🔨 Agregando transforms "rail" a productos niña...\n');

// Leer archivo
let content = fs.readFileSync(TRANSFORMS_FILE, 'utf8');

let updated = 0;

Object.entries(RAIL_TRANSFORMS).forEach(([slug, { color, rail }]) => {
  // Buscar el producto y agregar rail transform
  const pattern = new RegExp(
    `("${slug}":\\s*\\{[\\s\\S]*?"${color}":\\s*\\{[\\s\\S]*?"0":\\s*\\{[\\s\\S]*?)(("card":[\\s\\S]*?\\}))([\\s\\S]*?\\}[\\s\\S]*?\\})`,
    'm'
  );

  const match = content.match(pattern);

  if (!match) {
    console.log(`⚠️  ${slug}: No se encontró`);
    return;
  }

  // Verificar si ya tiene rail
  if (match[0].includes('"rail"')) {
    console.log(`⏭️  ${slug}: Ya tiene rail transform`);
    return;
  }

  // Agregar rail antes de card
  const railJson = JSON.stringify(rail);
  const replacement = match[1] + `"rail": ${railJson},\n        ` + match[2] + match[5];

  content = content.replace(match[0], replacement);
  updated++;

  console.log(`✅ ${slug.padEnd(30)} rail agregado (y: ${rail.y}, scale: ${rail.scale})`);
});

// Escribir archivo
fs.writeFileSync(TRANSFORMS_FILE, content, 'utf8');

console.log(`\n📊 Productos actualizados: ${updated}/10`);
console.log('✅ Transforms rail agregados correctamente');
