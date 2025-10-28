import { redirect } from "next/navigation"

// ✅ FIXED: /search ahora redirige a /buscar (ruta canónica)
// Esto evita duplicación de URLs y mejora SEO
export default async function SearchPage({
  searchParams
}: {
  searchParams: Promise<{ q?: string }>
}) {
  const params = await searchParams
  const query = params.q ?? ""

  // Redirect con query param preservado
  const url = query ? `/buscar?q=${encodeURIComponent(query)}` : "/buscar"
  redirect(url)
}
