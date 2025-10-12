"use client"

import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { findProduct } from "@/data/products"

interface ProductRailProps {
  title: string
  slugs: string[]
  cta?: {
    label: string
    href: string
  }
}

export default function ProductRail({ title, slugs, cta }: ProductRailProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -800 : 800
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" })
    }
  }

  const products = slugs.map((slug) => findProduct(slug)).filter(Boolean)

  if (products.length === 0) return null

  return (
    <section className="py-12">
      <div className="mx-auto max-w-7xl px-4">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">{title}</h2>
          {cta && (
            <Link href={cta.href} className="text-sm font-semibold text-rose-600 hover:text-rose-700 transition">
              {cta.label} →
            </Link>
          )}
        </div>

        {/* Rail Container */}
        <div className="relative group">
          {/* Left Arrow */}
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full bg-white shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-50 disabled:opacity-0"
            aria-label="Scroll left"
          >
            <svg className="h-5 w-5 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Scrollable Rail */}
          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide pb-4"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {products.map((product) => (
              <Link
                key={product.slug}
                href={`/producto/${product.slug}`}
                className="flex-none w-[220px] md:w-[240px] snap-start group/card"
              >
                {/* Image */}
                <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-gray-100 mb-3">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.title}
                    fill
                    className="object-cover object-center group-hover/card:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 220px, 240px"
                  />
                </div>

                {/* Content */}
                <div className="space-y-1">
                  <h3 className="text-sm font-semibold text-gray-900 line-clamp-2">{product.title}</h3>
                  <p className="text-lg font-bold text-gray-900">S/ {product.price.toFixed(2)}</p>
                  <p className="text-sm text-rose-600 font-medium">Seleccionar opciones →</p>
                </div>
              </Link>
            ))}
          </div>

          {/* Right Arrow */}
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full bg-white shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-50 disabled:opacity-0"
            aria-label="Scroll right"
          >
            <svg className="h-5 w-5 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}
