"use client"

import { useState, useEffect } from "react"
import { Check, Share2, Heart, Package, Truck, Shield } from "lucide-react"
import type { Product } from "@/data/products"
import { buildWhatsAppUrl } from "@/lib/contact"
import { useCart } from "@/contexts/CartContext"
import { useWishlist } from "@/components/providers/WishlistContext"
import { trackViewItem, trackAddToWishlist } from "@/lib/analytics"
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
  const [currentImages, setCurrentImages] = useState<string[]>([])
  const [isLoadingGallery, setIsLoadingGallery] = useState(false)
  const { addItem } = useCart()
  const { has, toggle } = useWishlist()
  const [isWishlistAnimating, setIsWishlistAnimating] = useState(false)

  const isOutOfStock = product.inventory === 0
  const isInWishlist = has(product.slug)

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

    // Track product view
    trackViewItem({
      id: product.slug,
      name: product.title,
      price: product.price,
      category: product.category,
    })
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

  const handleWishlistToggle = () => {
    setIsWishlistAnimating(true)
    toggle(product.slug)
    toast.success(isInWishlist ? "Eliminado de favoritos" : "Agregado a favoritos")
    setTimeout(() => setIsWishlistAnimating(false), 600)

    // Track add to wishlist (only when adding, not removing)
    if (!isInWishlist) {
      trackAddToWishlist({
        id: product.slug,
        name: product.title,
        price: product.price,
      })
    }
  }

  const isButtonDisabled = !selectedColorName || !selectedSize || isOutOfStock

  // Extract product code from tags
  const productCode = product.tags?.find(tag => tag.startsWith("COD.")) || ""

  // Filter out material from detalles to avoid duplication
  const uniqueDetalles = product.attributes?.detalles?.filter(detalle => {
    const detalleLower = detalle.toLowerCase()
    const materialLower = product.attributes?.material?.toLowerCase() || ""
    return detalleLower !== materialLower
  }) || []

  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
        {/* GALLERY - Left Side */}
        <div className={`transition-opacity duration-300 ${isLoadingGallery ? 'opacity-50' : 'opacity-100'}`}>
          <ProductGallery images={currentImages} productName={product.title} productSlug={product.slug} />
        </div>

        {/* PRODUCT INFO - Right Side */}
        <div className="space-y-7">
          {/* Header: Title + Actions */}
          <div>
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h1 className="text-2xl md:text-3xl font-bold text-neutral-900 tracking-tight">
                  {product.title}
                </h1>
                {/* Product Code */}
                {productCode && (
                  <p className="mt-1.5 text-sm text-neutral-500">
                    Producto {productCode}
                  </p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 flex-shrink-0">
                <button
                  onClick={handleWishlistToggle}
                  className={`p-2 rounded-full transition-all duration-200 ${
                    isInWishlist
                      ? "bg-rose-50 text-rose-600"
                      : "bg-neutral-50 text-neutral-600 hover:bg-neutral-100 hover:text-rose-600"
                  } ${isWishlistAnimating ? "scale-110" : "scale-100"}`}
                  aria-label={isInWishlist ? "Quitar de favoritos" : "Agregar a favoritos"}
                >
                  <Heart
                    className={`w-5 h-5 transition-all duration-300 ${
                      isInWishlist ? "fill-rose-600" : ""
                    }`}
                  />
                </button>
                <button
                  onClick={handleShare}
                  className="p-2 rounded-full bg-neutral-50 hover:bg-neutral-100 transition text-neutral-600 hover:text-rose-600"
                  aria-label="Compartir producto"
                >
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mt-5">
              <p className="text-3xl font-semibold text-neutral-900">
                S/ {product.price.toFixed(2)}
              </p>
              {product.originalPrice && (
                <p className="text-lg font-medium text-neutral-400 line-through">
                  S/ {product.originalPrice.toFixed(2)}
                </p>
              )}
            </div>

            {/* Stock Indicator */}
            <div className="mt-3">
              <StockIndicator inventory={product.inventory} productSlug={product.slug} />
            </div>
          </div>

          {/* Material & Key Features - Lululemon Style */}
          {product.attributes?.material && (
            <div className="space-y-2">
              <p className="text-sm font-semibold text-neutral-900">Material</p>
              <p className="text-sm text-neutral-700">{product.attributes.material}</p>
            </div>
          )}

          {/* Color Selection - Lululemon/Gymshark Style */}
          <div className="space-y-3">
            <div className="flex items-baseline justify-between">
              <h3 className="text-sm font-semibold text-neutral-900">
                Color: {selectedColorName && <span className="font-normal text-neutral-600">{selectedColorName}</span>}
              </h3>
              <span className="text-xs text-neutral-500">{product.colors.length} colores</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {product.colors.map((color, index) => {
                const colorName = typeof color === "string" ? color : color.name
                const colorSlug = typeof color === "object" ? color.slug : ""
                const colorHex = typeof color === "object" ? color.hex : null
                const isSelected = selectedColorName === colorName
                const uniqueKey = typeof color === "object" ? color.slug : `${colorName}-${index}`

                return (
                  <button
                    key={uniqueKey}
                    onClick={() => typeof color === "object" && handleColorChange(color.slug, color.name)}
                    disabled={isOutOfStock || typeof color === "string"}
                    className={`relative px-4 py-2 rounded-lg text-xs font-medium transition-all duration-200 border ${
                      isOutOfStock
                        ? "bg-neutral-100 text-neutral-400 cursor-not-allowed border-neutral-200"
                        : isSelected
                        ? "bg-neutral-900 text-white border-neutral-900"
                        : "bg-white text-neutral-700 border-neutral-300 hover:border-neutral-900"
                    }`}
                  >
                    {colorName}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Size Selection - Lululemon/Gymshark Style */}
          <div className="space-y-3">
            <div className="flex items-baseline justify-between">
              <h3 className="text-sm font-semibold text-neutral-900">
                Talla: {selectedSize && <span className="font-normal text-neutral-600">{selectedSize}</span>}
              </h3>
              <SizeGuideModal category={product.category} />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  disabled={isOutOfStock}
                  className={`py-3 rounded-lg text-sm font-medium transition-all duration-200 border ${
                    isOutOfStock
                      ? "bg-neutral-100 text-neutral-400 cursor-not-allowed border-neutral-200"
                      : selectedSize === size
                      ? "bg-neutral-900 text-white border-neutral-900"
                      : "bg-white text-neutral-700 border-neutral-300 hover:border-neutral-900"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* CTA Buttons - HIGH CONTRAST */}
          <div className="space-y-3 pt-2">
            <button
              onClick={handleAddToCart}
              disabled={isButtonDisabled}
              className={`w-full py-4 rounded-lg font-bold text-base transition-all duration-200 shadow-sm ${
                isButtonDisabled
                  ? "bg-neutral-300 text-neutral-500 cursor-not-allowed"
                  : added
                  ? "bg-green-600 text-white shadow-green-200"
                  : "bg-rose-600 text-white hover:bg-rose-700 shadow-rose-200 hover:shadow-md"
              }`}
            >
              {isOutOfStock
                ? "Agotado"
                : added
                ? <>
                    <Check className="w-4 h-4 inline-block mr-1" />
                    Agregado al carrito
                  </>
                : "Agregar al carrito"}
            </button>

            <button
              onClick={handleBuyNow}
              disabled={isButtonDisabled}
              className={`w-full py-4 rounded-lg font-bold text-base transition-all duration-200 border-2 ${
                isButtonDisabled
                  ? "bg-white border-neutral-300 text-neutral-400 cursor-not-allowed"
                  : "bg-white border-neutral-900 text-neutral-900 hover:bg-neutral-900 hover:text-white"
              }`}
            >
              {isOutOfStock ? "No disponible" : "Consultar por WhatsApp"}
            </button>
          </div>

          {/* Shipping & Returns Info - Lululemon Style */}
          <div className="border-t border-neutral-200 pt-6 space-y-3 text-sm">
            <div className="flex items-start gap-3">
              <Truck className="w-5 h-5 text-neutral-900 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-neutral-900">Envío gratis</p>
                <p className="text-neutral-600 text-xs mt-0.5">En compras mayores a S/ 269</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Package className="w-5 h-5 text-neutral-900 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-neutral-900">Entrega rápida</p>
                <p className="text-neutral-600 text-xs mt-0.5">Lima: 24-48 horas | Provincias: 3-5 días</p>
              </div>
            </div>
          </div>

          {/* Product Details - Lululemon/Gymshark Style (no tabs, direct info) */}
          <div className="border-t border-neutral-200 pt-6 space-y-6">
            {/* Características - Only show non-duplicate details */}
            {uniqueDetalles.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-neutral-900 mb-3">Características del producto</h3>
                <ul className="space-y-2">
                  {uniqueDetalles.map((detalle, i) => (
                    <li key={i} className="text-sm text-neutral-700 pl-0">
                      • {detalle}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Beneficios */}
            {product.attributes?.beneficios && product.attributes.beneficios.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-neutral-900 mb-3">¿Por qué te encantará?</h3>
                <ul className="space-y-2">
                  {product.attributes.beneficios.map((beneficio, i) => (
                    <li key={i} className="text-sm text-neutral-700 pl-0">
                      • {beneficio}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Cuidados */}
            <div>
              <h3 className="text-sm font-semibold text-neutral-900 mb-3">Cuidado del producto</h3>
              <ul className="space-y-2 text-sm text-neutral-700">
                <li>• Lavar a máquina en agua fría (máx. 30°C)</li>
                <li>• No usar blanqueador</li>
                <li>• Secar a la sombra</li>
                <li>• Planchar a baja temperatura</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sticky CTA Footer - Solo en mobile */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-neutral-200 p-3 z-30 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
        <div className="flex items-center gap-3 max-w-7xl mx-auto">
          {/* Price */}
          <div className="flex-shrink-0">
            <p className="text-lg font-bold text-neutral-900">
              S/ {product.price.toFixed(2)}
            </p>
            {product.originalPrice && (
              <p className="text-xs text-neutral-400 line-through">
                S/ {product.originalPrice.toFixed(2)}
              </p>
            )}
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            disabled={isButtonDisabled}
            className={`flex-1 py-3 rounded-lg font-bold text-sm transition-all ${
              isButtonDisabled
                ? "bg-neutral-300 text-neutral-500 cursor-not-allowed"
                : added
                ? "bg-green-600 text-white"
                : "bg-rose-600 text-white active:bg-rose-700"
            }`}
          >
            {isOutOfStock
              ? "Agotado"
              : added
              ? <>
                  <Check className="w-4 h-4 inline-block mr-1" />
                  Agregado
                </>
              : !selectedColorName || !selectedSize
              ? "Selecciona opciones"
              : "Agregar al carrito"}
          </button>
        </div>
      </div>

      {/* Spacer para que el contenido no quede tapado por el footer sticky */}
      <div className="lg:hidden h-20" aria-hidden="true" />
    </main>
  )
}