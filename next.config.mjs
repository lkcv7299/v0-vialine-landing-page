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

  // ✅ PERFORMANCE: Optimizaciones adicionales
  compress: true, // Comprimir respuestas con gzip

  // ✅ VERCEL: Exclude product images from serverless functions
  // Images are served as static assets, not bundled in functions
  outputFileTracingExcludes: {
    '*': [
      'public/products/**/*',
      'public/productos/**/*',
    ],
  },

  // ✅ PERFORMANCE: Reduce bundle size by optimizing package imports
  experimental: {
    optimizePackageImports: [
      'lucide-react',
      '@headlessui/react',
      'sonner',
    ],
  },

  // ✅ PERFORMANCE: Webpack optimizations
  webpack: (config, { isServer }) => {
    // Split chunks más agresivamente para mejor caching
    if (!isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          default: false,
          vendors: false,
          // Vendor chunk para node_modules
          vendor: {
            name: 'vendor',
            chunks: 'all',
            test: /node_modules/,
            priority: 20,
          },
          // Chunk separado para librerías grandes
          lib: {
            test(module) {
              return (
                module.size() > 160000 &&
                /node_modules/.test(module.identifier())
              )
            },
            name(module) {
              const packageNameMatch = module.identifier().match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)
              const packageName = packageNameMatch ? packageNameMatch[1] : ''
              return `lib.${packageName.replace('@', '')}`
            },
            priority: 30,
            minChunks: 1,
          },
          // Chunk común para código compartido
          common: {
            minChunks: 2,
            priority: 10,
            reuseExistingChunk: true,
          },
        },
      }
    }
    return config
  },
}

export default nextConfig
