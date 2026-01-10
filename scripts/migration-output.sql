-- Migration SQL generated from products.ts
-- Total products: 48
-- Generated: 2026-01-09T20:45:55.198Z
--
-- Execute in batches using Supabase MCP or psql

BEGIN;


-- ============================================
-- Product 2: Camiseta manga larga
-- ============================================

-- Insert product
INSERT INTO products (slug, title, price, original_price, category_id, fabric_id, audience, badge, tags, attributes, is_active, published_at)
VALUES (
  'camiseta-manga-larga',
  'Camiseta manga larga',
  36,
  NULL,
  (SELECT id FROM categories WHERE slug = 'camisetas'),
  (SELECT id FROM fabrics WHERE slug = 'algodon-premium'),
  'mujer',
  NULL,
  ARRAY['COD.393', 'Colección Camisetas Algodón Licrado', 'Algodón Licrado'],
  '{"material":"Algodón Licrado","detalles":["Manga larga","Algodón licrado"],"beneficios":[]}'::jsonb,
  true,
  NOW()
);

-- Insert colors
INSERT INTO product_colors (product_id, name, slug, hex, position, is_active)
SELECT p.id, c.name, c.slug, c.hex, c.position, true
FROM (SELECT id FROM products WHERE slug = 'camiseta-manga-larga') p,
(VALUES
  ('Azul Marino', 'azul-marino', '#1E3A8A', 0),
  ('Beige', 'beige', '#F5F5DC', 1),
  ('Blanco', 'blanco', '#FFFFFF', 2),
  ('Negro', 'negro', '#000000', 3),
  ('Rojo', 'rojo', '#D22B2B', 4),
  ('Turquesa', 'turquesa', '#40E0D0', 5),
  ('Vino', 'vino', '#722F37', 6)
) AS c(name, slug, hex, position);

-- Images for Azul Marino
INSERT INTO product_images (product_id, color_id, url, alt_text, position, is_primary)
SELECT p.id, c.id, i.url, 'Camiseta manga larga - Azul Marino', i.position, i.position = 0
FROM (SELECT id FROM products WHERE slug = 'camiseta-manga-larga') p,
     (SELECT id FROM product_colors WHERE slug = 'azul-marino' AND product_id = (SELECT id FROM products WHERE slug = 'camiseta-manga-larga')) c,
(VALUES
  ('/productos/mujer/camisetas/camiseta-manga-larga-azul-marino-manga-larga-zul-marino1.webp', 0),
  ('/productos/mujer/camisetas/camiseta-manga-larga-azul-marino-manga-larga-azul-marino2.webp', 1),
  ('/productos/mujer/camisetas/camiseta-manga-larga-azul-marino-manga-larga-azul-marino3.webp', 2),
  ('/productos/mujer/camisetas/camiseta-manga-larga-azul-marino-manga-larga-azul-marino4.webp', 3),
  ('/productos/mujer/camisetas/camiseta-manga-larga-azul-marino-manga-larga-azul-marino5.webp', 4)
) AS i(url, position);

-- Images for Beige
INSERT INTO product_images (product_id, color_id, url, alt_text, position, is_primary)
SELECT p.id, c.id, i.url, 'Camiseta manga larga - Beige', i.position, i.position = 0
FROM (SELECT id FROM products WHERE slug = 'camiseta-manga-larga') p,
     (SELECT id FROM product_colors WHERE slug = 'beige' AND product_id = (SELECT id FROM products WHERE slug = 'camiseta-manga-larga')) c,
(VALUES
  ('/productos/mujer/camisetas/camiseta-manga-larga-beige-manga-larga-beige1.webp', 0),
  ('/productos/mujer/camisetas/camiseta-manga-larga-beige-manga-larga-beige2.webp', 1),
  ('/productos/mujer/camisetas/camiseta-manga-larga-beige-manga-larga-beige3.webp', 2),
  ('/productos/mujer/camisetas/camiseta-manga-larga-beige-manga-larga-beige4.webp', 3),
  ('/productos/mujer/camisetas/camiseta-manga-larga-beige-manga-larga-beige5.webp', 4)
) AS i(url, position);

-- Images for Blanco
INSERT INTO product_images (product_id, color_id, url, alt_text, position, is_primary)
SELECT p.id, c.id, i.url, 'Camiseta manga larga - Blanco', i.position, i.position = 0
FROM (SELECT id FROM products WHERE slug = 'camiseta-manga-larga') p,
     (SELECT id FROM product_colors WHERE slug = 'blanco' AND product_id = (SELECT id FROM products WHERE slug = 'camiseta-manga-larga')) c,
(VALUES
  ('/productos/mujer/camisetas/camiseta-manga-larga-blanco-manga-larga-blanco1.webp', 0),
  ('/productos/mujer/camisetas/camiseta-manga-larga-blanco-manga-larga-blanco2.webp', 1),
  ('/productos/mujer/camisetas/camiseta-manga-larga-blanco-manga-larga-blanco3.webp', 2),
  ('/productos/mujer/camisetas/camiseta-manga-larga-blanco-manga-larga-blanco4.webp', 3),
  ('/productos/mujer/camisetas/camiseta-manga-larga-blanco-manga-larga-blanco5.webp', 4)
) AS i(url, position);

-- Images for Negro
INSERT INTO product_images (product_id, color_id, url, alt_text, position, is_primary)
SELECT p.id, c.id, i.url, 'Camiseta manga larga - Negro', i.position, i.position = 0
FROM (SELECT id FROM products WHERE slug = 'camiseta-manga-larga') p,
     (SELECT id FROM product_colors WHERE slug = 'negro' AND product_id = (SELECT id FROM products WHERE slug = 'camiseta-manga-larga')) c,
(VALUES
  ('/productos/mujer/camisetas/camiseta-manga-larga-negro-manga-larga-negro1.webp', 0),
  ('/productos/mujer/camisetas/camiseta-manga-larga-negro-manga-larga-negro2.webp', 1),
  ('/productos/mujer/camisetas/camiseta-manga-larga-negro-manga-larga-negro3.webp', 2),
  ('/productos/mujer/camisetas/camiseta-manga-larga-negro-manga-larga-negro4.webp', 3),
  ('/productos/mujer/camisetas/camiseta-manga-larga-negro-manga-larga-negro5.webp', 4)
) AS i(url, position);

-- Images for Rojo
INSERT INTO product_images (product_id, color_id, url, alt_text, position, is_primary)
SELECT p.id, c.id, i.url, 'Camiseta manga larga - Rojo', i.position, i.position = 0
FROM (SELECT id FROM products WHERE slug = 'camiseta-manga-larga') p,
     (SELECT id FROM product_colors WHERE slug = 'rojo' AND product_id = (SELECT id FROM products WHERE slug = 'camiseta-manga-larga')) c,
(VALUES
  ('/productos/mujer/camisetas/camiseta-manga-larga-rojo-manga-larga-rojo1.webp', 0),
  ('/productos/mujer/camisetas/camiseta-manga-larga-rojo-manga-larga-rojo2.webp', 1),
  ('/productos/mujer/camisetas/camiseta-manga-larga-rojo-manga-larga-rojo3.webp', 2),
  ('/productos/mujer/camisetas/camiseta-manga-larga-rojo-manga-larga-rojo4.webp', 3),
  ('/productos/mujer/camisetas/camiseta-manga-larga-rojo-manga-larga-rojo5.webp', 4)
) AS i(url, position);

-- Images for Turquesa
INSERT INTO product_images (product_id, color_id, url, alt_text, position, is_primary)
SELECT p.id, c.id, i.url, 'Camiseta manga larga - Turquesa', i.position, i.position = 0
FROM (SELECT id FROM products WHERE slug = 'camiseta-manga-larga') p,
     (SELECT id FROM product_colors WHERE slug = 'turquesa' AND product_id = (SELECT id FROM products WHERE slug = 'camiseta-manga-larga')) c,
(VALUES
  ('/productos/mujer/camisetas/camiseta-manga-larga-turquesa-manga-larga-turquesa1.webp', 0),
  ('/productos/mujer/camisetas/camiseta-manga-larga-turquesa-manga-larga-turquesa2.webp', 1),
  ('/productos/mujer/camisetas/camiseta-manga-larga-turquesa-manga-larga-turquesa3.webp', 2),
  ('/productos/mujer/camisetas/camiseta-manga-larga-turquesa-manga-larga-turquesa5.webp', 3)
) AS i(url, position);

-- Images for Vino
INSERT INTO product_images (product_id, color_id, url, alt_text, position, is_primary)
SELECT p.id, c.id, i.url, 'Camiseta manga larga - Vino', i.position, i.position = 0
FROM (SELECT id FROM products WHERE slug = 'camiseta-manga-larga') p,
     (SELECT id FROM product_colors WHERE slug = 'vino' AND product_id = (SELECT id FROM products WHERE slug = 'camiseta-manga-larga')) c,
(VALUES
  ('/productos/mujer/camisetas/camiseta-manga-larga-vino-manga-larga-vino1.webp', 0),
  ('/productos/mujer/camisetas/camiseta-manga-larga-vino-manga-larga-vino2.webp', 1),
  ('/productos/mujer/camisetas/camiseta-manga-larga-vino-manga-larga-vino3.webp', 2),
  ('/productos/mujer/camisetas/camiseta-manga-larga-vino-manga-larga-vino4.webp', 3),
  ('/productos/mujer/camisetas/camiseta-manga-larga-vino-manga-larga-vino5.webp', 4)
) AS i(url, position);

-- Size variants
INSERT INTO product_variants (product_id, size, stock, is_active)
SELECT p.id, s.val, 10, true
FROM (SELECT id FROM products WHERE slug = 'camiseta-manga-larga') p,
(VALUES
  ('S'),
  ('M'),
  ('L'),
  ('XL')
) AS s(val);


-- ============================================
-- Product 3: Camiseta manga corta
-- ============================================

-- Insert product
INSERT INTO products (slug, title, price, original_price, category_id, fabric_id, audience, badge, tags, attributes, is_active, published_at)
VALUES (
  'camiseta-manga-corta',
  'Camiseta manga corta',
  29,
  NULL,
  (SELECT id FROM categories WHERE slug = 'camisetas'),
  (SELECT id FROM fabrics WHERE slug = 'algodon-premium'),
  'mujer',
  NULL,
  ARRAY['COD.399', 'Colección Camisetas Algodón Licrado', 'Algodón Licrado'],
  '{"material":"Algodón Licrado","detalles":["Manga corta","Algodón licrado"],"beneficios":[]}'::jsonb,
  true,
  NOW()
);

-- Insert colors
INSERT INTO product_colors (product_id, name, slug, hex, position, is_active)
SELECT p.id, c.name, c.slug, c.hex, c.position, true
FROM (SELECT id FROM products WHERE slug = 'camiseta-manga-corta') p,
(VALUES
  ('Azul Marino', 'azulmarino', '#1E3A8A', 0),
  ('Beige', 'beige', '#F5F5DC', 1),
  ('Blanco', 'blanco', '#FFFFFF', 2),
  ('Negro', 'negro', '#000000', 3),
  ('Rojo', 'rojo', '#D22B2B', 4)
) AS c(name, slug, hex, position);

-- Images for Azul Marino
INSERT INTO product_images (product_id, color_id, url, alt_text, position, is_primary)
SELECT p.id, c.id, i.url, 'Camiseta manga corta - Azul Marino', i.position, i.position = 0
FROM (SELECT id FROM products WHERE slug = 'camiseta-manga-corta') p,
     (SELECT id FROM product_colors WHERE slug = 'azulmarino' AND product_id = (SELECT id FROM products WHERE slug = 'camiseta-manga-corta')) c,
(VALUES
  ('/productos/mujer/camisetas/camiseta-manga-corta-azul-marino-camiseta-azulmarino1.webp', 0),
  ('/productos/mujer/camisetas/camiseta-manga-corta-azul-marino-camiseta-azulmarino2.webp', 1),
  ('/productos/mujer/camisetas/camiseta-manga-corta-azul-marino-camiseta-azulmarino3.webp', 2),
  ('/productos/mujer/camisetas/camiseta-manga-corta-azul-marino-camiseta-azulmarino4.webp', 3),
  ('/productos/mujer/camisetas/camiseta-manga-corta-azul-marino-camiseta-azulmarino5.webp', 4)
) AS i(url, position);

-- Images for Beige
INSERT INTO product_images (product_id, color_id, url, alt_text, position, is_primary)
SELECT p.id, c.id, i.url, 'Camiseta manga corta - Beige', i.position, i.position = 0
FROM (SELECT id FROM products WHERE slug = 'camiseta-manga-corta') p,
     (SELECT id FROM product_colors WHERE slug = 'beige' AND product_id = (SELECT id FROM products WHERE slug = 'camiseta-manga-corta')) c,
(VALUES
  ('/productos/mujer/camisetas/camiseta-manga-corta-beige-camiseta-beige1.webp', 0),
  ('/productos/mujer/camisetas/camiseta-manga-corta-beige-camiseta-beige2.webp', 1),
  ('/productos/mujer/camisetas/camiseta-manga-corta-beige-camiseta-beige3.webp', 2),
  ('/productos/mujer/camisetas/camiseta-manga-corta-beige-camiseta-beige4.webp', 3),
  ('/productos/mujer/camisetas/camiseta-manga-corta-beige-camiseta-beige5.webp', 4)
) AS i(url, position);

-- Images for Blanco
INSERT INTO product_images (product_id, color_id, url, alt_text, position, is_primary)
SELECT p.id, c.id, i.url, 'Camiseta manga corta - Blanco', i.position, i.position = 0
FROM (SELECT id FROM products WHERE slug = 'camiseta-manga-corta') p,
     (SELECT id FROM product_colors WHERE slug = 'blanco' AND product_id = (SELECT id FROM products WHERE slug = 'camiseta-manga-corta')) c,
(VALUES
  ('/productos/mujer/camisetas/camiseta-manga-corta-blanco-camiseta-blanco1.webp', 0),
  ('/productos/mujer/camisetas/camiseta-manga-corta-blanco-camiseta-blanco2.webp', 1),
  ('/productos/mujer/camisetas/camiseta-manga-corta-blanco-camiseta-blanco3.webp', 2),
  ('/productos/mujer/camisetas/camiseta-manga-corta-blanco-camiseta-blanco4.webp', 3),
  ('/productos/mujer/camisetas/camiseta-manga-corta-blanco-camiseta-blanco5.webp', 4)
) AS i(url, position);

-- Images for Negro
INSERT INTO product_images (product_id, color_id, url, alt_text, position, is_primary)
SELECT p.id, c.id, i.url, 'Camiseta manga corta - Negro', i.position, i.position = 0
FROM (SELECT id FROM products WHERE slug = 'camiseta-manga-corta') p,
     (SELECT id FROM product_colors WHERE slug = 'negro' AND product_id = (SELECT id FROM products WHERE slug = 'camiseta-manga-corta')) c,
(VALUES
  ('/productos/mujer/camisetas/camiseta-manga-corta-negro-camiseta-negro1.webp', 0),
  ('/productos/mujer/camisetas/camiseta-manga-corta-negro-camiseta-negro2.webp', 1),
  ('/productos/mujer/camisetas/camiseta-manga-corta-negro-camiseta-negro3.webp', 2),
  ('/productos/mujer/camisetas/camiseta-manga-corta-negro-camiseta-negro4.webp', 3)
) AS i(url, position);

-- Images for Rojo
INSERT INTO product_images (product_id, color_id, url, alt_text, position, is_primary)
SELECT p.id, c.id, i.url, 'Camiseta manga corta - Rojo', i.position, i.position = 0
FROM (SELECT id FROM products WHERE slug = 'camiseta-manga-corta') p,
     (SELECT id FROM product_colors WHERE slug = 'rojo' AND product_id = (SELECT id FROM products WHERE slug = 'camiseta-manga-corta')) c,
(VALUES
  ('/productos/mujer/camisetas/camiseta-manga-corta-rojo-camiseta-rojo1.webp', 0),
  ('/productos/mujer/camisetas/camiseta-manga-corta-rojo-camiseta-rojo2.webp', 1),
  ('/productos/mujer/camisetas/camiseta-manga-corta-rojo-camiseta-rojo3.webp', 2),
  ('/productos/mujer/camisetas/camiseta-manga-corta-rojo-camiseta-rojo4.webp', 3),
  ('/productos/mujer/camisetas/camiseta-manga-corta-rojo-camiseta-rojo5.webp', 4)
) AS i(url, position);

-- Size variants
INSERT INTO product_variants (product_id, size, stock, is_active)
SELECT p.id, s.val, 3, true
FROM (SELECT id FROM products WHERE slug = 'camiseta-manga-corta') p,
(VALUES
  ('S'),
  ('M'),
  ('L'),
  ('XL')
) AS s(val);


-- ============================================
-- Product 4: Camiseta Gia
-- ============================================

-- Insert product
INSERT INTO products (slug, title, price, original_price, category_id, fabric_id, audience, badge, tags, attributes, is_active, published_at)
VALUES (
  'camiseta-gia',
  'Camiseta Gia',
  27,
  NULL,
  (SELECT id FROM categories WHERE slug = 'camisetas'),
  (SELECT id FROM fabrics WHERE slug = 'algodon-premium'),
  'mujer',
  NULL,
  ARRAY[]::text[],
  '{"material":"Algodón Premium","detalles":["Tejido suave y transpirable","Costuras reforzadas","Corte moderno y cómodo"],"beneficios":["Máxima comodidad durante todo el día","Fácil de lavar y mantener","Ideal para uso diario"]}'::jsonb,
  true,
  NOW()
);

-- Insert colors
INSERT INTO product_colors (product_id, name, slug, hex, position, is_active)
SELECT p.id, c.name, c.slug, c.hex, c.position, true
FROM (SELECT id FROM products WHERE slug = 'camiseta-gia') p,
(VALUES
  ('Blanco', 'blanco', '#FFFFFF', 0),
  ('Negro', 'negro', '#000000', 1),
  ('Vino', 'vino', '#722F37', 2)
) AS c(name, slug, hex, position);

-- Images for Blanco
INSERT INTO product_images (product_id, color_id, url, alt_text, position, is_primary)
SELECT p.id, c.id, i.url, 'Camiseta Gia - Blanco', i.position, i.position = 0
FROM (SELECT id FROM products WHERE slug = 'camiseta-gia') p,
     (SELECT id FROM product_colors WHERE slug = 'blanco' AND product_id = (SELECT id FROM products WHERE slug = 'camiseta-gia')) c,
(VALUES
  ('/productos/mujer/camisetas/camiseta-gia-blanco-camiseta-gia-blanco1.webp', 0),
  ('/productos/mujer/camisetas/camiseta-gia-blanco-camiseta-gia-blanco2.webp', 1),
  ('/productos/mujer/camisetas/camiseta-gia-blanco-camiseta-gia-blanco3.webp', 2),
  ('/productos/mujer/camisetas/camiseta-gia-blanco-camiseta-gia-blanco4.webp', 3)
) AS i(url, position);

-- Images for Negro
INSERT INTO product_images (product_id, color_id, url, alt_text, position, is_primary)
SELECT p.id, c.id, i.url, 'Camiseta Gia - Negro', i.position, i.position = 0
FROM (SELECT id FROM products WHERE slug = 'camiseta-gia') p,
     (SELECT id FROM product_colors WHERE slug = 'negro' AND product_id = (SELECT id FROM products WHERE slug = 'camiseta-gia')) c,
(VALUES
  ('/productos/mujer/camisetas/camiseta-gia-negro-camiseta-gia-negro1.webp', 0),
  ('/productos/mujer/camisetas/camiseta-gia-negro-camiseta-gia-negro2.webp', 1),
  ('/productos/mujer/camisetas/camiseta-gia-negro-camiseta-gia-negro3.webp', 2),
  ('/productos/mujer/camisetas/camiseta-gia-negro-camiseta-gia-negro4.webp', 3)
) AS i(url, position);

-- Images for Vino
INSERT INTO product_images (product_id, color_id, url, alt_text, position, is_primary)
SELECT p.id, c.id, i.url, 'Camiseta Gia - Vino', i.position, i.position = 0
FROM (SELECT id FROM products WHERE slug = 'camiseta-gia') p,
     (SELECT id FROM product_colors WHERE slug = 'vino' AND product_id = (SELECT id FROM products WHERE slug = 'camiseta-gia')) c,
(VALUES
  ('/productos/mujer/camisetas/camiseta-gia-vino-camiseta-gia-vino1.webp', 0),
  ('/productos/mujer/camisetas/camiseta-gia-vino-camiseta-gia-vino2.webp', 1),
  ('/productos/mujer/camisetas/camiseta-gia-vino-camiseta-gia-vino3.webp', 2),
  ('/productos/mujer/camisetas/camiseta-gia-vino-camiseta-gia-vino4.webp', 3)
) AS i(url, position);

-- Size variants
INSERT INTO product_variants (product_id, size, stock, is_active)
SELECT p.id, s.val, 10, true
FROM (SELECT id FROM products WHERE slug = 'camiseta-gia') p,
(VALUES
  ('XS'),
  ('S'),
  ('M'),
  ('L'),
  ('XL')
) AS s(val);


-- ============================================
-- Product 5: Short Slim
-- ============================================

-- Insert product
INSERT INTO products (slug, title, price, original_price, category_id, fabric_id, audience, badge, tags, attributes, is_active, published_at)
VALUES (
  'short-slim',
  'Short Slim',
  29,
  NULL,
  (SELECT id FROM categories WHERE slug = 'bikers'),
  (SELECT id FROM fabrics WHERE slug = 'suplex-liso-premium'),
  'mujer',
  NULL,
  ARRAY['COD.S-103', 'Colección Especial Suplex', 'Suplex + Spandex'],
  '{"material":"Suplex + Spandex","detalles":["Pretina tipo faja","Suplex liso interno","Tejido spandex","Diseño slim","Alta variedad de colores (10 colores)"],"beneficios":[]}'::jsonb,
  true,
  NOW()
);

-- Insert colors
INSERT INTO product_colors (product_id, name, slug, hex, position, is_active)
SELECT p.id, c.name, c.slug, c.hex, c.position, true
FROM (SELECT id FROM products WHERE slug = 'short-slim') p,
(VALUES
  ('Acero', 'acero', '#808080', 0),
  ('Azulino', 'azulino', '#3A53A4', 1),
  ('Blanco', 'blanco', '#FFFFFF', 2),
  ('Negro', 'negro', '#000000', 3)
) AS c(name, slug, hex, position);

-- Images for Acero
INSERT INTO product_images (product_id, color_id, url, alt_text, position, is_primary)
SELECT p.id, c.id, i.url, 'Short Slim - Acero', i.position, i.position = 0
FROM (SELECT id FROM products WHERE slug = 'short-slim') p,
     (SELECT id FROM product_colors WHERE slug = 'acero' AND product_id = (SELECT id FROM products WHERE slug = 'short-slim')) c,
(VALUES
  ('/productos/mujer/short/short-slim-suplex-liso-premium-acero-short-slim-acero1.webp', 0),
  ('/productos/mujer/short/short-slim-suplex-liso-premium-acero-short-slim-acero2.webp', 1),
  ('/productos/mujer/short/short-slim-suplex-liso-premium-acero-short-slim-acero3.webp', 2),
  ('/productos/mujer/short/short-slim-suplex-liso-premium-acero-short-slim-acero4.webp', 3)
) AS i(url, position);

-- Images for Azulino
INSERT INTO product_images (product_id, color_id, url, alt_text, position, is_primary)
SELECT p.id, c.id, i.url, 'Short Slim - Azulino', i.position, i.position = 0
FROM (SELECT id FROM products WHERE slug = 'short-slim') p,
     (SELECT id FROM product_colors WHERE slug = 'azulino' AND product_id = (SELECT id FROM products WHERE slug = 'short-slim')) c,
(VALUES
  ('/productos/mujer/short/short-slim-suplex-liso-premium-azulino-short-slim-azulino1.webp', 0),
  ('/productos/mujer/short/short-slim-suplex-liso-premium-azulino-short-slim-azulino2.webp', 1),
  ('/productos/mujer/short/short-slim-suplex-liso-premium-azulino-short-slim-azulino3.webp', 2),
  ('/productos/mujer/short/short-slim-suplex-liso-premium-azulino-short-slim-azulino4.webp', 3)
) AS i(url, position);

-- Images for Blanco
INSERT INTO product_images (product_id, color_id, url, alt_text, position, is_primary)
SELECT p.id, c.id, i.url, 'Short Slim - Blanco', i.position, i.position = 0
FROM (SELECT id FROM products WHERE slug = 'short-slim') p,
     (SELECT id FROM product_colors WHERE slug = 'blanco' AND product_id = (SELECT id FROM products WHERE slug = 'short-slim')) c,
(VALUES
  ('/productos/mujer/short/short-slim-suplex-liso-premium-blanco-short-slim-blanco1.webp', 0),
  ('/productos/mujer/short/short-slim-suplex-liso-premium-blanco-short-slim-blanco2.webp', 1),
  ('/productos/mujer/short/short-slim-suplex-liso-premium-blanco-short-slim-blanco3.webp', 2),
  ('/productos/mujer/short/short-slim-suplex-liso-premium-blanco-short-slim-blanco4.webp', 3)
) AS i(url, position);

-- Images for Negro
INSERT INTO product_images (product_id, color_id, url, alt_text, position, is_primary)
SELECT p.id, c.id, i.url, 'Short Slim - Negro', i.position, i.position = 0
FROM (SELECT id FROM products WHERE slug = 'short-slim') p,
     (SELECT id FROM product_colors WHERE slug = 'negro' AND product_id = (SELECT id FROM products WHERE slug = 'short-slim')) c,
(VALUES
  ('/productos/mujer/short/short-slim-suplex-liso-premium-negro-short-slim-negro1.webp', 0),
  ('/productos/mujer/short/short-slim-suplex-liso-premium-negro-short-slim-negro2.webp', 1),
  ('/productos/mujer/short/short-slim-suplex-liso-premium-negro-short-slim-negro3.webp', 2),
  ('/productos/mujer/short/short-slim-suplex-liso-premium-negro-short-slim-negro5.webp', 3),
  ('/productos/mujer/short/short-slim-suplex-liso-premium-negro-short-slim-negro6.webp', 4)
) AS i(url, position);

-- Size variants
INSERT INTO product_variants (product_id, size, stock, is_active)
SELECT p.id, s.val, 10, true
FROM (SELECT id FROM products WHERE slug = 'short-slim') p,
(VALUES
  ('S'),
  ('M'),
  ('L'),
  ('XL')
) AS s(val);


-- ============================================
-- Product 6: Short ciclista Active
-- ============================================

-- Insert product
INSERT INTO products (slug, title, price, original_price, category_id, fabric_id, audience, badge, tags, attributes, is_active, published_at)
VALUES (
  'short-ciclista-active',
  'Short ciclista Active',
  32,
  NULL,
  (SELECT id FROM categories WHERE slug = 'bikers'),
  (SELECT id FROM fabrics WHERE slug = 'suplex-liso-premium'),
  'mujer',
  NULL,
  ARRAY['COD.204', 'Colección Infinity', 'Suplex Liso de Alta Elongación'],
  '{"material":"Suplex Liso de Alta Elongación","detalles":["Pretina tipo faja","Refuerzo trasero","Suplex liso de alta elongación","Largo ciclista/biker"],"beneficios":[]}'::jsonb,
  true,
  NOW()
);

-- Insert colors
INSERT INTO product_colors (product_id, name, slug, hex, position, is_active)
SELECT p.id, c.name, c.slug, c.hex, c.position, true
FROM (SELECT id FROM products WHERE slug = 'short-ciclista-active') p,
(VALUES
  ('Aqua', 'aqua', '#00CED1', 0),
  ('Azulino', 'azulino', '#87CEEB', 1),
  ('Blanco', 'blanco', '#FFFFFF', 2),
  ('Charcoal', 'charcoal', '#36454F', 3),
  ('Melange', 'melange', '#D3D3D3', 4),
  ('Melon', 'melon', '#FEBAAD', 5),
  ('Negro', 'negro', '#000000', 6),
  ('Rojo', 'rojo', '#FF0000', 7)
) AS c(name, slug, hex, position);

