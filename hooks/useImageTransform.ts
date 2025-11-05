import { useState, useEffect } from 'react'

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
  const [transform, setTransform] = useState<ImageTransform | null>(null)

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

    // Cargar al montar
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

  return transform
}

export function getTransformStyle(transform: ImageTransform | null): React.CSSProperties {
  if (!transform) return {}

  return {
    transform: `translate(${transform.x}px, ${transform.y}px) scale(${transform.scale})`,
    transformOrigin: 'center center',
  }
}
