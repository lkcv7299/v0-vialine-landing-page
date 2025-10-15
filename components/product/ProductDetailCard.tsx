"use client"

import { useState } from "react"
import { Check } from "lucide-react"
import type { Product } from "@/data/products"
import { buildWhatsAppUrl } from "@/lib/contact"
import { useCart } from "@/contexts/CartContext"

export default function ProductDetailCard({ product }: { product: Product }) {
  const [selectedColor, setSelectedColor] = useState("")
  const [selectedSize, setSelectedSize] = useState("")
  const [added, setAdded] = useState(false)
  const { addItem } = useCart()

  const handleAddToCart = () => {
    if (!selectedColor || !selectedSize) return
    
    addItem(product, selectedColor, selectedSize)
    setAdded(true)
    
    setTimeout(() => setAdded(false), 2000)
  }

  const handleBuyNow = () => {
    if (!selectedColor || !selectedSize) return
    
    const message = `Hola, quiero comprar:\n\n${product.title}\nColor: ${selectedColor}\nTalla: ${selectedSize}\nPrecio: S/ ${product.price}`
    const whatsappUrl = buildWhatsAppUrl(message)
    window.open(whatsappUrl, "_blank")
  }

  const isButtonDisabled = !selectedColor || !selectedSize

  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-neutral-100">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-neutral-900">{product.title}</h1>
          <p className="mt-4 text-3xl font-bold text-rose-600">
            S/ {product.price.toFixed(2)}
          </p>

          <div className="mt-8">
            <h3 className="text-sm font-semibold text-neutral-900 mb-3">Color</h3>
            <div className="flex flex-wrap gap-2">
              {product.colors.map((color) => {
                const colorName = typeof color === "string" ? color : color.name
                return (
                  <button
                    key={colorName}
                    onClick={() => setSelectedColor(colorName)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      selectedColor === colorName
                        ? "bg-rose-600 text-white ring-2 ring-rose-600 ring-offset-2"
                        : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                    }`}
                  >
                    {colorName}
                  </button>
                )
              })}
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-sm font-semibold text-neutral-900 mb-3">Talla</h3>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedSize === size
                      ? "bg-rose-600 text-white ring-2 ring-rose-600 ring-offset-2"
                      : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 flex flex-col md:flex-row gap-3">
            <button
              onClick={handleAddToCart}
              disabled={isButtonDisabled}
              className={`flex-1 py-4 rounded-2xl font-semibold transition-all ${
                isButtonDisabled
                  ? "bg-neutral-200 text-neutral-400 cursor-not-allowed"
                  : added
                  ? "bg-green-600 text-white"
                  : "bg-neutral-900 text-white hover:bg-neutral-800"
              } ${added ? "animate-bounce" : ""}`}
            >
              {added ? (
                <span className="flex items-center justify-center gap-2">
                  <Check className="w-5 h-5" />
                  Agregado
                </span>
              ) : (
                "Agregar al Carrito"
              )}
            </button>

            <button
              onClick={handleBuyNow}
              disabled={isButtonDisabled}
              className={`flex-1 py-4 rounded-2xl font-semibold transition-all uppercase ${
                isButtonDisabled
                  ? "bg-neutral-200 text-neutral-400 cursor-not-allowed"
                  : "bg-rose-600 text-white hover:bg-rose-700"
              }`}
            >
              Comprar por WhatsApp
            </button>
          </div>

          {product.attributes && (
            <div className="mt-8 space-y-6 pt-8 border-t">
              <div>
                <h3 className="text-sm font-semibold text-neutral-900 mb-2">Material</h3>
                <p className="text-neutral-700">{product.attributes.material}</p>
              </div>

              {product.attributes.detalles.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-neutral-900 mb-2">Detalles</h3>
                  <ul className="space-y-1">
                    {product.attributes.detalles.map((detalle, index) => (
                      <li key={index} className="flex items-start gap-2 text-neutral-700">
                        <span className="text-rose-600 mt-1">•</span>
                        <span>{detalle}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {product.attributes.beneficios.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-neutral-900 mb-2">Beneficios</h3>
                  <ul className="space-y-1">
                    {product.attributes.beneficios.map((beneficio, index) => (
                      <li key={index} className="flex items-start gap-2 text-neutral-700">
                        <span className="text-rose-600 mt-1">✓</span>
                        <span>{beneficio}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {!product.attributes && (
            <ul className="mt-8 space-y-3 pt-8 border-t">
              <li className="flex items-center gap-3 text-neutral-700">
                <svg className="w-5 h-5 text-rose-600" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Envíos a todo el Perú</span>
              </li>
              <li className="flex items-center gap-3 text-neutral-700">
                <svg className="w-5 h-5 text-rose-600" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Cambios fáciles</span>
              </li>
            </ul>
          )}
        </div>
      </div>
    </main>
  )
}