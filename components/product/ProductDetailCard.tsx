"use client"

import { useEffect, useMemo, useState } from "react"

import type { Product } from "@/data/products"
import { buildWhatsAppUrl } from "@/lib/contact"

type ColorVariant = {
  name: string
  slug: string
  hex: string
  image: string
}

type ProductDetailCardProps = {
  product: Product
}

export default function ProductDetailCard({ product }: ProductDetailCardProps) {
  const variantColors = useMemo(
    () => (product.colors ?? []).filter((color): color is ColorVariant => typeof color === "object"),
    [product.colors],
  )
  const hasColorVariants = variantColors.length > 0

  const [selectedSize, setSelectedSize] = useState(() => product.sizes[0] ?? "")
  const [selectedColorSlug, setSelectedColorSlug] = useState(() => {
    if (product.colors.length === 0) return ""
    const first = product.colors[0]
    return typeof first === "string" ? first : first.slug
  })

  useEffect(() => {
    setSelectedSize(product.sizes[0] ?? "")
    if (product.colors.length === 0) {
      setSelectedColorSlug("")
      return
    }
    const first = product.colors[0]
    setSelectedColorSlug(typeof first === "string" ? first : first.slug)
  }, [product.slug, product.colors, product.sizes])

  const currentVariant = useMemo(() => {
    if (!hasColorVariants) return undefined
    return variantColors.find((color) => color.slug === selectedColorSlug) ?? variantColors[0]
  }, [hasColorVariants, selectedColorSlug, variantColors])

  const currentColorName = hasColorVariants ? currentVariant?.name ?? selectedColorSlug : selectedColorSlug

  const displayImage = hasColorVariants ? currentVariant?.image ?? product.image : product.image
  const fallbackImage = product.image || "/placeholder.svg"

  const whatsappMessage = `Hola, quiero el ${product.title} en color ${currentColorName || "predeterminado"}, talla ${
    selectedSize || "disponible"
  }.`
  const whatsappUrl = buildWhatsAppUrl(whatsappMessage)

  const simpleColors = hasColorVariants ? [] : (product.colors as string[])

  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <div className="aspect-[3/4] overflow-hidden rounded-2xl bg-neutral-100">
            <img
              key={selectedColorSlug || "default"}
              src={displayImage || "/placeholder.svg"}
              onError={(e) => {
                ;(e.currentTarget as HTMLImageElement).src = fallbackImage
              }}
              alt={`${product.title} - ${currentColorName}`}
              className="h-full w-full object-cover object-center"
            />
          </div>
        </div>

        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-neutral-900">{product.title}</h1>
          <p className="mt-4 text-3xl font-bold text-rose-600">S/ {product.price.toFixed(2)}</p>

          <div className="mt-8">
            <h3 className="text-sm font-semibold text-neutral-900 mb-3">Color</h3>
            <div className="flex flex-wrap gap-2">
              {hasColorVariants
                ? variantColors.map((color) => (
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
                : simpleColors.map((color) => (
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
              <div>
                <h3 className="text-sm font-semibold text-neutral-900 mb-2">Material</h3>
                <p className="text-neutral-700">{product.attributes.material}</p>
              </div>

              {product.attributes.detalles.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-neutral-900 mb-2">Detalles</h3>
                  <ul className="space-y-1">
                    {product.attributes.detalles.map((detalle, index) => (
                      <li key={index} className="flex items-start gap-2 text-neutral-700">
                        <span className="text-rose-600 mt-1">•</span>
                        <span>{detalle}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {product.attributes.beneficios.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-neutral-900 mb-2">Beneficios</h3>
                  <ul className="space-y-1">
                    {product.attributes.beneficios.map((beneficio, index) => (
                      <li key={index} className="flex items-start gap-2 text-neutral-700">
                        <span className="text-rose-600 mt-1">•</span>
                        <span>{beneficio}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

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
