#!/usr/bin/env node

/**
 * AUTOMATED TESTS SUITE
 * Tests que se pueden ejecutar sin interacción manual
 */

const fs = require('fs');
const path = require('path');

console.log('🧪 INICIANDO TESTS AUTOMATIZADOS\n');
console.log('═'.repeat(80));

const results = {
  passed: [],
  failed: [],
  warnings: []
};

function pass(test) {
  results.passed.push(test);
  console.log(`✅ PASS: ${test}`);
}

function fail(test, reason) {
  results.failed.push({ test, reason });
  console.log(`❌ FAIL: ${test}`);
  console.log(`   Razón: ${reason}`);
}

function warn(test, reason) {
  results.warnings.push({ test, reason });
  console.log(`⚠️  WARN: ${test}`);
  console.log(`   Razón: ${reason}`);
}

// ============================================================================
// 1. TESTS DE ESTRUCTURA DE ARCHIVOS
// ============================================================================
console.log('\n📁 1. TESTS DE ESTRUCTURA DE ARCHIVOS');
console.log('─'.repeat(80));

// Test: Archivos críticos existen
const criticalFiles = [
  'package.json',
  'next.config.js',
  'tsconfig.json',
  'app/layout.tsx',
  'app/page.tsx',
  '.env.local',
  'data/products.ts',
  'contexts/CartContext.tsx',
];

criticalFiles.forEach(file => {
  if (fs.existsSync(file)) {
    pass(`Archivo crítico existe: ${file}`);
  } else {
    fail(`Archivo crítico falta: ${file}`, 'Archivo requerido no encontrado');
  }
});

// Test: Estructura de carpetas
const requiredDirs = ['app', 'components', 'contexts', 'data', 'lib', 'public'];
requiredDirs.forEach(dir => {
  if (fs.existsSync(dir)) {
    pass(`Carpeta requerida existe: ${dir}`);
  } else {
    fail(`Carpeta requerida falta: ${dir}`, 'Carpeta necesaria no encontrada');
  }
});

// ============================================================================
// 2. TESTS DE CONFIGURACIÓN
// ============================================================================
console.log('\n⚙️  2. TESTS DE CONFIGURACIÓN');
console.log('─'.repeat(80));

// Test: package.json válido
try {
  const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  pass('package.json es JSON válido');

  // Verificar scripts importantes
  const requiredScripts = ['dev', 'build', 'start'];
  requiredScripts.forEach(script => {
    if (pkg.scripts && pkg.scripts[script]) {
      pass(`Script "${script}" existe`);
    } else {
      fail(`Script "${script}" falta`, 'Script necesario no definido');
    }
  });

  // Verificar dependencias críticas
  const criticalDeps = ['next', 'react', 'react-dom'];
  criticalDeps.forEach(dep => {
    if (pkg.dependencies && pkg.dependencies[dep]) {
      pass(`Dependencia crítica instalada: ${dep}`);
    } else {
      fail(`Dependencia crítica falta: ${dep}`, 'Dependencia necesaria no instalada');
    }
  });
} catch (error) {
  fail('package.json inválido', error.message);
}

// Test: .env.local existe
if (fs.existsSync('.env.local')) {
  pass('.env.local existe');
  const envContent = fs.readFileSync('.env.local', 'utf8');

  // Verificar variables críticas (sin mostrar valores)
  const requiredEnvVars = [
    'DATABASE_URL',
    'NEXTAUTH_SECRET',
    'NEXTAUTH_URL',
    'CULQI_PUBLIC_KEY'
  ];

  requiredEnvVars.forEach(envVar => {
    if (envContent.includes(envVar)) {
      pass(`Variable de entorno definida: ${envVar}`);
    } else {
      fail(`Variable de entorno falta: ${envVar}`, 'Variable requerida no definida');
    }
  });
} else {
  fail('.env.local no existe', 'Archivo de configuración falta');
}

// Test: next.config.js válido
try {
  const nextConfig = fs.readFileSync('next.config.js', 'utf8');
  pass('next.config.js existe');

  if (nextConfig.includes('images')) {
    pass('Configuración de imágenes presente');
  } else {
    warn('Configuración de imágenes ausente', 'Puede afectar optimización');
  }
} catch (error) {
  fail('next.config.js inválido', error.message);
}

