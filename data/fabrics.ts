import {
  fabricFamilies,
  fabricVariants,
  getAllFabrics,
  getFabricBySlug,
  getFabricsByFamily,
  ratingLabels,
  compareFabrics
} from "./fabrics-system"
import type { FabricSlug as NewFabricSlug, FabricVariant, FabricFamily } from "@/types/fabric"

// ============================================================================
// RE-EXPORTS del nuevo sistema
// ============================================================================
export {
  fabricFamilies,
  fabricVariants,
  getAllFabrics,
  getFabricBySlug,
  getFabricsByFamily,
  ratingLabels,
  compareFabrics
}
export type { FabricVariant, FabricFamily }

// ============================================================================
// COMPATIBILIDAD CON SISTEMA ANTIGUO
// Mantiene los slugs "suplex" y "algodon" para productos existentes
// ============================================================================

// El sistema antiguo usaba slugs simples
export type LegacyFabricSlug = "suplex" | "algodon"

// Nuevo sistema con variantes específicas
export type FabricSlug = NewFabricSlug | LegacyFabricSlug

// Mapeo de slugs antiguos a nuevos (por defecto)
export const LEGACY_TO_NEW_FABRIC: Record<LegacyFabricSlug, NewFabricSlug> = {
  suplex: "suplex-liso-premium",
  algodon: "algodon-premium"
}

// Mapeo inverso: de nuevo a familia
export const NEW_TO_LEGACY_FABRIC: Record<NewFabricSlug, LegacyFabricSlug> = {
  "suplex-liso-premium": "suplex",
  "suplex-perchado": "suplex",
  "algodon-premium": "algodon",
  "algodon-french-terry": "algodon",
  "algodon-gamusa": "algodon"
}

// ============================================================================
// FORMATO ANTIGUO (Compatibilidad)
// ============================================================================

export type FabricInfo = {
  slug: FabricSlug
  name: string
  summary: string
  description?: string
  // Campos adicionales del nuevo sistema
  family?: "suplex" | "algodon"
  isVariant?: boolean
  variantSlug?: NewFabricSlug
}

// Lista combinada para el índice de tejidos (NUEVO FORMATO)
export const FABRICS: FabricInfo[] = [
  // ─────────────────────────────────────────────────────────────────────────
  // FAMILIA SUPLEX
  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: "suplex-liso-premium",
    name: "Suplex Liso Premium",
    summary: "Máximo rendimiento para entrenamientos intensos",
    description: "Compresión, secado ultra rápido y squat-proof. Nuestro tejido estrella para deportistas exigentes.",
    family: "suplex",
    isVariant: true,
    variantSlug: "suplex-liso-premium"
  },
  {
    slug: "suplex-perchado",
    name: "Suplex Perchado",
    summary: "Calidez y rendimiento para días fríos",
    description: "Interior afelpado que retiene calor sin sacrificar las propiedades técnicas del Suplex.",
    family: "suplex",
    isVariant: true,
    variantSlug: "suplex-perchado"
  },
  // ─────────────────────────────────────────────────────────────────────────
  // FAMILIA ALGODÓN
  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: "algodon-premium",
    name: "Algodón Premium",
    summary: "Suavidad natural para el día a día",
    description: "Fibra larga peinada, hipoalergénico y ultra suave. Perfecto para uso diario.",
    family: "algodon",
    isVariant: true,
    variantSlug: "algodon-premium"
  },
  {
    slug: "algodon-french-terry",
    name: "Algodón French Terry",
    summary: "El abrazo perfecto entre comodidad y estilo",
    description: "Tejido athleisure con bucles suaves. Del gym a la calle sin esfuerzo.",
    family: "algodon",
    isVariant: true,
    variantSlug: "algodon-french-terry"
  },
  {
    slug: "algodon-gamusa",
    name: "Algodón Gamusa",
    summary: "Lujo táctil en cada movimiento",
    description: "Acabado aterciopelado ultra suave. La sensación de lujo para tu loungewear.",
    family: "algodon",
    isVariant: true,
    variantSlug: "algodon-gamusa"
  }
]

// Lookup por slug (soporta tanto slugs antiguos como nuevos)
export const FABRIC_LOOKUP: Record<string, FabricInfo> = {
  // Slugs nuevos (variantes)
  ...Object.fromEntries(FABRICS.map((f) => [f.slug, f])),
  // Slugs antiguos (para compatibilidad con productos existentes)
  suplex: {
    slug: "suplex",
    name: "Suplex",
    summary: "Compresión media-alta, transpirable y squat-proof.",
    description: "Nuestro tejido insignia para entrenar con comodidad.",
    family: "suplex"
  },
  algodon: {
    slug: "algodon",
    name: "Algodón",
    summary: "Suave sobre la piel, uso diario, no transparenta.",
    description: "Ideal para el día a día con acabado suave y fresco.",
    family: "algodon"
  }
}

// ============================================================================
// HELPERS
// ============================================================================

/**
 * Obtiene la variante completa del nuevo sistema a partir de cualquier slug
 */
export function getFullFabricInfo(slug: string): FabricVariant | null {
  // Si es un slug nuevo, devolver directamente
  if (slug in fabricVariants) {
    return fabricVariants[slug as NewFabricSlug]
  }

  // Si es un slug antiguo, mapear al nuevo
  if (slug in LEGACY_TO_NEW_FABRIC) {
    const newSlug = LEGACY_TO_NEW_FABRIC[slug as LegacyFabricSlug]
    return fabricVariants[newSlug]
  }

  return null
}

/**
 * Obtiene la familia de un tejido
 */
export function getFabricFamilyForSlug(slug: string): FabricFamily | null {
  const fabric = getFullFabricInfo(slug)
  if (!fabric) return null
  return fabricFamilies[fabric.family]
}

/**
 * Obtiene todas las variantes de una familia
 */
export function getVariantsByFamily(familyId: "suplex" | "algodon"): FabricInfo[] {
  return FABRICS.filter(f => f.family === familyId)
}

/**
 * Verifica si un slug es del sistema nuevo (variante)
 */
export function isNewFabricSlug(slug: string): slug is NewFabricSlug {
  return slug in fabricVariants
}

/**
 * Verifica si un slug es del sistema antiguo
 */
export function isLegacyFabricSlug(slug: string): slug is LegacyFabricSlug {
  return slug === "suplex" || slug === "algodon"
}
