"use client"

import Link from "next/link"
import MuxPlayer from "@mux/mux-player-react"

// ✅ PLAYBACK ID del video en MUX
// Para obtener uno nuevo: ve a /admin/videos y sube el video
const MUX_PLAYBACK_ID = "OjLydFTbm6HM1BVE01hqt8W76K3D1NXoktv6HJ5SfTqA"

export default function HeroMujerVideo() {
  return (
    <section className="relative h-[85vh] min-h-[600px] w-full overflow-hidden bg-neutral-900">
      {/* Video de fondo con MUX */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <MuxPlayer
            playbackId={MUX_PLAYBACK_ID}
            streamType="on-demand"
            autoPlay="muted"
            muted
            loop
            playsInline
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-full min-h-full w-auto h-auto pointer-events-none [&::part(controls)]:hidden"
          />
        </div>
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
