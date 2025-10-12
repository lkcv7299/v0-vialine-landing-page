import { searchProducts } from "@/lib/search"
import Link from "next/link"

export const dynamic = "force-dynamic"

export default function SearchPage({ searchParams }: { searchParams: { q?: string } }) {
  const q = (searchParams.q ?? "").toString()
  const rows = q ? searchProducts(q) : []

  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="mb-6 text-2xl font-semibold">Resultados para "{q}"</h1>

      {rows.length === 0 ? (
        <p className="text-neutral-600">No encontramos productos.</p>
      ) : (
        <ul className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
          {rows.map((p) => (
            <li key={p.slug} className="group">
              <Link href={`/producto/${p.slug}`} className="block">
                <div className="aspect-[3/4] overflow-hidden rounded-xl border bg-neutral-50">
                  <img
                    src={p.image || "/placeholder.svg"}
                    alt={p.name}
                    className="h-full w-full object-cover transition-transform group-hover:scale-[1.02]"
                    loading="lazy"
                  />
                </div>
                <div className="mt-3 text-sm text-neutral-800">{p.name}</div>
                <div className="text-sm text-pink-600">S/ {p.price}</div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}
