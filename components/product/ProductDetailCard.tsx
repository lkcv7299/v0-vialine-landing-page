"use client"

import { useState, useEffect } from "react"
import { Check, Share2 } from "lucide-react"
import type { Product } from "@/data/products"
import { buildWhatsAppUrl } from "@/lib/contact"
import { useCart } from "@/contexts/CartContext"
import ProductGallery from "@/components/ProductGallery"
import SizeGuideModal from "@/components/SizeGuideModal"
import StockIndicator from "@/components/StockIndicator"
import { toast } from "sonner"

function getProductImages(product: Product, selectedColorSlug?: string): string[] {
  // Helper function to filter and validate image arrays
  const filterValidImages = (images: string[]): string[] => {
    const filtered = images.filter(img => img && img.trim() !== "")
    if (filtered.length === 0) {
      console.warn(`⚠️  Empty images array for product: ${product.slug}`, { selectedColorSlug, images })
    }
    return filtered
  }

  // If a color is selected, return ONLY images for that color
  if (selectedColorSlug) {
    const colorObj = product.colors.find(c =>
      typeof c === "object" && c.slug === selectedColorSlug
    )

    if (colorObj && typeof colorObj === "object") {
      // Prefer images array (multiple images per color)
      if (colorObj.images && colorObj.images.length > 0) {
        const validImages = filterValidImages(colorObj.images)
        if (validImages.length > 0) return validImages
      }
      // Fallback to single image
      if (colorObj.image && colorObj.image.trim() !== "") {
        return [colorObj.image]
      }
    }
  }

  // Fallback: Try to get images from first color with images
  const firstColorWithImages = product.colors.find(c =>
    typeof c === "object" && ((c.images && c.images.length > 0) || c.image)
  )

  if (firstColorWithImages && typeof firstColorWithImages === "object") {
    if (firstColorWithImages.images && firstColorWithImages.images.length > 0) {
      const validImages = filterValidImages(firstColorWithImages.images)
      if (validImages.length > 0) return validImages
    }
    if (firstColorWithImages.image && firstColorWithImages.image.trim() !== "") {
      return [firstColorWithImages.image]
    }
  }

  // Last fallback: product main image
  if (product.image && product.image.trim() !== "") {
    return [product.image]
  }

  console.error(`❌ No valid images found for product: ${product.slug}`)
  return ["/placeholder.svg"]
}

