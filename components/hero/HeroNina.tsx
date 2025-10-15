import Link from "next/link"
import Image from "next/image"

export default function HeroNina() {
  return (
    <section className="relative h-[70vh] min-h-[500px] w-full overflow-hidden bg-neutral-900">
      {/* Imagen de fondo */}
      <div className="absolute inset-0">
        <Image
          src="/hero-nina.jpg"
          alt="Colección Niña"
          fill
          className="object-cover"
          style={{
            objectPosition: "center center",
          }}
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Contenido - POQUITO MÁS DE ESPACIO */}
      <div className="relative h-full flex items-center">
        <div className="w-full pl-8 md:pl-12">
          <div className="max-w-xl">
            {/* Kicker */}
            <p className="text-xs md:text-sm font-semibold tracking-widest text-white/90 uppercase mb-4">
              VIALINE · NIÑA
            </p>

            {/* Título */}
            <h2 className="text-5xl md:text-7xl font-bold text-white leading-none mb-6 uppercase">
              Niña
            </h2>

            {/* Descripción */}
            <p className="text-base md:text-lg text-white/90 mb-8 leading-relaxed">
              Comodidad para moverse, diseños que les encantan.
            </p>

            {/* Botón */}
            <Link
              href="/nina"
              className="inline-block px-8 py-4 bg-white text-neutral-900 font-bold text-sm uppercase rounded-full hover:bg-neutral-100 transition-colors"
            >
              Ver colección niña
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}