# Testing Checklist - Vialine E-commerce

Este documento divide todas las features en dos categorías:
1. **✅ Verificable por Claude** - Verificación automática vía código
2. **👤 Testing Manual Requerido** - Solo el usuario puede testear

---

## 📋 SECCIÓN 1: Verificable por Claude (Análisis de Código)

### ✅ 1.1 Estructura de Archivos y Configuración

- [ ] `next.config.mjs` existe y está configurado correctamente
- [ ] `package.json` tiene todas las dependencias necesarias
- [ ] Variables de entorno requeridas están documentadas
- [ ] TypeScript configurado en modo strict
- [ ] ESLint configurado (temporalmente deshabilitado por bug de Next.js)
- [ ] Estructura de carpetas sigue convenciones de Next.js 15

### ✅ 1.2 Rutas y Páginas (Existencia)

- [ ] `/` - Homepage existe (app/page.tsx)
- [ ] `/mujer` - Catálogo mujeres existe (app/mujer/page.tsx)
- [ ] `/nina` - Catálogo niñas existe (app/nina/page.tsx)
- [ ] `/producto/[slug]` - Página de producto existe (app/producto/[slug]/page.tsx)
- [ ] `/cart` - Carrito existe (app/cart/page.tsx)
- [ ] `/checkout` - Checkout existe (app/checkout/page.tsx)
- [ ] `/login` - Login existe (app/login/page.tsx)
- [ ] `/register` - Registro existe (app/register/page.tsx)
- [ ] `/recuperar-contrasena` - Recuperación existe (app/recuperar-contrasena/page.tsx)
- [ ] `/account` - Dashboard cuenta existe (app/account/page.tsx)
- [ ] `/account/favoritos` - Favoritos integrados existe (app/account/favoritos/page.tsx)
- [ ] `/account/direcciones` - Direcciones existe (app/account/direcciones/page.tsx)

### ✅ 1.3 API Routes (Existencia y Estructura)

- [ ] `/api/auth/[...nextauth]` - NextAuth configurado
- [ ] `/api/cart` - CRUD del carrito
- [ ] `/api/reviews` - Sistema de reseñas
- [ ] `/api/wishlist` - Favoritos
- [ ] `/api/direcciones` - Gestión de direcciones
- [ ] `/api/ordenes` - Gestión de órdenes
- [ ] `/api/send-recovery-email` - Email de recuperación

### ✅ 1.4 Componentes Core (Existencia)

- [ ] `components/Navbar.tsx` - Navegación principal
- [ ] `components/MobileMenu.tsx` - Menú móvil
- [ ] `components/ui/ProductCard.tsx` - Card de producto
- [ ] `components/ProductGallery.tsx` - Galería con zoom
- [ ] `components/ProductDetailCard.tsx` - Detalles de producto
- [ ] `components/ReviewList.tsx` - Lista de reseñas con filtros
- [ ] `components/RelatedProducts.tsx` - Productos relacionados
- [ ] `components/SizeGuideModal.tsx` - Guía de tallas adaptativa
- [ ] `components/WishlistHeart.tsx` - Botón de favoritos
- [ ] `components/CartDrawer.tsx` - Cajón del carrito
- [ ] `components/AccountSidebar.tsx` - Sidebar de cuenta

### ✅ 1.5 Context Providers

- [ ] `WishlistContext` - Estado global de favoritos
- [ ] `CartContext` - Estado global del carrito
- [ ] NextAuth SessionProvider configurado

### ✅ 1.6 Database Schema

- [ ] Tabla `users` con columnas: id, email, password_hash, name, image, reset_token, reset_token_expiry
- [ ] Tabla `addresses` con columnas correctas
- [ ] Tabla `reviews` con columnas correctas
- [ ] Índices creados: idx_users_email, idx_users_reset_token

### ✅ 1.7 TypeScript Types

- [ ] No errores de TypeScript en build
- [ ] Types definidos para Product
- [ ] Types definidos para Review
- [ ] Types definidos para Address
- [ ] Types definidos para CartItem

### ✅ 1.8 Optimizaciones de Performance

- [ ] Dynamic imports configurados para ReviewList y RelatedProducts
- [ ] `optimizePackageImports` en next.config.mjs (lucide-react, @headlessui/react, sonner)
- [ ] Webpack code splitting configurado (vendor, lib, common chunks)
- [ ] Image optimization habilitado (AVIF/WebP)
- [ ] Compression habilitado (compress: true)
- [ ] Images con `loading="lazy"` en ProductCard

