"use client"

import * as React from "react"
import { Drawer as DrawerPrimitive } from "vaul"

type DrawerProps = {
  open: boolean
  onClose: () => void
  side?: "left" | "right"
  children: React.ReactNode
}

export default function Drawer({ open, onClose, side = "left", children }: DrawerProps) {
  return (
    <DrawerPrimitive.Root open={open} onOpenChange={(isOpen) => !isOpen && onClose()} direction={side}>
      {/* Overlay */}
      <DrawerPrimitive.Overlay className="fixed inset-0 z-40 bg-black/60" />
      
      {/* Drawer Content */}
      <DrawerPrimitive.Content
        className={`fixed inset-y-0 z-50 flex h-full w-full max-w-md flex-col bg-white ${
          side === "left" ? "left-0" : "right-0"
        }`}
      >
        {children}
      </DrawerPrimitive.Content>
    </DrawerPrimitive.Root>
  )
}