// app/sitemap.ts
import { MetadataRoute } from 'next'
import { products } from '@/data/products'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://vialine.pe'
  
  // Páginas estáticas principales
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/mujer`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/nina`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/pages/guia-de-tallas`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/pages/envios-y-devoluciones`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
  ]

  // Categorías de mujer
  const categoriasMujer = ['leggings', 'shorts', 'pescador', 'torero', 'bodys', 'enterizos', 'tops', 'camisetas']
  const categoriasPages = categoriasMujer.map(cat => ({
    url: `${baseUrl}/shop/mujer/${cat}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  // Categorías de niña
  const categoriasNina = ['cafarenas', 'enterizos', 'leggings', 'pantys', 'shorts', 'tops']
  const categoriasNinaPages = categoriasNina.map(cat => ({
    url: `${baseUrl}/shop/nina/${cat}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  // Productos individuales
  const productPages = products.map(product => ({
    url: `${baseUrl}/producto/${product.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  return [
    ...staticPages,
    ...categoriasPages,
    ...categoriasNinaPages,
    ...productPages,
  ]
}