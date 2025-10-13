export type Product = {
  slug: "body-manga-corta-suplex" | "body-manga-corta" | "body-manga-larga"
  name: string
  price: number
  category: "Body"
  material: string
  details: string[]
  benefits: string[]
  sizes: ("S" | "M" | "L" | "XL")[]
  colors: {
    code: string // e.g., "rojo", "negro", "blanco", "azul-marino"
    name: string // human readable (also Spanish)
    hex: string // swatch color
  }[]
  baseImage: string // base product image .webp
  seo?: { title?: string; description?: string }
}

const BASE = (file: string) => `/productos/mujer/bodys/${file}.webp`

export const products: Product[] = [
  // BODY MANGA CORTA SUPLEX
  {
    slug: "body-manga-corta-suplex",
    name: "Body manga corta suplex",
    price: 43,
    category: "Body",
    material: "Suplex liso",
    details: ["Diseño bikini", "Gafete graduable", "Ajuste ideal"],
    benefits: [
      "Se adapta al cuerpo",
      "Cómodo para el uso diario",
      "Te mantiene fresca",
      "Ideal para combinarlo con chaquetas o camisas para un look casual; y con jean o pantalones de vestir para un look más formal",
    ],
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { code: "azul-marino", name: "Azul marino", hex: "#0a1a3d" },
      { code: "blanco", name: "Blanco", hex: "#ffffff" },
      { code: "negro", name: "Negro", hex: "#111827" },
      { code: "rojo", name: "Rojo", hex: "#dc2626" },
    ],
    baseImage: BASE("body-manga-corta-suplex"),
    seo: {
      title: "Body manga corta suplex | Vialine",
      description: "Suplex liso con diseño bikini y gafete graduable. Ajuste ideal y opacidad total.",
    },
  },

  // BODY MANGA CORTA (ALGODÓN LICRADO)
  {
    slug: "body-manga-corta",
    name: "Body manga corta",
    price: 40,
    category: "Body",
    material: "Algodón licrado",
    details: ["Diseño bikini", "Gafete graduable", "Ajuste ideal"],
    benefits: [
      "Se adapta al cuerpo",
      "Cómodo para el uso diario",
      "Te mantiene fresca",
      "Ideal para combinarlo con chaquetas o camisas para un look casual; y con jean o pantalones de vestir para un look más formal",
    ],
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { code: "amarillo", name: "Amarillo", hex: "#facc15" },
      { code: "beige", name: "Beige", hex: "#e9d8c5" },
      { code: "blanco", name: "Blanco", hex: "#ffffff" },
      { code: "negro", name: "Negro", hex: "#111827" },
      { code: "rojo", name: "Rojo", hex: "#dc2626" },
      { code: "rosado", name: "Rosado", hex: "#f472b6" },
    ],
    baseImage: BASE("body-manga-corta"),
    seo: {
      title: "Body manga corta algodón licrado | Vialine",
      description: "Algodón licrado con diseño bikini y gafete graduable. Fresco y cómodo para el día a día.",
    },
  },

  // BODY MANGA LARGA (ALGODÓN LICRADO)
  {
    slug: "body-manga-larga",
    name: "Body manga larga",
    price: 43,
    category: "Body",
    material: "Algodón licrado",
    details: ["Diseño bikini", "Gafete graduable", "Ajuste ideal"],
    benefits: [
      "Se adapta al cuerpo",
      "Cómodo para el uso diario",
      "Te abriga y mantiene fresca en épocas de invierno",
      "Ideal para combinarlo con chaquetas o camisas para un look casual; y con jean o pantalones de vestir para un look más formal",
    ],
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { code: "blanco", name: "Blanco", hex: "#ffffff" },
      { code: "negro", name: "Negro", hex: "#111827" },
      { code: "rojo", name: "Rojo", hex: "#dc2626" },
      { code: "rosado", name: "Rosado", hex: "#f472b6" },
    ],
    baseImage: BASE("body-manga-larga"),
    seo: {
      title: "Body manga larga algodón licrado | Vialine",
      description: "Body manga larga en algodón licrado; abriga y mantiene fresca. Diseño bikini y gafete graduable.",
    },
  },
]

export function getProductBySlug(slug: Product["slug"]) {
  return products.find((p) => p.slug === slug)
}
