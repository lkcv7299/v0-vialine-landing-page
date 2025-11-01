"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import AccountSidebar from "@/components/AccountSidebar"
import { useWishlist } from "@/components/providers/WishlistContext"
import { products } from "@/data/products"
import ProductCard from "@/components/ProductCard"
import { Heart, Share2 } from "lucide-react"
import Link from "next/link"
import { buildWhatsAppUrl } from "@/lib/contact"

export default function FavoritosPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const { items } = useWishlist()

  // Redirect if not authenticated
  if (status === "unauthenticated") {
    router.push("/login")
    return null
  }

  // Loading state
  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-rose-600"></div>
      </div>
    )
  }

  // Obtener productos completos desde los slugs
  const wishlistProducts = items
    .map((slug) => products.find((p) => p.slug === slug))
    .filter(Boolean) // Eliminar undefined

  // Función para compartir por WhatsApp
  const handleShare = () => {
    if (wishlistProducts.length === 0) return

    // ✅ FIX: Usar dominio actual en lugar de hardcoded vialine.pe
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://vialineperu.com'

    let message = "🩷 Hola! Me interesan estos productos de Vialine:\n\n"

    wishlistProducts.forEach((product, index) => {
      message += `${index + 1}. ${product!.title} - S/ ${product!.price}\n`
      message += `   ${baseUrl}/producto/${product!.slug}\n\n`
    })

    message += "¿Me puedes dar más información?"

    const whatsappUrl = buildWhatsAppUrl(message)
    window.open(whatsappUrl, "_blank")
  }

  return (
    <main className="min-h-screen bg-neutral-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            <AccountSidebar />
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-neutral-900 mb-2">Mis Favoritos</h1>
              <p className="text-neutral-600">
                {items.length === 0
                  ? "Aún no tienes productos favoritos"
                  : `${items.length} ${items.length === 1 ? 'producto guardado' : 'productos guardados'}`
                }
              </p>
            </div>

            {/* Empty State */}
            {items.length === 0 ? (
              <div className="bg-white rounded-xl border border-neutral-200 p-12 text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-rose-50 mb-6">
                  <Heart className="w-10 h-10 text-rose-600" />
                </div>
                <h2 className="text-2xl font-bold text-neutral-900 mb-3">
                  Tu lista de favoritos está vacía
                </h2>
                <p className="text-neutral-600 mb-8 max-w-md mx-auto">
                  Guarda los productos que te gustan para encontrarlos fácilmente después
                </p>
                <Link
                  href="/mujer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-rose-600 text-white rounded-lg font-semibold hover:bg-rose-700 transition"
                >
                  Ver productos
                </Link>
              </div>
            ) : (
              <>
                {/* Action Buttons */}
                <div className="mb-6 flex justify-between items-center">
                  <button
                    onClick={handleShare}
                    className="inline-flex items-center gap-2 px-4 py-2 border-2 border-rose-600 text-rose-600 rounded-lg font-semibold hover:bg-rose-50 transition"
                  >
                    <Share2 className="w-4 h-4" />
                    Compartir por WhatsApp
                  </button>
                </div>

                {/* Products Grid */}
                <div className="grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  {wishlistProducts.map((product) => (
                    <ProductCard key={product!.slug} product={product!} />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
