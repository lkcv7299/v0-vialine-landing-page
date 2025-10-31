"use client"
import Link from "next/link"
import WishlistHeart from "@/components/WishlistHeart"

type Props = {
  href: string
  title: string
  price: number
  image: string
  badge?: "nuevo" | "oferta"
  slug: string
  fallbackImage?: string
  originalPrice?: number
  inventory?: number
}

export default function ProductCard({ href, title, price, image, badge, slug, fallbackImage, originalPrice, inventory }: Props) {
  const displayImage = image || fallbackImage || "/placeholder.svg"
  const isOutOfStock = inventory === 0

  return (
    <Link href={href} className="group block">
      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-md">
        <img
          src={displayImage}
          onError={(e) => {
            ;(e.currentTarget as HTMLImageElement).src = fallbackImage || "/placeholder.svg"
          }}
          alt={title}
          className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-[1.02]"
          loading="lazy"
        />

        {/* Botón "Ver detalles" en hover */}
        {!isOutOfStock && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button className="bg-white text-neutral-900 px-6 py-2.5 rounded-full font-semibold text-sm hover:bg-neutral-100 transition transform translate-y-2 group-hover:translate-y-0">
              Ver detalles
            </button>
          </div>
        )}

        <WishlistHeart slug={slug} />

        {/* Badge NUEVO o OFERTA */}
        {badge && !isOutOfStock && (
          <span className={`absolute left-2 top-2 rounded-md px-2.5 py-1 text-xs font-bold uppercase shadow-lg ${
            badge === "nuevo"
              ? "bg-blue-600 text-white"
              : "bg-red-600 text-white"
          }`}>
            {badge === "nuevo" ? "Nuevo" : "Oferta"}
          </span>
        )}

        {/* Badge AGOTADO */}
        {isOutOfStock && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <span className="bg-neutral-900 text-white px-4 py-2 rounded-md text-sm font-bold uppercase">
              Agotado
            </span>
          </div>
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
