import type React from "react"
import type { Metadata } from "next"
import { Outfit, Inter, Manrope } from "next/font/google"
import "./globals.css"
import PromoBar from "@/components/PromoBar"
import SiteHeader from "@/components/header/SiteHeader"
import WhatsAppFloat from "@/components/WhatsAppFloat"
import ClientWrapper from "@/components/ClientWrapper"
import GoogleAnalytics from "@/components/GoogleAnalytics"
import MetaPixel from "@/components/MetaPixel"
import Clarity from "@/components/Clarity"
import { Analytics } from "@vercel/analytics/react"
import { WishlistProvider } from "@/components/providers/WishlistContext"
import { CartProvider } from "@/contexts/CartContext"
import SessionProvider from "@/components/providers/SessionProvider"
import { Toaster } from "sonner"
import ImageTransformLoader from "@/components/ImageTransformLoader"

export const metadata: Metadata = {
  title: "Vialine | Activewear & ropa interior para mujer – Hecho en Perú",
  description:
    "Camisetas, suplex, bodys y tops de algodón. Calidad premium, envíos a todo el Perú y atención por WhatsApp.",
  openGraph: {
    title: "Vialine | Activewear & ropa interior para mujer – Hecho en Perú",
    description:
      "Camisetas, suplex, bodys y tops de algodón. Calidad premium, envíos a todo el Perú y atención por WhatsApp.",
    type: "website",
    locale: "es_PE",
    siteName: "Vialine",
  },
  generator: "v0.app",
}

const heading = Outfit({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-heading",
  display: "swap",
})

const body = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-body",
  display: "swap",
})

const ui = Manrope({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-ui",
  display: "swap",
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const isProduction = process.env.NODE_ENV === "production"

  return (
    <html lang="es" className={`${heading.variable} ${body.variable} ${ui.variable}`}>
      <head>
        {/* Preload critical hero image for faster LCP */}
        <link rel="preload" as="image" href="/hero-woman.jpg" />
      </head>
      <body className="antialiased text-neutral-900 bg-neutral-50">
        {/* ANALYTICS: Solo cargar en producción para evitar ChunkLoadError en Codespaces */}
        {isProduction && (
          <>
            <GoogleAnalytics />
            <MetaPixel />
            <Clarity />
            <Analytics />
          </>
        )}

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "Vialine",
              description: "Activewear y ropa interior para mujer hecha en Perú",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Lima",
                addressCountry: "PE",
              },
              telephone: "+51 972 327 236",
              url: "https://vialine.pe",
            }),
          }}
        />

        <SessionProvider>
          <CartProvider>
            <WishlistProvider>
              <ImageTransformLoader />
              <ClientWrapper>
                <PromoBar />
                <SiteHeader />
                {children}
                <WhatsAppFloat />
                <Toaster
                  position="bottom-right"
                  toastOptions={{
                    classNames: {
                      success: 'bg-rose-600 text-white border-rose-600',
                      error: 'bg-red-600 text-white border-red-600',
                    },
                  }}
                />
              </ClientWrapper>
            </WishlistProvider>
          </CartProvider>
        </SessionProvider>
      </body>
    </html>
  )
}