### ✅ 1.9 Validación de Código

- [ ] No imports circulares
- [ ] No console.logs en producción (excepto errores)
- [ ] Manejo de errores con try/catch en APIs
- [ ] Validación de inputs en APIs
- [ ] Sanitización de datos de usuario

### ✅ 1.10 Documentación

- [ ] README.md existe y está actualizado
- [ ] DIARIO.txt documenta todas las sesiones
- [ ] GOOGLE_OAUTH_SETUP.md con guía completa
- [ ] PERFORMANCE_OPTIMIZATIONS.md con métricas
- [ ] TESTING_CHECKLIST.md (este documento)

---

## 👤 SECCIÓN 2: Testing Manual Requerido (Usuario)

### 👤 2.1 Autenticación y Sesión

#### Login
- [ ] Login con email/contraseña válidos funciona
- [ ] Login con credenciales incorrectas muestra error
- [ ] Validación de email en frontend (formato correcto)
- [ ] Mensajes de error claros y en español
- [ ] Redirección a `/account` después de login exitoso
- [ ] Sesión persiste después de recargar página

#### Login con Google OAuth
- [ ] Botón "Continuar con Google" aparece
- [ ] Click en botón abre popup de Google
- [ ] Después de autorizar, crea cuenta automáticamente
- [ ] Usuario de Google tiene foto de perfil automáticamente
- [ ] Usuario de Google NO tiene password_hash en DB
- [ ] Redirección correcta después de OAuth

#### Registro
- [ ] Formulario de registro funciona
- [ ] Validación de email único (muestra error si existe)
- [ ] Password hasheado correctamente (bcrypt)
- [ ] Email de confirmación NO se envía (feature futura)
- [ ] Redirección a `/account` después de registro

#### Recuperación de Contraseña
- [ ] Página `/recuperar-contrasena` carga correctamente
- [ ] Email de recuperación se envía correctamente
- [ ] Link en email funciona y lleva a página de reset
- [ ] Token expira después de 1 hora
- [ ] Nueva contraseña se guarda correctamente
- [ ] Login con nueva contraseña funciona

#### Logout
- [ ] Botón de logout funciona
- [ ] Sesión se destruye completamente
- [ ] Redirección a homepage después de logout
- [ ] No se puede acceder a `/account` después de logout

### 👤 2.2 Navegación y UI

#### Navbar
- [ ] Logo redirige a homepage
- [ ] Links "MUJER" y "NIÑAS" funcionan
- [ ] Contador del carrito muestra cantidad correcta
- [ ] Icono de cuenta muestra dropdown si está logueado
- [ ] Dropdown muestra "Iniciar sesión" si NO está logueado
- [ ] Navbar es sticky en scroll

#### Mobile Menu
- [ ] Hamburger button abre menú en móvil
- [ ] Links funcionan correctamente
- [ ] Cerrar menú funciona (X button)
- [ ] Overlay oscuro aparece detrás del menú
- [ ] Click fuera del menú lo cierra

#### Footer
- [ ] Links de redes sociales funcionan
- [ ] Email y WhatsApp abren apps correctas
- [ ] Copyright muestra año actual

### 👤 2.3 Catálogo de Productos (/mujer y /nina)

#### Visualización
- [✅] Productos se cargan correctamente
- [✅ ] Imágenes cargan con lazy loading
- [ ✅] Grid responsive: 2 columnas móvil, 3 tablet, 4 desktop
- [ ]✅ Hover en producto muestra botón "Ver detalles"
- [ ✅] Badge "NUEVO" aparece en productos nuevos
- [✅ ] Badge "OFERTA" aparece en productos en descuento
- [✅ ] Badge "AGOTADO" aparece en productos sin stock
- [ ✅] Precios formateados correctamente (S/. XX.XX)
- [ ✅] Precio tachado aparece en ofertas

#### Filtros
- [ ✅] Filtro por categoría funciona (leggings, bikers, shorts, etc.)
- [ ✅] Filtro por talla funciona (XS, S, M, L, XL)
- [✅ ] Filtro por color funciona
- [✅ ] Filtro por rango de precio funciona
- [✅ ] Múltiples filtros simultáneos funcionan
- [✅ ] URL se actualiza con filtros (ej: ?category=leggings&size=M)
- [✅ ] Botón "Limpiar filtros" elimina todos los filtros

