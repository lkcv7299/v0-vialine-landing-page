/**
 * Script de actualización inteligente de productos desde el catálogo Vialine
 *
 * CARACTERÍSTICAS:
 * - Compara productos del catálogo con data/products.ts
 * - Identifica productos nuevos vs existentes
 * - Detecta cambios en precios, tallas, colores, características
 * - Genera reporte detallado de cambios
 * - Modo dry-run (solo reporte) y modo apply (aplica cambios)
 * - Crea backup antes de aplicar cambios
 *
 * USO:
 * node scripts/update-products-from-catalog.js --dry-run  (solo reporte)
 * node scripts/update-products-from-catalog.js --apply     (aplica cambios)
 */

const fs = require('fs');
const path = require('path');

// ============================================================================
// CONFIGURACIÓN
// ============================================================================

const CATALOG_JSON = path.join(__dirname, '..', 'data', 'catalogo-productos-final.json');
const PRODUCTS_TS = path.join(__dirname, '..', 'data', 'products.ts');
const BACKUP_DIR = path.join(__dirname, '..', 'data', 'backups');

// ============================================================================
// UTILIDADES
// ============================================================================

/**
 * Normaliza un string para comparación (elimina acentos, espacios, mayúsculas)
 */
function normalize(str) {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "")
    .trim();
}

/**
 * Crea un slug a partir de un nombre
 */
function createSlug(nombre) {
  return nombre
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
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
    'Pescador (3/4)': 'capris',
    'Torero': 'capris',
    'Tops/Bras Deportivos': 'tops',
    'Tops/Bodys': 'tops',
    'Bodys': 'bodysuits',
    'Enterizos': 'bodysuits',
    'Camisetas': 'camisetas'
  };

  return mapping[categoria] || 'leggings';
}

/**
 * Mapea material del catálogo a material de products.ts
 */
function mapMaterial(material) {
  const mapping = {
    'Suplex': 'suplex',
    'Suplex Perchado': 'suplex',
    'Suplex Liso': 'suplex',
    'Suplex Liso de Alta Elongación': 'suplex',
    'Suplex + Spandex': 'suplex',
    'Suplex + Algodón': 'suplex',
    'Suplex + Algodón Licrado': 'suplex',
    'Algodón Licrado': 'algodon',
    'Algodón Licra': 'algodon',
    'Algodón Gamusa': 'algodon',
    'Fresh Terry': 'frenchTerry'
  };

  return mapping[material] || 'suplex';
}

/**
 * Normaliza nombre de color
 */
function normalizeColor(color) {
  const mapping = {
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
    'Negro-Charcol': 'Negro Charcol'
  };

  return mapping[color] || color;
}

/**
 * Lee y parsea el archivo products.ts de manera simplificada
 * Extrae información básica sin parsear TypeScript completo
 */
