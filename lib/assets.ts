/**
 * Helper functions for asset path generation
 */

/**
 * Generates the asset path for a product image
 * @param slug - Product slug (e.g., "legging-basico")
 * @param category - Product category (e.g., "Leggings")
 * @param color - Color variant (e.g., "Negro", "Azul")
 * @param index - Image index (0-based)
 * @returns The full path to the product image
 */
export function getAssetPath(slug: string, category: string, color: string, index = 0): string {
  // Normalize color name for filename (lowercase, no spaces)
  const normalizedColor = color.toLowerCase().replace(/\s+/g, "-")

  // Construct the path: /products/{slug}-{color}-{index}.jpg
  return `/products/${slug}-${normalizedColor}-${index}.jpg`
}

/**
 * Generates all image paths for a product variant
 * @param slug - Product slug
 * @param category - Product category
 * @param color - Color variant
 * @param count - Number of images (default: 4)
 * @returns Array of image paths
 */
export function getProductImages(slug: string, category: string, color: string, count = 4): string[] {
  return Array.from({ length: count }, (_, i) => getAssetPath(slug, category, color, i))
}
