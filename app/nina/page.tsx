import { byAudience, type Product } from "@/data/products"
import ProductFilters from "@/components/ProductFilters"
import ProductGrid from "@/components/ProductGrid"
import Hero from "@/components/Hero"

function apply(items: Product[], q: Record<string, string | string[] | undefined>) {
  let out = [...items]
  const get = (k: string) => q[k] as string | undefined
  const getAll = (k: string) => {
    const v = q[k]
    return Array.isArray(v) ? v : v ? [v] : []
  }
  const size = getAll("size")
  if (size.length) out = out.filter((p) => p.sizes.some((s) => size.includes(s)))
  const color = getAll("color")
  if (color.length) out = out.filter((p) => p.colors.some((c) => color.includes(c)))
  const fabric = get("fabric")
  if (fabric) out = out.filter((p) => p.fabric === fabric)
  const sort = get("sort")
  if (sort === "price-asc") out.sort((a, b) => a.price - b.price)
  if (sort === "price-desc") out.sort((a, b) => b.price - a.price)
  return out
}

export default function Page({ searchParams }: { searchParams: Record<string, string | string[] | undefined> }) {
  const base = byAudience("nina")
  const items = apply(base, searchParams)
  return (
    <>
      <Hero
        image="/hero-girl.jpg"
        kicker="VIALINE · NIÑA"
        title="Niña"
        description="Comodidad para moverse, diseños que les encantan."
        primary={{ href: "/nina", label: "Ver colección niña" }}
        objectPositionDesktop="60% 42%"
        objectPositionMobile="58% 38%"
      />

      <main className="mx-auto max-w-7xl px-6 md:px-8 py-8">
        <h1 className="text-3xl md:text-4xl font-bold">Niña</h1>
        <p className="text-neutral-600 mt-2">{items.length} productos</p>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-[280px,1fr] gap-6">
          <ProductFilters />
          <ProductGrid items={items} />
        </div>
      </main>
    </>
  )
}
