"use client"

import { X, ShoppingBag, Plus, Minus, Trash2 } from "lucide-react"
import Link from "next/link"
import { useCart } from "@/contexts/CartContext"
import Drawer from "@/components/ui/Drawer"
import { getProductColorImage } from "@/lib/assets"

interface CartDrawerProps {
  open: boolean
  onClose: () => void
}

export default function CartDrawer({ open, onClose }: CartDrawerProps) {
  const { items, total, removeItem, updateQuantity } = useCart()

  return (
    <Drawer
      open={open}
      onClose={onClose}
      side="right"
      title="Carrito de compras"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-neutral-200 bg-white">
        <h2 className="text-xl font-bold text-neutral-900">
          Mi Carrito ({items.length})
        </h2>
        <button
          onClick={onClose}
          className="p-2 hover:bg-neutral-100 rounded-full transition"
          aria-label="Cerrar carrito"
        >
          <X className="w-5 h-5 text-neutral-700" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full p-6 text-center">
            <ShoppingBag className="w-16 h-16 text-neutral-300 mb-4" />
            <h3 className="text-lg font-semibold text-neutral-900 mb-2">
              Tu carrito está vacío
            </h3>
            <p className="text-neutral-600 mb-6">
              Agrega productos para comenzar tu compra
            </p>
            <Link
              href="/mujer"
              onClick={onClose}
              className="inline-block px-6 py-3 bg-neutral-900 text-white rounded-lg font-semibold hover:bg-neutral-800 transition"
            >
              Explorar productos
            </Link>
          </div>
        ) : (
          <div className="p-3 lg:p-4 space-y-3 lg:space-y-4">
            {items.map((item) => {
              const itemKey = `${item.product.slug}-${item.selectedColor}-${item.selectedSize}`
              const stockLimit = item.product.inventory || 999
              const imagePath = getProductColorImage(item.product, item.selectedColor, 0)

              return (
                <div key={itemKey} className="flex gap-3 lg:gap-4 pb-3 lg:pb-4 border-b border-neutral-200 last:border-0">
                  {/* Image - Más pequeña en mobile */}
                  <Link
                    href={`/producto/${item.product.slug}`}
                    onClick={onClose}
                    className="relative w-20 h-20 lg:w-24 lg:h-24 rounded-lg overflow-hidden bg-neutral-100 flex-shrink-0 hover:opacity-80 transition"
                  >
                    <img
                      src={imagePath}
                      alt={item.product.title}
                      className="w-full h-full object-cover"
                    />
                  </Link>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/producto/${item.product.slug}`}
                      onClick={onClose}
                      className="block"
                    >
                      <h3 className="text-sm font-medium text-neutral-900 hover:text-rose-600 transition line-clamp-2">
                        {item.product.title}
                      </h3>
                    </Link>

                    <p className="text-xs text-neutral-600 mt-1">
                      {item.selectedColor} · {item.selectedSize}
                    </p>

                    <div className="flex items-center justify-between mt-3">
                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.product.slug,
                              item.selectedColor,
                              item.selectedSize,
                              item.quantity - 1
                            )
                          }
                          disabled={item.quantity <= 1}
                          className="w-7 h-7 rounded-full border border-neutral-300 flex items-center justify-center hover:border-neutral-900 hover:text-neutral-900 transition disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:border-neutral-300 disabled:hover:text-neutral-900"
                          aria-label="Disminuir cantidad"
                        >
                          <Minus className="w-3 h-3" />
                        </button>

                        <span className="text-sm font-semibold text-neutral-900 min-w-[20px] text-center">
                          {item.quantity}
                        </span>

                        <button
                          onClick={() =>
                            updateQuantity(
                              item.product.slug,
                              item.selectedColor,
                              item.selectedSize,
                              item.quantity + 1
                            )
                          }
                          disabled={item.quantity >= stockLimit}
                          className="w-7 h-7 rounded-full border border-neutral-300 flex items-center justify-center hover:border-neutral-900 hover:text-neutral-900 transition disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:border-neutral-300 disabled:hover:text-neutral-900"
                          aria-label="Aumentar cantidad"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() =>
                          removeItem(item.product.slug, item.selectedColor, item.selectedSize)
                        }
                        className="p-1.5 text-neutral-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
                        aria-label="Eliminar del carrito"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Price */}
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-sm font-bold text-neutral-900">
                        S/ {(item.product.price * item.quantity).toFixed(2)}
                      </span>
                      {item.quantity > 1 && (
                        <span className="text-xs text-neutral-500">
                          S/ {item.product.price.toFixed(2)} c/u
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Footer - Más compacto en mobile */}
      {items.length > 0 && (
        <div className="border-t border-neutral-200 p-3 lg:p-4 space-y-3 lg:space-y-4 bg-white">
          {/* Subtotal */}
          <div className="space-y-1.5 lg:space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-neutral-600">Subtotal</span>
              <span className="font-semibold text-neutral-900">
                S/ {total.toFixed(2)}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-neutral-600">Envío</span>
              <span className="text-neutral-600">
                {total >= 269 ? (
                  <span className="text-rose-600 font-medium">Gratis</span>
                ) : (
                  "S/ 15.00"
                )}
              </span>
            </div>
          </div>

          {/* Total */}
          <div className="flex items-center justify-between pt-2 lg:pt-3 border-t border-neutral-200">
            <span className="text-base lg:text-lg font-bold text-neutral-900">Total</span>
            <span className="text-xl lg:text-2xl font-bold text-neutral-900">
              S/ {(total + (total >= 269 ? 0 : 15)).toFixed(2)}
            </span>
          </div>

          {/* Free shipping message */}
          {total < 269 && (
            <p className="text-xs text-center text-neutral-600">
              Agrega S/ {(269 - total).toFixed(2)} más para envío gratis
            </p>
          )}

          {/* Action Buttons - Más compactos en mobile */}
          <div className="space-y-2">
            <Link
              href="/checkout"
              onClick={onClose}
              className="block w-full bg-rose-600 text-white text-center py-2.5 lg:py-3 rounded-lg font-bold text-sm lg:text-base hover:bg-rose-700 active:bg-rose-800 transition"
            >
              Ir al checkout
            </Link>
            <Link
              href="/carrito"
              onClick={onClose}
              className="block w-full border-2 border-neutral-300 text-neutral-900 text-center py-2.5 lg:py-3 rounded-lg font-semibold text-sm lg:text-base hover:border-neutral-400 active:bg-neutral-100 transition"
            >
              Ver carrito completo
            </Link>
          </div>
        </div>
      )}
    </Drawer>
  )
}
