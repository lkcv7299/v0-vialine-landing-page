/**
 * Agrega los 5 tops nuevos del catálogo al products.ts
 */
const fs = require('fs');
const path = require('path');

const PRODUCTS_TS = path.join(__dirname, '..', 'data', 'products.ts');
const BACKUP_DIR = path.join(__dirname, '..', 'data', 'backups');

// Definir los 5 nuevos productos basados en el catálogo
const NEW_PRODUCTS = [
  {
    slug: "top-cod710",
    title: "Top COD.710",
    price: 29,
    image: "/placeholder.svg",
    category: "tops",
    fabric: "algodon",
    colors: [
      { name: "Blanco", slug: "blanco", hex: "#FFFFFF", image: "/placeholder.svg" },
      { name: "Negro", slug: "negro", hex: "#000000", image: "/placeholder.svg" },
      { name: "Melange", slug: "melange", hex: "#9CA3AF", image: "/placeholder.svg" },
      { name: "Beige", slug: "beige", hex: "#F5F5DC", image: "/placeholder.svg" }
    ],
    sizes: ["S", "M", "L", "XL"],
    audience: "mujer",
    tags: ["COD.710", "Colección Tops Algodón Licrado", "Algodón Licrado"],
    attributes: {
      material: "Algodón Licrado",
      detalles: [
        "Copas internas removibles",
        "Algodón licrado"
      ],
      beneficios: []
    }
  },
  {
    slug: "top-cod902",
    title: "Top COD.902",
    price: 28,
    image: "/placeholder.svg",
    category: "tops",
    fabric: "algodon",
    colors: [
      { name: "Beige", slug: "beige", hex: "#F5F5DC", image: "/placeholder.svg" }
    ],
    sizes: ["S", "M", "L", "XL"],
    audience: "mujer",
    tags: ["COD.902", "Colección Tops Algodón Licrado", "Algodón Licrado"],
    attributes: {
      material: "Algodón Licrado",
      detalles: [
        "Copas internas removibles",
        "Algodón licrado",
        "Solo disponible en Beige"
      ],
      beneficios: []
    }
  },
  {
    slug: "top-cod402",
    title: "Top COD.402",
    price: 28,
    image: "/placeholder.svg",
    category: "tops",
    fabric: "algodon",
    colors: [
      { name: "Blanco", slug: "blanco", hex: "#FFFFFF", image: "/placeholder.svg" },
      { name: "Negro", slug: "negro", hex: "#000000", image: "/placeholder.svg" },
      { name: "Melange", slug: "melange", hex: "#9CA3AF", image: "/placeholder.svg" },
      { name: "Beige", slug: "beige", hex: "#F5F5DC", image: "/placeholder.svg" }
    ],
    sizes: ["S", "M", "L", "XL"],
    audience: "mujer",
    tags: ["COD.402", "Colección Tops Algodón Licrado", "Algodón Licrado"],
    attributes: {
      material: "Algodón Licrado",
      detalles: [
        "Copas internas removibles",
        "Algodón licrado"
      ],
      beneficios: []
    }
  },
  {
    slug: "top-cod391",
    title: "Top COD.391",
    price: 28,
    image: "/placeholder.svg",
    category: "tops",
    fabric: "algodon",
    colors: [
      { name: "Blanco", slug: "blanco", hex: "#FFFFFF", image: "/placeholder.svg" },
      { name: "Negro", slug: "negro", hex: "#000000", image: "/placeholder.svg" },
      { name: "Melange", slug: "melange", hex: "#9CA3AF", image: "/placeholder.svg" },
      { name: "Beige", slug: "beige", hex: "#F5F5DC", image: "/placeholder.svg" }
    ],
    sizes: ["S", "M", "L", "XL"],
    audience: "mujer",
    tags: ["COD.391", "Colección Tops Algodón Licrado", "Algodón Licrado"],
    attributes: {
      material: "Algodón Licrado",
      detalles: [
        "Copas internas removibles",
        "Algodón licrado"
      ],
      beneficios: []
    }
  },
  {
    slug: "top-cod901",
    title: "Top COD.901",
    price: 23,
    image: "/placeholder.svg",
    category: "tops",
    fabric: "algodon",
    colors: [
      { name: "Blanco", slug: "blanco", hex: "#FFFFFF", image: "/placeholder.svg" },
      { name: "Negro", slug: "negro", hex: "#000000", image: "/placeholder.svg" },
      { name: "Melange", slug: "melange", hex: "#9CA3AF", image: "/placeholder.svg" },
      { name: "Beige", slug: "beige", hex: "#F5F5DC", image: "/placeholder.svg" }
    ],
    sizes: ["S", "M", "L", "XL"],
    audience: "mujer",
    tags: ["COD.901", "Colección Tops Algodón Licrado", "Algodón Licrado"],
    attributes: {
      material: "Algodón Licrado",
      detalles: [
        "Copas internas removibles",
        "Tiras ajustables",
        "Algodón licrado"
      ],
      beneficios: []
    }
  }
];

