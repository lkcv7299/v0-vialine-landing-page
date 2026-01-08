# Vialine Design System

Sistema de diseño para mantener consistencia visual en toda la tienda.

---

## Paleta de Colores

### Colores Primarios

| Nombre | Clase Tailwind | Uso |
|--------|----------------|-----|
| **Rosa Principal** | `rose-600` | CTAs principales, enlaces activos, badges |
| **Rosa Hover** | `rose-700` | Estados hover de CTAs |
| **Rosa Claro** | `rose-50` | Backgrounds de elementos activos |

### Colores Neutros

| Nombre | Clase Tailwind | Uso |
|--------|----------------|-----|
| **Negro** | `neutral-900` | Textos principales, headers, footer bg |
| **Gris Oscuro** | `neutral-800` | Elementos secundarios en dark mode |
| **Gris Medio** | `neutral-700` | Textos secundarios importantes |
| **Gris** | `neutral-600` | Textos secundarios, descripciones |
| **Gris Claro** | `neutral-400` | Textos en footer, placeholders |
| **Gris Muy Claro** | `neutral-200` | Bordes, divisores |
| **Fondo Claro** | `neutral-100` | Backgrounds de inputs, cards hover |
| **Fondo Principal** | `neutral-50` | Background de páginas |
| **Blanco** | `white` | Cards, modales, contenedores |

### Colores de Estado

| Estado | Background | Texto | Borde |
|--------|------------|-------|-------|
| **Pendiente** | `yellow-50` | `yellow-600` | `yellow-200` |
| **Procesando** | `blue-50` | `blue-600` | `blue-200` |
| **Enviado** | `purple-50` | `purple-600` | `purple-200` |
| **Entregado** | `green-50` | `green-600` | `green-200` |
| **Cancelado** | `red-50` | `red-600` | `red-200` |
| **Pendiente Pago** | `amber-50` | `amber-600` | `amber-200` |

---

## Tipografía

### Escala de Tamaños

| Clase | Uso |
|-------|-----|
| `text-2xl md:text-3xl` | Títulos de sección (h2) |
| `text-xl` | Títulos de cards, modales |
| `text-lg` | Subtítulos, precios destacados |
| `text-base` | Texto normal |
| `text-sm` | Texto secundario, labels |
| `text-xs` | Meta info, badges, footnotes |

### Pesos

- `font-bold` - Títulos principales, precios
- `font-semibold` - Subtítulos, botones, links importantes
- `font-medium` - Labels, énfasis suave
- Normal (sin clase) - Texto de párrafo

---

## Variantes de Botones

### Botón Primario (CTA Principal)

```html
<button class="px-6 py-3 bg-rose-600 text-white font-semibold rounded-full hover:bg-rose-700 transition-colors">
  Texto del botón
</button>
```

**Usos:** Añadir al carrito, Comprar, Finalizar compra

### Botón Secundario (Neutral)

```html
<button class="px-6 py-3 bg-neutral-900 text-white font-semibold rounded-lg hover:bg-neutral-800 transition-colors">
  Texto del botón
</button>
```

**Usos:** Acciones secundarias, Cerrar modales, Confirmar

### Botón Outline

```html
<button class="px-6 py-3 border-2 border-neutral-300 text-neutral-700 font-semibold rounded-full hover:border-neutral-400 transition-colors">
  Texto del botón
</button>
```

**Usos:** Acciones alternativas, "Ver todos", filtros inactivos

### Botón Ghost (Sin fondo)

```html
<button class="text-sm text-rose-600 hover:bg-rose-50 px-4 py-2 rounded-lg transition-colors">
  Texto del botón
</button>
```

**Usos:** Ver detalles, acciones terciarias, links en cards

### Botón Icon

```html
<button class="p-2 hover:bg-neutral-100 rounded-full transition-colors">
  <Icon class="w-5 h-5 text-neutral-700" />
</button>
```

**Usos:** Cerrar, favoritos, compartir

### Botón Disabled

```html
<button class="px-6 py-3 bg-neutral-300 text-neutral-500 font-semibold rounded-full cursor-not-allowed" disabled>
  No disponible
</button>
```

---

## Bordes y Sombras

### Border Radius

| Clase | Uso |
|-------|-----|
| `rounded-full` | Botones, badges, avatares |
| `rounded-2xl` | Cards principales |
| `rounded-xl` | Cards secundarias |
| `rounded-lg` | Inputs, botones rectangulares |

### Sombras

| Clase | Uso |
|-------|-----|
| `shadow-sm` | Cards por defecto |
| `shadow-md` | Cards en hover |
| `shadow-lg` | Modales, dropdowns |
| `shadow-2xl` | Modales importantes |

---

## Espaciado

### Padding de Secciones

```
px-4 md:px-6    → Padding horizontal de contenedores
py-12 md:py-16  → Padding vertical de secciones
```

### Max Width

```
max-w-7xl mx-auto → Contenedor principal (1280px)
max-w-4xl         → Modales grandes
max-w-md          → Forms, contenido centrado
```

---

## Transiciones

Todas las transiciones usan `transition-colors` o `transition` para suavidad.

```html
class="transition-colors"  → Para cambios de color
class="transition"         → Para múltiples propiedades
class="transition-transform" → Para hover scales
```

---

## Iconos

Usamos **Lucide React** para todos los iconos.

### Tamaños comunes

- `w-4 h-4` - En botones pequeños, badges
- `w-5 h-5` - En botones normales, navegación
- `w-6 h-6` - En headers, iconos destacados
- `w-8 h-8` - Empty states
- `w-12 h-12` - Empty states grandes

---

## Componentes Clave

### Card de Producto

```tsx
<div className="group rounded-2xl bg-white shadow-sm hover:shadow-md transition">
  {/* Imagen con aspect-square */}
  {/* Contenido con p-4 */}
</div>
```

### Modal

```tsx
{/* Backdrop */}
<div className="fixed inset-0 bg-black/50 z-50" />

{/* Modal Container */}
<div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
  {/* Header sticky con border-b */}
  {/* Content con p-6 */}
  {/* Footer sticky con border-t */}
</div>
```

### Badge de Estado

```tsx
<span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium border ${bg} ${color} ${border}`}>
  <Icon className="w-4 h-4" />
  {text}
</span>
```

---

## Responsive Breakpoints

- `sm:` → 640px
- `md:` → 768px
- `lg:` → 1024px
- `xl:` → 1280px

### Patrones comunes

```
grid-cols-1 md:grid-cols-2 lg:grid-cols-4   → Grid de productos
flex-col md:flex-row                         → Stack a row
text-sm md:text-base                         → Texto responsive
px-4 md:px-6                                 → Padding responsive
```
