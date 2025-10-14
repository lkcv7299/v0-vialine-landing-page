"use client"
import Link from "next/link"
import WishlistHeart from "@/components/WishlistHeart"

type Props = {
  href: string
  title: string
  price: number
  image: string
  badge?: string
  slug: string
  fallbackImage?: string
}

export default function ProductCard({ href, title, price, image, badge, slug, fallbackImage }: Props) {
  const displayImage = image || fallbackImage || "/placeholder.svg"

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
        <WishlistHeart slug={slug} />
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
