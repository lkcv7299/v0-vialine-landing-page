# Diagnóstico Completo de Bugs - Vialine

**Fecha**: 2025-11-01
**Fuente**: Testing manual del usuario en TESTING_CHECKLIST.md
**Total de problemas encontrados**: 30

---

## 🔴 CRÍTICOS (Rompen funcionalidad core)

### 1. ❌ ERROR: `q.toFixed is not a function` al escribir review

**Ubicación**: `components/ReviewList.tsx:204` + `app/api/reviews/[slug]/route.ts:52`

**Reportado por usuario**:
```
Uncaught TypeError: q.toFixed is not a function
  page-da3a9ba2ab5c57de.js:1:7981
```

**Diagnóstico**:
- PostgreSQL `AVG(rating)` devuelve tipo `string` o `Decimal`, NO `number`
- `COUNT()` también devuelve `bigint` que se serializa como string
- Cuando se intenta `.toFixed(1)` en un string, falla

**Código problemático**:
```typescript
// ReviewList.tsx línea 204
{averageRating.toFixed(1)}

// API línea 52
AVG(rating) as average_rating,  // Devuelve string/decimal
COUNT(*) as total_reviews,       // Devuelve bigint → string
```

**Impacto**:
- ⚠️ **BLOQUEADOR**: La página crashea cuando hay reviews
- Usuario no puede ver producto ni escribir más reviews

**Solución**: Convertir tipos en la API a number:
```typescript
average_rating: parseFloat(stats.rows[0].average_rating) || 0,
total_reviews: parseInt(stats.rows[0].total_reviews) || 0,
five_star: parseInt(stats.rows[0].five_star) || 0,
// ... etc
```

---

### 2. ❌ Paginación: "No se encontraron productos" cuando aplicas filtro en página > 1

**Ubicación**: `app/mujer/page.tsx:79-84`

**Reportado por usuario**:
> Si estoy en /mujer?page=2 y luego le doy al filtro de leggings, me dice "No se encontraron productos con los filtros seleccionados"

**Diagnóstico**:
- URL resultante: `/mujer?page=2&category=leggings`
- Solo hay 8 leggings → 1 página
- Código intenta mostrar página 2, que no existe
- `allItems.slice(startIndex, endIndex)` devuelve array vacío

**Código problemático**:
```typescript
// Línea 79
const page = parseInt((params.page as string) || "1")
const startIndex = (page - 1) * itemsPerPage  // Si page=2 y solo hay 8 items → startIndex=24
const items = allItems.slice(startIndex, endIndex)  // Slice fuera de rango → []
```

**Impacto**:
- Usuario ve mensaje "No se encontraron productos"
- Experiencia frustrante: el usuario SÍ puede ver que hay productos, pero la paginación falla

**Solución**: Reset página a 1 cuando cambian filtros, o redirect si página > totalPages

---

### 3. ❌ AccountSidebar → "Favoritos" navega a /wishlist en lugar de /account/favoritos

**Ubicación**: `components/AccountSidebar.tsx:49`

**Reportado por usuario**:
> Del apartado de account si luego seleccionas favoritos te lleva a /wishlist, lo cuál está mal, porque yo necesito que esté integrado en account

**Diagnóstico**:
```typescript
{
  icon: Heart,
  label: "Lista de Deseos",
  href: "/wishlist",  // ❌ INCORRECTO
},
```

**Impacto**:
- Navegación inconsistente
- /account/favoritos existe pero no es accesible desde sidebar
- Confusión de usuario

**Solución**: Cambiar a `href: "/account/favoritos"`

---

### 4. ❌ Productos relacionados muestra productos AGOTADOS

**Ubicación**: `components/RelatedProducts.tsx:17-22`

**Reportado por usuario**:
> [❎] No muestra productos agotados

