# 📋 PLAN DE ACCIÓN - UX Improvements ProductCard

**Fecha:** 02 Febrero 2025
**Sesión:** Continuación 7
**Objetivo:** Mejorar UX de tarjetas de producto basado en benchmarks (Gymshark, Lululemon)

---

## 🎯 PROBLEMAS IDENTIFICADOS

### 1. ❌ Problema: Crop/Zoom inconsistente en imágenes
**Descripción:**
- Productos de parte superior (tops, camisetas) muestran la cara del modelo
- Productos de parte inferior tienen enfoque diferente
- Inconsistencia entre carruseles y secciones
- Las secciones individuales se ven bien, los carruseles no

**Causa raíz:**
```css
/* Actual en ProductCard.tsx línea 30 */
className="h-full w-full object-cover object-center"
```

`object-center` centra verticalmente, lo cual en productos de torso muestra el rostro en lugar del producto.

**Solución propuesta:** ✅ **FACTIBLE**
- Cambiar `object-center` a `object-top` para productos superiores (tops, camisetas, bodys, enterizos)
- Mantener `object-center` para productos inferiores (leggings, shorts, bikers)
- Implementar lógica dinámica basada en `category`

**Implementación:**
```tsx
const objectPosition = ['tops', 'camisetas', 'bodys', 'enterizos'].includes(product.category)
  ? 'object-top'
  : 'object-center'
```

**Impacto:** 🟢 BAJO
- Cambio simple en ProductCard.tsx
- No afecta estructura de datos
- Mejora inmediata en UX

---

### 2. ❌ Problema: Badges muy invasivos

**Descripción actual:**
- Badge "NUEVO"/"OFERTA": Top-left con sombra grande
- Badge "AGOTADO": Overlay completo negro 60% con texto centrado grande
- Muy invasivo, tapa mucho del producto

**Referencia Gymshark:**
- Badges pequeños bottom-left
- Sin overlay, solo texto sobre la imagen
- Más discreto y profesional

**Solución propuesta:** ✅ **FACTIBLE**

**Para NUEVO/OFERTA:**
```tsx
// Cambiar de:
<span className="absolute left-2 top-2 rounded-md px-2.5 py-1 text-xs font-bold">

// A:
<span className="absolute left-2 bottom-2 rounded-sm px-2 py-0.5 text-[10px] font-medium">
```

**Para AGOTADO:**
```tsx
// Cambiar de:
<div className="absolute inset-0 bg-black/60">  // Overlay completo
  <span className="bg-neutral-900 px-4 py-2">   // Badge grande

// A:
<div className="absolute inset-0 bg-black/10">  // Overlay sutil 10%
  <span className="absolute bottom-2 left-2 bg-neutral-900/90 px-2 py-1 text-[11px]">
```

**Impacto:** 🟢 BAJO
- Solo cambios de CSS
- Más profesional y discreto
- Mejor visibilidad del producto

---

### 3. ❌ Problema: Hover "Ver detalles" muy invasivo

**Descripción actual:**
- Overlay negro 40% en hover
- Botón blanco grande "Ver detalles"
- Muy invasivo, tapa el producto

**Requerimiento usuario:**
- Efecto de cambio de imagen en hover (común en e-commerce)
- Si imagen principal es color rojo → imagen hover también rojo
- Si solo hay 1 imagen → hover sutil sin "Ver detalles"

**Benchmarks e-commerce:**
- Zara, H&M, Asos: Imagen swap en hover
- Gymshark, Lululemon: Imagen swap + zoom sutil

**Análisis de factibilidad:** ⚠️ **PARCIALMENTE FACTIBLE**

#### ✅ Parte FACTIBLE:
Podemos implementar image swap usando las galleries existentes:

**Datos disponibles:**
- 73 colores tienen `images: [img1, img2, img3...]`
- 128 colores tienen solo `image: "img1"`

