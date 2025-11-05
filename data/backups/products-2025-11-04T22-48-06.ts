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
  // CAMISETAS (mujer)
  {
    slug: "camiseta-manga-larga",
    title: "Camiseta Manga Larga",
    price: 36,
    image: "/productos/mujer/camisetas/camiseta-manga-larga-blanco1.webp",
    category: "camisetas",
    fabric: "algodon",
    colors: [
      {
        name: "Blanco",
        slug: "blanco",
        hex: "#FFFFFF",
        images: [
          "/productos/mujer/camisetas/camiseta-manga-larga-blanco1.webp",
          "/productos/mujer/camisetas/camiseta-manga-larga-blanco2.webp",
          "/productos/mujer/camisetas/camiseta-manga-larga-blanco3.webp",
          "/productos/mujer/camisetas/camiseta-manga-larga-blanco4.webp"
        ]
      },
      {
        name: "Negro",
        slug: "negro",
        hex: "#000000",
        images: [
          "/productos/mujer/camisetas/camiseta-manga-larga-negro1.webp",
          "/productos/mujer/camisetas/camiseta-manga-larga-negro2.webp",
          "/productos/mujer/camisetas/camiseta-manga-larga-negro3.webp",
          "/productos/mujer/camisetas/camiseta-manga-larga-negro4.webp"
        ]
      },
      {
        name: "Melange",
        slug: "melange",
        hex: "#9CA3AF",
        images: [
          "/productos/mujer/camisetas/camiseta-manga-larga-melange1.webp",
          "/productos/mujer/camisetas/camiseta-manga-larga-melange2.webp",
          "/productos/mujer/camisetas/camiseta-manga-larga-melange3.webp",
          "/productos/mujer/camisetas/camiseta-manga-larga-melange4.webp"
        ]
      },
      {
        name: "Beige",
        slug: "beige",
        hex: "#F5F5DC",
        images: [
          "/productos/mujer/camisetas/camiseta-manga-larga-beige1.webp",
          "/productos/mujer/camisetas/camiseta-manga-larga-beige2.webp",
          "/productos/mujer/camisetas/camiseta-manga-larga-beige3.webp",
          "/productos/mujer/camisetas/camiseta-manga-larga-beige4.webp"
        ]
      },
      {
        name: "Rojo",
        slug: "rojo",
        hex: "#D22B2B",
        images: [
          "/productos/mujer/camisetas/camiseta-manga-larga-rojo1.webp",
          "/productos/mujer/camisetas/camiseta-manga-larga-rojo2.webp",
          "/productos/mujer/camisetas/camiseta-manga-larga-rojo3.webp",
          "/productos/mujer/camisetas/camiseta-manga-larga-rojo4.webp"
        ]
      },
      {
        name: "Azul Marino",
        slug: "azul-marino",
        hex: "#1E3A8A",
        images: [
          "/productos/mujer/camisetas/camiseta-manga-larga-azul-marino1.webp",
          "/productos/mujer/camisetas/camiseta-manga-larga-azul-marino2.webp",
          "/productos/mujer/camisetas/camiseta-manga-larga-azul-marino3.webp",
          "/productos/mujer/camisetas/camiseta-manga-larga-azul-marino4.webp"
        ]
      }
    ],
    sizes: ["S", "M", "L", "XL"],
    audience: "mujer",
    tags: [
      "COD.393",
      "Colección Camisetas Algodón Licrado",
      "Algodón Licrado",
      "Manga larga",
      "Algodón licrado"
    ],
    attributes: {
      material: "Algodón Licrado",
      detalles: [
        "Manga larga",
        "Algodón licrado"
      ],
      beneficios: []
    }
  },

  {
    slug: "camiseta-manga-corta",
    title: "Camiseta Manga Corta",
    price: 29,
    image: "/productos/mujer/camisetas/camiseta-manga-corta-blanco1.webp",
    category: "camisetas",
    fabric: "algodon",
    colors: [
      {
        name: "Blanco",
        slug: "blanco",
        hex: "#FFFFFF",
        images: [
          "/productos/mujer/camisetas/camiseta-manga-corta-blanco1.webp",
          "/productos/mujer/camisetas/camiseta-manga-corta-blanco2.webp",
          "/productos/mujer/camisetas/camiseta-manga-corta-blanco3.webp",
          "/productos/mujer/camisetas/camiseta-manga-corta-blanco4.webp"
        ]
      },
      {
        name: "Negro",
        slug: "negro",
        hex: "#000000",
        images: [
          "/productos/mujer/camisetas/camiseta-manga-corta-negro1.webp",
          "/productos/mujer/camisetas/camiseta-manga-corta-negro2.webp",
          "/productos/mujer/camisetas/camiseta-manga-corta-negro3.webp",
          "/productos/mujer/camisetas/camiseta-manga-corta-negro4.webp"
        ]
      },
      {
        name: "Melange",
        slug: "melange",
        hex: "#9CA3AF",
        images: [
          "/productos/mujer/camisetas/camiseta-manga-corta-melange1.webp",
          "/productos/mujer/camisetas/camiseta-manga-corta-melange2.webp",
          "/productos/mujer/camisetas/camiseta-manga-corta-melange3.webp",
          "/productos/mujer/camisetas/camiseta-manga-corta-melange4.webp"
        ]
      },
      {
        name: "Beige",
        slug: "beige",
        hex: "#F5F5DC",
        images: [
          "/productos/mujer/camisetas/camiseta-manga-corta-beige1.webp",
          "/productos/mujer/camisetas/camiseta-manga-corta-beige2.webp",
          "/productos/mujer/camisetas/camiseta-manga-corta-beige3.webp",
          "/productos/mujer/camisetas/camiseta-manga-corta-beige4.webp"
        ]
      },
      {
        name: "Rojo",
        slug: "rojo",
        hex: "#D22B2B",
        images: [
          "/productos/mujer/camisetas/camiseta-manga-corta-rojo1.webp",
          "/productos/mujer/camisetas/camiseta-manga-corta-rojo2.webp",
          "/productos/mujer/camisetas/camiseta-manga-corta-rojo3.webp",
          "/productos/mujer/camisetas/camiseta-manga-corta-rojo4.webp"
        ]
      },
      {
        name: "Azul Marino",
        slug: "azul-marino",
        hex: "#1E3A8A",
        images: [
          "/productos/mujer/camisetas/camiseta-manga-corta-azul-marino1.webp",
          "/productos/mujer/camisetas/camiseta-manga-corta-azul-marino2.webp",
          "/productos/mujer/camisetas/camiseta-manga-corta-azul-marino3.webp",
          "/productos/mujer/camisetas/camiseta-manga-corta-azul-marino4.webp"
        ]
      }
    ],
    sizes: ["S", "M", "L", "XL"],
    audience: "mujer",
    tags: [
      "COD.399",
      "Colección Camisetas Algodón Licrado",
      "Algodón Licrado",
      "Manga corta",
      "Algodón licrado"
    ],
    attributes: {
      material: "Algodón Licrado",
      detalles: [
        "Manga corta",
        "Algodón licrado"
      ],
      beneficios: []
    }
  },

  {
    slug: "camiseta-cuello-alto",
    title: "Camiseta Cuello Alto",
    price: 29,
    image: "/productos/mujer/camisetas/camiseta-cuello-alto-blanco1.webp",
    category: "camisetas",
    fabric: "algodon",
    colors: [
      {
        name: "Blanco",
        slug: "blanco",
        hex: "#FFFFFF",
        images: [
          "/productos/mujer/camisetas/camiseta-cuello-alto-blanco1.webp",
          "/productos/mujer/camisetas/camiseta-cuello-alto-blanco2.webp",
          "/productos/mujer/camisetas/camiseta-cuello-alto-blanco3.webp",
          "/productos/mujer/camisetas/camiseta-cuello-alto-blanco4.webp"
        ]
      },
      {
        name: "Negro",
        slug: "negro",
        hex: "#000000",
        images: [
          "/productos/mujer/camisetas/camiseta-cuello-alto-negro1.webp",
          "/productos/mujer/camisetas/camiseta-cuello-alto-negro2.webp",
          "/productos/mujer/camisetas/camiseta-cuello-alto-negro3.webp",
          "/productos/mujer/camisetas/camiseta-cuello-alto-negro4.webp"
        ]
      },
      {
        name: "Melange",
        slug: "melange",
        hex: "#9CA3AF",
        images: [
          "/productos/mujer/camisetas/camiseta-cuello-alto-melange1.webp",
          "/productos/mujer/camisetas/camiseta-cuello-alto-melange2.webp",
          "/productos/mujer/camisetas/camiseta-cuello-alto-melange3.webp",
          "/productos/mujer/camisetas/camiseta-cuello-alto-melange4.webp"
        ]
      },
      {
        name: "Beige",
        slug: "beige",
        hex: "#F5F5DC",
        images: [
          "/productos/mujer/camisetas/camiseta-cuello-alto-beige1.webp",
          "/productos/mujer/camisetas/camiseta-cuello-alto-beige2.webp",
          "/productos/mujer/camisetas/camiseta-cuello-alto-beige3.webp",
          "/productos/mujer/camisetas/camiseta-cuello-alto-beige4.webp"
        ]
      },
      {
        name: "Azul Marino",
        slug: "azul-marino",
        hex: "#1E3A8A",
        images: [
          "/productos/mujer/camisetas/camiseta-cuello-alto-azul-marino1.webp",
          "/productos/mujer/camisetas/camiseta-cuello-alto-azul-marino2.webp",
          "/productos/mujer/camisetas/camiseta-cuello-alto-azul-marino3.webp",
          "/productos/mujer/camisetas/camiseta-cuello-alto-azul-marino4.webp"
        ]
      }
    ],
    sizes: ["S", "M", "L", "XL"],
    audience: "mujer",
    tags: [
      "COD.389",
      "Colección Camisetas Algodón Licrado",
      "Algodón Licrado",
      "Cuello alto",
      "Algodón licrado"
    ],
    attributes: {
      material: "Algodón Licrado",
      detalles: [
        "Cuello alto",
        "Algodón licrado"
      ],
      beneficios: []
    }
  },

  {
    slug: "camiseta-deportiva",
    title: "Camiseta Deportiva",
    price: 24,
    image: "/productos/mujer/camisetas/camiseta-deportiva-blanco1.webp",
    category: "camisetas",
    fabric: "algodon",
    colors: [
      {
        name: "Blanco",
        slug: "blanco",
        hex: "#FFFFFF",
        images: [
          "/productos/mujer/camisetas/camiseta-deportiva-blanco1.webp",
          "/productos/mujer/camisetas/camiseta-deportiva-blanco2.webp",
          "/productos/mujer/camisetas/camiseta-deportiva-blanco3.webp",
          "/productos/mujer/camisetas/camiseta-deportiva-blanco4.webp"
        ]
      },
      {
        name: "Negro",
        slug: "negro",
        hex: "#000000",
        images: [
          "/productos/mujer/camisetas/camiseta-deportiva-negro1.webp",
          "/productos/mujer/camisetas/camiseta-deportiva-negro2.webp",
          "/productos/mujer/camisetas/camiseta-deportiva-negro3.webp",
          "/productos/mujer/camisetas/camiseta-deportiva-negro4.webp"
        ]
      },
      {
        name: "Melange",
        slug: "melange",
        hex: "#9CA3AF",
        images: [
          "/productos/mujer/camisetas/camiseta-deportiva-melange1.webp",
          "/productos/mujer/camisetas/camiseta-deportiva-melange2.webp",
          "/productos/mujer/camisetas/camiseta-deportiva-melange3.webp",
          "/productos/mujer/camisetas/camiseta-deportiva-melange4.webp"
        ]
      },
      {
        name: "Rojo",
        slug: "rojo",
        hex: "#D22B2B",
        images: [
          "/productos/mujer/camisetas/camiseta-deportiva-rojo1.webp",
          "/productos/mujer/camisetas/camiseta-deportiva-rojo2.webp",
          "/productos/mujer/camisetas/camiseta-deportiva-rojo3.webp",
          "/productos/mujer/camisetas/camiseta-deportiva-rojo4.webp"
        ]
      },
      {
        name: "Azul Marino",
        slug: "azul-marino",
        hex: "#1E3A8A",
        images: [
          "/productos/mujer/camisetas/camiseta-deportiva-azul-marino1.webp",
          "/productos/mujer/camisetas/camiseta-deportiva-azul-marino2.webp",
          "/productos/mujer/camisetas/camiseta-deportiva-azul-marino3.webp",
          "/productos/mujer/camisetas/camiseta-deportiva-azul-marino4.webp"
        ]
      }
    ],
    sizes: ["S", "M", "L", "XL"],
    audience: "mujer",
    tags: [
      "COD.386",
      "Colección Camisetas Algodón Licrado",
      "Algodón Licrado",
      "Diseño deportivo",
      "Algodón licrado"
    ],
    attributes: {
      material: "Algodón Licrado",
      detalles: [
        "Diseño deportivo",
        "Algodón licrado"
      ],
      beneficios: []
    }
  },

  {
    slug: "camiseta-nueva-cod705",
    title: "Camiseta Nueva COD.705",
    price: 23,
    image: "/productos/mujer/camisetas/camiseta-nueva-cod705-negro1.webp",
    category: "camisetas",
    fabric: "algodon",
    colors: [
      {
        name: "Negro",
        slug: "negro",
        hex: "#000000",
        images: [
          "/productos/mujer/camisetas/camiseta-nueva-cod705-negro1.webp",
          "/productos/mujer/camisetas/camiseta-nueva-cod705-negro2.webp",
          "/productos/mujer/camisetas/camiseta-nueva-cod705-negro3.webp",
          "/productos/mujer/camisetas/camiseta-nueva-cod705-negro4.webp"
        ]
      },
      {
        name: "Melange",
        slug: "melange",
        hex: "#9CA3AF",
        images: [
          "/productos/mujer/camisetas/camiseta-nueva-cod705-melange1.webp",
          "/productos/mujer/camisetas/camiseta-nueva-cod705-melange2.webp",
          "/productos/mujer/camisetas/camiseta-nueva-cod705-melange3.webp",
          "/productos/mujer/camisetas/camiseta-nueva-cod705-melange4.webp"
        ]
      },
      {
        name: "Blanco",
        slug: "blanco",
        hex: "#FFFFFF",
        images: [
          "/productos/mujer/camisetas/camiseta-nueva-cod705-blanco1.webp",
          "/productos/mujer/camisetas/camiseta-nueva-cod705-blanco2.webp",
          "/productos/mujer/camisetas/camiseta-nueva-cod705-blanco3.webp",
          "/productos/mujer/camisetas/camiseta-nueva-cod705-blanco4.webp"
        ]
      },
      {
        name: "Azul",
        slug: "azul",
        hex: "#9CA3AF",
        images: [
          "/productos/mujer/camisetas/camiseta-nueva-cod705-azul1.webp",
          "/productos/mujer/camisetas/camiseta-nueva-cod705-azul2.webp",
          "/productos/mujer/camisetas/camiseta-nueva-cod705-azul3.webp",
          "/productos/mujer/camisetas/camiseta-nueva-cod705-azul4.webp"
        ]
      }
    ],
    sizes: ["S", "M", "L", "XL"],
    audience: "mujer",
    tags: [
      "COD.705",
      "Colección Camisetas Algodón Licrado",
      "Algodón Licrado",
      "Doble forro interno",
      "Producto nuevo",
      "Algodón licrado"
    ],
    attributes: {
      material: "Algodón Licrado",
      detalles: [
        "Doble forro interno",
        "Producto nuevo",
        "Algodón licrado"
      ],
      beneficios: []
    }
  },

  {
    slug: "camiseta-tiras-finas",
    title: "Camiseta Tiras Finas",
    price: 21,
    image: "/productos/mujer/camisetas/camiseta-tiras-finas-blanco1.webp",
    category: "camisetas",
    fabric: "algodon",
    colors: [
      {
        name: "Blanco",
        slug: "blanco",
        hex: "#FFFFFF",
        images: [
          "/productos/mujer/camisetas/camiseta-tiras-finas-blanco1.webp",
          "/productos/mujer/camisetas/camiseta-tiras-finas-blanco2.webp",
          "/productos/mujer/camisetas/camiseta-tiras-finas-blanco3.webp",
          "/productos/mujer/camisetas/camiseta-tiras-finas-blanco4.webp"
        ]
      },
      {
        name: "Negro",
        slug: "negro",
        hex: "#000000",
        images: [
          "/productos/mujer/camisetas/camiseta-tiras-finas-negro1.webp",
          "/productos/mujer/camisetas/camiseta-tiras-finas-negro2.webp",
          "/productos/mujer/camisetas/camiseta-tiras-finas-negro3.webp",
          "/productos/mujer/camisetas/camiseta-tiras-finas-negro4.webp"
        ]
      },
      {
        name: "Melange",
        slug: "melange",
        hex: "#9CA3AF",
        images: [
          "/productos/mujer/camisetas/camiseta-tiras-finas-melange1.webp",
          "/productos/mujer/camisetas/camiseta-tiras-finas-melange2.webp",
          "/productos/mujer/camisetas/camiseta-tiras-finas-melange3.webp",
          "/productos/mujer/camisetas/camiseta-tiras-finas-melange4.webp"
        ]
      },
      {
        name: "Rojo",
        slug: "rojo",
        hex: "#D22B2B",
        images: [
          "/productos/mujer/camisetas/camiseta-tiras-finas-rojo1.webp",
          "/productos/mujer/camisetas/camiseta-tiras-finas-rojo2.webp",
          "/productos/mujer/camisetas/camiseta-tiras-finas-rojo3.webp",
          "/productos/mujer/camisetas/camiseta-tiras-finas-rojo4.webp"
        ]
      }
    ],
    sizes: ["S", "M", "L"],
    audience: "mujer",
    tags: [
      "COD.384",
      "Colección Camisetas Algodón Licrado",
      "Algodón Licrado",
      "Diseño con tiras finas",
      "Algodón licrado"
    ],
    attributes: {
      material: "Algodón Licrado",
      detalles: [
        "Diseño con tiras finas",
        "Algodón licrado"
      ],
      beneficios: []
    }
  },

  {
    slug: "camiseta-tropical",
    title: "Camiseta Tropical",
    price: 21,
    image: "/productos/mujer/camisetas/camiseta-tropical-blanco1.webp",
    category: "camisetas",
    fabric: "algodon",
    colors: [
      {
        name: "Blanco",
        slug: "blanco",
        hex: "#FFFFFF",
        images: [
          "/productos/mujer/camisetas/camiseta-tropical-blanco1.webp",
          "/productos/mujer/camisetas/camiseta-tropical-blanco2.webp",
          "/productos/mujer/camisetas/camiseta-tropical-blanco3.webp",
          "/productos/mujer/camisetas/camiseta-tropical-blanco4.webp"
        ]
      },
      {
        name: "Negro",
        slug: "negro",
        hex: "#000000",
        images: [
          "/productos/mujer/camisetas/camiseta-tropical-negro1.webp",
          "/productos/mujer/camisetas/camiseta-tropical-negro2.webp",
          "/productos/mujer/camisetas/camiseta-tropical-negro3.webp",
          "/productos/mujer/camisetas/camiseta-tropical-negro4.webp"
        ]
      },
      {
        name: "Melange",
        slug: "melange",
        hex: "#9CA3AF",
        images: [
          "/productos/mujer/camisetas/camiseta-tropical-melange1.webp",
          "/productos/mujer/camisetas/camiseta-tropical-melange2.webp",
          "/productos/mujer/camisetas/camiseta-tropical-melange3.webp",
          "/productos/mujer/camisetas/camiseta-tropical-melange4.webp"
        ]
      },
      {
        name: "Rojo",
        slug: "rojo",
        hex: "#D22B2B",
        images: [
          "/productos/mujer/camisetas/camiseta-tropical-rojo1.webp",
          "/productos/mujer/camisetas/camiseta-tropical-rojo2.webp",
          "/productos/mujer/camisetas/camiseta-tropical-rojo3.webp",
          "/productos/mujer/camisetas/camiseta-tropical-rojo4.webp"
        ]
      },
      {
        name: "Azul Marino",
        slug: "azul-marino",
        hex: "#1E3A8A",
        images: [
          "/productos/mujer/camisetas/camiseta-tropical-azul-marino1.webp",
          "/productos/mujer/camisetas/camiseta-tropical-azul-marino2.webp",
          "/productos/mujer/camisetas/camiseta-tropical-azul-marino3.webp",
          "/productos/mujer/camisetas/camiseta-tropical-azul-marino4.webp"
        ]
      }
    ],
    sizes: ["S", "M", "L", "XL"],
    audience: "mujer",
    tags: [
      "COD.388",
      "Colección Camisetas Algodón Licrado",
      "Algodón Licrado",
      "Diseño tropical",
      "Algodón licrado"
    ],
    attributes: {
      material: "Algodón Licrado",
      detalles: [
        "Diseño tropical",
        "Algodón licrado"
      ],
      beneficios: []
    }
  },

  // TOPS (mujer)
  {
    slug: "astrid",
    title: "Astrid",
    price: 32,
    image: "/productos/mujer/tops/astrid-charcol1.webp",
    category: "tops",
    fabric: "algodon",
    colors: [
      {
        name: "Charcol",
        slug: "charcol",
        hex: "#374151",
        images: [
          "/productos/mujer/tops/astrid-charcol1.webp",
          "/productos/mujer/tops/astrid-charcol2.webp",
          "/productos/mujer/tops/astrid-charcol3.webp",
          "/productos/mujer/tops/astrid-charcol4.webp"
        ]
      },
      {
        name: "Negro",
        slug: "negro",
        hex: "#000000",
        images: [
          "/productos/mujer/tops/astrid-negro1.webp",
          "/productos/mujer/tops/astrid-negro2.webp",
          "/productos/mujer/tops/astrid-negro3.webp",
          "/productos/mujer/tops/astrid-negro4.webp"
        ]
      },
      {
        name: "Azul Marino",
        slug: "azul-marino",
        hex: "#1E3A8A",
        images: [
          "/productos/mujer/tops/astrid-azul-marino1.webp",
          "/productos/mujer/tops/astrid-azul-marino2.webp",
          "/productos/mujer/tops/astrid-azul-marino3.webp",
          "/productos/mujer/tops/astrid-azul-marino4.webp"
        ]
      },
      {
        name: "Negro-Charcol",
        slug: "negro-charcol",
        hex: "#9CA3AF",
        images: [
          "/productos/mujer/tops/astrid-negro-charcol1.webp",
          "/productos/mujer/tops/astrid-negro-charcol2.webp",
          "/productos/mujer/tops/astrid-negro-charcol3.webp",
          "/productos/mujer/tops/astrid-negro-charcol4.webp"
        ]
      }
    ],
    sizes: ["S", "M", "L"],
    audience: "mujer",
    tags: [
      "COD.S-107",
      "Colección Especial Suplex",
      "Suplex + Algodón Licrado",
      "Forro interno de algodón licrado",
      "Copas removibles y lavables",
      "Pretina tipo faja",
      "Suplex liso interno",
      "Tejido spandex",
      "Ideal para yoga/gym"
    ],
    attributes: {
      material: "Suplex + Algodón Licrado",
      detalles: [
        "Forro interno de algodón licrado",
        "Copas removibles y lavables",
        "Pretina tipo faja",
        "Suplex liso interno",
        "Tejido spandex",
        "Ideal para yoga/gym"
      ],
      beneficios: []
    }
  },

  {
    slug: "top-afrodita",
    title: "Top Afrodita",
    price: 32,
    image: "/productos/mujer/tops/top-afrodita-charcol1.webp",
    category: "tops",
    fabric: "algodon",
    colors: [
      {
        name: "Charcol",
        slug: "charcol",
        hex: "#374151",
        images: [
          "/productos/mujer/tops/top-afrodita-charcol1.webp",
          "/productos/mujer/tops/top-afrodita-charcol2.webp",
          "/productos/mujer/tops/top-afrodita-charcol3.webp",
          "/productos/mujer/tops/top-afrodita-charcol4.webp"
        ]
      },
      {
        name: "Negro",
        slug: "negro",
        hex: "#000000",
        images: [
          "/productos/mujer/tops/top-afrodita-negro1.webp",
          "/productos/mujer/tops/top-afrodita-negro2.webp",
          "/productos/mujer/tops/top-afrodita-negro3.webp",
          "/productos/mujer/tops/top-afrodita-negro4.webp"
        ]
      },
      {
        name: "Azulino",
        slug: "azulino",
        hex: "#60A5FA",
        images: [
          "/productos/mujer/tops/top-afrodita-azulino1.webp",
          "/productos/mujer/tops/top-afrodita-azulino2.webp",
          "/productos/mujer/tops/top-afrodita-azulino3.webp",
          "/productos/mujer/tops/top-afrodita-azulino4.webp"
        ]
      },
      {
        name: "Rojo",
        slug: "rojo",
        hex: "#D22B2B",
        images: [
          "/productos/mujer/tops/top-afrodita-rojo1.webp",
          "/productos/mujer/tops/top-afrodita-rojo2.webp",
          "/productos/mujer/tops/top-afrodita-rojo3.webp",
          "/productos/mujer/tops/top-afrodita-rojo4.webp"
        ]
      }
    ],
    sizes: ["S", "M", "L"],
    audience: "mujer",
    tags: [
      "COD.213",
      "Colección Tops Suplex",
      "Suplex + Algodón",
      "Forro interno de algodón",
      "Copas removibles y lavables",
      "Diseño deportivo"
    ],
    attributes: {
      material: "Suplex + Algodón",
      detalles: [
        "Forro interno de algodón",
        "Copas removibles y lavables",
        "Diseño deportivo"
      ],
      beneficios: []
    }
  },

  {
    slug: "top-venus",
    title: "Top Venus",
    price: 32,
    image: "/productos/mujer/tops/top-venus-charcol1.webp",
    category: "tops",
    fabric: "algodon",
    colors: [
      {
        name: "Charcol",
        slug: "charcol",
        hex: "#374151",
        images: [
          "/productos/mujer/tops/top-venus-charcol1.webp",
          "/productos/mujer/tops/top-venus-charcol2.webp",
          "/productos/mujer/tops/top-venus-charcol3.webp",
          "/productos/mujer/tops/top-venus-charcol4.webp"
        ]
      },
      {
        name: "Negro",
        slug: "negro",
        hex: "#000000",
        images: [
          "/productos/mujer/tops/top-venus-negro1.webp",
          "/productos/mujer/tops/top-venus-negro2.webp",
          "/productos/mujer/tops/top-venus-negro3.webp",
          "/productos/mujer/tops/top-venus-negro4.webp"
        ]
      },
      {
        name: "Azulino",
        slug: "azulino",
        hex: "#60A5FA",
        images: [
          "/productos/mujer/tops/top-venus-azulino1.webp",
          "/productos/mujer/tops/top-venus-azulino2.webp",
          "/productos/mujer/tops/top-venus-azulino3.webp",
          "/productos/mujer/tops/top-venus-azulino4.webp"
        ]
      },
      {
        name: "Rojo",
        slug: "rojo",
        hex: "#D22B2B",
        images: [
          "/productos/mujer/tops/top-venus-rojo1.webp",
          "/productos/mujer/tops/top-venus-rojo2.webp",
          "/productos/mujer/tops/top-venus-rojo3.webp",
          "/productos/mujer/tops/top-venus-rojo4.webp"
        ]
      }
    ],
    sizes: ["S", "M", "L"],
    audience: "mujer",
    tags: [
      "COD.215",
      "Colección Tops Suplex",
      "Suplex + Algodón",
      "Forro interno de algodón",
      "Copas removibles y lavables",
      "Diseño deportivo"
    ],
    attributes: {
      material: "Suplex + Algodón",
      detalles: [
        "Forro interno de algodón",
        "Copas removibles y lavables",
        "Diseño deportivo"
      ],
      beneficios: []
    }
  },

  {
    slug: "top-minerva",
    title: "Top Minerva",
    price: 32,
    image: "/productos/mujer/tops/top-minerva-charcol1.webp",
    category: "tops",
    fabric: "algodon",
    colors: [
      {
        name: "Charcol",
        slug: "charcol",
        hex: "#374151",
        images: [
          "/productos/mujer/tops/top-minerva-charcol1.webp",
          "/productos/mujer/tops/top-minerva-charcol2.webp",
          "/productos/mujer/tops/top-minerva-charcol3.webp",
          "/productos/mujer/tops/top-minerva-charcol4.webp"
        ]
      },
      {
        name: "Negro",
        slug: "negro",
        hex: "#000000",
        images: [
          "/productos/mujer/tops/top-minerva-negro1.webp",
          "/productos/mujer/tops/top-minerva-negro2.webp",
          "/productos/mujer/tops/top-minerva-negro3.webp",
          "/productos/mujer/tops/top-minerva-negro4.webp"
        ]
      },
      {
        name: "Azulino",
        slug: "azulino",
        hex: "#60A5FA",
        images: [
          "/productos/mujer/tops/top-minerva-azulino1.webp",
          "/productos/mujer/tops/top-minerva-azulino2.webp",
          "/productos/mujer/tops/top-minerva-azulino3.webp",
          "/productos/mujer/tops/top-minerva-azulino4.webp"
        ]
      },
      {
        name: "Rojo",
        slug: "rojo",
        hex: "#D22B2B",
        images: [
          "/productos/mujer/tops/top-minerva-rojo1.webp",
          "/productos/mujer/tops/top-minerva-rojo2.webp",
          "/productos/mujer/tops/top-minerva-rojo3.webp",
          "/productos/mujer/tops/top-minerva-rojo4.webp"
        ]
      }
    ],
    sizes: ["S", "M", "L"],
    audience: "mujer",
    tags: [
      "COD.214",
      "Colección Tops Suplex",
      "Suplex + Algodón",
      "Forro interno de algodón",
      "Diseño deportivo",
      "Sin copas removibles"
    ],
    attributes: {
      material: "Suplex + Algodón",
      detalles: [
        "Forro interno de algodón",
        "Diseño deportivo",
        "Sin copas removibles"
      ],
      beneficios: []
    }
  },

  {
    slug: "top-paradise",
    title: "Top Paradise",
    price: 32,
    image: "/productos/mujer/tops/top-paradise-charcol1.webp",
    category: "tops",
    fabric: "algodon",
    colors: [
      {
        name: "Charcol",
        slug: "charcol",
        hex: "#374151",
        images: [
          "/productos/mujer/tops/top-paradise-charcol1.webp",
          "/productos/mujer/tops/top-paradise-charcol2.webp",
          "/productos/mujer/tops/top-paradise-charcol3.webp",
          "/productos/mujer/tops/top-paradise-charcol4.webp"
        ]
      },
      {
        name: "Negro",
        slug: "negro",
        hex: "#000000",
        images: [
          "/productos/mujer/tops/top-paradise-negro1.webp",
          "/productos/mujer/tops/top-paradise-negro2.webp",
          "/productos/mujer/tops/top-paradise-negro3.webp",
          "/productos/mujer/tops/top-paradise-negro4.webp"
        ]
      },
      {
        name: "Azulino",
        slug: "azulino",
        hex: "#60A5FA",
        images: [
          "/productos/mujer/tops/top-paradise-azulino1.webp",
          "/productos/mujer/tops/top-paradise-azulino2.webp",
          "/productos/mujer/tops/top-paradise-azulino3.webp",
          "/productos/mujer/tops/top-paradise-azulino4.webp"
        ]
      },
      {
        name: "Rojo",
        slug: "rojo",
        hex: "#D22B2B",
        images: [
          "/productos/mujer/tops/top-paradise-rojo1.webp",
          "/productos/mujer/tops/top-paradise-rojo2.webp",
          "/productos/mujer/tops/top-paradise-rojo3.webp",
          "/productos/mujer/tops/top-paradise-rojo4.webp"
        ]
      }
    ],
    sizes: ["S", "M", "L"],
    audience: "mujer",
    tags: [
      "COD.104",
      "Colección Tops Suplex",
      "Suplex + Algodón",
      "Forro interno de algodón",
      "Copas removibles y lavables",
      "Diseño deportivo"
    ],
    attributes: {
      material: "Suplex + Algodón",
      detalles: [
        "Forro interno de algodón",
        "Copas removibles y lavables",
        "Diseño deportivo"
      ],
      beneficios: []
    }
  },

  {
    slug: "top-jungle",
    title: "Top Jungle",
    price: 32,
    image: "/productos/mujer/tops/top-jungle-charcol1.webp",
    category: "tops",
    fabric: "algodon",
    colors: [
      {
        name: "Charcol",
        slug: "charcol",
        hex: "#374151",
        images: [
          "/productos/mujer/tops/top-jungle-charcol1.webp",
          "/productos/mujer/tops/top-jungle-charcol2.webp",
          "/productos/mujer/tops/top-jungle-charcol3.webp",
          "/productos/mujer/tops/top-jungle-charcol4.webp"
        ]
      },
      {
        name: "Negro",
        slug: "negro",
        hex: "#000000",
        images: [
          "/productos/mujer/tops/top-jungle-negro1.webp",
          "/productos/mujer/tops/top-jungle-negro2.webp",
          "/productos/mujer/tops/top-jungle-negro3.webp",
          "/productos/mujer/tops/top-jungle-negro4.webp"
        ]
      },
      {
        name: "Azulino",
        slug: "azulino",
        hex: "#60A5FA",
        images: [
          "/productos/mujer/tops/top-jungle-azulino1.webp",
          "/productos/mujer/tops/top-jungle-azulino2.webp",
          "/productos/mujer/tops/top-jungle-azulino3.webp",
          "/productos/mujer/tops/top-jungle-azulino4.webp"
        ]
      },
      {
        name: "Rojo",
        slug: "rojo",
        hex: "#D22B2B",
        images: [
          "/productos/mujer/tops/top-jungle-rojo1.webp",
          "/productos/mujer/tops/top-jungle-rojo2.webp",
          "/productos/mujer/tops/top-jungle-rojo3.webp",
          "/productos/mujer/tops/top-jungle-rojo4.webp"
        ]
      }
    ],
    sizes: ["S", "M", "L"],
    audience: "mujer",
    tags: [
      "COD.109",
      "Colección Tops Suplex",
      "Suplex + Algodón",
      "Forro interno de algodón",
      "Copas removibles y lavables",
      "Diseño deportivo"
    ],
    attributes: {
      material: "Suplex + Algodón",
      detalles: [
        "Forro interno de algodón",
        "Copas removibles y lavables",
        "Diseño deportivo"
      ],
      beneficios: []
    }
  },

  {
    slug: "top-athena",
    title: "Top Athena",
    price: 29,
    image: "/productos/mujer/tops/top-athena-blanco1.webp",
    category: "tops",
    fabric: "algodon",
    colors: [
      {
        name: "Blanco",
        slug: "blanco",
        hex: "#FFFFFF",
        images: [
          "/productos/mujer/tops/top-athena-blanco1.webp",
          "/productos/mujer/tops/top-athena-blanco2.webp",
          "/productos/mujer/tops/top-athena-blanco3.webp",
          "/productos/mujer/tops/top-athena-blanco4.webp"
        ]
      },
      {
        name: "Melange",
        slug: "melange",
        hex: "#9CA3AF",
        images: [
          "/productos/mujer/tops/top-athena-melange1.webp",
          "/productos/mujer/tops/top-athena-melange2.webp",
          "/productos/mujer/tops/top-athena-melange3.webp",
          "/productos/mujer/tops/top-athena-melange4.webp"
        ]
      },
      {
        name: "Beige",
        slug: "beige",
        hex: "#F5F5DC",
        images: [
          "/productos/mujer/tops/top-athena-beige1.webp",
          "/productos/mujer/tops/top-athena-beige2.webp",
          "/productos/mujer/tops/top-athena-beige3.webp",
          "/productos/mujer/tops/top-athena-beige4.webp"
        ]
      },
      {
        name: "Negro",
        slug: "negro",
        hex: "#000000",
        images: [
          "/productos/mujer/tops/top-athena-negro1.webp",
          "/productos/mujer/tops/top-athena-negro2.webp",
          "/productos/mujer/tops/top-athena-negro3.webp",
          "/productos/mujer/tops/top-athena-negro4.webp"
        ]
      }
    ],
    sizes: ["S", "M", "L", "XL"],
    audience: "mujer",
    tags: [
      "COD.207",
      "Colección Tops Algodón Licrado",
      "Algodón Licrado",
      "Copas internas removibles",
      "Algodón licrado (cómodo y transpirable)",
      "Diseño premium"
    ],
    attributes: {
      material: "Algodón Licrado",
      detalles: [
        "Copas internas removibles",
        "Algodón licrado (cómodo y transpirable)",
        "Diseño premium"
      ],
      beneficios: []
    }
  },

  {
    slug: "top-jolie",
    title: "Top Jolie",
    price: 29,
    image: "/productos/mujer/tops/top-jolie-blanco1.webp",
    category: "tops",
    fabric: "algodon",
    colors: [
      {
        name: "Blanco",
        slug: "blanco",
        hex: "#FFFFFF",
        images: [
          "/productos/mujer/tops/top-jolie-blanco1.webp",
          "/productos/mujer/tops/top-jolie-blanco2.webp",
          "/productos/mujer/tops/top-jolie-blanco3.webp",
          "/productos/mujer/tops/top-jolie-blanco4.webp"
        ]
      },
      {
        name: "Melange",
        slug: "melange",
        hex: "#9CA3AF",
        images: [
          "/productos/mujer/tops/top-jolie-melange1.webp",
          "/productos/mujer/tops/top-jolie-melange2.webp",
          "/productos/mujer/tops/top-jolie-melange3.webp",
          "/productos/mujer/tops/top-jolie-melange4.webp"
        ]
      },
      {
        name: "Negro",
        slug: "negro",
        hex: "#000000",
        images: [
          "/productos/mujer/tops/top-jolie-negro1.webp",
          "/productos/mujer/tops/top-jolie-negro2.webp",
          "/productos/mujer/tops/top-jolie-negro3.webp",
          "/productos/mujer/tops/top-jolie-negro4.webp"
        ]
      },
      {
        name: "Beige",
        slug: "beige",
        hex: "#F5F5DC",
        images: [
          "/productos/mujer/tops/top-jolie-beige1.webp",
          "/productos/mujer/tops/top-jolie-beige2.webp",
          "/productos/mujer/tops/top-jolie-beige3.webp",
          "/productos/mujer/tops/top-jolie-beige4.webp"
        ]
      }
    ],
    sizes: ["S", "M", "L", "XL"],
    audience: "mujer",
    tags: [
      "COD.208",
      "Colección Tops Algodón Licrado",
      "Algodón Licrado",
      "Copas internas removibles",
      "Algodón licrado",
      "Diseño premium"
    ],
    attributes: {
      material: "Algodón Licrado",
      detalles: [
        "Copas internas removibles",
        "Algodón licrado",
        "Diseño premium"
      ],
      beneficios: []
    }
  },

  {
    slug: "top-brigid",
    title: "Top Brigid",
    price: 29,
    image: "/productos/mujer/tops/top-brigid-blanco1.webp",
    category: "tops",
    fabric: "algodon",
    colors: [
      {
        name: "Blanco",
        slug: "blanco",
        hex: "#FFFFFF",
        images: [
          "/productos/mujer/tops/top-brigid-blanco1.webp",
          "/productos/mujer/tops/top-brigid-blanco2.webp",
          "/productos/mujer/tops/top-brigid-blanco3.webp",
          "/productos/mujer/tops/top-brigid-blanco4.webp"
        ]
      },
      {
        name: "Melange",
        slug: "melange",
        hex: "#9CA3AF",
        images: [
          "/productos/mujer/tops/top-brigid-melange1.webp",
          "/productos/mujer/tops/top-brigid-melange2.webp",
          "/productos/mujer/tops/top-brigid-melange3.webp",
          "/productos/mujer/tops/top-brigid-melange4.webp"
        ]
      },
      {
        name: "Negro",
        slug: "negro",
        hex: "#000000",
        images: [
          "/productos/mujer/tops/top-brigid-negro1.webp",
          "/productos/mujer/tops/top-brigid-negro2.webp",
          "/productos/mujer/tops/top-brigid-negro3.webp",
          "/productos/mujer/tops/top-brigid-negro4.webp"
        ]
      },
      {
        name: "Beige",
        slug: "beige",
        hex: "#F5F5DC",
        images: [
          "/productos/mujer/tops/top-brigid-beige1.webp",
          "/productos/mujer/tops/top-brigid-beige2.webp",
          "/productos/mujer/tops/top-brigid-beige3.webp",
          "/productos/mujer/tops/top-brigid-beige4.webp"
        ]
      }
    ],
    sizes: ["S", "M", "L", "XL"],
    audience: "mujer",
    tags: [
      "COD.209",
      "Colección Tops Algodón Licrado",
      "Algodón Licrado",
      "Copas internas removibles",
      "Algodón licrado",
      "Diseño premium"
    ],
    attributes: {
      material: "Algodón Licrado",
      detalles: [
        "Copas internas removibles",
        "Algodón licrado",
        "Diseño premium"
      ],
      beneficios: []
    }
  },

  {
    slug: "top-cod710",
    title: "Top COD.710",
    price: 29,
    image: "/productos/mujer/tops/top-cod710-blanco1.webp",
    category: "tops",
    fabric: "algodon",
    colors: [
      {
        name: "Blanco",
        slug: "blanco",
        hex: "#FFFFFF",
        images: [
          "/productos/mujer/tops/top-cod710-blanco1.webp",
          "/productos/mujer/tops/top-cod710-blanco2.webp",
          "/productos/mujer/tops/top-cod710-blanco3.webp",
          "/productos/mujer/tops/top-cod710-blanco4.webp"
        ]
      },
      {
        name: "Negro",
        slug: "negro",
        hex: "#000000",
        images: [
          "/productos/mujer/tops/top-cod710-negro1.webp",
          "/productos/mujer/tops/top-cod710-negro2.webp",
          "/productos/mujer/tops/top-cod710-negro3.webp",
          "/productos/mujer/tops/top-cod710-negro4.webp"
        ]
      },
      {
        name: "Melange",
        slug: "melange",
        hex: "#9CA3AF",
        images: [
          "/productos/mujer/tops/top-cod710-melange1.webp",
          "/productos/mujer/tops/top-cod710-melange2.webp",
          "/productos/mujer/tops/top-cod710-melange3.webp",
          "/productos/mujer/tops/top-cod710-melange4.webp"
        ]
      },
      {
        name: "Beige",
        slug: "beige",
        hex: "#F5F5DC",
        images: [
          "/productos/mujer/tops/top-cod710-beige1.webp",
          "/productos/mujer/tops/top-cod710-beige2.webp",
          "/productos/mujer/tops/top-cod710-beige3.webp",
          "/productos/mujer/tops/top-cod710-beige4.webp"
        ]
      }
    ],
    sizes: ["S", "M", "L", "XL"],
    audience: "mujer",
    tags: [
      "COD.710",
      "Colección Tops Algodón Licrado",
      "Algodón Licrado",
      "Copas internas removibles",
      "Algodón licrado"
    ],
    attributes: {
      material: "Algodón Licrado",
      detalles: [
        "Copas internas removibles",
        "Algodón licrado"
      ],
      beneficios: []
    }
  },

  {
    slug: "top-cod902",
    title: "Top COD.902",
    price: 28,
    image: "/productos/mujer/tops/top-cod902-beige1.webp",
    category: "tops",
    fabric: "algodon",
    colors: [
      {
        name: "Beige",
        slug: "beige",
        hex: "#F5F5DC",
        images: [
          "/productos/mujer/tops/top-cod902-beige1.webp",
          "/productos/mujer/tops/top-cod902-beige2.webp",
          "/productos/mujer/tops/top-cod902-beige3.webp",
          "/productos/mujer/tops/top-cod902-beige4.webp"
        ]
      }
    ],
    sizes: ["S", "M", "L", "XL"],
    audience: "mujer",
    tags: [
      "COD.902",
      "Colección Tops Algodón Licrado",
      "Algodón Licrado",
      "Copas internas removibles",
      "Algodón licrado",
      "Solo disponible en Beige"
    ],
    attributes: {
      material: "Algodón Licrado",
      detalles: [
        "Copas internas removibles",
        "Algodón licrado",
        "Solo disponible en Beige"
      ],
      beneficios: []
    }
  },

  {
    slug: "top-cod402",
    title: "Top COD.402",
    price: 28,
    image: "/productos/mujer/tops/top-cod402-blanco1.webp",
    category: "tops",
    fabric: "algodon",
    colors: [
      {
        name: "Blanco",
        slug: "blanco",
        hex: "#FFFFFF",
        images: [
          "/productos/mujer/tops/top-cod402-blanco1.webp",
          "/productos/mujer/tops/top-cod402-blanco2.webp",
          "/productos/mujer/tops/top-cod402-blanco3.webp",
          "/productos/mujer/tops/top-cod402-blanco4.webp"
        ]
      },
      {
        name: "Negro",
        slug: "negro",
        hex: "#000000",
        images: [
          "/productos/mujer/tops/top-cod402-negro1.webp",
          "/productos/mujer/tops/top-cod402-negro2.webp",
          "/productos/mujer/tops/top-cod402-negro3.webp",
          "/productos/mujer/tops/top-cod402-negro4.webp"
        ]
      },
      {
        name: "Melange",
        slug: "melange",
        hex: "#9CA3AF",
        images: [
          "/productos/mujer/tops/top-cod402-melange1.webp",
          "/productos/mujer/tops/top-cod402-melange2.webp",
          "/productos/mujer/tops/top-cod402-melange3.webp",
          "/productos/mujer/tops/top-cod402-melange4.webp"
        ]
      },
      {
        name: "Beige",
        slug: "beige",
        hex: "#F5F5DC",
        images: [
          "/productos/mujer/tops/top-cod402-beige1.webp",
          "/productos/mujer/tops/top-cod402-beige2.webp",
          "/productos/mujer/tops/top-cod402-beige3.webp",
          "/productos/mujer/tops/top-cod402-beige4.webp"
        ]
      }
    ],
    sizes: ["S", "M", "L", "XL"],
    audience: "mujer",
    tags: [
      "COD.402",
      "Colección Tops Algodón Licrado",
      "Algodón Licrado",
      "Copas internas removibles",
      "Algodón licrado"
    ],
    attributes: {
      material: "Algodón Licrado",
      detalles: [
        "Copas internas removibles",
        "Algodón licrado"
      ],
      beneficios: []
    }
  },

  {
    slug: "top-cod391",
    title: "Top COD.391",
    price: 28,
    image: "/productos/mujer/tops/top-cod391-blanco1.webp",
    category: "tops",
    fabric: "algodon",
    colors: [
      {
        name: "Blanco",
        slug: "blanco",
        hex: "#FFFFFF",
        images: [
          "/productos/mujer/tops/top-cod391-blanco1.webp",
          "/productos/mujer/tops/top-cod391-blanco2.webp",
          "/productos/mujer/tops/top-cod391-blanco3.webp",
          "/productos/mujer/tops/top-cod391-blanco4.webp"
        ]
      },
      {
        name: "Negro",
        slug: "negro",
        hex: "#000000",
        images: [
          "/productos/mujer/tops/top-cod391-negro1.webp",
          "/productos/mujer/tops/top-cod391-negro2.webp",
          "/productos/mujer/tops/top-cod391-negro3.webp",
          "/productos/mujer/tops/top-cod391-negro4.webp"
        ]
      },
      {
        name: "Melange",
        slug: "melange",
        hex: "#9CA3AF",
        images: [
          "/productos/mujer/tops/top-cod391-melange1.webp",
          "/productos/mujer/tops/top-cod391-melange2.webp",
          "/productos/mujer/tops/top-cod391-melange3.webp",
          "/productos/mujer/tops/top-cod391-melange4.webp"
        ]
      },
      {
        name: "Beige",
        slug: "beige",
        hex: "#F5F5DC",
        images: [
          "/productos/mujer/tops/top-cod391-beige1.webp",
          "/productos/mujer/tops/top-cod391-beige2.webp",
          "/productos/mujer/tops/top-cod391-beige3.webp",
          "/productos/mujer/tops/top-cod391-beige4.webp"
        ]
      }
    ],
    sizes: ["S", "M", "L", "XL"],
    audience: "mujer",
    tags: [
      "COD.391",
      "Colección Tops Algodón Licrado",
      "Algodón Licrado",
      "Copas internas removibles",
      "Algodón licrado"
    ],
    attributes: {
      material: "Algodón Licrado",
      detalles: [
        "Copas internas removibles",
        "Algodón licrado"
      ],
      beneficios: []
    }
  },

  {
    slug: "top-cod901",
    title: "Top COD.901",
    price: 23,
    image: "/productos/mujer/tops/top-cod901-blanco1.webp",
    category: "tops",
    fabric: "algodon",
    colors: [
      {
        name: "Blanco",
        slug: "blanco",
        hex: "#FFFFFF",
        images: [
          "/productos/mujer/tops/top-cod901-blanco1.webp",
          "/productos/mujer/tops/top-cod901-blanco2.webp",
          "/productos/mujer/tops/top-cod901-blanco3.webp",
          "/productos/mujer/tops/top-cod901-blanco4.webp"
        ]
      },
      {
        name: "Negro",
        slug: "negro",
        hex: "#000000",
        images: [
          "/productos/mujer/tops/top-cod901-negro1.webp",
          "/productos/mujer/tops/top-cod901-negro2.webp",
          "/productos/mujer/tops/top-cod901-negro3.webp",
          "/productos/mujer/tops/top-cod901-negro4.webp"
        ]
      },
      {
        name: "Melange",
        slug: "melange",
        hex: "#9CA3AF",
        images: [
          "/productos/mujer/tops/top-cod901-melange1.webp",
          "/productos/mujer/tops/top-cod901-melange2.webp",
          "/productos/mujer/tops/top-cod901-melange3.webp",
          "/productos/mujer/tops/top-cod901-melange4.webp"
        ]
      },
      {
        name: "Beige",
        slug: "beige",
        hex: "#F5F5DC",
        images: [
          "/productos/mujer/tops/top-cod901-beige1.webp",
          "/productos/mujer/tops/top-cod901-beige2.webp",
          "/productos/mujer/tops/top-cod901-beige3.webp",
          "/productos/mujer/tops/top-cod901-beige4.webp"
        ]
      }
    ],
    sizes: ["S", "M", "L", "XL"],
    audience: "mujer",
    tags: [
      "COD.901",
      "Colección Tops Algodón Licrado",
      "Algodón Licrado",
      "Copas internas removibles",
      "Tiras ajustables",
      "Algodón licrado"
    ],
    attributes: {
      material: "Algodón Licrado",
      detalles: [
        "Copas internas removibles",
        "Tiras ajustables",
        "Algodón licrado"
      ],
      beneficios: []
    }
  },

  {
    slug: "top-straple",
    title: "Top Straple",
    price: 23,
    image: "/productos/mujer/tops/top-straple-blanco1.webp",
    category: "tops",
    fabric: "algodon",
    colors: [
      {
        name: "Blanco",
        slug: "blanco",
        hex: "#FFFFFF",
        images: [
          "/productos/mujer/tops/top-straple-blanco1.webp",
          "/productos/mujer/tops/top-straple-blanco2.webp",
          "/productos/mujer/tops/top-straple-blanco3.webp",
          "/productos/mujer/tops/top-straple-blanco4.webp"
        ]
      },
      {
        name: "Negro",
        slug: "negro",
        hex: "#000000",
        images: [
          "/productos/mujer/tops/top-straple-negro1.webp",
          "/productos/mujer/tops/top-straple-negro2.webp",
          "/productos/mujer/tops/top-straple-negro3.webp",
          "/productos/mujer/tops/top-straple-negro4.webp"
        ]
      },
      {
        name: "Melange",
        slug: "melange",
        hex: "#9CA3AF",
        images: [
          "/productos/mujer/tops/top-straple-melange1.webp",
          "/productos/mujer/tops/top-straple-melange2.webp",
          "/productos/mujer/tops/top-straple-melange3.webp",
          "/productos/mujer/tops/top-straple-melange4.webp"
        ]
      },
      {
        name: "Beige",
        slug: "beige",
        hex: "#F5F5DC",
        images: [
          "/productos/mujer/tops/top-straple-beige1.webp",
          "/productos/mujer/tops/top-straple-beige2.webp",
          "/productos/mujer/tops/top-straple-beige3.webp",
          "/productos/mujer/tops/top-straple-beige4.webp"
        ]
      }
    ],
    sizes: ["S", "M", "L", "XL"],
    audience: "mujer",
    tags: [
      "COD.900",
      "Colección Tops Algodón Licrado",
      "Algodón Licrado",
      "Copas internas removibles",
      "Algodón licrado",
      "Diseño straple"
    ],
    attributes: {
      material: "Algodón Licrado",
      detalles: [
        "Copas internas removibles",
        "Algodón licrado",
        "Diseño straple"
      ],
      beneficios: []
    }
  },

  {
    slug: "top-deportivo",
    title: "Top Deportivo",
    price: 14,
    image: "/productos/mujer/tops/top-deportivo-negro1.webp",
    category: "tops",
    fabric: "algodon",
    colors: [
      {
        name: "Negro",
        slug: "negro",
        hex: "#000000",
        images: [
          "/productos/mujer/tops/top-deportivo-negro1.webp",
          "/productos/mujer/tops/top-deportivo-negro2.webp",
          "/productos/mujer/tops/top-deportivo-negro3.webp",
          "/productos/mujer/tops/top-deportivo-negro4.webp"
        ]
      },
      {
        name: "Melange",
        slug: "melange",
        hex: "#9CA3AF",
        images: [
          "/productos/mujer/tops/top-deportivo-melange1.webp",
          "/productos/mujer/tops/top-deportivo-melange2.webp",
          "/productos/mujer/tops/top-deportivo-melange3.webp",
          "/productos/mujer/tops/top-deportivo-melange4.webp"
        ]
      },
      {
        name: "Beige",
        slug: "beige",
        hex: "#F5F5DC",
        images: [
          "/productos/mujer/tops/top-deportivo-beige1.webp",
          "/productos/mujer/tops/top-deportivo-beige2.webp",
          "/productos/mujer/tops/top-deportivo-beige3.webp",
          "/productos/mujer/tops/top-deportivo-beige4.webp"
        ]
      },
      {
        name: "Rojo",
        slug: "rojo",
        hex: "#D22B2B",
        images: [
          "/productos/mujer/tops/top-deportivo-rojo1.webp",
          "/productos/mujer/tops/top-deportivo-rojo2.webp",
          "/productos/mujer/tops/top-deportivo-rojo3.webp",
          "/productos/mujer/tops/top-deportivo-rojo4.webp"
        ]
      }
    ],
    sizes: ["S", "M", "L"],
    audience: "mujer",
    tags: [
      "COD.390",
      "Colección Tops Algodón Licrado",
      "Algodón Licrado",
      "Precio económico",
      "Diseño deportivo básico",
      "Sin copas removibles"
    ],
    attributes: {
      material: "Algodón Licrado",
      detalles: [
        "Precio económico",
        "Diseño deportivo básico",
        "Sin copas removibles"
      ],
      beneficios: []
    }
  },

  {
    slug: "top-tiras-finas",
    title: "Top Tiras Finas",
    price: 14,
    image: "/productos/mujer/tops/top-tiras-finas-blanco1.webp",
    category: "tops",
    fabric: "algodon",
    colors: [
      {
        name: "Blanco",
        slug: "blanco",
        hex: "#FFFFFF",
        images: [
          "/productos/mujer/tops/top-tiras-finas-blanco1.webp",
          "/productos/mujer/tops/top-tiras-finas-blanco2.webp",
          "/productos/mujer/tops/top-tiras-finas-blanco3.webp",
          "/productos/mujer/tops/top-tiras-finas-blanco4.webp"
        ]
      },
      {
        name: "Negro",
        slug: "negro",
        hex: "#000000",
        images: [
          "/productos/mujer/tops/top-tiras-finas-negro1.webp",
          "/productos/mujer/tops/top-tiras-finas-negro2.webp",
          "/productos/mujer/tops/top-tiras-finas-negro3.webp",
          "/productos/mujer/tops/top-tiras-finas-negro4.webp"
        ]
      },
      {
        name: "Melange",
        slug: "melange",
        hex: "#9CA3AF",
        images: [
          "/productos/mujer/tops/top-tiras-finas-melange1.webp",
          "/productos/mujer/tops/top-tiras-finas-melange2.webp",
          "/productos/mujer/tops/top-tiras-finas-melange3.webp",
          "/productos/mujer/tops/top-tiras-finas-melange4.webp"
        ]
      }
    ],
    sizes: ["S", "M", "L"],
    audience: "mujer",
    tags: [
      "COD.392",
      "Colección Tops Algodón Licrado",
      "Algodón Licrado",
      "Precio económico",
      "Diseño con tiras finas",
      "Sin copas removibles"
    ],
    attributes: {
      material: "Algodón Licrado",
      detalles: [
        "Precio económico",
        "Diseño con tiras finas",
        "Sin copas removibles"
      ],
      beneficios: []
    }
  },

  // BODYSUITS (mujer)
  {
    slug: "body-suplex-manga-corta",
    title: "Body Suplex Manga Corta",
    price: 36,
    image: "/productos/mujer/bodysuits/body-suplex-manga-corta-blanco1.webp",
    category: "bodysuits",
    fabric: "suplex",
    colors: [
      {
        name: "Blanco",
        slug: "blanco",
        hex: "#FFFFFF",
        images: [
          "/productos/mujer/bodysuits/body-suplex-manga-corta-blanco1.webp",
          "/productos/mujer/bodysuits/body-suplex-manga-corta-blanco2.webp",
          "/productos/mujer/bodysuits/body-suplex-manga-corta-blanco3.webp",
          "/productos/mujer/bodysuits/body-suplex-manga-corta-blanco4.webp"
        ]
      },
      {
        name: "Negro",
        slug: "negro",
        hex: "#000000",
        images: [
          "/productos/mujer/bodysuits/body-suplex-manga-corta-negro1.webp",
          "/productos/mujer/bodysuits/body-suplex-manga-corta-negro2.webp",
          "/productos/mujer/bodysuits/body-suplex-manga-corta-negro3.webp",
          "/productos/mujer/bodysuits/body-suplex-manga-corta-negro4.webp"
        ]
      },
      {
        name: "Rojo",
        slug: "rojo",
        hex: "#D22B2B",
        images: [
          "/productos/mujer/bodysuits/body-suplex-manga-corta-rojo1.webp",
          "/productos/mujer/bodysuits/body-suplex-manga-corta-rojo2.webp",
          "/productos/mujer/bodysuits/body-suplex-manga-corta-rojo3.webp",
          "/productos/mujer/bodysuits/body-suplex-manga-corta-rojo4.webp"
        ]
      },
      {
        name: "Azul Marino",
        slug: "azul-marino",
        hex: "#1E3A8A",
        images: [
          "/productos/mujer/bodysuits/body-suplex-manga-corta-azul-marino1.webp",
          "/productos/mujer/bodysuits/body-suplex-manga-corta-azul-marino2.webp",
          "/productos/mujer/bodysuits/body-suplex-manga-corta-azul-marino3.webp",
          "/productos/mujer/bodysuits/body-suplex-manga-corta-azul-marino4.webp"
        ]
      }
    ],
    sizes: ["S", "M", "L", "XL"],
    audience: "mujer",
    tags: [
      "COD.228",
      "Colección Nueva Temporada",
      "Suplex",
      "Body de suplex liso",
      "Diseño bikini para más comodidad",
      "Gafete regulable en la entrepierna",
      "Manga corta"
    ],
    attributes: {
      material: "Suplex",
      detalles: [
        "Body de suplex liso",
        "Diseño bikini para más comodidad",
        "Gafete regulable en la entrepierna",
        "Manga corta"
      ],
      beneficios: []
    }
  },

  {
    slug: "body-manga-corta",
    title: "Body Manga Corta",
    price: 33,
    image: "/productos/mujer/bodysuits/body-manga-corta-blanco1.webp",
    category: "bodysuits",
    fabric: "algodon",
    colors: [
      {
        name: "Blanco",
        slug: "blanco",
        hex: "#FFFFFF",
        images: [
          "/productos/mujer/bodysuits/body-manga-corta-blanco1.webp",
          "/productos/mujer/bodysuits/body-manga-corta-blanco2.webp",
          "/productos/mujer/bodysuits/body-manga-corta-blanco3.webp",
          "/productos/mujer/bodysuits/body-manga-corta-blanco4.webp"
        ]
      },
      {
        name: "Negro",
        slug: "negro",
        hex: "#000000",
        images: [
          "/productos/mujer/bodysuits/body-manga-corta-negro1.webp",
          "/productos/mujer/bodysuits/body-manga-corta-negro2.webp",
          "/productos/mujer/bodysuits/body-manga-corta-negro3.webp",
          "/productos/mujer/bodysuits/body-manga-corta-negro4.webp"
        ]
      },
      {
        name: "Rosado",
        slug: "rosado",
        hex: "#FCA5A5",
        images: [
          "/productos/mujer/bodysuits/body-manga-corta-rosado1.webp",
          "/productos/mujer/bodysuits/body-manga-corta-rosado2.webp",
          "/productos/mujer/bodysuits/body-manga-corta-rosado3.webp",
          "/productos/mujer/bodysuits/body-manga-corta-rosado4.webp"
        ]
      },
      {
        name: "Rojo",
        slug: "rojo",
        hex: "#D22B2B",
        images: [
          "/productos/mujer/bodysuits/body-manga-corta-rojo1.webp",
          "/productos/mujer/bodysuits/body-manga-corta-rojo2.webp",
          "/productos/mujer/bodysuits/body-manga-corta-rojo3.webp",
          "/productos/mujer/bodysuits/body-manga-corta-rojo4.webp"
        ]
      },
      {
        name: "Beige",
        slug: "beige",
        hex: "#F5F5DC",
        images: [
          "/productos/mujer/bodysuits/body-manga-corta-beige1.webp",
          "/productos/mujer/bodysuits/body-manga-corta-beige2.webp",
          "/productos/mujer/bodysuits/body-manga-corta-beige3.webp",
          "/productos/mujer/bodysuits/body-manga-corta-beige4.webp"
        ]
      },
      {
        name: "Amarillo",
        slug: "amarillo",
        hex: "#FDE047",
        images: [
          "/productos/mujer/bodysuits/body-manga-corta-amarillo1.webp",
          "/productos/mujer/bodysuits/body-manga-corta-amarillo2.webp",
          "/productos/mujer/bodysuits/body-manga-corta-amarillo3.webp",
          "/productos/mujer/bodysuits/body-manga-corta-amarillo4.webp"
        ]
      }
    ],
    sizes: ["S", "M", "L", "XL"],
    audience: "mujer",
    tags: [
      "COD.435",
      "Colección Bodys Algodón Licrado",
      "Algodón Licrado",
      "Body de algodón licrado",
      "Diseño bikini para más comodidad",
      "Gafete graduable en la entrepierna"
    ],
    attributes: {
      material: "Algodón Licrado",
      detalles: [
        "Body de algodón licrado",
        "Diseño bikini para más comodidad",
        "Gafete graduable en la entrepierna"
      ],
      beneficios: []
    }
  },

  {
    slug: "body-manga-larga",
    title: "Body Manga Larga",
    price: 36,
    image: "/productos/mujer/bodysuits/body-manga-larga-blanco1.webp",
    category: "bodysuits",
    fabric: "algodon",
    colors: [
      {
        name: "Blanco",
        slug: "blanco",
        hex: "#FFFFFF",
        images: [
          "/productos/mujer/bodysuits/body-manga-larga-blanco1.webp",
          "/productos/mujer/bodysuits/body-manga-larga-blanco2.webp",
          "/productos/mujer/bodysuits/body-manga-larga-blanco3.webp",
          "/productos/mujer/bodysuits/body-manga-larga-blanco4.webp"
        ]
      },
      {
        name: "Rosado",
        slug: "rosado",
        hex: "#FCA5A5",
        images: [
          "/productos/mujer/bodysuits/body-manga-larga-rosado1.webp",
          "/productos/mujer/bodysuits/body-manga-larga-rosado2.webp",
          "/productos/mujer/bodysuits/body-manga-larga-rosado3.webp",
          "/productos/mujer/bodysuits/body-manga-larga-rosado4.webp"
        ]
      },
      {
        name: "Rojo",
        slug: "rojo",
        hex: "#D22B2B",
        images: [
          "/productos/mujer/bodysuits/body-manga-larga-rojo1.webp",
          "/productos/mujer/bodysuits/body-manga-larga-rojo2.webp",
          "/productos/mujer/bodysuits/body-manga-larga-rojo3.webp",
          "/productos/mujer/bodysuits/body-manga-larga-rojo4.webp"
        ]
      }
    ],
    sizes: ["S", "M", "L", "XL"],
    audience: "mujer",
    tags: [
      "COD.436",
      "Colección Bodys Algodón Licrado",
      "Algodón Licrado",
      "Body de algodón licrado",
      "Diseño bikini para más comodidad",
      "Gafete graduable en la entrepierna",
      "Manga larga"
    ],
    attributes: {
      material: "Algodón Licrado",
      detalles: [
        "Body de algodón licrado",
        "Diseño bikini para más comodidad",
        "Gafete graduable en la entrepierna",
        "Manga larga"
      ],
      beneficios: []
    }
  },

  // ENTERIZOS (mujer)
  {
    slug: "enterizo-tiras-suplex",
    title: "Enterizo Tiras Suplex",
    price: 49,
    image: "/productos/mujer/enterizos/enterizo-tiras-suplex-blanco1.webp",
    category: "enterizos",
    fabric: "suplex",
    colors: [
      {
        name: "Blanco",
        slug: "blanco",
        hex: "#FFFFFF",
        images: [
          "/productos/mujer/enterizos/enterizo-tiras-suplex-blanco1.webp",
          "/productos/mujer/enterizos/enterizo-tiras-suplex-blanco2.webp",
          "/productos/mujer/enterizos/enterizo-tiras-suplex-blanco3.webp",
          "/productos/mujer/enterizos/enterizo-tiras-suplex-blanco4.webp"
        ]
      },
      {
        name: "Charcol",
        slug: "charcol",
        hex: "#374151",
        images: [
          "/productos/mujer/enterizos/enterizo-tiras-suplex-charcol1.webp",
          "/productos/mujer/enterizos/enterizo-tiras-suplex-charcol2.webp",
          "/productos/mujer/enterizos/enterizo-tiras-suplex-charcol3.webp",
          "/productos/mujer/enterizos/enterizo-tiras-suplex-charcol4.webp"
        ]
      },
      {
        name: "Negro",
        slug: "negro",
        hex: "#000000",
        images: [
          "/productos/mujer/enterizos/enterizo-tiras-suplex-negro1.webp",
          "/productos/mujer/enterizos/enterizo-tiras-suplex-negro2.webp",
          "/productos/mujer/enterizos/enterizo-tiras-suplex-negro3.webp",
          "/productos/mujer/enterizos/enterizo-tiras-suplex-negro4.webp"
        ]
      },
      {
        name: "Azulino",
        slug: "azulino",
        hex: "#60A5FA",
        images: [
          "/productos/mujer/enterizos/enterizo-tiras-suplex-azulino1.webp",
          "/productos/mujer/enterizos/enterizo-tiras-suplex-azulino2.webp",
          "/productos/mujer/enterizos/enterizo-tiras-suplex-azulino3.webp",
          "/productos/mujer/enterizos/enterizo-tiras-suplex-azulino4.webp"
        ]
      },
      {
        name: "Rojo",
        slug: "rojo",
        hex: "#D22B2B",
        images: [
          "/productos/mujer/enterizos/enterizo-tiras-suplex-rojo1.webp",
          "/productos/mujer/enterizos/enterizo-tiras-suplex-rojo2.webp",
          "/productos/mujer/enterizos/enterizo-tiras-suplex-rojo3.webp",
          "/productos/mujer/enterizos/enterizo-tiras-suplex-rojo4.webp"
        ]
      }
    ],
    sizes: ["S", "M", "L"],
    audience: "mujer",
    tags: [
      "COD.219",
      "Colección Nueva Temporada",
      "Suplex",
      "Suplex liso de alta elongación",
      "Diseño con tiras"
    ],
    attributes: {
      material: "Suplex",
      detalles: [
        "Suplex liso de alta elongación",
        "Diseño con tiras"
      ],
      beneficios: []
    }
  },

  {
    slug: "enterizo-manga-cero-suplex",
    title: "Enterizo Manga Cero Suplex",
    price: 49,
    image: "/productos/mujer/enterizos/enterizo-manga-cero-suplex-blanco1.webp",
    category: "enterizos",
    fabric: "suplex",
    colors: [
      {
        name: "Blanco",
        slug: "blanco",
        hex: "#FFFFFF",
        images: [
          "/productos/mujer/enterizos/enterizo-manga-cero-suplex-blanco1.webp",
          "/productos/mujer/enterizos/enterizo-manga-cero-suplex-blanco2.webp",
          "/productos/mujer/enterizos/enterizo-manga-cero-suplex-blanco3.webp",
          "/productos/mujer/enterizos/enterizo-manga-cero-suplex-blanco4.webp"
        ]
      },
      {
        name: "Charcol",
        slug: "charcol",
        hex: "#374151",
        images: [
          "/productos/mujer/enterizos/enterizo-manga-cero-suplex-charcol1.webp",
          "/productos/mujer/enterizos/enterizo-manga-cero-suplex-charcol2.webp",
          "/productos/mujer/enterizos/enterizo-manga-cero-suplex-charcol3.webp",
          "/productos/mujer/enterizos/enterizo-manga-cero-suplex-charcol4.webp"
        ]
      },
      {
        name: "Negro",
        slug: "negro",
        hex: "#000000",
        images: [
          "/productos/mujer/enterizos/enterizo-manga-cero-suplex-negro1.webp",
          "/productos/mujer/enterizos/enterizo-manga-cero-suplex-negro2.webp",
          "/productos/mujer/enterizos/enterizo-manga-cero-suplex-negro3.webp",
          "/productos/mujer/enterizos/enterizo-manga-cero-suplex-negro4.webp"
        ]
      },
      {
        name: "Azulino",
        slug: "azulino",
        hex: "#60A5FA",
        images: [
          "/productos/mujer/enterizos/enterizo-manga-cero-suplex-azulino1.webp",
          "/productos/mujer/enterizos/enterizo-manga-cero-suplex-azulino2.webp",
          "/productos/mujer/enterizos/enterizo-manga-cero-suplex-azulino3.webp",
          "/productos/mujer/enterizos/enterizo-manga-cero-suplex-azulino4.webp"
        ]
      },
      {
        name: "Rojo",
        slug: "rojo",
        hex: "#D22B2B",
        images: [
          "/productos/mujer/enterizos/enterizo-manga-cero-suplex-rojo1.webp",
          "/productos/mujer/enterizos/enterizo-manga-cero-suplex-rojo2.webp",
          "/productos/mujer/enterizos/enterizo-manga-cero-suplex-rojo3.webp",
          "/productos/mujer/enterizos/enterizo-manga-cero-suplex-rojo4.webp"
        ]
      }
    ],
    sizes: ["S", "M", "L"],
    audience: "mujer",
    tags: [
      "COD.221",
      "Colección Nueva Temporada",
      "Suplex",
      "Suplex liso de alta elongación",
      "Manga cero (sin mangas)"
    ],
    attributes: {
      material: "Suplex",
      detalles: [
        "Suplex liso de alta elongación",
        "Manga cero (sin mangas)"
      ],
      beneficios: []
    }
  },

  // LEGGINGS (mujer)
  {
    slug: "slim-suplex-perchado",
    title: "Slim Suplex Perchado",
    price: 59,
    image: "/productos/mujer/leggings/slim-suplex-perchado-melange1.webp",
    category: "leggings",
    fabric: "suplex",
    colors: [
      {
        name: "Melange",
        slug: "melange",
        hex: "#9CA3AF",
        images: [
          "/productos/mujer/leggings/slim-suplex-perchado-melange1.webp",
          "/productos/mujer/leggings/slim-suplex-perchado-melange2.webp",
          "/productos/mujer/leggings/slim-suplex-perchado-melange3.webp",
          "/productos/mujer/leggings/slim-suplex-perchado-melange4.webp"
        ]
      },
      {
        name: "Negro",
        slug: "negro",
        hex: "#000000",
        images: [
          "/productos/mujer/leggings/slim-suplex-perchado-negro1.webp",
          "/productos/mujer/leggings/slim-suplex-perchado-negro2.webp",
          "/productos/mujer/leggings/slim-suplex-perchado-negro3.webp",
          "/productos/mujer/leggings/slim-suplex-perchado-negro4.webp"
        ]
      },
      {
        name: "Charcol",
        slug: "charcol",
        hex: "#374151",
        images: [
          "/productos/mujer/leggings/slim-suplex-perchado-charcol1.webp",
          "/productos/mujer/leggings/slim-suplex-perchado-charcol2.webp",
          "/productos/mujer/leggings/slim-suplex-perchado-charcol3.webp",
          "/productos/mujer/leggings/slim-suplex-perchado-charcol4.webp"
        ]
      },
      {
        name: "Azul Marino",
        slug: "azul-marino",
        hex: "#1E3A8A",
        images: [
          "/productos/mujer/leggings/slim-suplex-perchado-azul-marino1.webp",
          "/productos/mujer/leggings/slim-suplex-perchado-azul-marino2.webp",
          "/productos/mujer/leggings/slim-suplex-perchado-azul-marino3.webp",
          "/productos/mujer/leggings/slim-suplex-perchado-azul-marino4.webp"
        ]
      }
    ],
    sizes: ["S", "M", "L", "XL"],
    audience: "mujer",
    tags: [
      "COD.S-101",
      "Colección Especial Suplex",
      "Suplex Perchado",
      "Suplex perchado = tejido de spandex",
      "Externo liso",
      "Interno afranelado medio (abrigado)",
      "Diseño slim"
    ],
    attributes: {
      material: "Suplex Perchado",
      detalles: [
        "Suplex perchado = tejido de spandex",
        "Externo liso",
        "Interno afranelado medio (abrigado)",
        "Diseño slim"
      ],
      beneficios: []
    }
  },

  {
    slug: "slim-legging-suplex-liso",
    title: "Slim Legging Suplex Liso",
    price: 59,
    image: "/productos/mujer/leggings/slim-legging-suplex-liso-melange1.webp",
    category: "leggings",
    fabric: "suplex",
    colors: [
      {
        name: "Melange",
        slug: "melange",
        hex: "#9CA3AF",
        images: [
          "/productos/mujer/leggings/slim-legging-suplex-liso-melange1.webp",
          "/productos/mujer/leggings/slim-legging-suplex-liso-melange2.webp",
          "/productos/mujer/leggings/slim-legging-suplex-liso-melange3.webp",
          "/productos/mujer/leggings/slim-legging-suplex-liso-melange4.webp"
        ]
      },
      {
        name: "Acero",
        slug: "acero",
        hex: "#71717A",
        images: [
          "/productos/mujer/leggings/slim-legging-suplex-liso-acero1.webp",
          "/productos/mujer/leggings/slim-legging-suplex-liso-acero2.webp",
          "/productos/mujer/leggings/slim-legging-suplex-liso-acero3.webp",
          "/productos/mujer/leggings/slim-legging-suplex-liso-acero4.webp"
        ]
      },
      {
        name: "Rojo",
        slug: "rojo",
        hex: "#D22B2B",
        images: [
          "/productos/mujer/leggings/slim-legging-suplex-liso-rojo1.webp",
          "/productos/mujer/leggings/slim-legging-suplex-liso-rojo2.webp",
          "/productos/mujer/leggings/slim-legging-suplex-liso-rojo3.webp",
          "/productos/mujer/leggings/slim-legging-suplex-liso-rojo4.webp"
        ]
      },
      {
        name: "Azulino",
        slug: "azulino",
        hex: "#60A5FA",
        images: [
          "/productos/mujer/leggings/slim-legging-suplex-liso-azulino1.webp",
          "/productos/mujer/leggings/slim-legging-suplex-liso-azulino2.webp",
          "/productos/mujer/leggings/slim-legging-suplex-liso-azulino3.webp",
          "/productos/mujer/leggings/slim-legging-suplex-liso-azulino4.webp"
        ]
      },
      {
        name: "Melón",
        slug: "melon",
        hex: "#FDA4AF",
        images: [
          "/productos/mujer/leggings/slim-legging-suplex-liso-melon1.webp",
          "/productos/mujer/leggings/slim-legging-suplex-liso-melon2.webp",
          "/productos/mujer/leggings/slim-legging-suplex-liso-melon3.webp",
          "/productos/mujer/leggings/slim-legging-suplex-liso-melon4.webp"
        ]
      },
      {
        name: "Negro",
        slug: "negro",
        hex: "#000000",
        images: [
          "/productos/mujer/leggings/slim-legging-suplex-liso-negro1.webp",
          "/productos/mujer/leggings/slim-legging-suplex-liso-negro2.webp",
          "/productos/mujer/leggings/slim-legging-suplex-liso-negro3.webp",
          "/productos/mujer/leggings/slim-legging-suplex-liso-negro4.webp"
        ]
      },
      {
        name: "Blanco",
        slug: "blanco",
        hex: "#FFFFFF",
        images: [
          "/productos/mujer/leggings/slim-legging-suplex-liso-blanco1.webp",
          "/productos/mujer/leggings/slim-legging-suplex-liso-blanco2.webp",
          "/productos/mujer/leggings/slim-legging-suplex-liso-blanco3.webp",
          "/productos/mujer/leggings/slim-legging-suplex-liso-blanco4.webp"
        ]
      },
      {
        name: "Aqua",
        slug: "aqua",
        hex: "#06B6D4",
        images: [
          "/productos/mujer/leggings/slim-legging-suplex-liso-aqua1.webp",
          "/productos/mujer/leggings/slim-legging-suplex-liso-aqua2.webp",
          "/productos/mujer/leggings/slim-legging-suplex-liso-aqua3.webp",
          "/productos/mujer/leggings/slim-legging-suplex-liso-aqua4.webp"
        ]
      },
      {
        name: "Charcol",
        slug: "charcol",
        hex: "#374151",
        images: [
          "/productos/mujer/leggings/slim-legging-suplex-liso-charcol1.webp",
          "/productos/mujer/leggings/slim-legging-suplex-liso-charcol2.webp",
          "/productos/mujer/leggings/slim-legging-suplex-liso-charcol3.webp",
          "/productos/mujer/leggings/slim-legging-suplex-liso-charcol4.webp"
        ]
      },
      {
        name: "Azul Marino",
        slug: "azul-marino",
        hex: "#1E3A8A",
        images: [
          "/productos/mujer/leggings/slim-legging-suplex-liso-azul-marino1.webp",
          "/productos/mujer/leggings/slim-legging-suplex-liso-azul-marino2.webp",
          "/productos/mujer/leggings/slim-legging-suplex-liso-azul-marino3.webp",
          "/productos/mujer/leggings/slim-legging-suplex-liso-azul-marino4.webp"
        ]
      }
    ],
    sizes: ["S", "M", "L", "XL"],
    audience: "mujer",
    tags: [
      "COD.S-1011",
      "Colección Especial Suplex",
      "Suplex Liso",
      "Suplex liso",
      "Diseño slim",
      "Alta variedad de colores (10 colores)"
    ],
    attributes: {
      material: "Suplex Liso",
      detalles: [
        "Suplex liso",
        "Diseño slim",
        "Alta variedad de colores (10 colores)"
      ],
      beneficios: []
    }
  },

  {
    slug: "legging-functional",
    title: "Legging Functional",
    price: 55,
    image: "/productos/mujer/leggings/legging-functional-charcol1.webp",
    category: "leggings",
    fabric: "suplex",
    colors: [
      {
        name: "Charcol",
        slug: "charcol",
        hex: "#374151",
        images: [
          "/productos/mujer/leggings/legging-functional-charcol1.webp",
          "/productos/mujer/leggings/legging-functional-charcol2.webp",
          "/productos/mujer/leggings/legging-functional-charcol3.webp",
          "/productos/mujer/leggings/legging-functional-charcol4.webp"
        ]
      },
      {
        name: "Negro",
        slug: "negro",
        hex: "#000000",
        images: [
          "/productos/mujer/leggings/legging-functional-negro1.webp",
          "/productos/mujer/leggings/legging-functional-negro2.webp",
          "/productos/mujer/leggings/legging-functional-negro3.webp",
          "/productos/mujer/leggings/legging-functional-negro4.webp"
        ]
      },
      {
        name: "Azul Marino",
        slug: "azul-marino",
        hex: "#1E3A8A",
        images: [
          "/productos/mujer/leggings/legging-functional-azul-marino1.webp",
          "/productos/mujer/leggings/legging-functional-azul-marino2.webp",
          "/productos/mujer/leggings/legging-functional-azul-marino3.webp",
          "/productos/mujer/leggings/legging-functional-azul-marino4.webp"
        ]
      },
      {
        name: "Negro Charcol",
        slug: "negro-charcol",
        hex: "#1F2937",
        images: [
          "/productos/mujer/leggings/legging-functional-negro-charcol1.webp",
          "/productos/mujer/leggings/legging-functional-negro-charcol2.webp",
          "/productos/mujer/leggings/legging-functional-negro-charcol3.webp",
          "/productos/mujer/leggings/legging-functional-negro-charcol4.webp"
        ]
      }
    ],
    sizes: ["S", "M", "L"],
    audience: "mujer",
    tags: [
      "COD.S-108",
      "Colección Especial Suplex",
      "Suplex + Spandex",
      "Pretina tipo faja (compresión)",
      "Suplex liso interno",
      "Tejido spandex externo",
      "Diseño funcional para deportes"
    ],
    attributes: {
      material: "Suplex + Spandex",
      detalles: [
        "Pretina tipo faja (compresión)",
        "Suplex liso interno",
        "Tejido spandex externo",
        "Diseño funcional para deportes"
      ],
      beneficios: []
    }
  },

  {
    slug: "legging-harmony",
    title: "Legging Harmony",
    price: 49,
    image: "/productos/mujer/leggings/legging-harmony-charcol1.webp",
    category: "leggings",
    fabric: "suplex",
    colors: [
      {
        name: "Charcol",
        slug: "charcol",
        hex: "#374151",
        images: [
          "/productos/mujer/leggings/legging-harmony-charcol1.webp",
          "/productos/mujer/leggings/legging-harmony-charcol2.webp",
          "/productos/mujer/leggings/legging-harmony-charcol3.webp",
          "/productos/mujer/leggings/legging-harmony-charcol4.webp"
        ]
      },
      {
        name: "Negro",
        slug: "negro",
        hex: "#000000",
        images: [
          "/productos/mujer/leggings/legging-harmony-negro1.webp",
          "/productos/mujer/leggings/legging-harmony-negro2.webp",
          "/productos/mujer/leggings/legging-harmony-negro3.webp",
          "/productos/mujer/leggings/legging-harmony-negro4.webp"
        ]
      },
      {
        name: "Azulino",
        slug: "azulino",
        hex: "#60A5FA",
        images: [
          "/productos/mujer/leggings/legging-harmony-azulino1.webp",
          "/productos/mujer/leggings/legging-harmony-azulino2.webp",
          "/productos/mujer/leggings/legging-harmony-azulino3.webp",
          "/productos/mujer/leggings/legging-harmony-azulino4.webp"
        ]
      },
      {
        name: "Rojo",
        slug: "rojo",
        hex: "#D22B2B",
        images: [
          "/productos/mujer/leggings/legging-harmony-rojo1.webp",
          "/productos/mujer/leggings/legging-harmony-rojo2.webp",
          "/productos/mujer/leggings/legging-harmony-rojo3.webp",
          "/productos/mujer/leggings/legging-harmony-rojo4.webp"
        ]
      }
    ],
    sizes: ["S", "M", "L"],
    audience: "mujer",
    tags: [
      "COD.201",
      "Colección Infinity",
      "Suplex Liso de Alta Elongación",
      "Pretina tipo faja",
      "Refuerzo trasero",
      "Suplex liso de alta elongación",
      "Largo completo (legging)"
    ],
    attributes: {
      material: "Suplex Liso de Alta Elongación",
      detalles: [
        "Pretina tipo faja",
        "Refuerzo trasero",
        "Suplex liso de alta elongación",
        "Largo completo (legging)"
      ],
      beneficios: []
    }
  },

  {
    slug: "legging-realce-fresh-terry",
    title: "Legging Realce Fresh Terry",
    price: 48,
    image: "/productos/mujer/leggings/legging-realce-fresh-terry-charcol1.webp",
    category: "leggings",
    fabric: "suplex",
    colors: [
      {
        name: "Charcol",
        slug: "charcol",
        hex: "#374151",
        images: [
          "/productos/mujer/leggings/legging-realce-fresh-terry-charcol1.webp",
          "/productos/mujer/leggings/legging-realce-fresh-terry-charcol2.webp",
          "/productos/mujer/leggings/legging-realce-fresh-terry-charcol3.webp",
          "/productos/mujer/leggings/legging-realce-fresh-terry-charcol4.webp"
        ]
      },
      {
        name: "Negro",
        slug: "negro",
        hex: "#000000",
        images: [
          "/productos/mujer/leggings/legging-realce-fresh-terry-negro1.webp",
          "/productos/mujer/leggings/legging-realce-fresh-terry-negro2.webp",
          "/productos/mujer/leggings/legging-realce-fresh-terry-negro3.webp",
          "/productos/mujer/leggings/legging-realce-fresh-terry-negro4.webp"
        ]
      },
      {
        name: "Vino",
        slug: "vino",
        hex: "#7F1D1D",
        images: [
          "/productos/mujer/leggings/legging-realce-fresh-terry-vino1.webp",
          "/productos/mujer/leggings/legging-realce-fresh-terry-vino2.webp",
          "/productos/mujer/leggings/legging-realce-fresh-terry-vino3.webp",
          "/productos/mujer/leggings/legging-realce-fresh-terry-vino4.webp"
        ]
      },
      {
        name: "Azul Marino",
        slug: "azul-marino",
        hex: "#1E3A8A",
        images: [
          "/productos/mujer/leggings/legging-realce-fresh-terry-azul-marino1.webp",
          "/productos/mujer/leggings/legging-realce-fresh-terry-azul-marino2.webp",
          "/productos/mujer/leggings/legging-realce-fresh-terry-azul-marino3.webp",
          "/productos/mujer/leggings/legging-realce-fresh-terry-azul-marino4.webp"
        ]
      },
      {
        name: "Melange",
        slug: "melange",
        hex: "#9CA3AF",
        images: [
          "/productos/mujer/leggings/legging-realce-fresh-terry-melange1.webp",
          "/productos/mujer/leggings/legging-realce-fresh-terry-melange2.webp",
          "/productos/mujer/leggings/legging-realce-fresh-terry-melange3.webp",
          "/productos/mujer/leggings/legging-realce-fresh-terry-melange4.webp"
        ]
      }
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    audience: "mujer",
    tags: [
      "COD.437",
      "Colección Fresh Terry",
      "Fresh Terry",
      "Material Fresh Terry (innovador tipo toalla francesa/felpa)",
      "Cintura alta y ancha para estilizar la silueta",
      "Efecto realce"
    ],
    attributes: {
      material: "Fresh Terry",
      detalles: [
        "Material Fresh Terry (innovador tipo toalla francesa/felpa)",
        "Cintura alta y ancha para estilizar la silueta",
        "Efecto realce"
      ],
      beneficios: []
    }
  },

  {
    slug: "legging-clasica-algodon-gamusa-nice",
    title: "Legging Clásica Algodón Gamusa (NICE)",
    price: 35,
    image: "/productos/mujer/leggings/legging-clasica-algodon-gamusa-nice-blanco1.webp",
    category: "leggings",
    fabric: "algodon",
    colors: [
      {
        name: "Blanco",
        slug: "blanco",
        hex: "#FFFFFF",
        images: [
          "/productos/mujer/leggings/legging-clasica-algodon-gamusa-nice-blanco1.webp",
          "/productos/mujer/leggings/legging-clasica-algodon-gamusa-nice-blanco2.webp",
          "/productos/mujer/leggings/legging-clasica-algodon-gamusa-nice-blanco3.webp",
          "/productos/mujer/leggings/legging-clasica-algodon-gamusa-nice-blanco4.webp"
        ]
      },
      {
        name: "Negro",
        slug: "negro",
        hex: "#000000",
        images: [
          "/productos/mujer/leggings/legging-clasica-algodon-gamusa-nice-negro1.webp",
          "/productos/mujer/leggings/legging-clasica-algodon-gamusa-nice-negro2.webp",
          "/productos/mujer/leggings/legging-clasica-algodon-gamusa-nice-negro3.webp",
          "/productos/mujer/leggings/legging-clasica-algodon-gamusa-nice-negro4.webp"
        ]
      },
      {
        name: "Melange",
        slug: "melange",
        hex: "#9CA3AF",
        images: [
          "/productos/mujer/leggings/legging-clasica-algodon-gamusa-nice-melange1.webp",
          "/productos/mujer/leggings/legging-clasica-algodon-gamusa-nice-melange2.webp",
          "/productos/mujer/leggings/legging-clasica-algodon-gamusa-nice-melange3.webp",
          "/productos/mujer/leggings/legging-clasica-algodon-gamusa-nice-melange4.webp"
        ]
      },
      {
        name: "Azul Marino",
        slug: "azul-marino",
        hex: "#1E3A8A",
        images: [
          "/productos/mujer/leggings/legging-clasica-algodon-gamusa-nice-azul-marino1.webp",
          "/productos/mujer/leggings/legging-clasica-algodon-gamusa-nice-azul-marino2.webp",
          "/productos/mujer/leggings/legging-clasica-algodon-gamusa-nice-azul-marino3.webp",
          "/productos/mujer/leggings/legging-clasica-algodon-gamusa-nice-azul-marino4.webp"
        ]
      }
    ],
    sizes: ["S", "M", "L", "XL"],
    audience: "mujer",
    tags: [
      "COD.324",
      "Línea Nice - Leggings Algodón Licrado",
      "Algodón Gamusa",
      "Algodón gamusa (textura especial)",
      "Legging clásica",
      "Marca Nice"
    ],
    attributes: {
      material: "Algodón Gamusa",
      detalles: [
        "Algodón gamusa (textura especial)",
        "Legging clásica",
        "Marca Nice"
      ],
      beneficios: []
    }
  },

  {
    slug: "legging-clasica-algodon-licra-nice",
    title: "Legging Clásica Algodón Licra (NICE)",
    price: 32,
    image: "/productos/mujer/leggings/legging-clasica-algodon-licra-nice-negro1.webp",
    category: "leggings",
    fabric: "algodon",
    colors: [
      {
        name: "Negro",
        slug: "negro",
        hex: "#000000",
        images: [
          "/productos/mujer/leggings/legging-clasica-algodon-licra-nice-negro1.webp",
          "/productos/mujer/leggings/legging-clasica-algodon-licra-nice-negro2.webp",
          "/productos/mujer/leggings/legging-clasica-algodon-licra-nice-negro3.webp",
          "/productos/mujer/leggings/legging-clasica-algodon-licra-nice-negro4.webp"
        ]
      },
      {
        name: "Melange",
        slug: "melange",
        hex: "#9CA3AF",
        images: [
          "/productos/mujer/leggings/legging-clasica-algodon-licra-nice-melange1.webp",
          "/productos/mujer/leggings/legging-clasica-algodon-licra-nice-melange2.webp",
          "/productos/mujer/leggings/legging-clasica-algodon-licra-nice-melange3.webp",
          "/productos/mujer/leggings/legging-clasica-algodon-licra-nice-melange4.webp"
        ]
      },
      {
        name: "Azul Marino",
        slug: "azul-marino",
        hex: "#1E3A8A",
        images: [
          "/productos/mujer/leggings/legging-clasica-algodon-licra-nice-azul-marino1.webp",
          "/productos/mujer/leggings/legging-clasica-algodon-licra-nice-azul-marino2.webp",
          "/productos/mujer/leggings/legging-clasica-algodon-licra-nice-azul-marino3.webp",
          "/productos/mujer/leggings/legging-clasica-algodon-licra-nice-azul-marino4.webp"
        ]
      }
    ],
    sizes: ["S", "M", "L", "XL"],
    audience: "mujer",
    tags: [
      "COD.371",
      "Línea Nice - Leggings Algodón Licrado",
      "Algodón Licra",
      "Algodón licra",
      "Legging clásica",
      "Marca Nice"
    ],
    attributes: {
      material: "Algodón Licra",
      detalles: [
        "Algodón licra",
        "Legging clásica",
        "Marca Nice"
      ],
      beneficios: []
    }
  },

  // PESCADOR (mujer)
  {
    slug: "realce-pescador",
    title: "Realce Pescador",
    price: 48,
    image: "/productos/mujer/pescador/realce-pescador-charcol1.webp",
    category: "pescador",
    fabric: "suplex",
    colors: [
      {
        name: "Charcol",
        slug: "charcol",
        hex: "#374151",
        images: [
          "/productos/mujer/pescador/realce-pescador-charcol1.webp",
          "/productos/mujer/pescador/realce-pescador-charcol2.webp",
          "/productos/mujer/pescador/realce-pescador-charcol3.webp",
          "/productos/mujer/pescador/realce-pescador-charcol4.webp"
        ]
      },
      {
        name: "Negro",
        slug: "negro",
        hex: "#000000",
        images: [
          "/productos/mujer/pescador/realce-pescador-negro1.webp",
          "/productos/mujer/pescador/realce-pescador-negro2.webp",
          "/productos/mujer/pescador/realce-pescador-negro3.webp",
          "/productos/mujer/pescador/realce-pescador-negro4.webp"
        ]
      },
      {
        name: "Azulino",
        slug: "azulino",
        hex: "#60A5FA",
        images: [
          "/productos/mujer/pescador/realce-pescador-azulino1.webp",
          "/productos/mujer/pescador/realce-pescador-azulino2.webp",
          "/productos/mujer/pescador/realce-pescador-azulino3.webp",
          "/productos/mujer/pescador/realce-pescador-azulino4.webp"
        ]
      },
      {
        name: "Rojo",
        slug: "rojo",
        hex: "#D22B2B",
        images: [
          "/productos/mujer/pescador/realce-pescador-rojo1.webp",
          "/productos/mujer/pescador/realce-pescador-rojo2.webp",
          "/productos/mujer/pescador/realce-pescador-rojo3.webp",
          "/productos/mujer/pescador/realce-pescador-rojo4.webp"
        ]
      }
    ],
    sizes: ["S", "M", "L", "XL"],
    audience: "mujer",
    tags: [
      "COD.210",
      "Colección Especial Suplex",
      "Suplex",
      "Pretina tipo faja (compresión)",
      "Suplex liso de alta elongación",
      "Efecto realce (levanta glúteos)",
      "Largo 3/4 (pescador)"
    ],
    attributes: {
      material: "Suplex",
      detalles: [
        "Pretina tipo faja (compresión)",
        "Suplex liso de alta elongación",
        "Efecto realce (levanta glúteos)",
        "Largo 3/4 (pescador)"
      ],
      beneficios: []
    }
  },

  {
    slug: "pescador-dynamic",
    title: "Pescador Dynamic",
    price: 39,
    image: "/productos/mujer/pescador/pescador-dynamic-charcol1.webp",
    category: "pescador",
    fabric: "suplex",
    colors: [
      {
        name: "Charcol",
        slug: "charcol",
        hex: "#374151",
        images: [
          "/productos/mujer/pescador/pescador-dynamic-charcol1.webp",
          "/productos/mujer/pescador/pescador-dynamic-charcol2.webp",
          "/productos/mujer/pescador/pescador-dynamic-charcol3.webp",
          "/productos/mujer/pescador/pescador-dynamic-charcol4.webp"
        ]
      },
      {
        name: "Negro",
        slug: "negro",
        hex: "#000000",
        images: [
          "/productos/mujer/pescador/pescador-dynamic-negro1.webp",
          "/productos/mujer/pescador/pescador-dynamic-negro2.webp",
          "/productos/mujer/pescador/pescador-dynamic-negro3.webp",
          "/productos/mujer/pescador/pescador-dynamic-negro4.webp"
        ]
      },
      {
        name: "Azulino",
        slug: "azulino",
        hex: "#60A5FA",
        images: [
          "/productos/mujer/pescador/pescador-dynamic-azulino1.webp",
          "/productos/mujer/pescador/pescador-dynamic-azulino2.webp",
          "/productos/mujer/pescador/pescador-dynamic-azulino3.webp",
          "/productos/mujer/pescador/pescador-dynamic-azulino4.webp"
        ]
      },
      {
        name: "Rojo",
        slug: "rojo",
        hex: "#D22B2B",
        images: [
          "/productos/mujer/pescador/pescador-dynamic-rojo1.webp",
          "/productos/mujer/pescador/pescador-dynamic-rojo2.webp",
          "/productos/mujer/pescador/pescador-dynamic-rojo3.webp",
          "/productos/mujer/pescador/pescador-dynamic-rojo4.webp"
        ]
      }
    ],
    sizes: ["S", "M", "L"],
    audience: "mujer",
    tags: [
      "COD.202",
      "Colección Infinity",
      "Suplex Liso de Alta Elongación",
      "Pretina tipo faja",
      "Refuerzo trasero",
      "Suplex liso de alta elongación",
      "Largo 3/4 (pescador)"
    ],
    attributes: {
      material: "Suplex Liso de Alta Elongación",
      detalles: [
        "Pretina tipo faja",
        "Refuerzo trasero",
        "Suplex liso de alta elongación",
        "Largo 3/4 (pescador)"
      ],
      beneficios: []
    }
  },

  // TORERO (mujer)
  {
    slug: "torero-energy",
    title: "Torero Energy",
    price: 36,
    image: "/productos/mujer/torero/torero-energy-charcol1.webp",
    category: "torero",
    fabric: "suplex",
    colors: [
      {
        name: "Charcol",
        slug: "charcol",
        hex: "#374151",
        images: [
          "/productos/mujer/torero/torero-energy-charcol1.webp",
          "/productos/mujer/torero/torero-energy-charcol2.webp",
          "/productos/mujer/torero/torero-energy-charcol3.webp",
          "/productos/mujer/torero/torero-energy-charcol4.webp"
        ]
      },
      {
        name: "Negro",
        slug: "negro",
        hex: "#000000",
        images: [
          "/productos/mujer/torero/torero-energy-negro1.webp",
          "/productos/mujer/torero/torero-energy-negro2.webp",
          "/productos/mujer/torero/torero-energy-negro3.webp",
          "/productos/mujer/torero/torero-energy-negro4.webp"
        ]
      },
      {
        name: "Azulino",
        slug: "azulino",
        hex: "#60A5FA",
        images: [
          "/productos/mujer/torero/torero-energy-azulino1.webp",
          "/productos/mujer/torero/torero-energy-azulino2.webp",
          "/productos/mujer/torero/torero-energy-azulino3.webp",
          "/productos/mujer/torero/torero-energy-azulino4.webp"
        ]
      },
      {
        name: "Rojo",
        slug: "rojo",
        hex: "#D22B2B",
        images: [
          "/productos/mujer/torero/torero-energy-rojo1.webp",
          "/productos/mujer/torero/torero-energy-rojo2.webp",
          "/productos/mujer/torero/torero-energy-rojo3.webp",
          "/productos/mujer/torero/torero-energy-rojo4.webp"
        ]
      }
    ],
    sizes: ["S", "M", "L"],
    audience: "mujer",
    tags: [
      "COD.203",
      "Colección Infinity",
      "Suplex Liso de Alta Elongación",
      "Pretina tipo faja",
      "Refuerzo trasero",
      "Suplex liso de alta elongación",
      "Largo torero (entre ciclista y pescador)"
    ],
    attributes: {
      material: "Suplex Liso de Alta Elongación",
      detalles: [
        "Pretina tipo faja",
        "Refuerzo trasero",
        "Suplex liso de alta elongación",
        "Largo torero (entre ciclista y pescador)"
      ],
      beneficios: []
    }
  },

  // BIKERS (mujer)
  {
    slug: "ciclista-active",
    title: "Ciclista Active",
    price: 32,
    image: "/productos/mujer/bikers/ciclista-active-charcol1.webp",
    category: "bikers",
    fabric: "suplex",
    colors: [
      {
        name: "Charcol",
        slug: "charcol",
        hex: "#374151",
        images: [
          "/productos/mujer/bikers/ciclista-active-charcol1.webp",
          "/productos/mujer/bikers/ciclista-active-charcol2.webp",
          "/productos/mujer/bikers/ciclista-active-charcol3.webp",
          "/productos/mujer/bikers/ciclista-active-charcol4.webp"
        ]
      },
      {
        name: "Negro",
        slug: "negro",
        hex: "#000000",
        images: [
          "/productos/mujer/bikers/ciclista-active-negro1.webp",
          "/productos/mujer/bikers/ciclista-active-negro2.webp",
          "/productos/mujer/bikers/ciclista-active-negro3.webp",
          "/productos/mujer/bikers/ciclista-active-negro4.webp"
        ]
      },
      {
        name: "Azulino",
        slug: "azulino",
        hex: "#60A5FA",
        images: [
          "/productos/mujer/bikers/ciclista-active-azulino1.webp",
          "/productos/mujer/bikers/ciclista-active-azulino2.webp",
          "/productos/mujer/bikers/ciclista-active-azulino3.webp",
          "/productos/mujer/bikers/ciclista-active-azulino4.webp"
        ]
      },
      {
        name: "Rojo",
        slug: "rojo",
        hex: "#D22B2B",
        images: [
          "/productos/mujer/bikers/ciclista-active-rojo1.webp",
          "/productos/mujer/bikers/ciclista-active-rojo2.webp",
          "/productos/mujer/bikers/ciclista-active-rojo3.webp",
          "/productos/mujer/bikers/ciclista-active-rojo4.webp"
        ]
      },
      {
        name: "Melón",
        slug: "melon",
        hex: "#FDA4AF",
        images: [
          "/productos/mujer/bikers/ciclista-active-melon1.webp",
          "/productos/mujer/bikers/ciclista-active-melon2.webp",
          "/productos/mujer/bikers/ciclista-active-melon3.webp",
          "/productos/mujer/bikers/ciclista-active-melon4.webp"
        ]
      },
      {
        name: "Aqua",
        slug: "aqua",
        hex: "#06B6D4",
        images: [
          "/productos/mujer/bikers/ciclista-active-aqua1.webp",
          "/productos/mujer/bikers/ciclista-active-aqua2.webp",
          "/productos/mujer/bikers/ciclista-active-aqua3.webp",
          "/productos/mujer/bikers/ciclista-active-aqua4.webp"
        ]
      },
      {
        name: "Acero",
        slug: "acero",
        hex: "#71717A",
        images: [
          "/productos/mujer/bikers/ciclista-active-acero1.webp",
          "/productos/mujer/bikers/ciclista-active-acero2.webp",
          "/productos/mujer/bikers/ciclista-active-acero3.webp",
          "/productos/mujer/bikers/ciclista-active-acero4.webp"
        ]
      }
    ],
    sizes: ["S", "M", "L", "XL"],
    audience: "mujer",
    tags: [
      "COD.204",
      "Colección Infinity",
      "Suplex Liso de Alta Elongación",
      "Pretina tipo faja",
      "Refuerzo trasero",
      "Suplex liso de alta elongación",
      "Largo ciclista/biker"
    ],
    attributes: {
      material: "Suplex Liso de Alta Elongación",
      detalles: [
        "Pretina tipo faja",
        "Refuerzo trasero",
        "Suplex liso de alta elongación",
        "Largo ciclista/biker"
      ],
      beneficios: []
    }
  },

  // SHORTS (mujer)
  {
    slug: "slim-short",
    title: "Slim Short",
    price: 29,
    image: "/productos/mujer/shorts/slim-short-charcol1.webp",
    category: "shorts",
    fabric: "suplex",
    colors: [
      {
        name: "Charcol",
        slug: "charcol",
        hex: "#374151",
        images: [
          "/productos/mujer/shorts/slim-short-charcol1.webp",
          "/productos/mujer/shorts/slim-short-charcol2.webp",
          "/productos/mujer/shorts/slim-short-charcol3.webp",
          "/productos/mujer/shorts/slim-short-charcol4.webp"
        ]
      },
      {
        name: "Melange",
        slug: "melange",
        hex: "#9CA3AF",
        images: [
          "/productos/mujer/shorts/slim-short-melange1.webp",
          "/productos/mujer/shorts/slim-short-melange2.webp",
          "/productos/mujer/shorts/slim-short-melange3.webp",
          "/productos/mujer/shorts/slim-short-melange4.webp"
        ]
      },
      {
        name: "Acero",
        slug: "acero",
        hex: "#71717A",
        images: [
          "/productos/mujer/shorts/slim-short-acero1.webp",
          "/productos/mujer/shorts/slim-short-acero2.webp",
          "/productos/mujer/shorts/slim-short-acero3.webp",
          "/productos/mujer/shorts/slim-short-acero4.webp"
        ]
      },
      {
        name: "Rojo",
        slug: "rojo",
        hex: "#D22B2B",
        images: [
          "/productos/mujer/shorts/slim-short-rojo1.webp",
          "/productos/mujer/shorts/slim-short-rojo2.webp",
          "/productos/mujer/shorts/slim-short-rojo3.webp",
          "/productos/mujer/shorts/slim-short-rojo4.webp"
        ]
      },
      {
        name: "Negro",
        slug: "negro",
        hex: "#000000",
        images: [
          "/productos/mujer/shorts/slim-short-negro1.webp",
          "/productos/mujer/shorts/slim-short-negro2.webp",
          "/productos/mujer/shorts/slim-short-negro3.webp",
          "/productos/mujer/shorts/slim-short-negro4.webp"
        ]
      },
      {
        name: "Aqua",
        slug: "aqua",
        hex: "#06B6D4",
        images: [
          "/productos/mujer/shorts/slim-short-aqua1.webp",
          "/productos/mujer/shorts/slim-short-aqua2.webp",
          "/productos/mujer/shorts/slim-short-aqua3.webp",
          "/productos/mujer/shorts/slim-short-aqua4.webp"
        ]
      },
      {
        name: "Azulino",
        slug: "azulino",
        hex: "#60A5FA",
        images: [
          "/productos/mujer/shorts/slim-short-azulino1.webp",
          "/productos/mujer/shorts/slim-short-azulino2.webp",
          "/productos/mujer/shorts/slim-short-azulino3.webp",
          "/productos/mujer/shorts/slim-short-azulino4.webp"
        ]
      },
      {
        name: "Melón",
        slug: "melon",
        hex: "#FDA4AF",
        images: [
          "/productos/mujer/shorts/slim-short-melon1.webp",
          "/productos/mujer/shorts/slim-short-melon2.webp",
          "/productos/mujer/shorts/slim-short-melon3.webp",
          "/productos/mujer/shorts/slim-short-melon4.webp"
        ]
      },
      {
        name: "Blanco",
        slug: "blanco",
        hex: "#FFFFFF",
        images: [
          "/productos/mujer/shorts/slim-short-blanco1.webp",
          "/productos/mujer/shorts/slim-short-blanco2.webp",
          "/productos/mujer/shorts/slim-short-blanco3.webp",
          "/productos/mujer/shorts/slim-short-blanco4.webp"
        ]
      },
      {
        name: "Azul Marino",
        slug: "azul-marino",
        hex: "#1E3A8A",
        images: [
          "/productos/mujer/shorts/slim-short-azul-marino1.webp",
          "/productos/mujer/shorts/slim-short-azul-marino2.webp",
          "/productos/mujer/shorts/slim-short-azul-marino3.webp",
          "/productos/mujer/shorts/slim-short-azul-marino4.webp"
        ]
      }
    ],
    sizes: ["S", "M", "L", "XL"],
    audience: "mujer",
    tags: [
      "COD.S-103",
      "Colección Especial Suplex",
      "Suplex + Spandex",
      "Pretina tipo faja",
      "Suplex liso interno",
      "Tejido spandex",
      "Diseño slim",
      "Alta variedad de colores (10 colores)"
    ],
    attributes: {
      material: "Suplex + Spandex",
      detalles: [
        "Pretina tipo faja",
        "Suplex liso interno",
        "Tejido spandex",
        "Diseño slim",
        "Alta variedad de colores (10 colores)"
      ],
      beneficios: []
    }
  },

  {
    slug: "short-lux",
    title: "Short Lux",
    price: 28,
    image: "/productos/mujer/shorts/short-lux-charcol1.webp",
    category: "shorts",
    fabric: "suplex",
    colors: [
      {
        name: "Charcol",
        slug: "charcol",
        hex: "#374151",
        images: [
          "/productos/mujer/shorts/short-lux-charcol1.webp",
          "/productos/mujer/shorts/short-lux-charcol2.webp",
          "/productos/mujer/shorts/short-lux-charcol3.webp",
          "/productos/mujer/shorts/short-lux-charcol4.webp"
        ]
      },
      {
        name: "Negro",
        slug: "negro",
        hex: "#000000",
        images: [
          "/productos/mujer/shorts/short-lux-negro1.webp",
          "/productos/mujer/shorts/short-lux-negro2.webp",
          "/productos/mujer/shorts/short-lux-negro3.webp",
          "/productos/mujer/shorts/short-lux-negro4.webp"
        ]
      },
      {
        name: "Azulino",
        slug: "azulino",
        hex: "#60A5FA",
        images: [
          "/productos/mujer/shorts/short-lux-azulino1.webp",
          "/productos/mujer/shorts/short-lux-azulino2.webp",
          "/productos/mujer/shorts/short-lux-azulino3.webp",
          "/productos/mujer/shorts/short-lux-azulino4.webp"
        ]
      },
      {
        name: "Rojo",
        slug: "rojo",
        hex: "#D22B2B",
        images: [
          "/productos/mujer/shorts/short-lux-rojo1.webp",
          "/productos/mujer/shorts/short-lux-rojo2.webp",
          "/productos/mujer/shorts/short-lux-rojo3.webp",
          "/productos/mujer/shorts/short-lux-rojo4.webp"
        ]
      },
      {
        name: "Melón",
        slug: "melon",
        hex: "#FDA4AF",
        images: [
          "/productos/mujer/shorts/short-lux-melon1.webp",
          "/productos/mujer/shorts/short-lux-melon2.webp",
          "/productos/mujer/shorts/short-lux-melon3.webp",
          "/productos/mujer/shorts/short-lux-melon4.webp"
        ]
      },
      {
        name: "Aqua",
        slug: "aqua",
        hex: "#06B6D4",
        images: [
          "/productos/mujer/shorts/short-lux-aqua1.webp",
          "/productos/mujer/shorts/short-lux-aqua2.webp",
          "/productos/mujer/shorts/short-lux-aqua3.webp",
          "/productos/mujer/shorts/short-lux-aqua4.webp"
        ]
      },
      {
        name: "Acero",
        slug: "acero",
        hex: "#71717A",
        images: [
          "/productos/mujer/shorts/short-lux-acero1.webp",
          "/productos/mujer/shorts/short-lux-acero2.webp",
          "/productos/mujer/shorts/short-lux-acero3.webp",
          "/productos/mujer/shorts/short-lux-acero4.webp"
        ]
      }
    ],
    sizes: ["S", "M", "L", "XL"],
    audience: "mujer",
    tags: [
      "COD.205",
      "Colección Infinity",
      "Suplex Liso de Alta Elongación",
      "Pretina tipo faja",
      "Refuerzo trasero",
      "Suplex liso de alta elongación",
      "Largo corto (short)"
    ],
    attributes: {
      material: "Suplex Liso de Alta Elongación",
      detalles: [
        "Pretina tipo faja",
        "Refuerzo trasero",
        "Suplex liso de alta elongación",
        "Largo corto (short)"
      ],
      beneficios: []
    }
  },

  {
    slug: "short-brasil",
    title: "Short Brasil",
    price: 20,
    image: "/productos/mujer/shorts/short-brasil-blanco1.webp",
    category: "shorts",
    fabric: "algodon",
    colors: [
      {
        name: "Blanco",
        slug: "blanco",
        hex: "#FFFFFF",
        images: [
          "/productos/mujer/shorts/short-brasil-blanco1.webp",
          "/productos/mujer/shorts/short-brasil-blanco2.webp",
          "/productos/mujer/shorts/short-brasil-blanco3.webp",
          "/productos/mujer/shorts/short-brasil-blanco4.webp"
        ]
      },
      {
        name: "Negro",
        slug: "negro",
        hex: "#000000",
        images: [
          "/productos/mujer/shorts/short-brasil-negro1.webp",
          "/productos/mujer/shorts/short-brasil-negro2.webp",
          "/productos/mujer/shorts/short-brasil-negro3.webp",
          "/productos/mujer/shorts/short-brasil-negro4.webp"
        ]
      },
      {
        name: "Melange",
        slug: "melange",
        hex: "#9CA3AF",
        images: [
          "/productos/mujer/shorts/short-brasil-melange1.webp",
          "/productos/mujer/shorts/short-brasil-melange2.webp",
          "/productos/mujer/shorts/short-brasil-melange3.webp",
          "/productos/mujer/shorts/short-brasil-melange4.webp"
        ]
      },
      {
        name: "Beige",
        slug: "beige",
        hex: "#F5F5DC",
        images: [
          "/productos/mujer/shorts/short-brasil-beige1.webp",
          "/productos/mujer/shorts/short-brasil-beige2.webp",
          "/productos/mujer/shorts/short-brasil-beige3.webp",
          "/productos/mujer/shorts/short-brasil-beige4.webp"
        ]
      },
      {
        name: "Rojo",
        slug: "rojo",
        hex: "#D22B2B",
        images: [
          "/productos/mujer/shorts/short-brasil-rojo1.webp",
          "/productos/mujer/shorts/short-brasil-rojo2.webp",
          "/productos/mujer/shorts/short-brasil-rojo3.webp",
          "/productos/mujer/shorts/short-brasil-rojo4.webp"
        ]
      },
      {
        name: "Azul Marino",
        slug: "azul-marino",
        hex: "#1E3A8A",
        images: [
          "/productos/mujer/shorts/short-brasil-azul-marino1.webp",
          "/productos/mujer/shorts/short-brasil-azul-marino2.webp",
          "/productos/mujer/shorts/short-brasil-azul-marino3.webp",
          "/productos/mujer/shorts/short-brasil-azul-marino4.webp"
        ]
      }
    ],
    sizes: ["S", "M", "L", "XL"],
    audience: "mujer",
    tags: [
      "COD.363",
      "Colección Shorts Algodón Licrado",
      "Algodón Licrado",
      "Pretina de cintura sin elástico",
      "Algodón licrado",
      "Estilo brasilero"
    ],
    attributes: {
      material: "Algodón Licrado",
      detalles: [
        "Pretina de cintura sin elástico",
        "Algodón licrado",
        "Estilo brasilero"
      ],
      beneficios: []
    }
  },

  {
    slug: "maxi-short",
    title: "Maxi Short",
    price: 19,
    image: "/productos/mujer/shorts/maxi-short-blanco1.webp",
    category: "shorts",
    fabric: "algodon",
    colors: [
      {
        name: "Blanco",
        slug: "blanco",
        hex: "#FFFFFF",
        images: [
          "/productos/mujer/shorts/maxi-short-blanco1.webp",
          "/productos/mujer/shorts/maxi-short-blanco2.webp",
          "/productos/mujer/shorts/maxi-short-blanco3.webp",
          "/productos/mujer/shorts/maxi-short-blanco4.webp"
        ]
      },
      {
        name: "Negro",
        slug: "negro",
        hex: "#000000",
        images: [
          "/productos/mujer/shorts/maxi-short-negro1.webp",
          "/productos/mujer/shorts/maxi-short-negro2.webp",
          "/productos/mujer/shorts/maxi-short-negro3.webp",
          "/productos/mujer/shorts/maxi-short-negro4.webp"
        ]
      },
      {
        name: "Melange",
        slug: "melange",
        hex: "#9CA3AF",
        images: [
          "/productos/mujer/shorts/maxi-short-melange1.webp",
          "/productos/mujer/shorts/maxi-short-melange2.webp",
          "/productos/mujer/shorts/maxi-short-melange3.webp",
          "/productos/mujer/shorts/maxi-short-melange4.webp"
        ]
      },
      {
        name: "Beige",
        slug: "beige",
        hex: "#F5F5DC",
        images: [
          "/productos/mujer/shorts/maxi-short-beige1.webp",
          "/productos/mujer/shorts/maxi-short-beige2.webp",
          "/productos/mujer/shorts/maxi-short-beige3.webp",
          "/productos/mujer/shorts/maxi-short-beige4.webp"
        ]
      },
      {
        name: "Rojo",
        slug: "rojo",
        hex: "#D22B2B",
        images: [
          "/productos/mujer/shorts/maxi-short-rojo1.webp",
          "/productos/mujer/shorts/maxi-short-rojo2.webp",
          "/productos/mujer/shorts/maxi-short-rojo3.webp",
          "/productos/mujer/shorts/maxi-short-rojo4.webp"
        ]
      },
      {
        name: "Azul Marino",
        slug: "azul-marino",
        hex: "#1E3A8A",
        images: [
          "/productos/mujer/shorts/maxi-short-azul-marino1.webp",
          "/productos/mujer/shorts/maxi-short-azul-marino2.webp",
          "/productos/mujer/shorts/maxi-short-azul-marino3.webp",
          "/productos/mujer/shorts/maxi-short-azul-marino4.webp"
        ]
      }
    ],
    sizes: ["S", "M", "L", "XL"],
    audience: "mujer",
    tags: [
      "COD.362",
      "Colección Shorts Algodón Licrado",
      "Algodón Licrado",
      "Versión short clásico a la cintura",
      "Pierna más larga",
      "Algodón licrado"
    ],
    attributes: {
      material: "Algodón Licrado",
      detalles: [
        "Versión short clásico a la cintura",
        "Pierna más larga",
        "Algodón licrado"
      ],
      beneficios: []
    }
  },

  {
    slug: "short-clasico",
    title: "Short Clásico",
    price: 16,
    image: "/productos/mujer/shorts/short-clasico-blanco1.webp",
    category: "shorts",
    fabric: "algodon",
    colors: [
      {
        name: "Blanco",
        slug: "blanco",
        hex: "#FFFFFF",
        images: [
          "/productos/mujer/shorts/short-clasico-blanco1.webp",
          "/productos/mujer/shorts/short-clasico-blanco2.webp",
          "/productos/mujer/shorts/short-clasico-blanco3.webp",
          "/productos/mujer/shorts/short-clasico-blanco4.webp"
        ]
      },
      {
        name: "Negro",
        slug: "negro",
        hex: "#000000",
        images: [
          "/productos/mujer/shorts/short-clasico-negro1.webp",
          "/productos/mujer/shorts/short-clasico-negro2.webp",
          "/productos/mujer/shorts/short-clasico-negro3.webp",
          "/productos/mujer/shorts/short-clasico-negro4.webp"
        ]
      },
      {
        name: "Melange",
        slug: "melange",
        hex: "#9CA3AF",
        images: [
          "/productos/mujer/shorts/short-clasico-melange1.webp",
          "/productos/mujer/shorts/short-clasico-melange2.webp",
          "/productos/mujer/shorts/short-clasico-melange3.webp",
          "/productos/mujer/shorts/short-clasico-melange4.webp"
        ]
      },
      {
        name: "Beige",
        slug: "beige",
        hex: "#F5F5DC",
        images: [
          "/productos/mujer/shorts/short-clasico-beige1.webp",
          "/productos/mujer/shorts/short-clasico-beige2.webp",
          "/productos/mujer/shorts/short-clasico-beige3.webp",
          "/productos/mujer/shorts/short-clasico-beige4.webp"
        ]
      },
      {
        name: "Azul Marino",
        slug: "azul-marino",
        hex: "#1E3A8A",
        images: [
          "/productos/mujer/shorts/short-clasico-azul-marino1.webp",
          "/productos/mujer/shorts/short-clasico-azul-marino2.webp",
          "/productos/mujer/shorts/short-clasico-azul-marino3.webp",
          "/productos/mujer/shorts/short-clasico-azul-marino4.webp"
        ]
      }
    ],
    sizes: ["S", "M", "L", "XL"],
    audience: "mujer",
    tags: [
      "COD.360",
      "Colección Shorts Algodón Licrado",
      "Algodón Licrado",
      "Modelo clásico a la cintura",
      "Algodón licrado"
    ],
    attributes: {
      material: "Algodón Licrado",
      detalles: [
        "Modelo clásico a la cintura",
        "Algodón licrado"
      ],
      beneficios: []
    }
  },

  {
    slug: "mini-short",
    title: "Mini Short",
    price: 16,
    image: "/productos/mujer/shorts/mini-short-blanco1.webp",
    category: "shorts",
    fabric: "algodon",
    colors: [
      {
        name: "Blanco",
        slug: "blanco",
        hex: "#FFFFFF",
        images: [
          "/productos/mujer/shorts/mini-short-blanco1.webp",
          "/productos/mujer/shorts/mini-short-blanco2.webp",
          "/productos/mujer/shorts/mini-short-blanco3.webp",
          "/productos/mujer/shorts/mini-short-blanco4.webp"
        ]
      },
      {
        name: "Negro",
        slug: "negro",
        hex: "#000000",
        images: [
          "/productos/mujer/shorts/mini-short-negro1.webp",
          "/productos/mujer/shorts/mini-short-negro2.webp",
          "/productos/mujer/shorts/mini-short-negro3.webp",
          "/productos/mujer/shorts/mini-short-negro4.webp"
        ]
      },
      {
        name: "Melange",
        slug: "melange",
        hex: "#9CA3AF",
        images: [
          "/productos/mujer/shorts/mini-short-melange1.webp",
          "/productos/mujer/shorts/mini-short-melange2.webp",
          "/productos/mujer/shorts/mini-short-melange3.webp",
          "/productos/mujer/shorts/mini-short-melange4.webp"
        ]
      },
      {
        name: "Beige",
        slug: "beige",
        hex: "#F5F5DC",
        images: [
          "/productos/mujer/shorts/mini-short-beige1.webp",
          "/productos/mujer/shorts/mini-short-beige2.webp",
          "/productos/mujer/shorts/mini-short-beige3.webp",
          "/productos/mujer/shorts/mini-short-beige4.webp"
        ]
      },
      {
        name: "Rojo",
        slug: "rojo",
        hex: "#D22B2B",
        images: [
          "/productos/mujer/shorts/mini-short-rojo1.webp",
          "/productos/mujer/shorts/mini-short-rojo2.webp",
          "/productos/mujer/shorts/mini-short-rojo3.webp",
          "/productos/mujer/shorts/mini-short-rojo4.webp"
        ]
      },
      {
        name: "Azul Marino",
        slug: "azul-marino",
        hex: "#1E3A8A",
        images: [
          "/productos/mujer/shorts/mini-short-azul-marino1.webp",
          "/productos/mujer/shorts/mini-short-azul-marino2.webp",
          "/productos/mujer/shorts/mini-short-azul-marino3.webp",
          "/productos/mujer/shorts/mini-short-azul-marino4.webp"
        ]
      }
    ],
    sizes: ["S", "M", "L", "XL"],
    audience: "mujer",
    tags: [
      "COD.361",
      "Colección Shorts Algodón Licrado",
      "Algodón Licrado",
      "Cintura semi baja",
      "Pretina en la pierna",
      "Algodón licrado"
    ],
    attributes: {
      material: "Algodón Licrado",
      detalles: [
        "Cintura semi baja",
        "Pretina en la pierna",
        "Algodón licrado"
      ],
      beneficios: []
    }
  },

  // PRODUCTOS PARA NIÑA (preservados del archivo original)
  {
  slug: string
  title: string
  price: number
  image: string // path under /public/productos/<category>/<slug>.jpg
  category: "leggings" | "bikers" | "shorts" | "tops" | "bodys" | "camisetas" | "enterizos" | "pescador" | "torero"
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
    price: 35,
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
    slug: "top-minerva",
    title: "Top Minerva",
    price: 38,
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
    slug: "top-astrid",
    title: "Top Astrid",
    price: 38,
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
    price: 27,
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
    slug: "top-tira-fijas",
    title: "Top tira fijas",
    price: 17,
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
    slug: "top-athena",
    title: "Top Athena",
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
    slug: "top-jolie",
    title: "Top Jolie",
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
    slug: "top-brigid",
    title: "Top Brigid",
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

  // LEGGINGS (suplex)
  {
    slug: "legging-slim-suplex-perchado",
    title: "Legging Slim Suplex Perchado",
    price: 42,
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

  // PESCADOR (suplex)
  {
    slug: "pescador-realce",
    title: "Pescador realce",
    price: 46,
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
  }

]

export const allProducts = products