#### Ordenamiento
- [✅ ] Ordenar por "Más reciente" funciona
- [✅ ] Ordenar por "Precio: Menor a Mayor" funciona
- [ ✅] Ordenar por "Precio: Mayor a Menor" funciona
- [ ✅] Ordenar por "Más vendidos" funciona

#### Paginación
- [✅ ] Botones de paginación aparecen si hay >12 productos
- Nota: En movil hay demasiadas cosas abajo! (filtros y orden, la paginación y el botón whatsapp) Mis sugerencia es que en caso de movil no existe la paginación y simplemente haya ese efecto de load more y pues ahi cargan más. Además sugiero que los filtros estén arriba del todo y no abajo sabes, busca referencias.
- [ ✅] Click en página cambia productos mostrados
- [ ✅] URL se actualiza con número de página (?page=2)
- [ ❎] **CRÍTICO**: Filtros se preservan al cambiar de página
- Nota: si estoy en ejemplo /mujer?page=2 y luego le doy al filtro de leeggings, me dice que No se encontraron productos con los filtros seleccionados.
- [✅ ] Botón "Anterior" deshabilitado en página 1
- [ ✅] Botón "Siguiente" deshabilitado en última página
- [ ✅] Scroll automático al top al cambiar de página

### 👤 2.4 Página de Producto (/producto/[slug])

#### Galería de Imágenes
- [✅ ] Imagen principal se muestra correctamente
- [ ✅] Miniaturas se muestran debajo
- [✅ ] Click en miniatura cambia imagen principal
- [ ✅] Click en imagen principal abre modal de zoom
- [ ✅] Zoom modal muestra imagen en fullscreen
- [ ❎] Botones +/- cambian nivel de zoom (100%-300%)
- [✅] Indicador de zoom muestra porcentaje actual
- [✅ ] Flechas izquierda/derecha cambian imagen
- [✅ ] Teclado: ArrowLeft/ArrowRight funcionan
- [✅ ] Teclado: Escape cierra modal
- [✅ ] Miniaturas en modal funcionan
- [✅ ] Scroll de página bloqueado cuando modal abierto

#### Información del Producto
- [✅ ] Título del producto se muestra
- [✅ ] Precio se muestra correctamente
- [ ] SKU se muestra
- [ ❎ ] Rating promedio se muestra con estrellas
- Nota: Todavía existe un problema respecto al sistema de reviews, pues como te digo en los carruseles los productos se muestran con x estrellas pero por el sistema anterior, pero ahora cuando vas si bien las reviews no están, las estrellas de dicho producto si.
Todavía tengo un problema 
- [✅ ] Descripción del producto se muestra
- [✅ ] Stock disponible se muestra

#### Selector de Talla
- [ ✅] Botones de talla (XS, S, M, L, XL) aparecen
- [✅ ] Tallas sin stock están deshabilitadas
- [✅ ] Talla seleccionada se marca visualmente
- [✅ ] No se puede agregar al carrito sin seleccionar talla

#### Selector de Color
- [✅ ] Colores disponibles se muestran
- [ ❓] Click en color cambia imagen principal
- Ese sistema parece estar desactualizado, porque no funciona correctamente o a veces tiene errores.
- [ ✅] Color seleccionado se marca visualmente

#### Cantidad
- [ ❎] Input de cantidad funciona
- [ ❎] Botones +/- cambian cantidad
- [ ❎] No se puede ingresar cantidad > stock
- [❎ ] No se puede ingresar cantidad < 1
- Nota, solo existe esa funcion de cantidad en el carrito o sea nomas ahi puedes agregar cantidades o sea cambiarlas

#### Botón "Agregar al carrito"
- [✅ ] Botón funciona solo si talla seleccionada
- [✅ ] Muestra error si no hay talla seleccionada
- [✅ ] Agrega producto con cantidad correcta
- [✅ ] Contador del carrito se actualiza
- ✅[ ] Toast/notificación de éxito aparece