// ============================================================================
// 3. TESTS DE ASSETS - IMÁGENES
// ============================================================================
console.log('\n🖼️  3. TESTS DE ASSETS - IMÁGENES');
console.log('─'.repeat(80));

// Test: Carpeta de imágenes existe
if (fs.existsSync('public')) {
  pass('Carpeta public/ existe');

  // Verificar imágenes hero
  const heroImages = ['hero-woman.jpg'];
  heroImages.forEach(img => {
    if (fs.existsSync(`public/${img}`)) {
      pass(`Hero image existe: ${img}`);
    } else {
      fail(`Hero image falta: ${img}`, 'Imagen crítica no encontrada');
    }
  });

  // Verificar placeholder
  if (fs.existsSync('public/placeholder.svg')) {
    pass('Placeholder existe');
  } else {
    warn('Placeholder no existe', 'Recomendado tener fallback');
  }
} else {
  fail('Carpeta public/ no existe', 'Carpeta de assets falta');
}

// Test: Imágenes de productos
try {
  const productsFile = fs.readFileSync('data/products.ts', 'utf8');

  // Contar referencias a placeholder
  const placeholderCount = (productsFile.match(/placeholder\.svg/g) || []).length;
  if (placeholderCount > 0) {
    warn(`${placeholderCount} productos usando placeholder`, 'Productos sin imagen real');
  } else {
    pass('No hay productos con placeholder');
  }

  // Verificar que hay productos definidos
  if (productsFile.includes('export const products')) {
    pass('Array de productos definido');
  } else {
    fail('Array de productos no encontrado', 'data/products.ts incompleto');
  }
} catch (error) {
  fail('No se puede leer data/products.ts', error.message);
}

// ============================================================================
// 4. TESTS DE CÓDIGO - IMPORTS Y SINTAXIS
// ============================================================================
console.log('\n💻 4. TESTS DE CÓDIGO');
console.log('─'.repeat(80));

// Test: No hay console.log en producción
const componentsDir = 'components';
if (fs.existsSync(componentsDir)) {
  let consoleLogCount = 0;

  function checkConsoleLogsRecursive(dir) {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);

      if (stat.isDirectory()) {
        checkConsoleLogsRecursive(filePath);
      } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
        const content = fs.readFileSync(filePath, 'utf8');
        const matches = content.match(/console\.log/g);
        if (matches) {
          consoleLogCount += matches.length;
        }
      }
    });
  }

  checkConsoleLogsRecursive(componentsDir);

  if (consoleLogCount > 5) {
    warn(`${consoleLogCount} console.log encontrados`, 'Limpiar antes de producción');
  } else {
    pass(`Solo ${consoleLogCount} console.log (aceptable)`);
  }
}

// Test: "use client" donde es necesario
const clientComponents = [
  'components/VialineHome.tsx',
  'components/GymRail.tsx',
  'contexts/CartContext.tsx',
];

clientComponents.forEach(file => {
  if (fs.existsSync(file)) {
    const content = fs.readFileSync(file, 'utf8');
    if (content.includes('"use client"') || content.includes("'use client'")) {
      pass(`"use client" presente en ${file}`);
    } else {
      warn(`"use client" ausente en ${file}`, 'Puede causar errores si usa hooks');
    }
  }
});

// ============================================================================
// 5. TESTS DE SEGURIDAD
// ============================================================================
console.log('\n🔒 5. TESTS DE SEGURIDAD');
console.log('─'.repeat(80));

// Test: No hay secrets hardcodeados
function checkForSecrets(dir) {
  const dangerousPatterns = [
    /sk_test_[a-zA-Z0-9]+/g, // Culqi secret key
    /sk_live_[a-zA-Z0-9]+/g,
    /password\s*=\s*["'][^"']+["']/gi,
    /api_key\s*=\s*["'][^"']+["']/gi,
  ];

  let secretsFound = 0;

  function scanFile(filePath) {
    if (filePath.includes('node_modules') || filePath.includes('.next')) return;

    const ext = path.extname(filePath);
    if (!['.ts', '.tsx', '.js', '.jsx'].includes(ext)) return;

    try {
      const content = fs.readFileSync(filePath, 'utf8');
      dangerousPatterns.forEach(pattern => {
        if (pattern.test(content)) {
          secretsFound++;
        }
      });
    } catch (e) {
      // Ignorar archivos no legibles
    }
  }

  function scanDirectory(dir) {
    try {
      const files = fs.readdirSync(dir);
      files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
          scanDirectory(filePath);
        } else {
          scanFile(filePath);
        }
      });
    } catch (e) {
      // Ignorar carpetas no accesibles
    }
  }

  scanDirectory(dir);
  return secretsFound;
}

