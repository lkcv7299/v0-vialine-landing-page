"use client"
import { useState, useRef, useEffect } from "react"

export default function NavDropdown({
  label,
  items, // [{label, href}]
}: { label: string; items: { label: string; href: string }[] }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!ref.current?.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener("click", onDocClick)
    return () => document.removeEventListener("click", onDocClick)
  }, [])

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="px-3 py-2 rounded-lg hover:bg-neutral-100"
      >
        {label}
      </button>
      {open && (
        <div
          className="absolute left-0 mt-2 w-48 rounded-2xl border border-neutral-200 bg-white shadow-lg p-2 z-50"
          onMouseLeave={() => setOpen(false)}
        >
          {items.map((it) => (
            <a key={it.href} href={it.href} className="block rounded-xl px-3 py-2 hover:bg-neutral-100">
              {it.label}
            </a>
          ))}
        </div>
      )}
    </div>
  )
}
