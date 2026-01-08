import Link from "next/link"
import { Home, Search, ShoppingBag } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <h1 className="text-8xl font-bold text-rose-600 mb-4">404</h1>

        <h2 className="text-2xl font-bold text-neutral-900 mb-2">
          Página no encontrada
        </h2>

        <p className="text-neutral-600 mb-8">
          Lo sentimos, la página que buscas no existe o ha sido movida.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-rose-600 text-white rounded-lg font-semibold hover:bg-rose-700 transition"
          >
            <Home className="w-4 h-4" />
            Ir al inicio
          </Link>

          <Link
            href="/mujer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-neutral-300 text-neutral-700 rounded-lg font-semibold hover:bg-neutral-50 transition"
          >
            <ShoppingBag className="w-4 h-4" />
            Ver productos
          </Link>
        </div>

        <div className="mt-8 p-4 bg-neutral-50 rounded-lg">
          <p className="text-sm text-neutral-600 mb-3">
            ¿Buscabas algo específico?
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            <Link
              href="/mujer"
              className="text-sm text-rose-600 hover:underline"
            >
              Mujer
            </Link>
            <span className="text-neutral-300">•</span>
            <Link
              href="/nina"
              className="text-sm text-rose-600 hover:underline"
            >
              Niña
            </Link>
            <span className="text-neutral-300">•</span>
            <Link
              href="/contacto"
              className="text-sm text-rose-600 hover:underline"
            >
              Contacto
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
