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

export default function LegacyProductPage({
  params,
  searchParams,
}: {
  params: { slug: string }
  searchParams?: Record<string, SearchValue>
}) {
  const suffix = buildQueryString(searchParams)
  redirect(`/producto/${params.slug}${suffix}`)
}
