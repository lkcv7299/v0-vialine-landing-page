# 🚀 AUTO-IMPORT: De Google Drive a Web en 10 Minutos

## TL;DR

```bash
# 1. Descarga carpetas de Google Drive
# 2. Ejecuta flujo automático:
npm run auto-import

# 3. Procesa imágenes:
npm run images

# 4. Copia webp a public:
xcopy /Y ...\processed\*.webp public\products\

# ✅ LISTO!
```

---

## 🎯 PROBLEMA vs SOLUCIÓN

### ❌ ANTES (Manual - 15 horas)

```
1. Abrir vialineperu.com
2. Copiar info producto por producto (200+ productos)
3. Crear CSV manualmente
4. Renombrar imágenes una por una
5. Abrir Photoshop para convertir a WebP
6. Escribir código TypeScript línea por línea
7. Llorar en posición fetal 😭
```

### ✅ AHORA (Automatizado - 10 minutos)

```
1. npm run auto-import
2. npm run images
3. xcopy
4. Café ☕
```

---

## 📦 LO QUE TIENES

```
Google Drive:
  VIALINE/
    ├─ BODY MANGA LARGA - ALGODON PREMIUM/
    │   ├─ NEGRO/ (3 fotos)
    │   ├─ FUCSIA/ (2 fotos)
    │   └─ BLANCO/ (1 foto)
    │
    ├─ LEGGING REALCE - SUPLEX LISO PREMIUM/
    │   ├─ NEGRO/ (4 fotos)
    │   ├─ VERDE/ (3 fotos)
    │   └─ GRIS/ (2 fotos)
    │
    └─ ... (18 carpetas más)

Web antigua:
  https://vialineperu.com
    → 200+ productos con toda la info
    → Precios, colores, descripciones, etc.
```

---

## 🎬 FLUJO AUTOMÁTICO

### Paso 1: Web Scraper

```bash
npm run scrape
```

**Qué hace:**
- 🕷️ Accede a vialineperu.com
- 📥 Extrae TODA la información de productos
- 💾 Guarda en `scripts/vialine-products.json`

**Extrae:**
- Nombre del producto
- Precio
- Colores disponibles
- Material/tela
- Descripción
- Tags/categorías
- Tallas disponibles

**Tiempo:** 5-10 minutos

### Paso 2: Folder Mapper

```bash
npm run map
```

Te pregunta:
```
Ruta a la carpeta raíz: C:\Users\USER\Downloads\VIALINE
```

**Qué hace:**
- 📁 Escanea tu estructura de carpetas
- 🔍 Detecta productos y colores
- 🎯 Busca match con datos scrapeados
- 📊 Genera CSV completo

**Detecta automáticamente:**
- Categoría (del nombre de carpeta)
- Material (ALGODON/SUPLEX)
- Colores (de subcarpetas)
- Encuentra precio real de la web

**Output:** `scripts/products-mapped.csv`

**Tiempo:** 30 segundos

### Paso 3: Image Wizard

```bash
npm run images
```

Opción 1 (Batch)
```
CSV: scripts/products-mapped.csv
```

**Qué hace:**
- 🖼️ Procesa TODAS las imágenes
- 🔄 Convierte JPG/PNG → WebP
- 📝 Renombra con patrón consistente
- 🎨 Detecta variantes de color
- 💻 Genera TypeScript automáticamente

**Output:**
- `...\VIALINE\processed\*.webp`
- `data/products-generated.ts`

**Tiempo:** 3-5 minutos

### Paso 4: Deploy

```bash
# Copiar imágenes
xcopy /Y C:\Users\USER\Downloads\VIALINE\processed\*.webp public\products\

# Mergear código
# Abre: data/products-generated.ts
# Copia a: data/products.ts
```

**Tiempo:** 1 minuto

---

## 📊 EJEMPLO REAL

### Input (Carpeta de Google Drive):

```
BODY MANGA LARGA - ALGODON PREMIUM/
  NEGRO/
    DSC_0023.jpg
    DSC_0024.jpg
  FUCSIA/
    DSC_0025.jpg
```

### Proceso:

**1. Scraper extrae de web:**
```json
{
  "title": "Body Manga Larga Premium",
  "price": 48.00,
  "fabric": "algodon",
  "colors": ["Negro", "Fucsia", "Blanco", "Rosa"]
}
```

**2. Mapper genera CSV:**
```csv
C:\...\NEGRO\DSC_0023.jpg,"Body Manga Larga Premium","Negro","bodys","mujer","algodon",48.00,10
C:\...\NEGRO\DSC_0024.jpg,"Body Manga Larga Premium","Negro","bodys","mujer","algodon",48.00,10
C:\...\FUCSIA\DSC_0025.jpg,"Body Manga Larga Premium","Fucsia","bodys","mujer","algodon",48.00,10
```

