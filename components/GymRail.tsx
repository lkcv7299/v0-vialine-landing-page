"use client"

import { useRef, useState, useLayoutEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"
import WishlistHeart from "@/components/WishlistHeart"
import { getAverageRating, getReviewCount } from "@/data/reviews"
import { useImageTransform } from "@/hooks/useImageTransform"
import { parseImagePath } from "@/lib/imageTransformUtils"

type Item = {
  slug: string
  name: string
  image: string
  hoverImage?: string | null
  price: number
  badge?: string
}

type GymRailProps = {
  title: string
  viewAllHref: string
  items: Item[]
}

function RailItem({ item }: { item: Item }) {
  const [isHovering, setIsHovering] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const [containerWidth, setContainerWidth] = useState<number | null>(null)

  // Parsear imagen para obtener transform
  const { productSlug: imageParsedSlug, colorSlug, imageIndex } = parseImagePath(item.image)
  const actualProductSlug = imageParsedSlug || item.slug
  const { transform: savedTransform, isMounted } = useImageTransform(actualProductSlug, colorSlug || '', imageIndex, 'rail')

  // Medir contenedor antes del primer paint
  useLayoutEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth)
      }
    }

    updateSize()
    window.addEventListener('resize', updateSize)
    return () => window.removeEventListener('resize', updateSize)
  }, [])

  const rating = getAverageRating(item.slug)
  const reviewCount = getReviewCount(item.slug)

  const getImageStyle = () => {
    const productSlug = item.slug.toLowerCase()
    const imagePath = item.image.toLowerCase()

    // PRIORIDAD 0: Transform guardado - ESCALADO PROPORCIONAL AL CONTENEDOR
    if (savedTransform) {
      // Si tenemos transform pero no hemos medido el contenedor, no aplicar ningún transform
      if (containerWidth === null) {
        return {
          transform: 'none',
          transformOrigin: 'center center'
        }
      }

      // Usar el container width guardado para escalar proporcionalmente
      const baseContainerSize = savedTransform.containerWidth || 300
      const scaleFactor = containerWidth / baseContainerSize

      // Aplicar los valores escalados proporcionalmente
      const scaledX = savedTransform.x * scaleFactor
      const scaledY = savedTransform.y * scaleFactor

      return {
        transform: `translate(${scaledX}px, ${scaledY}px) scale(${savedTransform.scale})`,
        transformOrigin: 'center center'
      }
    }

    // PRIORIDAD 1: Defaults por tipo de producto
    // Productos superiores
    if (productSlug.includes('camiseta') ||
        productSlug.includes('top') ||
        productSlug.includes('body') ||
        productSlug.includes('enterizo') ||
        imagePath.includes('camiseta') ||
        imagePath.includes('top') ||
        imagePath.includes('body') ||
        imagePath.includes('enterizo')) {
      return {
        transform: 'scale(1)',
        transformOrigin: 'center top'
      }
    }

    // Productos inferiores
    if (productSlug.includes('legging') ||
        productSlug.includes('short') ||
        productSlug.includes('biker') ||
        productSlug.includes('pantalon') ||
        imagePath.includes('legging') ||
        imagePath.includes('short') ||
        imagePath.includes('biker') ||
        imagePath.includes('pantalon')) {
      return {
        transform: 'scale(1)',
        transformOrigin: 'center bottom'
      }
    }

    return {
      transform: 'scale(1.0)',
      transformOrigin: 'center center'
    }
  }

  const currentImage = isHovering && item.hoverImage ? item.hoverImage : item.image

  return (
    <div className="flex-none w-[25vw] min-w-[200px] snap-start px-2">
      <Link href={`/producto/${item.slug}`} className="group/card block">
        <div
          ref={containerRef}
          className="relative w-full aspect-square overflow-hidden bg-neutral-100 mb-3"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <Image
            src={currentImage}
            alt={item.name}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            quality={90}
            className={`object-contain ${!isMounted ? '[transition:none!important]' : ''}`}
            style={getImageStyle()}
          />

          <WishlistHeart slug={item.slug} />

          {item.badge && (
            <span className="absolute left-3 top-3 bg-white px-2 py-1 text-xs font-bold uppercase">
              {item.badge}
            </span>
          )}
        </div>

        <p className="text-sm font-medium mb-1 line-clamp-2">{item.name}</p>
        {reviewCount > 0 && (
          <div className="flex items-center gap-1 mb-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3 h-3 ${i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-neutral-300"}`}
                />
              ))}
            </div>
            <span className="text-xs text-neutral-500">({reviewCount})</span>
          </div>
        )}
        <p className="text-sm font-semibold">
          {new Intl.NumberFormat("es-PE", { style: "currency", currency: "PEN" }).format(item.price)}
        </p>
      </Link>
    </div>
  )
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
              MUJER
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-neutral-900">
              {title}
            </h2>
          </div>
          <Link
            href={viewAllHref}
            className="text-sm font-semibold underline hover:no-underline"
          >
            Ver todo
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
            {items.map((item) => (
              <RailItem key={item.slug} item={item} />
            ))}
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
