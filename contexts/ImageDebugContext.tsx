"use client"

import { createContext, useContext, ReactNode } from "react"

// ✅ VALORES AJUSTADOS VISUALMENTE - Optimizados para h-[180%] y h-[200%]
const IMAGE_TRANSFORM_VALUES = {
  // Para ProductCard (/mujer) - con h-[180%]
  cardTopScale: 1.1,
  cardTopTranslateY: -7,
  cardTopTranslateX: 3,
  cardBottomScale: 1.0,
  cardBottomTranslateY: -3,
  cardBottomTranslateX: 0,

  // Para GymRail (carruseles de home) - con h-[200%]
  railTopScale: 1.05,
  railTopTranslateY: -7,
  railTopTranslateX: 0,
  railBottomScale: 1.15,
  railBottomTranslateY: -9,
  railBottomTranslateX: 3,

  // Para productos de niña - con h-[180%]
  girlTopScale: 1.0,
  girlTopTranslateY: -20,
  girlTopTranslateX: 0,
  girlBottomScale: 1.0,
  girlBottomTranslateY: -5,
  girlBottomTranslateX: 0,
}

type ImageTransformValues = typeof IMAGE_TRANSFORM_VALUES

type ImageTransformContextType = {
  values: ImageTransformValues
}

const ImageTransformContext = createContext<ImageTransformContextType | undefined>(undefined)

export function ImageDebugProvider({ children }: { children: ReactNode }) {
  return (
    <ImageTransformContext.Provider value={{ values: IMAGE_TRANSFORM_VALUES }}>
      {children}
    </ImageTransformContext.Provider>
  )
}

export function useImageDebug() {
  const context = useContext(ImageTransformContext)
  if (!context) {
    // ✅ FALLBACK SEGURO: Si el contexto no existe, devolver valores por defecto
    return {
      values: IMAGE_TRANSFORM_VALUES
    }
  }
  return context
}
