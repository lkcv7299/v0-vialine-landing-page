"use client"

import * as React from "react"
import Image from "next/image"
import type { Product } from "@/lib/products"

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ")
}

type Props = { product: Product }

export default function ProductDetail({ product }: Props) {
  const [color, setColor] = React.useState(product.colors[0])
  const [size, setSize] = React.useState<string | null>(null)

  // Try per-color image: /productos/mujer/bodys/{slug}-{color}.webp
  const colorSrc = `/productos/mujer/bodys/${product.slug}-${color.code}.webp`
  const [imgSrc, setImgSrc] = React.useState<string>(colorSrc)
  const [triedColor, setTriedColor] = React.useState<boolean>(false)

  React.useEffect(() => {
    setImgSrc(colorSrc)
    setTriedColor(false)
  }, [colorSrc])

  return (
    <section className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-8 px-4 py-8 lg:grid-cols-2">
      {/* Gallery with graceful fallback */}
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-slate-50">
        <Image
          key={imgSrc}
          src={imgSrc || "/placeholder.svg"}
          alt={`${product.name} - ${color.name}`}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover"
          onError={() => {
            // If color image is missing, fall back to base image once
            if (!triedColor) {
              setImgSrc(product.baseImage)
              setTriedColor(true)
            }
          }}
          priority
        />
      </div>

      {/* Info */}
      <div className="flex flex-col gap-6">
        <header className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">{product.name}</h1>
          <p className="text-lg font-medium text-slate-700">S/ {product.price.toFixed(2)}</p>
        </header>

        <div className="space-y-4">
          <p className="text-sm text-slate-700">
            <span className="font-medium text-slate-900">Material: </span>
            {product.material}
          </p>

          <div>
            <p className="text-sm font-medium text-slate-900">Detalles:</p>
            <ul className="mt-1 list-disc pl-5 text-sm text-slate-700">
              {product.details.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-medium text-slate-900">Beneficios:</p>
            <ul className="mt-1 list-disc pl-5 text-sm text-slate-700">
              {product.benefits.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Colors (Spanish codes) */}
        <div className="space-y-2">
          <p className="text-sm font-medium text-slate-900">Colores</p>
          <div className="flex flex-wrap gap-3">
            {product.colors.map((c) => (
              <button
                key={c.code}
                aria-label={c.name}
                onClick={() => setColor(c)}
                className={cn(
                  "h-8 w-8 rounded-full ring-offset-2 transition focus:outline-none focus:ring-2 focus:ring-pink-400",
                  color.code === c.code ? "ring-2 ring-slate-900" : "ring-1 ring-slate-300",
                )}
                style={{ backgroundColor: c.hex }}
                title={c.name}
              />
            ))}
          </div>
        </div>

        {/* Sizes */}
        <div className="space-y-2">
          <p className="text-sm font-medium text-slate-900">Tallas</p>
          <div className="flex flex-wrap gap-2">
            {product.sizes.map((s) => {
              const active = size === s
              return (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={cn(
                    "min-w-[3rem] rounded-md border px-3 py-2 text-sm transition",
                    active
                      ? "border-slate-900 bg-slate-900 text-white"
                      : "border-slate-300 bg-white text-slate-900 hover:bg-slate-50",
                  )}
                  aria-pressed={active}
                >
                  {s}
                </button>
              )
            })}
          </div>
        </div>

        {/* CTA (stub) */}
        <div className="flex gap-3">
          <button
            onClick={() => {
              if (!size) {
                alert("Selecciona una talla para continuar.")
                return
              }
              alert(`Añadido: ${product.name} — Color: ${color.name} — Talla: ${size}`)
            }}
            className="inline-flex items-center justify-center rounded-full bg-pink-600 px-6 py-3 text-white shadow-sm transition hover:bg-pink-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-400"
          >
            Añadir al carrito
          </button>
        </div>
      </div>
    </section>
  )
}
