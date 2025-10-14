import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { ProductDetailCard } from "@/components/product/ProductDetailCard"
import { findProduct, products } from "@/data/products"

type PageProps = {
  params: { slug: string }
}

export function generateStaticParams() {
  return products.map(({ slug }) => ({ slug }))
}

export function generateMetadata({ params }: PageProps): Metadata {
  const product = findProduct(params.slug)

  if (!product) {
    return {
      title: "Producto no disponible | Vialine",
      description: "Este producto no se encuentra disponible en Vialine.",
    }
  }

  const description = product.attributes?.beneficios?.length
    ? product.attributes.beneficios.join(", ")
    : `Descubre ${product.title} de Vialine.`

  return {
    title: `${product.title} | Vialine`,
    description,
    alternates: {
      canonical: `/producto/${product.slug}`,
    },
    openGraph: {
      title: `${product.title} | Vialine`,
      description,
      images: product.image
        ? [
            {
              url: product.image,
              width: 1200,
              height: 1600,
              alt: product.title,
            },
          ]
        : undefined,
    },
  }
}

export default function ProductPage({ params }: PageProps) {
  const product = findProduct(params.slug)

  if (!product) {
    notFound()
  }

  return <ProductDetailCard key={product.slug} product={product} />
}
