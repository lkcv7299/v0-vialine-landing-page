import Image from "next/image"
import { notFound } from "next/navigation"

const collections = {
  camisetas: {
    title: "Camisetas",
    description:
      "Nuestras camisetas deportivas combinan suavidad, elasticidad y transpirabilidad. Perfectas para entrenar o para el día a día, están confeccionadas con telas de alta calidad que se adaptan a tu cuerpo y te mantienen cómoda en todo momento.",
    images: [
      "/women-s-athletic-t-shirt-activewear.jpg",
      "/women-s-cotton-athletic-top.jpg",
      "/women-s-activewear-lifestyle-.jpg",
    ],
  },
  "linea-suplex": {
    title: "Línea Suplex",
    description:
      "La línea Suplex ofrece el equilibrio perfecto entre soporte y compresión. Estas prendas de alto rendimiento son frescas, versátiles y estilizan tu figura, ideales para entrenamientos intensos o para lucir con estilo en cualquier ocasión.",
    images: [
      "/women-s-suplex-athletic-leggings.jpg",
      "/women-s-athletic-bodysuit.jpg",
      "/women-s-activewear-lifestyle-.jpg",
    ],
  },
  bodys: {
    title: "Bodys",
    description:
      "Nuestros bodys están diseñados para ofrecerte un ajuste perfecto que define tu silueta. Elegantes y versátiles, son ideales para combinar con tus outfits favoritos o para usar durante tus entrenamientos con total confianza.",
    images: [
      "/women-s-athletic-bodysuit.jpg",
      "/women-s-suplex-athletic-leggings.jpg",
      "/women-s-activewear-lifestyle-.jpg",
    ],
  },
  "tops-algodon": {
    title: "Tops de Algodón",
    description:
      "Los tops de algodón premium ofrecen comodidad absoluta y soporte ligero. Suaves al tacto y transpirables, son perfectos para el uso diario, brindándote la libertad de movimiento que necesitas con un estilo impecable.",
    images: [
      "/women-s-cotton-athletic-top.jpg",
      "/women-s-athletic-t-shirt-activewear.jpg",
      "/women-s-activewear-lifestyle-.jpg",
    ],
  },
}

export default function CollectionPage({ params }: { params: { slug: string } }) {
  const collection = collections[params.slug as keyof typeof collections]

  if (!collection) {
    notFound()
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      {/* Back link */}
      <div className="flex justify-end mb-8">
        <a href="/#colecciones" className="text-sm text-rose-700 hover:text-rose-600 underline underline-offset-4">
          Volver a colecciones
        </a>
      </div>

      <h1 className="text-4xl md:text-5xl font-bold">{collection.title}</h1>
      <p className="mt-4 text-lg text-neutral-700 leading-relaxed">{collection.description}</p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        {collection.images.map((image, index) => (
          <div key={index} className="aspect-[3/4] rounded-2xl overflow-hidden bg-gray-100 relative">
            <Image
              src={image || "/placeholder.svg"}
              alt={`${collection.title} ${index + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
            />
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="mt-12 text-center">
        <a
          href="https://wa.me/51972327236?text=Hola%20Vialine"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center px-5 py-3 rounded-2xl text-white font-semibold tracking-wide shadow-lg hover:bg-rose-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-700 transition uppercase bg-rose-600"
        >
          Comprar por WhatsApp
        </a>
      </div>
    </main>
  )
}

export function generateStaticParams() {
  return [{ slug: "camisetas" }, { slug: "linea-suplex" }, { slug: "bodys" }, { slug: "tops-algodon" }]
}
