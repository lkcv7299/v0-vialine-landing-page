// Script para agregar columnas de reset token a la tabla users
require('dotenv').config({ path: '.env.local' });
const { sql } = require('@vercel/postgres');

async function addResetTokenColumns() {
  try {
    console.log('🔄 Agregando columnas para reset token...');

    // Agregar columnas si no existen
    await sql`
      ALTER TABLE users
      ADD COLUMN IF NOT EXISTS reset_token VARCHAR(255),
      ADD COLUMN IF NOT EXISTS reset_token_expiry TIMESTAMP
    `;

    console.log('✅ Columnas agregadas exitosamente');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

addResetTokenColumns();
