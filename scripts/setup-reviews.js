const { sql } = require('@vercel/postgres');
const fs = require('fs');

async function setupReviews() {
  try {
    console.log('🔄 Creando tabla de reviews...');

    // Create table
    await sql`
      CREATE TABLE IF NOT EXISTS product_reviews (
        id SERIAL PRIMARY KEY,
        product_slug VARCHAR(255) NOT NULL,
        user_id INTEGER,
        user_name VARCHAR(255) NOT NULL,
        user_email VARCHAR(255) NOT NULL,
        rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
        title VARCHAR(255),
        comment TEXT NOT NULL,
        verified_purchase BOOLEAN DEFAULT false,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
      )
    `;

    console.log('✅ Tabla product_reviews creada');

    // Create indexes
    await sql`CREATE INDEX IF NOT EXISTS idx_reviews_product_slug ON product_reviews(product_slug)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_reviews_user_id ON product_reviews(user_id)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_reviews_created_at ON product_reviews(created_at DESC)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_reviews_rating ON product_reviews(rating)`;

    console.log('✅ Índices creados');

    // Create view
    await sql`
      CREATE OR REPLACE VIEW product_review_stats AS
      SELECT
        product_slug,
        COUNT(*) as total_reviews,
        AVG(rating) as average_rating,
        COUNT(CASE WHEN rating = 5 THEN 1 END) as five_star,
        COUNT(CASE WHEN rating = 4 THEN 1 END) as four_star,
        COUNT(CASE WHEN rating = 3 THEN 1 END) as three_star,
        COUNT(CASE WHEN rating = 2 THEN 1 END) as two_star,
        COUNT(CASE WHEN rating = 1 THEN 1 END) as one_star
      FROM product_reviews
      GROUP BY product_slug
    `;

    console.log('✅ Vista product_review_stats creada');
    console.log('✅ Setup completo!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error(error);
    process.exit(1);
  }
}

setupReviews();
