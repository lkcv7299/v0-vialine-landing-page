"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

export default function TawkToChat() {
  const pathname = usePathname()

  useEffect(() => {
    // ⚠️ REEMPLAZAR CON TUS IDs REALES:
    const tawkToPropertyId = "68f245510524d4194f532156" // ← Pegar tu Property ID
    const tawkToWidgetId = "1j7p5thtv"     // ← Pegar tu Widget ID

    // Prevenir múltiples cargas
    if (document.querySelector('script[src*="embed.tawk.to"]')) {
      return
    }

    // Cargar script de Tawk.to
    const script = document.createElement("script")
    script.async = true
    script.src = `https://embed.tawk.to/${tawkToPropertyId}/${tawkToWidgetId}`
    script.charset = "UTF-8"
    script.setAttribute("crossorigin", "*")

    // Configuración global
    window.Tawk_API = window.Tawk_API || {}
    window.Tawk_LoadStart = new Date()

    // Callback cuando el chat carga
    window.Tawk_API.onLoad = function() {
      console.log("✅ Tawk.to chat loaded")
      
      if (typeof window !== "undefined" && window.gtag) {
        window.gtag("event", "chat_widget_loaded", {
          event_category: "engagement",
        })
      }
    }

    // Callback cuando usuario inicia chat
    window.Tawk_API.onChatStarted = function() {
      console.log("💬 Chat started")
      
      if (typeof window !== "undefined" && window.gtag) {
        window.gtag("event", "chat_started", {
          event_category: "engagement",
          event_label: pathname,
        })
      }

      if (typeof window !== "undefined" && window.fbq) {
        window.fbq("track", "Contact", {
          content_name: "Live Chat",
        })
      }
    }

    // Agregar script al DOM
    document.body.appendChild(script)

    // Cleanup mejorado - FIX del error
    return () => {
      // Método seguro: verificar parentNode antes de remover
      const existingScript = document.querySelector('script[src*="embed.tawk.to"]')
      if (existingScript?.parentNode) {
        existingScript.parentNode.removeChild(existingScript)
      }

      // Limpiar widget del DOM si existe
      const tawkWidget = document.getElementById("tawk-bubble")
      if (tawkWidget?.parentNode) {
        tawkWidget.parentNode.removeChild(tawkWidget)
      }

      // Limpiar iframe de Tawk.to si existe
      const tawkIframe = document.querySelector('iframe[title*="chat widget"]')
      if (tawkIframe?.parentNode) {
        tawkIframe.parentNode.removeChild(tawkIframe)
      }
    }
  }, [pathname])

  return null
}

// Tipos TypeScript
declare global {
  interface Window {
    Tawk_API: any
    Tawk_LoadStart: Date
  }
}