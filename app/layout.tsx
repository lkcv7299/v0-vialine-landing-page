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
import { WishlistProvider } from "@/components/providers/WishlistContext"
import { CartProvider } from "@/contexts/CartContext"
// ❌ ELIMINADO: import TawkToChat from "@/components/TawkToChat"

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
})

const body = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-body",
})

const ui = Manrope({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-ui",
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={`${heading.variable} ${body.variable} ${ui.variable}`}>
      <body className="antialiased text-neutral-900 bg-neutral-50">
        {/* ANALYTICS: Google Analytics 4 */}
        <GoogleAnalytics />
        
        {/* ANALYTICS: Meta Pixel (Facebook/Instagram) */}
        <MetaPixel />
        
        {/* ANALYTICS: Microsoft Clarity (Heatmaps) */}
        <Clarity />
        
        {/* ❌ ELIMINADO: <TawkToChat /> */}

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
        <CartProvider>
          <WishlistProvider>
            <ClientWrapper>
              <PromoBar />
              <SiteHeader />
              {children}
              <WhatsAppFloat />
            </ClientWrapper>
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  )
}