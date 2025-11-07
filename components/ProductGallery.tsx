"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, X, ZoomIn, ZoomOut, Maximize2 } from "lucide-react"
import { useImageDebug } from "@/contexts/ImageDebugContext"
import { useImageTransform } from "@/hooks/useImageTransform"
import { parseImagePath } from "@/lib/imageTransformUtils"

// ✅ PRODUCT-SPECIFIC OVERRIDES - Ajustes visuales permanentes para productos específicos
const PRODUCT_OVERRIDES: { [slug: string]: { scale: number; translateY: number; translateX: number } } = {
  "short-slim": { scale: 1.00, translateY: -20, translateX: 0 },
  "camiseta-tropical": { scale: 1.00, translateY: 3, translateX: 1 },
  "maxi-short": { scale: 1.05, translateY: 0, translateX: 0 },
  "body-manga-corta": { scale: 1.00, translateY: -1, translateX: 0 },
  "top-minerva": { scale: 1.00, translateY: -12, translateX: -1 },
  "top-soporte": { scale: 1.00, translateY: -20, translateX: 0 },
  "top-perla": { scale: 1.00, translateY: -4, translateX: 1 },
  "top-athena": { scale: 1.00, translateY: -5, translateX: 0 },
  "enterizo-manga-cero": { scale: 1.00, translateY: -33, translateX: 0 },
  "legging-harmony": { scale: 1.05, translateY: -29, translateX: 0 },
  "pescador-realce": { scale: 1.00, translateY: -20, translateX: 0 },
  "torero-energy": { scale: 1.00, translateY: 0, translateX: 0 },
}

type ProductGalleryProps = {
  images: string[]
  productName: string
  productSlug?: string
}

// ✅ Componente para thumbnail - Muestra imagen completa sin recortes
function ThumbnailImage({
  image,
  index,
  isSelected,
  productName,
  onClick,
  inModal = false
}: {
  image: string
  index: number
  isSelected: boolean
  productName: string
  onClick: () => void
  inModal?: boolean
}) {
  // Clases específicas para modal vs gallery
  const buttonClasses = inModal
    ? `relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden transition-all ${
        isSelected
          ? "ring-2 ring-white ring-offset-2 ring-offset-black"
          : "ring-1 ring-white/30 hover:ring-white/60 opacity-60 hover:opacity-100"
      }`
    : `relative aspect-[3/4] overflow-hidden rounded-lg transition-all ${
        isSelected
          ? "ring-2 ring-rose-600 ring-offset-2"
          : "ring-1 ring-neutral-200 hover:ring-neutral-400"
      }`

  return (
    <button
      onClick={onClick}
      className={buttonClasses}
    >
      <img
        src={image}
        alt={inModal ? `Miniatura ${index + 1}` : `${productName} - Vista ${index + 1}`}
        className="w-full h-full object-cover"
      />
    </button>
  )
}

