# 🔴 PENDIENTE CRÍTICO: Configuración de Dominio Custom

**Última actualización**: 2 Noviembre 2025
**Estado**: ⏸️ PAUSADO - Esperando confirmación del propietario
**Responsable**: Usuario debe consultar con propietario

---

## 📋 Contexto

Queremos configurar el dominio `vialineperu.com` para que apunte a la nueva tienda en Vercel.

**Problema crítico detectado**:
- `vialineperu.com` actualmente tiene una página **WordPress diferente**
- Si se cambian los registros DNS, **WordPress desaparecerá**

---

## ⚠️ Credenciales (CAMBIAR DESPUÉS)

```
URL: https://vialineperu.com:2096
Usuario: oficina@vialineperu.com
Contraseña: Rm4nchtop234!
```

**🚨 IMPORTANTE**: Estas credenciales fueron compartidas en el chat. **CAMBIAR la contraseña de cPanel** después de completar la configuración.

---

## 🎯 Opciones Disponibles

### OPCIÓN A: Reemplazar WordPress con la tienda nueva

**Qué sucede**:
- `vialineperu.com` → Tienda Vercel (nueva)
- WordPress desaparece completamente

**Cuándo elegir**:
- Si WordPress ya no se necesita
- Si quieres la tienda como página principal

**Pasos a seguir**:
1. Entrar a cPanel: https://vialineperu.com:2096
2. Ir a **Zone Editor**
3. Agregar registro A:
   - Tipo: `A`
   - Nombre: `@` o dejar vacío (o escribir `vialineperu.com`)
   - Valor: `216.198.79.1`
   - TTL: `3600`
4. Agregar registro CNAME:
   - Tipo: `CNAME`
   - Nombre: `www`
   - Valor: `db1fdb81a61be079.vercel-dns-017.com.`
   - TTL: `3600`
5. Esperar propagación DNS (10-30 min, máximo 48h)
6. En Vercel, hacer clic en **Refresh** en los dominios

---

### OPCIÓN B: Mantener ambas páginas (WordPress + Tienda)

**Qué sucede**:
- `vialineperu.com` → WordPress (sin cambios)
- `tienda.vialineperu.com` → Tienda Vercel (nueva)

**Cuándo elegir**:
- Si necesitas mantener WordPress funcionando
- Si quieres tener ambas páginas disponibles

**Pasos a seguir**:
1. En Vercel:
   - Ir a Settings → Domains
   - Agregar dominio: `tienda.vialineperu.com`
   - Vercel te dará un valor CNAME (anotar)
2. Entrar a cPanel: https://vialineperu.com:2096
3. Ir a **Zone Editor**
4. Agregar registro CNAME:
   - Tipo: `CNAME`
   - Nombre: `tienda`
   - Valor: `[el que te dio Vercel]`
   - TTL: `3600`
5. NO tocar los registros A existentes
6. Esperar propagación DNS
7. En Vercel, hacer clic en **Refresh**

---

### OPCIÓN C: Migrar WordPress a subdominio

**Qué sucede**:
- `vialineperu.com` → Tienda Vercel (nueva - dominio principal)
- `blog.vialineperu.com` → WordPress (movido a subdominio)

**Cuándo elegir**:
- Si quieres la tienda como página principal
- Pero necesitas conservar WordPress como archivo/blog

**Pasos a seguir** (MÁS COMPLEJO):
1. **Primero, migrar WordPress**:
   - Crear subdominio `blog.vialineperu.com` en cPanel
   - Copiar archivos de WordPress al nuevo subdominio
   - Exportar base de datos
   - Importar BD en nuevo subdominio
   - Actualizar URLs en WordPress (wp_options)
   - Verificar que `blog.vialineperu.com` funcione
2. **Luego, configurar tienda**:
   - Seguir pasos de Opción A para dominio principal

---

## 🔄 Próximos Pasos

1. **Usuario**: Consultar con propietario qué opción elegir
2. **Usuario**: Confirmar decisión
3. **Claude**: Ejecutar pasos según opción elegida
4. **Usuario**: Cambiar contraseña de cPanel

---

## 📊 Registros DNS que dio Vercel

Para referencia, estos son los valores que Vercel proporcionó:

**Para dominio raíz** (`vialineperu.com`):
```
Tipo: A
Nombre: @
Valor: 216.198.79.1
```

**Para www** (`www.vialineperu.com`):
```
Tipo: CNAME
Nombre: www
Valor: db1fdb81a61be079.vercel-dns-017.com.
```

---

## ⚡ Después de Configurar DNS

Una vez que el dominio esté funcionando, actualizar:

1. **Metadata en app/layout.tsx**:
   ```typescript
   export const metadata: Metadata = {
     metadataBase: new URL('https://vialineperu.com'), // Cambiar de vercel.app
     // ...
   }
   ```

2. **Variables de entorno en Vercel**:
   - `NEXTAUTH_URL=https://vialineperu.com`
   - Cualquier otra variable que use el dominio

3. **Verificar SSL/HTTPS**:
   - Vercel automáticamente configura SSL
   - Verificar que funcione en https://

4. **Actualizar sitemap.xml** (si existe):
   - Cambiar URLs de vercel.app a vialineperu.com

5. **Actualizar Search Console y Analytics**:
   - Google Search Console: agregar nuevo dominio
   - Google Analytics: verificar que funcione
   - Meta Pixel: verificar que funcione

---

## 📞 Contacto para Dudas

Si hay dudas técnicas durante la configuración, consultar con Claude Code o soporte de Vercel.

**Documentación útil**:
- Vercel Docs: https://vercel.com/docs/concepts/projects/domains
- DNS Propagation Checker: https://dnschecker.org/
