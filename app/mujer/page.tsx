import { byAudience, type Product } from "@/data/products"
import ProductFilters from "@/components/ProductFilters"
import ProductGrid from "@/components/ProductGrid"

function apply(items: Product[], q: Record<string, string | string[] | undefined>) {
  let out = [...items]
  const get = (k: string) => q[k] as string | undefined
  const getAll = (k: string) => {
    const v = q[k]
    return Array.isArray(v) ? v : v ? [v] : []
  }

  // Filtro por talla
  const size = getAll("size")
  if (size.length) out = out.filter((p) => p.sizes.some((s) => size.includes(s)))

  // Filtro por color
  const color = getAll("color")
  if (color.length) {
    out = out.filter((p) => 
      p.colors.some((c) => {
        // Manejar tanto strings como objetos color
        const colorValue = typeof c === "string" ? c : c.name
        return color.includes(colorValue)
      })
    )
  }

  // Filtro por tejido
  const fabric = get("fabric")
  if (fabric) out = out.filter((p) => p.fabric === fabric)

  // Filtro por categoría
  const category = get("category")
  if (category) out = out.filter((p) => p.category === category)

  // Filtro por precio
  const minPrice = get("minPrice")
  if (minPrice) {
    const min = parseFloat(minPrice)
    if (!isNaN(min)) out = out.filter((p) => p.price >= min)
  }

  const maxPrice = get("maxPrice")
  if (maxPrice) {
    const max = parseFloat(maxPrice)
    if (!isNaN(max)) out = out.filter((p) => p.price <= max)
  }

  // Ordenar
  const sort = get("sort")
  if (sort === "price-asc") out.sort((a, b) => a.price - b.price)
  if (sort === "price-desc") out.sort((a, b) => b.price - a.price)
  if (sort === "popular") {
    // Ordenar por popularidad (puedes ajustar esto según tu lógica)
    // Por ahora, ordena por título como placeholder
    out.sort((a, b) => a.title.localeCompare(b.title))
  }

  return out
}

export default function Page({ searchParams }: { searchParams: Record<string, string | string[] | undefined> }) {
  const base = byAudience("mujer")
  const items = apply(base, searchParams)
  
  return (
    <main className="mx-auto max-w-7xl px-6 md:px-8 py-8">
      <h1 className="text-3xl md:text-4xl font-bold text-neutral-900">Mujer</h1>
      <p className="text-neutral-600 mt-2">
        Ropa deportiva y activewear de alta calidad
      </p>
      
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-[320px,1fr] gap-6">
        <ProductFilters totalProducts={base.length} filteredCount={items.length} />
        <ProductGrid items={items} />
      </div>
    </main>
  )
}
