import ProductCard from "@/components/ui/ProductCard"
import type { Product } from "@/data/products"
import { resolveProductImagery } from "@/lib/product-imagery"

export default function ProductGrid({ items }: { items: Product[] }) {
  if (items.length === 0) {
    return (
      <div className="mt-8 py-12 text-center">
        <p className="text-neutral-600">No se encontraron productos con los filtros seleccionados.</p>
      </div>
    )
  }

  return (
    <div className="mt-8 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
      {items.map((product) => {
        const { primaryImage, fallbackImage } = resolveProductImagery(product)

        return (
          <ProductCard
            key={product.slug}
            href={`/producto/${product.slug}`}
            title={product.title}
            price={product.price}
            image={primaryImage}
            fallbackImage={fallbackImage}
            badge={product.badge}
            slug={product.slug}
          />
        )
      })}
    </div>
  )
}
