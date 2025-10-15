"use client"

import type React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState, useRef, useEffect } from "react"
import { ShoppingBag, X, Heart } from "lucide-react"
import MegaMenu from "./MegaMenu"
import MobileNav from "./MobileNav"
import { useCart } from "@/contexts/CartContext"
import { useWishlist } from "@/components/providers/WishlistContext"

export default function SiteHeader() {
  const [q, setQ] = useState("")
  const [showMiniCart, setShowMiniCart] = useState(false)
  const router = useRouter()
  const { items, itemCount, total, removeItem } = useCart()
  const { items: wishlistItems } = useWishlist()
  const wishlistCount = wishlistItems.length
  const miniCartRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (miniCartRef.current && !miniCartRef.current.contains(event.target as Node)) {
        setShowMiniCart(false)
      }
    }

    if (showMiniCart) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [showMiniCart])

  function submit(e?: React.FormEvent) {
    e?.preventDefault()
    if (!q.trim()) return
    router.push(`/search?q=${encodeURIComponent(q)}`)
  }

  return (
    <header className="sticky top-0 z-20 w-full bg-white/80 backdrop-blur border-b">
      {/* PADDING SUPER MÍNIMO - px-3 md:px-4 */}
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-3 md:px-4 py-3">
        {/* Mobile: hamburger */}
        <div className="lg:hidden">
          <MobileNav />
        </div>

        {/* Logo */}
        <Link href="/" className="font-semibold tracking-wide text-base">
          Vialine
        </Link>

        {/* Search (desktop) */}
        <form onSubmit={submit} className="hidden flex-1 items-center lg:flex mx-4">
          <div className="relative w-full max-w-xl">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400">🔍</span>
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Buscar productos"
              className="w-full rounded-full border bg-white pl-9 pr-4 py-2 text-sm outline-none ring-0 placeholder:text-neutral-400 focus:border-rose-400"
            />
          </div>
        </form>

        {/* Right icons */}
        <div className="flex items-center gap-1">
          {/* Wishlist Icon */}
          <Link
            href="/wishlist"
            className="relative hover:text-rose-600 transition p-2"
            aria-label={`Favoritos (${wishlistCount})`}
          >
            <Heart 
              className={`w-5 h-5 transition-colors ${
                wishlistCount > 0 
                  ? "text-rose-600 fill-rose-600" 
                  : "text-neutral-600"
              }`} 
            />
            {wishlistCount > 0 && (
              <span className="absolute -right-1 -top-1 h-4 min-w-4 rounded-full bg-rose-600 px-1 text-[10px] font-medium text-white flex items-center justify-center">
                {wishlistCount > 9 ? "9+" : wishlistCount}
              </span>
            )}
          </Link>

          {/* Cart Icon */}
          <div className="relative" ref={miniCartRef}>
            <button
              onClick={() => setShowMiniCart(!showMiniCart)}
              aria-label="Carrito"
              className="relative hover:text-rose-600 transition p-2"
            >
              <ShoppingBag className="w-5 h-5" />
              {itemCount > 0 && (
                <span className="absolute -right-1 -top-1 h-4 min-w-4 rounded-full bg-rose-600 px-1 text-[10px] font-medium text-white flex items-center justify-center">
                  {itemCount > 9 ? "9+" : itemCount}
                </span>
              )}
            </button>

            {/* MiniCart Dropdown */}
            {showMiniCart && (
              <div className="absolute right-0 top-full mt-2 w-96 max-w-[calc(100vw-2rem)] bg-white rounded-xl shadow-2xl border border-neutral-200 overflow-hidden">
                <div className="flex items-center justify-between px-5 py-4 border-b">
                  <h3 className="font-semibold text-lg">Mi Carrito ({itemCount})</h3>
                  <button
                    onClick={() => setShowMiniCart(false)}
                    className="text-neutral-400 hover:text-neutral-600"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {items.length === 0 ? (
                  <div className="px-5 py-10 text-center">
                    <ShoppingBag className="w-12 h-12 mx-auto text-neutral-300 mb-3" />
                    <p className="text-neutral-600">Tu carrito está vacío</p>
                  </div>
                ) : (
                  <>
                    <div className="max-h-[300px] overflow-y-auto">
                      {items.slice(0, 3).map((item) => (
                        <div
                          key={`${item.product.slug}-${item.selectedColor}-${item.selectedSize}`}
                          className="flex gap-3 p-4 border-b hover:bg-neutral-50"
                        >
                          <img
                            src={item.product.image}
                            alt={item.product.title}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm truncate">{item.product.title}</p>
                            <p className="text-xs text-neutral-600 mt-1">
                              {item.selectedColor} • {item.selectedSize}
                            </p>
                            <p className="text-sm font-medium mt-1">
                              S/ {item.product.price} × {item.quantity}
                            </p>
                          </div>
                          <button
                            onClick={() => removeItem(item.product.slug, item.selectedColor, item.selectedSize)}
                            className="text-neutral-400 hover:text-rose-600 transition"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                      {items.length > 3 && (
                        <p className="text-center py-3 text-sm text-neutral-600">
                          +{items.length - 3} productos más
                        </p>
                      )}
                    </div>
                    <div className="px-5 py-4 bg-neutral-50 border-t">
                      <div className="flex items-center justify-between mb-4">
                        <span className="font-semibold">Total</span>
                        <span className="text-xl font-bold">S/ {total.toFixed(2)}</span>
                      </div>
                      <Link
                        href="/carrito"
                        onClick={() => setShowMiniCart(false)}
                        className="block w-full bg-rose-600 text-white text-center py-3 rounded-lg font-semibold hover:bg-rose-700 transition"
                      >
                        Ver carrito completo
                      </Link>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Desktop mega menu */}
      <div className="mx-auto hidden h-11 max-w-7xl items-center gap-4 px-3 md:px-4 lg:flex">
        <MegaMenu />
      </div>
    </header>
  )
}