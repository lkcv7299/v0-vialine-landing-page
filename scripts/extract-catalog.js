/**
 * Script de extracción de datos del catálogo PDF de Vialine
 * Extrae código, nombre, características, tallas y precio de todos los productos
 */

const fs = require('fs');
const path = require('path');
const { PDFParse } = require('pdf-parse');

// Configuración
const PDF_PATH = path.join(__dirname, '..', 'catalogo-vialine.pdf');
const OUTPUT_JSON = path.join(__dirname, '..', 'data', 'catalogo-extracted.json');
const OUTPUT_TEXT = path.join(__dirname, '..', 'data', 'catalogo-text.txt');

/**
 * Lee y procesa el PDF completo
 */
async function extractPDFData() {
  console.log('📖 Leyendo PDF del catálogo...');
  console.log(`📄 Archivo: ${PDF_PATH}`);

  try {
    // Leer el archivo PDF
    const dataBuffer = fs.readFileSync(PDF_PATH);

    console.log('🔍 Extrayendo texto del PDF...');
    const data = await PDFParse(dataBuffer);

    console.log(`✅ PDF procesado exitosamente`);
    console.log(`📊 Total de páginas: ${data.numpages}`);
    console.log(`📝 Caracteres extraídos: ${data.text.length}`);

    // Guardar el texto completo para análisis
    fs.writeFileSync(OUTPUT_TEXT, data.text, 'utf8');
    console.log(`💾 Texto completo guardado en: ${OUTPUT_TEXT}`);

    // Extraer productos estructurados
    console.log('\n🔬 Analizando estructura y extrayendo productos...');
    const products = extractProducts(data.text);

    console.log(`\n✅ Productos extraídos: ${products.length}`);

    // Guardar JSON estructurado
    const output = {
      extractedAt: new Date().toISOString(),
      totalPages: data.numpages,
      totalProducts: products.length,
      products: products
    };

    fs.writeFileSync(OUTPUT_JSON, JSON.stringify(output, null, 2), 'utf8');
    console.log(`💾 Datos estructurados guardados en: ${OUTPUT_JSON}`);

    // Mostrar resumen
    console.log('\n📋 RESUMEN DE EXTRACCIÓN:');
    console.log('─'.repeat(50));

    if (products.length > 0) {
      console.log(`\n🎯 Primeros 5 productos encontrados:`);
      products.slice(0, 5).forEach((product, idx) => {
        console.log(`\n${idx + 1}. ${product.nombre || 'Sin nombre'}`);
        console.log(`   Código: ${product.codigo || 'N/A'}`);
        console.log(`   Precio: ${product.precio || 'N/A'}`);
        console.log(`   Tallas: ${product.tallas || 'N/A'}`);
      });
    }

    console.log('\n✅ Extracción completada exitosamente!');
    console.log(`\n📝 Revisa el archivo de texto para análisis manual: ${OUTPUT_TEXT}`);
    console.log(`📊 Revisa el JSON estructurado: ${OUTPUT_JSON}`);

  } catch (error) {
    console.error('❌ Error procesando PDF:', error);
    throw error;
  }
}

/**
 * Extrae productos del texto del PDF
 * Identifica patrones comunes en catálogos
 */
function extractProducts(text) {
  const products = [];

  // Patrones comunes a buscar:
  // - Código: números o alfanumérico (ej: "COD: 123", "Código: ABC-001")
  // - Precio: S/ seguido de números (ej: "S/ 45.00", "S/45")
  // - Tallas: XS, S, M, L, XL, XXL o números
  // - Características: palabras clave como "Suplex", "Algodón", "Manga corta"

  // Dividir por páginas o secciones
  const lines = text.split('\n');

  let currentProduct = null;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    if (!line) continue;

    // Detectar código de producto
    const codigoMatch = line.match(/(?:COD|CÓDIGO|CODE|Código|Cod\.?):?\s*([A-Z0-9\-]+)/i);
    if (codigoMatch) {
      // Si ya tenemos un producto, guardarlo
      if (currentProduct && (currentProduct.codigo || currentProduct.nombre)) {
        products.push(currentProduct);
      }

      // Iniciar nuevo producto
      currentProduct = {
        codigo: codigoMatch[1],
        nombre: '',
        precio: null,
        tallas: [],
        caracteristicas: [],
        material: null,
        categoria: null,
        rawText: []
      };
    }

    // Detectar precio
    const precioMatch = line.match(/S\/\s*(\d+(?:\.\d{2})?)/);
    if (precioMatch && currentProduct) {
      currentProduct.precio = parseFloat(precioMatch[1]);
    }

    // Detectar tallas
    const tallasMatch = line.match(/(?:TALLAS?|SIZES?|Talla):?\s*([XS\s,\-LXMLXL\d\/]+)/i);
    if (tallasMatch && currentProduct) {
      const tallasText = tallasMatch[1];
      // Extraer tallas individuales
      const tallas = tallasText.match(/\b(?:XXS|XS|S|M|L|XL|XXL|\d+)\b/gi);
      if (tallas) {
        currentProduct.tallas = [...new Set(tallas)]; // Eliminar duplicados
      }
    }

    // Detectar material
    if (/suplex/i.test(line) && currentProduct) {
      currentProduct.material = 'suplex';
    }
    if (/algod[oó]n/i.test(line) && currentProduct) {
      currentProduct.material = 'algodon';
    }

    // Detectar categoría
    if (/legging/i.test(line) && currentProduct) {
      currentProduct.categoria = 'leggings';
    }
    if (/biker/i.test(line) && currentProduct) {
      currentProduct.categoria = 'bikers';
    }
    if (/short/i.test(line) && currentProduct) {
      currentProduct.categoria = 'shorts';
    }
    if (/top/i.test(line) && currentProduct) {
      currentProduct.categoria = 'tops';
    }
    if (/body/i.test(line) && currentProduct) {
      currentProduct.categoria = 'bodys';
    }
    if (/camiseta/i.test(line) && currentProduct) {
      currentProduct.categoria = 'camisetas';
    }

    // Guardar línea en rawText para análisis manual posterior
    if (currentProduct) {
      currentProduct.rawText.push(line);

      // Si no tiene nombre y la línea parece un título (mayúsculas, longitud razonable)
      if (!currentProduct.nombre && line.length > 5 && line.length < 100) {
        // No es solo números o símbolos
        if (!/^[\d\s\-,.]+$/.test(line)) {
          currentProduct.nombre = line;
        }
      }
    }
  }

  // Guardar el último producto
  if (currentProduct && (currentProduct.codigo || currentProduct.nombre)) {
    products.push(currentProduct);
  }

  return products;
}

// Ejecutar script
if (require.main === module) {
  extractPDFData()
    .then(() => {
      console.log('\n🎉 Proceso completado!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('\n💥 Error fatal:', error);
      process.exit(1);
    });
}

module.exports = { extractPDFData, extractProducts };
