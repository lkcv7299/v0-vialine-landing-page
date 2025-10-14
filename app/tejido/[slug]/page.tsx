import { notFound } from "next/navigation"
import { byFabric, type Product } from "@/data/products"
import ProductGrid from "@/components/ProductGrid"
import ProductFilters from "@/components/ProductFilters"
import { FABRIC_LOOKUP, type FabricSlug } from "@/data/fabrics"

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

  const fabric = q.get("fabric")
  if (fabric) out = out.filter((p) => p.fabric === fabric)

  const sort = q.get("sort")
  if (sort === "price-asc") out.sort((a, b) => a.price - b.price)
  if (sort === "price-desc") out.sort((a, b) => b.price - a.price)

  return out
}

export default function FabricPage({
  params,
  searchParams,
}: {
  params: { slug: string }
  searchParams?: Record<string, string | string[]>
}) {
  const fabric = params.slug as FabricSlug
  const fabricInfo = FABRIC_LOOKUP[fabric]
  if (!fabricInfo) return notFound()

  const baseProducts = byFabric(fabric)

  const filteredProducts = applyFilters(baseProducts, {
    get: (k) => (searchParams?.[k] as string) ?? null,
    getAll: (k) => {
      const v = searchParams?.[k]
      return Array.isArray(v) ? v : v ? [v] : []
    },
  })

  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-neutral-900">{fabricInfo.name}</h1>
        <p className="mt-2 text-neutral-700">{fabricInfo.summary}</p>
        {fabricInfo.description && <p className="mt-4 text-neutral-600">{fabricInfo.description}</p>}
        <p className="mt-4 text-neutral-600">
          {filteredProducts.length} {filteredProducts.length === 1 ? "producto" : "productos"}
        </p>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        <aside className="lg:col-span-1">
          <ProductFilters />
        </aside>
        <div className="lg:col-span-3">
          <ProductGrid items={filteredProducts} />
        </div>
      </div>
    </main>
  )
}
