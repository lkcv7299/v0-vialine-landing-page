export type CategorySlug = "bodys" | "enterizo" | "legging" | "pescador" | "torero"

// Mapa de nombres de color -> sufijo de archivo (minúsculas, sin acentos)
const COLOR_TO_FILE: Record<string, string> = {
  "azul marino": "azul-marino",
  "azul-marino": "azul-marino",
  azulino: "azulino",
  blanco: "blanco",
  negro: "negro",
  rojo: "rojo",
  melange: "melange",
  gris: "gris",
  charcol: "charcol",
  aqua: "aqua",
  melon: "melon",
}

export function toFileColor(color?: string): string | undefined {
  if (!color) return undefined
  const k = color.trim().toLowerCase()
  return COLOR_TO_FILE[k] ?? k.replace(/\s+/g, "-")
}

/**
 * Construye la ruta de imagen para una variante de color.
 * Si no existe la variante, se usará fallback <slug>.webp (lo hacemos con onError en <img>).
 */
export function getImageUrl(opts: {
  category: CategorySlug // 'bodys' | 'enterizo' | 'legging' | 'pescador' | 'torero'
  slug: string // ej. 'pescador-realce' | 'body-manga-larga' | 'legging-slim'
  color?: string // ej. 'negro' | 'azul marino' | 'charcol'
}): { src: string; fallback: string } {
  const fileColor = toFileColor(opts.color)
  const base = `/productos/mujer/${opts.category}/${opts.slug}`
  const fallback = `${base}.webp`
  const src = fileColor ? `${base}-${fileColor}.webp` : fallback
  return { src, fallback }
}
