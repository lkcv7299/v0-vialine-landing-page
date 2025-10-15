import { Star } from "lucide-react"

type ReviewStarsProps = {
  rating: number
  size?: "sm" | "md" | "lg"
  showNumber?: boolean
  reviewCount?: number
}

export default function ReviewStars({ 
  rating, 
  size = "md", 
  showNumber = false,
  reviewCount 
}: ReviewStarsProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  }

  const starSize = sizeClasses[size]

  return (
    <div className="flex items-center gap-1">
      {/* Estrellas */}
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${starSize} ${
              star <= rating
                ? "fill-yellow-400 text-yellow-400"
                : "fill-neutral-200 text-neutral-200"
            }`}
          />
        ))}
      </div>

      {/* Número de rating y reviews */}
      {showNumber && (
        <span className="text-sm text-neutral-600 ml-1">
          {rating.toFixed(1)}
          {reviewCount !== undefined && ` (${reviewCount})`}
        </span>
      )}
    </div>
  )
}