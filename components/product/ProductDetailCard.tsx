"use client"

import { useState } from "react"
import { Check } from "lucide-react"
import type { Product } from "@/data/products"
import { buildWhatsAppUrl } from "@/lib/contact"
import { useCart } from "@/contexts/CartContext"
import ProductGallery from "@/components/ProductGallery"

// Función para obtener todas las imágenes disponibles del producto
function getProductImages(product: Product): string[] {
  const images: string[] = []
  
  // Agregar imagen principal
  if (product.image) {
    images.push(product.image)
  }
  
  // Agregar imágenes de variantes de color (si existen)
  product.colors.forEach((color) => {
    if (typeof color === "object" && color.image && !images.includes(color.image)) {
      images.push(color.image)
    }
  })
  
  // Si no hay imágenes, usar placeholder
  return images.length > 0 ? images : ["/placeholder.svg"]
}

export default function ProductDetailCard({ product }: { product: Product }) {
  const [selectedColor, setSelectedColor] = useState("")
  const [selectedSize, setSelectedSize] = useState("")
  const [added, setAdded] = useState(false)
  const { addItem } = useCart()

  // Obtener todas las imágenes para la galería
  const productImages = getProductImages(product)

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
        {/* GALERÍA DE IMÁGENES - NUEVO */}
        <ProductGallery images={productImages} productName={product.title} />

        {/* INFORMACIÓN DEL PRODUCTO */}
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-neutral-900">{product.title}</h1>
          <p className="mt-4 text-3xl font-bold text-rose-600">
            S/ {product.price.toFixed(2)}
          </p>

          {/* Descripción del producto */}
          {product.attributes && (
            <div className="mt-6 space-y-3">
              <div className="flex items-start gap-2 text-sm text-neutral-600">
                <Check className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
                <span>{product.attributes.material}</span>
              </div>
              {product.attributes.detalles && product.attributes.detalles.map((detalle, i) => (
                <div key={i} className="flex items-start gap-2 text-sm text-neutral-600">
                  <Check className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
                  <span>{detalle}</span>
                </div>
              ))}
            </div>
          )}

          {/* Selector de color */}
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
                        ? "bg-rose-600 text-white shadow-md"
                        : "bg-neutral-100 text-neutral-900 hover:bg-neutral-200"
                    }`}
                  >
                    {colorName}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Selector de talla */}
          <div className="mt-6">
            <h3 className="text-sm font-semibold text-neutral-900 mb-3">Talla</h3>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedSize === size
                      ? "bg-rose-600 text-white shadow-md"
                      : "bg-neutral-100 text-neutral-900 hover:bg-neutral-200"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Botones de acción */}
          <div className="mt-8 space-y-3">
            <button
              onClick={handleAddToCart}
              disabled={isButtonDisabled}
              className={`w-full py-4 rounded-full font-semibold transition-all ${
                isButtonDisabled
                  ? "bg-neutral-200 text-neutral-400 cursor-not-allowed"
                  : added
                  ? "bg-green-600 text-white"
                  : "bg-rose-600 text-white hover:bg-rose-700"
              }`}
            >
              {added ? "¡Agregado al carrito!" : "Agregar al carrito"}
            </button>

            <button
              onClick={handleBuyNow}
              disabled={isButtonDisabled}
              className={`w-full py-4 rounded-full font-semibold transition-all ${
                isButtonDisabled
                  ? "bg-neutral-200 text-neutral-400 cursor-not-allowed"
                  : "bg-neutral-900 text-white hover:bg-neutral-800"
              }`}
            >
              Comprar ahora
            </button>
          </div>

          {/* Información adicional */}
          <div className="mt-8 space-y-4 text-sm text-neutral-600">
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-rose-600" />
              <span>Envío gratis en compras mayores a S/ 269</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-rose-600" />
              <span>Entrega en Lima: 24-48 horas</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-rose-600" />
              <span>Hecho en Perú con materiales de calidad</span>
            </div>
          </div>

          {/* Beneficios del producto */}
          {product.attributes?.beneficios && (
            <div className="mt-8 p-6 bg-neutral-50 rounded-xl border border-neutral-200">
              <h3 className="text-sm font-semibold text-neutral-900 mb-3">Beneficios</h3>
              <ul className="space-y-2">
                {product.attributes.beneficios.map((beneficio, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-neutral-600">
                    <Check className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
                    <span>{beneficio}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}