import { notFound } from "next/navigation"
import { Suspense } from "react"
import CollectionClientPage from "./CollectionClientPage"
import { products, getAllCollections } from "@/data/products"

const toSlug = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")

// ✨ Descripciones personalizadas por colección
const collectionDescriptions: Record<string, string> = {
  infinity: "La colección Infinity combina estilo y funcionalidad en cada prenda. Diseñada para acompañarte en tu día a día con comodidad y elegancia.",
  fit: "Fit es nuestra línea dedicada al alto rendimiento. Prendas que se adaptan perfectamente a tu cuerpo y te brindan el soporte que necesitas.",
  "nina": "Diseños especialmente creados para las más pequeñas, combinando diversión, comodidad y calidad en cada detalle.",
  comfort: "Comfort es sinónimo de suavidad y libertad. Prendas pensadas para que te sientas cómoda en cualquier momento del día.",
  active: "Active es para quienes no paran. Ropa deportiva versátil que te acompaña desde el gimnasio hasta tu rutina diaria.",
  classic: "Classic nunca pasa de moda. Diseños atemporales con la calidad y el estilo que nos caracteriza.",
  sport: "Sport es nuestra línea de alto rendimiento deportivo. Prendas técnicas diseñadas para entrenamientos intensos.",
  essential: "Essential reúne las piezas fundamentales de tu guardarropa deportivo. Básicos imprescindibles con diseño superior.",
  premium: "Premium es nuestra colección más exclusiva. Materiales de primera calidad y diseños sofisticados para quienes buscan lo mejor.",
}

export default async function CollectionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const allCollections = getAllCollections()

  // Buscar la colección por slug
  const collectionData = allCollections.find(c => c.slug === slug)

  if (!collectionData) {
    notFound()
  }

  // Filtrar productos que pertenecen a esta colección
  const collectionProducts = (products as any[]).filter(p =>
    p.tags?.some((tag: string) => toSlug(tag) === slug)
  )

  if (collectionProducts.length === 0) {
    notFound()
  }

  const collection = {
    title: collectionData.name,
    description: collectionDescriptions[slug] || `Descubre nuestra colección ${collectionData.name} con ${collectionData.count} productos únicos diseñados para ti.`,
    products: collectionProducts
  }

  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-neutral-900"></div>
        </div>
      }
    >
      <CollectionClientPage collection={collection} slug={slug} />
    </Suspense>
  )
}

export function generateStaticParams() {
  const collections = getAllCollections()
  return collections.map(c => ({ slug: c.slug }))
}
