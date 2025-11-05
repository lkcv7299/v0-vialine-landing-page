const fs = require('fs');
const path = require('path');

const PRODUCTS_TS = path.join(__dirname, '..', 'data', 'products.ts');
const content = fs.readFileSync(PRODUCTS_TS, 'utf8');

const products = [];
const regex = /\{\s*slug:\s*["']([^"']+)["'],\s*title:\s*["']([^"']+)["']/g;
let match;

while ((match = regex.exec(content)) !== null) {
  products.push({slug: match[1], title: match[2]});
}

console.log('Total productos:', products.length);
console.log('\nProductos:');
products.forEach((p, i) => {
  console.log((i+1).toString().padStart(3), p.slug.padEnd(35), p.title);
});
