// scripts/add-label-to-addresses.js
import { sql } from '@vercel/postgres';
import { readFileSync } from 'fs';

// Cargar variables de entorno manualmente
function loadEnvLocal() {
  try {
    const envFile = readFileSync('.env.local', 'utf8');
    envFile.split('\n').forEach(line => {
      const match = line.match(/^([^=]+)=(.*)$/);
      if (match) {
        const key = match[1].trim();
        let value = match[2].trim();
        // Remover comillas si existen
        if (value.startsWith('"') && value.endsWith('"')) {
          value = value.slice(1, -1);
        }
        process.env[key] = value;
      }
    });
  } catch (error) {
    console.error('Error loading .env.local:', error.message);
  }
}

loadEnvLocal();

async function migrate() {
  try {
    console.log('🔄 Agregando columna label a user_addresses...\n');

    // Agregar columna label
    await sql`
      ALTER TABLE user_addresses
      ADD COLUMN IF NOT EXISTS label VARCHAR(20) DEFAULT 'home'
    `;

    console.log('✅ Columna label agregada exitosamente');

    // Actualizar registros existentes para tener un label por defecto
    await sql`
      UPDATE user_addresses
      SET label = 'home'
      WHERE label IS NULL
    `;

    console.log('✅ Registros existentes actualizados con label="home"');

    console.log('\n✅ Migración completada exitosamente!');
  } catch (error) {
    console.error('❌ Error en migración:', error);
    process.exit(1);
  }
}

migrate();