#### Botón de Favoritos (Corazón)
- [✅ ] Corazón vacío si no está en favoritos
- [ ✅] Corazón relleno si está en favoritos
- [✅ ] Click agrega/quita de favoritos
- [✅ ] Estado persiste en localStorage
- [✅ ] Requiere login (muestra error si no está logueado)
- El dropdown de cuenta te lleva a /account/favoritos lo cuál está bien... pero del apartado de account y si luego seccionas a favoritos te lleva a /wishlist lo cuál está mal, porque yo necesito que esté integrado en account (por cierto, el apartado tampoco se adapta al estilo de lo demás tipo pedidos y direcciones que tambien está en account)

#### Guía de Tallas
- [ ✅] Botón "Guía de tallas" abre modal
- [✅ ] Modal muestra tabla correcta según categoría
- [ ✅] Si es leggings/bikers/shorts → tabla de pantalones destacada
- [✅ ] Si es tops/bodys/camisetas → tabla de tops destacada
- [✅ ] Si es enterizo → muestra ambas tablas
- [✅ ] Badge "Para este producto" aparece en tabla relevante
- [✅ ] Medidas en centímetros mostradas correctamente
- [❓ ] Modal cierra con botón X o click fuera
- Nota, no cierra con click afuera (por favor agregalo)


#### Tabs (Descripción / Materiales / Cuidados)
- [✅ ] Tab "Descripción" muestra descripción completa
- [✅ ] Tab "Materiales" muestra composición del producto
- [✅ ] Tab "Cuidados" muestra instrucciones de lavado
- [✅ ] Click en tab cambia contenido correctamente
- [✅ ] Tab activo tiene estilo diferente

#### Productos Relacionados
- [✅ ] Sección "También te puede gustar" aparece
- [ ✅] Muestra 4 productos relacionados (misma categoría)
- [✅ ] Grid responsive: 2 cols móvil, 3 tablet, 4 desktop
- [ ✅] Click en producto relacionado navega correctamente
- [❎] No muestra productos agotados

#### Sistema de Reseñas
- [✅ ] Sección de reseñas aparece debajo del producto
- [ ] Rating promedio se muestra correctamente
- [ ] Cantidad total de reseñas se muestra
- [✅ ] Distribución de estrellas (5★-1★) aparece con gráfico
- [ ✅] Gráfico muestra barras proporcionales
- [ ] Click en barra filtra reseñas por estrellas
- [ ] Filtro activo se marca visualmente
- [ ] Botón "Todas" muestra todas las reseñas
- [ ] Reseñas se muestran con nombre, fecha, rating, comentario
- [ ] Fecha formateada correctamente (ej: "15 de enero de 2025")
- [ ] Botón "Escribir reseña" aparece si está logueado
- [ ] Click en "Escribir reseña" abre modal
- [ ] Modal permite seleccionar estrellas (1-5)
- [ ] Modal permite escribir comentario
- [ ] Botón "Enviar" envía reseña a API
- [ ❎] Reseña aparece inmediatamente en lista
- [✅ ] No se puede escribir reseña si no está logueado

- Nota, me aparece este error cuando escribo una review
Application error: a client-side exception has occurred while loading vialine.vercel.app (see the browser console for more information).

Uncaught TypeError: q.toFixed is not a function
    NextJS 10
page-da3a9ba2ab5c57de.js:1:7981
    NextJS 10

Y ahora cuando entro al producto donde escríbi la review me sigue aparciendo ese error


### 👤 2.5 Carrito de Compras

#### Cart Drawer (Panel lateral)
- [❎ ] Click en icono de carrito abre drawer
- [❎ ] Drawer se desliza desde la derecha
- [❎ ] Overlay oscuro aparece detrás
- [ ❎] Click fuera del drawer lo cierra
- [ ❎] Botón X cierra drawer
- Nota: Tienes razón, ahroa solo existe un dropdown del carrito pero se vería mucho mejor como lo propones.

#### Productos en Carrito
- [✅ ] Lista de productos se muestra correctamente
- [✅ ] Imagen, nombre, talla, color, precio aparecen
- [ ✅] Cantidad se muestra con botones +/-
- [✅ ] Botones +/- cambian cantidad
- [✅ ] No se puede reducir cantidad < 1
- [✅ ] No se puede aumentar cantidad > stock
- [ ✅] Subtotal por producto se actualiza
- [✅ ] Botón de eliminar (🗑️) funciona
- [✅ ] Animación al eliminar producto

