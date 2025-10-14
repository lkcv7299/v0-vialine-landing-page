"use client"
import { useRef } from "react"
import Link from "next/link"
import { findProduct } from "@/data/products"
import ProductCard from "./ProductCard"

export default function ProductRail({
  title,
  slugs,
  cta,
}: { title: string; slugs: string[]; cta?: { label: string; href: string } }) {
  const items = slugs.map(findProduct).filter(Boolean) as any[]
  const ref = useRef<HTMLDivElement>(null)

  const snap = (dir: 1 | -1) => {
    const scroller = ref.current
    if (!scroller) return
    const kids = Array.from(scroller.children) as HTMLElement[]
    const x = scroller.scrollLeft
    const pos = kids.map((k) => k.offsetLeft)
    const target =
      dir === 1 ? (pos.find((p) => p > x + 4) ?? pos[pos.length - 1]) : ([...pos].reverse().find((p) => p < x - 4) ?? 0)
    scroller.scrollTo({ left: target, behavior: "smooth" })
  }

  return (
    <section className="full-bleed px-4 sm:px-6 lg:px-8">
      <div className="flex items-end justify-between mb-6">
        <h2 className="text-2xl md:text-3xl font-heading font-semibold">{title}</h2>
        {cta && (
          <Link href={cta.href} className="text-sm text-rose-700 hover:underline underline-offset-4">
            {cta.label} →
          </Link>
        )}
      </div>

      <div className="relative">
        <div
          ref={ref}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-px-4 sm:scroll-px-6 lg:scroll-px-8 no-scrollbar"
        >
          {items.map((p) => (
            <div key={p.slug} className="snap-start shrink-0 w-[80vw] sm:w-[44vw] md:w-[32vw] lg:w-[24vw] xl:w-[22vw]">
              <ProductCard product={p} />
            </div>
          ))}
        </div>

        <button
          onClick={() => snap(-1)}
          aria-label="Anterior"
          className="hidden md:flex absolute top-1/2 -translate-y-1/2 left-4 h-10 w-10 items-center justify-center rounded-full bg-white shadow ring-1 ring-neutral-200 hover:bg-neutral-50 transition-colors"
        >
          ‹
        </button>
        <button
          onClick={() => snap(1)}
          aria-label="Siguiente"
          className="hidden md:flex absolute top-1/2 -translate-y-1/2 right-4 h-10 w-10 items-center justify-center rounded-full bg-white shadow ring-1 ring-neutral-200 hover:bg-neutral-50 transition-colors"
        >
          ›
        </button>
      </div>
    </section>
  )
}
