"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { CheckCircle, Star } from "lucide-react"
import ReviewStars from "./ReviewStars"
import { toast } from "sonner"

type ReviewListProps = {
  productSlug: string
}

type Review = {
  id: number
  product_slug: string
  user_name: string
  rating: number
  title: string | null
  comment: string
  verified_purchase: boolean
  created_at: string
}

type ReviewStats = {
  total_reviews: number
  average_rating: number
  five_star: number
  four_star: number
  three_star: number
  two_star: number
  one_star: number
}

export default function ReviewList({ productSlug }: ReviewListProps) {
  const { data: session } = useSession()
  const [reviews, setReviews] = useState<Review[]>([])
  const [allReviews, setAllReviews] = useState<Review[]>([]) // ✅ Guardamos todas las reviews
  const [stats, setStats] = useState<ReviewStats>({
    total_reviews: 0,
    average_rating: 0,
    five_star: 0,
    four_star: 0,
    three_star: 0,
    two_star: 0,
    one_star: 0,
  })
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [title, setTitle] = useState("")
  const [comment, setComment] = useState("")
  const [filterStars, setFilterStars] = useState<number | null>(null) // ✅ Filtro activo

  // Fetch reviews
  useEffect(() => {
    async function fetchReviews() {
      try {
        const response = await fetch(`/api/reviews/${productSlug}`)
        if (response.ok) {
          const data = await response.json()
          setAllReviews(data.reviews || []) // ✅ Guardamos todas
          setReviews(data.reviews || []) // ✅ Mostramos todas inicialmente
          setStats(data.stats || {
            total_reviews: 0,
            average_rating: 0,
            five_star: 0,
            four_star: 0,
            three_star: 0,
            two_star: 0,
            one_star: 0,
          })
        }
      } catch (error) {
        console.error("Error fetching reviews:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchReviews()
  }, [productSlug])

  // ✅ Filtrar reviews cuando cambia el filtro
  useEffect(() => {
    if (filterStars === null) {
      setReviews(allReviews)
    } else {
      setReviews(allReviews.filter(r => r.rating === filterStars))
    }
  }, [filterStars, allReviews])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!session) {
      toast.error("Debes iniciar sesión para dejar una reseña")
      return
    }

    if (rating === 0) {
      toast.error("Por favor selecciona una calificación")
      return
    }

    if (comment.length < 10) {
      toast.error("El comentario debe tener al menos 10 caracteres")
      return
    }

    setSubmitting(true)

    try {
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productSlug,
          rating,
          title: title || null,
          comment,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        toast.success("¡Reseña enviada exitosamente!")
        setShowForm(false)
        setRating(0)
        setTitle("")
        setComment("")

        // Refresh reviews
        const refreshResponse = await fetch(`/api/reviews/${productSlug}`)
        if (refreshResponse.ok) {
          const refreshData = await refreshResponse.json()
          setAllReviews(refreshData.reviews || [])
          setReviews(refreshData.reviews || [])
          setStats(refreshData.stats)
          setFilterStars(null) // Reset filter
        }
      } else {
        toast.error(data.error || "Error al enviar la reseña")
      }
    } catch (error) {
      console.error("Error submitting review:", error)
      toast.error("Error al enviar la reseña")
    } finally {
      setSubmitting(false)
    }
  }

  const averageRating = stats.average_rating || 0
  const reviewCount = stats.total_reviews || 0
  const MIN_REVIEWS_FOR_RATING = 5 // Solo mostrar rating promedio con 5+ reseñas

  // Formatear fecha
  function formatDate(dateString: string): string {
    const date = new Date(dateString)
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
    return date.toLocaleDateString("es-ES", options)
  }

  if (loading) {
    return (
      <div className="mt-12 pt-12 border-t">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-neutral-200 rounded w-1/3"></div>
          <div className="h-4 bg-neutral-200 rounded w-1/4"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="mt-12 pt-12 border-t">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-start justify-between mb-4">
          <h2 className="text-2xl font-bold text-neutral-900">
            Opiniones de clientes
          </h2>
          {session && (
            <button
              onClick={() => setShowForm(!showForm)}
              className="px-4 py-2 bg-rose-600 text-white rounded-lg font-semibold hover:bg-rose-700 transition text-sm"
            >
              {showForm ? "Cancelar" : "Escribir reseña"}
            </button>
          )}
        </div>

        {reviewCount >= MIN_REVIEWS_FOR_RATING && (
          <>
            <div className="flex items-center gap-4 mb-6">
              <ReviewStars rating={averageRating} size="lg" />
              <div className="text-sm text-neutral-600">
                <span className="font-semibold text-neutral-900">
                  {averageRating.toFixed(1)}
                </span>{" "}
                de 5 estrellas
                <span className="mx-2">•</span>
                <span>
                  {reviewCount} {reviewCount === 1 ? "opinión" : "opiniones"}
                </span>
              </div>
            </div>

            {/* ✅ GRÁFICO DE DISTRIBUCIÓN DE ESTRELLAS */}
            <div className="space-y-2 mb-6">
              {[5, 4, 3, 2, 1].map((stars) => {
                const count = stats[`${['five', 'four', 'three', 'two', 'one'][5 - stars]}_star` as keyof ReviewStats] as number
                const percentage = reviewCount > 0 ? (count / reviewCount) * 100 : 0

                return (
                  <button
                    key={stars}
                    onClick={() => setFilterStars(filterStars === stars ? null : stars)}
                    className={`w-full flex items-center gap-3 p-2 rounded-lg transition hover:bg-neutral-100 ${
                      filterStars === stars ? 'bg-rose-50 border border-rose-200' : ''
                    }`}
                  >
                    <span className="text-sm font-medium text-neutral-700 w-12">
                      {stars} ★
                    </span>
                    <div className="flex-1 h-2 bg-neutral-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-amber-500 transition-all"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="text-sm text-neutral-600 w-12 text-right">
                      {count}
                    </span>
                  </button>
                )
              })}
            </div>

            {/* ✅ INDICADOR DE FILTRO ACTIVO */}
            {filterStars && (
              <div className="mb-4 flex items-center gap-2 text-sm">
                <span className="text-neutral-600">
                  Mostrando reseñas de {filterStars} estrellas
                </span>
                <button
                  onClick={() => setFilterStars(null)}
                  className="text-rose-600 hover:text-rose-700 font-medium"
                >
                  Ver todas
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Formulario para escribir review */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="mb-8 bg-neutral-50 rounded-xl p-6 border border-neutral-200"
        >
          <h3 className="text-lg font-semibold text-neutral-900 mb-4">
            Escribe tu reseña
          </h3>

          {/* Rating selector */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Calificación *
            </label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="focus:outline-none"
                >
                  <Star
                    className={`w-8 h-8 transition ${
                      star <= (hoverRating || rating)
                        ? "fill-amber-500 text-amber-500"
                        : "text-neutral-300"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Title (optional) */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Título (opcional)
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Resume tu experiencia"
              maxLength={100}
              className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none"
            />
          </div>

          {/* Comment */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Comentario *
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Cuéntanos sobre tu experiencia con este producto (mínimo 10 caracteres)"
              rows={4}
              className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none resize-none"
            />
            <div className="text-xs text-neutral-500 mt-1">
              {comment.length} / 500 caracteres
            </div>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={submitting || rating === 0 || comment.length < 10}
            className="w-full py-3 bg-rose-600 text-white rounded-lg font-semibold hover:bg-rose-700 transition disabled:bg-neutral-300 disabled:cursor-not-allowed"
          >
            {submitting ? "Enviando..." : "Publicar reseña"}
          </button>
        </form>
      )}

      {/* Lista de reviews */}
      {reviews.length > 0 ? (
        <div className="space-y-6">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-neutral-50 rounded-xl p-6 border border-neutral-200"
            >
              {/* Header de review */}
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-neutral-900">
                      {review.user_name}
                    </span>
                    {review.verified_purchase && (
                      <div className="flex items-center gap-1 text-green-600">
                        <CheckCircle className="w-4 h-4" />
                        <span className="text-xs font-medium">
                          Compra verificada
                        </span>
                      </div>
                    )}
                  </div>
                  <ReviewStars rating={review.rating} size="sm" />
                </div>
                <time className="text-sm text-neutral-500">
                  {formatDate(review.created_at)}
                </time>
              </div>

              {/* Title */}
              {review.title && (
                <h4 className="font-semibold text-neutral-900 mb-2">
                  {review.title}
                </h4>
              )}

              {/* Comentario */}
              <p className="text-neutral-700 leading-relaxed">
                {review.comment}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-neutral-600 mb-4">
            Aún no hay reseñas para este producto
          </p>
          {session && (
            <button
              onClick={() => setShowForm(true)}
              className="px-6 py-3 bg-rose-600 text-white rounded-lg font-semibold hover:bg-rose-700 transition"
            >
              Sé el primero en opinar
            </button>
          )}
        </div>
      )}

      {/* Disclaimer */}
      {reviewCount > 0 && (
        <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>📝 Nota:</strong> Las opiniones marcadas como "Compra
            verificada" provienen de clientes que compraron el producto en
            nuestra tienda.
          </p>
        </div>
      )}
    </div>
  )
}