**Diagnóstico**:
```typescript
const candidates = products.filter(
  (p) =>
    p.slug !== currentProduct.slug &&
    p.category === currentProduct.category &&
    p.audience === currentProduct.audience
    // ❌ FALTA: && p.inventory > 0
)
```

**Impacto**:
- Usuario hace click en producto agotado
- Frustración: no puede comprar

**Solución**: Agregar filtro `p.inventory > 0`

---

### 5. ❌ Email de confirmación de pedido NO se envía

**Ubicación**: `app/api/checkout/route.ts` (probablemente)

**Reportado por usuario**:
> [❎] Email de confirmación se envía

**Diagnóstico**: Necesito verificar si el código de envío de email está implementado en la API de checkout.

**Impacto**:
- Cliente no recibe confirmación
- No puede rastrear pedido
- Pérdida de confianza

**Solución**: Implementar envío de email después de crear orden

---

### 6. ❌ Email de recuperación de contraseña NO funciona

**Ubicación**: Sistema de emails (Brevo)

**Reportado por usuario**:
> Si bien la funcion de email enviado me carga, en realidad lo demás tipo lo que ocurre despues que es lo importante que seria el propio email no funciona... pero no entiendo, la API key de Brevo está configurada.
>
> actu: acabo de revisar y estas usando otro sender... el oficial es no-reply@vialineperu.com

**Diagnóstico**:
- API key de Brevo configurada pero sender incorrecto
- Brevo rechaza emails si el sender no está verificado

**Impacto**:
- Usuarios no pueden recuperar contraseñas olvidadas
- Bloqueador para cuentas perdidas

**Solución**:
1. Verificar sender `no-reply@vialineperu.com` en Brevo
2. Actualizar código para usar sender correcto

---

## 🟡 IMPORTANTES (Afectan UX pero no rompen funcionalidad)

### 7. ⚠️ Botones +/- de zoom NO funcionan

**Ubicación**: `components/ProductGallery.tsx`

**Reportado por usuario**:
> [ ❎] Botones +/- cambian nivel de zoom (100%-300%)

**Diagnóstico**: Necesito verificar si handleZoomIn/handleZoomOut están conectados correctamente

**Verificado en código**:
```typescript
// Líneas 40-46 - Funciones existen
const handleZoomIn = () => {
  setZoomLevel((prev) => Math.min(prev + 0.5, 3))
}
```

**Posible causa**: Los botones están disabled o evento no se dispara

**Impacto**: Usuario no puede hacer zoom para ver detalles

---

### 8. ⚠️ NO existe selector de cantidad en página de producto

**Ubicación**: `components/product/ProductDetailCard.tsx`

**Reportado por usuario**:
> Solo existe esa funcion de cantidad en el carrito o sea nomas ahi puedes agregar cantidades

**Diagnóstico**: Feature no implementada. Es un patrón común en e-commerce que NO tengas selector de cantidad en página de producto, pero el usuario lo esperaba.

**Impacto**:
- UX menos fluida
- Usuario debe ir al carrito para cambiar cantidad

**Decisión**: ¿Queremos agregarlo o dejarlo como está?

---

### 9. ⚠️ NO existe drawer del carrito (solo dropdown)

**Ubicación**: Navbar/Header

**Reportado por usuario**:
> Tienes razón, ahora solo existe un dropdown del carrito pero se vería mucho mejor como lo propones [drawer lateral]

**Diagnóstico**: El checklist esperaba un drawer lateral deslizable, pero está implementado como dropdown.

**Impacto**:
- UX menos premium
- Dropdown puede ser pequeño en mobile

**Solución**: Crear CartDrawer component que se deslice desde la derecha

---

### 10. ⚠️ Email en checkout NO es no-editable

**Ubicación**: `app/checkout/page.tsx`

**Reportado por usuario**:
> [ ❎] Email no editable (viene de sesión)

**Diagnóstico**: Input de email es editable cuando debería ser read-only.

**Impacto**:
- Usuario puede cambiar email por error
- Orden puede ir a email incorrecto

