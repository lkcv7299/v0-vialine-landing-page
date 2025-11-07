"use client"
import Link from "next/link"
import { useState, useRef } from "react"
import { WOMEN_MENU, GIRL_MENU, getCollectionsMenu, getFabricsMenu } from "@/data/menu"

type MenuDef = typeof WOMEN_MENU

function Panel({ def }: { def: MenuDef }) {
  const collections = getCollectionsMenu()
  const fabrics = getFabricsMenu()

  return (
    <div className="mega-z mega-animate absolute left-0 top-full w-[min(1200px,95vw)] rounded-2xl bg-white/95 backdrop-blur shadow-xl p-6 md:p-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div>
          <h4 className="text-xs font-semibold text-neutral-500 mb-3">ROPA</h4>
          <ul className="space-y-2">
            {def.clothing.map((it) => (
              <li key={it.label}>
                <Link className="hover:underline text-sm" href={it.href}>
                  {it.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-semibold text-neutral-500 mb-3">POR COLECCIÓN</h4>
          <ul className="space-y-2">
            {collections.slice(0, 6).map((it) => (
              <li key={it.label}>
                <Link className="hover:underline text-sm flex items-center justify-between" href={it.href}>
                  <span>{it.label}</span>
                  <span className="text-xs text-neutral-400">({it.count})</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-semibold text-neutral-500 mb-3">POR TEJIDO</h4>
          <ul className="space-y-2">
            {fabrics.map((it) => (
              <li key={it.label}>
                <Link className="hover:underline text-sm flex items-center justify-between" href={it.href}>
                  <span>{it.label}</span>
                  <span className="text-xs text-neutral-400">({it.count})</span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-6">
            <h4 className="text-xs font-semibold text-neutral-500 mb-3">DESTACADOS</h4>
            <ul className="space-y-2">
              {def.featured.map((it) => (
                <li key={it.label}>
                  <Link className="hover:underline text-sm" href={it.href}>
                    {it.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex items-start justify-end">
          <Link
            href={def.rootHref}
            className="inline-flex items-center rounded-full bg-neutral-900 px-4 py-2 text-white text-sm font-medium hover:bg-neutral-800 transition-colors"
          >
            Ver todo →
          </Link>
        </div>
      </div>
    </div>
  )
}

export default function MegaMenu() {
  const [open, setOpen] = useState<"w" | "g" | null>(null)
  const wrapRef = useRef<HTMLDivElement>(null)

  return (
    <div ref={wrapRef} className="relative" onMouseLeave={() => setOpen(null)}>
      <nav className="flex items-center gap-6">
        <Link
          href="/mujer"
          className={`font-medium hover:text-neutral-600 transition ${open === "w" ? "text-neutral-900" : ""}`}
          onMouseEnter={() => setOpen("w")}
        >
          Mujer
        </Link>
        <Link
          href="/nina"
          className={`font-medium hover:text-neutral-600 transition ${open === "g" ? "text-neutral-900" : ""}`}
          onMouseEnter={() => setOpen("g")}
        >
          Niña
        </Link>
      </nav>

      <div className={`${open ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"} mega-animate`}>
        {open === "w" && <Panel def={WOMEN_MENU} />}
        {open === "g" && <Panel def={GIRL_MENU} />}
      </div>
    </div>
  )
}
