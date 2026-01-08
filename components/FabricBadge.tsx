"use client"

import Link from "next/link"
import { Zap, Feather } from "lucide-react"
import { getFullFabricInfo, getFabricFamilyForSlug, LEGACY_TO_NEW_FABRIC } from "@/data/fabrics"
import type { FabricSlug as NewFabricSlug } from "@/types/fabric"

interface FabricBadgeProps {
  /** Fabric slug - supports both legacy (suplex, algodon) and new slugs */
  fabric: string
  /** Size variant */
  size?: "sm" | "md"
  /** Whether the badge should link to the fabric page */
  asLink?: boolean
  /** Show icon */
  showIcon?: boolean
  /** Additional className */
  className?: string
}

export default function FabricBadge({
  fabric,
  size = "sm",
  asLink = true,
  showIcon = true,
  className = ""
}: FabricBadgeProps) {
  // Get fabric info (works with both legacy and new slugs)
  const fabricInfo = getFullFabricInfo(fabric)
  const familyInfo = getFabricFamilyForSlug(fabric)

  if (!fabricInfo || !familyInfo) {
    // Fallback for unknown fabrics
    return (
      <span className={`inline-flex items-center gap-1 rounded-full bg-neutral-100 text-neutral-600 ${
        size === "sm" ? "px-2 py-0.5 text-xs" : "px-3 py-1 text-sm"
      } ${className}`}>
        {fabric}
      </span>
    )
  }

  const isSuplex = familyInfo.id === "suplex"
  const Icon = isSuplex ? Zap : Feather

  // Determine the href slug
  const hrefSlug = fabric in LEGACY_TO_NEW_FABRIC
    ? LEGACY_TO_NEW_FABRIC[fabric as keyof typeof LEGACY_TO_NEW_FABRIC]
    : fabric

  // Badge styling based on family
  const badgeClasses = `
    inline-flex items-center gap-1 rounded-full font-medium transition
    ${size === "sm" ? "px-2 py-0.5 text-xs" : "px-3 py-1 text-sm"}
    ${isSuplex
      ? "bg-violet-50 text-violet-700 border border-violet-200 hover:bg-violet-100"
      : "bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100"
    }
    ${className}
  `.trim()

  const content = (
    <>
      {showIcon && <Icon className={size === "sm" ? "h-3 w-3" : "h-3.5 w-3.5"} />}
      <span>{fabricInfo.shortName}</span>
    </>
  )

  if (asLink) {
    return (
      <Link href={`/tejido/${hrefSlug}`} className={badgeClasses}>
        {content}
      </Link>
    )
  }

  return (
    <span className={badgeClasses}>
      {content}
    </span>
  )
}

// Tooltip version for more info on hover
export function FabricBadgeWithTooltip({
  fabric,
  size = "sm",
  className = ""
}: Omit<FabricBadgeProps, "asLink" | "showIcon">) {
  const fabricInfo = getFullFabricInfo(fabric)
  const familyInfo = getFabricFamilyForSlug(fabric)

  if (!fabricInfo || !familyInfo) {
    return <FabricBadge fabric={fabric} size={size} asLink={false} />
  }

  const isSuplex = familyInfo.id === "suplex"
  const Icon = isSuplex ? Zap : Feather
  const hrefSlug = fabric in LEGACY_TO_NEW_FABRIC
    ? LEGACY_TO_NEW_FABRIC[fabric as keyof typeof LEGACY_TO_NEW_FABRIC]
    : fabric

  return (
    <div className="relative group inline-block">
      <Link
        href={`/tejido/${hrefSlug}`}
        className={`
          inline-flex items-center gap-1 rounded-full font-medium transition
          ${size === "sm" ? "px-2 py-0.5 text-xs" : "px-3 py-1 text-sm"}
          ${isSuplex
            ? "bg-violet-50 text-violet-700 border border-violet-200 hover:bg-violet-100"
            : "bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100"
          }
          ${className}
        `}
      >
        <Icon className={size === "sm" ? "h-3 w-3" : "h-3.5 w-3.5"} />
        <span>{fabricInfo.shortName}</span>
      </Link>

      {/* Tooltip */}
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        <div className="bg-neutral-900 text-white rounded-lg px-3 py-2 text-xs max-w-[200px] text-center shadow-lg">
          <p className="font-medium">{fabricInfo.name}</p>
          <p className="mt-1 text-neutral-300">{fabricInfo.tagline}</p>
          {/* Arrow */}
          <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-neutral-900" />
        </div>
      </div>
    </div>
  )
}

// Simple inline text version
export function FabricText({ fabric }: { fabric: string }) {
  const fabricInfo = getFullFabricInfo(fabric)
  const familyInfo = getFabricFamilyForSlug(fabric)

  if (!fabricInfo) return <span>{fabric}</span>

  const isSuplex = familyInfo?.id === "suplex"
  const hrefSlug = fabric in LEGACY_TO_NEW_FABRIC
    ? LEGACY_TO_NEW_FABRIC[fabric as keyof typeof LEGACY_TO_NEW_FABRIC]
    : fabric

  return (
    <Link
      href={`/tejido/${hrefSlug}`}
      className={`font-medium hover:underline ${
        isSuplex ? "text-violet-600" : "text-amber-600"
      }`}
    >
      {fabricInfo.name}
    </Link>
  )
}
