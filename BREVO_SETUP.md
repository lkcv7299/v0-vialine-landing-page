# 📧 GUÍA: CONFIGURAR BREVO PARA NEWSLETTER

Esta guía te explica paso a paso cómo configurar Brevo (antes Sendinblue) para capturar suscriptores del popup de newsletter.

---

## 🎯 PASO 1: CREAR CUENTA EN BREVO

1. Ve a: **https://app.brevo.com/account/register**
2. Completa el formulario:
   - Email: tu email de trabajo
   - Contraseña: crea una segura
   - Nombre de empresa: "Vialine"
3. Click en **"Sign up for free"**
4. Verifica tu email (revisa bandeja de entrada)
5. Completa el perfil:
   - Tipo de negocio: "E-commerce"
   - País: "Peru"
   - Tamaño: "1-10 employees"

---

## 🔑 PASO 2: OBTENER API KEY

1. Una vez dentro de Brevo, ve a:
   - **Settings** (⚙️ arriba derecha)
   - **API Keys** (en el menú lateral)
2. Copia la **"v3" API Key** (es un texto largo tipo: `xkeysib-123abc...`)
3. Pégala en tu archivo `.env.local`:
   \`\`\`bash
   NEXT_PUBLIC_BREVO_API_KEY=xkeysib-tu-api-key-aqui
   \`\`\`

---

## 📋 PASO 3: CREAR LISTA DE CONTACTOS

1. En Brevo, ve a **Contacts** > **Lists**
2. Click en **"Create a list"**
3. Configuración:
   - **Name:** "Newsletter Subscribers"
   - **Folder:** (dejar en Default)
4. Click en **"Create"**
5. **IMPORTANTE:** Anota el **List ID** (aparece en la URL o en la lista)
   - Ejemplo: `https://app.brevo.com/contact/list/id/2` → List ID = `2`
6. Si el ID NO es `2`, actualiza en `lib/brevo.ts`:
   \`\`\`typescript
   listIds: [2], // ← Cambia este número
   \`\`\`

---

## 📧 PASO 4: CREAR EMAIL DE BIENVENIDA (AUTOMATION)

Ahora vamos a crear el email automático que se envía cuando alguien se suscribe:

### 4.1. Ir a Automations
1. En Brevo, ve a **Automation** (menú lateral)
2. Click en **"Create an automation"**
3. Selecciona **"When a contact enters a list"**

### 4.2. Configurar Trigger
1. **Trigger:** "Contact added to list"
2. **Choose list:** "Newsletter Subscribers"
3. Click **"Next"**

### 4.3. Crear Email
1. Click en **"+ Add an action"**
2. Selecciona **"Send an email"**
3. Click en **"Create a new email"**

### 4.4. Diseñar el Email
Usa este contenido como plantilla:

\`\`\`
Asunto: 🎁 ¡Bienvenida a Vialine! Tu cupón de 10% OFF te espera

Hola {{ contact.FIRSTNAME }},

¡Qué alegría tenerte en nuestra comunidad! 🎉

Como prometimos, aquí está tu cupón de bienvenida:

┌─────────────────────────┐
│   BIENVENIDA10          │
│   10% OFF + Envío Gratis│
└─────────────────────────┘

Cómo usarlo:
1. Elige tus productos favoritos
2. En el checkout, ingresa el código: BIENVENIDA10
3. ¡Disfruta tu descuento!

👉 [EMPEZAR A COMPRAR]
   (Link: https://vialine.pe/mujer)

¿Qué esperar de nosotras?
✨ Descuentos exclusivos cada mes
📦 Acceso anticipado a nuevas colecciones
💡 Tips de activewear y estilo

¡Nos vemos pronto!
El equipo Vialine

---
📍 Lima, Perú
📧 Responde a este email si tienes dudas
🔓 ¿No quieres más emails? [Darse de baja]
\`\`\`

### 4.5. Configurar Botón
- **Text:** "Empezar a comprar"
- **URL:** `https://vialine.pe/mujer`
- **Color:** Rose (#e11d48)
- **Style:** Rounded button

### 4.6. Activar Automation
1. Click en **"Save and activate"**
2. ✅ El email ahora se enviará automáticamente

---

## ⚙️ PASO 5: CONFIGURAR DOMINIO (OPCIONAL PERO RECOMENDADO)

Para mejorar la entregabilidad (evitar spam):

1. Ve a **Senders & IP** > **Domains**
2. Click en **"Add a domain"**
3. Ingresa: `vialine.pe`
4. Sigue las instrucciones para agregar registros DNS:
   - **SPF** (TXT record)
   - **DKIM** (CNAME record)
   - **DMARC** (TXT record)
5. Verifica el dominio (tarda 24-48 horas)

**Si no tienes acceso a DNS:** Puedes usar el dominio predeterminado de Brevo por ahora.

---

## 🧪 PASO 6: PROBAR LA INTEGRACIÓN

1. Reinicia tu servidor de desarrollo:
   \`\`\`bash
   npm run dev
   \`\`\`
2. Abre tu sitio: `http://localhost:3000`
3. Espera 30 segundos O haz scroll hasta 50%
4. Debería aparecer el popup
5. Ingresa tu email y suscríbete
6. Verifica:
   - ✅ Mensaje de éxito en el popup
   - ✅ Email en tu bandeja de entrada
   - ✅ Contacto en Brevo (Contacts > Lists)

---

## 📊 PASO 7: MONITOREAR RESULTADOS

### En Brevo Dashboard:
- **Contacts:** Ver cuántos suscritos tienes
- **Campaigns:** Estadísticas de emails enviados
- **Automation:** Ver performance del email de bienvenida

### Métricas clave:
- **Tasa de apertura:** Meta: 25-35%
- **Tasa de clics:** Meta: 3-7%
- **Tasa de conversión (uso de cupón):** Meta: 15-25%

---

## 🎯 PRÓXIMOS PASOS

Una vez funcionando, puedes:

1. **Crear más automations:**
   - Carrito abandonado (si tienes checkout)
   - Productos vistos pero no comprados
   - Birthday emails (si recoges fechas)

2. **Enviar campañas:**
   - Newsletter mensual
   - Lanzamientos de productos
   - Ofertas especiales

3. **Segmentar:**
   - Compradoras vs no compradoras
   - Por categoría de interés
   - Por actividad (activas vs inactivas)

---

## ⚠️ LÍMITES DEL PLAN FREE

- ✅ **300 emails/día** (9,000 al mes)
- ✅ **Contactos ilimitados**
- ✅ Automations básicas
- ❌ Sin soporte telefónico (solo email)
- ❌ Sin pruebas A/B

**Cuándo actualizar:**
- Si envías más de 9,000 emails/mes
- Si necesitas soporte prioritario
- Si quieres A/B testing

---

## 🆘 TROUBLESHOOTING

### Problema: "API Key not found"
**Solución:**
- Verifica que `.env.local` existe
- Verifica que la key empiece con `xkeysib-`
- Reinicia el servidor: `npm run dev`

### Problema: "Emails no llegan"
**Solución:**
- Revisa spam/promotions
- Verifica que el email de automation esté activo
- Chequea que el List ID sea correcto

### Problema: "Popup no aparece"
**Solución:**
- Borra localStorage: `localStorage.clear()` en consola
- Verifica que hayas esperado 30s + scroll 50%
- Revisa la consola del navegador (F12)

---

## 📞 SOPORTE

- **Brevo Help Center:** https://help.brevo.com/
- **API Docs:** https://developers.brevo.com/
- **Email Vialine:** (tu email de soporte)

---

✅ **¡Listo! Tu sistema de newsletter está configurado.**
