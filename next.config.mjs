/** @type {import('next').NextConfig} */
const nextConfig = {
  // ⚠️ KNOWN ISSUE: ESLint circular dependency bug in Next.js 15 + eslint-config-next@16
  // See: https://github.com/vercel/next.js/issues/64103
  // Workaround: Disabled temporarily until Next.js releases fix
  // TypeScript strict mode is ENABLED as primary code quality check
  eslint: {
    ignoreDuringBuilds: true, // TODO: Re-enable when Next.js fixes circular dep bug
  },
  typescript: {
    ignoreBuildErrors: false, // Detectar errores de TypeScript
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
