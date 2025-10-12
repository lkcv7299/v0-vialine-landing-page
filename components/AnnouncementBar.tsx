"use client"
import { X } from "lucide-react"
import { useEffect, useState } from "react"

export default function AnnouncementBar({
  message = "Despacho gratis por compras desde S/ 269 | Cambios y devoluciones fáciles",
}: { message?: string }) {
  const [open, setOpen] = useState(true)
  useEffect(() => {
    if (typeof window === "undefined") return
    const v = localStorage.getItem("ab.dismissed")
    if (v === "1") setOpen(false)
  }, [])
  if (!open) return null

  return (
    <div className="sticky top-0 z-[60] w-full bg-neutral-900 text-white">
      <div className="mx-auto max-w-[120rem] px-3 py-2 text-center text-xs sm:text-sm flex items-center justify-center gap-2">
        <span>{message}</span>
        <button
          aria-label="Close announcement"
          onClick={() => {
            localStorage.setItem("ab.dismissed", "1")
            setOpen(false)
          }}
          className="inline-flex"
        >
          <X className="h-4 w-4 opacity-80" />
        </button>
      </div>
    </div>
  )
}
