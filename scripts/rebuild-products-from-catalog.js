/**
 * Script de reconstrucción COMPLETA de products.ts desde el catálogo
 *
 * ACCIONES:
 * 1. Actualiza TODOS los productos existentes del catálogo
 * 2. Elimina productos que NO están en catálogo (excepto niña)
 * 3. Agrega productos nuevos del catálogo
 * 4. Agrega tags especiales (códigos, características, colección)
 * 5. EL CATÁLOGO ES LA VERDAD ABSOLUTA
 */

const fs = require('fs');
const path = require('path');

// ============================================================================
// CONFIGURACIÓN
// ============================================================================

const CATALOG_JSON = path.join(__dirname, '..', 'data', 'catalogo-productos-final.json');
const PRODUCTS_TS = path.join(__dirname, '..', 'data', 'products.ts');
const OUTPUT_TS = path.join(__dirname, '..', 'data', 'products-new.ts');
const BACKUP_DIR = path.join(__dirname, '..', 'data', 'backups');

// ============================================================================
// MAPEOS Y UTILIDADES
// ============================================================================

/**
 * Normaliza un string para slug
 */
function createSlug(nombre) {
  return nombre
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .trim();
}

/**
 * Mapea categoría del catálogo a categoría de products.ts
 */
function mapCategory(categoria) {
  const mapping = {
    'Leggings': 'leggings',
    'Leggings (Slim)': 'leggings',
    'Shorts': 'shorts',
    'Ciclista/Biker': 'bikers',
    'Pescador (3/4)': 'pescador',
    'Torero': 'torero',
    'Tops/Bras Deportivos': 'tops',
    'Tops/Bodys': 'tops',
    'Bodys': 'bodysuits',
    'Enterizos': 'enterizos',
    'Camisetas': 'camisetas'
  };

  return mapping[categoria] || 'leggings';
}

/**
 * Mapea material del catálogo a fabric de products.ts
 */
function mapFabric(material) {
  // Cualquier cosa con "Algodón" es "algodon", todo lo demás es "suplex"
  if (material.includes('Algodón') || material.includes('Algodon')) {
    return 'algodon';
  }
  return 'suplex';
}

/**
 * Normaliza nombre de color y crea slug
 */
function normalizeColor(color) {
  const colorMap = {
    'Melagne': 'Melange',
    'Melange': 'Melange',
    'Azul Marino': 'Azul Marino',
    'Negro': 'Negro',
    'Blanco': 'Blanco',
    'Charcol': 'Charcol',
    'Azulino': 'Azulino',
    'Rojo': 'Rojo',
    'Beige': 'Beige',
    'Acero': 'Acero',
    'Melón': 'Melón',
    'Aqua': 'Aqua',
    'Rosado': 'Rosado',
    'Amarillo': 'Amarillo',
    'Vino': 'Vino',
    'Negro Charcol': 'Negro Charcol'
  };

  return colorMap[color] || color;
}

/**
 * Crea slug de color
 */
function createColorSlug(color) {
  return createSlug(normalizeColor(color));
}

/**
 * Obtiene código hexadecimal aproximado para un color
 */
function getColorHex(color) {
  const hexMap = {
    'Negro': '#000000',
    'Blanco': '#FFFFFF',
    'Rojo': '#D22B2B',
    'Azul Marino': '#1E3A8A',
    'Azulino': '#60A5FA',
    'Charcol': '#374151',
    'Melange': '#9CA3AF',
    'Beige': '#F5F5DC',
    'Acero': '#71717A',
    'Aqua': '#06B6D4',
    'Melón': '#FDA4AF',
    'Rosado': '#FCA5A5',
    'Amarillo': '#FDE047',
    'Vino': '#7F1D1D',
    'Negro Charcol': '#1F2937'
  };

  const normalized = normalizeColor(color);
  return hexMap[normalized] || '#9CA3AF';
}

/**
 * Genera path de imagen placeholder
 */
function getImagePath(slug, category, colorSlug, index = 1) {
  return `/productos/mujer/${category}/${slug}-${colorSlug}${index}.webp`;
}

/**
 * Lee productos existentes para extraer los de niña
 */
