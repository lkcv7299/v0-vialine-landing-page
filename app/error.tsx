"use client"

import { useEffect } from "react"
import { AlertTriangle, RefreshCw, Home } from "lucide-react"
import Link from "next/link"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log del error para debugging (en producción usar un servicio como Sentry)
    console.error("Error capturado:", error)
  }, [error])

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-rose-100 rounded-full mb-6">
          <AlertTriangle className="w-8 h-8 text-rose-600" />
        </div>

        <h1 className="text-2xl font-bold text-neutral-900 mb-2">
          ¡Algo salió mal!
        </h1>

        <p className="text-neutral-600 mb-6">
          Lo sentimos, ocurrió un error inesperado. Por favor intenta de nuevo o regresa al inicio.
        </p>

        {error.digest && (
          <p className="text-xs text-neutral-400 mb-6 font-mono">
            Código de error: {error.digest}
          </p>
        )}

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => reset()}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-rose-600 text-white rounded-lg font-semibold hover:bg-rose-700 transition"
          >
            <RefreshCw className="w-4 h-4" />
            Intentar de nuevo
          </button>

          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-neutral-300 text-neutral-700 rounded-lg font-semibold hover:bg-neutral-50 transition"
          >
            <Home className="w-4 h-4" />
            Ir al inicio
          </Link>
        </div>

        <p className="mt-8 text-sm text-neutral-500">
          ¿Necesitas ayuda?{" "}
          <a
            href="https://wa.me/51972327236"
            target="_blank"
            rel="noopener noreferrer"
            className="text-rose-600 hover:underline"
          >
            Contáctanos por WhatsApp
          </a>
        </p>
      </div>
    </div>
  )
}
