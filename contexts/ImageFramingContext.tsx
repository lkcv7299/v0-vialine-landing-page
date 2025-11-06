'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface ImageTransform {
  x: number
  y: number
  scale: number
  context?: 'card' | 'rail' | 'gallery' // Dónde se creó el transform
  containerWidth?: number // ✅ NUEVO: Tamaño del contenedor cuando se ajustó
}

interface SelectedImage {
  productSlug: string
  colorSlug: string
  imageIndex: number
  imagePath: string
  context: 'card' | 'rail' | 'gallery' // En qué contexto estamos
  containerWidth?: number // ✅ NUEVO: Tamaño del contenedor actual
}

interface ImageFramingContextType {
  isFramingMode: boolean
  setIsFramingMode: (value: boolean) => void
  selectedImage: SelectedImage | null
  setSelectedImage: (value: SelectedImage | null) => void
  currentTransform: ImageTransform
  setCurrentTransform: (value: ImageTransform) => void
  saveTransform: () => void
}

const ImageFramingContext = createContext<ImageFramingContextType | undefined>(undefined)

export function ImageFramingProvider({ children }: { children: ReactNode }) {
  const [isFramingMode, setIsFramingMode] = useState(false)
  const [selectedImage, setSelectedImage] = useState<SelectedImage | null>(null)
  const [currentTransform, setCurrentTransform] = useState<ImageTransform>({ x: 0, y: 0, scale: 1 })
  const [transforms, setTransforms] = useState<any>({})

  // Cargar transforms desde localStorage
  useEffect(() => {
    if (typeof window === 'undefined') return

    const saved = localStorage.getItem('imageTransforms')
    if (saved) {
      try {
        setTransforms(JSON.parse(saved))
      } catch (e) {
        console.error('Error loading transforms:', e)
      }
    }
  }, [])

  // Cuando se selecciona una imagen, cargar su transform SOLO si el contexto coincide
  useEffect(() => {
    if (!selectedImage) {
      setCurrentTransform({ x: 0, y: 0, scale: 1 })
      return
    }

    const saved = transforms[selectedImage.productSlug]?.[selectedImage.colorSlug]?.[selectedImage.imageIndex]?.[selectedImage.context]
    if (saved) {
      // Cargar transform para este contexto específico
      setCurrentTransform(saved)
    } else {
      // No hay transform para este contexto, empezar desde cero
      setCurrentTransform({ x: 0, y: 0, scale: 1 })
    }
  }, [selectedImage, transforms])

  // Guardar transform CON contexto (estructura anidada por contexto)
  const saveTransform = () => {
    if (!selectedImage) return

    const transformWithContext = {
      ...currentTransform,
      context: selectedImage.context,
      containerWidth: selectedImage.containerWidth // ✅ NUEVO: Guardar tamaño del contenedor
    }

    const updated = {
      ...transforms,
      [selectedImage.productSlug]: {
        ...transforms[selectedImage.productSlug],
        [selectedImage.colorSlug]: {
          ...transforms[selectedImage.productSlug]?.[selectedImage.colorSlug],
          [selectedImage.imageIndex]: {
            ...transforms[selectedImage.productSlug]?.[selectedImage.colorSlug]?.[selectedImage.imageIndex],
            [selectedImage.context]: transformWithContext
          }
        }
      }
    }

    setTransforms(updated)
    localStorage.setItem('imageTransforms', JSON.stringify(updated))

    // Emitir evento para actualizar todas las imágenes
    window.dispatchEvent(new CustomEvent('imageTransformsUpdated'))
  }

  // Auto-guardar cuando cambia el transform (con debounce para evitar conflictos)
  useEffect(() => {
    if (!selectedImage) return

    const timeoutId = setTimeout(() => {
      saveTransform()
    }, 300) // Esperar 300ms después del último cambio

    return () => clearTimeout(timeoutId)
  }, [currentTransform, selectedImage])

  // Keyboard shortcut: Ctrl+Shift+F para activar/desactivar modo framing
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'F') {
        e.preventDefault()
        setIsFramingMode(prev => !prev)
      }
      // ESC para salir del modo
      if (e.key === 'Escape' && isFramingMode) {
        setIsFramingMode(false)
        setSelectedImage(null)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isFramingMode])

  return (
    <ImageFramingContext.Provider
      value={{
        isFramingMode,
        setIsFramingMode,
        selectedImage,
        setSelectedImage,
        currentTransform,
        setCurrentTransform,
        saveTransform,
      }}
    >
      {children}
    </ImageFramingContext.Provider>
  )
}

export function useImageFraming() {
  const context = useContext(ImageFramingContext)
  if (context === undefined) {
    throw new Error('useImageFraming must be used within ImageFramingProvider')
  }
  return context
}
