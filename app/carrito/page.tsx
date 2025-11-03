"use client"

import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useCart } from "@/contexts/CartContext"
import { Trash2, ShoppingBag, Minus, Plus, ArrowRight } from "lucide-react"

const FREE_SHIPPING_THRESHOLD = 269

type ItemToDelete = {
  slug: string
  color: string
  size: string
  title: string
} | null

export default function CarritoPage() {
  const router = useRouter()
  const { items, total, updateQuantity, removeItem, appliedCoupon, applyCoupon, removeCoupon } = useCart()
  const [itemToDelete, setItemToDelete] = useState<ItemToDelete>(null)
  const [couponCode, setCouponCode] = useState("")
  const [couponError, setCouponError] = useState("")
  const [loadingCoupon, setLoadingCoupon] = useState(false)

  // Calcular descuento
  const discount = appliedCoupon
    ? appliedCoupon.type === "percentage"
      ? total * (appliedCoupon.discount / 100)
      : appliedCoupon.discount
    : 0

  const subtotalAfterDiscount = total - discount
  const shippingCost = subtotalAfterDiscount >= FREE_SHIPPING_THRESHOLD ? 0 : 15
  const finalTotal = subtotalAfterDiscount + shippingCost
  const remainingForFreeShipping = FREE_SHIPPING_THRESHOLD - subtotalAfterDiscount

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) {
      setCouponError("Por favor ingresa un código de cupón")
      return
    }

    setLoadingCoupon(true)
    setCouponError("")

    try {
      const response = await fetch("/api/validate-coupon", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: couponCode }),
      })

      const data = await response.json()

      if (data.valid) {
        // ✅ Usar context para guardar el cupón
        applyCoupon({
          code: couponCode,
          discount: data.discount,
          type: data.type,
        })
        setCouponError("")
        setCouponCode("")
      } else {
        setCouponError(data.error || "Cupón inválido")
      }
    } catch (error) {
      setCouponError("Error al validar el cupón")
    } finally {
      setLoadingCoupon(false)
    }
  }

  const handleRemoveCoupon = () => {
    // ✅ Usar context para remover el cupón
    removeCoupon()
    setCouponCode("")
    setCouponError("")
  }

  const handleGoToCheckout = () => {
    router.push("/checkout")
  }

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
        {/* ITEMS DEL CARRITO */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => {
            const itemSubtotal = item.product.price * item.quantity
            const stockLimit = item.product.inventory || 999
            const isAtStockLimit = item.quantity >= stockLimit

            return (
              <div
                key={`${item.product.slug}-${item.selectedColor}-${item.selectedSize}`}
                className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200 hover:shadow-md transition"
              >
                <div className="flex gap-4">
                  {/* Imagen */}
                  <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-neutral-100 flex-shrink-0">
                    <Image
                      src={item.product.image || "/placeholder.svg"}
                      alt={item.product.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <Link href={`/producto/${item.product.slug}`} className="hover:text-rose-600">
                      <h3 className="font-semibold text-lg mb-1">{item.product.title}</h3>
                    </Link>
                    <p className="text-sm text-neutral-600 mb-2">
                      {item.selectedColor} • {item.selectedSize}
                    </p>
                    <p className="text-lg font-bold text-rose-600">S/ {item.product.price.toFixed(2)}</p>
                  </div>

                  {/* Acciones */}
                  <div className="flex flex-col items-end justify-between">
                    <button
                      onClick={() => setItemToDelete({
                        slug: item.product.slug,
                        color: item.selectedColor,
                        size: item.selectedSize,
                        title: item.product.title
                      })}
                      className="text-neutral-400 hover:text-rose-600 transition"
                      aria-label="Eliminar del carrito"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>

                    {/* Controles de cantidad */}
                    <div className="flex flex-col items-end gap-2">
                      <div className="flex items-center gap-2 bg-neutral-100 rounded-lg">
                        <button
                          onClick={() => updateQuantity(item.product.slug, item.selectedColor, item.selectedSize, Math.max(1, item.quantity - 1))}
                          className="p-2 hover:bg-neutral-200 rounded-lg transition"
                          aria-label="Disminuir cantidad"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-8 text-center font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.slug, item.selectedColor, item.selectedSize, item.quantity + 1)}
                          disabled={isAtStockLimit}
                          className={`p-2 rounded-lg transition ${
                            isAtStockLimit
                              ? "bg-neutral-100 text-neutral-300 cursor-not-allowed"
                              : "hover:bg-neutral-200"
                          }`}
                          aria-label="Aumentar cantidad"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      {stockLimit < 999 && (
                        <span className="text-xs text-neutral-500">
                          Stock: {stockLimit}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Subtotal del item */}
                <div className="mt-4 pt-4 border-t border-neutral-200">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-neutral-600">Subtotal</span>
                    <span className="font-bold text-lg">S/ {itemSubtotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* RESUMEN DE ORDEN */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl p-6 shadow-lg border border-neutral-200 sticky top-4">
            <h2 className="text-xl font-bold mb-6">Resumen de orden</h2>

            {/* Cupón de descuento */}
            <div className="mb-6">
              <label className="text-sm font-medium text-neutral-700 mb-2 block">
                Código de cupón
              </label>
              {appliedCoupon ? (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-green-700">
                        {appliedCoupon.code}
                      </p>
                      <p className="text-xs text-green-600">
                        Cupón aplicado -
                        {appliedCoupon.type === "percentage"
                          ? ` ${appliedCoupon.discount}% de descuento`
                          : ` S/ ${appliedCoupon.discount} de descuento`}
                      </p>
                    </div>
                    <button
                      onClick={handleRemoveCoupon}
                      className="text-green-600 hover:text-green-700 text-sm font-medium"
                    >
                      Quitar
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                    placeholder="Ej: DESCUENTO10"
                    className="flex-1 px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-600 text-sm"
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        handleApplyCoupon()
                      }
                    }}
                  />
                  <button
                    onClick={handleApplyCoupon}
                    disabled={loadingCoupon}
                    className="px-4 py-2 bg-neutral-800 text-white rounded-lg hover:bg-neutral-900 transition text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loadingCoupon ? "..." : "Aplicar"}
                  </button>
                </div>
              )}
              {couponError && (
                <p className="text-xs text-rose-600 mt-1">{couponError}</p>
              )}
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-neutral-600">Subtotal ({items.length} {items.length === 1 ? "producto" : "productos"})</span>
                <span className="font-semibold">S/ {total.toFixed(2)}</span>
              </div>

              {appliedCoupon && discount > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-green-600">Descuento ({appliedCoupon.code})</span>
                  <span className="font-semibold text-green-600">- S/ {discount.toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between text-sm">
                <span className="text-neutral-600">Envío</span>
                <span className={`font-semibold ${shippingCost === 0 ? "text-green-600" : ""}`}>
                  {shippingCost === 0 ? "¡GRATIS!" : `S/ ${shippingCost.toFixed(2)}`}
                </span>
              </div>

              {/* Barra de progreso para envío gratis */}
              {remainingForFreeShipping > 0 && (
                <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-sm text-green-700 font-medium mb-2">
                    ¡Agrega S/ {remainingForFreeShipping.toFixed(2)} más para envío gratis!
                  </p>
                  <div className="w-full bg-green-200 rounded-full h-2">
                    <div
                      className="bg-green-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${Math.min((total / FREE_SHIPPING_THRESHOLD) * 100, 100)}%` }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Total */}
            <div className="border-t pt-4 mb-6">
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold">Total</span>
                <span className="text-2xl font-bold text-rose-600">S/ {finalTotal.toFixed(2)}</span>
              </div>
            </div>

            {/* BOTÓN PRINCIPAL: FINALIZAR COMPRA */}
            <button
              onClick={handleGoToCheckout}
              className="w-full bg-rose-600 text-white py-4 rounded-lg font-semibold hover:bg-rose-700 transition flex items-center justify-center gap-2 mb-3 shadow-md hover:shadow-lg"
            >
              Finalizar compra
              <ArrowRight className="w-5 h-5" />
            </button>

            {/* Información de seguridad */}
            <div className="text-xs text-center text-neutral-500 space-y-1">
              <p>✓ Compra 100% segura</p>
              <p>✓ Envío gratis en compras mayores a S/ 269</p>
            </div>

            {/* Link para seguir comprando */}
            <Link
              href="/mujer"
              className="block text-center text-sm text-rose-600 hover:text-rose-700 font-medium mt-4 underline"
            >
              Seguir comprando
            </Link>
          </div>
        </div>
      </div>

      {/* Trust badges */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        <div className="flex items-center gap-3 p-4 bg-neutral-50 rounded-lg">
          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
            <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div>
            <p className="font-semibold text-sm">Compra Segura</p>
            <p className="text-xs text-neutral-600">Protegemos tus datos</p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-4 bg-neutral-50 rounded-lg">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
            <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <div>
            <p className="font-semibold text-sm">Envío Rápido</p>
            <p className="text-xs text-neutral-600">Lima: 24-48 horas</p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-4 bg-neutral-50 rounded-lg">
          <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
            <svg className="w-5 h-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <div>
            <p className="font-semibold text-sm">Atención 24/7</p>
            <p className="text-xs text-neutral-600">Soporte por WhatsApp</p>
          </div>
        </div>
      </div>

      {/* Modal de confirmación de eliminación */}
      {itemToDelete && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-2xl animate-in fade-in zoom-in duration-200">
            <h3 className="text-xl font-bold mb-2">¿Estás seguro?</h3>
            <p className="text-neutral-600 mb-6">
              ¿Deseas eliminar <span className="font-semibold">{itemToDelete.title}</span> ({itemToDelete.color} · {itemToDelete.size}) de tu carrito?
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setItemToDelete(null)}
                className="flex-1 bg-neutral-100 text-neutral-900 py-3 px-4 rounded-lg font-semibold hover:bg-neutral-200 transition"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  removeItem(itemToDelete.slug, itemToDelete.color, itemToDelete.size)
                  setItemToDelete(null)
                }}
                className="flex-1 bg-rose-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-rose-700 transition"
              >
                Sí, eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
