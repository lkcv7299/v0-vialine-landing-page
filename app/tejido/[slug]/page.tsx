import { notFound } from "next/navigation"
import { byFabric, type Product } from "@/data/products"
import ProductFiltersDesktop from "@/components/ProductFiltersDesktop"
import ProductFiltersDrawer from "@/components/ProductFiltersDrawer"
import ProductListWithLoadMore from "@/components/ProductListWithLoadMore"
import {
  FABRIC_LOOKUP,
  getFullFabricInfo
} from "@/data/fabrics"
import type { Metadata } from "next"

function applyFilters(items: Product[], q: { get: (k: string) => string | null; getAll: (k: string) => string[] }) {
  let out = [...items]

  const size = q.getAll("size")
  if (size.length) out = out.filter((p) => p.sizes.some((s) => size.includes(s)))

  const color = q.getAll("color")
  if (color.length) {
    const normalizedSet = new Set<string>()
    color
      .map((c) => c.toLowerCase())
      .forEach((value) => {
        normalizedSet.add(value)
        normalizedSet.add(value.replace(/-/g, " "))
        normalizedSet.add(value.replace(/\s+/g, "-"))
      })
    out = out.filter((p) =>
      p.colors.some((entry) => {
        if (typeof entry === "string") {
          const candidate = entry.toLowerCase()
          return (
            normalizedSet.has(candidate) ||
            normalizedSet.has(candidate.replace(/-/g, " ")) ||
            normalizedSet.has(candidate.replace(/\s+/g, "-"))
          )
        }
        return (
          normalizedSet.has(entry.slug.toLowerCase()) ||
          normalizedSet.has(entry.slug.toLowerCase().replace(/-/g, " ")) ||
          normalizedSet.has(entry.name.toLowerCase())
        )
      }),
    )
  }

  const category = q.get("category")
  if (category) out = out.filter((p) => p.category === category)

  const minPrice = q.get("minPrice")
  if (minPrice) {
    const min = parseFloat(minPrice)
    if (!isNaN(min)) out = out.filter((p) => p.price >= min)
  }

  const maxPrice = q.get("maxPrice")
  if (maxPrice) {
    const max = parseFloat(maxPrice)
    if (!isNaN(max)) out = out.filter((p) => p.price <= max)
  }

  const sort = q.get("sort")
  if (sort === "price-asc") out.sort((a, b) => a.price - b.price)
  if (sort === "price-desc") out.sort((a, b) => b.price - a.price)

  return out
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const fabricInfo = getFullFabricInfo(slug)

  if (!fabricInfo) {
    return { title: "Tejido no encontrado" }
  }

  return {
    title: fabricInfo.seo.title,
    description: fabricInfo.seo.description,
    keywords: fabricInfo.seo.keywords
  }
}

export default async function FabricPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>
  searchParams: Promise<Record<string, string | string[]> | undefined>
}) {
  const { slug } = await params
  const search = await searchParams

  // Obtener info básica del fabric
  const basicInfo = FABRIC_LOOKUP[slug]
  if (!basicInfo) return notFound()

  // Obtener info completa del nuevo sistema
  const fabricInfo = getFullFabricInfo(slug)

  // Buscar productos directamente con el slug específico
  // Los productos ahora tienen fabric específico: "suplex-liso-premium", "algodon-premium", etc.
  const baseProducts = byFabric(slug as Product["fabric"])

  const filteredProducts = applyFilters(baseProducts, {
    get: (k) => (search?.[k] as string) ?? null,
    getAll: (k) => {
      const v = search?.[k]
      return Array.isArray(v) ? v : v ? [v] : []
    },
  })

  const displayName = fabricInfo?.name || basicInfo.name
  const tagline = fabricInfo?.tagline || basicInfo.summary

  // Load More: mostrar primeros 24 productos inicialmente
  const itemsPerPage = 24
  const initialItems = filteredProducts.slice(0, itemsPerPage)

  return (
    <main className="mx-auto max-w-7xl px-4 md:px-6 py-8">
      {/* Header de la página - mismo estilo que /mujer */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-neutral-900">{displayName}</h1>
        {tagline && (
          <p className="text-neutral-600 mt-2">{tagline}</p>
        )}
      </div>

      {/* Mobile: Filtros arriba */}
      <div className="lg:hidden mb-6">
        <ProductFiltersDrawer totalProducts={baseProducts.length} filteredCount={filteredProducts.length} />
      </div>

      {/* Layout desktop: Sidebar + Grid */}
      <div className="flex gap-6">
        {/* Sidebar desktop (solo visible lg+) */}
        <ProductFiltersDesktop totalProducts={baseProducts.length} filteredCount={filteredProducts.length} />

        {/* Grid de productos con Load More */}
        <div className="flex-1">
          <ProductListWithLoadMore
            initialItems={initialItems}
            allItems={filteredProducts}
            itemsPerPage={itemsPerPage}
          />
        </div>
      </div>
    </main>
  )
}