**Solución**: Agregar `disabled` o `readOnly` al input de email

---

### 11. ⚠️ Opciones de pago: Yape duplicado, pago contra entrega sin definir

**Ubicación**: `app/checkout/page.tsx`

**Reportado por usuario**:
> Te dije que elimines la opción de yape porque culqi o sea cuando presionas pagar con tarjeta que obvio sería culqi aparece para tarjetas pero aparte para yape entonces no tendría sentido que luego haya opción de yape si culqi ya lo integra sabes... además y hablando del pago contra entrega como asi que aplicar cargo de 5 soles por servicio no entendí bien.. esto dejalo pendiente a cambio tipo hay que decidir que hacer con pago contra entrega porque no es peligroso?

**Diagnóstico**:
- Culqi ya incluye opción de Yape
- Tener opción separada de Yape es redundante
- Pago contra entrega tiene riesgo de fraude

**Impacto**:
- Confusión de usuario (¿por qué hay 2 Yape?)
- Riesgo de pérdida con contra entrega

**Decisión necesaria**:
1. Eliminar opción standalone de Yape
2. Decidir si mantener "Contra Entrega" y qué cargo aplicar

---

### 12. ⚠️ NO existe página de "Editar Perfil" en /account

**Ubicación**: `app/account/perfil/page.tsx` (probablemente)

**Reportado por usuario**:
> No hay esa opción de editar perfil no aparece

**Diagnóstico**: La ruta `/account/perfil` existe en el build, pero probablemente no está en el sidebar o está vacía.

**Impacto**: Usuario no puede actualizar su nombre, teléfono, etc.

**Solución**: Implementar formulario de editar perfil

---

### 13. ⚠️ NO existe opción de "Cambiar Contraseña" en /account

**Ubicación**: `app/account` (falta implementar)

**Reportado por usuario**:
> No existe esa opción de cambiar contraseña

**Diagnóstico**: Feature no implementada.

**Impacto**:
- Usuario no puede cambiar contraseña
- Debe usar "recuperar contraseña" para cambiarla

**Solución**: Agregar formulario de cambiar contraseña en /account/perfil

---

### 14. ⚠️ Modal de guía de tallas NO cierra con click afuera

**Ubicación**: `components/SizeGuideModal.tsx`

**Reportado por usuario**:
> No cierra con click afuera (por favor agregalo)

**Diagnóstico**: Solo se cierra con botón X o Escape.

**Impacto**: UX menos intuitiva

**Solución**: Agregar overlay clickeable:
```typescript
<div onClick={() => setIsOpen(false)} className="overlay">
  <div onClick={(e) => e.stopPropagation()} className="modal-content">
```

---

### 15. ⚠️ Click en color NO cambia imagen principal correctamente

**Ubicación**: `components/product/ProductDetailCard.tsx`

**Reportado por usuario**:
> Ese sistema parece estar desactualizado, porque no funciona correctamente o a veces tiene errores

**Diagnóstico**: Necesito verificar la lógica de cambio de imagen por color.

**Impacto**: Usuario no puede visualizar producto en color deseado

---

### 16. ⚠️ Rating promedio de reviews tiene conflicto con sistema antiguo

**Ubicación**: ProductCard / Product data

**Reportado por usuario**:
> Todavía existe un problema respecto al sistema de reviews, pues como te digo en los carruseles los productos se muestran con x estrellas pero por el sistema anterior, pero ahora cuando vas si bien las reviews no están, las estrellas de dicho producto si.

**Diagnóstico**:
- Datos de productos tienen `rating` hardcodeado del sistema viejo
- Sistema nuevo de reviews (DB) está separado
- No están sincronizados

**Impacto**:
- Datos inconsistentes
- Confusión de usuario

**Solución**:
1. Remover campo `rating` del JSON de productos
2. Calcular rating dinámicamente desde product_reviews table
3. O agregar computed field que se actualiza cuando se crea review

---

