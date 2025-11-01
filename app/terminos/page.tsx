import Link from "next/link"

export const metadata = {
  title: "Términos y Condiciones | Vialine",
  description: "Términos y condiciones de uso de Vialine Activewear",
}

export default function TerminosPage() {
  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <div className="bg-white border-b border-neutral-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl md:text-4xl font-bold text-neutral-900">
            Términos y Condiciones
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
            {/* 1. Aceptación de Términos */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                1. Aceptación de Términos
              </h2>
              <p className="text-neutral-700 leading-relaxed mb-4">
                Al acceder y utilizar el sitio web de Vialine (<strong>vialine.vercel.app</strong>),
                usted acepta cumplir y estar sujeto a los siguientes términos y condiciones de uso.
              </p>
              <p className="text-neutral-700 leading-relaxed">
                Si no está de acuerdo con alguno de estos términos, por favor no utilice nuestro sitio web.
              </p>
            </section>

            {/* 2. Uso del Sitio */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                2. Uso del Sitio
              </h2>
              <p className="text-neutral-700 leading-relaxed mb-4">
                El contenido de este sitio web es para su información general y uso personal.
                Está sujeto a cambios sin previo aviso.
              </p>
              <p className="text-neutral-700 leading-relaxed">
                Usted se compromete a:
              </p>
              <ul className="list-disc pl-6 mt-3 space-y-2 text-neutral-700">
                <li>Usar el sitio solo para fines legales</li>
                <li>No intentar comprometer la seguridad del sitio</li>
                <li>No realizar ingeniería inversa o intentar acceder al código fuente</li>
                <li>Proporcionar información veraz al realizar compras</li>
              </ul>
            </section>

            {/* 3. Productos y Precios */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                3. Productos y Precios
              </h2>
              <p className="text-neutral-700 leading-relaxed mb-4">
                Todos los precios están expresados en Soles Peruanos (S/) e incluyen IGV cuando aplique.
              </p>
              <p className="text-neutral-700 leading-relaxed mb-4">
                Vialine se reserva el derecho de modificar los precios de los productos sin previo aviso.
                Sin embargo, los precios vigentes al momento de realizar el pedido serán los que se apliquen.
              </p>
              <p className="text-neutral-700 leading-relaxed">
                Las imágenes de los productos son referenciales. Los colores pueden variar ligeramente
                debido a la configuración de su pantalla.
              </p>
            </section>

            {/* 4. Proceso de Compra */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                4. Proceso de Compra
              </h2>
              <p className="text-neutral-700 leading-relaxed mb-4">
                Al realizar un pedido, usted acepta que:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-neutral-700">
                <li>La información proporcionada es veraz y completa</li>
                <li>Tiene la capacidad legal para realizar transacciones comerciales</li>
                <li>Acepta pagar el precio total del pedido, incluyendo costos de envío</li>
                <li>Recibirá un correo electrónico de confirmación con los detalles del pedido</li>
              </ul>
            </section>

            {/* 5. Métodos de Pago */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                5. Métodos de Pago
              </h2>
              <p className="text-neutral-700 leading-relaxed mb-4">
                Aceptamos los siguientes métodos de pago:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-neutral-700">
                <li><strong>Culqi:</strong> Tarjetas de crédito y débito (procesamiento seguro)</li>
                <li><strong>Yape:</strong> Transferencia móvil al 972 327 236</li>
                <li><strong>Contra entrega:</strong> Pago en efectivo al recibir el pedido</li>
              </ul>
              <p className="text-neutral-700 leading-relaxed mt-4">
                Todos los pagos son procesados de forma segura. Vialine no almacena
                información de tarjetas de crédito/débito.
              </p>
            </section>

            {/* 6. Envíos y Entregas */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                6. Envíos y Entregas
              </h2>
              <p className="text-neutral-700 leading-relaxed mb-4">
                Los tiempos de entrega son estimados y pueden variar según la disponibilidad
                y la ubicación de entrega.
              </p>
              <ul className="list-disc pl-6 space-y-2 text-neutral-700">
                <li>Lima Metropolitana: 2-5 días hábiles</li>
                <li>Provincias: 5-10 días hábiles</li>
                <li>Envío gratis en compras mayores a S/ 269</li>
              </ul>
              <p className="text-neutral-700 leading-relaxed mt-4">
                Vialine no se hace responsable por retrasos causados por terceros
                (courier, desastres naturales, etc.).
              </p>
            </section>

            {/* 7. Cambios y Devoluciones */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                7. Cambios y Devoluciones
              </h2>
              <p className="text-neutral-700 leading-relaxed mb-4">
                Puede solicitar cambios o devoluciones dentro de los <strong>7 días</strong>
                posteriores a la recepción del producto, siempre que:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-neutral-700">
                <li>El producto esté sin usar, con etiquetas originales</li>
                <li>Se presente el comprobante de compra</li>
                <li>El producto no tenga signos de uso o daño</li>
              </ul>
              <p className="text-neutral-700 leading-relaxed mt-4">
                Para solicitar un cambio o devolución, contáctenos a través de WhatsApp
                al <strong>+51 972 327 236</strong>.
              </p>
            </section>

            {/* 8. Propiedad Intelectual */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                8. Propiedad Intelectual
              </h2>
              <p className="text-neutral-700 leading-relaxed">
                Todo el contenido de este sitio web, incluyendo pero no limitado a textos,
                gráficos, logos, imágenes y software, es propiedad de Vialine y está protegido
                por las leyes de propiedad intelectual del Perú y tratados internacionales.
              </p>
            </section>

            {/* 9. Limitación de Responsabilidad */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                9. Limitación de Responsabilidad
              </h2>
              <p className="text-neutral-700 leading-relaxed">
                Vialine no será responsable por daños indirectos, incidentales o consecuentes
                derivados del uso o la imposibilidad de uso de este sitio web o de los productos
                adquiridos.
              </p>
            </section>

            {/* 10. Modificaciones */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                10. Modificaciones de los Términos
              </h2>
              <p className="text-neutral-700 leading-relaxed">
                Vialine se reserva el derecho de modificar estos términos y condiciones en
                cualquier momento. Las modificaciones entrarán en vigor inmediatamente después
                de su publicación en el sitio web.
              </p>
            </section>

            {/* 11. Ley Aplicable */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                11. Ley Aplicable y Jurisdicción
              </h2>
              <p className="text-neutral-700 leading-relaxed">
                Estos términos y condiciones se rigen por las leyes de la República del Perú.
                Cualquier disputa será resuelta en los tribunales de Lima, Perú.
              </p>
            </section>

            {/* Contacto */}
            <section className="mt-12 p-6 bg-rose-50 rounded-xl border border-rose-100">
              <h3 className="text-xl font-bold text-neutral-900 mb-3">
                ¿Tienes preguntas?
              </h3>
              <p className="text-neutral-700 mb-4">
                Si tienes alguna pregunta sobre estos términos y condiciones, puedes contactarnos:
              </p>
              <div className="space-y-2 text-neutral-700">
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
