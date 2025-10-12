"use client"

import { useState, useRef } from "react"
import Link from "next/link"
import clsx from "clsx"

type Col = { title: string; items: { label: string; href: string }[] }
type Props = { label: string; cols: Col[] }

export default function MegaMenu({ label, cols }: Props) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  return (
    <div className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <button className="px-3 py-2 text-sm font-medium hover:text-rose-600 transition">{label}</button>

      <div
        className={clsx("absolute left-0 right-0 top-full pt-3", open ? "pointer-events-auto" : "pointer-events-none")}
      >
        <div
          ref={ref}
          className={clsx(
            "mx-auto max-w-7xl px-4",
            open ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1",
            "transition-all duration-200",
          )}
        >
          <div className="rounded-2xl shadow-lg ring-1 ring-black/5 bg-white p-6 md:p-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {cols.map((col, i) => (
              <div key={i}>
                <h4 className="text-xs font-semibold text-stone-500 mb-3 uppercase tracking-wide">{col.title}</h4>
                <ul className="space-y-2">
                  {col.items.map((it) => (
                    <li key={it.href}>
                      <Link href={it.href} className="text-sm text-stone-800 hover:text-rose-600">
                        {it.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
