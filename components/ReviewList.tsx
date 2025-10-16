"use client"

import { CheckCircle } from "lucide-react"
import ReviewStars from "./ReviewStars"
import { getProductReviews, getAverageRating, getReviewCount } from "@/data/reviews"

type ReviewListProps = {
  productSlug: string
}

export default function ReviewList({ productSlug }: ReviewListProps) {
  const reviews = getProductReviews(productSlug)
  const averageRating = getAverageRating(productSlug)
  const reviewCount = getReviewCount(productSlug)

  if (reviews.length === 0) {
    return null // No mostrar nada si no hay reviews
  }

  // Formatear fecha
  function formatDate(dateString: string): string {
    const date = new Date(dateString)
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }
    return date.toLocaleDateString('es-ES', options)
  }

  return (
    <div className="mt-12 pt-12 border-t">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-neutral-900 mb-3">
          Opiniones de clientes
        </h2>
        <div className="flex items-center gap-4">
          <ReviewStars rating={averageRating} size="lg" />
          <div className="text-sm text-neutral-600">
            <span className="font-semibold text-neutral-900">{averageRating.toFixed(1)}</span> de 5 estrellas
            <span className="mx-2">•</span>
            <span>{reviewCount} {reviewCount === 1 ? 'opinión' : 'opiniones'}</span>
          </div>
        </div>
      </div>

      {/* Lista de reviews */}
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
                    {review.author}
                  </span>
                  {review.verified && (
                    <div className="flex items-center gap-1 text-green-600">
                      <CheckCircle className="w-4 h-4" />
                      <span className="text-xs font-medium">Verificado</span>
                    </div>
                  )}
                </div>
                <ReviewStars rating={review.rating} size="sm" />
              </div>
              <time className="text-sm text-neutral-500">
                {formatDate(review.date)}
              </time>
            </div>

            {/* Comentario */}
            <p className="text-neutral-700 leading-relaxed">
              {review.comment}
            </p>
          </div>
        ))}
      </div>

      {/* Disclaimer */}
      <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-sm text-blue-800">
          <strong>📝 Nota:</strong> Todas las opiniones provienen de clientes verificados que compraron el producto.
        </p>
      </div>
    </div>
  )
}
