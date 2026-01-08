"use client"

import { Heart } from "lucide-react"
import { useWishlist } from "./providers/WishlistContext"
import { useState } from "react"
import { toast } from "sonner"

export default function WishlistHeart({ slug }: { slug: string }) {
  const { has, toggle } = useWishlist()
  const active = has(slug)
  const [isAnimating, setIsAnimating] = useState(false)

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    // Trigger animación
    setIsAnimating(true)
    toggle(slug)

    // Mostrar toast de feedback
    toast.success(active ? "Eliminado de favoritos" : "Agregado a favoritos")

    // Reset animación
    setTimeout(() => setIsAnimating(false), 600)
  }

  return (
    <button
      onClick={handleClick}
      aria-label={active ? "Quitar de favoritos" : "Agregar a favoritos"}
      className={`absolute right-3 top-3 rounded-full bg-white/95 p-2.5 shadow-md hover:shadow-lg hover:bg-white transition-all duration-200 z-10 ${
        isAnimating ? "scale-125" : "scale-100"
      }`}
    >
      <Heart
        className={`h-5 w-5 transition-all duration-300 ${
          active 
            ? "fill-rose-600 text-rose-600 scale-110" 
            : "text-neutral-600 hover:text-rose-600"
        } ${isAnimating ? "animate-pulse" : ""}`}
      />
    </button>
  )
}