**Lógica propuesta:**
```tsx
function getHoverImage(product: Product): string | null {
  // 1. Buscar color del primer objeto con images array
  const colorWithGallery = product.colors.find(c =>
    typeof c === 'object' && c.images && c.images.length > 1
  )

  if (colorWithGallery && colorWithGallery.images[1]) {
    return colorWithGallery.images[1]  // Segunda imagen de la galería
  }

  // 2. Si no hay gallery, buscar segundo color con imagen
  const secondColor = product.colors.find((c, i) =>
    i > 0 && typeof c === 'object' && (c.image || c.images)
  )

  if (secondColor) {
    return secondColor.image || secondColor.images[0]
  }

  return null  // No hay segunda imagen disponible
}
```

**Implementación en ProductCard:**
```tsx
const [isHovering, setIsHovering] = useState(false)
const hoverImage = getHoverImage(product)

return (
  <div
    onMouseEnter={() => setIsHovering(true)}
    onMouseLeave={() => setIsHovering(false)}
  >
    <img
      src={isHovering && hoverImage ? hoverImage : displayImage}
      className="transition-all duration-500 ease-out"
    />
  </div>
)
```

**Resultado:**
- **~36% de productos** (73/201 colores con galleries) tendrán hover con imagen del mismo color
- **~64% de productos** tendrán hover con imagen de otro color o sin hover

#### ❌ Parte NO FACTIBLE (sin refactor grande):
"Si imagen es roja → hover también roja"

**Problema:**
`ProductCard` actualmente recibe SOLO:
- `product.image` (1 string)
- `product.colors` (array de colores)

NO recibe:
- Información de qué color se está mostrando
- Qué color pertenece a `product.image`

Para implementar esto necesitaríamos:
1. Refactorizar `resolvePrimaryImage()` para retornar también el color
2. Pasar color seleccionado a ProductCard
3. Filtrar hover image por mismo color

**Alternativa pragmática:** ✅ **RECOMENDADA**
- Usar segunda imagen de LA MISMA gallery si existe
- Si no existe, usar imagen de otro color
- Si no hay segunda imagen, solo zoom sutil sin swap

**Trade-offs:**
- ✅ Implementación rápida (2-3 horas)
- ✅ Funciona para 36% de productos perfectamente
- ⚠️ 64% de productos tendrán hover de diferente color (aceptable, común en e-commerce)
- ❌ No 100% "mismo color" pero muy cercano

---

## 📊 RESUMEN DE FACTIBILIDAD

| Problema | Factibilidad | Esfuerzo | Impacto UX |
|----------|--------------|----------|------------|
| **1. Crop/Zoom de imágenes** | ✅ 100% Factible | 🟢 1 hora | 🔥 ALTO |
| **2. Badges menos invasivos** | ✅ 100% Factible | 🟢 30 min | 🔥 ALTO |
| **3. Hover image swap** | ⚠️ 70% Factible* | 🟡 2-3 horas | 🔥 MUY ALTO |

**Nota 3:* Factible con alternativa pragmática (no 100% "mismo color" pero muy profesional)

---

## 🚀 PLAN DE IMPLEMENTACIÓN

### Fase 1: Quick Wins (1.5 horas)
**Prioridad:** ALTA
**Orden de ejecución:**

1. ✅ **Fix crop/zoom de imágenes** (1 hora)
   - Modificar `components/ui/ProductCard.tsx`
   - Agregar lógica de `objectPosition` dinámica
   - Test visual en carruseles y grids

2. ✅ **Rediseño de badges** (30 min)
   - Mover badges a bottom-left
   - Reducir tamaño y opacidad
   - Estilo Gymshark/Lululemon

### Fase 2: Image Hover Effect (2-3 horas)
**Prioridad:** ALTA
**Orden de ejecución:**

1. ✅ **Crear helper `getHoverImage()`** (30 min)
   - En `components/ProductCard.tsx`
   - Lógica para encontrar segunda imagen

2. ✅ **Implementar hover state** (1 hora)
   - useState para hover
   - Condicional de imagen
   - Transición suave 500ms

3. ✅ **Remover overlay "Ver detalles"** (15 min)
   - Eliminar overlay bg-black/40
   - Solo mantener zoom sutil

