import Link from "next/link"
import { Instagram, Phone, Mail, MapPin } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-neutral-900 text-white">
      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-4 md:px-6 py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="inline-block">
              <span className="text-2xl font-bold tracking-tight">Vialine</span>
            </Link>
            <p className="mt-4 text-sm text-neutral-400 leading-relaxed">
              Activewear premium hecho en Perú. Diseñado para mujeres que se mueven.
            </p>
            {/* Social Links */}
            <div className="mt-6 flex gap-4">
              <a
                href="https://instagram.com/vialine.pe"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-neutral-800 hover:bg-rose-600 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Shop Column */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">
              Comprar
            </h3>
            <nav className="space-y-3">
              <Link href="/mujer" className="block text-sm text-neutral-400 hover:text-white transition-colors">
                Mujer
              </Link>
              <Link href="/nina" className="block text-sm text-neutral-400 hover:text-white transition-colors">
                Niña
              </Link>
              <Link href="/tejidos" className="block text-sm text-neutral-400 hover:text-white transition-colors">
                Por Tejido
              </Link>
              <Link href="/ofertas" className="block text-sm text-neutral-400 hover:text-white transition-colors">
                Ofertas
              </Link>
            </nav>
          </div>

          {/* Help Column */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">
              Ayuda
            </h3>
            <nav className="space-y-3">
              <Link href="/envios" className="block text-sm text-neutral-400 hover:text-white transition-colors">
                Envíos
              </Link>
              <Link href="/cambios" className="block text-sm text-neutral-400 hover:text-white transition-colors">
                Cambios y Devoluciones
              </Link>
              <Link href="/tallas" className="block text-sm text-neutral-400 hover:text-white transition-colors">
                Guía de Tallas
              </Link>
              <Link href="/contacto" className="block text-sm text-neutral-400 hover:text-white transition-colors">
                Contacto
              </Link>
            </nav>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">
              Contacto
            </h3>
            <div className="space-y-3">
              <a
                href="https://wa.me/51972327236"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-neutral-400 hover:text-white transition-colors"
              >
                <Phone className="w-4 h-4" />
                +51 972 327 236
              </a>
              <a
                href="mailto:hola@vialine.pe"
                className="flex items-center gap-2 text-sm text-neutral-400 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4" />
                hola@vialine.pe
              </a>
              <div className="flex items-start gap-2 text-sm text-neutral-400">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>Lima, Perú</span>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="mt-12 pt-8 border-t border-neutral-800">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-xs text-neutral-500">Métodos de pago:</span>
              <div className="flex items-center gap-2">
                <div className="px-2 py-1 bg-neutral-800 rounded text-xs font-medium">Visa</div>
                <div className="px-2 py-1 bg-neutral-800 rounded text-xs font-medium">Mastercard</div>
                <div className="px-2 py-1 bg-neutral-800 rounded text-xs font-medium">Yape</div>
                <div className="px-2 py-1 bg-neutral-800 rounded text-xs font-medium">Plin</div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs text-neutral-500">
              <span>🔒 Compra segura</span>
              <span>•</span>
              <span>🚚 Envío gratis +S/269</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-neutral-800">
        <div className="mx-auto max-w-7xl px-4 md:px-6 py-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 text-xs text-neutral-500">
            <p>© {currentYear} Vialine. Todos los derechos reservados.</p>
            <div className="flex gap-4">
              <Link href="/privacidad" className="hover:text-white transition-colors">
                Política de Privacidad
              </Link>
              <Link href="/terminos" className="hover:text-white transition-colors">
                Términos y Condiciones
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
