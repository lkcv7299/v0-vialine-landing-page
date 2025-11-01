import Link from "next/link"

export const metadata = {
  title: "Política de Privacidad | Vialine",
  description: "Política de privacidad y protección de datos de Vialine Activewear",
}

export default function PrivacidadPage() {
  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <div className="bg-white border-b border-neutral-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl md:text-4xl font-bold text-neutral-900">
            Política de Privacidad
          </h1>
          <p className="mt-2 text-neutral-600">
            Última actualización: Noviembre 2025
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-8 md:p-12">
          <div className="prose prose-neutral max-w-none">
            {/* Introducción */}
            <section className="mb-8">
              <p className="text-neutral-700 leading-relaxed mb-4">
                En <strong>Vialine</strong>, respetamos su privacidad y nos comprometemos a proteger
                sus datos personales. Esta Política de Privacidad explica cómo recopilamos, usamos,
                compartimos y protegemos su información cuando utiliza nuestro sitio web.
              </p>
              <p className="text-neutral-700 leading-relaxed">
                Al utilizar nuestro sitio web, usted acepta las prácticas descritas en esta política.
              </p>
            </section>

            {/* 1. Información que Recopilamos */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                1. Información que Recopilamos
              </h2>

              <h3 className="text-xl font-semibold text-neutral-900 mb-3 mt-6">
                1.1 Información que Usted Proporciona
              </h3>
              <p className="text-neutral-700 leading-relaxed mb-4">
                Recopilamos información que usted nos proporciona directamente cuando:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-neutral-700">
                <li>Crea una cuenta (nombre, correo electrónico, contraseña)</li>
                <li>Realiza una compra (nombre, dirección, teléfono, información de pago)</li>
                <li>Se suscribe a nuestro newsletter (correo electrónico)</li>
                <li>Nos contacta (nombre, correo, mensaje)</li>
                <li>Deja una reseña de producto</li>
              </ul>

              <h3 className="text-xl font-semibold text-neutral-900 mb-3 mt-6">
                1.2 Información Recopilada Automáticamente
              </h3>
              <p className="text-neutral-700 leading-relaxed mb-4">
                Cuando visita nuestro sitio web, recopilamos automáticamente:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-neutral-700">
                <li>Dirección IP y ubicación geográfica aproximada</li>
                <li>Tipo de navegador y dispositivo</li>
                <li>Páginas visitadas y tiempo de navegación</li>
                <li>Datos de cookies y tecnologías similares</li>
                <li>Productos visualizados y agregados al carrito</li>
              </ul>

              <h3 className="text-xl font-semibold text-neutral-900 mb-3 mt-6">
                1.3 Información de Terceros
              </h3>
              <p className="text-neutral-700 leading-relaxed">
                Podemos recibir información adicional si inicia sesión con servicios de terceros
                como Google (nombre, correo electrónico, foto de perfil).
              </p>
            </section>

            {/* 2. Cómo Usamos su Información */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                2. Cómo Usamos su Información
              </h2>
              <p className="text-neutral-700 leading-relaxed mb-4">
                Utilizamos su información personal para:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-neutral-700">
                <li><strong>Procesar pedidos:</strong> Verificar, gestionar y enviar sus compras</li>
                <li><strong>Comunicaciones:</strong> Enviar confirmaciones de pedido, actualizaciones de envío y responder consultas</li>
                <li><strong>Marketing:</strong> Enviar ofertas, promociones y newsletters (solo si usted lo autoriza)</li>
                <li><strong>Mejoras del sitio:</strong> Analizar el comportamiento de usuarios para mejorar la experiencia</li>
                <li><strong>Seguridad:</strong> Detectar y prevenir fraudes o actividades sospechosas</li>
                <li><strong>Cumplimiento legal:</strong> Cumplir con obligaciones legales y regulatorias</li>
              </ul>
            </section>

            {/* 3. Compartir Información */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                3. Cómo Compartimos su Información
              </h2>
              <p className="text-neutral-700 leading-relaxed mb-4">
                Vialine <strong>no vende</strong> su información personal. Podemos compartir
                sus datos con:
              </p>

              <h3 className="text-xl font-semibold text-neutral-900 mb-3 mt-6">
                3.1 Proveedores de Servicios
              </h3>
              <ul className="list-disc pl-6 space-y-2 text-neutral-700">
                <li><strong>Procesadores de pago:</strong> Culqi (para pagos con tarjeta)</li>
                <li><strong>Servicios de envío:</strong> Couriers y empresas de logística</li>
                <li><strong>Hosting:</strong> Vercel (alojamiento del sitio web)</li>
                <li><strong>Base de datos:</strong> Neon/Vercel Postgres (almacenamiento seguro)</li>
                <li><strong>Email:</strong> Brevo/Resend (envío de correos transaccionales)</li>
                <li><strong>Analytics:</strong> Google Analytics, Meta Pixel, Microsoft Clarity</li>
              </ul>

              <h3 className="text-xl font-semibold text-neutral-900 mb-3 mt-6">
                3.2 Requisitos Legales
              </h3>
              <p className="text-neutral-700 leading-relaxed">
                Podemos divulgar su información si la ley lo requiere o para proteger
                nuestros derechos legales.
              </p>
            </section>

            {/* 4. Cookies */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                4. Cookies y Tecnologías Similares
              </h2>
              <p className="text-neutral-700 leading-relaxed mb-4">
                Utilizamos cookies para mejorar su experiencia en el sitio web:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-neutral-700">
                <li><strong>Cookies esenciales:</strong> Necesarias para el funcionamiento del sitio (sesión, carrito)</li>
                <li><strong>Cookies de análisis:</strong> Nos ayudan a entender cómo usa el sitio (Google Analytics)</li>
                <li><strong>Cookies de marketing:</strong> Permiten mostrar anuncios relevantes (Meta Pixel)</li>
                <li><strong>Cookies de preferencias:</strong> Recordar sus preferencias (idioma, moneda)</li>
              </ul>
              <p className="text-neutral-700 leading-relaxed mt-4">
                Puede configurar su navegador para bloquear o eliminar cookies, aunque esto
                puede afectar la funcionalidad del sitio.
              </p>
            </section>

            {/* 5. Seguridad */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                5. Seguridad de los Datos
              </h2>
              <p className="text-neutral-700 leading-relaxed mb-4">
                Implementamos medidas de seguridad técnicas y organizativas para proteger
                su información personal:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-neutral-700">
                <li>Encriptación SSL/TLS para transmisión de datos</li>
                <li>Contraseñas hasheadas con bcrypt</li>
                <li>Acceso restringido a datos personales</li>
                <li>Monitoreo regular de vulnerabilidades</li>
                <li>Backups automáticos y recuperación de desastres</li>
              </ul>
              <p className="text-neutral-700 leading-relaxed mt-4">
                Sin embargo, ningún método de transmisión por Internet es 100% seguro.
                Nos esforzamos por proteger sus datos, pero no podemos garantizar seguridad absoluta.
              </p>
            </section>

            {/* 6. Derechos del Usuario */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                6. Sus Derechos
              </h2>
              <p className="text-neutral-700 leading-relaxed mb-4">
                De acuerdo con la Ley de Protección de Datos Personales del Perú (Ley N° 29733),
                usted tiene derecho a:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-neutral-700">
                <li><strong>Acceso:</strong> Solicitar una copia de sus datos personales</li>
                <li><strong>Rectificación:</strong> Corregir datos inexactos o incompletos</li>
                <li><strong>Cancelación:</strong> Solicitar la eliminación de sus datos</li>
                <li><strong>Oposición:</strong> Oponerse al procesamiento de sus datos</li>
                <li><strong>Revocación:</strong> Retirar el consentimiento en cualquier momento</li>
                <li><strong>Portabilidad:</strong> Recibir sus datos en formato estructurado</li>
              </ul>
              <p className="text-neutral-700 leading-relaxed mt-4">
                Para ejercer estos derechos, contáctenos a través de WhatsApp al
                <strong> +51 972 327 236</strong> o por correo a <strong>info@vialine.pe</strong>.
              </p>
            </section>

            {/* 7. Retención de Datos */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                7. Retención de Datos
              </h2>
              <p className="text-neutral-700 leading-relaxed">
                Conservamos su información personal solo durante el tiempo necesario para
                cumplir con los fines descritos en esta política o según lo requiera la ley.
                Los datos de pedidos se conservan por al menos 7 años por motivos fiscales
                y contables.
              </p>
            </section>

            {/* 8. Menores de Edad */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                8. Menores de Edad
              </h2>
              <p className="text-neutral-700 leading-relaxed">
                Nuestro sitio web no está dirigido a menores de 18 años. No recopilamos
                intencionalmente información de menores. Si descubrimos que hemos recopilado
                datos de un menor, los eliminaremos inmediatamente.
              </p>
            </section>

            {/* 9. Enlaces a Terceros */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                9. Enlaces a Sitios de Terceros
              </h2>
              <p className="text-neutral-700 leading-relaxed">
                Nuestro sitio puede contener enlaces a sitios web de terceros. No somos
                responsables de las prácticas de privacidad de estos sitios. Le recomendamos
                leer las políticas de privacidad de cada sitio que visite.
              </p>
            </section>

            {/* 10. Cambios a la Política */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                10. Cambios a esta Política
              </h2>
              <p className="text-neutral-700 leading-relaxed">
                Podemos actualizar esta Política de Privacidad periódicamente. Los cambios
                entrarán en vigor inmediatamente después de su publicación. Le notificaremos
                sobre cambios importantes por correo electrónico o mediante un aviso en el sitio.
              </p>
            </section>

            {/* 11. Transferencias Internacionales */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                11. Transferencias Internacionales de Datos
              </h2>
              <p className="text-neutral-700 leading-relaxed">
                Sus datos pueden ser transferidos y procesados en servidores ubicados fuera
                del Perú (Vercel - Estados Unidos, Neon - Estados Unidos). Nos aseguramos
                de que estos proveedores cumplan con estándares adecuados de protección de datos.
              </p>
            </section>

            {/* Contacto */}
            <section className="mt-12 p-6 bg-rose-50 rounded-xl border border-rose-100">
              <h3 className="text-xl font-bold text-neutral-900 mb-3">
                ¿Preguntas sobre Privacidad?
              </h3>
              <p className="text-neutral-700 mb-4">
                Si tiene alguna pregunta sobre esta Política de Privacidad o sobre cómo
                manejamos sus datos, puede contactarnos:
              </p>
              <div className="space-y-2 text-neutral-700">
                <p><strong>Responsable:</strong> Vialine Activewear</p>
                <p><strong>WhatsApp:</strong> +51 972 327 236</p>
                <p><strong>Correo:</strong> info@vialine.pe</p>
                <p><strong>Horario:</strong> Lunes a Sábado, 9:00 AM - 6:00 PM</p>
              </div>
            </section>
          </div>

          {/* Botón volver */}
          <div className="mt-12 pt-8 border-t border-neutral-200">
            <Link
              href="/"
              className="inline-flex items-center text-rose-600 hover:text-rose-700 font-medium"
            >
              ← Volver a la tienda
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
