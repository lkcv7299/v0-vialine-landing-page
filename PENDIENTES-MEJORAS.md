# 📋 PENDIENTES Y MEJORAS POST-TESTING

**Última actualización**: 2 Noviembre 2025
**Fuente**: Testing manual ejecutado por usuario

---

## 🔴 CRÍTICO - Performance Móvil

### ISSUE #1: Score de Rendimiento Móvil Bajo (61/100)

**Problema**: Desktop obtiene 96/100 pero Mobile solo 61/100 en PageSpeed Insights

**Impacto**:
- Experiencia de usuario pobre en móvil
- SEO negativo (Google prioriza mobile-first)
- Conversiones bajas en dispositivos móviles

**Métricas observadas** (según imágenes):
- First Contentful Paint: 3.3s (🔴 Debería ser < 1.8s)
- Largest Contentful Paint: 11.7s (🔴 Debería ser < 2.5s)
- Total Blocking Time: 40ms (🟢 Bueno)
- Cumulative Layout Shift: 0 (🟢 Perfecto)
- Speed Index: 8.6s (🔴 Debería ser < 3.4s)

**Posibles causas**:
1. JavaScript heredado estimado de 24 KiB
2. Solicitudes de bloqueo de renderización - 40ms
3. Descubrimiento de solicitudes de LCP
4. Árbol de dependencias de red profundo
5. Tiempos de almacenamiento en caché eficientes - 115 KiB
6. Mejora la entrega de imágenes - 1,931 KiB

**Prioridad**: 🔴 CRÍTICA
**Estado**: 🔍 PENDIENTE DIAGNÓSTICO DETALLADO

---

## 🟡 IMPORTANTE - Funcionalidad

### ISSUE #2: Emails de Confirmación Incompletos

**Problema**:
- ✅ Comprador recibe email de confirmación
- ❌ Admin/vendedor NO recibe email de nueva orden
- ⚠️ Emails tienen diseño básico/feo

**Impacto**: Admin no se entera de ventas nuevas en tiempo real

**Solución propuesta**:
1. Agregar `sendAdminOrderNotification()` en checkout
2. Crear template HTML bonito para emails (con logo, colores, layout profesional)
3. Configurar email de admin en variables de entorno

**Archivos a modificar**:
- `app/api/orders/route.ts` - Agregar notificación a admin
- `lib/email-templates.ts` - Crear templates HTML profesionales
- `.env.local` - Agregar `ADMIN_EMAIL`

**Prioridad**: 🟡 IMPORTANTE
**Estado**: ⏸️ PENDIENTE

---

### ISSUE #3: Search no es Tolerante a Typos

**Problema**: Si escribes "leging" (sin doble 'g'), no encuentra "legging"

**Impacto**: Usuarios pueden frustrarse si escriben mal

**Solución propuesta**:
1. Implementar fuzzy search (librería: `fuse.js` o `match-sorter`)
2. Agregar sinónimos (ej: "leggins" = "legging")
3. Mostrar "Quizás quisiste decir..." cuando no hay resultados

**Archivos a modificar**:
- `app/buscar/page.tsx` - Implementar fuzzy search
- `lib/search-utils.ts` - Helper para matching flexible

**Prioridad**: 🟡 IMPORTANTE
**Estado**: ⏸️ PENDIENTE

---

### ISSUE #4: Filtros por Tejido No Funcionan

**Problema**: En `/tejido/suplex` y `/tejido/algodon`, los filtros de categoría (ej: "Leggings") no filtran correctamente

**Impacto**: Usuarios no pueden filtrar productos por tipo dentro de tejido

**Solución propuesta**:
1. Revisar lógica de filtrado en páginas de tejido
2. Asegurar que filtros se aplican correctamente a productos de ese tejido
3. Debugging: ver qué productos coinciden con filtros

**Archivos a revisar**:
- `app/tejido/[slug]/page.tsx` - Lógica de filtrado
- `data/products.ts` - Verificar estructura de datos de tejido

**Prioridad**: 🟡 IMPORTANTE
**Estado**: ⏸️ PENDIENTE

---

### ISSUE #5: Hero Duplicado en /nina

**Problema**: `/nina` tiene un hero arriba que no debería estar (parece duplicado del hero de niña en home)

**Impacto**: Inconsistencia visual, ninguna otra sección de audiencia tiene hero

**Solución propuesta**:
1. Eliminar hero de `/nina/page.tsx`
2. Que coincida con el diseño de `/mujer` (sin hero, directo a productos)

**Archivos a modificar**:
- `app/nina/page.tsx` - Remover componente hero

**Prioridad**: 🟢 MENOR
**Estado**: ⏸️ PENDIENTE

---

## 🟢 MEJORAS OPCIONALES

### MEJORA #1: Emails más Bonitos

**Descripción**: Crear templates HTML profesionales para emails de confirmación

**Elementos a incluir**:
- Logo de Vialine
- Colores de marca (rose-600)
- Tabla de productos con imágenes
- Resumen de orden profesional
- Footer con redes sociales
- Diseño responsive para móvil

**Librerías recomendadas**:
- `react-email` - Templates en React
- `nodemailer` con plantillas HTML inline
- `mjml` - Markup para emails responsive

