"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import Drawer from "@/components/ui/Drawer"
import { Menu, X, User, ShoppingBag } from "lucide-react"

const mujer = [
  { label: "Leggings", href: "/shop/mujer/leggings" },
  { label: "Short", href: "/shop/mujer/short" },
  { label: "Pescador", href: "/shop/mujer/pescador" },
  { label: "Torero", href: "/shop/mujer/torero" },
  { label: "Bodys", href: "/shop/mujer/bodys" },
  { label: "Enterizos", href: "/shop/mujer/enterizos" },
  { label: "Tops", href: "/shop/mujer/tops" },
  { label: "Camisetas", href: "/shop/mujer/camisetas" },
]

const nina = [
  { label: "Cafarenas", href: "/shop/nina/cafarenas" },
  { label: "Enterizos", href: "/shop/nina/enterizos" },
  { label: "Leggings", href: "/shop/nina/leggings" },
  { label: "Pantys", href: "/shop/nina/pantys" },
  { label: "Shorts", href: "/shop/nina/shorts" },
  { label: "Tops", href: "/shop/nina/tops" },
]

export default function MobileMenu() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  // Close drawer on route change
  useEffect(() => {
    setOpen(false)
  }, [pathname])

  return (
    <>
      {/* Icons group (mobile only) */}
      <div className="flex items-center gap-2 lg:gap-3">
        <Link
          href="/account"
          className="inline-flex lg:inline-flex h-10 w-10 items-center justify-center rounded-full hover:bg-slate-100 text-slate-900"
          aria-label="Account"
        >
          <User size={20} />
        </Link>
        <Link
          href="/cart"
          className="inline-flex lg:inline-flex h-10 w-10 items-center justify-center rounded-full hover:bg-slate-100 text-slate-900"
          aria-label="Cart"
        >
          <ShoppingBag size={20} />
        </Link>
        <button
          aria-controls="mobile-menu"
          aria-expanded={open}
          aria-label="Open menu"
          onClick={() => setOpen(true)}
          className="inline-flex lg:hidden h-10 w-10 items-center justify-center rounded-full hover:bg-slate-100 text-slate-900"
        >
          <Menu size={24} />
        </button>
      </div>

      <Drawer open={open} onClose={() => setOpen(false)} side="left">
        <div id="mobile-menu" className="flex h-full flex-col">
          {/* Top bar */}
          <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white/95 px-4 py-3">
            <Link href="/" className="text-lg font-semibold">
              Vialine
            </Link>
            <button
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="h-10 w-10 inline-flex items-center justify-center rounded-full hover:bg-slate-100"
            >
              <X size={22} />
            </button>
          </div>

          {/* Nav */}
          <nav className="flex-1 overflow-y-auto px-4 py-3">
            <Section title="Mujer" items={mujer} />
            <div className="h-5" />
            <Section title="Niña" items={nina} />
            <div className="h-5" />
            <Section
              title="Ayuda"
              items={[
                { label: "Guía de tallas", href: "/pages/guia-de-tallas" },
                { label: "Cambios y devoluciones", href: "/pages/envios-y-devoluciones" },
                { label: "Soporte WhatsApp", href: "https://wa.me/51XXXXXXXXX", external: true },
              ]}
            />
          </nav>

          {/* Footer buttons */}
          <div className="border-t border-slate-200 p-4 space-y-3">
            <Link
              href="/shop/mujer/leggings"
              className="block w-full rounded-xl bg-rose-600 text-white text-center py-3 font-medium hover:bg-rose-700"
            >
              Comprar Suplex
            </Link>
            <Link
              href="/shop/mujer/leggings"
              className="block w-full rounded-xl bg-slate-900 text-white text-center py-3 font-medium hover:bg-slate-800"
            >
              Ver todo
            </Link>
          </div>
        </div>
      </Drawer>
    </>
  )
}

function Section({
  title,
  items,
}: {
  title: string
  items: { label: string; href: string; external?: boolean }[]
}) {
  return (
    <div>
      <div className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-2">{title}</div>
      <ul className="space-y-1">
        {items.map((it) => (
          <li key={it.label}>
            {it.external ? (
              <a
                href={it.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-lg px-2 py-2 text-[15px] font-medium text-slate-900 hover:bg-slate-100"
              >
                {it.label}
              </a>
            ) : (
              <Link
                href={it.href}
                className="block rounded-lg px-2 py-2 text-[15px] font-medium text-slate-900 hover:bg-slate-100"
              >
                {it.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
