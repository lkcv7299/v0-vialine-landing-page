"use client"

import Image from "next/image"
import { Truck, Tag } from "lucide-react"
import { getProductColorImage } from "@/lib/assets"
import type { CartItem } from "@/contexts/CartContext"

type AppliedCoupon = {
  code: string
  discount: number
  type: "percentage" | "fixed"
} | null

type OrderSummaryProps = {
  items: CartItem[]
  total: number
  discount: number
  shippingCost: number
  finalTotal: number
  subtotalAfterDiscount: number
  appliedCoupon: AppliedCoupon
  removeCoupon: () => void
}

export default function OrderSummary({
  items,
  total,
  discount,
  shippingCost,
  finalTotal,
  subtotalAfterDiscount,
  appliedCoupon,
  removeCoupon,
}: OrderSummaryProps) {
  const FREE_SHIPPING_THRESHOLD = 269

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-6 sticky top-24">
      <h2 className="text-xl font-semibold mb-6">Resumen de la Orden</h2>

      {/* Items */}
      <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
        {items.map((item) => {
          const imagePath = getProductColorImage(item.product, item.selectedColor, 0)
          return (
            <div key={`${item.product.slug}-${item.selectedColor}-${item.selectedSize}`} className="flex gap-3">
              <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                <Image
                  src={imagePath}
                  alt={item.product.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-sm truncate">{item.product.title}</h3>
                <p className="text-xs text-neutral-600">
                  {item.selectedColor} • {item.selectedSize}
                </p>
                <p className="text-sm font-medium">
                  S/ {item.product.price} x {item.quantity}
                </p>
              </div>
              <div className="font-semibold">
                S/ {(item.product.price * item.quantity).toFixed(2)}
              </div>
            </div>
          )
        })}
      </div>

      {/* Totales */}
      <div className="space-y-2 border-t border-neutral-200 pt-4">
        <div className="flex justify-between text-neutral-700">
          <span>Subtotal</span>
          <span>S/ {total.toFixed(2)}</span>
        </div>

        {/* Mostrar cupón aplicado */}
        {appliedCoupon && discount > 0 && (
          <div className="bg-rose-50 border border-rose-200 rounded-lg p-3 -mx-2">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <Tag className="w-4 h-4 text-rose-600" />
                  <span className="text-sm font-semibold text-rose-700">
                    Cupón: {appliedCoupon.code}
                  </span>
                </div>
                <p className="text-xs text-rose-600 mt-1">
                  {appliedCoupon.type === "percentage"
                    ? `${appliedCoupon.discount}% de descuento`
                    : `S/ ${appliedCoupon.discount} de descuento`}
                </p>
              </div>
              <div className="text-right">
                <span className="text-sm font-semibold text-rose-700">
                  - S/ {discount.toFixed(2)}
                </span>
                <button
                  onClick={removeCoupon}
                  className="block text-xs text-rose-600 hover:text-rose-700 mt-1"
                >
                  Quitar
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-between text-neutral-700">
          <span className="flex items-center gap-2">
            <Truck className="w-4 h-4" />
            Envío
          </span>
          <span>{shippingCost === 0 ? "GRATIS" : `S/ ${shippingCost.toFixed(2)}`}</span>
        </div>
        {subtotalAfterDiscount <= FREE_SHIPPING_THRESHOLD && (
          <p className="text-sm text-rose-600">
            Te faltan S/ {(FREE_SHIPPING_THRESHOLD - subtotalAfterDiscount).toFixed(2)} para envío gratis
          </p>
        )}
        <div className="flex justify-between text-lg font-bold pt-2 border-t border-neutral-200">
          <span>Total</span>
          <span>S/ {finalTotal.toFixed(2)}</span>
        </div>
      </div>
    </div>
  )
}