#### Totales
- [✅ ] Subtotal se calcula correctamente
- [ ✅] Costo de envío se muestra (o "Gratis" si > S/. 150)
- [✅ ] Total final se calcula correctamente
- [✅ ] Todos los precios formateados en PEN (S/.)

#### Botones de Acción
- [✅ ] Botón "Seguir comprando" cierra drawer
- [✅ ] Botón "Ir al checkout" redirige a `/checkout`
- [ ✅] Si carrito vacío, muestra mensaje apropiado
- [✅ ] Si carrito vacío, botón checkout deshabilitado

#### Persistencia
- [✅ ] Carrito persiste en localStorage
- [✅ ] Carrito se mantiene después de recargar
- [✅ ] Carrito se mantiene después de logout (localStorage)

### 👤 2.6 Proceso de Checkout

#### Página /checkout
- [✅ ] Solo accesible si hay items en carrito
- [ ✅] Requiere login (redirige a /login si no está logueado)
- [ ❓] Después de login, regresa a checkout
- Creo que eso no sucede, o sea no lo he probado pero que recuerde no... en todo caso vertificar por favor
- Extra: Deberíamos estudiar si está bien que el checkout sea tipo en una sola pagína o que tenga varios steps que cambien a diferentes mini paginas sabes porque sino tienes que escrolear bastante en celular por ejempo pero ya aplicaría para pc tambien

#### Sección: Información de Contacto
- [✅ ] Email del usuario pre-llenado
- [ ❎] Email no editable (viene de sesión)

#### Sección: Dirección de Envío
- [ ✅] Dropdown muestra direcciones guardadas
- [✅ ] Opción "Usar nueva dirección" funciona
- [✅ ] Formulario de nueva dirección aparece
- [✅ ] Campos: nombre, apellido, dirección, ciudad, distrito, código postal, teléfono
- [✅ ] Validación de campos requeridos
- [ ✅] Checkbox "Guardar para futuras compras" funciona
- [ ✅] Si se marca checkbox, dirección se guarda en DB
- [✅ ] Dirección guardada aparece en `/account/direcciones`
- En realidad nno aparece de usar nueva dirección, simplemente aparece de usar dirección guardada o sino puedes editar los campos igual por ti mismo

#### Sección: Método de Pago
- [✅ ] Opciones disponibles: Tarjeta, Yape, Contra Entrega
- [✅ ] Selección marca radio button correctamente

#### Pago con Tarjeta (Culqi)
- [✅ ] Formulario de tarjeta aparece
- [ ✅] Número de tarjeta, CVV, fecha de expiración validados
- [ ✅] Integración con Culqi funciona
- [✅ ] Tarjeta de prueba 4111111111111111 funciona
- [ ✅] Muestra error si pago rechazado
- [✅ ] Redirige a página de confirmación si aprobado

#### Pago con Yape
- [ ] Muestra instrucciones de transferencia
- [ ] Muestra QR code de Yape
- [ ] Muestra número de teléfono para Yape
- [ ] Checkbox "Ya realicé el pago" funciona
- [ ] Botón "Confirmar pedido" funciona
- Nota: Te dije que elimines la opción de yape porque culqi o sea cuando presionas pagar con tarjeta que obvio sería culqi aparece para tarjetas pero aparte para yape entonces no tendría sentido que luego haya opción de yape si culqi ya lo integra sabes... además y hablando del pago contra entrega como asi que aplicar cargo de 5 soles por servicio no entendí bien.. esto dejalo pendiente a cambio tipo hay que decidir que hacer con pago contra entrega porque no es peligroso?

#### Contra Entrega
- [ ] Selección muestra mensaje informativo
- [ ] Botón "Confirmar pedido" funciona
- [ ] No requiere información de pago

#### Resumen del Pedido (Sidebar)
- [✅ ] Lista de productos con imagen y cantidad
- [✅ ] Subtotal correcto
- [ ✅] Envío correcto (gratis si > S/. 150)
- [ ✅] Total final correcto
- [✅ ] Botón "Realizar pedido" funciona

#### Después de Confirmar Pedido
- [✅ ] Orden se guarda en base de datos
- [❎] Email de confirmación se envía
- [✅ ] Redirige a página de confirmación
- [✅ ] Carrito se vacía automáticamente
- [✅ ] Orden aparece en `/account`

### 👤 2.7 Cuenta de Usuario (/account)

