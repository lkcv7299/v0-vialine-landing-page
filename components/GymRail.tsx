"use client"

import { useRef } from "react"
import Link from "next/link"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"
import WishlistHeart from "@/components/WishlistHeart"
import { getAverageRating, getReviewCount } from "@/data/reviews"

type Item = { 
  slug: string
  name: string
  image: string
  price: number
  badge?: string
}

type GymRailProps = {
  title: string
  viewAllHref: string
  items: Item[]
}

export default function GymRail({ title, viewAllHref, items }: GymRailProps) {
  const trackRef = useRef<HTMLDivElement>(null)

  const scroll = (dir: "left" | "right") => {
    if (!trackRef.current) return
    const scrollAmount = trackRef.current.offsetWidth
    trackRef.current.scrollBy({
      left: dir === "right" ? scrollAmount : -scrollAmount,
      behavior: "smooth"
    })
  }

  return (
    <section className="relative py-8 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Header - ALINEADO CON LAS IMÁGENES */}
        <div className="flex items-end justify-between mb-6">
          <div>
            <p className="text-xs font-semibold text-neutral-500 tracking-wide uppercase mb-1">
              WOMENS
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-neutral-900">
              {title}
            </h2>
          </div>
          <Link 
            href={viewAllHref}
            className="text-sm font-semibold underline hover:no-underline"
          >
            View All
          </Link>
        </div>

        {/* Carrusel - EXACTAMENTE 4 PRODUCTOS VISIBLES */}
        <div className="relative group">
          <div
            ref={trackRef}
            className="overflow-x-auto scrollbar-hide snap-x snap-mandatory"
          >
            <div className="flex gap-4">
              {items.map((item) => {
                const rating = getAverageRating(item.slug)
                const reviewCount = getReviewCount(item.slug)
                
                return (
                  <div
                    key={item.slug}
                    className="flex-none w-[calc(25%-12px)] min-w-[200px] snap-start"
                  >
                    <Link href={`/producto/${item.slug}`} className="group/card block">
                      {/* Imagen CUADRADA */}
                      <div className="relative aspect-square w-full overflow-hidden bg-neutral-100 mb-3 rounded">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover/card:scale-105"
                        />
                        
                        <WishlistHeart slug={item.slug} />

                        {item.badge && (
                          <span className="absolute left-3 top-3 bg-white px-2 py-1 text-xs font-bold uppercase">
                            {item.badge}
                          </span>
                        )}
                      </div>

                      {/* Info */}
                      <div className="space-y-1">
                        <h3 className="text-sm font-medium text-neutral-900 leading-tight line-clamp-2">
                          {item.name}
                        </h3>
                        
                        {/* Reviews */}
                        {reviewCount > 0 && (
                          <div className="flex items-center gap-1.5">
                            <div className="flex items-center gap-0.5">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-3 h-3 ${
                                    i < Math.floor(rating)
                                      ? "fill-neutral-900 text-neutral-900"
                                      : "fill-neutral-200 text-neutral-200"
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-xs font-semibold text-neutral-900">
                              {rating.toFixed(1)}
                            </span>
                            <span className="text-xs text-neutral-500">
                              ({reviewCount})
                            </span>
                          </div>
                        )}

                        <p className="text-sm font-semibold text-neutral-900">
                          S/ {item.price}
                        </p>
                      </div>
                    </Link>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Botones navegación */}
          {items.length > 4 && (
            <>
              <button
                onClick={() => scroll("left")}
                className="absolute left-0 top-1/2 -translate-y-1/2 bg-white hover:bg-neutral-100 p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-10"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => scroll("right")}
                className="absolute right-0 top-1/2 -translate-y-1/2 bg-white hover:bg-neutral-100 p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-10"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}
        </div>
      </div>

      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  )
}