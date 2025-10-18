"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import Drawer from "@/components/ui/Drawer"
import { Menu, X } from "lucide-react"
import { buildWhatsAppUrl } from "@/lib/contact"

// ✅ RUTAS CORREGIDAS - Ahora usan /shop/gender/category igual que desktop
const mujer = [
  { label: "Leggings", href: "/shop/mujer/leggings" },
  { label: "Shorts", href: "/shop/mujer/short" },
  { label: "Pescadores", href: "/shop/mujer/pescador" },
  { label: "Toreros", href: "/shop/mujer/torero" },
  { label: "Bodys", href: "/shop/mujer/bodys" },
  { label: "Enterizos", href: "/shop/mujer/enterizos" },
  { label: "Tops", href: "/shop/mujer/tops" },
  { label: "Camisetas", href: "/shop/mujer/camisetas" },
]

const nina = [
  { label: "Cafarenas", href: "/shop/nina/cafarenas" },
  { label: "Enterizos", href: "/shop/nina/enterizos" },
  { label: "Leggings", href: "/shop/nina/legging" },
  { label: "Pantys", href: "/shop/nina/panty" },
  { label: "Shorts", href: "/shop/nina/short" },
  { label: "Tops", href: "/shop/nina/tops" },
]

export default function MobileMenu() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  // Cerrar drawer cuando cambia la ruta
  useEffect(() => {
    setOpen(false)
  }, [pathname])

  return (
    <>
      {/* Botón Hamburguesa */}
      <button
        aria-controls="mobile-menu"
        aria-expanded={open}
        aria-label="Abrir menú de navegación"
        onClick={() => setOpen(true)}
        className="inline-flex h-10 w-10 items-center justify-center rounded-lg hover:bg-neutral-100 text-neutral-900 transition"
      >
        <Menu size={24} />
      </button>

      {/* Drawer del Menú */}
      <Drawer 
        open={open} 
        onClose={() => setOpen(false)} 
        side="left"
        title="Menú de navegación Vialine"
      >
        <div id="mobile-menu" className="flex h-full flex-col bg-white">
          
          {/* ========== HEADER DEL DRAWER ========== */}
          <div className="sticky top-0 z-10 flex items-center justify-between border-b border-neutral-200 bg-white px-4 py-4">
            <Link 
              href="/" 
              className="text-xl font-bold tracking-tight text-neutral-900"
              onClick={() => setOpen(false)}
            >
              Vialine
            </Link>
            <button
              aria-label="Cerrar menú"
              onClick={() => setOpen(false)}
              className="h-10 w-10 inline-flex items-center justify-center rounded-lg hover:bg-neutral-100 transition"
            >
              <X size={22} />
            </button>
          </div>

          {/* ========== NAVEGACIÓN ========== */}
          <nav className="flex-1 overflow-y-auto px-4 py-4">
            
            {/* Sección Mujer */}
            <Section title="Mujer" items={mujer} onLinkClick={() => setOpen(false)} />
            
            <div className="h-6" /> {/* Espaciador */}
            
            {/* Sección Niña */}
            <Section title="Niña" items={nina} onLinkClick={() => setOpen(false)} />
            
            <div className="h-6" /> {/* Espaciador */}
            
            {/* Sección Ayuda */}
            <Section
              title="Ayuda"
              items={[
                { label: "Guía de tallas", href: "/pages/guia-de-tallas" },
                { label: "Cambios y devoluciones", href: "/pages/envios-y-devoluciones" },
                { label: "Soporte WhatsApp", href: buildWhatsAppUrl("Hola Vialine"), external: true },
              ]}
              onLinkClick={() => setOpen(false)}
            />
          </nav>

          {/* ========== FOOTER CON BOTONES CTA ========== */}
          <div className="border-t border-neutral-200 p-4 space-y-3 bg-white">
            <Link
              href="/mujer"
              className="block w-full rounded-xl bg-rose-600 text-white text-center py-3 font-semibold hover:bg-rose-700 transition"
              onClick={() => setOpen(false)}
            >
              Comprar Mujer
            </Link>
            <Link
              href="/nina"
              className="block w-full rounded-xl border-2 border-neutral-900 text-neutral-900 text-center py-3 font-semibold hover:bg-neutral-900 hover:text-white transition"
              onClick={() => setOpen(false)}
            >
              Comprar Niña
            </Link>
          </div>
        </div>
      </Drawer>
    </>
  )
}

// ========== COMPONENTE SECTION ==========
function Section({
  title,
  items,
  onLinkClick,
}: {
  title: string
  items: { label: string; href: string; external?: boolean }[]
  onLinkClick: () => void
}) {
  return (
    <div>
      <div className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-3">
        {title}
      </div>
      <ul className="space-y-1">
        {items.map((item) => (
          <li key={item.label}>
            {item.external ? (
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-lg px-3 py-2.5 text-[15px] font-medium text-neutral-900 hover:bg-neutral-100 transition"
                onClick={onLinkClick}
              >
                {item.label}
              </a>
            ) : (
              <Link
                href={item.href}
                className="block rounded-lg px-3 py-2.5 text-[15px] font-medium text-neutral-900 hover:bg-neutral-100 transition"
                onClick={onLinkClick}
              >
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}