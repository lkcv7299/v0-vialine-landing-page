"use client"
import Image from "next/image"
import Link from "next/link"

type Props = {
  image: string
  alt: string
  eyebrow?: string
  title: string
  subtitle?: string
  primaryCta?: { label: string; href: string }
  secondaryCta?: { label: string; href: string }
  /** Focal point in percentages (0–100). Example: { x: 70, y: 50 } */
  focal?: { x: number; y: number }
}

export default function HeroBanner({
  image,
  alt,
  eyebrow,
  title,
  subtitle,
  primaryCta,
  secondaryCta,
  focal = { x: 50, y: 50 },
}: Props) {
  return (
    <section aria-label={title} className="relative w-full overflow-hidden rounded-none">
      {/* Height lock so the Image with 'fill' has space */}
      <div className="relative h-[58svh] min-h-[440px] md:h-[72svh]">
        <Image
          src={image || "/placeholder.svg"}
          alt={alt}
          fill
          priority
          sizes="100vw"
          className="object-cover md:object-contain"
          style={{ objectPosition: `${focal.x}% ${focal.y}%` }}
        />
        {/* Bottom gradient for legible text */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent" />
      </div>

      {/* Copy layer */}
      <div className="absolute inset-0 z-10 flex items-end md:items-center">
        <div className="w-full px-6 pb-8 md:px-12 md:pb-0 lg:px-16">
          {eyebrow ? <p className="text-xs font-medium tracking-wider text-white/85">{eyebrow}</p> : null}
          <h1 className="mt-2 max-w-2xl text-4xl font-semibold leading-tight text-white md:text-6xl">{title}</h1>
          {subtitle ? <p className="mt-3 max-w-2xl text-white/90 md:text-lg">{subtitle}</p> : null}
          {(primaryCta || secondaryCta) && (
            <div className="mt-6 flex gap-3">
              {primaryCta && (
                <Link
                  href={primaryCta.href}
                  className="rounded-full bg-rose-600 px-5 py-3 text-sm font-semibold text-white hover:bg-rose-500"
                >
                  {primaryCta.label}
                </Link>
              )}
              {secondaryCta && (
                <Link
                  href={secondaryCta.href}
                  className="rounded-full bg-white/10 px-5 py-3 text-sm font-semibold text-white ring-1 ring-white/40 backdrop-blur hover:bg-white/20"
                >
                  {secondaryCta.label}
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
