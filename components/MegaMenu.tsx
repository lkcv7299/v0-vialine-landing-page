"use client"
import { useState } from "react"
import Link from "next/link"
import { NAV } from "@/data/nav"

type Props = { label: "Mujer" | "Niña" }

export default function MegaMenu({ label }: Props) {
  const [open, setOpen] = useState(false)
  const section = label.toLowerCase() as "mujer" | "nina"
  const data = NAV[section]

  if (!data || !data.cols) {
    return null
  }

  return (
    <div className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <Link href={`/${section}`} className="text-sm font-medium text-gray-700 hover:text-black">
        {label}
      </Link>

      <div
        className={`absolute left-0 top-[calc(100%+16px)] z-50 w-[min(100vw,1100px)] rounded-2xl bg-white shadow-xl ring-1 ring-black/5 transition-opacity ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="grid grid-cols-3 gap-10 p-8 min-w-[720px]">
          <div>
            <p className="text-xs font-semibold text-neutral-500 mb-3">{data.cols[0].title.toUpperCase()}</p>
            <ul className="space-y-2">
              {data.cols[0].links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-[15px] hover:underline">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {data.cols[1] && (
            <div>
              <p className="text-xs font-semibold text-neutral-500 mb-3">{data.cols[1].title.toUpperCase()}</p>
              <ul className="space-y-2">
                {data.cols[1].links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-[15px] hover:underline">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div>
            <Link
              href={data.verTodo.href}
              className="inline-flex h-10 items-center rounded-full bg-black px-6 text-sm font-medium text-white hover:opacity-90"
            >
              {data.verTodo.label} →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
