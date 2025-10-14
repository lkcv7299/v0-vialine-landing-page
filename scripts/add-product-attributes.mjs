// scripts/add-product-attributes.mjs
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const productsFile = path.join(projectRoot, 'data', 'products.ts');

// Templates de attributes por categoría y fabric
const attributesTemplates = {
  // SUPLEX
  suplex_leggings: {
    material: "Suplex liso",
    detalles: [
      "Pretina ancha para mejor soporte",
      "Corte ajustado sin transparencias",
      "Costuras planas para mayor comodidad"
    ],
    beneficios: [
      "Se adapta al cuerpo como una segunda piel",
      "Te mantiene fresca y seca durante el entrenamiento",
      "Alta resistencia y durabilidad"
    ]
  },
  suplex_bikers: {
    material: "Suplex liso",
    detalles: [
      "Pretina elástica confortable",
      "Ajuste perfecto sin marcar",
      "Largo ideal para entrenamientos"
    ],
    beneficios: [
      "Máxima libertad de movimiento",
      "Secado rápido y transpirable",
      "Ideal para entrenamientos intensos"
    ]
  },
  suplex_shorts: {
    material: "Suplex liso",
    detalles: [
      "Diseño deportivo funcional",
      "Ajuste cómodo y seguro",
      "Pretina elástica"
    ],
    beneficios: [
      "Perfecto para verano y actividades deportivas",
      "Material liviano y fresco",
      "Resistente al uso frecuente"
    ]
  },
  suplex_bodys: {
    material: "Suplex liso",
    detalles: [
      "Ajuste ceñido que define la silueta",
      "Diseño ergonómico",
      "Cierre práctico en la entrepierna"
    ],
    beneficios: [
      "Versatilidad para entrenar o uso casual",
      "No se sale ni se sube durante el movimiento",
      "Define tu figura con comodidad"
    ]
  },
  
  // ALGODÓN
  algodon_camisetas: {
    material: "Algodón Premium",
    detalles: [
      "Tejido suave y transpirable",
      "Costuras reforzadas para mayor durabilidad",
      "Corte moderno y cómodo"
    ],
    beneficios: [
      "Máxima comodidad durante todo el día",
      "Fácil de lavar y mantener",
      "Ideal para uso diario y deportivo"
    ]
  },
  algodon_tops: {
    material: "Algodón Premium",
    detalles: [
      "Diseño deportivo elegante",
      "Soporte medio confortable",
      "Tejido elástico de alta calidad"
    ],
    beneficios: [
      "Comodidad absoluta para el día a día",
      "Transpirable y fresco",
      "Perfecto para actividades ligeras"
    ]
  },
  algodon_bodys: {
    material: "Algodón Premium",
    detalles: [
      "Ajuste perfecto al cuerpo",
      "Diseño versátil y moderno",
      "Costuras suaves y confortables"
    ],
    beneficios: [
      "Suavidad incomparable",
      "Ideal para combinar con cualquier outfit",
      "Comodidad que dura todo el día"
    ]
  },
  
  // PRODUCTOS DE NIÑA
  nina_default: {
    material: "Suplex liso",
    detalles: [
      "Diseño especial para niñas",
      "Ajuste cómodo y seguro",
      "Fácil de poner y quitar"
    ],
    beneficios: [
      "Perfecta para actividades deportivas y juegos",
      "Resistente al uso diario intenso",
      "Mantiene su forma después de múltiples lavados"
    ]
  }
};

function getTemplateKey(product) {
  // Para productos de niña
  if (product.audience === 'nina') {
    return 'nina_default';
  }
  
  // Para productos de mujer
  const fabric = product.fabric || 'suplex';
  const category = product.category;
  
  // Mapear categorías a templates
  const categoryMap = {
    leggings: 'leggings',
    bikers: 'bikers',
    shorts: 'shorts',
    bodys: 'bodys',
    camisetas: 'camisetas',
    tops: 'tops',
    pescador: 'leggings', // Pescador usa template de leggings
    torero: 'leggings', // Torero usa template de leggings
    enterizos: 'bodys', // Enterizos usa template de bodys
  };
  
  const mappedCategory = categoryMap[category] || 'leggings';
  const templateKey = `${fabric}_${mappedCategory}`;
  
  // Si no existe el template exacto, usar uno por defecto
  return attributesTemplates[templateKey] ? templateKey : 
         (fabric === 'algodon' ? 'algodon_camisetas' : 'suplex_leggings');
}

