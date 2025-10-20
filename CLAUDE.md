# CLAUDE.md - Vialine E-commerce

> **Este archivo es leído automáticamente por Claude al trabajar en el proyecto**  
> Última actualización: Octubre 20, 2025

---

## 🎯 INFORMACIÓN DEL PROYECTO

### Negocio
- **Nombre:** Vialine Perú
- **Tipo:** E-commerce de activewear femenino
- **Mercado:** Lima, Perú (envíos nacionales)
- **Contacto:** +51 972 327 236
- **Dominio:** vialineperu.com
- **Usuario objetivo:** Mujeres 18-45 años, fitness/lifestyle

### Técnico
- **Stack:** Next.js 15.2.4 + TypeScript 5 + React 19.2.0
- **Estilos:** Tailwind CSS 4.1.9
- **Base de datos:** Vercel Postgres + Prisma
- **Autenticación:** NextAuth.js 5.0.0-beta
- **Pagos:** Culqi (Perú)
- **Emails:** Brevo (SendGrid como fallback)
- **Hosting:** Vercel
- **Analytics:** Google Analytics 4, Meta Pixel, Microsoft Clarity
- **Repo:** github.com/lkcv7299/v0-vialine-landing-page

---

## 🚨 REGLAS CRÍTICAS (SIEMPRE SEGUIR)

### 1. Usuario NO sabe programar
- ✅ **SÍ:** Dar código COMPLETO listo para copiar/pegar
- ✅ **SÍ:** Explicar dónde va cada archivo con rutas exactas
- ✅ **SÍ:** Instrucciones paso a paso MUY detalladas
- ✅ **SÍ:** Usar artifacts para archivos completos
- ❌ **NO:** Asumir conocimientos técnicos
- ❌ **NO:** Decir "actualiza esta función" sin dar archivo completo
- ❌ **NO:** Usar términos técnicos sin explicar
- ❌ **NO:** Dar solo fragmentos de código

### 2. Artifacts obligatorios
- **SIEMPRE** usar artifacts para:
  - Archivos completos de código (>20 líneas)
  - Componentes React
  - Configuraciones
  - Documentación extensa
- **Formato:** Archivo completo, nunca truncado
- **Título:** Nombre del archivo con ruta completa

### 3. Git y deployment
- Cada cambio importante = 1 commit
- Vercel auto-deploy desde `main` branch
- NUNCA `git push --force` sin confirmación
- Siempre backup antes de cambios grandes

### 4. Testing antes de deploy
- Probar localmente con `npm run dev`
- Verificar que no rompe funcionalidad existente
- Validar en mobile Y desktop
- Revisar console del navegador (errores JS)

---

## 💻 STACK TÉCNICO DETALLADO

### Frontend
```typescript
// Next.js 15 con App Router
// Estructura:
app/
├── (pages)/
│   ├── page.tsx          // Home
│   ├── mujer/            // Categoría mujer
│   ├── nina/             // Categoría niña
│   ├── carrito/          // Cart
│   ├── wishlist/         // Wishlist
│   ├── checkout/         // Checkout flow
│   └── confirmacion/     // Order confirmation
├── api/                  // API routes
│   ├── checkout/         // Payment endpoints
│   ├── brevo/            // Email endpoints
│   └── auth/             // NextAuth endpoints
└── layout.tsx            // Root layout

components/
├── header/               // Header components
├── footer/               // Footer
├── cart/                 // Cart components
├── products/             // Product components
├── ui/                   // shadcn/ui components
└── ...

// TypeScript ESTRICTO
// tsconfig.json con "strict": true
// No usar 'any', siempre types explícitos
```

### State Management
```typescript
// Contexts para estado global
contexts/
├── CartContext.tsx       // Carrito de compras
├── WishlistContext.tsx   // Lista de deseos
└── NewsletterContext.tsx // Newsletter popup

// localStorage para persistencia
// Server Components por defecto
// Client Components solo cuando necesario
```

### Styling
```typescript
// Tailwind CSS 4.1.9
// Mobile-first approach
// Breakpoints:
// - sm: 640px
// - md: 768px  
// - lg: 1024px
// - xl: 1280px
// - 2xl: 1536px

// Colores principales:
// - Rose-600: #e11d48 (principal)
// - Neutral grises para UI

// Tipografía:
// - Outfit: headings
// - Inter: body text
// - Manrope: UI elements
```