function extractNinaProducts() {
  console.log('📖 Extrayendo productos de niña del backup...');

  // Usar el backup más reciente
  const backupFiles = fs.readdirSync(BACKUP_DIR).filter(f => f.startsWith('products-') && f.endsWith('.ts'));
  if (backupFiles.length === 0) {
    console.warn('⚠️  No se encontró backup, no se preservarán productos de niña');
    return [];
  }

  // Ordenar por fecha y tomar el más reciente
  backupFiles.sort().reverse();
  const backupPath = path.join(BACKUP_DIR, backupFiles[0]);
  console.log(`   Usando backup: ${backupFiles[0]}`);

  const content = fs.readFileSync(backupPath, 'utf8');

  // Extraer solo el array de productos
  const productsArrayMatch = content.match(/export const products: Product\[\] = \[([\s\S]*)\]\s*export const allProducts/);
  if (!productsArrayMatch) {
    console.warn('⚠️  No se pudo parsear el backup');
    return [];
  }

  const productsArrayContent = productsArrayMatch[1];
  const ninaProducts = [];

  // Buscar productos con audience: "nina" de forma más robusta
  // Dividir por productos (bloques que empiezan con {)
  let depth = 0;
  let currentProduct = '';
  let inProduct = false;

  for (let i = 0; i < productsArrayContent.length; i++) {
    const char = productsArrayContent[i];

    if (char === '{') {
      if (depth === 0) {
        inProduct = true;
        currentProduct = '';
      }
      depth++;
    }

    if (inProduct) {
      currentProduct += char;
    }

    if (char === '}') {
      depth--;
      if (depth === 0 && inProduct) {
        // Producto completo capturado
        if (currentProduct.includes('audience: "nina"')) {
          ninaProducts.push(currentProduct);
        }
        inProduct = false;
        currentProduct = '';
      }
    }
  }

  console.log(`✅ ${ninaProducts.length} productos de niña encontrados`);
  return ninaProducts;
}

/**
 * Convierte producto del catálogo a formato products.ts
 */
function catalogToProduct(catalogProduct) {
  const slug = createSlug(catalogProduct.nombre);
  const category = mapCategory(catalogProduct.categoria);
  const fabric = mapFabric(catalogProduct.material);

  // Crear colores con estructura completa
  const colors = catalogProduct.colores.map(color => {
    const normalizedColor = normalizeColor(color);
    const colorSlug = createColorSlug(color);

    return {
      name: normalizedColor,
      slug: colorSlug,
      hex: getColorHex(color),
      images: [
        getImagePath(slug, category, colorSlug, 1),
        getImagePath(slug, category, colorSlug, 2),
        getImagePath(slug, category, colorSlug, 3),
        getImagePath(slug, category, colorSlug, 4)
      ]
    };
  });

  // Primera imagen del primer color
  const firstImage = colors.length > 0 ? colors[0].images[0] : `/productos/mujer/${category}/${slug}.webp`;

  // Crear tags con información del catálogo
  const tags = [
    `COD.${catalogProduct.codigo}`,
    catalogProduct.coleccion,
    catalogProduct.material,
    ...catalogProduct.caracteristicas
  ].filter(Boolean);

  return {
    slug,
    title: catalogProduct.nombre,
    price: catalogProduct.precio,
    image: firstImage,
    category,
    fabric,
    colors,
    sizes: catalogProduct.tallas,
    audience: 'mujer',
    tags,
    attributes: {
      material: catalogProduct.material,
      detalles: catalogProduct.caracteristicas,
      beneficios: []
    }
  };
}

/**
 * Genera código TypeScript del producto
 */
