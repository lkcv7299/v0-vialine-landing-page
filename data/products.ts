export type Product = {
  slug: string
  title: string
  price: number
  image: string // path under /public/productos/<category>/<slug>.jpg
  category: "leggings" | "bikers" | "shorts" | "tops" | "bodysuits" | "camisetas" | "enterizos" | "pescador" | "torero" | "cafarenas" | "pantys"
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
    image: "/productos/mujer/bikers/short-ciclista-active-aqua1.webp",
    category: "bikers",
    fabric: "suplex",
    colors: [
        {
            "name": "Aqua",
            "slug": "aqua",
            "hex": "#00CED1",
            "image": "/productos/mujer/bikers/short-ciclista-active-aqua1.webp",
            "images": [
                "/productos/mujer/bikers/short-ciclista-active-aqua1.webp",
                "/productos/mujer/bikers/short-ciclista-active-aqua2.webp",
                "/productos/mujer/bikers/short-ciclista-active-aqua3.webp",
                "/productos/mujer/bikers/short-ciclista-active-aqua4.webp",
                "/productos/mujer/bikers/short-ciclista-active-aqua5.webp"
            ]
        },
        {
            "name": "Azulino",
            "slug": "azulino",
            "hex": "#87CEEB",
            "image": "/productos/mujer/bikers/short-ciclista-active-azulino1.webp",
            "images": [
                "/productos/mujer/bikers/short-ciclista-active-azulino1.webp",
                "/productos/mujer/bikers/short-ciclista-active-azulino2.webp",
                "/productos/mujer/bikers/short-ciclista-active-azulino3.webp",
                "/productos/mujer/bikers/short-ciclista-active-azulino4.webp",
                "/productos/mujer/bikers/short-ciclista-active-azulino5.webp"
            ]
        },
        {
            "name": "Blanco",
            "slug": "blanco",
            "hex": "#FFFFFF",
            "image": "/productos/mujer/bikers/short-ciclista-active-blanco1.webp",
            "images": [
                "/productos/mujer/bikers/short-ciclista-active-blanco1.webp",
                "/productos/mujer/bikers/short-ciclista-active-blanco2.webp",
                "/productos/mujer/bikers/short-ciclista-active-blanco3.webp",
                "/productos/mujer/bikers/short-ciclista-active-blanco4.webp",
                "/productos/mujer/bikers/short-ciclista-active-blanco5.webp"
            ]
        },
        {
            "name": "Charcoal",
            "slug": "charcoal",
            "hex": "#36454F",
            "image": "/productos/mujer/bikers/short-ciclista-active-charcoal1.webp",
            "images": [
                "/productos/mujer/bikers/short-ciclista-active-charcoal1.webp",
                "/productos/mujer/bikers/short-ciclista-active-charcoal2.webp",
                "/productos/mujer/bikers/short-ciclista-active-charcoal3.webp",
                "/productos/mujer/bikers/short-ciclista-active-charcoal4.webp",
                "/productos/mujer/bikers/short-ciclista-active-charcoal5.webp"
            ]
        },
        {
            "name": "Melange",
            "slug": "melange",
            "hex": "#D3D3D3",
            "image": "/productos/mujer/bikers/short-ciclista-active-melange1.webp",
            "images": [
                "/productos/mujer/bikers/short-ciclista-active-melange1.webp",
                "/productos/mujer/bikers/short-ciclista-active-melange2.webp",
                "/productos/mujer/bikers/short-ciclista-active-melange3.webp",
                "/productos/mujer/bikers/short-ciclista-active-melange4.webp",
                "/productos/mujer/bikers/short-ciclista-active-melange5.webp"
            ]
        },
        {
            "name": "Melon",
            "slug": "melon",
            "hex": "#FEBAAD",
            "image": "/productos/mujer/bikers/short-ciclista-active-melon1.webp",
            "images": [
                "/productos/mujer/bikers/short-ciclista-active-melon1.webp",
                "/productos/mujer/bikers/short-ciclista-active-melon2.webp",
                "/productos/mujer/bikers/short-ciclista-active-melon3.webp",
                "/productos/mujer/bikers/short-ciclista-active-melon4.webp",
                "/productos/mujer/bikers/short-ciclista-active-melon5.webp"
            ]
        },
        {
            "name": "Negro",
            "slug": "negro",
            "hex": "#000000",
            "image": "/productos/mujer/bikers/short-ciclista-active-negro1.webp",
            "images": [
                "/productos/mujer/bikers/short-ciclista-active-negro1.webp",
                "/productos/mujer/bikers/short-ciclista-active-negro2.webp",
                "/productos/mujer/bikers/short-ciclista-active-negro3.webp",
                "/productos/mujer/bikers/short-ciclista-active-negro4.webp",
                "/productos/mujer/bikers/short-ciclista-active-negro5.webp"
            ]
        },
        {
            "name": "Rojo",
            "slug": "rojo",
            "hex": "#FF0000",
            "image": "/productos/mujer/bikers/short-ciclista-active-rojo1.webp",
            "images": [
                "/productos/mujer/bikers/short-ciclista-active-rojo1.webp",
                "/productos/mujer/bikers/short-ciclista-active-rojo2.webp",
                "/productos/mujer/bikers/short-ciclista-active-rojo3.webp",
                "/productos/mujer/bikers/short-ciclista-active-rojo4.webp",
                "/productos/mujer/bikers/short-ciclista-active-rojo5.webp"
            ]
        }
    ],
    sizes: ["S","M","L","XL"],
    audience: "mujer",
    tags: ["COD.204", "Colección Infinity", "Suplex Liso de Alta Elongación"],
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
    image: "/productos/mujer/short/short-lux-aqua1.webp",
    category: "bikers",
    fabric: "suplex",
    colors: [
        {
            "name": "Aqua",
            "slug": "aqua",
            "hex": "#00CED1",
            "image": "/productos/mujer/short/short-lux-aqua1.webp",
            "images": [
                "/productos/mujer/short/short-lux-aqua1.webp",
                "/productos/mujer/short/short-lux-aqua2.webp",
                "/productos/mujer/short/short-lux-aqua3.webp",
                "/productos/mujer/short/short-lux-aqua4.webp",
                "/productos/mujer/short/short-lux-aqua5.webp"
            ]
        },
        {
            "name": "Azulino",
            "slug": "azulino",
            "hex": "#87CEEB",
            "image": "/productos/mujer/short/short-lux-azulino1.webp",
            "images": [
                "/productos/mujer/short/short-lux-azulino1.webp",
                "/productos/mujer/short/short-lux-azulino2.webp",
                "/productos/mujer/short/short-lux-azulino3.webp",
                "/productos/mujer/short/short-lux-azulino4.webp",
                "/productos/mujer/short/short-lux-azulino5.webp"
            ]
        },
        {
            "name": "Blanco",
            "slug": "blanco",
            "hex": "#FFFFFF",
            "image": "/productos/mujer/short/short-lux-blanco1.webp",
            "images": [
                "/productos/mujer/short/short-lux-blanco1.webp",
                "/productos/mujer/short/short-lux-blanco2.webp",
                "/productos/mujer/short/short-lux-blanco3.webp",
                "/productos/mujer/short/short-lux-blanco4.webp",
                "/productos/mujer/short/short-lux-blanco5.webp"
            ]
        },
        {
            "name": "Charcoal",
            "slug": "charcoal",
            "hex": "#36454F",
            "image": "/productos/mujer/short/short-lux-charcoal1.webp",
            "images": [
                "/productos/mujer/short/short-lux-charcoal1.webp",
                "/productos/mujer/short/short-lux-charcoal2.webp",
                "/productos/mujer/short/short-lux-charcoal3.webp",
                "/productos/mujer/short/short-lux-charcoal4.webp",
                "/productos/mujer/short/short-lux-charcoal5.webp"
            ]
        },
        {
            "name": "Melange",
            "slug": "melange",
            "hex": "#D3D3D3",
            "image": "/productos/mujer/short/short-lux-melange1.webp",
            "images": [
                "/productos/mujer/short/short-lux-melange1.webp",
                "/productos/mujer/short/short-lux-melange2.webp",
                "/productos/mujer/short/short-lux-melange3.webp",
                "/productos/mujer/short/short-lux-melange4.webp",
                "/productos/mujer/short/short-lux-melange5.webp"
            ]
        },
        {
            "name": "Melon",
            "slug": "melon",
            "hex": "#FEBAAD",
            "image": "/productos/mujer/short/short-lux-melon1.webp",
            "images": [
                "/productos/mujer/short/short-lux-melon1.webp",
                "/productos/mujer/short/short-lux-melon2.webp",
                "/productos/mujer/short/short-lux-melon3.webp"
            ]
        },
        {
            "name": "Negro",
            "slug": "negro",
            "hex": "#000000",
            "image": "/productos/mujer/short/short-lux-negro1.webp",
            "images": [
                "/productos/mujer/short/short-lux-negro1.webp",
                "/productos/mujer/short/short-lux-negro2.webp",
                "/productos/mujer/short/short-lux-negro3.webp"
            ]
        },
        {
            "name": "Rojo",
            "slug": "rojo",
            "hex": "#FF0000",
            "image": "/productos/mujer/short/short-lux-rojo1.webp",
            "images": [
                "/productos/mujer/short/short-lux-rojo1.webp",
                "/productos/mujer/short/short-lux-rojo2.webp",
                "/productos/mujer/short/short-lux-rojo3.webp",
                "/productos/mujer/short/short-lux-rojo4.webp"
            ]
        }
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
    image: "/productos/mujer/short/short-clasico-negro1.webp",
    category: "shorts",
    fabric: "suplex",
    colors: [
        {
            "name": "Negro",
            "slug": "negro",
            "hex": "#000000",
            "image": "/productos/mujer/short/short-clasico-negro1.webp",
            "images": [
                "/productos/mujer/short/short-clasico-negro1.webp",
                "/productos/mujer/short/short-clasico-negro2.webp",
                "/productos/mujer/short/short-clasico-negro3.webp",
                "/productos/mujer/short/short-clasico-negro4.webp"
            ]
        },
        {
            "name": "Rojo",
            "slug": "rojo",
            "hex": "#FF0000",
            "image": "/productos/mujer/short/short-clasico-rojo1.webp",
            "images": [
                "/productos/mujer/short/short-clasico-rojo1.webp",
                "/productos/mujer/short/short-clasico-rojo2.webp",
                "/productos/mujer/short/short-clasico-rojo3.webp",
                "/productos/mujer/short/short-clasico-rojo4.webp",
                "/productos/mujer/short/short-clasico-rojo5.webp",
                "/productos/mujer/short/short-clasico-rojo6.webp"
            ]
        }
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
    image: "/productos/mujer/tops/top-venus-azulino1.webp",
    category: "tops",
    fabric: "algodon",
    colors: [
        {
            "name": "Azulino",
            "slug": "azulino",
            "hex": "#87CEEB",
            "image": "/productos/mujer/tops/top-venus-azulino1.webp",
            "images": [
                "/productos/mujer/tops/top-venus-azulino1.webp",
                "/productos/mujer/tops/top-venus-azulino2.webp",
                "/productos/mujer/tops/top-venus-azulino3.webp",
                "/productos/mujer/tops/top-venus-azulino4.webp"
            ]
        },
        {
            "name": "Blanco",
            "slug": "blanco",
            "hex": "#FFFFFF",
            "image": "/productos/mujer/tops/top-venus-blanco1.webp",
            "images": [
                "/productos/mujer/tops/top-venus-blanco1.webp",
                "/productos/mujer/tops/top-venus-blanco2.webp",
                "/productos/mujer/tops/top-venus-blanco3.webp",
                "/productos/mujer/tops/top-venus-blanco4.webp",
                "/productos/mujer/tops/top-venus-blanco5.webp"
            ]
        },
        {
            "name": "Charcoal",
            "slug": "charcoal",
            "hex": "#36454F",
            "image": "/productos/mujer/tops/top-venus-charcoal1.webp",
            "images": [
                "/productos/mujer/tops/top-venus-charcoal1.webp",
                "/productos/mujer/tops/top-venus-charcoal2.webp",
                "/productos/mujer/tops/top-venus-charcoal3.webp",
                "/productos/mujer/tops/top-venus-charcoal4.webp",
                "/productos/mujer/tops/top-venus-charcoal5.webp"
            ]
        },
        {
            "name": "Negro",
            "slug": "negro",
            "hex": "#000000",
            "image": "/productos/mujer/tops/top-venus-negro1.webp",
            "images": [
                "/productos/mujer/tops/top-venus-negro1.webp",
                "/productos/mujer/tops/top-venus-negro2.webp",
                "/productos/mujer/tops/top-venus-negro3.webp",
                "/productos/mujer/tops/top-venus-negro4.webp",
                "/productos/mujer/tops/top-venus-negro5.webp"
            ]
        },
        {
            "name": "Rojo",
            "slug": "rojo",
            "hex": "#FF0000",
            "image": "/productos/mujer/tops/top-venus-rojo1.webp",
            "images": [
                "/productos/mujer/tops/top-venus-rojo1.webp",
                "/productos/mujer/tops/top-venus-rojo2.webp",
                "/productos/mujer/tops/top-venus-rojo3.webp",
                "/productos/mujer/tops/top-venus-rojo4.webp",
                "/productos/mujer/tops/top-venus-rojo5.webp",
                "/productos/mujer/tops/top-venus-rojo6.webp"
            ]
        }
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
    image: "/productos/mujer/tops/top-jungle-azulino1.webp",
    category: "tops",
    fabric: "algodon",
    colors: [
        {
            "name": "Azulino",
            "slug": "azulino",
            "hex": "#87CEEB",
            "image": "/productos/mujer/tops/top-jungle-azulino1.webp",
            "images": [
                "/productos/mujer/tops/top-jungle-azulino1.webp",
                "/productos/mujer/tops/top-jungle-azulino2.webp",
                "/productos/mujer/tops/top-jungle-azulino3.webp",
                "/productos/mujer/tops/top-jungle-azulino4.webp"
            ]
        },
        {
            "name": "Charcoal",
            "slug": "charcoal",
            "hex": "#36454F",
            "image": "/productos/mujer/tops/top-jungle-charcoal1.webp",
            "images": [
                "/productos/mujer/tops/top-jungle-charcoal1.webp",
                "/productos/mujer/tops/top-jungle-charcoal2.webp",
                "/productos/mujer/tops/top-jungle-charcoal3.webp",
                "/productos/mujer/tops/top-jungle-charcoal4.webp"
            ]
        },
        {
            "name": "Negro",
            "slug": "negro",
            "hex": "#000000",
            "image": "/productos/mujer/tops/top-jungle-negro1.webp",
            "images": [
                "/productos/mujer/tops/top-jungle-negro1.webp",
                "/productos/mujer/tops/top-jungle-negro2.webp",
                "/productos/mujer/tops/top-jungle-negro3.webp",
                "/productos/mujer/tops/top-jungle-negro4.webp"
            ]
        },
        {
            "name": "Rojo",
            "slug": "rojo",
            "hex": "#FF0000",
            "image": "/productos/mujer/tops/top-jungle-rojo1.webp",
            "images": [
                "/productos/mujer/tops/top-jungle-rojo1.webp",
                "/productos/mujer/tops/top-jungle-rojo2.webp",
                "/productos/mujer/tops/top-jungle-rojo3.webp",
                "/productos/mujer/tops/top-jungle-rojo4.webp"
            ]
        }
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
    slug: "top-soporte",
    title: "Top Soporte",
    price: 35,
    image: "/productos/mujer/tops/top-soporte-beige1.webp",
    category: "tops",
    fabric: "algodon",
    colors: [
        {
            "name": "Beige",
            "slug": "beige",
            "hex": "#F5F5DC",
            "image": "/productos/mujer/tops/top-soporte-beige1.webp",
            "images": [
                "/productos/mujer/tops/top-soporte-beige1.webp",
                "/productos/mujer/tops/top-soporte-beige2.webp",
                "/productos/mujer/tops/top-soporte-beige3.webp",
                "/productos/mujer/tops/top-soporte-beige4.webp",
                "/productos/mujer/tops/top-soporte-beige5.webp"
            ]
        },
        {
            "name": "Blanco",
            "slug": "blanco",
            "hex": "#FFFFFF",
            "image": "/productos/mujer/tops/top-soporte-blanco1.webp",
            "images": [
                "/productos/mujer/tops/top-soporte-blanco1.webp",
                "/productos/mujer/tops/top-soporte-blanco2.webp",
                "/productos/mujer/tops/top-soporte-blanco3.webp",
                "/productos/mujer/tops/top-soporte-blanco4.webp",
                "/productos/mujer/tops/top-soporte-blanco5.webp"
            ]
        },
        {
            "name": "Negro",
            "slug": "negro",
            "hex": "#000000",
            "image": "/productos/mujer/tops/top-soporte-negro1.webp",
            "images": [
                "/productos/mujer/tops/top-soporte-negro1.webp",
                "/productos/mujer/tops/top-soporte-negro2.webp",
                "/productos/mujer/tops/top-soporte-negro3.webp",
                "/productos/mujer/tops/top-soporte-negro4.webp"
            ]
        }
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
    image: "/productos/mujer/tops/top-arena-blanco1.webp",
    category: "tops",
    fabric: "algodon",
    colors: [
        {
            "name": "Blanco",
            "slug": "blanco",
            "hex": "#FFFFFF",
            "image": "/productos/mujer/tops/top-arena-blanco1.webp",
            "images": [
                "/productos/mujer/tops/top-arena-blanco1.webp",
                "/productos/mujer/tops/top-arena-blanco2.webp",
                "/productos/mujer/tops/top-arena-blanco3.webp",
                "/productos/mujer/tops/top-arena-blanco4.webp"
            ]
        }
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
    image: "/productos/mujer/tops/top-zafiro-blanco1.webp",
    category: "tops",
    fabric: "algodon",
    colors: [
        {
            "name": "Blanco",
            "slug": "blanco",
            "hex": "#FFFFFF",
            "image": "/productos/mujer/tops/top-zafiro-blanco1.webp",
            "images": [
                "/productos/mujer/tops/top-zafiro-blanco1.webp",
                "/productos/mujer/tops/top-zafiro-blanco2.webp",
                "/productos/mujer/tops/top-zafiro-blanco3.webp",
                "/productos/mujer/tops/top-zafiro-blanco4.webp",
                "/productos/mujer/tops/top-zafiro-blanco5.webp"
            ]
        },
        {
            "name": "Negro",
            "slug": "negro",
            "hex": "#000000",
            "image": "/productos/mujer/tops/top-zafiro-negro1.webp",
            "images": [
                "/productos/mujer/tops/top-zafiro-negro1.webp",
                "/productos/mujer/tops/top-zafiro-negro2.webp",
                "/productos/mujer/tops/top-zafiro-negro3.webp",
                "/productos/mujer/tops/top-zafiro-negro4.webp",
                "/productos/mujer/tops/top-zafiro-negro5.webp"
            ]
        }
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
    slug: "top-luna",
    title: "Top Luna",
    price: 28,
    image: "/productos/mujer/tops/top-luna-beige1.webp",
    category: "tops",
    fabric: "algodon",
    colors: [
        {
            "name": "Beige",
            "slug": "beige",
            "hex": "#F5F5DC",
            "image": "/productos/mujer/tops/top-luna-beige1.webp",
            "images": [
                "/productos/mujer/tops/top-luna-beige1.webp",
                "/productos/mujer/tops/top-luna-beige2.webp",
                "/productos/mujer/tops/top-luna-beige3.webp",
                "/productos/mujer/tops/top-luna-beige4.webp",
                "/productos/mujer/tops/top-luna-beige5.webp"
            ]
        },
        {
            "name": "Blanco",
            "slug": "blanco",
            "hex": "#FFFFFF",
            "image": "/productos/mujer/tops/top-luna-blanco1.webp",
            "images": [
                "/productos/mujer/tops/top-luna-blanco1.webp",
                "/productos/mujer/tops/top-luna-blanco2.webp",
                "/productos/mujer/tops/top-luna-blanco3.webp",
                "/productos/mujer/tops/top-luna-blanco4.webp",
                "/productos/mujer/tops/top-luna-blanco5.webp"
            ]
        },
        {
            "name": "Negro",
            "slug": "negro",
            "hex": "#000000",
            "image": "/productos/mujer/tops/top-luna-negro1.webp",
            "images": [
                "/productos/mujer/tops/top-luna-negro1.webp",
                "/productos/mujer/tops/top-luna-negro2.webp",
                "/productos/mujer/tops/top-luna-negro3.webp",
                "/productos/mujer/tops/top-luna-negro4.webp",
                "/productos/mujer/tops/top-luna-negro5.webp"
            ]
        }
    ],
    sizes: ["S", "M", "L", "XL"],
    audience: "mujer",
    tags: ["Algodón Licrado", "Top Deportivo"],
    attributes: {
      material: "Algodón Licrado",
      detalles: [
        "Copas internas removibles",
        "Diseño deportivo elegante",
        "Algodón licrado premium"
      ],
      beneficios: []
    },
  },

  {
    slug: "top-perla",
    title: "Top Perla",
    price: 27,
    image: "/productos/mujer/tops/top-perla-blanco1.webp",
    category: "tops",
    fabric: "algodon",
    colors: [
        {
            "name": "Blanco",
            "slug": "blanco",
            "hex": "#FFFFFF",
            "image": "/productos/mujer/tops/top-perla-blanco1.webp",
            "images": [
                "/productos/mujer/tops/top-perla-blanco1.webp",
                "/productos/mujer/tops/top-perla-blanco2.webp",
                "/productos/mujer/tops/top-perla-blanco3.webp",
                "/productos/mujer/tops/top-perla-blanco4.webp",
                "/productos/mujer/tops/top-perla-blanco5.webp"
            ]
        }
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
    slug: "enterizo-tiras",
    title: "Enterizo tiras",
    price: 49,
    image: "/productos/mujer/enterizo/enterizo-tiras-suplex-liso-premium-azulino-enterizo-azulino1.webp",
    category: "enterizos",
    fabric: "suplex",
    colors: [
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
    image: "/productos/mujer/enterizo/enterizo-manga-cero-suplex-liso-premium-azulino-Manga-cero-azulino1.webp",
    category: "enterizos",
    fabric: "suplex",
    colors: [
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
    slug: "legging-slim",
    title: "Legging Slim",
    price: 59,
    image: "/productos/mujer/legging/legging-slim-suplex-liso-premium-azul-marino-legging-azul-marino1.webp",
    category: "leggings",
    fabric: "suplex",
    colors: [
      {
        name: "Azul Marino",
        slug: "azul-marino",
        hex: "#1E3A8A",
        images: [
          "/productos/mujer/legging/legging-slim-suplex-liso-premium-azul-marino-legging-azul-marino1.webp",
          "/productos/mujer/legging/legging-slim-suplex-liso-premium-azul-marino-legging-azul-marino2.webp",
          "/productos/mujer/legging/legging-slim-suplex-liso-premium-azul-marino-legging-azul-marino3.webp",
          "/productos/mujer/legging/legging-slim-suplex-liso-premium-azul-marino-legging-azul-marino4.webp"
        ]
      },
      {
        name: "Blanco",
        slug: "blanco",
        hex: "#FFFFFF",
        images: [
          "/productos/mujer/legging/legging-slim-suplex-liso-premium-blanco-legging-slim-blanco1.webp",
          "/productos/mujer/legging/legging-slim-suplex-liso-premium-blanco-legging-slim-blanco2.webp",
          "/productos/mujer/legging/legging-slim-suplex-liso-premium-blanco-legging-slim-blanco3.webp",
          "/productos/mujer/legging/legging-slim-suplex-liso-premium-blanco-legging-slim-blanco4.webp"
        ]
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
    audience: "mujer",
    tags: ["COD.S-1011", "Colección Especial Suplex", "Suplex Liso"],
    attributes: {
        "material": "Suplex Liso",
        "detalles": [
            "Suplex liso",
            "Diseño slim",
            "Alta variedad de colores"
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
    slug: "enterizo-manga-corta-nina",
    title: "Enterizo manga corta Niña",
    price: 38,
    image: "/productos/nina/enterizos/enterizo-manga-corta-nina-amarillo1.webp",
    category: "enterizos",
    fabric: "suplex",
    colors: [
        {
            "name": "Amarillo",
            "slug": "amarillo",
            "hex": "#FFD700",
            "image": "/productos/nina/enterizos/enterizo-manga-corta-nina-amarillo1.webp",
            "images": [
                "/productos/nina/enterizos/enterizo-manga-corta-nina-amarillo1.webp",
                "/productos/nina/enterizos/enterizo-manga-corta-nina-amarillo2.webp",
                "/productos/nina/enterizos/enterizo-manga-corta-nina-amarillo3.webp",
                "/productos/nina/enterizos/enterizo-manga-corta-nina-amarillo4.webp",
                "/productos/nina/enterizos/enterizo-manga-corta-nina-amarillo5.webp",
                "/productos/nina/enterizos/enterizo-manga-corta-nina-amarillo6.webp"
            ]
        },
        {
            "name": "Beige",
            "slug": "beige",
            "hex": "#F5F5DC",
            "image": "/productos/nina/enterizos/enterizo-manga-corta-nina-beige1.webp",
            "images": [
                "/productos/nina/enterizos/enterizo-manga-corta-nina-beige1.webp",
                "/productos/nina/enterizos/enterizo-manga-corta-nina-beige2.webp",
                "/productos/nina/enterizos/enterizo-manga-corta-nina-beige3.webp",
                "/productos/nina/enterizos/enterizo-manga-corta-nina-beige4.webp",
                "/productos/nina/enterizos/enterizo-manga-corta-nina-beige5.webp"
            ]
        },
        {
            "name": "Blanco",
            "slug": "blanco",
            "hex": "#FFFFFF",
            "image": "/productos/nina/enterizos/enterizo-manga-corta-nina-blanco1.webp",
            "images": [
                "/productos/nina/enterizos/enterizo-manga-corta-nina-blanco1.webp",
                "/productos/nina/enterizos/enterizo-manga-corta-nina-blanco2.webp",
                "/productos/nina/enterizos/enterizo-manga-corta-nina-blanco3.webp",
                "/productos/nina/enterizos/enterizo-manga-corta-nina-blanco4.webp",
                "/productos/nina/enterizos/enterizo-manga-corta-nina-blanco5.webp"
            ]
        },
        {
            "name": "Lila",
            "slug": "lila",
            "hex": "#C8A2C8",
            "image": "/productos/nina/enterizos/enterizo-manga-corta-nina-lila1.webp",
            "images": [
                "/productos/nina/enterizos/enterizo-manga-corta-nina-lila1.webp",
                "/productos/nina/enterizos/enterizo-manga-corta-nina-lila2.webp",
                "/productos/nina/enterizos/enterizo-manga-corta-nina-lila3.webp",
                "/productos/nina/enterizos/enterizo-manga-corta-nina-lila4.webp",
                "/productos/nina/enterizos/enterizo-manga-corta-nina-lila5.webp"
            ]
        },
        {
            "name": "Negro",
            "slug": "negro",
            "hex": "#000000",
            "image": "/productos/nina/enterizos/enterizo-manga-corta-nina-negro1.webp",
            "images": [
                "/productos/nina/enterizos/enterizo-manga-corta-nina-negro1.webp",
                "/productos/nina/enterizos/enterizo-manga-corta-nina-negro2.webp",
                "/productos/nina/enterizos/enterizo-manga-corta-nina-negro3.webp",
                "/productos/nina/enterizos/enterizo-manga-corta-nina-negro4.webp",
                "/productos/nina/enterizos/enterizo-manga-corta-nina-negro5.webp"
            ]
        },
        {
            "name": "Rojo",
            "slug": "rojo",
            "hex": "#FF0000",
            "image": "/productos/nina/enterizos/enterizo-manga-corta-nina-rojo1.webp",
            "images": [
                "/productos/nina/enterizos/enterizo-manga-corta-nina-rojo1.webp",
                "/productos/nina/enterizos/enterizo-manga-corta-nina-rojo2.webp",
                "/productos/nina/enterizos/enterizo-manga-corta-nina-rojo3.webp",
                "/productos/nina/enterizos/enterizo-manga-corta-nina-rojo4.webp",
                "/productos/nina/enterizos/enterizo-manga-corta-nina-rojo5.webp"
            ]
        },
        {
            "name": "Rosado",
            "slug": "rosado",
            "hex": "#FFB6C1",
            "image": "/productos/nina/enterizos/enterizo-manga-corta-nina-rosado1.webp",
            "images": [
                "/productos/nina/enterizos/enterizo-manga-corta-nina-rosado1.webp",
                "/productos/nina/enterizos/enterizo-manga-corta-nina-rosado2.webp",
                "/productos/nina/enterizos/enterizo-manga-corta-nina-rosado3.webp",
                "/productos/nina/enterizos/enterizo-manga-corta-nina-rosado4.webp"
            ]
        },
        {
            "name": "Verde",
            "slug": "verde",
            "hex": "#00FF00",
            "image": "/productos/nina/enterizos/enterizo-manga-corta-nina-verde1.webp",
            "images": [
                "/productos/nina/enterizos/enterizo-manga-corta-nina-verde1.webp",
                "/productos/nina/enterizos/enterizo-manga-corta-nina-verde2.webp",
                "/productos/nina/enterizos/enterizo-manga-corta-nina-verde3.webp"
            ]
        }
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
    image: "/productos/nina/enterizos/enterizo-manga-larga-nina-amarillo1.webp",
    category: "enterizos",
    fabric: "suplex",
    colors: [
        {
            "name": "Amarillo",
            "slug": "amarillo",
            "hex": "#FFD700",
            "image": "/productos/nina/enterizos/enterizo-manga-larga-nina-amarillo1.webp",
            "images": [
                "/productos/nina/enterizos/enterizo-manga-larga-nina-amarillo1.webp",
                "/productos/nina/enterizos/enterizo-manga-larga-nina-amarillo2.webp",
                "/productos/nina/enterizos/enterizo-manga-larga-nina-amarillo3.webp",
                "/productos/nina/enterizos/enterizo-manga-larga-nina-amarillo4.webp",
                "/productos/nina/enterizos/enterizo-manga-larga-nina-amarillo5.webp"
            ]
        },
        {
            "name": "Blanco",
            "slug": "blanco",
            "hex": "#FFFFFF",
            "image": "/productos/nina/enterizos/enterizo-manga-larga-nina-blanco1.webp",
            "images": [
                "/productos/nina/enterizos/enterizo-manga-larga-nina-blanco1.webp",
                "/productos/nina/enterizos/enterizo-manga-larga-nina-blanco2.webp",
                "/productos/nina/enterizos/enterizo-manga-larga-nina-blanco3.webp",
                "/productos/nina/enterizos/enterizo-manga-larga-nina-blanco4.webp",
                "/productos/nina/enterizos/enterizo-manga-larga-nina-blanco5.webp"
            ]
        },
        {
            "name": "Negro",
            "slug": "negro",
            "hex": "#000000",
            "image": "/productos/nina/enterizos/enterizo-manga-larga-nina-negro1.webp",
            "images": [
                "/productos/nina/enterizos/enterizo-manga-larga-nina-negro1.webp",
                "/productos/nina/enterizos/enterizo-manga-larga-nina-negro2.webp",
                "/productos/nina/enterizos/enterizo-manga-larga-nina-negro3.webp",
                "/productos/nina/enterizos/enterizo-manga-larga-nina-negro4.webp"
            ]
        },
        {
            "name": "Rojo",
            "slug": "rojo",
            "hex": "#FF0000",
            "image": "/productos/nina/enterizos/enterizo-manga-larga-nina-rojo1.webp",
            "images": [
                "/productos/nina/enterizos/enterizo-manga-larga-nina-rojo1.webp",
                "/productos/nina/enterizos/enterizo-manga-larga-nina-rojo2.webp",
                "/productos/nina/enterizos/enterizo-manga-larga-nina-rojo3.webp",
                "/productos/nina/enterizos/enterizo-manga-larga-nina-rojo4.webp"
            ]
        },
        {
            "name": "Rosado",
            "slug": "rosado",
            "hex": "#FFB6C1",
            "image": "/productos/nina/enterizos/enterizo-manga-larga-nina-rosado1.webp",
            "images": [
                "/productos/nina/enterizos/enterizo-manga-larga-nina-rosado1.webp",
                "/productos/nina/enterizos/enterizo-manga-larga-nina-rosado2.webp",
                "/productos/nina/enterizos/enterizo-manga-larga-nina-rosado3.webp",
                "/productos/nina/enterizos/enterizo-manga-larga-nina-rosado4.webp"
            ]
        }
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
    slug: "legging-nina",
    title: "Legging Niña",
    price: 32,
    image: "/productos/nina/leggings/legging-nina-blanco1.webp",
    category: "leggings",
    fabric: "suplex",
    colors: [
        {
            "name": "Blanco",
            "slug": "blanco",
            "hex": "#FFFFFF",
            "image": "/productos/nina/leggings/legging-nina-blanco1.webp",
            "images": [
                "/productos/nina/leggings/legging-nina-blanco1.webp",
                "/productos/nina/leggings/legging-nina-blanco2.webp",
                "/productos/nina/leggings/legging-nina-blanco3.webp",
                "/productos/nina/leggings/legging-nina-blanco4.webp",
                "/productos/nina/leggings/legging-nina-blanco5.webp"
            ]
        },
        {
            "name": "Negro",
            "slug": "negro",
            "hex": "#000000",
            "image": "/productos/nina/leggings/legging-nina-negro1.webp",
            "images": [
                "/productos/nina/leggings/legging-nina-negro1.webp",
                "/productos/nina/leggings/legging-nina-negro2.webp",
                "/productos/nina/leggings/legging-nina-negro3.webp",
                "/productos/nina/leggings/legging-nina-negro4.webp",
                "/productos/nina/leggings/legging-nina-negro5.webp"
            ]
        },
        {
            "name": "Rojo",
            "slug": "rojo",
            "hex": "#FF0000",
            "image": "/productos/nina/leggings/legging-nina-rojo1.webp",
            "images": [
                "/productos/nina/leggings/legging-nina-rojo1.webp",
                "/productos/nina/leggings/legging-nina-rojo2.webp",
                "/productos/nina/leggings/legging-nina-rojo3.webp",
                "/productos/nina/leggings/legging-nina-rojo4.webp"
            ]
        },
        {
            "name": "Rosado",
            "slug": "rosado",
            "hex": "#FFB6C1",
            "image": "/productos/nina/leggings/legging-nina-rosado1.webp",
            "images": [
                "/productos/nina/leggings/legging-nina-rosado1.webp",
                "/productos/nina/leggings/legging-nina-rosado2.webp",
                "/productos/nina/leggings/legging-nina-rosado3.webp",
                "/productos/nina/leggings/legging-nina-rosado4.webp",
                "/productos/nina/leggings/legging-nina-rosado5.webp"
            ]
        }
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
    slug: "cafarena-nina",
    title: "Cafarena Niña",
    price: 28,
    image: "/productos/nina/cafarenas/cafarena-nina-azulmarino1.webp",
    category: "cafarenas",
    fabric: "suplex",
    colors: [
        {
            "name": "Azul Marino",
            "slug": "azulmarino",
            "hex": "#1B3A6B",
            "image": "/productos/nina/cafarenas/cafarena-nina-azulmarino1.webp",
            "images": [
                "/productos/nina/cafarenas/cafarena-nina-azulmarino1.webp",
                "/productos/nina/cafarenas/cafarena-nina-azulmarino2.webp",
                "/productos/nina/cafarenas/cafarena-nina-azulmarino3.webp",
                "/productos/nina/cafarenas/cafarena-nina-azulmarino4.webp",
                "/productos/nina/cafarenas/cafarena-nina-azulmarino5.webp"
            ]
        },
        {
            "name": "Blanco",
            "slug": "blanco",
            "hex": "#FFFFFF",
            "image": "/productos/nina/cafarenas/cafarena-nina-blanco1.webp",
            "images": [
                "/productos/nina/cafarenas/cafarena-nina-blanco1.webp",
                "/productos/nina/cafarenas/cafarena-nina-blanco2.webp",
                "/productos/nina/cafarenas/cafarena-nina-blanco3.webp",
                "/productos/nina/cafarenas/cafarena-nina-blanco4.webp",
                "/productos/nina/cafarenas/cafarena-nina-blanco5.webp"
            ]
        },
        {
            "name": "Negro",
            "slug": "negro",
            "hex": "#000000",
            "image": "/productos/nina/cafarenas/cafarena-nina-negro1.webp",
            "images": [
                "/productos/nina/cafarenas/cafarena-nina-negro1.webp",
                "/productos/nina/cafarenas/cafarena-nina-negro2.webp",
                "/productos/nina/cafarenas/cafarena-nina-negro3.webp",
                "/productos/nina/cafarenas/cafarena-nina-negro4.webp",
                "/productos/nina/cafarenas/cafarena-nina-negro5.webp"
            ]
        },
        {
            "name": "Rojo",
            "slug": "rojo",
            "hex": "#FF0000",
            "image": "/productos/nina/cafarenas/cafarena-nina-rojo1.webp",
            "images": [
                "/productos/nina/cafarenas/cafarena-nina-rojo1.webp",
                "/productos/nina/cafarenas/cafarena-nina-rojo2.webp",
                "/productos/nina/cafarenas/cafarena-nina-rojo3.webp",
                "/productos/nina/cafarenas/cafarena-nina-rojo4.webp",
                "/productos/nina/cafarenas/cafarena-nina-rojo5.webp"
            ]
        },
        {
            "name": "Rosado",
            "slug": "rosado",
            "hex": "#FFB6C1",
            "image": "/productos/nina/cafarenas/cafarena-nina-rosado1.webp",
            "images": [
                "/productos/nina/cafarenas/cafarena-nina-rosado1.webp",
                "/productos/nina/cafarenas/cafarena-nina-rosado2.webp",
                "/productos/nina/cafarenas/cafarena-nina-rosado3.webp",
                "/productos/nina/cafarenas/cafarena-nina-rosado4.webp"
            ]
        }
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
    image: "/productos/nina/pantys/panty-nina-azulmarino1.webp",
    category: "pantys",
    fabric: "suplex",
    colors: [
        {
            "name": "Azul Marino",
            "slug": "azulmarino",
            "hex": "#1B3A6B",
            "image": "/productos/nina/pantys/panty-nina-azulmarino1.webp",
            "images": [
                "/productos/nina/pantys/panty-nina-azulmarino1.webp",
                "/productos/nina/pantys/panty-nina-azulmarino2.webp",
                "/productos/nina/pantys/panty-nina-azulmarino3.webp",
                "/productos/nina/pantys/panty-nina-azulmarino4.webp",
                "/productos/nina/pantys/panty-nina-azulmarino5.webp"
            ]
        },
        {
            "name": "Blanco",
            "slug": "blanco",
            "hex": "#FFFFFF",
            "image": "/productos/nina/pantys/panty-nina-blanco1.webp",
            "images": [
                "/productos/nina/pantys/panty-nina-blanco1.webp",
                "/productos/nina/pantys/panty-nina-blanco2.webp",
                "/productos/nina/pantys/panty-nina-blanco3.webp",
                "/productos/nina/pantys/panty-nina-blanco4.webp"
            ]
        },
        {
            "name": "Negro",
            "slug": "negro",
            "hex": "#000000",
            "image": "/productos/nina/pantys/panty-nina-negro1.webp",
            "images": [
                "/productos/nina/pantys/panty-nina-negro1.webp",
                "/productos/nina/pantys/panty-nina-negro2.webp",
                "/productos/nina/pantys/panty-nina-negro3.webp",
                "/productos/nina/pantys/panty-nina-negro4.webp"
            ]
        },
        {
            "name": "Rojo",
            "slug": "rojo",
            "hex": "#FF0000",
            "image": "/productos/nina/pantys/panty-nina-rojo1.webp",
            "images": [
                "/productos/nina/pantys/panty-nina-rojo1.webp",
                "/productos/nina/pantys/panty-nina-rojo2.webp",
                "/productos/nina/pantys/panty-nina-rojo3.webp",
                "/productos/nina/pantys/panty-nina-rojo4.webp"
            ]
        },
        {
            "name": "Rosado",
            "slug": "rosado",
            "hex": "#FFB6C1",
            "image": "/productos/nina/pantys/panty-nina-rosado1.webp",
            "images": [
                "/productos/nina/pantys/panty-nina-rosado1.webp",
                "/productos/nina/pantys/panty-nina-rosado2.webp",
                "/productos/nina/pantys/panty-nina-rosado3.webp",
                "/productos/nina/pantys/panty-nina-rosado4.webp"
            ]
        }
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
    image: "/productos/nina/shorts/maxi-short-nina-azulmarino1.webp",
    category: "shorts",
    fabric: "suplex",
    colors: [
        {
            "name": "Azul Marino",
            "slug": "azulmarino",
            "hex": "#1B3A6B",
            "image": "/productos/nina/shorts/maxi-short-nina-azulmarino1.webp",
            "images": [
                "/productos/nina/shorts/maxi-short-nina-azulmarino1.webp",
                "/productos/nina/shorts/maxi-short-nina-azulmarino2.webp",
                "/productos/nina/shorts/maxi-short-nina-azulmarino3.webp",
                "/productos/nina/shorts/maxi-short-nina-azulmarino4.webp",
                "/productos/nina/shorts/maxi-short-nina-azulmarino5.webp"
            ]
        },
        {
            "name": "Blanco",
            "slug": "blanco",
            "hex": "#FFFFFF",
            "image": "/productos/nina/shorts/maxi-short-nina-blanco1.webp",
            "images": [
                "/productos/nina/shorts/maxi-short-nina-blanco1.webp",
                "/productos/nina/shorts/maxi-short-nina-blanco2.webp",
                "/productos/nina/shorts/maxi-short-nina-blanco3.webp",
                "/productos/nina/shorts/maxi-short-nina-blanco4.webp",
                "/productos/nina/shorts/maxi-short-nina-blanco5.webp"
            ]
        },
        {
            "name": "Negro",
            "slug": "negro",
            "hex": "#000000",
            "image": "/productos/nina/shorts/maxi-short-nina-negro1.webp",
            "images": [
                "/productos/nina/shorts/maxi-short-nina-negro1.webp",
                "/productos/nina/shorts/maxi-short-nina-negro2.webp",
                "/productos/nina/shorts/maxi-short-nina-negro3.webp",
                "/productos/nina/shorts/maxi-short-nina-negro4.webp"
            ]
        },
        {
            "name": "Rojo",
            "slug": "rojo",
            "hex": "#FF0000",
            "image": "/productos/nina/shorts/maxi-short-nina-rojo1.webp",
            "images": [
                "/productos/nina/shorts/maxi-short-nina-rojo1.webp",
                "/productos/nina/shorts/maxi-short-nina-rojo2.webp",
                "/productos/nina/shorts/maxi-short-nina-rojo3.webp",
                "/productos/nina/shorts/maxi-short-nina-rojo4.webp",
                "/productos/nina/shorts/maxi-short-nina-rojo5.webp"
            ]
        }
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
    image: "/productos/nina/shorts/short-juvenil-nina-azulmarino1.webp",
    category: "shorts",
    fabric: "suplex",
    colors: [
        {
            "name": "Azul Marino",
            "slug": "azulmarino",
            "hex": "#1B3A6B",
            "image": "/productos/nina/shorts/short-juvenil-nina-azulmarino1.webp",
            "images": [
                "/productos/nina/shorts/short-juvenil-nina-azulmarino1.webp",
                "/productos/nina/shorts/short-juvenil-nina-azulmarino2.webp",
                "/productos/nina/shorts/short-juvenil-nina-azulmarino3.webp",
                "/productos/nina/shorts/short-juvenil-nina-azulmarino4.webp",
                "/productos/nina/shorts/short-juvenil-nina-azulmarino5.webp"
            ]
        },
        {
            "name": "Blanco",
            "slug": "blanco",
            "hex": "#FFFFFF",
            "image": "/productos/nina/shorts/short-juvenil-nina-blanco1.webp",
            "images": [
                "/productos/nina/shorts/short-juvenil-nina-blanco1.webp",
                "/productos/nina/shorts/short-juvenil-nina-blanco2.webp",
                "/productos/nina/shorts/short-juvenil-nina-blanco3.webp",
                "/productos/nina/shorts/short-juvenil-nina-blanco4.webp",
                "/productos/nina/shorts/short-juvenil-nina-blanco5.webp"
            ]
        },
        {
            "name": "Negro",
            "slug": "negro",
            "hex": "#000000",
            "image": "/productos/nina/shorts/short-juvenil-nina-negro1.webp",
            "images": [
                "/productos/nina/shorts/short-juvenil-nina-negro1.webp",
                "/productos/nina/shorts/short-juvenil-nina-negro2.webp",
                "/productos/nina/shorts/short-juvenil-nina-negro3.webp",
                "/productos/nina/shorts/short-juvenil-nina-negro4.webp"
            ]
        },
        {
            "name": "Rojo",
            "slug": "rojo",
            "hex": "#FF0000",
            "image": "/productos/nina/shorts/short-juvenil-nina-rojo1.webp",
            "images": [
                "/productos/nina/shorts/short-juvenil-nina-rojo1.webp",
                "/productos/nina/shorts/short-juvenil-nina-rojo2.webp",
                "/productos/nina/shorts/short-juvenil-nina-rojo3.webp",
                "/productos/nina/shorts/short-juvenil-nina-rojo4.webp",
                "/productos/nina/shorts/short-juvenil-nina-rojo5.webp"
            ]
        }
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
    image: "/productos/nina/tops/top-jazmin-beige1.webp",
    category: "tops",
    fabric: "algodon",
    colors: [
        {
            "name": "Beige",
            "slug": "beige",
            "hex": "#F5F5DC",
            "image": "/productos/nina/tops/top-jazmin-beige1.webp",
            "images": [
                "/productos/nina/tops/top-jazmin-beige1.webp",
                "/productos/nina/tops/top-jazmin-beige2.webp",
                "/productos/nina/tops/top-jazmin-beige3.webp",
                "/productos/nina/tops/top-jazmin-beige4.webp",
                "/productos/nina/tops/top-jazmin-beige5.webp"
            ]
        },
        {
            "name": "Blanco",
            "slug": "blanco",
            "hex": "#FFFFFF",
            "image": "/productos/nina/tops/top-jazmin-blanco1.webp",
            "images": [
                "/productos/nina/tops/top-jazmin-blanco1.webp",
                "/productos/nina/tops/top-jazmin-blanco2.webp",
                "/productos/nina/tops/top-jazmin-blanco3.webp",
                "/productos/nina/tops/top-jazmin-blanco4.webp"
            ]
        },
        {
            "name": "Negro",
            "slug": "negro",
            "hex": "#000000",
            "image": "/productos/nina/tops/top-jazmin-negro1.webp",
            "images": [
                "/productos/nina/tops/top-jazmin-negro1.webp",
                "/productos/nina/tops/top-jazmin-negro2.webp",
                "/productos/nina/tops/top-jazmin-negro3.webp",
                "/productos/nina/tops/top-jazmin-negro4.webp"
            ]
        }
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
    image: "/productos/nina/tops/top-margarita-beige1.webp",
    category: "tops",
    fabric: "algodon",
    colors: [
        {
            "name": "Beige",
            "slug": "beige",
            "hex": "#F5F5DC",
            "image": "/productos/nina/tops/top-margarita-beige1.webp",
            "images": [
                "/productos/nina/tops/top-margarita-beige1.webp",
                "/productos/nina/tops/top-margarita-beige2.webp",
                "/productos/nina/tops/top-margarita-beige3.webp",
                "/productos/nina/tops/top-margarita-beige4.webp",
                "/productos/nina/tops/top-margarita-beige5.webp",
                "/productos/nina/tops/top-margarita-beige6.webp"
            ]
        },
        {
            "name": "Blanco",
            "slug": "blanco",
            "hex": "#FFFFFF",
            "image": "/productos/nina/tops/top-margarita-blanco1.webp",
            "images": [
                "/productos/nina/tops/top-margarita-blanco1.webp",
                "/productos/nina/tops/top-margarita-blanco2.webp",
                "/productos/nina/tops/top-margarita-blanco3.webp",
                "/productos/nina/tops/top-margarita-blanco4.webp",
                "/productos/nina/tops/top-margarita-blanco5.webp"
            ]
        },
        {
            "name": "Negro",
            "slug": "negro",
            "hex": "#000000",
            "image": "/productos/nina/tops/top-margarita-negro1.webp",
            "images": [
                "/productos/nina/tops/top-margarita-negro1.webp",
                "/productos/nina/tops/top-margarita-negro2.webp",
                "/productos/nina/tops/top-margarita-negro3.webp",
                "/productos/nina/tops/top-margarita-negro4.webp",
                "/productos/nina/tops/top-margarita-negro5.webp"
            ]
        }
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
    image: "/productos/nina/tops/top-vani-blanco1.webp",
    category: "tops",
    fabric: "algodon",
    colors: [
        {
            "name": "Blanco",
            "slug": "blanco",
            "hex": "#FFFFFF",
            "image": "/productos/nina/tops/top-vani-blanco1.webp",
            "images": [
                "/productos/nina/tops/top-vani-blanco1.webp",
                "/productos/nina/tops/top-vani-blanco2.webp",
                "/productos/nina/tops/top-vani-blanco3.webp",
                "/productos/nina/tops/top-vani-blanco4.webp"
            ]
        },
        {
            "name": "Negro",
            "slug": "negro",
            "hex": "#000000",
            "image": "/productos/nina/tops/top-vani-negro1.webp",
            "images": [
                "/productos/nina/tops/top-vani-negro1.webp",
                "/productos/nina/tops/top-vani-negro2.webp",
                "/productos/nina/tops/top-vani-negro3.webp",
                "/productos/nina/tops/top-vani-negro4.webp"
            ]
        },
        {
            "name": "Rojo",
            "slug": "rojo",
            "hex": "#FF0000",
            "image": "/productos/nina/tops/top-vani-rojo1.webp",
            "images": [
                "/productos/nina/tops/top-vani-rojo1.webp",
                "/productos/nina/tops/top-vani-rojo2.webp",
                "/productos/nina/tops/top-vani-rojo3.webp",
                "/productos/nina/tops/top-vani-rojo4.webp",
                "/productos/nina/tops/top-vani-rojo5.webp"
            ]
        }
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

]

export const findProduct = (slug: string) => products.filter(p => p && p.slug).find((p) => p.slug === slug)
export const byCategory = (c: Product["category"]) => products.filter((p) => p && p.category === c)
export const byFabric = (f: Product["fabric"]) => products.filter((p) => p && p.fabric === f)
export const byAudience = (a: Product["audience"]) => products.filter((p) => p && p.audience === a)

// ✨ NUEVAS FUNCIONES HELPER PARA FILTROS DINÁMICOS
export function getUniqueColors(): string[] {
  const colorsSet = new Set<string>()
  products.filter(p => p && p.colors).forEach(product => {
    product.colors.forEach(colorObj => {
      const colorName = typeof colorObj === 'string' ? colorObj : colorObj.name
      colorsSet.add(colorName)
    })
  })
  return Array.from(colorsSet).sort()
}

export function getAllCollections(): Array<{ name: string; slug: string; count: number }> {
  const collectionsMap = new Map<string, number>()

  products.filter(p => p && p.tags).forEach(product => {
    if (product.tags) {
      product.tags.forEach(tag => {
        // Filtrar solo tags que parecen colecciones (excluir COD.XXX)
        if (!tag.startsWith('COD.') && tag.length > 3) {
          const current = collectionsMap.get(tag) || 0
          collectionsMap.set(tag, current + 1)
        }
      })
    }
  })

  return Array.from(collectionsMap.entries())
    .map(([name, count]) => ({
      name,
      slug: name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, ''),
      count
    }))
    .sort((a, b) => b.count - a.count) // Ordenar por popularidad
}

export function getUniqueFabrics(): Array<{ name: string; slug: string; count: number }> {
  const fabricsMap = new Map<string, number>()

  products.filter(p => p && p.fabric).forEach(product => {
    const fabric = product.fabric
    const current = fabricsMap.get(fabric) || 0
    fabricsMap.set(fabric, current + 1)
  })

  return Array.from(fabricsMap.entries())
    .map(([name, count]) => ({
      name,
      slug: name.toLowerCase().replace(/\s+/g, '-'),
      count
    }))
    .sort((a, b) => a.name.localeCompare(b.name))
}