import Link from "next/link"
import Image from "next/image"

type HeroProps = {
  image: string
  kicker: string
  title: string
  description: string
  primary: { href: string; label: string }
  secondary?: { href: string; label: string }
  objectPositionDesktop?: string
  objectPositionMobile?: string
}

export default function Hero({
  image,
  kicker,
  title,
  description,
  primary,
  secondary,
  objectPositionDesktop = "center",
  objectPositionMobile = "center",
}: HeroProps) {
  return (
    <section className="relative h-[85vh] min-h-[600px] w-full overflow-hidden bg-neutral-900">
      {/* Imagen de fondo - FULLWIDTH SIN BORDES */}
      <div className="absolute inset-0">
        <Image
          src={image}
          alt={title}
          fill
          priority
          className="object-cover"
          style={{
            objectPosition: objectPositionMobile,
          }}
          sizes="100vw"
        />
        {/* Overlay sutil */}
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Contenido - PEGADO EXTREMO A LA IZQUIERDA */}
      <div className="relative h-full flex items-center">
        <div className="w-full pl-6 md:pl-8">
          {/* Texto MUY pegado a la izquierda - MÍNIMO padding */}
          <div className="max-w-xl">
            {/* Kicker */}
            <p className="text-xs md:text-sm font-semibold tracking-widest text-white/90 uppercase mb-4">
              {kicker}
            </p>

            {/* Título GRANDE y BOLD (estilo Gymshark) */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-none mb-6 uppercase">
              {title}
            </h1>

            {/* Descripción */}
            <p className="text-base md:text-lg text-white/90 mb-8 leading-relaxed">
              {description}
            </p>

            {/* Botones */}
            <div className="flex flex-wrap gap-4">
              <Link
                href={primary.href}
                className="px-8 py-4 bg-white text-neutral-900 font-bold text-sm uppercase rounded-full hover:bg-neutral-100 transition-colors"
              >
                {primary.label}
              </Link>

              {secondary && (
                <Link
                  href={secondary.href}
                  className="px-8 py-4 bg-transparent text-white font-bold text-sm uppercase rounded-full border-2 border-white hover:bg-white hover:text-neutral-900 transition-colors"
                >
                  {secondary.label}
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Responsive object-position */}
      <style jsx>{`
        @media (min-width: 768px) {
          .object-cover {
            object-position: ${objectPositionDesktop};
          }
        }
      `}</style>
    </section>
  )
}