function generateProductCode(product, indent = '  ') {
  const lines = [];

  lines.push(`${indent}{`);
  lines.push(`${indent}  slug: "${product.slug}",`);
  lines.push(`${indent}  title: "${product.title}",`);
  lines.push(`${indent}  price: ${product.price},`);
  lines.push(`${indent}  image: "${product.image}",`);
  lines.push(`${indent}  category: "${product.category}",`);
  lines.push(`${indent}  fabric: "${product.fabric}",`);

  // Colors
  lines.push(`${indent}  colors: [`);
  product.colors.forEach((color, idx) => {
    lines.push(`${indent}    {`);
    lines.push(`${indent}      name: "${color.name}",`);
    lines.push(`${indent}      slug: "${color.slug}",`);
    lines.push(`${indent}      hex: "${color.hex}",`);
    lines.push(`${indent}      images: [`);
    color.images.forEach((img, imgIdx) => {
      const comma = imgIdx < color.images.length - 1 ? ',' : '';
      lines.push(`${indent}        "${img}"${comma}`);
    });
    lines.push(`${indent}      ]`);
    const comma = idx < product.colors.length - 1 ? ',' : '';
    lines.push(`${indent}    }${comma}`);
  });
  lines.push(`${indent}  ],`);

  // Sizes
  lines.push(`${indent}  sizes: [${product.sizes.map(s => `"${s}"`).join(', ')}],`);

  // Audience
  lines.push(`${indent}  audience: "${product.audience}",`);

  // Tags
  if (product.tags && product.tags.length > 0) {
    lines.push(`${indent}  tags: [`);
    product.tags.forEach((tag, idx) => {
      const comma = idx < product.tags.length - 1 ? ',' : '';
      lines.push(`${indent}    "${tag}"${comma}`);
    });
    lines.push(`${indent}  ],`);
  }

  // Attributes
  if (product.attributes) {
    lines.push(`${indent}  attributes: {`);
    lines.push(`${indent}    material: "${product.attributes.material}",`);
    lines.push(`${indent}    detalles: [`);
    product.attributes.detalles.forEach((det, idx) => {
      const comma = idx < product.attributes.detalles.length - 1 ? ',' : '';
      lines.push(`${indent}      "${det}"${comma}`);
    });
    lines.push(`${indent}    ],`);
    lines.push(`${indent}    beneficios: []`);
    lines.push(`${indent}  }`);
  }

  lines.push(`${indent}}`);

  return lines.join('\n');
}

/**
 * Crea backup del archivo original
 */
function createBackup() {
  console.log('\n💾 Creando backup...');

  if (!fs.existsSync(BACKUP_DIR)) {
    fs.mkdirSync(BACKUP_DIR, { recursive: true });
  }

  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
  const backupPath = path.join(BACKUP_DIR, `products-${timestamp}.ts`);

  fs.copyFileSync(PRODUCTS_TS, backupPath);
  console.log(`✅ Backup creado: ${backupPath}`);

  return backupPath;
}

/**
 * Genera el archivo products.ts completo
 */
function generateProductsTS(catalogProducts, ninaProductsCode) {
  console.log('\n🔨 Generando nuevo products.ts...');

  const lines = [];

  // Header
  lines.push('export type Product = {');
  lines.push('  slug: string');
  lines.push('  title: string');
  lines.push('  price: number');
  lines.push('  image: string // path under /public/productos/<category>/<slug>.jpg');
  lines.push('  category: "leggings" | "bikers" | "shorts" | "tops" | "bodysuits" | "camisetas" | "enterizos" | "pescador" | "torero"');
  lines.push('  fabric: "suplex" | "algodon"');
  lines.push('  colors: string[] | { name: string; slug: string; hex: string; image?: string; images?: string[] }[] // Support single image or gallery');
  lines.push('  sizes: string[]');
  lines.push('  audience: "mujer" | "nina"');
  lines.push('  // Optional detailed attributes for products with variants');
  lines.push('  tags?: string[]');
  lines.push('  attributes?: {');
  lines.push('    material: string');
  lines.push('    detalles: string[]');
  lines.push('    beneficios: string[]');
  lines.push('  }');
  lines.push('  inventory?: number');
  lines.push('  badge?: "nuevo" | "oferta" // Badge visual para el producto');
  lines.push('  originalPrice?: number // Precio original (para mostrar tachado en ofertas)');
  lines.push('}');
  lines.push('');
  lines.push('export const products: Product[] = [');

  // Productos del catálogo (mujer)
  const mujerProducts = catalogProducts.map(cp => catalogToProduct(cp));

  // Agrupar por categoría
  const byCategory = {};
  mujerProducts.forEach(p => {
    if (!byCategory[p.category]) {
      byCategory[p.category] = [];
    }
    byCategory[p.category].push(p);
  });

  // Orden de categorías
  const categoryOrder = ['camisetas', 'tops', 'bodysuits', 'enterizos', 'leggings', 'pescador', 'torero', 'bikers', 'shorts'];

  // Generar productos por categoría
  let isFirstCategory = true;
  categoryOrder.forEach((cat, catIdx) => {
    if (byCategory[cat] && byCategory[cat].length > 0) {
      const categoryName = cat.toUpperCase();

      // Add blank line before category (except first)
      if (!isFirstCategory) {
        lines.push('');
      }
      isFirstCategory = false;

      lines.push(`  // ${categoryName} (mujer)`);

      byCategory[cat].forEach((product, idx) => {
        const productCode = generateProductCode(product, '  ');
        // Always add comma - we'll handle the last one specially
        lines.push(productCode + ',');
        // Add blank line between products in same category
        if (idx < byCategory[cat].length - 1) {
          lines.push('');
        }
      });
    }
  });

  // Productos de niña (preservados)
  if (ninaProductsCode.length > 0) {
    lines.push('');
    lines.push('  // PRODUCTOS PARA NIÑA (preservados del archivo original)');
    ninaProductsCode.forEach((code, idx) => {
      const comma = idx < ninaProductsCode.length - 1 ? ',' : '';
      lines.push('  ' + code + comma);
    });
  } else {
    // If no niña products, remove the trailing comma from the last mujer product
    // Find the last line that ends with comma
    for (let i = lines.length - 1; i >= 0; i--) {
      if (lines[i].trim().endsWith(',')) {
        lines[i] = lines[i].replace(/,$/, '');
        break;
      }
    }
  }

  lines.push('');

  lines.push(']');
  lines.push('');
  lines.push('export const allProducts = products');
  lines.push('');

  return lines.join('\n');
}

