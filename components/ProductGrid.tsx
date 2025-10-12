import ProductCard from "./ProductCard"
import type { Product } from "@/data/products"

export default function ProductGrid({ items }: { items: Product[] }) {
  if (items.length === 0) {
    return (
      <div className="mt-8 text-center py-12">
        <p className="text-neutral-600">No se encontraron productos con los filtros seleccionados.</p>
      </div>
    )
  }

  return (
    <div className="mt-8 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
      {items.map((product) => (
        <ProductCard key={product.slug} product={product} />
      ))}
    </div>
  )
}
