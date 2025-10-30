import Link from "next/link"
import { ChevronLeft, RefreshCw, AlertCircle, CheckCircle2 } from "lucide-react"

export const metadata = {
  title: "Cambios y Devoluciones | Vialine",
  description: "Política de cambios y devoluciones. 7 días para solicitar cambio de talla o color.",
}

export default function CambiosPage() {
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
          <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
            Cambios y Devoluciones
          </h1>
          <p className="text-lg text-neutral-600">
            Nuestra política de cambios para tu tranquilidad
          </p>
        </div>

        {/* Content */}
        <div className="space-y-8">
          {/* Política de cambios */}
          <section className="bg-white rounded-lg border border-neutral-200 p-6 md:p-8">
            <div className="flex items-start gap-4 mb-4">
              <RefreshCw className="h-6 w-6 text-neutral-700 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-xl font-semibold text-neutral-900 mb-3">Política de Cambios</h2>
                <p className="text-neutral-700 mb-4">
                  Tienes <strong>7 días calendario</strong> desde la recepción de tu pedido para
                  solicitar un cambio de talla o color.
                </p>
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <p className="text-amber-900 font-medium">Importante:</p>
                  <p className="text-amber-800 text-sm mt-1">
                    Solo aceptamos cambios por talla o color. No realizamos devoluciones de dinero.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Condiciones */}
          <section className="bg-white rounded-lg border border-neutral-200 p-6 md:p-8">
            <div className="flex items-start gap-4 mb-4">
              <CheckCircle2 className="h-6 w-6 text-neutral-700 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-xl font-semibold text-neutral-900 mb-3">
                  Condiciones para Cambios
                </h2>
                <p className="text-neutral-700 mb-4">
                  Para poder procesar tu cambio, el producto debe cumplir con las siguientes
                  condiciones:
                </p>
                <ul className="space-y-3 text-neutral-700">
                  <li className="flex gap-3">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span>Prenda sin usar, sin lavar, sin perfumar</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span>Con todas sus etiquetas originales</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span>En su empaque original</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span>Dentro del plazo de 7 días desde la recepción</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Cómo solicitar cambio */}
          <section className="bg-white rounded-lg border border-neutral-200 p-6 md:p-8">
            <h2 className="text-xl font-semibold text-neutral-900 mb-4">
              ¿Cómo solicitar un cambio?
            </h2>
            <ol className="space-y-4 text-neutral-700">
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-neutral-900 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  1
                </span>
                <div>
                  <p className="font-medium">Contáctanos por WhatsApp</p>
                  <p className="text-sm text-neutral-600">
                    Envíanos un mensaje al +51 972 327 236 con tu número de orden
                  </p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-neutral-900 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  2
                </span>
                <div>
                  <p className="font-medium">Indica el motivo del cambio</p>
                  <p className="text-sm text-neutral-600">
                    Dinos si necesitas cambio de talla o color
                  </p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-neutral-900 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  3
                </span>
                <div>
                  <p className="font-medium">Coordina el recojo</p>
                  <p className="text-sm text-neutral-600">
                    Te indicaremos cómo enviar el producto de vuelta
                  </p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-neutral-900 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  4
                </span>
                <div>
                  <p className="font-medium">Recibe tu nuevo producto</p>
                  <p className="text-sm text-neutral-600">
                    Una vez recibido y verificado, enviaremos tu cambio
                  </p>
                </div>
              </li>
            </ol>
          </section>

          {/* Excepciones */}
          <section className="bg-white rounded-lg border border-neutral-200 p-6 md:p-8">
            <div className="flex items-start gap-4 mb-4">
              <AlertCircle className="h-6 w-6 text-red-600 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-xl font-semibold text-neutral-900 mb-3">
                  NO aceptamos cambios en:
                </h2>
                <ul className="space-y-2 text-neutral-700">
                  <li className="flex gap-2">
                    <span className="text-red-600">✗</span>
                    <span>Productos en oferta o promoción</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-red-600">✗</span>
                    <span>Prendas usadas, lavadas o sin etiquetas</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-red-600">✗</span>
                    <span>Productos dañados por mal uso</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-red-600">✗</span>
                    <span>Después de los 7 días calendario</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Costos */}
          <section className="bg-neutral-100 rounded-lg p-6 md:p-8">
            <h2 className="text-xl font-semibold text-neutral-900 mb-3">Costo del Cambio</h2>
            <p className="text-neutral-700 mb-4">
              El cliente asume el costo de envío del producto de vuelta. El envío del nuevo
              producto es sin costo.
            </p>
            <p className="text-sm text-neutral-600">
              *En caso de error de nuestra parte (producto incorrecto, defecto de fábrica), ambos
              envíos son sin costo para el cliente.
            </p>
          </section>

          {/* Contacto */}
          <section className="bg-white rounded-lg border border-neutral-200 p-6 md:p-8 text-center">
            <h2 className="text-xl font-semibold text-neutral-900 mb-3">¿Necesitas hacer un cambio?</h2>
            <p className="text-neutral-700 mb-4">Contáctanos por WhatsApp</p>
            <a
              href="https://wa.me/51972327236?text=Hola,%20necesito%20solicitar%20un%20cambio"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-neutral-900 text-white px-6 py-3 rounded-lg hover:bg-neutral-800 transition-colors"
            >
              Solicitar cambio
            </a>
          </section>
        </div>
      </div>
    </div>
  )
}
