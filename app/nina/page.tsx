import { byAudience, type Product } from "@/data/products"
import ProductFiltersDesktop from "@/components/ProductFiltersDesktop"
import ProductFiltersDrawer from "@/components/ProductFiltersDrawer"
import ProductGrid from "@/components/ProductGrid"
import Hero from "@/components/Hero"

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

// ✅ CAMBIO CRÍTICO: Hacer la función async y await searchParams
export default async function Page({ 
  searchParams 
}: { 
  searchParams: Promise<Record<string, string | string[] | undefined>> 
}) {
  // ✅ AWAIT searchParams (Next.js 15)
  const params = await searchParams
  
  const base = byAudience("nina")
  const items = apply(base, params)
  
  return (
    <>
      {/* Hero de niña */}
      <Hero
        image="/hero-girl.jpg"
        kicker="VIALINE · NIÑA"
        title="Niña"
        description="Comodidad para moverse, diseños que les encantan."
        primary={{ href: "/nina", label: "Ver colección niña" }}
        objectPositionDesktop="60% 42%"
        objectPositionMobile="58% 38%"
      />

      <main className="mx-auto max-w-7xl px-4 md:px-6 py-8">
        {/* Header de la página */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-neutral-900">Niña</h1>
          <p className="text-neutral-600 mt-2">
            Activewear cómodo y divertido para niñas
          </p>
        </div>
        
        {/* Layout desktop: Sidebar + Grid */}
        <div className="flex gap-6">
          {/* Sidebar desktop (solo visible lg+) */}
          <ProductFiltersDesktop totalProducts={base.length} filteredCount={items.length} />
          
          {/* Grid de productos */}
          <div className="flex-1">
            <ProductGrid items={items} />
          </div>
        </div>

        {/* Drawer mobile (solo visible mobile) */}
        <ProductFiltersDrawer totalProducts={base.length} filteredCount={items.length} />
      </main>
    </>
  )
}