# AUDIT COMPLETO - VIALINE E-COMMERCE
**Fecha:** 5 de Enero 2026
**Proyecto:** v0-vialine-landing-page
**Versión:** 1.0

---

## RESUMEN EJECUTIVO

| Área | Score | Estado |
|------|-------|--------|
| **Arquitectura** | 7/10 | Moderno pero con riesgos |
| **Código** | 6/10 | Funcional, necesita refactor |
| **UI/UX** | 4/10 | Problemas críticos de usabilidad |
| **Performance** | 5/10 | Mobile: 61/100 (CRÍTICO) |
| **SEO** | 6/10 | Básico implementado |
| **Seguridad** | 5/10 | NextAuth beta, sin rate limiting |
| **E-commerce** | 6/10 | MVP funcional, falta admin |

**Veredicto:** MVP funcional pero **NO listo para escalar**. Requiere refactoring urgente antes de inversión en marketing.

---

## 1. TECH STACK ACTUAL

### Lo que tenemos

```
Framework:     Next.js 16.1.0 (App Router)
React:         19.0.0
TypeScript:    5.x (strict mode)
Styling:       Tailwind CSS 4.1.9
UI:            Shadcn/ui + Radix UI (51 componentes)

Base de Datos: PostgreSQL (Neon Serverless)
ORM:           NINGUNO (SQL directo con @vercel/postgres)
Auth:          NextAuth v5.0.0-beta.29

Pagos:         Culqi (tarjeta + Yape)
Email:         Brevo + Resend
Analytics:     Meta Pixel, Google Analytics, Microsoft Clarity
Hosting:       Vercel
```

### Neon vs Supabase - Análisis

| Criterio | Neon (actual) | Supabase |
|----------|---------------|----------|
| **Precio** | Gratis hasta 0.5GB | Gratis hasta 500MB |
| **Serverless** | Sí (escala a 0) | No nativo |
| **Auth integrado** | No | Sí (muy bueno) |
| **Storage** | No | Sí (S3-compatible) |
| **Realtime** | No | Sí (websockets) |
| **Admin UI** | Básico | Excelente |
| **Edge Functions** | No | Sí |
| **Complejidad** | Baja | Media |

**RECOMENDACIÓN:**

Para el estado actual del proyecto, **quedarse con Neon** es razonable porque:
1. Ya está funcionando
2. Migrar ahora agregaría complejidad innecesaria
3. No necesitamos realtime ni storage (por ahora)

**Considerar Supabase cuando:**
- Necesites auth social más robusto (Supabase Auth > NextAuth)
- Quieras subir imágenes de usuarios (reviews con fotos)
- Necesites notificaciones en tiempo real

**Acción inmediata:** Agregar un ORM (Prisma o Drizzle) para tipo-seguridad y prevenir SQL injection.

---

## 2. PROBLEMAS CRÍTICOS (Arreglar YA)

### 2.1 Botones de compra INVISIBLES

**Problema:** Los botones "Agregar al carrito" y "Comprar ahora" tienen contraste casi nulo.

**Impacto:** Pérdida directa de ventas. Los usuarios no ven cómo comprar.

**Archivo:** `components/product/product-info.tsx` o similar

**Solución:**
```tsx
// ANTES (invisible)
<Button variant="outline" className="border-border/50">

// DESPUÉS (visible)
<Button className="bg-rose-600 hover:bg-rose-700 text-white font-semibold">
```

### 2.2 Estado "Desconocido" en pedidos

**Problema:** Los pedidos muestran estado "Desconocido" en lugar de algo útil.

**Archivo:** `app/account/orders/page.tsx` o componente de órdenes

**Solución:**
```tsx
const statusMap = {
  'pending_payment': 'Pendiente de pago',
  'paid': 'Pagado',
  'processing': 'En preparación',
  'shipped': 'Enviado',
  'delivered': 'Entregado',
  'cancelled': 'Cancelado'
}

// Usar: statusMap[order.status] || 'Pendiente'
```

### 2.3 FAB de WhatsApp tapando UI

**Problema:** El botón flotante de WhatsApp cubre botones importantes en móvil.

**Solución:**
```tsx
// En el componente del FAB
className="fixed bottom-20 right-4" // Era bottom-4

// O agregar safe-area en elementos afectados
className="pb-20 md:pb-0"
```

### 2.4 NextAuth en versión BETA

**Problema:** Usar `next-auth@5.0.0-beta.29` en producción es riesgo.

**Riesgo:** Breaking changes sin aviso, bugs no documentados, vulnerabilidades.

**Solución temporal:**
```bash
# Fijar versión exacta en package.json
"next-auth": "5.0.0-beta.29"  # No usar ^
```

**Solución definitiva:** Migrar a v5 estable cuando salga (o revertir a v4 estable).

### 2.5 Errores ortográficos

| Error | Corrección | Ubicación |
|-------|------------|-----------|
| "Nina" | "Niña" | Menú, categorías |
| "algodon" | "algodón" | Filtros, tejidos |
| "Diseña slim" | "Diseño slim" | Detalles producto |
| "De Enero De" | "de enero de" | Fecha confirmación |

