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
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-neutral-900 flex items-center gap-3">
              <Heart className="w-8 h-8 text-rose-600 fill-rose-600" />
              Mis Favoritos
            </h1>
            <p className="text-neutral-600 mt-2">
              {items.length} {items.length === 1 ? "producto guardado" : "productos guardados"}
            </p>
          </div>

          {/* Botón compartir */}
          <button
            onClick={handleShare}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white font-semibold rounded-full hover:bg-green-700 transition-colors shadow-md hover:shadow-lg"
          >
            <Share2 className="w-5 h-5" />
            <span className="hidden sm:inline">Compartir por WhatsApp</span>
            <span className="sm:hidden">Compartir</span>
          </button>
        </div>

        {/* Grid de productos */}
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {wishlistProducts.map((product) => (
            <ProductCard key={product!.slug} product={product!} />
          ))}
        </div>

        {/* Call to action */}
        <div className="mt-12 p-8 bg-neutral-50 rounded-2xl border border-neutral-200 text-center">
          <h2 className="text-xl font-bold text-neutral-900 mb-2">
            ¿Lista para comprar?
          </h2>
          <p className="text-neutral-600 mb-6">
            Agrega tus favoritos al carrito y finaliza tu compra por WhatsApp
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/carrito"
              className="inline-flex items-center gap-2 px-6 py-3 bg-rose-600 text-white font-semibold rounded-full hover:bg-rose-700 transition-colors"
            >
              <ShoppingBag className="w-5 h-5" />
              Ver carrito
            </Link>
            <Link
              href="/mujer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-neutral-900 text-white font-semibold rounded-full hover:bg-neutral-800 transition-colors"
            >
              Seguir comprando
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}