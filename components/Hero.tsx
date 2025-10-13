"use client"
import Image from "next/image"

type HeroProps = {
  src?: string
  alt?: string
}

export default function Hero({ src = "/hero/hero-woman2.jpg", alt = "Vialine hero" }: HeroProps) {
  return (
    <section
      className="relative w-full overflow-hidden
                 h-[75svh] min-h-[520px] md:h-[82svh]"
    >
      {/* Imagen a pantalla completa */}
      <Image src={src || "/placeholder.svg"} alt={alt} fill priority sizes="100vw" className="hero-media select-none" />

      {/* Degradado para texto legible (opcional) */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 md:h-64
                      bg-gradient-to-t from-black/45 to-transparent"
      />

      {/* Slot de contenido existente (botones/títulos) si ya lo tienen */}
      {/* Coloca aquí tus títulos/CTAs o mantenlos donde estén ahora */}
    </section>
  )
}
