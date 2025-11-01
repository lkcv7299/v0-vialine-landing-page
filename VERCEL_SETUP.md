# Configuración de Variables de Entorno en Vercel

## Error Actual
Si ves estos errores en producción (vialine.vercel.app):
- `AuthJS Error: There was a problem with the server configuration`
- `No ha ingresado la llave pública del comercio o no es válida`

Es porque **faltan las variables de entorno en Vercel**.

## Solución: Agregar Variables en Vercel

### Paso 1: Ir al Dashboard de Vercel
1. Ve a [vercel.com](https://vercel.com)
2. Selecciona tu proyecto: `v0-vialine-landing-page`
3. Click en **Settings** (arriba)
4. Click en **Environment Variables** (menú izquierdo)

### Paso 2: Agregar las Variables Necesarias

Agrega cada una de estas variables con el botón **Add New**:

#### 1. NextAuth (Autenticación)
```
NEXTAUTH_URL=https://vialine.vercel.app
NEXTAUTH_SECRET=<generate_with_openssl_rand_command_below>
```
**Importante**: Genera un `NEXTAUTH_SECRET` seguro con:
```bash
openssl rand -base64 32
```

#### 2. Culqi (Pagos) - CRÍTICO
```
NEXT_PUBLIC_CULQI_PUBLIC_KEY=your_culqi_public_key_here
CULQI_SECRET_KEY=your_culqi_secret_key_here
```

#### 3. Base de Datos (Neon PostgreSQL)
```
POSTGRES_URL=your_neon_postgres_connection_string_here
DATABASE_URL=your_neon_postgres_connection_string_here
```
**Nota**: Obtén estas URLs desde tu dashboard de Neon/Vercel Postgres.

#### 4. Brevo (Email) - Opcional
```
BREVO_API_KEY=your_brevo_api_key_here
NEXT_PUBLIC_BREVO_API_KEY=your_brevo_api_key_here
```

#### 5. Resend (Email Alternativo) - Opcional
```
RESEND_API_KEY=your_resend_api_key_here
```

### Paso 3: Configurar el Entorno
Para cada variable, selecciona en qué entornos aplicar:
- ✅ Production
- ✅ Preview
- ⬜ Development (no necesario, usas .env.local)

### Paso 4: Redesplegar
Después de agregar todas las variables:
1. Ve a **Deployments** (arriba)
2. Click en los **tres puntos** del último deployment
3. Click en **Redeploy**
4. Selecciona **Use existing Build Cache** (más rápido)
5. Click **Redeploy**

## Verificación
Después del redespliegue, prueba:
1. Login en vialine.vercel.app/login ✅
2. Agregar producto al carrito ✅
3. Ir al checkout ✅
4. Seleccionar pago con Culqi ✅
5. Verificar que el modal de Culqi se abra correctamente ✅

## Variables NEXT_PUBLIC_*
**Importante**: Las variables que empiezan con `NEXT_PUBLIC_` son expuestas al navegador, así que:
- ✅ Pueden contener claves públicas (como `NEXT_PUBLIC_CULQI_PUBLIC_KEY`)
- ❌ NO deben contener claves secretas

## Seguridad
Para producción, asegúrate de:
1. Generar un nuevo `NEXTAUTH_SECRET` único
2. Si Culqi tiene claves de producción (`pk_live_*`), úsalas en lugar de las de test
3. No compartir las variables secretas públicamente

## Soporte
Si sigues teniendo problemas:
1. Verifica los logs en Vercel: **Runtime Logs** en el dashboard
2. Verifica que todas las variables estén escritas exactamente igual (sin espacios extra)
3. Asegúrate de haber redeployeado después de agregar las variables
