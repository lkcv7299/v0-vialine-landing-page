"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import {
  Star,
  Check,
  Trash2,
  Loader2,
  Filter,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  ShieldCheck,
  Clock
} from "lucide-react"

type Review = {
  id: string
  product_id: string
  user_id: string | null
  rating: number
  title: string | null
  comment: string
  is_verified_purchase: boolean | null
  is_approved: boolean | null
  created_at: string | null
  product?: {
    title: string
    slug: string
  }
  user?: {
    full_name: string | null
  }
}

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [totalCount, setTotalCount] = useState(0)
  const [filter, setFilter] = useState<"all" | "pending" | "approved">("pending")
  const [page, setPage] = useState(1)
  const perPage = 20
  const [actionLoading, setActionLoading] = useState<string | null>(null)

  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true)
      const supabase = createClient()

      let query = supabase
        .from("reviews")
        .select(`
          id,
          product_id,
          user_id,
          rating,
          title,
          comment,
          is_verified_purchase,
          is_approved,
          created_at
        `, { count: "exact" })
        .order("created_at", { ascending: false })
        .range((page - 1) * perPage, page * perPage - 1)

      if (filter === "pending") {
        query = query.eq("is_approved", false)
      } else if (filter === "approved") {
        query = query.eq("is_approved", true)
      }

      const { data, count, error } = await query

      if (error) {
        console.error("Error fetching reviews:", error)
        setLoading(false)
        return
      }

      // Fetch product and user info for each review
      if (data && data.length > 0) {
        const productIds = [...new Set(data.map(r => r.product_id))]
        const userIds = [...new Set(data.map(r => r.user_id).filter(Boolean))] as string[]

        const [productsResult, usersResult] = await Promise.all([
          supabase.from("products").select("id, title, slug").in("id", productIds),
          userIds.length > 0
            ? supabase.from("profiles").select("id, full_name").in("id", userIds)
            : Promise.resolve({ data: [] })
        ])

        const productsMap = new Map(productsResult.data?.map(p => [p.id, p]) || [])
        const usersMap = new Map(usersResult.data?.map(u => [u.id, u]) || [])

        const enrichedReviews: Review[] = data.map(review => ({
          ...review,
          product: productsMap.get(review.product_id),
          user: review.user_id ? usersMap.get(review.user_id) : undefined
        }))

        setReviews(enrichedReviews)
      } else {
        setReviews([])
      }

      setTotalCount(count || 0)
      setLoading(false)
    }

    fetchReviews()
  }, [page, filter])

  const approveReview = async (reviewId: string) => {
    setActionLoading(reviewId)
    const supabase = createClient()

    const { error } = await supabase
      .from("reviews")
      .update({ is_approved: true })
      .eq("id", reviewId)

    if (!error) {
      if (filter === "pending") {
        setReviews(reviews.filter(r => r.id !== reviewId))
        setTotalCount(prev => prev - 1)
      } else {
        setReviews(reviews.map(r =>
          r.id === reviewId ? { ...r, is_approved: true } : r
        ))
      }
    }

    setActionLoading(null)
  }

  const rejectReview = async (reviewId: string) => {
    if (!confirm("¿Estás seguro de rechazar esta review?")) return

    setActionLoading(reviewId)
    const supabase = createClient()

    const { error } = await supabase
      .from("reviews")
      .delete()
      .eq("id", reviewId)

    if (!error) {
      setReviews(reviews.filter(r => r.id !== reviewId))
      setTotalCount(prev => prev - 1)
    }

    setActionLoading(null)
  }

  const totalPages = Math.ceil(totalCount / perPage)

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${star <= rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
          />
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Filter tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-1 inline-flex">
        {[
          { value: "pending" as const, label: "Pendientes", icon: Clock },
          { value: "approved" as const, label: "Aprobadas", icon: Check },
          { value: "all" as const, label: "Todas", icon: Filter },
        ].map((tab) => {
          const Icon = tab.icon
          return (
            <button
              key={tab.value}
              onClick={() => {
                setFilter(tab.value)
                setPage(1)
              }}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === tab.value
                  ? "bg-pink-600 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Icon className="h-4 w-4" />
              {tab.label}
            </button>
          )
        })}
      </div>

      {/* Reviews list */}
      <div className="space-y-4">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-pink-600" />
          </div>
        ) : reviews.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
            <Star className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">
              {filter === "pending"
                ? "No hay reviews pendientes de moderación"
                : "No se encontraron reviews"}
            </p>
          </div>
        ) : (
          reviews.map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  {/* Header */}
                  <div className="flex items-center gap-3 mb-2">
                    {renderStars(review.rating)}
                    {review.is_verified_purchase && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                        <ShieldCheck className="h-3 w-3" />
                        Compra verificada
                      </span>
                    )}
                    {review.is_approved && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                        <Check className="h-3 w-3" />
                        Aprobada
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  {review.title && (
                    <h3 className="font-semibold text-gray-900 mb-1">{review.title}</h3>
                  )}

                  {/* Comment */}
                  <p className="text-gray-600 text-sm mb-3">{review.comment}</p>

                  {/* Meta */}
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-500">
                    <span>
                      Por: {review.user?.full_name || "Usuario"}
                    </span>
                    <span>•</span>
                    <span>
                      {review.created_at ? new Date(review.created_at).toLocaleDateString("es-PE", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric"
                      }) : "-"}
                    </span>
                    {review.product && (
                      <>
                        <span>•</span>
                        <Link
                          href={`/producto/${review.product.slug}`}
                          target="_blank"
                          className="inline-flex items-center gap-1 text-pink-600 hover:text-pink-700"
                        >
                          {review.product.title}
                          <ExternalLink className="h-3 w-3" />
                        </Link>
                      </>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  {actionLoading === review.id ? (
                    <Loader2 className="h-5 w-5 animate-spin text-gray-400" />
                  ) : (
                    <>
                      {!review.is_approved && (
                        <button
                          onClick={() => approveReview(review.id)}
                          className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                          title="Aprobar"
                        >
                          <Check className="h-5 w-5" />
                        </button>
                      )}
                      <button
                        onClick={() => rejectReview(review.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Rechazar / Eliminar"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between bg-white rounded-xl shadow-sm border border-gray-100 px-6 py-4">
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
    </div>
  )
}
