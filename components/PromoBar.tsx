"use client"

import { X } from "lucide-react"
import { useState, useEffect } from "react"

export default function PromoBar() {
  const [isVisible, setIsVisible] = useState(true)

  // Verificar si el usuario ya cerró el banner
  useEffect(() => {
    const dismissed = localStorage.getItem("promo-bar-dismissed")
    if (dismissed === "true") {
      setIsVisible(false)
    }
  }, [])

  const handleClose = () => {
    setIsVisible(false)
    localStorage.setItem("promo-bar-dismissed", "true")
  }

  if (!isVisible) return null

  return (
    <div className="relative bg-neutral-900 text-white py-2.5 px-4 text-center text-sm">
      <p className="max-w-7xl mx-auto">
        <strong>Envío gratis</strong> en compras mayores a S/ 269 
        <span className="mx-2">•</span>
        <strong>Entrega en Lima:</strong> 24-48 horas
      </p>
      
      {/* Botón cerrar */}
      <button
        onClick={handleClose}
        className="absolute right-4 top-1/2 -translate-y-1/2 hover:bg-white/10 p-1 rounded transition"
        aria-label="Cerrar banner"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  )
}
