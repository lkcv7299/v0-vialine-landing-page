"use client"

import { useEffect } from "react"
import { AlertTriangle, RefreshCw, ShoppingCart, MessageCircle } from "lucide-react"
import Link from "next/link"

export default function CheckoutError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error("Error en checkout:", error)
  }, [error])

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-100 rounded-full mb-6">
          <AlertTriangle className="w-8 h-8 text-amber-600" />
        </div>

        <h1 className="text-2xl font-bold text-neutral-900 mb-2">
          Error en el proceso de pago
        </h1>

        <p className="text-neutral-600 mb-6">
          Hubo un problema al procesar tu compra. No te preocupes, tu carrito está seguro.
        </p>

        {error.digest && (
          <p className="text-xs text-neutral-400 mb-6 font-mono bg-neutral-100 p-2 rounded">
            Referencia: {error.digest}
          </p>
        )}

        <div className="flex flex-col gap-3">
          <button
            onClick={() => reset()}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-rose-600 text-white rounded-lg font-semibold hover:bg-rose-700 transition"
          >
            <RefreshCw className="w-4 h-4" />
            Intentar de nuevo
          </button>

          <Link
            href="/carrito"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-neutral-300 text-neutral-700 rounded-lg font-semibold hover:bg-neutral-50 transition"
          >
            <ShoppingCart className="w-4 h-4" />
            Volver al carrito
          </Link>
        </div>

        <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg text-left">
          <p className="text-sm text-blue-800 mb-2">
            <strong>¿El error persiste?</strong>
          </p>
          <p className="text-sm text-blue-700 mb-3">
            Contáctanos por WhatsApp y te ayudaremos a completar tu compra.
          </p>
          <a
            href="https://wa.me/51972327236?text=Hola!%20Tengo%20un%20problema%20en%20el%20checkout"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-green-600 hover:text-green-700 font-medium"
          >
            <MessageCircle className="w-4 h-4" />
            Escribir por WhatsApp
          </a>
        </div>
      </div>
    </div>
  )
}
