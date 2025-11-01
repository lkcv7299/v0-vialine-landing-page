"use client"

import { useState } from "react"
import { Check, Share2 } from "lucide-react"
import type { Product } from "@/data/products"
import { buildWhatsAppUrl } from "@/lib/contact"
import { useCart } from "@/contexts/CartContext"
import ProductGallery from "@/components/ProductGallery"
import SizeGuideModal from "@/components/SizeGuideModal"
import StockIndicator from "@/components/StockIndicator"
import { toast } from "sonner"

function getProductImages(product: Product): string[] {
  const images: string[] = []
  if (product.image) images.push(product.image)
  product.colors.forEach((color) => {
    if (typeof color === "object" && color.image && !images.includes(color.image)) {
      images.push(color.image)
    }
  })
  return images.length > 0 ? images : ["/placeholder.svg"]
}

export default function ProductDetailCard({ product }: { product: Product }) {
  const [selectedColor, setSelectedColor] = useState("")
  const [selectedSize, setSelectedSize] = useState("")
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)
  const [activeTab, setActiveTab] = useState<"cuidados" | "envios">("cuidados")
  const [currentImages, setCurrentImages] = useState<string[]>([])
  const { addItem} = useCart()

  const productImages = getProductImages(product)
  const isOutOfStock = product.inventory === 0

  // Update images when color changes
  const handleColorChange = (colorName: string) => {
    setSelectedColor(colorName)

    // Find the color object to get its specific image
    const colorObj = product.colors.find(c =>
      typeof c === "object" && c.name === colorName
    )

    if (colorObj && typeof colorObj === "object" && colorObj.image) {
      // If this color has a specific image, show it first
      setCurrentImages([colorObj.image, ...productImages.filter(img => img !== colorObj.image)])
    } else {
      // Reset to default images
      setCurrentImages(productImages)
    }
  }

  // Initialize current images on mount
  if (currentImages.length === 0 && productImages.length > 0) {
    setCurrentImages(productImages)
  }

  const handleAddToCart = () => {
    if (!selectedColor || !selectedSize || isOutOfStock) return

    addItem(product, selectedColor, selectedSize, quantity)
    setAdded(true)

    setTimeout(() => setAdded(false), 2000)
  }

  const incrementQuantity = () => {
    const stockLimit = product.inventory || 999
    if (quantity < stockLimit) {
      setQuantity(prev => prev + 1)
    } else {
      toast.error(`Stock máximo: ${stockLimit} unidades`)
    }
  }

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1)
    }
  }

  const handleBuyNow = () => {
    if (!selectedColor || !selectedSize || isOutOfStock) return

    const message = `Hola, quiero comprar:\n\n${product.title}\nColor: ${selectedColor}\nTalla: ${selectedSize}\nPrecio: S/ ${product.price}`
    const whatsappUrl = buildWhatsAppUrl(message)
    window.open(whatsappUrl, "_blank")
  }

  const handleShare = async () => {
    const url = window.location.href
    const title = product.title
    const text = `${product.title} - S/ ${product.price} | Vialine`

    if (navigator.share) {
      try {
        await navigator.share({ title, text, url })
        toast.success("Compartido exitosamente")
      } catch (error) {
        if ((error as Error).name !== "AbortError") {
          console.error("Error al compartir:", error)
        }
      }
    } else {
      // Fallback: copiar al portapapeles
      try {
        await navigator.clipboard.writeText(url)
        toast.success("Enlace copiado al portapapeles")
      } catch (error) {
        console.error("Error al copiar:", error)
        toast.error("No se pudo copiar el enlace")
      }
    }
  }

  const isButtonDisabled = !selectedColor || !selectedSize || isOutOfStock

  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        <ProductGallery images={currentImages.length > 0 ? currentImages : productImages} productName={product.title} />

        <div>
          <div className="flex items-start justify-between gap-4">
            <h1 className="text-3xl md:text-4xl font-bold text-neutral-900">{product.title}</h1>
            <button
              onClick={handleShare}
              className="flex-shrink-0 p-2 rounded-full hover:bg-neutral-100 transition text-neutral-600 hover:text-rose-600"
              aria-label="Compartir producto"
            >
              <Share2 className="w-5 h-5" />
            </button>
          </div>
          <p className="mt-4 text-3xl font-bold text-rose-600">
            S/ {product.price.toFixed(2)}
          </p>

          {/* STOCK INDICATOR - NUEVO */}
          <div className="mt-4">
            <StockIndicator inventory={product.inventory} productSlug={product.slug} />
          </div>

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

          <div className="mt-8">
            <h3 className="text-sm font-semibold text-neutral-900 mb-3">Color</h3>
            <div className="flex flex-wrap gap-3">
              {product.colors.map((color) => {
                const colorName = typeof color === "string" ? color : color.name
                const colorHex = typeof color === "object" ? color.hex : null
                const isSelected = selectedColor === colorName

                return (
                  <button
                    key={colorName}
                    onClick={() => handleColorChange(colorName)}
                    disabled={isOutOfStock}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all border-2 ${
                      isOutOfStock
                        ? "bg-neutral-100 text-neutral-400 cursor-not-allowed border-neutral-200"
                        : isSelected
                        ? "bg-rose-600 text-white shadow-md border-rose-600"
                        : "bg-white text-neutral-900 hover:bg-neutral-50 border-neutral-300"
                    }`}
                  >
                    {colorHex && (
                      <span
                        className="w-4 h-4 rounded-full border border-neutral-300"
                        style={{ backgroundColor: colorHex }}
                      />
                    )}
                    {colorName}
                  </button>
                )
              })}
            </div>
          </div>

          <div className="mt-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-neutral-900">Talla</h3>
              <SizeGuideModal category={product.category} />
            </div>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  disabled={isOutOfStock}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    isOutOfStock
                      ? "bg-neutral-100 text-neutral-400 cursor-not-allowed"
                      : selectedSize === size
                      ? "bg-rose-600 text-white shadow-md"
                      : "bg-neutral-100 text-neutral-900 hover:bg-neutral-200"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity Selector */}
          <div className="mt-6">
            <h3 className="text-sm font-semibold text-neutral-900 mb-3">Cantidad</h3>
            <div className="flex items-center gap-3">
              <button
                onClick={decrementQuantity}
                disabled={isOutOfStock || quantity <= 1}
                className={`w-10 h-10 rounded-full border-2 flex items-center justify-center font-semibold transition ${
                  isOutOfStock || quantity <= 1
                    ? "border-neutral-200 text-neutral-300 cursor-not-allowed"
                    : "border-neutral-300 text-neutral-900 hover:border-rose-600 hover:text-rose-600"
                }`}
              >
                -
              </button>
              <span className="text-lg font-semibold text-neutral-900 min-w-[40px] text-center">
                {quantity}
              </span>
              <button
                onClick={incrementQuantity}
                disabled={isOutOfStock}
                className={`w-10 h-10 rounded-full border-2 flex items-center justify-center font-semibold transition ${
                  isOutOfStock
                    ? "border-neutral-200 text-neutral-300 cursor-not-allowed"
                    : "border-neutral-300 text-neutral-900 hover:border-rose-600 hover:text-rose-600"
                }`}
              >
                +
              </button>
              {!isOutOfStock && (
                <span className="text-xs text-neutral-500 ml-2">
                  {product.inventory && product.inventory < 10
                    ? `Solo ${product.inventory} disponibles`
                    : "Disponible"}
                </span>
              )}
            </div>
          </div>

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
              {isOutOfStock 
                ? "Agotado" 
                : added 
                ? "¡Agregado al carrito!" 
                : "Agregar al carrito"}
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
              {isOutOfStock ? "No disponible" : "Comprar ahora"}
            </button>
          </div>

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

          {/* Tabs Cuidados y Envíos */}
          <div className="mt-8 border border-neutral-200 rounded-xl overflow-hidden">
            {/* Tab Headers */}
            <div className="flex border-b border-neutral-200">
              <button
                onClick={() => setActiveTab("cuidados")}
                className={`flex-1 px-6 py-4 text-sm font-semibold transition ${
                  activeTab === "cuidados"
                    ? "bg-rose-600 text-white"
                    : "bg-white text-neutral-700 hover:bg-neutral-50"
                }`}
              >
                Cuidados
              </button>
              <button
                onClick={() => setActiveTab("envios")}
                className={`flex-1 px-6 py-4 text-sm font-semibold transition ${
                  activeTab === "envios"
                    ? "bg-rose-600 text-white"
                    : "bg-white text-neutral-700 hover:bg-neutral-50"
                }`}
              >
                Envíos
              </button>
            </div>

            {/* Tab Content */}
            <div className="p-6 bg-white">
              {activeTab === "cuidados" && (
                <div className="space-y-3 text-sm text-neutral-600">
                  <p className="font-semibold text-neutral-900 mb-3">Instrucciones de cuidado:</p>
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
                    <span>Lavar a máquina en agua fría (máx. 30°C)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
                    <span>No usar blanqueador</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
                    <span>Secar a la sombra, evitar luz solar directa</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
                    <span>Planchar a baja temperatura si es necesario</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
                    <span>No lavar en seco</span>
                  </div>
                </div>
              )}

              {activeTab === "envios" && (
                <div className="space-y-3 text-sm text-neutral-600">
                  <p className="font-semibold text-neutral-900 mb-3">Información de envío:</p>
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Lima Metropolitana:</strong> Entrega en 24-48 horas hábiles</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Provincias:</strong> Entrega en 3-5 días hábiles</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Envío gratis:</strong> En compras mayores a S/ 269</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Costo de envío:</strong> S/ 15 para compras menores a S/ 269</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
                    <span>Tracking disponible para todos los envíos</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}