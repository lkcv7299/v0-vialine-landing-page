"use client"
import { createContext, useContext, useEffect, useMemo, useState } from "react"
import type React from "react"

type Ctx = {
  items: string[]
  toggle: (slug: string) => void
  has: (slug: string) => boolean
}
const WishlistCtx = createContext<Ctx | null>(null)

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<string[]>([])

  useEffect(() => {
    if (typeof window === "undefined") return
    try {
      const s = localStorage.getItem("wishlist")
      if (s) setItems(JSON.parse(s))
    } catch {}
  }, [])

  useEffect(() => {
    if (typeof window === "undefined") return
    localStorage.setItem("wishlist", JSON.stringify(items))
  }, [items])

  const value = useMemo(
    () => ({
      items,
      toggle: (slug: string) =>
        setItems((prev) => (prev.includes(slug) ? prev.filter((x) => x !== slug) : [...prev, slug])),
      has: (slug: string) => items.includes(slug),
    }),
    [items],
  )

  return <WishlistCtx.Provider value={value}>{children}</WishlistCtx.Provider>
}

export function useWishlist() {
  const ctx = useContext(WishlistCtx)
  if (!ctx) throw new Error("useWishlist must be used inside WishlistProvider")
  return ctx
}