function addAttributesToProduct(productText) {
  // Verificar si ya tiene attributes
  if (productText.includes('attributes:')) {
    return productText; // Ya tiene attributes, no modificar
  }
  
  // Extraer información del producto
  const categoryMatch = productText.match(/category:\s*["']([^"']+)["']/);
  const fabricMatch = productText.match(/fabric:\s*["']([^"']+)["']/);
  const audienceMatch = productText.match(/audience:\s*["']([^"']+)["']/);
  
  if (!categoryMatch || !fabricMatch || !audienceMatch) {
    return productText; // No se pudo parsear, skip
  }
  
  const product = {
    category: categoryMatch[1],
    fabric: fabricMatch[1],
    audience: audienceMatch[1]
  };
  
  const templateKey = getTemplateKey(product);
  const template = attributesTemplates[templateKey];
  
  if (!template) {
    return productText; // No hay template, skip
  }
  
  // Construir el attributes object
  const attributesCode = `  attributes: {
    material: "${template.material}",
    detalles: ${JSON.stringify(template.detalles, null, 6).replace(/\n/g, '\n    ')},
    beneficios: ${JSON.stringify(template.beneficios, null, 6).replace(/\n/g, '\n    ')}
  },`;
  
  // Insertar antes de la llave de cierre del producto
  // Buscar el patrón: audience: "...",\n  }
  const insertPattern = /(audience:\s*["'][^"']+["'],?\s*)(tags)?/;
  
  if (productText.match(insertPattern)) {
    return productText.replace(
      insertPattern,
      `$1\n${attributesCode}\n  $2`
    );
  }
  
  // Si no encuentra el patrón, intentar insertar antes del cierre
  return productText.replace(
    /(\n\s*},?\s*$)/,
    `\n${attributesCode}$1`
  );
}

async function main() {
  console.log('🚀 Adding attributes to products...\n');

  // Leer el archivo
  let content = fs.readFileSync(productsFile, 'utf-8');
  
  // Crear backup
  const backupFile = productsFile.replace('.ts', '.attributes-backup.ts');
  fs.writeFileSync(backupFile, content);
  console.log(`✅ Backup created: ${backupFile}\n`);
  
  // Dividir en productos individuales
  const products = content.split(/(?=\n\s*{[\s\n]*slug:)/g);
  
  let modified = 0;
  let skipped = 0;
  
  const updatedProducts = products.map(productText => {
    if (!productText.trim() || !productText.includes('slug:')) {
      return productText;
    }
    
    const updated = addAttributesToProduct(productText);
    
    if (updated !== productText) {
      modified++;
      // Extraer nombre del producto para logging
      const slugMatch = productText.match(/slug:\s*["']([^"']+)["']/);
      if (slugMatch) {
        console.log(`✅ Added attributes to: ${slugMatch[1]}`);
      }
    } else {
      skipped++;
    }
    
    return updated;
  });
  
  // Reconstruir el archivo
  const newContent = updatedProducts.join('');
  
  // Escribir el archivo actualizado
  fs.writeFileSync(productsFile, newContent, 'utf-8');
  
  console.log(`\n✨ Complete!`);
  console.log(`✅ Modified: ${modified} products`);
  console.log(`⏭️  Skipped: ${skipped} products (already have attributes or couldn't parse)`);
  console.log(`\n💡 Review the changes and test your site`);
  console.log(`   If something is wrong, restore from backup:`);
  console.log(`   mv ${backupFile} ${productsFile}`);
}

main().catch(console.error);
