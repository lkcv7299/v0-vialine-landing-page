"use client"

import { createContext, useContext, useEffect, useState, useMemo } from "react"
import type React from "react"

type NewsletterContextType = {
  isSubscribed: boolean
  showPopup: boolean
  setShowPopup: (show: boolean) => void
  markAsSubscribed: () => void
  dismissPopup: () => void
}

const NewsletterContext = createContext<NewsletterContextType | null>(null)

export function NewsletterProvider({ children }: { children: React.ReactNode }) {
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [showPopup, setShowPopup] = useState(false)
  const [hasInitialized, setHasInitialized] = useState(false)

  // Verificar estado en localStorage al cargar
  useEffect(() => {
    if (typeof window === "undefined") return

    try {
      // Verificar si ya está suscrito
      const subscribed = localStorage.getItem("newsletter-subscribed")
      if (subscribed === "true") {
        setIsSubscribed(true)
        setHasInitialized(true)
        return
      }

      // Verificar si fue cerrado recientemente
      const dismissed = localStorage.getItem("newsletter-dismissed")
      if (dismissed) {
        const dismissedDate = new Date(dismissed)
        const daysSince = (Date.now() - dismissedDate.getTime()) / (1000 * 60 * 60 * 24)
        if (daysSince < 7) {
          // No mostrar si cerró hace menos de 7 días
          setHasInitialized(true)
          return
        }
      }

      // Verificar cuántas veces se mostró
      const shownCount = parseInt(localStorage.getItem("newsletter-shown-count") || "0")
      if (shownCount >= 3) {
        // No mostrar más de 3 veces
        setHasInitialized(true)
        return
      }

      // Todo ok, podemos mostrar el popup
      setHasInitialized(true)
      initPopupTriggers()
    } catch (error) {
      console.error("Error loading newsletter state:", error)
      setHasInitialized(true)
    }
  }, [])

  // Inicializar triggers del popup
  const initPopupTriggers = () => {
    let hasShown = false
    let scrollThreshold = false
    let timeThreshold = false

    // Timer: 30 segundos
    const timer = setTimeout(() => {
      timeThreshold = true
      if (scrollThreshold && !hasShown) {
        showPopupNow()
        hasShown = true
      }
    }, 30000) // 30 segundos

    // Scroll: 50%
    const handleScroll = () => {
      const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
      if (scrollPercent >= 50) {
        scrollThreshold = true
        if (timeThreshold && !hasShown) {
          showPopupNow()
          hasShown = true
        }
      }
    }

    // Exit intent (solo desktop)
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !hasShown) {
        showPopupNow()
        hasShown = true
      }
    }

    const showPopupNow = () => {
      setShowPopup(true)
      // Incrementar contador
      const count = parseInt(localStorage.getItem("newsletter-shown-count") || "0")
      localStorage.setItem("newsletter-shown-count", String(count + 1))
      // Limpiar listeners
      window.removeEventListener("scroll", handleScroll)
      document.removeEventListener("mouseleave", handleMouseLeave)
      clearTimeout(timer)
    }

    // Agregar listeners
    window.addEventListener("scroll", handleScroll)
    document.addEventListener("mouseleave", handleMouseLeave)

    // Cleanup
    return () => {
      window.removeEventListener("scroll", handleScroll)
      document.removeEventListener("mouseleave", handleMouseLeave)
      clearTimeout(timer)
    }
  }

  // Marcar como suscrito
  const markAsSubscribed = () => {
    setIsSubscribed(true)
    setShowPopup(false)
    localStorage.setItem("newsletter-subscribed", "true")
  }

  // Cerrar popup sin suscribirse
  const dismissPopup = () => {
    setShowPopup(false)
    localStorage.setItem("newsletter-dismissed", new Date().toISOString())
  }

  const value = useMemo(
    () => ({
      isSubscribed,
      showPopup,
      setShowPopup,
      markAsSubscribed,
      dismissPopup,
    }),
    [isSubscribed, showPopup]
  )

  // No renderizar hasta que se inicialice
  if (!hasInitialized) return <>{children}</>

  return <NewsletterContext.Provider value={value}>{children}</NewsletterContext.Provider>
}

export function useNewsletter() {
  const context = useContext(NewsletterContext)
  if (!context) {
    throw new Error("useNewsletter must be used inside NewsletterProvider")
  }
  return context
}
