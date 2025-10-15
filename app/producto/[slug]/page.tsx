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

  // Extract material info
  const materialInfo = product.attributes?.material || "Material de alta calidad"

  // Extract color names
  const colorNames = product.colors?.map((color) => (typeof color === "string" ? color : color.name)) ?? []

  // Build comprehensive description
  const description = `${product.title} de Vialine. ${materialInfo}. Tallas: ${product.sizes.join(", ")}. ${colorNames.length > 0 ? `Colores: ${colorNames.join(", ")}.` : ""} Envío gratis desde S/269. Hecho en Perú.`

  // Get image URL (variant or default)
  const imageUrl =
    typeof product.colors[0] === "object" && product.colors[0].image ? product.colors[0].image : product.image

  const fullImageUrl = `https://vialine.pe${imageUrl}`

  return {
    title: `${product.title} - S/${product.price} | Vialine`,
    description,
    openGraph: {
      title: `${product.title} - S/${product.price} | Vialine`,
      description,
      type: "website",
      locale: "es_PE",
      siteName: "Vialine",
      images: [
        {
          url: fullImageUrl,
          width: 1200,
          height: 1200,
          alt: `${product.title} - Vialine`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.title} - S/${product.price} | Vialine`,
      description,
      images: [fullImageUrl],
    },
  }
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = findProduct(params.slug)

  if (!product) {
    notFound()
  }

  const imageUrl =
    typeof product.colors[0] === "object" && product.colors[0].image ? product.colors[0].image : product.image

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    image: `https://vialine.pe${imageUrl}`,
    description: `${product.title} de Vialine. ${product.attributes?.material || "Material de alta calidad"}.`,
    brand: {
      "@type": "Brand",
      name: "Vialine",
    },
    offers: {
      "@type": "Offer",
      url: `https://vialine.pe/producto/${product.slug}`,
      priceCurrency: "PEN",
      price: product.price,
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "Organization",
        name: "Vialine",
      },
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productSchema),
        }}
      />
      <ProductDetailCard key={product.slug} product={product} />
    </>
  )
}
