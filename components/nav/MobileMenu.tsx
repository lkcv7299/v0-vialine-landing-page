"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import Drawer from "@/components/ui/Drawer"
import { Menu, X, User, ShoppingBag, Heart } from "lucide-react"
import { buildWhatsAppUrl } from "@/lib/contact"
import { useCart } from "@/contexts/CartContext"
import { useWishlist } from "@/components/providers/WishlistContext"

// Categorías actualizadas con rutas correctas
const mujer = [
  { label: "Leggings", href: "/mujer?category=leggings" },
  { label: "Shorts", href: "/mujer?category=short" },
  { label: "Pescadores", href: "/mujer?category=pescador" },
  { label: "Toreros", href: "/mujer?category=torero" },
  { label: "Bodys", href: "/mujer?category=bodys" },
  { label: "Enterizos", href: "/mujer?category=enterizos" },
  { label: "Tops", href: "/mujer?category=tops" },
  { label: "Camisetas", href: "/mujer?category=camisetas" },
]

const nina = [
  { label: "Cafarenas", href: "/nina?category=cafarenas" },
  { label: "Enterizos", href: "/nina?category=enterizos" },
  { label: "Leggings", href: "/nina?category=leggings" },
  { label: "Pantys", href: "/nina?category=pantys" },
  { label: "Shorts", href: "/nina?category=shorts" },
  { label: "Tops", href: "/nina?category=tops" },
]

export default function MobileMenu() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const { itemCount } = useCart()
  const { items: wishlistItems } = useWishlist()
  const wishlistCount = wishlistItems.length

  // Cerrar menú cuando cambia la ruta
  useEffect(() => {
    setOpen(false)
  }, [pathname])

  return (
    <>
      {/* Botón hamburguesa */}
      <button
        aria-controls="mobile-menu"
        aria-expanded={open}
        aria-label="Abrir menú"
        onClick={() => setOpen(true)}
        className="inline-flex lg:hidden h-10 w-10 items-center justify-center rounded-full hover:bg-neutral-100 text-neutral-900 transition"
      >
        <Menu size={24} />
      </button>

      {/* Drawer con menú */}
      <Drawer open={open} onClose={() => setOpen(false)} side="left">
        <div id="mobile-menu" className="flex h-full flex-col">
          
          {/* Header del menú */}
          <div className="sticky top-0 z-10 flex items-center justify-between border-b border-neutral-200 bg-white px-4 py-4">
            <Link 
              href="/" 
              className="text-xl font-bold tracking-tight"
              onClick={() => setOpen(false)}
            >
              Vialine
            </Link>
            <button
              aria-label="Cerrar menú"
              onClick={() => setOpen(false)}
              className="h-10 w-10 inline-flex items-center justify-center rounded-full hover:bg-neutral-100 transition"
            >
              <X size={22} />
            </button>
          </div>

          {/* Links rápidos - Account, Wishlist, Cart */}
          <div className="border-b border-neutral-200 px-4 py-3">
            <div className="grid grid-cols-3 gap-2">
              <Link
                href="/account"
                onClick={() => setOpen(false)}
                className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-neutral-50 transition"
              >
                <User size={20} className="text-neutral-600" />
                <span className="text-xs font-medium text-neutral-700">Cuenta</span>
              </Link>
              
              <Link
                href="/wishlist"
                onClick={() => setOpen(false)}
                className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-neutral-50 transition relative"
              >
                <Heart 
                  size={20} 
                  className={wishlistCount > 0 ? "text-rose-600 fill-rose-600" : "text-neutral-600"} 
                />
                <span className="text-xs font-medium text-neutral-700">Favoritos</span>
                {wishlistCount > 0 && (
                  <span className="absolute top-2 right-2 h-4 min-w-4 rounded-full bg-rose-600 px-1 text-[10px] font-medium text-white flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              <Link
                href="/carrito"
                onClick={() => setOpen(false)}
                className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-neutral-50 transition relative"
              >
                <ShoppingBag size={20} className="text-neutral-600" />
                <span className="text-xs font-medium text-neutral-700">Carrito</span>
                {itemCount > 0 && (
                  <span className="absolute top-2 right-2 h-4 min-w-4 rounded-full bg-rose-600 px-1 text-[10px] font-medium text-white flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </Link>
            </div>
          </div>

          {/* Navegación principal */}
          <nav className="flex-1 overflow-y-auto px-4 py-4">
            <Section title="Mujer" items={mujer} onItemClick={() => setOpen(false)} />
            
            <div className="h-6" />
            
            <Section title="Niña" items={nina} onItemClick={() => setOpen(false)} />
            
            <div className="h-6" />
            
            <Section
              title="Ayuda y Soporte"
              items={[
                { label: "Guía de tallas", href: "/pages/guia-de-tallas" },
                { label: "Envíos y devoluciones", href: "/pages/envios-y-devoluciones" },
                { label: "Términos y condiciones", href: "/pages/terminos-y-condiciones" },
                { label: "Contacto por WhatsApp", href: buildWhatsAppUrl("Hola Vialine, necesito ayuda"), external: true },
              ]}
              onItemClick={() => setOpen(false)}
            />
          </nav>

          {/* Footer con botones CTA */}
          <div className="border-t border-neutral-200 p-4 space-y-3 bg-neutral-50">
            <Link
              href="/mujer"
              onClick={() => setOpen(false)}
              className="block w-full rounded-xl bg-rose-600 text-white text-center py-3.5 font-semibold hover:bg-rose-700 transition"
            >
              Ver Colección Mujer
            </Link>
            <Link
              href="/nina"
              onClick={() => setOpen(false)}
              className="block w-full rounded-xl border-2 border-neutral-900 text-neutral-900 text-center py-3.5 font-semibold hover:bg-neutral-900 hover:text-white transition"
            >
              Ver Colección Niña
            </Link>
          </div>
        </div>
      </Drawer>
    </>
  )
}

// Componente de sección reutilizable
function Section({
  title,
  items,
  onItemClick,
}: {
  title: string
  items: { label: string; href: string; external?: boolean }[]
  onItemClick: () => void
}) {
  return (
    <div>
      <div className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-3 px-2">
        {title}
      </div>
      <ul className="space-y-0.5">
        {items.map((item) => (
          <li key={item.label}>
            {item.external ? (
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={onItemClick}
                className="block rounded-lg px-3 py-2.5 text-[15px] font-medium text-neutral-900 hover:bg-neutral-100 transition"
              >
                {item.label}
              </a>
            ) : (
              <Link
                href={item.href}
                onClick={onItemClick}
                className="block rounded-lg px-3 py-2.5 text-[15px] font-medium text-neutral-900 hover:bg-neutral-100 transition"
              >
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}