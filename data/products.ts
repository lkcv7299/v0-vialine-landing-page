export type Product = {
  slug: string
  title: string
  price: number
  image: string // path under /public/productos/<category>/<slug>.jpg
  category: "leggings" | "bikers" | "shorts" | "tops" | "bodys" | "camisetas" | "enterizos" | "pescador" | "torero"
  fabric: "suplex" | "algodon"
  colors: string[] | { name: string; slug: string; hex: string; image: string }[] // Support both formats
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
  // CAMISETAS (algodón)
  {
    slug: "camiseta-cuello-alto",
    title: "Camiseta cuello alto",
    price: 45,
    image: "/productos/mujer/camisetas/camiseta-cuello-alto-azul-marino-cuello-alto-azulmarino1.webp",
    category: "camisetas",
    fabric: "algodon",
    colors: [
      {
        name: "Azul Marino",
        slug: "azulmarino",
        hex: "#1E3A8A",
        image: "/productos/mujer/camisetas/camiseta-cuello-alto-azul-marino-cuello-alto-azulmarino1.webp",
      },
      {
        name: "Beige",
        slug: "beige",
        hex: "#F5F5DC",
        image: "/productos/mujer/camisetas/camiseta-cuello-alto-beige-cuello-alto-beige1.webp",
      },
      {
        name: "Blanco",
        slug: "blanco",
        hex: "#FFFFFF",
        image: "/productos/mujer/camisetas/camiseta-cuello-alto-blanco-cuello-alto-blanco1.webp",
      },
      {
        name: "Negro",
        slug: "negro",
        hex: "#000000",
        image: "/productos/mujer/camisetas/camiseta-cuello-alto-negro-cuello-alto-negro1.webp",
      },
      {
        name: "Rojo",
        slug: "rojo",
        hex: "#D22B2B",
        image: "/productos/mujer/camisetas/camiseta-cuello-alto-rojo-cuello-alto-rojo1.webp",
      },
      {
        name: "Turquesa",
        slug: "tuquesa",
        hex: "#40E0D0",
        image: "/productos/mujer/camisetas/camiseta-cuello-alto-turquesa-cuello-alto-tuquesa4.webp",
      },
      {
        name: "Turquesa",
        slug: "turquesa",
        hex: "#40E0D0",
        image: "/productos/mujer/camisetas/camiseta-cuello-alto-turquesa-cuello-alto-turquesa.webp",
      },
      {
        name: "Verde Petróleo",
        slug: "petroleo",
        hex: "#00534E",
        image: "/productos/mujer/camisetas/camiseta-cuello-alto-verde-petroleo-cuello-alto-petroleo1.webp",
      },
      {
        name: "Vino",
        slug: "vino",
        hex: "#722F37",
        image: "/productos/mujer/camisetas/camiseta-cuello-alto-vino-cuello-alto-vino1.webp",
      },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    audience: "mujer",
    badge: "nuevo",
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
    slug: "camiseta-manga-larga",
    title: "Camiseta manga larga",
    price: 43,
    image: "/productos/mujer/camisetas/camiseta-manga-larga-azul-marino-manga-larga-azul-marino2.webp",
    category: "camisetas",
    fabric: "algodon",
    colors: [
      {
        name: "Azul",
        slug: "azul",
        hex: "#1E3A8A",
        image: "/productos/mujer/camisetas/camiseta-manga-larga-azul-marino-manga-larga-azul-marino2.webp",
      },
      {
        name: "Azul Marino",
        slug: "azul-marino",
        hex: "#1E3A8A",
        image: "/productos/mujer/camisetas/camiseta-manga-larga-azul-marino-manga-larga-zul-marino1.webp",
      },
      {
        name: "Beige",
        slug: "beige",
        hex: "#F5F5DC",
        image: "/productos/mujer/camisetas/camiseta-manga-larga-beige-manga-larga-beige1.webp",
      },
      {
        name: "Blanco",
        slug: "blanco",
        hex: "#FFFFFF",
        image: "/productos/mujer/camisetas/camiseta-manga-larga-blanco-manga-larga-blanco1.webp",
      },
      {
        name: "Negro",
        slug: "negro",
        hex: "#000000",
        image: "/productos/mujer/camisetas/camiseta-manga-larga-negro-manga-larga-negro1.webp",
      },
      {
        name: "Rojo",
        slug: "rojo",
        hex: "#D22B2B",
        image: "/productos/mujer/camisetas/camiseta-manga-larga-rojo-manga-larga-rojo1.webp",
      },
      {
        name: "Turquesa",
        slug: "tuqrquesa",
        hex: "#40E0D0",
        image: "/productos/mujer/camisetas/camiseta-manga-larga-turquesa-manga-larga-tuqrquesa4.webp",
      },
      {
        name: "Turquesa",
        slug: "turquesa",
        hex: "#40E0D0",
        image: "/productos/mujer/camisetas/camiseta-manga-larga-turquesa-manga-larga-turquesa1.webp",
      },
      {
        name: "Vino",
        slug: "vino",
        hex: "#722F37",
        image: "/productos/mujer/camisetas/camiseta-manga-larga-vino-manga-larga-vino1.webp",
      },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    audience: "mujer",
    inventory: 0,
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
    slug: "camiseta-manga-corta",
    title: "Camiseta manga corta",
    price: 34,
    image: "/productos/mujer/camisetas/camiseta-manga-corta-azul-marino-camiseta-azulmarino1.webp",
    category: "camisetas",
    fabric: "algodon",
    colors: [
      {
        name: "Azul Marino",
        slug: "azulmarino",
        hex: "#1E3A8A",
        image: "/productos/mujer/camisetas/camiseta-manga-corta-azul-marino-camiseta-azulmarino1.webp",
      },
      {
        name: "Beige",
        slug: "beige",
        hex: "#F5F5DC",
        image: "/productos/mujer/camisetas/camiseta-manga-corta-beige-camiseta-beige1.webp",
      },
      {
        name: "Blanco",
        slug: "blanco",
        hex: "#FFFFFF",
        image: "/productos/mujer/camisetas/camiseta-manga-corta-blanco-camiseta-blanco1.webp",
      },
      {
        name: "Negro",
        slug: "negro",
        hex: "#000000",
        image: "/productos/mujer/camisetas/camiseta-manga-corta-negro-camiseta-negro1.webp",
      },
      {
        name: "Rojo",
        slug: "rojo",
        hex: "#D22B2B",
        image: "/productos/mujer/camisetas/camiseta-manga-corta-rojo-camiseta-rojo1.webp",
      },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    audience: "mujer",
    inventory: 3,
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
    slug: "camiseta-tropical",
    title: "Camiseta tropical",
    price: 25,
    originalPrice: 35,
    badge: "oferta",
    image: "/productos/mujer/camisetas/camiseta-tropical.webp",
    category: "camisetas",
    fabric: "algodon",
    colors: [
      {
        name: "Camiseta",
        slug: "camiseta",
        hex: "#CCCCCC",
        image: "/productos/mujer/camisetas/camiseta-tropical.webp",
      },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    audience: "mujer",
    inventory: 10,
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
    slug: "camiseta-deportiva",
    title: "Camiseta deportiva",
    price: 29,
    image: "/productos/mujer/camisetas/camiseta-deportiva.webp",
    category: "camisetas",
    fabric: "algodon",
    colors: [
      {
        name: "Camiseta",
        slug: "camiseta",
        hex: "#CCCCCC",
        image: "/productos/mujer/camisetas/camiseta-deportiva.webp",
      },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    audience: "mujer",
    inventory: 12,
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
        image: "/productos/mujer/camisetas/camiseta-gia-blanco-camiseta-gia-blanco1.webp",
      },
      {
        name: "Negro",
        slug: "negro",
        hex: "#000000",
        image: "/productos/mujer/camisetas/camiseta-gia-negro-camiseta-gia-negro1.webp",
      },
      {
        name: "Vino",
        slug: "vino",
        hex: "#722F37",
        image: "/productos/mujer/camisetas/camiseta-gia-vino-camiseta-gia-vino1.webp",
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
    price: 35,
    image: "/productos/mujer/camisetas/camiseta-tiras-fijas.webp",
    category: "camisetas",
    fabric: "algodon",
    colors: [
      {
        name: "Camiseta",
        slug: "camiseta",
        hex: "#CCCCCC",
        image: "/productos/mujer/camisetas/camiseta-tiras-fijas.webp",
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

  // LÍNEA SUPLEX (bikers/shorts/leggings => suplex)
  {
    slug: "short-slim",
    title: "Short Slim",
    price: 34,
    image: "/productos/mujer/short/short-slim-suplex-liso-premium-acero-short-slim-acero1.webp",
    category: "bikers",
    fabric: "suplex",
    colors: [
      {
        name: "Acero",
        slug: "acero",
        hex: "#808080",
        image: "/productos/mujer/short/short-slim-suplex-liso-premium-acero-short-slim-acero1.webp",
      },
      {
        name: "Azulino",
        slug: "azulino",
        hex: "#3A53A4",
        image: "/productos/mujer/short/short-slim-suplex-liso-premium-azulino-short-slim-azulino1.webp",
      },
      {
        name: "Blanco",
        slug: "blanco",
        hex: "#FFFFFF",
        image: "/productos/mujer/short/short-slim-suplex-liso-premium-blanco-short-slim-blanco1.webp",
      },
      {
        name: "Negro",
        slug: "negro",
        hex: "#000000",
        image: "/productos/mujer/short/short-slim-suplex-liso-premium-negro-short-slim-negro1.webp",
      },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    audience: "mujer",
    attributes: {
  material: "Suplex liso",
  detalles: [
    "Pretina elástica confortable",
    "Ajuste perfecto sin marcar",
    "Largo ideal"
  ],
  beneficios: [
    "Máxima libertad de movimiento",
    "Secado rápido y transpirable",
    "Ideal para entrenamientos intensos"
  ]
},
  },
  {
    slug: "short-ciclista-active",
    title: "Short ciclista Active",
    price: 38,
    image: "/productos/mujer/short/short-ciclista-active.webp",
    category: "bikers",
    fabric: "suplex",
    colors: [
      {
        name: "Short",
        slug: "short",
        hex: "#CCCCCC",
        image: "/productos/mujer/short/short-ciclista-active.webp",
      },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    audience: "mujer",
    attributes: {
  material: "Suplex liso",
  detalles: [
    "Pretina elástica confortable",
    "Ajuste perfecto sin marcar",
    "Largo ideal"
  ],
  beneficios: [
    "Máxima libertad de movimiento",
    "Secado rápido y transpirable",
    "Ideal para entrenamientos intensos"
  ]
},
  },
  {
    slug: "short-lux",
    title: "Short Lux",
    price: 33,
    image: "/productos/mujer/short/short-lux.webp",
    category: "bikers",
    fabric: "suplex",
    colors: [
      {
        name: "Short",
        slug: "short",
        hex: "#CCCCCC",
        image: "/productos/mujer/short/short-lux.webp",
      },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    audience: "mujer",
    attributes: {
  material: "Suplex liso",
  detalles: [
    "Pretina elástica confortable",
    "Ajuste perfecto sin marcar",
    "Largo ideal"
  ],
  beneficios: [
    "Máxima libertad de movimiento",
    "Secado rápido y transpirable",
    "Ideal para entrenamientos intensos"
  ]
},
  },
  {
    slug: "short-brasil",
    title: "Short Brasil",
    price: 24,
    image: "/productos/mujer/short/short-brasil-beige-short-brasil-beige1.webp",
    category: "shorts",
    fabric: "suplex",
    colors: [
      {
        name: "Beige",
        slug: "beige",
        hex: "#F5F5DC",
        image: "/productos/mujer/short/short-brasil-beige-short-brasil-beige1.webp",
      },
      {
        name: "Blanco",
        slug: "blanco",
        hex: "#FFFFFF",
        image: "/productos/mujer/short/short-brasil-blanco-short-brasil-blanco1.webp",
      },
      {
        name: "Negro",
        slug: "negro",
        hex: "#000000",
        image: "/productos/mujer/short/short-brasil-negro-short-brasil-negro1.webp",
      },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    audience: "mujer",
    attributes: {
  material: "Suplex liso",
  detalles: [
    "Pretina elástica confortable",
    "Ajuste perfecto sin marcar",
    "Largo ideal"
  ],
  beneficios: [
    "Máxima libertad de movimiento",
    "Secado rápido y transpirable",
    "Ideal para entrenamientos intensos"
  ]
},
  },
  {
    slug: "maxi-short",
    title: "Maxi Short",
    price: 23,
    image: "/productos/mujer/short/maxi-short-beige-MAXI-SHORT-BEIGE1.webp",
    category: "shorts",
    fabric: "suplex",
    colors: [
      {
        name: "Beige",
        slug: "beige",
        hex: "#F5F5DC",
        image: "/productos/mujer/short/maxi-short-beige-MAXI-SHORT-BEIGE1.webp",
      },
      {
        name: "Blanco",
        slug: "blanco",
        hex: "#FFFFFF",
        image: "/productos/mujer/short/maxi-short-blanco-MAXI-SHORT-BLANCO.webp",
      },
      {
        name: "Negro",
        slug: "negro",
        hex: "#000000",
        image: "/productos/mujer/short/maxi-short-negro-MAXI-SHORT-NEGRO1.webp",
      },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    audience: "mujer",
    attributes: {
  material: "Suplex liso",
  detalles: [
    "Pretina elástica confortable",
    "Ajuste perfecto sin marcar",
    "Largo ideal"
  ],
  beneficios: [
    "Máxima libertad de movimiento",
    "Secado rápido y transpirable",
    "Ideal para entrenamientos intensos"
  ]
},
  },
  {
    slug: "short-clasico",
    title: "Short clásico",
    price: 19,
    image: "/productos/mujer/short/short-clasico.webp",
    category: "shorts",
    fabric: "suplex",
    colors: [
      {
        name: "Short",
        slug: "short",
        hex: "#CCCCCC",
        image: "/productos/mujer/short/short-clasico.webp",
      },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    audience: "mujer",
    attributes: {
  material: "Suplex liso",
  detalles: [
    "Pretina elástica confortable",
    "Ajuste perfecto sin marcar",
    "Largo ideal"
  ],
  beneficios: [
    "Máxima libertad de movimiento",
    "Secado rápido y transpirable",
    "Ideal para entrenamientos intensos"
  ]
},
  },
  {
    slug: "mini-short",
    title: "Mini Short",
    price: 19,
    image: "/productos/mujer/short/mini-short-beige-mini-short-beige1.webp",
    category: "shorts",
    fabric: "suplex",
    colors: [
      {
        name: "Beige",
        slug: "beige",
        hex: "#F5F5DC",
        image: "/productos/mujer/short/mini-short-beige-mini-short-beige1.webp",
      },
      {
        name: "Blanco",
        slug: "blanco",
        hex: "#FFFFFF",
        image: "/productos/mujer/short/mini-short-blanco-mini-short-blanco1.webp",
      },
      {
        name: "Negro",
        slug: "negro",
        hex: "#000000",
        image: "/productos/mujer/short/mini-short-negro-mini-short-negro.webp",
      },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    audience: "mujer",
    attributes: {
  material: "Suplex liso",
  detalles: [
    "Pretina elástica confortable",
    "Ajuste perfecto sin marcar",
    "Largo ideal"
  ],
  beneficios: [
    "Máxima libertad de movimiento",
    "Secado rápido y transpirable",
    "Ideal para entrenamientos intensos"
  ]
},
  },

  // BODYS (mixto)
  {
    slug: "body-manga-corta-suplex",
    title: "Body manga corta suplex",
    price: 43,
    image: "/productos/mujer/bodys/body-manga-corta-suplex-azul-marino.webp",
    category: "bodys",
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
        image: "/productos/mujer/bodys/body-manga-corta-suplex-liso-premium-azul-marino-body-mc-azulmarino-suplex-1.webp",
      },
      {
        name: "Negro",
        slug: "negro",
        hex: "#000000",
        image: "/productos/mujer/bodys/body-manga-corta-suplex-liso-premium-negro-Body-mc-negro1.webp",
      },
      {
        name: "Rojo",
        slug: "rojo",
        hex: "#D22B2B",
        image: "/productos/mujer/bodys/body-manga-corta-suplex-liso-premium-rojo-body-rojo-suplex-4.webp",
      },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    audience: "mujer",
    attributes: {
  material: "Suplex liso",
  detalles: [
    "Ajuste ceñido que define la silueta",
    "Diseño ergonómico",
    "Cierre práctico"
  ],
  beneficios: [
    "Versatilidad para entrenar o uso casual",
    "No se sale ni se sube",
    "Define tu figura con comodidad"
  ]
},
  },
  {
    slug: "body-manga-corta",
    title: "Body manga corta",
    price: 40,
    image: "/productos/mujer/bodys/body-manga-corta-amarillo.webp",
    category: "bodys",
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
        image: "/productos/mujer/bodys/body-manga-corta-beige-manga-corta-beige-5.webp",
      },
      {
        name: "Blanco",
        slug: "blanco",
        hex: "#FFFFFF",
        image: "/productos/mujer/bodys/body-manga-corta-blanco-manga-corta-blanco1.webp",
      },
      {
        name: "Negro",
        slug: "negro",
        hex: "#000000",
        image: "/productos/mujer/bodys/body-manga-corta-negro-manga-corta-negro1.webp",
      },
      {
        name: "Rojo",
        slug: "rojo",
        hex: "#D22B2B",
        image: "/productos/mujer/bodys/body-manga-corta-rojo-manga-corta-rojo1.webp",
      },
      {
        name: "Rosado",
        slug: "rosado",
        hex: "#FFC0CB",
        image: "/productos/mujer/bodys/body-manga-corta-rosado-body-mc-rosado1.webp",
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
        image: "/productos/mujer/bodys/body-manga-corta-suplex-liso-premium-azul-marino-body-mc-azulmarino-suplex-1.webp",
      },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    audience: "mujer",
    attributes: {
  material: "Algodón Premium",
  detalles: [
    "Ajuste ceñido que define la silueta",
    "Diseño ergonómico",
    "Cierre práctico"
  ],
  beneficios: [
    "Versatilidad para entrenar o uso casual",
    "No se sale ni se sube",
    "Define tu figura con comodidad"
  ]
},
  },
  {
    slug: "body-manga-larga",
    title: "Body manga larga",
    price: 43,
    image: "/productos/mujer/bodys/body-manga-larga-beige-manga-larga-beige1.webp",
    category: "bodys",
    fabric: "algodon",
    colors: [
      {
        name: "Beige",
        slug: "beige",
        hex: "#F5F5DC",
        image: "/productos/mujer/bodys/body-manga-larga-beige-manga-larga-beige1.webp",
      },
      {
        name: "Blanco",
        slug: "blanco",
        hex: "#FFFFFF",
        image: "/productos/mujer/bodys/body-manga-larga-blanco-Body-manga-larga-blanco-1.webp",
      },
      {
        name: "Negro",
        slug: "negro",
        hex: "#000000",
        image: "/productos/mujer/bodys/body-manga-larga-negro-body-ml-negro1.webp",
      },
      {
        name: "Rojo",
        slug: "rojo",
        hex: "#D22B2B",
        image: "/productos/mujer/bodys/body-manga-larga-rojo-body-ml-rojo1.webp",
      },
      {
        name: "Rosado",
        slug: "rosado",
        hex: "#FFC0CB",
        image: "/productos/mujer/bodys/body-manga-larga-rosado-body-ml-rosado1.webp",
      },
      {
        name: "Azul",
        slug: "azul",
        hex: "#1E3A8A",
        image: "/productos/mujer/bodys/body-manga-larga-suplex-liso-premium-azul-marino-body-manga-larga-suplex-azulmarino1.webp",
      },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    audience: "mujer",
    attributes: {
  material: "Algodón Premium",
  detalles: [
    "Ajuste ceñido que define la silueta",
    "Diseño ergonómico",
    "Cierre práctico"
  ],
  beneficios: [
    "Versatilidad para entrenar o uso casual",
    "No se sale ni se sube",
    "Define tu figura con comodidad"
  ]
},
  },

  // TOPS (algodón por defecto)
  {
    slug: "top-afrodita",
    title: "Top Afrodita",
    price: 38,
    image: "/productos/mujer/tops/top-afrodita-suplex-liso-premium-azulino-afrodita-azulino1.webp",
    category: "tops",
    fabric: "algodon",
    colors: [
      {
        name: "Azulino",
        slug: "azulino",
        hex: "#3A53A4",
        image: "/productos/mujer/tops/top-afrodita-suplex-liso-premium-azulino-afrodita-azulino1.webp",
      },
      {
        name: "Negro",
        slug: "negro",
        hex: "#000000",
        image: "/productos/mujer/tops/top-afrodita-suplex-liso-premium-negro-afrodita-negro1.webp",
      },
      {
        name: "Rojo",
        slug: "rojo",
        hex: "#D22B2B",
        image: "/productos/mujer/tops/top-afrodita-suplex-liso-premium-rojo-afrodita-rojo1.webp",
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
    slug: "top-venus",
    title: "Top Venus",
    price: 38,
    image: "/productos/mujer/tops/top-venus.webp",
    category: "tops",
    fabric: "algodon",
    colors: [
      {
        name: "Top",
        slug: "top",
        hex: "#CCCCCC",
        image: "/productos/mujer/tops/top-venus.webp",
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
    slug: "top-minerva",
    title: "Top Minerva",
    price: 38,
    image: "/productos/mujer/tops/top-minerva.webp",
    category: "tops",
    fabric: "algodon",
    colors: [
      {
        name: "Top",
        slug: "top",
        hex: "#CCCCCC",
        image: "/productos/mujer/tops/top-minerva.webp",
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
    slug: "top-paradise",
    title: "Top Paradise",
    price: 38,
    image: "/productos/mujer/tops/top-paradise-suplex-liso-premium-azulino-paradise-azulino1.webp",
    category: "tops",
    fabric: "algodon",
    colors: [
      {
        name: "Azulino",
        slug: "azulino",
        hex: "#3A53A4",
        image: "/productos/mujer/tops/top-paradise-suplex-liso-premium-azulino-paradise-azulino1.webp",
      },
      {
        name: "Blanco",
        slug: "blanco",
        hex: "#FFFFFF",
        image: "/productos/mujer/tops/top-paradise-suplex-liso-premium-blanco-paradise-blanco1.webp",
      },
      {
        name: "Charcoal",
        slug: "charcoal",
        hex: "#5A5A5A",
        image: "/productos/mujer/tops/top-paradise-suplex-liso-premium-charcoal-paradise-charcoal1.webp",
      },
      {
        name: "Negro",
        slug: "negro",
        hex: "#000000",
        image: "/productos/mujer/tops/top-paradise-suplex-liso-premium-negro-paradise-negro1.webp",
      },
      {
        name: "Rojo",
        slug: "rojo",
        hex: "#D22B2B",
        image: "/productos/mujer/tops/top-paradise-suplex-liso-premium-rojo-paradise-rojo1.webp",
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
    slug: "top-jungle",
    title: "Top Jungle",
    price: 38,
    image: "/productos/mujer/tops/top-jungle.webp",
    category: "tops",
    fabric: "algodon",
    colors: [
      {
        name: "Top",
        slug: "top",
        hex: "#CCCCCC",
        image: "/productos/mujer/tops/top-jungle.webp",
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
    slug: "top-astrid",
    title: "Top Astrid",
    price: 38,
    image: "/productos/mujer/tops/top-astrid.webp",
    category: "tops",
    fabric: "algodon",
    colors: [
      {
        name: "Top",
        slug: "top",
        hex: "#CCCCCC",
        image: "/productos/mujer/tops/top-astrid.webp",
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
    slug: "top-soporte",
    title: "Top Soporte",
    price: 35,
    image: "/productos/mujer/tops/top-soporte.webp",
    category: "tops",
    fabric: "algodon",
    colors: [
      {
        name: "Top",
        slug: "top",
        hex: "#CCCCCC",
        image: "/productos/mujer/tops/top-soporte.webp",
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
    image: "/productos/mujer/tops/top-arena.webp",
    category: "tops",
    fabric: "algodon",
    colors: [
      {
        name: "Top",
        slug: "top",
        hex: "#CCCCCC",
        image: "/productos/mujer/tops/top-arena.webp",
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
    image: "/productos/mujer/tops/top-zafiro.webp",
    category: "tops",
    fabric: "algodon",
    colors: [
      {
        name: "Top",
        slug: "top",
        hex: "#CCCCCC",
        image: "/productos/mujer/tops/top-zafiro.webp",
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
    image: "/productos/mujer/tops/top-urban.webp",
    category: "tops",
    fabric: "algodon",
    colors: [
      {
        name: "Top",
        slug: "top",
        hex: "#CCCCCC",
        image: "/productos/mujer/tops/top-urban.webp",
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
    image: "/productos/mujer/tops/top-perla.webp",
    category: "tops",
    fabric: "algodon",
    colors: [
      {
        name: "Top",
        slug: "top",
        hex: "#CCCCCC",
        image: "/productos/mujer/tops/top-perla.webp",
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
    price: 27,
    image: "/productos/mujer/tops/straple-chanel.webp",
    category: "tops",
    fabric: "algodon",
    colors: [
      {
        name: "Straple",
        slug: "straple",
        hex: "#CCCCCC",
        image: "/productos/mujer/tops/straple-chanel.webp",
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
    slug: "top-deportivo",
    title: "Top Deportivo",
    price: 17,
    image: "/productos/mujer/tops/top-deportivo.webp",
    category: "tops",
    fabric: "algodon",
    colors: [
      {
        name: "Top",
        slug: "top",
        hex: "#CCCCCC",
        image: "/productos/mujer/tops/top-deportivo.webp",
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
    slug: "top-tira-fijas",
    title: "Top tira fijas",
    price: 17,
    image: "/productos/mujer/tops/top-tira-fijas.webp",
    category: "tops",
    fabric: "algodon",
    colors: [
      {
        name: "Top",
        slug: "top",
        hex: "#CCCCCC",
        image: "/productos/mujer/tops/top-tira-fijas.webp",
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
    slug: "top-athena",
    title: "Top Athena",
    price: 34,
    image: "/productos/mujer/tops/top-athena.webp",
    category: "tops",
    fabric: "algodon",
    colors: [
      {
        name: "Top",
        slug: "top",
        hex: "#CCCCCC",
        image: "/productos/mujer/tops/top-athena.webp",
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
    slug: "top-jolie",
    title: "Top Jolie",
    price: 34,
    image: "/productos/mujer/tops/top-jolie.webp",
    category: "tops",
    fabric: "algodon",
    colors: [
      {
        name: "Top",
        slug: "top",
        hex: "#CCCCCC",
        image: "/productos/mujer/tops/top-jolie.webp",
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
    slug: "top-brigid",
    title: "Top Brigid",
    price: 34,
    image: "/productos/mujer/tops/top-brigid.webp",
    category: "tops",
    fabric: "algodon",
    colors: [
      {
        name: "Top",
        slug: "top",
        hex: "#CCCCCC",
        image: "/productos/mujer/tops/top-brigid.webp",
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

  // ENTERIZOS (suplex)
  {
    slug: "enterizo-tiras",
    title: "Enterizo tiras",
    price: 59,
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
        image: "/productos/mujer/enterizo/enterizo-tiras-suplex-liso-premium-azulino-enterizo-azulino1.webp",
      },
      {
        name: "Blanco",
        slug: "blanco",
        hex: "#FFFFFF",
        image: "/productos/mujer/enterizo/enterizo-tiras-suplex-liso-premium-blanco-enterizo-blanco1.webp",
      },
      {
        name: "Charcoal",
        slug: "charcoal",
        hex: "#5A5A5A",
        image: "/productos/mujer/enterizo/enterizo-tiras-suplex-liso-premium-charcoal-enterizo-charcoal1.webp",
      },
    ],
    sizes: ["S", "M", "L"],
    audience: "mujer",
    tags: ["enterizo", "enterizo tiras", "enterizos", "enterizos dama", "línea suplex dama", "dama", "damas", "tiras"],
    attributes: {
      material: "Suplex liso",
      detalles: ["Tiras delgadas", "Costura plana para más comodidad"],
      beneficios: [
        "De alta elongación, se puede estirar sin perder su forma",
        "Es resistente, liviana y de secado rápido",
        "Se adapta al cuerpo como una segunda piel, te mantiene fresca en todo momento",
        "Versatilidad; perfecto para actividades deportivas o para combinarlo con chaquetas o poleras para un look más casual",
      ],
    },
  },
  {
    slug: "enterizo-manga-cero",
    title: "Enterizo manga cero",
    price: 59,
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
        image: "/productos/mujer/enterizo/enterizo-manga-cero-suplex-liso-premium-azulino-Manga-cero-azulino1.webp",
      },
      {
        name: "Blanco",
        slug: "blanco",
        hex: "#FFFFFF",
        image: "/productos/mujer/enterizo/enterizo-manga-cero-suplex-liso-premium-blanco-manga-cero-blanco1.webp",
      },
    ],
    sizes: ["S", "M", "L"],
    audience: "mujer",
    tags: ["enterizo", "enterizo manga cero", "enterizos", "enterizos dama", "línea suplex dama", "dama", "damas"],
    attributes: {
      material: "Suplex liso",
      detalles: ["Tiras anchas", "Espalda olímpica", "Costura plana para más comodidad"],
      beneficios: [
        "De alta elongación, se puede estirar sin perder su forma",
        "Es resistente, liviana y de secado rápido",
        "Se adapta al cuerpo como una segunda piel, te mantiene fresca en todo momento",
        "Versatilidad; perfecto para actividades deportivas o para combinarlo con chaquetas o poleras para un look más casual",
      ],
    },
  },
  {
    slug: "enterizo-manga-corta-nina",
    title: "Enterizo manga corta Niña",
    price: 38,
    image: "/productos/nina/enterizos/enterizo-manga-corta-nina.webp",
    category: "enterizos",
    fabric: "suplex",
    colors: [
      {
        name: "Enterizo",
        slug: "enterizo",
        hex: "#CCCCCC",
        image: "/productos/nina/enterizos/enterizo-manga-corta-nina.webp",
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
    image: "/productos/nina/enterizos/enterizo-manga-larga-nina.webp",
    category: "enterizos",
    fabric: "suplex",
    colors: [
      {
        name: "Enterizo",
        slug: "enterizo",
        hex: "#CCCCCC",
        image: "/productos/nina/enterizos/enterizo-manga-larga-nina.webp",
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

  // LEGGINGS (suplex)
  {
    slug: "legging-slim-suplex-perchado",
    title: "Legging Slim Suplex Perchado",
    price: 42,
    image: "/productos/mujer/legging/legging-slim-suplex-perchado.webp",
    category: "leggings",
    fabric: "suplex",
    colors: [
      {
        name: "Legging",
        slug: "legging",
        hex: "#CCCCCC",
        image: "/productos/mujer/legging/legging-slim-suplex-perchado.webp",
      },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    audience: "mujer",
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
    slug: "legging-slim",
    title: "Legging Slim",
    price: 38,
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
        image: "/productos/mujer/legging/legging-slim-blanco.webp",
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
        image: "/productos/mujer/legging/legging-slim-suplex-liso-premium-acero-legging-slim-acero1.webp",
      },
      {
        name: "Aqua",
        slug: "aqua",
        hex: "#00FFFF",
        image: "/productos/mujer/legging/legging-slim-suplex-liso-premium-aqua-legging-slim-aqua1.webp",
      },
      {
        name: "Azulino",
        slug: "azulino",
        hex: "#3A53A4",
        image: "/productos/mujer/legging/legging-slim-suplex-liso-premium-azulino-legging-slim-azulino-1.webp",
      },
      {
        name: "Camel",
        slug: "camel",
        hex: "#C19A6B",
        image: "/productos/mujer/legging/legging-slim-suplex-liso-premium-camel-legging-slim-camel1.webp",
      },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    audience: "mujer",
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
    slug: "legging-functional",
    title: "Legging Functional",
    price: 40,
    image: "/productos/mujer/legging/legging-functional.webp",
    category: "leggings",
    fabric: "suplex",
    colors: [
      {
        name: "Legging",
        slug: "legging",
        hex: "#CCCCCC",
        image: "/productos/mujer/legging/legging-functional.webp",
      },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    audience: "mujer",
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
    slug: "legging-harmony",
    title: "Legging Harmony",
    price: 40,
    image: "/productos/mujer/legging/legging-harmony-azulino.webp",
    category: "leggings",
    fabric: "suplex",
    colors: [
      {
        name: "Azul",
        slug: "azul",
        hex: "#1E3A8A",
        image: "/productos/mujer/legging/legging-harmony-azulino.webp",
      },
      {
        name: "Charcoal",
        slug: "charcol",
        hex: "#5A5A5A",
        image: "/productos/mujer/legging/legging-harmony-charcol.webp",
      },
      {
        name: "Negro",
        slug: "negro",
        hex: "#000000",
        image: "/productos/mujer/legging/legging-harmony-negro.webp",
      },
      {
        name: "Rojo",
        slug: "rojo",
        hex: "#D22B2B",
        image: "/productos/mujer/legging/legging-harmony-rojo.webp",
      },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    audience: "mujer",
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
    slug: "legging-realce-fresh-terry",
    title: "Legging Realce Fresh Terry",
    price: 45,
    image: "/productos/mujer/legging/legging-realce-fresh-terry.webp",
    category: "leggings",
    fabric: "suplex",
    colors: [
      {
        name: "Legging",
        slug: "legging",
        hex: "#CCCCCC",
        image: "/productos/mujer/legging/legging-realce-fresh-terry.webp",
      },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    audience: "mujer",
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
    slug: "legging-clasica",
    title: "Legging Clásica",
    price: 36,
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
        image: "/productos/mujer/legging/legging-clasica-gamusa-blanco.webp",
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
        image: "/productos/mujer/legging/legging-clasica-gamusa-negro.webp",
      },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    audience: "mujer",
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
    slug: "legging-clasica-gamuza",
    title: "Legging Clásica Gamuza",
    price: 38,
    image: "/productos/mujer/legging/legging-clasica-gamuza.webp",
    category: "leggings",
    fabric: "suplex",
    colors: [
      {
        name: "Legging",
        slug: "legging",
        hex: "#CCCCCC",
        image: "/productos/mujer/legging/legging-clasica-gamuza.webp",
      },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    audience: "mujer",
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
    slug: "legging-nina",
    title: "Legging Niña",
    price: 32,
    image: "/productos/nina/leggins/legging-nina.webp",
    category: "leggings",
    fabric: "suplex",
    colors: [
      {
        name: "Legging",
        slug: "legging",
        hex: "#CCCCCC",
        image: "/productos/nina/leggins/legging-nina.webp",
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

  // PESCADOR (suplex)
  {
    slug: "pescador-realce",
    title: "Pescador realce",
    price: 46,
    image: "/productos/mujer/pescador/pescador-realce-azulino.webp",
    category: "pescador",
    fabric: "suplex",
    colors: [
      {
        name: "Azul",
        slug: "azul",
        hex: "#1E3A8A",
        image: "/productos/mujer/pescador/pescador-realce-azulino.webp",
      },
      {
        name: "Negro",
        slug: "negro",
        hex: "#000000",
        image: "/productos/mujer/pescador/pescador-realce-negro.webp",
      },
      {
        name: "Rojo",
        slug: "rojo",
        hex: "#D22B2B",
        image: "/productos/mujer/pescador/pescador-realce-rojo.webp",
      },
    ],
    sizes: ["S", "M", "L", "XL"],
    audience: "mujer",
    tags: ["dama", "damas", "pescador", "pescador realce", "Línea suplex dama"],
    attributes: {
      material: "Suplex liso",
      detalles: ["Pretina ancha para mejor compresión en el abdomen", "Ajuste ideal", "Realce en la parte trasera"],
      beneficios: [
        "Se adapta al cuerpo como una segunda piel",
        "Reduce la vibración muscular en tus rutinas",
        "Te mantiene fresca y seca durante el entrenamiento",
      ],
    },
  },
  {
    slug: "pescador-dynamic",
    title: "Pescador dynamic",
    price: 46,
    image: "/productos/mujer/pescador/pescador-dynamic-azulino.webp",
    category: "pescador",
    fabric: "suplex",
    colors: [
      {
        name: "Azul",
        slug: "azul",
        hex: "#1E3A8A",
        image: "/productos/mujer/pescador/pescador-dynamic-azulino.webp",
      },
      {
        name: "Charcoal",
        slug: "charcol",
        hex: "#5A5A5A",
        image: "/productos/mujer/pescador/pescador-dynamic-charcol.webp",
      },
      {
        name: "Negro",
        slug: "negro",
        hex: "#000000",
        image: "/productos/mujer/pescador/pescador-dynamic-negro.webp",
      },
      {
        name: "Rojo",
        slug: "rojo",
        hex: "#D22B2B",
        image: "/productos/mujer/pescador/pescador-dynamic-rojo.webp",
      },
    ],
    sizes: ["S", "M", "L"],
    audience: "mujer",
    tags: ["dama", "damas", "pescador", "pescador dynamic", "Línea suplex dama"],
    attributes: {
      material: "Suplex liso",
      detalles: [
        "Pretina tipo faja",
        "Refuerzo trasero",
        "Corte ajustado para mantener todo en su lugar",
        "Resistente",
      ],
      beneficios: [
        "Alta elongación y elasticidad",
        "Se adapta como una segunda piel",
        "Te mantiene fresca y seca durante el entrenamiento",
      ],
    },
  },

  // TORERO (suplex)
  {
    slug: "torero-energy",
    title: "Torero energy",
    price: 43,
    image: "/productos/mujer/torero/torero-energy-azulino.webp",
    category: "torero",
    fabric: "suplex",
    colors: [
      {
        name: "Azul",
        slug: "azul",
        hex: "#1E3A8A",
        image: "/productos/mujer/torero/torero-energy-azulino.webp",
      },
      {
        name: "Charcoal",
        slug: "charcol",
        hex: "#5A5A5A",
        image: "/productos/mujer/torero/torero-energy-charcol.webp",
      },
      {
        name: "Negro",
        slug: "negro",
        hex: "#000000",
        image: "/productos/mujer/torero/torero-energy-negro.webp",
      },
      {
        name: "Rojo",
        slug: "rojo",
        hex: "#D22B2B",
        image: "/productos/mujer/torero/torero-energy-rojo.webp",
      },
    ],
    sizes: ["S", "M", "L"],
    audience: "mujer",
    tags: ["dama", "damas", "torero", "energy", "Línea suplex dama", "torero energy"],
    attributes: {
      material: "Suplex liso",
      detalles: ["Pretina tipo faja", "Ajuste trasero", "Corte ajustado para mantener todo en su lugar"],
      beneficios: ["Se adapta al cuerpo como una segunda piel", "Te mantiene fresca y seca durante el entrenamiento"],
    },
  },

  // PRODUCTOS DE NIÑA
  {
    slug: "cafarena-nina",
    title: "Cafarena Niña",
    price: 28,
    image: "/productos/nina/cafarenas/cafarena-nina.webp",
    category: "shorts",
    fabric: "suplex",
    colors: [
      {
        name: "Cafarena",
        slug: "cafarena",
        hex: "#CCCCCC",
        image: "/productos/nina/cafarenas/cafarena-nina.webp",
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
    image: "/productos/nina/pantys/panty-nina.webp",
    category: "shorts",
    fabric: "suplex",
    colors: [
      {
        name: "Panty",
        slug: "panty",
        hex: "#CCCCCC",
        image: "/productos/nina/pantys/panty-nina.webp",
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
    image: "/productos/nina/shorts/maxi-short-nina.webp",
    category: "shorts",
    fabric: "suplex",
    colors: [
      {
        name: "Maxi",
        slug: "maxi",
        hex: "#CCCCCC",
        image: "/productos/nina/shorts/maxi-short-nina.webp",
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
    image: "/productos/nina/shorts/short-juvenil-nina.webp",
    category: "shorts",
    fabric: "suplex",
    colors: [
      {
        name: "Short",
        slug: "short",
        hex: "#CCCCCC",
        image: "/productos/nina/shorts/short-juvenil-nina.webp",
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
    image: "/productos/nina/tops/top-jazmin.webp",
    category: "tops",
    fabric: "algodon",
    colors: [
      {
        name: "Top",
        slug: "top",
        hex: "#CCCCCC",
        image: "/productos/nina/tops/top-jazmin.webp",
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
    image: "/productos/nina/tops/top-margarita.webp",
    category: "tops",
    fabric: "algodon",
    colors: [
      {
        name: "Top",
        slug: "top",
        hex: "#CCCCCC",
        image: "/productos/nina/tops/top-margarita.webp",
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
    image: "/productos/nina/tops/top-orquidea.webp",
    category: "tops",
    fabric: "algodon",
    colors: [
      {
        name: "Top",
        slug: "top",
        hex: "#CCCCCC",
        image: "/productos/nina/tops/top-orquidea.webp",
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
    image: "/productos/nina/tops/top-tulipan.webp",
    category: "tops",
    fabric: "algodon",
    colors: [
      {
        name: "Top",
        slug: "top",
        hex: "#CCCCCC",
        image: "/productos/nina/tops/top-tulipan.webp",
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
    image: "/productos/nina/tops/top-vani.webp",
    category: "tops",
    fabric: "algodon",
    colors: [
      {
        name: "Top",
        slug: "top",
        hex: "#CCCCCC",
        image: "/productos/nina/tops/top-vani.webp",
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

export const findProduct = (slug: string) => products.find((p) => p.slug === slug)
export const byCategory = (c: Product["category"]) => products.filter((p) => p.category === c)
export const byFabric = (f: Product["fabric"]) => products.filter((p) => p.fabric === f)
export const byAudience = (a: Product["audience"]) => products.filter((p) => p.audience === a)
