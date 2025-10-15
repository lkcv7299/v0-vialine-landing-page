import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { products } from "@/data/products"
import ProductCard from "@/components/ProductCard"

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

export default async function Page({ params }: Params) {
  const { gender, category } = await params
  const genderSlug = toSlug(gender)
  const categorySlug = toSlug(category)

  if (!["mujer", "nina"].includes(genderSlug)) notFound()

  const rows = (products as any[]).filter((p) => matchGender(p, genderSlug) && matchCategory(p, categorySlug))

  if (!rows.length) {
    notFound()
  }

  return (
    <main className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-10">
      <header className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-semibold capitalize">{categorySlug.replace(/-/g, " ")}</h1>
        <p className="mt-2 text-neutral-600 capitalize">{genderSlug}</p>
      </header>

      <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {rows.map((p) => (
          <li key={p.slug}>
            <ProductCard product={p} />
          </li>
        ))}
      </ul>
    </main>
  )
}