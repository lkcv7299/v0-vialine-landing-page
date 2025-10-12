"use client"

import Link from "next/link"
import MegaMenu from "./MegaMenu"
import PromoBar from "./PromoBar"

export default function Header() {
  return (
    <>
      <PromoBar />
      <header className="border-b bg-white/95 backdrop-blur">
        <div className="container mx-auto px-4 md:px-6">
          <div className="h-16 flex items-center justify-between gap-4 relative">
            <div className="flex items-center gap-8">
              <Link href="/" className="text-lg font-semibold">
                Vialine
              </Link>
              <nav className="hidden md:flex items-center gap-6">
                <MegaMenu label="Mujer" />
                <MegaMenu label="Niña" />
              </nav>
            </div>

            <div className="flex-1 max-w-[720px] hidden md:block">
              <form action="/buscar" className="w-full">
                <input
                  name="q"
                  placeholder="Buscar productos"
                  className="w-full rounded-full border border-rose-200 px-4 py-2 outline-none focus:ring-2 focus:ring-rose-300"
                />
              </form>
            </div>

            <div className="flex items-center gap-4">
              <Link href="/cuenta" aria-label="Cuenta" className="p-2 rounded-md hover:bg-neutral-100">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21a8 8 0 0 0-16 0" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </Link>
              <Link href="/carrito" aria-label="Carrito" className="p-2 rounded-md hover:bg-neutral-100">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 7h12l-1 13H7L6 7Z" />
                  <path d="M9 7a3 3 0 0 1 6 0" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}
