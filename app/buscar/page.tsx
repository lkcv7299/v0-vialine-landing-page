import ProductCard from "@/components/ProductCard"
import { searchProducts } from "@/lib/search"

// ✅ CAMBIO CRÍTICO: Hacer la función async y await searchParams
export default async function Page({ 
  searchParams 
}: { 
  searchParams: Promise<{ q?: string }> 
}) {
  // ✅ AWAIT searchParams (Next.js 15)
  const params = await searchParams
  
  const q = (params.q || "").toString().trim().toLowerCase()
  const list = q ? searchProducts(q) : []

  return (
    <main className="mx-auto max-w-7xl px-4 md:px-6 py-8">
      <h1 className="text-2xl md:text-3xl font-semibold">Resultados para "{q}"</h1>
      {list.length === 0 && <p className="mt-3 text-neutral-600">No encontramos productos.</p>}

      <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-3 gap-y-6">
        {list.map((p) => (
          <ProductCard key={p.slug} product={p} />
        ))}
      </div>
    </main>
  )
}