### 17. ⚠️ Links de WhatsApp usan dominio incorrecto (vialine.pe)

**Ubicación**: `app/account/favoritos/page.tsx`

**Reportado por usuario**:
> En realidad no porque el dominio que usa es vialine.pe pero de por si el dominio final que usaremos será el que está registrado tu lo tienes... y por produccion usamos el de vercel pero ninguno aparece

**Diagnóstico**: URLs de WhatsApp compartir usan dominio hardcodeado `vialine.pe` que no existe.

**Impacto**: Links compartidos no funcionan

**Solución**: Usar `window.location.origin` o variable de entorno `NEXT_PUBLIC_SITE_URL`

---

### 18. ⚠️ Validación de teléfono y código postal acepta letras

**Ubicación**: `app/account/direcciones/page.tsx` + `app/checkout/page.tsx`

**Reportado por usuario**:
> El telefono no detecta como que tienen que ser numeros, pues simplemente si escribes con letras por ejemplo igual te lo acepta sabes, el codigo postal tambien

**Diagnóstico**: Inputs no tienen `type="tel"` o validación numérica.

**Impacto**: Datos incorrectos en DB

**Solución**:
```typescript
<input type="tel" pattern="[0-9]+" />
```

---

### 19. ⚠️ Hamburger menu: "Guía de tallas" y "Cambios y devoluciones" NO funcionan

**Ubicación**: `components/nav/MobileMenu.tsx`

**Reportado por usuario**:
> El hamburguer tiene sección ayuda donde ves guía de tallas, cambios y devoluciones y soporte whatsapp, de los cuales no funciona la guia de tallas ni cambio y devoluciones

**Diagnóstico**: Links rotos o páginas no existen.

**Impacto**: Usuario no puede acceder a información importante en mobile

**Solución**: Verificar rutas y crear páginas faltantes

---

## 🟢 MEJORAS UX (No rompen nada pero mejoran experiencia)

### 20. 💡 Mobile: Demasiadas cosas abajo en catálogo

**Reportado por usuario**:
> En movil hay demasiadas cosas abajo! (filtros y orden, la paginación y el botón whatsapp) Mis sugerencia es que en caso de movil no existe la paginación y simplemente haya ese efecto de load more y pues ahi cargan más. Además sugiero que los filtros estén arriba del todo y no abajo sabes, busca referencias.

**Diagnóstico**: Layout de filtros/paginación no optimizado para móvil.

**Sugerencia**:
1. Mover filtros arriba en móvil
2. Reemplazar paginación con "Cargar más" (infinite scroll)
3. Botón WhatsApp flotante no obstruya paginación

---

### 21. 💡 Checkout: Debería ser multi-step en lugar de una sola página

**Reportado por usuario**:
> Deberíamos estudiar si está bien que el checkout sea tipo en una sola pagína o que tenga varios steps que cambien a diferentes mini paginas sabes porque sino tienes que escrolear bastante en celular

**Sugerencia**: Checkout con steps (Dirección → Pago → Confirmación)

**Beneficios**:
- Menos scroll en móvil
- Proceso más guiado
- Menor abandono de carrito

---

### 22. 💡 Account no es intuitivo en móvil

**Reportado por usuario**:
> Necesitamos hacer mas intuitivo la parte de account para celular sabes

**Sugerencia**: Tabs horizontales o cards en lugar de sidebar

---

### 23. 💡 En móvil, click en orden NO muestra detalles

**Reportado por usuario**:
> En celular no [muestra detalles]

**Diagnóstico**: Modal de detalles probablemente no se adapta a móvil.

**Solución**: Full-screen modal en mobile o navegación a página dedicada

---

### 24. 💡 Verificar estructura de checkout - páginas duplicadas

**Reportado por usuario**:
> Ya teniamos una pagina de detalles de orden sabes o sea si le das a detalles en la pagina de account pedidos te muestra un pop up con los detalles, pero antes teniamos uno más bonito y especifico que mostraba un timeline del pedido y asi pero no sé o sea te dejo como tarea verificar la estructura del checkout porque hay varias paginas que no sirven o duplicadas o cosas asi

