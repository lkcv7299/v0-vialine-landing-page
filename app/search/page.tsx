import { searchProducts } from "@/lib/search"
import ProductGrid from "@/components/ProductGrid"
import Link from "next/link"
import { Search } from "lucide-react"

export const metadata = {
  title: "Buscar productos | Vialine",
  description: "Encuentra tus productos favoritos de activewear y ropa deportiva",
}

export default function SearchPage({ 
  searchParams 
}: { 
  searchParams: { q?: string } 
}) {
  const query = (searchParams.q ?? "").toString().trim()
  const results = query ? searchProducts(query) : []

  return (
    <main className="mx-auto max-w-7xl px-6 md:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <Search className="w-6 h-6 text-neutral-400" />
          <h1 className="text-3xl md:text-4xl font-bold text-neutral-900">
            {query ? `Resultados para "${query}"` : "Búsqueda"}
          </h1>
        </div>
        
        {query && (
          <p className="text-neutral-600">
            {results.length === 0 
              ? "No se encontraron productos" 
              : `${results.length} ${results.length === 1 ? "producto encontrado" : "productos encontrados"}`
            }
          </p>
        )}
      </div>

      {/* Resultados */}
      {!query ? (
        <div className="text-center py-16">
          <Search className="w-16 h-16 mx-auto text-neutral-300 mb-4" />
          <h2 className="text-xl font-semibold text-neutral-900 mb-2">
            ¿Qué estás buscando?
          </h2>
          <p className="text-neutral-600 mb-8">
            Usa la barra de búsqueda para encontrar tus productos favoritos
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link 
              href="/search?q=leggings"
              className="px-4 py-2 bg-rose-50 text-rose-700 rounded-full hover:bg-rose-100 transition-colors"
            >
              Leggings
            </Link>
            <Link 
              href="/search?q=tops"
              className="px-4 py-2 bg-rose-50 text-rose-700 rounded-full hover:bg-rose-100 transition-colors"
            >
              Tops
            </Link>
            <Link 
              href="/search?q=suplex"
              className="px-4 py-2 bg-rose-50 text-rose-700 rounded-full hover:bg-rose-100 transition-colors"
            >
              Suplex
            </Link>
            <Link 
              href="/search?q=algodón"
              className="px-4 py-2 bg-rose-50 text-rose-700 rounded-full hover:bg-rose-100 transition-colors"
            >
              Algodón
            </Link>
          </div>
        </div>
      ) : results.length === 0 ? (
        <div className="text-center py-16">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-neutral-100 mb-6">
            <Search className="w-10 h-10 text-neutral-400" />
          </div>
          <h2 className="text-2xl font-bold text-neutral-900 mb-3">
            No se encontraron productos
          </h2>
          <p className="text-neutral-600 mb-8 max-w-md mx-auto">
            No encontramos productos para "{query}". Intenta con otros términos o explora nuestras categorías.
          </p>
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-neutral-900 mb-3">Sugerencias:</h3>
              <ul className="text-sm text-neutral-600 space-y-1 max-w-md mx-auto">
                <li>• Verifica la ortografía</li>
                <li>• Intenta con palabras más generales</li>
                <li>• Usa sinónimos o términos relacionados</li>
              </ul>
            </div>
            <div className="pt-4">
              <h3 className="text-sm font-semibold text-neutral-900 mb-3">Explora por categoría:</h3>
              <div className="flex flex-wrap gap-2 justify-center">
                <Link 
                  href="/mujer"
                  className="px-4 py-2 border border-neutral-300 text-neutral-700 rounded-full hover:border-rose-600 hover:text-rose-600 transition-colors"
                >
                  Ver todo Mujer
                </Link>
                <Link 
                  href="/nina"
                  className="px-4 py-2 border border-neutral-300 text-neutral-700 rounded-full hover:border-rose-600 hover:text-rose-600 transition-colors"
                >
                  Ver todo Niña
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <ProductGrid items={results} />
      )}
    </main>
  )
}
