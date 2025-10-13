import { products } from "@/data/products"
import ProductCard from "@/components/ui/ProductCard"

export default function SearchPage({ searchParams }: { searchParams: { q?: string } }) {
  const q = (searchParams.q ?? "").toString().trim().toLowerCase()

  const results = q
    ? products.filter((p) => {
        const haystack = [p.title, p.slug, p.category].join(" ").toLowerCase()
        return haystack.includes(q)
      })
    : []

  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 py-8">
      <h1 className="text-2xl font-semibold">Resultados para "{q}"</h1>
      {results.length === 0 ? (
        <p className="mt-6 text-neutral-500">No encontramos productos.</p>
      ) : (
        <ul className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {results.map((p) => (
            <li key={p.slug}>
              <ProductCard href={`/producto/${p.slug}`} title={p.title} price={p.price} image={p.image} />
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}
