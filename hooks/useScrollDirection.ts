"use client"

import { useState, useEffect, useCallback } from "react"

type ScrollDirection = "up" | "down" | null

interface UseScrollDirectionOptions {
  threshold?: number // Pixels to scroll before direction change is registered
  initialDirection?: ScrollDirection
}

export function useScrollDirection(options: UseScrollDirectionOptions = {}) {
  const { threshold = 10, initialDirection = null } = options

  const [scrollDirection, setScrollDirection] = useState<ScrollDirection>(initialDirection)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [isAtTop, setIsAtTop] = useState(true)

  const updateScrollDirection = useCallback(() => {
    const scrollY = window.scrollY

    // Check if at top of page
    setIsAtTop(scrollY < 10)

    // Don't update direction if scroll difference is less than threshold
    if (Math.abs(scrollY - lastScrollY) < threshold) {
      return
    }

    const direction = scrollY > lastScrollY ? "down" : "up"

    if (direction !== scrollDirection && (scrollY - lastScrollY > threshold || scrollY - lastScrollY < -threshold)) {
      setScrollDirection(direction)
    }

    setLastScrollY(scrollY > 0 ? scrollY : 0)
  }, [lastScrollY, scrollDirection, threshold])

  useEffect(() => {
    // Set initial scroll position
    setLastScrollY(window.scrollY)
    setIsAtTop(window.scrollY < 10)

    window.addEventListener("scroll", updateScrollDirection, { passive: true })

    return () => {
      window.removeEventListener("scroll", updateScrollDirection)
    }
  }, [updateScrollDirection])

  return { scrollDirection, isAtTop }
}
