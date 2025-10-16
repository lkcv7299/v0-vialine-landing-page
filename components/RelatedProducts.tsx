"use client"

import { products, type Product } from "@/data/products"
import ProductCard from "@/components/ProductCard"

type RelatedProductsProps = {
  currentProduct: Product
  limit?: number
}

// Función para obtener productos relacionados
function getRelatedProducts(currentProduct: Product, limit: number = 4): Product[] {
  // Filtrar productos:
  // 1. Misma categoría
  // 2. Misma audiencia
  // 3. Excluir el producto actual
  const candidates = products.filter(
    (p) =>
      p.slug !== currentProduct.slug &&
      p.category === currentProduct.category &&
      p.audience === currentProduct.audience
  )

  // Si no hay suficientes de la misma categoría, agregar de la misma audiencia
  if (candidates.length < limit) {
    const extraProducts = products.filter(
      (p) =>
        p.slug !== currentProduct.slug &&
        p.audience === currentProduct.audience &&
        !candidates.includes(p)
    )
    candidates.push(...extraProducts)
  }

  // Mezclar aleatoriamente para variedad
  const shuffled = candidates.sort(() => Math.random() - 0.5)

  // Retornar los primeros N productos
  return shuffled.slice(0, limit)
}

export default function RelatedProducts({ currentProduct, limit = 4 }: RelatedProductsProps) {
  const relatedProducts = getRelatedProducts(currentProduct, limit)

  // Si no hay productos relacionados, no mostrar nada
  if (relatedProducts.length === 0) {
    return null
  }

  return (
    <section className="mt-16 pt-12 border-t">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-neutral-900 mb-2">
          También te puede gustar
        </h2>
        <p className="text-neutral-600">
          Productos similares que podrían interesarte
        </p>
      </div>

      {/* Grid de productos */}
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4">
        {relatedProducts.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>
    </section>
  )
}
