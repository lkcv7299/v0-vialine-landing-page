/**
 * Inserta productos de niña en products-new.ts
 */

const fs = require('fs');
const path = require('path');

const PRODUCTS_NEW = path.join(__dirname, '..', 'data', 'products-new.ts');
const NINA_TEMP = path.join(__dirname, '..', 'data', 'nina-temp.txt');
const OUTPUT = path.join(__dirname, '..', 'data', 'products-final.ts');

// Leer archivos
let productsNew = fs.readFileSync(PRODUCTS_NEW, 'utf8');
const ninaProducts = fs.readFileSync(NINA_TEMP, 'utf8');

// Encontrar el cierre del array y reemplazar
const closeArray = '\n]\n\nexport const allProducts = products';
const newClose = ',\n\n' + ninaProducts + closeArray;

productsNew = productsNew.replace(closeArray, newClose);

// Guardar
fs.writeFileSync(OUTPUT, productsNew, 'utf8');

console.log('✅ Productos de niña agregados');
console.log(`💾 Archivo guardado: ${OUTPUT}`);
