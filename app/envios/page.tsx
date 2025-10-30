import Link from "next/link"
import { ChevronLeft, Package, Truck, Clock } from "lucide-react"

export const metadata = {
  title: "Envíos | Vialine",
  description: "Información sobre envíos y entregas. Enviamos a todo Lima Metropolitana.",
}

export default function EnviosPage() {
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
          <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">Envíos</h1>
          <p className="text-lg text-neutral-600">
            Información sobre nuestros envíos y tiempos de entrega
          </p>
        </div>

        {/* Content */}
        <div className="space-y-8">
          {/* Zonas de envío */}
          <section className="bg-white rounded-lg border border-neutral-200 p-6 md:p-8">
            <div className="flex items-start gap-4 mb-4">
              <Package className="h-6 w-6 text-neutral-700 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-xl font-semibold text-neutral-900 mb-3">Zonas de Envío</h2>
                <p className="text-neutral-700 mb-4">
                  Realizamos envíos a todo Lima Metropolitana y Callao.
                </p>
                <ul className="space-y-2 text-neutral-700">
                  <li>• Lima Centro (San Isidro, Miraflores, Surco, La Molina, etc.)</li>
                  <li>• Lima Norte (Los Olivos, Independencia, San Martín de Porres, etc.)</li>
                  <li>• Lima Sur (Villa El Salvador, Chorrillos, Barranco, etc.)</li>
                  <li>• Lima Este (Ate, Santa Anita, San Juan de Lurigancho, etc.)</li>
                  <li>• Callao</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Tiempo de entrega */}
          <section className="bg-white rounded-lg border border-neutral-200 p-6 md:p-8">
            <div className="flex items-start gap-4 mb-4">
              <Clock className="h-6 w-6 text-neutral-700 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-xl font-semibold text-neutral-900 mb-3">Tiempo de Entrega</h2>
                <div className="space-y-3 text-neutral-700">
                  <div>
                    <p className="font-medium">Lima Centro</p>
                    <p className="text-sm text-neutral-600">24-48 horas hábiles</p>
                  </div>
                  <div>
                    <p className="font-medium">Lima Norte, Sur, Este y Callao</p>
                    <p className="text-sm text-neutral-600">48-72 horas hábiles</p>
                  </div>
                </div>
                <p className="text-sm text-neutral-600 mt-4">
                  *Los tiempos de entrega pueden variar según disponibilidad del producto y tráfico.
                </p>
              </div>
            </div>
          </section>

          {/* Costo de envío */}
          <section className="bg-white rounded-lg border border-neutral-200 p-6 md:p-8">
            <div className="flex items-start gap-4 mb-4">
              <Truck className="h-6 w-6 text-neutral-700 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-xl font-semibold text-neutral-900 mb-3">Costo de Envío</h2>
                <div className="space-y-3">
                  <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                    <p className="font-semibold text-emerald-900">
                      Envío GRATIS en compras mayores a S/ 150
                    </p>
                  </div>
                  <div className="text-neutral-700">
                    <p className="mb-2">Compras menores a S/ 150:</p>
                    <p className="text-2xl font-bold text-neutral-900">S/ 10</p>
                    <p className="text-sm text-neutral-600 mt-1">Tarifa fija para todo Lima</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Seguimiento */}
          <section className="bg-white rounded-lg border border-neutral-200 p-6 md:p-8">
            <h2 className="text-xl font-semibold text-neutral-900 mb-3">Seguimiento de Pedido</h2>
            <p className="text-neutral-700 mb-4">
              Una vez que tu pedido sea despachado, recibirás:
            </p>
            <ul className="space-y-2 text-neutral-700">
              <li>• Confirmación por WhatsApp con código de seguimiento</li>
              <li>• Actualizaciones sobre el estado de tu pedido</li>
              <li>• Notificación cuando el pedido esté en camino</li>
            </ul>
          </section>

          {/* Contacto */}
          <section className="bg-neutral-100 rounded-lg p-6 md:p-8 text-center">
            <h2 className="text-xl font-semibold text-neutral-900 mb-3">¿Tienes dudas?</h2>
            <p className="text-neutral-700 mb-4">
              Contáctanos por WhatsApp para más información sobre tu envío
            </p>
            <a
              href="https://wa.me/51972327236?text=Hola,%20tengo%20una%20consulta%20sobre%20env%C3%ADos"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-neutral-900 text-white px-6 py-3 rounded-lg hover:bg-neutral-800 transition-colors"
            >
              Contactar por WhatsApp
            </a>
          </section>
        </div>
      </div>
    </div>
  )
}
