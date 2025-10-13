"use client"
import Link from "next/link"
import { getImageUrl, type CategorySlug } from "@/lib/assets"

export default function ProductCard({
  href,
  title,
  price,
  image,
  badge,
  fav = false,
  category,
  slug,
  colors,
}: {
  href: string
  title: string
  price: number
  image: string
  badge?: string
  fav?: boolean
  category?: CategorySlug
  slug?: string
  colors?: string[]
}) {
  const imageData =
    category && slug
      ? getImageUrl({ category, slug, color: colors?.[0] })
      : { src: image || "/placeholder.svg", fallback: "/placeholder.svg" }

  return (
    <Link href={href} className="group block">
      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-md">
        <img
          src={imageData.src || "/placeholder.svg"}
          onError={(e) => {
            ;(e.currentTarget as HTMLImageElement).src = imageData.fallback
          }}
          alt={title}
          className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-[1.02]"
          loading="lazy"
        />
        {/* Wish / Fav (placeholder) */}
        <div className="absolute right-2 top-2 grid h-9 w-9 place-items-center rounded-full bg-white/95 shadow-sm">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 1 0-7.8 7.8l1 1L12 22l7.8-8.6 1-1a5.5 5.5 0 0 0 0-7.8z" />
          </svg>
        </div>
        {/* Badge NEW */}
        {badge && (
          <span className="absolute left-2 bottom-2 rounded px-2 py-0.5 text-xs font-medium bg-white/95 shadow">
            {badge}
          </span>
        )}
      </div>

      <div className="mt-2">
        <p className="text-[15px] leading-tight">{title}</p>
        <p className="mt-1 text-[15px] font-medium">
          {new Intl.NumberFormat("es-PE", { style: "currency", currency: "PEN" }).format(price)}
        </p>
      </div>
    </Link>
  )
}
