"use client"
import Link from "next/link"
import { useState, useRef, useEffect } from "react"
import { ShoppingBag } from "lucide-react"
import MobileMenu from "@/components/nav/MobileMenu"
import MiniCart from "@/components/MiniCart"
import { useCart } from "@/contexts/CartContext"
import WishlistIcon from "@/components/WishlistIcon"

// Dentro del header, junto al ícono del carrito:
<WishlistIcon />

type OpenKey = "women" | "girls" | null

export default function Header() {
  const [open, setOpen] = useState<OpenKey>(null)
  const [cartOpen, setCartOpen] = useState(false)
  const hideTimer = useRef<NodeJS.Timeout | null>(null)
  const cartRef = useRef<HTMLDivElement>(null)
  const { itemCount } = useCart()

  const openMenu = (k: OpenKey) => {
    if (hideTimer.current) clearTimeout(hideTimer.current)
    setOpen(k)
  }
  const delayedClose = () => {
    if (hideTimer.current) clearTimeout(hideTimer.current)
    hideTimer.current = setTimeout(() => setOpen(null), 120)
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (cartRef.current && !cartRef.current.contains(event.target as Node)) {
        setCartOpen(false)
      }
    }

    if (cartOpen) {
      document.addEventListener("mousedown", handleClickOutside)
      return () => document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [cartOpen])

  return (
    <header className="sticky top-0 z-50 w-full bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b border-slate-200 pointer-events-auto">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-6 px-4 sm:px-6">
        {/* Left: logo */}
        <Link href="/" className="shrink-0 font-semibold tracking-tight text-gray-900">
          Vialine
        </Link>

        <nav className="relative hidden lg:flex items-center gap-6 text-sm text-gray-800 flex-1">
          {/* Women */}
          <div className="relative" onMouseEnter={() => openMenu("women")} onMouseLeave={delayedClose}>
            <button className="py-2 text-gray-900 hover:text-pink-600 transition" aria-expanded={open === "women"}>
              Mujer
            </button>

            {/* Panel */}
            <div
              onMouseEnter={() => openMenu("women")}
              onMouseLeave={delayedClose}
              className={`absolute left-0 top-full mt-2 w-[min(92vw,1100px)] rounded-2xl bg-white p-6 shadow-xl ring-1 ring-black/5 transition
                ${open === "women" ? "opacity-100 visible" : "opacity-0 invisible"}`}
              style={{ zIndex: 70 }}
            >
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
                <div>
                  <p className="mb-3 text-xs font-semibold text-gray-500">ROPA</p>
                  <ul className="space-y-2">
                    {[
                      ["Leggings", "/shop/mujer/leggings"],
                      ["Short", "/shop/mujer/short"],
                      ["Pescador", "/shop/mujer/pescador"],
                      ["Torero", "/shop/mujer/torero"],
                      ["Bodys", "/shop/mujer/bodys"],
                      ["Enterizos", "/shop/mujer/enterizos"],
                      ["Tops", "/shop/mujer/tops"],
                      ["Camisetas", "/shop/mujer/camisetas"],
                    ].map(([label, href]) => (
                      <li key={label}>
                        <Link href={href} className="hover:text-pink-600">
                          {label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p className="mb-3 text-xs font-semibold text-gray-500">DESTACADOS</p>
                  <ul className="space-y-2">
                    <li>
                      <Link href="/collections/popular" className="hover:text-pink-600">
                        Popular ahora
                      </Link>
                    </li>
                    <li>
                      <Link href="/collections/new" className="hover:text-pink-600">
                        Novedades
                      </Link>
                    </li>
                    <li>
                      <Link href="/collections/offers" className="hover:text-pink-600">
                        Ofertas
                      </Link>
                    </li>
                  </ul>
                </div>

                <div className="hidden sm:flex items-start justify-end">
                  <Link
                    href="/mujer"
                    className="inline-flex items-center rounded-full bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
                  >
                    Ver todo →
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Girls */}
          <div className="relative" onMouseEnter={() => openMenu("girls")} onMouseLeave={delayedClose}>
            <button className="py-2 text-gray-900 hover:text-pink-600 transition" aria-expanded={open === "girls"}>
              Niña
            </button>

            <div
              onMouseEnter={() => openMenu("girls")}
              onMouseLeave={delayedClose}
              className={`absolute left-0 top-full mt-2 w-[min(92vw,950px)] rounded-2xl bg-white p-6 shadow-xl ring-1 ring-black/5 transition
                ${open === "girls" ? "opacity-100 visible" : "opacity-0 invisible"}`}
              style={{ zIndex: 70 }}
            >
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
                <div>
                  <p className="mb-3 text-xs font-semibold text-gray-500">ROPA</p>
                  <ul className="space-y-2">
                    {[
                      ["Cafarenas", "/shop/nina/cafarenas"],
                      ["Enterizos", "/shop/nina/enterizos"],
                      ["Leggins", "/shop/nina/leggings"],
                      ["Pantys", "/shop/nina/pantys"],
                      ["Shorts", "/shop/nina/shorts"],
                      ["Tops", "/shop/nina/tops"],
                    ].map(([label, href]) => (
                      <li key={label}>
                        <Link href={href} className="hover:text-pink-600">
                          {label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p className="mb-3 text-xs font-semibold text-gray-500">DESTACADOS</p>
                  <ul className="space-y-2">
                    <li>
                      <Link href="/nina?tag=popular" className="hover:text-pink-600">
                        Popular ahora
                      </Link>
                    </li>
                    <li>
                      <Link href="/nina?tag=nuevo" className="hover:text-pink-600">
                        Novedades
                      </Link>
                    </li>
                  </ul>
                </div>

                <div className="hidden sm:flex items-start justify-end">
                  <Link
                    href="/nina"
                    className="inline-flex items-center rounded-full bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
                  >
                    Ver todo →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </nav>

        {/* Center: search - hidden on mobile */}
        <div className="hidden md:flex flex-1 justify-center">
          <form action="/search" method="GET" className="group relative w-full max-w-[720px]">
            <input
              type="search"
              name="q"
              placeholder="Buscar productos"
              className="w-full rounded-full border border-rose-200 bg-white/70 px-5 py-3 outline-none focus:border-rose-400"
            />
            <button type="submit" className="sr-only">
              Search
            </button>
          </form>
        </div>

        <div className="relative" ref={cartRef}>
          <button
            onClick={() => setCartOpen(!cartOpen)}
            className="relative p-2 text-gray-700 hover:text-rose-600 transition"
            aria-label="Carrito de compras"
            aria-expanded={cartOpen}
          >
            <ShoppingBag className="h-6 w-6" />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-rose-600 text-xs font-medium text-white animate-in zoom-in duration-200">
                {itemCount > 9 ? "9+" : itemCount}
              </span>
            )}
          </button>

          {cartOpen && <MiniCart onClose={() => setCartOpen(false)} />}
        </div>

        <div className="ml-auto lg:ml-0">
          <MobileMenu />
        </div>
      </div>
    </header>
  )
}
