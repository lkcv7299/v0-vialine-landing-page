import Image from "next/image"
import Link from "next/link"

export default function HeroNina() {
  return (
    <section className="relative isolate min-h-[70vh] overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/hero-nina.jpg"
          alt="Niña"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[70%_center] md:object-center"
        />
        {/* Left gradient for legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
        {/* Bottom gradient for legibility */}
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-40 md:h-56 bg-gradient-to-t from-black/60 to-transparent pointer-events-none"
        />
      </div>

      {/* ABSOLUTE overlay pinned to bottom-left */}
      <div className="absolute inset-0 z-10 flex items-end">
        <div className="mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-8 pb-10 sm:pb-14 md:pb-16">
          <div className="max-w-xl">
            <p className="text-sm font-medium text-white/80 uppercase tracking-wider">VIALINE · NIÑA</p>
            <h1 className="mt-2 text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight">Niña</h1>
            <p className="mt-4 text-lg md:text-xl text-white/90">Comodidad para moverse, diseños que les encantan.</p>
            <div className="mt-6">
              <Link
                href="/shop/nina/leggings"
                className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-base font-medium text-neutral-900 hover:bg-neutral-100 transition-colors"
              >
                Ver colección niña
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