-- Images for Aqua
INSERT INTO product_images (product_id, color_id, url, alt_text, position, is_primary)
SELECT p.id, c.id, i.url, 'Short ciclista Active - Aqua', i.position, i.position = 0
FROM (SELECT id FROM products WHERE slug = 'short-ciclista-active') p,
     (SELECT id FROM product_colors WHERE slug = 'aqua' AND product_id = (SELECT id FROM products WHERE slug = 'short-ciclista-active')) c,
(VALUES
  ('/productos/mujer/bikers/short-ciclista-active-aqua1.webp', 0),
  ('/productos/mujer/bikers/short-ciclista-active-aqua2.webp', 1),
  ('/productos/mujer/bikers/short-ciclista-active-aqua3.webp', 2),
  ('/productos/mujer/bikers/short-ciclista-active-aqua4.webp', 3),
  ('/productos/mujer/bikers/short-ciclista-active-aqua5.webp', 4)
) AS i(url, position);

-- Images for Azulino
INSERT INTO product_images (product_id, color_id, url, alt_text, position, is_primary)
SELECT p.id, c.id, i.url, 'Short ciclista Active - Azulino', i.position, i.position = 0
FROM (SELECT id FROM products WHERE slug = 'short-ciclista-active') p,
     (SELECT id FROM product_colors WHERE slug = 'azulino' AND product_id = (SELECT id FROM products WHERE slug = 'short-ciclista-active')) c,
(VALUES
  ('/productos/mujer/bikers/short-ciclista-active-azulino1.webp', 0),
  ('/productos/mujer/bikers/short-ciclista-active-azulino2.webp', 1),
  ('/productos/mujer/bikers/short-ciclista-active-azulino3.webp', 2),
  ('/productos/mujer/bikers/short-ciclista-active-azulino4.webp', 3),
  ('/productos/mujer/bikers/short-ciclista-active-azulino5.webp', 4)
) AS i(url, position);

-- Images for Blanco
INSERT INTO product_images (product_id, color_id, url, alt_text, position, is_primary)
SELECT p.id, c.id, i.url, 'Short ciclista Active - Blanco', i.position, i.position = 0
FROM (SELECT id FROM products WHERE slug = 'short-ciclista-active') p,
     (SELECT id FROM product_colors WHERE slug = 'blanco' AND product_id = (SELECT id FROM products WHERE slug = 'short-ciclista-active')) c,
(VALUES
  ('/productos/mujer/bikers/short-ciclista-active-blanco1.webp', 0),
  ('/productos/mujer/bikers/short-ciclista-active-blanco2.webp', 1),
  ('/productos/mujer/bikers/short-ciclista-active-blanco3.webp', 2),
  ('/productos/mujer/bikers/short-ciclista-active-blanco4.webp', 3),
  ('/productos/mujer/bikers/short-ciclista-active-blanco5.webp', 4)
) AS i(url, position);

-- Images for Charcoal
INSERT INTO product_images (product_id, color_id, url, alt_text, position, is_primary)
SELECT p.id, c.id, i.url, 'Short ciclista Active - Charcoal', i.position, i.position = 0
FROM (SELECT id FROM products WHERE slug = 'short-ciclista-active') p,
     (SELECT id FROM product_colors WHERE slug = 'charcoal' AND product_id = (SELECT id FROM products WHERE slug = 'short-ciclista-active')) c,
(VALUES
  ('/productos/mujer/bikers/short-ciclista-active-charcoal1.webp', 0),
  ('/productos/mujer/bikers/short-ciclista-active-charcoal2.webp', 1),
  ('/productos/mujer/bikers/short-ciclista-active-charcoal3.webp', 2),
  ('/productos/mujer/bikers/short-ciclista-active-charcoal4.webp', 3),
  ('/productos/mujer/bikers/short-ciclista-active-charcoal5.webp', 4)
) AS i(url, position);

-- Images for Melange
INSERT INTO product_images (product_id, color_id, url, alt_text, position, is_primary)
SELECT p.id, c.id, i.url, 'Short ciclista Active - Melange', i.position, i.position = 0
FROM (SELECT id FROM products WHERE slug = 'short-ciclista-active') p,
     (SELECT id FROM product_colors WHERE slug = 'melange' AND product_id = (SELECT id FROM products WHERE slug = 'short-ciclista-active')) c,
(VALUES
  ('/productos/mujer/bikers/short-ciclista-active-melange1.webp', 0),
  ('/productos/mujer/bikers/short-ciclista-active-melange2.webp', 1),
  ('/productos/mujer/bikers/short-ciclista-active-melange3.webp', 2),
  ('/productos/mujer/bikers/short-ciclista-active-melange4.webp', 3),
  ('/productos/mujer/bikers/short-ciclista-active-melange5.webp', 4)
) AS i(url, position);

-- Images for Melon
INSERT INTO product_images (product_id, color_id, url, alt_text, position, is_primary)
SELECT p.id, c.id, i.url, 'Short ciclista Active - Melon', i.position, i.position = 0
FROM (SELECT id FROM products WHERE slug = 'short-ciclista-active') p,
     (SELECT id FROM product_colors WHERE slug = 'melon' AND product_id = (SELECT id FROM products WHERE slug = 'short-ciclista-active')) c,
(VALUES
  ('/productos/mujer/bikers/short-ciclista-active-melon1.webp', 0),
  ('/productos/mujer/bikers/short-ciclista-active-melon2.webp', 1),
  ('/productos/mujer/bikers/short-ciclista-active-melon3.webp', 2),
  ('/productos/mujer/bikers/short-ciclista-active-melon4.webp', 3),
  ('/productos/mujer/bikers/short-ciclista-active-melon5.webp', 4)
) AS i(url, position);

-- Images for Negro
INSERT INTO product_images (product_id, color_id, url, alt_text, position, is_primary)
SELECT p.id, c.id, i.url, 'Short ciclista Active - Negro', i.position, i.position = 0
FROM (SELECT id FROM products WHERE slug = 'short-ciclista-active') p,
     (SELECT id FROM product_colors WHERE slug = 'negro' AND product_id = (SELECT id FROM products WHERE slug = 'short-ciclista-active')) c,
(VALUES
  ('/productos/mujer/bikers/short-ciclista-active-negro1.webp', 0),
  ('/productos/mujer/bikers/short-ciclista-active-negro2.webp', 1),
  ('/productos/mujer/bikers/short-ciclista-active-negro3.webp', 2),
  ('/productos/mujer/bikers/short-ciclista-active-negro4.webp', 3),
  ('/productos/mujer/bikers/short-ciclista-active-negro5.webp', 4)
) AS i(url, position);

-- Images for Rojo
INSERT INTO product_images (product_id, color_id, url, alt_text, position, is_primary)
SELECT p.id, c.id, i.url, 'Short ciclista Active - Rojo', i.position, i.position = 0
FROM (SELECT id FROM products WHERE slug = 'short-ciclista-active') p,
     (SELECT id FROM product_colors WHERE slug = 'rojo' AND product_id = (SELECT id FROM products WHERE slug = 'short-ciclista-active')) c,
(VALUES
  ('/productos/mujer/bikers/short-ciclista-active-rojo1.webp', 0),
  ('/productos/mujer/bikers/short-ciclista-active-rojo2.webp', 1),
  ('/productos/mujer/bikers/short-ciclista-active-rojo3.webp', 2),
  ('/productos/mujer/bikers/short-ciclista-active-rojo4.webp', 3),
  ('/productos/mujer/bikers/short-ciclista-active-rojo5.webp', 4)
) AS i(url, position);

-- Size variants
INSERT INTO product_variants (product_id, size, stock, is_active)
SELECT p.id, s.val, 10, true
FROM (SELECT id FROM products WHERE slug = 'short-ciclista-active') p,
(VALUES
  ('S'),
  ('M'),
  ('L'),
  ('XL')
) AS s(val);


-- ============================================
-- Product 7: Short Lux
-- ============================================

-- Insert product
INSERT INTO products (slug, title, price, original_price, category_id, fabric_id, audience, badge, tags, attributes, is_active, published_at)
VALUES (
  'short-lux',
  'Short Lux',
  28,
  NULL,
  (SELECT id FROM categories WHERE slug = 'bikers'),
  (SELECT id FROM fabrics WHERE slug = 'suplex-liso-premium'),
  'mujer',
  NULL,
  ARRAY['COD.205', 'Colección Infinity', 'Suplex Liso de Alta Elongación'],
  '{"material":"Suplex Liso de Alta Elongación","detalles":["Pretina tipo faja","Refuerzo trasero","Suplex liso de alta elongación","Largo corto (short)"],"beneficios":[]}'::jsonb,
  true,
  NOW()
);

-- Insert colors
INSERT INTO product_colors (product_id, name, slug, hex, position, is_active)
SELECT p.id, c.name, c.slug, c.hex, c.position, true
FROM (SELECT id FROM products WHERE slug = 'short-lux') p,
(VALUES
  ('Aqua', 'aqua', '#00CED1', 0),
  ('Azulino', 'azulino', '#87CEEB', 1),
  ('Blanco', 'blanco', '#FFFFFF', 2),
  ('Charcoal', 'charcoal', '#36454F', 3),
  ('Melange', 'melange', '#D3D3D3', 4),
  ('Melon', 'melon', '#FEBAAD', 5),
  ('Negro', 'negro', '#000000', 6),
  ('Rojo', 'rojo', '#FF0000', 7)
) AS c(name, slug, hex, position);

-- Images for Aqua
INSERT INTO product_images (product_id, color_id, url, alt_text, position, is_primary)
SELECT p.id, c.id, i.url, 'Short Lux - Aqua', i.position, i.position = 0
FROM (SELECT id FROM products WHERE slug = 'short-lux') p,
     (SELECT id FROM product_colors WHERE slug = 'aqua' AND product_id = (SELECT id FROM products WHERE slug = 'short-lux')) c,
(VALUES
  ('/productos/mujer/short/short-lux-aqua1.webp', 0),
  ('/productos/mujer/short/short-lux-aqua2.webp', 1),
  ('/productos/mujer/short/short-lux-aqua3.webp', 2),
  ('/productos/mujer/short/short-lux-aqua4.webp', 3),
  ('/productos/mujer/short/short-lux-aqua5.webp', 4)
) AS i(url, position);

-- Images for Azulino
INSERT INTO product_images (product_id, color_id, url, alt_text, position, is_primary)
SELECT p.id, c.id, i.url, 'Short Lux - Azulino', i.position, i.position = 0
FROM (SELECT id FROM products WHERE slug = 'short-lux') p,
     (SELECT id FROM product_colors WHERE slug = 'azulino' AND product_id = (SELECT id FROM products WHERE slug = 'short-lux')) c,
(VALUES
  ('/productos/mujer/short/short-lux-azulino1.webp', 0),
  ('/productos/mujer/short/short-lux-azulino2.webp', 1),
  ('/productos/mujer/short/short-lux-azulino3.webp', 2),
  ('/productos/mujer/short/short-lux-azulino4.webp', 3),
  ('/productos/mujer/short/short-lux-azulino5.webp', 4)
) AS i(url, position);

-- Images for Blanco
INSERT INTO product_images (product_id, color_id, url, alt_text, position, is_primary)
SELECT p.id, c.id, i.url, 'Short Lux - Blanco', i.position, i.position = 0
FROM (SELECT id FROM products WHERE slug = 'short-lux') p,
     (SELECT id FROM product_colors WHERE slug = 'blanco' AND product_id = (SELECT id FROM products WHERE slug = 'short-lux')) c,
(VALUES
  ('/productos/mujer/short/short-lux-blanco1.webp', 0),
  ('/productos/mujer/short/short-lux-blanco2.webp', 1),
  ('/productos/mujer/short/short-lux-blanco3.webp', 2),
  ('/productos/mujer/short/short-lux-blanco4.webp', 3),
  ('/productos/mujer/short/short-lux-blanco5.webp', 4)
) AS i(url, position);

-- Images for Charcoal
INSERT INTO product_images (product_id, color_id, url, alt_text, position, is_primary)
SELECT p.id, c.id, i.url, 'Short Lux - Charcoal', i.position, i.position = 0
FROM (SELECT id FROM products WHERE slug = 'short-lux') p,
     (SELECT id FROM product_colors WHERE slug = 'charcoal' AND product_id = (SELECT id FROM products WHERE slug = 'short-lux')) c,
(VALUES
  ('/productos/mujer/short/short-lux-charcoal1.webp', 0),
  ('/productos/mujer/short/short-lux-charcoal2.webp', 1),
  ('/productos/mujer/short/short-lux-charcoal3.webp', 2),
  ('/productos/mujer/short/short-lux-charcoal4.webp', 3),
  ('/productos/mujer/short/short-lux-charcoal5.webp', 4)
) AS i(url, position);

-- Images for Melange
INSERT INTO product_images (product_id, color_id, url, alt_text, position, is_primary)
SELECT p.id, c.id, i.url, 'Short Lux - Melange', i.position, i.position = 0
FROM (SELECT id FROM products WHERE slug = 'short-lux') p,
     (SELECT id FROM product_colors WHERE slug = 'melange' AND product_id = (SELECT id FROM products WHERE slug = 'short-lux')) c,
(VALUES
  ('/productos/mujer/short/short-lux-melange1.webp', 0),
  ('/productos/mujer/short/short-lux-melange2.webp', 1),
  ('/productos/mujer/short/short-lux-melange3.webp', 2),
  ('/productos/mujer/short/short-lux-melange4.webp', 3),
  ('/productos/mujer/short/short-lux-melange5.webp', 4)
) AS i(url, position);

-- Images for Melon
INSERT INTO product_images (product_id, color_id, url, alt_text, position, is_primary)
SELECT p.id, c.id, i.url, 'Short Lux - Melon', i.position, i.position = 0
FROM (SELECT id FROM products WHERE slug = 'short-lux') p,
     (SELECT id FROM product_colors WHERE slug = 'melon' AND product_id = (SELECT id FROM products WHERE slug = 'short-lux')) c,
(VALUES
  ('/productos/mujer/short/short-lux-melon1.webp', 0),
  ('/productos/mujer/short/short-lux-melon2.webp', 1),
  ('/productos/mujer/short/short-lux-melon3.webp', 2)
) AS i(url, position);

-- Images for Negro
INSERT INTO product_images (product_id, color_id, url, alt_text, position, is_primary)
SELECT p.id, c.id, i.url, 'Short Lux - Negro', i.position, i.position = 0
FROM (SELECT id FROM products WHERE slug = 'short-lux') p,
     (SELECT id FROM product_colors WHERE slug = 'negro' AND product_id = (SELECT id FROM products WHERE slug = 'short-lux')) c,
(VALUES
  ('/productos/mujer/short/short-lux-negro1.webp', 0),
  ('/productos/mujer/short/short-lux-negro2.webp', 1),
  ('/productos/mujer/short/short-lux-negro3.webp', 2)
) AS i(url, position);

-- Images for Rojo
INSERT INTO product_images (product_id, color_id, url, alt_text, position, is_primary)
SELECT p.id, c.id, i.url, 'Short Lux - Rojo', i.position, i.position = 0
FROM (SELECT id FROM products WHERE slug = 'short-lux') p,
     (SELECT id FROM product_colors WHERE slug = 'rojo' AND product_id = (SELECT id FROM products WHERE slug = 'short-lux')) c,
(VALUES
  ('/productos/mujer/short/short-lux-rojo1.webp', 0),
  ('/productos/mujer/short/short-lux-rojo2.webp', 1),
  ('/productos/mujer/short/short-lux-rojo3.webp', 2),
  ('/productos/mujer/short/short-lux-rojo4.webp', 3)
) AS i(url, position);

-- Size variants
INSERT INTO product_variants (product_id, size, stock, is_active)
SELECT p.id, s.val, 10, true
FROM (SELECT id FROM products WHERE slug = 'short-lux') p,
(VALUES
  ('S'),
  ('M'),
  ('L'),
  ('XL')
) AS s(val);


-- ============================================
-- Product 8: Short Brasil
-- ============================================

-- Insert product
INSERT INTO products (slug, title, price, original_price, category_id, fabric_id, audience, badge, tags, attributes, is_active, published_at)
VALUES (
  'short-brasil',
  'Short Brasil',
  20,
  NULL,
  (SELECT id FROM categories WHERE slug = 'shorts'),
  (SELECT id FROM fabrics WHERE slug = 'algodon-premium'),
  'mujer',
  NULL,
  ARRAY['COD.363', 'Colección Shorts Algodón Licrado', 'Algodón Licrado'],
  '{"material":"Algodón Licrado","detalles":["Pretina de cintura sin elástico","Algodón licrado","Estilo brasilero"],"beneficios":[]}'::jsonb,
  true,
  NOW()
);

-- Insert colors
INSERT INTO product_colors (product_id, name, slug, hex, position, is_active)
SELECT p.id, c.name, c.slug, c.hex, c.position, true
FROM (SELECT id FROM products WHERE slug = 'short-brasil') p,
(VALUES
  ('Beige', 'beige', '#F5F5DC', 0),
  ('Blanco', 'blanco', '#FFFFFF', 1),
  ('Negro', 'negro', '#000000', 2)
) AS c(name, slug, hex, position);

-- Images for Beige
INSERT INTO product_images (product_id, color_id, url, alt_text, position, is_primary)
SELECT p.id, c.id, i.url, 'Short Brasil - Beige', i.position, i.position = 0
FROM (SELECT id FROM products WHERE slug = 'short-brasil') p,
     (SELECT id FROM product_colors WHERE slug = 'beige' AND product_id = (SELECT id FROM products WHERE slug = 'short-brasil')) c,
(VALUES
  ('/productos/mujer/short/short-brasil-beige-short-brasil-beige1.webp', 0),
  ('/productos/mujer/short/short-brasil-beige-short-brasil-beige2.webp', 1),
  ('/productos/mujer/short/short-brasil-beige-short-brasil-beige3.webp', 2),
  ('/productos/mujer/short/short-brasil-beige-short-brasil-beige4.webp', 3),
  ('/productos/mujer/short/short-brasil-beige-short-brasil-beige5.webp', 4)
) AS i(url, position);

-- Images for Blanco
INSERT INTO product_images (product_id, color_id, url, alt_text, position, is_primary)
SELECT p.id, c.id, i.url, 'Short Brasil - Blanco', i.position, i.position = 0
FROM (SELECT id FROM products WHERE slug = 'short-brasil') p,
     (SELECT id FROM product_colors WHERE slug = 'blanco' AND product_id = (SELECT id FROM products WHERE slug = 'short-brasil')) c,
(VALUES
  ('/productos/mujer/short/short-brasil-blanco-short-brasil-blanco1.webp', 0),
  ('/productos/mujer/short/short-brasil-blanco-short-brasil-blanco2.webp', 1),
  ('/productos/mujer/short/short-brasil-blanco-short-brasil-blanco3.webp', 2),
  ('/productos/mujer/short/short-brasil-blanco-short-brasil-blanco4.webp', 3),
  ('/productos/mujer/short/short-brasil-blanco-short-brasil-blanco5.webp', 4)
) AS i(url, position);

-- Images for Negro
INSERT INTO product_images (product_id, color_id, url, alt_text, position, is_primary)
SELECT p.id, c.id, i.url, 'Short Brasil - Negro', i.position, i.position = 0
FROM (SELECT id FROM products WHERE slug = 'short-brasil') p,
     (SELECT id FROM product_colors WHERE slug = 'negro' AND product_id = (SELECT id FROM products WHERE slug = 'short-brasil')) c,
(VALUES
  ('/productos/mujer/short/short-brasil-negro-short-brasil-negro1.webp', 0),
  ('/productos/mujer/short/short-brasil-negro-short-brasil-negro2.webp', 1),
  ('/productos/mujer/short/short-brasil-negro-short-brasil-negro3.webp', 2),
  ('/productos/mujer/short/short-brasil-negro-short-brasil-negro4.webp', 3),
  ('/productos/mujer/short/short-brasil-negro-short-brasil-negro5.webp', 4)
) AS i(url, position);

-- Size variants
INSERT INTO product_variants (product_id, size, stock, is_active)
SELECT p.id, s.val, 10, true
FROM (SELECT id FROM products WHERE slug = 'short-brasil') p,
(VALUES
  ('S'),
  ('M'),
  ('L'),
  ('XL')
) AS s(val);


-- ============================================
-- Product 9: Maxi Short
-- ============================================

-- Insert product
INSERT INTO products (slug, title, price, original_price, category_id, fabric_id, audience, badge, tags, attributes, is_active, published_at)
VALUES (
  'maxi-short',
  'Maxi Short',
  19,
  NULL,
  (SELECT id FROM categories WHERE slug = 'shorts'),
  (SELECT id FROM fabrics WHERE slug = 'algodon-premium'),
  'mujer',
  NULL,
  ARRAY['COD.362', 'Colección Shorts Algodón Licrado', 'Algodón Licrado'],
  '{"material":"Algodón Licrado","detalles":["Versión short clásico a la cintura","Pierna más larga","Algodón licrado"],"beneficios":[]}'::jsonb,
  true,
  NOW()
);

-- Insert colors
INSERT INTO product_colors (product_id, name, slug, hex, position, is_active)
SELECT p.id, c.name, c.slug, c.hex, c.position, true
FROM (SELECT id FROM products WHERE slug = 'maxi-short') p,
(VALUES
  ('Beige', 'beige', '#F5F5DC', 0),
  ('Blanco', 'blanco', '#FFFFFF', 1),
  ('Negro', 'negro', '#000000', 2)
) AS c(name, slug, hex, position);

-- Images for Beige
INSERT INTO product_images (product_id, color_id, url, alt_text, position, is_primary)
SELECT p.id, c.id, i.url, 'Maxi Short - Beige', i.position, i.position = 0
FROM (SELECT id FROM products WHERE slug = 'maxi-short') p,
     (SELECT id FROM product_colors WHERE slug = 'beige' AND product_id = (SELECT id FROM products WHERE slug = 'maxi-short')) c,
(VALUES
  ('/productos/mujer/short/maxi-short-beige-MAXI-SHORT-BEIGE1.webp', 0),
  ('/productos/mujer/short/maxi-short-beige-MAXI-SHORT-BEIGE2.webp', 1),
  ('/productos/mujer/short/maxi-short-beige-MAXI-SHORT-BEIGE3.webp', 2),
  ('/productos/mujer/short/maxi-short-beige-MAXI-SHORT-BEIGE4.webp', 3),
  ('/productos/mujer/short/maxi-short-beige-MAXI-SHORT-BEIGE5.webp', 4)
) AS i(url, position);

-- Images for Blanco
INSERT INTO product_images (product_id, color_id, url, alt_text, position, is_primary)
SELECT p.id, c.id, i.url, 'Maxi Short - Blanco', i.position, i.position = 0
FROM (SELECT id FROM products WHERE slug = 'maxi-short') p,
     (SELECT id FROM product_colors WHERE slug = 'blanco' AND product_id = (SELECT id FROM products WHERE slug = 'maxi-short')) c,
(VALUES
  ('/productos/mujer/short/maxi-short-blanco-MAXI-SHORT-BLANCO.webp', 0),
  ('/productos/mujer/short/maxi-short-blanco-MAXI-SHORT-BLANCO2.webp', 1),
  ('/productos/mujer/short/maxi-short-blanco-MAXI-SHORT-BLANCO3.webp', 2),
  ('/productos/mujer/short/maxi-short-blanco-MAXI-SHORT-BLANCO4.webp', 3),
  ('/productos/mujer/short/maxi-short-blanco-MAXI-SHORT-BLANCO5.webp', 4)
) AS i(url, position);

-- Images for Negro
INSERT INTO product_images (product_id, color_id, url, alt_text, position, is_primary)
SELECT p.id, c.id, i.url, 'Maxi Short - Negro', i.position, i.position = 0
FROM (SELECT id FROM products WHERE slug = 'maxi-short') p,
     (SELECT id FROM product_colors WHERE slug = 'negro' AND product_id = (SELECT id FROM products WHERE slug = 'maxi-short')) c,
(VALUES
  ('/productos/mujer/short/maxi-short-negro-MAXI-SHORT-NEGRO1.webp', 0),
  ('/productos/mujer/short/maxi-short-negro-MAXI-SHORT-NEGRO2.webp', 1),
  ('/productos/mujer/short/maxi-short-negro-MAXI-SHORT-NEGRO3.webp', 2),
  ('/productos/mujer/short/maxi-short-negro-MAXI-SHORT-NEGRO4.webp', 3)
) AS i(url, position);

-- Size variants
INSERT INTO product_variants (product_id, size, stock, is_active)
SELECT p.id, s.val, 10, true
FROM (SELECT id FROM products WHERE slug = 'maxi-short') p,
(VALUES
  ('S'),
  ('M'),
  ('L'),
  ('XL')
) AS s(val);


-- ============================================
-- Product 10: Short clásico
-- ============================================

-- Insert product
INSERT INTO products (slug, title, price, original_price, category_id, fabric_id, audience, badge, tags, attributes, is_active, published_at)
VALUES (
  'short-clasico',
  'Short clásico',
  16,
  NULL,
  (SELECT id FROM categories WHERE slug = 'shorts'),
  (SELECT id FROM fabrics WHERE slug = 'algodon-premium'),
  'mujer',
  NULL,
  ARRAY['COD.360', 'Colección Shorts Algodón Licrado', 'Algodón Licrado'],
  '{"material":"Algodón Licrado","detalles":["Modelo clásico a la cintura","Algodón licrado"],"beneficios":[]}'::jsonb,
  true,
  NOW()
);

-- Insert colors
INSERT INTO product_colors (product_id, name, slug, hex, position, is_active)
SELECT p.id, c.name, c.slug, c.hex, c.position, true
FROM (SELECT id FROM products WHERE slug = 'short-clasico') p,
(VALUES
  ('Negro', 'negro', '#000000', 0),
  ('Rojo', 'rojo', '#FF0000', 1)
) AS c(name, slug, hex, position);

-- Images for Negro
INSERT INTO product_images (product_id, color_id, url, alt_text, position, is_primary)
SELECT p.id, c.id, i.url, 'Short clásico - Negro', i.position, i.position = 0
FROM (SELECT id FROM products WHERE slug = 'short-clasico') p,
     (SELECT id FROM product_colors WHERE slug = 'negro' AND product_id = (SELECT id FROM products WHERE slug = 'short-clasico')) c,
(VALUES
  ('/productos/mujer/short/short-clasico-negro1.webp', 0),
  ('/productos/mujer/short/short-clasico-negro2.webp', 1),
  ('/productos/mujer/short/short-clasico-negro3.webp', 2),
  ('/productos/mujer/short/short-clasico-negro4.webp', 3)
) AS i(url, position);

-- Images for Rojo
INSERT INTO product_images (product_id, color_id, url, alt_text, position, is_primary)
SELECT p.id, c.id, i.url, 'Short clásico - Rojo', i.position, i.position = 0
FROM (SELECT id FROM products WHERE slug = 'short-clasico') p,
     (SELECT id FROM product_colors WHERE slug = 'rojo' AND product_id = (SELECT id FROM products WHERE slug = 'short-clasico')) c,
(VALUES
  ('/productos/mujer/short/short-clasico-rojo1.webp', 0),
  ('/productos/mujer/short/short-clasico-rojo2.webp', 1),
  ('/productos/mujer/short/short-clasico-rojo3.webp', 2),
  ('/productos/mujer/short/short-clasico-rojo4.webp', 3),
  ('/productos/mujer/short/short-clasico-rojo5.webp', 4),
  ('/productos/mujer/short/short-clasico-rojo6.webp', 5)
) AS i(url, position);

-- Size variants
INSERT INTO product_variants (product_id, size, stock, is_active)
SELECT p.id, s.val, 10, true
FROM (SELECT id FROM products WHERE slug = 'short-clasico') p,
(VALUES
  ('S'),
  ('M'),
  ('L'),
  ('XL')
) AS s(val);


-- ============================================
-- Product 11: Mini Short
-- ============================================

-- Insert product
INSERT INTO products (slug, title, price, original_price, category_id, fabric_id, audience, badge, tags, attributes, is_active, published_at)
VALUES (
  'mini-short',
  'Mini Short',
  16,
  NULL,
  (SELECT id FROM categories WHERE slug = 'shorts'),
  (SELECT id FROM fabrics WHERE slug = 'algodon-premium'),
  'mujer',
  NULL,
  ARRAY['COD.361', 'Colección Shorts Algodón Licrado', 'Algodón Licrado'],
  '{"material":"Algodón Licrado","detalles":["Cintura semi baja","Pretina en la pierna","Algodón licrado"],"beneficios":[]}'::jsonb,
  true,
  NOW()
);

