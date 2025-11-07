"use client"
import { useState, useRef, useEffect, useLayoutEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import WishlistHeart from "@/components/WishlistHeart"
import { useImageDebug } from "@/contexts/ImageDebugContext"
import { useImageTransform } from "@/hooks/useImageTransform"
import { parseImagePath } from "@/lib/imageTransformUtils"
import { useImageFraming } from "@/contexts/ImageFramingContext"

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
  "enterizo-manga-cero": { scale: 1.00, translateY: -33, translateX: 0 },
  "legging-harmony": { scale: 1.05, translateY: -29, translateX: 0 },
  "pescador-realce": { scale: 1.00, translateY: -20, translateX: 0 },
  "torero-energy": { scale: 1.00, translateY: 0, translateX: 0 },
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
  const { values } = useImageDebug()
  const containerRef = useRef<HTMLDivElement>(null)
  const [containerWidth, setContainerWidth] = useState<number | null>(null)

  // ✅ Modo Framing
  const { isFramingMode, selectedImage, setSelectedImage } = useImageFraming()

  // ✅ SIEMPRE parsear la imagen principal para obtener el transform correcto
  const { productSlug: imageParsedSlug, colorSlug, imageIndex } = parseImagePath(displayImage)
  const actualProductSlug = imageParsedSlug || slug

  // ✅ Usar hook para obtener transform del debugger (MÁXIMA PRIORIDAD)
  const { transform: debuggerTransform, isMounted } = useImageTransform(actualProductSlug, colorSlug || '', imageIndex, 'card')

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

  // ✅ Check si este producto está seleccionado
  const isSelected =
    isFramingMode &&
    selectedImage?.productSlug === actualProductSlug &&
    selectedImage?.colorSlug === colorSlug &&
    selectedImage?.imageIndex === imageIndex

  // ✅ Handler para seleccionar este producto en modo framing
  const handleFramingClick = (e: React.MouseEvent) => {
    if (isFramingMode) {
      e.preventDefault()
      e.stopPropagation()
      setSelectedImage({
        productSlug: actualProductSlug,
        colorSlug: colorSlug || '',
        imageIndex,
        imagePath: currentImage,
        context: 'card',
        containerWidth: containerWidth || 350 // ✅ Usar valor medido o fallback
      })
    }
  }

  // SOLUCIÓN DEFINITIVA: scale + translateY + translateX para mover físicamente la imagen
  const getImageStyle = () => {
    const productSlug = slug.toLowerCase()
    const imagePath = displayImage.toLowerCase()
    const hoverScale = isHovering ? 1.05 : 1

    // ✅ PRIORIDAD 0 (MÁXIMA): Transform desde el debugger - ESCALADO PROPORCIONAL AL CONTENEDOR
    // ⚠️ CRÍTICO: NO aplicar transform hasta que hayamos medido el contenedor (evita flash)
    if (debuggerTransform && containerWidth !== null) {
      // ✅ USAR EL CONTAINER WIDTH GUARDADO (cuando se ajustó originalmente)
      const baseContainerSize = debuggerTransform.containerWidth || 350
      const scaleFactor = containerWidth / baseContainerSize

      // Aplicar los valores EXACTOS del usuario, pero escalados proporcionalmente
      const scaledX = debuggerTransform.x * scaleFactor
      const scaledY = debuggerTransform.y * scaleFactor

      return {
        transform: `translate(${scaledX}px, ${scaledY}px) scale(${debuggerTransform.scale * hoverScale})`,
        transformOrigin: 'center center'
      }
    }

    // ✅ PRIORIDAD 1: Buscar override PERMANENTE específico del producto
    const permanentOverride = PRODUCT_OVERRIDES[slug]
    if (permanentOverride) {
      return {
        transform: `scale(${permanentOverride.scale * hoverScale}) translateY(${permanentOverride.translateY}%) translateX(${permanentOverride.translateX}%)`,
        transformOrigin: productSlug.includes('top') || productSlug.includes('camiseta') || productSlug.includes('body')
          ? 'center top'
          : 'center bottom'
      }
    }

    // ✅ PRIORIDAD 2: Valores generales por tipo de producto (fallback) - SOLO DESKTOP
    // Detectar si es producto de niña
    const isGirlProduct = productSlug.includes('nina') || imagePath.includes('nina')

    // Productos superiores: ZOOM + MOVER ARRIBA para mostrar cara + producto
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
          transform: `scale(${values.girlTopScale * hoverScale}) translateY(${values.girlTopTranslateY}%) translateX(${values.girlTopTranslateX}%)`,
          transformOrigin: 'center top'
        }
      }

      return {
        transform: `scale(${values.cardTopScale * hoverScale}) translateY(${values.cardTopTranslateY}%) translateX(${values.cardTopTranslateX}%)`,
        transformOrigin: 'center top'
      }
    }

    // Productos inferiores: ZOOM + MOVER ABAJO para mostrar piernas
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
          transform: `scale(${values.girlBottomScale * hoverScale}) translateY(${values.girlBottomTranslateY}%) translateX(${values.girlBottomTranslateX}%)`,
          transformOrigin: 'center bottom'
        }
      }

      return {
        transform: `scale(${values.cardBottomScale * hoverScale}) translateY(${values.cardBottomTranslateY}%) translateX(${values.cardBottomTranslateX}%)`,
        transformOrigin: 'center bottom'
      }
    }

    // Default: solo zoom
    return {
      transform: `scale(${isHovering ? 1.1 : 1})`,
      transformOrigin: 'center center'
    }
  }

  // ✅ Renderizar contenido del card
  const renderCardContent = () => (
    <>
      <div
        ref={containerRef}
        className={`relative aspect-[3/4] w-full overflow-hidden rounded-md transition-all ${
          isFramingMode ? 'ring-2 ring-blue-400 ring-offset-2 hover:ring-blue-600' : ''
        } ${isSelected ? 'ring-4 ring-blue-600 ring-offset-4' : ''}`}
        onMouseEnter={() => !isOutOfStock && setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <Image
          src={currentImage}
          alt={title}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          quality={90}
          className={`object-cover ${!isMounted ? '[transition:none!important]' : ''}`}
          style={getImageStyle()}
        />

        {/* ✅ Indicador de modo framing */}
        {isFramingMode && (
          <div className="absolute top-2 right-2 bg-blue-600 text-white px-2 py-1 rounded text-[10px] font-medium shadow-lg">
            Click para ajustar
          </div>
        )}

        {!isFramingMode && <WishlistHeart slug={slug} />}

        {/* Badge NUEVO o OFERTA - Paleta unificada negra (menos invasivo) */}
        {badge && !isOutOfStock && (
          <span className={`absolute left-2 bottom-2 rounded-sm px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide shadow-sm ${
            badge === "nuevo"
              ? "bg-black/70 text-white"
              : "bg-black/70 text-red-400"
          }`}>
            {badge === "nuevo" ? "Nuevo" : "Oferta"}
          </span>
        )}

        {/* Badge AGOTADO - Paleta unificada */}
        {isOutOfStock && (
          <>
            <div className="absolute inset-0 bg-black/10" />
            <span className="absolute bottom-2 left-2 bg-black/75 text-white px-2 py-1 text-[11px] font-medium uppercase tracking-wide rounded-sm shadow-sm">
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
    </>
  )

  // ✅ Renderizar con wrapper condicional
  if (isFramingMode) {
    return (
      <div className="group block cursor-crosshair" onClick={handleFramingClick}>
        {renderCardContent()}
      </div>
    )
  }

  return (
    <Link href={href} className="group block">
      {renderCardContent()}
    </Link>
  )
}