// Generar código TypeScript para un producto
function generateProductCode(product) {
  const lines = [];

  lines.push('  {');
  lines.push(`    slug: "${product.slug}",`);
  lines.push(`    title: "${product.title}",`);
  lines.push(`    price: ${product.price},`);
  lines.push(`    image: "${product.image}",`);
  lines.push(`    category: "${product.category}",`);
  lines.push(`    fabric: "${product.fabric}",`);

  // Colors
  lines.push('    colors: [');
  product.colors.forEach((color, idx) => {
    const comma = idx < product.colors.length - 1 ? ',' : '';
    lines.push('      {');
    lines.push(`        name: "${color.name}",`);
    lines.push(`        slug: "${color.slug}",`);
    lines.push(`        hex: "${color.hex}",`);
    lines.push(`        image: "${color.image}"`);
    lines.push(`      }${comma}`);
  });
  lines.push('    ],');

  // Sizes
  lines.push(`    sizes: ${JSON.stringify(product.sizes)},`);
  lines.push(`    audience: "${product.audience}",`);

  // Tags
  lines.push('    tags: [');
  product.tags.forEach((tag, idx) => {
    const comma = idx < product.tags.length - 1 ? ',' : '';
    lines.push(`      "${tag}"${comma}`);
  });
  lines.push('    ],');

  // Attributes
  lines.push('    attributes: {');
  lines.push(`      material: "${product.attributes.material}",`);
  lines.push('      detalles: [');
  product.attributes.detalles.forEach((det, idx) => {
    const comma = idx < product.attributes.detalles.length - 1 ? ',' : '';
    lines.push(`        "${det}"${comma}`);
  });
  lines.push('      ],');
  lines.push('      beneficios: []');
  lines.push('    }');
  lines.push('  }');

  return lines.join('\n');
}

// Crear backup
function createBackup() {
  if (!fs.existsSync(BACKUP_DIR)) {
    fs.mkdirSync(BACKUP_DIR, { recursive: true });
  }
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
  const backupPath = path.join(BACKUP_DIR, `products-${timestamp}.ts`);
  fs.copyFileSync(PRODUCTS_TS, backupPath);
  console.log(`✅ Backup creado: ${backupPath}`);
}

console.log('🚀 Agregando 5 tops nuevos del catálogo...\n');

// Leer archivo actual
const content = fs.readFileSync(PRODUCTS_TS, 'utf8');

// Encontrar el punto de inserción (después de top-brigid, antes de enterizo-tiras)
// Vamos a insertar después de todos los tops existentes

const insertAfter = 'top-brigid';
const insertPattern = new RegExp(`(\\{[\\s\\S]*?slug:\\s*"${insertAfter}"[\\s\\S]*?\\})(,?\\s*\\n)`);

const match = content.match(insertPattern);
if (!match) {
  console.error('❌ No se pudo encontrar el punto de inserción');
  process.exit(1);
}

console.log(`📍 Insertando después de: ${insertAfter}\n`);

// Generar código para los nuevos productos
const newProductsCode = NEW_PRODUCTS.map(p => {
  console.log(`✅ Creando: ${p.slug} ($${p.price}) | Tallas: ${p.sizes.join(', ')} | ${p.tags[0]}`);
  return generateProductCode(p);
}).join(',\n\n');

// Insertar los nuevos productos
const beforeInsertion = content.substring(0, match.index + match[1].length);
const afterInsertion = content.substring(match.index + match[1].length);

const newContent = beforeInsertion + ',\n\n' + newProductsCode + afterInsertion;

// Crear backup
createBackup();

// Escribir archivo
fs.writeFileSync(PRODUCTS_TS, newContent, 'utf8');

console.log('\n✅ Archivo actualizado: data/products.ts');
console.log(`\n📊 5 productos nuevos agregados:`);
console.log('   1. Top COD.710 ($29)');
console.log('   2. Top COD.902 ($28)');
console.log('   3. Top COD.402 ($28)');
console.log('   4. Top COD.391 ($28)');
console.log('   5. Top COD.901 ($23)');
console.log('\n🎉 COMPLETADO - Productos agregados con éxito');
