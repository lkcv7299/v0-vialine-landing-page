/**
 * Extrae el slug del producto, color e índice de imagen desde una ruta de imagen
 * Ejemplo: "/productos/mujer/tops/top-luna-blanco2.webp" → { productSlug: "top-luna", colorSlug: "blanco", imageIndex: 1 }
 */
export function parseImagePath(imagePath: string): {
  productSlug: string | null
  colorSlug: string | null
  imageIndex: number
} {
  try {
    // Extraer el nombre del archivo desde la ruta
    const fileName = imagePath.split('/').pop()
    if (!fileName) return { productSlug: null, colorSlug: null, imageIndex: 0 }

    // Remover extensión
    const nameWithoutExt = fileName.replace(/\.(webp|jpg|jpeg|png)$/i, '')

    // Patrón: producto-color#
    // Ejemplo: top-luna-blanco2 → producto: top-luna, color: blanco, index: 2 (1 en base 0)
    const match = nameWithoutExt.match(/^(.+)-([a-z]+)(\d+)$/i)

    if (match) {
      const [, productSlug, colorSlug, imageNumber] = match
      return {
        productSlug,
        colorSlug,
        imageIndex: parseInt(imageNumber) - 1 // Convertir a base 0
      }
    }

    // Si no matchea el patrón con número, asumir índice 0
    const matchWithoutNumber = nameWithoutExt.match(/^(.+)-([a-z]+)$/i)
    if (matchWithoutNumber) {
      const [, productSlug, colorSlug] = matchWithoutNumber
      return {
        productSlug,
        colorSlug,
        imageIndex: 0
      }
    }

    return { productSlug: null, colorSlug: null, imageIndex: 0 }
  } catch (e) {
    return { productSlug: null, colorSlug: null, imageIndex: 0 }
  }
}
