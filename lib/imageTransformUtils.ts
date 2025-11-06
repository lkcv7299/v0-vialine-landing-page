/**
 * Extrae el slug del producto desde una ruta de imagen
 * Retorna el nombre COMPLETO del archivo sin número ni extensión
 * Ejemplo: "/productos/mujer/tops/top-luna-blanco2.webp" → { productSlug: "top-luna-blanco", colorSlug: "blanco", imageIndex: 1 }
 */
export function parseImagePath(imagePath: string): {
  productSlug: string | null
  colorSlug: string | null
  imageIndex: number
} {
  try {
    const fileName = imagePath.split('/').pop()
    if (!fileName) return { productSlug: null, colorSlug: null, imageIndex: 0 }

    // Remover extensión
    const nameWithoutExt = fileName.replace(/\.(webp|jpg|jpeg|png)$/i, '')

    // Patrón: nombre-completo-color#
    // Extraer el número final
    const matchWithNumber = nameWithoutExt.match(/^(.+?)(\d+)$/)

    if (matchWithNumber) {
      const [, fullName, imageNumber] = matchWithNumber

      // Extraer el color (última palabra después del último guion)
      const parts = fullName.split('-')
      const colorSlug = parts[parts.length - 1] || ''

      // Quitar el color del final para obtener el productSlug
      const productSlug = parts.slice(0, -1).join('-')

      return {
        productSlug, // Sin el color
        colorSlug,
        imageIndex: parseInt(imageNumber) - 1
      }
    }

    // Sin número
    const parts = nameWithoutExt.split('-')
    const colorSlug = parts[parts.length - 1] || ''
    const productSlug = parts.slice(0, -1).join('-')

    return {
      productSlug,
      colorSlug,
      imageIndex: 0
    }
  } catch (e) {
    return { productSlug: null, colorSlug: null, imageIndex: 0 }
  }
}
