import Link from "next/link"
import { byAudience, type Product } from "@/data/products"
import GymRail from "@/components/GymRail"
import HeroMujerVideo from "@/components/Hero/HeroMujerVideo"
import HeroNina from "@/components/Hero/HeroNina"
import { FABRICS } from "@/data/fabrics"

// Helper para obtener imagen primaria del producto
function getPrimaryImage(product: Product): string {
  const colorEntry = product.colors.find((c) => typeof c === "object" && c.image) as
    | { image: string }
    | undefined
  return colorEntry?.image || product.image || "/placeholder.svg"
}

// Helper para obtener hover image (segunda imagen del mismo color o de otro color)
function getHoverImage(product: Product, primaryImage: string): string | null {
  // 1. Buscar el color que tiene la imagen primaria
  const primaryColor = product.colors.find((c) => {
    if (typeof c !== "object") return false
    if (c.image === primaryImage) return true
    if (c.images && c.images.includes(primaryImage)) return true
    return false
  }) as { image?: string; images?: string[] } | undefined

  // Si el color primario tiene gallery con más de 1 imagen, usar la segunda
  if (primaryColor?.images && primaryColor.images.length > 1) {
    const secondImage = primaryColor.images[1]
    if (secondImage && secondImage !== primaryImage) {
      return secondImage
    }
  }

  // 2. Buscar otro color con imagen diferente
  const alternativeColor = product.colors.find((c) => {
    if (typeof c !== "object") return false
    const altImage = c.images?.[0] || c.image
    return altImage && altImage !== primaryImage
  }) as { image?: string; images?: string[] } | undefined

  if (alternativeColor) {
    return alternativeColor.images?.[0] || alternativeColor.image || null
  }

  return null
}

export default function VialineHome() {
  const mujerProducts = byAudience("mujer").slice(0, 12)
  const ninaProducts = byAudience("nina").slice(0, 12)

  const popularMujer = mujerProducts.map((p) => {
    const primaryImage = getPrimaryImage(p)
    return {
      slug: p.slug,
      name: p.title,
      price: p.price,
      image: primaryImage,
      hoverImage: getHoverImage(p, primaryImage),
    }
  })

  const popularNina = ninaProducts.map((p) => {
    const primaryImage = getPrimaryImage(p)
    return {
      slug: p.slug,
      name: p.title,
      price: p.price,
      image: primaryImage,
      hoverImage: getHoverImage(p, primaryImage),
    }
  })

  return (
    <>
      {/* HERO MUJER CON VIDEO - FUERA DEL MAIN PARA FULLWIDTH */}
      <HeroMujerVideo />

      <main className="min-h-screen bg-neutral-50 text-neutral-900">
        <GymRail title="Popular ahora (Mujer)" viewAllHref="/mujer" items={popularMujer} />

        {/* HERO NIÑA - ROMPE EL CONTENEDOR */}
        <div className="relative -mx-4 md:-mx-0">
          <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
            <HeroNina />
          </div>
        </div>

        {popularNina.length > 0 && <GymRail title="Popular ahora (Niña)" viewAllHref="/nina" items={popularNina} />}

        {/* COMPRA POR TEJIDO */}
        <section className="mx-auto max-w-7xl px-4 md:px-6 py-12 md:py-16">
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
            {FABRICS.map((fabric) => (
              <Link
                key={fabric.slug}
                href={`/tejido/${fabric.slug}`}
                className="group rounded-3xl border border-neutral-200 bg-white p-6 hover:shadow-lg transition"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg md:text-xl font-medium">{fabric.name}</h3>
                    <p className="mt-1 text-sm text-neutral-600 max-w-prose">{fabric.summary}</p>
                  </div>
                  <div className="h-14 w-14 rounded-2xl bg-neutral-100 grid place-content-center text-xs text-neutral-500">
                    {fabric.name.substring(0, 2)}
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
          <div className="mx-auto max-w-7xl px-4 md:px-6 py-10 text-sm text-neutral-600 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
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
    </>
  )
}