### Database
```sql
-- Vercel Postgres
-- Tablas principales:
products, orders, order_items,
users, accounts, sessions,
user_addresses, wishlist,
verification_tokens

-- Prisma como ORM (opcional)
-- Scripts de migración en /scripts
```

### Servicios externos
```typescript
// Culqi - Pagos (Perú)
NEXT_PUBLIC_CULQI_PUBLIC_KEY
CULQI_SECRET_KEY

// Brevo - Emails transaccionales
BREVO_API_KEY

// SendGrid - Fallback emails
SENDGRID_API_KEY

// NextAuth - Autenticación
NEXTAUTH_SECRET
NEXTAUTH_URL

// Vercel Postgres
POSTGRES_URL
POSTGRES_PRISMA_URL
POSTGRES_URL_NO_SSL
POSTGRES_URL_NON_POOLING
POSTGRES_USER
POSTGRES_HOST
POSTGRES_PASSWORD
POSTGRES_DATABASE

// Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID
NEXT_PUBLIC_META_PIXEL_ID
NEXT_PUBLIC_CLARITY_ID
```

---

## 📝 CONVENCIONES DE CÓDIGO

### Nombres de archivos
```
// Componentes: PascalCase
ProductCard.tsx
SiteHeader.tsx
CheckoutForm.tsx

// Páginas: kebab-case o camelCase
page.tsx
checkout/page.tsx
order-confirmation/page.tsx

// Utilidades: camelCase
formatPrice.ts
trackEvent.ts
```

### Estructura de componentes
```typescript
// Server Component (por defecto)
export default function ProductPage() {
  return <div>...</div>
}

// Client Component (cuando necesario)
'use client'

import { useState } from 'react'

export default function CartButton() {
  const [count, setCount] = useState(0)
  return <button>...</button>
}

// SIEMPRE exportar tipos
export type ProductCardProps = {
  product: Product
  onAddToCart?: () => void
}
```

### Imports
```typescript
// Orden de imports:
// 1. React/Next
import { useState } from 'react'
import Image from 'next/image'
import Link from 'link/image'

// 2. Librerías externas
import { formatPrice } from '@/lib/utils'

// 3. Components internos
import { Button } from '@/components/ui/button'
import ProductCard from '@/components/ProductCard'

// 4. Types
import type { Product } from '@/types'

// 5. Styles (si aplica)
import './styles.css'
```

### Error handling
```typescript
// SIEMPRE usar try-catch en operaciones async
try {
  const response = await fetch('/api/endpoint')
  const data = await response.json()
  // ...
} catch (error) {
  console.error('Error descriptivo:', error)
  // Mostrar mensaje al usuario
  toast.error('Mensaje amigable')
}

// Validar inputs del usuario
import { z } from 'zod'

const schema = z.object({
  email: z.string().email(),
  phone: z.string().min(9)
})
```

---

## ⚠️ PROBLEMAS COMUNES Y SOLUCIONES

### 1. Conflictos de dependencias
```bash
# React 19 vs bibliotecas antiguas
# Solución: Buscar versiones compatibles
npm install libreria@latest

# Ejemplo real:
# vaul@0.9.9 solo soporta React 18
# vaul@1.x+ soporta React 19
npm install vaul@latest
```

### 2. Variables de entorno no cargadas
```javascript
// Scripts de Node.js NO cargan .env.local automáticamente
// Solución: Implementar loadEnvLocal()

import { readFileSync } from 'fs'

function loadEnvLocal() {
  const envFile = readFileSync('.env.local', 'utf8')
  envFile.split('\n').forEach(line => {
    const match = line.match(/^([^=]+)=(.*)$/)
    if (match) {
      const key = match[1].trim()
      let value = match[2].trim()
      if (value.startsWith('"') && value.endsWith('"')) {
        value = value.slice(1, -1)
      }
      process.env[key] = value
    }
  })
}

// Llamar ANTES de usar variables
loadEnvLocal()
```

### 3. Breakpoints Tailwind incorrectos
```tsx
// ❌ INCORRECTO:
<div className="sm:grid-cols-2 md:grid-cols-3">

// ☝️ Mobile (<640px) tendrá 1 columna por defecto

// ✅ CORRECTO:
<div className="grid-cols-2 md:grid-cols-3">

// ☝️ Mobile: 2 columnas, Desktop: 3 columnas
```

### 4. Imports absolutos
```typescript
// USAR: @ para imports absolutos
import { Button } from '@/components/ui/button'

// NO USAR: Rutas relativas largas
import { Button } from '../../../components/ui/button'

// Configurado en tsconfig.json:
// "paths": { "@/*": ["./*"] }
```

