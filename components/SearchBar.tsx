"use client"

import { useState, useEffect, useRef } from "react"
import { Search, X, TrendingUp, Clock } from "lucide-react"
import { useRouter } from "next/navigation"
import { searchProducts } from "@/lib/search"
import type { Product } from "@/data/products"
import Image from "next/image"
import Link from "next/link"
import { trackSearch } from "@/lib/analytics"

const POPULAR_SEARCHES = [
  "leggings",
  "tops",
  "suplex",
  "algodón",
  "negro",
  "shorts",
]

export default function SearchBar() {
  const [query, setQuery] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const [results, setResults] = useState<Product[]>([])
  const [recentSearches, setRecentSearches] = useState<string[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  // Cargar búsquedas recientes del localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("recent-searches")
      if (saved) {
        setRecentSearches(JSON.parse(saved).slice(0, 5))
      }
    } catch (error) {
      console.error("Error loading recent searches:", error)
    }
  }, [])

  // Cerrar dropdown al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Búsqueda con debounce
  useEffect(() => {
    if (!query.trim()) {
      setResults([])
      setIsSearching(false)
      return
    }

    setIsSearching(true)
    const timer = setTimeout(() => {
      const searchResults = searchProducts(query)
      setResults(searchResults.slice(0, 8)) // Limitar a 8 resultados
      setIsSearching(false)
    }, 300)

    return () => clearTimeout(timer)
  }, [query])

  // Guardar búsqueda en historial
  const saveSearch = (searchTerm: string) => {
    if (!searchTerm.trim()) return

    try {
      const updated = [
        searchTerm,
        ...recentSearches.filter((s) => s !== searchTerm),
      ].slice(0, 5)

      setRecentSearches(updated)
      localStorage.setItem("recent-searches", JSON.stringify(updated))
    } catch (error) {
      console.error("Error saving search:", error)
    }
  }

  // Manejar búsqueda completa (Enter o click en "Ver todos")
  const handleSearch = (searchTerm: string = query) => {
    if (!searchTerm.trim()) return

    saveSearch(searchTerm)
    trackSearch(searchTerm) // Analytics
    setIsOpen(false)
    setQuery("")
    router.push(`/search?q=${encodeURIComponent(searchTerm)}`)
  }

  // Manejar click en sugerencia
  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion)
    handleSearch(suggestion)
  }

  // Limpiar búsquedas recientes
  const clearRecentSearches = () => {
    setRecentSearches([])
    localStorage.removeItem("recent-searches")
  }

  return (
    <div ref={searchRef} className="relative w-full max-w-2xl">
      {/* Input de búsqueda */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
        <input
          ref={inputRef}
          type="text"
          placeholder="Buscar productos..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setIsOpen(true)
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch()
            }
          }}
          className="w-full pl-12 pr-12 py-3 rounded-full border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all"
        />
        {query && (
          <button
            onClick={() => {
              setQuery("")
              setResults([])
              inputRef.current?.focus()
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Dropdown de resultados */}
      {isOpen && (
        <div className="absolute top-full mt-2 w-full bg-white rounded-2xl shadow-xl border border-neutral-200 overflow-hidden z-50 max-h-[600px] overflow-y-auto">
          {/* Búsquedas recientes */}
          {!query && recentSearches.length > 0 && (
            <div className="p-4 border-b border-neutral-200">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-neutral-900 flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Búsquedas recientes
                </h3>
                <button
                  onClick={clearRecentSearches}
                  className="text-xs text-rose-600 hover:text-rose-700 font-medium"
                >
                  Limpiar
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {recentSearches.map((search, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(search)}
                    className="px-3 py-1.5 text-sm bg-neutral-100 hover:bg-neutral-200 rounded-full transition-colors"
                  >
                    {search}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Búsquedas populares */}
          {!query && (
            <div className="p-4">
              <h3 className="text-sm font-semibold text-neutral-900 mb-3 flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                Búsquedas populares
              </h3>
              <div className="flex flex-wrap gap-2">
                {POPULAR_SEARCHES.map((search) => (
                  <button
                    key={search}
                    onClick={() => handleSuggestionClick(search)}
                    className="px-3 py-1.5 text-sm bg-rose-50 text-rose-700 hover:bg-rose-100 rounded-full transition-colors"
                  >
                    {search}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Resultados de búsqueda */}
          {query && (
            <>
              {isSearching ? (
                <div className="p-8 text-center text-neutral-500">
                  Buscando...
                </div>
              ) : results.length > 0 ? (
                <>
                  <div className="p-4">
                    <h3 className="text-sm font-semibold text-neutral-900 mb-3">
                      Productos ({results.length})
                    </h3>
                    <div className="space-y-2">
                      {results.map((product) => (
                        <Link
                          key={product.slug}
                          href={`/producto/${product.slug}`}
                          onClick={() => {
                            saveSearch(query)
                            setIsOpen(false)
                            setQuery("")
                          }}
                          className="flex items-center gap-3 p-3 rounded-lg hover:bg-neutral-50 transition-colors group"
                        >
                          <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-neutral-100">
                            <Image
                              src={product.image}
                              alt={product.title}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform"
                              sizes="64px"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-neutral-900 truncate">
                              {product.title}
                            </h4>
                            <p className="text-sm text-neutral-500">
                              {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-rose-600">
                              S/ {product.price}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                  
                  {/* Ver todos los resultados */}
                  <button
                    onClick={() => handleSearch()}
                    className="w-full p-4 text-center text-sm font-semibold text-rose-600 hover:bg-rose-50 border-t border-neutral-200 transition-colors"
                  >
                    Ver todos los resultados
                  </button>
                </>
              ) : (
                <div className="p-8 text-center">
                  <p className="text-neutral-600 mb-2">
                    No se encontraron productos para "{query}"
                  </p>
                  <p className="text-sm text-neutral-500">
                    Intenta con otros términos o explora nuestras categorías
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  )
}
