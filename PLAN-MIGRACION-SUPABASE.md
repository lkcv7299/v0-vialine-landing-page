# PLAN DE MIGRACIÓN: NEON → SUPABASE + ADMIN PANEL

## Executive Summary

**Proyecto:** Vialine E-commerce (ropa deportiva)
**Estado Actual:** MVP funcional con limitaciones críticas
**Objetivo:** Migrar a Supabase + construir Admin Panel completo
**Tiempo Estimado:** 3-4 semanas de desarrollo

---

## PARTE 1: DIAGNÓSTICO ACTUAL

### 1.1 Base de Datos Neon (Actual)

```
┌─────────────────────────────────────────────────────────────────┐
│                    NEON POSTGRESQL                               │
├─────────────────────────────────────────────────────────────────┤
│  Host: ep-fragrant-bar-ad04bqou-pooler.us-east-1.aws.neon.tech  │
│  Database: neondb                                                │
│  Tablas: 9                                                       │
│  ORM: NINGUNO (SQL crudo - RIESGO DE INYECCIÓN)                 │
└─────────────────────────────────────────────────────────────────┘
```

**Tablas Existentes:**

| Tabla | Registros Est. | Descripción |
|-------|----------------|-------------|
| `users` | ~50-100 | Usuarios registrados |
| `accounts` | ~20 | OAuth connections (Google) |
| `sessions` | ~0 | No usado (JWT) |
| `verification_tokens` | ~0 | Email verification |
| `user_addresses` | ~30 | Direcciones de envío |
| `wishlist` | ~100 | Favoritos |
| `orders` | ~200 | Pedidos |
| `order_items` | ~500 | Items de pedidos |
| `product_reviews` | ~20 | Reseñas |
| `session_blacklist` | ~10 | Logout tracking |

### 1.2 Productos (Archivo Estático)

```
┌─────────────────────────────────────────────────────────────────┐
│                    data/products.ts                              │
├─────────────────────────────────────────────────────────────────┤
│  Líneas de código: 3,314                                         │
│  Total productos: 141                                            │
│  Categorías: 10                                                  │
│  Tejidos: 7                                                      │
│  Colores únicos: 17                                              │
│  Imágenes: ~2,000+ archivos WebP                                │
└─────────────────────────────────────────────────────────────────┘
```

**PROBLEMA CRÍTICO:** Los productos están hardcodeados. Cambiar un precio requiere:
1. Editar código
2. Hacer commit
3. Deploy a Vercel
4. Esperar 2-3 minutos

### 1.3 Autenticación (NextAuth v5 Beta)

```
┌─────────────────────────────────────────────────────────────────┐
│                    AUTENTICACIÓN ACTUAL                          │
├─────────────────────────────────────────────────────────────────┤
│  Sistema: NextAuth v5.0.0-beta.29 (⚠️ BETA - RIESGOSO)          │
│  Providers: Email/Password + Google OAuth                        │
│  Sesiones: JWT (24 horas)                                        │
│  Admin: CREDENCIALES HARDCODEADAS (admin@vialine.pe/vialine2025)│
└─────────────────────────────────────────────────────────────────┘
```

### 1.4 Imágenes (Local)

```
/public/productos/
├── mujer/           (~1,500 imágenes)
│   ├── bikers/
│   ├── bodys/
│   ├── camisetas/
│   ├── enterizo/
│   ├── legging/
│   ├── pescador/
│   ├── short/
│   ├── tops/
│   └── torero/
└── nina/            (~500 imágenes)
    ├── cafarenas/
    ├── enterizos/
    ├── leggings/
    ├── pantys/
    ├── shorts/
    └── tops/
```

**PROBLEMA:** Imágenes servidas estáticamente desde Vercel. Sin CDN, sin transformaciones, sin optimización dinámica.

---

## PARTE 2: ARQUITECTURA SUPABASE

### 2.1 ¿Por qué Supabase?

| Feature | Neon | Supabase | Ganancia |
|---------|------|----------|----------|
| Database | ✅ PostgreSQL | ✅ PostgreSQL | Igual |
| Auth | ❌ NextAuth Beta | ✅ Production-ready | Estabilidad |
| Storage | ❌ Local files | ✅ CDN + transforms | Performance |
| Realtime | ❌ No | ✅ WebSockets | Inventario live |
| Row Level Security | ❌ Manual | ✅ Integrado | Seguridad |
| Dashboard | ❌ No | ✅ Studio gratis | Admin rápido |
| Edge Functions | ❌ No | ✅ Deno runtime | Webhooks |

