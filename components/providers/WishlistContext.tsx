// components/providers/WishlistContext.tsx
"use client"

import { createContext, useContext, useEffect, useMemo, useState } from "react"
import { useSession } from "next-auth/react"
import type React from "react"
import { toast } from "sonner"

type Ctx = {
  items: string[]
  toggle: (slug: string) => void
  has: (slug: string) => boolean
  loading: boolean
}

const WishlistCtx = createContext<Ctx | null>(null)

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession()
  const [items, setItems] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [hasSynced, setHasSynced] = useState(false)

  // ====================================
  // CARGAR WISHLIST AL MONTAR
  // ====================================
  useEffect(() => {
    if (typeof window === "undefined") return

    const loadWishlist = async () => {
      setLoading(true)

      if (status === "authenticated" && session?.user?.id) {
        // Usuario logueado: cargar desde DB
        try {
          const res = await fetch("/api/wishlist")
          const data = await res.json()

          if (data.success) {
            setItems(data.items)

            // Migrar de localStorage a DB si hay items
            if (!hasSynced) {
              await migrateLocalStorageToDB(data.items)
              setHasSynced(true)
            }
          }
        } catch (error) {
          console.error("Error loading wishlist:", error)
          // Fallback a localStorage
          loadFromLocalStorage()
        }
      } else {
        // Usuario guest: usar localStorage
        loadFromLocalStorage()
      }

      setLoading(false)
    }

    loadWishlist()
  }, [status, session])

  // ====================================
  // CARGAR DESDE LOCALSTORAGE (GUEST)
  // ====================================
  const loadFromLocalStorage = () => {
    try {
      const s = localStorage.getItem("wishlist")
      if (s) {
        const parsed = JSON.parse(s)
        // Deduplicar usando Set
        const uniqueItems = [...new Set(parsed as string[])]
        setItems(uniqueItems)
        // Si había duplicados, guardar la versión limpia
        if (uniqueItems.length !== parsed.length) {
          localStorage.setItem("wishlist", JSON.stringify(uniqueItems))
        }
      }
    } catch (error) {
      console.error("Error loading from localStorage:", error)
    }
  }

  // ====================================
  // MIGRAR DE LOCALSTORAGE A DB (AL LOGIN)
  // ====================================
  const migrateLocalStorageToDB = async (dbItems: string[]) => {
    try {
      const localItems = localStorage.getItem("wishlist")
      if (!localItems) return

      const localWishlist: string[] = JSON.parse(localItems)

      // Items que están en local pero no en DB
      const itemsToMigrate = localWishlist.filter((slug) => !dbItems.includes(slug))

      if (itemsToMigrate.length === 0) {
        localStorage.removeItem("wishlist")
        return
      }

      // Migrar cada item
      for (const slug of itemsToMigrate) {
        try {
          await fetch("/api/wishlist", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ productSlug: slug }),
          })
        } catch (error) {
          console.error(`Error migrating ${slug}:`, error)
        }
      }

      // Limpiar localStorage después de migrar
      localStorage.removeItem("wishlist")

      // Recargar desde DB para tener todo sincronizado
      const res = await fetch("/api/wishlist")
      const data = await res.json()
      if (data.success) {
        setItems(data.items)
      }
    } catch {
      // Silent fail for wishlist migration
    }
  }

  // ====================================
  // TOGGLE ITEM (ADD/REMOVE)
  // ====================================
  const toggle = async (slug: string) => {
    const isInWishlist = items.includes(slug)

    if (status === "authenticated" && session?.user?.id) {
      // Usuario logueado: sync con DB
      try {
        if (isInWishlist) {
          // Remover
          const res = await fetch(`/api/wishlist?productSlug=${slug}`, {
            method: "DELETE",
          })

          if (res.ok) {
            setItems((prev) => prev.filter((x) => x !== slug))
            toast.success("Removido de favoritos")
          } else {
            toast.error("Error al remover de favoritos")
          }
        } else {
          // Agregar
          const res = await fetch("/api/wishlist", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ productSlug: slug }),
          })

          if (res.ok) {
            // Usar Set para evitar duplicados
            setItems((prev) => {
              if (prev.includes(slug)) return prev
              return [...prev, slug]
            })
            toast.success("Agregado a favoritos")
          } else {
            const data = await res.json()
            if (res.status === 401) {
              toast.error(data.error || "Debes iniciar sesión")
            } else {
              toast.error("Error al agregar a favoritos")
            }
          }
        }
      } catch (error) {
        console.error("Error toggling wishlist:", error)
        toast.error("Error de conexión")
      }
    } else {
      // Usuario guest: usar localStorage
      let newItems: string[]
      if (isInWishlist) {
        newItems = items.filter((x) => x !== slug)
      } else {
        // Evitar duplicados
        newItems = items.includes(slug) ? items : [...items, slug]
      }

      setItems(newItems)
      localStorage.setItem("wishlist", JSON.stringify(newItems))

      if (isInWishlist) {
        toast.success("Removido de favoritos")
      } else {
        toast.success("Agregado a favoritos")
      }
    }
  }

  // ====================================
  // CHECK IF ITEM IS IN WISHLIST
  // ====================================
  const has = (slug: string) => items.includes(slug)

  const value = useMemo(
    () => ({
      items,
      toggle,
      has,
      loading,
    }),
    [items, loading]
  )

  return <WishlistCtx.Provider value={value}>{children}</WishlistCtx.Provider>
}

export function useWishlist() {
  const ctx = useContext(WishlistCtx)
  if (!ctx) throw new Error("useWishlist must be used inside WishlistProvider")
  return ctx
}