**Prioridad**: 🟢 OPCIONAL
**Estado**: ⏸️ PENDIENTE

---

## 📊 ANÁLISIS DE RENDIMIENTO MÓVIL

### Optimizaciones Recomendadas (en orden de impacto)

#### 1. Optimización de Imágenes (1,931 KiB de ahorro estimado)

**Acciones**:
- ✅ Ya usamos Next.js Image (lazy loading automático)
- ⚠️ Convertir todas las imágenes a WebP
- ⚠️ Implementar `priority` en hero images
- ⚠️ Usar `sizes` prop correctamente en todas las imágenes
- ⚠️ Servir imágenes responsive (diferentes tamaños según viewport)

**Código a agregar**:
```typescript
// En hero images
<Image
  src="/hero.jpg"
  priority
  sizes="(max-width: 768px) 100vw, 50vw"
/>

// En product cards
<Image
  src={product.image}
  sizes="(max-width: 768px) 50vw, 25vw"
  loading="lazy"
/>
```

**Impacto estimado**: 🔴 CRÍTICO - Puede mejorar LCP en 3-5 segundos

---

#### 2. Reducir JavaScript Heredado (24 KiB)

**Acciones**:
- Agregar `browserslist` más moderno en `package.json`
- Usar Next.js SWC compiler (ya está por defecto)
- Remover polyfills innecesarios

**Código**:
```json
// package.json
{
  "browserslist": [
    ">0.3%",
    "not dead",
    "not op_mini all",
    "not ie 11"
  ]
}
```

**Impacto estimado**: 🟡 MODERADO - Mejora FCP en 0.5-1s

---

#### 3. Eliminar Bloqueos de Renderización (40ms)

**Acciones**:
- Mover CSS crítico inline
- Defer scripts no críticos
- Preload fonts importantes

**Código**:
```typescript
// app/layout.tsx - Preload fonts
<link rel="preload" href="/fonts/your-font.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />

// Defer analytics scripts
<Script src="analytics.js" strategy="afterInteractive" />
```

**Impacto estimado**: 🟢 BAJO - Mejora FCP en 0.2-0.5s

---

#### 4. Optimizar Caché (115 KiB de ahorro)

**Acciones**:
- Configurar headers de caché en `next.config.mjs`
- Usar ISR (Incremental Static Regeneration) para productos
- Service Worker para caché offline

**Código**:
```javascript
// next.config.mjs
export default {
  async headers() {
    return [
      {
        source: '/:all*(svg|jpg|png|webp)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },
}
```

**Impacto estimado**: 🟡 MODERADO - Mejora visitas repetidas

---

#### 5. Optimizar Árbol de Dependencias

**Acciones**:
- Lazy load componentes pesados
- Code splitting por ruta
- Dynamic imports para features opcionales

**Código**:
```typescript
// Lazy load reviews
const Reviews = dynamic(() => import('@/components/Reviews'), {
  loading: () => <ReviewsSkeleton />,
})

// Lazy load checkout solo cuando se necesita
const CheckoutForm = dynamic(() => import('@/components/CheckoutForm'))
```

**Impacto estimado**: 🟡 MODERADO - Mejora TTI en 1-2s

---

## 🎯 PLAN DE ACCIÓN RECOMENDADO

### Fase 1 - Rendimiento Móvil (1-2 días)
1. [ ] Convertir imágenes a WebP
2. [ ] Agregar `priority` a hero images
3. [ ] Configurar `sizes` en todas las imágenes
4. [ ] Implementar lazy loading inteligente
5. [ ] Re-test en PageSpeed Insights
6. [ ] **Meta**: Score > 80 en móvil

### Fase 2 - Funcionalidad Crítica (1 día)
1. [ ] Implementar emails a admin
2. [ ] Crear templates HTML bonitos para emails
3. [ ] Arreglar filtros de tejido
4. [ ] Test completo de emails y filtros

### Fase 3 - UX Improvements (1 día)
1. [ ] Implementar fuzzy search
2. [ ] Remover hero duplicado en /nina
3. [ ] Agregar sinónimos al search
4. [ ] Test de búsqueda con typos comunes

### Fase 4 - Optimizaciones Avanzadas (opcional)
1. [ ] Service Worker para caché
2. [ ] ISR para productos
3. [ ] Code splitting avanzado

---

## 📈 MÉTRICAS DE ÉXITO

| Métrica | Actual | Meta | Status |
|---------|--------|------|--------|
| **Lighthouse Mobile** | 61 | >80 | 🔴 |
| **Lighthouse Desktop** | 96 | >90 | ✅ |
| **FCP Mobile** | 3.3s | <1.8s | 🔴 |
| **LCP Mobile** | 11.7s | <2.5s | 🔴 |
| **Speed Index Mobile** | 8.6s | <3.4s | 🔴 |
| **Emails Admin** | ❌ | ✅ | 🔴 |
| **Filtros Tejido** | ❌ | ✅ | 🔴 |
| **Fuzzy Search** | ❌ | ✅ | 🟡 |

---

**Última revisión**: 2 Nov 2025
**Próxima acción**: Comenzar Fase 1 - Optimización de rendimiento móvil
