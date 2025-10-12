"use client"
import Link from "next/link"
import { useRef } from "react"

type Item = { slug: string; name: string; image: string; price: number | string }

export default function GymRail({
  title,
  viewAllHref,
  items,
}: {
  title: string
  viewAllHref: string
  items: Item[]
}) {
  const trackRef = useRef<HTMLDivElement>(null)

  const scrollByCard = (dir: "prev" | "next") => {
    const el = trackRef.current
    if (!el) return
    // one card width + gap
    const card = el.querySelector<HTMLElement>("[data-card]")
    const step = card ? card.offsetWidth + 24 : 320
    el.scrollBy({ left: dir === "next" ? step : -step, behavior: "smooth" })
  }

  return (
    <section className="py-10">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-4 flex items-baseline justify-between">
          <h2 className="text-2xl font-semibold">{title}</h2>
          <Link href={viewAllHref} className="text-sm text-rose-600 hover:underline">
            Ver todo →
          </Link>
        </div>

        <div className="relative">
          {/* prev / next */}
          <button
            aria-label="Anterior"
            onClick={() => scrollByCard("prev")}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 hidden md:grid place-items-center w-9 h-9 rounded-full bg-white shadow ring-1 ring-black/10 hover:ring-black/20"
          >
            ‹
          </button>
          <button
            aria-label="Siguiente"
            onClick={() => scrollByCard("next")}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 hidden md:grid place-items-center w-9 h-9 rounded-full bg-white shadow ring-1 ring-black/10 hover:ring-black/20"
          >
            ›
          </button>

          {/* rail */}
          <div
            ref={trackRef}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-px-4 pb-2 [-ms-overflow-style:none] [scrollbar-width:none]"
            style={{ scrollbarWidth: "none" }}
          >
            {items.map((p) => (
              <article key={p.slug} data-card className="min-w-[260px] sm:min-w-[300px] md:min-w-[340px] snap-start">
                <Link href={`/producto/${p.slug}`}>
                  <div className="aspect-[3/4] w-full overflow-hidden rounded-2xl bg-stone-100">
                    <img
                      src={p.image || "/placeholder.svg"}
                      alt={p.name}
                      className="h-full w-full object-cover transition-transform duration-300 hover:scale-[1.03]"
                      loading="lazy"
                    />
                  </div>
                </Link>
                <div className="mt-3">
                  <h3 className="text-sm font-medium text-stone-900 line-clamp-1">{p.name}</h3>
                  <p className="text-sm text-stone-600">S/ {p.price}</p>
                  <Link href={`/producto/${p.slug}`} className="text-sm text-rose-600 hover:underline">
                    Seleccionar opciones →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
