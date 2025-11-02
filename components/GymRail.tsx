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
      {/* Header CON padding - alineado con el contenido general */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 mb-6">
        <div className="flex items-end justify-between">
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
      </div>

      {/* Carrusel SIN padding - EDGE TO EDGE */}
      <div className="relative group">
        <div
          ref={trackRef}
          className="overflow-x-auto scrollbar-hide snap-x snap-mandatory"
        >
          {/* IMPORTANTE: Sin padding, sin gap, usando viewport width */}
          <div className="flex">
            {items.map((item) => {
              const rating = getAverageRating(item.slug)
              const reviewCount = getReviewCount(item.slug)
              
              // Determinar scale y object-position para hacer zoom al área relevante
              const getImageStyle = () => {
                const productSlug = item.slug.toLowerCase()
                const imagePath = item.image.toLowerCase()

                // Scale MÁS agresivo en carruseles (cuadrados necesitan más zoom)
                const baseScale = 1.5

                // Productos superiores (camisetas, tops): ZOOM hacia arriba (cara + producto)
                if (productSlug.includes('camiseta') ||
                    productSlug.includes('top') ||
                    productSlug.includes('body') ||
                    productSlug.includes('enterizo') ||
                    imagePath.includes('camiseta') ||
                    imagePath.includes('top') ||
                    imagePath.includes('body') ||
                    imagePath.includes('enterizo')) {
                  return {
                    transform: `scale(${baseScale})`,
                    objectPosition: 'center 30%'  // Enfoque en parte superior (más abajo para no cortar)
                  }
                }

                // Productos inferiores (leggings, shorts): ZOOM hacia abajo (piernas + producto)
                if (productSlug.includes('legging') ||
                    productSlug.includes('short') ||
                    productSlug.includes('biker') ||
                    productSlug.includes('pantalon') ||
                    imagePath.includes('legging') ||
                    imagePath.includes('short') ||
                    imagePath.includes('biker') ||
                    imagePath.includes('pantalon')) {
                  return {
                    transform: `scale(${baseScale})`,
                    objectPosition: 'center 70%'  // Enfoque en parte inferior
                  }
                }

                // Por defecto: Ligero zoom centrado
                return {
                  transform: 'scale(1.15)',
                  objectPosition: 'center center'
                }
              }

              return (
                <div
                  key={item.slug}
                  className="flex-none w-[25vw] min-w-[200px] snap-start px-2"
                >
                  <Link href={`/producto/${item.slug}`} className="group/card block">
                    {/* Imagen CUADRADA */}
                    <div className="relative aspect-square w-full overflow-hidden bg-neutral-100 mb-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover/card:scale-110"
                        style={getImageStyle()}
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
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white hover:bg-neutral-100 p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-10"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white hover:bg-neutral-100 p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-10"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}
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
