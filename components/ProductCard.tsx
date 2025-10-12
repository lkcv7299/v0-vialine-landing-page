import Image from "next/image"
import Link from "next/link"
import type { Product } from "@/data/products"

export default function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group">
      <Link href={`/producto/${product.slug}`} className="block">
        <div className="aspect-[3/4] overflow-hidden rounded-2xl bg-neutral-100">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.title}
            width={400}
            height={533}
            className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="mt-4">
          <h3 className="text-lg font-semibold text-neutral-900">{product.title}</h3>
          <p className="mt-1 text-xl font-bold text-rose-600">S/ {product.price.toFixed(2)}</p>
          <span className="mt-3 inline-block text-sm text-rose-700 hover:text-rose-600 underline underline-offset-4">
            Seleccionar opciones
          </span>
        </div>
      </Link>
    </article>
  )
}