export default function ProductGallery({ images, productName, productSlug = "" }: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [isZoomOpen, setIsZoomOpen] = useState(false) // ✅ Modal de zoom
  const [zoomLevel, setZoomLevel] = useState(1) // ✅ Nivel de zoom (1 = 100%, 2 = 200%, etc.)
  const { values } = useImageDebug()

  // ✅ Filter out any empty or invalid images
  const validImages = images.filter(img => img && img.trim() !== "")

  // ✅ Parsear la imagen actual para obtener colorSlug e imageIndex
  const currentImagePath = validImages[selectedIndex] || ''
  const { productSlug: imageParsedSlug, colorSlug, imageIndex } = parseImagePath(currentImagePath)
  const actualProductSlug = imageParsedSlug || productSlug

  // ✅ Usar hook para obtener transform del debugger (MÁXIMA PRIORIDAD)
  const { transform: debuggerTransform, isMounted } = useImageTransform(actualProductSlug, colorSlug || '', imageIndex, 'gallery')

  // 🎨 Calcular estilo de imagen basado en tipo de producto
  const getImageTransform = () => {
    const slug = productSlug.toLowerCase()
    const imagePath = validImages[selectedIndex]?.toLowerCase() || ""

    // ✅ PRIORIDAD 0 (MÁXIMA): Transform desde el debugger
    if (debuggerTransform) {
      return {
        transform: `translate(${debuggerTransform.x}px, ${debuggerTransform.y}px) scale(${debuggerTransform.scale})`,
        transformOrigin: 'center center'
      }
    }

    // ✅ PRIORIDAD 1: Buscar override PERMANENTE específico del producto
    const permanentOverride = PRODUCT_OVERRIDES[productSlug]
    if (permanentOverride) {
      return {
        transform: `scale(${permanentOverride.scale}) translateY(${permanentOverride.translateY}%) translateX(${permanentOverride.translateX}%)`,
        transformOrigin: slug.includes('top') || slug.includes('camiseta') || slug.includes('body')
          ? 'center top'
          : 'center bottom'
      }
    }

    // ✅ PRIORIDAD 2: Valores generales por tipo de producto (fallback)
    // Detectar si es producto de niña
    const isGirlProduct = slug.includes('nina') || imagePath.includes('nina')

    // Productos superiores: tops/camisetas
    if (slug.includes('camiseta') || slug.includes('top') || slug.includes('body') || slug.includes('enterizo') ||
        imagePath.includes('camiseta') || imagePath.includes('top') || imagePath.includes('body') || imagePath.includes('enterizo')) {

      if (isGirlProduct) {
        return {
          transform: `scale(${values.girlTopScale}) translateY(${values.girlTopTranslateY}%) translateX(${values.girlTopTranslateX}%)`,
          transformOrigin: 'center top'
        }
      }

      return {
        transform: `scale(${values.cardTopScale}) translateY(${values.cardTopTranslateY}%) translateX(${values.cardTopTranslateX}%)`,
        transformOrigin: 'center top'
      }
    }

    // Productos inferiores: leggings/shorts
    if (slug.includes('legging') || slug.includes('short') || slug.includes('biker') || slug.includes('pantalon') ||
        imagePath.includes('legging') || imagePath.includes('short') || imagePath.includes('biker') || imagePath.includes('pantalon')) {

      if (isGirlProduct) {
        return {
          transform: `scale(${values.girlBottomScale}) translateY(${values.girlBottomTranslateY}%) translateX(${values.girlBottomTranslateX}%)`,
          transformOrigin: 'center bottom'
        }
      }

      return {
        transform: `scale(${values.cardBottomScale}) translateY(${values.cardBottomTranslateY}%) translateX(${values.cardBottomTranslateX}%)`,
        transformOrigin: 'center bottom'
      }
    }

    // Default
    return {
      transform: 'scale(1)',
      transformOrigin: 'center center'
    }
  }

  const goToPrevious = () => {
    setSelectedIndex((prev) => (prev === 0 ? validImages.length - 1 : prev - 1))
  }

  const goToNext = () => {
    setSelectedIndex((prev) => (prev === validImages.length - 1 ? 0 : prev + 1))
  }

  // ✅ Controles de zoom
  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.5, 3)) // Max 3x zoom
  }

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 0.5, 1)) // Min 1x zoom
  }

  const openZoom = () => {
    setIsZoomOpen(true)
    setZoomLevel(1) // Reset zoom al abrir
  }

  const closeZoom = () => {
    setIsZoomOpen(false)
    setZoomLevel(1)
  }

  // ✅ Cerrar con ESC
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeZoom()
    }
    if (isZoomOpen) {
      document.addEventListener('keydown', handleEsc)
      document.body.style.overflow = 'hidden' // Prevent scroll
    }
    return () => {
      document.removeEventListener('keydown', handleEsc)
      document.body.style.overflow = 'unset'
    }
  }, [isZoomOpen])

  // ✅ Navegación con teclado en modal
  useEffect(() => {
    const handleKeys = (e: KeyboardEvent) => {
      if (!isZoomOpen) return
      if (e.key === 'ArrowLeft') goToPrevious()
      if (e.key === 'ArrowRight') goToNext()
    }
    document.addEventListener('keydown', handleKeys)
    return () => document.removeEventListener('keydown', handleKeys)
  }, [isZoomOpen])

  // ✅ If no valid images, show placeholder
  if (validImages.length === 0) {
    console.warn("⚠️  ProductGallery received empty images array")
    return (
      <div className="relative aspect-square overflow-hidden rounded-2xl bg-neutral-100">
        <Image
          src="/placeholder.svg"
          alt={productName}
          fill
          className="object-cover"
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
    )
  }

  // Si solo hay una imagen, mostrar vista simple
  if (validImages.length === 1) {
    return (
      <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-white">
        <img
          src={validImages[0]}
          alt={productName}
          className="w-full h-full object-cover"
        />
      </div>
    )
  }

  return (
    <>
      <div className="space-y-4">
        {/* Imagen principal */}
        <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-white group cursor-zoom-in">
          <div onClick={openZoom} className="relative w-full h-full overflow-hidden">
            <img
              src={validImages[selectedIndex]}
              alt={`${productName} - Imagen ${selectedIndex + 1}`}
              className="w-full h-full object-cover transition-opacity duration-300"
            />
          </div>

          {/* ✅ Botón de zoom en esquina */}
          <button
            onClick={openZoom}
            className="absolute top-4 right-4 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all opacity-0 group-hover:opacity-100"
            aria-label="Abrir zoom"
          >
            <Maximize2 className="w-5 h-5 text-neutral-900" />
          </button>

        {/* Botones de navegación (solo si hay más de una imagen) */}
        {validImages.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all opacity-0 group-hover:opacity-100"
              aria-label="Imagen anterior"
            >
              <ChevronLeft className="w-6 h-6 text-neutral-900" />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all opacity-0 group-hover:opacity-100"
              aria-label="Siguiente imagen"
            >
              <ChevronRight className="w-6 h-6 text-neutral-900" />
            </button>
          </>
        )}

        {/* Indicador de posición */}
        {validImages.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
            {validImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setSelectedIndex(index)}
                className={`h-2 rounded-full transition-all ${
                  index === selectedIndex
                    ? "w-8 bg-white"
                    : "w-2 bg-white/50 hover:bg-white/75"
                }`}
                aria-label={`Ver imagen ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Thumbnails (miniaturas) - Imagen completa sin recortes */}
      {validImages.length > 1 && (
        <div className="grid grid-cols-4 gap-3">
          {validImages.map((image, index) => (
            <ThumbnailImage
              key={index}
              image={image}
              index={index}
              isSelected={index === selectedIndex}
              productName={productName}
              onClick={() => setSelectedIndex(index)}
            />
          ))}
        </div>
      )}
      </div>

      {/* ✅ MODAL DE ZOOM FULLSCREEN */}
      {isZoomOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center">
          {/* Header con controles */}
          <div className="absolute top-0 left-0 right-0 bg-black/50 backdrop-blur-sm p-4 flex items-center justify-between z-10">
            <div className="flex items-center gap-4">
              <span className="text-white text-sm font-medium">
                {selectedIndex + 1} / {validImages.length}
              </span>

              {/* Controles de zoom */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handleZoomOut}
                  disabled={zoomLevel <= 1}
                  className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Alejar"
                >
                  <ZoomOut className="w-5 h-5 text-white" />
                </button>
                <span className="text-white text-sm min-w-[60px] text-center">
                  {Math.round(zoomLevel * 100)}%
                </span>
                <button
                  onClick={handleZoomIn}
                  disabled={zoomLevel >= 3}
                  className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Acercar"
                >
                  <ZoomIn className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>

            <button
              onClick={closeZoom}
              className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition"
              aria-label="Cerrar zoom"
            >
              <X className="w-6 h-6 text-white" />
            </button>
          </div>

          {/* Imagen con zoom */}
          <div className="relative w-full h-full flex items-center justify-center p-16 overflow-auto">
            <div
              className="relative transition-transform duration-300 ease-out"
              style={{
                width: `${100 * zoomLevel}%`,
                height: `${100 * zoomLevel}%`,
                maxWidth: '90vw',
                maxHeight: '80vh',
              }}
            >
              <Image
                src={validImages[selectedIndex]}
                alt={`${productName} - Imagen ${selectedIndex + 1}`}
                fill
                className="object-contain"
                sizes="100vw"
              />
            </div>
          </div>

          {/* Botones de navegación */}
          {validImages.length > 1 && (
            <>
              <button
                onClick={goToPrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 p-3 rounded-full transition"
                aria-label="Imagen anterior"
              >
                <ChevronLeft className="w-8 h-8 text-white" />
              </button>
              <button
                onClick={goToNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 p-3 rounded-full transition"
                aria-label="Siguiente imagen"
              >
                <ChevronRight className="w-8 h-8 text-white" />
              </button>
            </>
          )}

          {/* Thumbnails en modal - Imagen completa sin recortes */}
          {validImages.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 max-w-[90vw] overflow-x-auto px-4 pb-2">
              {validImages.map((image, index) => (
                <ThumbnailImage
                  key={index}
                  image={image}
                  index={index}
                  isSelected={index === selectedIndex}
                  productName={productName}
                  onClick={() => setSelectedIndex(index)}
                  inModal={true}
                />
              ))}
            </div>
          )}

          {/* Instrucciones */}
          <div className="absolute top-20 left-1/2 -translate-x-1/2 text-white/60 text-sm">
            Usa las flechas o haz clic en los botones para navegar. ESC para cerrar.
          </div>
        </div>
      )}
    </>
  )
}
