"use client"

import { useWishlist } from "@/components/providers/WishlistContext"
import { products } from "@/data/products"
import ProductCard from "@/components/ProductCard"
import { Heart, Share2, ShoppingBag } from "lucide-react"
import Link from "next/link"
import { buildWhatsAppUrl } from "@/lib/contact"

export default function WishlistPage() {
  const { items } = useWishlist()

  // Obtener productos completos desde los slugs
  const wishlistProducts = items
    .map((slug) => products.find((p) => p.slug === slug))
    .filter(Boolean) // Eliminar undefined

  // Función para compartir por WhatsApp
  const handleShare = () => {
    if (wishlistProducts.length === 0) return

    let message = "🩷 Hola! Me interesan estos productos de Vialine:\n\n"
    
    wishlistProducts.forEach((product, index) => {
      message += `${index + 1}. ${product!.title} - S/ ${product!.price}\n`
      message += `   https://vialine.pe/producto/${product!.slug}\n\n`
    })

    message += "¿Me puedes dar más información?"

    const whatsappUrl = buildWhatsAppUrl(message)
    window.open(whatsappUrl, "_blank")
  }

  // Empty state
  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-lg mx-auto text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-rose-50 mb-6">
              <Heart className="w-10 h-10 text-rose-600" />
            </div>
            <h1 className="text-3xl font-bold text-neutral-900 mb-3">
              Tu lista de favoritos está vacía
            </h1>
            <p className="text-neutral-600 mb-8">
              Guarda los productos que te gustan para encontrarlos fácilmente después
            </p>
            <Link
              href="/mujer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-rose-600 text-white font-semibold rounded-full hover:bg-rose-700 transition-colors"
            >
              <ShoppingBag className="w-5 h-5" />
              Explorar productos
            </Link>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-white">
      <div className="container mx-auto px-3 lg:px-4 py-6 lg:py-8">
        {/* Header - Más compacto en mobile */}
        <div className="flex items-center justify-between mb-5 lg:mb-8 gap-3">
          <div className="min-w-0">
            <h1 className="text-xl lg:text-3xl font-bold text-neutral-900 flex items-center gap-2 lg:gap-3">
              <Heart className="w-6 h-6 lg:w-8 lg:h-8 text-rose-600 fill-rose-600 flex-shrink-0" />
              <span className="truncate">Mis Favoritos</span>
            </h1>
            <p className="text-neutral-600 mt-1 lg:mt-2 text-sm lg:text-base">
              {items.length} {items.length === 1 ? "producto" : "productos"}
            </p>
          </div>

          {/* Botón compartir - Ahora usa rose en vez de green */}
          <button
            onClick={handleShare}
            className="flex-shrink-0 flex items-center gap-1.5 lg:gap-2 px-3 lg:px-4 py-2 bg-rose-600 text-white font-semibold rounded-full hover:bg-rose-700 active:bg-rose-800 transition-colors shadow-sm text-sm lg:text-base"
          >
            <Share2 className="w-4 h-4 lg:w-5 lg:h-5" />
            <span className="hidden sm:inline">Compartir</span>
          </button>
        </div>

        {/* Grid de productos - 2 cols en mobile */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-6">
          {wishlistProducts.map((product) => (
            <ProductCard key={product!.slug} product={product!} />
          ))}
        </div>

        {/* Call to action - Más compacto en mobile */}
        <div className="mt-8 lg:mt-12 p-5 lg:p-8 bg-neutral-50 rounded-xl lg:rounded-2xl border border-neutral-200 text-center">
          <h2 className="text-lg lg:text-xl font-bold text-neutral-900 mb-1.5 lg:mb-2">
            ¿Lista para comprar?
          </h2>
          <p className="text-neutral-600 mb-4 lg:mb-6 text-sm lg:text-base">
            Agrega tus favoritos al carrito
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-2 lg:gap-4">
            <Link
              href="/carrito"
              className="inline-flex items-center justify-center gap-2 px-5 lg:px-6 py-2.5 lg:py-3 bg-rose-600 text-white font-semibold rounded-full hover:bg-rose-700 active:bg-rose-800 transition-colors text-sm lg:text-base"
            >
              <ShoppingBag className="w-4 h-4 lg:w-5 lg:h-5" />
              Ver carrito
            </Link>
            <Link
              href="/mujer"
              className="inline-flex items-center justify-center gap-2 px-5 lg:px-6 py-2.5 lg:py-3 bg-neutral-900 text-white font-semibold rounded-full hover:bg-neutral-800 active:bg-neutral-700 transition-colors text-sm lg:text-base"
            >
              Seguir comprando
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
