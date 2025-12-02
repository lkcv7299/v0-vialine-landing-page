"use client"

import Link from "next/link"
import { useState, useEffect } from "react"

export default function HeroMujerVideo() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Delay para que el video cargue después del contenido inicial
    const timer = setTimeout(() => setIsLoaded(true), 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section className="relative h-[85vh] min-h-[600px] w-full overflow-hidden bg-neutral-900">
      {/* Video de fondo */}
      <div className="absolute inset-0">
        {isLoaded && (
          <iframe
            src="https://www.youtube.com/embed/p_6WJfu1Dy0?autoplay=1&mute=1&loop=1&playlist=p_6WJfu1Dy0&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&enablejsapi=1&origin=https://vialine.pe"
            title="Vialine Hero Video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            className="absolute w-[300%] h-[300%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            style={{
              border: 'none',
              minWidth: '100%',
              minHeight: '100%',
            }}
          />
        )}
        {/* Overlay oscuro para legibilidad del texto */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Contenido */}
      <div className="relative h-full flex items-center z-10">
        <div className="w-full pl-8 md:pl-12">
          <div className="max-w-xl">
            {/* Kicker */}
            <p className="text-xs md:text-sm font-semibold tracking-widest text-white/90 uppercase mb-4">
              VIALINE · LÍNEA SUPLEX
            </p>

            {/* Título */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-none mb-6 uppercase">
              Básicos que rinden
            </h1>

            {/* Descripción */}
            <p className="text-base md:text-lg text-white/90 mb-8 leading-relaxed">
              Set suplex: top soporte medio + legging tiro alto. Ajuste que estiliza, opacidad total.
            </p>

            {/* Botones */}
            <div className="flex flex-wrap gap-4">
              <Link
                href="/mujer"
                className="px-8 py-4 bg-white text-neutral-900 font-bold text-sm uppercase rounded-full hover:bg-neutral-100 transition-colors"
              >
                Comprar Mujer
              </Link>

              <Link
                href="/tejido/suplex"
                className="px-8 py-4 bg-transparent text-white font-bold text-sm uppercase rounded-full border-2 border-white hover:bg-white hover:text-neutral-900 transition-colors"
              >
                Ver Tejidos
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
