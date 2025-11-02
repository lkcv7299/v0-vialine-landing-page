import type { Product } from "@/data/products"
import ProductCardUI from "@/components/ui/ProductCard"

function resolvePrimaryImage(product: Product): string {
  const colorEntry = product.colors.find((c) => typeof c === "object" && c.image) as
    | { image: string }
    | undefined
  return colorEntry?.image || product.image || "/placeholder.svg"
}

/**
 * Encuentra una segunda imagen para el hover effect
 * Estrategia:
 * 1. Buscar la segunda imagen del mismo color (si tiene gallery)
 * 2. Si no, buscar imagen de otro color
 * 3. Si no hay, retornar null
 */
function resolveHoverImage(product: Product, primaryImage: string): string | null {
  // 1. Buscar el color que tiene la imagen primaria
  const primaryColor = product.colors.find((c) => {
    if (typeof c !== "object") return false
    // Verificar si este color tiene la imagen primaria
    if (c.image === primaryImage) return true
    if (c.images && c.images.includes(primaryImage)) return true
    return false
  }) as { image?: string; images?: string[] } | undefined

  // Si el color primario tiene gallery con más de 1 imagen, usar la segunda
  if (primaryColor?.images && primaryColor.images.length > 1) {
    const secondImage = primaryColor.images[1]
    if (secondImage && secondImage !== primaryImage) {
      return secondImage
    }
  }

  // 2. Buscar otro color con imagen diferente
  const alternativeColor = product.colors.find((c) => {
    if (typeof c !== "object") return false
    const altImage = c.images?.[0] || c.image
    return altImage && altImage !== primaryImage
  }) as { image?: string; images?: string[] } | undefined

  if (alternativeColor) {
    return alternativeColor.images?.[0] || alternativeColor.image || null
  }

  // 3. No hay segunda imagen disponible
  return null
}

export default function ProductCard({ product }: { product: Product }) {
  const imageSrc = resolvePrimaryImage(product)
  const hoverImage = resolveHoverImage(product, imageSrc)
  const fallbackSrc = product.image && product.image !== imageSrc ? product.image : "/placeholder.svg"

  return (
    <ProductCardUI
      href={`/producto/${product.slug}`}
      title={product.title}
      price={product.price}
      image={imageSrc}
      hoverImage={hoverImage}
      fallbackImage={fallbackSrc}
      slug={product.slug}
      badge={product.badge}
      originalPrice={product.originalPrice}
      inventory={product.inventory}
    />
  )
}
