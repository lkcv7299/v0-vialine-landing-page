"use client"

import * as React from "react"
import { Drawer as DrawerPrimitive } from "vaul"

interface DrawerProps {
  open: boolean
  onClose: () => void
  side?: "left" | "right"
  children: React.ReactNode
  title?: string // ✅ Agregamos prop opcional para el título
}

export default function Drawer({ 
  open, 
  onClose, 
  side = "right", 
  children,
  title = "Menu" // ✅ Título por defecto
}: DrawerProps) {
  return (
    <DrawerPrimitive.Root 
      open={open} 
      onOpenChange={(isOpen) => !isOpen && onClose()} 
      direction={side}
    >
      <DrawerPrimitive.Portal>
        <DrawerPrimitive.Overlay className="fixed inset-0 bg-black/40 z-40" />
        <DrawerPrimitive.Content
          className={`fixed z-50 bg-white h-full w-[85vw] max-w-sm flex flex-col ${
            side === "left" ? "left-0" : "right-0"
          } inset-y-0`}
        >
          {/* ✅ TÍTULO OBLIGATORIO para accesibilidad */}
          <DrawerPrimitive.Title className="sr-only">
            {title}
          </DrawerPrimitive.Title>
          
          {/* ✅ DESCRIPCIÓN opcional pero recomendada */}
          <DrawerPrimitive.Description className="sr-only">
            Menú de navegación
          </DrawerPrimitive.Description>

          {children}
        </DrawerPrimitive.Content>
      </DrawerPrimitive.Portal>
    </DrawerPrimitive.Root>
  )
}