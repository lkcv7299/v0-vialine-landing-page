import ProductCard from "@/components/ProductCard"
import { searchProducts } from "@/lib/search"

export default function SearchPage({ searchParams }: { searchParams: { q?: string } }) {
  const q = (searchParams.q ?? "").toString().trim().toLowerCase()

  const results = q ? searchProducts(q) : []

  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 py-8">
      <h1 className="text-2xl font-semibold">Resultados para "{q}"</h1>
      {results.length === 0 ? (
        <p className="mt-6 text-neutral-500">No encontramos productos.</p>
      ) : (
        <ul className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {results.map((p) => (
            <li key={p.slug}>
              <ProductCard product={p} />
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}
