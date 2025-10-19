"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { X, Filter } from "lucide-react"
import { useState, useEffect } from "react"

type ProductFiltersDesktopProps = {
  totalProducts: number
  filteredCount: number
}

function toggleMulti(sp: URLSearchParams, key: string, val: string) {
  const vals = sp.getAll(key)
  const has = vals.includes(val)
  sp.delete(key)
  ;(has ? vals.filter((v) => v !== val) : [...vals, val]).forEach((v) => sp.append(key, v))
}

function toggleSingle(sp: URLSearchParams, key: string, val: string) {
  if (sp.get(key) === val) sp.delete(key)
  else sp.set(key, val)
}

export default function ProductFiltersDesktop({ totalProducts, filteredCount }: ProductFiltersDesktopProps) {
  const router = useRouter()
  const pathname = usePathname()
  const params = useSearchParams()
  const [localMinPrice, setLocalMinPrice] = useState("")
  const [localMaxPrice, setLocalMaxPrice] = useState("")

  // Sincronizar con URL params
  useEffect(() => {
    setLocalMinPrice(params?.get("minPrice") || "")
    setLocalMaxPrice(params?.get("maxPrice") || "")
  }, [params])

  function apply(fn: (sp: URLSearchParams) => void) {
    const sp = new URLSearchParams(params?.toString())
    fn(sp)
    router.replace(`${pathname}?${sp.toString()}`, { scroll: false })
  }

  // ✅ Debouncing para precio (500ms después de dejar de escribir)
  useEffect(() => {
    const timer = setTimeout(() => {
      apply((sp) => {
        if (localMinPrice) {
          sp.set("minPrice", localMinPrice)
        } else {
          sp.delete("minPrice")
        }
      })
    }, 500)
    return () => clearTimeout(timer)
  }, [localMinPrice])

  useEffect(() => {
    const timer = setTimeout(() => {
      apply((sp) => {
        if (localMaxPrice) {
          sp.set("maxPrice", localMaxPrice)
        } else {
          sp.delete("maxPrice")
        }
      })
    }, 500)
    return () => clearTimeout(timer)
  }, [localMaxPrice])

  const isOn = (k: string, v: string) => params?.getAll(k).includes(v)
  const fabricOn = params?.get("fabric")
  const categoryOn = params?.get("category")
  const minPrice = params?.get("minPrice") || ""
  const maxPrice = params?.get("maxPrice") || ""

  // Opciones de filtros
  const sizes = ["XS", "S", "M", "L", "XL"]
  const colors = [
    "Negro",
    "Blanco",
    "Gris",
    "Rojo",
    "Azul",
    "Azul marino",
    "Azulino",
    "Rosado",
    "Beige",
    "Charcol",
    "Melange",
  ]
  const fabrics = [
    { value: "suplex", label: "Suplex" },
    { value: "algodon", label: "Algodón" },
  ]
  const categories = [
    { value: "leggings", label: "Leggings" },
    { value: "bikers", label: "Bikers" },
    { value: "shorts", label: "Shorts" },
    { value: "tops", label: "Tops" },
    { value: "bodys", label: "Bodys" },
    { value: "camisetas", label: "Camisetas" },
    { value: "enterizos", label: "Enterizos" },
    { value: "pescador", label: "Pescador" },
    { value: "torero", label: "Torero" },
  ]

  // Contar filtros activos
  const activeFiltersCount = 
    params?.getAll("size").length +
    params?.getAll("color").length +
    (fabricOn ? 1 : 0) +
    (categoryOn ? 1 : 0) +
    (minPrice ? 1 : 0) +
    (maxPrice ? 1 : 0)

  // Obtener filtros activos para mostrar chips
  const activeFilters: { type: string; value: string; label: string }[] = []
  
  params?.getAll("size").forEach((size) => {
    activeFilters.push({ type: "size", value: size, label: `Talla ${size}` })
  })
  
  params?.getAll("color").forEach((color) => {
    activeFilters.push({ type: "color", value: color, label: color })
  })
  
  if (fabricOn) {
    const fabric = fabrics.find((f) => f.value === fabricOn)
    activeFilters.push({ type: "fabric", value: fabricOn, label: fabric?.label || fabricOn })
  }
  
  if (categoryOn) {
    const category = categories.find((c) => c.value === categoryOn)
    activeFilters.push({ type: "category", value: categoryOn, label: category?.label || categoryOn })
  }
  
  if (minPrice) {
    activeFilters.push({ type: "minPrice", value: minPrice, label: `Desde S/ ${minPrice}` })
  }
  
  if (maxPrice) {
    activeFilters.push({ type: "maxPrice", value: maxPrice, label: `Hasta S/ ${maxPrice}` })
  }

  // Remover filtro individual
  const removeFilter = (type: string, value: string) => {
    apply((sp) => {
      if (type === "size" || type === "color") {
        toggleMulti(sp, type, value)
      } else {
        sp.delete(type)
      }
    })
  }

  return (
    <aside className="hidden lg:block w-[280px] h-fit">
      {/* Contenedor principal con scroll interno si es necesario */}
      <div className="rounded-2xl border border-neutral-200 bg-white overflow-hidden max-h-[calc(100vh-120px)] flex flex-col">
        
        {/* Header fijo */}
        <div className="flex items-center justify-between p-4 border-b border-neutral-200 bg-white">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-rose-600" />
            <span className="font-semibold text-neutral-900">Filtros</span>
            {activeFiltersCount > 0 && (
              <span className="px-2 py-0.5 text-xs font-semibold bg-rose-600 text-white rounded-full">
                {activeFiltersCount}
              </span>
            )}
          </div>
        </div>

        {/* Área scrolleable */}
        <div className="overflow-y-auto flex-1">
          <div className="p-4 space-y-6">
            {/* Contador de productos */}
            <div className="pb-4 border-b border-neutral-200">
              <p className="text-sm text-neutral-600">
                Mostrando <span className="font-semibold text-neutral-900">{filteredCount}</span> de{" "}
                <span className="font-semibold text-neutral-900">{totalProducts}</span> productos
              </p>
            </div>

            {/* Filtros activos (chips removibles) */}
            {activeFilters.length > 0 && (
              <div className="pb-4 border-b border-neutral-200">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-semibold text-neutral-900">Filtros aplicados</h4>
                  <button
                    onClick={() => router.replace(pathname, { scroll: false })}
                    className="text-xs text-rose-600 hover:text-rose-700 font-medium"
                  >
                    Limpiar todo
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {activeFilters.map((filter, index) => (
                    <button
                      key={`${filter.type}-${filter.value}-${index}`}
                      onClick={() => removeFilter(filter.type, filter.value)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-rose-50 text-rose-700 text-xs font-medium rounded-full hover:bg-rose-100 transition-colors"
                    >
                      {filter.label}
                      <X className="w-3 h-3" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Filtro por precio */}
            <div>
              <h4 className="font-semibold text-neutral-900 mb-3">Precio</h4>
              <div className="flex items-center gap-2">
                <div className="flex-1">
                  <label className="text-xs text-neutral-600 mb-1 block">Desde</label>
                  <input
                    type="number"
                    placeholder="Min"
                    value={localMinPrice}
                    onChange={(e) => setLocalMinPrice(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
                  />
                </div>
                <span className="text-neutral-400 mt-5">-</span>
                <div className="flex-1">
                  <label className="text-xs text-neutral-600 mb-1 block">Hasta</label>
                  <input
                    type="number"
                    placeholder="Max"
                    value={localMaxPrice}
                    onChange={(e) => setLocalMaxPrice(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
                  />
                </div>
              </div>
            </div>

            {/* Filtro por categoría */}
            <div>
              <h4 className="font-semibold text-neutral-900 mb-3">Categoría</h4>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat.value}
                    onClick={() => apply((sp) => toggleSingle(sp, "category", cat.value))}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                      categoryOn === cat.value
                        ? "bg-rose-600 text-white"
                        : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Filtro por talla */}
            <div>
              <h4 className="font-semibold text-neutral-900 mb-3">Talla</h4>
              <div className="flex flex-wrap gap-2">
                {sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => apply((sp) => toggleMulti(sp, "size", s))}
                    className={`w-12 h-12 rounded-lg text-sm font-semibold transition-all ${
                      isOn("size", s)
                        ? "bg-rose-600 text-white ring-2 ring-rose-600 ring-offset-2"
                        : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Filtro por color */}
            <div>
              <h4 className="font-semibold text-neutral-900 mb-3">Color</h4>
              <div className="flex flex-wrap gap-2">
                {colors.map((c) => (
                  <button
                    key={c}
                    onClick={() => apply((sp) => toggleMulti(sp, "color", c))}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                      isOn("color", c)
                        ? "bg-rose-600 text-white"
                        : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* Filtro por tejido */}
            <div>
              <h4 className="font-semibold text-neutral-900 mb-3">Tejido</h4>
              <div className="flex flex-wrap gap-2">
                {fabrics.map((f) => (
                  <button
                    key={f.value}
                    onClick={() => apply((sp) => toggleSingle(sp, "fabric", f.value))}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      fabricOn === f.value
                        ? "bg-rose-600 text-white"
                        : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Ordenar por */}
            <div>
              <h4 className="font-semibold text-neutral-900 mb-3">Ordenar por</h4>
              <select
                className="w-full rounded-lg border border-neutral-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
                value={params?.get("sort") ?? ""}
                onChange={(e) =>
                  apply((sp) => {
                    const v = e.target.value
                    v ? sp.set("sort", v) : sp.delete("sort")
                  })
                }
              >
                <option value="">Más recientes</option>
                <option value="price-asc">Precio: menor a mayor</option>
                <option value="price-desc">Precio: mayor a menor</option>
                <option value="popular">Más populares</option>
              </select>
            </div>

            {/* Botón limpiar filtros */}
            {activeFiltersCount > 0 && (
              <button
                onClick={() => router.replace(pathname, { scroll: false })}
                className="w-full py-2.5 text-sm font-semibold text-rose-700 bg-rose-50 rounded-lg hover:bg-rose-100 transition-colors"
              >
                Limpiar todos los filtros
              </button>
            )}
          </div>
        </div>
      </div>
    </aside>
  )
}