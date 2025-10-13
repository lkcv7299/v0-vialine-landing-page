import Image from "next/image"
import Link from "next/link"

export default function Hero() {
  return (
    <section className="relative z-10">
      <div className="relative mx-auto h-[78vh] max-h-[880px] min-h-[520px] w-full overflow-hidden">
        {/* The hero image:
           - object-cover to fill
           - object-right on small screens (keeps the model visible)
           - md:object-[70%_center] shifts the focal point a bit to the right on desktop */}
        <Image
          src="/hero-woman.jpg"
          alt="Básicos que rinden"
          fill
          priority
          className="object-cover object-right md:object-[70%_center]"
          sizes="100vw"
        />

        {/* gradient for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/30 to-transparent" />

        {/* copy */}
        <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-4 sm:px-6">
          <div className="max-w-xl text-white">
            <p className="text-xs font-semibold tracking-widest text-white/80">VIALINE · LÍNEA SUPLEX</p>
            <h1 className="mt-3 text-4xl font-extrabold leading-tight sm:text-5xl">Básicos que rinden</h1>
            <p className="mt-4 text-base text-white/90">
              Set suplex: top soporte medio + legging tiro alto. Ajuste que estiliza, opacidad total.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <Link
                href="/collections/sets"
                className="rounded-full bg-pink-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-pink-700"
              >
                Comprar sets
              </Link>
              <Link
                href="/mujer?tecido=suplex"
                className="rounded-full bg-white/15 px-5 py-2.5 text-sm font-medium text-white backdrop-blur hover:bg-white/25"
              >
                Ver Suplex
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
