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
  inventory?: number // ← AGREGAR ESTA LÍNEA
}

export const products: Product[] = [
  // CAMISETAS (algodón)
  {
    slug: "camiseta-cuello-alto",
    title: "Camiseta cuello alto",
    price: 45,
    image: "/productos/mujer/camisetas/camiseta-cuello-alto.webp",
    category: "camisetas",
    fabric: "algodon",
    colors: ["Negro", "Gris", "Blanco", "Rojo"],
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
    slug: "camiseta-manga-larga",
    title: "Camiseta manga larga",
    price: 43,
    image: "/productos/mujer/camisetas/camiseta-manga-larga.webp",
    category: "camisetas",
    fabric: "algodon",
    colors: ["Rojo", "Negro", "Gris", "Blanco"],
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
    image: "/productos/mujer/camisetas/camiseta-manga-corta.webp",
    category: "camisetas",
    fabric: "algodon",
    colors: ["Gris", "Negro", "Blanco"],
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
    image: "/productos/mujer/camisetas/camiseta-tropical.webp",
    category: "camisetas",
    fabric: "algodon",
    colors: ["Blanco", "Negro"],
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
    colors: ["Rojo", "Negro"],
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
    image: "/productos/mujer/camisetas/camiseta-gia.webp",
    category: "camisetas",
    fabric: "algodon",
    colors: ["Negro", "Blanco"],
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
    colors: ["Negro", "Blanco", "Gris"],
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
    image: "/productos/mujer/short/short-slim.webp",
    category: "bikers",
    fabric: "suplex",
    colors: ["Gris", "Negro", "Rojo"],
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
    colors: ["Negro", "Gris"],
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
    colors: ["Rojo", "Negro", "Gris"],
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
    image: "/productos/mujer/short/short-brasil.webp",
    category: "shorts",
    fabric: "suplex",
    colors: ["Blanco", "Negro"],
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
    image: "/productos/mujer/short/maxi-short.webp",
    category: "shorts",
    fabric: "suplex",
    colors: ["Blanco", "Negro"],
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
    colors: ["Blanco", "Negro"],
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
    image: "/productos/mujer/short/mini-short.webp",
    category: "shorts",
    fabric: "suplex",
    colors: ["Blanco", "Negro"],
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
    image: "/productos/mujer/bodys/body-manga-corta-suplex.webp",
    category: "bodys",
    fabric: "suplex",
    colors: ["Gris", "Negro", "Rojo"],
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
    image: "/productos/mujer/bodys/body-manga-corta.webp",
    category: "bodys",
    fabric: "algodon",
    colors: ["Rojo", "Negro"],
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
    slug: "body-manga-larga",
    title: "Body manga larga",
    price: 43,
    image: "/productos/mujer/bodys/body-manga-larga.webp",
    category: "bodys",
    fabric: "algodon",
    colors: ["Negro", "Rojo"],
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

  // TOPS (algodón por defecto)
  {
    slug: "top-afrodita",
    title: "Top Afrodita",
    price: 38,
    image: "/productos/mujer/tops/top-afrodita.webp",
    category: "tops",
    fabric: "algodon",
    colors: ["Azul", "Negro", "Rojo"],
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
    colors: ["Negro", "Gris"],
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
    colors: ["Rojo", "Negro"],
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
    image: "/productos/mujer/tops/top-paradise.webp",
    category: "tops",
    fabric: "algodon",
    colors: ["Rojo", "Negro"],
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
    colors: ["Gris", "Negro"],
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
    colors: ["Negro"],
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
    colors: ["Blanco", "Negro"],
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
    colors: ["Gris", "Blanco"],
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
    colors: ["Blanco"],
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
    colors: ["Blanco"],
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
    colors: ["Blanco"],
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
    colors: ["Blanco", "Negro"],
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
    colors: ["Blanco"],
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
    colors: ["Blanco"],
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
    colors: ["Negro", "Rojo"],
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
    colors: ["Beige", "Negro"],
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
    colors: ["Negro", "Blanco"],
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
        name: "Azulino",
        slug: "azulino",
        hex: "#3A53A4",
        image: "/productos/mujer/enterizo/enterizo-tiras-azulino.webp",
      },
      {
        name: "Charcol",
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
        name: "Azulino",
        slug: "azulino",
        hex: "#3A53A4",
        image: "/productos/mujer/enterizo/enterizo-manga-cero-azulino.webp",
      },
      {
        name: "Charcol",
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
    colors: ["Rosa", "Negro", "Azul"],
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
    colors: ["Rosa", "Negro", "Morado"],
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
    colors: ["Negro", "Gris", "Azul"],
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
    image: "/productos/mujer/legging/legging-slim.webp",
    category: "leggings",
    fabric: "suplex",
    colors: ["Negro", "Gris", "Rojo"],
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
    colors: ["Negro", "Gris"],
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
    image: "/productos/mujer/legging/legging-harmony.webp",
    category: "leggings",
    fabric: "suplex",
    colors: ["Negro", "Gris", "Azul"],
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
    colors: ["Negro", "Gris"],
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
    image: "/productos/mujer/legging/legging-clasica.webp",
    category: "leggings",
    fabric: "suplex",
    colors: ["Negro", "Gris", "Azul"],
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
    colors: ["Negro", "Gris"],
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
    colors: ["Negro", "Rosa", "Azul"],
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
    image: "/productos/mujer/pescador/pescador-realce.webp",
    category: "pescador",
    fabric: "suplex",
    colors: [
      {
        name: "Azulino",
        slug: "azulino",
        hex: "#2563EB",
        image: "/productos/mujer/pescador/pescador-realce-azulino.webp",
      },
      {
        name: "Charcol",
        slug: "charcol",
        hex: "#374151",
        image: "/productos/mujer/pescador/pescador-realce-charcol.webp",
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
        hex: "#DC2626",
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
    image: "/productos/mujer/pescador/pescador-dynamic.webp",
    category: "pescador",
    fabric: "suplex",
    colors: [
      {
        name: "Azulino",
        slug: "azulino",
        hex: "#2563EB",
        image: "/productos/mujer/pescador/pescador-dynamic-azulino.webp",
      },
      {
        name: "Charcol",
        slug: "charcol",
        hex: "#374151",
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
        hex: "#DC2626",
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
    image: "/productos/mujer/torero/torero-energy.webp",
    category: "torero",
    fabric: "suplex",
    colors: [
      {
        name: "Azulino",
        slug: "azulino",
        hex: "#2563EB",
        image: "/productos/mujer/torero/torero-energy-azulino.webp",
      },
      {
        name: "Charcol",
        slug: "charcol",
        hex: "#374151",
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
        hex: "#DC2626",
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
    colors: ["Rosa", "Azul", "Negro"],
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
    colors: ["Rosa", "Negro", "Blanco"],
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
    colors: ["Rosa", "Negro", "Blanco"],
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
    colors: ["Rosa", "Negro", "Azul"],
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
    colors: ["Rosa", "Blanco", "Negro"],
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
    colors: ["Rosa", "Blanco", "Azul"],
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
    colors: ["Morado", "Rosa", "Blanco"],
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
    colors: ["Rosa", "Blanco", "Negro"],
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
    colors: ["Rosa", "Blanco", "Azul"],
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
