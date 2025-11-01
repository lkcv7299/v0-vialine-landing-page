// Script to run SQL migrations
// Usage: node scripts/run-migration.js

// Set POSTGRES_URL manually since .env.local isn't loading
process.env.POSTGRES_URL = 'postgresql://neondb_owner:npg_QkFP2Lz8CSHa@ep-fragrant-bar-ad04bqou-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require';

const { sql } = require('@vercel/postgres');
const fs = require('fs');
const path = require('path');

async function runMigration() {
  try {
    console.log('\n=== RUNNING MIGRATION: Add reset_token columns ===\n');

    // Read SQL file
    const sqlFile = path.join(__dirname, 'add-reset-token-columns.sql');
    const sqlContent = fs.readFileSync(sqlFile, 'utf8');

    // Split by semicolon to execute multiple statements
    const statements = sqlContent
      .split(';')
      .map(s => s.trim())
      .filter(s => s.length > 0 && !s.startsWith('--'));

    // Execute each statement
    for (const statement of statements) {
      if (statement.toLowerCase().startsWith('select')) {
        // For SELECT statements, show results
        const result = await sql.query(statement);
        console.log('Columns added:');
        result.rows.forEach(row => {
          console.log(`  ✅ ${row.column_name} (${row.data_type})`);
        });
      } else {
        // For other statements, just execute
        await sql.query(statement);
        console.log(`✅ Executed: ${statement.substring(0, 50)}...`);
      }
    }

    console.log('\n=== MIGRATION COMPLETED SUCCESSFULLY ===\n');
    process.exit(0);
  } catch (error) {
    console.error('\n❌ MIGRATION FAILED:', error);
    process.exit(1);
  }
}

runMigration();