-- Insert colors
INSERT INTO product_colors (product_id, name, slug, hex, position, is_active)
SELECT p.id, c.name, c.slug, c.hex, c.position, true
FROM (SELECT id FROM products WHERE slug = 'mini-short') p,
(VALUES
  ('Beige', 'beige', '#F5F5DC', 0),
  ('Blanco', 'blanco', '#FFFFFF', 1),
  ('Negro', 'negro', '#000000', 2)
) AS c(name, slug, hex, position);

-- Images for Beige
INSERT INTO product_images (product_id, color_id, url, alt_text, position, is_primary)
SELECT p.id, c.id, i.url, 'Mini Short - Beige', i.position, i.position = 0
FROM (SELECT id FROM products WHERE slug = 'mini-short') p,
     (SELECT id FROM product_colors WHERE slug = 'beige' AND product_id = (SELECT id FROM products WHERE slug = 'mini-short')) c,
(VALUES
  ('/productos/mujer/short/mini-short-beige-mini-short-beige1.webp', 0),
  ('/productos/mujer/short/mini-short-beige-mini-short-beige5.webp', 1),
  ('/productos/mujer/short/mini-short-beige-mini-short-beige3.webp', 2),
  ('/productos/mujer/short/mini-short-beige-mini-short-beige4.webp', 3),
  ('/productos/mujer/short/mini-short-beige-mini-short-beige2.webp', 4)
) AS i(url, position);

-- Images for Blanco
INSERT INTO product_images (product_id, color_id, url, alt_text, position, is_primary)
SELECT p.id, c.id, i.url, 'Mini Short - Blanco', i.position, i.position = 0
FROM (SELECT id FROM products WHERE slug = 'mini-short') p,
     (SELECT id FROM product_colors WHERE slug = 'blanco' AND product_id = (SELECT id FROM products WHERE slug = 'mini-short')) c,
(VALUES
  ('/productos/mujer/short/mini-short-blanco-mini-short-blanco1.webp', 0),
  ('/productos/mujer/short/mini-short-blanco-mini-short-blanco5.webp', 1),
  ('/productos/mujer/short/mini-short-blanco-mini-short-blanco3.webp', 2),
  ('/productos/mujer/short/mini-short-blanco-mini-short-blanco4.webp', 3),
  ('/productos/mujer/short/mini-short-blanco-mini-short-blanco2.webp', 4)
) AS i(url, position);

-- Images for Negro
INSERT INTO product_images (product_id, color_id, url, alt_text, position, is_primary)
SELECT p.id, c.id, i.url, 'Mini Short - Negro', i.position, i.position = 0
FROM (SELECT id FROM products WHERE slug = 'mini-short') p,
     (SELECT id FROM product_colors WHERE slug = 'negro' AND product_id = (SELECT id FROM products WHERE slug = 'mini-short')) c,
(VALUES
  ('/productos/mujer/short/mini-short-negro-mini-short-negro.webp', 0),
  ('/productos/mujer/short/mini-short-negro-mini-short-negro5..webp', 1),
  ('/productos/mujer/short/mini-short-negro-mini-short-negro3..webp', 2),
  ('/productos/mujer/short/mini-short-negro-mini-short-negro4..webp', 3),
  ('/productos/mujer/short/mini-short-negro-mini-short-negro2..webp', 4)
) AS i(url, position);

-- Size variants
INSERT INTO product_variants (product_id, size, stock, is_active)
SELECT p.id, s.val, 10, true
FROM (SELECT id FROM products WHERE slug = 'mini-short') p,
(VALUES
  ('S'),
  ('M'),
  ('L'),
  ('XL')
) AS s(val);

COMMIT;
BEGIN;


-- ============================================
-- Product 12: Body manga corta suplex
-- ============================================

-- Insert product
INSERT INTO products (slug, title, price, original_price, category_id, fabric_id, audience, badge, tags, attributes, is_active, published_at)
VALUES (
  'body-manga-corta-suplex',
  'Body manga corta suplex',
  36,
  NULL,
  (SELECT id FROM categories WHERE slug = 'bodys'),
  (SELECT id FROM fabrics WHERE slug = 'suplex-liso-premium'),
  'mujer',
  NULL,
  ARRAY['COD.228', 'Colección Nueva Temporada', 'Suplex'],
  '{"material":"Suplex","detalles":["Body de suplex liso","Diseño bikini para más comodidad","Gafete regulable en la entrepierna","Manga corta"],"beneficios":[]}'::jsonb,
  true,
  NOW()
);

-- Insert colors
INSERT INTO product_colors (product_id, name, slug, hex, position, is_active)
SELECT p.id, c.name, c.slug, c.hex, c.position, true
FROM (SELECT id FROM products WHERE slug = 'body-manga-corta-suplex') p,
(VALUES
  ('Rojo', 'rojo', '#D22B2B', 0),
  ('Negro', 'negro', '#000000', 1),
  ('Blanco', 'blanco', '#FFFFFF', 2),
  ('Azul Marino', 'azul-marino', '#1E3A8A', 3)
) AS c(name, slug, hex, position);

-- Images for Rojo
INSERT INTO product_images (product_id, color_id, url, alt_text, position, is_primary)
SELECT p.id, c.id, i.url, 'Body manga corta suplex - Rojo', i.position, i.position = 0
FROM (SELECT id FROM products WHERE slug = 'body-manga-corta-suplex') p,
     (SELECT id FROM product_colors WHERE slug = 'rojo' AND product_id = (SELECT id FROM products WHERE slug = 'body-manga-corta-suplex')) c,
(VALUES
  ('/productos/mujer/bodys/body-manga-corta-suplex-liso-premium-rojo-body-rojo-suplex1.webp', 0),
  ('/productos/mujer/bodys/body-manga-corta-suplex-liso-premium-rojo-body-rojo-suplex2.webp', 1),
  ('/productos/mujer/bodys/body-manga-corta-suplex-liso-premium-rojo-body-rojo-suplex3.webp', 2),
  ('/productos/mujer/bodys/body-manga-corta-suplex-liso-premium-rojo-body-rojo-suplex-4.webp', 3),
  ('/productos/mujer/bodys/body-manga-corta-suplex-liso-premium-rojo-body-rojo-suplex5.webp', 4)
) AS i(url, position);

-- Images for Negro
INSERT INTO product_images (product_id, color_id, url, alt_text, position, is_primary)
SELECT p.id, c.id, i.url, 'Body manga corta suplex - Negro', i.position, i.position = 0
FROM (SELECT id FROM products WHERE slug = 'body-manga-corta-suplex') p,
     (SELECT id FROM product_colors WHERE slug = 'negro' AND product_id = (SELECT id FROM products WHERE slug = 'body-manga-corta-suplex')) c,
(VALUES
  ('/productos/mujer/bodys/body-manga-corta-suplex-liso-premium-negro-Body-mc-negro1.webp', 0),
  ('/productos/mujer/bodys/body-manga-corta-suplex-liso-premium-negro-body-mc-negro2.webp', 1),
  ('/productos/mujer/bodys/body-manga-corta-suplex-liso-premium-negro-body-mc-negro3.webp', 2),
  ('/productos/mujer/bodys/body-manga-corta-suplex-liso-premium-negro-body-mc-negro4.webp', 3),
  ('/productos/mujer/bodys/body-manga-corta-suplex-liso-premium-negro-body-mc-negro5.webp', 4)
) AS i(url, position);

-- Images for Blanco
INSERT INTO product_images (product_id, color_id, url, alt_text, position, is_primary)
SELECT p.id, c.id, i.url, 'Body manga corta suplex - Blanco', i.position, i.position = 0
FROM (SELECT id FROM products WHERE slug = 'body-manga-corta-suplex') p,
     (SELECT id FROM product_colors WHERE slug = 'blanco' AND product_id = (SELECT id FROM products WHERE slug = 'body-manga-corta-suplex')) c,
(VALUES
  ('/productos/mujer/bodys/body-manga-corta-suplex-liso-premium-blanco-body-mc-blanco-suplex1.webp', 0),
  ('/productos/mujer/bodys/body-manga-corta-suplex-liso-premium-blanco-body-mc-blanco-xuplex2.webp', 1),
  ('/productos/mujer/bodys/body-manga-corta-suplex-liso-premium-blanco-body-mc-blanoc-suplex3.webp', 2),
  ('/productos/mujer/bodys/body-manga-corta-suplex-liso-premium-blanco-body-mc-blanco4.webp', 3)
) AS i(url, position);

-- Images for Azul Marino
INSERT INTO product_images (product_id, color_id, url, alt_text, position, is_primary)
SELECT p.id, c.id, i.url, 'Body manga corta suplex - Azul Marino', i.position, i.position = 0
FROM (SELECT id FROM products WHERE slug = 'body-manga-corta-suplex') p,
     (SELECT id FROM product_colors WHERE slug = 'azul-marino' AND product_id = (SELECT id FROM products WHERE slug = 'body-manga-corta-suplex')) c,
(VALUES
  ('/productos/mujer/bodys/body-manga-corta-suplex-liso-premium-azul-marino-body-mc-azulmarino-suplex-1.webp', 0),
  ('/productos/mujer/bodys/body-manga-corta-suplex-liso-premium-azul-marino-body-mc-azulmarino-suplex2.webp', 1),
  ('/productos/mujer/bodys/body-manga-corta-suplex-liso-premium-azul-marino-body-mc-azulmarino-suplex3.webp', 2)
) AS i(url, position);

-- Size variants
INSERT INTO product_variants (product_id, size, stock, is_active)
SELECT p.id, s.val, 10, true
FROM (SELECT id FROM products WHERE slug = 'body-manga-corta-suplex') p,
(VALUES
  ('S'),
  ('M'),
  ('L'),
  ('XL')
) AS s(val);


-- ============================================
-- Product 13: Body manga corta
-- ============================================

-- Insert product
INSERT INTO products (slug, title, price, original_price, category_id, fabric_id, audience, badge, tags, attributes, is_active, published_at)
VALUES (
  'body-manga-corta',
  'Body manga corta',
  33,
  NULL,
  (SELECT id FROM categories WHERE slug = 'bodys'),
  (SELECT id FROM fabrics WHERE slug = 'algodon-premium'),
  'mujer',
  NULL,
  ARRAY['COD.435', 'Colección Bodys Algodón Licrado', 'Algodón Licrado'],
  '{"material":"Algodón Licrado","detalles":["Body de algodón licrado","Diseño bikini para más comodidad","Gafete graduable en la entrepierna"],"beneficios":[]}'::jsonb,
  true,
  NOW()
);

-- Insert colors
INSERT INTO product_colors (product_id, name, slug, hex, position, is_active)
SELECT p.id, c.name, c.slug, c.hex, c.position, true
FROM (SELECT id FROM products WHERE slug = 'body-manga-corta') p,
(VALUES
  ('Rosado', 'rosado', '#FFC0CB', 0),
  ('Rojo', 'rojo', '#D22B2B', 1),
  ('Negro', 'negro', '#000000', 2),
  ('Blanco', 'blanco', '#FFFFFF', 3),
  ('Beige', 'beige', '#F5F5DC', 4)
) AS c(name, slug, hex, position);

-- Images for Rosado
INSERT INTO product_images (product_id, color_id, url, alt_text, position, is_primary)
SELECT p.id, c.id, i.url, 'Body manga corta - Rosado', i.position, i.position = 0
FROM (SELECT id FROM products WHERE slug = 'body-manga-corta') p,
     (SELECT id FROM product_colors WHERE slug = 'rosado' AND product_id = (SELECT id FROM products WHERE slug = 'body-manga-corta')) c,
(VALUES
  ('/productos/mujer/bodys/body-manga-corta-rosado-body-mc-rosado2.webp', 0),
  ('/productos/mujer/bodys/body-manga-corta-rosado-body-mc-rosado3.webp', 1),
  ('/productos/mujer/bodys/body-manga-corta-rosado-body-mc-rosado4.webp', 2),
  ('/productos/mujer/bodys/body-manga-corta-rosado-body-mc-rosado5.webp', 3),
  ('/productos/mujer/bodys/body-manga-corta-rosado-body-mc-rosado1.webp', 4)
) AS i(url, position);

-- Images for Rojo
INSERT INTO product_images (product_id, color_id, url, alt_text, position, is_primary)
SELECT p.id, c.id, i.url, 'Body manga corta - Rojo', i.position, i.position = 0
FROM (SELECT id FROM products WHERE slug = 'body-manga-corta') p,
     (SELECT id FROM product_colors WHERE slug = 'rojo' AND product_id = (SELECT id FROM products WHERE slug = 'body-manga-corta')) c,
(VALUES
  ('/productos/mujer/bodys/body-manga-corta-rojo-manga-corta-rojo1.webp', 0),
  ('/productos/mujer/bodys/body-manga-corta-rojo-manga-corta-rojo2.webp', 1),
  ('/productos/mujer/bodys/body-manga-corta-rojo-manga-corta-rojo3.webp', 2),
  ('/productos/mujer/bodys/body-manga-corta-rojo-manga-corta-rojo4.webp', 3)
) AS i(url, position);

-- Images for Negro
INSERT INTO product_images (product_id, color_id, url, alt_text, position, is_primary)
SELECT p.id, c.id, i.url, 'Body manga corta - Negro', i.position, i.position = 0
FROM (SELECT id FROM products WHERE slug = 'body-manga-corta') p,
     (SELECT id FROM product_colors WHERE slug = 'negro' AND product_id = (SELECT id FROM products WHERE slug = 'body-manga-corta')) c,
(VALUES
  ('/productos/mujer/bodys/body-manga-corta-negro-manga-corta-negro1.webp', 0),
  ('/productos/mujer/bodys/body-manga-corta-negro-manga-corta-negro2.webp', 1),
  ('/productos/mujer/bodys/body-manga-corta-negro-manga-corta-negro3.webp', 2),
  ('/productos/mujer/bodys/body-manga-corta-negro-manga-corta-negro4.webp', 3)
) AS i(url, position);

-- Images for Blanco
INSERT INTO product_images (product_id, color_id, url, alt_text, position, is_primary)
SELECT p.id, c.id, i.url, 'Body manga corta - Blanco', i.position, i.position = 0
FROM (SELECT id FROM products WHERE slug = 'body-manga-corta') p,
     (SELECT id FROM product_colors WHERE slug = 'blanco' AND product_id = (SELECT id FROM products WHERE slug = 'body-manga-corta')) c,
(VALUES
  ('/productos/mujer/bodys/body-manga-corta-blanco-manga-corta-blanco1.webp', 0),
  ('/productos/mujer/bodys/body-manga-corta-blanco-manga-corta-blanco2.webp', 1),
  ('/productos/mujer/bodys/body-manga-corta-blanco-manga-corta-blanco3.webp', 2),
  ('/productos/mujer/bodys/body-manga-corta-blanco-manga-corta-blanco4.webp', 3)
) AS i(url, position);

-- Images for Beige
INSERT INTO product_images (product_id, color_id, url, alt_text, position, is_primary)
SELECT p.id, c.id, i.url, 'Body manga corta - Beige', i.position, i.position = 0
FROM (SELECT id FROM products WHERE slug = 'body-manga-corta') p,
     (SELECT id FROM product_colors WHERE slug = 'beige' AND product_id = (SELECT id FROM products WHERE slug = 'body-manga-corta')) c,
(VALUES
  ('/productos/mujer/bodys/body-manga-corta-beige-manga-corta-beige1.webp', 0),
  ('/productos/mujer/bodys/body-manga-corta-beige-manga-corta-beige2.webp', 1),
  ('/productos/mujer/bodys/body-manga-corta-beige-manga-corta-beige3.webp', 2),
  ('/productos/mujer/bodys/body-manga-corta-beige-manga-corta-beige4.webp', 3),
  ('/productos/mujer/bodys/body-manga-corta-beige-manga-corta-beige-5.webp', 4)
) AS i(url, position);

-- Size variants
INSERT INTO product_variants (product_id, size, stock, is_active)
SELECT p.id, s.val, 10, true
FROM (SELECT id FROM products WHERE slug = 'body-manga-corta') p,
(VALUES
  ('S'),
  ('M'),
  ('L'),
  ('XL')
) AS s(val);


-- ============================================
-- Product 14: Body manga larga
-- ============================================

-- Insert product
INSERT INTO products (slug, title, price, original_price, category_id, fabric_id, audience, badge, tags, attributes, is_active, published_at)
VALUES (
  'body-manga-larga',
  'Body manga larga',
  36,
  NULL,
  (SELECT id FROM categories WHERE slug = 'bodys'),
  (SELECT id FROM fabrics WHERE slug = 'algodon-premium'),
  'mujer',
  NULL,
  ARRAY['COD.436', 'Colección Bodys Algodón Licrado', 'Algodón Licrado'],
  '{"material":"Algodón Licrado","detalles":["Body de algodón licrado","Diseño bikini para más comodidad","Gafete graduable en la entrepierna","Manga larga"],"beneficios":[]}'::jsonb,
  true,
  NOW()
);

-- Insert colors
INSERT INTO product_colors (product_id, name, slug, hex, position, is_active)
SELECT p.id, c.name, c.slug, c.hex, c.position, true
FROM (SELECT id FROM products WHERE slug = 'body-manga-larga') p,
(VALUES
  ('Beige', 'beige', '#F5F5DC', 0),
  ('Blanco', 'blanco', '#FFFFFF', 1),
  ('Negro', 'negro', '#000000', 2),
  ('Rojo', 'rojo', '#D22B2B', 3),
  ('Rosado', 'rosado', '#FFC0CB', 4),
  ('Azul', 'azul', '#1E3A8A', 5)
) AS c(name, slug, hex, position);

-- Images for Beige
INSERT INTO product_images (product_id, color_id, url, alt_text, position, is_primary)
SELECT p.id, c.id, i.url, 'Body manga larga - Beige', i.position, i.position = 0
FROM (SELECT id FROM products WHERE slug = 'body-manga-larga') p,
     (SELECT id FROM product_colors WHERE slug = 'beige' AND product_id = (SELECT id FROM products WHERE slug = 'body-manga-larga')) c,
(VALUES
  ('/productos/mujer/bodys/body-manga-larga-beige-manga-larga-beige1.webp', 0),
  ('/productos/mujer/bodys/body-manga-larga-beige-manga-larga-beige2.webp', 1),
  ('/productos/mujer/bodys/body-manga-larga-beige-manga-larga-beige3.webp', 2),
  ('/productos/mujer/bodys/body-manga-larga-beige-manga-larga-beige4.webp', 3),
  ('/productos/mujer/bodys/body-manga-larga-beige-manga-larga-beige5.webp', 4)
) AS i(url, position);

-- Images for Blanco
INSERT INTO product_images (product_id, color_id, url, alt_text, position, is_primary)
SELECT p.id, c.id, i.url, 'Body manga larga - Blanco', i.position, i.position = 0
FROM (SELECT id FROM products WHERE slug = 'body-manga-larga') p,
     (SELECT id FROM product_colors WHERE slug = 'blanco' AND product_id = (SELECT id FROM products WHERE slug = 'body-manga-larga')) c,
(VALUES
  ('/productos/mujer/bodys/body-manga-larga-blanco-Body-manga-larga-blanco-1.webp', 0),
  ('/productos/mujer/bodys/body-manga-larga-blanco-Body-manga-larga-blanco-2.webp', 1),
  ('/productos/mujer/bodys/body-manga-larga-blanco-Body-manga-larga-blanco-3.webp', 2),
  ('/productos/mujer/bodys/body-manga-larga-blanco-Body-manga-larga-blanco-4.webp', 3)
) AS i(url, position);

-- Images for Negro
INSERT INTO product_images (product_id, color_id, url, alt_text, position, is_primary)
SELECT p.id, c.id, i.url, 'Body manga larga - Negro', i.position, i.position = 0
FROM (SELECT id FROM products WHERE slug = 'body-manga-larga') p,
     (SELECT id FROM product_colors WHERE slug = 'negro' AND product_id = (SELECT id FROM products WHERE slug = 'body-manga-larga')) c,
(VALUES
  ('/productos/mujer/bodys/body-manga-larga-negro-body-ml-negro1.webp', 0),
  ('/productos/mujer/bodys/body-manga-larga-negro-body-ml-negro2.webp', 1),
  ('/productos/mujer/bodys/body-manga-larga-negro-body-ml-negro3.webp', 2),
  ('/productos/mujer/bodys/body-manga-larga-negro-body-ml-negro4.webp', 3),
  ('/productos/mujer/bodys/body-manga-larga-negro-body-ml-negro5.webp', 4)
) AS i(url, position);

-- Images for Rojo
INSERT INTO product_images (product_id, color_id, url, alt_text, position, is_primary)
SELECT p.id, c.id, i.url, 'Body manga larga - Rojo', i.position, i.position = 0
FROM (SELECT id FROM products WHERE slug = 'body-manga-larga') p,
     (SELECT id FROM product_colors WHERE slug = 'rojo' AND product_id = (SELECT id FROM products WHERE slug = 'body-manga-larga')) c,
(VALUES
  ('/productos/mujer/bodys/body-manga-larga-rojo-body-ml-rojo1.webp', 0),
  ('/productos/mujer/bodys/body-manga-larga-rojo-body-ml-rojo2.webp', 1),
  ('/productos/mujer/bodys/body-manga-larga-rojo-body-ml-rojo3.webp', 2),
  ('/productos/mujer/bodys/body-manga-larga-rojo-body-ml-rojo4.webp', 3)
) AS i(url, position);

-- Images for Rosado
INSERT INTO product_images (product_id, color_id, url, alt_text, position, is_primary)
SELECT p.id, c.id, i.url, 'Body manga larga - Rosado', i.position, i.position = 0
FROM (SELECT id FROM products WHERE slug = 'body-manga-larga') p,
     (SELECT id FROM product_colors WHERE slug = 'rosado' AND product_id = (SELECT id FROM products WHERE slug = 'body-manga-larga')) c,
(VALUES
  ('/productos/mujer/bodys/body-manga-larga-rosado-body-ml-rosado1.webp', 0),
  ('/productos/mujer/bodys/body-manga-larga-rosado-body-ml-rosado2.webp', 1),
  ('/productos/mujer/bodys/body-manga-larga-rosado-body-ml-rosado3.webp', 2),
  ('/productos/mujer/bodys/body-manga-larga-rosado-body-ml-rosado4.webp', 3)
) AS i(url, position);

-- Images for Azul
INSERT INTO product_images (product_id, color_id, url, alt_text, position, is_primary)
SELECT p.id, c.id, i.url, 'Body manga larga - Azul', i.position, i.position = 0
FROM (SELECT id FROM products WHERE slug = 'body-manga-larga') p,
     (SELECT id FROM product_colors WHERE slug = 'azul' AND product_id = (SELECT id FROM products WHERE slug = 'body-manga-larga')) c,
(VALUES
  ('/productos/mujer/bodys/body-manga-larga-suplex-liso-premium-azul-marino-body-manga-larga-suplex-azulmarino1.webp', 0),
  ('/productos/mujer/bodys/body-manga-larga-suplex-liso-premium-azul-marino-body-manga-larga-suplex-azulmarino2.webp', 1),
  ('/productos/mujer/bodys/body-manga-larga-suplex-liso-premium-azul-marino-body-manga-larga-suplex-azulmarino3.webp', 2),
  ('/productos/mujer/bodys/body-manga-larga-suplex-liso-premium-azul-marino-body-manga-larga-suplex-azulmarino4.webp', 3),
  ('/productos/mujer/bodys/body-manga-larga-suplex-liso-premium-azul-marino-body-manga-larga-suplex-azulmarino5.webp', 4)
) AS i(url, position);

-- Size variants
INSERT INTO product_variants (product_id, size, stock, is_active)
SELECT p.id, s.val, 10, true
FROM (SELECT id FROM products WHERE slug = 'body-manga-larga') p,
(VALUES
  ('S'),
  ('M'),
  ('L'),
  ('XL')
) AS s(val);


-- ============================================
-- Product 15: Top Afrodita
-- ============================================

-- Insert product
INSERT INTO products (slug, title, price, original_price, category_id, fabric_id, audience, badge, tags, attributes, is_active, published_at)
VALUES (
  'top-afrodita',
  'Top Afrodita',
  32,
  NULL,
  (SELECT id FROM categories WHERE slug = 'tops'),
  (SELECT id FROM fabrics WHERE slug = 'suplex-liso-premium'),
  'mujer',
  NULL,
  ARRAY['COD.213', 'Colección Tops Suplex', 'Suplex + Algodón'],
  '{"material":"Suplex + Algodón","detalles":["Forro interno de algodón","Copas removibles y lavables","Diseño deportivo"],"beneficios":[]}'::jsonb,
  true,
  NOW()
);

-- Insert colors
INSERT INTO product_colors (product_id, name, slug, hex, position, is_active)
SELECT p.id, c.name, c.slug, c.hex, c.position, true
FROM (SELECT id FROM products WHERE slug = 'top-afrodita') p,
(VALUES
  ('Azulino', 'azulino', '#3A53A4', 0),
  ('Negro', 'negro', '#000000', 1),
  ('Rojo', 'rojo', '#D22B2B', 2)
) AS c(name, slug, hex, position);

-- Images for Azulino
INSERT INTO product_images (product_id, color_id, url, alt_text, position, is_primary)
SELECT p.id, c.id, i.url, 'Top Afrodita - Azulino', i.position, i.position = 0
FROM (SELECT id FROM products WHERE slug = 'top-afrodita') p,
     (SELECT id FROM product_colors WHERE slug = 'azulino' AND product_id = (SELECT id FROM products WHERE slug = 'top-afrodita')) c,
(VALUES
  ('/productos/mujer/tops/top-afrodita-suplex-liso-premium-azulino-afrodita-azulino1.webp', 0),
  ('/productos/mujer/tops/top-afrodita-suplex-liso-premium-azulino-afrodita-azulino2.webp', 1),
  ('/productos/mujer/tops/top-afrodita-suplex-liso-premium-azulino-afrodita-azulino3.webp', 2),
  ('/productos/mujer/tops/top-afrodita-suplex-liso-premium-azulino-afrodita-azulino4.webp', 3),
  ('/productos/mujer/tops/top-afrodita-suplex-liso-premium-azulino-afrodita-azulino5.webp', 4),
  ('/productos/mujer/tops/top-afrodita-suplex-liso-premium-azulino-afrodita-azulino6.webp', 5)
) AS i(url, position);

-- Images for Negro
INSERT INTO product_images (product_id, color_id, url, alt_text, position, is_primary)
SELECT p.id, c.id, i.url, 'Top Afrodita - Negro', i.position, i.position = 0
FROM (SELECT id FROM products WHERE slug = 'top-afrodita') p,
     (SELECT id FROM product_colors WHERE slug = 'negro' AND product_id = (SELECT id FROM products WHERE slug = 'top-afrodita')) c,
(VALUES
  ('/productos/mujer/tops/top-afrodita-suplex-liso-premium-negro-afrodita-negro1.webp', 0),
  ('/productos/mujer/tops/top-afrodita-suplex-liso-premium-negro-afrodita-negro2.webp', 1),
  ('/productos/mujer/tops/top-afrodita-suplex-liso-premium-negro-afrodita-negro3.webp', 2),
  ('/productos/mujer/tops/top-afrodita-suplex-liso-premium-negro-afrodita-negro4.webp', 3)
) AS i(url, position);

-- Images for Rojo
INSERT INTO product_images (product_id, color_id, url, alt_text, position, is_primary)
SELECT p.id, c.id, i.url, 'Top Afrodita - Rojo', i.position, i.position = 0
FROM (SELECT id FROM products WHERE slug = 'top-afrodita') p,
     (SELECT id FROM product_colors WHERE slug = 'rojo' AND product_id = (SELECT id FROM products WHERE slug = 'top-afrodita')) c,
(VALUES
  ('/productos/mujer/tops/top-afrodita-suplex-liso-premium-rojo-afrodita-rojo1.webp', 0),
  ('/productos/mujer/tops/top-afrodita-suplex-liso-premium-rojo-afrodita-rojo2.webp', 1),
  ('/productos/mujer/tops/top-afrodita-suplex-liso-premium-rojo-afrodita-rojo3.webp', 2),
  ('/productos/mujer/tops/top-afrodita-suplex-liso-premium-rojo-afrodita-rojo4.webp', 3),
  ('/productos/mujer/tops/top-afrodita-suplex-liso-premium-rojo-afrodita-rojo5.webp', 4)
) AS i(url, position);

