import type { Metadata } from "next"
import { notFound } from "next/navigation"

import ProductDetailCard from "@/components/product/ProductDetailCard"
import { findProduct, products } from "@/data/products"

type ProductPageProps = {
  params: {
    slug: string
  }
}

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }))
}

export function generateMetadata({ params }: ProductPageProps): Metadata {
  const product = findProduct(params.slug)

  if (!product) {
    return {
      title: "Producto no encontrado | Vialine",
      description: "El producto que buscas no está disponible.",
    }
  }

  const colorNames = (product.colors ?? []).map((color) =>
    typeof color === "string" ? color : color.name,
  )

  const descriptionSegments = [
    `Descubre ${product.title} de la colección Vialine.`,
    product.sizes.length > 0 ? `Tallas disponibles: ${product.sizes.join(", ")}.` : undefined,
    colorNames.length > 0 ? `Colores: ${colorNames.join(", ")}.` : undefined,
  ].filter(Boolean) as string[]

  return {
    title: `${product.title} | Vialine`,
    description: descriptionSegments.join(" ") || undefined,
  }
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = findProduct(params.slug)

  if (!product) {
    notFound()
  }

  return <ProductDetailCard key={product.slug} product={product} />
}