function readProductsTS() {
  console.log('📖 Leyendo products.ts...');
  const content = fs.readFileSync(PRODUCTS_TS, 'utf8');

  const products = [];

  // Buscar bloques de productos individuales usando regex
  // Cada producto empieza con { y tiene slug, title, price, etc.
  const productMatches = content.matchAll(/\{[\s\S]*?slug:\s*["']([^"']+)["'][\s\S]*?title:\s*["']([^"']+)["'][\s\S]*?price:\s*(\d+)[\s\S]*?category:\s*["']([^"']+)["'][\s\S]*?fabric:\s*["']([^"']+)["'][\s\S]*?sizes:\s*\[([^\]]*)\][\s\S]*?\}/g);

  for (const match of productMatches) {
    const [fullMatch, slug, title, price, category, fabric, sizesStr] = match;

    // Extraer tallas
    const sizes = sizesStr.match(/["']([^"']+)["']/g)?.map(s => s.replace(/["']/g, '')) || [];

    // Extraer colores (buscar dentro del bloque del producto)
    const colorMatches = fullMatch.matchAll(/name:\s*["']([^"']+)["']/g);
    const colors = [];
    for (const colorMatch of colorMatches) {
      colors.push({ name: colorMatch[1] });
    }

    products.push({
      slug,
      title,
      price: parseInt(price),
      category,
      material: fabric, // usar fabric como material
      sizes,
      colors: colors.length > 0 ? colors : []
    });
  }

  console.log(`✅ ${products.length} productos encontrados en products.ts`);

  if (products.length === 0) {
    console.warn('⚠️  No se encontraron productos. El parser puede necesitar ajustes.');
  }

  return products;
}

/**
 * Encuentra un producto en products.ts por código o nombre similar
 */
function findExistingProduct(catalogProduct, existingProducts) {
  const codigo = catalogProduct.codigo;
  const nombre = normalize(catalogProduct.nombre);

  // Buscar por código en el slug o title
  const bySlug = existingProducts.find(p =>
    p.slug && p.slug.includes(codigo.toLowerCase())
  );

  if (bySlug) {
    return { product: bySlug, matchType: 'slug-codigo' };
  }

  // Buscar por código en el título
  const byTitle = existingProducts.find(p =>
    normalize(p.title).includes(codigo.toLowerCase())
  );

  if (byTitle) {
    return { product: byTitle, matchType: 'title-codigo' };
  }

  // Buscar por nombre similar (60% de similitud)
  const byName = existingProducts.find(p => {
    const existingName = normalize(p.title);
    const similarity = calculateSimilarity(nombre, existingName);
    return similarity > 0.6;
  });

  if (byName) {
    return { product: byName, matchType: 'name-similarity' };
  }

  return null;
}

/**
 * Calcula similitud entre dos strings (0-1)
 */
function calculateSimilarity(str1, str2) {
  const longer = str1.length > str2.length ? str1 : str2;
  const shorter = str1.length > str2.length ? str2 : str1;

  if (longer.length === 0) return 1.0;

  const editDistance = levenshteinDistance(longer, shorter);
  return (longer.length - editDistance) / longer.length;
}

/**
 * Calcula distancia de Levenshtein
 */
function levenshteinDistance(str1, str2) {
  const matrix = [];

  for (let i = 0; i <= str2.length; i++) {
    matrix[i] = [i];
  }

  for (let j = 0; j <= str1.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= str2.length; i++) {
    for (let j = 1; j <= str1.length; j++) {
      if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }

  return matrix[str2.length][str1.length];
}

/**
 * Compara un producto del catálogo con uno existente y detecta cambios
 */
function compareProducts(catalogProduct, existingProduct) {
  const changes = [];

  // Comparar precio
  if (catalogProduct.precio !== existingProduct.price) {
    changes.push({
      field: 'price',
      old: existingProduct.price,
      new: catalogProduct.precio
    });
  }

  // Comparar tallas
  const existingSizes = existingProduct.sizes || [];
  const newSizes = catalogProduct.tallas || [];
  const sizesAdded = newSizes.filter(s => !existingSizes.includes(s));
  const sizesRemoved = existingSizes.filter(s => !newSizes.includes(s));

  if (sizesAdded.length > 0 || sizesRemoved.length > 0) {
    changes.push({
      field: 'sizes',
      old: existingSizes,
      new: newSizes,
      added: sizesAdded,
      removed: sizesRemoved
    });
  }

  // Comparar colores (solo nombres, no imágenes)
  const existingColors = (existingProduct.colors || []).map(c => normalize(c.name));
  const newColors = (catalogProduct.colores || []).map(c => normalize(normalizeColor(c)));
  const colorsAdded = newColors.filter(c => !existingColors.includes(c));
  const colorsRemoved = existingColors.filter(c => !newColors.includes(c));

  if (colorsAdded.length > 0 || colorsRemoved.length > 0) {
    changes.push({
      field: 'colors',
      old: existingProduct.colors?.map(c => c.name) || [],
      new: catalogProduct.colores.map(normalizeColor),
      added: colorsAdded,
      removed: colorsRemoved
    });
  }

  // Comparar material
  const mappedMaterial = mapMaterial(catalogProduct.material);
  if (mappedMaterial !== existingProduct.material) {
    changes.push({
      field: 'material',
      old: existingProduct.material,
      new: mappedMaterial
    });
  }

  return changes;
}

/**
 * Genera reporte de análisis
 */
function generateReport(catalogData, existingProducts, analysis) {
  console.log('\n' + '='.repeat(80));
  console.log('📊 REPORTE DE ANÁLISIS - CATÁLOGO VIALINE');
  console.log('='.repeat(80));
  console.log(`\n📅 Fecha: ${new Date().toLocaleString()}`);
  console.log(`📦 Productos en catálogo: ${catalogData.totalProducts}`);
  console.log(`💾 Productos en products.ts: ${existingProducts.length}`);

  console.log('\n' + '-'.repeat(80));
  console.log('🔍 RESUMEN DE CAMBIOS');
  console.log('-'.repeat(80));
  console.log(`🆕 Productos nuevos: ${analysis.newProducts.length}`);
  console.log(`🔄 Productos a actualizar: ${analysis.productsToUpdate.length}`);
  console.log(`✅ Productos sin cambios: ${analysis.unchangedProducts.length}`);
  console.log(`❓ Productos no encontrados en catálogo: ${analysis.notInCatalog.length}`);

  // Productos nuevos
  if (analysis.newProducts.length > 0) {
    console.log('\n' + '-'.repeat(80));
    console.log('🆕 PRODUCTOS NUEVOS A AGREGAR');
    console.log('-'.repeat(80));

    analysis.newProducts.forEach((product, idx) => {
      console.log(`\n${idx + 1}. ${product.nombre} (COD.${product.codigo})`);
      console.log(`   Precio: S/ ${product.precio}`);
      console.log(`   Categoría: ${product.categoria} → ${mapCategory(product.categoria)}`);
      console.log(`   Material: ${product.material} → ${mapMaterial(product.material)}`);
      console.log(`   Tallas: ${product.tallas.join(', ')}`);
      console.log(`   Colores: ${product.colores.map(normalizeColor).join(', ')}`);
      console.log(`   Colección: ${product.coleccion}`);
    });
  }

  // Productos a actualizar
  if (analysis.productsToUpdate.length > 0) {
    console.log('\n' + '-'.repeat(80));
    console.log('🔄 PRODUCTOS A ACTUALIZAR');
    console.log('-'.repeat(80));

    analysis.productsToUpdate.forEach((item, idx) => {
      console.log(`\n${idx + 1}. ${item.catalogProduct.nombre} (COD.${item.catalogProduct.codigo})`);
      console.log(`   Match: ${item.existingProduct.title} (${item.matchType})`);
      console.log(`   Cambios detectados:`);

      item.changes.forEach(change => {
        if (change.field === 'price') {
          console.log(`     • Precio: S/ ${change.old} → S/ ${change.new}`);
        } else if (change.field === 'sizes') {
          if (change.added.length > 0) {
            console.log(`     • Tallas agregadas: ${change.added.join(', ')}`);
          }
          if (change.removed.length > 0) {
            console.log(`     • Tallas removidas: ${change.removed.join(', ')}`);
          }
        } else if (change.field === 'colors') {
          if (change.added.length > 0) {
            console.log(`     • Colores agregados: ${change.added.join(', ')}`);
          }
          if (change.removed.length > 0) {
            console.log(`     • Colores removidos: ${change.removed.join(', ')}`);
          }
        } else if (change.field === 'material') {
          console.log(`     • Material: ${change.old} → ${change.new}`);
        }
      });
    });
  }

  // Productos sin cambios
  if (analysis.unchangedProducts.length > 0) {
    console.log('\n' + '-'.repeat(80));
    console.log('✅ PRODUCTOS SIN CAMBIOS (primeros 10)');
    console.log('-'.repeat(80));

    analysis.unchangedProducts.slice(0, 10).forEach((item, idx) => {
      console.log(`${idx + 1}. ${item.catalogProduct.nombre} (COD.${item.catalogProduct.codigo})`);
    });

    if (analysis.unchangedProducts.length > 10) {
      console.log(`   ... y ${analysis.unchangedProducts.length - 10} más`);
    }
  }

  // Productos no encontrados en catálogo
  if (analysis.notInCatalog.length > 0) {
    console.log('\n' + '-'.repeat(80));
    console.log('❓ PRODUCTOS EN PRODUCTS.TS NO ENCONTRADOS EN CATÁLOGO');
    console.log('-'.repeat(80));
    console.log('(Estos productos permanecerán sin cambios)\n');

    analysis.notInCatalog.forEach((product, idx) => {
      console.log(`${idx + 1}. ${product.title} (${product.slug})`);
    });
  }

  console.log('\n' + '='.repeat(80));
}

/**
 * Analiza diferencias entre catálogo y products.ts
 */
function analyzeDifferences(catalogData, existingProducts) {
  console.log('\n🔍 Analizando diferencias...\n');

  const analysis = {
    newProducts: [],
    productsToUpdate: [],
    unchangedProducts: [],
    notInCatalog: []
  };

  // Analizar productos del catálogo
  catalogData.products.forEach(catalogProduct => {
    const found = findExistingProduct(catalogProduct, existingProducts);

    if (!found) {
      // Producto nuevo
      analysis.newProducts.push(catalogProduct);
    } else {
      // Producto existente - comparar cambios
      const changes = compareProducts(catalogProduct, found.product);

      if (changes.length > 0) {
        analysis.productsToUpdate.push({
          catalogProduct,
          existingProduct: found.product,
          matchType: found.matchType,
          changes
        });
      } else {
        analysis.unchangedProducts.push({
          catalogProduct,
          existingProduct: found.product,
          matchType: found.matchType
        });
      }
    }
  });

  // Encontrar productos en products.ts que no están en el catálogo
  const catalogCodes = catalogData.products.map(p => p.codigo.toLowerCase());
  const catalogNames = catalogData.products.map(p => normalize(p.nombre));

  existingProducts.forEach(existingProduct => {
    const hasCode = catalogCodes.some(code =>
      existingProduct.slug.includes(code) ||
      normalize(existingProduct.title).includes(code)
    );

    const hasName = catalogNames.some(name => {
      const similarity = calculateSimilarity(name, normalize(existingProduct.title));
      return similarity > 0.6;
    });

    if (!hasCode && !hasName) {
      analysis.notInCatalog.push(existingProduct);
    }
  });

  return analysis;
}

/**
 * Crea backup de products.ts
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
 * Aplica cambios a products.ts
 */
function applyChanges(analysis) {
  console.log('\n🔨 Aplicando cambios...');

  // Esta es una versión simplificada
  // En producción, necesitarías un parser más robusto
  console.log('⚠️  NOTA: Esta es una función placeholder.');
  console.log('    Para aplicar cambios reales, necesitarás:');
  console.log('    1. Parser TypeScript más robusto (usando @typescript/compiler)');
  console.log('    2. Lógica para agregar/actualizar productos');
  console.log('    3. Formateo del código resultante');
  console.log('    4. Validación de sintaxis');

  console.log('\n📋 Cambios que se aplicarían:');
  console.log(`   • ${analysis.newProducts.length} productos nuevos`);
  console.log(`   • ${analysis.productsToUpdate.length} productos actualizados`);

  return false; // No aplicar cambios aún
}

// ============================================================================
// FUNCIÓN PRINCIPAL
// ============================================================================

async function main() {
  console.log('🚀 SCRIPT DE ACTUALIZACIÓN DE PRODUCTOS - VIALINE\n');

  // Verificar argumentos
  const args = process.argv.slice(2);
  const isDryRun = args.includes('--dry-run');
  const isApply = args.includes('--apply');

  if (!isDryRun && !isApply) {
    console.error('❌ Error: Debes especificar --dry-run o --apply');
    console.log('\nUso:');
    console.log('  node scripts/update-products-from-catalog.js --dry-run  (solo reporte)');
    console.log('  node scripts/update-products-from-catalog.js --apply     (aplica cambios)');
    process.exit(1);
  }

  try {
    // Leer catálogo
    console.log('📖 Leyendo catálogo...');
    const catalogData = JSON.parse(fs.readFileSync(CATALOG_JSON, 'utf8'));
    console.log(`✅ ${catalogData.totalProducts} productos en catálogo`);

    // Leer products.ts
    const existingProducts = readProductsTS();

    // Analizar diferencias
    const analysis = analyzeDifferences(catalogData, existingProducts);

    // Generar reporte
    generateReport(catalogData, existingProducts, analysis);

    // Aplicar cambios si se especificó
    if (isApply) {
      console.log('\n' + '='.repeat(80));
      console.log('⚠️  MODO APPLY - SE APLICARÁN CAMBIOS');
      console.log('='.repeat(80));

      // Crear backup
      createBackup();

      // Aplicar cambios
      const success = applyChanges(analysis);

      if (success) {
        console.log('\n✅ Cambios aplicados exitosamente!');
      } else {
        console.log('\n⚠️  Cambios no aplicados (requiere implementación completa)');
      }
    } else {
      console.log('\n' + '='.repeat(80));
      console.log('ℹ️  MODO DRY-RUN - NO SE APLICARON CAMBIOS');
      console.log('='.repeat(80));
      console.log('\nPara aplicar los cambios, ejecuta:');
      console.log('  node scripts/update-products-from-catalog.js --apply');
    }

    console.log('\n🎉 Proceso completado!\n');

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

module.exports = { analyzeDifferences, compareProducts, findExistingProduct };
