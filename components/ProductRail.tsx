"use client"
import { useRef } from "react"
import Link from "next/link"
import { findProduct } from "@/data/products"
import ProductCard from "@/components/ui/ProductCard"

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
    <section className="mx-auto max-w-7xl px-4 md:px-6 py-10">
      <div className="flex items-end justify-between">
        <h2 className="text-2xl md:text-3xl font-heading font-semibold">{title}</h2>
        {cta && (
          <Link href={cta.href} className="text-sm text-rose-700 hover:underline underline-offset-4">
            {cta.label} →
          </Link>
        )}
      </div>

      <div className="relative mt-3 -mx-[3px]">
        <div
          ref={ref}
          className="flex overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2 [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          {items.map((p) => (
            <div
              key={p.slug}
              className="snap-start shrink-0 px-[3px] basis-[82%] sm:basis-[60%] md:basis-[48%] lg:basis-[24.8%]"
            >
              <ProductCard
                href={`/producto/${p.slug}`}
                title={p.title}
                price={p.price}
                image={p.image}
                badge={(p as any).badge}
              />
            </div>
          ))}
        </div>

        {/* Flechas (desktop) */}
        <button
          onClick={() => snap(-1)}
          aria-label="Anterior"
          className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 h-10 w-10 items-center justify-center rounded-full bg-white shadow ring-1 ring-neutral-200"
        >
          ‹
        </button>
        <button
          onClick={() => snap(1)}
          aria-label="Siguiente"
          className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 h-10 w-10 items-center justify-center rounded-full bg-white shadow ring-1 ring-neutral-200"
        >
          ›
        </button>
      </div>
    </section>
  )
}
