import Link from "next/link"
import type { Product } from "@/data/products"
import { getImageUrl, type CategorySlug } from "@/lib/assets"

function mapCategory(category: Product["category"]): CategorySlug {
  if (category === "enterizos") return "enterizo"
  if (category === "leggings") return "legging"
  if (category === "bodys") return "bodys"
  if (category === "pescador") return "pescador"
  // Fallback for other categories
  return "bodys"
}

function getFirstColor(colors: Product["colors"]): string | undefined {
  if (!colors || colors.length === 0) return undefined
  const first = colors[0]
  return typeof first === "string" ? first : first.slug
}

export default function ProductCard({ product }: { product: Product }) {
  const category = mapCategory(product.category)
  const firstColor = getFirstColor(product.colors)

  const { src, fallback } = getImageUrl({
    category,
    slug: product.slug,
    color: firstColor,
  })

  return (
    <article className="group">
      <Link href={`/producto/${product.slug}`} className="block">
        <div className="aspect-[3/4] overflow-hidden rounded-2xl bg-neutral-100">
          <img
            src={src || "/placeholder.svg"}
            onError={(e) => {
              ;(e.currentTarget as HTMLImageElement).src = fallback
            }}
            alt={product.title}
            className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        </div>
        <div className="mt-4">
          <h3 className="text-lg font-semibold text-neutral-900">{product.title}</h3>
          <p className="mt-1 text-xl font-bold text-rose-600">S/ {product.price.toFixed(2)}</p>
          <span className="mt-3 inline-block text-sm text-rose-700 hover:text-rose-600 underline underline-offset-4">
            Seleccionar opciones
          </span>
        </div>
      </Link>
    </article>
  )
}
