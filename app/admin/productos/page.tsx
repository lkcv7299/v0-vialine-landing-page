"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { createClient } from "@/lib/supabase/client"
import {
  Search,
  Package,
  Eye,
  EyeOff,
  Loader2,
  ChevronLeft,
  ChevronRight,
  X,
  ExternalLink
} from "lucide-react"

type Product = {
  id: string
  slug: string
  title: string
  price: number
  original_price: number | null
  image_url: string | null
  category_name: string | null
  audience: string | null
  is_active: boolean | null
  is_featured: boolean | null
  total_stock: number
  created_at: string | null
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [totalCount, setTotalCount] = useState(0)
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)
  const perPage = 20

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      const supabase = createClient()

      // Build query with search filter
      let query = supabase
        .from("products")
        .select("id, slug, title, price, original_price, audience, is_active, is_featured, created_at, category_id", { count: "exact" })
        .order("created_at", { ascending: false })
        .range((page - 1) * perPage, page * perPage - 1)

      if (search) {
        query = query.or(`title.ilike.%${search}%,slug.ilike.%${search}%`)
      }

      const { data: productsData, count, error } = await query

      if (error) {
        console.error("Error fetching products:", error)
        setLoading(false)
        return
      }

      if (!productsData || productsData.length === 0) {
        setProducts([])
        setTotalCount(0)
        setLoading(false)
        return
      }

      const productIds = productsData.map(p => p.id)
      const categoryIds = productsData.map(p => p.category_id).filter(Boolean) as string[]

      // Fetch images, categories, and stock in parallel
      const [imagesResult, categoriesResult, stockResult] = await Promise.all([
        supabase
          .from("product_images")
          .select("product_id, url")
          .in("product_id", productIds)
          .eq("is_primary", true),
        categoryIds.length > 0
          ? supabase.from("categories").select("id, name").in("id", categoryIds)
          : Promise.resolve({ data: [] }),
        supabase
          .from("product_variants")
          .select("product_id, stock")
          .in("product_id", productIds)
      ])

      // Build lookup maps
      const imagesMap = new Map<string, string>()
      imagesResult.data?.forEach(img => {
        if (!imagesMap.has(img.product_id)) {
          imagesMap.set(img.product_id, img.url)
        }
      })

      const categoriesMap = new Map<string, string>()
      categoriesResult.data?.forEach(cat => {
        categoriesMap.set(cat.id, cat.name)
      })

      const stockMap = new Map<string, number>()
      stockResult.data?.forEach(v => {
        const current = stockMap.get(v.product_id) || 0
        stockMap.set(v.product_id, current + (v.stock || 0))
      })

      // Combine all data
      const enrichedProducts: Product[] = productsData.map(p => ({
        id: p.id,
        slug: p.slug,
        title: p.title,
        price: p.price,
        original_price: p.original_price,
        image_url: imagesMap.get(p.id) || null,
        category_name: p.category_id ? categoriesMap.get(p.category_id) || null : null,
        audience: p.audience,
        is_active: p.is_active,
        is_featured: p.is_featured,
        total_stock: stockMap.get(p.id) || 0,
        created_at: p.created_at
      }))

      setProducts(enrichedProducts)
      setTotalCount(count || 0)
      setLoading(false)
    }

    fetchProducts()
  }, [page, search])

  const toggleActive = async (productId: string, currentActive: boolean | null) => {
    const supabase = createClient()

    const { error } = await supabase
      .from("products")
      .update({ is_active: !currentActive })
      .eq("id", productId)

    if (!error) {
      setProducts(products.map(p =>
        p.id === productId ? { ...p, is_active: !currentActive } : p
      ))
    }
  }

  const toggleFeatured = async (productId: string, currentFeatured: boolean | null) => {
    const supabase = createClient()

    const { error } = await supabase
      .from("products")
      .update({ is_featured: !currentFeatured })
      .eq("id", productId)

    if (!error) {
      setProducts(products.map(p =>
        p.id === productId ? { ...p, is_featured: !currentFeatured } : p
      ))
    }
  }

  const totalPages = Math.ceil(totalCount / perPage)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar productos..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value)
              setPage(1)
            }}
            className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-pink-600" />
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Producto
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Precio
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Categoría
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Stock
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Estado
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Destacado
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {products.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="relative h-12 w-12 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                            {product.image_url ? (
                              <Image
                                src={product.image_url}
                                alt={product.title}
                                fill
                                className="object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <Package className="h-6 w-6 text-gray-300" />
                              </div>
                            )}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900 truncate max-w-xs">{product.title}</p>
                            <p className="text-xs text-gray-500">{product.slug}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <p className="font-medium text-gray-900">S/ {product.price?.toFixed(2)}</p>
                          {product.original_price && product.original_price > product.price && (
                            <p className="text-xs text-gray-400 line-through">
                              S/ {product.original_price.toFixed(2)}
                            </p>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-600 capitalize">
                          {product.category_name || "-"} {product.audience ? `/ ${product.audience}` : ""}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`text-sm font-medium ${product.total_stock > 10 ? "text-green-600" : product.total_stock > 0 ? "text-yellow-600" : "text-red-600"}`}>
                          {product.total_stock}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => toggleActive(product.id, product.is_active)}
                          className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium transition-colors ${
                            product.is_active
                              ? "bg-green-100 text-green-800 hover:bg-green-200"
                              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                          }`}
                        >
                          {product.is_active ? (
                            <>
                              <Eye className="h-3 w-3" />
                              Activo
                            </>
                          ) : (
                            <>
                              <EyeOff className="h-3 w-3" />
                              Oculto
                            </>
                          )}
                        </button>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => toggleFeatured(product.id, product.is_featured)}
                          className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium transition-colors ${
                            product.is_featured
                              ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                          }`}
                        >
                          {product.is_featured ? "★ Destacado" : "Normal"}
                        </button>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/producto/${product.slug}`}
                            target="_blank"
                            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                            title="Ver en tienda"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {products.length === 0 && (
                    <tr>
                      <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                        No se encontraron productos
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100">
                <p className="text-sm text-gray-500">
                  Mostrando {(page - 1) * perPage + 1} - {Math.min(page * perPage, totalCount)} de {totalCount}
                </p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setPage(page - 1)}
                    disabled={page === 1}
                    className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <span className="text-sm text-gray-600">
                    Página {page} de {totalPages}
                  </span>
                  <button
                    onClick={() => setPage(page + 1)}
                    disabled={page === totalPages}
                    className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
