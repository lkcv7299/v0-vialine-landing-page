# 🚀 QUICK START: Gestión de Imágenes

## TL;DR - Empezar AHORA

### Opción 1: Modo Batch (Recomendado para 10+ productos)

```bash
# 1. Edita el CSV con tus productos
# Abre: scripts/products-template.csv en Excel

# 2. Ejecuta el wizard
npm run images

# 3. Selecciona opción 1 y sigue las instrucciones
```

### Opción 2: Modo Interactivo (Para pocos productos)

```bash
# Ejecuta y selecciona opción 2
npm run images
```

---

## 📋 COMANDOS ÚTILES

```bash
# Gestión de imágenes principal
npm run images                # Wizard interactivo completo

# Auditoría
npm run images:audit          # Verifica imágenes no usadas y faltantes
npm run images:unused         # Lista imágenes sin usar
npm run images:missing        # Lista imágenes faltantes

# Conversión rápida
npm run images:webp           # Convierte JPG/PNG a WebP
```

---

## ✅ WORKFLOW TÍPICO

### Escenario: Tienes 50 nuevos productos en Google Drive

```bash
# 1️⃣ Descarga todas las fotos a una carpeta
#    Ejemplo: C:\Downloads\productos-nuevos\

# 2️⃣ Abre el template CSV
#    scripts/products-template.csv

# 3️⃣ Completa una fila por cada imagen
#    filename,product_name,color,category,audience,fabric,price,stock
#    IMG_001.jpg,Legging Clásico,Negro,leggings,mujer,suplex,45.00,10
#    IMG_002.jpg,Legging Clásico,Fucsia,leggings,mujer,suplex,45.00,10
#    ...

# 4️⃣ Ejecuta el wizard
npm run images

# 5️⃣ Opción 1 (Batch)
#    CSV: scripts/products-template.csv
#    Carpeta: C:\Downloads\productos-nuevos

# 6️⃣ Copia las imágenes procesadas
xcopy /Y C:\Downloads\productos-nuevos\processed\*.webp public\products\

# 7️⃣ Actualiza el código
#    Abre: data/products-generated.ts
#    Copia el contenido a: data/products.ts

# ✅ LISTO! 50 productos procesados en <30 minutos
```

---

## 🎯 TIPS RÁPIDOS

### Tip 1: Usa Google Sheets para el CSV

1. Crea una hoja de cálculo
2. Copia las columnas del template
3. Usa fórmulas para autocompletar
4. Descarga como CSV

### Tip 2: Productos con múltiples colores

```csv
IMG_001.jpg,Legging Push Up,Negro,leggings,mujer,suplex,52,10
IMG_002.jpg,Legging Push Up,Fucsia,leggings,mujer,suplex,52,10
IMG_003.jpg,Legging Push Up,Gris,leggings,mujer,suplex,52,10
```

El wizard detecta automáticamente que es el mismo producto y agrupa las variantes.

### Tip 3: Batch por categorías

Procesa por partes:
- Día 1: Solo leggings
- Día 2: Solo tops
- Día 3: Solo bodys

Más manejable y menos errores.

---

## 🐛 TROUBLESHOOTING

### "Error: Cannot find module 'sharp'"

```bash
npm install sharp
```

### "Imagen no encontrada: IMG_001.jpg"

Verifica que el nombre en el CSV coincide EXACTAMENTE con el archivo.

### "Carpeta no encontrada"

Usa rutas absolutas:
- ✅ `C:\Users\USER\Downloads\productos`
- ❌ `Downloads\productos`

### Las imágenes no se ven en la web

Verifica que las copiaste a `public/products/`:

```bash
dir public\products
```

---

## 📖 GUÍA COMPLETA

Para más detalles, ver: [scripts/IMAGE-MANAGEMENT-GUIDE.md](scripts/IMAGE-MANAGEMENT-GUIDE.md)

---

## ❓ PREGUNTAS FRECUENTES

**P: ¿Puedo procesar 1000 productos?**
R: Sí! Usa modo batch y divide en chunks de 100-200.

**P: ¿Qué pasa si me equivoco en el CSV?**
R: El wizard no modifica los originales. Todo va a carpeta `processed/`.

**P: ¿Necesito conocimientos técnicos?**
R: No! Solo editar CSV (Excel) y copiar/pegar archivos.

**P: ¿Funciona en Windows/Mac/Linux?**
R: Sí, en todos.

**P: ¿Cuánto tiempo tarda?**
R: ~1-2 segundos por imagen. 100 productos = ~3 minutos.

---

## 🎉 AHORA SÍ, MANOS A LA OBRA!

```bash
npm run images
```

**¿Dudas?** Revisa la guía completa o pregunta.
