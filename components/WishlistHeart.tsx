"use client"
import { Heart } from "lucide-react"
import { useWishlist } from "./providers/WishlistContext"

export default function WishlistHeart({ slug }: { slug: string }) {
  const { has, toggle } = useWishlist()
  const active = has(slug)

  return (
    <button
      onClick={(e) => {
        e.preventDefault()
        toggle(slug)
      }}
      aria-label={active ? "Quitar de favoritos" : "Agregar a favoritos"}
      className="absolute right-3 top-3 rounded-full bg-white/95 p-2 shadow hover:bg-white"
    >
      <Heart className={`h-5 w-5 ${active ? "fill-rose-600 text-rose-600" : "text-neutral-700"}`} />
    </button>
  )
}