### 2.2 Schema de Supabase (Diseño Completo)

```sql
-- ============================================================================
-- MÓDULO 1: AUTENTICACIÓN (usa auth.users de Supabase)
-- ============================================================================

-- Perfiles extendidos de usuario
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  phone TEXT,
  avatar_url TEXT,
  role TEXT DEFAULT 'customer' CHECK (role IN ('customer', 'admin', 'super_admin')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Direcciones de usuario
CREATE TABLE public.addresses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  label TEXT, -- "Casa", "Trabajo"
  is_default BOOLEAN DEFAULT false,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  address TEXT NOT NULL,
  district TEXT NOT NULL,
  city TEXT NOT NULL,
  postal_code TEXT,
  reference TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- MÓDULO 2: CATÁLOGO DE PRODUCTOS
-- ============================================================================

-- Categorías
CREATE TABLE public.categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  parent_id UUID REFERENCES public.categories(id),
  position INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tejidos/Materiales
CREATE TABLE public.fabrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  family TEXT CHECK (family IN ('suplex', 'algodon')),
  description TEXT,
  tagline TEXT,
  features JSONB DEFAULT '[]', -- ["Secado rápido", "Compresión media"]
  care_instructions TEXT[],
  is_active BOOLEAN DEFAULT true,
  position INTEGER DEFAULT 0
);

-- Productos (tabla principal)
CREATE TABLE public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,

  -- Precios
  price DECIMAL(10,2) NOT NULL,
  original_price DECIMAL(10,2), -- Para descuentos
  cost DECIMAL(10,2), -- Costo interno (solo admin)

  -- Relaciones
  category_id UUID REFERENCES public.categories(id),
  fabric_id UUID REFERENCES public.fabrics(id),
  audience TEXT CHECK (audience IN ('mujer', 'nina')) DEFAULT 'mujer',

  -- Metadata
  badge TEXT CHECK (badge IN ('nuevo', 'oferta', 'agotado', NULL)),
  tags TEXT[] DEFAULT '{}',
  sku TEXT, -- Código interno

  -- SEO
  meta_title TEXT,
  meta_description TEXT,

  -- Estado
  is_active BOOLEAN DEFAULT true,
  is_featured BOOLEAN DEFAULT false,
  position INTEGER DEFAULT 0,

  -- Atributos adicionales
  attributes JSONB DEFAULT '{}', -- material, detalles, beneficios

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  published_at TIMESTAMPTZ
);

-- Variantes de color por producto
CREATE TABLE public.product_colors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  slug TEXT NOT NULL,
  hex TEXT NOT NULL, -- #FFFFFF
  position INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  UNIQUE(product_id, slug)
);

-- Imágenes de producto (por color)
CREATE TABLE public.product_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  color_id UUID REFERENCES public.product_colors(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  alt_text TEXT,
  position INTEGER DEFAULT 0,
  is_primary BOOLEAN DEFAULT false
);

-- Tallas y stock por producto/color
CREATE TABLE public.product_variants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  color_id UUID REFERENCES public.product_colors(id) ON DELETE CASCADE,
  size TEXT NOT NULL, -- "S", "M", "L", "XL" o "2", "4", "6"
  sku TEXT,
  stock INTEGER DEFAULT 0,
  low_stock_threshold INTEGER DEFAULT 5,
  is_active BOOLEAN DEFAULT true,
  UNIQUE(product_id, color_id, size)
);

-- ============================================================================
-- MÓDULO 3: PEDIDOS
-- ============================================================================

CREATE TABLE public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number TEXT UNIQUE NOT NULL, -- "VL-00001"
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,

  -- Cliente (snapshot al momento del pedido)
  customer_email TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  customer_name TEXT NOT NULL,

  -- Dirección de envío (snapshot)
  shipping_address JSONB NOT NULL,

  -- Totales
  subtotal DECIMAL(10,2) NOT NULL,
  shipping_cost DECIMAL(10,2) NOT NULL DEFAULT 0,
  discount DECIMAL(10,2) DEFAULT 0,
  total DECIMAL(10,2) NOT NULL,

  -- Pago
  payment_method TEXT CHECK (payment_method IN ('culqi', 'contra_entrega', 'yape', 'plin')),
  payment_id TEXT,
  payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'failed', 'refunded')),

  -- Estado del pedido
  status TEXT DEFAULT 'pending' CHECK (status IN (
    'pending',           -- Esperando pago
    'confirmed',         -- Pago confirmado
    'processing',        -- Preparando pedido
    'shipped',           -- Enviado
    'delivered',         -- Entregado
    'cancelled',         -- Cancelado
    'refunded'           -- Reembolsado
  )),

  -- Tracking
  tracking_number TEXT,
  tracking_url TEXT,
  shipped_at TIMESTAMPTZ,
  delivered_at TIMESTAMPTZ,

  -- Notas
  customer_notes TEXT,
  admin_notes TEXT,

  -- Cupón
  coupon_code TEXT,
  coupon_discount DECIMAL(10,2),

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES public.products(id) ON DELETE SET NULL,
  variant_id UUID REFERENCES public.product_variants(id) ON DELETE SET NULL,

  -- Snapshot del producto al momento de compra
  product_title TEXT NOT NULL,
  product_slug TEXT NOT NULL,
  product_image TEXT,
  product_price DECIMAL(10,2) NOT NULL,

  -- Selección
  color_name TEXT,
  size TEXT,
  quantity INTEGER NOT NULL DEFAULT 1,

  -- Total del item
  item_total DECIMAL(10,2) NOT NULL
);

-- ============================================================================
-- MÓDULO 4: FUNCIONALIDADES ADICIONALES
-- ============================================================================

-- Wishlist
CREATE TABLE public.wishlist (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, product_id)
);

-- Reviews
CREATE TABLE public.reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  order_id UUID REFERENCES public.orders(id), -- Para verificar compra

  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  title TEXT,
  comment TEXT NOT NULL,

  is_verified_purchase BOOLEAN DEFAULT false,
  is_approved BOOLEAN DEFAULT false, -- Moderación

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Cupones de descuento
CREATE TABLE public.coupons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code TEXT UNIQUE NOT NULL,
  description TEXT,

  discount_type TEXT CHECK (discount_type IN ('percentage', 'fixed')),
  discount_value DECIMAL(10,2) NOT NULL,

  min_purchase DECIMAL(10,2),
  max_discount DECIMAL(10,2),

  usage_limit INTEGER,
  usage_count INTEGER DEFAULT 0,

  valid_from TIMESTAMPTZ,
  valid_until TIMESTAMPTZ,

  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Configuración general
CREATE TABLE public.settings (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Logs de actividad (auditoría)
CREATE TABLE public.activity_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  action TEXT NOT NULL, -- 'product.created', 'order.updated', etc.
  entity_type TEXT, -- 'product', 'order', etc.
  entity_id UUID,
  old_values JSONB,
  new_values JSONB,
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- ÍNDICES PARA PERFORMANCE
-- ============================================================================

CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_products_fabric ON products(fabric_id);
CREATE INDEX idx_products_audience ON products(audience);
CREATE INDEX idx_products_active ON products(is_active);
CREATE INDEX idx_products_slug ON products(slug);

CREATE INDEX idx_product_colors_product ON product_colors(product_id);
CREATE INDEX idx_product_images_product ON product_images(product_id);
CREATE INDEX idx_product_variants_product ON product_variants(product_id);
CREATE INDEX idx_product_variants_stock ON product_variants(stock) WHERE stock <= 5;

CREATE INDEX idx_orders_user ON orders(user_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_created ON orders(created_at DESC);

CREATE INDEX idx_wishlist_user ON wishlist(user_id);
CREATE INDEX idx_reviews_product ON reviews(product_id);

-- ============================================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================================

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE addresses ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE wishlist ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Políticas para usuarios normales
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can view own addresses"
  ON addresses FOR ALL
  USING (auth.uid() = user_id);

CREATE POLICY "Users can view own orders"
  ON orders FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can view own wishlist"
  ON wishlist FOR ALL
  USING (auth.uid() = user_id);

-- Políticas para admin
CREATE POLICY "Admins can do everything"
  ON products FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('admin', 'super_admin')
    )
  );

-- Productos públicos (lectura)
CREATE POLICY "Anyone can view active products"
  ON products FOR SELECT
  USING (is_active = true);

CREATE POLICY "Anyone can view categories"
  ON categories FOR SELECT
  USING (is_active = true);

CREATE POLICY "Anyone can view fabrics"
  ON fabrics FOR SELECT
  USING (is_active = true);
```

