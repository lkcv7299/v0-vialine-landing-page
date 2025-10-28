import { redirect } from "next/navigation"

// ✅ FIXED: /tejidos/[slug] redirige a /tejido/[slug] (ruta canónica funcional)
export default async function TejidosRedirectPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>
  searchParams: Promise<Record<string, string | string[]> | undefined>
}) {
  const { slug } = await params
  const search = await searchParams

  // Construir query string si existe
  const queryString = search ? new URLSearchParams(
    Object.entries(search).reduce((acc, [key, value]) => {
      if (Array.isArray(value)) {
        value.forEach(v => acc.append(key, v))
      } else if (value) {
        acc.set(key, value)
      }
      return acc
    }, new URLSearchParams())
  ).toString() : ""

  const url = `/tejido/${slug}${queryString ? `?${queryString}` : ""}`
  redirect(url)
}