-- Size variants
INSERT INTO product_variants (product_id, size, stock, is_active)
SELECT p.id, s.val, 10, true
FROM (SELECT id FROM products WHERE slug = 'top-afrodita') p,
(VALUES
  ('S'),
  ('M'),
  ('L')
) AS s(val);


-- ============================================
-- Product 16: Top Venus
-- ============================================

-- Insert product
INSERT INTO products (slug, title, price, original_price, category_id, fabric_id, audience, badge, tags, attributes, is_active, published_at)
VALUES (
  'top-venus',
  'Top Venus',
  32,
  NULL,
  (SELECT id FROM categories WHERE slug = 'tops'),
  (SELECT id FROM fabrics WHERE slug = 'suplex-liso-premium'),
  'mujer',
  NULL,
  ARRAY['COD.215', 'Colección Tops Suplex', 'Suplex + Algodón'],
  '{"material":"Suplex + Algodón","detalles":["Forro interno de algodón","Copas removibles y lavables","Diseño deportivo"],"beneficios":[]}'::jsonb,
  true,
  NOW()
);

-- Insert colors
INSERT INTO product_colors (product_id, name, slug, hex, position, is_active)
SELECT p.id, c.name, c.slug, c.hex, c.position, true
FROM (SELECT id FROM products WHERE slug = 'top-venus') p,
(VALUES
  ('Azulino', 'azulino', '#87CEEB', 0),
  ('Blanco', 'blanco', '#FFFFFF', 1),
  ('Charcoal', 'charcoal', '#36454F', 2),
  ('Negro', 'negro', '#000000', 3),
  ('Rojo', 'rojo', '#FF0000', 4)
) AS c(name, slug, hex, position);

-- Images for Azulino
INSERT INTO product_images (product_id, color_id, url, alt_text, position, is_primary)
SELECT p.id, c.id, i.url, 'Top Venus - Azulino', i.position, i.position = 0
FROM (SELECT id FROM products WHERE slug = 'top-venus') p,
     (SELECT id FROM product_colors WHERE slug = 'azulino' AND product_id = (SELECT id FROM products WHERE slug = 'top-venus')) c,
(VALUES
  ('/productos/mujer/tops/top-venus-azulino1.webp', 0),
  ('/productos/mujer/tops/top-venus-azulino2.webp', 1),
  ('/productos/mujer/tops/top-venus-azulino3.webp', 2),
  ('/productos/mujer/tops/top-venus-azulino4.webp', 3)
) AS i(url, position);

-- Images for Blanco
INSERT INTO product_images (product_id, color_id, url, alt_text, position, is_primary)
SELECT p.id, c.id, i.url, 'Top Venus - Blanco', i.position, i.position = 0
FROM (SELECT id FROM products WHERE slug = 'top-venus') p,
     (SELECT id FROM product_colors WHERE slug = 'blanco' AND product_id = (SELECT id FROM products WHERE slug = 'top-venus')) c,
(VALUES
  ('/productos/mujer/tops/top-venus-blanco1.webp', 0),
  ('/productos/mujer/tops/top-venus-blanco2.webp', 1),
  ('/productos/mujer/tops/top-venus-blanco3.webp', 2),
  ('/productos/mujer/tops/top-venus-blanco4.webp', 3),
  ('/productos/mujer/tops/top-venus-blanco5.webp', 4)
) AS i(url, position);

-- Images for Charcoal
INSERT INTO product_images (product_id, color_id, url, alt_text, position, is_primary)
SELECT p.id, c.id, i.url, 'Top Venus - Charcoal', i.position, i.position = 0
FROM (SELECT id FROM products WHERE slug = 'top-venus') p,
     (SELECT id FROM product_colors WHERE slug = 'charcoal' AND product_id = (SELECT id FROM products WHERE slug = 'top-venus')) c,
(VALUES
  ('/productos/mujer/tops/top-venus-charcoal1.webp', 0),
  ('/productos/mujer/tops/top-venus-charcoal2.webp', 1),
  ('/productos/mujer/tops/top-venus-charcoal3.webp', 2),
  ('/productos/mujer/tops/top-venus-charcoal4.webp', 3),
  ('/productos/mujer/tops/top-venus-charcoal5.webp', 4)
) AS i(url, position);

-- Images for Negro
INSERT INTO product_images (product_id, color_id, url, alt_text, position, is_primary)
SELECT p.id, c.id, i.url, 'Top Venus - Negro', i.position, i.position = 0
FROM (SELECT id FROM products WHERE slug = 'top-venus') p,
     (SELECT id FROM product_colors WHERE slug = 'negro' AND product_id = (SELECT id FROM products WHERE slug = 'top-venus')) c,
(VALUES
  ('/productos/mujer/tops/top-venus-negro1.webp', 0),
  ('/productos/mujer/tops/top-venus-negro2.webp', 1),
  ('/productos/mujer/tops/top-venus-negro3.webp', 2),
  ('/productos/mujer/tops/top-venus-negro4.webp', 3),
  ('/productos/mujer/tops/top-venus-negro5.webp', 4)
) AS i(url, position);

-- Images for Rojo
INSERT INTO product_images (product_id, color_id, url, alt_text, position, is_primary)
SELECT p.id, c.id, i.url, 'Top Venus - Rojo', i.position, i.position = 0
FROM (SELECT id FROM products WHERE slug = 'top-venus') p,
     (SELECT id FROM product_colors WHERE slug = 'rojo' AND product_id = (SELECT id FROM products WHERE slug = 'top-venus')) c,
(VALUES
  ('/productos/mujer/tops/top-venus-rojo1.webp', 0),
  ('/productos/mujer/tops/top-venus-rojo2.webp', 1),
  ('/productos/mujer/tops/top-venus-rojo3.webp', 2),
  ('/productos/mujer/tops/top-venus-rojo4.webp', 3),
  ('/productos/mujer/tops/top-venus-rojo5.webp', 4),
  ('/productos/mujer/tops/top-venus-rojo6.webp', 5)
) AS i(url, position);

-- Size variants
INSERT INTO product_variants (product_id, size, stock, is_active)
SELECT p.id, s.val, 10, true
FROM (SELECT id FROM products WHERE slug = 'top-venus') p,
(VALUES
  ('S'),
  ('M'),
  ('L')
) AS s(val);


-- ============================================
-- Product 17: Top Paradise
-- ============================================

-- Insert product
INSERT INTO products (slug, title, price, original_price, category_id, fabric_id, audience, badge, tags, attributes, is_active, published_at)
VALUES (
  'top-paradise',
  'Top Paradise',
  32,
  NULL,
  (SELECT id FROM categories WHERE slug = 'tops'),
  (SELECT id FROM fabrics WHERE slug = 'suplex-liso-premium'),
  'mujer',
  NULL,
  ARRAY['COD.104', 'Colección Tops Suplex', 'Suplex + Algodón'],
  '{"material":"Suplex + Algodón","detalles":["Forro interno de algodón","Copas removibles y lavables","Diseño deportivo"],"beneficios":[]}'::jsonb,
  true,
  NOW()
);

-- Insert colors
INSERT INTO product_colors (product_id, name, slug, hex, position, is_active)
SELECT p.id, c.name, c.slug, c.hex, c.position, true
FROM (SELECT id FROM products WHERE slug = 'top-paradise') p,
(VALUES
  ('Azulino', 'azulino', '#3A53A4', 0),
  ('Blanco', 'blanco', '#FFFFFF', 1),
  ('Charcoal', 'charcoal', '#5A5A5A', 2),
  ('Negro', 'negro', '#000000', 3),
  ('Rojo', 'rojo', '#D22B2B', 4)
) AS c(name, slug, hex, position);

-- Images for Azulino
INSERT INTO product_images (product_id, color_id, url, alt_text, position, is_primary)
SELECT p.id, c.id, i.url, 'Top Paradise - Azulino', i.position, i.position = 0
FROM (SELECT id FROM products WHERE slug = 'top-paradise') p,
     (SELECT id FROM product_colors WHERE slug = 'azulino' AND product_id = (SELECT id FROM products WHERE slug = 'top-paradise')) c,
(VALUES
  ('/productos/mujer/tops/top-paradise-suplex-liso-premium-azulino-paradise-azulino1.webp', 0),
  ('/productos/mujer/tops/top-paradise-suplex-liso-premium-azulino-paradise-azulino2.webp', 1),
  ('/productos/mujer/tops/top-paradise-suplex-liso-premium-azulino-paradise-azulino3.webp', 2),
  ('/productos/mujer/tops/top-paradise-suplex-liso-premium-azulino-paradise-azulino4.webp', 3)
) AS i(url, position);

-- Images for Blanco
INSERT INTO product_images (product_id, color_id, url, alt_text, position, is_primary)
SELECT p.id, c.id, i.url, 'Top Paradise - Blanco', i.position, i.position = 0
FROM (SELECT id FROM products WHERE slug = 'top-paradise') p,
     (SELECT id FROM product_colors WHERE slug = 'blanco' AND product_id = (SELECT id FROM products WHERE slug = 'top-paradise')) c,
(VALUES
  ('/productos/mujer/tops/top-paradise-suplex-liso-premium-blanco-paradise-blanco1.webp', 0),
  ('/productos/mujer/tops/top-paradise-suplex-liso-premium-blanco-paradise-blanco2.webp', 1),
  ('/productos/mujer/tops/top-paradise-suplex-liso-premium-blanco-paradise-blanco3.webp', 2),
  ('/productos/mujer/tops/top-paradise-suplex-liso-premium-blanco-paradise-blanco4.webp', 3)
) AS i(url, position);

-- Images for Charcoal
INSERT INTO product_images (product_id, color_id, url, alt_text, position, is_primary)
SELECT p.id, c.id, i.url, 'Top Paradise - Charcoal', i.position, i.position = 0
FROM (SELECT id FROM products WHERE slug = 'top-paradise') p,
     (SELECT id FROM product_colors WHERE slug = 'charcoal' AND product_id = (SELECT id FROM products WHERE slug = 'top-paradise')) c,
(VALUES
  ('/productos/mujer/tops/top-paradise-suplex-liso-premium-charcoal-paradise-charcoal1.webp', 0),
  ('/productos/mujer/tops/top-paradise-suplex-liso-premium-charcoal-paradise-charcoal2.webp', 1),
  ('/productos/mujer/tops/top-paradise-suplex-liso-premium-charcoal-paradise-charcoal3.webp', 2),
  ('/productos/mujer/tops/top-paradise-suplex-liso-premium-charcoal-paradise-charcoal4.webp', 3)
) AS i(url, position);

-- Images for Negro
INSERT INTO product_images (product_id, color_id, url, alt_text, position, is_primary)
SELECT p.id, c.id, i.url, 'Top Paradise - Negro', i.position, i.position = 0
FROM (SELECT id FROM products WHERE slug = 'top-paradise') p,
     (SELECT id FROM product_colors WHERE slug = 'negro' AND product_id = (SELECT id FROM products WHERE slug = 'top-paradise')) c,
(VALUES
  ('/productos/mujer/tops/top-paradise-suplex-liso-premium-negro-paradise-negro1.webp', 0),
  ('/productos/mujer/tops/top-paradise-suplex-liso-premium-negro-paradise-negro2.webp', 1),
  ('/productos/mujer/tops/top-paradise-suplex-liso-premium-negro-paradise-negro3.webp', 2),
  ('/productos/mujer/tops/top-paradise-suplex-liso-premium-negro-paradise-negro4.webp', 3),
  ('/productos/mujer/tops/top-paradise-suplex-liso-premium-negro-paradise-negro5.webp', 4)
) AS i(url, position);

-- Images for Rojo
INSERT INTO product_images (product_id, color_id, url, alt_text, position, is_primary)
SELECT p.id, c.id, i.url, 'Top Paradise - Rojo', i.position, i.position = 0
FROM (SELECT id FROM products WHERE slug = 'top-paradise') p,
     (SELECT id FROM product_colors WHERE slug = 'rojo' AND product_id = (SELECT id FROM products WHERE slug = 'top-paradise')) c,
(VALUES
  ('/productos/mujer/tops/top-paradise-suplex-liso-premium-rojo-paradise-rojo1.webp', 0),
  ('/productos/mujer/tops/top-paradise-suplex-liso-premium-rojo-paradise-rojo2.webp', 1),
  ('/productos/mujer/tops/top-paradise-suplex-liso-premium-rojo-paradise-rojo3.webp', 2),
  ('/productos/mujer/tops/top-paradise-suplex-liso-premium-rojo-paradise-rojo4.webp', 3)
) AS i(url, position);

-- Size variants
INSERT INTO product_variants (product_id, size, stock, is_active)
SELECT p.id, s.val, 10, true
FROM (SELECT id FROM products WHERE slug = 'top-paradise') p,
(VALUES
  ('S'),
  ('M'),
  ('L')
) AS s(val);


-- ============================================
-- Product 18: Top Jungle
-- ============================================

-- Insert product
INSERT INTO products (slug, title, price, original_price, category_id, fabric_id, audience, badge, tags, attributes, is_active, published_at)
VALUES (
  'top-jungle',
  'Top Jungle',
  32,
  NULL,
  (SELECT id FROM categories WHERE slug = 'tops'),
  (SELECT id FROM fabrics WHERE slug = 'suplex-liso-premium'),
  'mujer',
  NULL,
  ARRAY['COD.109', 'Colección Tops Suplex', 'Suplex + Algodón'],
  '{"material":"Suplex + Algodón","detalles":["Forro interno de algodón","Copas removibles y lavables","Diseño deportivo"],"beneficios":[]}'::jsonb,
  true,
  NOW()
);

-- Insert colors
INSERT INTO product_colors (product_id, name, slug, hex, position, is_active)
SELECT p.id, c.name, c.slug, c.hex, c.position, true
FROM (SELECT id FROM products WHERE slug = 'top-jungle') p,
(VALUES
  ('Azulino', 'azulino', '#87CEEB', 0),
  ('Charcoal', 'charcoal', '#36454F', 1),
  ('Negro', 'negro', '#000000', 2),
  ('Rojo', 'rojo', '#FF0000', 3)
) AS c(name, slug, hex, position);

-- Images for Azulino
INSERT INTO product_images (product_id, color_id, url, alt_text, position, is_primary)
SELECT p.id, c.id, i.url, 'Top Jungle - Azulino', i.position, i.position = 0
FROM (SELECT id FROM products WHERE slug = 'top-jungle') p,
     (SELECT id FROM product_colors WHERE slug = 'azulino' AND product_id = (SELECT id FROM products WHERE slug = 'top-jungle')) c,
(VALUES
  ('/productos/mujer/tops/top-jungle-azulino1.webp', 0),
  ('/productos/mujer/tops/top-jungle-azulino2.webp', 1),
  ('/productos/mujer/tops/top-jungle-azulino3.webp', 2),
  ('/productos/mujer/tops/top-jungle-azulino4.webp', 3)
) AS i(url, position);

-- Images for Charcoal
INSERT INTO product_images (product_id, color_id, url, alt_text, position, is_primary)
SELECT p.id, c.id, i.url, 'Top Jungle - Charcoal', i.position, i.position = 0
FROM (SELECT id FROM products WHERE slug = 'top-jungle') p,
     (SELECT id FROM product_colors WHERE slug = 'charcoal' AND product_id = (SELECT id FROM products WHERE slug = 'top-jungle')) c,
(VALUES
  ('/productos/mujer/tops/top-jungle-charcoal1.webp', 0),
  ('/productos/mujer/tops/top-jungle-charcoal2.webp', 1),
  ('/productos/mujer/tops/top-jungle-charcoal3.webp', 2),
  ('/productos/mujer/tops/top-jungle-charcoal4.webp', 3)
) AS i(url, position);

-- Images for Negro
INSERT INTO product_images (product_id, color_id, url, alt_text, position, is_primary)
SELECT p.id, c.id, i.url, 'Top Jungle - Negro', i.position, i.position = 0
FROM (SELECT id FROM products WHERE slug = 'top-jungle') p,
     (SELECT id FROM product_colors WHERE slug = 'negro' AND product_id = (SELECT id FROM products WHERE slug = 'top-jungle')) c,
(VALUES
  ('/productos/mujer/tops/top-jungle-negro1.webp', 0),
  ('/productos/mujer/tops/top-jungle-negro2.webp', 1),
  ('/productos/mujer/tops/top-jungle-negro3.webp', 2),
  ('/productos/mujer/tops/top-jungle-negro4.webp', 3)
) AS i(url, position);

-- Images for Rojo
INSERT INTO product_images (product_id, color_id, url, alt_text, position, is_primary)
SELECT p.id, c.id, i.url, 'Top Jungle - Rojo', i.position, i.position = 0
FROM (SELECT id FROM products WHERE slug = 'top-jungle') p,
     (SELECT id FROM product_colors WHERE slug = 'rojo' AND product_id = (SELECT id FROM products WHERE slug = 'top-jungle')) c,
(VALUES
  ('/productos/mujer/tops/top-jungle-rojo1.webp', 0),
  ('/productos/mujer/tops/top-jungle-rojo2.webp', 1),
  ('/productos/mujer/tops/top-jungle-rojo3.webp', 2),
  ('/productos/mujer/tops/top-jungle-rojo4.webp', 3)
) AS i(url, position);

-- Size variants
INSERT INTO product_variants (product_id, size, stock, is_active)
SELECT p.id, s.val, 10, true
FROM (SELECT id FROM products WHERE slug = 'top-jungle') p,
(VALUES
  ('S'),
  ('M'),
  ('L')
) AS s(val);


-- ============================================
-- Product 19: Top Soporte
-- ============================================

-- Insert product
INSERT INTO products (slug, title, price, original_price, category_id, fabric_id, audience, badge, tags, attributes, is_active, published_at)
VALUES (
  'top-soporte',
  'Top Soporte',
  35,
  NULL,
  (SELECT id FROM categories WHERE slug = 'tops'),
  (SELECT id FROM fabrics WHERE slug = 'algodon-premium'),
  'mujer',
  NULL,
  ARRAY[]::text[],
  '{"material":"Algodón Premium","detalles":["Diseño deportivo elegante","Soporte medio confortable","Tejido elástico"],"beneficios":["Comodidad absoluta","Transpirable y fresco","Perfecto para el día a día"]}'::jsonb,
  true,
  NOW()
);

-- Insert colors
INSERT INTO product_colors (product_id, name, slug, hex, position, is_active)
SELECT p.id, c.name, c.slug, c.hex, c.position, true
FROM (SELECT id FROM products WHERE slug = 'top-soporte') p,
(VALUES
  ('Beige', 'beige', '#F5F5DC', 0),
  ('Blanco', 'blanco', '#FFFFFF', 1),
  ('Negro', 'negro', '#000000', 2)
) AS c(name, slug, hex, position);

-- Images for Beige
INSERT INTO product_images (product_id, color_id, url, alt_text, position, is_primary)
SELECT p.id, c.id, i.url, 'Top Soporte - Beige', i.position, i.position = 0
FROM (SELECT id FROM products WHERE slug = 'top-soporte') p,
     (SELECT id FROM product_colors WHERE slug = 'beige' AND product_id = (SELECT id FROM products WHERE slug = 'top-soporte')) c,
(VALUES
  ('/productos/mujer/tops/top-soporte-beige1.webp', 0),
  ('/productos/mujer/tops/top-soporte-beige2.webp', 1),
  ('/productos/mujer/tops/top-soporte-beige3.webp', 2),
  ('/productos/mujer/tops/top-soporte-beige4.webp', 3),
  ('/productos/mujer/tops/top-soporte-beige5.webp', 4)
) AS i(url, position);

-- Images for Blanco
INSERT INTO product_images (product_id, color_id, url, alt_text, position, is_primary)
SELECT p.id, c.id, i.url, 'Top Soporte - Blanco', i.position, i.position = 0
FROM (SELECT id FROM products WHERE slug = 'top-soporte') p,
     (SELECT id FROM product_colors WHERE slug = 'blanco' AND product_id = (SELECT id FROM products WHERE slug = 'top-soporte')) c,
(VALUES
  ('/productos/mujer/tops/top-soporte-blanco1.webp', 0),
  ('/productos/mujer/tops/top-soporte-blanco2.webp', 1),
  ('/productos/mujer/tops/top-soporte-blanco3.webp', 2),
  ('/productos/mujer/tops/top-soporte-blanco4.webp', 3),
  ('/productos/mujer/tops/top-soporte-blanco5.webp', 4)
) AS i(url, position);

-- Images for Negro
INSERT INTO product_images (product_id, color_id, url, alt_text, position, is_primary)
SELECT p.id, c.id, i.url, 'Top Soporte - Negro', i.position, i.position = 0
FROM (SELECT id FROM products WHERE slug = 'top-soporte') p,
     (SELECT id FROM product_colors WHERE slug = 'negro' AND product_id = (SELECT id FROM products WHERE slug = 'top-soporte')) c,
(VALUES
  ('/productos/mujer/tops/top-soporte-negro1.webp', 0),
  ('/productos/mujer/tops/top-soporte-negro2.webp', 1),
  ('/productos/mujer/tops/top-soporte-negro3.webp', 2),
  ('/productos/mujer/tops/top-soporte-negro4.webp', 3)
) AS i(url, position);

-- Size variants
INSERT INTO product_variants (product_id, size, stock, is_active)
SELECT p.id, s.val, 10, true
FROM (SELECT id FROM products WHERE slug = 'top-soporte') p,
(VALUES
  ('XS'),
  ('S'),
  ('M'),
  ('L'),
  ('XL')
) AS s(val);


-- ============================================
-- Product 20: Top Arena
-- ============================================

-- Insert product
INSERT INTO products (slug, title, price, original_price, category_id, fabric_id, audience, badge, tags, attributes, is_active, published_at)
VALUES (
  'top-arena',
  'Top Arena',
  34,
  NULL,
  (SELECT id FROM categories WHERE slug = 'tops'),
  (SELECT id FROM fabrics WHERE slug = 'algodon-premium'),
  'mujer',
  NULL,
  ARRAY[]::text[],
  '{"material":"Algodón Premium","detalles":["Diseño deportivo elegante","Soporte medio confortable","Tejido elástico"],"beneficios":["Comodidad absoluta","Transpirable y fresco","Perfecto para el día a día"]}'::jsonb,
  true,
  NOW()
);

-- Insert colors
INSERT INTO product_colors (product_id, name, slug, hex, position, is_active)
SELECT p.id, c.name, c.slug, c.hex, c.position, true
FROM (SELECT id FROM products WHERE slug = 'top-arena') p,
(VALUES
  ('Blanco', 'blanco', '#FFFFFF', 0)
) AS c(name, slug, hex, position);

-- Images for Blanco
INSERT INTO product_images (product_id, color_id, url, alt_text, position, is_primary)
SELECT p.id, c.id, i.url, 'Top Arena - Blanco', i.position, i.position = 0
FROM (SELECT id FROM products WHERE slug = 'top-arena') p,
     (SELECT id FROM product_colors WHERE slug = 'blanco' AND product_id = (SELECT id FROM products WHERE slug = 'top-arena')) c,
(VALUES
  ('/productos/mujer/tops/top-arena-blanco1.webp', 0),
  ('/productos/mujer/tops/top-arena-blanco2.webp', 1),
  ('/productos/mujer/tops/top-arena-blanco3.webp', 2),
  ('/productos/mujer/tops/top-arena-blanco4.webp', 3)
) AS i(url, position);

-- Size variants
INSERT INTO product_variants (product_id, size, stock, is_active)
SELECT p.id, s.val, 10, true
FROM (SELECT id FROM products WHERE slug = 'top-arena') p,
(VALUES
  ('XS'),
  ('S'),
  ('M'),
  ('L'),
  ('XL')
) AS s(val);


-- ============================================
-- Product 21: Top Zafiro
-- ============================================

-- Insert product
INSERT INTO products (slug, title, price, original_price, category_id, fabric_id, audience, badge, tags, attributes, is_active, published_at)
VALUES (
  'top-zafiro',
  'Top Zafiro',
  34,
  NULL,
  (SELECT id FROM categories WHERE slug = 'tops'),
  (SELECT id FROM fabrics WHERE slug = 'algodon-premium'),
  'mujer',
  NULL,
  ARRAY[]::text[],
  '{"material":"Algodón Premium","detalles":["Diseño deportivo elegante","Soporte medio confortable","Tejido elástico"],"beneficios":["Comodidad absoluta","Transpirable y fresco","Perfecto para el día a día"]}'::jsonb,
  true,
  NOW()
);

-- Insert colors
INSERT INTO product_colors (product_id, name, slug, hex, position, is_active)
SELECT p.id, c.name, c.slug, c.hex, c.position, true
FROM (SELECT id FROM products WHERE slug = 'top-zafiro') p,
(VALUES
  ('Blanco', 'blanco', '#FFFFFF', 0),
  ('Negro', 'negro', '#000000', 1)
) AS c(name, slug, hex, position);

-- Images for Blanco
INSERT INTO product_images (product_id, color_id, url, alt_text, position, is_primary)
SELECT p.id, c.id, i.url, 'Top Zafiro - Blanco', i.position, i.position = 0
FROM (SELECT id FROM products WHERE slug = 'top-zafiro') p,
     (SELECT id FROM product_colors WHERE slug = 'blanco' AND product_id = (SELECT id FROM products WHERE slug = 'top-zafiro')) c,
(VALUES
  ('/productos/mujer/tops/top-zafiro-blanco1.webp', 0),
  ('/productos/mujer/tops/top-zafiro-blanco2.webp', 1),
  ('/productos/mujer/tops/top-zafiro-blanco3.webp', 2),
  ('/productos/mujer/tops/top-zafiro-blanco4.webp', 3),
  ('/productos/mujer/tops/top-zafiro-blanco5.webp', 4)
) AS i(url, position);

-- Images for Negro
INSERT INTO product_images (product_id, color_id, url, alt_text, position, is_primary)
SELECT p.id, c.id, i.url, 'Top Zafiro - Negro', i.position, i.position = 0
FROM (SELECT id FROM products WHERE slug = 'top-zafiro') p,
     (SELECT id FROM product_colors WHERE slug = 'negro' AND product_id = (SELECT id FROM products WHERE slug = 'top-zafiro')) c,
(VALUES
  ('/productos/mujer/tops/top-zafiro-negro1.webp', 0),
  ('/productos/mujer/tops/top-zafiro-negro2.webp', 1),
  ('/productos/mujer/tops/top-zafiro-negro3.webp', 2),
  ('/productos/mujer/tops/top-zafiro-negro4.webp', 3),
  ('/productos/mujer/tops/top-zafiro-negro5.webp', 4)
) AS i(url, position);

-- Size variants
INSERT INTO product_variants (product_id, size, stock, is_active)
SELECT p.id, s.val, 10, true
FROM (SELECT id FROM products WHERE slug = 'top-zafiro') p,
(VALUES
  ('XS'),
  ('S'),
  ('M'),
  ('L'),
  ('XL')
) AS s(val);

COMMIT;
BEGIN;


-- ============================================
-- Product 22: Top Luna
-- ============================================

-- Insert product
INSERT INTO products (slug, title, price, original_price, category_id, fabric_id, audience, badge, tags, attributes, is_active, published_at)
VALUES (
  'top-luna',
  'Top Luna',
  28,
  NULL,
  (SELECT id FROM categories WHERE slug = 'tops'),
  (SELECT id FROM fabrics WHERE slug = 'algodon-premium'),
  'mujer',
  NULL,
  ARRAY['Algodón Licrado', 'Top Deportivo'],
  '{"material":"Algodón Licrado","detalles":["Copas internas removibles","Diseño deportivo elegante","Algodón licrado premium"],"beneficios":[]}'::jsonb,
  true,
  NOW()
);

-- Insert colors
INSERT INTO product_colors (product_id, name, slug, hex, position, is_active)
SELECT p.id, c.name, c.slug, c.hex, c.position, true
FROM (SELECT id FROM products WHERE slug = 'top-luna') p,
(VALUES
  ('Beige', 'beige', '#F5F5DC', 0),
  ('Blanco', 'blanco', '#FFFFFF', 1),
  ('Negro', 'negro', '#000000', 2)
) AS c(name, slug, hex, position);

