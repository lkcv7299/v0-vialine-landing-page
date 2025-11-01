import { byAudience, type Product } from "@/data/products"
import ProductFiltersDesktop from "@/components/ProductFiltersDesktop"
import ProductFiltersDrawer from "@/components/ProductFiltersDrawer"
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
  if (sort === "name-asc") out.sort((a, b) => a.title.localeCompare(b.title))
  if (sort === "name-desc") out.sort((a, b) => b.title.localeCompare(a.title))
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

  const base = byAudience("mujer")
  const allItems = apply(base, params)

  // Paginación
  const page = parseInt((params.page as string) || "1")
  const itemsPerPage = 24
  const totalPages = Math.ceil(allItems.length / itemsPerPage)
  const startIndex = (page - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const items = allItems.slice(startIndex, endIndex)

  // ✅ Helper para construir URLs de paginación correctamente
  const buildPaginationUrl = (pageNum: number) => {
    const urlParams = new URLSearchParams()
    Object.entries(params).forEach(([key, value]) => {
      if (key === 'page') return // Skip, lo agregamos manualmente
      if (Array.isArray(value)) {
        value.forEach(v => urlParams.append(key, v))
      } else if (value) {
        urlParams.set(key, value)
      }
    })
    urlParams.set('page', String(pageNum))
    return `/mujer?${urlParams.toString()}`
  }

  return (
    <main className="mx-auto max-w-7xl px-4 md:px-6 py-8">
      {/* Header de la página */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-neutral-900">Mujer</h1>
        <p className="text-neutral-600 mt-2">
          Ropa deportiva y activewear de alta calidad
        </p>
      </div>

      {/* Layout desktop: Sidebar + Grid */}
      <div className="flex gap-6">
        {/* Sidebar desktop (solo visible lg+) */}
        <ProductFiltersDesktop totalProducts={base.length} filteredCount={allItems.length} />

        {/* Grid de productos */}
        <div className="flex-1">
          <ProductGrid items={items} />

          {/* Paginación */}
          {totalPages > 1 && (
            <div className="mt-12 flex justify-center items-center gap-2">
              {/* Botón Anterior */}
              {page > 1 ? (
                <a
                  href={buildPaginationUrl(page - 1)}
                  className="px-4 py-2 border border-neutral-300 rounded-lg hover:bg-neutral-50 transition font-medium text-neutral-700"
                >
                  Anterior
                </a>
              ) : (
                <button
                  disabled
                  className="px-4 py-2 border border-neutral-200 rounded-lg bg-neutral-100 text-neutral-400 cursor-not-allowed"
                >
                  Anterior
                </button>
              )}

              {/* Números de página */}
              <div className="flex gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => {
                  // Mostrar solo algunas páginas alrededor de la actual
                  if (
                    pageNum === 1 ||
                    pageNum === totalPages ||
                    (pageNum >= page - 1 && pageNum <= page + 1)
                  ) {
                    return (
                      <a
                        key={pageNum}
                        href={buildPaginationUrl(pageNum)}
                        className={`px-4 py-2 rounded-lg font-medium transition ${
                          pageNum === page
                            ? "bg-rose-600 text-white"
                            : "border border-neutral-300 hover:bg-neutral-50 text-neutral-700"
                        }`}
                      >
                        {pageNum}
                      </a>
                    )
                  } else if (pageNum === page - 2 || pageNum === page + 2) {
                    return <span key={pageNum} className="px-2 py-2 text-neutral-400">...</span>
                  }
                  return null
                })}
              </div>

              {/* Botón Siguiente */}
              {page < totalPages ? (
                <a
                  href={buildPaginationUrl(page + 1)}
                  className="px-4 py-2 border border-neutral-300 rounded-lg hover:bg-neutral-50 transition font-medium text-neutral-700"
                >
                  Siguiente
                </a>
              ) : (
                <button
                  disabled
                  className="px-4 py-2 border border-neutral-200 rounded-lg bg-neutral-100 text-neutral-400 cursor-not-allowed"
                >
                  Siguiente
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Drawer mobile (solo visible mobile) */}
      <ProductFiltersDrawer totalProducts={base.length} filteredCount={allItems.length} />
    </main>
  )
}