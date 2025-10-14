import Link from "next/link"
import { FABRICS } from "@/data/fabrics"

export default function FabricsIndexPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <header className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-wide text-rose-600">Tejidos</p>
        <h1 className="mt-2 text-3xl md:text-4xl font-bold text-neutral-900">Descubre nuestros tejidos</h1>
        <p className="mt-3 text-neutral-600">
          Conoce las características de cada tejido y encuentra prendas que se adapten a tu rutina.
        </p>
      </header>

      <section className="mt-10 grid gap-6 md:grid-cols-2">
        {FABRICS.map((fabric) => (
          <article
            key={fabric.slug}
            className="group rounded-3xl border border-neutral-200 bg-white p-6 transition hover:shadow-lg"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold text-neutral-900">{fabric.name}</h2>
                <p className="mt-2 text-neutral-600">{fabric.summary}</p>
                {fabric.description && <p className="mt-4 text-sm text-neutral-500">{fabric.description}</p>}
              </div>
              <span className="h-12 w-12 shrink-0 rounded-2xl bg-neutral-100 text-neutral-500 grid place-content-center text-sm font-medium">
                {fabric.name.substring(0, 2)}
              </span>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href={`/tejido/${fabric.slug}`}
                className="inline-flex items-center rounded-full bg-rose-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-rose-700"
              >
                Ver productos
              </Link>
              <Link
                href={`/tejido/${fabric.slug}`}
                className="inline-flex items-center text-sm font-medium text-rose-700 hover:underline underline-offset-4"
              >
                Más información
              </Link>
            </div>
          </article>
        ))}
      </section>
    </main>
  )
}
