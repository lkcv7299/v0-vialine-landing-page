import { products } from "@/data/products"
import ProductCard from "@/components/ui/ProductCard"

export default function Page({ searchParams }: { searchParams: { q?: string } }) {
  const q = (searchParams.q || "").toString().trim().toLowerCase()
  const list = q ? products.filter((p) => (p.title + " " + (p.tags || "")).toLowerCase().includes(q)) : []

  return (
    <main className="mx-auto max-w-7xl px-4 md:px-6 py-8">
      <h1 className="text-2xl md:text-3xl font-semibold">Resultados para "{q}"</h1>
      {list.length === 0 && <p className="mt-3 text-neutral-600">No encontramos productos.</p>}

      <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-3 gap-y-6">
        {list.map((p) => (
          <ProductCard
            key={p.slug}
            href={`/producto/${p.slug}`}
            title={p.title}
            price={p.price}
            image={p.image}
            badge={p.badge}
          />
        ))}
      </div>
    </main>
  )
}