---

## 3. PROBLEMAS DE UX (Experiencia de Usuario)

### 3.1 Flujo de navegación confuso

**Problemas identificados:**
- Menú solo muestra "Tops" - ¿dónde están las demás categorías?
- No hay breadcrumbs para saber dónde estás
- CTAs "Comprar Mujer/Niña" están al final del menú (deberían estar arriba)

### 3.2 Checkout doloroso

**Problemas:**
1. Pide demasiada info: DNI debería ser opcional (solo para factura)
2. Solo UN método de pago visible
3. Sin opción "Continuar como invitado"
4. Sin barra de progreso visual para envío gratis

**Métodos de pago que FALTAN:**
- Pago contra entrega (30-50% del mercado peruano)
- Transferencia bancaria
- Yape/Plin directo (no solo via Culqi)
- PagoEfectivo

### 3.3 Carrito incompleto

**Falta:**
- Barra de progreso para envío gratis
- "Guardar para después"
- Productos recomendados
- Sincronización entre tabs

### 3.4 Páginas de producto

**Problemas:**
- Sin zoom en imágenes
- Sin video del producto
- Ratings con 1 reseña se ven sospechosos
- Código interno visible (COD:S-1011) - al usuario no le importa

### 3.5 Footer incompleto

**Falta:**
- Redes sociales
- Métodos de pago (logos Visa, Mastercard, Yape)
- Información de contacto clara
- Certificado SSL visible

---

## 4. PROBLEMAS DE CÓDIGO

### 4.1 Componentes gigantes

| Componente | Líneas | Máximo recomendado |
|------------|--------|-------------------|
| CheckoutPage | 1,004 | 300-400 |
| ProductGallery | ~800 | 200-300 |
| FilterDrawer | ~700 | 200 |

**Solución:** Descomponer en sub-componentes.

### 4.2 Código duplicado

`FilterDesktop` y `FilterDrawer` comparten ~14K de código duplicado.

**Solución:** Crear un `<FilterCore>` compartido.

### 4.3 Sin manejo de errores

- No hay Error Boundaries
- Los crashes son silenciosos
- Sin logging estructurado

### 4.4 Datos hardcodeados

```typescript
// Esto está MAL - repetido en múltiples archivos
const FREE_SHIPPING_THRESHOLD = 269;
const SHIPPING_COST = 15;
```

**Solución:** Crear `config/constants.ts`:
```typescript
export const ECOMMERCE = {
  FREE_SHIPPING_THRESHOLD: 269,
  SHIPPING_COST: 15,
  CURRENCY: 'PEN',
  CURRENCY_SYMBOL: 'S/'
} as const;
```

### 4.5 Catálogo en archivo estático

`data/products.ts` tiene 120K de código con todos los productos hardcodeados.

**Problemas:**
- No escala
- Cambiar precios requiere deploy
- Sin control de inventario real
- Sin historial de cambios

**Solución:** Migrar a base de datos con panel admin.

---

## 5. PERFORMANCE

### Métricas actuales (Mobile)

| Métrica | Actual | Objetivo | Estado |
|---------|--------|----------|--------|
| Performance Score | 61 | >90 | CRÍTICO |
| First Contentful Paint | 3.3s | <1.8s | MAL |
| Largest Contentful Paint | 11.7s | <2.5s | MUY MAL |
| Speed Index | 8.6s | <3.4s | MAL |
| Total Blocking Time | ? | <200ms | ? |

### Causas identificadas

1. **JavaScript no utilizado:** 24 KiB
2. **Imágenes sin optimizar:** 1.9 MB de mejora posible
3. **Render-blocking requests:** 40ms
4. **Árbol de dependencias profundo**

### Soluciones

```bash
# 1. Analizar bundle
npm install --save-dev @next/bundle-analyzer

# 2. Convertir todas las imágenes a WebP
node scripts/convert-to-webp.mjs

# 3. Lazy load de componentes pesados
const ProductGallery = dynamic(() => import('./ProductGallery'), {
  loading: () => <Skeleton className="h-96" />
})

# 4. Eliminar dependencias no usadas
npx depcheck
```

---

## 6. SEO

### Lo que está bien
- Metadata en layout.tsx
- generateMetadata dinámico en productos
- OpenGraph configurado
- Schema.org (LocalBusiness + Product)

### Lo que falta

| Elemento | Estado | Prioridad |
|----------|--------|-----------|
| sitemap.xml | NO | Alta |
| robots.txt | Básico | Media |
| Canonical URLs | NO | Alta |
| Breadcrumbs | NO | Media |
| H1 consistentes | Parcial | Media |

### Crear sitemap.xml