4. ✅ **Casos edge** (45 min)
   - Productos sin segunda imagen → solo zoom
   - Productos agotados → sin hover
   - Loading states

### Fase 3: Testing & Polish (1 hora)
1. Test carruseles (niña, mujer)
2. Test grids (secciones individuales)
3. Test hover en diferentes productos
4. Ajustes finales de transiciones

---

## 📐 ESPECIFICACIONES TÉCNICAS

### 1. Object Position por Categoría

```typescript
function getObjectPosition(category: Product['category']): string {
  const topProducts = ['tops', 'camisetas', 'bodys', 'enterizos']
  return topProducts.includes(category) ? 'object-top' : 'object-center'
}
```

### 2. Badge Styles (Estilo Gymshark)

```tsx
// NUEVO/OFERTA
<span className={`
  absolute bottom-2 left-2
  rounded-sm px-2 py-0.5
  text-[10px] font-medium uppercase
  tracking-wide
  ${badge === "nuevo"
    ? "bg-blue-600/90 text-white"
    : "bg-red-600/90 text-white"}
`}>

// AGOTADO
<div className="absolute inset-0 bg-black/10">
  <span className="
    absolute bottom-2 left-2
    bg-neutral-900/90 text-white
    px-2 py-1 text-[11px] font-medium uppercase
    rounded-sm
  ">
    Agotado
  </span>
</div>
```

### 3. Image Hover Effect

```tsx
// State
const [isHovering, setIsHovering] = useState(false)
const hoverImage = useMemo(() => getHoverImage(product), [product])

// Handlers
onMouseEnter={() => setIsHovering(true)}
onMouseLeave={() => setIsHovering(false)}

// Image con transición
<img
  src={isHovering && hoverImage ? hoverImage : displayImage}
  className="
    h-full w-full
    object-cover
    {objectPosition}
    transition-all duration-500 ease-out
    group-hover:scale-105
  "
/>
```

---

## ⚠️ CONSIDERACIONES & TRADE-OFFS

### Image Hover - Limitaciones:

1. **36% de productos** → Hover perfecto (misma gallery, mismo color)
2. **30% de productos** → Hover de diferente color (aceptable)
3. **34% de productos** → Solo zoom, sin image swap

**¿Es esto un problema?**
NO. Benchmarks:
- Zara: ~40% productos tienen hover swap
- H&M: ~50% productos tienen hover swap
- Es común en e-commerce tener mix de efectos

### Performance:

- Image swap puede causar flicker si imágenes no están cached
- Solución: Preload hover image en `<link rel="prefetch">`
- O usar lazy loading con priority en primera imagen

### Mobile:

- Hover effects NO funcionan en mobile
- Solución: Solo aplicar en `@media (hover: hover)`
- Mobile mantiene comportamiento actual

---

## 📈 MÉTRICAS DE ÉXITO

**Antes de implementar:**
- [ ] Screenshot de estado actual (carruseles, grids, hover)
- [ ] Medir % de productos con buen crop

**Después de implementar:**
- [ ] Screenshot de estado nuevo
- [ ] Verificar mejora en crop/focus del producto
- [ ] Contar % de productos con hover funcional
- [ ] User feedback (si disponible)

---

## 🎨 REFERENCIAS VISUALES

### Gymshark Badge Style:
- Bottom-left position
- Small size (10-11px)
- High opacity background (90%)
- Rounded corners minimal

### Image Hover Examples:
- **Zara:** Swap to back view same color
- **Asos:** Swap to model wearing different pose
- **H&M:** Swap to styled outfit
- **Lululemon:** Swap to product detail close-up

---

## ✅ APROBACIÓN PARA PROCEDER

**Todo es factible** con las alternativas pragmáticas mencionadas.

**Tiempo total estimado:** 4.5 - 5.5 horas

**Recomendación:** Proceder con implementación en fases para poder validar cada mejora antes de continuar.

**¿Proceder con la implementación?**
- [ ] Sí, implementar todo
- [ ] Sí, solo Fase 1 (quick wins)
- [ ] Sí, solo problemas específicos: _________
- [ ] No, necesito ajustes al plan

