# 🔴 BUG-001: Diseños Diferentes en Mismo Link

**Fecha de reporte**: 2 Noviembre 2025
**Reportado por**: Usuario (padre vio diseño diferente)
**Severidad**: 🔴 CRÍTICA
**Estado**: 🔍 INVESTIGANDO

---

## 📸 Evidencia

### Imagen 1 (Vista del padre)
- Carrusel horizontal
- Muestra "Camiseta cuello alto S/ 45"
- Botón "Seleccionar opciones" en rosa
- WhatsApp float button verde
- **Parece ser versión antigua o diferente build**

### Imagen 2 (Vista correcta)
- Grid vertical de product cards
- Muestra reviews (estrellas + ratings)
- Hero de niña abajo
- **Esta es la versión actual correcta**

---

## 🔍 Análisis Técnico

### Últimos Deploys
```
fa37207 - docs: Add Session 9 documentation (hace 5 min)
fc3e2af - fix: Remove transition animation (hace 15 min)
b49e041 - feat: Add hover image effect (hace 30 min)
```

### Posibles Causas

#### 1. Cache del Navegador ⭐ MÁS PROBABLE
**Probabilidad**: 80%

**Por qué**:
- El padre probablemente visitó la página antes
- Su navegador guardó versión antigua en cache
- No hizo hard refresh

**Cómo verificar**:
- Pedir al padre que haga Ctrl+Shift+R (Windows) o Cmd+Shift+R (Mac)
- O borrar cache del navegador

**Solución temporal**:
```javascript
// Agregar headers de no-cache temporalmente
// En next.config.js o middleware
```

---

#### 2. CDN de Vercel ⭐ POSIBLE
**Probabilidad**: 15%

**Por qué**:
- Vercel usa CDN global (Edge Network)
- Diferentes regiones pueden servir builds diferentes
- Cache de CDN puede tardar en actualizarse

**Cómo verificar**:
- Hacer request desde diferentes IPs/ubicaciones
- Usar herramienta como: https://www.giftofspeed.com/cache-checker/

**Solución**:
- Purgar cache de Vercel manualmente
- Agregar query param único: `vialine.vercel.app?v=2`

---

#### 3. Service Worker Cachean Versión Antigua
**Probabilidad**: 3%

**Por qué**:
- Si hay service worker registrado, puede cachear assets
- Verificar si Next.js generó service worker

**Cómo verificar**:
- Abrir DevTools → Application → Service Workers
- Ver si hay worker registrado

**Solución**:
- Unregister service worker
- Agregar lógica de update

---

#### 4. Build Incompleto / Corrupto
**Probabilidad**: 2%

**Por qué**:
- Deploy puede haber fallado parcialmente
- Archivos viejos mezclados con nuevos

**Cómo verificar**:
- Revisar logs de Vercel
- Ver deployment details

**Solución**:
- Re-deploy forzado
- Rollback y redeploy

---

## 🔧 Plan de Acción (EN ORDEN)

### PASO 1: Verificar Cache del Navegador del Padre
- [ ] Pedir al padre que haga **Ctrl+Shift+R** (hard refresh)
- [ ] O que abra en ventana de incógnito
- [ ] O que borre cache del navegador

**Si funciona** → RESUELTO (era cache local)
**Si NO funciona** → Continuar a PASO 2

---

### PASO 2: Verificar Deploy en Vercel
- [ ] Ir a https://vercel.com/dashboard
- [ ] Ver último deployment
- [ ] Verificar:
  - Estado: "Ready" ✅
  - No hay errores
  - Build completó 100%

**Si hay problemas** → Re-deploy
**Si todo OK** → Continuar a PASO 3

---

### PASO 3: Purgar Cache de Vercel CDN
```bash
# En dashboard de Vercel
# Settings → Deployment → Invalidate Cache
```

O agregar query param para bypass:
```
https://vialine.vercel.app/?nocache=1
```

---

