import type { Metadata } from "next"
import { notFound } from "next/navigation"
import ProductDetailCard from "@/components/product/ProductDetailCard"
import { findProduct, products } from "@/data/products"
import ReviewList from "@/components/ReviewList"
import RelatedProducts from "@/components/RelatedProducts"

type ProductPageProps = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }))
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params
  const product = findProduct(slug)

  if (!product) {
    return {
      title: "Producto no encontrado | Vialine",
      description: "El producto que buscas no está disponible.",
    }
  }

  // Extraer nombres de colores
  const colorNames = product.colors.map((color) => 
    typeof color === "string" ? color : color.name
  )

  // Construir descripción optimizada para SEO
  const materialInfo = product.attributes?.material || "Material de alta calidad"
  const description = `${product.title} de Vialine. ${materialInfo}. Tallas disponibles: ${product.sizes.join(", ")}. ${colorNames.length > 0 ? `Colores: ${colorNames.join(", ")}.` : ""} Envío gratis desde S/ 269. Hecho en Perú.`

  // Obtener imagen principal (con variante de color si existe)
  const imageUrl = typeof product.colors[0] === "object" && product.colors[0].image
    ? product.colors[0].image
    : product.image

  const fullImageUrl = `https://vialine.pe${imageUrl}`

  return {
    title: `${product.title} - S/ ${product.price} | Vialine`,
    description,
    openGraph: {
      title: `${product.title} - S/ ${product.price} | Vialine`,
      description,
      type: "website",
      locale: "es_PE",
      siteName: "Vialine",
      url: `https://vialine.pe/producto/${slug}`,
      images: [
        {
          url: fullImageUrl,
          width: 1200,
          height: 1200,
          alt: product.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.title} - S/ ${product.price}`,
      description,
      images: [fullImageUrl],
    },
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params
  const product = findProduct(slug)

  if (!product) {
    notFound()
  }

  // Obtener imagen principal para Schema
  const imageUrl = typeof product.colors[0] === "object" && product.colors[0].image
    ? product.colors[0].image
    : product.image

  const fullImageUrl = `https://vialine.pe${imageUrl}`

  // Construir Schema.org JSON-LD
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.title,
    "image": fullImageUrl,
    "description": product.attributes?.material || "Ropa deportiva de alta calidad",
    "sku": slug,
    "brand": {
      "@type": "Brand",
      "name": "Vialine"
    },
    "offers": {
      "@type": "Offer",
      "url": `https://vialine.pe/producto/${slug}`,
      "priceCurrency": "PEN",
      "price": product.price,
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": "Vialine"
      }
    }
  }

  return (
    <>
      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />

      <div className="container mx-auto px-4 py-8">
        {/* 1. Detalle del producto */}
        <ProductDetailCard product={product} />
        
        {/* 2. Reviews */}
        <ReviewList productSlug={slug} />

        {/* 3. Productos relacionados */}
        <RelatedProducts currentProduct={product} limit={4} />
      </div>
    </>
  )
}