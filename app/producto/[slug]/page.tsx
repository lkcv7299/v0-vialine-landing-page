import { notFound } from "next/navigation"

import { findProduct } from "@/data/products"
import { ProductDetailCard } from "@/components/product/ProductDetailCard"

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = findProduct(params.slug)

  if (!product) {
    notFound()
  }

  return <ProductDetailCard product={product} />
}
