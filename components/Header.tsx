"use client"
import Link from "next/link"
import { useState, useRef, useEffect } from "react"
import { Menu, X } from "lucide-react"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetClose } from "@/components/ui/sheet"
import { usePathname } from "next/navigation"

type OpenKey = "women" | "girls" | null

export default function Header() {
  const [open, setOpen] = useState<OpenKey>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const hideTimer = useRef<NodeJS.Timeout | null>(null)
  const pathname = usePathname()

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  const openMenu = (k: OpenKey) => {
    if (hideTimer.current) clearTimeout(hideTimer.current)
    setOpen(k)
  }
  const delayedClose = () => {
    if (hideTimer.current) clearTimeout(hideTimer.current)
    hideTimer.current = setTimeout(() => setOpen(null), 120)
  }

  return (
    <>
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

          <div className="ml-auto flex shrink-0 items-center gap-3">
            <Link
              href="/account"
              aria-label="Cuenta"
              className="flex h-10 w-10 items-center justify-center rounded-full text-slate-900 hover:bg-slate-100 hover:text-pink-600 transition"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21a8 8 0 0 0-16 0" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </Link>
            <Link
              href="/cart"
              aria-label="Carrito"
              className="flex h-10 w-10 items-center justify-center rounded-full text-slate-900 hover:bg-slate-100 hover:text-pink-600 transition"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 7h12l-1 13H7L6 7Z" />
                <path d="M9 7a3 3 0 1 1 6 0" />
              </svg>
            </Link>

            <button
              onClick={() => setMobileOpen(true)}
              className="inline-flex lg:hidden h-10 w-10 items-center justify-center rounded-full text-slate-900 hover:bg-slate-100 hover:text-slate-700 transition"
              aria-controls="mobile-menu"
              aria-expanded={mobileOpen}
              aria-label="Open menu"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>

      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="left" className="w-[84vw] max-w-[420px] p-0" id="mobile-menu">
          {/* Header with brand and close */}
          <SheetHeader className="sticky top-0 z-10 flex flex-row items-center justify-between border-b border-slate-200 bg-white/95 backdrop-blur px-4 py-4">
            <SheetTitle className="font-semibold tracking-tight text-gray-900">Vialine</SheetTitle>
            <SheetClose className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-slate-100">
              <X size={20} />
              <span className="sr-only">Close</span>
            </SheetClose>
          </SheetHeader>

          {/* Navigation */}
          <nav className="flex flex-col p-4">
            {/* Shop section */}
            <div className="mb-6">
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Shop</h3>
              <ul className="space-y-1">
                <li>
                  <Link
                    href="/collections/women"
                    className="flex min-h-[44px] items-center rounded-lg px-3 font-semibold text-slate-900 hover:bg-slate-100 transition"
                  >
                    Women
                  </Link>
                </li>
                <li>
                  <Link
                    href="/collections/suplex"
                    className="flex min-h-[44px] items-center rounded-lg px-3 font-semibold text-slate-900 hover:bg-slate-100 transition"
                  >
                    Suplex
                  </Link>
                </li>
                <li>
                  <Link
                    href="/collections/algodon"
                    className="flex min-h-[44px] items-center rounded-lg px-3 font-semibold text-slate-900 hover:bg-slate-100 transition"
                  >
                    Cotton
                  </Link>
                </li>
                <li>
                  <Link
                    href="/collections/leggings"
                    className="flex min-h-[44px] items-center rounded-lg px-3 font-semibold text-slate-900 hover:bg-slate-100 transition"
                  >
                    Leggings
                  </Link>
                </li>
                <li>
                  <Link
                    href="/collections/tops"
                    className="flex min-h-[44px] items-center rounded-lg px-3 font-semibold text-slate-900 hover:bg-slate-100 transition"
                  >
                    Tops
                  </Link>
                </li>
                <li>
                  <Link
                    href="/collections/sets"
                    className="flex min-h-[44px] items-center rounded-lg px-3 font-semibold text-slate-900 hover:bg-slate-100 transition"
                  >
                    Sets
                  </Link>
                </li>
              </ul>
            </div>

            {/* Kids section */}
            <div className="mb-6">
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Kids</h3>
              <ul className="space-y-1">
                <li>
                  <Link
                    href="/collections/kids-girls"
                    className="flex min-h-[44px] items-center rounded-lg px-3 font-semibold text-slate-900 hover:bg-slate-100 transition"
                  >
                    Girls
                  </Link>
                </li>
                <li>
                  <Link
                    href="/collections/kids-boys"
                    className="flex min-h-[44px] items-center rounded-lg px-3 font-semibold text-slate-900 hover:bg-slate-100 transition"
                  >
                    Boys
                  </Link>
                </li>
              </ul>
            </div>

            {/* Help section */}
            <div className="mb-6">
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Help</h3>
              <ul className="space-y-1">
                <li>
                  <Link
                    href="/pages/guia-de-tallas"
                    className="flex min-h-[44px] items-center rounded-lg px-3 font-semibold text-slate-900 hover:bg-slate-100 transition"
                  >
                    Size guide
                  </Link>
                </li>
                <li>
                  <Link
                    href="/pages/envios-y-devoluciones"
                    className="flex min-h-[44px] items-center rounded-lg px-3 font-semibold text-slate-900 hover:bg-slate-100 transition"
                  >
                    Shipping & returns
                  </Link>
                </li>
                <li>
                  <a
                    href="https://wa.me/51XXXXXXXXX"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex min-h-[44px] items-center rounded-lg px-3 font-semibold text-slate-900 hover:bg-slate-100 transition"
                  >
                    WhatsApp Support
                  </a>
                </li>
              </ul>
            </div>
          </nav>

          {/* Footer CTAs */}
          <div className="sticky bottom-0 border-t border-slate-200 bg-white p-4 space-y-2">
            <Link
              href="/collections/suplex"
              className="flex h-12 w-full items-center justify-center rounded-lg bg-slate-900 font-semibold text-white hover:bg-slate-800 transition"
            >
              Shop Suplex
            </Link>
            <Link
              href="/collections"
              className="flex h-12 w-full items-center justify-center rounded-lg border border-slate-300 font-semibold text-slate-900 hover:bg-slate-50 transition"
            >
              View all
            </Link>
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}
