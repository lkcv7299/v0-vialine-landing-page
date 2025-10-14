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

type ColorOption = string | ColorVariant

type ProductDetailCardProps = {
  product: Product
}

function isColorVariant(option: ColorOption): option is ColorVariant {
  return typeof option === "object"
}

function isSimpleColor(option: ColorOption): option is string {
  return typeof option === "string"
}

function getInitialColorSlug(colors: ColorOption[]) {
  if (colors.length === 0) return ""
  const first = colors[0]
  return isSimpleColor(first) ? first : first.slug
}

function normalizeAttributeList(value?: string[] | string | null) {
  if (!value) return []
  if (Array.isArray(value)) return value.filter(Boolean)
  return value
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean)
}

export function ProductDetailCard({ product }: ProductDetailCardProps) {
  const colorOptions: ColorOption[] = product.colors ?? []
  const sizes = product.sizes ?? []

  const variantColors = useMemo(
    () => colorOptions.filter(isColorVariant),
    [colorOptions],
  )
  const hasColorVariants = variantColors.length > 0

  const simpleColors = useMemo(
    () => (hasColorVariants ? [] : colorOptions.filter(isSimpleColor)),
    [colorOptions, hasColorVariants],
  )

  const [selectedSize, setSelectedSize] = useState(() => sizes[0] ?? "")
  const [selectedColorSlug, setSelectedColorSlug] = useState(() => getInitialColorSlug(colorOptions))

  useEffect(() => {
    setSelectedSize(sizes[0] ?? "")
  }, [product.slug, sizes])

  useEffect(() => {
    setSelectedColorSlug(getInitialColorSlug(colorOptions))
  }, [product.slug, colorOptions])

  const currentVariant = useMemo(() => {
    if (!hasColorVariants) return undefined
    return variantColors.find((color) => color.slug === selectedColorSlug) ?? variantColors[0]
  }, [hasColorVariants, selectedColorSlug, variantColors])

  const currentSimpleColor = hasColorVariants
    ? ""
    : simpleColors.find((color) => color === selectedColorSlug) ?? simpleColors[0] ?? ""

  const currentColorName = hasColorVariants
    ? currentVariant?.name ?? selectedColorSlug
    : currentSimpleColor

  const displayImage = hasColorVariants ? currentVariant?.image ?? product.image : product.image
  const fallbackImage = product.image || "/placeholder.svg"

  const whatsappMessage = `Hola, quiero el ${product.title} en color ${
    currentColorName || "predeterminado"
  }, talla ${selectedSize || sizes[0] || "disponible"}.`
  const whatsappUrl = buildWhatsAppUrl(whatsappMessage)

  const material = product.attributes?.material?.trim() ?? ""
  const detalles = normalizeAttributeList(product.attributes?.detalles ?? [])
  const beneficios = normalizeAttributeList(product.attributes?.beneficios ?? [])

  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <div className="grid gap-12 md:grid-cols-2">
        {/* Gallery */}
        <div>
          <div className="aspect-[3/4] overflow-hidden rounded-2xl bg-neutral-100">
            <img
              key={selectedColorSlug || "default"}
              src={displayImage || "/placeholder.svg"}
              onError={(event) => {
                ;(event.currentTarget as HTMLImageElement).src = fallbackImage
              }}
              alt={`${product.title} - ${currentColorName}`}
              className="h-full w-full object-cover object-center"
            />
          </div>
        </div>

        {/* Info */}
        <div>
          <h1 className="text-3xl font-bold text-neutral-900 md:text-4xl">{product.title}</h1>
          <p className="mt-4 text-3xl font-bold text-rose-600">S/ {product.price.toFixed(2)}</p>

          {/* Color Selector */}
          {colorOptions.length > 0 && (
            <div className="mt-8">
              <h3 className="mb-3 text-sm font-semibold text-neutral-900">Color</h3>
              <div className="flex flex-wrap gap-2">
                {hasColorVariants
                  ? variantColors.map((color) => (
                      <button
                        key={color.slug}
                        onClick={() => setSelectedColorSlug(color.slug)}
                        className={`rounded-full border-2 px-4 py-2 text-sm font-medium transition-all ${
                          selectedColorSlug === color.slug
                            ? "border-rose-600 bg-rose-50"
                            : "border-neutral-200 bg-white hover:border-neutral-300"
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span
                            className="h-4 w-4 rounded-full border border-neutral-300"
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
                        className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
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
          )}

          {/* Size Selector */}
          {sizes.length > 0 && (
            <div className="mt-6">
              <h3 className="mb-3 text-sm font-semibold text-neutral-900">Talla</h3>
              <div className="flex flex-wrap gap-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
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
          )}

          <div className="mt-8 space-y-6">
            {/* Material */}
            <div>
              <h3 className="mb-2 text-sm font-semibold text-neutral-900">Material</h3>
              <p className="min-h-[1.5rem] text-neutral-700">{material || "\u00A0"}</p>
            </div>

            {/* Detalles */}
            <div>
              <h3 className="mb-2 text-sm font-semibold text-neutral-900">Detalles</h3>
              {detalles.length > 0 ? (
                <ul className="space-y-1">
                  {detalles.map((detalle, index) => (
                    <li key={index} className="flex items-start gap-2 text-neutral-700">
                      <span className="mt-1 text-rose-600">•</span>
                      <span>{detalle}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="min-h-[1.5rem]" aria-hidden="true" />
              )}
            </div>

            {/* Beneficios */}
            <div>
              <h3 className="mb-2 text-sm font-semibold text-neutral-900">Beneficios</h3>
              {beneficios.length > 0 ? (
                <ul className="space-y-1">
                  {beneficios.map((beneficio, index) => (
                    <li key={index} className="flex items-start gap-2 text-neutral-700">
                      <span className="mt-1 text-rose-600">•</span>
                      <span>{beneficio}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="min-h-[1.5rem]" aria-hidden="true" />
              )}
            </div>
          </div>

          {/* CTA */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex w-full items-center justify-center rounded-2xl bg-rose-600 px-6 py-4 font-semibold uppercase tracking-wide text-white shadow-lg transition hover:bg-rose-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-700"
          >
            Comprar por WhatsApp
          </a>
        </div>
      </div>
    </main>
  )
}
