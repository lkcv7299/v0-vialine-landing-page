"use client"

import { useState, useEffect, useMemo } from "react"
import { notFound } from "next/navigation"
import Image from "next/image"
import { findProduct } from "@/data/products"

export default function ProductPage({ params }: { params: { slug: string } }) {
  const [selectedSize, setSelectedSize] = useState<string>(() => findProduct(params.slug)?.sizes[0] || "")
  const [selectedColorSlug, setSelectedColorSlug] = useState<string>(() => {
    const product = findProduct(params.slug)
    if (!product) return ""
    const hasColorVariants = product.colors.length > 0 && typeof product.colors[0] === "object"
    if (hasColorVariants) {
      const firstColor = product.colors[0] as { name: string; slug: string; hex: string; image: string }
      return firstColor?.slug || ""
    }
    return (product.colors[0] as string) || ""
  })

  const product = findProduct(params.slug)
  const hasColorVariants = product?.colors.length > 0 && typeof product?.colors[0] === "object"

  useEffect(() => {
    if (!product) return
    setSelectedSize(product.sizes[0] || "")
    const firstColor = hasColorVariants
      ? (product.colors[0] as { name: string; slug: string; hex: string; image: string })
      : null
    setSelectedColorSlug(firstColor?.slug || (product.colors[0] as string) || "")
  }, [product]) // Updated dependency array to be exhaustive

  const currentImage = useMemo(() => {
    if (!product) return "/placeholder.svg"
    if (hasColorVariants) {
      const selectedColor = (product.colors as { name: string; slug: string; hex: string; image: string }[]).find(
        (c) => c.slug === selectedColorSlug,
      )
      return selectedColor?.image || product.image
    }
    return product.image
  }, [product, hasColorVariants, selectedColorSlug])

  const currentColorName = useMemo(() => {
    if (!product) return ""
    if (hasColorVariants) {
      const selectedColor = (product.colors as { name: string; slug: string; hex: string; image: string }[]).find(
        (c) => c.slug === selectedColorSlug,
      )
      return selectedColor?.name || selectedColorSlug
    }
    return selectedColorSlug
  }, [product, hasColorVariants, selectedColorSlug])

  if (!product) return notFound()

  const whatsappMessage = `Hola, quiero el ${product.title} en color ${currentColorName}, talla ${selectedSize}.`
  const whatsappUrl = `https://wa.me/51972327236?text=${encodeURIComponent(whatsappMessage)}`

  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <div className="grid md:grid-cols-2 gap-12">
        {/* Gallery */}
        <div>
          <div className="aspect-[3/4] overflow-hidden rounded-2xl bg-neutral-100">
            <Image
              src={currentImage || "/placeholder.svg"}
              alt={`${product.title} - ${currentColorName}`}
              width={800}
              height={1067}
              className="h-full w-full object-cover object-center"
              priority
            />
          </div>
        </div>

        {/* Info */}
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-neutral-900">{product.title}</h1>
          <p className="mt-4 text-3xl font-bold text-rose-600">S/ {product.price.toFixed(2)}</p>

          {/* Color Selector */}
          <div className="mt-8">
            <h3 className="text-sm font-semibold text-neutral-900 mb-3">Color</h3>
            <div className="flex flex-wrap gap-2">
              {hasColorVariants
                ? // Render color chips with hex values
                  (product.colors as { name: string; slug: string; hex: string; image: string }[]).map((color) => (
                    <button
                      key={color.slug}
                      onClick={() => setSelectedColorSlug(color.slug)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all border-2 ${
                        selectedColorSlug === color.slug
                          ? "border-rose-600 bg-rose-50"
                          : "border-neutral-200 bg-white hover:border-neutral-300"
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span
                          className="w-4 h-4 rounded-full border border-neutral-300"
                          style={{ backgroundColor: color.hex }}
                        />
                        <span className="text-neutral-900">{color.name}</span>
                      </span>
                    </button>
                  ))
                : // Render simple color buttons (backward compatible)
                  (product.colors as string[]).map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColorSlug(color)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                        selectedColorSlug === color
                          ? "bg-rose-600 text-white"
                          : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                      }`}
                    >
                      {color}
                    </button>
                  ))}
            </div>
          </div>

          {/* Size Selector */}
          <div className="mt-6">
            <h3 className="text-sm font-semibold text-neutral-900 mb-3">Talla</h3>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedSize === size
                      ? "bg-rose-600 text-white"
                      : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {product.attributes && (
            <div className="mt-8 space-y-6">
              {/* Material */}
              <div>
                <h3 className="text-sm font-semibold text-neutral-900 mb-2">Material</h3>
                <p className="text-neutral-700">{product.attributes.material}</p>
              </div>

              {/* Detalles */}
              {product.attributes.detalles.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-neutral-900 mb-2">Detalles</h3>
                  <ul className="space-y-1">
                    {product.attributes.detalles.map((detalle, i) => (
                      <li key={i} className="flex items-start gap-2 text-neutral-700">
                        <span className="text-rose-600 mt-1">•</span>
                        <span>{detalle}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Beneficios */}
              {product.attributes.beneficios.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-neutral-900 mb-2">Beneficios</h3>
                  <ul className="space-y-1">
                    {product.attributes.beneficios.map((beneficio, i) => (
                      <li key={i} className="flex items-start gap-2 text-neutral-700">
                        <span className="text-rose-600 mt-1">•</span>
                        <span>{beneficio}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Benefits (default for products without attributes) */}
          {!product.attributes && (
            <ul className="mt-8 space-y-3">
              <li className="flex items-center gap-3 text-neutral-700">
                <svg className="w-5 h-5 text-rose-600" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Envíos a todo el Perú</span>
              </li>
              <li className="flex items-center gap-3 text-neutral-700">
                <svg className="w-5 h-5 text-rose-600" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Cambios fáciles</span>
              </li>
            </ul>
          )}

          {/* CTA */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center justify-center w-full px-6 py-4 rounded-2xl bg-rose-600 text-white font-semibold tracking-wide shadow-lg hover:bg-rose-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-700 transition uppercase"
          >
            Comprar por WhatsApp
          </a>
        </div>
      </div>
    </main>
  )
}
