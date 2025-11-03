/**
 * Helper functions for asset path generation
 */

import type { Product } from '@/data/products'

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

/**
 * Gets the image for a specific color variant from the product data
 * @param product - The product object
 * @param selectedColor - The selected color name (e.g., "Blanco", "Negro")
 * @param index - Image index (default: 0 for first image)
 * @returns The image path for the selected color, or the default product image as fallback
 */
export function getProductColorImage(product: Product, selectedColor: string, index = 0): string {
  // If colors is an array of objects (new format with images)
  if (Array.isArray(product.colors) && product.colors.length > 0) {
    const colorObj = product.colors.find((c: any) =>
      typeof c === 'object' && c.name === selectedColor
    )

    if (colorObj && typeof colorObj === 'object') {
      // If the color has an images array
      if (colorObj.images && Array.isArray(colorObj.images) && colorObj.images[index]) {
        return colorObj.images[index]
      }
      // If the color has a single image property
      if (colorObj.image) {
        return colorObj.image
      }
    }
  }

  // Fallback to the default product image
  return product.image
}
