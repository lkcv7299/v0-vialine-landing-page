"use client"
import Link from "next/link"
import type React from "react"

import Image from "next/image"

type Props = {
  image: string
  kicker?: string
  title: string
  description?: string
  primary?: { href: string; label: string }
  secondary?: { href: string; label: string }
  objectPositionDesktop?: string // e.g. "78% 42%"
  objectPositionMobile?: string // e.g. "68% 36%"
  className?: string
}

export default function Hero({
  image,
  kicker,
  title,
  description,
  primary,
  secondary,
  objectPositionDesktop = "70% 45%",
  objectPositionMobile = "70% 35%",
  className = "",
}: Props) {
  return (
    <section className={`relative isolate overflow-hidden bg-neutral-900 text-white ${className}`}>
      {/* Full-bleed image with responsive object-position */}
      <div className="absolute inset-0 -z-10">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          fill
          priority
          sizes="100vw"
          className="object-cover [object-position:var(--pos-mobile)] md:[object-position:var(--pos-desktop)]"
          style={
            {
              ["--pos-desktop" as any]: objectPositionDesktop,
              ["--pos-mobile" as any]: objectPositionMobile,
            } as React.CSSProperties
          }
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/0" />
      </div>

      {/* Copy pinned bottom-left */}
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="min-h-[520px] md:min-h-[640px] grid items-end">
          <div className="pb-14 md:pb-20 max-w-3xl">
            {kicker && <p className="mb-3 text-sm font-semibold tracking-wide text-white/80">{kicker}</p>}
            <h1 className="text-4xl/tight md:text-6xl font-extrabold drop-shadow-sm">{title}</h1>
            {description && <p className="mt-4 text-base md:text-lg text-white/90">{description}</p>}
            {(primary || secondary) && (
              <div className="mt-8 flex gap-3">
                {primary && (
                  <Link
                    href={primary.href}
                    className="rounded-full bg-rose-600 px-5 py-3 text-sm font-semibold text-white hover:bg-rose-500"
                  >
                    {primary.label}
                  </Link>
                )}
                {secondary && (
                  <Link
                    href={secondary.href}
                    className="rounded-full bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur hover:bg-white/20"
                  >
                    {secondary.label}
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