#### Dashboard Principal
- [✅ ] Muestra nombre del usuario
- [ ✅] Muestra email del usuario
- [❎ ] Muestra foto de perfil (si tiene)
- No creo que sea necesario
- [✅ ] AccountSidebar aparece en desktop
- [ ✅] Tabs en móvil funcionan
- Nota: Necesitamos hacer mas intuitivo la parte de account para celular sabes.

#### Sidebar/Tabs
- [ ✅] Link "Mi cuenta" activo por defecto
- [ ✅] Link "Pedidos" navega a sección de pedidos
- [ ❎] Link "Favoritos" navega a `/account/favoritos`
- [ ✅] Link "Direcciones" navega a `/account/direcciones`
- [✅ ] Link activo tiene estilo diferente

#### Sección: Pedidos
- [✅ ] Lista de órdenes se muestra
- [✅ ] Cada orden muestra: número, fecha, total, estado
- [✅ ] Estados: pendiente, procesando, enviado, entregado, cancelado
- [❓ ] Click en orden muestra detalles
- Notas: En celular no.
- [✅ ] Detalles muestran: productos, dirección de envío, método de pago
- [❎] Botón "Rastrear pedido" funciona (si aplica)
- No hay esa opción, pero acá quiero hacer una aclaración demasiado fuerte... pues ya teniamos una pagina de detalles de orden sabes o sea si le das a detalles en la pagina de account pedidos te muestra un pop up con los detalles, pero antes teniamos uno más bonito y especifico que mostraba un timeline del pedido y asi pero no sé o sea te dejo como tarea verificar la estructura del checkout porque hay varias paginas que no sirven o duplicadas o cosas asi
- [✅ ] Si no hay órdenes, muestra mensaje apropiado

#### Sección: Editar Perfil
- [❎ ] Formulario con nombre, email, teléfono
- [ ❎] Email no editable (requiere verificación futura)
- [ ❎] Botón "Guardar cambios" actualiza datos
- [ ❎] Toast de confirmación aparece
- [❎ ] Foto de perfil se puede cambiar (si implementado)
- No hay esa opción de editar perfil no aparece

#### Sección: Cambiar Contraseña
- [❎ ] Solo visible si login con email (no OAuth)
- [❎ ] Campos: contraseña actual, nueva, confirmar nueva
- [❎ ] Validación de contraseña actual correcta
- [❎ ] Validación de nueva contraseña (mínimo 8 caracteres)
- [ ❎] Validación de confirmación (deben coincidir)
- [ ❎] Botón "Cambiar contraseña" actualiza hash
- [❎ ] Login con nueva contraseña funciona
- No existe esa opción de cambiar contraseña

### 👤 2.8 Favoritos (/account/favoritos)

#### Visualización
- [ ❓] Página carga correctamente
- [❓ ] AccountSidebar aparece
- [❓ ] Grid de productos favoritos responsive
- [❓ ] Cada producto muestra imagen, nombre, precio
- [❓ ] Click en producto navega a página de detalle
- [❓ ] Botón de corazón funciona para quitar de favoritos
- [❓ ] Si no hay favoritos, muestra estado vacío
- [❓ ] Estado vacío tiene CTA "Explorar productos"
- Existe esa pagina, pero está mal incrustada en account y además solo accedes a ella en el dropdown de cuenta en header, pero no en la propia pagina de /account que en su lugar te lleva a /wishlist

#### Funcionalidad
- [✅ ] Botón "Compartir por WhatsApp" funciona
- [ ✅] Mensaje de WhatsApp incluye todos los productos
- [ ❎] Links en WhatsApp funcionan
En realidad no porque el dominio que usa es vialine.pe pero de por si el dominio final que usaremos será el que está registrado tu lo tienes... y por produccion usamos el de vercel pero ninguno aparece
- [✅ ] Cantidad de productos se muestra correctamente

### 👤 2.9 Direcciones (/account/direcciones)

#### Lista de Direcciones
- [✅ ] Direcciones guardadas se muestran
- [✅ ] Cada dirección muestra: nombre, dirección completa, teléfono
- [✅ ] Dirección por defecto marcada con badge
- [ ✅] Botón "Editar" abre formulario de edición
- [✅ ] Botón "Eliminar" muestra confirmación
- [✅ ] Confirmación de eliminación funciona
- [ ✅] No se puede eliminar si es la única dirección

