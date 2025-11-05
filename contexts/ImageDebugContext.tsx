"use client"

import { createContext, useContext, ReactNode, useState } from "react"

// ✅ VALORES AJUSTADOS VISUALMENTE - Optimizados para h-[180%] y h-[200%]
const DEFAULT_VALUES = {
  // Para ProductCard (/mujer) - con h-[180%]
  cardTopScale: 1.1,
  cardTopTranslateY: -7,
  cardTopTranslateX: 3,
  cardBottomScale: 1.0,
  cardBottomTranslateY: -3,
  cardBottomTranslateX: 0,

  // Para GymRail (carruseles de home) - VALORES NEUTROS
  railTopScale: 1.0,
  railTopTranslateY: 0,
  railTopTranslateX: 0,
  railBottomScale: 1.0,
  railBottomTranslateY: 0,
  railBottomTranslateX: 0,

  // Para productos de niña - con h-[180%]
  girlTopScale: 1.0,
  girlTopTranslateY: -20,
  girlTopTranslateX: 0,
  girlBottomScale: 1.0,
  girlBottomTranslateY: -5,
  girlBottomTranslateX: 0,
}

type ImageTransformValues = typeof DEFAULT_VALUES

type ImageTransformContextType = {
  values: ImageTransformValues
  updateValue: (key: keyof ImageTransformValues, value: number) => void
}

const ImageTransformContext = createContext<ImageTransformContextType | undefined>(undefined)

export function ImageDebugProvider({ children }: { children: ReactNode }) {
  const [values, setValues] = useState<ImageTransformValues>(DEFAULT_VALUES)

  const updateValue = (key: keyof ImageTransformValues, value: number) => {
    setValues(prev => ({
      ...prev,
      [key]: value
    }))
  }

  return (
    <ImageTransformContext.Provider value={{ values, updateValue }}>
      {children}
    </ImageTransformContext.Provider>
  )
}

export function useImageDebug() {
  const context = useContext(ImageTransformContext)
  if (!context) {
    // ✅ FALLBACK SEGURO: Si el contexto no existe, devolver valores por defecto
    return {
      values: DEFAULT_VALUES,
      updateValue: () => {}
    }
  }
  return context
}
