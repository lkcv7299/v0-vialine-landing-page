# CLAUDE_PROMPTS.md - Biblioteca de Prompts Efectivos

> **Prompts probados y validados para Vialine**  
> Úsalos como templates para requests similares

---

## 📚 ÍNDICE

1. [Agregar nueva feature](#agregar-feature)
2. [Arreglar bugs](#arreglar-bugs)
3. [Refactoring](#refactoring)
4. [Crear componentes](#crear-componentes)
5. [Integrar servicios](#integrar-servicios)
6. [Optimizaciones](#optimizaciones)
7. [Debugging](#debugging)

---

<a name="agregar-feature"></a>
## 1️⃣ AGREGAR NUEVA FEATURE

### Prompt para agregar sistema de reviews

```
<role>Eres un desarrollador experto en Next.js 15 + TypeScript con 10+ años de experiencia</role>

<context>
Proyecto: Vialine e-commerce activewear
Stack: Next.js 15, TypeScript, Tailwind, Vercel Postgres
Estado actual: Tengo productos funcionando, necesito agregar sistema de reviews
</context>

<task>
Implementar sistema completo de product reviews que permita:
1. Usuarios puedan dejar reviews con rating (1-5 estrellas)
2. Mostrar reviews en página de producto
3. Calcular rating promedio
4. Filtrar y ordenar reviews
5. Solo usuarios con compra verificada pueden opinar
</task>

<requirements>
- Tabla en database: reviews (id, user_id, product_slug, rating, comment, verified_purchase, created_at)
- Componente ReviewForm para escribir review
- Componente ReviewList para mostrar reviews
- Validación: user debe estar logueado
- Validación: máximo 1 review por user por producto
- Rating visible en ProductCard
- Mobile responsive
</requirements>

<existing_code>
// database schema en scripts/create-auth-tables.js
// productos tienen campo 'slug' como ID
// users table ya existe con NextAuth
// orders table tiene user_id y product info
</existing_code>

<output_format>
Proporciona en artifacts separados:
1. Script SQL: scripts/create-reviews-table.js
2. Componente: components/reviews/ReviewForm.tsx
3. Componente: components/reviews/ReviewList.tsx
4. API route: app/api/reviews/route.ts
5. Tipos: types/reviews.ts
6. Instrucciones paso a paso para implementar
NO truncar código, archivos completos siempre
</output_format>
```

**Resultado esperado:** Claude generará 5+ artifacts con código completo + instrucciones

---

### Prompt para agregar búsqueda avanzada

```
Necesito agregar búsqueda avanzada de productos con autocompletado.

Características:
- Input de búsqueda en header
- Autocompletado en tiempo real (debounced)
- Muestra preview de 5 productos
- Historial de búsquedas (localStorage)
- Click en resultado lleva a página de producto
- Enter busca en página de resultados

Stack: Next.js 15, TypeScript, Tailwind
Productos están en data/products.ts
Ya tengo SearchBar básico en components/SearchBar.tsx

Dame el componente completo SearchBar mejorado en artifact.
Incluye:
- TypeScript types
- Debouncing (300ms)
- Keyboard navigation (↑ ↓ Enter)
- Mobile responsive
- Loading state
```

---

<a name="arreglar-bugs"></a>
## 2️⃣ ARREGLAR BUGS

### Prompt para bug de grid mobile

```
Tengo un bug en el grid de productos en mobile.

Problema: En desktop muestra 3 columnas ✅, pero en mobile muestra 1 columna cuando debería mostrar 2.

[Adjuntar screenshot del problema]

Código actual en components/ProductGrid.tsx:
<div className="mt-8 grid gap-6 sm:grid-cols-2 md:grid-cols-3">

¿Cuál es el problema y cómo lo arreglo?
Dame el archivo completo corregido en artifact.
```

**Resultado:** Claude identifica que `sm:grid-cols-2` solo aplica desde 640px, mobile (<640px) defaults a 1 columna. Solución: `grid-cols-2 md:grid-cols-3`

---

### Prompt para error de variables de entorno

```
Tengo este error al ejecutar script de database:

VercelPostgresError - 'missing_connection_string': 
You did not supply a 'connectionString' and no 'POSTGRES_URL' env var was found.

Pero mi .env.local SÍ tiene POSTGRES_URL definido.

Archivo: scripts/create-tables.js
Comando ejecutado: node scripts/create-tables.js

¿Qué está pasando y cómo lo soluciono?
Dame el script corregido completo.
```

**Resultado:** Claude explica que Node.js no carga .env.local automáticamente y proporciona función `loadEnvLocal()` para implementar.

---

<a name="refactoring"></a>
## 3️⃣ REFACTORING

### Prompt para refactorizar componente grande

```
<role>Eres un experto en refactoring y clean code</role>

<task>
Necesito refactorizar este componente que está muy grande (200+ líneas) y difícil de mantener.
</task>

<existing_code>
[pegar código del componente]
</existing_code>

<requirements>
- Separar en componentes más pequeños y reutilizables
- Mantener misma funcionalidad exacta
- Mejorar legibilidad
- Seguir convenciones del proyecto (ver CLAUDE.md)
- TypeScript estricto
- No romper nada existente
</requirements>

<output_format>
1. Análisis: explicar qué partes se pueden extraer
2. Nuevos archivos: proporcionar cada componente separado en artifacts
3. Componente principal: archivo refactorizado
4. Checklist: qué verificar después de implementar
</output_format>
```

---

<a name="crear-componentes"></a>
## 4️⃣ CREAR COMPONENTES

### Prompt para componente visual con v0

```
Necesito crear un componente visual de Product Card.

Características:
- Imagen del producto
- Nombre y precio
- Rating con estrellas
- Botón "Add to Cart"
- Ícono de Wishlist (corazón)
- Hover effects suaves
- Badges (Nuevo, Sale, Agotado)

Diseño:
- Estilo: Moderno, minimalista
- Colores: Rose-600 principal, grises neutrales
- Tipografía: Outfit para nombres, Inter para precio
- Mobile responsive

Dame un prompt optimizado para usar en v0.app para generar este componente.
```

**Resultado:** Claude genera prompt específico para v0 que produce componente con preview en vivo.

---

### Prompt para componente de formulario

```
Crea un componente de formulario de checkout con validación.

Campos:
- Email (required, validar formato)
- Nombre completo (required)
- Teléfono (required, validar 9 dígitos)
- Dirección (required)
- Distrito (required, select con distritos de Lima)
- Referencia (optional)

Funcionalidad:
- Validación en tiempo real
- Mensajes de error bajo cada campo
- Submit deshabilitado si hay errores
- Loading state durante submit
- Success/error toast después de submit

Stack: React Hook Form + Zod para validación
Styling: Tailwind + shadcn/ui components

Dame en artifact:
1. Componente completo CheckoutForm.tsx
2. Schema de validación con Zod
3. Tipos TypeScript
```

---

<a name="integrar-servicios"></a>
## 5️⃣ INTEGRAR SERVICIOS

### Prompt para integrar pasarela de pago

```
<context>
Proyecto: Vialine e-commerce
Stack: Next.js 15, TypeScript
Estado actual: Tengo checkout funcionando, necesito integrar pagos
</context>

<task>
Integrar Culqi (pasarela de pagos de Perú) para procesar tarjetas de crédito/débito.
</task>

<requirements>
- Usar Culqi.js v4 (CDN)
- Tokens en .env.local (NEXT_PUBLIC_CULQI_PUBLIC_KEY, CULQI_SECRET_KEY)
- Flow:
  1. Usuario ingresa datos de tarjeta
  2. Culqi tokeniza (frontend)
  3. Enviamos token a nuestro backend
  4. Backend crea cargo en Culqi
  5. Guardamos orden en DB
  6. Enviamos email de confirmación
- Manejo de errores amigable
- Loading states
- Test mode primero
</requirements>

<existing_code>
// Endpoint checkout: app/api/checkout/route.ts (existe)
// Orders table: ya configurada
// Email service: Brevo (ya funciona)
</existing_code>

<output_format>
Proporciona:
1. Componente: components/checkout/CulqiPayment.tsx
2. API route: app/api/checkout/culqi/route.ts  
3. Archivo de configuración: lib/culqi.ts
4. Variables de entorno necesarias
5. Guía paso a paso de testing
6. Manejo de webhooks (si aplica)
NO truncar, archivos completos
</output_format>
```

---

<a name="optimizaciones"></a>
## 6️⃣ OPTIMIZACIONES

### Prompt para optimizar performance

```
Necesito optimizar la performance de mi e-commerce.

Problemas actuales:
- Lighthouse score: 65/100
- First Contentful Paint: 3.2s
- Largest Contentful Paint: 4.5s
- Time to Interactive: 5.1s

Posibles causas:
- Imágenes sin optimizar
- Fuentes sin preload
- JavaScript bundles grandes
- Sin lazy loading

Stack: Next.js 15, Vercel hosting

Dame un plan de optimización con:
1. Checklist de optimizaciones (priorizado por impacto)
2. Código específico para implementar cada optimización
3. Cómo medir mejoras
4. Meta: llegar a 90+ en Lighthouse
```

---

<a name="debugging"></a>
## 7️⃣ DEBUGGING

### Prompt para debugging sistemático

```
Tengo un error que no entiendo:

Error en consola:
[pegar mensaje de error]

Contexto:
- Ocurre cuando: [descripción de cuándo sucede]
- Navegador: Chrome 120
- Device: [mobile/desktop]
- Código relevante: [pegar snippet]

[Adjuntar screenshot si aplica]

Necesito:
1. Explicación de qué causa el error
2. Solución paso a paso
3. Código corregido
4. Cómo prevenir que vuelva a ocurrir
```

---

## 🎯 TIPS PARA PROMPTS EFECTIVOS

### DO's ✅
1. **Ser específico:** "Agregar botón de pago con Culqi" > "agregar pagos"
2. **Dar contexto:** Mencionar stack, estado actual, objetivo
3. **Usar estructura:** role, context, task, requirements, output_format
4. **Adjuntar código:** Pegar código relevante o screenshots
5. **Pedir completo:** "archivo completo en artifact" evita truncamiento
6. **Validación:** "sin romper funcionalidad existente"

### DON'Ts ❌
1. **Vago:** "haz algo bonito" → ser específico sobre diseño
2. **Sin contexto:** "agrega feature X" → explicar para qué, cómo se usa
3. **Múltiples tasks:** 1 prompt = 1 tarea bien definida
4. **Asumir conocimiento:** Claude no sabe tu estructura sin que se lo digas
5. **Olvidar stack:** Especificar Next.js 15, TypeScript, etc.

---

## 📝 TEMPLATE GENERAL

```
<role>Eres un experto en [tecnología específica]</role>

<context>
Proyecto: Vialine e-commerce activewear
Stack: Next.js 15, TypeScript, Tailwind, Vercel Postgres
Estado actual: [descripción de lo que existe]
</context>

<task>
[Descripción clara de lo que necesitas]
</task>

<requirements>
- [Requerimiento específico 1]
- [Requerimiento específico 2]
- [Requerimiento específico 3]
- Responsive mobile/desktop
- TypeScript strict
- Sin romper funcionalidad existente
</requirements>

<existing_code>
[Pegar código relevante o indicar ubicación]
</existing_code>

<output_format>
Proporciona en artifacts separados:
1. [Archivo 1]: [ruta/nombre.tsx]
2. [Archivo 2]: [ruta/nombre.ts]
3. Instrucciones paso a paso para implementar
NO truncar código, archivos completos siempre
</output_format>
```

---

## 🔄 PROMPTS POR TIPO DE TAREA

### Si necesitas... usa este prompt:

| Necesidad | Template sugerido |
|-----------|------------------|
| Nueva feature completa | "Agregar nueva feature" con estructura XML |
| Arreglar bug visual | "Bug de grid mobile" + screenshot |
| Arreglar error técnico | "Error de variables de entorno" + logs |
| Crear componente UI | "Componente visual con v0" |
| Crear formulario | "Componente de formulario" con validación |
| Integrar servicio externo | "Integrar pasarela de pago" con flow completo |
| Optimizar performance | "Optimizar performance" con métricas |
| Debugging | "Debugging sistemático" + contexto completo |
| Refactoring | "Refactorizar componente" + código actual |

---

**Documento mantenido por:** Claude + Usuario  
**Última actualización:** Octubre 20, 2025  

---

## 📌 NOTAS

- Estos prompts están optimizados específicamente para Vialine
- Ajustar según necesidad específica
- Agregar nuevos prompts exitosos a este documento
- Siempre incluir contexto del proyecto (stack, estado actual)
- Pedir archivos completos en artifacts para evitar truncamiento