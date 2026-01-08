import Link from "next/link"
import { Zap, Feather, ArrowRight, Sparkles } from "lucide-react"
import { FABRICS, fabricFamilies, getVariantsByFamily } from "@/data/fabrics"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Nuestros Tejidos | Vialine",
  description: "Descubre los tejidos premium de Vialine: Suplex de alto rendimiento y Algodón de máxima suavidad. Conoce las características de cada tejido.",
  keywords: ["tejidos deportivos", "suplex premium", "algodón premium", "ropa deportiva calidad"]
}

// Iconos por familia
const familyIcons = {
  suplex: Zap,
  algodon: Feather
}

export default function FabricsIndexPage() {
  const suplexVariants = getVariantsByFamily("suplex")
  const algodonVariants = getVariantsByFamily("algodon")

  return (
    <main className="min-h-screen bg-gradient-to-b from-neutral-50 to-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-rose-50 via-transparent to-violet-50 opacity-60" />
        <div className="relative mx-auto max-w-6xl px-4 py-16 md:py-24">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-rose-100 px-4 py-1.5 text-sm font-medium text-rose-700">
              <Sparkles className="h-4 w-4" />
              Calidad que se siente
            </div>
            <h1 className="mt-6 text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900 leading-tight">
              Tejidos diseñados para{" "}
              <span className="bg-gradient-to-r from-rose-600 to-violet-600 bg-clip-text text-transparent">
                tu movimiento
              </span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-neutral-600 leading-relaxed">
              Cada tejido en Vialine está seleccionado con un propósito: acompañarte en tus entrenamientos
              más intensos o brindarte la comodidad perfecta para tu día a día.
            </p>
          </div>
        </div>
      </section>

      {/* Familias de Tejidos */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        {/* FAMILIA SUPLEX */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 text-white shadow-lg shadow-violet-200">
              <Zap className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-neutral-900">
                {fabricFamilies.suplex.name}
              </h2>
              <p className="text-neutral-600">Performance & Deporte</p>
            </div>
          </div>
          <p className="text-neutral-600 mb-8 max-w-2xl">
            {fabricFamilies.suplex.description}
          </p>

          <div className="grid gap-4 md:grid-cols-2">
            {suplexVariants.map((fabric) => (
              <Link
                key={fabric.slug}
                href={`/tejido/${fabric.slug}`}
                className="group relative overflow-hidden rounded-2xl border border-violet-100 bg-gradient-to-br from-white to-violet-50/50 p-6 transition-all hover:shadow-xl hover:shadow-violet-100 hover:border-violet-200"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-neutral-900 group-hover:text-violet-700 transition-colors">
                      {fabric.name}
                    </h3>
                    <p className="mt-2 text-violet-600 font-medium text-sm">
                      {fabric.summary}
                    </p>
                    <p className="mt-3 text-neutral-600 text-sm line-clamp-2">
                      {fabric.description}
                    </p>
                  </div>
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-violet-100 text-violet-600 group-hover:bg-violet-600 group-hover:text-white transition-colors">
                    <ArrowRight className="h-5 w-5" />
                  </div>
                </div>
                <div className="mt-6 flex items-center gap-2 text-sm font-medium text-violet-700">
                  <span>Ver colección</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* FAMILIA ALGODÓN */}
        <div>
          <div className="flex items-center gap-3 mb-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-lg shadow-amber-200">
              <Feather className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-neutral-900">
                {fabricFamilies.algodon.name}
              </h2>
              <p className="text-neutral-600">Comfort & Lifestyle</p>
            </div>
          </div>
          <p className="text-neutral-600 mb-8 max-w-2xl">
            {fabricFamilies.algodon.description}
          </p>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {algodonVariants.map((fabric) => (
              <Link
                key={fabric.slug}
                href={`/tejido/${fabric.slug}`}
                className="group relative overflow-hidden rounded-2xl border border-amber-100 bg-gradient-to-br from-white to-amber-50/50 p-6 transition-all hover:shadow-xl hover:shadow-amber-100 hover:border-amber-200"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-neutral-900 group-hover:text-amber-700 transition-colors">
                      {fabric.name}
                    </h3>
                    <p className="mt-2 text-amber-600 font-medium text-sm">
                      {fabric.summary}
                    </p>
                    <p className="mt-3 text-neutral-600 text-sm line-clamp-2">
                      {fabric.description}
                    </p>
                  </div>
                </div>
                <div className="mt-6 flex items-center gap-2 text-sm font-medium text-amber-700">
                  <span>Ver colección</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="rounded-3xl bg-gradient-to-br from-neutral-900 to-neutral-800 p-8 md:p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            ¿No sabes cuál elegir?
          </h2>
          <p className="mt-4 text-neutral-300 max-w-xl mx-auto">
            Visita nuestra guía de tallas y tejidos para encontrar la combinación perfecta
            según tu actividad y preferencias.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/mujer"
              className="inline-flex items-center justify-center rounded-full bg-rose-600 px-6 py-3 text-sm font-semibold text-white shadow-lg hover:bg-rose-700 transition"
            >
              Explorar colección
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link
              href="/tallas"
              className="inline-flex items-center justify-center rounded-full bg-white/10 px-6 py-3 text-sm font-semibold text-white hover:bg-white/20 transition"
            >
              Guía de tallas
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
