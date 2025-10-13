import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { products } from "@/data/products"
import ProductCard from "@/components/ui/ProductCard"
import type { CategorySlug } from "@/lib/assets"

type Params = {
  params: { gender: string; category: string }
  searchParams: Record<string, string | string[] | undefined>
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

  // Strip trailing 's' from both the search term and fields for better matching
  const catBase = catSlug.replace(/s$/, "")
  const fieldsWithVariants = fields.flatMap((f) => [f, f.replace(/s$/, "")])

  // Also allow name/slug/title to contain the category word
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

function mapCategory(category: string): CategorySlug | undefined {
  const normalized = category.toLowerCase()
  if (normalized === "enterizos" || normalized === "enterizo") return "enterizo"
  if (normalized === "leggings" || normalized === "legging") return "legging"
  if (normalized === "bodys" || normalized === "body") return "bodys"
  if (normalized === "pescador") return "pescador"
  return undefined
}

function getColorSlugs(colors: any): string[] | undefined {
  if (!colors || !Array.isArray(colors) || colors.length === 0) return undefined
  return colors.map((c: any) => (typeof c === "string" ? c.toLowerCase() : c.slug))
}

export async function generateMetadata({
  params,
}: {
  params: { gender: string; category: string }
}): Promise<Metadata> {
  const gender = params.gender
  const category = params.category.replace(/-/g, " ")
  return {
    title: `${category} · ${gender} · Vialine`,
    description: `Explora ${category} para ${gender} en Vialine.`,
  }
}

export default function Page({ params }: Params) {
  const gender = toSlug(params.gender)
  const category = toSlug(params.category)

  if (!["mujer", "nina"].includes(gender)) notFound()

  const rows = (products as any[]).filter((p) => matchGender(p, gender) && matchCategory(p, category))

  if (!rows.length) {
    notFound()
  }

  return (
    <main className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-10">
      <header className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-semibold capitalize">{category.replace(/-/g, " ")}</h1>
        <p className="mt-2 text-neutral-600 capitalize">{gender}</p>
      </header>

      <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {rows.map((p) => (
          <li key={p.slug}>
            <ProductCard
              href={`/producto/${p.slug}`}
              title={p.title}
              price={p.price}
              image={p.image}
              category={mapCategory(p.category)}
              slug={p.slug}
              colors={getColorSlugs(p.colors)}
            />
          </li>
        ))}
      </ul>
    </main>
  )
}
