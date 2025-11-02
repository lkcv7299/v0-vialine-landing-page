"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, X, ZoomIn, ZoomOut, Maximize2 } from "lucide-react"

type ProductGalleryProps = {
  images: string[]
  productName: string
}

export default function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [isZoomOpen, setIsZoomOpen] = useState(false) // ✅ Modal de zoom
  const [zoomLevel, setZoomLevel] = useState(1) // ✅ Nivel de zoom (1 = 100%, 2 = 200%, etc.)

  // Reset selected index cuando cambien las imágenes
  useEffect(() => {
    if (selectedIndex >= images.length) {
      setSelectedIndex(0)
    }
  }, [images, selectedIndex])

  // Si solo hay una imagen, mostrar vista simple
  if (images.length === 1) {
    return (
      <div className="relative aspect-square overflow-hidden rounded-2xl bg-neutral-100">
        <Image
          src={images[0]}
          alt={productName}
          fill
          className="object-cover"
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
    )
  }

  const goToPrevious = useCallback(() => {
    setSelectedIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }, [images.length])

  const goToNext = useCallback(() => {
    setSelectedIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }, [images.length])

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
  }, [isZoomOpen, goToPrevious, goToNext])

  return (
    <>
      <div className="space-y-4">
        {/* Imagen principal */}
        <div className="relative aspect-square overflow-hidden rounded-2xl bg-neutral-100 group cursor-zoom-in">
          <div onClick={openZoom} className="relative w-full h-full">
            <Image
              src={images[selectedIndex]}
              alt={`${productName} - Imagen ${selectedIndex + 1}`}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
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
        {images.length > 1 && (
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
        {images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
            {images.map((_, index) => (
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

      {/* Thumbnails (miniaturas) */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-3">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedIndex(index)}
              className={`relative aspect-square overflow-hidden rounded-lg transition-all ${
                index === selectedIndex
                  ? "ring-2 ring-rose-600 ring-offset-2"
                  : "ring-1 ring-neutral-200 hover:ring-neutral-400"
              }`}
            >
              <Image
                src={image}
                alt={`${productName} - Vista ${index + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 25vw, 15vw"
              />
            </button>
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
                {selectedIndex + 1} / {images.length}
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
                src={images[selectedIndex]}
                alt={`${productName} - Imagen ${selectedIndex + 1}`}
                fill
                className="object-contain"
                sizes="100vw"
              />
            </div>
          </div>

          {/* Botones de navegación */}
          {images.length > 1 && (
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

          {/* Thumbnails en modal */}
          {images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 max-w-[90vw] overflow-x-auto px-4 pb-2">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedIndex(index)}
                  className={`relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden transition-all ${
                    index === selectedIndex
                      ? "ring-2 ring-white ring-offset-2 ring-offset-black"
                      : "ring-1 ring-white/30 hover:ring-white/60 opacity-60 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={image}
                    alt={`Miniatura ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                </button>
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