### PASO 4: Verificar Service Workers
```javascript
// En DevTools Console del navegador del padre:
navigator.serviceWorker.getRegistrations().then(function(registrations) {
  for(let registration of registrations) {
    console.log('Service Worker found:', registration);
    registration.unregister();
  }
});
```

---

### PASO 5: Agregar Headers Anti-Cache Temporalmente

Crear archivo `middleware.ts`:
```typescript
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const response = NextResponse.next()

  // Solo para testing - remover después
  response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate')
  response.headers.set('Pragma', 'no-cache')
  response.headers.set('Expires', '0')

  return response
}
```

⚠️ **IMPORTANTE**: Esto afectará performance. Solo usar para debugging.

---

### PASO 6: Re-Deploy Forzado
```bash
# Hacer un cambio dummy y pushear
echo "// Force rebuild" >> app/layout.tsx
git add app/layout.tsx
git commit -m "chore: Force rebuild to clear cache"
git push origin main
```

---

## 📝 Checklist de Verificación

### Info a Recopilar del Padre
- [ ] ¿Qué navegador usa? (Chrome, Safari, Firefox?)
- [ ] ¿Qué versión del navegador?
- [ ] ¿En qué dispositivo? (Windows, Mac, móvil Android/iOS?)
- [ ] ¿Desde qué ubicación? (puede ser CDN regional)
- [ ] ¿Visitó la página antes de hoy?
- [ ] ¿Hizo refresh normal o hard refresh?

### Tests a Hacer
- [ ] Abrir link en incógnito del mismo navegador
- [ ] Abrir link en navegador diferente
- [ ] Abrir link en dispositivo diferente
- [ ] Abrir link con query param: `?v=2`
- [ ] Hacer hard refresh (Ctrl+Shift+R)

---

## 🎯 Solución RÁPIDA (Para implementar YA)

### Opción A: Query Parameter Versioning
Cambiar todos los links compartidos a:
```
https://vialine.vercel.app/?v=20251102
```

Esto bypasea cualquier cache.

### Opción B: Forzar Reload en App
Agregar en `app/layout.tsx`:
```typescript
// Solo para debugging
useEffect(() => {
  const cacheKey = 'app-version';
  const currentVersion = '20251102';

  if (localStorage.getItem(cacheKey) !== currentVersion) {
    localStorage.setItem(cacheKey, currentVersion);
    window.location.reload();
  }
}, []);
```

---

## 📊 Probabilidades Finales

| Causa | Probabilidad | Solución | Tiempo |
|-------|--------------|----------|--------|
| Cache navegador | 80% | Hard refresh | 1 min |
| CDN Vercel | 15% | Purgar cache | 5 min |
| Service Worker | 3% | Unregister | 2 min |
| Build corrupto | 2% | Re-deploy | 10 min |

---

## ✅ Resolución

**Estado**: PENDIENTE

**Pasos ejecutados**:
- [ ] ...

**Resultado**:
- ...

**Causa confirmada**:
- ...

**Solución aplicada**:
- ...

---

## 🔮 Prevención Futura

Después de resolver, implementar:

1. **Versionado de Assets**
   ```javascript
   // next.config.js
   assetPrefix: process.env.NODE_ENV === 'production' ? '/v2' : ''
   ```

2. **Headers de Cache Inteligentes**
   - HTML: no-cache (siempre fresh)
   - JS/CSS: cache con hash
   - Imágenes: cache largo

3. **Update Notification**
   - Detectar nueva versión disponible
   - Mostrar banner "Nueva versión disponible, haz clic para actualizar"

4. **Service Worker Update Strategy**
   ```javascript
   // Implementar workbox o similar
   // Auto-update en background
   ```

---

## 📞 Contacto para Updates

Cuando tengas info del padre, actualiza este documento con:
- Navegador usado
- Resultado de hard refresh
- Screenshots actualizados si persiste

---

**Siguiente paso**: Pedir al padre que haga **Ctrl+Shift+R** y reportar resultado.
