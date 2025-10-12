"use client"
import { useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { findProduct } from "@/data/products"

export default function ProductRail({
  title,
  slugs,
  cta,
}: { title: string; slugs: string[]; cta?: { label: string; href: string } }) {
  const list = slugs.map(findProduct).filter(Boolean) as any[]
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
    <section className="mx-auto max-w-7xl px-6 md:px-8 py-10">
      <div className="flex items-end justify-between gap-4">
        <h2 className="text-2xl md:text-3xl font-heading font-semibold">{title}</h2>
        {cta && (
          <Link href={cta.href} className="text-sm text-rose-700 hover:underline underline-offset-4">
            {cta.label} →
          </Link>
        )}
      </div>

      <div className="relative mt-4">
        <div
          ref={ref}
          className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2 [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          {list.map((p) => (
            <Link
              key={p.slug}
              href={`/producto/${p.slug}`}
              className="min-w-[220px] sm:min-w-[240px] md:min-w-[260px] snap-start rounded-2xl border border-neutral-200 bg-white p-3 hover:shadow-lg transition"
            >
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl">
                <Image
                  unoptimized
                  src={p.image || "/placeholder.svg"}
                  alt={`${p.title} Vialine`}
                  fill
                  className="object-cover object-center"
                  sizes="(min-width:1024px) 22vw, (min-width:768px) 40vw, 75vw"
                />
              </div>
              <div className="mt-3">
                <p className="text-sm font-heading line-clamp-1">{p.title}</p>
                <div className="mt-1 text-sm text-neutral-800">
                  {new Intl.NumberFormat("es-PE", { style: "currency", currency: "PEN" }).format(p.price)}
                </div>
                <span className="mt-1 block text-xs text-rose-700">Seleccionar opciones →</span>
              </div>
            </Link>
          ))}
        </div>

        <button
          aria-label="Anterior"
          onClick={() => snap(-1)}
          className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 h-10 w-10 items-center justify-center rounded-full bg-white shadow ring-1 ring-neutral-200"
        >
          ‹
        </button>
        <button
          aria-label="Siguiente"
          onClick={() => snap(1)}
          className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 h-10 w-10 items-center justify-center rounded-full bg-white shadow ring-1 ring-neutral-200"
        >
          ›
        </button>
      </div>
    </section>
  )
}
