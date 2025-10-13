import { getProductBySlug } from "@/lib/products"
import ProductDetail from "@/components/ProductDetail"
import { notFound } from "next/navigation"

export default function Page({ params }: { params: { slug: string } }) {
  const product = getProductBySlug(params.slug as any)
  if (!product) return notFound()
  return <ProductDetail product={product} />
}
