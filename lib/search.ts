import { products, type Product } from "@/data/products"

// Normaliza: minúsculas, sin acentos y sin caracteres raros
export function normalize(s: string) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
}

// Devuelve variantes para cubrir singular/plural simple (camiseta/s, legging/s, top/s)
function variants(term: string) {
  const t = normalize(term.trim())
  if (!t) return []
  const out = new Set<string>([t])
  if (t.endsWith("s")) out.add(t.slice(0, -1))
  else out.add(`${t}s`)
  return [...out]
}

export type Searchable = Product & {
  _haystack: string // nombre + categoría + tejido + colores + audiencia
}

// Construye índice simple
function colorTokens(product: Product): string[] {
  return (product.colors ?? []).flatMap((color) => {
    if (typeof color === "string") return [color]
    return [color.name, color.slug]
  })
}

function attributeTokens(product: Product): string[] {
  if (!product.attributes) return []
  const { material, detalles, beneficios } = product.attributes
  return [material, ...(detalles ?? []), ...(beneficios ?? [])].filter(Boolean) as string[]
}

function index(): Searchable[] {
  return products.map((p) => {
    const base = [
      p.title,
      p.slug,
      p.category,
      p.fabric,
      p.audience,
      ...colorTokens(p),
      ...(Array.isArray(p.tags) ? p.tags : []),
      ...attributeTokens(p),
    ]
      .filter(Boolean)
      .join(" ")

    return { ...p, _haystack: normalize(base) }
  })
}

const IDX = index()

export function searchProducts(query: string): Product[] {
  const terms = query
    .split(/\s+/)
    .flatMap((t) => variants(t))
    .filter(Boolean)

  if (!terms.length) return []

  // Primero: resultados exactos (todos los términos)
  const exact = IDX.filter((row) => {
    return terms.every((t) => row._haystack.includes(t))
  })

  // Si hay resultados exactos, devolver solo esos
  if (exact.length > 0) return exact

  // Si no hay exactos, buscar parciales (al menos un término)
  // Útil para búsquedas como "leg" que debería encontrar "legging"
  const partial = IDX.filter((row) => {
    return terms.some((t) => row._haystack.includes(t))
  })

  return partial
}
