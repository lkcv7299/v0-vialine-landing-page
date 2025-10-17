"use client"

import { AlertCircle, Package } from "lucide-react"
import { useEffect } from "react"

type StockIndicatorProps = {
  inventory?: number
  productSlug: string
}

export default function StockIndicator({ inventory, productSlug }: StockIndicatorProps) {
  // Si no hay inventory definido, no mostrar nada
  if (inventory === undefined) return null

  useEffect(() => {
    // Analytics tracking cuando se muestra stock bajo
    if (inventory > 0 && inventory < 5 && typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "view_low_stock", {
        event_category: "urgency",
        event_label: productSlug,
        value: inventory,
      })
    }
  }, [inventory, productSlug])

  // Out of stock
  if (inventory === 0) {
    return (
      <div className="flex items-center gap-2 px-4 py-3 bg-red-50 border border-red-200 rounded-lg">
        <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
        <div className="flex-1">
          <p className="text-sm font-semibold text-red-900">Agotado</p>
          <p className="text-xs text-red-700">Este producto está temporalmente sin stock</p>
        </div>
      </div>
    )
  }

  // Low stock (< 5)
  if (inventory < 5) {
    return (
      <div className="flex items-center gap-2 px-4 py-3 bg-orange-50 border border-orange-200 rounded-lg animate-pulse">
        <Package className="w-5 h-5 text-orange-600 flex-shrink-0" />
        <div className="flex-1">
          <p className="text-sm font-semibold text-orange-900">
            ¡Solo quedan {inventory} {inventory === 1 ? "unidad" : "unidades"}!
          </p>
          <p className="text-xs text-orange-700">Compra ahora antes de que se agote</p>
        </div>
      </div>
    )
  }

  // Stock normal (5-10)
  if (inventory <= 10) {
    return (
      <div className="flex items-center gap-2 px-3 py-2 bg-green-50 border border-green-200 rounded-lg">
        <Package className="w-4 h-4 text-green-600 flex-shrink-0" />
        <p className="text-sm text-green-800">
          <span className="font-medium">En stock</span> - {inventory} disponibles
        </p>
      </div>
    )
  }

  // Stock alto (> 10) - mostrar solo "En stock"
  return (
    <div className="flex items-center gap-2 px-3 py-2 bg-green-50 border border-green-200 rounded-lg">
      <Package className="w-4 h-4 text-green-600 flex-shrink-0" />
      <p className="text-sm font-medium text-green-800">En stock</p>
    </div>
  )
}
