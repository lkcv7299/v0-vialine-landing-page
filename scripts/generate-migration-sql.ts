/**
 * Script para generar SQL de migración desde products.ts
 *
 * Ejecutar con: npx tsx scripts/generate-migration-sql.ts
 * Genera: scripts/migration-output.sql
 */

import { products, type Product } from '../data/products'
import * as fs from 'fs'
import * as path from 'path'

// Mapeo de categorías del archivo a slugs de Supabase
const CATEGORY_MAP: Record<string, string> = {
  'leggings': 'legging',
  'bikers': 'bikers',
  'shorts': 'shorts',
  'tops': 'tops',
  'bodysuits': 'bodys',
  'camisetas': 'camisetas',
  'enterizos': 'enterizo',
  'pescador': 'pescador',
  'torero': 'torero',
  'cafarenas': 'cafarenas',
  'pantys': 'pantys'
}

// Mapeo de tejidos legacy a nuevos slugs
const FABRIC_MAP: Record<string, string> = {
  'suplex': 'suplex-liso-premium',
  'algodon': 'algodon-premium',
  'suplex-liso-premium': 'suplex-liso-premium',
  'suplex-perchado': 'suplex-perchado',
  'algodon-premium': 'algodon-premium',
  'algodon-french-terry': 'algodon-french-terry',
  'algodon-gamusa': 'algodon-gamusa'
}

function escapeSQL(str: string): string {
  return str.replace(/'/g, "''")
}

function generateProductSQL(product: Product, index: number): string {
  const categorySlug = CATEGORY_MAP[product.category] || product.category
  const fabricSlug = FABRIC_MAP[product.fabric] || product.fabric

  const tags = product.tags ? `ARRAY[${product.tags.map(t => `'${escapeSQL(t)}'`).join(', ')}]` : 'ARRAY[]::text[]'
  const attributes = product.attributes ? `'${escapeSQL(JSON.stringify(product.attributes))}'::jsonb` : "'{}'::jsonb"
  const badge = product.badge ? `'${product.badge}'` : 'NULL'
  const originalPrice = product.originalPrice ? product.originalPrice : 'NULL'

  let sql = `
-- ============================================
-- Product ${index + 1}: ${product.title}
-- ============================================

-- Insert product
INSERT INTO products (slug, title, price, original_price, category_id, fabric_id, audience, badge, tags, attributes, is_active, published_at)
VALUES (
  '${escapeSQL(product.slug)}',
  '${escapeSQL(product.title)}',
  ${product.price},
  ${originalPrice},
  (SELECT id FROM categories WHERE slug = '${categorySlug}'),
  (SELECT id FROM fabrics WHERE slug = '${fabricSlug}'),
  '${product.audience}',
  ${badge},
  ${tags},
  ${attributes},
  true,
  NOW()
);

`

  // Generate colors
  const colors = product.colors.map((color, colorIndex) => {
    const isSimple = typeof color === 'string'
    const colorName = isSimple ? color : color.name
    const colorSlug = isSimple ? color.toLowerCase().replace(/\s+/g, '-') : color.slug
    const colorHex = isSimple ? '#808080' : color.hex
    return { name: colorName, slug: colorSlug, hex: colorHex, position: colorIndex, isSimple, original: color }
  })

  if (colors.length > 0) {
    sql += `-- Insert colors
INSERT INTO product_colors (product_id, name, slug, hex, position, is_active)
SELECT p.id, c.name, c.slug, c.hex, c.position, true
FROM (SELECT id FROM products WHERE slug = '${escapeSQL(product.slug)}') p,
(VALUES
${colors.map(c => `  ('${escapeSQL(c.name)}', '${escapeSQL(c.slug)}', '${c.hex}', ${c.position})`).join(',\n')}
) AS c(name, slug, hex, position);

`
  }

  // Generate images for each color
  for (const color of colors) {
    let images: string[] = []

    if (color.isSimple) {
      images = [product.image]
    } else {
      const colorObj = color.original as { images?: string[], image?: string }
      images = colorObj.images || (colorObj.image ? [colorObj.image] : [])
    }

    if (images.length > 0) {
      sql += `-- Images for ${color.name}
INSERT INTO product_images (product_id, color_id, url, alt_text, position, is_primary)
SELECT p.id, c.id, i.url, '${escapeSQL(product.title)} - ${escapeSQL(color.name)}', i.position, i.position = 0
FROM (SELECT id FROM products WHERE slug = '${escapeSQL(product.slug)}') p,
     (SELECT id FROM product_colors WHERE slug = '${escapeSQL(color.slug)}' AND product_id = (SELECT id FROM products WHERE slug = '${escapeSQL(product.slug)}')) c,
(VALUES
${images.map((img, idx) => `  ('${escapeSQL(img)}', ${idx})`).join(',\n')}
) AS i(url, position);

`
    }
  }

  // Generate variants (sizes)
  if (product.sizes.length > 0) {
    const stock = product.inventory || 10
    sql += `-- Size variants
INSERT INTO product_variants (product_id, size, stock, is_active)
SELECT p.id, s.val, ${stock}, true
FROM (SELECT id FROM products WHERE slug = '${escapeSQL(product.slug)}') p,
(VALUES
${product.sizes.map(s => `  ('${escapeSQL(s)}')`).join(',\n')}
) AS s(val);

`
  }

  return sql
}

function main() {
  console.log(`Generating migration SQL for ${products.length} products...\n`)

  // Skip first product (already migrated)
  const productsToMigrate = products.slice(1)

  let sql = `-- Migration SQL generated from products.ts
-- Total products: ${productsToMigrate.length}
-- Generated: ${new Date().toISOString()}
--
-- Execute in batches using Supabase MCP or psql

BEGIN;

`

  for (let i = 0; i < productsToMigrate.length; i++) {
    sql += generateProductSQL(productsToMigrate[i], i + 1)

    // Add commit/begin every 10 products for safer execution
    if ((i + 1) % 10 === 0) {
      sql += `COMMIT;\nBEGIN;\n\n`
    }
  }

  sql += `COMMIT;\n`

  // Write to file
  const outputPath = path.join(__dirname, 'migration-output.sql')
  fs.writeFileSync(outputPath, sql)

  console.log(`✅ Migration SQL written to: ${outputPath}`)
  console.log(`📦 Products included: ${productsToMigrate.length}`)
  console.log(`📄 File size: ${(sql.length / 1024).toFixed(2)} KB`)
}

main()