export default function ProductDetailCard({ product }: { product: Product }) {
  const [selectedColorSlug, setSelectedColorSlug] = useState("")
  const [selectedColorName, setSelectedColorName] = useState("")
  const [selectedSize, setSelectedSize] = useState("")
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)
  const [activeTab, setActiveTab] = useState<"cuidados" | "envios">("cuidados")
  const [currentImages, setCurrentImages] = useState<string[]>([])
  const [isLoadingGallery, setIsLoadingGallery] = useState(false)
  const { addItem} = useCart()

  const isOutOfStock = product.inventory === 0

  // ✅ Auto-select first color and load its gallery on mount
  useEffect(() => {
    const firstColor = product.colors.find(c => typeof c === "object")
    if (firstColor && typeof firstColor === "object") {
      setSelectedColorSlug(firstColor.slug)
      setSelectedColorName(firstColor.name)
      const initialImages = getProductImages(product, firstColor.slug)
      setCurrentImages(initialImages)
    } else {
      // Fallback if no color objects exist
      const fallbackImages = getProductImages(product)
      setCurrentImages(fallbackImages)
    }
  }, [product])

  // Update gallery when color changes - show ONLY selected color's images with smooth transition
  const handleColorChange = (colorSlug: string, colorName: string) => {
    setIsLoadingGallery(true)
    setSelectedColorSlug(colorSlug)
    setSelectedColorName(colorName)

    // Small delay for smooth transition effect
    setTimeout(() => {
      const newImages = getProductImages(product, colorSlug)
      setCurrentImages(newImages)
      setIsLoadingGallery(false)
    }, 150)
  }

  const handleAddToCart = () => {
    if (!selectedColorName || !selectedSize || isOutOfStock) return

    addItem(product, selectedColorName, selectedSize, quantity)
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
    if (!selectedColorName || !selectedSize || isOutOfStock) return

    const message = `Hola, quiero comprar:\n\n${product.title}\nColor: ${selectedColorName}\nTalla: ${selectedSize}\nPrecio: S/ ${product.price}`
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

  const isButtonDisabled = !selectedColorName || !selectedSize || isOutOfStock

  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        <div className={`transition-opacity duration-300 ${isLoadingGallery ? 'opacity-50' : 'opacity-100'}`}>
          <ProductGallery images={currentImages} productName={product.title} />
        </div>

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
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-neutral-900">Color</h3>
              {selectedColorName && (
                <span className="text-sm text-neutral-600 font-medium animate-fade-in">
                  {selectedColorName}
                </span>
              )}
            </div>
            <div className="flex flex-wrap gap-3">
              {product.colors.map((color, index) => {
                const colorName = typeof color === "string" ? color : color.name
                const colorSlug = typeof color === "object" ? color.slug : ""
                const colorHex = typeof color === "object" ? color.hex : null
                const isSelected = selectedColorName === colorName
                // Use slug as key (unique), fallback to index if string
                const uniqueKey = typeof color === "object" ? color.slug : `${colorName}-${index}`

                return (
                  <button
                    key={uniqueKey}
                    onClick={() => typeof color === "object" && handleColorChange(color.slug, color.name)}
                    disabled={isOutOfStock || typeof color === "string"}
                    className={`group relative flex items-center gap-2.5 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 border-2 ${
                      isOutOfStock
                        ? "bg-neutral-100 text-neutral-400 cursor-not-allowed border-neutral-200"
                        : isSelected
                        ? "bg-rose-600 text-white shadow-lg shadow-rose-200 border-rose-600 scale-105"
                        : "bg-white text-neutral-900 hover:bg-neutral-50 hover:border-rose-300 hover:shadow-md border-neutral-200"
                    }`}
                  >
                    {colorHex && (
                      <span
                        className={`w-5 h-5 rounded-full border-2 transition-all ${
                          isSelected ? "border-white shadow-sm" : "border-neutral-300 group-hover:border-neutral-400"
                        }`}
                        style={{ backgroundColor: colorHex }}
                      />
                    )}
                    <span>{colorName}</span>
                    {isSelected && (
                      <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                        <Check className="w-3 h-3 text-white" />
                      </span>
                    )}
                  </button>
                )
              })}
            </div>
          </div>

          <div className="mt-7">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-neutral-900">Talla</h3>
              <SizeGuideModal category={product.category} />
            </div>
            <div className="flex flex-wrap gap-3">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  disabled={isOutOfStock}
                  className={`relative min-w-[56px] px-5 py-3 rounded-xl text-sm font-bold transition-all duration-300 border-2 ${
                    isOutOfStock
                      ? "bg-neutral-100 text-neutral-400 cursor-not-allowed border-neutral-200"
                      : selectedSize === size
                      ? "bg-rose-600 text-white shadow-lg shadow-rose-200 border-rose-600 scale-105"
                      : "bg-white text-neutral-900 hover:bg-neutral-50 hover:border-rose-300 hover:shadow-md border-neutral-200"
                  }`}
                >
                  {size}
                  {selectedSize === size && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                      <Check className="w-3 h-3 text-white" />
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity Selector */}
          <div className="mt-7">
            <h3 className="text-base font-bold text-neutral-900 mb-4">Cantidad</h3>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3 bg-neutral-50 rounded-xl p-2 border-2 border-neutral-200">
                <button
                  onClick={decrementQuantity}
                  disabled={isOutOfStock || quantity <= 1}
                  className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-lg transition-all duration-200 ${
                    isOutOfStock || quantity <= 1
                      ? "text-neutral-300 cursor-not-allowed"
                      : "text-neutral-900 hover:bg-rose-100 hover:text-rose-600 active:scale-95"
                  }`}
                >
                  −
                </button>
                <span className="text-xl font-bold text-neutral-900 min-w-[48px] text-center">
                  {quantity}
                </span>
                <button
                  onClick={incrementQuantity}
                  disabled={isOutOfStock}
                  className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-lg transition-all duration-200 ${
                    isOutOfStock
                      ? "text-neutral-300 cursor-not-allowed"
                      : "text-neutral-900 hover:bg-rose-100 hover:text-rose-600 active:scale-95"
                  }`}
                >
                  +
                </button>
              </div>
              {!isOutOfStock && (
                <span className="text-sm text-neutral-600 font-medium">
                  {product.inventory && product.inventory < 10
                    ? `Solo ${product.inventory} disponibles`
                    : "Disponible"}
                </span>
              )}
            </div>
          </div>

          <div className="mt-9 space-y-4">
            <button
              onClick={handleAddToCart}
              disabled={isButtonDisabled}
              className={`w-full py-4 rounded-2xl font-bold text-base transition-all duration-300 flex items-center justify-center gap-2 shadow-lg ${
                isButtonDisabled
                  ? "bg-neutral-200 text-neutral-400 cursor-not-allowed shadow-none"
                  : added
                  ? "bg-green-600 text-white shadow-green-200 scale-[0.98]"
                  : "bg-gradient-to-r from-rose-600 to-rose-500 text-white hover:from-rose-700 hover:to-rose-600 hover:shadow-xl hover:shadow-rose-200 active:scale-[0.98]"
              }`}
            >
              {isOutOfStock
                ? "Agotado"
                : added
                ? <>
                    <Check className="w-5 h-5" />
                    ¡Agregado al carrito!
                  </>
                : "Agregar al carrito"}
            </button>

            <button
              onClick={handleBuyNow}
              disabled={isButtonDisabled}
              className={`w-full py-4 rounded-2xl font-bold text-base transition-all duration-300 border-2 ${
                isButtonDisabled
                  ? "bg-neutral-100 border-neutral-200 text-neutral-400 cursor-not-allowed"
                  : "bg-neutral-900 border-neutral-900 text-white hover:bg-neutral-800 hover:border-neutral-800 hover:shadow-lg active:scale-[0.98]"
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