import Link from "next/link"
import { ChevronLeft, MessageCircle, Mail, Clock, Instagram, Facebook } from "lucide-react"

export const metadata = {
  title: "Contacto | Vialine",
  description: "Contáctanos por WhatsApp, email o redes sociales. Estamos aquí para ayudarte.",
}

export default function ContactoPage() {
  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="mx-auto max-w-4xl px-4 py-12 md:py-16">
        {/* Back button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-neutral-600 hover:text-neutral-900 mb-8"
        >
          <ChevronLeft className="h-4 w-4" />
          Volver al inicio
        </Link>

        {/* Header */}
        <div className="mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">Contacto</h1>
          <p className="text-lg text-neutral-600">
            Estamos aquí para ayudarte. Elige tu canal preferido de comunicación
          </p>
        </div>

        {/* Content */}
        <div className="space-y-6">
          {/* WhatsApp - Recomendado */}
          <section className="bg-emerald-50 border-2 border-emerald-200 rounded-lg p-6 md:p-8 relative">
            <div className="absolute top-4 right-4 bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-full">
              RECOMENDADO
            </div>
            <div className="flex items-start gap-4">
              <MessageCircle className="h-8 w-8 text-emerald-700 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h2 className="text-2xl font-semibold text-neutral-900 mb-2">WhatsApp</h2>
                <p className="text-neutral-700 mb-4">
                  Respuesta más rápida. Ideal para consultas sobre pedidos, tallas, stock y
                  disponibilidad.
                </p>
                <a
                  href="https://wa.me/51972327236?text=Hola,%20tengo%20una%20consulta"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block"
                >
                  <div className="bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors font-medium">
                    +51 972 327 236
                  </div>
                </a>
              </div>
            </div>
          </section>

          {/* Email */}
          <section className="bg-white rounded-lg border border-neutral-200 p-6 md:p-8">
            <div className="flex items-start gap-4">
              <Mail className="h-6 w-6 text-neutral-700 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-xl font-semibold text-neutral-900 mb-2">Email</h2>
                <p className="text-neutral-700 mb-3">
                  Para consultas detalladas, cotizaciones o pedidos especiales
                </p>
                <a
                  href="mailto:ventas@vialineperu.com"
                  className="text-neutral-900 font-medium hover:underline"
                >
                  ventas@vialineperu.com
                </a>
                <p className="text-sm text-neutral-600 mt-2">
                  *Tiempo de respuesta: 24-48 horas hábiles
                </p>
              </div>
            </div>
          </section>

          {/* Horario */}
          <section className="bg-white rounded-lg border border-neutral-200 p-6 md:p-8">
            <div className="flex items-start gap-4">
              <Clock className="h-6 w-6 text-neutral-700 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-xl font-semibold text-neutral-900 mb-3">Horario de Atención</h2>
                <div className="space-y-2 text-neutral-700">
                  <div className="flex justify-between">
                    <span className="font-medium">Lunes a Viernes:</span>
                    <span>9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Sábados:</span>
                    <span>10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Domingos:</span>
                    <span className="text-neutral-500">Cerrado</span>
                  </div>
                </div>
                <p className="text-sm text-neutral-600 mt-3">Horario de Lima, Perú (UTC-5)</p>
              </div>
            </div>
          </section>

          {/* Redes sociales */}
          <section className="bg-white rounded-lg border border-neutral-200 p-6 md:p-8">
            <h2 className="text-xl font-semibold text-neutral-900 mb-4">Redes Sociales</h2>
            <p className="text-neutral-700 mb-4">
              Síguenos para ver nuestras últimas colecciones, ofertas y novedades
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="https://instagram.com/vialineperu"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-colors"
              >
                <Instagram className="h-5 w-5" />
                <span className="font-medium">@vialineperu</span>
              </a>
              <a
                href="https://facebook.com/vialineperu"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Facebook className="h-5 w-5" />
                <span className="font-medium">Vialine Perú</span>
              </a>
            </div>
            <p className="text-sm text-neutral-600 mt-3">
              *Las redes sociales son solo informativas. Para compras o consultas, usa WhatsApp.
            </p>
          </section>

          {/* Preguntas frecuentes */}
          <section className="bg-neutral-100 rounded-lg p-6 md:p-8">
            <h2 className="text-xl font-semibold text-neutral-900 mb-4">Preguntas Frecuentes</h2>
            <div className="space-y-4 text-neutral-700">
              <div>
                <p className="font-medium mb-1">¿Tienen tienda física?</p>
                <p className="text-sm text-neutral-600">
                  Actualmente somos 100% online. Realizamos envíos a todo Lima Metropolitana.
                </p>
              </div>
              <div>
                <p className="font-medium mb-1">¿Puedo recoger mi pedido?</p>
                <p className="text-sm text-neutral-600">
                  Por el momento solo hacemos entregas a domicilio. Contáctanos por WhatsApp para
                  coordinar.
                </p>
              </div>
              <div>
                <p className="font-medium mb-1">¿Hacen ventas al por mayor?</p>
                <p className="text-sm text-neutral-600">
                  Sí, contáctanos por WhatsApp o email para cotizaciones especiales.
                </p>
              </div>
            </div>
          </section>

          {/* CTA final */}
          <section className="bg-neutral-900 text-white rounded-lg p-6 md:p-8 text-center">
            <h2 className="text-2xl font-semibold mb-3">¿Listo para comprar?</h2>
            <p className="text-neutral-300 mb-6">
              Explora nuestro catálogo y encuentra tu look perfecto
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/mujer"
                className="inline-block bg-white text-neutral-900 px-6 py-3 rounded-lg hover:bg-neutral-100 transition-colors font-medium"
              >
                Ver colección Mujer
              </Link>
              <Link
                href="/nina"
                className="inline-block bg-white text-neutral-900 px-6 py-3 rounded-lg hover:bg-neutral-100 transition-colors font-medium"
              >
                Ver colección Niña
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