-- Images for Beige
INSERT INTO product_images (product_id, color_id, url, alt_text, position, is_primary)
SELECT p.id, c.id, i.url, 'Top Luna - Beige', i.position, i.position = 0
FROM (SELECT id FROM products WHERE slug = 'top-luna') p,
     (SELECT id FROM product_colors WHERE slug = 'beige' AND product_id = (SELECT id FROM products WHERE slug = 'top-luna')) c,
(VALUES
  ('/productos/mujer/tops/top-luna-beige1.webp', 0),
  ('/productos/mujer/tops/top-luna-beige2.webp', 1),
  ('/productos/mujer/tops/top-luna-beige3.webp', 2),
  ('/productos/mujer/tops/top-luna-beige4.webp', 3),
  ('/productos/mujer/tops/top-luna-beige5.webp', 4)
) AS i(url, position);

-- Images for Blanco
INSERT INTO product_images (product_id, color_id, url, alt_text, position, is_primary)
SELECT p.id, c.id, i.url, 'Top Luna - Blanco', i.position, i.position = 0
FROM (SELECT id FROM products WHERE slug = 'top-luna') p,
     (SELECT id FROM product_colors WHERE slug = 'blanco' AND product_id = (SELECT id FROM products WHERE slug = 'top-luna')) c,
(VALUES
  ('/productos/mujer/tops/top-luna-blanco1.webp', 0),
  ('/productos/mujer/tops/top-luna-blanco2.webp', 1),
  ('/productos/mujer/tops/top-luna-blanco3.webp', 2),
  ('/productos/mujer/tops/top-luna-blanco4.webp', 3),
  ('/productos/mujer/tops/top-luna-blanco5.webp', 4)
) AS i(url, position);

-- Images for Negro
INSERT INTO product_images (product_id, color_id, url, alt_text, position, is_primary)
SELECT p.id, c.id, i.url, 'Top Luna - Negro', i.position, i.position = 0
FROM (SELECT id FROM products WHERE slug = 'top-luna') p,
     (SELECT id FROM product_colors WHERE slug = 'negro' AND product_id = (SELECT id FROM products WHERE slug = 'top-luna')) c,
(VALUES
  ('/productos/mujer/tops/top-luna-negro1.webp', 0),
  ('/productos/mujer/tops/top-luna-negro2.webp', 1),
  ('/productos/mujer/tops/top-luna-negro3.webp', 2),
  ('/productos/mujer/tops/top-luna-negro4.webp', 3),
  ('/productos/mujer/tops/top-luna-negro5.webp', 4)
) AS i(url, position);

-- Size variants
INSERT INTO product_variants (product_id, size, stock, is_active)
SELECT p.id, s.val, 10, true
FROM (SELECT id FROM products WHERE slug = 'top-luna') p,
(VALUES
  ('S'),
  ('M'),
  ('L'),
  ('XL')
) AS s(val);


-- ============================================
-- Product 23: Top Perla
-- ============================================

-- Insert product
INSERT INTO products (slug, title, price, original_price, category_id, fabric_id, audience, badge, tags, attributes, is_active, published_at)
VALUES (
  'top-perla',
  'Top Perla',
  27,
  NULL,
  (SELECT id FROM categories WHERE slug = 'tops'),
  (SELECT id FROM fabrics WHERE slug = 'algodon-premium'),
  'mujer',
  NULL,
  ARRAY[]::text[],
  '{"material":"Algodón Premium","detalles":["Diseño deportivo elegante","Soporte medio confortable","Tejido elástico"],"beneficios":["Comodidad absoluta","Transpirable y fresco","Perfecto para el día a día"]}'::jsonb,
  true,
  NOW()
);

-- Insert colors
INSERT INTO product_colors (product_id, name, slug, hex, position, is_active)
SELECT p.id, c.name, c.slug, c.hex, c.position, true
FROM (SELECT id FROM products WHERE slug = 'top-perla') p,
(VALUES
  ('Blanco', 'blanco', '#FFFFFF', 0)
) AS c(name, slug, hex, position);

-- Images for Blanco
INSERT INTO product_images (product_id, color_id, url, alt_text, position, is_primary)
SELECT p.id, c.id, i.url, 'Top Perla - Blanco', i.position, i.position = 0
FROM (SELECT id FROM products WHERE slug = 'top-perla') p,
     (SELECT id FROM product_colors WHERE slug = 'blanco' AND product_id = (SELECT id FROM products WHERE slug = 'top-perla')) c,
(VALUES
  ('/productos/mujer/tops/top-perla-blanco1.webp', 0),
  ('/productos/mujer/tops/top-perla-blanco2.webp', 1),
  ('/productos/mujer/tops/top-perla-blanco3.webp', 2),
  ('/productos/mujer/tops/top-perla-blanco4.webp', 3),
  ('/productos/mujer/tops/top-perla-blanco5.webp', 4)
) AS i(url, position);

-- Size variants
INSERT INTO product_variants (product_id, size, stock, is_active)
SELECT p.id, s.val, 10, true
FROM (SELECT id FROM products WHERE slug = 'top-perla') p,
(VALUES
  ('XS'),
  ('S'),
  ('M'),
  ('L'),
  ('XL')
) AS s(val);


-- ============================================
-- Product 24: Enterizo tiras
-- ============================================

-- Insert product
INSERT INTO products (slug, title, price, original_price, category_id, fabric_id, audience, badge, tags, attributes, is_active, published_at)
VALUES (
  'enterizo-tiras',
  'Enterizo tiras',
  49,
  NULL,
  (SELECT id FROM categories WHERE slug = 'enterizo'),
  (SELECT id FROM fabrics WHERE slug = 'suplex-liso-premium'),
  'mujer',
  NULL,
  ARRAY['COD.219', 'enterizo', 'enterizo tiras', 'enterizos', 'enterizos dama', 'línea suplex dama', 'dama', 'damas', 'tiras'],
  '{"material":"Suplex","detalles":["Suplex liso de alta elongación","Diseño con tiras"],"beneficios":[]}'::jsonb,
  true,
  NOW()
);

-- Insert colors
INSERT INTO product_colors (product_id, name, slug, hex, position, is_active)
SELECT p.id, c.name, c.slug, c.hex, c.position, true
FROM (SELECT id FROM products WHERE slug = 'enterizo-tiras') p,
(VALUES
  ('Azulino', 'azulino', '#3A53A4', 0),
  ('Blanco', 'blanco', '#FFFFFF', 1),
  ('Charcoal', 'charcoal', '#5A5A5A', 2)
) AS c(name, slug, hex, position);

-- Images for Azulino
INSERT INTO product_images (product_id, color_id, url, alt_text, position, is_primary)
SELECT p.id, c.id, i.url, 'Enterizo tiras - Azulino', i.position, i.position = 0
FROM (SELECT id FROM products WHERE slug = 'enterizo-tiras') p,
     (SELECT id FROM product_colors WHERE slug = 'azulino' AND product_id = (SELECT id FROM products WHERE slug = 'enterizo-tiras')) c,
(VALUES
  ('/productos/mujer/enterizo/enterizo-tiras-suplex-liso-premium-azulino-enterizo-azulino1.webp', 0),
  ('/productos/mujer/enterizo/enterizo-tiras-suplex-liso-premium-azulino-enterizo-azulino2.webp', 1),
  ('/productos/mujer/enterizo/enterizo-tiras-suplex-liso-premium-azulino-enterizo-azulino3.webp', 2),
  ('/productos/mujer/enterizo/enterizo-tiras-suplex-liso-premium-azulino-enterizo-azulino4.webp', 3),
  ('/productos/mujer/enterizo/enterizo-tiras-suplex-liso-premium-azulino-enterizo-azulino5.webp', 4)
) AS i(url, position);

-- Images for Blanco
INSERT INTO product_images (product_id, color_id, url, alt_text, position, is_primary)
SELECT p.id, c.id, i.url, 'Enterizo tiras - Blanco', i.position, i.position = 0
FROM (SELECT id FROM products WHERE slug = 'enterizo-tiras') p,
     (SELECT id FROM product_colors WHERE slug = 'blanco' AND product_id = (SELECT id FROM products WHERE slug = 'enterizo-tiras')) c,
(VALUES
  ('/productos/mujer/enterizo/enterizo-tiras-suplex-liso-premium-blanco-enterizo-blanco1.webp', 0),
  ('/productos/mujer/enterizo/enterizo-tiras-suplex-liso-premium-blanco-enterizo-blanco2.webp', 1),
  ('/productos/mujer/enterizo/enterizo-tiras-suplex-liso-premium-blanco-enterizo-blanco3.webp', 2),
  ('/productos/mujer/enterizo/enterizo-tiras-suplex-liso-premium-blanco-enterizo-blanco4.webp', 3),
  ('/productos/mujer/enterizo/enterizo-tiras-suplex-liso-premium-blanco-enterizo-blanco5.webp', 4)
) AS i(url, position);

-- Images for Charcoal
INSERT INTO product_images (product_id, color_id, url, alt_text, position, is_primary)
SELECT p.id, c.id, i.url, 'Enterizo tiras - Charcoal', i.position, i.position = 0
FROM (SELECT id FROM products WHERE slug = 'enterizo-tiras') p,
     (SELECT id FROM product_colors WHERE slug = 'charcoal' AND product_id = (SELECT id FROM products WHERE slug = 'enterizo-tiras')) c,
(VALUES
  ('/productos/mujer/enterizo/enterizo-tiras-suplex-liso-premium-charcoal-enterizo-charcoal1.webp', 0),
  ('/productos/mujer/enterizo/enterizo-tiras-suplex-liso-premium-charcoal-enterizo-charcoal2.webp', 1),
  ('/productos/mujer/enterizo/enterizo-tiras-suplex-liso-premium-charcoal-enterizo-charcoal3.webp', 2),
  ('/productos/mujer/enterizo/enterizo-tiras-suplex-liso-premium-charcoal-enterizo-charcoal4.webp', 3),
  ('/productos/mujer/enterizo/enterizo-tiras-suplex-liso-premium-charcoal-enterizo-charcoal5.webp', 4)
) AS i(url, position);

-- Size variants
INSERT INTO product_variants (product_id, size, stock, is_active)
SELECT p.id, s.val, 10, true
FROM (SELECT id FROM products WHERE slug = 'enterizo-tiras') p,
(VALUES
  ('S'),
  ('M'),
  ('L')
) AS s(val);


-- ============================================
-- Product 25: Enterizo manga cero
-- ============================================

-- Insert product
INSERT INTO products (slug, title, price, original_price, category_id, fabric_id, audience, badge, tags, attributes, is_active, published_at)
VALUES (
  'enterizo-manga-cero',
  'Enterizo manga cero',
  49,
  NULL,
  (SELECT id FROM categories WHERE slug = 'enterizo'),
  (SELECT id FROM fabrics WHERE slug = 'suplex-liso-premium'),
  'mujer',
  NULL,
  ARRAY['COD.221', 'enterizo', 'enterizo manga cero', 'enterizos', 'enterizos dama', 'línea suplex dama', 'dama', 'damas'],
  '{"material":"Suplex","detalles":["Suplex liso de alta elongación","Manga cero (sin mangas)"],"beneficios":[]}'::jsonb,
  true,
  NOW()
);

-- Insert colors
INSERT INTO product_colors (product_id, name, slug, hex, position, is_active)
SELECT p.id, c.name, c.slug, c.hex, c.position, true
FROM (SELECT id FROM products WHERE slug = 'enterizo-manga-cero') p,
(VALUES
  ('Azulino', 'azulino', '#3A53A4', 0),
  ('Blanco', 'blanco', '#FFFFFF', 1)
) AS c(name, slug, hex, position);

-- Images for Azulino
INSERT INTO product_images (product_id, color_id, url, alt_text, position, is_primary)
SELECT p.id, c.id, i.url, 'Enterizo manga cero - Azulino', i.position, i.position = 0
FROM (SELECT id FROM products WHERE slug = 'enterizo-manga-cero') p,
     (SELECT id FROM product_colors WHERE slug = 'azulino' AND product_id = (SELECT id FROM products WHERE slug = 'enterizo-manga-cero')) c,
(VALUES
  ('/productos/mujer/enterizo/enterizo-manga-cero-suplex-liso-premium-azulino-Manga-cero-azulino1.webp', 0),
  ('/productos/mujer/enterizo/enterizo-manga-cero-suplex-liso-premium-azulino-manga-cero-azulino2.webp', 1),
  ('/productos/mujer/enterizo/enterizo-manga-cero-suplex-liso-premium-azulino-manga-cero-azulino3.webp', 2),
  ('/productos/mujer/enterizo/enterizo-manga-cero-suplex-liso-premium-azulino-manga-cero-azulino4.webp', 3),
  ('/productos/mujer/enterizo/enterizo-manga-cero-suplex-liso-premium-azulino-manga-cero-azulino5.webp', 4),
  ('/productos/mujer/enterizo/enterizo-manga-cero-suplex-liso-premium-azulino-manga-cero-azulino6.webp', 5)
) AS i(url, position);

-- Images for Blanco
INSERT INTO product_images (product_id, color_id, url, alt_text, position, is_primary)
SELECT p.id, c.id, i.url, 'Enterizo manga cero - Blanco', i.position, i.position = 0
FROM (SELECT id FROM products WHERE slug = 'enterizo-manga-cero') p,
     (SELECT id FROM product_colors WHERE slug = 'blanco' AND product_id = (SELECT id FROM products WHERE slug = 'enterizo-manga-cero')) c,
(VALUES
  ('/productos/mujer/enterizo/enterizo-manga-cero-suplex-liso-premium-blanco-manga-cero-blanco1.webp', 0),
  ('/productos/mujer/enterizo/enterizo-manga-cero-suplex-liso-premium-blanco-manga-cero-blanco2.webp', 1),
  ('/productos/mujer/enterizo/enterizo-manga-cero-suplex-liso-premium-blanco-manga-cero-blanco3.webp', 2),
  ('/productos/mujer/enterizo/enterizo-manga-cero-suplex-liso-premium-blanco-manga-cero-blanco4.webp', 3),
  ('/productos/mujer/enterizo/enterizo-manga-cero-suplex-liso-premium-blanco-manga-cero-blanco5.webp', 4),
  ('/productos/mujer/enterizo/enterizo-manga-cero-suplex-liso-premium-blanco-manga-cero-blanco6.webp', 5)
) AS i(url, position);

-- Size variants
INSERT INTO product_variants (product_id, size, stock, is_active)
SELECT p.id, s.val, 10, true
FROM (SELECT id FROM products WHERE slug = 'enterizo-manga-cero') p,
(VALUES
  ('S'),
  ('M'),
  ('L')
) AS s(val);


-- ============================================
-- Product 26: Legging Slim
-- ============================================

-- Insert product
INSERT INTO products (slug, title, price, original_price, category_id, fabric_id, audience, badge, tags, attributes, is_active, published_at)
VALUES (
  'legging-slim',
  'Legging Slim',
  59,
  NULL,
  (SELECT id FROM categories WHERE slug = 'legging'),
  (SELECT id FROM fabrics WHERE slug = 'suplex-liso-premium'),
  'mujer',
  NULL,
  ARRAY['COD.S-1011', 'Colección Especial Suplex', 'Suplex Liso'],
  '{"material":"Suplex Liso","detalles":["Suplex liso","Diseño slim","Alta variedad de colores"],"beneficios":[]}'::jsonb,
  true,
  NOW()
);

-- Insert colors
INSERT INTO product_colors (product_id, name, slug, hex, position, is_active)
SELECT p.id, c.name, c.slug, c.hex, c.position, true
FROM (SELECT id FROM products WHERE slug = 'legging-slim') p,
(VALUES
  ('Azul Marino', 'azul-marino', '#1E3A8A', 0),
  ('Blanco', 'blanco', '#FFFFFF', 1),
  ('Acero', 'acero', '#808080', 2),
  ('Aqua', 'aqua', '#00FFFF', 3),
  ('Azulino', 'azulino', '#3A53A4', 4),
  ('Camel', 'camel', '#C19A6B', 5)
) AS c(name, slug, hex, position);

-- Images for Azul Marino
INSERT INTO product_images (product_id, color_id, url, alt_text, position, is_primary)
SELECT p.id, c.id, i.url, 'Legging Slim - Azul Marino', i.position, i.position = 0
FROM (SELECT id FROM products WHERE slug = 'legging-slim') p,
     (SELECT id FROM product_colors WHERE slug = 'azul-marino' AND product_id = (SELECT id FROM products WHERE slug = 'legging-slim')) c,
(VALUES
  ('/productos/mujer/legging/legging-slim-suplex-liso-premium-azul-marino-legging-azul-marino1.webp', 0),
  ('/productos/mujer/legging/legging-slim-suplex-liso-premium-azul-marino-legging-azul-marino2.webp', 1),
  ('/productos/mujer/legging/legging-slim-suplex-liso-premium-azul-marino-legging-azul-marino3.webp', 2),
  ('/productos/mujer/legging/legging-slim-suplex-liso-premium-azul-marino-legging-azul-marino4.webp', 3)
) AS i(url, position);

-- Images for Blanco
INSERT INTO product_images (product_id, color_id, url, alt_text, position, is_primary)
SELECT p.id, c.id, i.url, 'Legging Slim - Blanco', i.position, i.position = 0
FROM (SELECT id FROM products WHERE slug = 'legging-slim') p,
     (SELECT id FROM product_colors WHERE slug = 'blanco' AND product_id = (SELECT id FROM products WHERE slug = 'legging-slim')) c,
(VALUES
  ('/productos/mujer/legging/legging-slim-suplex-liso-premium-blanco-legging-slim-blanco1.webp', 0),
  ('/productos/mujer/legging/legging-slim-suplex-liso-premium-blanco-legging-slim-blanco2.webp', 1),
  ('/productos/mujer/legging/legging-slim-suplex-liso-premium-blanco-legging-slim-blanco3.webp', 2),
  ('/productos/mujer/legging/legging-slim-suplex-liso-premium-blanco-legging-slim-blanco4.webp', 3)
) AS i(url, position);

-- Images for Acero
INSERT INTO product_images (product_id, color_id, url, alt_text, position, is_primary)
SELECT p.id, c.id, i.url, 'Legging Slim - Acero', i.position, i.position = 0
FROM (SELECT id FROM products WHERE slug = 'legging-slim') p,
     (SELECT id FROM product_colors WHERE slug = 'acero' AND product_id = (SELECT id FROM products WHERE slug = 'legging-slim')) c,
(VALUES
  ('/productos/mujer/legging/legging-slim-suplex-liso-premium-acero-legging-slim-acero1.webp', 0),
  ('/productos/mujer/legging/legging-slim-suplex-liso-premium-acero-legging-slim-acero2.webp', 1),
  ('/productos/mujer/legging/legging-slim-suplex-liso-premium-acero-legging-slim-acero3.webp', 2),
  ('/productos/mujer/legging/legging-slim-suplex-liso-premium-acero-legging-slim-acero4.webp', 3),
  ('/productos/mujer/legging/legging-slim-suplex-liso-premium-acero-legging-slim-acero5.webp', 4)
) AS i(url, position);

-- Images for Aqua
INSERT INTO product_images (product_id, color_id, url, alt_text, position, is_primary)
SELECT p.id, c.id, i.url, 'Legging Slim - Aqua', i.position, i.position = 0
FROM (SELECT id FROM products WHERE slug = 'legging-slim') p,
     (SELECT id FROM product_colors WHERE slug = 'aqua' AND product_id = (SELECT id FROM products WHERE slug = 'legging-slim')) c,
(VALUES
  ('/productos/mujer/legging/legging-slim-suplex-liso-premium-aqua-legging-slim-aqua1.webp', 0),
  ('/productos/mujer/legging/legging-slim-suplex-liso-premium-aqua-legging-slim-aqua2.webp', 1),
  ('/productos/mujer/legging/legging-slim-suplex-liso-premium-aqua-legging-slim-aqua3.webp', 2),
  ('/productos/mujer/legging/legging-slim-suplex-liso-premium-aqua-legging-slim-aqua4.webp', 3),
  ('/productos/mujer/legging/legging-slim-suplex-liso-premium-aqua-legging-slim-aqua5.webp', 4)
) AS i(url, position);

-- Images for Azulino
INSERT INTO product_images (product_id, color_id, url, alt_text, position, is_primary)
SELECT p.id, c.id, i.url, 'Legging Slim - Azulino', i.position, i.position = 0
FROM (SELECT id FROM products WHERE slug = 'legging-slim') p,
     (SELECT id FROM product_colors WHERE slug = 'azulino' AND product_id = (SELECT id FROM products WHERE slug = 'legging-slim')) c,
(VALUES
  ('/productos/mujer/legging/legging-slim-suplex-liso-premium-azulino-legging-slim-azulino-1.webp', 0),
  ('/productos/mujer/legging/legging-slim-suplex-liso-premium-azulino-legging-slim-azulino-2.webp', 1),
  ('/productos/mujer/legging/legging-slim-suplex-liso-premium-azulino-legging-slim-azulino-3.webp', 2),
  ('/productos/mujer/legging/legging-slim-suplex-liso-premium-azulino-legging-slim-azulino-4.webp', 3)
) AS i(url, position);

-- Images for Camel
INSERT INTO product_images (product_id, color_id, url, alt_text, position, is_primary)
SELECT p.id, c.id, i.url, 'Legging Slim - Camel', i.position, i.position = 0
FROM (SELECT id FROM products WHERE slug = 'legging-slim') p,
     (SELECT id FROM product_colors WHERE slug = 'camel' AND product_id = (SELECT id FROM products WHERE slug = 'legging-slim')) c,
(VALUES
  ('/productos/mujer/legging/legging-slim-suplex-liso-premium-camel-legging-slim-camel1.webp', 0),
  ('/productos/mujer/legging/legging-slim-suplex-liso-premium-camel-legging-slim-camel2.webp', 1),
  ('/productos/mujer/legging/legging-slim-suplex-liso-premium-camel-legging-slim-camel3.webp', 2)
) AS i(url, position);

-- Size variants
INSERT INTO product_variants (product_id, size, stock, is_active)
SELECT p.id, s.val, 10, true
FROM (SELECT id FROM products WHERE slug = 'legging-slim') p,
(VALUES
  ('S'),
  ('M'),
  ('L'),
  ('XL')
) AS s(val);


-- ============================================
-- Product 27: Camiseta tropical
-- ============================================

-- Insert product
INSERT INTO products (slug, title, price, original_price, category_id, fabric_id, audience, badge, tags, attributes, is_active, published_at)
VALUES (
  'camiseta-tropical',
  'Camiseta tropical',
  21,
  35,
  (SELECT id FROM categories WHERE slug = 'camisetas'),
  (SELECT id FROM fabrics WHERE slug = 'algodon-premium'),
  'mujer',
  'oferta',
  ARRAY['COD.388', 'Colección Camisetas Algodón Licrado', 'Algodón Licrado'],
  '{"material":"Algodón Licrado","detalles":["Diseño tropical","Algodón licrado"],"beneficios":[]}'::jsonb,
  true,
  NOW()
);

-- Insert colors
INSERT INTO product_colors (product_id, name, slug, hex, position, is_active)
SELECT p.id, c.name, c.slug, c.hex, c.position, true
FROM (SELECT id FROM products WHERE slug = 'camiseta-tropical') p,
(VALUES
  ('Blanco', 'blanco', '#FFFFFF', 0)
) AS c(name, slug, hex, position);

-- Images for Blanco
INSERT INTO product_images (product_id, color_id, url, alt_text, position, is_primary)
SELECT p.id, c.id, i.url, 'Camiseta tropical - Blanco', i.position, i.position = 0
FROM (SELECT id FROM products WHERE slug = 'camiseta-tropical') p,
     (SELECT id FROM product_colors WHERE slug = 'blanco' AND product_id = (SELECT id FROM products WHERE slug = 'camiseta-tropical')) c,
(VALUES
  ('/productos/mujer/camisetas/camiseta-tropical-blanco1.webp', 0),
  ('/productos/mujer/camisetas/camiseta-tropical-blanco2.webp', 1)
) AS i(url, position);

-- Size variants
INSERT INTO product_variants (product_id, size, stock, is_active)
SELECT p.id, s.val, 10, true
FROM (SELECT id FROM products WHERE slug = 'camiseta-tropical') p,
(VALUES
  ('S'),
  ('M'),
  ('L'),
  ('XL')
) AS s(val);


-- ============================================
-- Product 28: Camiseta deportiva
-- ============================================

-- Insert product
INSERT INTO products (slug, title, price, original_price, category_id, fabric_id, audience, badge, tags, attributes, is_active, published_at)
VALUES (
  'camiseta-deportiva',
  'Camiseta deportiva',
  24,
  NULL,
  (SELECT id FROM categories WHERE slug = 'camisetas'),
  (SELECT id FROM fabrics WHERE slug = 'algodon-premium'),
  'mujer',
  NULL,
  ARRAY['COD.386', 'Colección Camisetas Algodón Licrado', 'Algodón Licrado'],
  '{"material":"Algodón Licrado","detalles":["Diseño deportivo","Algodón licrado"],"beneficios":[]}'::jsonb,
  true,
  NOW()
);

-- Insert colors
INSERT INTO product_colors (product_id, name, slug, hex, position, is_active)
SELECT p.id, c.name, c.slug, c.hex, c.position, true
FROM (SELECT id FROM products WHERE slug = 'camiseta-deportiva') p,
(VALUES
  ('Negro', 'negro', '#000000', 0),
  ('Vino', 'vino', '#722F37', 1)
) AS c(name, slug, hex, position);

-- Images for Negro
INSERT INTO product_images (product_id, color_id, url, alt_text, position, is_primary)
SELECT p.id, c.id, i.url, 'Camiseta deportiva - Negro', i.position, i.position = 0
FROM (SELECT id FROM products WHERE slug = 'camiseta-deportiva') p,
     (SELECT id FROM product_colors WHERE slug = 'negro' AND product_id = (SELECT id FROM products WHERE slug = 'camiseta-deportiva')) c,
(VALUES
  ('/productos/mujer/camisetas/camiseta-deportiva-negro1.webp', 0)
) AS i(url, position);

-- Images for Vino
INSERT INTO product_images (product_id, color_id, url, alt_text, position, is_primary)
SELECT p.id, c.id, i.url, 'Camiseta deportiva - Vino', i.position, i.position = 0
FROM (SELECT id FROM products WHERE slug = 'camiseta-deportiva') p,
     (SELECT id FROM product_colors WHERE slug = 'vino' AND product_id = (SELECT id FROM products WHERE slug = 'camiseta-deportiva')) c,
(VALUES
  ('/productos/mujer/camisetas/camiseta-deportiva-vino1.webp', 0),
  ('/productos/mujer/camisetas/camiseta-deportiva-vino2.webp', 1),
  ('/productos/mujer/camisetas/camiseta-deportiva-vino3.webp', 2),
  ('/productos/mujer/camisetas/camiseta-deportiva-vino4.webp', 3)
) AS i(url, position);

-- Size variants
INSERT INTO product_variants (product_id, size, stock, is_active)
SELECT p.id, s.val, 12, true
FROM (SELECT id FROM products WHERE slug = 'camiseta-deportiva') p,
(VALUES
  ('S'),
  ('M'),
  ('L'),
  ('XL')
) AS s(val);


-- ============================================
-- Product 29: Camiseta tiras fijas
-- ============================================

-- Insert product
INSERT INTO products (slug, title, price, original_price, category_id, fabric_id, audience, badge, tags, attributes, is_active, published_at)
VALUES (
  'camiseta-tiras-fijas',
  'Camiseta tiras fijas',
  21,
  NULL,
  (SELECT id FROM categories WHERE slug = 'camisetas'),
  (SELECT id FROM fabrics WHERE slug = 'algodon-premium'),
  'mujer',
  NULL,
  ARRAY['COD.384', 'Colección Camisetas Algodón Licrado', 'Algodón Licrado'],
  '{"material":"Algodón Licrado","detalles":["Diseño con tiras finas","Algodón licrado"],"beneficios":[]}'::jsonb,
  true,
  NOW()
);

-- Insert colors
INSERT INTO product_colors (product_id, name, slug, hex, position, is_active)
SELECT p.id, c.name, c.slug, c.hex, c.position, true
FROM (SELECT id FROM products WHERE slug = 'camiseta-tiras-fijas') p,
(VALUES
  ('Blanco', 'blanco', '#FFFFFF', 0)
) AS c(name, slug, hex, position);

