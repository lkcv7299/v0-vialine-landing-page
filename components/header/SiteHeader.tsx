"use client"

import Link from "next/link"
import { useState, useRef, useEffect } from "react"
import { ShoppingBag, X, User } from "lucide-react"
import MegaMenu from "./MegaMenu"
import MobileMenu from "../nav/MobileMenu"
import SearchBar from "../SearchBar"
import { useCart } from "@/contexts/CartContext"

export default function SiteHeader() {
  const [showMiniCart, setShowMiniCart] = useState(false)
  const { items, itemCount, total, removeItem } = useCart()
  const miniCartRef = useRef<HTMLDivElement>(null)

  // Cerrar mini cart al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (miniCartRef.current && !miniCartRef.current.contains(event.target as Node)) {
        setShowMiniCart(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <header className="sticky top-0 z-20 w-full bg-white/80 backdrop-blur border-b">
      <div className="w-full">
        {/* FILA PRINCIPAL */}
        <div className="flex items-center justify-between gap-4 px-4 md:px-6 py-3">
          
          {/* ========== IZQUIERDA: Logo + MegaMenu (Desktop) ========== */}
          <div className="flex items-center gap-6">
            {/* Logo */}
            <Link href="/" className="font-semibold tracking-wide text-lg whitespace-nowrap">
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

          {/* ========== DERECHA: Icons ========== */}
          <div className="flex items-center gap-2">
            
            {/* ✅ Account Icon - AHORA VISIBLE EN MOBILE Y DESKTOP */}
            <Link
              href="/account"
              className="flex items-center gap-2 p-2 rounded-lg hover:bg-neutral-100 transition"
              aria-label="Mi cuenta"
            >
              <User className="w-5 h-5 text-neutral-700" />
              {/* Texto solo visible en desktop */}
              <span className="hidden lg:inline text-sm font-medium text-neutral-700">Cuenta</span>
            </Link>

            {/* Cart Icon con Mini Cart Dropdown */}
            <div className="relative" ref={miniCartRef}>
              <button
                onClick={() => setShowMiniCart(!showMiniCart)}
                className="relative p-2 hover:bg-neutral-100 rounded-lg transition"
                aria-label={`Carrito de compras (${itemCount} items)`}
              >
                <ShoppingBag className="w-5 h-5 text-neutral-700" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 min-w-5 rounded-full bg-rose-600 px-1.5 text-[11px] font-semibold text-white flex items-center justify-center">
                    {itemCount > 9 ? "9+" : itemCount}
                  </span>
                )}
              </button>

              {/* Mini Cart Dropdown */}
              {showMiniCart && (
                <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-lg shadow-xl border border-neutral-200 z-50">
                  {items.length === 0 ? (
                    <div className="p-6 text-center">
                      <ShoppingBag className="w-12 h-12 text-neutral-300 mx-auto mb-3" />
                      <p className="text-neutral-600 mb-4">Tu carrito está vacío</p>
                      <Link
                        href="/mujer"
                        onClick={() => setShowMiniCart(false)}
                        className="inline-block px-4 py-2 bg-rose-600 text-white rounded-lg font-semibold hover:bg-rose-700 transition"
                      >
                        Explorar productos
                      </Link>
                    </div>
                  ) : (
                    <>
                      {/* Items */}
                      <div className="max-h-96 overflow-y-auto p-4 space-y-4">
                        {items.map((item) => (
                          <div key={`${item.product.slug}-${item.selectedColor}-${item.selectedSize}`} className="flex gap-3">
                            <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-neutral-100 flex-shrink-0">
                              <img
                                src={item.product.image}
                                alt={item.product.title}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="text-sm font-medium text-neutral-900 truncate">{item.product.title}</h4>
                              <p className="text-xs text-neutral-600 mt-1">
                                {item.selectedColor} · {item.selectedSize}
                              </p>
                              <div className="flex items-center justify-between mt-2">
                                <span className="text-sm font-semibold text-neutral-900">
                                  S/ {item.product.price.toFixed(2)}
                                </span>
                                <button
                                  onClick={() => removeItem(item.product.slug, item.selectedColor || "", item.selectedSize || "")}
                                  className="text-neutral-400 hover:text-rose-600 transition"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                        
                        {/* Mensaje si hay más items */}
                        {items.length > 3 && (
                          <p className="text-xs text-neutral-600 text-center pt-2 border-t">
                            +{items.length - 3} producto{items.length - 3 !== 1 ? 's' : ''} más
                          </p>
                        )}
                      </div>

                      {/* Footer con Total y CTA */}
                      <div className="px-4 py-4 bg-neutral-50 border-t">
                        <div className="flex items-center justify-between mb-3">
                          <span className="font-semibold text-neutral-900">Total</span>
                          <span className="text-xl font-bold text-neutral-900">
                            S/ {total.toFixed(2)}
                          </span>
                        </div>
                        <Link 
                          href="/carrito" 
                          onClick={() => setShowMiniCart(false)} 
                          className="block w-full bg-rose-600 text-white text-center py-2.5 rounded-lg font-semibold hover:bg-rose-700 transition"
                        >
                          Ver carrito completo
                        </Link>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Mobile Menu (Hamburguesa) - Solo visible en mobile */}
            <div className="lg:hidden">
              <MobileMenu />
            </div>
          </div>
        </div>

        {/* ========== SEGUNDA FILA: SearchBar Mobile ========== */}
        <div className="lg:hidden px-4 pb-3">
          <SearchBar />
        </div>
      </div>
    </header>
  )
}