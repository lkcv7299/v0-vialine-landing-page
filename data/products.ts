export type Product = {
  slug: string
  title: string
  price: number
  image: string // path under /public/productos/<category>/<slug>.jpg
  category: "leggings" | "bikers" | "shorts" | "tops" | "bodysuits" | "camisetas" | "enterizos" | "pescador" | "torero"
  fabric: "suplex" | "algodon"
  colors: string[] | { name: string; slug: string; hex: string; image?: string; images?: string[] }[] // Support single image or gallery
  sizes: string[]
  audience: "mujer" | "nina"
  // Optional detailed attributes for products with variants
  tags?: string[]
  attributes?: {
    material: string
    detalles: string[]
    beneficios: string[]
  }
  inventory?: number
  badge?: "nuevo" | "oferta" // Badge visual para el producto
  originalPrice?: number // Precio original (para mostrar tachado en ofertas)
}

export const products: Product[] = [

  {
    slug: "camiseta-cuello-alto",
    title: "Camiseta cuello alto",
    price: 29,
    image: "/productos/mujer/camisetas/camiseta-cuello-alto-azul-marino-cuello-alto-azulmarino1.webp",
    category: "camisetas",
    fabric: "algodon",
    colors: [
      {
      name: "Azul Marino",
      slug: "azulmarino",
      hex: "#1E3A8A",
      images: [
        "/productos/mujer/camisetas/camiseta-cuello-alto-azul-marino-cuello-alto-azulmarino1.webp",
        "/productos/mujer/camisetas/camiseta-cuello-alto-azul-marino-cuello-alto-azulmarino2.webp",
        "/productos/mujer/camisetas/camiseta-cuello-alto-azul-marino-cuello-alto-azulmarino3.webp",
        "/productos/mujer/camisetas/camiseta-cuello-alto-azul-marino-cuello-alto-azulmarino4.webp"
      ]
    },
      {
      name: "Beige",
      slug: "beige",
      hex: "#F5F5DC",
      images: [
        "/productos/mujer/camisetas/camiseta-cuello-alto-beige-cuello-alto-beige1.webp",
        "/productos/mujer/camisetas/camiseta-cuello-alto-beige-cuello-alto-beige2.webp",
        "/productos/mujer/camisetas/camiseta-cuello-alto-beige-cuello-alto-beige3.webp",
        "/productos/mujer/camisetas/camiseta-cuello-alto-beige-cuello-alto-beige4.webp"
      ]
    },
      {
      name: "Blanco",
      slug: "blanco",
      hex: "#FFFFFF",
      images: [
        "/productos/mujer/camisetas/camiseta-cuello-alto-blanco-cuello-alto-blanco1.webp",
        "/productos/mujer/camisetas/camiseta-cuello-alto-blanco-cuello-alto-blanco2.webp",
        "/productos/mujer/camisetas/camiseta-cuello-alto-blanco-cuello-alto-blanco3.webp",
        "/productos/mujer/camisetas/camiseta-cuello-alto-blanco-cuello-alto-blanco4.webp"
      ]
    },
      {
      name: "Negro",
      slug: "negro",
      hex: "#000000",
      images: [
        "/productos/mujer/camisetas/camiseta-cuello-alto-negro-cuello-alto-negro1.webp",
        "/productos/mujer/camisetas/camiseta-cuello-alto-negro-cuello-alto-negro2.webp",
        "/productos/mujer/camisetas/camiseta-cuello-alto-negro-cuello-alto-negro3.webp",
        "/productos/mujer/camisetas/camiseta-cuello-alto-negro-cuello-alto-negro4.webp"
      ]
    },
      {
      name: "Rojo",
      slug: "rojo",
      hex: "#D22B2B",
      images: [
        "/productos/mujer/camisetas/camiseta-cuello-alto-rojo-cuello-alto-rojo1.webp",
        "/productos/mujer/camisetas/camiseta-cuello-alto-rojo-cuello-alto-rojo2.webp",
        "/productos/mujer/camisetas/camiseta-cuello-alto-rojo-cuello-alto-rojo3.webp",
        "/productos/mujer/camisetas/camiseta-cuello-alto-rojo-cuello-alto-rojo4.webp"
      ]
    },
      {
      name: "Turquesa",
      slug: "turquesa",
      hex: "#40E0D0",
      images: [
        "/productos/mujer/camisetas/camiseta-cuello-alto-turquesa-cuello-alto-turquesa1.webp",
        "/productos/mujer/camisetas/camiseta-cuello-alto-turquesa-cuello-alto-turquesa3.webp",
        "/productos/mujer/camisetas/camiseta-cuello-alto-turquesa-cuello-alto-tuquesa4.webp"
      ]
    },
      {
      name: "Verde Petróleo",
      slug: "petroleo",
      hex: "#00534E",
      images: [
        "/productos/mujer/camisetas/camiseta-cuello-alto-verde-petroleo-cuello-alto-petroleo1.webp",
        "/productos/mujer/camisetas/camiseta-cuello-alto-verde-petroleo-cuello-alto-petroleo2.webp",
        "/productos/mujer/camisetas/camiseta-cuello-alto-verde-petroleo-cuello-alto-petroleo3.webp",
        "/productos/mujer/camisetas/camiseta-cuello-alto-verde-petroleo-cuello-alto-petroleo4.webp"
      ]
    },
      {
      name: "Vino",
      slug: "vino",
      hex: "#722F37",
      images: [
        "/productos/mujer/camisetas/camiseta-cuello-alto-vino-cuello-alto-vino1.webp",
        "/productos/mujer/camisetas/camiseta-cuello-alto-vino-cuello-alto-vino2.webp",
        "/productos/mujer/camisetas/camiseta-cuello-alto-vino-cuello-alto-vino3.webp",
        "/productos/mujer/camisetas/camiseta-cuello-alto-vino-cuello-alto-vino4.webp",
        "/productos/mujer/camisetas/camiseta-cuello-alto-vino-cuello-alto-vino5.webp"
      ]
    },
    ],
    sizes: ["S","M","L","XL"],
    audience: "mujer",
    badge: "nuevo",    tags: ["COD.389", "Colección Camisetas Algodón Licrado", "Algodón Licrado"],

    attributes: {
        "material": "Algodón Licrado",
        "detalles": [
            "Cuello alto",
            "Algodón licrado"
        ],
        "beneficios": []
    },
  },

  {
    slug: "camiseta-manga-larga",
    title: "Camiseta manga larga",
    price: 36,
    image: "/productos/mujer/camisetas/camiseta-manga-larga-azul-marino-manga-larga-azul-marino2.webp",
    category: "camisetas",
    fabric: "algodon",
    colors: [
      {
      name: "Azul",
      slug: "azul",
      hex: "#1E3A8A",
      images: [
        "/productos/mujer/camisetas/camiseta-manga-larga-azul-marino-manga-larga-azul-marino2.webp",
        "/productos/mujer/camisetas/camiseta-manga-larga-azul-marino-manga-larga-azul-marino3.webp",
        "/productos/mujer/camisetas/camiseta-manga-larga-azul-marino-manga-larga-azul-marino4.webp",
        "/productos/mujer/camisetas/camiseta-manga-larga-azul-marino-manga-larga-azul-marino5.webp"
      ]
    },
      {
      name: "Azul Marino",
      slug: "azul-marino",
      hex: "#1E3A8A",
      images: [
        "/productos/mujer/camisetas/camiseta-manga-larga-azul-marino-manga-larga-zul-marino1.webp",
        "/productos/mujer/camisetas/camiseta-manga-larga-azul-marino-manga-larga-azul-marino2.webp",
        "/productos/mujer/camisetas/camiseta-manga-larga-azul-marino-manga-larga-azul-marino3.webp",
        "/productos/mujer/camisetas/camiseta-manga-larga-azul-marino-manga-larga-azul-marino4.webp",
        "/productos/mujer/camisetas/camiseta-manga-larga-azul-marino-manga-larga-azul-marino5.webp"
      ]
    },
      {
      name: "Beige",
      slug: "beige",
      hex: "#F5F5DC",
      images: [
        "/productos/mujer/camisetas/camiseta-manga-larga-beige-manga-larga-beige1.webp",
        "/productos/mujer/camisetas/camiseta-manga-larga-beige-manga-larga-beige2.webp",
        "/productos/mujer/camisetas/camiseta-manga-larga-beige-manga-larga-beige3.webp",
        "/productos/mujer/camisetas/camiseta-manga-larga-beige-manga-larga-beige4.webp",
        "/productos/mujer/camisetas/camiseta-manga-larga-beige-manga-larga-beige5.webp"
      ]
    },
      {
      name: "Blanco",
      slug: "blanco",
      hex: "#FFFFFF",
      images: [
        "/productos/mujer/camisetas/camiseta-manga-larga-blanco-manga-larga-blanco1.webp",
        "/productos/mujer/camisetas/camiseta-manga-larga-blanco-manga-larga-blanco2.webp",
        "/productos/mujer/camisetas/camiseta-manga-larga-blanco-manga-larga-blanco3.webp",
        "/productos/mujer/camisetas/camiseta-manga-larga-blanco-manga-larga-blanco4.webp",
        "/productos/mujer/camisetas/camiseta-manga-larga-blanco-manga-larga-blanco5.webp"
      ]
    },
      {
      name: "Negro",
      slug: "negro",
      hex: "#000000",
      images: [
        "/productos/mujer/camisetas/camiseta-manga-larga-negro-manga-larga-negro1.webp",
        "/productos/mujer/camisetas/camiseta-manga-larga-negro-manga-larga-negro2.webp",
        "/productos/mujer/camisetas/camiseta-manga-larga-negro-manga-larga-negro3.webp",
        "/productos/mujer/camisetas/camiseta-manga-larga-negro-manga-larga-negro4.webp",
        "/productos/mujer/camisetas/camiseta-manga-larga-negro-manga-larga-negro5.webp"
      ]
    },
      {
      name: "Rojo",
      slug: "rojo",
      hex: "#D22B2B",
      images: [
        "/productos/mujer/camisetas/camiseta-manga-larga-rojo-manga-larga-rojo1.webp",
        "/productos/mujer/camisetas/camiseta-manga-larga-rojo-manga-larga-rojo2.webp",
        "/productos/mujer/camisetas/camiseta-manga-larga-rojo-manga-larga-rojo3.webp",
        "/productos/mujer/camisetas/camiseta-manga-larga-rojo-manga-larga-rojo4.webp",
        "/productos/mujer/camisetas/camiseta-manga-larga-rojo-manga-larga-rojo5.webp"
      ]
    },
      {
      name: "Turquesa",
      slug: "tuqrquesa",
      hex: "#40E0D0",
      images: [
        "/productos/mujer/camisetas/camiseta-manga-larga-turquesa-manga-larga-tuqrquesa4.webp",
        "/productos/mujer/camisetas/camiseta-manga-larga-turquesa-manga-larga-turquesa1.webp",
        "/productos/mujer/camisetas/camiseta-manga-larga-turquesa-manga-larga-turquesa2.webp",
        "/productos/mujer/camisetas/camiseta-manga-larga-turquesa-manga-larga-turquesa3.webp",
        "/productos/mujer/camisetas/camiseta-manga-larga-turquesa-manga-larga-turquesa5.webp"
      ]
    },
      {
      name: "Turquesa",
      slug: "turquesa",
      hex: "#40E0D0",
      images: [
        "/productos/mujer/camisetas/camiseta-manga-larga-turquesa-manga-larga-turquesa1.webp",
        "/productos/mujer/camisetas/camiseta-manga-larga-turquesa-manga-larga-turquesa2.webp",
        "/productos/mujer/camisetas/camiseta-manga-larga-turquesa-manga-larga-turquesa3.webp",
        "/productos/mujer/camisetas/camiseta-manga-larga-turquesa-manga-larga-turquesa5.webp"
      ]
    },
      {
      name: "Vino",
      slug: "vino",
      hex: "#722F37",
      images: [
        "/productos/mujer/camisetas/camiseta-manga-larga-vino-manga-larga-vino1.webp",
        "/productos/mujer/camisetas/camiseta-manga-larga-vino-manga-larga-vino2.webp",
        "/productos/mujer/camisetas/camiseta-manga-larga-vino-manga-larga-vino3.webp",
        "/productos/mujer/camisetas/camiseta-manga-larga-vino-manga-larga-vino4.webp",
        "/productos/mujer/camisetas/camiseta-manga-larga-vino-manga-larga-vino5.webp"
      ]
    },
    ],
    sizes: ["S","M","L","XL"],
    audience: "mujer",    tags: ["COD.393", "Colección Camisetas Algodón Licrado", "Algodón Licrado"],

    inventory: 0,
      attributes: {
        "material": "Algodón Licrado",
        "detalles": [
            "Manga larga",
            "Algodón licrado"
        ],
        "beneficios": []
    },
  },

  {
    slug: "camiseta-manga-corta",
    title: "Camiseta manga corta",
    price: 29,
    image: "/productos/mujer/camisetas/camiseta-manga-corta-azul-marino-camiseta-azulmarino1.webp",
    category: "camisetas",
    fabric: "algodon",
    colors: [
      {
      name: "Azul Marino",
      slug: "azulmarino",
      hex: "#1E3A8A",
      images: [
        "/productos/mujer/camisetas/camiseta-manga-corta-azul-marino-camiseta-azulmarino1.webp",
        "/productos/mujer/camisetas/camiseta-manga-corta-azul-marino-camiseta-azulmarino2.webp",
        "/productos/mujer/camisetas/camiseta-manga-corta-azul-marino-camiseta-azulmarino3.webp",
        "/productos/mujer/camisetas/camiseta-manga-corta-azul-marino-camiseta-azulmarino4.webp",
        "/productos/mujer/camisetas/camiseta-manga-corta-azul-marino-camiseta-azulmarino5.webp"
      ]
    },
      {
      name: "Beige",
      slug: "beige",
      hex: "#F5F5DC",
      images: [
        "/productos/mujer/camisetas/camiseta-manga-corta-beige-camiseta-beige1.webp",
        "/productos/mujer/camisetas/camiseta-manga-corta-beige-camiseta-beige2.webp",
        "/productos/mujer/camisetas/camiseta-manga-corta-beige-camiseta-beige3.webp",
        "/productos/mujer/camisetas/camiseta-manga-corta-beige-camiseta-beige4.webp",
        "/productos/mujer/camisetas/camiseta-manga-corta-beige-camiseta-beige5.webp"
      ]
    },
      {
      name: "Blanco",
      slug: "blanco",
      hex: "#FFFFFF",
      images: [
        "/productos/mujer/camisetas/camiseta-manga-corta-blanco-camiseta-blanco1.webp",
        "/productos/mujer/camisetas/camiseta-manga-corta-blanco-camiseta-blanco2.webp",
        "/productos/mujer/camisetas/camiseta-manga-corta-blanco-camiseta-blanco3.webp",
        "/productos/mujer/camisetas/camiseta-manga-corta-blanco-camiseta-blanco4.webp",
        "/productos/mujer/camisetas/camiseta-manga-corta-blanco-camiseta-blanco5.webp"
      ]
    },
      {
      name: "Negro",
      slug: "negro",
      hex: "#000000",
      images: [
        "/productos/mujer/camisetas/camiseta-manga-corta-negro-camiseta-negro1.webp",
        "/productos/mujer/camisetas/camiseta-manga-corta-negro-camiseta-negro2.webp",
        "/productos/mujer/camisetas/camiseta-manga-corta-negro-camiseta-negro3.webp",
        "/productos/mujer/camisetas/camiseta-manga-corta-negro-camiseta-negro4.webp"
      ]
    },
      {
      name: "Rojo",
      slug: "rojo",
      hex: "#D22B2B",
      images: [
        "/productos/mujer/camisetas/camiseta-manga-corta-rojo-camiseta-rojo1.webp",
        "/productos/mujer/camisetas/camiseta-manga-corta-rojo-camiseta-rojo2.webp",
        "/productos/mujer/camisetas/camiseta-manga-corta-rojo-camiseta-rojo3.webp",
        "/productos/mujer/camisetas/camiseta-manga-corta-rojo-camiseta-rojo4.webp",
        "/productos/mujer/camisetas/camiseta-manga-corta-rojo-camiseta-rojo5.webp"
      ]
    },
    ],
    sizes: ["S","M","L","XL"],
    audience: "mujer",    tags: ["COD.399", "Colección Camisetas Algodón Licrado", "Algodón Licrado"],

    inventory: 3,
      attributes: {
        "material": "Algodón Licrado",
        "detalles": [
            "Manga corta",
            "Algodón licrado"
        ],
        "beneficios": []
    },
  },

  {
    slug: "camiseta-tropical",
    title: "Camiseta tropical",
    price: 21,
    originalPrice: 35,
    badge: "oferta",
    image: "/placeholder.svg",
    category: "camisetas",
    fabric: "algodon",
    colors: [
      {
        name: "Camiseta",
        slug: "camiseta",
        hex: "#CCCCCC",
        image: "/placeholder.svg",
      },
    ],
    sizes: ["S","M","L","XL"],
    audience: "mujer",    tags: ["COD.388", "Colección Camisetas Algodón Licrado", "Algodón Licrado"],

    inventory: 10,
      attributes: {
        "material": "Algodón Licrado",
        "detalles": [
            "Diseño tropical",
            "Algodón licrado"
        ],
        "beneficios": []
    },
  },

  {
    slug: "camiseta-deportiva",
    title: "Camiseta deportiva",
    price: 24,
    image: "/placeholder.svg",
    category: "camisetas",
    fabric: "algodon",
    colors: [
      {
        name: "Camiseta",
        slug: "camiseta",
        hex: "#CCCCCC",
        image: "/placeholder.svg",
      },
    ],
    sizes: ["S","M","L","XL"],
    audience: "mujer",    tags: ["COD.386", "Colección Camisetas Algodón Licrado", "Algodón Licrado"],

    inventory: 12,
    attributes: {
        "material": "Algodón Licrado",
        "detalles": [
            "Diseño deportivo",
            "Algodón licrado"
        ],
        "beneficios": []
    },
  },

  {
    slug: "camiseta-gia",
    title: "Camiseta Gia",
    price: 27,
    image: "/productos/mujer/camisetas/camiseta-gia-blanco-camiseta-gia-blanco1.webp",
    category: "camisetas",
    fabric: "algodon",
    colors: [
      {
      name: "Blanco",
      slug: "blanco",
      hex: "#FFFFFF",
      images: [
        "/productos/mujer/camisetas/camiseta-gia-blanco-camiseta-gia-blanco1.webp",
        "/productos/mujer/camisetas/camiseta-gia-blanco-camiseta-gia-blanco2.webp",
        "/productos/mujer/camisetas/camiseta-gia-blanco-camiseta-gia-blanco3.webp",
        "/productos/mujer/camisetas/camiseta-gia-blanco-camiseta-gia-blanco4.webp"
      ]
    },
      {
      name: "Negro",
      slug: "negro",
      hex: "#000000",
      images: [
        "/productos/mujer/camisetas/camiseta-gia-negro-camiseta-gia-negro1.webp",
        "/productos/mujer/camisetas/camiseta-gia-negro-camiseta-gia-negro2.webp",
        "/productos/mujer/camisetas/camiseta-gia-negro-camiseta-gia-negro3.webp",
        "/productos/mujer/camisetas/camiseta-gia-negro-camiseta-gia-negro4.webp"
      ]
    },
      {
      name: "Vino",
      slug: "vino",
      hex: "#722F37",
      images: [
        "/productos/mujer/camisetas/camiseta-gia-vino-camiseta-gia-vino1.webp",
        "/productos/mujer/camisetas/camiseta-gia-vino-camiseta-gia-vino2.webp",
        "/productos/mujer/camisetas/camiseta-gia-vino-camiseta-gia-vino3.webp",
        "/productos/mujer/camisetas/camiseta-gia-vino-camiseta-gia-vino4.webp"
      ]
    },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    audience: "mujer",
    attributes: {
  material: "Algodón Premium",
  detalles: [
    "Tejido suave y transpirable",
    "Costuras reforzadas",
    "Corte moderno y cómodo"
  ],
  beneficios: [
    "Máxima comodidad durante todo el día",
    "Fácil de lavar y mantener",
    "Ideal para uso diario"
  ]
},
  },

  {
    slug: "camiseta-tiras-fijas",
    title: "Camiseta tiras fijas",
    price: 21,
    image: "/placeholder.svg",
    category: "camisetas",
    fabric: "algodon",
    colors: [
      {
        name: "Camiseta",
        slug: "camiseta",
        hex: "#CCCCCC",
        image: "/placeholder.svg",
      },
    ],
    sizes: ["S","M","L"],
    audience: "mujer",    tags: ["COD.384", "Colección Camisetas Algodón Licrado", "Algodón Licrado"],

    attributes: {
        "material": "Algodón Licrado",
        "detalles": [
            "Diseño con tiras finas",
            "Algodón licrado"
        ],
        "beneficios": []
    },
  },

  {
    slug: "short-slim",
    title: "Short Slim",
    price: 29,
    image: "/productos/mujer/short/short-slim-suplex-liso-premium-acero-short-slim-acero1.webp",
    category: "bikers",
    fabric: "suplex",
    colors: [
      {
      name: "Acero",
      slug: "acero",
      hex: "#808080",
      images: [
        "/productos/mujer/short/short-slim-suplex-liso-premium-acero-short-slim-acero1.webp",
        "/productos/mujer/short/short-slim-suplex-liso-premium-acero-short-slim-acero2.webp",
        "/productos/mujer/short/short-slim-suplex-liso-premium-acero-short-slim-acero3.webp",
        "/productos/mujer/short/short-slim-suplex-liso-premium-acero-short-slim-acero4.webp"
      ]
    },
      {
      name: "Azulino",
      slug: "azulino",
      hex: "#3A53A4",
      images: [
        "/productos/mujer/short/short-slim-suplex-liso-premium-azulino-short-slim-azulino1.webp",
        "/productos/mujer/short/short-slim-suplex-liso-premium-azulino-short-slim-azulino2.webp",
        "/productos/mujer/short/short-slim-suplex-liso-premium-azulino-short-slim-azulino3.webp",
        "/productos/mujer/short/short-slim-suplex-liso-premium-azulino-short-slim-azulino4.webp"
      ]
    },
      {
      name: "Blanco",
      slug: "blanco",
      hex: "#FFFFFF",
      images: [
        "/productos/mujer/short/short-slim-suplex-liso-premium-blanco-short-slim-blanco1.webp",
        "/productos/mujer/short/short-slim-suplex-liso-premium-blanco-short-slim-blanco2.webp",
        "/productos/mujer/short/short-slim-suplex-liso-premium-blanco-short-slim-blanco3.webp",
        "/productos/mujer/short/short-slim-suplex-liso-premium-blanco-short-slim-blanco4.webp"
      ]
    },
      {
      name: "Negro",
      slug: "negro",
      hex: "#000000",
      images: [
        "/productos/mujer/short/short-slim-suplex-liso-premium-negro-short-slim-negro1.webp",
        "/productos/mujer/short/short-slim-suplex-liso-premium-negro-short-slim-negro2.webp",
        "/productos/mujer/short/short-slim-suplex-liso-premium-negro-short-slim-negro3.webp",
        "/productos/mujer/short/short-slim-suplex-liso-premium-negro-short-slim-negro5.webp",
        "/productos/mujer/short/short-slim-suplex-liso-premium-negro-short-slim-negro6.webp"
      ]
    },
    ],
    sizes: ["S","M","L","XL"],
    audience: "mujer",    tags: ["COD.S-103", "Colección Especial Suplex", "Suplex + Spandex"],

    attributes: {
        "material": "Suplex + Spandex",
        "detalles": [
            "Pretina tipo faja",
            "Suplex liso interno",
            "Tejido spandex",
            "Diseño slim",
            "Alta variedad de colores (10 colores)"
        ],
        "beneficios": []
    },
  },

  {
    slug: "short-ciclista-active",
    title: "Short ciclista Active",
    price: 32,
    image: "/placeholder.svg",
    category: "bikers",
    fabric: "suplex",
    colors: [
      {
        name: "Short",
        slug: "short",
        hex: "#CCCCCC",
        image: "/placeholder.svg",
      },
    ],
    sizes: ["S","M","L","XL"],
    audience: "mujer",    tags: ["COD.204", "Colección Infinity", "Suplex Liso de Alta Elongación"],

    attributes: {
        "material": "Suplex Liso de Alta Elongación",
        "detalles": [
            "Pretina tipo faja",
            "Refuerzo trasero",
            "Suplex liso de alta elongación",
            "Largo ciclista/biker"
        ],
        "beneficios": []
    },
  },

  {
    slug: "short-lux",
    title: "Short Lux",
    price: 28,
    image: "/placeholder.svg",
    category: "bikers",
    fabric: "suplex",
    colors: [
      {
        name: "Short",
        slug: "short",
        hex: "#CCCCCC",
        image: "/placeholder.svg",
      },
    ],
    sizes: ["S","M","L","XL"],
    audience: "mujer",    tags: ["COD.205", "Colección Infinity", "Suplex Liso de Alta Elongación"],

    attributes: {
        "material": "Suplex Liso de Alta Elongación",
        "detalles": [
            "Pretina tipo faja",
            "Refuerzo trasero",
            "Suplex liso de alta elongación",
            "Largo corto (short)"
        ],
        "beneficios": []
    },
  },

  {
    slug: "short-brasil",
    title: "Short Brasil",
    price: 20,
    image: "/productos/mujer/short/short-brasil-beige-short-brasil-beige1.webp",
    category: "shorts",
    fabric: "suplex",
    colors: [
      {
      name: "Beige",
      slug: "beige",
      hex: "#F5F5DC",
      images: [
        "/productos/mujer/short/short-brasil-beige-short-brasil-beige1.webp",
        "/productos/mujer/short/short-brasil-beige-short-brasil-beige2.webp",
        "/productos/mujer/short/short-brasil-beige-short-brasil-beige3.webp",
        "/productos/mujer/short/short-brasil-beige-short-brasil-beige4.webp",
        "/productos/mujer/short/short-brasil-beige-short-brasil-beige5.webp"
      ]
    },
      {
      name: "Blanco",
      slug: "blanco",
      hex: "#FFFFFF",
      images: [
        "/productos/mujer/short/short-brasil-blanco-short-brasil-blanco1.webp",
        "/productos/mujer/short/short-brasil-blanco-short-brasil-blanco2.webp",
        "/productos/mujer/short/short-brasil-blanco-short-brasil-blanco3.webp",
        "/productos/mujer/short/short-brasil-blanco-short-brasil-blanco4.webp",
        "/productos/mujer/short/short-brasil-blanco-short-brasil-blanco5.webp"
      ]
    },
      {
      name: "Negro",
      slug: "negro",
      hex: "#000000",
      images: [
        "/productos/mujer/short/short-brasil-negro-short-brasil-negro1.webp",
        "/productos/mujer/short/short-brasil-negro-short-brasil-negro2.webp",
        "/productos/mujer/short/short-brasil-negro-short-brasil-negro3.webp",
        "/productos/mujer/short/short-brasil-negro-short-brasil-negro4.webp",
        "/productos/mujer/short/short-brasil-negro-short-brasil-negro5.webp"
      ]
    },
    ],
    sizes: ["S","M","L","XL"],
    audience: "mujer",    tags: ["COD.363", "Colección Shorts Algodón Licrado", "Algodón Licrado"],

    attributes: {
        "material": "Algodón Licrado",
        "detalles": [
            "Pretina de cintura sin elástico",
            "Algodón licrado",
            "Estilo brasilero"
        ],
        "beneficios": []
    },
  },

  {
    slug: "maxi-short",
    title: "Maxi Short",
    price: 19,
    image: "/productos/mujer/short/maxi-short-beige-MAXI-SHORT-BEIGE1.webp",
    category: "shorts",
    fabric: "suplex",
    colors: [
      {
      name: "Beige",
      slug: "beige",
      hex: "#F5F5DC",
      images: [
        "/productos/mujer/short/maxi-short-beige-MAXI-SHORT-BEIGE1.webp",
        "/productos/mujer/short/maxi-short-beige-MAXI-SHORT-BEIGE2.webp",
        "/productos/mujer/short/maxi-short-beige-MAXI-SHORT-BEIGE3.webp",
        "/productos/mujer/short/maxi-short-beige-MAXI-SHORT-BEIGE4.webp",
        "/productos/mujer/short/maxi-short-beige-MAXI-SHORT-BEIGE5.webp"
      ]
    },
      {
      name: "Blanco",
      slug: "blanco",
      hex: "#FFFFFF",
      images: [
        "/productos/mujer/short/maxi-short-blanco-MAXI-SHORT-BLANCO.webp",
        "/productos/mujer/short/maxi-short-blanco-MAXI-SHORT-BLANCO2.webp",
        "/productos/mujer/short/maxi-short-blanco-MAXI-SHORT-BLANCO3.webp",
        "/productos/mujer/short/maxi-short-blanco-MAXI-SHORT-BLANCO4.webp",
        "/productos/mujer/short/maxi-short-blanco-MAXI-SHORT-BLANCO5.webp"
      ]
    },
      {
      name: "Negro",
      slug: "negro",
      hex: "#000000",
      images: [
        "/productos/mujer/short/maxi-short-negro-MAXI-SHORT-NEGRO1.webp",
        "/productos/mujer/short/maxi-short-negro-MAXI-SHORT-NEGRO2.webp",
        "/productos/mujer/short/maxi-short-negro-MAXI-SHORT-NEGRO3.webp",
        "/productos/mujer/short/maxi-short-negro-MAXI-SHORT-NEGRO4.webp"
      ]
    },
    ],
    sizes: ["S","M","L","XL"],
    audience: "mujer",    tags: ["COD.362", "Colección Shorts Algodón Licrado", "Algodón Licrado"],

    attributes: {
        "material": "Algodón Licrado",
        "detalles": [
            "Versión short clásico a la cintura",
            "Pierna más larga",
            "Algodón licrado"
        ],
        "beneficios": []
    },
  },

  {
    slug: "short-clasico",
    title: "Short clásico",
    price: 16,
    image: "/placeholder.svg",
    category: "shorts",
    fabric: "suplex",
    colors: [
      {
        name: "Short",
        slug: "short",
        hex: "#CCCCCC",
        image: "/placeholder.svg",
      },
    ],
    sizes: ["S","M","L","XL"],
    audience: "mujer",    tags: ["COD.360", "Colección Shorts Algodón Licrado", "Algodón Licrado"],

    attributes: {
        "material": "Algodón Licrado",
        "detalles": [
            "Modelo clásico a la cintura",
            "Algodón licrado"
        ],
        "beneficios": []
    },
  },

  {
    slug: "mini-short",
    title: "Mini Short",
    price: 16,
    image: "/productos/mujer/short/mini-short-beige-mini-short-beige1.webp",
    category: "shorts",
    fabric: "suplex",
    colors: [
      {
      name: "Beige",
      slug: "beige",
      hex: "#F5F5DC",
      images: [
        "/productos/mujer/short/mini-short-beige-mini-short-beige1.webp",
        "/productos/mujer/short/mini-short-beige-mini-short-beige2.webp",
        "/productos/mujer/short/mini-short-beige-mini-short-beige3.webp",
        "/productos/mujer/short/mini-short-beige-mini-short-beige4.webp",
        "/productos/mujer/short/mini-short-beige-mini-short-beige5.webp"
      ]
    },
      {
      name: "Blanco",
      slug: "blanco",
      hex: "#FFFFFF",
      images: [
        "/productos/mujer/short/mini-short-blanco-mini-short-blanco1.webp",
        "/productos/mujer/short/mini-short-blanco-mini-short-blanco2.webp",
        "/productos/mujer/short/mini-short-blanco-mini-short-blanco3.webp",
        "/productos/mujer/short/mini-short-blanco-mini-short-blanco4.webp",
        "/productos/mujer/short/mini-short-blanco-mini-short-blanco5.webp"
      ]
    },
      {
      name: "Negro",
      slug: "negro",
      hex: "#000000",
      images: [
        "/productos/mujer/short/mini-short-negro-mini-short-negro.webp",
        "/productos/mujer/short/mini-short-negro-mini-short-negro2..webp",
        "/productos/mujer/short/mini-short-negro-mini-short-negro3..webp",
        "/productos/mujer/short/mini-short-negro-mini-short-negro4..webp",
        "/productos/mujer/short/mini-short-negro-mini-short-negro5..webp"
      ]
    },
    ],
    sizes: ["S","M","L","XL"],
    audience: "mujer",    tags: ["COD.361", "Colección Shorts Algodón Licrado", "Algodón Licrado"],

    attributes: {
        "material": "Algodón Licrado",
        "detalles": [
            "Cintura semi baja",
            "Pretina en la pierna",
            "Algodón licrado"
        ],
        "beneficios": []
    },
  },

  {
    slug: "body-manga-corta-suplex",
    title: "Body manga corta suplex",
    price: 36,
    image: "/productos/mujer/bodys/body-manga-corta-suplex-azul-marino.webp",
    category: "bodysuits",
    fabric: "suplex",
    colors: [
      {
        name: "Azul Marino",
        slug: "azul-marino",
        hex: "#1E3A8A",
        image: "/productos/mujer/bodys/body-manga-corta-suplex-azul-marino.webp",
      },
      {
        name: "Blanco",
        slug: "blanco",
        hex: "#FFFFFF",
        image: "/productos/mujer/bodys/body-manga-corta-suplex-blanco.webp",
      },
      {
      name: "Azul Marino",
      slug: "azulmarino",
      hex: "#1E3A8A",
      images: [
        "/productos/mujer/bodys/body-manga-corta-suplex-liso-premium-azul-marino-body-mc-azulmarino-suplex-1.webp",
        "/productos/mujer/bodys/body-manga-corta-suplex-liso-premium-azul-marino-body-mc-azulmarino-suplex2.webp",
        "/productos/mujer/bodys/body-manga-corta-suplex-liso-premium-azul-marino-body-mc-azulmarino-suplex3.webp"
      ]
    },
      {
      name: "Negro",
      slug: "negro",
      hex: "#000000",
      images: [
        "/productos/mujer/bodys/body-manga-corta-suplex-liso-premium-negro-Body-mc-negro1.webp",
        "/productos/mujer/bodys/body-manga-corta-suplex-liso-premium-negro-body-mc-negro2.webp",
        "/productos/mujer/bodys/body-manga-corta-suplex-liso-premium-negro-body-mc-negro3.webp",
        "/productos/mujer/bodys/body-manga-corta-suplex-liso-premium-negro-body-mc-negro4.webp",
        "/productos/mujer/bodys/body-manga-corta-suplex-liso-premium-negro-body-mc-negro5.webp"
      ]
    },
      {
      name: "Rojo",
      slug: "rojo",
      hex: "#D22B2B",
      images: [
        "/productos/mujer/bodys/body-manga-corta-suplex-liso-premium-rojo-body-rojo-suplex1.webp",
        "/productos/mujer/bodys/body-manga-corta-suplex-liso-premium-rojo-body-rojo-suplex2.webp",
        "/productos/mujer/bodys/body-manga-corta-suplex-liso-premium-rojo-body-rojo-suplex3.webp",
        "/productos/mujer/bodys/body-manga-corta-suplex-liso-premium-rojo-body-rojo-suplex-4.webp",
        "/productos/mujer/bodys/body-manga-corta-suplex-liso-premium-rojo-body-rojo-suplex5.webp"
      ]
    },
    ],
    sizes: ["S","M","L","XL"],
    audience: "mujer",    tags: ["COD.228", "Colección Nueva Temporada", "Suplex"],

    attributes: {
        "material": "Suplex",
        "detalles": [
            "Body de suplex liso",
            "Diseño bikini para más comodidad",
            "Gafete regulable en la entrepierna",
            "Manga corta"
        ],
        "beneficios": []
    },
  },

  {
    slug: "body-manga-corta",
    title: "Body manga corta",
    price: 33,
    image: "/productos/mujer/bodys/body-manga-corta-amarillo.webp",
    category: "bodysuits",
    fabric: "algodon",
    colors: [
      {
        name: "Amarillo",
        slug: "amarillo",
        hex: "#FFD700",
        image: "/productos/mujer/bodys/body-manga-corta-amarillo.webp",
      },
      {
      name: "Beige",
      slug: "beige",
      hex: "#F5F5DC",
      images: [
        "/productos/mujer/bodys/body-manga-corta-beige-manga-corta-beige1.webp",
        "/productos/mujer/bodys/body-manga-corta-beige-manga-corta-beige2.webp",
        "/productos/mujer/bodys/body-manga-corta-beige-manga-corta-beige3.webp",
        "/productos/mujer/bodys/body-manga-corta-beige-manga-corta-beige4.webp",
        "/productos/mujer/bodys/body-manga-corta-beige-manga-corta-beige-5.webp"
      ]
    },
      {
      name: "Blanco",
      slug: "blanco",
      hex: "#FFFFFF",
      images: [
        "/productos/mujer/bodys/body-manga-corta-blanco-manga-corta-blanco1.webp",
        "/productos/mujer/bodys/body-manga-corta-blanco-manga-corta-blanco2.webp",
        "/productos/mujer/bodys/body-manga-corta-blanco-manga-corta-blanco3.webp",
        "/productos/mujer/bodys/body-manga-corta-blanco-manga-corta-blanco4.webp"
      ]
    },
      {
      name: "Negro",
      slug: "negro",
      hex: "#000000",
      images: [
        "/productos/mujer/bodys/body-manga-corta-negro-manga-corta-negro1.webp",
        "/productos/mujer/bodys/body-manga-corta-negro-manga-corta-negro2.webp",
        "/productos/mujer/bodys/body-manga-corta-negro-manga-corta-negro3.webp",
        "/productos/mujer/bodys/body-manga-corta-negro-manga-corta-negro4.webp"
      ]
    },
      {
      name: "Rojo",
      slug: "rojo",
      hex: "#D22B2B",
      images: [
        "/productos/mujer/bodys/body-manga-corta-rojo-manga-corta-rojo1.webp",
        "/productos/mujer/bodys/body-manga-corta-rojo-manga-corta-rojo2.webp",
        "/productos/mujer/bodys/body-manga-corta-rojo-manga-corta-rojo3.webp",
        "/productos/mujer/bodys/body-manga-corta-rojo-manga-corta-rojo4.webp"
      ]
    },
      {
      name: "Rosado",
      slug: "rosado",
      hex: "#FFC0CB",
      images: [
        "/productos/mujer/bodys/body-manga-corta-rosado-body-mc-rosado1.webp",
        "/productos/mujer/bodys/body-manga-corta-rosado-body-mc-rosado2.webp",
        "/productos/mujer/bodys/body-manga-corta-rosado-body-mc-rosado3.webp",
        "/productos/mujer/bodys/body-manga-corta-rosado-body-mc-rosado4.webp",
        "/productos/mujer/bodys/body-manga-corta-rosado-body-mc-rosado5.webp"
      ]
    },
      {
        name: "Azul Marino",
        slug: "azul-marino",
        hex: "#1E3A8A",
        image: "/productos/mujer/bodys/body-manga-corta-suplex-azul-marino.webp",
      },
      {
      name: "Azul",
      slug: "azul",
      hex: "#1E3A8A",
      images: [
        "/productos/mujer/bodys/body-manga-corta-suplex-liso-premium-azul-marino-body-mc-azulmarino-suplex-1.webp",
        "/productos/mujer/bodys/body-manga-corta-suplex-liso-premium-azul-marino-body-mc-azulmarino-suplex2.webp",
        "/productos/mujer/bodys/body-manga-corta-suplex-liso-premium-azul-marino-body-mc-azulmarino-suplex3.webp"
      ]
    },
    ],
    sizes: ["S","M","L","XL"],
    audience: "mujer",    tags: ["COD.435", "Colección Bodys Algodón Licrado", "Algodón Licrado"],

    attributes: {
        "material": "Algodón Licrado",
        "detalles": [
            "Body de algodón licrado",
            "Diseño bikini para más comodidad",
            "Gafete graduable en la entrepierna"
        ],
        "beneficios": []
    },
  },

  {
    slug: "body-manga-larga",
    title: "Body manga larga",
    price: 36,
    image: "/productos/mujer/bodys/body-manga-larga-beige-manga-larga-beige1.webp",
    category: "bodysuits",
    fabric: "algodon",
    colors: [
      {
      name: "Beige",
      slug: "beige",
      hex: "#F5F5DC",
      images: [
        "/productos/mujer/bodys/body-manga-larga-beige-manga-larga-beige1.webp",
        "/productos/mujer/bodys/body-manga-larga-beige-manga-larga-beige2.webp",
        "/productos/mujer/bodys/body-manga-larga-beige-manga-larga-beige3.webp",
        "/productos/mujer/bodys/body-manga-larga-beige-manga-larga-beige4.webp",
        "/productos/mujer/bodys/body-manga-larga-beige-manga-larga-beige5.webp"
      ]
    },
      {
      name: "Blanco",
      slug: "blanco",
      hex: "#FFFFFF",
      images: [
        "/productos/mujer/bodys/body-manga-larga-blanco-Body-manga-larga-blanco-1.webp",
        "/productos/mujer/bodys/body-manga-larga-blanco-Body-manga-larga-blanco-2.webp",
        "/productos/mujer/bodys/body-manga-larga-blanco-Body-manga-larga-blanco-3.webp",
        "/productos/mujer/bodys/body-manga-larga-blanco-Body-manga-larga-blanco-4.webp"
      ]
    },
      {
      name: "Negro",
      slug: "negro",
      hex: "#000000",
      images: [
        "/productos/mujer/bodys/body-manga-larga-negro-body-ml-negro1.webp",
        "/productos/mujer/bodys/body-manga-larga-negro-body-ml-negro2.webp",
        "/productos/mujer/bodys/body-manga-larga-negro-body-ml-negro3.webp",
        "/productos/mujer/bodys/body-manga-larga-negro-body-ml-negro4.webp",
        "/productos/mujer/bodys/body-manga-larga-negro-body-ml-negro5.webp"
      ]
    },
      {
      name: "Rojo",
      slug: "rojo",
      hex: "#D22B2B",
      images: [
        "/productos/mujer/bodys/body-manga-larga-rojo-body-ml-rojo1.webp",
        "/productos/mujer/bodys/body-manga-larga-rojo-body-ml-rojo2.webp",
        "/productos/mujer/bodys/body-manga-larga-rojo-body-ml-rojo3.webp",
        "/productos/mujer/bodys/body-manga-larga-rojo-body-ml-rojo4.webp"
      ]
    },
      {
      name: "Rosado",
      slug: "rosado",
      hex: "#FFC0CB",
      images: [
        "/productos/mujer/bodys/body-manga-larga-rosado-body-ml-rosado1.webp",
        "/productos/mujer/bodys/body-manga-larga-rosado-body-ml-rosado2.webp",
        "/productos/mujer/bodys/body-manga-larga-rosado-body-ml-rosado3.webp",
        "/productos/mujer/bodys/body-manga-larga-rosado-body-ml-rosado4.webp"
      ]
    },
      {
      name: "Azul",
      slug: "azul",
      hex: "#1E3A8A",
      images: [
        "/productos/mujer/bodys/body-manga-larga-suplex-liso-premium-azul-marino-body-manga-larga-suplex-azulmarino1.webp",
        "/productos/mujer/bodys/body-manga-larga-suplex-liso-premium-azul-marino-body-manga-larga-suplex-azulmarino2.webp",
        "/productos/mujer/bodys/body-manga-larga-suplex-liso-premium-azul-marino-body-manga-larga-suplex-azulmarino3.webp",
        "/productos/mujer/bodys/body-manga-larga-suplex-liso-premium-azul-marino-body-manga-larga-suplex-azulmarino4.webp",
        "/productos/mujer/bodys/body-manga-larga-suplex-liso-premium-azul-marino-body-manga-larga-suplex-azulmarino5.webp"
      ]
    },
    ],
    sizes: ["S","M","L","XL"],
    audience: "mujer",    tags: ["COD.436", "Colección Bodys Algodón Licrado", "Algodón Licrado"],

    attributes: {
        "material": "Algodón Licrado",
        "detalles": [
            "Body de algodón licrado",
            "Diseño bikini para más comodidad",
            "Gafete graduable en la entrepierna",
            "Manga larga"
        ],
        "beneficios": []
    },
  },

  {
    slug: "top-afrodita",
    title: "Top Afrodita",
    price: 32,
    image: "/productos/mujer/tops/top-afrodita-suplex-liso-premium-azulino-afrodita-azulino1.webp",
    category: "tops",
    fabric: "algodon",
    colors: [
      {
      name: "Azulino",
      slug: "azulino",
      hex: "#3A53A4",
      images: [
        "/productos/mujer/tops/top-afrodita-suplex-liso-premium-azulino-afrodita-azulino1.webp",
        "/productos/mujer/tops/top-afrodita-suplex-liso-premium-azulino-afrodita-azulino2.webp",
        "/productos/mujer/tops/top-afrodita-suplex-liso-premium-azulino-afrodita-azulino3.webp",
        "/productos/mujer/tops/top-afrodita-suplex-liso-premium-azulino-afrodita-azulino4.webp",
        "/productos/mujer/tops/top-afrodita-suplex-liso-premium-azulino-afrodita-azulino5.webp",
        "/productos/mujer/tops/top-afrodita-suplex-liso-premium-azulino-afrodita-azulino6.webp"
      ]
    },
      {
      name: "Negro",
      slug: "negro",
      hex: "#000000",
      images: [
        "/productos/mujer/tops/top-afrodita-suplex-liso-premium-negro-afrodita-negro1.webp",
        "/productos/mujer/tops/top-afrodita-suplex-liso-premium-negro-afrodita-negro2.webp",
        "/productos/mujer/tops/top-afrodita-suplex-liso-premium-negro-afrodita-negro3.webp",
        "/productos/mujer/tops/top-afrodita-suplex-liso-premium-negro-afrodita-negro4.webp"
      ]
    },
      {
      name: "Rojo",
      slug: "rojo",
      hex: "#D22B2B",
      images: [
        "/productos/mujer/tops/top-afrodita-suplex-liso-premium-rojo-afrodita-rojo1.webp",
        "/productos/mujer/tops/top-afrodita-suplex-liso-premium-rojo-afrodita-rojo2.webp",
        "/productos/mujer/tops/top-afrodita-suplex-liso-premium-rojo-afrodita-rojo3.webp",
        "/productos/mujer/tops/top-afrodita-suplex-liso-premium-rojo-afrodita-rojo4.webp",
        "/productos/mujer/tops/top-afrodita-suplex-liso-premium-rojo-afrodita-rojo5.webp"
      ]
    },
    ],
    sizes: ["S","M","L"],
    audience: "mujer",    tags: ["COD.213", "Colección Tops Suplex", "Suplex + Algodón"],

    attributes: {
        "material": "Suplex + Algodón",
        "detalles": [
            "Forro interno de algodón",
            "Copas removibles y lavables",
            "Diseño deportivo"
        ],
        "beneficios": []
    },
  },

  {
    slug: "top-venus",
    title: "Top Venus",
    price: 32,
    image: "/placeholder.svg",
    category: "tops",
    fabric: "algodon",
    colors: [
      {
        name: "Top",
        slug: "top",
        hex: "#CCCCCC",
        image: "/placeholder.svg",
      },
    ],
    sizes: ["S","M","L"],
    audience: "mujer",    tags: ["COD.215", "Colección Tops Suplex", "Suplex + Algodón"],

    attributes: {
        "material": "Suplex + Algodón",
        "detalles": [
            "Forro interno de algodón",
            "Copas removibles y lavables",
            "Diseño deportivo"
        ],
        "beneficios": []
    },
  },

  {
    slug: "top-minerva",
    title: "Top Minerva",
    price: 32,
    image: "/placeholder.svg",
    category: "tops",
    fabric: "algodon",
    colors: [
      {
        name: "Top",
        slug: "top",
        hex: "#CCCCCC",
        image: "/placeholder.svg",
      },
    ],
    sizes: ["S","M","L"],
    audience: "mujer",    tags: ["COD.214", "Colección Tops Suplex", "Suplex + Algodón"],

    attributes: {
        "material": "Suplex + Algodón",
        "detalles": [
            "Forro interno de algodón",
            "Diseño deportivo",
            "Sin copas removibles"
        ],
        "beneficios": []
    },
  },

  {
    slug: "top-paradise",
    title: "Top Paradise",
    price: 32,
    image: "/productos/mujer/tops/top-paradise-suplex-liso-premium-azulino-paradise-azulino1.webp",
    category: "tops",
    fabric: "algodon",
    colors: [
      {
      name: "Azulino",
      slug: "azulino",
      hex: "#3A53A4",
      images: [
        "/productos/mujer/tops/top-paradise-suplex-liso-premium-azulino-paradise-azulino1.webp",
        "/productos/mujer/tops/top-paradise-suplex-liso-premium-azulino-paradise-azulino2.webp",
        "/productos/mujer/tops/top-paradise-suplex-liso-premium-azulino-paradise-azulino3.webp",
        "/productos/mujer/tops/top-paradise-suplex-liso-premium-azulino-paradise-azulino4.webp"
      ]
    },
      {
      name: "Blanco",
      slug: "blanco",
      hex: "#FFFFFF",
      images: [
        "/productos/mujer/tops/top-paradise-suplex-liso-premium-blanco-paradise-blanco1.webp",
        "/productos/mujer/tops/top-paradise-suplex-liso-premium-blanco-paradise-blanco2.webp",
        "/productos/mujer/tops/top-paradise-suplex-liso-premium-blanco-paradise-blanco3.webp",
        "/productos/mujer/tops/top-paradise-suplex-liso-premium-blanco-paradise-blanco4.webp"
      ]
    },
      {
      name: "Charcoal",
      slug: "charcoal",
      hex: "#5A5A5A",
      images: [
        "/productos/mujer/tops/top-paradise-suplex-liso-premium-charcoal-paradise-charcoal1.webp",
        "/productos/mujer/tops/top-paradise-suplex-liso-premium-charcoal-paradise-charcoal2.webp",
        "/productos/mujer/tops/top-paradise-suplex-liso-premium-charcoal-paradise-charcoal3.webp",
        "/productos/mujer/tops/top-paradise-suplex-liso-premium-charcoal-paradise-charcoal4.webp"
      ]
    },
      {
      name: "Negro",
      slug: "negro",
      hex: "#000000",
      images: [
        "/productos/mujer/tops/top-paradise-suplex-liso-premium-negro-paradise-negro1.webp",
        "/productos/mujer/tops/top-paradise-suplex-liso-premium-negro-paradise-negro2.webp",
        "/productos/mujer/tops/top-paradise-suplex-liso-premium-negro-paradise-negro3.webp",
        "/productos/mujer/tops/top-paradise-suplex-liso-premium-negro-paradise-negro4.webp",
        "/productos/mujer/tops/top-paradise-suplex-liso-premium-negro-paradise-negro5.webp"
      ]
    },
      {
      name: "Rojo",
      slug: "rojo",
      hex: "#D22B2B",
      images: [
        "/productos/mujer/tops/top-paradise-suplex-liso-premium-rojo-paradise-rojo1.webp",
        "/productos/mujer/tops/top-paradise-suplex-liso-premium-rojo-paradise-rojo2.webp",
        "/productos/mujer/tops/top-paradise-suplex-liso-premium-rojo-paradise-rojo3.webp",
        "/productos/mujer/tops/top-paradise-suplex-liso-premium-rojo-paradise-rojo4.webp"
      ]
    },
    ],
    sizes: ["S","M","L"],
    audience: "mujer",    tags: ["COD.104", "Colección Tops Suplex", "Suplex + Algodón"],

    attributes: {
        "material": "Suplex + Algodón",
        "detalles": [
            "Forro interno de algodón",
            "Copas removibles y lavables",
            "Diseño deportivo"
        ],
        "beneficios": []
    },
  },

  {
    slug: "top-jungle",
    title: "Top Jungle",
    price: 32,
    image: "/placeholder.svg",
    category: "tops",
    fabric: "algodon",
    colors: [
      {
        name: "Top",
        slug: "top",
        hex: "#CCCCCC",
        image: "/placeholder.svg",
      },
    ],
    sizes: ["S","M","L"],
    audience: "mujer",    tags: ["COD.109", "Colección Tops Suplex", "Suplex + Algodón"],

    attributes: {
        "material": "Suplex + Algodón",
        "detalles": [
            "Forro interno de algodón",
            "Copas removibles y lavables",
            "Diseño deportivo"
        ],
        "beneficios": []
    },
  },

  {
    slug: "top-astrid",
    title: "Top Astrid",
    price: 32,
    image: "/placeholder.svg",
    category: "tops",
    fabric: "algodon",
    colors: [
      {
        name: "Top",
        slug: "top",
        hex: "#CCCCCC",
        image: "/placeholder.svg",
      },
    ],
    sizes: ["S","M","L"],
    audience: "mujer",    tags: ["COD.S-107", "Colección Especial Suplex", "Suplex + Algodón Licrado"],

    attributes: {
        "material": "Suplex + Algodón Licrado",
        "detalles": [
            "Forro interno de algodón licrado",
            "Copas removibles y lavables",
            "Pretina tipo faja",
            "Suplex liso interno",
            "Tejido spandex",
            "Ideal para yoga/gym"
        ],
        "beneficios": []
    },
  },

  {
    slug: "top-soporte",
    title: "Top Soporte",
    price: 35,
    image: "/placeholder.svg",
    category: "tops",
    fabric: "algodon",
    colors: [
      {
        name: "Top",
        slug: "top",
        hex: "#CCCCCC",
        image: "/placeholder.svg",
      },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    audience: "mujer",
    attributes: {
  material: "Algodón Premium",
  detalles: [
    "Diseño deportivo elegante",
    "Soporte medio confortable",
    "Tejido elástico"
  ],
  beneficios: [
    "Comodidad absoluta",
    "Transpirable y fresco",
    "Perfecto para el día a día"
  ]
},

  },

  {
    slug: "top-arena",
    title: "Top Arena",
    price: 34,
    image: "/placeholder.svg",
    category: "tops",
    fabric: "algodon",
    colors: [
      {
        name: "Top",
        slug: "top",
        hex: "#CCCCCC",
        image: "/placeholder.svg",
      },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    audience: "mujer",
    attributes: {
  material: "Algodón Premium",
  detalles: [
    "Diseño deportivo elegante",
    "Soporte medio confortable",
    "Tejido elástico"
  ],
  beneficios: [
    "Comodidad absoluta",
    "Transpirable y fresco",
    "Perfecto para el día a día"
  ]
},
  },

  {
    slug: "top-zafiro",
    title: "Top Zafiro",
    price: 34,
    image: "/placeholder.svg",
    category: "tops",
    fabric: "algodon",
    colors: [
      {
        name: "Top",
        slug: "top",
        hex: "#CCCCCC",
        image: "/placeholder.svg",
      },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    audience: "mujer",
    attributes: {
  material: "Algodón Premium",
  detalles: [
    "Diseño deportivo elegante",
    "Soporte medio confortable",
    "Tejido elástico"
  ],
  beneficios: [
    "Comodidad absoluta",
    "Transpirable y fresco",
    "Perfecto para el día a día"
  ]
},
  },

  {
    slug: "top-urban",
    title: "Top Urban",
    price: 34,
    image: "/placeholder.svg",
    category: "tops",
    fabric: "algodon",
    colors: [
      {
        name: "Top",
        slug: "top",
        hex: "#CCCCCC",
        image: "/placeholder.svg",
      },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    audience: "mujer",
    attributes: {
  material: "Algodón Premium",
  detalles: [
    "Diseño deportivo elegante",
    "Soporte medio confortable",
    "Tejido elástico"
  ],
  beneficios: [
    "Comodidad absoluta",
    "Transpirable y fresco",
    "Perfecto para el día a día"
  ]
},
  },

  {
    slug: "top-perla",
    title: "Top Perla",
    price: 27,
    image: "/placeholder.svg",
    category: "tops",
    fabric: "algodon",
    colors: [
      {
        name: "Top",
        slug: "top",
        hex: "#CCCCCC",
        image: "/placeholder.svg",
      },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    audience: "mujer",
    attributes: {
  material: "Algodón Premium",
  detalles: [
    "Diseño deportivo elegante",
    "Soporte medio confortable",
    "Tejido elástico"
  ],
  beneficios: [
    "Comodidad absoluta",
    "Transpirable y fresco",
    "Perfecto para el día a día"
  ]
},
  },

  {
    slug: "straple-chanel",
    title: "Straple Chanel",
    price: 23,
    image: "/placeholder.svg",
    category: "tops",
    fabric: "algodon",
    colors: [
      {
        name: "Straple",
        slug: "straple",
        hex: "#CCCCCC",
        image: "/placeholder.svg",
      },
    ],
    sizes: ["S","M","L","XL"],
    audience: "mujer",    tags: ["COD.900", "Colección Tops Algodón Licrado", "Algodón Licrado"],

    attributes: {
        "material": "Algodón Licrado",
        "detalles": [
            "Copas internas removibles",
            "Algodón licrado",
            "Diseño straple"
        ],
        "beneficios": []
    },
  },

  {
    slug: "top-deportivo",
    title: "Top Deportivo",
    price: 14,
    image: "/placeholder.svg",
    category: "tops",
    fabric: "algodon",
    colors: [
      {
        name: "Top",
        slug: "top",
        hex: "#CCCCCC",
        image: "/placeholder.svg",
      },
    ],
    sizes: ["S","M","L"],
    audience: "mujer",    tags: ["COD.390", "Colección Tops Algodón Licrado", "Algodón Licrado"],

    attributes: {
        "material": "Algodón Licrado",
        "detalles": [
            "Precio económico",
            "Diseño deportivo básico",
            "Sin copas removibles"
        ],
        "beneficios": []
    },
  },

  {
    slug: "top-tira-fijas",
    title: "Top tira fijas",
    price: 14,
    image: "/placeholder.svg",
    category: "tops",
    fabric: "algodon",
    colors: [
      {
        name: "Top",
        slug: "top",
        hex: "#CCCCCC",
        image: "/placeholder.svg",
      },
    ],
    sizes: ["S","M","L"],
    audience: "mujer",    tags: ["COD.392", "Colección Tops Algodón Licrado", "Algodón Licrado"],

    attributes: {
        "material": "Algodón Licrado",
        "detalles": [
            "Precio económico",
            "Diseño con tiras finas",
            "Sin copas removibles"
        ],
        "beneficios": []
    },
  },

  {
    slug: "top-athena",
    title: "Top Athena",
    price: 29,
    image: "/placeholder.svg",
    category: "tops",
    fabric: "algodon",
    colors: [
      {
        name: "Top",
        slug: "top",
        hex: "#CCCCCC",
        image: "/placeholder.svg",
      },
    ],
    sizes: ["S","M","L","XL"],
    audience: "mujer",    tags: ["COD.207", "Colección Tops Algodón Licrado", "Algodón Licrado"],

    attributes: {
        "material": "Algodón Licrado",
        "detalles": [
            "Copas internas removibles",
            "Algodón licrado (cómodo y transpirable)",
            "Diseño premium"
        ],
        "beneficios": []
    },
  },

  {
    slug: "top-jolie",
    title: "Top Jolie",
    price: 29,
    image: "/placeholder.svg",
    category: "tops",
    fabric: "algodon",
    colors: [
      {
        name: "Top",
        slug: "top",
        hex: "#CCCCCC",
        image: "/placeholder.svg",
      },
    ],
    sizes: ["S","M","L","XL"],
    audience: "mujer",    tags: ["COD.208", "Colección Tops Algodón Licrado", "Algodón Licrado"],

    attributes: {
        "material": "Algodón Licrado",
        "detalles": [
            "Copas internas removibles",
            "Algodón licrado",
            "Diseño premium"
        ],
        "beneficios": []
    },
  },

  {
    slug: "top-brigid",
    title: "Top Brigid",
    price: 29,
    image: "/placeholder.svg",
    category: "tops",
    fabric: "algodon",
    colors: [
      {
        name: "Top",
        slug: "top",
        hex: "#CCCCCC",
        image: "/placeholder.svg",
      },
    ],
    sizes: ["S","M","L","XL"],
    audience: "mujer",    tags: ["COD.209", "Colección Tops Algodón Licrado", "Algodón Licrado"],

    attributes: {
        "material": "Algodón Licrado",
        "detalles": [
            "Copas internas removibles",
            "Algodón licrado",
            "Diseño premium"
        ],
        "beneficios": []
    },
  },

  {
    slug: "enterizo-tiras",
    title: "Enterizo tiras",
    price: 49,
    image: "/productos/mujer/enterizo/enterizo-tiras-azulino.webp",
    category: "enterizos",
    fabric: "suplex",
    colors: [
      {
        name: "Azul",
        slug: "azul",
        hex: "#1E3A8A",
        image: "/productos/mujer/enterizo/enterizo-tiras-azulino.webp",
      },
      {
        name: "Charcoal",
        slug: "charcol",
        hex: "#5A5A5A",
        image: "/productos/mujer/enterizo/enterizo-tiras-charcol.webp",
      },
      {
        name: "Negro",
        slug: "negro",
        hex: "#000000",
        image: "/productos/mujer/enterizo/enterizo-tiras-negro.webp",
      },
      {
        name: "Rojo",
        slug: "rojo",
        hex: "#D22B2B",
        image: "/productos/mujer/enterizo/enterizo-tiras-rojo.webp",
      },
      {
      name: "Azulino",
      slug: "azulino",
      hex: "#3A53A4",
      images: [
        "/productos/mujer/enterizo/enterizo-tiras-suplex-liso-premium-azulino-enterizo-azulino1.webp",
        "/productos/mujer/enterizo/enterizo-tiras-suplex-liso-premium-azulino-enterizo-azulino2.webp",
        "/productos/mujer/enterizo/enterizo-tiras-suplex-liso-premium-azulino-enterizo-azulino3.webp",
        "/productos/mujer/enterizo/enterizo-tiras-suplex-liso-premium-azulino-enterizo-azulino4.webp",
        "/productos/mujer/enterizo/enterizo-tiras-suplex-liso-premium-azulino-enterizo-azulino5.webp"
      ]
    },
      {
      name: "Blanco",
      slug: "blanco",
      hex: "#FFFFFF",
      images: [
        "/productos/mujer/enterizo/enterizo-tiras-suplex-liso-premium-blanco-enterizo-blanco1.webp",
        "/productos/mujer/enterizo/enterizo-tiras-suplex-liso-premium-blanco-enterizo-blanco2.webp",
        "/productos/mujer/enterizo/enterizo-tiras-suplex-liso-premium-blanco-enterizo-blanco3.webp",
        "/productos/mujer/enterizo/enterizo-tiras-suplex-liso-premium-blanco-enterizo-blanco4.webp",
        "/productos/mujer/enterizo/enterizo-tiras-suplex-liso-premium-blanco-enterizo-blanco5.webp"
      ]
    },
      {
      name: "Charcoal",
      slug: "charcoal",
      hex: "#5A5A5A",
      images: [
        "/productos/mujer/enterizo/enterizo-tiras-suplex-liso-premium-charcoal-enterizo-charcoal1.webp",
        "/productos/mujer/enterizo/enterizo-tiras-suplex-liso-premium-charcoal-enterizo-charcoal2.webp",
        "/productos/mujer/enterizo/enterizo-tiras-suplex-liso-premium-charcoal-enterizo-charcoal3.webp",
        "/productos/mujer/enterizo/enterizo-tiras-suplex-liso-premium-charcoal-enterizo-charcoal4.webp",
        "/productos/mujer/enterizo/enterizo-tiras-suplex-liso-premium-charcoal-enterizo-charcoal5.webp"
      ]
    },
    ],
    sizes: ["S","M","L"],
    audience: "mujer",
    tags: [
      "COD.219","enterizo", "enterizo tiras", "enterizos", "enterizos dama", "línea suplex dama", "dama", "damas", "tiras"],
    attributes: {
        "material": "Suplex",
        "detalles": [
            "Suplex liso de alta elongación",
            "Diseño con tiras"
        ],
        "beneficios": []
    },
  },

  {
    slug: "enterizo-manga-cero",
    title: "Enterizo manga cero",
    price: 49,
    image: "/productos/mujer/enterizo/enterizo-manga-cero-azulino.webp",
    category: "enterizos",
    fabric: "suplex",
    colors: [
      {
        name: "Azul",
        slug: "azul",
        hex: "#1E3A8A",
        image: "/productos/mujer/enterizo/enterizo-manga-cero-azulino.webp",
      },
      {
        name: "Charcoal",
        slug: "charcol",
        hex: "#5A5A5A",
        image: "/productos/mujer/enterizo/enterizo-manga-cero-charcol.webp",
      },
      {
        name: "Negro",
        slug: "negro",
        hex: "#000000",
        image: "/productos/mujer/enterizo/enterizo-manga-cero-negro.webp",
      },
      {
        name: "Rojo",
        slug: "rojo",
        hex: "#D22B2B",
        image: "/productos/mujer/enterizo/enterizo-manga-cero-rojo.webp",
      },
      {
      name: "Azulino",
      slug: "azulino",
      hex: "#3A53A4",
      images: [
        "/productos/mujer/enterizo/enterizo-manga-cero-suplex-liso-premium-azulino-Manga-cero-azulino1.webp",
        "/productos/mujer/enterizo/enterizo-manga-cero-suplex-liso-premium-azulino-manga-cero-azulino2.webp",
        "/productos/mujer/enterizo/enterizo-manga-cero-suplex-liso-premium-azulino-manga-cero-azulino3.webp",
        "/productos/mujer/enterizo/enterizo-manga-cero-suplex-liso-premium-azulino-manga-cero-azulino4.webp",
        "/productos/mujer/enterizo/enterizo-manga-cero-suplex-liso-premium-azulino-manga-cero-azulino5.webp",
        "/productos/mujer/enterizo/enterizo-manga-cero-suplex-liso-premium-azulino-manga-cero-azulino6.webp"
      ]
    },
      {
      name: "Blanco",
      slug: "blanco",
      hex: "#FFFFFF",
      images: [
        "/productos/mujer/enterizo/enterizo-manga-cero-suplex-liso-premium-blanco-manga-cero-blanco1.webp",
        "/productos/mujer/enterizo/enterizo-manga-cero-suplex-liso-premium-blanco-manga-cero-blanco2.webp",
        "/productos/mujer/enterizo/enterizo-manga-cero-suplex-liso-premium-blanco-manga-cero-blanco3.webp",
        "/productos/mujer/enterizo/enterizo-manga-cero-suplex-liso-premium-blanco-manga-cero-blanco4.webp",
        "/productos/mujer/enterizo/enterizo-manga-cero-suplex-liso-premium-blanco-manga-cero-blanco5.webp",
        "/productos/mujer/enterizo/enterizo-manga-cero-suplex-liso-premium-blanco-manga-cero-blanco6.webp"
      ]
    },
    ],
    sizes: ["S","M","L"],
    audience: "mujer",
    tags: [
      "COD.221","enterizo", "enterizo manga cero", "enterizos", "enterizos dama", "línea suplex dama", "dama", "damas"],
    attributes: {
        "material": "Suplex",
        "detalles": [
            "Suplex liso de alta elongación",
            "Manga cero (sin mangas)"
        ],
        "beneficios": []
    },
  },

  {
    slug: "enterizo-manga-corta-nina",
    title: "Enterizo manga corta Niña",
    price: 38,
    image: "/placeholder.svg",
    category: "enterizos",
    fabric: "suplex",
    colors: [
      {
        name: "Enterizo",
        slug: "enterizo",
        hex: "#CCCCCC",
        image: "/placeholder.svg",
      },
    ],
    sizes: ["2", "4", "6", "8", "10", "12"],
    audience: "nina",
    attributes: {
  material: "Suplex liso",
  detalles: [
    "Diseño especial para niñas",
    "Ajuste cómodo y seguro",
    "Fácil de poner y quitar"
  ],
  beneficios: [
    "Perfecta para actividades deportivas",
    "Resistente al uso diario",
    "Mantiene su forma después de lavados"
  ]
},
  },

  {
    slug: "enterizo-manga-larga-nina",
    title: "Enterizo manga larga Niña",
    price: 42,
    image: "/placeholder.svg",
    category: "enterizos",
    fabric: "suplex",
    colors: [
      {
        name: "Enterizo",
        slug: "enterizo",
        hex: "#CCCCCC",
        image: "/placeholder.svg",
      },
    ],
    sizes: ["2", "4", "6", "8", "10", "12"],
    audience: "nina",
    attributes: {
  material: "Suplex liso",
  detalles: [
    "Diseño especial para niñas",
    "Ajuste cómodo y seguro",
    "Fácil de poner y quitar"
  ],
  beneficios: [
    "Perfecta para actividades deportivas",
    "Resistente al uso diario",
    "Mantiene su forma después de lavados"
  ]
},
  },

  {
    slug: "legging-slim-suplex-perchado",
    title: "Legging Slim Suplex Perchado",
    price: 59,
    image: "/placeholder.svg",
    category: "leggings",
    fabric: "suplex",
    colors: [
      {
        name: "Legging",
        slug: "legging",
        hex: "#CCCCCC",
        image: "/placeholder.svg",
      },
    ],
    sizes: ["S","M","L","XL"],
    audience: "mujer",    tags: ["COD.S-101", "Colección Especial Suplex", "Suplex Perchado"],

    attributes: {
        "material": "Suplex Perchado",
        "detalles": [
            "Suplex perchado = tejido de spandex",
            "Externo liso",
            "Interno afranelado medio (abrigado)",
            "Diseño slim"
        ],
        "beneficios": []
    },
  },

  {
    slug: "legging-slim",
    title: "Legging Slim",
    price: 59,
    image: "/productos/mujer/legging/legging-slim-azul-marino.webp",
    category: "leggings",
    fabric: "suplex",
    colors: [
      {
        name: "Azul Marino",
        slug: "azul-marino",
        hex: "#1E3A8A",
        image: "/productos/mujer/legging/legging-slim-azul-marino.webp",
      },
      {
        name: "Azul",
        slug: "azul",
        hex: "#1E3A8A",
        image: "/productos/mujer/legging/legging-slim-azulino.webp",
      },
      {
      name: "Blanco",
      slug: "blanco",
      hex: "#FFFFFF",
      images: [
        "/productos/mujer/legging/legging-slim-blanco.webp",
        "/productos/mujer/legging/legging-slim-suplex-liso-premium-blanco-legging-slim-blanco1.webp",
        "/productos/mujer/legging/legging-slim-suplex-liso-premium-blanco-legging-slim-blanco2.webp",
        "/productos/mujer/legging/legging-slim-suplex-liso-premium-blanco-legging-slim-blanco3.webp",
        "/productos/mujer/legging/legging-slim-suplex-liso-premium-blanco-legging-slim-blanco4.webp"
      ]
    },
      {
        name: "Negro",
        slug: "negro",
        hex: "#000000",
        image: "/productos/mujer/legging/legging-slim-negro.webp",
      },
      {
        name: "Rojo",
        slug: "rojo",
        hex: "#D22B2B",
        image: "/productos/mujer/legging/legging-slim-rojo.webp",
      },
      {
      name: "Acero",
      slug: "acero",
      hex: "#808080",
      images: [
        "/productos/mujer/legging/legging-slim-suplex-liso-premium-acero-legging-slim-acero1.webp",
        "/productos/mujer/legging/legging-slim-suplex-liso-premium-acero-legging-slim-acero2.webp",
        "/productos/mujer/legging/legging-slim-suplex-liso-premium-acero-legging-slim-acero3.webp",
        "/productos/mujer/legging/legging-slim-suplex-liso-premium-acero-legging-slim-acero4.webp",
        "/productos/mujer/legging/legging-slim-suplex-liso-premium-acero-legging-slim-acero5.webp"
      ]
    },
      {
      name: "Aqua",
      slug: "aqua",
      hex: "#00FFFF",
      images: [
        "/productos/mujer/legging/legging-slim-suplex-liso-premium-aqua-legging-slim-aqua1.webp",
        "/productos/mujer/legging/legging-slim-suplex-liso-premium-aqua-legging-slim-aqua2.webp",
        "/productos/mujer/legging/legging-slim-suplex-liso-premium-aqua-legging-slim-aqua3.webp",
        "/productos/mujer/legging/legging-slim-suplex-liso-premium-aqua-legging-slim-aqua4.webp",
        "/productos/mujer/legging/legging-slim-suplex-liso-premium-aqua-legging-slim-aqua5.webp"
      ]
    },
      {
      name: "Azulino",
      slug: "azulino",
      hex: "#3A53A4",
      images: [
        "/productos/mujer/legging/legging-slim-suplex-liso-premium-azulino-legging-slim-azulino-1.webp",
        "/productos/mujer/legging/legging-slim-suplex-liso-premium-azulino-legging-slim-azulino-2.webp",
        "/productos/mujer/legging/legging-slim-suplex-liso-premium-azulino-legging-slim-azulino-3.webp",
        "/productos/mujer/legging/legging-slim-suplex-liso-premium-azulino-legging-slim-azulino-4.webp"
      ]
    },
      {
      name: "Camel",
      slug: "camel",
      hex: "#C19A6B",
      images: [
        "/productos/mujer/legging/legging-slim-suplex-liso-premium-camel-legging-slim-camel1.webp",
        "/productos/mujer/legging/legging-slim-suplex-liso-premium-camel-legging-slim-camel2.webp",
        "/productos/mujer/legging/legging-slim-suplex-liso-premium-camel-legging-slim-camel3.webp"
      ]
    },
    ],
    sizes: ["S","M","L","XL"],
    audience: "mujer",    tags: ["COD.S-1011", "Colección Especial Suplex", "Suplex Liso"],

    attributes: {
        "material": "Suplex Liso",
        "detalles": [
            "Suplex liso",
            "Diseño slim",
            "Alta variedad de colores (10 colores)"
        ],
        "beneficios": []
    },
  },

  {
    slug: "legging-functional",
    title: "Legging Functional",
    price: 55,
    image: "/placeholder.svg",
    category: "leggings",
    fabric: "suplex",
    colors: [
      {
        name: "Legging",
        slug: "legging",
        hex: "#CCCCCC",
        image: "/placeholder.svg",
      },
    ],
    sizes: ["S","M","L"],
    audience: "mujer",    tags: ["COD.S-108", "Colección Especial Suplex", "Suplex + Spandex"],

    attributes: {
        "material": "Suplex + Spandex",
        "detalles": [
            "Pretina tipo faja (compresión)",
            "Suplex liso interno",
            "Tejido spandex externo",
            "Diseño funcional para deportes"
        ],
        "beneficios": []
    },
  },

  {
    slug: "legging-harmony",
    title: "Legging Harmony",
    price: 49,
    image: "/placeholder.svg",
    category: "leggings",
    fabric: "suplex",
    colors: [
      {
        name: "Azul",
        slug: "azul",
        hex: "#1E3A8A",
        image: "/placeholder.svg",
      },
      {
        name: "Charcoal",
        slug: "charcol",
        hex: "#5A5A5A",
        image: "/placeholder.svg",
      },
      {
        name: "Negro",
        slug: "negro",
        hex: "#000000",
        image: "/placeholder.svg",
      },
      {
        name: "Rojo",
        slug: "rojo",
        hex: "#D22B2B",
        image: "/placeholder.svg",
      },
    ],
    sizes: ["S","M","L"],
    audience: "mujer",    tags: ["COD.201", "Colección Infinity", "Suplex Liso de Alta Elongación"],

    attributes: {
        "material": "Suplex Liso de Alta Elongación",
        "detalles": [
            "Pretina tipo faja",
            "Refuerzo trasero",
            "Suplex liso de alta elongación",
            "Largo completo (legging)"
        ],
        "beneficios": []
    },
  },

  {
    slug: "legging-realce-fresh-terry",
    title: "Legging Realce Fresh Terry",
    price: 48,
    image: "/placeholder.svg",
    category: "leggings",
    fabric: "suplex",
    colors: [
      {
        name: "Legging",
        slug: "legging",
        hex: "#CCCCCC",
        image: "/placeholder.svg",
      },
    ],
    sizes: ["S","M","L","XL","XXL"],
    audience: "mujer",    tags: ["COD.437", "Colección Fresh Terry", "Fresh Terry"],

    attributes: {
        "material": "Fresh Terry",
        "detalles": [
            "Material Fresh Terry (innovador tipo toalla francesa/felpa)",
            "Cintura alta y ancha para estilizar la silueta",
            "Efecto realce"
        ],
        "beneficios": []
    },
  },

  {
    slug: "legging-clasica",
    title: "Legging Clásica",
    price: 32,
    image: "/productos/mujer/legging/legging-clasica-azul-marino.webp",
    category: "leggings",
    fabric: "suplex",
    colors: [
      {
        name: "Azul Marino",
        slug: "azul-marino",
        hex: "#1E3A8A",
        image: "/productos/mujer/legging/legging-clasica-azul-marino.webp",
      },
      {
      name: "Blanco",
      slug: "blanco",
      hex: "#FFFFFF",
      images: [
        "/productos/mujer/legging/legging-clasica-gamusa-blanco.webp",
        "/productos/mujer/legging/legging-clasica-gamusa-azul-marino.webp",
        "/productos/mujer/legging/legging-clasica-gamusa-melange.webp",
        "/productos/mujer/legging/legging-clasica-gamusa-negro.webp"
      ]
    },
      {
        name: "Melange",
        slug: "melange",
        hex: "#B8B8B8",
        image: "/productos/mujer/legging/legging-clasica-gamusa-melange.webp",
      },
      {
      name: "Negro",
      slug: "negro",
      hex: "#000000",
      images: [
        "/productos/mujer/legging/legging-clasica-gamusa-negro.webp",
        "/productos/mujer/legging/legging-clasica-gamusa-azul-marino.webp",
        "/productos/mujer/legging/legging-clasica-gamusa-blanco.webp",
        "/productos/mujer/legging/legging-clasica-gamusa-melange.webp"
      ]
    },
    ],
    sizes: ["S","M","L","XL"],
    audience: "mujer",    tags: ["COD.371", "Línea Nice - Leggings Algodón Licrado", "Algodón Licra"],

    attributes: {
        "material": "Algodón Licra",
        "detalles": [
            "Algodón licra",
            "Legging clásica",
            "Marca Nice"
        ],
        "beneficios": []
    },
  },

  {
    slug: "legging-clasica-gamuza",
    title: "Legging Clásica Gamuza",
    price: 35,
    image: "/placeholder.svg",
    category: "leggings",
    fabric: "suplex",
    colors: [
      {
        name: "Legging",
        slug: "legging",
        hex: "#CCCCCC",
        image: "/placeholder.svg",
      },
    ],
    sizes: ["S","M","L","XL"],
    audience: "mujer",    tags: ["COD.324", "Línea Nice - Leggings Algodón Licrado", "Algodón Gamusa"],

    attributes: {
        "material": "Algodón Gamusa",
        "detalles": [
            "Algodón gamusa (textura especial)",
            "Legging clásica",
            "Marca Nice"
        ],
        "beneficios": []
    },
  },

  {
    slug: "legging-nina",
    title: "Legging Niña",
    price: 32,
    image: "/placeholder.svg",
    category: "leggings",
    fabric: "suplex",
    colors: [
      {
        name: "Legging",
        slug: "legging",
        hex: "#CCCCCC",
        image: "/placeholder.svg",
      },
    ],
    sizes: ["2", "4", "6", "8", "10", "12"],
    audience: "nina",
    attributes: {
  material: "Suplex liso",
  detalles: [
    "Pretina ancha para mejor soporte",
    "Corte ajustado sin transparencias",
    "Costuras planas"
  ],
  beneficios: [
    "Se adapta al cuerpo como una segunda piel",
    "Te mantiene fresca y seca durante el entrenamiento",
    "Alta resistencia y durabilidad"
  ]
},
  },

  {
    slug: "pescador-realce",
    title: "Pescador realce",
    price: 48,
    image: "/placeholder.svg",
    category: "pescador",
    fabric: "suplex",
    colors: [
      {
        name: "Azul",
        slug: "azul",
        hex: "#1E3A8A",
        image: "/placeholder.svg",
      },
      {
        name: "Negro",
        slug: "negro",
        hex: "#000000",
        image: "/placeholder.svg",
      },
      {
        name: "Rojo",
        slug: "rojo",
        hex: "#D22B2B",
        image: "/placeholder.svg",
      },
    ],
    sizes: ["S","M","L","XL"],
    audience: "mujer",
    tags: [
      "COD.210","dama", "damas", "pescador", "pescador realce", "Línea suplex dama"],
    attributes: {
        "material": "Suplex",
        "detalles": [
            "Pretina tipo faja (compresión)",
            "Suplex liso de alta elongación",
            "Efecto realce (levanta glúteos)",
            "Largo 3/4 (pescador)"
        ],
        "beneficios": []
    },
  },

  {
    slug: "pescador-dynamic",
    title: "Pescador dynamic",
    price: 39,
    image: "/placeholder.svg",
    category: "pescador",
    fabric: "suplex",
    colors: [
      {
        name: "Azul",
        slug: "azul",
        hex: "#1E3A8A",
        image: "/placeholder.svg",
      },
      {
        name: "Charcoal",
        slug: "charcol",
        hex: "#5A5A5A",
        image: "/placeholder.svg",
      },
      {
        name: "Negro",
        slug: "negro",
        hex: "#000000",
        image: "/placeholder.svg",
      },
      {
        name: "Rojo",
        slug: "rojo",
        hex: "#D22B2B",
        image: "/placeholder.svg",
      },
    ],
    sizes: ["S","M","L"],
    audience: "mujer",
    tags: [
      "COD.202","dama", "damas", "pescador", "pescador dynamic", "Línea suplex dama"],
    attributes: {
        "material": "Suplex Liso de Alta Elongación",
        "detalles": [
            "Pretina tipo faja",
            "Refuerzo trasero",
            "Suplex liso de alta elongación",
            "Largo 3/4 (pescador)"
        ],
        "beneficios": []
    },
  },

  {
    slug: "torero-energy",
    title: "Torero energy",
    price: 36,
    image: "/placeholder.svg",
    category: "torero",
    fabric: "suplex",
    colors: [
      {
        name: "Azul",
        slug: "azul",
        hex: "#1E3A8A",
        image: "/placeholder.svg",
      },
      {
        name: "Charcoal",
        slug: "charcol",
        hex: "#5A5A5A",
        image: "/placeholder.svg",
      },
      {
        name: "Negro",
        slug: "negro",
        hex: "#000000",
        image: "/placeholder.svg",
      },
      {
        name: "Rojo",
        slug: "rojo",
        hex: "#D22B2B",
        image: "/placeholder.svg",
      },
    ],
    sizes: ["S","M","L"],
    audience: "mujer",
    tags: [
      "COD.203","dama", "damas", "torero", "energy", "Línea suplex dama", "torero energy"],
    attributes: {
        "material": "Suplex Liso de Alta Elongación",
        "detalles": [
            "Pretina tipo faja",
            "Refuerzo trasero",
            "Suplex liso de alta elongación",
            "Largo torero (entre ciclista y pescador)"
        ],
        "beneficios": []
    },
  },

  {
    slug: "cafarena-nina",
    title: "Cafarena Niña",
    price: 28,
    image: "/placeholder.svg",
    category: "shorts",
    fabric: "suplex",
    colors: [
      {
        name: "Cafarena",
        slug: "cafarena",
        hex: "#CCCCCC",
        image: "/placeholder.svg",
      },
    ],
    sizes: ["2", "4", "6", "8", "10", "12"],
    audience: "nina",
    attributes: {
  material: "Suplex liso",
  detalles: [
    "Diseño especial para niñas",
    "Ajuste cómodo y seguro",
    "Fácil de poner y quitar"
  ],
  beneficios: [
    "Perfecta para actividades deportivas",
    "Resistente al uso diario",
    "Mantiene su forma después de lavados"
  ]
},
  },

  {
    slug: "panty-nina",
    title: "Panty Niña",
    price: 22,
    image: "/placeholder.svg",
    category: "shorts",
    fabric: "suplex",
    colors: [
      {
        name: "Panty",
        slug: "panty",
        hex: "#CCCCCC",
        image: "/placeholder.svg",
      },
    ],
    sizes: ["2", "4", "6", "8", "10", "12"],
    audience: "nina",
    attributes: {
  material: "Suplex liso",
  detalles: [
    "Diseño especial para niñas",
    "Ajuste cómodo y seguro",
    "Fácil de poner y quitar"
  ],
  beneficios: [
    "Perfecta para actividades deportivas",
    "Resistente al uso diario",
    "Mantiene su forma después de lavados"
  ]
},
  },

  {
    slug: "maxi-short-nina",
    title: "Maxi Short Niña",
    price: 26,
    image: "/placeholder.svg",
    category: "shorts",
    fabric: "suplex",
    colors: [
      {
        name: "Maxi",
        slug: "maxi",
        hex: "#CCCCCC",
        image: "/placeholder.svg",
      },
    ],
    sizes: ["2", "4", "6", "8", "10", "12"],
    audience: "nina",
    attributes: {
  material: "Suplex liso",
  detalles: [
    "Diseño especial para niñas",
    "Ajuste cómodo y seguro",
    "Fácil de poner y quitar"
  ],
  beneficios: [
    "Perfecta para actividades deportivas",
    "Resistente al uso diario",
    "Mantiene su forma después de lavados"
  ]
},
  },

  {
    slug: "short-juvenil-nina",
    title: "Short Juvenil Niña",
    price: 24,
    image: "/placeholder.svg",
    category: "shorts",
    fabric: "suplex",
    colors: [
      {
        name: "Short",
        slug: "short",
        hex: "#CCCCCC",
        image: "/placeholder.svg",
      },
    ],
    sizes: ["2", "4", "6", "8", "10", "12"],
    audience: "nina",
    attributes: {
  material: "Suplex liso",
  detalles: [
    "Diseño especial para niñas",
    "Ajuste cómodo y seguro",
    "Fácil de poner y quitar"
  ],
  beneficios: [
    "Perfecta para actividades deportivas",
    "Resistente al uso diario",
    "Mantiene su forma después de lavados"
  ]
},
  },

  {
    slug: "top-jazmin",
    title: "Top Jazmín",
    price: 30,
    image: "/placeholder.svg",
    category: "tops",
    fabric: "algodon",
    colors: [
      {
        name: "Top",
        slug: "top",
        hex: "#CCCCCC",
        image: "/placeholder.svg",
      },
    ],
    sizes: ["2", "4", "6", "8", "10", "12"],
    audience: "nina",
    attributes: {
  material: "Suplex liso",
  detalles: [
    "Diseño especial para niñas",
    "Ajuste cómodo y seguro",
    "Fácil de poner y quitar"
  ],
  beneficios: [
    "Perfecta para actividades deportivas",
    "Resistente al uso diario",
    "Mantiene su forma después de lavados"
  ]
},
  },

  {
    slug: "top-margarita",
    title: "Top Margarita",
    price: 30,
    image: "/placeholder.svg",
    category: "tops",
    fabric: "algodon",
    colors: [
      {
        name: "Top",
        slug: "top",
        hex: "#CCCCCC",
        image: "/placeholder.svg",
      },
    ],
    sizes: ["2", "4", "6", "8", "10", "12"],
    audience: "nina",
    attributes: {
  material: "Suplex liso",
  detalles: [
    "Diseño especial para niñas",
    "Ajuste cómodo y seguro",
    "Fácil de poner y quitar"
  ],
  beneficios: [
    "Perfecta para actividades deportivas",
    "Resistente al uso diario",
    "Mantiene su forma después de lavados"
  ]
},
  },

  {
    slug: "top-orquidea",
    title: "Top Orquídea",
    price: 30,
    image: "/placeholder.svg",
    category: "tops",
    fabric: "algodon",
    colors: [
      {
        name: "Top",
        slug: "top",
        hex: "#CCCCCC",
        image: "/placeholder.svg",
      },
    ],
    sizes: ["2", "4", "6", "8", "10", "12"],
    audience: "nina",
    attributes: {
  material: "Suplex liso",
  detalles: [
    "Diseño especial para niñas",
    "Ajuste cómodo y seguro",
    "Fácil de poner y quitar"
  ],
  beneficios: [
    "Perfecta para actividades deportivas",
    "Resistente al uso diario",
    "Mantiene su forma después de lavados"
  ]
},
  },

  {
    slug: "top-tulipan",
    title: "Top Tulipán",
    price: 30,
    image: "/placeholder.svg",
    category: "tops",
    fabric: "algodon",
    colors: [
      {
        name: "Top",
        slug: "top",
        hex: "#CCCCCC",
        image: "/placeholder.svg",
      },
    ],
    sizes: ["2", "4", "6", "8", "10", "12"],
    audience: "nina",
    attributes: {
  material: "Suplex liso",
  detalles: [
    "Diseño especial para niñas",
    "Ajuste cómodo y seguro",
    "Fácil de poner y quitar"
  ],
  beneficios: [
    "Perfecta para actividades deportivas",
    "Resistente al uso diario",
    "Mantiene su forma después de lavados"
  ]
},
  },

  {
    slug: "top-vani",
    title: "Top Vani",
    price: 28,
    image: "/placeholder.svg",
    category: "tops",
    fabric: "algodon",
    colors: [
      {
        name: "Top",
        slug: "top",
        hex: "#CCCCCC",
        image: "/placeholder.svg",
      },
    ],
    sizes: ["2", "4", "6", "8", "10", "12"],
    audience: "nina",
    attributes: {
  material: "Suplex liso",
  detalles: [
    "Diseño especial para niñas",
    "Ajuste cómodo y seguro",
    "Fácil de poner y quitar"
  ],
  beneficios: [
    "Perfecta para actividades deportivas",
    "Resistente al uso diario",
    "Mantiene su forma después de lavados"
  ]
},
  }
]

export const findProduct = (slug: string) => products.find((p) => p.slug === slug)
export const byCategory = (c: Product["category"]) => products.filter((p) => p.category === c)
export const byFabric = (f: Product["fabric"]) => products.filter((p) => p.fabric === f)
export const byAudience = (a: Product["audience"]) => products.filter((p) => p.audience === a)
