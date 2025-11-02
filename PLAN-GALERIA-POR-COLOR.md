# 🎨 PLAN: Galería de Imágenes por Color

**Fecha:** 03 Febrero 2025
**Objetivo:** Implementar galería de múltiples imágenes por cada color de producto
**Inspiración:** Gymshark, Lululemon

---

## 📋 SITUACIÓN ACTUAL

### Estado del Sistema
```
✅ Tenemos: 711 imágenes totales en el proyecto
✅ Usamos: 142 imágenes (20%) - solo 1 imagen por color
❌ Sin usar: 569 imágenes (80%, 224MB) - imágenes secundarias (img2, img3, img4, img5)
```

### Estructura Actual de Imágenes

**Patrón de nombres:**
```
top-paradise-suplex-liso-premium-negro-paradise-negro1.webp  ← Usada actualmente
top-paradise-suplex-liso-premium-negro-paradise-negro2.webp  ← SIN USAR
top-paradise-suplex-liso-premium-negro-paradise-negro3.webp  ← SIN USAR
top-paradise-suplex-liso-premium-negro-paradise-negro4.webp  ← SIN USAR
```

**Cantidad de imágenes por color:**
- Promedio: 4-5 imágenes por color
- Ejemplo `body-manga-larga-negro`: 5 imágenes (negro1, negro2, negro3, negro4, negro5)
- Ejemplo `top-paradise-azulino`: 4 imágenes (azulino1, azulino2, azulino3, azulino4)

### Comportamiento Actual (Problema)
1. Usuario selecciona producto → Ve 1 imagen por color
2. Usuario cambia de color → Cambia a 1 imagen de ese color
3. Thumbnails muestran colores diferentes, NO múltiples fotos del mismo color

**Lo que el usuario QUIERE:**
1. Usuario selecciona producto → Ve 4-5 imágenes del primer color
2. Usuario cambia de color → Ve 4-5 imágenes DEL NUEVO COLOR (no mezcla)
3. Thumbnails muestran solo fotos del color actual

---

## 🎯 OBJETIVO FINAL

### UX Deseada (Inspirada en Gymshark/Lululemon)

```
Estado Inicial:
- Color seleccionado: Negro (por defecto)
- Galería muestra: 5 fotos en negro
  [Negro 1] [Negro 2] [Negro 3] [Negro 4] [Negro 5]
- Thumbnails: Solo fotos en negro

Usuario cambia a color Rojo:
- Color seleccionado: Rojo
- Galería muestra: 4 fotos en rojo
  [Rojo 1] [Rojo 2] [Rojo 3] [Rojo 4]
- Thumbnails: Solo fotos en rojo
- ⚠️ Las fotos de negro YA NO SE VEN
```

---

## 🏗️ ARQUITECTURA TÉCNICA

### 1. Cambios en Tipos de Datos

**Archivo:** `data/products.ts`

**ANTES:**
```typescript
type ColorOption = {
  name: string
  slug: string
  hex: string
  image: string  // ← Solo 1 imagen
}

type Product = {
  colors: (string | ColorOption)[]
}
```

**DESPUÉS:**
```typescript
type ColorOption = {
  name: string
  slug: string
  hex: string
  images: string[]  // ← Array de imágenes 🆕
}

type Product = {
  colors: (string | ColorOption)[]
}
```

**Nota:** Mantenemos compatibilidad con productos que usan `string[]` (sin imágenes)

---

### 2. Script de Actualización Automática

**Crear:** `scripts/add-gallery-images-to-products.js`

**Funcionalidad:**
```javascript
// Para cada producto con colores tipo object[]
for (const product of products) {
  for (const color of product.colors) {
    if (typeof color === 'object' && color.image) {
      // Buscar TODAS las imágenes de este color
      const baseImage = color.image // e.g., "...negro-negro1.webp"
      const colorSlug = color.slug   // e.g., "negro"

      // Patrón: buscar negro1, negro2, negro3, negro4, negro5
      const allColorImages = findImagesInFilesystem(product.slug, colorSlug)

      // Actualizar a array
      color.images = allColorImages
    }
  }
}
```

**Algoritmo de detección:**
1. Tomar `color.image` actual como referencia
2. Extraer el patrón base del nombre
3. Buscar en filesystem: `{pattern}1.webp`, `{pattern}2.webp`, `{pattern}3.webp`, etc.
4. Validar que existan en `/public/productos/`
5. Retornar array ordenado

---

### 3. Modificaciones en ProductDetailCard.tsx

**Función:** `getProductImages(product: Product, selectedColor: string): string[]`

