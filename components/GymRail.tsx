"use client"

import { useRef, useState, useEffect, useLayoutEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"
import WishlistHeart from "@/components/WishlistHeart"
import { getAverageRating, getReviewCount } from "@/data/reviews"
import { useImageDebug } from "@/contexts/ImageDebugContext"
import { useImageFraming } from "@/contexts/ImageFramingContext"
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
  const { values } = useImageDebug()
  const { isFramingMode, selectedImage, setSelectedImage } = useImageFraming()
  const containerRef = useRef<HTMLDivElement>(null)
  const [containerWidth, setContainerWidth] = useState<number | null>(null)

  // Parsear imagen para obtener transform
  const { productSlug: imageParsedSlug, colorSlug, imageIndex } = parseImagePath(item.image)
  const actualProductSlug = imageParsedSlug || item.slug
  const { transform: debuggerTransform, isMounted } = useImageTransform(actualProductSlug, colorSlug || '', imageIndex, 'rail')

  // ✅ USAR useLayoutEffect para medir ANTES del primer paint (evita flash)
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

  const isSelected =
    isFramingMode &&
    selectedImage?.productSlug === actualProductSlug &&
    selectedImage?.colorSlug === colorSlug &&
    selectedImage?.imageIndex === imageIndex

  const handleFramingClick = (e: React.MouseEvent) => {
    if (isFramingMode) {
      e.preventDefault()
      e.stopPropagation()
      setSelectedImage({
        productSlug: actualProductSlug,
        colorSlug: colorSlug || '',
        imageIndex,
        imagePath: item.image,
        context: 'rail',
        containerWidth: containerWidth || 300 // ✅ Usar valor medido o fallback
      })
    }
  }

  const rating = getAverageRating(item.slug)
  const reviewCount = getReviewCount(item.slug)

  const getImageStyle = () => {
    const productSlug = item.slug.toLowerCase()
    const imagePath = item.image.toLowerCase()

    // PRIORIDAD 0: Transform del debugger - ESCALADO PROPORCIONAL AL CONTENEDOR
    if (debuggerTransform) {
      // ✅ USAR EL CONTAINER WIDTH GUARDADO (cuando se ajustó originalmente)
      const baseContainerSize = debuggerTransform.containerWidth || 300
      // Si aún no hemos medido el contenedor, usar el tamaño base original
      const currentContainerWidth = containerWidth || baseContainerSize
      const scaleFactor = currentContainerWidth / baseContainerSize

      // Aplicar los valores EXACTOS del usuario, pero escalados proporcionalmente
      const scaledX = debuggerTransform.x * scaleFactor
      const scaledY = debuggerTransform.y * scaleFactor

      return {
        transform: `translate(${scaledX}px, ${scaledY}px) scale(${debuggerTransform.scale})`,
        transformOrigin: 'center center'
      }
    }

    // Aplicar transforms generales normalmente
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
        transform: `scale(${values.railTopScale}) translateY(${values.railTopTranslateY}%) translateX(${values.railTopTranslateX}%)`,
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
        transform: `scale(${values.railBottomScale}) translateY(${values.railBottomTranslateY}%) translateX(${values.railBottomTranslateX}%)`,
        transformOrigin: 'center bottom'
      }
    }

    return {
      transform: 'scale(1.0)',
      transformOrigin: 'center center'
    }
  }

  const currentImage = isHovering && item.hoverImage ? item.hoverImage : item.image

  const content = (
    <>
      <div
        ref={containerRef}
        className={`relative w-full aspect-square overflow-hidden bg-neutral-100 mb-3 transition-all ${
          isSelected ? 'ring-4 ring-blue-600 ring-offset-4' : ''
        } ${isFramingMode && !isSelected ? 'ring-2 ring-blue-400 ring-offset-2 hover:ring-blue-600' : ''}`}
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

        {isFramingMode && (
          <div className="absolute top-2 right-2 bg-blue-600 text-white px-2 py-1 rounded text-[10px] font-medium shadow-lg">
            Click
          </div>
        )}

        {!isFramingMode && <WishlistHeart slug={item.slug} />}

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
    </>
  )

  if (isFramingMode) {
    return (
      <div className="flex-none w-[25vw] min-w-[200px] snap-start px-2 cursor-crosshair" onClick={handleFramingClick}>
        {content}
      </div>
    )
  }

  return (
    <div className="flex-none w-[25vw] min-w-[200px] snap-start px-2">
      <Link href={`/producto/${item.slug}`} className="group/card block">
        {content}
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
