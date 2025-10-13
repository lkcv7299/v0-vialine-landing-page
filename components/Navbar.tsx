"use client"

import Link from "next/link"
import { Menu, Search, User, ShoppingBag, Heart } from "lucide-react"
import { useState } from "react"

function NavItem({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href} className="text-sm font-medium hover:text-rose-600 transition">
      {label}
    </Link>
  )
}

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b">
      <div className="mx-auto max-w-[120rem] px-4 lg:px-6">
        {/* Row */}
        <div className="flex h-14 lg:h-16 items-center gap-4">
          <button className="lg:hidden -ml-1" onClick={() => setOpen(true)} aria-label="Open menu">
            <Menu className="h-6 w-6" />
          </button>

          <Link href="/" className="font-semibold tracking-tight text-lg">
            Vialine
          </Link>

          {/* Desktop nav centered */}
          <nav className="hidden lg:flex items-center gap-6 mx-auto">
            <NavItem href="/mujer" label="Mujer" />
            <NavItem href="/nina" label="Niña" />
          </nav>

          {/* Actions (right) */}
          <div className="ml-auto flex items-center gap-3">
            {/* Desktop search */}
            <div className="hidden md:flex items-center rounded-full border px-3 py-2 gap-2">
              <Search className="h-4 w-4" />
              <input placeholder="Buscar productos" className="w-56 md:w-80 lg:w-[32rem] bg-transparent outline-none" />
            </div>

            <Link href="/account" aria-label="Cuenta">
              <User className="h-6 w-6" />
            </Link>
            <Link href="/wishlist" aria-label="Favoritos">
              <Heart className="h-6 w-6" />
            </Link>
            <Link href="/cart" aria-label="Carrito" className="relative">
              <ShoppingBag className="h-6 w-6" />
              <span
                id="cart-badge"
                className="absolute -right-2 -top-1 hidden h-4 min-w-4 rounded-full bg-rose-600 px-1 text-[10px] leading-4 text-white text-center"
              >
                0
              </span>
            </Link>
          </div>
        </div>

        {/* Mobile search */}
        <div className="pb-3 lg:hidden">
          <div className="flex items-center rounded-full border px-3 py-2 gap-2">
            <Search className="h-4 w-4" />
            <input placeholder="Buscar productos" className="w-full bg-transparent outline-none" />
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-[55] bg-black/50 lg:hidden" onClick={() => setOpen(false)}>
          <div
            className="absolute left-0 top-0 h-full w-80 bg-white shadow-lg p-6 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <Link href="/mujer" className="block text-lg" onClick={() => setOpen(false)}>
              Mujer
            </Link>
            <Link href="/nina" className="block text-lg" onClick={() => setOpen(false)}>
              Niña
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
