"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { CheckCircle2, Package, Mail, Phone, Calendar, FileText } from "lucide-react"
import confetti from "canvas-confetti"

export default function ConfirmacionContent() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get("orderId")
  const [showConfetti, setShowConfetti] = useState(false)

  // Calcular fecha estimada de entrega (2-3 días hábiles desde hoy)
  const getEstimatedDeliveryDate = () => {
    const today = new Date()
    const daysToAdd = 3 // 2-3 días
    const estimatedDate = new Date(today)
    estimatedDate.setDate(today.getDate() + daysToAdd)

    return estimatedDate.toLocaleDateString("es-PE", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  useEffect(() => {
    if (orderId && !showConfetti) {
      setShowConfetti(true)
      
      const duration = 3000
      const end = Date.now() + duration

      const frame = () => {
        confetti({
          particleCount: 2,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ["#E11D48", "#F472B6", "#FCA5A5"],
        })
        confetti({
          particleCount: 2,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ["#E11D48", "#F472B6", "#FCA5A5"],
        })

        if (Date.now() < end) {
          requestAnimationFrame(frame)
        }
      }

      frame()
    }
  }, [orderId, showConfetti])

  if (!orderId) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-2">Orden no encontrada</h2>
          <p className="text-neutral-600 mb-6">No se pudo encontrar la información de tu orden</p>
          <Link
            href="/mujer"
            className="inline-flex items-center px-6 py-3 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition"
          >
            Volver a la tienda
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-neutral-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
            <CheckCircle2 className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-2">
            ¡Gracias por tu compra!
          </h1>
          <p className="text-lg text-neutral-600">
            Tu orden ha sido recibida exitosamente
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-neutral-200 p-6 md:p-8 mb-6">
          <div className="flex items-center justify-between mb-6 pb-6 border-b border-neutral-200">
            <div>
              <p className="text-sm text-neutral-600 mb-1">Número de orden</p>
              <p className="text-2xl font-bold text-neutral-900">{orderId}</p>
            </div>
            <Package className="w-10 h-10 text-rose-600" />
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
              <Mail className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-blue-900">Confirmación enviada</p>
                <p className="text-sm text-blue-700">
                  Te enviamos un email con los detalles de tu pedido.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg">
              <Calendar className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-green-900">Fecha estimada de entrega</p>
                <p className="text-sm text-green-700 capitalize">
                  {getEstimatedDeliveryDate()}
                </p>
                <p className="text-xs text-green-600 mt-1">
                  <strong>Lima:</strong> 24-48 horas • <strong>Provincias:</strong> 3-7 días hábiles
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-purple-50 rounded-lg">
              <Phone className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-purple-900">Seguimiento de pedido</p>
                <p className="text-sm text-purple-700">
                  Te contactaremos por WhatsApp para coordinar la entrega.
                </p>
                <a
                  href="https://wa.me/51972327236"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-purple-600 hover:text-purple-700 underline mt-1 inline-block"
                >
                  +51 972 327 236
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-neutral-200 p-6 md:p-8 mb-6">
          <h2 className="text-xl font-semibold mb-4">¿Qué sigue?</h2>
          <ol className="space-y-3">
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center text-sm font-bold">
                1
              </span>
              <div>
                <p className="font-medium">Preparamos tu pedido</p>
                <p className="text-sm text-neutral-600">Verificamos la disponibilidad y empacamos con cuidado</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center text-sm font-bold">
                2
              </span>
              <div>
                <p className="font-medium">Te contactamos</p>
                <p className="text-sm text-neutral-600">Confirmamos tu dirección y coordinamos la entrega</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center text-sm font-bold">
                3
              </span>
              <div>
                <p className="font-medium">Enviamos tu pedido</p>
                <p className="text-sm text-neutral-600">¡Recibirás tu pedido en la puerta de tu casa!</p>
              </div>
            </li>
          </ol>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Link
            href={`/account/pedidos`}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-rose-600 text-white rounded-lg font-semibold hover:bg-rose-700 transition"
          >
            <Package className="w-4 h-4" />
            Ver detalles del pedido
          </Link>
          <Link
            href="/mujer"
            className="flex items-center justify-center gap-2 px-6 py-3 border-2 border-rose-600 text-rose-600 rounded-lg font-semibold hover:bg-rose-50 transition"
          >
            Seguir comprando
          </Link>
          <button
            onClick={() => window.print()}
            className="flex items-center justify-center gap-2 px-6 py-3 border-2 border-neutral-300 text-neutral-700 rounded-lg font-semibold hover:bg-neutral-50 transition"
          >
            <FileText className="w-4 h-4" />
            Descargar comprobante
          </button>
        </div>

      </div>
    </div>
  )
}