#### Agregar Nueva Dirección
- [✅ ] Botón "Agregar dirección" abre formulario
- [✅ ] Formulario con todos los campos necesarios
- [✅ ] Validación de campos funciona
- [✅ ] Checkbox "Establecer como predeterminada" funciona
- [ ✅] Botón "Guardar" crea dirección en DB
- [ ✅] Nueva dirección aparece en lista
- [ ✅] Integración con checkout funciona

#### Editar Dirección
- [ ✅] Modal de edición pre-llena campos
- [ ✅] Cambios se guardan correctamente
- [✅ ] Lista se actualiza automáticamente

- Notas de direcciones: El telefono no detecta como que tienen que ser numeros, pues simplemente si escribes con letras por ejemplo igual te lo acepta sabes, el codigo postal tambien por ejemplo aunque no creo que importe tanto verdad?

### 👤 2.10 Performance y Optimización

#### Lighthouse Metrics (Chrome DevTools)
- [❓ ] Performance Score > 90
- [ ❓] First Contentful Paint < 1.5s
- [ ❓] Largest Contentful Paint < 2.5s
- [ ❓] Total Blocking Time < 300ms
- [ ❓] Cumulative Layout Shift < 0.1

#### Network Tab
- [❓ ] Total transferred < 1MB en carga inicial
- [ ❓] DOMContentLoaded < 2s
- [ ❓] Load event < 3s
- [ ❓] Imágenes en formato AVIF/WebP
- [ ❓] Gzip compression activo (response headers)

#### Lazy Loading
- [❓ ] ReviewList carga solo al hacer scroll
- [❓ ] RelatedProducts carga solo al hacer scroll
- [❓ ] Skeletons aparecen mientras cargan
- [❓ ] Imágenes cargan solo cuando entran al viewport

#### Code Splitting
- [❓ ] Vendor chunk separado (inspeccionar con DevTools)
- [❓ ] Librerías grandes en chunks separados
- [❓ ] Código común en chunk compartido

- No sé cómo hacer eso jaj

### 👤 2.11 Responsive Design

#### Mobile (< 640px)
- [ ✅] Navbar se adapta correctamente
- [ ✅] Hamburger menu funciona
- Nota: El hamburguer tiene sección ayuda donde ves guía de tallas, cambios y devoluciones y soporte whatsapp, de los cuales no funciona la guia de tallas ni cambio y devoluciones.
- [✅ ] Catálogo: 2 columnas
- [✅ ] Producto: galería stack vertical
- [✅ ] Checkout: formulario stack vertical
- [✅ ] Account: tabs en lugar de sidebar

#### Tablet (640px - 1024px)
- ✅[ ] Catálogo: 3 columnas
- [✅ ] Producto: galería en grid
- [✅ ] Checkout: formulario en 2 columnas

#### Desktop (> 1024px)
- [✅ ] Catálogo: 4 columnas
- [✅ ] Sidebar de filtros funciona
- [ ✅] Account: sidebar fijo a la izquierda
- [✅ ] Checkout: layout de 2 columnas (form + resumen)

### 👤 2.12 Email System

#### Email de Recuperación de Contraseña
- [ ] Email se envía correctamente
- [ ] Email tiene diseño HTML bonito
- [ ] Link de reset funciona
- [ ] Link expira después de 1 hora
- [ ] Muestra error si link expirado

- Si bien la funcion de email enviado me carga, en realidad lo demás tipo lo que ocurre despues que es lo importante que seria el propio email no funciona... pero no entiendo, la API key de Brevo está configurada.

actu: acabo de revisar y estas usando otro sender... el oficial es no-reply@vialineperu.com

#### Email de Confirmación de Pedido
- [ ] Email se envía después de completar orden
- [ ] Email muestra número de orden
- [ ] Email lista todos los productos
- [ ] Email muestra total
- [ ] Email muestra dirección de envío
- [ ] Email muestra método de pago

### 👤 2.13 Error Handling

#### Páginas de Error
- [ ] 404: Producto no encontrado funciona
- [ ] 404: Página no encontrada funciona
- [ ] 500: Error del servidor muestra mensaje apropiado

#### API Errors
- [ ] Error de red muestra mensaje al usuario
- [ ] Error 401 (no autorizado) redirige a login
- [ ] Error 500 muestra mensaje genérico
- [ ] Validación de formularios muestra errores claros