-- Images for Blanco
INSERT INTO product_images (product_id, color_id, url, alt_text, position, is_primary)
SELECT p.id, c.id, i.url, 'Camiseta tiras fijas - Blanco', i.position, i.position = 0
FROM (SELECT id FROM products WHERE slug = 'camiseta-tiras-fijas') p,
     (SELECT id FROM product_colors WHERE slug = 'blanco' AND product_id = (SELECT id FROM products WHERE slug = 'camiseta-tiras-fijas')) c,
(VALUES
  ('/productos/mujer/camisetas/camiseta-tiras-fijas-blanco1.webp', 0),
  ('/productos/mujer/camisetas/camiseta-tiras-fijas-blanco2.webp', 1),
  ('/productos/mujer/camisetas/camiseta-tiras-fijas-blanco3.webp', 2)
) AS i(url, position);

-- Size variants
INSERT INTO product_variants (product_id, size, stock, is_active)
SELECT p.id, s.val, 10, true
FROM (SELECT id FROM products WHERE slug = 'camiseta-tiras-fijas') p,
(VALUES
  ('S'),
  ('M'),
  ('L')
) AS s(val);


-- ============================================
-- Product 30: Straple Chanel
-- ============================================

-- Insert product
INSERT INTO products (slug, title, price, original_price, category_id, fabric_id, audience, badge, tags, attributes, is_active, published_at)
VALUES (
  'straple-chanel',
  'Straple Chanel',
  23,
  NULL,
  (SELECT id FROM categories WHERE slug = 'tops'),
  (SELECT id FROM fabrics WHERE slug = 'algodon-premium'),
  'mujer',
  NULL,
  ARRAY['COD.900', 'Colección Tops Algodón Licrado', 'Algodón Licrado'],
  '{"material":"Algodón Licrado","detalles":["Copas internas removibles","Algodón licrado","Diseño straple"],"beneficios":[]}'::jsonb,
  true,
  NOW()
);

-- Insert colors
INSERT INTO product_colors (product_id, name, slug, hex, position, is_active)
SELECT p.id, c.name, c.slug, c.hex, c.position, true
FROM (SELECT id FROM products WHERE slug = 'straple-chanel') p,
(VALUES
  ('Blanco', 'blanco', '#FFFFFF', 0)
) AS c(name, slug, hex, position);

-- Images for Blanco
INSERT INTO product_images (product_id, color_id, url, alt_text, position, is_primary)
SELECT p.id, c.id, i.url, 'Straple Chanel - Blanco', i.position, i.position = 0
FROM (SELECT id FROM products WHERE slug = 'straple-chanel') p,
     (SELECT id FROM product_colors WHERE slug = 'blanco' AND product_id = (SELECT id FROM products WHERE slug = 'straple-chanel')) c,
(VALUES
  ('/productos/mujer/tops/straple-chanel-blanco1.webp', 0),
  ('/productos/mujer/tops/straple-chanel-blanco2.webp', 1)
) AS i(url, position);

-- Size variants
INSERT INTO product_variants (product_id, size, stock, is_active)
SELECT p.id, s.val, 10, true
FROM (SELECT id FROM products WHERE slug = 'straple-chanel') p,
(VALUES
  ('S'),
  ('M'),
  ('L'),
  ('XL')
) AS s(val);


-- ============================================
-- Product 31: Top Deportivo
-- ============================================

-- Insert product
INSERT INTO products (slug, title, price, original_price, category_id, fabric_id, audience, badge, tags, attributes, is_active, published_at)
VALUES (
  'top-deportivo',
  'Top Deportivo',
  14,
  NULL,
  (SELECT id FROM categories WHERE slug = 'tops'),
  (SELECT id FROM fabrics WHERE slug = 'algodon-premium'),
  'mujer',
  NULL,
  ARRAY['COD.390', 'Colección Tops Algodón Licrado', 'Algodón Licrado'],
  '{"material":"Algodón Licrado","detalles":["Precio económico","Diseño deportivo básico","Sin copas removibles"],"beneficios":[]}'::jsonb,
  true,
  NOW()
);

-- Insert colors
INSERT INTO product_colors (product_id, name, slug, hex, position, is_active)
SELECT p.id, c.name, c.slug, c.hex, c.position, true
FROM (SELECT id FROM products WHERE slug = 'top-deportivo') p,
(VALUES
  ('Blanco', 'blanco', '#FFFFFF', 0),
  ('Negro', 'negro', '#000000', 1)
) AS c(name, slug, hex, position);

-- Images for Blanco
INSERT INTO product_images (product_id, color_id, url, alt_text, position, is_primary)
SELECT p.id, c.id, i.url, 'Top Deportivo - Blanco', i.position, i.position = 0
FROM (SELECT id FROM products WHERE slug = 'top-deportivo') p,
     (SELECT id FROM product_colors WHERE slug = 'blanco' AND product_id = (SELECT id FROM products WHERE slug = 'top-deportivo')) c,
(VALUES
  ('/productos/mujer/tops/top-deportivo-blanco1.webp', 0)
) AS i(url, position);

-- Images for Negro
INSERT INTO product_images (product_id, color_id, url, alt_text, position, is_primary)
SELECT p.id, c.id, i.url, 'Top Deportivo - Negro', i.position, i.position = 0
FROM (SELECT id FROM products WHERE slug = 'top-deportivo') p,
     (SELECT id FROM product_colors WHERE slug = 'negro' AND product_id = (SELECT id FROM products WHERE slug = 'top-deportivo')) c,
(VALUES
  ('/productos/mujer/tops/top-deportivo-negro1.webp', 0)
) AS i(url, position);

-- Size variants
INSERT INTO product_variants (product_id, size, stock, is_active)
SELECT p.id, s.val, 10, true
FROM (SELECT id FROM products WHERE slug = 'top-deportivo') p,
(VALUES
  ('S'),
  ('M'),
  ('L')
) AS s(val);

COMMIT;
BEGIN;


-- ============================================
-- Product 32: Top tira fijas
-- ============================================

-- Insert product
INSERT INTO products (slug, title, price, original_price, category_id, fabric_id, audience, badge, tags, attributes, is_active, published_at)
VALUES (
  'top-tira-fijas',
  'Top tira fijas',
  14,
  NULL,
  (SELECT id FROM categories WHERE slug = 'tops'),
  (SELECT id FROM fabrics WHERE slug = 'algodon-premium'),
  'mujer',
  NULL,
  ARRAY['COD.392', 'Colección Tops Algodón Licrado', 'Algodón Licrado'],
  '{"material":"Algodón Licrado","detalles":["Precio económico","Diseño con tiras finas","Sin copas removibles"],"beneficios":[]}'::jsonb,
  true,
  NOW()
);

-- Insert colors
INSERT INTO product_colors (product_id, name, slug, hex, position, is_active)
SELECT p.id, c.name, c.slug, c.hex, c.position, true
FROM (SELECT id FROM products WHERE slug = 'top-tira-fijas') p,
(VALUES
  ('Blanco', 'blanco', '#FFFFFF', 0)
) AS c(name, slug, hex, position);

-- Images for Blanco
INSERT INTO product_images (product_id, color_id, url, alt_text, position, is_primary)
SELECT p.id, c.id, i.url, 'Top tira fijas - Blanco', i.position, i.position = 0
FROM (SELECT id FROM products WHERE slug = 'top-tira-fijas') p,
     (SELECT id FROM product_colors WHERE slug = 'blanco' AND product_id = (SELECT id FROM products WHERE slug = 'top-tira-fijas')) c,
(VALUES
  ('/productos/mujer/tops/top-tira-fijas-blanco1.webp', 0),
  ('/productos/mujer/tops/top-tira-fijas-blanco2.webp', 1)
) AS i(url, position);

-- Size variants
INSERT INTO product_variants (product_id, size, stock, is_active)
SELECT p.id, s.val, 10, true
FROM (SELECT id FROM products WHERE slug = 'top-tira-fijas') p,
(VALUES
  ('S'),
  ('M'),
  ('L')
) AS s(val);


-- ============================================
-- Product 33: Legging Slim Suplex Perchado
-- ============================================

-- Insert product
INSERT INTO products (slug, title, price, original_price, category_id, fabric_id, audience, badge, tags, attributes, is_active, published_at)
VALUES (
  'legging-slim-suplex-perchado',
  'Legging Slim Suplex Perchado',
  59,
  NULL,
  (SELECT id FROM categories WHERE slug = 'legging'),
  (SELECT id FROM fabrics WHERE slug = 'suplex-perchado'),
  'mujer',
  NULL,
  ARRAY['COD.S-101', 'Colección Especial Suplex', 'Suplex Perchado'],
  '{"material":"Suplex Perchado","detalles":["Suplex perchado = tejido de spandex","Externo liso","Interno afranelado medio (abrigado)","Diseño slim"],"beneficios":[]}'::jsonb,
  true,
  NOW()
);

-- Insert colors
INSERT INTO product_colors (product_id, name, slug, hex, position, is_active)
SELECT p.id, c.name, c.slug, c.hex, c.position, true
FROM (SELECT id FROM products WHERE slug = 'legging-slim-suplex-perchado') p,
(VALUES
  ('Azul Marino', 'azul-marino', '#1E3A8A', 0),
  ('Negro', 'negro', '#000000', 1)
) AS c(name, slug, hex, position);

-- Images for Azul Marino
INSERT INTO product_images (product_id, color_id, url, alt_text, position, is_primary)
SELECT p.id, c.id, i.url, 'Legging Slim Suplex Perchado - Azul Marino', i.position, i.position = 0
FROM (SELECT id FROM products WHERE slug = 'legging-slim-suplex-perchado') p,
     (SELECT id FROM product_colors WHERE slug = 'azul-marino' AND product_id = (SELECT id FROM products WHERE slug = 'legging-slim-suplex-perchado')) c,
(VALUES
  ('/productos/mujer/legging/legging-slim-suplex-perchado-azul-marino1.webp', 0),
  ('/productos/mujer/legging/legging-slim-suplex-perchado-azul-marino2.webp', 1),
  ('/productos/mujer/legging/legging-slim-suplex-perchado-azul-marino3.webp', 2),
  ('/productos/mujer/legging/legging-slim-suplex-perchado-azul-marino4.webp', 3)
) AS i(url, position);

-- Images for Negro
INSERT INTO product_images (product_id, color_id, url, alt_text, position, is_primary)
SELECT p.id, c.id, i.url, 'Legging Slim Suplex Perchado - Negro', i.position, i.position = 0
FROM (SELECT id FROM products WHERE slug = 'legging-slim-suplex-perchado') p,
     (SELECT id FROM product_colors WHERE slug = 'negro' AND product_id = (SELECT id FROM products WHERE slug = 'legging-slim-suplex-perchado')) c,
(VALUES
  ('/productos/mujer/legging/legging-slim-suplex-perchado-negro1.webp', 0),
  ('/productos/mujer/legging/legging-slim-suplex-perchado-negro2.webp', 1)
) AS i(url, position);

-- Size variants
INSERT INTO product_variants (product_id, size, stock, is_active)
SELECT p.id, s.val, 10, true
FROM (SELECT id FROM products WHERE slug = 'legging-slim-suplex-perchado') p,
(VALUES
  ('S'),
  ('M'),
  ('L'),
  ('XL')
) AS s(val);


-- ============================================
-- Product 34: Legging Functional
-- ============================================

-- Insert product
INSERT INTO products (slug, title, price, original_price, category_id, fabric_id, audience, badge, tags, attributes, is_active, published_at)
VALUES (
  'legging-functional',
  'Legging Functional',
  55,
  NULL,
  (SELECT id FROM categories WHERE slug = 'legging'),
  (SELECT id FROM fabrics WHERE slug = 'suplex-liso-premium'),
  'mujer',
  NULL,
  ARRAY['COD.S-108', 'Colección Especial Suplex', 'Suplex + Spandex'],
  '{"material":"Suplex + Spandex","detalles":["Pretina tipo faja (compresión)","Suplex liso interno","Tejido spandex externo","Diseño funcional para deportes"],"beneficios":[]}'::jsonb,
  true,
  NOW()
);

-- Insert colors
INSERT INTO product_colors (product_id, name, slug, hex, position, is_active)
SELECT p.id, c.name, c.slug, c.hex, c.position, true
FROM (SELECT id FROM products WHERE slug = 'legging-functional') p,
(VALUES
  ('Azul Marino', 'azul-marino', '#1E3A8A', 0),
  ('Negro', 'negro', '#000000', 1)
) AS c(name, slug, hex, position);

-- Images for Azul Marino
INSERT INTO product_images (product_id, color_id, url, alt_text, position, is_primary)
SELECT p.id, c.id, i.url, 'Legging Functional - Azul Marino', i.position, i.position = 0
FROM (SELECT id FROM products WHERE slug = 'legging-functional') p,
     (SELECT id FROM product_colors WHERE slug = 'azul-marino' AND product_id = (SELECT id FROM products WHERE slug = 'legging-functional')) c,
(VALUES
  ('/productos/mujer/legging/legging-functional-azul-marino1.webp', 0)
) AS i(url, position);

-- Images for Negro
INSERT INTO product_images (product_id, color_id, url, alt_text, position, is_primary)
SELECT p.id, c.id, i.url, 'Legging Functional - Negro', i.position, i.position = 0
FROM (SELECT id FROM products WHERE slug = 'legging-functional') p,
     (SELECT id FROM product_colors WHERE slug = 'negro' AND product_id = (SELECT id FROM products WHERE slug = 'legging-functional')) c,
(VALUES
  ('/productos/mujer/legging/legging-functional-negro1.webp', 0),
  ('/productos/mujer/legging/legging-functional-negro2.webp', 1)
) AS i(url, position);

-- Size variants
INSERT INTO product_variants (product_id, size, stock, is_active)
SELECT p.id, s.val, 10, true
FROM (SELECT id FROM products WHERE slug = 'legging-functional') p,
(VALUES
  ('S'),
  ('M'),
  ('L')
) AS s(val);


-- ============================================
-- Product 35: Legging Realce Fresh Terry
-- ============================================

-- Insert product
INSERT INTO products (slug, title, price, original_price, category_id, fabric_id, audience, badge, tags, attributes, is_active, published_at)
VALUES (
  'legging-realce-fresh-terry',
  'Legging Realce Fresh Terry',
  48,
  NULL,
  (SELECT id FROM categories WHERE slug = 'legging'),
  (SELECT id FROM fabrics WHERE slug = 'algodon-french-terry'),
  'mujer',
  NULL,
  ARRAY['COD.437', 'Colección Fresh Terry', 'Fresh Terry'],
  '{"material":"Fresh Terry","detalles":["Material Fresh Terry (innovador tipo toalla francesa/felpa)","Cintura alta y ancha para estilizar la silueta","Efecto realce"],"beneficios":[]}'::jsonb,
  true,
  NOW()
);

-- Insert colors
INSERT INTO product_colors (product_id, name, slug, hex, position, is_active)
SELECT p.id, c.name, c.slug, c.hex, c.position, true
FROM (SELECT id FROM products WHERE slug = 'legging-realce-fresh-terry') p,
(VALUES
  ('Charcoal', 'charcoal', '#5A5A5A', 0),
  ('Melange', 'melange', '#9CA3AF', 1),
  ('Negro', 'negro', '#000000', 2),
  ('Vino', 'vino', '#722F37', 3)
) AS c(name, slug, hex, position);

-- Images for Charcoal
INSERT INTO product_images (product_id, color_id, url, alt_text, position, is_primary)
SELECT p.id, c.id, i.url, 'Legging Realce Fresh Terry - Charcoal', i.position, i.position = 0
FROM (SELECT id FROM products WHERE slug = 'legging-realce-fresh-terry') p,
     (SELECT id FROM product_colors WHERE slug = 'charcoal' AND product_id = (SELECT id FROM products WHERE slug = 'legging-realce-fresh-terry')) c,
(VALUES
  ('/productos/mujer/legging/legging-realce-fresh-terry-charcoal1.webp', 0)
) AS i(url, position);

-- Images for Melange
INSERT INTO product_images (product_id, color_id, url, alt_text, position, is_primary)
SELECT p.id, c.id, i.url, 'Legging Realce Fresh Terry - Melange', i.position, i.position = 0
FROM (SELECT id FROM products WHERE slug = 'legging-realce-fresh-terry') p,
     (SELECT id FROM product_colors WHERE slug = 'melange' AND product_id = (SELECT id FROM products WHERE slug = 'legging-realce-fresh-terry')) c,
(VALUES
  ('/productos/mujer/legging/legging-realce-fresh-terry-melange1.webp', 0)
) AS i(url, position);

-- Images for Negro
INSERT INTO product_images (product_id, color_id, url, alt_text, position, is_primary)
SELECT p.id, c.id, i.url, 'Legging Realce Fresh Terry - Negro', i.position, i.position = 0
FROM (SELECT id FROM products WHERE slug = 'legging-realce-fresh-terry') p,
     (SELECT id FROM product_colors WHERE slug = 'negro' AND product_id = (SELECT id FROM products WHERE slug = 'legging-realce-fresh-terry')) c,
(VALUES
  ('/productos/mujer/legging/legging-realce-fresh-terry-negro1.webp', 0),
  ('/productos/mujer/legging/legging-realce-fresh-terry-negro2.webp', 1)
) AS i(url, position);

-- Images for Vino
INSERT INTO product_images (product_id, color_id, url, alt_text, position, is_primary)
SELECT p.id, c.id, i.url, 'Legging Realce Fresh Terry - Vino', i.position, i.position = 0
FROM (SELECT id FROM products WHERE slug = 'legging-realce-fresh-terry') p,
     (SELECT id FROM product_colors WHERE slug = 'vino' AND product_id = (SELECT id FROM products WHERE slug = 'legging-realce-fresh-terry')) c,
(VALUES
  ('/productos/mujer/legging/legging-realce-fresh-terry-vino1.webp', 0),
  ('/productos/mujer/legging/legging-realce-fresh-terry-vino2.webp', 1)
) AS i(url, position);

-- Size variants
INSERT INTO product_variants (product_id, size, stock, is_active)
SELECT p.id, s.val, 10, true
FROM (SELECT id FROM products WHERE slug = 'legging-realce-fresh-terry') p,
(VALUES
  ('S'),
  ('M'),
  ('L'),
  ('XL'),
  ('XXL')
) AS s(val);


-- ============================================
-- Product 36: Legging Clásica Gamuza
-- ============================================

-- Insert product
INSERT INTO products (slug, title, price, original_price, category_id, fabric_id, audience, badge, tags, attributes, is_active, published_at)
VALUES (
  'legging-clasica-gamuza',
  'Legging Clásica Gamuza',
  35,
  NULL,
  (SELECT id FROM categories WHERE slug = 'legging'),
  (SELECT id FROM fabrics WHERE slug = 'algodon-gamusa'),
  'mujer',
  NULL,
  ARRAY['COD.324', 'Línea Nice - Leggings Algodón Licrado', 'Algodón Gamusa'],
  '{"material":"Algodón Gamusa","detalles":["Algodón gamusa (textura especial)","Legging clásica","Marca Nice"],"beneficios":[]}'::jsonb,
  true,
  NOW()
);

-- Insert colors
INSERT INTO product_colors (product_id, name, slug, hex, position, is_active)
SELECT p.id, c.name, c.slug, c.hex, c.position, true
FROM (SELECT id FROM products WHERE slug = 'legging-clasica-gamuza') p,
(VALUES
  ('Blanco', 'blanco', '#FFFFFF', 0)
) AS c(name, slug, hex, position);

-- Images for Blanco
INSERT INTO product_images (product_id, color_id, url, alt_text, position, is_primary)
SELECT p.id, c.id, i.url, 'Legging Clásica Gamuza - Blanco', i.position, i.position = 0
FROM (SELECT id FROM products WHERE slug = 'legging-clasica-gamuza') p,
     (SELECT id FROM product_colors WHERE slug = 'blanco' AND product_id = (SELECT id FROM products WHERE slug = 'legging-clasica-gamuza')) c,
(VALUES
  ('/productos/mujer/legging/legging-clasica-gamuza-blanco1.webp', 0),
  ('/productos/mujer/legging/legging-clasica-gamuza-blanco2.webp', 1),
  ('/productos/mujer/legging/legging-clasica-gamuza-blanco3.webp', 2),
  ('/productos/mujer/legging/legging-clasica-gamuza-blanco4.webp', 3),
  ('/productos/mujer/legging/legging-clasica-gamuza-blanco5.webp', 4)
) AS i(url, position);

-- Size variants
INSERT INTO product_variants (product_id, size, stock, is_active)
SELECT p.id, s.val, 10, true
FROM (SELECT id FROM products WHERE slug = 'legging-clasica-gamuza') p,
(VALUES
  ('S'),
  ('M'),
  ('L'),
  ('XL')
) AS s(val);


-- ============================================
-- Product 37: Pescador realce
-- ============================================

-- Insert product
INSERT INTO products (slug, title, price, original_price, category_id, fabric_id, audience, badge, tags, attributes, is_active, published_at)
VALUES (
  'pescador-realce',
  'Pescador realce',
  48,
  NULL,
  (SELECT id FROM categories WHERE slug = 'pescador'),
  (SELECT id FROM fabrics WHERE slug = 'suplex-liso-premium'),
  'mujer',
  NULL,
  ARRAY['COD.210', 'dama', 'damas', 'pescador', 'pescador realce', 'Línea suplex dama'],
  '{"material":"Suplex","detalles":["Pretina tipo faja (compresión)","Suplex liso de alta elongación","Efecto realce (levanta glúteos)","Largo 3/4 (pescador)"],"beneficios":[]}'::jsonb,
  true,
  NOW()
);

-- Insert colors
INSERT INTO product_colors (product_id, name, slug, hex, position, is_active)
SELECT p.id, c.name, c.slug, c.hex, c.position, true
FROM (SELECT id FROM products WHERE slug = 'pescador-realce') p,
(VALUES
  ('Azulino', 'azulino', '#3A53A4', 0),
  ('Negro', 'negro', '#000000', 1),
  ('Rojo', 'rojo', '#D22B2B', 2)
) AS c(name, slug, hex, position);

-- Images for Azulino
INSERT INTO product_images (product_id, color_id, url, alt_text, position, is_primary)
SELECT p.id, c.id, i.url, 'Pescador realce - Azulino', i.position, i.position = 0
FROM (SELECT id FROM products WHERE slug = 'pescador-realce') p,
     (SELECT id FROM product_colors WHERE slug = 'azulino' AND product_id = (SELECT id FROM products WHERE slug = 'pescador-realce')) c,
(VALUES
  ('/productos/mujer/pescador/pescador-realce-azulino1.webp', 0),
  ('/productos/mujer/pescador/pescador-realce-azulino2.webp', 1)
) AS i(url, position);

-- Images for Negro
INSERT INTO product_images (product_id, color_id, url, alt_text, position, is_primary)
SELECT p.id, c.id, i.url, 'Pescador realce - Negro', i.position, i.position = 0
FROM (SELECT id FROM products WHERE slug = 'pescador-realce') p,
     (SELECT id FROM product_colors WHERE slug = 'negro' AND product_id = (SELECT id FROM products WHERE slug = 'pescador-realce')) c,
(VALUES
  ('/productos/mujer/pescador/pescador-realce-negro1.webp', 0),
  ('/productos/mujer/pescador/pescador-realce-negro2.webp', 1)
) AS i(url, position);

-- Images for Rojo
INSERT INTO product_images (product_id, color_id, url, alt_text, position, is_primary)
SELECT p.id, c.id, i.url, 'Pescador realce - Rojo', i.position, i.position = 0
FROM (SELECT id FROM products WHERE slug = 'pescador-realce') p,
     (SELECT id FROM product_colors WHERE slug = 'rojo' AND product_id = (SELECT id FROM products WHERE slug = 'pescador-realce')) c,
(VALUES
  ('/productos/mujer/pescador/pescador-realce-rojo1.webp', 0),
  ('/productos/mujer/pescador/pescador-realce-rojo2.webp', 1)
) AS i(url, position);

-- Size variants
INSERT INTO product_variants (product_id, size, stock, is_active)
SELECT p.id, s.val, 10, true
FROM (SELECT id FROM products WHERE slug = 'pescador-realce') p,
(VALUES
  ('S'),
  ('M'),
  ('L'),
  ('XL')
) AS s(val);


-- ============================================
-- Product 38: Enterizo manga corta Niña
-- ============================================

-- Insert product
INSERT INTO products (slug, title, price, original_price, category_id, fabric_id, audience, badge, tags, attributes, is_active, published_at)
VALUES (
  'enterizo-manga-corta-nina',
  'Enterizo manga corta Niña',
  38,
  NULL,
  (SELECT id FROM categories WHERE slug = 'enterizo'),
  (SELECT id FROM fabrics WHERE slug = 'suplex-liso-premium'),
  'nina',
  NULL,
  ARRAY[]::text[],
  '{"material":"Suplex liso","detalles":["Diseño especial para niñas","Ajuste cómodo y seguro","Fácil de poner y quitar"],"beneficios":["Perfecta para actividades deportivas","Resistente al uso diario","Mantiene su forma después de lavados"]}'::jsonb,
  true,
  NOW()
);

-- Insert colors
INSERT INTO product_colors (product_id, name, slug, hex, position, is_active)
SELECT p.id, c.name, c.slug, c.hex, c.position, true
FROM (SELECT id FROM products WHERE slug = 'enterizo-manga-corta-nina') p,
(VALUES
  ('Amarillo', 'amarillo', '#FFD700', 0),
  ('Beige', 'beige', '#F5F5DC', 1),
  ('Blanco', 'blanco', '#FFFFFF', 2),
  ('Lila', 'lila', '#C8A2C8', 3),
  ('Negro', 'negro', '#000000', 4),
  ('Rojo', 'rojo', '#FF0000', 5),
  ('Rosado', 'rosado', '#FFB6C1', 6),
  ('Verde', 'verde', '#00FF00', 7)
) AS c(name, slug, hex, position);

-- Images for Amarillo
INSERT INTO product_images (product_id, color_id, url, alt_text, position, is_primary)
SELECT p.id, c.id, i.url, 'Enterizo manga corta Niña - Amarillo', i.position, i.position = 0
FROM (SELECT id FROM products WHERE slug = 'enterizo-manga-corta-nina') p,
     (SELECT id FROM product_colors WHERE slug = 'amarillo' AND product_id = (SELECT id FROM products WHERE slug = 'enterizo-manga-corta-nina')) c,
(VALUES
  ('/productos/nina/enterizos/enterizo-manga-corta-nina-amarillo1.webp', 0),
  ('/productos/nina/enterizos/enterizo-manga-corta-nina-amarillo2.webp', 1),
  ('/productos/nina/enterizos/enterizo-manga-corta-nina-amarillo3.webp', 2),
  ('/productos/nina/enterizos/enterizo-manga-corta-nina-amarillo4.webp', 3),
  ('/productos/nina/enterizos/enterizo-manga-corta-nina-amarillo5.webp', 4),
  ('/productos/nina/enterizos/enterizo-manga-corta-nina-amarillo6.webp', 5)
) AS i(url, position);

-- Images for Beige
INSERT INTO product_images (product_id, color_id, url, alt_text, position, is_primary)
SELECT p.id, c.id, i.url, 'Enterizo manga corta Niña - Beige', i.position, i.position = 0
FROM (SELECT id FROM products WHERE slug = 'enterizo-manga-corta-nina') p,
     (SELECT id FROM product_colors WHERE slug = 'beige' AND product_id = (SELECT id FROM products WHERE slug = 'enterizo-manga-corta-nina')) c,
(VALUES
  ('/productos/nina/enterizos/enterizo-manga-corta-nina-beige1.webp', 0),
  ('/productos/nina/enterizos/enterizo-manga-corta-nina-beige2.webp', 1),
  ('/productos/nina/enterizos/enterizo-manga-corta-nina-beige3.webp', 2),
  ('/productos/nina/enterizos/enterizo-manga-corta-nina-beige4.webp', 3),
  ('/productos/nina/enterizos/enterizo-manga-corta-nina-beige5.webp', 4)
) AS i(url, position);