// ============================================================================
// FUNCIÓN PRINCIPAL
// ============================================================================

async function main() {
  console.log('🚀 RECONSTRUCCIÓN COMPLETA DE PRODUCTS.TS DESDE CATÁLOGO\n');
  console.log('⚠️  EL CATÁLOGO ES LA VERDAD ABSOLUTA\n');

  try {
    // 1. Leer catálogo
    console.log('📖 Leyendo catálogo...');
    const catalogData = JSON.parse(fs.readFileSync(CATALOG_JSON, 'utf8'));
    console.log(`✅ ${catalogData.totalProducts} productos en catálogo`);

    // 2. Extraer productos de niña
    const ninaProductsCode = extractNinaProducts();

    // 3. Crear backup
    createBackup();

    // 4. Generar nuevo products.ts
    const newContent = generateProductsTS(catalogData.products, ninaProductsCode);

    // 5. Escribir archivo nuevo
    fs.writeFileSync(OUTPUT_TS, newContent, 'utf8');
    console.log(`✅ Nuevo archivo generado: ${OUTPUT_TS}`);

    // 6. Estadísticas
    console.log('\n' + '='.repeat(80));
    console.log('📊 ESTADÍSTICAS');
    console.log('='.repeat(80));
    console.log(`📦 Productos del catálogo (mujer): ${catalogData.totalProducts}`);
    console.log(`👧 Productos de niña preservados: ${ninaProductsCode.length}`);
    console.log(`✅ Total productos en nuevo archivo: ${catalogData.totalProducts + ninaProductsCode.length}`);

    console.log('\n' + '='.repeat(80));
    console.log('✅ RECONSTRUCCIÓN COMPLETADA');
    console.log('='.repeat(80));
    console.log(`\n📄 Archivo generado: ${OUTPUT_TS}`);
    console.log(`\n⚠️  IMPORTANTE: Revisa el archivo generado antes de reemplazar products.ts`);
    console.log(`\nPara aplicar los cambios:`);
    console.log(`  1. Revisa: ${OUTPUT_TS}`);
    console.log(`  2. Si todo está bien, ejecuta:`);
    console.log(`     copy "${OUTPUT_TS}" "${PRODUCTS_TS}"`);

  } catch (error) {
    console.error('\n❌ Error fatal:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

// Ejecutar script
if (require.main === module) {
  main().catch(error => {
    console.error('💥 Error no capturado:', error);
    process.exit(1);
  });
}

module.exports = { catalogToProduct, generateProductsTS };
