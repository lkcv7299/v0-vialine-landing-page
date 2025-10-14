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
    
    // Reset after 2 seconds
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
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        {/* Image */}
        <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-neutral-100">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Details */}
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-neutral-900">{product.title}</h1>
          <p className="mt-4 text-3xl font-bold text-rose-600">
            S/ {product.price.toFixed(2)}
          </p>

          {/* Color Selection */}
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

          {/* Size Selection */}
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

          {/* Action Buttons */}
          <div className="mt-8 flex flex-col md:flex-row gap-3">
            {/* Add to Cart Button */}
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

            {/* Buy Now via WhatsApp */}
            <button
              onClick={handleBuyNow}
              disabled={isButtonDisabled}
              className={`flex-1 py-4 rounded-2xl font-semibold transition-all ${
                isButtonDisabled
                  ? "bg-neutral-200 text-neutral-400 cursor-not-allowed"
                  : "bg-rose-600 text-white hover:bg-rose-700"
              }`}
            >
              Comprar por WhatsApp
            </button>
          </div>

          {/* Product Attributes */}
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
        </div>
      </div>
    </div>
  )
}