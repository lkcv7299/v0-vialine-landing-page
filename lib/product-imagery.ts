import type { Product, ProductColor } from "@/data/products"

function isProductColor(entry: string | ProductColor): entry is ProductColor {
  return typeof entry === "object" && entry !== null && "image" in entry && Boolean(entry.image)
}

export function resolveProductImagery(product: Product) {
  const variant = product.colors?.find(isProductColor)
  const primaryImage = variant?.image || product.image || "/placeholder.svg"
  const fallbackImage = product.image && product.image !== primaryImage ? product.image : "/placeholder.svg"

  return {
    primaryImage,
    fallbackImage,
  }
}
