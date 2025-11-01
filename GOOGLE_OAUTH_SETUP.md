# Configuración de Google OAuth en Vialine

## ✅ Estado Actual
El código de Google OAuth **ya está implementado** en el proyecto. Solo falta configurar las credenciales.

## 📋 Paso 1: Crear Proyecto en Google Cloud Console

### 1.1 Acceder a Google Cloud Console
1. Ve a: https://console.cloud.google.com
2. Inicia sesión con tu cuenta de Google
3. Acepta los términos si es tu primera vez

### 1.2 Crear Nuevo Proyecto
1. Click en el selector de proyecto (arriba a la izquierda)
2. Click en **"Nuevo Proyecto"**
3. Nombre del proyecto: `Vialine`
4. Click en **"Crear"**

## 🔑 Paso 2: Configurar Pantalla de Consentimiento OAuth

### 2.1 Acceder a OAuth Consent Screen
1. En el menú lateral → **APIs y servicios** → **Pantalla de consentimiento de OAuth**
2. Selecciona **"Externo"** (para que cualquier usuario de Google pueda hacer login)
3. Click en **"Crear"**

### 2.2 Configurar Información de la App
**Información de la aplicación:**
- Nombre de la aplicación: `Vialine`
- Correo de asistencia: `tu-email@gmail.com` (tu email)
- Logo de la aplicación: (Opcional - puedes subirlo después)

**Información de contacto del desarrollador:**
- Dirección de correo: `tu-email@gmail.com`

**Dominios autorizados:**
- Dominio de aplicación: `vialine.vercel.app` (si ya tienes dominio)

Click en **"Guardar y continuar"**

### 2.3 Ámbitos (Scopes)
1. Click en **"Guardar y continuar"** (no necesitas agregar scopes adicionales)
2. Los scopes por defecto (email, profile) son suficientes

### 2.4 Usuarios de Prueba (Opcional)
1. Si tu app está en modo "Testing", agrega emails de prueba
2. Si quieres que esté público, puedes publicar la app después
3. Click en **"Guardar y continuar"**

## 🔐 Paso 3: Crear Credenciales OAuth 2.0

### 3.1 Crear ID de Cliente OAuth
1. En el menú lateral → **APIs y servicios** → **Credenciales**
2. Click en **"+ Crear credenciales"** → **"ID de cliente de OAuth"**
3. Tipo de aplicación: **"Aplicación web"**

### 3.2 Configurar Orígenes y Redirecciones

**Nombre:** `Vialine Web Client`

**Orígenes de JavaScript autorizados:**
```
http://localhost:3000
https://vialine.vercel.app
```

**URIs de redirección autorizados:**
```
http://localhost:3000/api/auth/callback/google
https://vialine.vercel.app/api/auth/callback/google
```

⚠️ **IMPORTANTE**: Si tu dominio de Vercel es diferente, usa tu URL real.

### 3.3 Obtener Credenciales
1. Click en **"Crear"**
2. Aparecerá un modal con:
   - **ID de cliente**: Algo como `123456789-abc...apps.googleusercontent.com`
   - **Secreto del cliente**: Algo como `GOCSPX-abc123...`
3. **COPIA AMBOS** (los necesitarás en el siguiente paso)

## 📝 Paso 4: Configurar Variables de Entorno

### 4.1 Desarrollo Local (.env.local)
Abre tu archivo `.env.local` y agrega:

```bash
# ========================================
# GOOGLE OAUTH (Login Social)
# ========================================
GOOGLE_CLIENT_ID=tu-client-id-aqui.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=tu-client-secret-aqui
```

### 4.2 Producción (Vercel)
1. Ve a https://vercel.com
2. Selecciona tu proyecto **v0-vialine-landing-page**
3. Settings → **Environment Variables**
4. Agrega estas 2 variables:

```
GOOGLE_CLIENT_ID = tu-client-id-aqui.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET = tu-client-secret-aqui
```

5. Selecciona entornos: ✅ Production, ✅ Preview
6. Click en **"Save"**

### 4.3 Redesplegar en Vercel
1. Ve a **Deployments**
2. Click en los **tres puntos** del último deployment
3. Click en **"Redeploy"**

## ✅ Paso 5: Probar Google OAuth

### En Desarrollo (localhost:3000)
1. Inicia tu servidor: `npm run dev`
2. Ve a: http://localhost:3000/login
3. Verás el botón **"O continúa con Google"**
4. Click en el botón
5. Inicia sesión con tu cuenta de Google
6. Deberías ser redirigido a `/account`

### En Producción (Vercel)
1. Ve a: https://vialine.vercel.app/login
2. Click en **"O continúa con Google"**
3. Inicia sesión
4. Funciona! ✅

## 🔍 Verificación en Base de Datos

Cuando un usuario hace login con Google por primera vez, NextAuth automáticamente:
1. Crea el usuario en la tabla `users`
2. NO tiene `password_hash` (porque usa OAuth)
3. Campos poblados: `email`, `name`, `image` (foto de Google), `email_verified`

## ⚠️ Troubleshooting

### Error: "redirect_uri_mismatch"
**Causa**: La URI de redirección no está autorizada
**Solución**:
1. Ve a Google Cloud Console → Credenciales
2. Edita tu OAuth Client ID
3. Asegúrate de que las URIs de redirección incluyan:
   - `http://localhost:3000/api/auth/callback/google`
   - `https://vialine.vercel.app/api/auth/callback/google`

### Botón de Google no aparece
**Causa**: Variables de entorno no configuradas
**Solución**: Verifica que `GOOGLE_CLIENT_ID` y `GOOGLE_CLIENT_SECRET` estén en `.env.local`

### Error: "Access blocked: This app's request is invalid"
**Causa**: Pantalla de consentimiento no configurada
**Solución**: Completa el Paso 2 correctamente

## 📚 Recursos Adicionales

- [NextAuth.js Google Provider](https://next-auth.js.org/providers/google)
- [Google Cloud Console](https://console.cloud.google.com)
- [OAuth 2.0 Documentation](https://developers.google.com/identity/protocols/oauth2)

## 🎯 Resultado Final

Después de configurar correctamente:
- ✅ Usuarios pueden hacer login con Google
- ✅ Usuarios pueden hacer login con email/contraseña
- ✅ Ambos métodos usan la misma tabla `users`
- ✅ Los usuarios de Google tienen foto de perfil automáticamente
- ✅ Funciona en desarrollo y producción