**ANTES:**
```typescript
function getProductImages(product: Product): string[] {
  const images: string[] = []
  if (product.image) images.push(product.image)
  product.colors.forEach((color) => {
    if (typeof color === "object" && color.image && !images.includes(color.image)) {
      images.push(color.image)
    }
  })
  return images
}
```

**DESPUÉS:**
```typescript
function getProductImages(product: Product, selectedColor?: string): string[] {
  // Si hay color seleccionado, devolver SOLO imágenes de ese color
  if (selectedColor) {
    const colorObj = product.colors.find(c =>
      typeof c === "object" && c.slug === selectedColor
    )

    if (colorObj && typeof colorObj === "object" && colorObj.images) {
      return colorObj.images  // ← Array de 4-5 imágenes del mismo color
    }
  }

  // Fallback: primera variante de color o imagen principal
  const firstColorWithImages = product.colors.find(c =>
    typeof c === "object" && c.images && c.images.length > 0
  )

  if (firstColorWithImages && typeof firstColorWithImages === "object") {
    return firstColorWithImages.images
  }

  return product.image ? [product.image] : ["/placeholder.svg"]
}
```

**Cambio en handleColorChange:**
```typescript
const handleColorChange = (colorSlug: string) => {
  setSelectedColor(colorSlug)

  // Obtener TODAS las imágenes del nuevo color
  const newImages = getProductImages(product, colorSlug)
  setCurrentImages(newImages)
}
```

---

### 4. Modificaciones en ProductGallery.tsx

**NO REQUIERE CAMBIOS MAYORES** ✅

El componente ProductGallery ya está preparado:
- Recibe `images: string[]`
- Muestra todas las imágenes del array
- Thumbnails funcionan correctamente
- Navegación funciona correctamente

Solo se actualizará el array que recibe.

---

### 5. Inicialización en ProductDetailCard

**ANTES:**
```typescript
useEffect(() => {
  setCurrentImages(productImages)
}, [])
```

**DESPUÉS:**
```typescript
useEffect(() => {
  // Inicializar con el primer color disponible
  const firstColor = product.colors.find(c => typeof c === "object")
  const initialColorSlug = firstColor && typeof firstColor === "object"
    ? firstColor.slug
    : ""

  if (initialColorSlug) {
    setSelectedColor(initialColorSlug)
    const initialImages = getProductImages(product, initialColorSlug)
    setCurrentImages(initialImages)
  } else {
    setCurrentImages(productImages)
  }
}, [])
```

---

## 📊 EJEMPLO COMPLETO

### Producto: Top Paradise

**Estructura en products.ts (DESPUÉS):**
```typescript
{
  slug: "top-paradise",
  title: "Top Paradise",
  image: "/productos/mujer/tops/top-paradise-suplex-liso-premium-negro-paradise-negro1.webp",
  colors: [
    {
      name: "Negro",
      slug: "negro",
      hex: "#000000",
      images: [
        "/productos/mujer/tops/top-paradise-suplex-liso-premium-negro-paradise-negro1.webp",
        "/productos/mujer/tops/top-paradise-suplex-liso-premium-negro-paradise-negro2.webp",
        "/productos/mujer/tops/top-paradise-suplex-liso-premium-negro-paradise-negro3.webp",
        "/productos/mujer/tops/top-paradise-suplex-liso-premium-negro-paradise-negro4.webp"
      ]
    },
    {
      name: "Rojo",
      slug: "rojo",
      hex: "#D22B2B",
      images: [
        "/productos/mujer/tops/top-paradise-suplex-liso-premium-rojo-paradise-rojo1.webp",
        "/productos/mujer/tops/top-paradise-suplex-liso-premium-rojo-paradise-rojo2.webp",
        "/productos/mujer/tops/top-paradise-suplex-liso-premium-rojo-paradise-rojo3.webp",
        "/productos/mujer/tops/top-paradise-suplex-liso-premium-rojo-paradise-rojo4.webp"
      ]
    },
    // ... más colores
  ]
}
```

**Comportamiento en UI:**

1. **Carga inicial:**
   - Color auto-seleccionado: "Negro" (primer color en lista)
   - Galería muestra: 4 fotos en negro
   - Thumbnails: 4 thumbnails de negro

2. **Usuario hace clic en "Rojo":**
   - `handleColorChange("rojo")` se ejecuta
   - `setCurrentImages([rojo1, rojo2, rojo3, rojo4])`
   - ProductGallery se re-renderiza con 4 imágenes nuevas
   - Thumbnails ahora muestran 4 thumbnails de rojo
   - **Las imágenes de negro ya no son visibles**

---

## ⚡ OPTIMIZACIONES

