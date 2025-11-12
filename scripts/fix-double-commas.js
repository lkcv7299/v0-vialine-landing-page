/**
 * Elimina comas dobles que crean elementos undefined en products.ts
 */
const fs = require('fs');
const path = require('path');

const PRODUCTS_TS = path.join(__dirname, '..', 'data', 'products.ts');
const BACKUP_DIR = path.join(__dirname, '..', 'data', 'backups');

console.log('🔧 Eliminando comas dobles de products.ts...\n');

// 1. Crear backup
if (!fs.existsSync(BACKUP_DIR)) {
  fs.mkdirSync(BACKUP_DIR, { recursive: true });
}
const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
const backupPath = path.join(BACKUP_DIR, `products-fix-commas-${timestamp}.ts`);
fs.copyFileSync(PRODUCTS_TS, backupPath);
console.log(`✅ Backup creado: ${path.basename(backupPath)}\n`);

// 2. Leer archivo
let content = fs.readFileSync(PRODUCTS_TS, 'utf8');

// 3. Contar comas dobles antes
const doubleCommasBefore = (content.match(/\},\s*,/g) || []).length;
console.log(`❌ Comas dobles encontradas: ${doubleCommasBefore}\n`);

// 4. Eliminar comas dobles
// Reemplazar },,  con },
content = content.replace(/\},\s*,/g, '},');

// 5. Contar después
const doubleCommasAfter = (content.match(/\},\s*,/g) || []).length;

// 6. Escribir archivo
fs.writeFileSync(PRODUCTS_TS, content, 'utf8');

console.log(`✅ Comas dobles eliminadas: ${doubleCommasBefore - doubleCommasAfter}`);
console.log(`📊 Comas dobles restantes: ${doubleCommasAfter}\n`);

if (doubleCommasAfter === 0) {
  console.log('🎉 ¡Archivo limpiado correctamente!\n');
} else {
  console.log('⚠️  Aún hay algunas comas dobles. Puede requerir limpieza manual.\n');
}
