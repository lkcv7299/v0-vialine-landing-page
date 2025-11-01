# 🎨 GUÍA: Gestión Automatizada de Imágenes

## 🚀 Solución Completa para tu Problema

Esta guía resuelve TODOS tus problemas de imágenes:
- ✅ Renombrado automático
- ✅ Conversión JPG/PNG → WebP
- ✅ Asignación de variantes de color
- ✅ Generación automática de código
- ✅ Tags y filtros automáticos

---

## 📋 OPCIÓN 1: Modo Batch (RECOMENDADO)

**Ideal si tienes muchas imágenes**

### Paso 1: Descarga tus imágenes de Google Drive

```bash
# Descarga todas las imágenes a una carpeta local
# Ejemplo: C:\Users\USER\Downloads\productos-vialine\
```

### Paso 2: Crea el archivo CSV

Abre `scripts/products-template.csv` y complétalo:

```csv
filename,product_name,color,category,audience,fabric,price,stock
DSC_001.jpg,Legging Push Up,Negro,leggings,mujer,suplex,52.00,10
DSC_001_2.jpg,Legging Push Up,Fucsia,leggings,mujer,suplex,52.00,10
DSC_002.jpg,Biker Compresión,Verde Militar,bikers,mujer,suplex,45.00,15
```

**Tips:**
- `filename`: Nombre ACTUAL del archivo
- `product_name`: Nombre descriptivo del producto
- `color`: Color de esta variante
- `category`: leggings, bikers, shorts, tops, bodys, conjuntos, buzos, polos, faldas
- `audience`: mujer, nina
- `fabric`: suplex, algodon, french-terry, ribb
- `price`: Precio en soles
- `stock`: Cantidad disponible

### Paso 3: Ejecuta el wizard

```bash
cd C:\Users\USER\projects\v0-vialine-landing-page

# Instalar dependencia si no la tienes
npm install sharp

# Ejecutar wizard
node scripts/image-wizard.js
```

### Paso 4: Selecciona opción 1 (Batch)

```
Selecciona modo:
1. Procesamiento batch (CSV/Excel)
2. Procesamiento interactivo (foto por foto)
3. Auto-detección inteligente (IA)
Opción [1-3]: 1

Ruta al archivo CSV: scripts/products-template.csv
Carpeta donde están las imágenes: C:\Users\USER\Downloads\productos-vialine
```

### Paso 5: El script hace TODO automáticamente:

1. ✅ Lee el CSV
2. ✅ Renombra: `DSC_001.jpg` → `legging-push-up-negro.webp`
3. ✅ Convierte a WebP (85% quality)
4. ✅ Agrupa variantes de color del mismo producto
5. ✅ Genera `data/products-generated.ts`
6. ✅ Crea reporte con resumen

### Paso 6: Copiar imágenes a public/products/

```bash
# Copia los .webp generados
xcopy /Y C:\Users\USER\Downloads\productos-vialine\processed\*.webp public\products\
```

### Paso 7: Revisar y mergear código

Abre `data/products-generated.ts` y copia los productos a `data/products.ts`

---

## 🖼️ OPCIÓN 2: Modo Interactivo

**Ideal si tienes pocas imágenes o quieres control total**

```bash
node scripts/image-wizard.js
# Selecciona opción 2

Carpeta donde están las imágenes: C:\Users\USER\Downloads\productos-vialine
```

El wizard te mostrará cada imagen y preguntará:
- Nombre del producto
- Color
- Categoría (menú numerado)
- Audiencia (menú numerado)
- Tela (menú numerado)
- Precio

**Ventajas:**
- Control total foto por foto
- Abre cada imagen automáticamente
- No necesitas CSV

---

## 🤖 OPCIÓN 3: IA Auto-detección (Futuro)

Usando Claude API para detectar automáticamente:
- Tipo de prenda
- Color dominante
- Características visuales

**Próximamente** (requiere API key)

---

## 📊 FLUJO COMPLETO PROFESIONAL

### ANTES (Manual - Horrible 😭)

```
1. Descargar imagen de Drive
2. Renombrar manualmente: "IMG_20240102_153045.jpg" → "legging-negro.jpg"
3. Abrir Photoshop/GIMP
4. Exportar como WebP
5. Subir a public/products/
6. Abrir products.ts
7. Copiar/pegar código de otro producto
8. Cambiar nombre, slug, precio, color...
9. Repetir 100 veces 💀
```

