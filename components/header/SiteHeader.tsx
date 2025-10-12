"use client"

import type React from "react"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import MegaMenu from "./MegaMenu"
import MobileNav from "./MobileNav"
import { MEGA_MENU } from "./nav-data"

export default function SiteHeader() {
  const [q, setQ] = useState("")
  const router = useRouter()

  function submit(e?: React.FormEvent) {
    e?.preventDefault()
    if (!q.trim()) return
    router.push(`/search?q=${encodeURIComponent(q)}`)
  }

  return (
    <header className="sticky top-0 z-20 w-full bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
        {/* Mobile: hamburger */}
        <div className="lg:hidden">
          <MobileNav />
        </div>

        {/* Logo */}
        <Link href="/" className="font-semibold tracking-wide">
          Vialine
        </Link>

        {/* Search (desktop) */}
        <form onSubmit={submit} className="hidden flex-1 items-center lg:flex">
          <div className="relative mx-auto w-full max-w-xl">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400">🔍</span>
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Buscar productos"
              className="w-full rounded-full border bg-white pl-9 pr-4 py-2 text-sm outline-none ring-0 placeholder:text-neutral-400"
            />
          </div>
        </form>

        {/* Right icons */}
        <div className="flex items-center gap-3">
          <Link href="/account" aria-label="Cuenta" className="hidden lg:block">
            <span className="text-xl">👤</span>
          </Link>
          <Link href="/cart" aria-label="Bolsa">
            <span className="text-xl">🛍️</span>
          </Link>
        </div>
      </div>

      <div className="mx-auto hidden h-11 max-w-7xl items-center gap-4 px-4 lg:flex">
        {MEGA_MENU.map((item) => (
          <MegaMenu key={item.key} label={item.label} cols={item.columns} />
        ))}
      </div>
    </header>
  )
}
