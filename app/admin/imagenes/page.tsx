"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { products, type Product } from "@/data/products"
import { ChevronDown, ChevronUp, RotateCcw, Save, Check, Search, Filter } from "lucide-react"

interface ImageTransform {
  x: number
  y: number
  scale: number
  context: "card"
  containerWidth: number
}

interface ProductTransforms {
  [productSlug: string]: {
    [colorSlug: string]: {
      [imageIndex: number]: {
        [context: string]: ImageTransform
      }
    }
  }
}

// Tamaño del contenedor de preview (mismo aspect ratio que las cards)
const PREVIEW_WIDTH = 280
const PREVIEW_HEIGHT = Math.round(PREVIEW_WIDTH * (4 / 3)) // aspect-[3/4]

function getPrimaryImage(product: Product): { image: string; colorSlug: string } {
  const colorEntry = product.colors.find((c) => typeof c === "object" && (c.image || c.images)) as
    | { image?: string; images?: string[]; slug: string }
    | undefined

  if (colorEntry) {
    return {
      image: colorEntry.images?.[0] || colorEntry.image || product.image || "/placeholder.svg",
      colorSlug: colorEntry.slug,
    }
  }

  return { image: product.image || "/placeholder.svg", colorSlug: "" }
}

function ProductImageEditor({
  product,
  transforms,
  onSave,
}: {
  product: Product
  transforms: ProductTransforms
  onSave: (productSlug: string, colorSlug: string, imageIndex: number, transform: ImageTransform) => void
}) {
  const { image, colorSlug } = getPrimaryImage(product)
  const imageIndex = 0

  // Cargar transform existente
  const existingTransform = transforms[product.slug]?.[colorSlug]?.[imageIndex]?.card

  const [x, setX] = useState(existingTransform?.x || 0)
  const [y, setY] = useState(existingTransform?.y || 0)
  const [scale, setScale] = useState(existingTransform?.scale || 1)
  const [saved, setSaved] = useState(false)
  const [expanded, setExpanded] = useState(false)

  // Resetear saved cuando cambian los valores
  useEffect(() => {
    setSaved(false)
  }, [x, y, scale])

  // Actualizar cuando cambian los transforms externos
  useEffect(() => {
    const existing = transforms[product.slug]?.[colorSlug]?.[imageIndex]?.card
    if (existing) {
      setX(existing.x)
      setY(existing.y)
      setScale(existing.scale)
    }
  }, [transforms, product.slug, colorSlug, imageIndex])

  const handleSave = () => {
    onSave(product.slug, colorSlug, imageIndex, {
      x,
      y,
      scale,
      context: "card",
      containerWidth: PREVIEW_WIDTH,
    })
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const handleReset = () => {
    setX(0)
    setY(0)
    setScale(1)
  }

  const hasChanges =
    x !== (existingTransform?.x || 0) ||
    y !== (existingTransform?.y || 0) ||
    scale !== (existingTransform?.scale || 1)

  return (
    <div className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
      {/* Header clickeable */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between p-4 hover:bg-neutral-50 transition"
      >
        <div className="flex items-center gap-3">
          {/* Mini preview */}
          <div
            className="w-12 h-16 rounded overflow-hidden flex-shrink-0 border border-neutral-200"
            style={{ backgroundColor: "#FFFFFF" }}
          >
            <Image
              src={image}
              alt={product.title}
              width={48}
              height={64}
              className="w-full h-full object-cover"
              style={{
                transform: `translate(${x * (48 / PREVIEW_WIDTH)}px, ${y * (64 / PREVIEW_HEIGHT)}px) scale(${scale})`,
              }}
            />
          </div>
          <div className="text-left">
            <p className="font-medium text-neutral-900">{product.title}</p>
            <p className="text-xs text-neutral-500">{product.category}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {existingTransform && (
            <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">Ajustado</span>
          )}
          {hasChanges && <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded">Sin guardar</span>}
          {expanded ? <ChevronUp className="w-5 h-5 text-neutral-400" /> : <ChevronDown className="w-5 h-5 text-neutral-400" />}
        </div>
      </button>

      {/* Panel expandido */}
      {expanded && (
        <div className="border-t border-neutral-200 p-4">
          <div className="flex gap-6">
            {/* Preview grande con fondo BLANCO */}
            <div
              className="flex-shrink-0 rounded-lg overflow-hidden border-2 border-neutral-300"
              style={{
                width: PREVIEW_WIDTH,
                height: PREVIEW_HEIGHT,
                backgroundColor: "#FFFFFF",
              }}
            >
              <div className="relative w-full h-full overflow-hidden">
                <Image
                  src={image}
                  alt={product.title}
                  fill
                  className="object-cover"
                  style={{
                    transform: `translate(${x}px, ${y}px) scale(${scale})`,
                    transformOrigin: "center center",
                  }}
                />
              </div>
            </div>

            {/* Controles */}
            <div className="flex-1 space-y-4">
              {/* Posición Y */}
              <div>
                <div className="flex justify-between mb-1">
                  <label className="text-sm font-medium text-neutral-700">Posición Y (Vertical)</label>
                  <span className="text-sm text-neutral-500">{y}px</span>
                </div>
                <input
                  type="range"
                  min={-150}
                  max={150}
                  value={y}
                  onChange={(e) => setY(Number(e.target.value))}
                  className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-rose-600"
                />
                <div className="flex justify-between text-xs text-neutral-400 mt-1">
                  <span>↑ Arriba</span>
                  <span>↓ Abajo</span>
                </div>
              </div>

              {/* Posición X */}
              <div>
                <div className="flex justify-between mb-1">
                  <label className="text-sm font-medium text-neutral-700">Posición X (Horizontal)</label>
                  <span className="text-sm text-neutral-500">{x}px</span>
                </div>
                <input
                  type="range"
                  min={-100}
                  max={100}
                  value={x}
                  onChange={(e) => setX(Number(e.target.value))}
                  className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-rose-600"
                />
                <div className="flex justify-between text-xs text-neutral-400 mt-1">
                  <span>← Izquierda</span>
                  <span>→ Derecha</span>
                </div>
              </div>

              {/* Escala */}
              <div>
                <div className="flex justify-between mb-1">
                  <label className="text-sm font-medium text-neutral-700">Escala (Tamaño)</label>
                  <span className="text-sm text-neutral-500">{(scale * 100).toFixed(0)}%</span>
                </div>
                <input
                  type="range"
                  min={0.5}
                  max={2}
                  step={0.05}
                  value={scale}
                  onChange={(e) => setScale(Number(e.target.value))}
                  className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-rose-600"
                />
                <div className="flex justify-between text-xs text-neutral-400 mt-1">
                  <span>50%</span>
                  <span>200%</span>
                </div>
              </div>

              {/* Botones */}
              <div className="flex gap-2 pt-2">
                <button
                  onClick={handleReset}
                  className="flex items-center gap-1.5 px-3 py-2 text-sm text-neutral-600 hover:bg-neutral-100 rounded-lg transition"
                >
                  <RotateCcw className="w-4 h-4" />
                  Resetear
                </button>
                <button
                  onClick={handleSave}
                  disabled={!hasChanges}
                  className={`flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg transition ${
                    saved
                      ? "bg-green-600 text-white"
                      : hasChanges
                        ? "bg-rose-600 text-white hover:bg-rose-700"
                        : "bg-neutral-200 text-neutral-400 cursor-not-allowed"
                  }`}
                >
                  {saved ? (
                    <>
                      <Check className="w-4 h-4" />
                      Guardado
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      Guardar
                    </>
                  )}
                </button>
              </div>

              {/* Info */}
              <p className="text-xs text-neutral-400">
                Los cambios se aplican en tiempo real. Presiona "Guardar" para que persistan.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default function AdminImagenesPage() {
  const [transforms, setTransforms] = useState<ProductTransforms>({})
  const [search, setSearch] = useState("")
  const [filterCategory, setFilterCategory] = useState<string>("todas")
  const [showOnlyUnadjusted, setShowOnlyUnadjusted] = useState(false)

  // Cargar transforms de localStorage
  useEffect(() => {
    const saved = localStorage.getItem("imageTransforms")
    if (saved) {
      try {
        setTransforms(JSON.parse(saved))
      } catch (e) {
        console.error("Error loading transforms:", e)
      }
    }
  }, [])

  const handleSave = (
    productSlug: string,
    colorSlug: string,
    imageIndex: number,
    transform: ImageTransform
  ) => {
    const updated = {
      ...transforms,
      [productSlug]: {
        ...transforms[productSlug],
        [colorSlug]: {
          ...transforms[productSlug]?.[colorSlug],
          [imageIndex]: {
            ...transforms[productSlug]?.[colorSlug]?.[imageIndex],
            card: transform,
          },
        },
      },
    }

    setTransforms(updated)
    localStorage.setItem("imageTransforms", JSON.stringify(updated))
    window.dispatchEvent(new CustomEvent("imageTransformsUpdated"))
  }

  // Filtrar productos
  const categories = [...new Set(products.map((p) => p.category))]

  const filteredProducts = products.filter((product) => {
    // Búsqueda por nombre
    if (search && !product.title.toLowerCase().includes(search.toLowerCase())) {
      return false
    }

    // Filtro por categoría
    if (filterCategory !== "todas" && product.category !== filterCategory) {
      return false
    }

    // Solo sin ajustar
    if (showOnlyUnadjusted) {
      const { colorSlug } = getPrimaryImage(product)
      const hasAdjustment = transforms[product.slug]?.[colorSlug]?.[0]?.card
      if (hasAdjustment) return false
    }

    return true
  })

  const adjustedCount = products.filter((p) => {
    const { colorSlug } = getPrimaryImage(p)
    return transforms[p.slug]?.[colorSlug]?.[0]?.card
  }).length

  return (
    <main className="min-h-screen bg-neutral-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-neutral-900">Editor de Imágenes</h1>
          <p className="text-neutral-600 mt-1">
            Ajusta la posición y escala de las imágenes de productos
          </p>
          <div className="flex gap-4 mt-4 text-sm">
            <span className="text-neutral-500">
              Total: <strong>{products.length}</strong> productos
            </span>
            <span className="text-green-600">
              Ajustados: <strong>{adjustedCount}</strong>
            </span>
            <span className="text-amber-600">
              Sin ajustar: <strong>{products.length - adjustedCount}</strong>
            </span>
          </div>
        </div>

        {/* Filtros */}
        <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-4 mb-6">
          <div className="flex flex-wrap gap-4">
            {/* Búsqueda */}
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                <input
                  type="text"
                  placeholder="Buscar producto..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
              </div>
            </div>

            {/* Categoría */}
            <div className="min-w-[150px]">
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="w-full px-3 py-2 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
              >
                <option value="todas">Todas las categorías</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {/* Solo sin ajustar */}
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={showOnlyUnadjusted}
                onChange={(e) => setShowOnlyUnadjusted(e.target.checked)}
                className="w-4 h-4 rounded border-neutral-300 text-rose-600 focus:ring-rose-500"
              />
              <span className="text-sm text-neutral-700">Solo sin ajustar</span>
            </label>
          </div>
        </div>

        {/* Lista de productos */}
        <div className="space-y-3">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12 text-neutral-500">
              No se encontraron productos
            </div>
          ) : (
            filteredProducts.map((product) => (
              <ProductImageEditor
                key={product.slug}
                product={product}
                transforms={transforms}
                onSave={handleSave}
              />
            ))
          )}
        </div>

        {/* Info */}
        <div className="mt-8 p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <p className="text-sm text-amber-800">
            <strong>Nota:</strong> Los ajustes se guardan en tu navegador (localStorage).
            Si quieres que sean permanentes en producción, necesitarás exportarlos.
          </p>
        </div>
      </div>
    </main>
  )
}
