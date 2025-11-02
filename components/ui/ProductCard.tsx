"use client"
import { useState } from "react"
import Link from "next/link"
import WishlistHeart from "@/components/WishlistHeart"

type Props = {
  href: string
  title: string
  price: number
  image: string
  hoverImage?: string | null
  badge?: "nuevo" | "oferta"
  slug: string
  fallbackImage?: string
  originalPrice?: number
  inventory?: number
}

export default function ProductCard({ href, title, price, image, hoverImage, badge, slug, fallbackImage, originalPrice, inventory }: Props) {
  const [isHovering, setIsHovering] = useState(false)
  const displayImage = image || fallbackImage || "/placeholder.svg"
  const isOutOfStock = inventory === 0

  // Usar hover image si está disponible y estamos hovering
  const currentImage = isHovering && hoverImage ? hoverImage : displayImage

  // Determinar scale y object-position para hacer zoom al área relevante
  const getImageStyle = () => {
    const productSlug = slug.toLowerCase()
    const imagePath = displayImage.toLowerCase()

    // Scale base para zoom
    const baseScale = 1.25
    const hoverScale = isHovering ? 1.05 : 1
    const finalScale = baseScale * hoverScale

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
        transform: `scale(${finalScale})`,
        objectPosition: 'center 20%'  // Enfoque en parte superior
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
        transform: `scale(${finalScale})`,
        objectPosition: 'center 75%'  // Enfoque en parte inferior
      }
    }

    // Por defecto: Solo hover scale, centrado normal
    return {
      transform: isHovering ? 'scale(1.05)' : 'scale(1)',
      objectPosition: 'center center'
    }
  }

  return (
    <Link href={href} className="group block">
      <div
        className="relative aspect-[3/4] w-full overflow-hidden rounded-md"
        onMouseEnter={() => !isOutOfStock && setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <img
          src={currentImage}
          onError={(e) => {
            ;(e.currentTarget as HTMLImageElement).src = fallbackImage || "/placeholder.svg"
          }}
          alt={title}
          className="h-full w-full object-cover transition-all duration-500 ease-out"
          style={getImageStyle()}
          loading="lazy"
        />

        <WishlistHeart slug={slug} />

        {/* Badge NUEVO o OFERTA - Paleta unificada negra (menos invasivo) */}
        {badge && !isOutOfStock && (
          <span className={`absolute left-2 bottom-2 rounded-sm px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide shadow-sm ${
            badge === "nuevo"
              ? "bg-black/70 text-white"
              : "bg-black/70 text-red-400"
          }`}>
            {badge === "nuevo" ? "Nuevo" : "Oferta"}
          </span>
        )}

        {/* Badge AGOTADO - Paleta unificada */}
        {isOutOfStock && (
          <>
            <div className="absolute inset-0 bg-black/10" />
            <span className="absolute bottom-2 left-2 bg-black/75 text-white px-2 py-1 text-[11px] font-medium uppercase tracking-wide rounded-sm shadow-sm">
              Agotado
            </span>
          </>
        )}
      </div>

      <div className="mt-2">
        <p className="text-[15px] leading-tight">{title}</p>
        <div className="mt-1 flex items-center gap-2">
          {originalPrice && badge === "oferta" ? (
            <>
              <p className="text-[15px] font-medium text-red-600">
                {new Intl.NumberFormat("es-PE", { style: "currency", currency: "PEN" }).format(price)}
              </p>
              <p className="text-[13px] text-neutral-500 line-through">
                {new Intl.NumberFormat("es-PE", { style: "currency", currency: "PEN" }).format(originalPrice)}
              </p>
            </>
          ) : (
            <p className="text-[15px] font-medium">
              {new Intl.NumberFormat("es-PE", { style: "currency", currency: "PEN" }).format(price)}
            </p>
          )}
        </div>
      </div>
    </Link>
  )
}
