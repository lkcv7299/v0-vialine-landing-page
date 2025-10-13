"use client"
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
  return (
    <section className="relative left-1/2 right-1/2 w-screen -translate-x-1/2 bg-neutral-50 py-8 sm:py-10">
      <div className="flex items-baseline justify-between px-4 sm:px-6">
        <h2 className="text-xl sm:text-2xl font-semibold">{title}</h2>
        {viewAllHref && (
          <Link href={viewAllHref} className="text-rose-600 text-sm font-medium hover:underline">
            Ver todo →
          </Link>
        )}
      </div>

      <div className="mt-4">
        <div className="mx-auto max-w-[1920px] px-0">
          <div className="flex snap-x snap-mandatory overflow-x-auto scroll-smooth gap-6 px-4 sm:px-6 [scrollbar-width:none] [-ms-overflow-style:none]">
            {items.map((p) => (
              <article
                key={p.slug}
                className="snap-start shrink-0 w-[70vw] xs:w-[55vw] sm:w-[40vw] md:w-[32vw] lg:w-[25vw]"
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
      </div>
    </section>
  )
}
