/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    // ✅ CAMBIADO: Habilitar optimización de imágenes
    // unoptimized: true, // ❌ ELIMINAR ESTO
    formats: ['image/avif', 'image/webp'], // Formatos modernos y más ligeros
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60, // Cache por 60 segundos
  },
  // Optimizaciones adicionales
  compress: true, // Comprimir respuestas
}

export default nextConfig
