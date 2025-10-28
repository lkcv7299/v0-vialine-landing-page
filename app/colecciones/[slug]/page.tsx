import { notFound } from "next/navigation"
import CollectionClientPage from "./CollectionClientPage"

const collections = {
  camisetas: {
    title: "Camisetas",
    description:
      "Nuestras camisetas deportivas combinan suavidad, elasticidad y transpirabilidad. Perfectas para entrenar o para el día a día, están confeccionadas con telas de alta calidad que se adaptan a tu cuerpo y te mantienen cómoda en todo momento.",
    products: [
      {
        id: "cam-001",
        name: "Camiseta Deportiva Básica",
        price: 45,
        image: "/women-s-athletic-t-shirt-activewear.jpg",
        colors: ["#FF4FB0", "#000000", "#FFFFFF"],
        sizes: ["S", "M", "L", "XL"],
        fabric: "Algodón Premium",
      },
      {
        id: "cam-002",
        name: "Camiseta Fitness Pro",
        price: 55,
        image: "/women-s-cotton-athletic-top.jpg",
        colors: ["#E61E8E", "#4A5568"],
        sizes: ["S", "M", "L"],
        fabric: "Algodón Premium",
      },
      {
        id: "cam-003",
        name: "Camiseta Active Lifestyle",
        price: 50,
        image: "/women-s-activewear-lifestyle-.jpg",
        colors: ["#FF79BE", "#2D3748"],
        sizes: ["M", "L", "XL"],
        fabric: "Algodón Premium",
      },
    ],
  },
  "linea-suplex": {
    title: "Línea Suplex",
    description:
      "La línea Suplex ofrece el equilibrio perfecto entre soporte y compresión. Estas prendas de alto rendimiento son frescas, versátiles y estilizan tu figura, ideales para entrenamientos intensos o para lucir con estilo en cualquier ocasión.",
    products: [
      {
        id: "sup-001",
        name: "Leggings Suplex Compresión",
        price: 75,
        image: "/women-s-suplex-athletic-leggings.jpg",
        colors: ["#000000", "#E61E8E", "#4A5568"],
        sizes: ["S", "M", "L", "XL"],
        fabric: "Suplex",
      },
      {
        id: "sup-002",
        name: "Body Suplex Elite",
        price: 85,
        image: "/women-s-athletic-bodysuit.jpg",
        colors: ["#FF4FB0", "#000000"],
        sizes: ["S", "M", "L"],
        fabric: "Suplex",
      },
      {
        id: "sup-003",
        name: "Conjunto Suplex Active",
        price: 95,
        image: "/women-s-activewear-lifestyle-.jpg",
        colors: ["#E61E8E", "#2D3748", "#FFFFFF"],
        sizes: ["M", "L", "XL"],
        fabric: "Suplex",
      },
    ],
  },
  bodys: {
    title: "Bodys",
    description:
      "Nuestros bodys están diseñados para ofrecerte un ajuste perfecto que define tu silueta. Elegantes y versátiles, son ideales para combinar con tus outfits favoritos o para usar durante tus entrenamientos con total confianza.",
    products: [
      {
        id: "bod-001",
        name: "Body Clásico",
        price: 65,
        image: "/women-s-athletic-bodysuit.jpg",
        colors: ["#000000", "#FF4FB0", "#FFFFFF"],
        sizes: ["S", "M", "L", "XL"],
        fabric: "Suplex",
      },
      {
        id: "bod-002",
        name: "Body Deportivo",
        price: 70,
        image: "/women-s-suplex-athletic-leggings.jpg",
        colors: ["#E61E8E", "#4A5568"],
        sizes: ["S", "M", "L"],
        fabric: "Suplex",
      },
      {
        id: "bod-003",
        name: "Body Active Fit",
        price: 68,
        image: "/women-s-activewear-lifestyle-.jpg",
        colors: ["#FF79BE", "#000000"],
        sizes: ["M", "L", "XL"],
        fabric: "Algodón Premium",
      },
    ],
  },
  "tops-algodon": {
    title: "Tops de Algodón",
    description:
      "Los tops de algodón premium ofrecen comodidad absoluta y soporte ligero. Suaves al tacto y transpirables, son perfectos para el uso diario, brindándote la libertad de movimiento que necesitas con un estilo impecable.",
    products: [
      {
        id: "top-001",
        name: "Top Algodón Básico",
        price: 40,
        image: "/women-s-cotton-athletic-top.jpg",
        colors: ["#FFFFFF", "#000000", "#FF4FB0"],
        sizes: ["S", "M", "L", "XL"],
        fabric: "Algodón Premium",
      },
      {
        id: "top-002",
        name: "Top Deportivo Soft",
        price: 48,
        image: "/women-s-athletic-t-shirt-activewear.jpg",
        colors: ["#E61E8E", "#4A5568"],
        sizes: ["S", "M", "L"],
        fabric: "Algodón Premium",
      },
      {
        id: "top-003",
        name: "Top Active Comfort",
        price: 45,
        image: "/women-s-activewear-lifestyle-.jpg",
        colors: ["#FF79BE", "#2D3748", "#FFFFFF"],
        sizes: ["M", "L", "XL"],
        fabric: "Algodón Premium",
      },
    ],
  },
}

export default async function CollectionPage({ params }: { params: Promise<{ slug: string }> }) {
  // ✅ FIXED: Await params (Next.js 15 requirement)
  const { slug } = await params
  const collection = collections[slug as keyof typeof collections]

  if (!collection) {
    notFound()
  }

  return <CollectionClientPage collection={collection} slug={slug} />
}

export function generateStaticParams() {
  return [{ slug: "camisetas" }, { slug: "linea-suplex" }, { slug: "bodys" }, { slug: "tops-algodon" }]
}
