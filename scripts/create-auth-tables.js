// scripts/create-auth-tables.js
const { sql } = require('@vercel/postgres');
const { readFileSync } = require('fs');
const { join } = require('path');

// 🔧 Leer .env.local manualmente (SIN dependencias)
function loadEnvLocal() {
  try {
    const envPath = join(process.cwd(), '.env.local')
    const envFile = readFileSync(envPath, 'utf8')
    
    // Parsear línea por línea
    envFile.split('\n').forEach(line => {
      line = line.trim()
      // Ignorar comentarios y líneas vacías
      if (!line || line.startsWith('#')) return
      
      // Parsear KEY=VALUE
      const match = line.match(/^([^=]+)=(.*)$/)
      if (match) {
        const key = match[1].trim()
        let value = match[2].trim()
        
        // Remover comillas si existen
        if (value.startsWith('"') && value.endsWith('"')) {
          value = value.slice(1, -1)
        }
        
        // Solo establecer si no existe ya
        if (!process.env[key]) {
          process.env[key] = value
        }
      }
    })
    
    console.log('✅ Variables de entorno cargadas desde .env.local\n')
  } catch (error) {
    console.error('❌ Error leyendo .env.local:', error.message)
    console.error('\n💡 SOLUCIÓN: Asegúrate de tener un archivo .env.local con POSTGRES_URL\n')
    process.exit(1)
  }
}

// Cargar variables ANTES de todo
loadEnvLocal()

async function createAuthTables() {
  // Verificar que tenemos la URL de la base de datos
  if (!process.env.POSTGRES_URL && !process.env.DATABASE_URL) {
    console.error('❌ ERROR: No se encontró POSTGRES_URL en .env.local')
    console.error('\n💡 SOLUCIÓN:')
    console.error('1. Abre .env.local')
    console.error('2. Agrega: POSTGRES_URL="tu-connection-string-aqui"\n')
    process.exit(1)
  }
  try {
    console.log('🚀 Creando tablas de autenticación...\n');

    // ====================================
    // TABLA: users
    // ====================================
    console.log('📋 Creando tabla users...');
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        email_verified TIMESTAMP,
        password_hash VARCHAR(255),
        image VARCHAR(500),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    await sql`CREATE INDEX IF NOT EXISTS idx_users_email ON users(email)`;
    console.log('✅ Tabla users creada\n');

    // ====================================
    // TABLA: accounts
    // ====================================
    console.log('📋 Creando tabla accounts...');
    await sql`
      CREATE TABLE IF NOT EXISTS accounts (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        type VARCHAR(50) NOT NULL,
        provider VARCHAR(50) NOT NULL,
        provider_account_id VARCHAR(255) NOT NULL,
        refresh_token TEXT,
        access_token TEXT,
        expires_at INTEGER,
        token_type VARCHAR(50),
        scope TEXT,
        id_token TEXT,
        session_state TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(provider, provider_account_id)
      )
    `;
    await sql`CREATE INDEX IF NOT EXISTS idx_accounts_user_id ON accounts(user_id)`;
    console.log('✅ Tabla accounts creada\n');

    // ====================================
    // TABLA: sessions
    // ====================================
    console.log('📋 Creando tabla sessions...');
    await sql`
      CREATE TABLE IF NOT EXISTS sessions (
        id SERIAL PRIMARY KEY,
        session_token VARCHAR(255) UNIQUE NOT NULL,
        user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        expires TIMESTAMP NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    await sql`CREATE INDEX IF NOT EXISTS idx_sessions_user_id ON sessions(user_id)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_sessions_token ON sessions(session_token)`;
    console.log('✅ Tabla sessions creada\n');

    // ====================================
    // TABLA: verification_tokens
    // ====================================
    console.log('📋 Creando tabla verification_tokens...');
    await sql`
      CREATE TABLE IF NOT EXISTS verification_tokens (
        identifier VARCHAR(255) NOT NULL,
        token VARCHAR(255) UNIQUE NOT NULL,
        expires TIMESTAMP NOT NULL,
        PRIMARY KEY (identifier, token)
      )
    `;
    console.log('✅ Tabla verification_tokens creada\n');

    // ====================================
    // TABLA: user_addresses
    // ====================================
    console.log('📋 Creando tabla user_addresses...');
    await sql`
      CREATE TABLE IF NOT EXISTS user_addresses (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        is_default BOOLEAN DEFAULT false,
        first_name VARCHAR(100) NOT NULL,
        last_name VARCHAR(100) NOT NULL,
        phone VARCHAR(20) NOT NULL,
        address VARCHAR(255) NOT NULL,
        district VARCHAR(100) NOT NULL,
        city VARCHAR(100) NOT NULL,
        postal_code VARCHAR(20),
        reference TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    await sql`CREATE INDEX IF NOT EXISTS idx_addresses_user_id ON user_addresses(user_id)`;
    console.log('✅ Tabla user_addresses creada\n');

    // ====================================
    // TABLA: wishlist
    // ====================================
    console.log('📋 Creando tabla wishlist...');
    await sql`
      CREATE TABLE IF NOT EXISTS wishlist (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        product_slug VARCHAR(255) NOT NULL,
        added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(user_id, product_slug)
      )
    `;
    await sql`CREATE INDEX IF NOT EXISTS idx_wishlist_user_id ON wishlist(user_id)`;
    console.log('✅ Tabla wishlist creada\n');

    // ====================================
    // MODIFICAR TABLA: orders
    // ====================================
    console.log('📋 Modificando tabla orders...');
    await sql`
      ALTER TABLE orders 
      ADD COLUMN IF NOT EXISTS user_id INTEGER REFERENCES users(id) ON DELETE SET NULL
    `;
    await sql`CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders(user_id)`;
    console.log('✅ Tabla orders modificada\n');

    // ====================================
    // VERIFICAR TABLAS CREADAS
    // ====================================
    console.log('🔍 Verificando tablas creadas...');
    const result = await sql`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name IN ('users', 'accounts', 'sessions', 'verification_tokens', 'user_addresses', 'wishlist')
      ORDER BY table_name
    `;

    console.log('\n✅ TABLAS CREADAS EXITOSAMENTE:');
    result.rows.forEach(row => {
      console.log(`   ✓ ${row.table_name}`);
    });

    console.log('\n🎉 ¡Proceso completado con éxito!\n');
    process.exit(0);

  } catch (error) {
    console.error('❌ ERROR:', error);
    process.exit(1);
  }
}

// Ejecutar
createAuthTables();