-- Images for Blanco
INSERT INTO product_images (product_id, color_id, url, alt_text, position, is_primary)
SELECT p.id, c.id, i.url, 'Enterizo manga corta Niña - Blanco', i.position, i.position = 0
FROM (SELECT id FROM products WHERE slug = 'enterizo-manga-corta-nina') p,
     (SELECT id FROM product_colors WHERE slug = 'blanco' AND product_id = (SELECT id FROM products WHERE slug = 'enterizo-manga-corta-nina')) c,
(VALUES
  ('/productos/nina/enterizos/enterizo-manga-corta-nina-blanco1.webp', 0),
  ('/productos/nina/enterizos/enterizo-manga-corta-nina-blanco2.webp', 1),
  ('/productos/nina/enterizos/enterizo-manga-corta-nina-blanco3.webp', 2),
  ('/productos/nina/enterizos/enterizo-manga-corta-nina-blanco4.webp', 3),
  ('/productos/nina/enterizos/enterizo-manga-corta-nina-blanco5.webp', 4)
) AS i(url, position);

-- Images for Lila
INSERT INTO product_images (product_id, color_id, url, alt_text, position, is_primary)
SELECT p.id, c.id, i.url, 'Enterizo manga corta Niña - Lila', i.position, i.position = 0
FROM (SELECT id FROM products WHERE slug = 'enterizo-manga-corta-nina') p,
     (SELECT id FROM product_colors WHERE slug = 'lila' AND product_id = (SELECT id FROM products WHERE slug = 'enterizo-manga-corta-nina')) c,
(VALUES
  ('/productos/nina/enterizos/enterizo-manga-corta-nina-lila1.webp', 0),
  ('/productos/nina/enterizos/enterizo-manga-corta-nina-lila2.webp', 1),
  ('/productos/nina/enterizos/enterizo-manga-corta-nina-lila3.webp', 2),
  ('/productos/nina/enterizos/enterizo-manga-corta-nina-lila4.webp', 3),
  ('/productos/nina/enterizos/enterizo-manga-corta-nina-lila5.webp', 4)
) AS i(url, position);

-- Images for Negro
INSERT INTO product_images (product_id, color_id, url, alt_text, position, is_primary)
SELECT p.id, c.id, i.url, 'Enterizo manga corta Niña - Negro', i.position, i.position = 0
FROM (SELECT id FROM products WHERE slug = 'enterizo-manga-corta-nina') p,
     (SELECT id FROM product_colors WHERE slug = 'negro' AND product_id = (SELECT id FROM products WHERE slug = 'enterizo-manga-corta-nina')) c,
(VALUES
  ('/productos/nina/enterizos/enterizo-manga-corta-nina-negro1.webp', 0),
  ('/productos/nina/enterizos/enterizo-manga-corta-nina-negro2.webp', 1),
  ('/productos/nina/enterizos/enterizo-manga-corta-nina-negro3.webp', 2),
  ('/productos/nina/enterizos/enterizo-manga-corta-nina-negro4.webp', 3),
  ('/productos/nina/enterizos/enterizo-manga-corta-nina-negro5.webp', 4)
) AS i(url, position);

-- Images for Rojo
INSERT INTO product_images (product_id, color_id, url, alt_text, position, is_primary)
SELECT p.id, c.id, i.url, 'Enterizo manga corta Niña - Rojo', i.position, i.position = 0
FROM (SELECT id FROM products WHERE slug = 'enterizo-manga-corta-nina') p,
     (SELECT id FROM product_colors WHERE slug = 'rojo' AND product_id = (SELECT id FROM products WHERE slug = 'enterizo-manga-corta-nina')) c,
(VALUES
  ('/productos/nina/enterizos/enterizo-manga-corta-nina-rojo1.webp', 0),
  ('/productos/nina/enterizos/enterizo-manga-corta-nina-rojo2.webp', 1),
  ('/productos/nina/enterizos/enterizo-manga-corta-nina-rojo3.webp', 2),
  ('/productos/nina/enterizos/enterizo-manga-corta-nina-rojo4.webp', 3),
  ('/productos/nina/enterizos/enterizo-manga-corta-nina-rojo5.webp', 4)
) AS i(url, position);

-- Images for Rosado
INSERT INTO product_images (product_id, color_id, url, alt_text, position, is_primary)
SELECT p.id, c.id, i.url, 'Enterizo manga corta Niña - Rosado', i.position, i.position = 0
FROM (SELECT id FROM products WHERE slug = 'enterizo-manga-corta-nina') p,
     (SELECT id FROM product_colors WHERE slug = 'rosado' AND product_id = (SELECT id FROM products WHERE slug = 'enterizo-manga-corta-nina')) c,
(VALUES
  ('/productos/nina/enterizos/enterizo-manga-corta-nina-rosado1.webp', 0),
  ('/productos/nina/enterizos/enterizo-manga-corta-nina-rosado2.webp', 1),
  ('/productos/nina/enterizos/enterizo-manga-corta-nina-rosado3.webp', 2),
  ('/productos/nina/enterizos/enterizo-manga-corta-nina-rosado4.webp', 3)
) AS i(url, position);

-- Images for Verde
INSERT INTO product_images (product_id, color_id, url, alt_text, position, is_primary)
SELECT p.id, c.id, i.url, 'Enterizo manga corta Niña - Verde', i.position, i.position = 0
FROM (SELECT id FROM products WHERE slug = 'enterizo-manga-corta-nina') p,
     (SELECT id FROM product_colors WHERE slug = 'verde' AND product_id = (SELECT id FROM products WHERE slug = 'enterizo-manga-corta-nina')) c,
(VALUES
  ('/productos/nina/enterizos/enterizo-manga-corta-nina-verde1.webp', 0),
  ('/productos/nina/enterizos/enterizo-manga-corta-nina-verde2.webp', 1),
  ('/productos/nina/enterizos/enterizo-manga-corta-nina-verde3.webp', 2)
) AS i(url, position);

-- Size variants
INSERT INTO product_variants (product_id, size, stock, is_active)
SELECT p.id, s.val, 10, true
FROM (SELECT id FROM products WHERE slug = 'enterizo-manga-corta-nina') p,
(VALUES
  ('2'),
  ('4'),
  ('6'),
  ('8'),
  ('10'),
  ('12')
) AS s(val);


-- ============================================
-- Product 39: Enterizo manga larga Niña
-- ============================================

-- Insert product
INSERT INTO products (slug, title, price, original_price, category_id, fabric_id, audience, badge, tags, attributes, is_active, published_at)
VALUES (
  'enterizo-manga-larga-nina',
  'Enterizo manga larga Niña',
  42,
  NULL,
  (SELECT id FROM categories WHERE slug = 'enterizo'),
  (SELECT id FROM fabrics WHERE slug = 'suplex-liso-premium'),
  'nina',
  NULL,
  ARRAY[]::text[],
  '{"material":"Suplex liso","detalles":["Diseño especial para niñas","Ajuste cómodo y seguro","Fácil de poner y quitar"],"beneficios":["Perfecta para actividades deportivas","Resistente al uso diario","Mantiene su forma después de lavados"]}'::jsonb,
  true,
  NOW()
);

-- Insert colors
INSERT INTO product_colors (product_id, name, slug, hex, position, is_active)
SELECT p.id, c.name, c.slug, c.hex, c.position, true
FROM (SELECT id FROM products WHERE slug = 'enterizo-manga-larga-nina') p,
(VALUES
  ('Amarillo', 'amarillo', '#FFD700', 0),
  ('Blanco', 'blanco', '#FFFFFF', 1),
  ('Negro', 'negro', '#000000', 2),
  ('Rojo', 'rojo', '#FF0000', 3),
  ('Rosado', 'rosado', '#FFB6C1', 4)
) AS c(name, slug, hex, position);

-- Images for Amarillo
INSERT INTO product_images (product_id, color_id, url, alt_text, position, is_primary)
SELECT p.id, c.id, i.url, 'Enterizo manga larga Niña - Amarillo', i.position, i.position = 0
FROM (SELECT id FROM products WHERE slug = 'enterizo-manga-larga-nina') p,
     (SELECT id FROM product_colors WHERE slug = 'amarillo' AND product_id = (SELECT id FROM products WHERE slug = 'enterizo-manga-larga-nina')) c,
(VALUES
  ('/productos/nina/enterizos/enterizo-manga-larga-nina-amarillo1.webp', 0),
  ('/productos/nina/enterizos/enterizo-manga-larga-nina-amarillo2.webp', 1),
  ('/productos/nina/enterizos/enterizo-manga-larga-nina-amarillo3.webp', 2),
  ('/productos/nina/enterizos/enterizo-manga-larga-nina-amarillo4.webp', 3),
  ('/productos/nina/enterizos/enterizo-manga-larga-nina-amarillo5.webp', 4)
) AS i(url, position);

-- Images for Blanco
INSERT INTO product_images (product_id, color_id, url, alt_text, position, is_primary)
SELECT p.id, c.id, i.url, 'Enterizo manga larga Niña - Blanco', i.position, i.position = 0
FROM (SELECT id FROM products WHERE slug = 'enterizo-manga-larga-nina') p,
     (SELECT id FROM product_colors WHERE slug = 'blanco' AND product_id = (SELECT id FROM products WHERE slug = 'enterizo-manga-larga-nina')) c,
(VALUES
  ('/productos/nina/enterizos/enterizo-manga-larga-nina-blanco1.webp', 0),
  ('/productos/nina/enterizos/enterizo-manga-larga-nina-blanco2.webp', 1),
  ('/productos/nina/enterizos/enterizo-manga-larga-nina-blanco3.webp', 2),
  ('/productos/nina/enterizos/enterizo-manga-larga-nina-blanco4.webp', 3),
  ('/productos/nina/enterizos/enterizo-manga-larga-nina-blanco5.webp', 4)
) AS i(url, position);

-- Images for Negro
INSERT INTO product_images (product_id, color_id, url, alt_text, position, is_primary)
SELECT p.id, c.id, i.url, 'Enterizo manga larga Niña - Negro', i.position, i.position = 0
FROM (SELECT id FROM products WHERE slug = 'enterizo-manga-larga-nina') p,
     (SELECT id FROM product_colors WHERE slug = 'negro' AND product_id = (SELECT id FROM products WHERE slug = 'enterizo-manga-larga-nina')) c,
(VALUES
  ('/productos/nina/enterizos/enterizo-manga-larga-nina-negro1.webp', 0),
  ('/productos/nina/enterizos/enterizo-manga-larga-nina-negro2.webp', 1),
  ('/productos/nina/enterizos/enterizo-manga-larga-nina-negro3.webp', 2),
  ('/productos/nina/enterizos/enterizo-manga-larga-nina-negro4.webp', 3)
) AS i(url, position);

-- Images for Rojo
INSERT INTO product_images (product_id, color_id, url, alt_text, position, is_primary)
SELECT p.id, c.id, i.url, 'Enterizo manga larga Niña - Rojo', i.position, i.position = 0
FROM (SELECT id FROM products WHERE slug = 'enterizo-manga-larga-nina') p,
     (SELECT id FROM product_colors WHERE slug = 'rojo' AND product_id = (SELECT id FROM products WHERE slug = 'enterizo-manga-larga-nina')) c,
(VALUES
  ('/productos/nina/enterizos/enterizo-manga-larga-nina-rojo1.webp', 0),
  ('/productos/nina/enterizos/enterizo-manga-larga-nina-rojo2.webp', 1),
  ('/productos/nina/enterizos/enterizo-manga-larga-nina-rojo3.webp', 2),
  ('/productos/nina/enterizos/enterizo-manga-larga-nina-rojo4.webp', 3)
) AS i(url, position);

-- Images for Rosado
INSERT INTO product_images (product_id, color_id, url, alt_text, position, is_primary)
SELECT p.id, c.id, i.url, 'Enterizo manga larga Niña - Rosado', i.position, i.position = 0
FROM (SELECT id FROM products WHERE slug = 'enterizo-manga-larga-nina') p,
     (SELECT id FROM product_colors WHERE slug = 'rosado' AND product_id = (SELECT id FROM products WHERE slug = 'enterizo-manga-larga-nina')) c,
(VALUES
  ('/productos/nina/enterizos/enterizo-manga-larga-nina-rosado1.webp', 0),
  ('/productos/nina/enterizos/enterizo-manga-larga-nina-rosado2.webp', 1),
  ('/productos/nina/enterizos/enterizo-manga-larga-nina-rosado3.webp', 2),
  ('/productos/nina/enterizos/enterizo-manga-larga-nina-rosado4.webp', 3)
) AS i(url, position);

-- Size variants
INSERT INTO product_variants (product_id, size, stock, is_active)
SELECT p.id, s.val, 10, true
FROM (SELECT id FROM products WHERE slug = 'enterizo-manga-larga-nina') p,
(VALUES
  ('2'),
  ('4'),
  ('6'),
  ('8'),
  ('10'),
  ('12')
) AS s(val);


-- ============================================
-- Product 40: Legging Niña
-- ============================================

-- Insert product
INSERT INTO products (slug, title, price, original_price, category_id, fabric_id, audience, badge, tags, attributes, is_active, published_at)
VALUES (
  'legging-nina',
  'Legging Niña',
  32,
  NULL,
  (SELECT id FROM categories WHERE slug = 'legging'),
  (SELECT id FROM fabrics WHERE slug = 'suplex-liso-premium'),
  'nina',
  NULL,
  ARRAY[]::text[],
  '{"material":"Suplex liso","detalles":["Pretina ancha para mejor soporte","Corte ajustado sin transparencias","Costuras planas"],"beneficios":["Se adapta al cuerpo como una segunda piel","Te mantiene fresca y seca durante el entrenamiento","Alta resistencia y durabilidad"]}'::jsonb,
  true,
  NOW()
);

-- Insert colors
INSERT INTO product_colors (product_id, name, slug, hex, position, is_active)
SELECT p.id, c.name, c.slug, c.hex, c.position, true
FROM (SELECT id FROM products WHERE slug = 'legging-nina') p,
(VALUES
  ('Blanco', 'blanco', '#FFFFFF', 0),
  ('Negro', 'negro', '#000000', 1),
  ('Rojo', 'rojo', '#FF0000', 2),
  ('Rosado', 'rosado', '#FFB6C1', 3)
) AS c(name, slug, hex, position);

-- Images for Blanco
INSERT INTO product_images (product_id, color_id, url, alt_text, position, is_primary)
SELECT p.id, c.id, i.url, 'Legging Niña - Blanco', i.position, i.position = 0
FROM (SELECT id FROM products WHERE slug = 'legging-nina') p,
     (SELECT id FROM product_colors WHERE slug = 'blanco' AND product_id = (SELECT id FROM products WHERE slug = 'legging-nina')) c,
(VALUES
  ('/productos/nina/leggings/legging-nina-blanco1.webp', 0),
  ('/productos/nina/leggings/legging-nina-blanco2.webp', 1),
  ('/productos/nina/leggings/legging-nina-blanco3.webp', 2),
  ('/productos/nina/leggings/legging-nina-blanco4.webp', 3),
  ('/productos/nina/leggings/legging-nina-blanco5.webp', 4)
) AS i(url, position);

-- Images for Negro
INSERT INTO product_images (product_id, color_id, url, alt_text, position, is_primary)
SELECT p.id, c.id, i.url, 'Legging Niña - Negro', i.position, i.position = 0
FROM (SELECT id FROM products WHERE slug = 'legging-nina') p,
     (SELECT id FROM product_colors WHERE slug = 'negro' AND product_id = (SELECT id FROM products WHERE slug = 'legging-nina')) c,
(VALUES
  ('/productos/nina/leggings/legging-nina-negro1.webp', 0),
  ('/productos/nina/leggings/legging-nina-negro2.webp', 1),
  ('/productos/nina/leggings/legging-nina-negro3.webp', 2),
  ('/productos/nina/leggings/legging-nina-negro4.webp', 3),
  ('/productos/nina/leggings/legging-nina-negro5.webp', 4)
) AS i(url, position);

-- Images for Rojo
INSERT INTO product_images (product_id, color_id, url, alt_text, position, is_primary)
SELECT p.id, c.id, i.url, 'Legging Niña - Rojo', i.position, i.position = 0
FROM (SELECT id FROM products WHERE slug = 'legging-nina') p,
     (SELECT id FROM product_colors WHERE slug = 'rojo' AND product_id = (SELECT id FROM products WHERE slug = 'legging-nina')) c,
(VALUES
  ('/productos/nina/leggings/legging-nina-rojo1.webp', 0),
  ('/productos/nina/leggings/legging-nina-rojo2.webp', 1),
  ('/productos/nina/leggings/legging-nina-rojo3.webp', 2),
  ('/productos/nina/leggings/legging-nina-rojo4.webp', 3)
) AS i(url, position);

-- Images for Rosado
INSERT INTO product_images (product_id, color_id, url, alt_text, position, is_primary)
SELECT p.id, c.id, i.url, 'Legging Niña - Rosado', i.position, i.position = 0
FROM (SELECT id FROM products WHERE slug = 'legging-nina') p,
     (SELECT id FROM product_colors WHERE slug = 'rosado' AND product_id = (SELECT id FROM products WHERE slug = 'legging-nina')) c,
(VALUES
  ('/productos/nina/leggings/legging-nina-rosado1.webp', 0),
  ('/productos/nina/leggings/legging-nina-rosado2.webp', 1),
  ('/productos/nina/leggings/legging-nina-rosado3.webp', 2),
  ('/productos/nina/leggings/legging-nina-rosado4.webp', 3),
  ('/productos/nina/leggings/legging-nina-rosado5.webp', 4)
) AS i(url, position);

-- Size variants
INSERT INTO product_variants (product_id, size, stock, is_active)
SELECT p.id, s.val, 10, true
FROM (SELECT id FROM products WHERE slug = 'legging-nina') p,
(VALUES
  ('2'),
  ('4'),
  ('6'),
  ('8'),
  ('10'),
  ('12')
) AS s(val);


-- ============================================
-- Product 41: Cafarena Niña
-- ============================================

-- Insert product
INSERT INTO products (slug, title, price, original_price, category_id, fabric_id, audience, badge, tags, attributes, is_active, published_at)
VALUES (
  'cafarena-nina',
  'Cafarena Niña',
  28,
  NULL,
  (SELECT id FROM categories WHERE slug = 'cafarenas'),
  (SELECT id FROM fabrics WHERE slug = 'suplex-liso-premium'),
  'nina',
  NULL,
  ARRAY[]::text[],
  '{"material":"Suplex liso","detalles":["Diseño especial para niñas","Ajuste cómodo y seguro","Fácil de poner y quitar"],"beneficios":["Perfecta para actividades deportivas","Resistente al uso diario","Mantiene su forma después de lavados"]}'::jsonb,
  true,
  NOW()
);

-- Insert colors
INSERT INTO product_colors (product_id, name, slug, hex, position, is_active)
SELECT p.id, c.name, c.slug, c.hex, c.position, true
FROM (SELECT id FROM products WHERE slug = 'cafarena-nina') p,
(VALUES
  ('Azul Marino', 'azulmarino', '#1B3A6B', 0),
  ('Blanco', 'blanco', '#FFFFFF', 1),
  ('Negro', 'negro', '#000000', 2),
  ('Rojo', 'rojo', '#FF0000', 3),
  ('Rosado', 'rosado', '#FFB6C1', 4)
) AS c(name, slug, hex, position);

-- Images for Azul Marino
INSERT INTO product_images (product_id, color_id, url, alt_text, position, is_primary)
SELECT p.id, c.id, i.url, 'Cafarena Niña - Azul Marino', i.position, i.position = 0
FROM (SELECT id FROM products WHERE slug = 'cafarena-nina') p,
     (SELECT id FROM product_colors WHERE slug = 'azulmarino' AND product_id = (SELECT id FROM products WHERE slug = 'cafarena-nina')) c,
(VALUES
  ('/productos/nina/cafarenas/cafarena-nina-azulmarino1.webp', 0),
  ('/productos/nina/cafarenas/cafarena-nina-azulmarino2.webp', 1),
  ('/productos/nina/cafarenas/cafarena-nina-azulmarino3.webp', 2),
  ('/productos/nina/cafarenas/cafarena-nina-azulmarino4.webp', 3),
  ('/productos/nina/cafarenas/cafarena-nina-azulmarino5.webp', 4)
) AS i(url, position);

-- Images for Blanco
INSERT INTO product_images (product_id, color_id, url, alt_text, position, is_primary)
SELECT p.id, c.id, i.url, 'Cafarena Niña - Blanco', i.position, i.position = 0
FROM (SELECT id FROM products WHERE slug = 'cafarena-nina') p,
     (SELECT id FROM product_colors WHERE slug = 'blanco' AND product_id = (SELECT id FROM products WHERE slug = 'cafarena-nina')) c,
(VALUES
  ('/productos/nina/cafarenas/cafarena-nina-blanco1.webp', 0),
  ('/productos/nina/cafarenas/cafarena-nina-blanco2.webp', 1),
  ('/productos/nina/cafarenas/cafarena-nina-blanco3.webp', 2),
  ('/productos/nina/cafarenas/cafarena-nina-blanco4.webp', 3),
  ('/productos/nina/cafarenas/cafarena-nina-blanco5.webp', 4)
) AS i(url, position);

-- Images for Negro
INSERT INTO product_images (product_id, color_id, url, alt_text, position, is_primary)
SELECT p.id, c.id, i.url, 'Cafarena Niña - Negro', i.position, i.position = 0
FROM (SELECT id FROM products WHERE slug = 'cafarena-nina') p,
     (SELECT id FROM product_colors WHERE slug = 'negro' AND product_id = (SELECT id FROM products WHERE slug = 'cafarena-nina')) c,
(VALUES
  ('/productos/nina/cafarenas/cafarena-nina-negro1.webp', 0),
  ('/productos/nina/cafarenas/cafarena-nina-negro2.webp', 1),
  ('/productos/nina/cafarenas/cafarena-nina-negro3.webp', 2),
  ('/productos/nina/cafarenas/cafarena-nina-negro4.webp', 3),
  ('/productos/nina/cafarenas/cafarena-nina-negro5.webp', 4)
) AS i(url, position);

-- Images for Rojo
INSERT INTO product_images (product_id, color_id, url, alt_text, position, is_primary)
SELECT p.id, c.id, i.url, 'Cafarena Niña - Rojo', i.position, i.position = 0
FROM (SELECT id FROM products WHERE slug = 'cafarena-nina') p,
     (SELECT id FROM product_colors WHERE slug = 'rojo' AND product_id = (SELECT id FROM products WHERE slug = 'cafarena-nina')) c,
(VALUES
  ('/productos/nina/cafarenas/cafarena-nina-rojo1.webp', 0),
  ('/productos/nina/cafarenas/cafarena-nina-rojo2.webp', 1),
  ('/productos/nina/cafarenas/cafarena-nina-rojo3.webp', 2),
  ('/productos/nina/cafarenas/cafarena-nina-rojo4.webp', 3),
  ('/productos/nina/cafarenas/cafarena-nina-rojo5.webp', 4)
) AS i(url, position);

-- Images for Rosado
INSERT INTO product_images (product_id, color_id, url, alt_text, position, is_primary)
SELECT p.id, c.id, i.url, 'Cafarena Niña - Rosado', i.position, i.position = 0
FROM (SELECT id FROM products WHERE slug = 'cafarena-nina') p,
     (SELECT id FROM product_colors WHERE slug = 'rosado' AND product_id = (SELECT id FROM products WHERE slug = 'cafarena-nina')) c,
(VALUES
  ('/productos/nina/cafarenas/cafarena-nina-rosado1.webp', 0),
  ('/productos/nina/cafarenas/cafarena-nina-rosado2.webp', 1),
  ('/productos/nina/cafarenas/cafarena-nina-rosado3.webp', 2),
  ('/productos/nina/cafarenas/cafarena-nina-rosado4.webp', 3)
) AS i(url, position);

-- Size variants
INSERT INTO product_variants (product_id, size, stock, is_active)
SELECT p.id, s.val, 10, true
FROM (SELECT id FROM products WHERE slug = 'cafarena-nina') p,
(VALUES
  ('2'),
  ('4'),
  ('6'),
  ('8'),
  ('10'),
  ('12')
) AS s(val);

COMMIT;
BEGIN;


-- ============================================
-- Product 42: Panty Niña
-- ============================================

-- Insert product
INSERT INTO products (slug, title, price, original_price, category_id, fabric_id, audience, badge, tags, attributes, is_active, published_at)
VALUES (
  'panty-nina',
  'Panty Niña',
  22,
  NULL,
  (SELECT id FROM categories WHERE slug = 'pantys'),
  (SELECT id FROM fabrics WHERE slug = 'suplex-liso-premium'),
  'nina',
  NULL,
  ARRAY[]::text[],
  '{"material":"Suplex liso","detalles":["Diseño especial para niñas","Ajuste cómodo y seguro","Fácil de poner y quitar"],"beneficios":["Perfecta para actividades deportivas","Resistente al uso diario","Mantiene su forma después de lavados"]}'::jsonb,
  true,
  NOW()
);

-- Insert colors
INSERT INTO product_colors (product_id, name, slug, hex, position, is_active)
SELECT p.id, c.name, c.slug, c.hex, c.position, true
FROM (SELECT id FROM products WHERE slug = 'panty-nina') p,
(VALUES
  ('Azul Marino', 'azulmarino', '#1B3A6B', 0),
  ('Blanco', 'blanco', '#FFFFFF', 1),
  ('Negro', 'negro', '#000000', 2),
  ('Rojo', 'rojo', '#FF0000', 3),
  ('Rosado', 'rosado', '#FFB6C1', 4)
) AS c(name, slug, hex, position);

-- Images for Azul Marino
INSERT INTO product_images (product_id, color_id, url, alt_text, position, is_primary)
SELECT p.id, c.id, i.url, 'Panty Niña - Azul Marino', i.position, i.position = 0
FROM (SELECT id FROM products WHERE slug = 'panty-nina') p,
     (SELECT id FROM product_colors WHERE slug = 'azulmarino' AND product_id = (SELECT id FROM products WHERE slug = 'panty-nina')) c,
(VALUES
  ('/productos/nina/pantys/panty-nina-azulmarino1.webp', 0),
  ('/productos/nina/pantys/panty-nina-azulmarino2.webp', 1),
  ('/productos/nina/pantys/panty-nina-azulmarino3.webp', 2),
  ('/productos/nina/pantys/panty-nina-azulmarino4.webp', 3),
  ('/productos/nina/pantys/panty-nina-azulmarino5.webp', 4)
) AS i(url, position);

-- Images for Blanco
INSERT INTO product_images (product_id, color_id, url, alt_text, position, is_primary)
SELECT p.id, c.id, i.url, 'Panty Niña - Blanco', i.position, i.position = 0
FROM (SELECT id FROM products WHERE slug = 'panty-nina') p,
     (SELECT id FROM product_colors WHERE slug = 'blanco' AND product_id = (SELECT id FROM products WHERE slug = 'panty-nina')) c,
(VALUES
  ('/productos/nina/pantys/panty-nina-blanco1.webp', 0),
  ('/productos/nina/pantys/panty-nina-blanco2.webp', 1),
  ('/productos/nina/pantys/panty-nina-blanco3.webp', 2),
  ('/productos/nina/pantys/panty-nina-blanco4.webp', 3)
) AS i(url, position);

-- Images for Negro
INSERT INTO product_images (product_id, color_id, url, alt_text, position, is_primary)
SELECT p.id, c.id, i.url, 'Panty Niña - Negro', i.position, i.position = 0
FROM (SELECT id FROM products WHERE slug = 'panty-nina') p,
     (SELECT id FROM product_colors WHERE slug = 'negro' AND product_id = (SELECT id FROM products WHERE slug = 'panty-nina')) c,
(VALUES
  ('/productos/nina/pantys/panty-nina-negro1.webp', 0),
  ('/productos/nina/pantys/panty-nina-negro2.webp', 1),
  ('/productos/nina/pantys/panty-nina-negro3.webp', 2),
  ('/productos/nina/pantys/panty-nina-negro4.webp', 3)
) AS i(url, position);

-- Images for Rojo
INSERT INTO product_images (product_id, color_id, url, alt_text, position, is_primary)
SELECT p.id, c.id, i.url, 'Panty Niña - Rojo', i.position, i.position = 0
FROM (SELECT id FROM products WHERE slug = 'panty-nina') p,
     (SELECT id FROM product_colors WHERE slug = 'rojo' AND product_id = (SELECT id FROM products WHERE slug = 'panty-nina')) c,
