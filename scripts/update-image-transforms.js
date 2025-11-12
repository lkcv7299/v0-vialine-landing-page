/**
 * Actualiza ImageTransformLoader.tsx con los nuevos transforms desde JSON
 * PRECISIÓN QUIRÚRGICA - No tocar nada más que SAVED_TRANSFORMS
 */
const fs = require('fs');
const path = require('path');

const JSON_FILE = path.join(__dirname, '..', 'image-transformsnuevocarruselmujernina.json');
const TRANSFORMS_FILE = path.join(__dirname, '..', 'components', 'ImageTransformLoader.tsx');
const BACKUP_DIR = path.join(__dirname, '..', 'components', 'backups');

console.log('🔧 Actualizando ImageTransformLoader.tsx con precisión quirúrgica...\n');

// 1. Crear backup
if (!fs.existsSync(BACKUP_DIR)) {
  fs.mkdirSync(BACKUP_DIR, { recursive: true });
}
const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
const backupPath = path.join(BACKUP_DIR, `ImageTransformLoader-${timestamp}.tsx`);
fs.copyFileSync(TRANSFORMS_FILE, backupPath);
console.log(`✅ Backup creado: ${path.basename(backupPath)}\n`);

// 2. Leer JSON con los nuevos transforms
const transformsJson = fs.readFileSync(JSON_FILE, 'utf8');
const transforms = JSON.parse(transformsJson);

console.log(`📊 Transforms cargados: ${Object.keys(transforms).length} productos\n`);

// 3. Formatear el objeto con indentación correcta para TypeScript
const formattedTransforms = JSON.stringify(transforms, null, 2)
  .split('\n')
  .map((line, index) => {
    // Primera línea sin indentación extra (es el { inicial)
    if (index === 0) return line;
    // Agregar 2 espacios de indentación a todas las demás líneas
    return '  ' + line;
  })
  .join('\n');

// 4. Leer el archivo actual
let content = fs.readFileSync(TRANSFORMS_FILE, 'utf8');

// 5. Encontrar y reemplazar SAVED_TRANSFORMS con precisión quirúrgica
const pattern = /const SAVED_TRANSFORMS = \{[\s\S]*?\n\}/;
const replacement = `const SAVED_TRANSFORMS = ${formattedTransforms}`;

if (!pattern.test(content)) {
  console.error('❌ ERROR: No se encontró el patrón SAVED_TRANSFORMS en el archivo');
  process.exit(1);
}

content = content.replace(pattern, replacement);

// 6. Escribir el archivo actualizado
fs.writeFileSync(TRANSFORMS_FILE, content, 'utf8');

console.log('✅ ImageTransformLoader.tsx actualizado correctamente\n');

// 7. Mostrar productos actualizados de niña
console.log('📸 Productos de niña actualizados:');
const ninaProducts = Object.keys(transforms).filter(slug =>
  slug.includes('-nina') || slug === 'top-jazmin' || slug === 'top-margarita' || slug === 'top-vani'
);

ninaProducts.forEach(slug => {
  const colors = Object.keys(transforms[slug]);
  colors.forEach(color => {
    const imageIndexes = Object.keys(transforms[slug][color]);
    imageIndexes.forEach(idx => {
      const railTransform = transforms[slug][color][idx].rail;
      if (railTransform) {
        console.log(`  ✅ ${slug.padEnd(30)} rail: x=${railTransform.x}, y=${railTransform.y}, scale=${railTransform.scale}`);
      }
    });
  });
});

console.log('\n🎉 ¡Actualización completada con éxito!');
console.log('\n💡 Recarga el navegador para ver los cambios');
