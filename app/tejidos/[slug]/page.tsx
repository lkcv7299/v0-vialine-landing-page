import { notFound } from "next/navigation"

const fabrics: Record<string, { title: string; desc: string }> = {
  suplex: {
    title: "Suplex",
    desc: "Compresión media-alta, transpirable y squat-proof.",
  },
  algodon: {
    title: "Algodón",
    desc: "Suave sobre la piel, uso diario, no transparenta.",
  },
}

export default async function TejidosPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>
  searchParams: Promise<Record<string, string> | undefined>
}) {
  const { slug } = await params
  const f = fabrics[slug]
  
  if (!f) return notFound()

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl md:text-4xl font-bold">{f.title}</h1>
      <p className="mt-2 text-neutral-700">{f.desc}</p>
      <p className="mt-6 text-sm text-neutral-600">Muy pronto verás productos filtrados por este tejido.</p>
    </main>
  )
}