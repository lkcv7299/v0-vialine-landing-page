import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { products } from "@/data/products"
import ProductCard from "@/components/ProductCard"
import ProductFiltersDesktop from "@/components/ProductFiltersDesktop"
import ProductFiltersDrawer from "@/components/ProductFiltersDrawer"

type Params = {
  params: Promise<{ gender: string; category: string }>
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

const toSlug = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")

const GENDER_ALIASES: Record<string, string[]> = {
  mujer: ["mujer", "women", "woman", "fem", "dama"],
  nina: ["nina", "niña", "girls", "girl", "kid", "kids"],
}

function matchGender(p: any, genderSlug: string) {
  const all = [p.audience, p.gender, p.for, p.segment, ...(Array.isArray(p.tags) ? p.tags : [])]
    .filter(Boolean)
    .map((v: string) => toSlug(v))

  const wanted = new Set((GENDER_ALIASES[genderSlug] ?? [genderSlug]).map(toSlug))
  return all.some((v) => wanted.has(v))
}

function matchCategory(p: any, catSlug: string) {
  const fields = [
    p.category,
    p.type,
    p.kind,
    p.family,
    p.collection,
    p.categorySlug,
    ...(Array.isArray(p.tags) ? p.tags : []),
  ]
    .filter(Boolean)
    .map((v: string) => toSlug(v))

  const catBase = catSlug.replace(/s$/, "")
  const fieldsWithVariants = fields.flatMap((f) => [f, f.replace(/s$/, "")])

  const nameish = [p.name, p.slug, p.title].filter(Boolean).join(" ").toLowerCase()

  return (
    fieldsWithVariants.includes(catSlug) ||
    fieldsWithVariants.includes(catBase) ||
    nameish.includes(catSlug.replace(/-/g, " ")) ||
    nameish.includes(catBase.replace(/-/g, " ")) ||
    nameish.includes(catSlug) ||
    nameish.includes(catBase)
  )
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { gender, category } = await params
  const categoryName = category.replace(/-/g, " ")

  return {
    title: `${categoryName} · ${gender} · Vialine`,
    description: `Explora ${categoryName} para ${gender} en Vialine.`,
  }
}

function applyFilters(rows: any[], sp: Record<string, string | string[] | undefined>) {
  let filtered = rows

  // Filtro de talla
  const sizes = Array.isArray(sp.size) ? sp.size : sp.size ? [sp.size] : []
  if (sizes.length) {
    filtered = filtered.filter((p) => p.sizes?.some((s: string) => sizes.includes(s)))
  }

  // Filtro de color
  const colors = Array.isArray(sp.color) ? sp.color : sp.color ? [sp.color] : []
  if (colors.length) {
    filtered = filtered.filter((p) =>
      p.colors?.some((c: any) => colors.includes(typeof c === "string" ? c : c.name))
    )
  }

  // Filtro de tejido
  if (sp.fabric) {
    filtered = filtered.filter((p) => p.fabric?.toLowerCase().replace(/\s+/g, "-") === sp.fabric)
  }

  // Filtro de categoría
  if (sp.category) {
    filtered = filtered.filter((p) => p.category === sp.category)
  }

  // ✨ NUEVO: Filtro de colección
  if (sp.collection) {
    filtered = filtered.filter((p) =>
      p.tags?.some((t: string) => toSlug(t) === sp.collection)
    )
  }

  // Filtro de precio
  const minPrice = sp.minPrice ? parseFloat(sp.minPrice as string) : null
  const maxPrice = sp.maxPrice ? parseFloat(sp.maxPrice as string) : null
  if (minPrice !== null) {
    filtered = filtered.filter((p) => p.price >= minPrice)
  }
  if (maxPrice !== null) {
    filtered = filtered.filter((p) => p.price <= maxPrice)
  }

  // Ordenar
  const sort = sp.sort as string | undefined
  if (sort === "price-asc") filtered.sort((a, b) => a.price - b.price)
  else if (sort === "price-desc") filtered.sort((a, b) => b.price - a.price)
  else if (sort === "name-asc") filtered.sort((a, b) => a.title.localeCompare(b.title))
  else if (sort === "name-desc") filtered.sort((a, b) => b.title.localeCompare(a.title))

  return filtered
}

export default async function Page({ params, searchParams }: Params) {
  const { gender, category } = await params
  const sp = await searchParams
  const genderSlug = toSlug(gender)
  const categorySlug = toSlug(category)

  if (!["mujer", "nina"].includes(genderSlug)) notFound()

  const allRows = (products as any[]).filter((p) => matchGender(p, genderSlug) && matchCategory(p, categorySlug))

  if (!allRows.length) {
    notFound()
  }

  const filteredRows = applyFilters(allRows, sp)

  return (
    <main className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-10">
      <header className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-semibold capitalize">{categorySlug.replace(/-/g, " ")}</h1>
        <p className="mt-2 text-neutral-600 capitalize">{genderSlug}</p>
      </header>

      {/* Filtros */}
      <div className="flex gap-8 lg:gap-12 mb-8">
        <ProductFiltersDesktop totalProducts={allRows.length} filteredCount={filteredRows.length} />

        <div className="flex-1">
          {/* Filtros móvil */}
          <div className="lg:hidden mb-6">
            <ProductFiltersDrawer totalProducts={allRows.length} filteredCount={filteredRows.length} />
          </div>

          <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-6">
            {filteredRows.map((p) => (
              <li key={p.slug}>
                <ProductCard product={p} />
              </li>
            ))}
          </ul>

          {filteredRows.length === 0 && (
            <div className="text-center py-12">
              <p className="text-neutral-600">No se encontraron productos con los filtros seleccionados.</p>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
