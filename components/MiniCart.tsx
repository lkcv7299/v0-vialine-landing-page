"use client"

import { useCart } from "@/contexts/CartContext"
import Link from "next/link"
import Image from "next/image"
import { X } from "lucide-react"
import { getAssetPath } from "@/lib/assets"

type MiniCartProps = {
  onClose: () => void
}

export default function MiniCart({ onClose }: MiniCartProps) {
  const { items, total, removeItem } = useCart()

  if (items.length === 0) {
    return (
      <div className="absolute right-0 top-full mt-2 w-96 max-w-[90vw] rounded-lg bg-white p-6 shadow-xl ring-1 ring-black/5 animate-in fade-in slide-in-from-top-2 duration-200">
        <div className="text-center py-8">
          <p className="text-gray-500 mb-4">Tu carrito está vacío</p>
          <Link
            href="/shop/mujer/leggings"
            onClick={onClose}
            className="inline-block rounded-full bg-rose-600 px-6 py-2 text-sm font-medium text-white hover:bg-rose-700 transition"
          >
            Explorar productos
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="absolute right-0 top-full mt-2 w-96 max-w-[90vw] rounded-lg bg-white shadow-xl ring-1 ring-black/5 animate-in fade-in slide-in-from-top-2 duration-200">
      <div className="p-4 border-b border-gray-100">
        <h3 className="font-semibold text-gray-900">Mi Carrito ({items.length})</h3>
      </div>

      <div className="max-h-[400px] overflow-y-auto">
        {items.slice(0, 3).map((item, idx) => {
          const imagePath = getAssetPath(item.product.slug, item.product.category, item.selectedColor, 0)

          return (
            <div key={idx} className="flex gap-3 p-4 border-b border-gray-100 hover:bg-gray-50 transition">
              <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-md bg-gray-100">
                <Image
                  src={imagePath || "/placeholder.svg"}
                  alt={item.product.name}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </div>

              <div className="flex-1 min-w-0">
                <Link
                  href={`/producto/${item.product.slug}`}
                  onClick={onClose}
                  className="font-medium text-sm text-gray-900 hover:text-rose-600 line-clamp-1"
                >
                  {item.product.name}
                </Link>
                <p className="text-xs text-gray-500 mt-1">
                  {item.selectedColor} · {item.selectedSize}
                </p>
                <p className="text-sm font-medium text-gray-900 mt-1">
                  ${item.product.price.toLocaleString()} × {item.quantity}
                </p>
              </div>

              <button
                onClick={() => removeItem(item.product.slug, item.selectedColor, item.selectedSize)}
                className="shrink-0 text-gray-400 hover:text-rose-600 transition"
                aria-label="Eliminar del carrito"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          )
        })}

        {items.length > 3 && (
          <p className="text-center text-xs text-gray-500 py-2">+{items.length - 3} productos más</p>
        )}
      </div>

      <div className="p-4 border-t border-gray-200 bg-gray-50">
        <div className="flex justify-between items-center mb-3">
          <span className="font-semibold text-gray-900">Total</span>
          <span className="text-lg font-bold text-gray-900">${total.toLocaleString()}</span>
        </div>

        <Link
          href="/carrito"
          onClick={onClose}
          className="block w-full rounded-full bg-rose-600 px-6 py-3 text-center text-sm font-medium text-white hover:bg-rose-700 transition"
        >
          Ver carrito completo
        </Link>
      </div>
    </div>
  )
}