**Tiempo:** ~5 minutos por imagen = **8+ horas para 100 productos**

### DESPUÉS (Automatizado - Épico 🚀)

```
1. Descargar TODAS las imágenes de Drive (1 vez)
2. Completar CSV en Excel (copia/pega masivo)
3. Ejecutar: node scripts/image-wizard.js
4. Copiar webp generados a public/
5. Mergear products-generated.ts
```

**Tiempo:** ~30 minutos para 100 productos = **16x más rápido**

---

## 🎯 CASOS DE USO REALES

### Caso 1: Tienes 50 productos nuevos del fabricante

```bash
# 1. Descarga todo de Drive
# 2. Completa CSV (puedes usar Excel, hacer vlookup, etc.)
# 3. Ejecuta batch mode
node scripts/image-wizard.js
```

### Caso 2: Solo quieres agregar 3 productos

```bash
# Modo interactivo es más rápido
node scripts/image-wizard.js
# Opción 2
```

### Caso 3: Actualizar fotos de productos existentes

```bash
# 1. Renombra manualmente a los slugs existentes
# 2. Ejecuta convert-to-webp.mjs
node scripts/convert-to-webp.mjs public/products
```

---

## 🔧 HERRAMIENTAS EXTRAS

### Ver imágenes huérfanas (no usadas en products.ts)

```bash
node scripts/find-unused-images.js
```

### Detectar productos sin imagen

```bash
node scripts/find-missing-images.js
```

### Backup antes de cambios masivos

```bash
xcopy /E /I public\products public\products-backup
```

---

## ❓ FAQ

### ¿Puedo usar Google Sheets en lugar de CSV?

Sí! File → Download → CSV

### ¿Qué pasa si me equivoco en el CSV?

No hay problema, el script crea una carpeta `processed/` sin tocar los originales.

### ¿Puedo procesar en batches pequeños?

Sí, divide tu CSV en chunks y ejecuta varias veces.

### ¿Funciona en Mac/Linux?

Sí, el script es multiplataforma.

### ¿Necesito instalar ImageMagick?

No si tienes `sharp` (npm install sharp). Sharp es más rápido y no requiere software externo.

---

## 🎨 CONVENCIONES DE NAMING

El wizard genera slugs automáticamente siguiendo este patrón:

```
{nombre-producto}-{color}

Ejemplos:
- legging-push-up-negro
- biker-compresion-verde-militar
- top-cruzado-espalda-blanco
- conjunto-2-piezas-rosa-pastel
```

**Para variantes de color del mismo producto:**

```csv
DSC_001.jpg,Legging Push Up,Negro,leggings,mujer,suplex,52.00,10
DSC_002.jpg,Legging Push Up,Fucsia,leggings,mujer,suplex,52.00,10
DSC_003.jpg,Legging Push Up,Gris,leggings,mujer,suplex,52.00,10
```

El wizard detecta automáticamente que son el mismo producto y crea:
```typescript
{
  id: 1,
  slug: "legging-push-up",  // Base sin color
  name: "Legging Push Up",
  colors: [
    { name: "Negro", value: "#000000" },
    { name: "Fucsia", value: "#FF0080" },
    { name: "Gris", value: "#808080" }
  ],
  images: [
    "/products/legging-push-up-negro.webp",
    "/products/legging-push-up-fucsia.webp",
    "/products/legging-push-up-gris.webp"
  ]
}
```

---

## 📈 PRÓXIMAS MEJORAS

- [ ] Integración directa con Google Drive API (sin descargar)
- [ ] Auto-detección de colores con IA
- [ ] Generación de thumbnails automáticos
- [ ] Compresión adaptativa por tipo de prenda
- [ ] Preview de productos antes de generar código

---

## 💡 TIPS PRO

1. **Usa nombres descriptivos en CSV**: Facilita búsquedas futuras
2. **Mantén backup de imágenes originales**: Por si necesitas regenerar
3. **Exporta reportes**: Útil para auditorías y control de inventario
4. **Versiona products-generated.ts**: Antes de mergear a products.ts
5. **Batch por categorías**: Procesa leggings primero, luego tops, etc.

---

**¿Dudas?** Ejecuta:
```bash
node scripts/image-wizard.js --help
```

¡Buena suerte! 🚀
