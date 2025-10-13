import Image from "next/image"
import Link from "next/link"

export default function HeroNina() {
  return (
    <section className="relative isolate overflow-hidden min-h-[68dvh] md:min-h-[72dvh]">
      {/* Background Image */}
      <Image
        src="/hero-nina.jpg"
        alt="Niña"
        fill
        priority
        sizes="100vw"
        className="object-cover object-[70%_center] md:object-center"
      />

      {/* Gradient Overlay - Left to Right */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />

      <div className="absolute inset-x-0 bottom-0 h-40 md:h-52 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 h-full flex items-end pb-14 md:pb-20">
        <div className="max-w-xl pb-10 sm:pb-14 md:pb-16 lg:pb-20">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight">Niña</h1>
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
    </section>
  )
}
