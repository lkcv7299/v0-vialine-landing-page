# 🧪 TESTING FINAL - VIALINE E-COMMERCE

**Versión**: 1.0
**Última actualización**: 2 Noviembre 2025
**Estado**: En progreso
**Objetivo**: Diagnóstico completo pre-lanzamiento

---

## 📋 ÍNDICE

1. [Tests de Funcionalidad](#tests-de-funcionalidad)
2. [Tests de UI/UX](#tests-de-uiux)
3. [Tests de Assets](#tests-de-assets)
4. [Tests de APIs](#tests-de-apis)
5. [Tests de Compatibilidad](#tests-de-compatibilidad)
6. [Tests de Rendimiento](#tests-de-rendimiento)
7. [Tests de Seguridad](#tests-de-seguridad)
8. [Bugs Conocidos](#bugs-conocidos)
9. [Checklist Pre-Lanzamiento](#checklist-pre-lanzamiento)

---

## 🔴 BUGS CRÍTICOS ACTIVOS

### BUG #1: Diseños Diferentes en Mismo Link
**Reportado**: 2 Nov 2025
**Severidad**: 🔴 CRÍTICA
**Estado**: 🔍 INVESTIGANDO

**Descripción**:
Usuarios diferentes ven diseños distintos al acceder al mismo URL (vialine.vercel.app):
- Usuario A: Ve carrusel horizontal con "Camiseta cuello alto"
- Usuario B: Ve grid vertical con cards + reviews

**Posibles causas**:
- [ ] Cache del navegador
- [ ] Deploy incompleto en Vercel
- [ ] CDN sirviendo versiones antiguas
- [ ] Service workers cacheando versión antigua
- [ ] A/B testing accidental

**Pasos para reproducir**:
1. Abrir vialine.vercel.app en dispositivo A
2. Abrir mismo link en dispositivo B diferente
3. Comparar diseños

**Plan de resolución**:
- [ ] Verificar build de Vercel
- [ ] Limpiar cache de Vercel CDN
- [ ] Agregar headers de no-cache temporalmente
- [ ] Verificar que no hay service workers activos

---

## 1. TESTS DE FUNCIONALIDAD

### 1.1 Carrito de Compras

#### TEST-FUNC-001: Agregar producto al carrito
- [🆗] **Precondición**: Usuario en página de producto
- [🆗 ] Seleccionar color
- [🆗 ] Seleccionar talla
- [ 🆗] Hacer clic en "Agregar al carrito"
- [ 🆗] **Resultado esperado**: Toast de confirmación + contador carrito incrementa
- [ ] **Estado**: 🆗
- [ ] **Notas**:

#### TEST-FUNC-002: Modificar cantidad en carrito
- [🆗 ] **Precondición**: Producto en carrito
- [🆗 ] Abrir carrito
- [🆗 ] Incrementar cantidad con botón "+"
- [ 🆗] Decrementar cantidad con botón "-"
- [ 🆗] **Resultado esperado**: Precio total se actualiza correctamente
- [ ] **Estado**: 🆗
- [ ] **Notas**:

#### TEST-FUNC-003: Eliminar producto del carrito
- [ 🆗] **Precondición**: Producto en carrito
- [🆗 ] Abrir carrito
- [ 🆗] Hacer clic en "Eliminar"
- [ 🆗] **Resultado esperado**: Producto se elimina, total se recalcula
- [🆗 ] **Estado**: 🆗
- [ ] **Notas**:

#### TEST-FUNC-004: Carrito vacío
- [🆗 ] **Precondición**: Carrito vacío
- [🆗 ] Hacer clic en ícono de carrito
- 🆗[ ] **Resultado esperado**: Muestra mensaje "Tu carrito está vacío"
- [ ] **Estado**: 🆗
- [ ] **Notas**:

#### TEST-FUNC-005: Persistencia del carrito
- [🆗 ] **Precondición**: Productos en carrito
- [🆗 ] Recargar página (F5)
- [🆗 ] **Resultado esperado**: Productos siguen en carrito
- [🆗 ] **Estado**: 🆗
- [ ] **Notas**:

---

### 1.2 Checkout y Pagos

#### TEST-FUNC-101: Checkout con Culqi (Tarjeta)
- [🆗 ] **Precondición**: Productos en carrito
- [🆗 ] Ir a checkout
- [🆗 ] Llenar formulario de envío
- [🆗 ] Seleccionar método "Tarjeta de crédito/débito"
- [🆗 ] Ingresar datos de tarjeta de prueba:
  - Número: `4111 1111 1111 1111`
  - CVV: `123`
  - Fecha: `12/25`
- [ 🆗] Completar pago
- [ 🆗] **Resultado esperado**:
  - [ 🆗] Pago procesado exitosamente
  - [🆗 ] Orden guardada en base de datos
  - [🆗 ] Redirección a página de confirmación
  - [🆗 ] Email de confirmación enviado (si aplica)
- [ ] **Estado**: 🆗
- [ ] **Notas**: Recibí el email como comprador, pero no como vendedor/admin. Además, como nota extra deberíamos mejorar los correos o sea que se vean más bonitos sabes jaj

#### TEST-FUNC-102: Checkout con Yape
- [❎ ] **Precondición**: Productos en carrito
- [ ❎] Ir a checkout
- [❎ ] Llenar formulario de envío
- [❎ ] Seleccionar método "Yape"
- [❎ ] **Resultado esperado**:
  - [❎ ] Muestra instrucciones de pago
  - [❎ ] Orden creada con estado "pendiente"
- [ ] **Estado**: 🆗
- [ ] **Notas**: Eso lo eliminamos wey viene incluido en culqi

#### TEST-FUNC-103: Checkout Contra Entrega
- [ ❎] **Precondición**: Productos en carrito
- [ ❎] Ir a checkout
- [ ❎] Llenar formulario de envío
- [ ❎] Seleccionar método "Contra entrega"
- [ ❎] Completar orden
- [❎ ] **Resultado esperado**:
  - [❎ ] Orden creada con estado "pendiente"
  - [ ❎] Muestra confirmación
- [❎ ] **Estado**:  🆗
- [ ] **Notas**: Eso lo eliminamos wey

#### TEST-FUNC-104: Validación de formulario checkout
- [🆗 ] Intentar enviar formulario vacío
- [🆗 ] **Resultado esperado**: Muestra errores de validación
- [🆗 ] Llenar solo algunos campos
- [🆗 ] **Resultado esperado**: Muestra errores en campos faltantes
- [ ] **Estado**: ⏸️ PENDIENTE
- [ ] **Notas**:

#### TEST-FUNC-105: Error de pago Culqi
- [🆗 ] Usar tarjeta de prueba inválida en Culqi
- [🆗 ] **Resultado esperado**:
  - [🆗 ] Muestra mensaje de error
  - [ 🆗] No crea orden
  - [ 🆗] Usuario puede reintentar
- [ ] **Estado**: ⏸️ PENDIENTE
- [ ] **Notas**:

---

### 1.3 Autenticación

#### TEST-FUNC-201: Registro de usuario nuevo
- [ 🆗] Ir a /registro
- [🆗 ] Llenar formulario con datos válidos
- [🆗 ] Hacer clic en "Registrarse"
- [🆗 ] **Resultado esperado**:
  - [🆗 ] Usuario creado en base de datos
  - [🆗 ] Sesión iniciada automáticamente
  - [🆗 ] Redirección a home o perfil
- [🆗 ] **Estado**: 🆗
- [ ] **Notas**:

#### TEST-FUNC-202: Login con credenciales correctas
- [ ] Ir a /login
- [ ] Ingresar email y password correctos
- [ ] Hacer clic en "Iniciar sesión"
- [ ] **Resultado esperado**:
  - [ ] Sesión iniciada
  - [ ] Redirección exitosa
- [ ] **Estado**: ⏸️ PENDIENTE
- [ ] **Notas**:

#### TEST-FUNC-203: Login con credenciales incorrectas
- [🆗 ] Ir a /login
- [ 🆗] Ingresar email o password incorrecto
- [🆗 ] **Resultado esperado**: Muestra error "Credenciales inválidas"
- [🆗 ] **Estado**: 🆗
- [ ] **Notas**:

#### TEST-FUNC-204: Logout
- [🆗 ] **Precondición**: Usuario con sesión activa
- [🆗 ] Hacer clic en "Cerrar sesión"
- [🆗 ] **Resultado esperado**:
  - [🆗 ] Sesión cerrada
  - [🆗 ] Redirección a home
- [ ] **Estado**: 🆗
- [ ] **Notas**:

#### TEST-FUNC-205: Persistencia de sesión
- [🆗 ] **Precondición**: Usuario logueado
- [🆗 ] Cerrar pestaña
- [ 🆗] Abrir nueva pestaña con mismo sitio
- [ 🆗] **Resultado esperado**: Usuario sigue logueado
- [🆗 ] **Estado**: 🆗

---

### 1.4 Wishlist / Favoritos

#### TEST-FUNC-301: Agregar a favoritos
- [🆗 ] **Precondición**: Usuario en página de producto
- [🆗 ] Hacer clic en corazón de favoritos
- [🆗 ] **Resultado esperado**:
  - [ 🆗] Corazón se llena (cambia color)
  - [🆗 ] Producto guardado en favoritos
- [🆗 ] **Estado**: 🆗
- [ ] **Notas**:

#### TEST-FUNC-302: Remover de favoritos
- [🆗 ] **Precondición**: Producto en favoritos
- [🆗 ] Hacer clic en corazón nuevamente
- [🆗 ] **Resultado esperado**:
  - [ 🆗] Corazón se vacía
  - [ 🆗] Producto removido de favoritos
- 🆗[ ] **Estado**: 🆗
- [ ] **Notas**:

#### TEST-FUNC-303: Ver lista de favoritos
- [🆗 ] **Precondición**: Productos en favoritos
- [🆗 ] Ir a página de favoritos
- [🆗 ] **Resultado esperado**: Muestra todos los productos favoritos
- [🆗 ] **Estado**: 🆗
- [ ] **Notas**:

---

### 1.5 Búsqueda y Filtros

#### TEST-FUNC-401: Búsqueda por texto
- [🆗 ] Escribir "legging" en buscador
- [🆗 ] Presionar Enter
- [🆗 ] **Resultado esperado**: Muestra solo productos con "legging" en título
- [ 🆗] **Estado**: 🆗
- [ ] **Notas**: Deberíamos mejorar aun mas el sistema de search y autocompletado... añadir mas variables por ejemplo si escribo leging no me encuentra el producto sabes pero es obvio que me refiero a legging

#### TEST-FUNC-402: Filtro por categoría
- [🆗 ] Ir a /mujer
- [🆗 ] Seleccionar categoría "Tops"
- [🆗 ] **Resultado esperado**: Muestra solo tops
- [ 🆗] **Estado**: 🆗
- [ ] **Notas**:

#### TEST-FUNC-403: Filtro por tejido
- [⁉️ ] Ir a /tejido/suplex
- [⁉️ ] **Resultado esperado**: Muestra solo productos de suplex
- [⁉️ ] **Estado**: ⏸️ PENDIENTE
- [ ] **Notas**: Las secciones por tejido no funcionan sus filtros... le doy a leggings y no me aparece nada ni en tejido algodon ni tejido suplex...

#### TEST-FUNC-404: Filtro por audiencia
- [⁉️ ] Ir a /nina
- [🆗 ] **Resultado esperado**: Muestra solo productos para niña
- [🆗 ] **Estado**: ⏸️ PENDIENTE
- [⁉️ ] **Notas**: /nina tiene un hero arriba que nada que ver... ninguna seccion como /mujer tiene ese hero arriba. Parece un duplicado del hero de nina de home

---

### 1.6 Producto Individual

#### TEST-FUNC-501: Cambio de color en galería
- [ 🆗] **Precondición**: Producto con múltiples colores
- [🆗 ] Hacer clic en botón de color diferente
- [🆗 ] **Resultado esperado**:
  - [ 🆗] Galería cambia a imágenes del color seleccionado
  - [🆗 ] Transición suave (fade)
- [🆗 ] **Estado**: ⏸️ PENDIENTE
- [ ] **Notas**:

#### TEST-FUNC-502: Navegación de galería
- [🆗 ] Hacer clic en flechas izquierda/derecha
- [🆗 ] **Resultado esperado**: Navega entre imágenes del mismo color
- [ ] **Estado**: ⏸️ PENDIENTE
- [ ] **Notas**:

#### TEST-FUNC-503: Zoom de imagen
- [🆗 ] Hacer clic en imagen de producto
- [🆗 ] **Resultado esperado**:
  - [ 🆗] Abre modal fullscreen
  - [ 🆗] Permite zoom in/out
  - [🆗 ] Se puede cerrar con ESC o X
- [ ] **Estado**: ⏸️ PENDIENTE
- [ ] **Notas**:

#### TEST-FUNC-504: Compartir producto
- [ 🆗] Hacer clic en botón "Compartir"
- [🆗 ] **Resultado esperado**:
  - [ 🆗] Abre menú de compartir nativo (móvil)
  - [ 🆗] O copia link al portapapeles (desktop)
- [ ] **Estado**: ⏸️ PENDIENTE
- [ ] **Notas**:

#### TEST-FUNC-505: Comprar ahora (WhatsApp)
- [🆗 ] Seleccionar color y talla
- [🆗 ] Hacer clic en "Comprar ahora"
- [🆗 ] **Resultado esperado**:
  - [🆗 ] Abre WhatsApp con mensaje pre-llenado
  - [ 🆗] Mensaje incluye: nombre producto, color, talla, precio
- [ ] **Estado**: ⏸️ PENDIENTE
- [ ] **Notas**:

---

## 2. TESTS DE UI/UX

### 2.1 Responsive Design

#### TEST-UI-001: Mobile (375px)
- [🆗 ] Abrir en iPhone SE o similar
- [ ] Navegar por todas las páginas
- [ ] **Verificar**:
  - [ ] Sin scroll horizontal
  - [ ] Botones clickeables (no muy pequeños)
  - [ ] Texto legible
  - [ ] Imágenes se ven correctamente
- [ ] **Estado**: ⏸️ PENDIENTE
- [ ] **Notas**:

#### TEST-UI-002: Tablet (768px)
- [ ] Abrir en iPad o similar
- [ ] Navegar por todas las páginas
- [ ] **Verificar**: Layout se adapta correctamente
- [ ] **Estado**: ⏸️ PENDIENTE
- [ ] **Notas**:

#### TEST-UI-003: Desktop (1440px)
- [ ] Abrir en monitor grande
- [ ] **Verificar**:
  - [ ] Contenido no excede max-width
  - [ ] Espaciado adecuado
- [ ] **Estado**: ⏸️ PENDIENTE
- [ ] **Notas**:

#### TEST-UI-004: Orientación landscape (móvil)
- [ ] Rotar teléfono a horizontal
- [ ] **Verificar**: Diseño sigue siendo usable
- [ ] **Estado**: ⏸️ PENDIENTE
- [ ] **Notas**:

---

### 2.2 Consistencia Visual

#### TEST-UI-101: Colores de marca
- [ ] Verificar que se usan colores consistentes:
  - [ ] Primary: Rose 600 (#E11D48)
  - [ ] Neutral grays
  - [ ] Success green
- [ ] **Estado**: ⏸️ PENDIENTE
- [ ] **Notas**:

#### TEST-UI-102: Tipografía
- [ ] Verificar consistencia de tamaños de fuente
- [ ] Verificar jerarquía (H1 > H2 > H3)
- [ ] **Estado**: ⏸️ PENDIENTE
- [ ] **Notas**:

#### TEST-UI-103: Espaciado
- [ ] Verificar padding/margin consistente entre secciones
- [ ] **Estado**: ⏸️ PENDIENTE
- [ ] **Notas**:

#### TEST-UI-104: Botones
- [ ] Verificar que todos los botones tienen:
  - [ ] Hover state
  - [ ] Active state
  - [ ] Disabled state (si aplica)
- [ ] **Estado**: ⏸️ PENDIENTE
- [ ] **Notas**:

---

### 2.3 Animaciones y Transiciones

#### TEST-UI-201: Hover en product cards
- [ ] Pasar mouse sobre product card
- [ ] **Resultado esperado**:
  - [ ] Imagen cambia instantáneamente (sin fade)
  - [ ] Sin lag
- [ ] **Estado**: ⏸️ PENDIENTE
- [ ] **Notas**:

#### TEST-UI-202: Loading states
- [ ] Verificar que hay indicador de carga cuando:
  - [ ] Se hace checkout
  - [ ] Se agrega al carrito
  - [ ] Se cambia color en producto
- [ ] **Estado**: ⏸️ PENDIENTE
- [ ] **Notas**:

#### TEST-UI-203: Toast notifications
- [ ] Verificar que aparecen toasts cuando:
  - [ ] Producto agregado a carrito
  - [ ] Error en formulario
  - [ ] Link copiado
- [ ] **Estado**: ⏸️ PENDIENTE
- [ ] **Notas**:

---

### 2.4 Accesibilidad

#### TEST-UI-301: Navegación por teclado
- [ ] Navegar página con Tab
- [ ] **Verificar**:
  - [ ] Focus visible en todos los elementos
  - [ ] Orden lógico de navegación
- [ ] **Estado**: ⏸️ PENDIENTE
- [ ] **Notas**:

#### TEST-UI-302: Screen readers
- [ ] Usar lector de pantalla (NVDA/JAWS)
- [ ] **Verificar**:
  - [ ] Imágenes tienen alt text
  - [ ] Botones tienen labels
- [ ] **Estado**: ⏸️ PENDIENTE
- [ ] **Notas**:

#### TEST-UI-303: Contraste de colores
- [ ] Verificar contraste con herramienta (WebAIM)
- [ ] **Resultado esperado**: Mínimo AA en WCAG
- [ ] **Estado**: ⏸️ PENDIENTE
- [ ] **Notas**:

---

## 3. TESTS DE ASSETS

### 3.1 Imágenes de Productos

#### TEST-ASSET-001: Verificación de todas las imágenes
- [ ] Ir a cada página de producto
- [ ] **Verificar para CADA producto**:
  - [ ] Imagen principal se carga
  - [ ] Hover image funciona (si tiene)
  - [ ] Galería completa se carga
  - [ ] Imágenes de todos los colores existen
  - [ ] No hay imágenes rotas (404)
  - [ ] No hay placeholders visibles
- [ ] **Estado**: ⏸️ PENDIENTE
- [ ] **Productos a revisar**: Lista completa en [PRODUCTOS-CHECK.md]
- [ ] **Notas**:

**⚠️ Productos con problemas conocidos**:
- Ver Session 7-8 en DIARIO.txt para productos con placeholder

#### TEST-ASSET-002: Calidad de imágenes
- [ ] Verificar que imágenes no se ven:
  - [ ] Pixeladas
  - [ ] Distorsionadas
  - [ ] Con marcas de agua
- [ ] **Estado**: ⏸️ PENDIENTE
- [ ] **Notas**:

#### TEST-ASSET-003: Peso de imágenes
- [ ] Usar DevTools Network tab
- [ ] Verificar que imágenes están:
  - [ ] En formato WebP (si es posible)
  - [ ] Optimizadas (< 200KB cada una)
- [ ] **Estado**: ⏸️ PENDIENTE
- [ ] **Notas**:

#### TEST-ASSET-004: Lazy loading
- [ ] Scroll en página con muchas imágenes
- [ ] **Verificar**: Imágenes cargan solo cuando entran en viewport
- [ ] **Estado**: ⏸️ PENDIENTE
- [ ] **Notas**:

---

### 3.2 Image Transforms

#### TEST-ASSET-101: Positioning en ProductCard
- [ ] Verificar cada producto en /mujer y /nina
- [ ] **Para productos superiores (tops/camisetas)**:
  - [ ] Se ve la cara de la modelo
  - [ ] Se ve el producto completo
  - [ ] No hay cortes extraños
- [ ] **Para productos inferiores (leggings/shorts)**:
  - [ ] Se ve el producto completo
  - [ ] Se ven las piernas
- [ ] **Estado**: ⏸️ PENDIENTE
- [ ] **Notas**:

#### TEST-ASSET-102: Positioning en GymRail
- [ ] Verificar carruseles en home
- [ ] Mismo criterio que TEST-ASSET-101
- [ ] **Estado**: ⏸️ PENDIENTE
- [ ] **Notas**:

#### TEST-ASSET-103: Overrides permanentes
- [ ] Verificar productos con overrides:
  - [ ] short-slim
  - [ ] camiseta-tropical
  - [ ] maxi-short
  - [ ] body-manga-corta
  - [ ] top-minerva
  - [ ] top-soporte
  - [ ] top-perla
  - [ ] top-athena
  - [ ] enterizo-manga-cero
  - [ ] legging-harmony
  - [ ] pescador-realce
  - [ ] torero-energy
- [ ] **Verificar**: Se ven correctamente en todas las vistas
- [ ] **Estado**: ⏸️ PENDIENTE
- [ ] **Notas**:

---

### 3.3 Assets Estáticos

#### TEST-ASSET-201: Hero images
- [ ] Verificar hero de mujer en home
- [ ] Verificar hero de niña en home
- [ ] **Resultado esperado**:
  - [ ] Se cargan rápido
  - [ ] Buena calidad
  - [ ] Object-position correcto
- [ ] **Estado**: ⏸️ PENDIENTE
- [ ] **Notas**:

#### TEST-ASSET-202: Favicon
- [ ] Verificar que aparece favicon en:
  - [ ] Pestaña del navegador
  - [ ] Bookmarks
  - [ ] Mobile home screen
- [ ] **Estado**: ⏸️ PENDIENTE
- [ ] **Notas**:

#### TEST-ASSET-203: Open Graph images
- [ ] Compartir link en WhatsApp
- [ ] Compartir link en Facebook
- [ ] **Resultado esperado**: Aparece preview con imagen
- [ ] **Estado**: ⏸️ PENDIENTE
- [ ] **Notas**:

---

## 4. TESTS DE APIS

### 4.1 Culqi (Pagos)

#### TEST-API-001: Conexión con Culqi
- [ ] Verificar que API key está configurada
- [ ] Hacer pago de prueba
- [ ] **Resultado esperado**:
  - [ ] Se conecta exitosamente
  - [ ] Token se genera
  - [ ] Pago se procesa
- [ ] **Estado**: ⏸️ PENDIENTE
- [ ] **Notas**:

#### TEST-API-002: Manejo de errores Culqi
- [ ] Simular error de red
- [ ] Usar tarjeta rechazada
- [ ] **Resultado esperado**:
  - [ ] App no crashea
  - [ ] Muestra error al usuario
  - [ ] Permite reintentar
- [ ] **Estado**: ⏸️ PENDIENTE
- [ ] **Notas**:

---

### 4.2 Base de Datos (Neon PostgreSQL)

#### TEST-API-101: Conexión a DB
- [ ] Verificar que app se conecta a DB
- [ ] **Método**: Ver logs de Vercel
- [ ] **Estado**: ⏸️ PENDIENTE
- [ ] **Notas**:

#### TEST-API-102: Creación de órdenes
- [ ] Hacer pedido completo
- [ ] Verificar en DB que se guardó:
  - [ ] Orden con datos correctos
  - [ ] Items de la orden
  - [ ] Usuario (si está logueado)
- [ ] **Estado**: ⏸️ PENDIENTE
- [ ] **Notas**:

#### TEST-API-103: Creación de usuarios
- [ ] Registrar usuario nuevo
- [ ] Verificar en DB:
  - [ ] Usuario creado
  - [ ] Password hasheado
  - [ ] Sesión creada
- [ ] **Estado**: ⏸️ PENDIENTE
- [ ] **Notas**:

#### TEST-API-104: Queries lentas
- [ ] Usar DevTools para medir tiempos
- [ ] **Verificar**: Queries < 500ms
- [ ] **Estado**: ⏸️ PENDIENTE
- [ ] **Notas**:

---

### 4.3 NextAuth

#### TEST-API-201: Generación de sesiones
- [ ] Login de usuario
- [ ] **Verificar**:
  - [ ] Session token generado
  - [ ] Cookie httpOnly establecida
- [ ] **Estado**: ⏸️ PENDIENTE
- [ ] **Notas**:

#### TEST-API-202: Expiración de sesiones
- [ ] Esperar tiempo de expiración
- [ ] **Resultado esperado**: Sesión expira, usuario debe re-loguearse
- [ ] **Estado**: ⏸️ PENDIENTE
- [ ] **Notas**:

---

### 4.4 Analytics

#### TEST-API-301: Google Analytics
- [ ] Navegar por la página
- [ ] Ir a Google Analytics Real-Time
- [ ] **Verificar**: Eventos se registran
- [ ] **Estado**: ⏸️ PENDIENTE
- [ ] **Notas**:

#### TEST-API-302: Meta Pixel
- [ ] Navegar por la página
- [ ] Usar Meta Pixel Helper extension
- [ ] **Verificar**: Pixel dispara eventos
- [ ] **Estado**: ⏸️ PENDIENTE
- [ ] **Notas**:

#### TEST-API-303: Microsoft Clarity
- [ ] Navegar por la página
- [ ] Ir a panel de Clarity después de 5 min
- [ ] **Verificar**: Aparece sesión grabada
- [ ] **Estado**: ⏸️ PENDIENTE
- [ ] **Notas**:

---

## 5. TESTS DE COMPATIBILIDAD

### 5.1 Navegadores Desktop

#### TEST-COMPAT-001: Chrome
- [ ] Versión: Última
- [ ] **Verificar**: Todo funciona
- [ ] **Estado**: ⏸️ PENDIENTE
- [ ] **Notas**:

#### TEST-COMPAT-002: Firefox
- [ ] Versión: Última
- [ ] **Verificar**: Todo funciona
- [ ] **Estado**: ⏸️ PENDIENTE
- [ ] **Notas**:

#### TEST-COMPAT-003: Safari
- [ ] Versión: Última
- [ ] **Verificar**: Todo funciona
- [ ] **Estado**: ⏸️ PENDIENTE
- [ ] **Notas**:

#### TEST-COMPAT-004: Edge
- [ ] Versión: Última
- [ ] **Verificar**: Todo funciona
- [ ] **Estado**: ⏸️ PENDIENTE
- [ ] **Notas**:

---

### 5.2 Navegadores Mobile

#### TEST-COMPAT-101: Chrome Mobile (Android)
- [ ] **Dispositivo**: Android
- [ ] **Verificar**: Todo funciona
- [ ] **Estado**: ⏸️ PENDIENTE
- [ ] **Notas**:

#### TEST-COMPAT-102: Safari Mobile (iOS)
- [ ] **Dispositivo**: iPhone
- [ ] **Verificar**: Todo funciona
- [ ] **Estado**: ⏸️ PENDIENTE
- [ ] **Notas**:

#### TEST-COMPAT-103: Samsung Internet
- [ ] **Dispositivo**: Samsung Galaxy
- [ ] **Verificar**: Todo funciona
- [ ] **Estado**: ⏸️ PENDIENTE
- [ ] **Notas**:

---

### 5.3 Sistemas Operativos

#### TEST-COMPAT-201: Windows 11
- [ ] **Verificar**: Todo funciona
- [ ] **Estado**: ⏸️ PENDIENTE

#### TEST-COMPAT-202: macOS
- [ ] **Verificar**: Todo funciona
- [ ] **Estado**: ⏸️ PENDIENTE

#### TEST-COMPAT-203: Android 12+
- [ ] **Verificar**: Todo funciona
- [ ] **Estado**: ⏸️ PENDIENTE

#### TEST-COMPAT-204: iOS 15+
- [ ] **Verificar**: Todo funciona
- [ ] **Estado**: ⏸️ PENDIENTE

---

## 6. TESTS DE RENDIMIENTO

### 6.1 Lighthouse Audit

#### TEST-PERF-001: Performance Score
- [ ] Abrir Chrome DevTools
- [ ] Ir a pestaña Lighthouse
- [ ] Ejecutar audit (Mobile)
- [ ] **Resultado esperado**: Score > 80
- [ ] **Score actual**: _____
- [ ] **Estado**: ⏸️ PENDIENTE
- [ ] **Notas**:

#### TEST-PERF-002: Accessibility Score
- [ ] Ejecutar audit
- [ ] **Resultado esperado**: Score > 90
- [ ] **Score actual**: _____
- [ ] **Estado**: ⏸️ PENDIENTE

#### TEST-PERF-003: Best Practices Score
- [ ] Ejecutar audit
- [ ] **Resultado esperado**: Score > 90
- [ ] **Score actual**: _____
- [ ] **Estado**: ⏸️ PENDIENTE

#### TEST-PERF-004: SEO Score
- [ ] Ejecutar audit
- [ ] **Resultado esperado**: Score > 90
- [ ] **Score actual**: _____
- [ ] **Estado**: ⏸️ PENDIENTE

---

### 6.2 Tiempos de Carga

#### TEST-PERF-101: First Contentful Paint (FCP)
- [ ] Medir con Lighthouse
- [ ] **Resultado esperado**: < 1.8s
- [ ] **Tiempo actual**: _____
- [ ] **Estado**: ⏸️ PENDIENTE

#### TEST-PERF-102: Largest Contentful Paint (LCP)
- [ ] Medir con Lighthouse
- [ ] **Resultado esperado**: < 2.5s
- [ ] **Tiempo actual**: _____
- [ ] **Estado**: ⏸️ PENDIENTE

#### TEST-PERF-103: Time to Interactive (TTI)
- [ ] Medir con Lighthouse
- [ ] **Resultado esperado**: < 3.8s
- [ ] **Tiempo actual**: _____
- [ ] **Estado**: ⏸️ PENDIENTE

---

### 6.3 Optimización

#### TEST-PERF-201: Tamaño de bundle
- [ ] Ejecutar: `npm run build`
- [ ] Ver tamaño de archivos JS
- [ ] **Resultado esperado**: Bundle principal < 200KB
- [ ] **Tamaño actual**: _____
- [ ] **Estado**: ⏸️ PENDIENTE

#### TEST-PERF-202: Images optimizadas
- [ ] Verificar formato de imágenes
- [ ] **Resultado esperado**: Mayoría en WebP
- [ ] **Estado**: ⏸️ PENDIENTE

#### TEST-PERF-203: Code splitting
- [ ] Verificar en build que hay chunks separados
- [ ] **Estado**: ⏸️ PENDIENTE

---

## 7. TESTS DE SEGURIDAD

### 7.1 Headers de Seguridad

#### TEST-SEC-001: HTTPS
- [ ] Verificar que sitio usa HTTPS
- [ ] **Resultado esperado**: ✅ Candado verde en navegador
- [ ] **Estado**: ⏸️ PENDIENTE

#### TEST-SEC-002: Content Security Policy
- [ ] Verificar headers CSP
- [ ] **Estado**: ⏸️ PENDIENTE

#### TEST-SEC-003: X-Frame-Options
- [ ] Verificar header para prevenir clickjacking
- [ ] **Estado**: ⏸️ PENDIENTE

---

### 7.2 Manejo de Datos Sensibles

#### TEST-SEC-101: Passwords
- [ ] Verificar que passwords:
  - [ ] No se envían en URLs
  - [ ] Están hasheados en DB
  - [ ] No aparecen en logs
- [ ] **Estado**: ⏸️ PENDIENTE

#### TEST-SEC-102: Datos de tarjeta
- [ ] Verificar que datos de tarjeta:
  - [ ] Solo pasan por Culqi (nunca por nuestro servidor)
  - [ ] No se guardan en localStorage
- [ ] **Estado**: ⏸️ PENDIENTE

#### TEST-SEC-103: Session tokens
- [ ] Verificar que tokens son:
  - [ ] HttpOnly cookies
  - [ ] Secure (solo HTTPS)
  - [ ] SameSite=lax
- [ ] **Estado**: ⏸️ PENDIENTE

---

### 7.3 Vulnerabilidades Comunes

#### TEST-SEC-201: XSS (Cross-Site Scripting)
- [ ] Intentar inyectar script en:
  - [ ] Buscador
  - [ ] Formularios
- [ ] **Resultado esperado**: Input sanitizado
- [ ] **Estado**: ⏸️ PENDIENTE

#### TEST-SEC-202: SQL Injection
- [ ] Intentar inyectar SQL en campos
- [ ] **Resultado esperado**: Protegido (usamos ORM)
- [ ] **Estado**: ⏸️ PENDIENTE

#### TEST-SEC-203: CSRF
- [ ] Verificar que forms tienen protección CSRF
- [ ] **Estado**: ⏸️ PENDIENTE

---

## 8. BUGS CONOCIDOS

### 🔴 Críticos (Bloquean lanzamiento)

| ID | Descripción | Severidad | Estado | Asignado | Notas |
|----|-------------|-----------|--------|----------|-------|
| BUG-001 | Diseños diferentes en mismo link | 🔴 Crítica | 🔍 Investigando | Claude | Ver arriba |

---

### 🟡 Importantes (Resolver antes de lanzamiento)

| ID | Descripción | Severidad | Estado | Asignado | Notas |
|----|-------------|-----------|--------|----------|-------|
| - | - | - | - | - | - |

---

### 🟢 Menores (Pueden esperar post-lanzamiento)

| ID | Descripción | Severidad | Estado | Asignado | Notas |
|----|-------------|-----------|--------|----------|-------|
| - | - | - | - | - | - |

---

## 9. CHECKLIST PRE-LANZAMIENTO

### Funcionalidad Core
- [ ] Carrito funciona 100%
- [ ] Checkout con los 3 métodos de pago funciona
- [ ] Auth (login/registro) funciona
- [ ] Wishlist funciona
- [ ] Búsqueda y filtros funcionan

### Contenido
- [ ] Todos los productos tienen imágenes
- [ ] Todos los productos tienen descripciones
- [ ] Precios correctos
- [ ] Inventario actualizado
- [ ] Políticas de envío/cambios/devoluciones listas

### Diseño
- [ ] Responsive en mobile/tablet/desktop
- [ ] Todos los links funcionan
- [ ] No hay imágenes rotas
- [ ] Hover effects consistentes

### Infraestructura
- [ ] ✅ Deploy en Vercel funcionando
- [ ] ✅ Base de datos en Neon funcionando
- [ ] ⏸️ Dominio custom configurado (PENDIENTE)
- [ ] SSL/HTTPS activo

### Analytics & Marketing
- [ ] ✅ Google Analytics configurado
- [ ] ✅ Meta Pixel configurado
- [ ] ✅ Microsoft Clarity configurado
- [ ] ✅ WhatsApp float button funcionando

### Legal
- [ ] Términos y condiciones
- [ ] Política de privacidad
- [ ] Aviso de cookies (si aplica)

### Testing
- [ ] Tests de funcionalidad ejecutados
- [ ] Tests de compatibilidad ejecutados
- [ ] Lighthouse audit ejecutado
- [ ] No hay bugs críticos abiertos

---

## 📊 RESUMEN DE ESTADO

**Última actualización**: 2 Nov 2025

### Por Severidad
- 🔴 **Críticos**: 1 (BUG-001 investigando)
- 🟡 **Importantes**: 0
- 🟢 **Menores**: 0

### Por Categoría
- ⏸️ **Funcionalidad**: PENDIENTE
- ⏸️ **UI/UX**: PENDIENTE
- ⏸️ **Assets**: PENDIENTE
- ⏸️ **APIs**: PENDIENTE
- ⏸️ **Compatibilidad**: PENDIENTE
- ⏸️ **Rendimiento**: PENDIENTE
- ⏸️ **Seguridad**: PENDIENTE

### Progreso General
```
Testing completo: ▱▱▱▱▱▱▱▱▱▱ 0%
```

---

## 📝 NOTAS

- Ejecutar tests en orden secuencial
- Documentar todo bug encontrado
- Tomar screenshots de errores
- Actualizar este documento en tiempo real
- Priorizar bugs críticos primero

---

**Próxima revisión**: Después de resolver BUG-001
