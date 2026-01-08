"use client"

import Link from "next/link"
import { useState, useRef, useEffect } from "react"
import { ShoppingBag, User, LogOut, Package, MapPin, Settings, Heart } from "lucide-react"
import { useSession, signOut } from "next-auth/react"
import { usePathname } from "next/navigation"
import MegaMenu from "./MegaMenu"
import MobileMenu from "../nav/MobileMenu"
import SearchBar from "../SearchBar"
import CartDrawer from "../CartDrawer"
import { useCart } from "@/contexts/CartContext"
import { useScrollDirection } from "@/hooks/useScrollDirection"

export default function SiteHeader() {
  const [showCartDrawer, setShowCartDrawer] = useState(false)
  const [showAccountMenu, setShowAccountMenu] = useState(false)
  const { data: session } = useSession()
  const { itemCount } = useCart()
  const accountMenuRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()

  // Hook para detectar direccion del scroll
  const { scrollDirection, isAtTop } = useScrollDirection({ threshold: 15 })

  // En mobile: ocultar cuando scroll down, mostrar cuando scroll up o esta arriba
  const shouldHideHeader = scrollDirection === "down" && !isAtTop

  // Paginas donde mostrar la barra de busqueda (tienda, categorias, productos, PDP)
  const shopRoutes = ["/mujer", "/nina", "/productos", "/producto", "/buscar", "/catalogo"]
  const isShopPage = pathname === "/" || shopRoutes.some(route => pathname.startsWith(route))

  // Cerrar account menu al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (accountMenuRef.current && !accountMenuRef.current.contains(event.target as Node)) {
        setShowAccountMenu(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <header
      className={`
        sticky top-0 z-20 w-full bg-white/95 backdrop-blur-sm border-b border-neutral-100
        transition-transform duration-300 ease-in-out
        ${shouldHideHeader ? "lg:translate-y-0 -translate-y-full" : "translate-y-0"}
      `}
    >
      <div className="w-full">
        {/* FILA PRINCIPAL - Mas compacta en mobile */}
        <div className="flex items-center justify-between gap-3 px-3 lg:px-6 py-2 lg:py-3">

          {/* ========== IZQUIERDA: Logo + MegaMenu (Desktop) ========== */}
          <div className="flex items-center gap-6">
            {/* Logo - Mas pequeno en mobile */}
            <Link href="/" className="font-semibold tracking-wide text-base lg:text-lg whitespace-nowrap">
              Vialine
            </Link>

            {/* MegaMenu - Solo visible en desktop */}
            <div className="hidden lg:block">
              <MegaMenu />
            </div>
          </div>

          {/* ========== CENTRO: SearchBar con Autocompletado (Desktop only) ========== */}
          <div className="hidden lg:block flex-1 max-w-md">
            <SearchBar />
          </div>

          {/* ========== DERECHA: Icons - Mas compactos en mobile ========== */}
          <div className="flex items-center gap-1 lg:gap-2">

            {/* Account - Link directo o Dropdown si está logueado */}
            {session?.user ? (
              <div className="relative" ref={accountMenuRef}>
                <button
                  onClick={() => setShowAccountMenu(!showAccountMenu)}
                  className="flex items-center gap-2 p-1.5 lg:p-2 rounded-lg hover:bg-neutral-100 transition"
                  aria-label="Mi cuenta"
                >
                  <User className="w-[18px] h-[18px] lg:w-5 lg:h-5 text-neutral-600" />
                  <span className="hidden lg:inline text-sm font-medium text-neutral-700">
                    {session.user.name || 'Cuenta'}
                  </span>
                </button>

                {showAccountMenu && (
                  <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-lg shadow-xl border border-neutral-200 z-50 py-2">
                    <div className="px-4 py-3 border-b border-neutral-200">
                      <p className="text-sm font-semibold text-neutral-900 truncate">
                        {session.user.name || 'Usuario'}
                      </p>
                      <p className="text-xs text-neutral-600 truncate">
                        {session.user.email}
                      </p>
                    </div>

                    <Link href="/account" onClick={() => setShowAccountMenu(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm text-neutral-700 hover:bg-neutral-50 transition">
                      <Settings className="w-4 h-4" />
                      Mi cuenta
                    </Link>

                    <Link href="/account/pedidos" onClick={() => setShowAccountMenu(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm text-neutral-700 hover:bg-neutral-50 transition">
                      <Package className="w-4 h-4" />
                      Mis pedidos
                    </Link>

                    <Link href="/account/direcciones" onClick={() => setShowAccountMenu(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm text-neutral-700 hover:bg-neutral-50 transition">
                      <MapPin className="w-4 h-4" />
                      Mis direcciones
                    </Link>

                    <Link href="/account/favoritos" onClick={() => setShowAccountMenu(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm text-neutral-700 hover:bg-neutral-50 transition">
                      <Heart className="w-4 h-4" />
                      Favoritos
                    </Link>

                    <div className="border-t border-neutral-200 mt-2 pt-2">
                      <button onClick={() => { setShowAccountMenu(false); signOut({ callbackUrl: '/' }) }} className="flex items-center gap-3 px-4 py-2.5 text-sm text-neutral-900 hover:bg-neutral-50 transition w-full">
                        <LogOut className="w-4 h-4" />
                        Cerrar sesión
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="flex items-center gap-2 p-1.5 lg:p-2 rounded-lg hover:bg-neutral-100 transition"
                aria-label="Iniciar sesión"
              >
                <User className="w-[18px] h-[18px] lg:w-5 lg:h-5 text-neutral-600" />
              </Link>
            )}

            {/* Cart Icon */}
            <button onClick={() => setShowCartDrawer(true)} className="relative p-1.5 lg:p-2 hover:bg-neutral-100 rounded-lg transition" aria-label={`Carrito de compras (${itemCount} items)`}>
              <ShoppingBag className="w-[18px] h-[18px] lg:w-5 lg:h-5 text-neutral-600" />
              {itemCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 lg:-top-1 lg:-right-1 h-4 min-w-4 lg:h-5 lg:min-w-5 rounded-full bg-rose-600 px-1 lg:px-1.5 text-[10px] lg:text-[11px] font-semibold text-white flex items-center justify-center">
                  {itemCount > 9 ? "9+" : itemCount}
                </span>
              )}
            </button>

            {/* Mobile Menu */}
            <div className="lg:hidden">
              <MobileMenu />
            </div>
          </div>
        </div>

        {/* SearchBar Mobile - Solo en paginas de tienda */}
        {isShopPage && (
          <div className="lg:hidden px-3 pb-2">
            <SearchBar />
          </div>
        )}
      </div>

      <CartDrawer open={showCartDrawer} onClose={() => setShowCartDrawer(false)} />
    </header>
  )
}
