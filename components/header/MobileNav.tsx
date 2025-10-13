"use client"

import type React from "react"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { MEGA_MENU } from "./nav-data"

export default function MobileNav() {
  const [open, setOpen] = useState(false)
  const [q, setQ] = useState("")
  const router = useRouter()
  const path = usePathname()
  const first = useRef(true)

  useEffect(() => {
    if (first.current) {
      first.current = false
      return
    }
    // close on route change
    setOpen(false)
  }, [path])

  function submit(e?: React.FormEvent) {
    e?.preventDefault()
    if (!q.trim()) return
    router.push(`/search?q=${encodeURIComponent(q)}`)
  }

  return (
    <>
      <button aria-label="Open menu" className="rounded-md border px-3 py-2 text-sm" onClick={() => setOpen(true)}>
        ☰
      </button>

      {open && (
        <div className="fixed inset-0 z-40 bg-black/60">
          <div className="fixed inset-y-0 left-0 z-50 w-full max-w-md overflow-y-auto bg-white">
            <div className="flex items-center justify-between px-4 py-3">
              <span className="font-semibold">Menú</span>
              <button aria-label="Close" onClick={() => setOpen(false)} className="rounded-md p-2 text-lg">
                ✕
              </button>
            </div>

            {/* Search */}
            <form onSubmit={submit} className="px-4 pb-3">
              <div className="relative">
                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400">
                  🔍
                </span>
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Buscar productos"
                  className="w-full rounded-xl border pl-9 pr-4 py-2 text-sm"
                />
              </div>
            </form>

            {/* Tabs Mujer/Niña */}
            <div className="flex gap-6 border-b px-4 pb-2 text-sm font-medium">
              {MEGA_MENU.map((m) => (
                <a key={m.key} className="text-neutral-800">
                  {m.label}
                </a>
              ))}
            </div>

            {/* Accordeones por columnas (simple) */}
            <div className="divide-y">
              {MEGA_MENU.map((m) => (
                <div key={m.key} className="px-2 py-1">
                  {m.columns.map((col) => (
                    <details key={col.title} className="group">
                      <summary className="cursor-pointer select-none list-none px-2 py-3 text-sm font-semibold">
                        {col.title}
                      </summary>
                      <ul className="space-y-1 px-4 pb-3">
                        {col.items.map((it) => (
                          <li key={it.href}>
                            <Link href={it.href} className="block rounded-md px-2 py-2 text-sm hover:bg-neutral-100">
                              {it.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </details>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
