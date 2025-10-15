"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

type ProductGalleryProps = {
  images: string[]
  productName: string
}

export default function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0)

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

  const goToPrevious = () => {
    setSelectedIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const goToNext = () => {
    setSelectedIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  return (
    <div className="space-y-4">
      {/* Imagen principal */}
      <div className="relative aspect-square overflow-hidden rounded-2xl bg-neutral-100 group">
        <Image
          src={images[selectedIndex]}
          alt={`${productName} - Imagen ${selectedIndex + 1}`}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
        />

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
  )
}