```typescript
// app/sitemap.ts
import { products } from '@/data/products'

export default function sitemap() {
  const productUrls = products.map(p => ({
    url: `https://vialine.pe/producto/${p.slug}`,
    lastModified: new Date(),
    priority: 0.8
  }))

  return [
    { url: 'https://vialine.pe', priority: 1 },
    { url: 'https://vialine.pe/mujer', priority: 0.9 },
    { url: 'https://vialine.pe/nina', priority: 0.9 },
    ...productUrls
  ]
}
```

---

## 7. SEGURIDAD

### Vulnerabilidades detectadas

| Problema | Severidad | Estado |
|----------|-----------|--------|
| NextAuth beta | Alta | Riesgo aceptado |
| Sin rate limiting | Alta | NO implementado |
| SQL directo (sin ORM) | Media | Riesgo de injection |
| .env.local en git? | CRÍTICA | Verificar |

### Acciones inmediatas

```bash
# 1. Verificar si .env.local está en git
git log --all --full-history -- .env.local

# 2. Si estuvo, rotar TODAS las credenciales:
- CULQI_PUBLIC_KEY / SECRET_KEY
- NEXTAUTH_SECRET
- DATABASE_URL
- GOOGLE_CLIENT_ID / SECRET
- BREVO_API_KEY
- RESEND_API_KEY

# 3. Agregar rate limiting
npm install @upstash/ratelimit @upstash/redis
```

---

## 8. ACCIONES PRIORITARIAS

### SEMANA 1 - Crítico

- [ ] Arreglar contraste de botones de compra
- [ ] Cambiar estado "Desconocido" por texto útil
- [ ] Mover FAB de WhatsApp (no tape UI)
- [ ] Corregir tildes: Niña, algodón
- [ ] Verificar credenciales no están en git
- [ ] Validar que pagos Culqi se guardan en BD

### SEMANA 2 - Importante

- [ ] Agregar pago contra entrega
- [ ] Hacer DNI opcional en checkout
- [ ] Simplificar número de orden
- [ ] Arreglar cards de tejido cortadas
- [ ] Agregar sitemap.xml
- [ ] Ocultar ratings hasta tener 5+ reseñas

### SEMANA 3-4 - Mejoras

- [ ] Refactorizar CheckoutPage (-500 líneas)
- [ ] Agregar Error Boundaries
- [ ] Optimizar imágenes (reducir 285MB)
- [ ] Mejorar templates de email
- [ ] Agregar barra de progreso envío gratis
- [ ] Implementar admin dashboard básico

### MES 2 - Escalabilidad

- [ ] Migrar catálogo a base de datos
- [ ] Agregar Prisma/Drizzle ORM
- [ ] Implementar tests unitarios
- [ ] Dashboard admin con reportes
- [ ] Tracking de órdenes
- [ ] Recuperación de carritos abandonados

---

## 9. ESTRUCTURA DE CARPETAS RECOMENDADA

```
v0-vialine-landing-page/
├── app/
│   ├── (shop)/              # Rutas públicas de tienda
│   │   ├── producto/
│   │   ├── categoria/
│   │   └── carrito/
│   ├── (checkout)/          # Flujo de compra
│   ├── (account)/           # Dashboard usuario
│   ├── (admin)/             # Dashboard admin
│   └── api/
│
├── components/
│   ├── ui/                  # Primitivos (Button, Input)
│   ├── forms/               # Formularios
│   ├── product/             # Producto específico
│   ├── cart/                # Carrito
│   ├── checkout/            # Checkout steps
│   └── layout/              # Header, Footer, Nav
│
├── lib/
│   ├── db/                  # Queries de base de datos
│   ├── auth/                # Configuración auth
│   ├── payments/            # Culqi, etc.
│   ├── email/               # Templates y envío
│   └── utils/               # Helpers
│
├── config/
│   ├── constants.ts         # FREE_SHIPPING, etc.
│   ├── navigation.ts        # Menús
│   └── site.ts              # Metadata del sitio
│
├── types/
│   ├── product.ts
│   ├── order.ts
│   └── user.ts
│
└── prisma/                  # Cuando migremos a ORM
    └── schema.prisma
```

---

## 10. MÉTRICAS DE ÉXITO

### Antes de lanzar marketing

| Métrica | Actual | Objetivo |
|---------|--------|----------|
| Lighthouse Mobile | 61 | >85 |
| Lighthouse Desktop | ~96 | >95 |
| Tiempo de carga (3G) | 11.7s | <4s |
| Tasa de conversión | ? | >2% |
| Carritos abandonados | ? | <70% |

### KPIs a monitorear

1. **Conversión:** Visitas → Compras
2. **Abandono de carrito:** % que no completa
3. **Ticket promedio:** Valor por orden
4. **Tiempo en checkout:** Debería ser <3 min
5. **Errores de pago:** % de intentos fallidos

---

## CONCLUSIÓN

El proyecto tiene una base técnica sólida pero sufre de:

1. **UX deficiente:** Botones invisibles, flujos confusos
2. **Deuda técnica:** Componentes gigantes, código duplicado
3. **Performance móvil:** Inaceptable para e-commerce
4. **Funcionalidad incompleta:** Sin admin, sin tracking, un solo método de pago

**Recomendación:** Pausar nuevas features y dedicar 2-4 semanas a:
1. Arreglar UX crítico (botones, estados, tildes)
2. Optimizar performance móvil
3. Agregar pago contra entrega
4. Implementar admin básico

Después de eso, el sitio estará listo para inversión en marketing.

---

*Documento generado el 5 de Enero 2026*
