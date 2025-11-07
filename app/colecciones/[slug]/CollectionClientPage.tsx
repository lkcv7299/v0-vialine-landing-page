"use client"

import Image from "next/image"
import { useRouter, useSearchParams } from "next/navigation"
import { useState, useMemo } from "react"
import { buildWhatsAppUrl } from "@/lib/contact"

type Product = {
  id: string
  name: string
  price: number
  image: string
  colors: string[]
  sizes: string[]
  fabric: string
}

type Collection = {
  title: string
  description: string
  products: Product[]
}

const allSizes = ["S", "M", "L", "XL"]
const allFabrics = ["Suplex", "Algodón Premium"]
const sortOptions = [
  { value: "newest", label: "Más recientes" },
  { value: "price-asc", label: "Precio: menor a mayor" },
  { value: "price-desc", label: "Precio: mayor a menor" },
]

export default function CollectionClientPage({ collection, slug }: { collection: Collection; slug: string }) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const initialSizes = useMemo(() => searchParams.get("sizes")?.split(",").filter(Boolean) || [], [])
  const initialFabrics = useMemo(() => searchParams.get("fabrics")?.split(",").filter(Boolean) || [], [])
  const initialSort = useMemo(() => searchParams.get("sort") || "newest", [])

  const [selectedSizes, setSelectedSizes] = useState<string[]>(initialSizes)
  const [selectedFabrics, setSelectedFabrics] = useState<string[]>(initialFabrics)
  const [sortBy, setSortBy] = useState(initialSort)

  const updateURL = (sizes: string[], fabrics: string[], sort: string) => {
    const params = new URLSearchParams()
    if (sizes.length) params.set("sizes", sizes.join(","))
    if (fabrics.length) params.set("fabrics", fabrics.join(","))
    if (sort !== "newest") params.set("sort", sort)

    const query = params.toString()
    router.push(`/colecciones/${slug}${query ? `?${query}` : ""}`, { scroll: false })
  }

  const toggleSize = (size: string) => {
    const newSizes = selectedSizes.includes(size) ? selectedSizes.filter((s) => s !== size) : [...selectedSizes, size]
    setSelectedSizes(newSizes)
    updateURL(newSizes, selectedFabrics, sortBy)
  }

  const toggleFabric = (fabric: string) => {
    const newFabrics = selectedFabrics.includes(fabric)
      ? selectedFabrics.filter((f) => f !== fabric)
      : [...selectedFabrics, fabric]
    setSelectedFabrics(newFabrics)
    updateURL(selectedSizes, newFabrics, sortBy)
  }

  const handleSortChange = (value: string) => {
    setSortBy(value)
    updateURL(selectedSizes, selectedFabrics, value)
  }

  let filteredProducts = collection.products.filter((product) => {
    const sizeMatch = selectedSizes.length === 0 || selectedSizes.some((size) => product.sizes.includes(size))
    const fabricMatch = selectedFabrics.length === 0 || selectedFabrics.includes(product.fabric)
    return sizeMatch && fabricMatch
  })

  if (sortBy === "price-asc") {
    filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price)
  } else if (sortBy === "price-desc") {
    filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price)
  }

  return (
    <>
      <div className="sticky top-16 z-40 bg-white border-b border-neutral-200 shadow-sm">
        <div className="mx-auto max-w-6xl px-4 py-4">
          <div className="flex flex-wrap items-center gap-4 md:gap-6">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-neutral-700">Talla:</span>
              <div className="flex gap-2">
                {allSizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => toggleSize(size)}
                    className={`px-3 py-1 text-sm rounded-lg border transition ${
                      selectedSizes.includes(size)
                        ? "bg-neutral-900 text-white border-neutral-900"
                        : "bg-white text-neutral-700 border-neutral-300 hover:border-neutral-400"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-neutral-700">Tela:</span>
              <div className="flex gap-2">
                {allFabrics.map((fabric) => (
                  <button
                    key={fabric}
                    onClick={() => toggleFabric(fabric)}
                    className={`px-3 py-1 text-sm rounded-lg border transition ${
                      selectedFabrics.includes(fabric)
                        ? "bg-neutral-900 text-white border-neutral-900"
                        : "bg-white text-neutral-700 border-neutral-300 hover:border-neutral-400"
                    }`}
                  >
                    {fabric}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2 ml-auto">
              <span className="text-sm font-medium text-neutral-700">Ordenar:</span>
              <select
                value={sortBy}
                onChange={(e) => handleSortChange(e.target.value)}
                className="px-3 py-1 text-sm rounded-lg border border-neutral-300 bg-white text-neutral-700 focus:outline-none focus:ring-2 focus:ring-neutral-600"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-6xl px-4 py-10">
        <div className="flex justify-end mb-8">
          <a href="/#colecciones" className="text-sm text-neutral-900 hover:text-neutral-600 underline underline-offset-4">
            Volver a colecciones
          </a>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold">{collection.title}</h1>
        <p className="mt-4 text-lg text-neutral-700 leading-relaxed">{collection.description}</p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {filteredProducts.map((product) => (
            <div key={product.id} className="group">
              <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-gray-100 relative">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                />
              </div>
              <div className="mt-3">
                <h3 className="font-semibold text-neutral-900">{product.name}</h3>
                <p className="text-sm text-neutral-600 mt-1">{product.fabric}</p>
                <div className="flex items-center justify-between mt-2">
                  <p className="text-lg font-bold text-neutral-900">S/ {product.price}</p>
                  <div className="flex gap-1.5">
                    {product.colors.map((color, idx) => (
                      <div
                        key={idx}
                        className="w-5 h-5 rounded-full border-2 border-neutral-200"
                        style={{ backgroundColor: color }}
                        title={color}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-neutral-600">No se encontraron productos con los filtros seleccionados.</p>
          </div>
        )}

        <div className="mt-12 text-center">
          <a
            href={buildWhatsAppUrl("Hola Vialine")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-5 py-3 rounded-2xl text-white font-semibold tracking-wide shadow-lg hover:bg-neutral-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900 transition uppercase bg-neutral-900"
          >
            Comprar por WhatsApp
          </a>
        </div>
      </main>
    </>
  )
}
