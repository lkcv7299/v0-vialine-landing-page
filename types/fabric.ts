// Sistema de Tejidos Profesional - Vialine
// Arquitectura de familias y variantes de tejidos

export type FabricFamilyId = "suplex" | "algodon"

export type FabricSlug =
  | "suplex-liso-premium"
  | "suplex-perchado"
  | "algodon-premium"
  | "algodon-french-terry"
  | "algodon-gamusa"

export interface FabricRatings {
  elasticity: number      // 1-5: Elasticidad/Stretch
  breathability: number   // 1-5: Transpirabilidad
  softness: number        // 1-5: Suavidad al tacto
  durability: number      // 1-5: Durabilidad
  quickDry: number        // 1-5: Secado rápido
  compression: number     // 1-5: Nivel de compresión
}

export interface FabricFamily {
  id: FabricFamilyId
  name: string
  icon: string            // Lucide icon name
  description: string
  color: string           // Tailwind color class
  gradient: string        // Tailwind gradient classes
}

export interface FabricVariant {
  slug: FabricSlug
  family: FabricFamilyId
  name: string
  shortName: string
  tagline: string
  description: string
  composition: string     // Ej: "88% Poliéster, 12% Elastano"
  benefits: string[]
  careInstructions: {
    icon: string
    text: string
  }[]
  ratings: FabricRatings
  idealFor: string[]
  notRecommendedFor?: string[]
  image: string           // Imagen de textura/close-up
  badgeColor: string      // Color del badge en productos
  applicableCategories: ("mujer" | "nina")[]
  seo: {
    title: string
    description: string
    keywords: string[]
  }
}

export interface FabricComparison {
  fabrics: FabricSlug[]
  attributes: (keyof FabricRatings)[]
}

// Helper type para productos
export type ProductFabric = FabricSlug