#### Edge Cases
- [✅ ] Carrito vacío manejado correctamente
- [✅ ] Producto sin stock no se puede agregar
- [ ✅] Checkout sin dirección muestra error
- [ ✅] Review sin login muestra error
- [✅ ] Favoritos sin login muestra error

### 👤 2.14 SEO y Meta Tags

- [ ] Títulos de página correctos (inspeccionar con View Page Source)
- [ ] Meta descriptions presentes
- [ ] Open Graph tags para compartir en redes
- [ ] URLs amigables (/producto/legging-deportivo-negro)
- [ ] Sitemap.xml generado
- [ ] Robots.txt configurado

### 👤 2.15 Accesibilidad

- [ ] Navegación con teclado funciona (Tab, Enter)
- [ ] Modales se cierran con Escape
- [ ] Imágenes tienen alt text
- [ ] Botones tienen labels descriptivos
- [ ] Contraste de colores apropiado (WCAG AA)
- [ ] Formularios tienen labels asociados

---

## 🔧 Herramientas Recomendadas para Testing Manual

### Browser DevTools
- **Network Tab**: Verificar tamaños de bundles y tiempos de carga
- **Lighthouse**: Auditoría de performance, SEO, accesibilidad
- **React DevTools**: Inspeccionar componentes y estado
- **Console**: Verificar que no hay errores

### Testing de Pagos
- **Culqi Sandbox**: Tarjetas de prueba
  - Visa: 4111111111111111
  - Mastercard: 5111111111111118
  - CVV: cualquier 3 dígitos
  - Fecha: cualquier fecha futura

### Testing de Emails
- Revisar inbox del email configurado en variables de entorno
- Verificar que no caigan en spam
- Probar links en email

### Testing Multi-dispositivo
- Chrome DevTools → Device Mode
- Probar en dispositivo real (Android/iOS)
- Probar en diferentes navegadores (Chrome, Firefox, Safari)

### Testing de Performance
```bash
# 1. Build de producción
npm run build

# 2. Revisar tamaños de chunks en output
# Buscar: Route (app) Size First Load JS

# 3. Lighthouse en Chrome DevTools
# F12 → Lighthouse → Analyze page load
```

---

## 📊 Métricas de Éxito Esperadas

### Performance
- Lighthouse Performance: **> 90**
- First Contentful Paint: **< 1.5s**
- Largest Contentful Paint: **< 2.5s**
- Bundle Size (First Load): **< 150KB**

### Funcionalidad
- **100%** de features críticas funcionando
- **0** errores en consola de producción
- **0** errores 500 en operaciones normales

### UX
- Tiempo de respuesta percibido: **< 200ms**
- Carga de imágenes: **< 1s** (con lazy loading)
- Tiempo de checkout completo: **< 2 minutos**

---

## ✅ Checklist de Pre-deployment

Antes de hacer deploy a producción:

1. [ ] Todas las variables de entorno configuradas en Vercel
2. [ ] Google OAuth configurado con URL de producción
3. [ ] Culqi en modo producción (no sandbox)
4. [ ] Base de datos con datos reales (no de prueba)
5. [ ] Emails configurados con dominio real
6. [ ] Build exitoso sin errores ni warnings
7. [ ] Lighthouse score > 90 en homepage y producto
8. [ ] Testing manual completado (mínimo 80% de checklist)
9. [ ] DNS configurado (si aplica)
10. [ ] SSL activo (Vercel lo hace automático)

---

## 📝 Notas Finales

**¿Qué NO puedo testear como Claude?**
- ❌ Interacciones de usuario (clicks, formularios)
- ❌ Visual rendering (cómo se ve en pantalla)
- ❌ JavaScript en runtime (solo puedo ver código)
- ❌ APIs externas (Culqi, emails)
- ❌ Performance real (solo puedo ver configuración)
- ❌ Responsive design visual
- ❌ Navegación entre páginas

**¿Qué SÍ puedo testear como Claude?**
- ✅ Estructura de archivos y configuración
- ✅ Sintaxis de código (TypeScript)
- ✅ Existencia de archivos y componentes
- ✅ Configuración de optimizaciones
- ✅ Database schema
- ✅ Validación de tipos
- ✅ Imports y exports
- ✅ Documentación completa

**Recomendación**: Testea primero las features críticas (login, checkout, pago) antes de features secundarias (favoritos, reseñas).
