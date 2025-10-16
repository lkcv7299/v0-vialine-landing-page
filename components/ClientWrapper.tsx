"use client"

import { useState, useEffect } from "react"
import { NewsletterProvider } from "./providers/NewsletterContext"
import NewsletterPopup from "./NewsletterPopup"

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <NewsletterProvider>
      {children}
      {mounted && <NewsletterPopup />}
    </NewsletterProvider>
  )
}
