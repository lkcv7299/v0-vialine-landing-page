import type { Product, ProductColor } from "@/data/products"
import ProductCardUI from "@/components/ui/ProductCard"

function resolvePrimaryImage(product: Product): string {
  const colorEntry = product.colors.find((entry): entry is ProductColor => {
    return typeof entry === "object" && "image" in entry && Boolean(entry.image)
  })

  return colorEntry?.image || product.image || "/placeholder.svg"
}

export default function ProductCard({ product }: { product: Product }) {
  const imageSrc = resolvePrimaryImage(product)
  const fallbackSrc = product.image && product.image !== imageSrc ? product.image : undefined

  return (
    <ProductCardUI
      href={`/producto/${product.slug}`}
      title={product.title}
      price={product.price}
      image={imageSrc}
      fallbackImage={fallbackSrc}
      slug={product.slug}
      badge={product.badge}
    />
  )
}
