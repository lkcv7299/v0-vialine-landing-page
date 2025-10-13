"use client"

import type React from "react"

import { useEffect, useRef } from "react"
import { createPortal } from "react-dom"
import clsx from "clsx"

type DrawerProps = {
  open: boolean
  onClose: () => void
  side?: "left" | "right"
  children: React.ReactNode
}

export default function Drawer({ open, onClose, side = "left", children }: DrawerProps) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  // Close on ESC
  useEffect(() => {
    if (!open) return
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose()
    }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [open, onClose])

  // Prevent body scroll
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  if (typeof document === "undefined") return null
  return createPortal(
    <div
      aria-hidden={!open}
      className={clsx("fixed inset-0 z-[60] transition", open ? "pointer-events-auto" : "pointer-events-none")}
    >
      {/* overlay */}
      <div
        ref={overlayRef}
        aria-hidden
        onClick={onClose}
        className={clsx(
          "absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity",
          open ? "opacity-100" : "opacity-0",
        )}
      />
      {/* panel */}
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        className={clsx(
          "absolute top-0 h-full w-[84vw] max-w-[420px] bg-white shadow-xl transition-transform",
          side === "left" ? "left-0" : "right-0",
          open ? "translate-x-0" : side === "left" ? "-translate-x-full" : "translate-x-full",
        )}
      >
        {children}
      </div>
    </div>,
    document.body,
  )
}
