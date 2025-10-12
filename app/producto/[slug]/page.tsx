"use client"

import { useState } from "react"
import { notFound } from "next/navigation"
import Image from "next/image"
import { findProduct } from "@/data/products"

export default function ProductPage({ params }: { params: { slug: string } }) {
  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [selectedColor, setSelectedColor] = useState<string | null>(null)
  const product = findProduct(params.slug)

  if (!product) return notFound()

  const initialSize = product.sizes[0]
  const initialColor = product.colors[0]

  if (selectedSize === null) setSelectedSize(initialSize)
  if (selectedColor === null) setSelectedColor(initialColor)

  const whatsappMessage = `Hola Vialine 👋%0AQuiero ${product.title} ( ${product.slug} )%0ATalla: ${selectedSize}%0AColor: ${selectedColor}`
  const whatsappUrl = `https://wa.me/51972327236?text=${whatsappMessage}`

  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <div className="grid md:grid-cols-2 gap-12">
        {/* Gallery */}
        <div>
          <div className="aspect-[3/4] overflow-hidden rounded-2xl bg-neutral-100">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.title}
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

          {/* Size Selector */}
          <div className="mt-8">
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

          {/* Color Selector */}
          <div className="mt-6">
            <h3 className="text-sm font-semibold text-neutral-900 mb-3">Color</h3>
            <div className="flex flex-wrap gap-2">
              {product.colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedColor === color
                      ? "bg-rose-600 text-white"
                      : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          {/* Benefits */}
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