const secretsCount = checkForSecrets('.');
if (secretsCount === 0) {
  pass('No hay secrets hardcodeados visibles');
} else {
  fail(`${secretsCount} posibles secrets encontrados`, 'CRÍTICO: Revisar y mover a .env');
}

// Test: .gitignore incluye archivos sensibles
if (fs.existsSync('.gitignore')) {
  const gitignore = fs.readFileSync('.gitignore', 'utf8');
  const requiredIgnores = ['.env.local', '.env', 'node_modules'];

  requiredIgnores.forEach(pattern => {
    if (gitignore.includes(pattern)) {
      pass(`.gitignore incluye: ${pattern}`);
    } else {
      fail(`.gitignore falta: ${pattern}`, 'Archivo sensible puede subirse a git');
    }
  });
} else {
  fail('.gitignore no existe', 'CRÍTICO: Archivos sensibles pueden subirse');
}

// ============================================================================
// 6. TESTS DE DATABASE SCHEMA
// ============================================================================
console.log('\n🗄️  6. TESTS DE DATABASE');
console.log('─'.repeat(80));

// Test: Schema de Prisma existe
if (fs.existsSync('prisma/schema.prisma')) {
  pass('Schema de Prisma existe');

  const schema = fs.readFileSync('prisma/schema.prisma', 'utf8');

  // Verificar modelos críticos
  const requiredModels = ['User', 'Order', 'Session'];
  requiredModels.forEach(model => {
    if (schema.includes(`model ${model}`)) {
      pass(`Modelo ${model} definido`);
    } else {
      warn(`Modelo ${model} no encontrado`, 'Puede afectar funcionalidad');
    }
  });
} else {
  warn('Schema de Prisma no encontrado', 'Si usas DB, deberías tener schema');
}

// ============================================================================
// 7. TESTS DE TypeScript
// ============================================================================
console.log('\n📘 7. TESTS DE TypeScript');
console.log('─'.repeat(80));

// Test: tsconfig.json válido
try {
  const tsconfig = JSON.parse(fs.readFileSync('tsconfig.json', 'utf8'));
  pass('tsconfig.json es JSON válido');

  if (tsconfig.compilerOptions) {
    pass('compilerOptions definidas');

    // Verificar strict mode
    if (tsconfig.compilerOptions.strict) {
      pass('Strict mode habilitado');
    } else {
      warn('Strict mode deshabilitado', 'Recomendado para mejor type safety');
    }
  }
} catch (error) {
  fail('tsconfig.json inválido', error.message);
}

// ============================================================================
// RESUMEN FINAL
// ============================================================================
console.log('\n');
console.log('═'.repeat(80));
console.log('📊 RESUMEN DE TESTS AUTOMATIZADOS');
console.log('═'.repeat(80));

const total = results.passed.length + results.failed.length + results.warnings.length;
const passRate = ((results.passed.length / total) * 100).toFixed(1);

console.log(`\n✅ PASADOS:    ${results.passed.length}`);
console.log(`❌ FALLADOS:   ${results.failed.length}`);
console.log(`⚠️  WARNINGS:   ${results.warnings.length}`);
console.log(`📊 TOTAL:      ${total}`);
console.log(`📈 PASS RATE:  ${passRate}%\n`);

if (results.failed.length > 0) {
  console.log('❌ TESTS FALLADOS:');
  results.failed.forEach(({ test, reason }) => {
    console.log(`   • ${test}`);
    console.log(`     → ${reason}`);
  });
  console.log();
}

if (results.warnings.length > 0) {
  console.log('⚠️  WARNINGS:');
  results.warnings.forEach(({ test, reason }) => {
    console.log(`   • ${test}`);
    console.log(`     → ${reason}`);
  });
  console.log();
}

// Exit code
if (results.failed.length > 0) {
  console.log('🔴 ALGUNOS TESTS FALLARON');
  process.exit(1);
} else {
  console.log('🎉 TODOS LOS TESTS PASARON!');
  process.exit(0);
}
