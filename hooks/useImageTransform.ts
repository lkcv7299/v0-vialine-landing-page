import { useState, useEffect, useLayoutEffect } from 'react'

interface ImageTransform {
  x: number
  y: number
  scale: number
  context?: 'card' | 'rail' | 'gallery'
}

interface ProductTransforms {
  [productSlug: string]: {
    [colorSlug: string]: {
      [imageIndex: number]: {
        [context: string]: ImageTransform
      }
    }
  }
}

export function useImageTransform(
  productSlug: string,
  colorSlug: string,
  imageIndex: number,
  currentContext?: 'card' | 'rail' | 'gallery'
) {
  const [isMounted, setIsMounted] = useState(false)

  // ✅ Cargar transform sincrónicamente en el estado inicial para evitar flash
  const [transform, setTransform] = useState<ImageTransform | null>(() => {
    if (typeof window === 'undefined') return null

    try {
      const saved = localStorage.getItem('imageTransforms')
      if (saved && currentContext) {
        const transforms: ProductTransforms = JSON.parse(saved)
        return transforms[productSlug]?.[colorSlug]?.[imageIndex]?.[currentContext] || null
      }
    } catch (e) {
      console.error('Error loading initial transform:', e)
    }
    return null
  })

  // ✅ Marcar como montado ANTES del primer paint para evitar flash
  useLayoutEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    // Función para cargar transforms
    const loadTransforms = () => {
      if (typeof window === 'undefined') return

      try {
        const saved = localStorage.getItem('imageTransforms')
        if (saved) {
          const transforms: ProductTransforms = JSON.parse(saved)

          if (currentContext) {
            // Buscar transform específico para este contexto
            const contextTransform = transforms[productSlug]?.[colorSlug]?.[imageIndex]?.[currentContext]
            if (contextTransform) {
              setTransform(contextTransform)
            } else {
              setTransform(null)
            }
          } else {
            // Sin contexto - no aplicar ningún transform
            setTransform(null)
          }
        }
      } catch (e) {
        console.error('Error loading image transforms:', e)
      }
    }

    // Recargar si cambian los parámetros
    loadTransforms()

    // Escuchar cambios en localStorage (para updates en tiempo real)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'imageTransforms') {
        loadTransforms()
      }
    }

    // Escuchar evento personalizado para cambios en la misma pestaña
    const handleTransformUpdate = () => {
      loadTransforms()
    }

    window.addEventListener('storage', handleStorageChange)
    window.addEventListener('imageTransformsUpdated', handleTransformUpdate)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('imageTransformsUpdated', handleTransformUpdate)
    }
  }, [productSlug, colorSlug, imageIndex, currentContext])

  return { transform, isMounted }
}

export function getTransformStyle(transform: ImageTransform | null): React.CSSProperties {
  if (!transform) return {}

  return {
    transform: `translate(${transform.x}px, ${transform.y}px) scale(${transform.scale})`,
    transformOrigin: 'center center',
  }
}
