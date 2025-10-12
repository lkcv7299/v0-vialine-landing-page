"use client"
import { useRef, useState, useEffect } from "react"
import Link from "next/link"

type Item = {
  slug: string
  name: string
  price: string | number
  image: string
  badge?: string
}

export default function GymSharkRail({
  title,
  viewAllHref,
  items,
}: {
  title: string
  viewAllHref: string
  items: Item[]
}) {
  const scroller = useRef<HTMLDivElement>(null)
  const [canLeft, setCanLeft] = useState(false)
  const [canRight, setCanRight] = useState(true)

  const check = () => {
    const el = scroller.current
    if (!el) return
    setCanLeft(el.scrollLeft > 8)
    setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 8)
  }

  useEffect(() => {
    const el = scroller.current
    if (!el) return
    check()
    const on = () => check()
    el.addEventListener("scroll", on, { passive: true })
    window.addEventListener("resize", on)
    return () => {
      el.removeEventListener("scroll", on)
      window.removeEventListener("resize", on)
    }
  }, [])

  const nudge = (dir: "left" | "right") => {
    const el = scroller.current
    if (!el) return
    const card = el.querySelector<HTMLElement>('[data-card="1"]')
    const step = card ? card.clientWidth + 12 : el.clientWidth * 0.8
    el.scrollBy({ left: dir === "left" ? -step : step, behavior: "smooth" })
  }

  return (
    <section className="relative mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
      <div className="mb-4 flex items-baseline justify-between">
        <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
        <Link href={viewAllHref} className="text-sm font-medium underline-offset-4 hover:underline">
          Ver todo →
        </Link>
      </div>

      <div className="relative">
        <button
          aria-label="Anterior"
          onClick={() => nudge("left")}
          className={`absolute left-0 top-1/2 z-10 -translate-y-1/2 rounded-full border bg-white/90 px-3 py-3 shadow-sm backdrop-blur transition hover:bg-white ${
            canLeft ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          ‹
        </button>
        <button
          aria-label="Siguiente"
          onClick={() => nudge("right")}
          className={`absolute right-0 top-1/2 z-10 -translate-y-1/2 rounded-full border bg-white/90 px-3 py-3 shadow-sm backdrop-blur transition hover:bg-white ${
            canRight ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          ›
        </button>

        <div
          ref={scroller}
          className="flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth pb-2 [-ms-overflow-style:none] [scrollbar-width:none]"
          style={{ scrollbarWidth: "none" }}
        >
          <style jsx>{`
            div::-webkit-scrollbar { display: none; }
          `}</style>

          {items.map((p) => (
            <article
              key={p.slug}
              data-card="1"
              className="snap-start shrink-0 w-[78vw] sm:w-[48vw] md:w-[32vw] lg:w-[23.5vw] xl:w-[21.5vw]"
            >
              <Link href={`/producto/${p.slug}`} className="block overflow-hidden rounded-xl bg-white">
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img
                    src={p.image || "/placeholder.svg"}
                    alt={p.name}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 will-change-transform hover:scale-[1.03]"
                    loading="lazy"
                  />
                  {p.badge && (
                    <span className="absolute left-3 bottom-3 rounded bg-white/90 px-2 py-1 text-xs font-semibold shadow">
                      {p.badge}
                    </span>
                  )}
                  <button
                    aria-label="Favorito"
                    className="absolute right-3 top-3 grid h-9 w-9 place-content-center rounded-full bg-white/90 shadow"
                    onClick={(e) => e.preventDefault()}
                  >
                    ♡
                  </button>
                </div>
                <div className="mt-2 space-y-1 px-1">
                  <h3 className="truncate text-[15px] font-medium">{p.name}</h3>
                  <div className="text-[15px] font-semibold">S/ {p.price}</div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
