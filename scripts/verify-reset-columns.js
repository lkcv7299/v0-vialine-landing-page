// Verify reset_token columns exist
process.env.POSTGRES_URL = 'postgresql://neondb_owner:npg_QkFP2Lz8CSHa@ep-fragrant-bar-ad04bqou-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require';

const { sql } = require('@vercel/postgres');

async function verify() {
  try {
    console.log('\n=== CHECKING USERS TABLE FOR RESET_TOKEN COLUMNS ===\n');

    const result = await sql`
      SELECT column_name, data_type, is_nullable
      FROM information_schema.columns
      WHERE table_name = 'users'
      AND (column_name = 'reset_token' OR column_name = 'reset_token_expiry')
      ORDER BY column_name
    `;

    if (result.rows.length === 0) {
      console.log('❌ Columns NOT FOUND. Adding them now...\n');

      await sql`ALTER TABLE users ADD COLUMN reset_token VARCHAR(255)`;
      console.log('✅ Added reset_token column');

      await sql`ALTER TABLE users ADD COLUMN reset_token_expiry TIMESTAMP`;
      console.log('✅ Added reset_token_expiry column');

      await sql`CREATE INDEX idx_users_reset_token ON users(reset_token)`;
      console.log('✅ Created index on reset_token');

      console.log('\n=== COLUMNS ADDED SUCCESSFULLY ===\n');
    } else {
      console.log('✅ Columns exist:');
      result.rows.forEach(row => {
        console.log(`   - ${row.column_name} (${row.data_type}) ${row.is_nullable === 'YES' ? 'NULLABLE' : 'NOT NULL'}`);
      });
      console.log('\n=== ALL GOOD ===\n');
    }

    process.exit(0);
  } catch (error) {
    console.error('\n❌ Error:', error.message);
    process.exit(1);
  }
}

verify();
