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
function index(): Searchable[] {
  return products.map((p) => {
    const base = [p.title, p.category, p.fabric, p.audience, ...p.colors].filter(Boolean).join(" ")
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

  return IDX.filter((row) => {
    // cada término debe estar en el haystack
    return terms.every((t) => row._haystack.includes(t))
  })
}
