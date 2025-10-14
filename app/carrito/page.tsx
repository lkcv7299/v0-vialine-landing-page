"use client"

import Link from "next/link"
import { useCart } from "@/contexts/CartContext"
import { Trash2, ShoppingBag, Minus, Plus } from "lucide-react"
import { buildWhatsAppUrl } from "@/lib/contact"

const FREE_SHIPPING_THRESHOLD = 269

export default function CarritoPage() {
  const { items, total, updateQuantity, removeItem } = useCart()

  const shippingCost = total >= FREE_SHIPPING_THRESHOLD ? 0 : 15
  const finalTotal = total + shippingCost
  const remainingForFreeShipping = FREE_SHIPPING_THRESHOLD - total

  const generateWhatsAppMessage = () => {
    let message = "¡Hola! Quiero realizar el siguiente pedido:\n\n"
    
    items.forEach((item) => {
      const subtotal = item.product.price * item.quantity
      message += `• ${item.product.title} (${item.selectedColor}, ${item.selectedSize}) x${item.quantity} = S/ ${subtotal.toFixed(2)}\n`
    })
    
    message += `\nSUBTOTAL: S/ ${total.toFixed(2)}`
    message += `\nENVÍO: ${shippingCost === 0 ? "GRATIS" : `S/ ${shippingCost.toFixed(2)}`}`
    message += `\nTOTAL: S/ ${finalTotal.toFixed(2)}`
    message += `\n\nNombre: _______`
    message += `\nDirección: _______`
    message += `\nTeléfono: _______`
    
    return message
  }

  const handleCheckout = () => {
    const message = generateWhatsAppMessage()
    const whatsappUrl = buildWhatsAppUrl(message)
    window.open(whatsappUrl, "_blank")
  }

  // Empty state
  if (items.length === 0) {
    return (
      <main className="mx-auto max-w-4xl px-4 py-16">
        <div className="text-center py-16">
          <ShoppingBag className="w-20 h-20 mx-auto text-neutral-300 mb-6" />
          <h1 className="text-3xl font-bold mb-3">Tu carrito está vacío</h1>
          <p className="text-neutral-600 mb-8">Agrega algunos productos para comenzar</p>
          <Link
            href="/mujer"
            className="inline-block bg-rose-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-rose-700 transition"
          >
            Explorar productos
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 lg:py-12">
      <h1 className="text-3xl font-bold mb-8">Carrito de Compras</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items - Left Column */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => {
            const itemSubtotal = item.product.price * item.quantity

            return (
              <div
                key={`${item.product.slug}-${item.selectedColor}-${item.selectedSize}`}
                className="bg-white rounded-xl p-4 lg:p-6 border border-neutral-200 flex gap-4"
              >
                {/* Image */}
                <img
                  src={item.product.image}
                  alt={item.product.title}
                  className="w-24 h-24 lg:w-32 lg:h-32 object-cover rounded-lg flex-shrink-0"
                />

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between gap-4">
                    <div>
                      <h3 className="font-semibold text-lg">{item.product.title}</h3>
                      <p className="text-sm text-neutral-600 mt-1">
                        {item.selectedColor} • {item.selectedSize}
                      </p>
                      <p className="text-neutral-900 font-medium mt-2">
                        S/ {item.product.price.toFixed(2)}
                      </p>
                    </div>

                    {/* Remove button */}
                    <button
                      onClick={() => removeItem(item.product.slug, item.selectedColor, item.selectedSize)}
                      className="text-neutral-400 hover:text-rose-600 transition h-fit"
                      aria-label="Eliminar"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Quantity controls */}
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-2 border border-neutral-300 rounded-lg">
                      <button
                        onClick={() => updateQuantity(item.product.slug, item.selectedColor, item.selectedSize, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                        className="px-3 py-2 hover:bg-neutral-100 disabled:opacity-50 disabled:cursor-not-allowed transition rounded-l-lg"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="px-4 font-medium">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.slug, item.selectedColor, item.selectedSize, item.quantity + 1)}
                        className="px-3 py-2 hover:bg-neutral-100 transition rounded-r-lg"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Subtotal */}
                    <p className="font-bold text-lg">S/ {itemSubtotal.toFixed(2)}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Summary - Right Column (Sticky) */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl p-6 border border-neutral-200 sticky top-24">
            <h2 className="text-xl font-bold mb-6">Resumen del Pedido</h2>

            {/* Subtotal */}
            <div className="flex justify-between mb-3">
              <span className="text-neutral-600">Subtotal</span>
              <span className="font-medium">S/ {total.toFixed(2)}</span>
            </div>

            {/* Shipping */}
            <div className="flex justify-between mb-4">
              <span className="text-neutral-600">Envío</span>
              <span className={`font-medium ${shippingCost === 0 ? "text-green-600" : ""}`}>
                {shippingCost === 0 ? "GRATIS" : `S/ ${shippingCost.toFixed(2)}`}
              </span>
            </div>

            {/* Free shipping progress */}
            {remainingForFreeShipping > 0 && (
              <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-sm text-green-700 font-medium mb-2">
                  S/ {remainingForFreeShipping.toFixed(2)} para envío gratis
                </p>
                <div className="w-full bg-green-200 rounded-full h-2">
                  <div
                    className="bg-green-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${Math.min((total / FREE_SHIPPING_THRESHOLD) * 100, 100)}%` }}
                  />
                </div>
              </div>
            )}

            {/* Total */}
            <div className="border-t pt-4 mb-6">
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold">Total</span>
                <span className="text-2xl font-bold text-rose-600">S/ {finalTotal.toFixed(2)}</span>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              onClick={handleCheckout}
              className="w-full bg-green-600 text-white py-4 rounded-lg font-semibold hover:bg-green-700 transition flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Finalizar por WhatsApp
            </button>

            <p className="text-xs text-center text-neutral-500 mt-3">
              Serás redirigido a WhatsApp para completar tu pedido
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}