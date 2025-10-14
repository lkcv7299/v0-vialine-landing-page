"use client"

import { useCart } from "@/contexts/CartContext"
import { getAssetPath } from "@/lib/assets"
import { buildWhatsAppUrl } from "@/lib/contact"
import { ShoppingBag, Trash2, Minus, Plus } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

const FREE_SHIPPING_THRESHOLD = 269

export default function CarritoPage() {
  const { items, updateQuantity, removeItem, total } = useCart()

  const subtotal = total
  const shippingCost = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 15
  const finalTotal = subtotal + shippingCost
  const amountUntilFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal)
  const freeShippingProgress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100)

  const handleCheckout = () => {
    // Build WhatsApp message
    let message = "¡Hola! Quiero realizar el siguiente pedido:\n\n"

    items.forEach((item) => {
      const itemSubtotal = item.product.price * item.quantity
      message += `- ${item.product.name} (${item.selectedColor}, ${item.selectedSize}) x${item.quantity} = S/ ${itemSubtotal.toFixed(2)}\n`
    })

    message += `\nSUBTOTAL: S/ ${subtotal.toFixed(2)}\n`
    message += `ENVÍO: ${shippingCost === 0 ? "GRATIS" : `S/ ${shippingCost.toFixed(2)}`}\n`
    message += `TOTAL: S/ ${finalTotal.toFixed(2)}\n\n`
    message += "Nombre: _______\n"
    message += "Dirección: _______\n"
    message += "Teléfono: _______"

    // Open WhatsApp
    window.open(buildWhatsAppUrl(message), "_blank")
  }

  // Empty state
  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-neutral-50 py-12 px-4">
        <div className="mx-auto max-w-7xl">
          <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
            <ShoppingBag className="h-24 w-24 text-neutral-300 mb-6" />
            <h1 className="text-3xl font-bold text-neutral-900 mb-2">Tu carrito está vacío</h1>
            <p className="text-neutral-600 mb-8">Agrega algunos productos para comenzar</p>
            <Link
              href="/mujer"
              className="inline-flex items-center justify-center rounded-lg bg-neutral-900 px-8 py-3 text-white font-medium hover:bg-neutral-800 transition-colors"
            >
              Explorar Productos
            </Link>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-neutral-50 py-8 px-4">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-3xl font-bold text-neutral-900 mb-8">Carrito de Compras</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <CartItemRow
                key={`${item.product.slug}-${item.selectedColor}-${item.selectedSize}`}
                item={item}
                onUpdateQuantity={updateQuantity}
                onRemove={removeItem}
              />
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-4">
              <h2 className="text-xl font-bold text-neutral-900 mb-6">Resumen del Pedido</h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-neutral-600">
                  <span>Subtotal</span>
                  <span>S/ {subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-neutral-600">
                  <span>Envío</span>
                  <span className={shippingCost === 0 ? "text-green-600 font-semibold" : ""}>
                    {shippingCost === 0 ? "GRATIS" : `S/ ${shippingCost.toFixed(2)}`}
                  </span>
                </div>
              </div>

              {/* Free Shipping Progress */}
              {subtotal < FREE_SHIPPING_THRESHOLD && (
                <div className="mb-6 p-4 bg-neutral-50 rounded-lg">
                  <p className="text-sm text-neutral-600 mb-2">
                    <span className="font-semibold text-green-600">S/ {amountUntilFreeShipping.toFixed(2)}</span> para
                    envío gratis
                  </p>
                  <div className="w-full bg-neutral-200 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-green-600 h-full transition-all duration-300"
                      style={{ width: `${freeShippingProgress}%` }}
                    />
                  </div>
                </div>
              )}

              <div className="border-t border-neutral-200 pt-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-neutral-900">Total</span>
                  <span className="text-2xl font-bold text-neutral-900">S/ {finalTotal.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-4 rounded-lg transition-colors shadow-sm hover:shadow-md"
              >
                Finalizar por WhatsApp
              </button>

              <p className="text-xs text-neutral-500 text-center mt-4">
                Serás redirigido a WhatsApp para completar tu pedido
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

function CartItemRow({
  item,
  onUpdateQuantity,
  onRemove,
}: {
  item: any
  onUpdateQuantity: (slug: string, color: string, size: string, quantity: number) => void
  onRemove: (slug: string, color: string, size: string) => void
}) {
  const [imageError, setImageError] = useState(false)
  const imagePath = getAssetPath(item.product.slug, item.product.category, item.selectedColor, 0)

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 flex gap-4 hover:shadow-md transition-shadow">
      {/* Product Image */}
      <div className="relative h-24 w-24 flex-shrink-0 rounded-lg overflow-hidden bg-neutral-100">
        <Image
          src={imageError ? "/placeholder.svg?height=100&width=100" : imagePath}
          alt={item.product.name}
          fill
          className="object-cover"
          onError={() => setImageError(true)}
        />
      </div>

      {/* Product Details */}
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-neutral-900 mb-1">{item.product.name}</h3>
        <p className="text-sm text-neutral-600 mb-2">
          {item.selectedColor} • {item.selectedSize}
        </p>
        <p className="text-sm text-neutral-900 font-medium">S/ {item.product.price.toFixed(2)}</p>
      </div>

      {/* Quantity Controls */}
      <div className="flex flex-col items-end justify-between">
        <button
          onClick={() => onRemove(item.product.slug, item.selectedColor, item.selectedSize)}
          className="text-neutral-400 hover:text-rose-600 transition-colors p-1"
          aria-label="Eliminar producto"
        >
          <Trash2 className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() =>
              onUpdateQuantity(item.product.slug, item.selectedColor, item.selectedSize, item.quantity - 1)
            }
            disabled={item.quantity <= 1}
            className="border border-neutral-300 rounded-lg p-1 hover:bg-neutral-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            aria-label="Disminuir cantidad"
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="w-8 text-center font-medium">{item.quantity}</span>
          <button
            onClick={() =>
              onUpdateQuantity(item.product.slug, item.selectedColor, item.selectedSize, item.quantity + 1)
            }
            className="border border-neutral-300 rounded-lg p-1 hover:bg-neutral-100 transition-colors"
            aria-label="Aumentar cantidad"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>

        <p className="font-semibold text-neutral-900">S/ {(item.product.price * item.quantity).toFixed(2)}</p>
      </div>
    </div>
  )
}
