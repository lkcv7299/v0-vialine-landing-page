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
  // LEGGINGS
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
  
  // TOPS
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
  
  // CAMISETAS
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
  
  // SHORTS
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
  
  // BODYS
  {
    id: 10,
    productSlug: "body-manga-larga",
    author: "Camila V.",
    rating: 5,
    date: "2025-09-13",
    comment: "¡Me fascina! Queda ajustado sin apretar, perfecto para combinar con jeans o con shorts.",
    verified: true,
  },
  
  // PRODUCTOS NIÑA
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