**Tarea**: Auditoría de rutas de checkout/orden y limpiar duplicados

---

### 25. 💡 Después de login, NO regresa a checkout

**Reportado por usuario**:
> Creo que eso no sucede, o sea no lo he probado pero que recuerde no... en todo caso vertificar por favor

**Diagnóstico**: NextAuth redirect callback probablemente no preserva `callbackUrl`

**Impacto**: Usuario pierde contexto

**Solución**: Configurar `callbackUrl` en signIn()

---

## 📝 NOTAS Y DECISIONES PENDIENTES

### 26. ❓ ¿Mostrar foto de perfil en account?

**Reportado por usuario**:
> [❎ ] Muestra foto de perfil (si tiene)
> No creo que sea necesario

**Decisión**: Usuario dice que NO es necesario. ¿Confirmamos?

---

### 27. ❓ ¿Qué hacer con pago "Contra Entrega"?

**Reportado por usuario**:
> Hay que decidir que hacer con pago contra entrega porque no es peligroso?

**Opciones**:
1. Eliminar completamente
2. Aplicar cargo adicional (S/. 5)
3. Limitar a pedidos < S/. 200
4. Requerir verificación telefónica

**Decisión pendiente del usuario**

---

### 28. ❓ ¿Implementar selector de cantidad en página de producto?

**Estado actual**: Solo en carrito
**Usuario espera**: En página de producto también

**Decisión**: ¿Es importante o dejamos como está?

---

### 29. ❓ No aparece "usar nueva dirección", solo "usar dirección guardada"

**Reportado por usuario**:
> En realidad no aparece de usar nueva dirección, simplemente aparece de usar dirección guardada o sino puedes editar los campos igual por ti mismo

**Diagnóstico**: UI diferente de lo esperado, pero funcional.

**Decisión**: ¿Cambiar UI o dejar como está?

---

## 📊 RESUMEN DE PRIORIDADES

| Prioridad | Cantidad | % del total |
|-----------|----------|-------------|
| 🔴 Crítico | 6 | 20% |
| 🟡 Importante | 13 | 43% |
| 🟢 Mejora UX | 7 | 23% |
| ❓ Pendiente decisión | 4 | 14% |

**Total**: 30 problemas identificados

---

## 🎯 PLAN DE ACCIÓN SUGERIDO

### Sprint 1: Bugs críticos (1-2 días)
1. ✅ Fix error `.toFixed()` en reviews (BLOQUEADOR)
2. ✅ Fix paginación con filtros
3. ✅ Fix AccountSidebar → favoritos
4. ✅ Fix productos relacionados (filtrar agotados)
5. ✅ Fix email de confirmación
6. ✅ Fix email de recuperación (sender correcto)

### Sprint 2: Bugs importantes (2-3 días)
7. Botones de zoom
8. Modal de guía de tallas (cerrar con click afuera)
9. Eliminar opción Yape duplicada
10. Email no editable en checkout
11. Formulario de editar perfil
12. Formulario de cambiar contraseña
13. Links de WhatsApp (dominio correcto)
14. Validación de teléfono/código postal

### Sprint 3: UX y mejoras (3-4 días)
15. Mobile: Load more en lugar de paginación
16. Mobile: Reordenar filtros arriba
17. Account mobile más intuitivo
18. Detalles de orden en móvil
19. Drawer del carrito
20. Sync rating de productos con reviews DB

### Sprint 4: Decisiones pendientes
21. ¿Checkout multi-step?
22. ¿Pago contra entrega - qué hacer?
23. ¿Selector de cantidad en producto?
24. Auditoría de rutas duplicadas

---

**Generado**: 2025-11-01
**Autor**: Claude Code
**Fuente**: Testing manual del usuario