### 2.3 Supabase Storage (Buckets)

```
┌─────────────────────────────────────────────────────────────────┐
│                    STORAGE BUCKETS                               │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  📁 products (público)                                          │
│     └── Imágenes de productos organizadas por ID                │
│         /products/{product_id}/{color_slug}/{image_name}.webp   │
│                                                                  │
│  📁 avatars (público)                                           │
│     └── Fotos de perfil de usuarios                             │
│         /avatars/{user_id}.webp                                 │
│                                                                  │
│  📁 banners (público)                                           │
│     └── Banners del homepage y promociones                      │
│                                                                  │
│  📁 receipts (privado)                                          │
│     └── Comprobantes de pago                                    │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## PARTE 3: PLAN DE MIGRACIÓN

### Fase 1: Setup Inicial (Día 1-2)

```
┌─────────────────────────────────────────────────────────────────┐
│  FASE 1: SETUP INICIAL                                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ☐ 1.1 Crear tablas en Supabase                                 │
│      - Ejecutar schema SQL completo                             │
│      - Configurar RLS policies                                  │
│      - Crear buckets de storage                                 │
│                                                                  │
│  ☐ 1.2 Configurar Supabase Auth                                 │
│      - Habilitar Email/Password                                 │
│      - Configurar Google OAuth                                  │
│      - Configurar emails transaccionales                        │
│      - Templates de email en español                            │
│                                                                  │
│  ☐ 1.3 Variables de entorno                                     │
│      - NEXT_PUBLIC_SUPABASE_URL                                 │
│      - NEXT_PUBLIC_SUPABASE_ANON_KEY                           │
│      - SUPABASE_SERVICE_ROLE_KEY                               │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Fase 2: Migración de Datos (Día 3-5)

