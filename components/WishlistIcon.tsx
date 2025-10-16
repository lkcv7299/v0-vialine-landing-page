"use client"

import Link from "next/link"
import { Heart } from "lucide-react"
import { useWishlist } from "./providers/WishlistContext"

export default function WishlistIcon() {
  const { items } = useWishlist()
  const count = items.length

  return (
    <Link
      href="/wishlist"
      className="relative p-2 hover:bg-neutral-100 rounded-full transition-colors"
      aria-label={`Favoritos (${count})`}
    >
      <Heart 
        className={`w-6 h-6 transition-colors ${
          count > 0 
            ? "text-rose-600 fill-rose-600" 
            : "text-neutral-600"
        }`} 
      />
      
      {/* Badge con contador */}
      {count > 0 && (
        <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-rose-600 text-[10px] font-bold text-white">
          {count > 9 ? "9+" : count}
        </span>
      )}
    </Link>
  )
}