(VALUES
  ('/productos/nina/pantys/panty-nina-rojo1.webp', 0),
  ('/productos/nina/pantys/panty-nina-rojo2.webp', 1),
  ('/productos/nina/pantys/panty-nina-rojo3.webp', 2),
  ('/productos/nina/pantys/panty-nina-rojo4.webp', 3)
) AS i(url, position);

-- Images for Rosado
INSERT INTO product_images (product_id, color_id, url, alt_text, position, is_primary)
SELECT p.id, c.id, i.url, 'Panty Niña - Rosado', i.position, i.position = 0
FROM (SELECT id FROM products WHERE slug = 'panty-nina') p,
     (SELECT id FROM product_colors WHERE slug = 'rosado' AND product_id = (SELECT id FROM products WHERE slug = 'panty-nina')) c,
(VALUES
  ('/productos/nina/pantys/panty-nina-rosado1.webp', 0),
  ('/productos/nina/pantys/panty-nina-rosado2.webp', 1),
  ('/productos/nina/pantys/panty-nina-rosado3.webp', 2),
  ('/productos/nina/pantys/panty-nina-rosado4.webp', 3)
) AS i(url, position);

-- Size variants
INSERT INTO product_variants (product_id, size, stock, is_active)
SELECT p.id, s.val, 10, true
FROM (SELECT id FROM products WHERE slug = 'panty-nina') p,
(VALUES
  ('2'),
  ('4'),
  ('6'),
  ('8'),
  ('10'),
  ('12')
) AS s(val);


-- ============================================
-- Product 43: Maxi Short Niña
-- ============================================

-- Insert product
INSERT INTO products (slug, title, price, original_price, category_id, fabric_id, audience, badge, tags, attributes, is_active, published_at)
VALUES (
  'maxi-short-nina',
  'Maxi Short Niña',
  26,
  NULL,
  (SELECT id FROM categories WHERE slug = 'shorts'),
  (SELECT id FROM fabrics WHERE slug = 'suplex-liso-premium'),
  'nina',
  NULL,
  ARRAY[]::text[],
  '{"material":"Suplex liso","detalles":["Diseño especial para niñas","Ajuste cómodo y seguro","Fácil de poner y quitar"],"beneficios":["Perfecta para actividades deportivas","Resistente al uso diario","Mantiene su forma después de lavados"]}'::jsonb,
  true,
  NOW()
);

-- Insert colors
INSERT INTO product_colors (product_id, name, slug, hex, position, is_active)
SELECT p.id, c.name, c.slug, c.hex, c.position, true
FROM (SELECT id FROM products WHERE slug = 'maxi-short-nina') p,
(VALUES
  ('Azul Marino', 'azulmarino', '#1B3A6B', 0),
  ('Blanco', 'blanco', '#FFFFFF', 1),
  ('Negro', 'negro', '#000000', 2),
  ('Rojo', 'rojo', '#FF0000', 3)
) AS c(name, slug, hex, position);

-- Images for Azul Marino
INSERT INTO product_images (product_id, color_id, url, alt_text, position, is_primary)
SELECT p.id, c.id, i.url, 'Maxi Short Niña - Azul Marino', i.position, i.position = 0
FROM (SELECT id FROM products WHERE slug = 'maxi-short-nina') p,
     (SELECT id FROM product_colors WHERE slug = 'azulmarino' AND product_id = (SELECT id FROM products WHERE slug = 'maxi-short-nina')) c,
(VALUES
  ('/productos/nina/shorts/maxi-short-nina-azulmarino1.webp', 0),
  ('/productos/nina/shorts/maxi-short-nina-azulmarino2.webp', 1),
  ('/productos/nina/shorts/maxi-short-nina-azulmarino3.webp', 2),
  ('/productos/nina/shorts/maxi-short-nina-azulmarino4.webp', 3),
  ('/productos/nina/shorts/maxi-short-nina-azulmarino5.webp', 4)
) AS i(url, position);

-- Images for Blanco
INSERT INTO product_images (product_id, color_id, url, alt_text, position, is_primary)
SELECT p.id, c.id, i.url, 'Maxi Short Niña - Blanco', i.position, i.position = 0
FROM (SELECT id FROM products WHERE slug = 'maxi-short-nina') p,
     (SELECT id FROM product_colors WHERE slug = 'blanco' AND product_id = (SELECT id FROM products WHERE slug = 'maxi-short-nina')) c,
(VALUES
  ('/productos/nina/shorts/maxi-short-nina-blanco1.webp', 0),
  ('/productos/nina/shorts/maxi-short-nina-blanco2.webp', 1),
  ('/productos/nina/shorts/maxi-short-nina-blanco3.webp', 2),
  ('/productos/nina/shorts/maxi-short-nina-blanco4.webp', 3),
  ('/productos/nina/shorts/maxi-short-nina-blanco5.webp', 4)
) AS i(url, position);

-- Images for Negro
INSERT INTO product_images (product_id, color_id, url, alt_text, position, is_primary)
SELECT p.id, c.id, i.url, 'Maxi Short Niña - Negro', i.position, i.position = 0
FROM (SELECT id FROM products WHERE slug = 'maxi-short-nina') p,
     (SELECT id FROM product_colors WHERE slug = 'negro' AND product_id = (SELECT id FROM products WHERE slug = 'maxi-short-nina')) c,
(VALUES
  ('/productos/nina/shorts/maxi-short-nina-negro1.webp', 0),
  ('/productos/nina/shorts/maxi-short-nina-negro2.webp', 1),
  ('/productos/nina/shorts/maxi-short-nina-negro3.webp', 2),
  ('/productos/nina/shorts/maxi-short-nina-negro4.webp', 3)
) AS i(url, position);

-- Images for Rojo
INSERT INTO product_images (product_id, color_id, url, alt_text, position, is_primary)
SELECT p.id, c.id, i.url, 'Maxi Short Niña - Rojo', i.position, i.position = 0
FROM (SELECT id FROM products WHERE slug = 'maxi-short-nina') p,
     (SELECT id FROM product_colors WHERE slug = 'rojo' AND product_id = (SELECT id FROM products WHERE slug = 'maxi-short-nina')) c,
(VALUES
  ('/productos/nina/shorts/maxi-short-nina-rojo1.webp', 0),
  ('/productos/nina/shorts/maxi-short-nina-rojo2.webp', 1),
  ('/productos/nina/shorts/maxi-short-nina-rojo3.webp', 2),
  ('/productos/nina/shorts/maxi-short-nina-rojo4.webp', 3),
  ('/productos/nina/shorts/maxi-short-nina-rojo5.webp', 4)
) AS i(url, position);

-- Size variants
INSERT INTO product_variants (product_id, size, stock, is_active)
SELECT p.id, s.val, 10, true
FROM (SELECT id FROM products WHERE slug = 'maxi-short-nina') p,
(VALUES
  ('2'),
  ('4'),
  ('6'),
  ('8'),
  ('10'),
  ('12')
) AS s(val);


-- ============================================
-- Product 44: Short Juvenil Niña
-- ============================================

-- Insert product
INSERT INTO products (slug, title, price, original_price, category_id, fabric_id, audience, badge, tags, attributes, is_active, published_at)
VALUES (
  'short-juvenil-nina',
  'Short Juvenil Niña',
  24,
  NULL,
  (SELECT id FROM categories WHERE slug = 'shorts'),
  (SELECT id FROM fabrics WHERE slug = 'suplex-liso-premium'),
  'nina',
  NULL,
  ARRAY[]::text[],
  '{"material":"Suplex liso","detalles":["Diseño especial para niñas","Ajuste cómodo y seguro","Fácil de poner y quitar"],"beneficios":["Perfecta para actividades deportivas","Resistente al uso diario","Mantiene su forma después de lavados"]}'::jsonb,
  true,
  NOW()
);

-- Insert colors
INSERT INTO product_colors (product_id, name, slug, hex, position, is_active)
SELECT p.id, c.name, c.slug, c.hex, c.position, true
FROM (SELECT id FROM products WHERE slug = 'short-juvenil-nina') p,
(VALUES
  ('Azul Marino', 'azulmarino', '#1B3A6B', 0),
  ('Blanco', 'blanco', '#FFFFFF', 1),
  ('Negro', 'negro', '#000000', 2),
  ('Rojo', 'rojo', '#FF0000', 3)
) AS c(name, slug, hex, position);

-- Images for Azul Marino
INSERT INTO product_images (product_id, color_id, url, alt_text, position, is_primary)
SELECT p.id, c.id, i.url, 'Short Juvenil Niña - Azul Marino', i.position, i.position = 0
FROM (SELECT id FROM products WHERE slug = 'short-juvenil-nina') p,
     (SELECT id FROM product_colors WHERE slug = 'azulmarino' AND product_id = (SELECT id FROM products WHERE slug = 'short-juvenil-nina')) c,
(VALUES
  ('/productos/nina/shorts/short-juvenil-nina-azulmarino1.webp', 0),
  ('/productos/nina/shorts/short-juvenil-nina-azulmarino2.webp', 1),
  ('/productos/nina/shorts/short-juvenil-nina-azulmarino3.webp', 2),
  ('/productos/nina/shorts/short-juvenil-nina-azulmarino4.webp', 3),
  ('/productos/nina/shorts/short-juvenil-nina-azulmarino5.webp', 4)
) AS i(url, position);

-- Images for Blanco
INSERT INTO product_images (product_id, color_id, url, alt_text, position, is_primary)
SELECT p.id, c.id, i.url, 'Short Juvenil Niña - Blanco', i.position, i.position = 0
FROM (SELECT id FROM products WHERE slug = 'short-juvenil-nina') p,
     (SELECT id FROM product_colors WHERE slug = 'blanco' AND product_id = (SELECT id FROM products WHERE slug = 'short-juvenil-nina')) c,
(VALUES
  ('/productos/nina/shorts/short-juvenil-nina-blanco1.webp', 0),
  ('/productos/nina/shorts/short-juvenil-nina-blanco2.webp', 1),
  ('/productos/nina/shorts/short-juvenil-nina-blanco3.webp', 2),
  ('/productos/nina/shorts/short-juvenil-nina-blanco4.webp', 3),
  ('/productos/nina/shorts/short-juvenil-nina-blanco5.webp', 4)
) AS i(url, position);

-- Images for Negro
INSERT INTO product_images (product_id, color_id, url, alt_text, position, is_primary)
SELECT p.id, c.id, i.url, 'Short Juvenil Niña - Negro', i.position, i.position = 0
FROM (SELECT id FROM products WHERE slug = 'short-juvenil-nina') p,
     (SELECT id FROM product_colors WHERE slug = 'negro' AND product_id = (SELECT id FROM products WHERE slug = 'short-juvenil-nina')) c,
(VALUES
  ('/productos/nina/shorts/short-juvenil-nina-negro1.webp', 0),
  ('/productos/nina/shorts/short-juvenil-nina-negro2.webp', 1),
  ('/productos/nina/shorts/short-juvenil-nina-negro3.webp', 2),
  ('/productos/nina/shorts/short-juvenil-nina-negro4.webp', 3)
) AS i(url, position);

-- Images for Rojo
INSERT INTO product_images (product_id, color_id, url, alt_text, position, is_primary)
SELECT p.id, c.id, i.url, 'Short Juvenil Niña - Rojo', i.position, i.position = 0
FROM (SELECT id FROM products WHERE slug = 'short-juvenil-nina') p,
     (SELECT id FROM product_colors WHERE slug = 'rojo' AND product_id = (SELECT id FROM products WHERE slug = 'short-juvenil-nina')) c,
(VALUES
  ('/productos/nina/shorts/short-juvenil-nina-rojo1.webp', 0),
  ('/productos/nina/shorts/short-juvenil-nina-rojo2.webp', 1),
  ('/productos/nina/shorts/short-juvenil-nina-rojo3.webp', 2),
  ('/productos/nina/shorts/short-juvenil-nina-rojo4.webp', 3),
  ('/productos/nina/shorts/short-juvenil-nina-rojo5.webp', 4)
) AS i(url, position);

-- Size variants
INSERT INTO product_variants (product_id, size, stock, is_active)
SELECT p.id, s.val, 10, true
FROM (SELECT id FROM products WHERE slug = 'short-juvenil-nina') p,
(VALUES
  ('2'),
  ('4'),
  ('6'),
  ('8'),
  ('10'),
  ('12')
) AS s(val);


-- ============================================
-- Product 45: Top Jazmín
-- ============================================

-- Insert product
INSERT INTO products (slug, title, price, original_price, category_id, fabric_id, audience, badge, tags, attributes, is_active, published_at)
VALUES (
  'top-jazmin',
  'Top Jazmín',
  30,
  NULL,
  (SELECT id FROM categories WHERE slug = 'tops'),
  (SELECT id FROM fabrics WHERE slug = 'algodon-premium'),
  'nina',
  NULL,
  ARRAY[]::text[],
  '{"material":"Suplex liso","detalles":["Diseño especial para niñas","Ajuste cómodo y seguro","Fácil de poner y quitar"],"beneficios":["Perfecta para actividades deportivas","Resistente al uso diario","Mantiene su forma después de lavados"]}'::jsonb,
  true,
  NOW()
);

-- Insert colors
INSERT INTO product_colors (product_id, name, slug, hex, position, is_active)
SELECT p.id, c.name, c.slug, c.hex, c.position, true
FROM (SELECT id FROM products WHERE slug = 'top-jazmin') p,
(VALUES
  ('Beige', 'beige', '#F5F5DC', 0),
  ('Blanco', 'blanco', '#FFFFFF', 1),
  ('Negro', 'negro', '#000000', 2)
) AS c(name, slug, hex, position);

-- Images for Beige
INSERT INTO product_images (product_id, color_id, url, alt_text, position, is_primary)
SELECT p.id, c.id, i.url, 'Top Jazmín - Beige', i.position, i.position = 0
FROM (SELECT id FROM products WHERE slug = 'top-jazmin') p,
     (SELECT id FROM product_colors WHERE slug = 'beige' AND product_id = (SELECT id FROM products WHERE slug = 'top-jazmin')) c,
(VALUES
  ('/productos/nina/tops/top-jazmin-beige1.webp', 0),
  ('/productos/nina/tops/top-jazmin-beige2.webp', 1),
  ('/productos/nina/tops/top-jazmin-beige3.webp', 2),
  ('/productos/nina/tops/top-jazmin-beige4.webp', 3),
  ('/productos/nina/tops/top-jazmin-beige5.webp', 4)
) AS i(url, position);

-- Images for Blanco
INSERT INTO product_images (product_id, color_id, url, alt_text, position, is_primary)
SELECT p.id, c.id, i.url, 'Top Jazmín - Blanco', i.position, i.position = 0
FROM (SELECT id FROM products WHERE slug = 'top-jazmin') p,
     (SELECT id FROM product_colors WHERE slug = 'blanco' AND product_id = (SELECT id FROM products WHERE slug = 'top-jazmin')) c,
(VALUES
  ('/productos/nina/tops/top-jazmin-blanco1.webp', 0),
  ('/productos/nina/tops/top-jazmin-blanco2.webp', 1),
  ('/productos/nina/tops/top-jazmin-blanco3.webp', 2),
  ('/productos/nina/tops/top-jazmin-blanco4.webp', 3)
) AS i(url, position);

-- Images for Negro
INSERT INTO product_images (product_id, color_id, url, alt_text, position, is_primary)
SELECT p.id, c.id, i.url, 'Top Jazmín - Negro', i.position, i.position = 0
FROM (SELECT id FROM products WHERE slug = 'top-jazmin') p,
     (SELECT id FROM product_colors WHERE slug = 'negro' AND product_id = (SELECT id FROM products WHERE slug = 'top-jazmin')) c,
(VALUES
  ('/productos/nina/tops/top-jazmin-negro1.webp', 0),
  ('/productos/nina/tops/top-jazmin-negro2.webp', 1),
  ('/productos/nina/tops/top-jazmin-negro3.webp', 2),
  ('/productos/nina/tops/top-jazmin-negro4.webp', 3)
) AS i(url, position);

-- Size variants
INSERT INTO product_variants (product_id, size, stock, is_active)
SELECT p.id, s.val, 10, true
FROM (SELECT id FROM products WHERE slug = 'top-jazmin') p,
(VALUES
  ('2'),
  ('4'),
  ('6'),
  ('8'),
  ('10'),
  ('12')
) AS s(val);


-- ============================================
-- Product 46: Top Margarita
-- ============================================

-- Insert product
INSERT INTO products (slug, title, price, original_price, category_id, fabric_id, audience, badge, tags, attributes, is_active, published_at)
VALUES (
  'top-margarita',
  'Top Margarita',
  30,
  NULL,
  (SELECT id FROM categories WHERE slug = 'tops'),
  (SELECT id FROM fabrics WHERE slug = 'algodon-premium'),
  'nina',
  NULL,
  ARRAY[]::text[],
  '{"material":"Suplex liso","detalles":["Diseño especial para niñas","Ajuste cómodo y seguro","Fácil de poner y quitar"],"beneficios":["Perfecta para actividades deportivas","Resistente al uso diario","Mantiene su forma después de lavados"]}'::jsonb,
  true,
  NOW()
);

-- Insert colors
INSERT INTO product_colors (product_id, name, slug, hex, position, is_active)
SELECT p.id, c.name, c.slug, c.hex, c.position, true
FROM (SELECT id FROM products WHERE slug = 'top-margarita') p,
(VALUES
  ('Beige', 'beige', '#F5F5DC', 0),
  ('Blanco', 'blanco', '#FFFFFF', 1),
  ('Negro', 'negro', '#000000', 2)
) AS c(name, slug, hex, position);

-- Images for Beige
INSERT INTO product_images (product_id, color_id, url, alt_text, position, is_primary)
SELECT p.id, c.id, i.url, 'Top Margarita - Beige', i.position, i.position = 0
FROM (SELECT id FROM products WHERE slug = 'top-margarita') p,
     (SELECT id FROM product_colors WHERE slug = 'beige' AND product_id = (SELECT id FROM products WHERE slug = 'top-margarita')) c,
(VALUES
  ('/productos/nina/tops/top-margarita-beige1.webp', 0),
  ('/productos/nina/tops/top-margarita-beige2.webp', 1),
  ('/productos/nina/tops/top-margarita-beige3.webp', 2),
  ('/productos/nina/tops/top-margarita-beige4.webp', 3),
  ('/productos/nina/tops/top-margarita-beige5.webp', 4),
  ('/productos/nina/tops/top-margarita-beige6.webp', 5)
) AS i(url, position);

-- Images for Blanco
INSERT INTO product_images (product_id, color_id, url, alt_text, position, is_primary)
SELECT p.id, c.id, i.url, 'Top Margarita - Blanco', i.position, i.position = 0
FROM (SELECT id FROM products WHERE slug = 'top-margarita') p,
     (SELECT id FROM product_colors WHERE slug = 'blanco' AND product_id = (SELECT id FROM products WHERE slug = 'top-margarita')) c,
(VALUES
  ('/productos/nina/tops/top-margarita-blanco1.webp', 0),
  ('/productos/nina/tops/top-margarita-blanco2.webp', 1),
  ('/productos/nina/tops/top-margarita-blanco3.webp', 2),
  ('/productos/nina/tops/top-margarita-blanco4.webp', 3),
  ('/productos/nina/tops/top-margarita-blanco5.webp', 4)
) AS i(url, position);

-- Images for Negro
INSERT INTO product_images (product_id, color_id, url, alt_text, position, is_primary)
SELECT p.id, c.id, i.url, 'Top Margarita - Negro', i.position, i.position = 0
FROM (SELECT id FROM products WHERE slug = 'top-margarita') p,
     (SELECT id FROM product_colors WHERE slug = 'negro' AND product_id = (SELECT id FROM products WHERE slug = 'top-margarita')) c,
(VALUES
  ('/productos/nina/tops/top-margarita-negro1.webp', 0),
  ('/productos/nina/tops/top-margarita-negro2.webp', 1),
  ('/productos/nina/tops/top-margarita-negro3.webp', 2),
  ('/productos/nina/tops/top-margarita-negro4.webp', 3),
  ('/productos/nina/tops/top-margarita-negro5.webp', 4)
) AS i(url, position);

-- Size variants
INSERT INTO product_variants (product_id, size, stock, is_active)
SELECT p.id, s.val, 10, true
FROM (SELECT id FROM products WHERE slug = 'top-margarita') p,
(VALUES
  ('2'),
  ('4'),
  ('6'),
  ('8'),
  ('10'),
  ('12')
) AS s(val);


-- ============================================
-- Product 47: Top Vani
-- ============================================

-- Insert product
INSERT INTO products (slug, title, price, original_price, category_id, fabric_id, audience, badge, tags, attributes, is_active, published_at)
VALUES (
  'top-vani',
  'Top Vani',
  28,
  NULL,
  (SELECT id FROM categories WHERE slug = 'tops'),
  (SELECT id FROM fabrics WHERE slug = 'algodon-premium'),
  'nina',
  NULL,
  ARRAY[]::text[],
  '{"material":"Suplex liso","detalles":["Diseño especial para niñas","Ajuste cómodo y seguro","Fácil de poner y quitar"],"beneficios":["Perfecta para actividades deportivas","Resistente al uso diario","Mantiene su forma después de lavados"]}'::jsonb,
  true,
  NOW()
);

-- Insert colors
INSERT INTO product_colors (product_id, name, slug, hex, position, is_active)
SELECT p.id, c.name, c.slug, c.hex, c.position, true
FROM (SELECT id FROM products WHERE slug = 'top-vani') p,
(VALUES
  ('Blanco', 'blanco', '#FFFFFF', 0),
  ('Negro', 'negro', '#000000', 1),
  ('Rojo', 'rojo', '#FF0000', 2)
) AS c(name, slug, hex, position);

-- Images for Blanco
INSERT INTO product_images (product_id, color_id, url, alt_text, position, is_primary)
SELECT p.id, c.id, i.url, 'Top Vani - Blanco', i.position, i.position = 0
FROM (SELECT id FROM products WHERE slug = 'top-vani') p,
     (SELECT id FROM product_colors WHERE slug = 'blanco' AND product_id = (SELECT id FROM products WHERE slug = 'top-vani')) c,
(VALUES
  ('/productos/nina/tops/top-vani-blanco1.webp', 0),
  ('/productos/nina/tops/top-vani-blanco2.webp', 1),
  ('/productos/nina/tops/top-vani-blanco3.webp', 2),
  ('/productos/nina/tops/top-vani-blanco4.webp', 3)
) AS i(url, position);

-- Images for Negro
INSERT INTO product_images (product_id, color_id, url, alt_text, position, is_primary)
SELECT p.id, c.id, i.url, 'Top Vani - Negro', i.position, i.position = 0
FROM (SELECT id FROM products WHERE slug = 'top-vani') p,
     (SELECT id FROM product_colors WHERE slug = 'negro' AND product_id = (SELECT id FROM products WHERE slug = 'top-vani')) c,
(VALUES
  ('/productos/nina/tops/top-vani-negro1.webp', 0),
  ('/productos/nina/tops/top-vani-negro2.webp', 1),
  ('/productos/nina/tops/top-vani-negro3.webp', 2),
  ('/productos/nina/tops/top-vani-negro4.webp', 3)
) AS i(url, position);

-- Images for Rojo
INSERT INTO product_images (product_id, color_id, url, alt_text, position, is_primary)
SELECT p.id, c.id, i.url, 'Top Vani - Rojo', i.position, i.position = 0
FROM (SELECT id FROM products WHERE slug = 'top-vani') p,
     (SELECT id FROM product_colors WHERE slug = 'rojo' AND product_id = (SELECT id FROM products WHERE slug = 'top-vani')) c,
(VALUES
  ('/productos/nina/tops/top-vani-rojo1.webp', 0),
  ('/productos/nina/tops/top-vani-rojo2.webp', 1),
  ('/productos/nina/tops/top-vani-rojo3.webp', 2),
  ('/productos/nina/tops/top-vani-rojo4.webp', 3),
  ('/productos/nina/tops/top-vani-rojo5.webp', 4)
) AS i(url, position);

-- Size variants
INSERT INTO product_variants (product_id, size, stock, is_active)
SELECT p.id, s.val, 10, true
FROM (SELECT id FROM products WHERE slug = 'top-vani') p,
(VALUES
  ('2'),
  ('4'),
  ('6'),
  ('8'),
  ('10'),
  ('12')
) AS s(val);


-- ============================================
-- Product 48: Top Orquídea
-- ============================================

-- Insert product
INSERT INTO products (slug, title, price, original_price, category_id, fabric_id, audience, badge, tags, attributes, is_active, published_at)
VALUES (
  'top-orquidea',
  'Top Orquídea',
  30,
  NULL,
  (SELECT id FROM categories WHERE slug = 'tops'),
  (SELECT id FROM fabrics WHERE slug = 'algodon-premium'),
  'nina',
  NULL,
  ARRAY[]::text[],
  '{"material":"Suplex liso","detalles":["Diseño especial para niñas","Ajuste cómodo y seguro","Fácil de poner y quitar"],"beneficios":["Perfecta para actividades deportivas","Resistente al uso diario","Mantiene su forma después de lavados"]}'::jsonb,
  true,
  NOW()
);

-- Insert colors
INSERT INTO product_colors (product_id, name, slug, hex, position, is_active)
SELECT p.id, c.name, c.slug, c.hex, c.position, true
FROM (SELECT id FROM products WHERE slug = 'top-orquidea') p,
(VALUES
  ('Top', 'top', '#CCCCCC', 0)
) AS c(name, slug, hex, position);

-- Images for Top
INSERT INTO product_images (product_id, color_id, url, alt_text, position, is_primary)
SELECT p.id, c.id, i.url, 'Top Orquídea - Top', i.position, i.position = 0
FROM (SELECT id FROM products WHERE slug = 'top-orquidea') p,
     (SELECT id FROM product_colors WHERE slug = 'top' AND product_id = (SELECT id FROM products WHERE slug = 'top-orquidea')) c,
(VALUES
  ('/placeholder.svg', 0)
) AS i(url, position);

-- Size variants
INSERT INTO product_variants (product_id, size, stock, is_active)
SELECT p.id, s.val, 10, true
FROM (SELECT id FROM products WHERE slug = 'top-orquidea') p,
(VALUES
  ('2'),
  ('4'),
  ('6'),
  ('8'),
  ('10'),
  ('12')
) AS s(val);


-- ============================================
-- Product 49: Top Tulipán
-- ============================================

-- Insert product
INSERT INTO products (slug, title, price, original_price, category_id, fabric_id, audience, badge, tags, attributes, is_active, published_at)
VALUES (
  'top-tulipan',
  'Top Tulipán',
  30,
  NULL,
  (SELECT id FROM categories WHERE slug = 'tops'),
  (SELECT id FROM fabrics WHERE slug = 'algodon-premium'),
  'nina',
  NULL,
  ARRAY[]::text[],
  '{"material":"Suplex liso","detalles":["Diseño especial para niñas","Ajuste cómodo y seguro","Fácil de poner y quitar"],"beneficios":["Perfecta para actividades deportivas","Resistente al uso diario","Mantiene su forma después de lavados"]}'::jsonb,
  true,
  NOW()
);

-- Insert colors
INSERT INTO product_colors (product_id, name, slug, hex, position, is_active)
SELECT p.id, c.name, c.slug, c.hex, c.position, true
FROM (SELECT id FROM products WHERE slug = 'top-tulipan') p,
(VALUES
  ('Top', 'top', '#CCCCCC', 0)
) AS c(name, slug, hex, position);

-- Images for Top
INSERT INTO product_images (product_id, color_id, url, alt_text, position, is_primary)
SELECT p.id, c.id, i.url, 'Top Tulipán - Top', i.position, i.position = 0
FROM (SELECT id FROM products WHERE slug = 'top-tulipan') p,
     (SELECT id FROM product_colors WHERE slug = 'top' AND product_id = (SELECT id FROM products WHERE slug = 'top-tulipan')) c,
(VALUES
  ('/placeholder.svg', 0)
) AS i(url, position);

-- Size variants
INSERT INTO product_variants (product_id, size, stock, is_active)
SELECT p.id, s.val, 10, true
FROM (SELECT id FROM products WHERE slug = 'top-tulipan') p,
(VALUES
  ('2'),
  ('4'),
  ('6'),
  ('8'),
  ('10'),
  ('12')
) AS s(val);

COMMIT;
