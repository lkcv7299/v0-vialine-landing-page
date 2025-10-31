// Set POSTGRES_URL manually since .env.local isn't loading
process.env.POSTGRES_URL = 'postgresql://neondb_owner:npg_QkFP2Lz8CSHa@ep-fragrant-bar-ad04bqou-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require';

const { sql } = require('@vercel/postgres');

async function checkSchema() {
  try {
    console.log('\n=== WISHLIST TABLE SCHEMA ===');
    const wishlistSchema = await sql`
      SELECT column_name, data_type, is_nullable
      FROM information_schema.columns
      WHERE table_name = 'wishlist'
      ORDER BY ordinal_position
    `;
    wishlistSchema.rows.forEach(row => {
      console.log(`  - ${row.column_name} (${row.data_type})`);
    });

    console.log('\n=== ORDERS TABLE SCHEMA ===');
    const ordersSchema = await sql`
      SELECT column_name, data_type, is_nullable
      FROM information_schema.columns
      WHERE table_name = 'orders'
      ORDER BY ordinal_position
    `;
    ordersSchema.rows.forEach(row => {
      console.log(`  - ${row.column_name} (${row.data_type})`);
    });

    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

checkSchema();
