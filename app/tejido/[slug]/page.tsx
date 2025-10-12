import { notFound } from "next/navigation"
import { byFabric, type Product } from "@/data/products"
import ProductGrid from "@/components/ProductGrid"
import ProductFilters from "@/components/ProductFilters"

const FABRIC_NAMES: Record<Product["fabric"], { title: string; desc: string }> = {
  suplex: {
    title: "Suplex",
    desc: "Compresión media-alta, transpirable y squat-proof.",
  },
  algodon: {
    title: "Algodón",
    desc: "Suave sobre la piel, uso diario, no transparenta.",
  },
}

function applyFilters(items: Product[], q: { get: (k: string) => string | null; getAll: (k: string) => string[] }) {
  let out = [...items]

  const size = q.getAll("size")
  if (size.length) out = out.filter((p) => p.sizes.some((s) => size.includes(s)))

  const color = q.getAll("color")
  if (color.length) out = out.filter((p) => p.colors.some((c) => color.includes(c)))

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
  const fabric = params.slug as Product["fabric"]
  if (!FABRIC_NAMES[fabric]) return notFound()

  const baseProducts = byFabric(fabric)

  const filteredProducts = applyFilters(baseProducts, {
    get: (k) => (searchParams?.[k] as string) ?? null,
    getAll: (k) => {
      const v = searchParams?.[k]
      return Array.isArray(v) ? v : v ? [v] : []
    },
  })

  const fabricInfo = FABRIC_NAMES[fabric]

  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-neutral-900">{fabricInfo.title}</h1>
        <p className="mt-2 text-neutral-700">{fabricInfo.desc}</p>
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
