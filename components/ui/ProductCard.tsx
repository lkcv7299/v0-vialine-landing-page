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

  // Determinar object-position basado en el path de la imagen (categoría del producto)
  // Productos de parte superior del cuerpo (tops, camisetas, bodys, enterizos) → object-top
  // Productos de parte inferior (leggings, shorts, bikers) → object-center
  const getObjectPosition = () => {
    const imagePath = displayImage.toLowerCase()
    const topCategories = ['top', 'camiseta', 'body', 'enterizo']
    const isTopProduct = topCategories.some(cat => imagePath.includes(cat))
    return isTopProduct ? 'object-top' : 'object-center'
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
          className={`h-full w-full object-cover ${getObjectPosition()} transition-all duration-500 ease-out group-hover:scale-105`}
          loading="lazy"
        />

        <WishlistHeart slug={slug} />

        {/* Badge NUEVO o OFERTA - Estilo Gymshark (bottom-left, discreto) */}
        {badge && !isOutOfStock && (
          <span className={`absolute left-2 bottom-2 rounded-sm px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide shadow-md ${
            badge === "nuevo"
              ? "bg-blue-600/90 text-white"
              : "bg-red-600/90 text-white"
          }`}>
            {badge === "nuevo" ? "Nuevo" : "Oferta"}
          </span>
        )}

        {/* Badge AGOTADO - Overlay sutil + badge discreto */}
        {isOutOfStock && (
          <>
            <div className="absolute inset-0 bg-black/10" />
            <span className="absolute bottom-2 left-2 bg-neutral-900/90 text-white px-2 py-1 text-[11px] font-medium uppercase tracking-wide rounded-sm shadow-md">
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