**3. Image Wizard genera:**
```typescript
{
  id: 1,
  slug: "body-manga-larga-premium",
  name: "Body Manga Larga Premium",
  category: "bodys",
  audience: "mujer",
  fabric: "algodon",
  price: 48.00,
  colors: [
    { name: "Negro", value: "#000000" },
    { name: "Fucsia", value: "#FF0080" }
  ],
  images: [
    "/products/body-manga-larga-premium-negro-1.webp",
    "/products/body-manga-larga-premium-negro-2.webp",
    "/products/body-manga-larga-premium-fucsia.webp"
  ]
}
```

---

## ⚙️ COMANDOS DISPONIBLES

```bash
# Flujo completo automático
npm run auto-import        # Scrape + Map (todo en uno)

# Paso a paso
npm run scrape             # Solo scraping de web
npm run map                # Solo mapeo de carpetas

# Image processing
npm run images             # Image wizard completo
npm run images:audit       # Auditoría de imágenes
npm run images:webp        # Solo conversión WebP

# Debugging
cat scripts/vialine-products.json    # Ver datos scrapeados
cat scripts/products-mapped.csv      # Ver CSV generado
```

---

## 🛡️ VENTAJAS

### ✅ Precisión
- Usa información REAL de la web
- No hay que inventar precios o descripciones
- Colores detectados automáticamente

### ✅ Velocidad
- 90x más rápido que manual
- Procesa 200 productos en minutos
- Sin intervención humana

### ✅ Consistencia
- Naming pattern uniforme
- Todos los WebP con 85% quality
- Estructura de datos estándar

### ✅ Trazabilidad
- Reportes completos
- CSV intermedio editable
- Logs detallados

### ✅ Escalabilidad
- Funciona con 10 o 1000 productos
- Batch processing eficiente
- Reutilizable para futuras importaciones

---

## 🔧 CONFIGURACIÓN AVANZADA

### Ajustar URLs de scraping

Edita `scripts/scrape-vialine.js`:

```javascript
const CATEGORIES = [
  '/categoria-producto/mujer/',
  '/categoria-producto/nina/',
  '/mi-categoria-custom/'  // Agregar nuevas
]
```

### Ajustar detección de categorías

Edita `scripts/map-folders-to-products.js`:

```javascript
function extractCategoryFromFolderName(folderName) {
  if (normalized.includes('mi-prenda')) return 'mi-categoria'
  // ... más reglas
}
```

### Ajustar detección de materiales

```javascript
function extractFabricFromFolderName(folderName) {
  if (normalized.includes('mi-tela')) return 'mi-fabric'
  // ... más reglas
}
```

---

## 🎓 TROUBLESHOOTING

### "Error scraping: 403 Forbidden"

La web puede tener protección anti-bot.

**Solución A:** Usa delay más largo
```javascript
await new Promise(resolve => setTimeout(resolve, 3000)) // 3 seg
```

**Solución B:** Usa navegador headless (Puppeteer)

Te puedo crear versión avanzada si es necesario.

### "No encuentra match para algunos productos"

Normal si los nombres de carpetas son muy diferentes.

El mapper usa **defaults inteligentes**:
- Precio: 45.00
- Stock: 10
- Categoría: detectada del nombre

Puedes ajustar el CSV generado manualmente antes de procesarlo.

### "Estructura de carpetas diferente"

Soporta:
```
✅ Producto/ → Color/ → Imágenes
✅ Producto/ → Imágenes (sin subcarpetas)
```

Si tienes otra estructura, avísame.

---

## 📖 DOCUMENTACIÓN COMPLETA

- [SCRAPING-GUIDE.md](SCRAPING-GUIDE.md) - Guía detallada
- [IMAGES-QUICK-START.md](IMAGES-QUICK-START.md) - Quick start
- [scripts/IMAGE-MANAGEMENT-GUIDE.md](scripts/IMAGE-MANAGEMENT-GUIDE.md) - Guía completa

---

## 🎉 RESULTADO FINAL

```
Input:  20 carpetas caóticas en Google Drive
        Web antigua con info dispersa

Output: Sistema organizado con:
        ✅ 200+ productos importados
        ✅ Info real de la web
        ✅ Imágenes optimizadas WebP
        ✅ Código TypeScript generado
        ✅ Variantes de color agrupadas

Tiempo: 10 minutos
vs
Manual: 15 horas

Ahorro: 14.5 horas = TU CORDURA 🧠
```

---

**¿Listo para empezar?**

```bash
npm run auto-import
```

🚀
