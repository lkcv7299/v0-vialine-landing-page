export type Review = {
  id: number
  productSlug: string
  author: string
  rating: 1 | 2 | 3 | 4 | 5
  date: string
  comment: string
  verified: boolean
}

export const reviews: Review[] = [
  // ========================================
  // LEGGINGS MUJER (13 reviews)
  // ========================================
  {
    id: 1,
    productSlug: "legging-slim",
    author: "María L.",
    rating: 5,
    date: "2025-09-15",
    comment: "Excelente calidad, súper cómodo y no se transparenta. Lo uso para el gym y para salir. ¡Lo recomiendo 100%!",
    verified: true,
  },
  {
    id: 2,
    productSlug: "legging-slim",
    author: "Andrea R.",
    rating: 5,
    date: "2025-09-10",
    comment: "Me encanta, la tela es de muy buena calidad y el tiro alto queda perfecto. Ya compré en otros colores.",
    verified: true,
  },
  {
    id: 3,
    productSlug: "legging-clasica",
    author: "Sofia M.",
    rating: 5,
    date: "2025-09-20",
    comment: "Perfectas para yoga, se ajustan bien y no se marcan. La entrega fue rápida.",
    verified: true,
  },
  {
    id: 13,
    productSlug: "legging-slim-suplex-perchado",
    author: "Isabella F.",
    rating: 5,
    date: "2025-09-22",
    comment: "La tela perchada es ideal para entrenar en las mañanas frías. Muy cómoda y no se transparenta nada.",
    verified: true,
  },
  {
    id: 14,
    productSlug: "legging-functional",
    author: "Natalia P.",
    rating: 5,
    date: "2025-09-19",
    comment: "Me encanta el diseño funcional, tiene bolsillos laterales súper prácticos. Perfecta para correr.",
    verified: true,
  },
  {
    id: 15,
    productSlug: "legging-functional",
    author: "Fernanda G.",
    rating: 4,
    date: "2025-09-14",
    comment: "Muy buena, la compresión es perfecta. Solo le pondría un bolsillo trasero también.",
    verified: true,
  },
  {
    id: 16,
    productSlug: "legging-harmony",
    author: "Valeria S.",
    rating: 5,
    date: "2025-09-25",
    comment: "La tela se siente premium, se ajusta como un guante. Ya pedí otra en otro color.",
    verified: true,
  },
  {
    id: 17,
    productSlug: "legging-harmony",
    author: "Claudia R.",
    rating: 5,
    date: "2025-09-11",
    comment: "Increíble calidad-precio. Las uso para entrenar y para el día a día. Súper versátiles.",
    verified: true,
  },
  {
    id: 18,
    productSlug: "legging-realce-fresh-terry",
    author: "Monica H.",
    rating: 5,
    date: "2025-09-08",
    comment: "El efecto realce es real, me encanta cómo queda. La tela es gruesa y de excelente calidad.",
    verified: true,
  },
  {
    id: 19,
    productSlug: "legging-realce-fresh-terry",
    author: "Diana L.",
    rating: 5,
    date: "2025-09-16",
    comment: "Estas son mis favoritas, estilizan mucho. La pretina es cómoda y no se baja al entrenar.",
    verified: true,
  },
  {
    id: 20,
    productSlug: "legging-slim",
    author: "Paola M.",
    rating: 5,
    date: "2025-09-05",
    comment: "Tercera vez que compro este modelo. Son las mejores leggings que he tenido.",
    verified: true,
  },
  {
    id: 21,
    productSlug: "legging-clasica",
    author: "Roxana B.",
    rating: 5,
    date: "2025-09-23",
    comment: "Relación calidad-precio insuperable. Cómodas, bonitas y duraderas.",
    verified: true,
  },
  {
    id: 22,
    productSlug: "legging-harmony",
    author: "Laura K.",
    rating: 4,
    date: "2025-09-12",
    comment: "Muy buenas, solo que el gris se ve un poco diferente a la foto. Pero igual me gustaron.",
    verified: true,
  },

  // ========================================
  // BIKERS & PESCADOR MUJER (6 reviews)
  // ========================================
  {
    id: 23,
    productSlug: "biker-luxury",
    author: "Carla V.",
    rating: 5,
    date: "2025-09-21",
    comment: "Los mejores bikers que he comprado. La tela es gruesa, no se transparenta y el ajuste es perfecto.",
    verified: true,
  },
  {
    id: 24,
    productSlug: "biker-luxury",
    author: "Jimena T.",
    rating: 5,
    date: "2025-09-18",
    comment: "Me encantan para entrenar piernas. Quedan ajustados pero sin apretar. Muy recomendados.",
    verified: true,
  },
  {
    id: 25,
    productSlug: "biker-slim",
    author: "Alessandra M.",
    rating: 5,
    date: "2025-09-13",
    comment: "Perfectos para running, no se suben. La compresión es ideal.",
    verified: true,
  },
  {
    id: 26,
    productSlug: "pescador-slim",
    author: "Beatriz C.",
    rating: 5,
    date: "2025-09-19",
    comment: "El largo es perfecto, justo debajo de la rodilla. Cómodos y frescos para verano.",
    verified: true,
  },
  {
    id: 27,
    productSlug: "pescador-slim",
    author: "Mariela S.",
    rating: 4,
    date: "2025-09-07",
    comment: "Buena calidad, me hubiera gustado que tuvieran bolsillos laterales.",
    verified: true,
  },
  {
    id: 28,
    productSlug: "biker-slim",
    author: "Daniela R.",
    rating: 5,
    date: "2025-09-24",
    comment: "Son mis favoritos para spinning. Se sienten como una segunda piel.",
    verified: true,
  },

  // ========================================
  // SHORTS MUJER (4 reviews)
  // ========================================
  {
    id: 8,
    productSlug: "short-slim",
    author: "Daniela S.",
    rating: 5,
    date: "2025-09-16",
    comment: "Quedan increíbles, no se suben y el largo es perfecto. Los uso para entrenar y para la playa.",
    verified: true,
  },
  {
    id: 9,
    productSlug: "short-lux",
    author: "Gabriela T.",
    rating: 4,
    date: "2025-09-11",
    comment: "Muy buenos, la tela es gruesa y de calidad. Me hubiera gustado un poco más de compresión.",
    verified: true,
  },
  {
    id: 29,
    productSlug: "short-brasilia",
    author: "Luciana P.",
    rating: 5,
    date: "2025-09-20",
    comment: "Perfectos para el gym. La pretina se mantiene en su lugar y la tela no se transparenta.",
    verified: true,
  },
  {
    id: 30,
    productSlug: "short-slim",
    author: "Cecilia N.",
    rating: 5,
    date: "2025-09-09",
    comment: "Los uso todo el verano, son frescos y cómodos. Ya compré varios.",
    verified: true,
  },

  // ========================================
  // TOPS MUJER (8 reviews)
  // ========================================
  {
    id: 4,
    productSlug: "top-soporte",
    author: "Valentina P.",
    rating: 5,
    date: "2025-09-12",
    comment: "El soporte es increíble, puedo hacer cardio sin problemas. Muy cómodo y bonito.",
    verified: true,
  },
  {
    id: 5,
    productSlug: "top-deportivo",
    author: "Carolina G.",
    rating: 4,
    date: "2025-09-08",
    comment: "Buena calidad, aunque me gustaría que tuviera más colores disponibles.",
    verified: true,
  },
  {
    id: 31,
    productSlug: "top-athena",
    author: "Renata F.",
    rating: 5,
    date: "2025-09-17",
    comment: "Hermoso diseño y muy cómodo. El soporte es bueno para entrenamientos de intensidad media.",
    verified: true,
  },
  {
    id: 32,
    productSlug: "top-jolie",
    author: "Adriana L.",
    rating: 5,
    date: "2025-09-21",
    comment: "Me encanta el diseño elegante. Perfecto para yoga y pilates.",
    verified: true,
  },
  {
    id: 33,
    productSlug: "top-brigid",
    author: "Sandra M.",
    rating: 5,
    date: "2025-09-14",
    comment: "El algodón es muy suave, ideal para uso diario. La calidad es excelente.",
    verified: true,
  },
  {
    id: 34,
    productSlug: "top-arena",
    author: "Pamela R.",
    rating: 5,
    date: "2025-09-10",
    comment: "Súper cómodo y versátil. Lo uso para entrenar y también casual con jeans.",
    verified: true,
  },
  {
    id: 35,
    productSlug: "top-soporte",
    author: "Melissa V.",
    rating: 5,
    date: "2025-09-06",
    comment: "Segundo que compro. El soporte es realmente bueno para running.",
    verified: true,
  },
  {
    id: 36,
    productSlug: "top-athena",
    author: "Julia S.",
    rating: 4,
    date: "2025-09-18",
    comment: "Bonito y cómodo, aunque el rojo es más oscuro de lo que esperaba.",
    verified: true,
  },

  // ========================================
  // BODYS MUJER (4 reviews)
  // ========================================
  {
    id: 10,
    productSlug: "body-manga-larga",
    author: "Camila V.",
    rating: 5,
    date: "2025-09-13",
    comment: "¡Me fascina! Queda ajustado sin apretar, perfecto para combinar con jeans o con shorts.",
    verified: true,
  },
  {
    id: 37,
    productSlug: "body-manga-corta",
    author: "Lorena P.",
    rating: 5,
    date: "2025-09-22",
    comment: "El ajuste es perfecto, define muy bien la figura. La tela es de excelente calidad.",
    verified: true,
  },
  {
    id: 38,
    productSlug: "body-tiras",
    author: "Vanessa K.",
    rating: 5,
    date: "2025-09-15",
    comment: "Hermoso y muy cómodo. Lo uso con todo, es super versátil.",
    verified: true,
  },
  {
    id: 39,
    productSlug: "body-manga-larga",
    author: "Erika M.",
    rating: 5,
    date: "2025-09-08",
    comment: "Ya es mi tercero. Son lo máximo, no se salen ni se suben. Perfecto para todo.",
    verified: true,
  },

  // ========================================
  // CAMISETAS MUJER (4 reviews)
  // ========================================
  {
    id: 6,
    productSlug: "camiseta-cuello-alto",
    author: "Lucia F.",
    rating: 5,
    date: "2025-09-18",
    comment: "Suavísima, el algodón es de primera. La uso todo el tiempo, super fresca.",
    verified: true,
  },
  {
    id: 7,
    productSlug: "camiseta-manga-larga",
    author: "Patricia H.",
    rating: 5,
    date: "2025-09-14",
    comment: "Me encanta, queda perfecta y la tela es muy suave. Excelente compra.",
    verified: true,
  },
  {
    id: 40,
    productSlug: "camiseta-basica",
    author: "Teresa L.",
    rating: 5,
    date: "2025-09-20",
    comment: "La uso para todo, es súper cómoda y el algodón es de calidad premium.",
    verified: true,
  },
  {
    id: 41,
    productSlug: "camiseta-manga-corta",
    author: "Miriam S.",
    rating: 5,
    date: "2025-09-11",
    comment: "Perfecta para entrenar o para usar casual. La tela respira muy bien.",
    verified: true,
  },

  // ========================================
  // ENTERIZOS MUJER (2 reviews)
  // ========================================
  {
    id: 42,
    productSlug: "enterizo-manga-corta",
    author: "Giovanna R.",
    rating: 5,
    date: "2025-09-16",
    comment: "Hermoso enterizo, el ajuste es perfecto. Me hace sentir muy segura al entrenar.",
    verified: true,
  },
  {
    id: 43,
    productSlug: "enterizo-manga-larga",
    author: "Cristina B.",
    rating: 5,
    date: "2025-09-23",
    comment: "Muy cómodo y elegante. La calidad de la tela es excelente, no pica nada.",
    verified: true,
  },

  // ========================================
  // PRODUCTOS NIÑA (6 reviews)
  // ========================================
  {
    id: 11,
    productSlug: "legging-nina",
    author: "Rosa M.",
    rating: 5,
    date: "2025-09-17",
    comment: "A mi hija le encantó, dice que es muy cómodo para sus clases de danza. Excelente calidad.",
    verified: true,
  },
  {
    id: 12,
    productSlug: "top-jazmin",
    author: "Elena C.",
    rating: 5,
    date: "2025-09-09",
    comment: "Hermoso y de muy buena calidad. Mi hija está feliz, se lo pone todo el tiempo.",
    verified: true,
  },
  {
    id: 44,
    productSlug: "cafarena-nina",
    author: "Carmen S.",
    rating: 5,
    date: "2025-09-19",
    comment: "Perfecto para las clases de ballet de mi hija. La tela es suave y no irrita la piel.",
    verified: true,
  },
  {
    id: 45,
    productSlug: "enterizo-manga-corta-nina",
    author: "Karina P.",
    rating: 5,
    date: "2025-09-12",
    comment: "Mi hija de 8 años está encantada. Lo usa para danza y también para jugar.",
    verified: true,
  },
  {
    id: 46,
    productSlug: "short-juvenil-nina",
    author: "Veronica M.",
    rating: 5,
    date: "2025-09-24",
    comment: "Excelente para el verano. Mi hija dice que son los más cómodos que tiene.",
    verified: true,
  },
  {
    id: 47,
    productSlug: "panty-nina",
    author: "Angela R.",
    rating: 5,
    date: "2025-09-07",
    comment: "Calidad premium, la tela es suave y resistente. Ya pedí más en otros colores.",
    verified: true,
  },
]

// Función para obtener reviews de un producto
export function getProductReviews(productSlug: string): Review[] {
  return reviews.filter(review => review.productSlug === productSlug)
}

// Función para calcular rating promedio
export function getAverageRating(productSlug: string): number {
  const productReviews = getProductReviews(productSlug)
  if (productReviews.length === 0) return 0
  
  const sum = productReviews.reduce((acc, review) => acc + review.rating, 0)
  return Math.round((sum / productReviews.length) * 10) / 10 // Redondear a 1 decimal
}

// Función para contar total de reviews
export function getReviewCount(productSlug: string): number {
  return getProductReviews(productSlug).length
}