import Link from "next/link"
import { ShoppingBag } from "lucide-react"

export default function EmptyCart() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <ShoppingBag className="w-16 h-16 mx-auto text-neutral-300 mb-4" />
        <h2 className="text-2xl font-semibold mb-2">Tu carrito está vacío</h2>
        <p className="text-neutral-600 mb-6">Agrega productos para continuar con tu compra</p>
        <Link
          href="/mujer"
          className="inline-flex items-center px-6 py-3 bg-neutral-900 text-white rounded-lg hover:bg-neutral-800 transition"
        >
          Ir a comprar
        </Link>
      </div>
    </div>
  )
}
