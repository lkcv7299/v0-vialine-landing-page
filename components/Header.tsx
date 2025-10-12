"use client"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [openSearch, setOpenSearch] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 2)
    onScroll()
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const submit = (formData: FormData) => {
    const q = String(formData.get("q") || "").trim()
    if (!q) return
    setOpenSearch(false)
    router.push(`/buscar?q=${encodeURIComponent(q)}`)
  }

  return (
    <>
      <header className={`sticky top-0 z-40 bg-white ${scrolled ? "border-b border-neutral-200" : ""}`}>
        <div className="mx-auto max-w-7xl px-4 md:px-6 h-14 flex items-center justify-between gap-3">
          <Link href="/" className="font-heading text-xl">
            Vialine
          </Link>

          {/* Nav (desktop) */}
          <nav className="hidden md:flex items-center gap-6 text-[15px]">
            <Link href="/mujer" className="hover:text-rose-700">
              Mujer
            </Link>
            <Link href="/nina" className="hover:text-rose-700">
              Niña
            </Link>
            <Link href="/tejidos" className="hover:text-rose-700">
              Tejidos
            </Link>
            <Link href="/colecciones" className="hover:text-rose-700">
              Colecciones
            </Link>
          </nav>

          {/* Search desktop */}
          <form action={submit} className="hidden md:block w-[320px]">
            <div className="relative">
              <input
                name="q"
                placeholder="Buscar productos"
                className="w-full rounded-full border border-neutral-300 bg-neutral-50 px-10 py-2 text-[15px] focus:outline-none focus:ring-2 focus:ring-rose-400"
              />
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                stroke="currentColor"
                fill="none"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </div>
          </form>

          {/* Icons (mobile + desktop) */}
          <div className="flex items-center gap-4">
            {/* Search mobile icon */}
            <button onClick={() => setOpenSearch(true)} className="md:hidden">
              <svg width="22" height="22" viewBox="0 0 24 24" stroke="currentColor" fill="none">
                <circle cx="11" cy="11" r="7" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </button>
            {/* Account */}
            <button aria-label="Cuenta">
              <svg width="22" height="22" viewBox="0 0 24 24" stroke="currentColor" fill="none">
                <circle cx="12" cy="7" r="4" />
                <path d="M6 21c0-3.3 2.7-6 6-6s6 2.7 6 6" />
              </svg>
            </button>
            {/* Bag */}
            <button aria-label="Bolsa">
              <svg width="22" height="22" viewBox="0 0 24 24" stroke="currentColor" fill="none">
                <path d="M6 7h12l-1 13H7L6 7Z" />
                <path d="M9 7V5a3 3 0 0 1 6 0v2" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Search overlay mobile */}
      {openSearch && (
        <div className="fixed inset-0 z-50 bg-white/95 backdrop-blur">
          <div className="mx-auto max-w-7xl px-4 md:px-6">
            <form action={submit} className="flex items-center gap-2 pt-4">
              <div className="relative flex-1">
                <input
                  autoFocus
                  name="q"
                  placeholder="Buscar productos"
                  className="w-full rounded-full border border-neutral-300 bg-neutral-50 px-10 py-3 text-[16px] focus:outline-none focus:ring-2 focus:ring-rose-400"
                />
                <svg
                  className="absolute left-3 top-1/2 -translate-y-1/2"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  fill="none"
                >
                  <circle cx="11" cy="11" r="7" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
              </div>
              <button type="button" onClick={() => setOpenSearch(false)} className="text-[15px] underline">
                Cancelar
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
