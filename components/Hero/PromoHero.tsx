import Image from "next/image"
import Link from "next/link"

type Props = {
  imageSrc: string
  title: string
  kicker?: string
  copy?: string
  ctaPrimary?: { label: string; href: string }
  ctaSecondary?: { label: string; href: string }
  /** object-position focus, e.g. "70% center" */
  focal?: string
  /** min screen height */
  minH?: string
}

export default function PromoHero({
  imageSrc,
  title,
  kicker,
  copy,
  ctaPrimary,
  ctaSecondary,
  focal = "70% center",
  minH = "min-h-[70vh]",
}: Props) {
  return (
    <section className={`edge-to-edge relative ${minH} overflow-hidden`}>
      <Image
        src={imageSrc || "/placeholder.svg"}
        alt={title}
        fill
        priority
        className="hero-img"
        style={{ objectPosition: focal }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/35 to-transparent" />
      <div className="relative z-10 px-6 sm:px-10 lg:px-16 py-16 sm:py-24 max-w-7xl">
        {kicker && <div className="text-xs sm:text-sm tracking-wide uppercase text-white/70">{kicker}</div>}
        <h1 className="mt-2 text-4xl sm:text-5xl lg:text-6xl font-bold text-white max-w-[18ch]">{title}</h1>
        {copy && <p className="mt-4 text-white/85 max-w-[55ch]">{copy}</p>}
        <div className="mt-6 flex gap-3">
          {ctaPrimary && (
            <Link
              href={ctaPrimary.href}
              className="rounded-full bg-rose-600 px-5 py-2.5 text-white font-medium hover:bg-rose-700"
            >
              {ctaPrimary.label}
            </Link>
          )}
          {ctaSecondary && (
            <Link
              href={ctaSecondary.href}
              className="rounded-full bg-white/10 px-5 py-2.5 text-white backdrop-blur border border-white/30 hover:bg-white/20"
            >
              {ctaSecondary.label}
            </Link>
          )}
        </div>
      </div>
    </section>
  )
}
