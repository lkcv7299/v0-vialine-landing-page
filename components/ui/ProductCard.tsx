"use client"
import { useState, useRef, useLayoutEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import WishlistHeart from "@/components/WishlistHeart"
import { useImageTransform } from "@/hooks/useImageTransform"
import { parseImagePath } from "@/lib/imageTransformUtils"

// ✅ PRODUCT-SPECIFIC OVERRIDES - Ajustes visuales permanentes para productos específicos
const PRODUCT_OVERRIDES: { [slug: string]: { scale: number; translateY: number; translateX: number } } = {
  "short-slim": { scale: 1.00, translateY: -20, translateX: 0 },
  "camiseta-tropical": { scale: 1.00, translateY: 3, translateX: 1 },
  "maxi-short": { scale: 1.05, translateY: 0, translateX: 0 },
  "body-manga-corta": { scale: 1.00, translateY: -1, translateX: 0 },
  "top-minerva": { scale: 1.00, translateY: -12, translateX: -1 },
  "top-soporte": { scale: 1.00, translateY: -20, translateX: 0 },
  "top-perla": { scale: 1.00, translateY: -4, translateX: 1 },
  "top-athena": { scale: 1.00, translateY: -5, translateX: 0 },
  "top-luna": { scale: 1.50, translateY: 15, translateX: 2 },
  "enterizo-manga-cero": { scale: 1.00, translateY: 0, translateX: 0 },
  "legging-harmony": { scale: 1.05, translateY: -29, translateX: 0 },
  "pescador-realce": { scale: 1.00, translateY: -20, translateX: 0 },
  "torero-energy": { scale: 1.00, translateY: 0, translateX: 0 },
  "camiseta-tiras-fijas": { scale: 1.00, translateY: 0, translateX: 0 },
  "straple-chanel": { scale: 1.00, translateY: 0, translateX: 0 },
  "top-deportivo": { scale: 1.00, translateY: 0, translateX: 0 },
  "top-tira-fijas": { scale: 1.00, translateY: 0, translateX: 0 },
}

// Valores por defecto para fallback (antes estaban en ImageDebugContext)
const DEFAULT_VALUES = {
  cardTopScale: 1,
  cardTopTranslateY: 0,
  cardTopTranslateX: 0,
  cardBottomScale: 1,
  cardBottomTranslateY: 0,
  cardBottomTranslateX: 0,
  girlTopScale: 1,
  girlTopTranslateY: 0,
  girlTopTranslateX: 0,
  girlBottomScale: 1,
  girlBottomTranslateY: 0,
  girlBottomTranslateX: 0,
}

type Props = {
  href: string
  title: string
  price: number
  image: string
  hoverImage?: string | null
  badge?: "nuevo" | "oferta"
  slug: string
  fallbackImage?: string
  originalPrice?: number
  inventory?: number
}

export default function ProductCard({ href, title, price, image, hoverImage, badge, slug, fallbackImage, originalPrice, inventory }: Props) {
  const [isHovering, setIsHovering] = useState(false)
  const displayImage = image || fallbackImage || "/placeholder.svg"
  const isOutOfStock = inventory === 0
  const containerRef = useRef<HTMLDivElement>(null)
  const [containerWidth, setContainerWidth] = useState<number | null>(null)

  // ✅ SIEMPRE parsear la imagen principal para obtener el transform correcto
  const { productSlug: imageParsedSlug, colorSlug, imageIndex } = parseImagePath(displayImage)
  const actualProductSlug = imageParsedSlug || slug

  // ✅ Usar hook para obtener transform guardado
  const { transform: savedTransform, isMounted } = useImageTransform(actualProductSlug, colorSlug || '', imageIndex, 'card')

  // ✅ USAR useLayoutEffect para medir ANTES del primer paint (evita flash)
  useLayoutEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth)
      }
    }

    updateSize()
    window.addEventListener('resize', updateSize)
    return () => window.removeEventListener('resize', updateSize)
  }, [])

  // Usar hover image si está disponible y estamos hovering
  const currentImage = isHovering && hoverImage ? hoverImage : displayImage

  // SOLUCIÓN DEFINITIVA: scale + translateY + translateX para mover físicamente la imagen
  const getImageStyle = () => {
    const productSlug = slug.toLowerCase()
    const imagePath = displayImage.toLowerCase()

    // ✅ PRIORIDAD 0 (MÁXIMA): Transform guardado - ESCALADO PROPORCIONAL AL CONTENEDOR
    if (savedTransform) {
      // ⚠️ CRÍTICO: Si tenemos transform pero no hemos medido el contenedor, NO aplicar NINGÚN transform
      if (containerWidth === null) {
        return {
          transform: 'none',
          transformOrigin: 'center center'
        }
      }

      // ✅ USAR EL CONTAINER WIDTH GUARDADO (cuando se ajustó originalmente)
      const baseContainerSize = savedTransform.containerWidth || 350
      const scaleFactor = containerWidth / baseContainerSize

      // Aplicar los valores EXACTOS, pero escalados proporcionalmente
      const scaledX = savedTransform.x * scaleFactor
      const scaledY = savedTransform.y * scaleFactor

      return {
        transform: `translate(${scaledX}px, ${scaledY}px) scale(${savedTransform.scale})`,
        transformOrigin: 'center center'
      }
    }

    // ✅ PRIORIDAD 1: Buscar override PERMANENTE específico del producto
    const permanentOverride = PRODUCT_OVERRIDES[slug]
    if (permanentOverride) {
      return {
        transform: `scale(${permanentOverride.scale}) translateY(${permanentOverride.translateY}%) translateX(${permanentOverride.translateX}%)`,
        transformOrigin: productSlug.includes('top') || productSlug.includes('camiseta') || productSlug.includes('body')
          ? 'center top'
          : 'center bottom'
      }
    }

    // ✅ PRIORIDAD 2: Valores generales por tipo de producto (fallback)
    const isGirlProduct = productSlug.includes('nina') || imagePath.includes('nina')

    // Productos superiores
    if (productSlug.includes('camiseta') ||
        productSlug.includes('top') ||
        productSlug.includes('body') ||
        productSlug.includes('enterizo') ||
        imagePath.includes('camiseta') ||
        imagePath.includes('top') ||
        imagePath.includes('body') ||
        imagePath.includes('enterizo')) {

      if (isGirlProduct) {
        return {
          transform: `scale(${DEFAULT_VALUES.girlTopScale}) translateY(${DEFAULT_VALUES.girlTopTranslateY}%) translateX(${DEFAULT_VALUES.girlTopTranslateX}%)`,
          transformOrigin: 'center top'
        }
      }

      return {
        transform: `scale(${DEFAULT_VALUES.cardTopScale}) translateY(${DEFAULT_VALUES.cardTopTranslateY}%) translateX(${DEFAULT_VALUES.cardTopTranslateX}%)`,
        transformOrigin: 'center top'
      }
    }

    // Productos inferiores
    if (productSlug.includes('legging') ||
        productSlug.includes('short') ||
        productSlug.includes('biker') ||
        productSlug.includes('pantalon') ||
        imagePath.includes('legging') ||
        imagePath.includes('short') ||
        imagePath.includes('biker') ||
        imagePath.includes('pantalon')) {

      if (isGirlProduct) {
        return {
          transform: `scale(${DEFAULT_VALUES.girlBottomScale}) translateY(${DEFAULT_VALUES.girlBottomTranslateY}%) translateX(${DEFAULT_VALUES.girlBottomTranslateX}%)`,
          transformOrigin: 'center bottom'
        }
      }

      return {
        transform: `scale(${DEFAULT_VALUES.cardBottomScale}) translateY(${DEFAULT_VALUES.cardBottomTranslateY}%) translateX(${DEFAULT_VALUES.cardBottomTranslateX}%)`,
        transformOrigin: 'center bottom'
      }
    }

    // Default: sin transformación
    return {
      transform: 'none',
      transformOrigin: 'center center'
    }
  }

  return (
    <Link href={href} className="group block">
      <div
        ref={containerRef}
        className="relative aspect-[3/4] w-full overflow-hidden rounded-md"
        style={{ backgroundColor: '#FFFFFF' }}
        onMouseEnter={() => !isOutOfStock && setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <Image
          src={currentImage}
          alt={title}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          quality={75}
          loading="lazy"
          className={`object-contain ${!isMounted ? '[transition:none!important]' : ''}`}
          style={getImageStyle()}
        />

        <WishlistHeart slug={slug} />

        {/* Badge NUEVO o OFERTA */}
        {badge && !isOutOfStock && (
          <span className={`absolute left-2 bottom-2 rounded-sm px-2 py-1 text-[10px] font-semibold uppercase tracking-wide shadow-sm ${
            badge === "nuevo"
              ? "bg-neutral-900 text-white"
              : "bg-rose-600 text-white"
          }`}>
            {badge === "nuevo" ? "Nuevo" : "Oferta"}
          </span>
        )}

        {/* Badge AGOTADO */}
        {isOutOfStock && (
          <>
            <div className="absolute inset-0 bg-black/10" />
            <span className="absolute left-2 bottom-2 bg-neutral-900 text-white px-2 py-1 text-[10px] font-semibold uppercase tracking-wide rounded-sm shadow-sm">
              Agotado
            </span>
          </>
        )}
      </div>

      <div className="mt-2">
        <p className="text-[15px] leading-tight">{title}</p>
        <div className="mt-1 flex items-center gap-2">
          {originalPrice && badge === "oferta" ? (
            <>
              <p className="text-[15px] font-medium text-red-600">
                {new Intl.NumberFormat("es-PE", { style: "currency", currency: "PEN" }).format(price)}
              </p>
              <p className="text-[13px] text-neutral-500 line-through">
                {new Intl.NumberFormat("es-PE", { style: "currency", currency: "PEN" }).format(originalPrice)}
              </p>
            </>
          ) : (
            <p className="text-[15px] font-medium">
              {new Intl.NumberFormat("es-PE", { style: "currency", currency: "PEN" }).format(price)}
            </p>
          )}
        </div>
      </div>
    </Link>
  )
}
