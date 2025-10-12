import Image from "next/image"
import Link from "next/link"
import { findProduct } from "@/data/products"
import ProductCard from "@/components/ProductCard"

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

const categories = [
  { name: "Leggings", href: "/colecciones/linea-suplex" },
  { name: "Tops deportivos", href: "/colecciones/tops-algodon" },
  { name: "Bikers", href: "/colecciones/linea-suplex" },
  { name: "Enterizos", href: "/colecciones/enterizos" },
  { name: "Bodys", href: "/colecciones/bodys" },
  { name: "Camisetas (algodón)", href: "/colecciones/camisetas" },
]

const FEATURED_SLUGS = [
  "short-ciclista-active",
  "body-manga-larga",
  "camiseta-manga-larga",
  "top-venus",
  "short-slim",
  "straple-chanel",
]

export default function VialineHome() {
  const featured = FEATURED_SLUGS.map((s) => findProduct(s)).filter(Boolean) as any[]

  return (
    <main className="min-h-screen bg-neutral-50 text-neutral-900">
      {/* HERO: video Mujer + tarjeta Niña */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl grid md:grid-cols-12">
          {/* Lado Mujer (video) */}
          <div className="relative md:col-span-7 md:h-[70vh] min-h-[420px] overflow-hidden rounded-3xl">
            <video
              className="absolute inset-0 h-full w-full object-cover object-center"
              autoPlay
              muted
              loop
              playsInline
              poster="/hero-woman.jpg"
            >
              <source src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/vialine-1-PkicDlWXPsdb7O6iWW8hAEoSoyrlWL.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 md:left-8 md:bottom-8 max-w-md text-white">
              <p className="uppercase tracking-widest text-xs/relaxed opacity-90">Vialine · Línea Suplex</p>
              <h1 className="mt-2 text-3xl md:text-4xl font-semibold">Básicos que rinden</h1>
              <p className="mt-2 text-sm md:text-base text-white/90">
                Set suplex: top soporte medio + legging tiro alto. Ajuste que estiliza, opacidad total.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <Link
                  href="/colecciones/linea-suplex"
                  className="inline-flex items-center justify-center rounded-2xl bg-rose-600 px-5 py-3 text-white font-semibold tracking-wide shadow-lg hover:bg-rose-700 transition"
                >
                  Comprar sets
                </Link>
                <Link
                  href="/colecciones/linea-suplex"
                  className="inline-flex items-center justify-center rounded-2xl border border-white/40 bg-white/10 px-5 py-3 backdrop-blur text-white hover:bg-white/20 transition"
                >
                  Ver Suplex
                </Link>
              </div>
            </div>
          </div>

          {/* Lado Niña (card) */}
          <div className="md:col-span-5 md:h-[70vh] min-h-[420px] flex items-center">
            <div className="w-full max-w-sm mx-auto text-center">
              <div className="relative h-[420px] md:h-full overflow-hidden rounded-3xl">
                <Image
                  src="/hero-nina.jpg"
                  alt="Niña con camiseta deportiva y legging Vialine"
                  fill
                  className="object-cover object-center"
                  sizes="(min-width: 768px) 40vw, 100vw"
                  priority={false}
                />
                <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-[#F7F3F2] via-[#F7F3F2]/70 to-transparent" />
              </div>
              <h3 className="mt-4 text-xl font-medium">Niña</h3>
              <p className="text-sm text-neutral-600">Comodidad para moverse</p>
              <Link
                href="/nina"
                className="mt-4 inline-flex w-full items-center justify-center rounded-2xl border border-neutral-300 bg-white px-5 py-3 hover:bg-neutral-50 transition"
              >
                Ver niña
              </Link>
            </div>
          </div>
        </div>
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

      {/* Popular ahora product grid */}
      <section className="mx-auto max-w-7xl px-6 md:px-8 pb-16">
        <h2 className="text-2xl md:text-3xl font-heading font-semibold">Popular ahora</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          {featured.map((p: any) => (
            <ProductCard key={p.slug} product={p} />
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
