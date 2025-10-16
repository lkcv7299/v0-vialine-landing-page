import { redirect } from "next/navigation"

type SearchValue = string | string[] | undefined

function buildQueryString(searchParams: Record<string, SearchValue> | undefined) {
  const query = new URLSearchParams()
  if (!searchParams) return ""
  for (const [key, value] of Object.entries(searchParams)) {
    if (Array.isArray(value)) {
      value.filter(Boolean).forEach((item) => query.append(key, item))
    } else if (value) {
      query.set(key, value)
    }
  }
  const serialized = query.toString()
  return serialized ? `?${serialized}` : ""
}

export default async function LegacyProductPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>
  searchParams: Promise<Record<string, SearchValue> | undefined>
}) {
  const { slug } = await params
  const search = await searchParams
  const suffix = buildQueryString(search)
  redirect(`/producto/${slug}${suffix}`)
}
