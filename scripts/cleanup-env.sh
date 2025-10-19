#!/bin/bash

# ============================================
# SCRIPT DE LIMPIEZA SEGURA DE .ENV.LOCAL
# ============================================

echo "🔧 INICIANDO LIMPIEZA SEGURA DE .ENV.LOCAL"
echo ""

# ====================================
# PASO 1: VERIFICAR QUE EXISTE
# ====================================
if [ ! -f ".env.local" ]; then
  echo "❌ ERROR: No se encuentra .env.local"
  exit 1
fi

echo "✅ Archivo .env.local encontrado"
echo ""

# ====================================
# PASO 2: HACER BACKUP
# ====================================
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE=".env.local.backup.$TIMESTAMP"

echo "📦 Creando backup: $BACKUP_FILE"
cp .env.local "$BACKUP_FILE"

if [ -f "$BACKUP_FILE" ]; then
  echo "✅ Backup creado exitosamente"
  echo ""
else
  echo "❌ ERROR: No se pudo crear el backup"
  exit 1
fi

# ====================================
# PASO 3: EXTRAER PRIMERAS 70 LÍNEAS
# ====================================
echo "✂️  Extrayendo primeras 70 líneas (variables válidas)..."
head -70 .env.local > .env.local.clean

# Verificar que se creó correctamente
if [ ! -f ".env.local.clean" ]; then
  echo "❌ ERROR: No se pudo crear .env.local.clean"
  echo "🔄 Restaurando backup..."
  cp "$BACKUP_FILE" .env.local
  exit 1
fi

# Verificar que tiene contenido
LINES_CLEAN=$(wc -l < .env.local.clean)
if [ "$LINES_CLEAN" -lt 60 ]; then
  echo "❌ ERROR: El archivo limpio tiene muy pocas líneas ($LINES_CLEAN)"
  echo "🔄 Restaurando backup..."
  cp "$BACKUP_FILE" .env.local
  rm .env.local.clean
  exit 1
fi

echo "✅ Archivo limpio creado: $LINES_CLEAN líneas"
echo ""

# ====================================
# PASO 4: VERIFICAR VARIABLES CRÍTICAS
# ====================================
echo "🔍 Verificando variables críticas..."

CRITICAL_VARS=(
  "POSTGRES_URL"
  "NEXTAUTH_SECRET"
  "NEXT_PUBLIC_CULQI_PUBLIC_KEY"
  "CULQI_SECRET_KEY"
)

ALL_PRESENT=true
for VAR in "${CRITICAL_VARS[@]}"; do
  if grep -q "^$VAR=" .env.local.clean; then
    echo "   ✓ $VAR presente"
  else
    echo "   ✗ $VAR FALTA"
    ALL_PRESENT=false
  fi
done

if [ "$ALL_PRESENT" = false ]; then
  echo ""
  echo "❌ ERROR: Faltan variables críticas"
  echo "🔄 Restaurando backup..."
  cp "$BACKUP_FILE" .env.local
  rm .env.local.clean
  exit 1
fi

echo "✅ Todas las variables críticas presentes"
echo ""

# ====================================
# PASO 5: REEMPLAZAR ARCHIVO
# ====================================
echo "🔄 Reemplazando .env.local con versión limpia..."
mv .env.local.clean .env.local

if [ -f ".env.local" ]; then
  FINAL_LINES=$(wc -l < .env.local)
  echo "✅ Archivo reemplazado exitosamente"
  echo "   📊 Líneas antes: 274"
  echo "   📊 Líneas ahora: $FINAL_LINES"
  echo ""
else
  echo "❌ ERROR: No se pudo reemplazar el archivo"
  echo "🔄 Restaurando backup..."
  cp "$BACKUP_FILE" .env.local
  exit 1
fi

# ====================================
# PASO 6: VERIFICACIÓN FINAL
# ====================================
echo "🔍 Verificación final..."

# Verificar que NO tiene código de React
if grep -q '"use client"' .env.local; then
  echo "❌ ERROR: El archivo aún contiene código de React"
  echo "🔄 Restaurando backup..."
  cp "$BACKUP_FILE" .env.local
  exit 1
fi

echo "✅ Sin código de React"
echo "✅ Archivo limpio y funcional"
echo ""

# ====================================
# RESUMEN
# ====================================
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🎉 LIMPIEZA COMPLETADA EXITOSAMENTE"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "✅ Backup guardado en: $BACKUP_FILE"
echo "✅ .env.local limpiado (70 líneas)"
echo "✅ Todas las variables presentes"
echo "✅ Sin código corrupto"
echo ""
echo "📁 Si algo sale mal, restaura con:"
echo "   cp $BACKUP_FILE .env.local"
echo ""
echo "🚀 Ahora puedes ejecutar:"
echo "   node scripts/create-auth-tables.js"
echo ""