import Link from "next/link"
import { byAudience } from "@/data/products"
import GymRail from "@/components/GymRail"
import HeroBanner from "@/components/HeroBanner"

const fabrics = [
  {
    name: "Suplex",
    slug: "suplex",
    copy: "Compresión media-alta, transpirable y squat-proof.",
    href: "/tejido/suplex",
  },
  {
    name: "Algodón",
    slug: "algodon",
    copy: "Suave sobre la piel, uso diario, no transparenta.",
    href: "/tejido/algodon",
  },
]

export default function VialineHome() {
  const mujerProducts = byAudience("mujer").slice(0, 12)
  const ninaProducts = byAudience("nina").slice(0, 12)

  const popularMujer = mujerProducts.map((p) => ({
    slug: p.slug,
    name: p.title,
    price: p.price,
    image: p.image,
  }))

  const popularNina = ninaProducts.map((p) => ({
    slug: p.slug,
    name: p.title,
    price: p.price,
    image: p.image,
  }))

  return (
    <main className="min-h-screen bg-neutral-50 text-neutral-900">
      {/* HERO: video Mujer + tarjeta Niña */}
      <section id="mujer" className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
        <HeroBanner
          image="/hero/hero-woman2.jpg"
          alt="Modelo en set suplex"
          eyebrow="VIALINE · LÍNEA SUPLEX"
          title="Básicos que rinden"
          subtitle="Set suplex: top soporte medio + legging tiro alto. Ajuste que estiliza, opacidad total."
          primaryCta={{ label: "Comprar sets", href: "/colecciones/sets" }}
          secondaryCta={{ label: "Ver Suplex", href: "/tejidos/suplex" }}
          focal={{ x: 68, y: 50 }}
        />

        <GymRail title="Popular ahora (Mujer)" viewAllHref="/mujer" items={popularMujer} />
      </section>

      <section id="nina" className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] mt-10">
        <HeroBanner
          image="/hero-nina.webp"
          alt="Niña Vialine"
          eyebrow="Vialine · Niña"
          title="Niña"
          subtitle="Comodidad para moverse, diseños que les encantan."
          primaryCta={{ label: "Ver colección niña", href: "/nina" }}
          focal={{ x: 50, y: 50 }}
        />

        {popularNina.length > 0 && <GymRail title="Popular ahora (Niña)" viewAllHref="/nina" items={popularNina} />}
      </section>

      {/* COMPRA POR TEJIDO */}
      <section className="mx-auto max-w-7xl px-6 md:px-8 py-12 md:py-16">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold">Compra por tejido</h2>
            <p className="mt-2 text-neutral-600 text-sm md:text-base">
              Elige el material que mejor se adapta a tu día.
            </p>
          </div>
          <Link href="/tejidos" className="hidden md:inline-flex text-sm underline underline-offset-4">
            Ver todos
          </Link>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {fabrics.map((f) => (
            <Link
              key={f.slug}
              href={f.href}
              className="group rounded-3xl border border-neutral-200 bg-white p-6 hover:shadow-lg transition"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg md:text-xl font-medium">{f.name}</h3>
                  <p className="mt-1 text-sm text-neutral-600 max-w-prose">{f.copy}</p>
                </div>
                <div className="h-14 w-14 rounded-2xl bg-neutral-100 grid place-content-center text-xs text-neutral-500">
                  {f.name.substring(0, 2)}
                </div>
              </div>
              <div className="mt-4 inline-flex items-center text-sm text-neutral-900">
                Descubrir
                <svg
                  className="ml-2 h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M5 12h14" />
                  <path d="M12 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* FOOTER MINIMAL */}
      <footer className="border-t border-neutral-200">
        <div className="mx-auto max-w-7xl px-6 md:px-8 py-10 text-sm text-neutral-600 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <p>© {new Date().getFullYear()} Vialine. Hecho con amor en Perú.</p>
          <nav className="flex gap-6">
            <Link href="/envios" className="hover:text-neutral-900">
              Envíos
            </Link>
            <Link href="/cambios" className="hover:text-neutral-900">
              Cambios & devoluciones
            </Link>
            <Link href="/tallas" className="hover:text-neutral-900">
              Guía de tallas
            </Link>
            <Link href="/contacto" className="hover:text-neutral-900">
              Contacto
            </Link>
          </nav>
        </div>
      </footer>
    </main>
  )
}