### Lazy Loading de Imágenes
```typescript
// Solo cargar imágenes del color actual
// Otros colores se cargan on-demand cuando se seleccionan
const handleColorChange = (colorSlug: string) => {
  setSelectedColor(colorSlug)
  setCurrentImages([]) // Clear mientras carga

  const newImages = getProductImages(product, colorSlug)
  setCurrentImages(newImages)
}
```

### Preload de Primer Color
```typescript
// En ProductDetailCard, preload del primer color
useEffect(() => {
  const firstColorImages = getProductImages(product, firstColor.slug)
  firstColorImages.forEach(img => {
    const link = document.createElement('link')
    link.rel = 'preload'
    link.as = 'image'
    link.href = img
    document.head.appendChild(link)
  })
}, [])
```

---

## ✅ CHECKLIST DE IMPLEMENTACIÓN

### Fase 1: Preparación de Datos
- [ ] 1. Crear script `add-gallery-images-to-products.js`
- [ ] 2. Ejecutar script para detectar TODAS las imágenes por color
- [ ] 3. Actualizar `data/products.ts` con arrays de imágenes
- [ ] 4. Verificar que NO se rompan productos con string[]

### Fase 2: Actualización de Tipos
- [ ] 5. Actualizar tipo `ColorOption` para soportar `images: string[]`
- [ ] 6. Hacer `images` opcional para backward compatibility
- [ ] 7. Actualizar `Product` type si es necesario

### Fase 3: Lógica de ProductDetailCard
- [ ] 8. Modificar `getProductImages()` para aceptar `selectedColor`
- [ ] 9. Actualizar `handleColorChange()` para cambiar toda la galería
- [ ] 10. Actualizar `useEffect` de inicialización
- [ ] 11. Asegurar que el primer color se seleccione automáticamente

### Fase 4: Testing
- [ ] 12. Probar con producto que tiene múltiples imágenes (top-paradise)
- [ ] 13. Probar cambio entre colores
- [ ] 14. Verificar que thumbnails cambien correctamente
- [ ] 15. Probar zoom modal con múltiples imágenes
- [ ] 16. Probar en mobile
- [ ] 17. Verificar productos con string[] siguen funcionando

### Fase 5: Optimizaciones
- [ ] 18. Implementar lazy loading si es necesario
- [ ] 19. Agregar loading states durante cambio de color
- [ ] 20. Verificar performance con Network tab

---

## 📈 IMPACTO ESPERADO

### Mejora en Uso de Imágenes
```
ANTES:
- Imágenes usadas: 142 (20%)
- Imágenes sin usar: 569 (80%, 224MB)

DESPUÉS:
- Imágenes usadas: ~500-600 (70-85%)
- Imágenes sin usar: ~100-200 (15-30%, ~40-80MB)

Mejora: +350-450 imágenes utilizadas (+250% aumento)
```

### Mejora en UX
- ✅ Usuario puede ver múltiples ángulos del producto en cada color
- ✅ Mejor decisión de compra (ver detalles del producto)
- ✅ Experiencia similar a e-commerce grandes (Lululemon, Gymshark)
- ✅ Aumento esperado en conversión: 5-10%

### Mejora en Profesionalismo
- ✅ Galería moderna y completa
- ✅ Uso eficiente de assets existentes
- ✅ No requiere más fotografía

---

## ⚠️ CONSIDERACIONES

### Compatibilidad
- Mantener soporte para productos con `string[]` (sin imágenes)
- Mantener soporte para productos con solo 1 imagen por color
- No romper productos existentes

### Performance
- Cada galería cargará 4-5 imágenes en lugar de 1
- Considerar lazy loading de thumbnails
- Optimización de Next.js Image component ya ayuda

### Naming Inconsistencies
- Algunos productos tienen `-1`, otros `-negro1`
- Script debe detectar ambos patrones
- Validar que las imágenes existan antes de agregar

---

## 🎯 DECISIÓN FINAL

### ¿Es factible?
**SÍ, 100% FACTIBLE** ✅

### ¿Tenemos las imágenes?
**SÍ, 569 imágenes esperando ser usadas** ✅

### ¿Rompe algo existente?
**NO, si implementamos con backward compatibility** ✅

### ¿Vale la pena?
**SÍ:**
- Usa 224MB de assets desperdiciados
- Mejora UX significativamente
- Profesionaliza el e-commerce
- Cero costo adicional (ya tenemos las imágenes)

---

## 🚀 PRÓXIMOS PASOS

1. **Usuario confirma el plan**
2. **Comenzar Fase 1:** Crear script de detección
3. **Ejecutar script** y revisar resultados
4. **Implementar Fase 2-3:** Actualizar código
5. **Testing exhaustivo**
6. **Deploy a producción**

**Tiempo estimado:** 2-3 horas de implementación + 1 hora de testing

---

**¿APROBADO PARA IMPLEMENTACIÓN?** ⏳