```
┌─────────────────────────────────────────────────────────────────┐
│  FASE 2: MIGRACIÓN DE DATOS                                     │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ☐ 2.1 Migrar usuarios (Neon → Supabase Auth)                  │
│      - Exportar users de Neon                                   │
│      - Crear usuarios en Supabase Auth                          │
│      - Migrar password hashes (si es posible) o reset           │
│      - Crear perfiles en profiles table                         │
│                                                                  │
│  ☐ 2.2 Migrar productos (products.ts → Supabase)               │
│      - Script de migración automática                           │
│      - Crear categorías y tejidos                               │
│      - Insertar productos con relaciones                        │
│      - Crear colores y variantes                                │
│                                                                  │
│  ☐ 2.3 Migrar imágenes (/public → Supabase Storage)            │
│      - Upload masivo de ~2,000 imágenes                         │
│      - Actualizar URLs en product_images                        │
│      - Optimización automática con transforms                   │
│                                                                  │
│  ☐ 2.4 Migrar pedidos y datos transaccionales                  │
│      - Exportar orders y order_items                            │
│      - Mapear user_id antiguos a nuevos                         │
│      - Insertar con timestamps originales                       │
│                                                                  │
│  ☐ 2.5 Migrar wishlist y reviews                               │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Fase 3: Refactorizar Frontend (Día 6-10)

```
┌─────────────────────────────────────────────────────────────────┐
│  FASE 3: REFACTORIZAR FRONTEND                                  │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ☐ 3.1 Instalar Supabase Client                                │
│      npm install @supabase/supabase-js @supabase/ssr           │
│                                                                  │
│  ☐ 3.2 Crear cliente Supabase                                  │
│      - lib/supabase/client.ts (browser)                        │
│      - lib/supabase/server.ts (server components)              │
│      - lib/supabase/middleware.ts (auth middleware)            │
│                                                                  │
│  ☐ 3.3 Reemplazar NextAuth por Supabase Auth                   │
│      - Login page → Supabase signInWithPassword                │
│      - Register → Supabase signUp                              │
│      - Google OAuth → Supabase signInWithOAuth                 │
│      - Logout → Supabase signOut                               │
│      - Password reset → Supabase resetPasswordForEmail         │
│                                                                  │
│  ☐ 3.4 Actualizar middleware de auth                           │
│      - Verificar sesión con Supabase                           │
│      - Proteger rutas /account/*                               │
│      - Proteger rutas /admin/*                                 │
│                                                                  │
│  ☐ 3.5 Actualizar data fetching de productos                   │
│      - Reemplazar imports de products.ts                       │
│      - Queries a Supabase con filtros                          │
│      - Implementar paginación server-side                      │
│                                                                  │
│  ☐ 3.6 Actualizar páginas de producto                          │
│      - Cargar desde Supabase                                   │
│      - Imágenes desde Storage con transforms                   │
│      - Stock en tiempo real                                    │
│                                                                  │
│  ☐ 3.7 Actualizar checkout                                     │
│      - Crear pedido en Supabase                                │
│      - Actualizar stock automáticamente                        │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Fase 4: Admin Panel (Día 11-20)

```
┌─────────────────────────────────────────────────────────────────┐
│  FASE 4: ADMIN PANEL                                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ☐ 4.1 Setup Admin                                             │
│      - Ruta /admin protegida                                   │
│      - Verificar role = 'admin' en profiles                    │
│      - Layout con sidebar                                       │
│                                                                  │
│  ☐ 4.2 Dashboard                                               │
│      - Ventas del día/semana/mes                               │
│      - Gráfico de ventas                                       │
│      - Pedidos pendientes                                      │
│      - Productos con bajo stock                                │
│      - Últimas órdenes                                         │
│                                                                  │
│  ☐ 4.3 Gestión de Productos                                    │
│      - Lista con búsqueda y filtros                            │
│      - Crear producto (formulario completo)                    │
│      - Editar producto                                         │
│      - Gestionar colores (agregar/quitar)                      │
│      - Upload de imágenes (drag & drop)                        │
│      - Gestionar tallas y stock                                │
│      - Activar/desactivar producto                             │
│      - Duplicar producto                                       │
│                                                                  │
│  ☐ 4.4 Gestión de Pedidos                                      │
│      - Lista con filtros por estado                            │
│      - Ver detalle de pedido                                   │
│      - Cambiar estado (con email automático)                   │
│      - Agregar tracking number                                 │
│      - Imprimir guía de envío                                  │
│      - Cancelar/reembolsar                                     │
│                                                                  │
│  ☐ 4.5 Gestión de Clientes                                     │
│      - Lista de usuarios                                       │
│      - Ver historial de compras                                │
│      - Ver wishlist                                            │
│                                                                  │
│  ☐ 4.6 Categorías y Tejidos                                    │
│      - CRUD de categorías                                      │
│      - CRUD de tejidos                                         │
│      - Ordenar posición                                        │
│                                                                  │
│  ☐ 4.7 Cupones                                                 │
│      - Crear cupón (% o monto fijo)                           │
│      - Establecer límites                                      │
│      - Ver uso                                                 │
│                                                                  │
│  ☐ 4.8 Configuración                                           │
│      - Costos de envío por zona                                │
│      - Monto mínimo envío gratis                               │
│      - Información de contacto                                 │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Fase 5: Testing y Deploy (Día 21-25)

```
┌─────────────────────────────────────────────────────────────────┐
│  FASE 5: TESTING Y DEPLOY                                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ☐ 5.1 Testing exhaustivo                                      │
│      - Flujo de compra completo                                │
│      - Login/registro                                          │
│      - Admin panel todas las funciones                         │
│      - Mobile responsive                                        │
│                                                                  │
│  ☐ 5.2 Migración final de datos                                │
│      - Exportar últimos datos de producción                    │
│      - Importar a Supabase                                     │
│                                                                  │
│  ☐ 5.3 Actualizar variables en Vercel                          │
│      - Cambiar DATABASE_URL a Supabase                         │
│      - Agregar Supabase keys                                   │
│      - Remover Neon keys                                       │
│                                                                  │
│  ☐ 5.4 Deploy a producción                                     │
│      - Deploy gradual                                          │
│      - Monitorear errores                                      │
│      - Rollback plan si hay issues                             │
│                                                                  │
│  ☐ 5.5 Cleanup                                                 │
│      - Eliminar código legacy                                  │
│      - Eliminar data/products.ts                               │
│      - Eliminar conexión Neon                                  │
│      - Eliminar NextAuth                                       │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## PARTE 4: FEATURES NUEVOS CON SUPABASE

### 4.1 Realtime Stock

```typescript
// Suscripción a cambios de inventario
const channel = supabase
  .channel('stock-updates')
  .on('postgres_changes', {
    event: 'UPDATE',
    schema: 'public',
    table: 'product_variants',
    filter: 'stock=lt.5'
  }, (payload) => {
    // Notificar admin de bajo stock
    toast.warning(`Stock bajo: ${payload.new.sku}`)
  })
  .subscribe()
```

### 4.2 Image Transforms

```typescript
// URL de imagen con transformaciones automáticas
const imageUrl = supabase.storage
  .from('products')
  .getPublicUrl('product-1/azul/image-1.webp', {
    transform: {
      width: 400,
      height: 400,
      resize: 'cover',
      quality: 80
    }
  })
```

### 4.3 Edge Functions (Webhooks)

```typescript
// supabase/functions/order-webhook/index.ts
Deno.serve(async (req) => {
  const { order_id, status } = await req.json()

  // Enviar email al cliente
  await sendOrderStatusEmail(order_id, status)

  // Actualizar inventario si es necesario
  if (status === 'cancelled') {
    await restoreStock(order_id)
  }

  return new Response(JSON.stringify({ success: true }))
})
```

### 4.4 Full-Text Search

```sql
-- Búsqueda de productos optimizada
CREATE INDEX idx_products_search ON products
USING GIN (to_tsvector('spanish', title || ' ' || COALESCE(description, '')));

-- Query de búsqueda
SELECT * FROM products
WHERE to_tsvector('spanish', title || ' ' || COALESCE(description, ''))
@@ plainto_tsquery('spanish', 'legging negro');
```

---

## PARTE 5: ESTRUCTURA DEL ADMIN PANEL

### 5.1 Rutas

```
/admin
├── /                      → Dashboard
├── /products              → Lista de productos
├── /products/new          → Crear producto
├── /products/[id]         → Editar producto
├── /orders                → Lista de pedidos
├── /orders/[id]           → Detalle de pedido
├── /customers             → Lista de clientes
├── /customers/[id]        → Detalle de cliente
├── /categories            → Gestión de categorías
├── /fabrics               → Gestión de tejidos
├── /coupons               → Gestión de cupones
├── /coupons/new           → Crear cupón
├── /settings              → Configuración
└── /settings/shipping     → Costos de envío
```

### 5.2 Componentes del Admin

```
/components/admin
├── layout/
│   ├── AdminLayout.tsx       → Layout principal
│   ├── AdminSidebar.tsx      → Menú lateral
│   └── AdminHeader.tsx       → Header con usuario
├── dashboard/
│   ├── SalesChart.tsx        → Gráfico de ventas
│   ├── StatsCards.tsx        → Tarjetas de métricas
│   ├── RecentOrders.tsx      → Últimos pedidos
│   └── LowStockAlert.tsx     → Alerta de stock bajo
├── products/
│   ├── ProductForm.tsx       → Formulario de producto
│   ├── ProductTable.tsx      → Tabla de productos
│   ├── ColorManager.tsx      → Gestión de colores
│   ├── ImageUploader.tsx     → Subir imágenes
│   └── VariantManager.tsx    → Gestión de tallas/stock
├── orders/
│   ├── OrderTable.tsx        → Tabla de pedidos
│   ├── OrderDetail.tsx       → Detalle de pedido
│   └── OrderStatusSelect.tsx → Cambiar estado
└── shared/
    ├── DataTable.tsx         → Tabla reutilizable
    ├── SearchInput.tsx       → Buscador
    ├── Pagination.tsx        → Paginación
    └── ConfirmDialog.tsx     → Diálogo de confirmación
```

---

## PARTE 6: SCRIPTS DE MIGRACIÓN

### 6.1 Script: Migrar Productos

```typescript
// scripts/migrate-products-to-supabase.ts
import { createClient } from '@supabase/supabase-js'
import { products } from '../data/products'

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

async function migrateProducts() {
  console.log(`Migrando ${products.length} productos...`)

  for (const product of products) {
    // 1. Crear producto
    const { data: newProduct, error } = await supabase
      .from('products')
      .insert({
        slug: product.slug,
        title: product.title,
        price: product.price,
        original_price: product.originalPrice,
        audience: product.audience,
        badge: product.badge,
        tags: product.tags,
        attributes: product.attributes,
        is_active: true
      })
      .select()
      .single()

    if (error) {
      console.error(`Error en ${product.slug}:`, error)
      continue
    }

    // 2. Crear colores
    for (const color of product.colors) {
      const colorData = typeof color === 'string'
        ? { name: color, slug: color.toLowerCase(), hex: '#000' }
        : color

      const { data: newColor } = await supabase
        .from('product_colors')
        .insert({
          product_id: newProduct.id,
          name: colorData.name,
          slug: colorData.slug,
          hex: colorData.hex
        })
        .select()
        .single()

      // 3. Crear imágenes del color
      const images = colorData.images || (colorData.image ? [colorData.image] : [])
      for (let i = 0; i < images.length; i++) {
        await supabase.from('product_images').insert({
          product_id: newProduct.id,
          color_id: newColor?.id,
          url: images[i],
          position: i,
          is_primary: i === 0
        })
      }
    }

    // 4. Crear variantes (tallas)
    for (const size of product.sizes) {
      await supabase.from('product_variants').insert({
        product_id: newProduct.id,
        size,
        stock: product.inventory || 10 // Stock por defecto
      })
    }

    console.log(`✓ ${product.title}`)
  }

  console.log('Migración completada!')
}

migrateProducts()
```

### 6.2 Script: Migrar Imágenes a Storage

```typescript
// scripts/migrate-images-to-storage.ts
import { createClient } from '@supabase/supabase-js'
import fs from 'fs'
import path from 'path'

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

async function uploadImage(localPath: string, remotePath: string) {
  const file = fs.readFileSync(localPath)

  const { error } = await supabase.storage
    .from('products')
    .upload(remotePath, file, {
      contentType: 'image/webp',
      upsert: true
    })

  if (error) console.error(`Error uploading ${localPath}:`, error)
  else console.log(`✓ ${remotePath}`)
}

async function migrateImages() {
  const baseDir = './public/productos'

  // Recorrer todas las imágenes
  const walkDir = (dir: string) => {
    const files = fs.readdirSync(dir)
    for (const file of files) {
      const filePath = path.join(dir, file)
      if (fs.statSync(filePath).isDirectory()) {
        walkDir(filePath)
      } else if (file.endsWith('.webp')) {
        const remotePath = filePath.replace('./public/productos/', '')
        uploadImage(filePath, remotePath)
      }
    }
  }

  walkDir(baseDir)
}

migrateImages()
```

---

## PARTE 7: COSTOS ESTIMADOS

### Supabase Pricing (Free Tier)

| Resource | Free | Pro ($25/mo) |
|----------|------|--------------|
| Database | 500MB | 8GB |
| Storage | 1GB | 100GB |
| Bandwidth | 2GB | 250GB |
| Auth Users | Unlimited | Unlimited |
| Edge Functions | 500K/mo | 2M/mo |

**Para Vialine (estimado):**
- ~141 productos × ~15KB cada = ~2MB datos
- ~2,000 imágenes × ~100KB = ~200MB storage
- ~1,000 visitas/día × 5MB = ~5GB/mes bandwidth

**Recomendación:** Empezar con Free Tier, upgrade a Pro cuando sea necesario.

---

## PARTE 8: TIMELINE DETALLADO

```
Semana 1 (Día 1-7)
├── Día 1: Setup Supabase + crear tablas
├── Día 2: Configurar auth + storage buckets
├── Día 3: Script migración productos
├── Día 4: Ejecutar migración + verificar
├── Día 5: Migrar imágenes a storage
├── Día 6: Refactorizar auth (login/register)
└── Día 7: Refactorizar middleware

Semana 2 (Día 8-14)
├── Día 8: Refactorizar data fetching productos
├── Día 9: Actualizar páginas de catálogo
├── Día 10: Actualizar página de producto
├── Día 11: Actualizar checkout
├── Día 12: Admin - Setup + Dashboard
├── Día 13: Admin - Lista productos
└── Día 14: Admin - Crear/Editar producto

Semana 3 (Día 15-21)
├── Día 15: Admin - Upload imágenes
├── Día 16: Admin - Gestión de stock
├── Día 17: Admin - Lista pedidos
├── Día 18: Admin - Detalle pedido + estados
├── Día 19: Admin - Clientes
├── Día 20: Admin - Categorías + Tejidos
└── Día 21: Admin - Cupones + Config

Semana 4 (Día 22-28)
├── Día 22: Testing completo
├── Día 23: Fixes y ajustes
├── Día 24: Migración datos producción
├── Día 25: Deploy a producción
├── Día 26: Monitoreo + fixes urgentes
├── Día 27: Documentación
└── Día 28: Cleanup código legacy
```

---

## SIGUIENTE PASO INMEDIATO

**¿Empezamos?**

El primer paso es crear las tablas en Supabase. Puedo ejecutar el schema SQL ahora mismo usando el MCP.

¿Confirmas para proceder con la Fase 1.1?
