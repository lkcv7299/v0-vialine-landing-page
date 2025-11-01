"use client"

import { useState } from "react"
import { type Product } from "@/data/products"
import ProductCard from "./ProductCard"
import { Loader2 } from "lucide-react"

interface ProductListWithLoadMoreProps {
  initialItems: Product[]
  allItems: Product[]
  itemsPerPage?: number
  isMobile?: boolean
}

export default function ProductListWithLoadMore({
  initialItems,
  allItems,
  itemsPerPage = 24,
  isMobile = false,
}: ProductListWithLoadMoreProps) {
  const [displayedItems, setDisplayedItems] = useState(initialItems)
  const [isLoading, setIsLoading] = useState(false)

  const hasMore = displayedItems.length < allItems.length
  const remainingCount = allItems.length - displayedItems.length

  const loadMore = () => {
    setIsLoading(true)

    // Simular un pequeño delay para UX
    setTimeout(() => {
      const nextItems = allItems.slice(
        displayedItems.length,
        displayedItems.length + itemsPerPage
      )
      setDisplayedItems((prev) => [...prev, ...nextItems])
      setIsLoading(false)
    }, 300)
  }

  return (
    <div className="space-y-6">
      {/* Product Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-3 gap-y-6 md:gap-x-4 md:gap-y-8">
        {displayedItems.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>

      {/* Load More Button (Solo en móvil) o Paginación (Desktop) */}
      {hasMore && (
        <>
          {/* Mobile: Load More Button */}
          <div className="lg:hidden flex flex-col items-center gap-3 pt-6">
            <button
              onClick={loadMore}
              disabled={isLoading}
              className="w-full max-w-xs px-6 py-3 bg-rose-600 text-white rounded-lg font-semibold hover:bg-rose-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Cargando...
                </>
              ) : (
                `Cargar más (${remainingCount})`
              )}
            </button>
            <p className="text-sm text-neutral-600">
              Mostrando {displayedItems.length} de {allItems.length} productos
            </p>
          </div>

          {/* Desktop: Traditional "Load More" or could use pagination */}
          <div className="hidden lg:flex flex-col items-center gap-3 pt-8">
            <button
              onClick={loadMore}
              disabled={isLoading}
              className="px-8 py-3 border-2 border-neutral-300 text-neutral-900 rounded-lg font-semibold hover:border-neutral-400 hover:bg-neutral-50 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Cargando...
                </>
              ) : (
                `Ver más productos (${remainingCount})`
              )}
            </button>
            <p className="text-sm text-neutral-600">
              Mostrando {displayedItems.length} de {allItems.length} productos
            </p>
          </div>
        </>
      )}

      {/* Mensaje cuando se muestran todos */}
      {!hasMore && allItems.length > itemsPerPage && (
        <div className="text-center py-8 text-neutral-600">
          <p>Has visto todos los productos ({allItems.length})</p>
        </div>
      )}
    </div>
  )
}
