export type FabricSlug = "suplex" | "algodon"

export type FabricInfo = {
  slug: FabricSlug
  name: string
  summary: string
  description?: string
}

export const FABRICS: FabricInfo[] = [
  {
    slug: "suplex",
    name: "Suplex",
    summary: "Compresión media-alta, transpirable y squat-proof.",
    description:
      "Nuestro tejido insignia para entrenar con comodidad: mantiene la forma, ofrece soporte y no transparenta al moverte.",
  },
  {
    slug: "algodon",
    name: "Algodón",
    summary: "Suave sobre la piel, uso diario, no transparenta.",
    description:
      "Ideal para el día a día: acabado suave, fresco y con la elasticidad justa para acompañarte desde casa hasta la calle.",
  },
]

export const FABRIC_LOOKUP = Object.fromEntries(FABRICS.map((fabric) => [fabric.slug, fabric])) as Record<
  FabricSlug,
  FabricInfo
>
