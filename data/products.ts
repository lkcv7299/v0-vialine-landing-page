export type Product = {
  slug: string
  title: string
  price: number // PEN
  image: string // path under /public/productos/<category>/<slug>.jpg
  category: "leggings" | "bikers" | "shorts" | "tops" | "bodys" | "camisetas" | "enterizos"
  fabric: "suplex" | "algodon"
  colors: string[]
  sizes: string[]
  audience: "mujer" | "nina"
}

export const products: Product[] = [
  // CAMISETAS (algodón)
  {
    slug: "camiseta-cuello-alto",
    title: "Camiseta cuello alto",
    price: 45,
    image: "/productos/camisetas/camiseta-cuello-alto.jpg",
    category: "camisetas",
    fabric: "algodon",
    colors: ["Negro", "Gris", "Blanco", "Rojo"],
    sizes: ["XS", "S", "M", "L", "XL"],
    audience: "mujer", // added audience
  },
  {
    slug: "camiseta-manga-larga",
    title: "Camiseta manga larga",
    price: 43,
    image: "/productos/camisetas/camiseta-manga-larga.jpg",
    category: "camisetas",
    fabric: "algodon",
    colors: ["Rojo", "Negro", "Gris", "Blanco"],
    sizes: ["XS", "S", "M", "L", "XL"],
    audience: "mujer", // added audience
  },
  {
    slug: "camiseta-manga-corta",
    title: "Camiseta manga corta",
    price: 34,
    image: "/productos/camisetas/camiseta-manga-corta.jpg",
    category: "camisetas",
    fabric: "algodon",
    colors: ["Gris", "Negro", "Blanco"],
    sizes: ["XS", "S", "M", "L", "XL"],
    audience: "mujer", // added audience
  },
  {
    slug: "camiseta-tropical",
    title: "Camiseta tropical",
    price: 25,
    image: "/productos/camisetas/camiseta-tropical.jpg",
    category: "camisetas",
    fabric: "algodon",
    colors: ["Blanco", "Negro"],
    sizes: ["XS", "S", "M", "L", "XL"],
    audience: "mujer", // added audience
  },
  {
    slug: "camiseta-deportiva",
    title: "Camiseta deportiva",
    price: 29,
    image: "/productos/camisetas/camiseta-deportiva.jpg",
    category: "camisetas",
    fabric: "algodon",
    colors: ["Rojo", "Negro"],
    sizes: ["XS", "S", "M", "L", "XL"],
    audience: "mujer", // added audience
  },
  {
    slug: "camiseta-gia",
    title: "Camiseta Gia",
    price: 27,
    image: "/productos/camisetas/camiseta-gia.jpg",
    category: "camisetas",
    fabric: "algodon",
    colors: ["Negro", "Blanco"],
    sizes: ["XS", "S", "M", "L", "XL"],
    audience: "mujer", // added audience
  },

  // LÍNEA SUPLEX (bikers/shorts/leggings => suplex)
  {
    slug: "short-slim",
    title: "Short Slim",
    price: 34,
    image: "/productos/bikers/short-slim.jpg",
    category: "bikers",
    fabric: "suplex",
    colors: ["Gris", "Negro", "Rojo"],
    sizes: ["XS", "S", "M", "L", "XL"],
    audience: "mujer", // added audience
  },
  {
    slug: "short-ciclista-active",
    title: "Short ciclista Active",
    price: 38,
    image: "/productos/bikers/short-ciclista-active.jpg",
    category: "bikers",
    fabric: "suplex",
    colors: ["Negro", "Gris"],
    sizes: ["XS", "S", "M", "L", "XL"],
    audience: "mujer", // added audience
  },
  {
    slug: "short-lux",
    title: "Short Lux",
    price: 33,
    image: "/productos/bikers/short-lux.jpg",
    category: "bikers",
    fabric: "suplex",
    colors: ["Rojo", "Negro", "Gris"],
    sizes: ["XS", "S", "M", "L", "XL"],
    audience: "mujer", // added audience
  },
  {
    slug: "short-brasil",
    title: "Short Brasil",
    price: 24,
    image: "/productos/shorts/short-brasil.jpg",
    category: "shorts",
    fabric: "suplex",
    colors: ["Blanco", "Negro"],
    sizes: ["XS", "S", "M", "L", "XL"],
    audience: "mujer", // added audience
  },
  {
    slug: "maxi-short",
    title: "Maxi Short",
    price: 23,
    image: "/productos/shorts/maxi-short.jpg",
    category: "shorts",
    fabric: "suplex",
    colors: ["Blanco", "Negro"],
    sizes: ["XS", "S", "M", "L", "XL"],
    audience: "mujer", // added audience
  },
  {
    slug: "short-clasico",
    title: "Short clásico",
    price: 19,
    image: "/productos/shorts/short-clasico.jpg",
    category: "shorts",
    fabric: "suplex",
    colors: ["Blanco", "Negro"],
    sizes: ["XS", "S", "M", "L", "XL"],
    audience: "mujer", // added audience
  },
  {
    slug: "mini-short",
    title: "Mini Short",
    price: 19,
    image: "/productos/shorts/mini-short.jpg",
    category: "shorts",
    fabric: "suplex",
    colors: ["Blanco", "Negro"],
    sizes: ["XS", "S", "M", "L", "XL"],
    audience: "mujer", // added audience
  },

  // BODYS (mixto)
  {
    slug: "body-manga-corta-suplex",
    title: "Body manga corta suplex",
    price: 43,
    image: "/productos/bodys/body-manga-corta-suplex.jpg",
    category: "bodys",
    fabric: "suplex",
    colors: ["Gris", "Negro", "Rojo"],
    sizes: ["XS", "S", "M", "L", "XL"],
    audience: "mujer", // added audience
  },
  {
    slug: "body-manga-corta",
    title: "Body manga corta",
    price: 40,
    image: "/productos/bodys/body-manga-corta.jpg",
    category: "bodys",
    fabric: "algodon",
    colors: ["Rojo", "Negro"],
    sizes: ["XS", "S", "M", "L", "XL"],
    audience: "mujer", // added audience
  },
  {
    slug: "body-manga-larga",
    title: "Body manga larga",
    price: 43,
    image: "/productos/bodys/body-manga-larga.jpg",
    category: "bodys",
    fabric: "algodon",
    colors: ["Negro", "Rojo"],
    sizes: ["XS", "S", "M", "L", "XL"],
    audience: "mujer", // added audience
  },

  // TOPS (algodón por defecto)
  {
    slug: "top-afrodita",
    title: "Top Afrodita",
    price: 38,
    image: "/productos/tops/top-afrodita.jpg",
    category: "tops",
    fabric: "algodon",
    colors: ["Azul", "Negro", "Rojo"],
    sizes: ["XS", "S", "M", "L", "XL"],
    audience: "mujer", // added audience
  },
  {
    slug: "top-venus",
    title: "Top Venus",
    price: 38,
    image: "/productos/tops/top-venus.jpg",
    category: "tops",
    fabric: "algodon",
    colors: ["Negro", "Gris"],
    sizes: ["XS", "S", "M", "L", "XL"],
    audience: "mujer", // added audience
  },
  {
    slug: "top-minerva",
    title: "Top Minerva",
    price: 38,
    image: "/productos/tops/top-minerva.jpg",
    category: "tops",
    fabric: "algodon",
    colors: ["Rojo", "Negro"],
    sizes: ["XS", "S", "M", "L", "XL"],
    audience: "mujer", // added audience
  },
  {
    slug: "top-paradise",
    title: "Top Paradise",
    price: 38,
    image: "/productos/tops/top-paradise.jpg",
    category: "tops",
    fabric: "algodon",
    colors: ["Rojo", "Negro"],
    sizes: ["XS", "S", "M", "L", "XL"],
    audience: "mujer", // added audience
  },
  {
    slug: "top-jungle",
    title: "Top Jungle",
    price: 38,
    image: "/productos/tops/top-jungle.jpg",
    category: "tops",
    fabric: "algodon",
    colors: ["Gris", "Negro"],
    sizes: ["XS", "S", "M", "L", "XL"],
    audience: "mujer", // added audience
  },
  {
    slug: "top-astrid",
    title: "Top Astrid",
    price: 38,
    image: "/productos/tops/top-astrid.jpg",
    category: "tops",
    fabric: "algodon",
    colors: ["Negro"],
    sizes: ["XS", "S", "M", "L", "XL"],
    audience: "mujer", // added audience
  },
  {
    slug: "top-soporte",
    title: "Top Soporte",
    price: 35,
    image: "/productos/tops/top-soporte.jpg",
    category: "tops",
    fabric: "algodon",
    colors: ["Blanco", "Negro"],
    sizes: ["XS", "S", "M", "L", "XL"],
    audience: "mujer", // added audience
  },
  {
    slug: "top-arena",
    title: "Top Arena",
    price: 34,
    image: "/productos/tops/top-arena.jpg",
    category: "tops",
    fabric: "algodon",
    colors: ["Gris", "Blanco"],
    sizes: ["XS", "S", "M", "L", "XL"],
    audience: "mujer", // added audience
  },
  {
    slug: "top-zafiro",
    title: "Top Zafiro",
    price: 34,
    image: "/productos/tops/top-zafiro.jpg",
    category: "tops",
    fabric: "algodon",
    colors: ["Blanco"],
    sizes: ["XS", "S", "M", "L", "XL"],
    audience: "mujer", // added audience
  },
  {
    slug: "top-urban",
    title: "Top Urban",
    price: 34,
    image: "/productos/tops/top-urban.jpg",
    category: "tops",
    fabric: "algodon",
    colors: ["Blanco"],
    sizes: ["XS", "S", "M", "L", "XL"],
    audience: "mujer", // added audience
  },
  {
    slug: "top-perla",
    title: "Top Perla",
    price: 27,
    image: "/productos/tops/top-perla.jpg",
    category: "tops",
    fabric: "algodon",
    colors: ["Blanco"],
    sizes: ["XS", "S", "M", "L", "XL"],
    audience: "mujer", // added audience
  },
  {
    slug: "straple-chanel",
    title: "Straple Chanel",
    price: 27,
    image: "/productos/tops/straple-chanel.jpg",
    category: "tops",
    fabric: "algodon",
    colors: ["Blanco", "Negro"],
    sizes: ["XS", "S", "M", "L", "XL"],
    audience: "mujer", // added audience
  },
  {
    slug: "top-deportivo",
    title: "Top Deportivo",
    price: 17,
    image: "/productos/tops/top-deportivo.jpg",
    category: "tops",
    fabric: "algodon",
    colors: ["Blanco"],
    sizes: ["XS", "S", "M", "L", "XL"],
    audience: "mujer", // added audience
  },
  {
    slug: "top-tira-fijas",
    title: "Top tira fijas",
    price: 17,
    image: "/productos/tops/top-tira-fijas.jpg",
    category: "tops",
    fabric: "algodon",
    colors: ["Blanco"],
    sizes: ["XS", "S", "M", "L", "XL"],
    audience: "mujer", // added audience
  },
  {
    slug: "top-athena",
    title: "Top Athena",
    price: 34,
    image: "/productos/tops/top-athena.jpg",
    category: "tops",
    fabric: "algodon",
    colors: ["Negro", "Rojo"],
    sizes: ["XS", "S", "M", "L", "XL"],
    audience: "mujer", // added audience
  },
  {
    slug: "top-jolie",
    title: "Top Jolie",
    price: 34,
    image: "/productos/tops/top-jolie.jpg",
    category: "tops",
    fabric: "algodon",
    colors: ["Beige", "Negro"],
    sizes: ["XS", "S", "M", "L", "XL"],
    audience: "mujer", // added audience
  },
  {
    slug: "top-brigid",
    title: "Top Brigid",
    price: 34,
    image: "/productos/tops/top-brigid.jpg",
    category: "tops",
    fabric: "algodon",
    colors: ["Gris", "Negro"],
    sizes: ["XS", "S", "M", "L", "XL"],
    audience: "mujer",
  },

  // PRODUCTOS DE NIÑA
  {
    slug: "cafarena-nina",
    title: "Cafarena Niña",
    price: 28,
    image: "/productos/nina/cafarena-nina.webp",
    category: "shorts",
    fabric: "suplex",
    colors: ["Rosa", "Azul", "Negro"],
    sizes: ["2", "4", "6", "8", "10", "12"],
    audience: "nina",
  },
  {
    slug: "panty-nina",
    title: "Panty Niña",
    price: 22,
    image: "/productos/nina/panty-nina.webp",
    category: "shorts",
    fabric: "suplex",
    colors: ["Rosa", "Negro", "Blanco"],
    sizes: ["2", "4", "6", "8", "10", "12"],
    audience: "nina",
  },
  {
    slug: "enterizo-manga-corta-nina",
    title: "Enterizo manga corta Niña",
    price: 38,
    image: "/productos/nina/enterizo-manga-corta-nina.webp",
    category: "enterizos",
    fabric: "suplex",
    colors: ["Rosa", "Negro", "Azul"],
    sizes: ["2", "4", "6", "8", "10", "12"],
    audience: "nina",
  },
  {
    slug: "enterizo-manga-larga-nina",
    title: "Enterizo manga larga Niña",
    price: 42,
    image: "/productos/nina/enterizo-manga-larga-nina.webp",
    category: "enterizos",
    fabric: "suplex",
    colors: ["Rosa", "Negro", "Morado"],
    sizes: ["2", "4", "6", "8", "10", "12"],
    audience: "nina",
  },
  {
    slug: "legging-nina",
    title: "Legging Niña",
    price: 32,
    image: "/productos/nina/legging-nina.webp",
    category: "leggings",
    fabric: "suplex",
    colors: ["Negro", "Rosa", "Azul"],
    sizes: ["2", "4", "6", "8", "10", "12"],
    audience: "nina",
  },
  {
    slug: "maxi-short-nina",
    title: "Maxi Short Niña",
    price: 26,
    image: "/productos/nina/maxi-short-nina.webp",
    category: "shorts",
    fabric: "suplex",
    colors: ["Rosa", "Negro", "Blanco"],
    sizes: ["2", "4", "6", "8", "10", "12"],
    audience: "nina",
  },
  {
    slug: "short-juvenil-nina",
    title: "Short Juvenil Niña",
    price: 24,
    image: "/productos/nina/short-juvenil-nina.webp",
    category: "shorts",
    fabric: "suplex",
    colors: ["Rosa", "Negro", "Azul"],
    sizes: ["2", "4", "6", "8", "10", "12"],
    audience: "nina",
  },
  {
    slug: "top-jazmin",
    title: "Top Jazmín",
    price: 30,
    image: "/productos/nina/top-jazmin.webp",
    category: "tops",
    fabric: "algodon",
    colors: ["Rosa", "Blanco", "Negro"],
    sizes: ["2", "4", "6", "8", "10", "12"],
    audience: "nina",
  },
  {
    slug: "top-margarita",
    title: "Top Margarita",
    price: 30,
    image: "/productos/nina/top-margarita.webp",
    category: "tops",
    fabric: "algodon",
    colors: ["Rosa", "Blanco", "Azul"],
    sizes: ["2", "4", "6", "8", "10", "12"],
    audience: "nina",
  },
  {
    slug: "top-orquidea",
    title: "Top Orquídea",
    price: 30,
    image: "/productos/nina/top-orquidea.webp",
    category: "tops",
    fabric: "algodon",
    colors: ["Morado", "Rosa", "Blanco"],
    sizes: ["2", "4", "6", "8", "10", "12"],
    audience: "nina",
  },
  {
    slug: "top-tulipan",
    title: "Top Tulipán",
    price: 30,
    image: "/productos/nina/top-tulipan.webp",
    category: "tops",
    fabric: "algodon",
    colors: ["Rosa", "Blanco", "Negro"],
    sizes: ["2", "4", "6", "8", "10", "12"],
    audience: "nina",
  },
  {
    slug: "top-vani",
    title: "Top Vani",
    price: 28,
    image: "/productos/nina/top-vani.webp",
    category: "tops",
    fabric: "algodon",
    colors: ["Rosa", "Blanco", "Azul"],
    sizes: ["2", "4", "6", "8", "10", "12"],
    audience: "nina",
  },
]

export const findProduct = (slug: string) => products.find((p) => p.slug === slug)
export const byCategory = (c: Product["category"]) => products.filter((p) => p.category === c)
export const byFabric = (f: Product["fabric"]) => products.filter((p) => p.fabric === f)
export const byAudience = (a: Product["audience"]) => products.filter((p) => p.audience === a)
