# Auditoría de Rutas Duplicadas - Vialine

**Fecha:** 2025-11-01
**Auditor:** Claude Code

## Resumen Ejecutivo

Se realizó una auditoría completa de las rutas en la aplicación para identificar duplicados potenciales, redirecciones legacy y problemas de SEO. En general, la aplicación **está bien configurada** con redirecciones apropiadas implementadas.

## Hallazgos

### ✅ Rutas con Redirecciones Implementadas (OK)

Estas rutas están **correctamente configuradas** con redirecciones a las rutas canónicas:

#### 1. Productos: `/productos/[slug]` → `/producto/[slug]`
- **Estado:** ✅ Correcto
- **Archivo:** `app/productos/[slug]/page.tsx`
- **Comportamiento:** Redirige preservando query params
- **Propósito:** Manejar URLs legacy y variaciones de plural

#### 2. Búsqueda: `/search` → `/buscar`
- **Estado:** ✅ Correcto
- **Archivo:** `app/search/page.tsx`
- **Comportamiento:** Redirige preservando el parámetro `q`
- **Propósito:** Ruta canónica en español

#### 3. Tejidos: `/tejidos/[slug]` → `/tejido/[slug]`
- **Estado:** ✅ Correcto
- **Archivo:** `app/tejidos/[slug]/page.tsx`
- **Comportamiento:** Redirige preservando query params
- **Propósito:** Manejar variación de plural

### ⚠️ Rutas con Potencial Duplicación (Requiere Atención)

#### 4. Wishlist vs Favoritos

**Ruta Pública:** `/wishlist`
- **Archivo:** `app/wishlist/page.tsx`
- **Autenticación:** No requerida
- **Contexto:** `WishlistContext` (localStorage/cookies)
- **Features:** Lista de favoritos + compartir por WhatsApp

**Ruta Autenticada:** `/account/favoritos`
- **Archivo:** `app/account/favoritos/page.tsx`
- **Autenticación:** Requerida (redirige a `/login` si no autenticado)
- **Contexto:** Mismo `WishlistContext`
- **Features:** Lista de favoritos + compartir por WhatsApp + AccountSidebar

**Análisis:**
- ✅ **Pros:**
  - Permite usuarios no autenticados usar wishlist
  - Ruta autenticada tiene mejor integración con cuenta
- ⚠️ **Contras:**
  - Dos URLs para el mismo contenido puede confundir a usuarios
  - Potencial problema de SEO con contenido duplicado
  - No hay redirección entre ellas

**Recomendación:**
```
OPCIÓN A (Recomendada): Redirigir /account/favoritos → /wishlist
- Mantener una sola ruta para wishlist
- La página de wishlist puede mostrar AccountSidebar si el usuario está autenticado

OPCIÓN B: Mantener ambas pero diferenciar claramente
- /wishlist: Lista temporal (localStorage)
- /account/favoritos: Favoritos guardados en DB (requiere auth)
- Implementar sync entre ambos al hacer login
```

### ✅ Rutas Sin Duplicación

#### 5. Shop vs Categorías Específicas

**Ruta Genérica:** `/shop/[gender]/[category]`
- **Propósito:** Catálogo genérico con filtrado por género y categoría
- **Ejemplo:** `/shop/mujer/vestidos`, `/shop/nina/conjuntos`

**Rutas Específicas:** `/mujer`, `/nina`
- **Propósito:** Páginas dedicadas con filtros avanzados
- **Features:** Filtros completos, ordenamiento, paginación

**Análisis:**
- ✅ **No son duplicadas:** Sirven propósitos diferentes
- `/mujer` y `/nina` son catálogos principales con más features
- `/shop/[gender]/[category]` es para combinaciones específicas

## Rutas Principales del Sitio

### Páginas Públicas
```
/                           # Home
/mujer                      # Catálogo mujeres
/nina                       # Catálogo niñas
/buscar                     # Búsqueda (canónica)
/producto/[slug]            # Detalle de producto (canónica)
/tejido/[slug]              # Filtrar por tejido (canónica)
/colecciones/[slug]         # Colecciones
/wishlist                   # Lista de favoritos pública
/carrito                    # Carrito de compras
/contacto                   # Contacto
```

### Páginas de Autenticación
```
/login                      # Iniciar sesión
/registro                   # Registro
/recuperar-contrasena       # Recuperar contraseña
/restablecer-contrasena     # Restablecer contraseña
```

### Área de Cuenta (Requiere Auth)
```
/account                    # Dashboard de cuenta
/account/pedidos            # Historial de pedidos
/account/direcciones        # Direcciones guardadas
/account/favoritos          # ⚠️ Potencial duplicado con /wishlist
/account/perfil             # Perfil del usuario
```

### Checkout
```
/checkout                   # Proceso de checkout
/checkout/confirmacion      # Confirmación de orden
/orden/[orderId]            # Tracking de orden
```

### Admin (Requiere Auth + Role)
```
/admin                      # Dashboard admin
/admin/dashboard            # Dashboard extendido
/admin/orders/[orderId]     # Detalle de orden admin
```

### Páginas Legales
```
/terminos                   # Términos y condiciones
/privacidad                 # Política de privacidad
/envios                     # Información de envíos
/cambios                    # Política de cambios
/tallas                     # Guía de tallas
/tejidos                    # Información de tejidos
```

### Rutas Legacy (Con Redirecciones)
```
/productos/[slug]           # → /producto/[slug]
/search                     # → /buscar
/tejidos/[slug]             # → /tejido/[slug]
```

### Rutas de Debug (Desarrollo)
```
/debug/assets               # Debug de assets
```

## Recomendaciones de Acción

### Prioridad Alta
1. **Decidir estrategia para Wishlist vs Favoritos**
   - Implementar OPCIÓN A o OPCIÓN B (ver arriba)
   - Asegurar comportamiento consistente
   - Actualizar enlaces internos

### Prioridad Media
2. **Agregar redirecciones canónicas en head**
   - Asegurar que todas las páginas con alternativas tengan `<link rel="canonical">`
   - Ejemplo: `/productos/[slug]` debe tener canonical apuntando a `/producto/[slug]`

3. **Actualizar sitemap.xml**
   - Solo incluir rutas canónicas
   - Excluir rutas con redirecciones legacy
   - Marcar rutas que requieren autenticación como no-indexables

### Prioridad Baja
4. **Monitorear uso de rutas legacy**
   - Agregar analytics/logging a redirecciones
   - Evaluar si pueden eliminarse después de 6-12 meses

5. **Documentación**
   - Mantener este documento actualizado
   - Documentar decisiones de routing en el README

## Conclusión

La aplicación tiene una estructura de rutas sólida con redirecciones apropiadas implementadas. El único problema potencial identificado es la duplicación entre `/wishlist` y `/account/favoritos`, que requiere una decisión de producto para resolverse.

**Scoring de Salud de Rutas: 9/10** ✅

---
*Auditoría generada automáticamente por Claude Code*
