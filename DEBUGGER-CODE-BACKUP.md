# Sistema de Image Framing - Código de Debugger

**Fecha:** 2025-11-05
**Propósito:** Sistema de ajuste visual de imágenes con aislamiento por contexto

## Archivos del Sistema

### 1. `contexts/ImageFramingContext.tsx`
Sistema de contexto que maneja el modo framing y guardado de transforms con aislamiento por contexto (card/rail/gallery).

### 2. `hooks/useImageTransform.ts`
Hook que carga transforms guardados desde localStorage con filtrado estricto por contexto.

### 3. `components/ImageFramingPanel.tsx`
Panel flotante de controles para ajustar imágenes individuales y ajustes globales.

### 4. `lib/imageTransformUtils.ts`
Utilidad para parsear rutas de imágenes y extraer productSlug, colorSlug, imageIndex.

### 5. `contexts/ImageDebugContext.tsx`
Contexto para valores globales de ajuste (tops/bottoms).

### 6. Components UI:
- `components/ui/button.tsx`
- `components/ui/slider.tsx`
- `components/ui/input.tsx`
- `components/ui/label.tsx`

## Cómo Activar

1. Presionar `Ctrl+Shift+F` en cualquier página
2. Click en cualquier imagen de producto
3. Ajustar con los controles del panel flotante
4. Se guarda automáticamente en localStorage con debounce de 300ms

## Estructura de Datos

```json
{
  "[productSlug]": {
    "[colorSlug]": {
      "[imageIndex]": {
        "[context]": {
          "x": number,
          "y": number,
          "scale": number,
          "context": "card" | "rail" | "gallery"
        }
      }
    }
  }
}
```

## Prioridad de Transforms

1. **Máxima**: Transform individual del debugger (por producto/color/imagen/contexto)
2. **Media**: Ajustes globales (railTopScale, railBottomScale, etc.)
3. **Baja**: Valores por defecto en código

## Para Usar en el Futuro

1. Mantener todos los archivos listados arriba
2. El componente `ImageFramingPanel` debe estar en `app/layout.tsx`
3. Los providers deben envolver la app
4. Los transforms se exportan con el botón "Exportar Todo"

## Notas Importantes

- El sistema se puede activar/desactivar con `Ctrl+Shift+F`
- Presionar `ESC` para salir del modo framing
- Los transforms son completamente aislados por contexto
- No hay conflictos entre home carousel, /mujer cards, y galería de producto