---

## 🔧 SCRIPTS DISPONIBLES

```bash
# Desarrollo
npm run dev              # Inicia servidor dev (port 3000)
npm run build            # Build para producción
npm run start            # Inicia servidor producción
npm run lint             # ESLint

# Database
node scripts/create-auth-tables.js      # Crear tablas auth
node scripts/add-payment-fields.js      # Agregar campos payment

# Utilities
bash scripts/cleanup-env.sh             # Limpiar .env.local corrupto
```

---

## 📚 RECURSOS Y DOCUMENTACIÓN

### Next.js 15
- Docs: https://nextjs.org/docs
- App Router: https://nextjs.org/docs/app
- Server Components: https://nextjs.org/docs/app/building-your-application/rendering/server-components

### Tailwind CSS
- Docs: https://tailwindcss.com/docs
- Cheat sheet: https://nerdcave.com/tailwind-cheat-sheet

### NextAuth.js
- Docs: https://next-auth.js.org
- v5 Beta: https://authjs.dev

### Culqi
- Docs: https://docs.culqi.com
- Dashboard: https://integ-panel.culqi.com

### Brevo
- Docs: https://developers.brevo.com
- Dashboard: https://app.brevo.com

---

## 🎨 DISEÑO Y UX

### Principios
1. **Mobile-first:** Diseñar primero para mobile
2. **Minimalista:** Clean, sin saturar
3. **Responsive:** Funcional en todos los dispositivos
4. **Rápido:** Performance es prioridad
5. **Accesible:** Contraste, keyboard navigation

### Componentes UI
- Base: shadcn/ui (Radix UI + Tailwind)
- Ubicación: `components/ui/`
- NO modificar componentes base
- Extender creando wrappers si necesario

### Tipografía
```css
/* Headings */
font-family: 'Outfit', sans-serif;
font-weight: 600-700;

/* Body */
font-family: 'Inter', sans-serif;
font-weight: 400-500;

/* UI Elements */
font-family: 'Manrope', sans-serif;
font-weight: 500-600;
```

---

## 🚀 WORKFLOW DE DESARROLLO

### Agregar nueva feature
1. Claude genera código completo en artifact
2. Usuario copia archivos a proyecto
3. Commit cambios: `git add . && git commit -m "feat: descripción"`
4. Push: `git push origin main`
5. Vercel auto-deploy (2-3 minutos)
6. Verificar en vialineperu.com

### Arreglar bug
1. Usuario envía screenshot del error
2. Claude identifica archivo problemático
3. Claude proporciona archivo completo corregido
4. Usuario reemplaza archivo
5. Test local: `npm run dev`
6. Commit y push

### Cambios visuales
1. Describir cambio a Claude
2. Claude genera prompt para v0.app
3. Usuario usa v0 para generar componente
4. v0 muestra preview
5. "Add to Codebase" en v0
6. Vercel auto-deploy

---

## 📋 CHECKLIST PRE-COMMIT

- [ ] Código funciona en local (`npm run dev`)
- [ ] Sin errores en consola del navegador
- [ ] Responsive (revisar mobile)
- [ ] TypeScript sin errores (`npm run lint`)
- [ ] Nombres de archivos correctos
- [ ] Imports absolutos con @/
- [ ] Variables de entorno configuradas
- [ ] Componentes tipados
- [ ] Error handling implementado

---

## 🆘 TROUBLESHOOTING

### Build falla en Vercel
1. Revisar logs de Vercel
2. Verificar variables de entorno en dashboard Vercel
3. Probar build local: `npm run build`
4. Revisar package.json (versiones de deps)

### Página en blanco
1. Abrir DevTools Console
2. Ver errores JavaScript
3. Verificar que componente exporta default
4. Revisar imports de componentes

### Base de datos no conecta
1. Verificar POSTGRES_URL en .env.local
2. Verificar POSTGRES_URL en Vercel dashboard
3. Probar conexión con script de test
4. Revisar logs de Vercel Postgres

---

## 📞 CONTACTOS ÚTILES

- **Developer (tú):** Usuario de este proyecto
- **Hosting:** Vercel (vercel.com)
- **Domain:** Vialine (vialineperu.com)
- **Support Culqi:** soporte@culqi.com
- **Support Brevo:** support@brevo.com

---

**Documento mantenido por:** Claude + Usuario  
**Versión:** 1.0  
**Última revisión:** Octubre 20, 2025