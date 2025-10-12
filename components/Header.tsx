"use client"

import Image from "next/image"
import Link from "next/link"
import NavDropdown from "./NavDropdown"

export default function Header() {
  const productosItems = [
    { label: "Tops", href: "/categoria/tops" },
    { label: "Bikers", href: "/categoria/bikers" },
    { label: "Shorts", href: "/categoria/shorts" },
    { label: "Bodys", href: "/categoria/bodys" },
    { label: "Camisetas", href: "/categoria/camisetas" },
  ]

  const tejidosItems = [
    { label: "Suplex", href: "/tejido/suplex" },
    { label: "Algodón", href: "/tejido/algodon" },
  ]

  return (
    <header className="sticky top-0 z-50 bg-white backdrop-blur-sm border-b border-neutral-200 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/">
            <Image src="/logo-vialine.png" alt="Vialine" height={40} width={120} priority />
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            <NavDropdown label="Productos" items={productosItems} />
            <NavDropdown label="Tejidos" items={tejidosItems} />

            {/* 
            <a href="/#colecciones" className="text-sm text-rose-700 hover:text-rose-600 transition-colors">
              Colecciones
            </a>
            <a href="/#galeria" className="text-sm text-rose-700 hover:text-rose-600 transition-colors">
              Galería
            </a>
            <a href="/#opiniones" className="text-sm text-rose-700 hover:text-rose-600 transition-colors">
              Opiniones
            </a>
            <a href="/#faq" className="text-sm text-rose-700 hover:text-rose-600 transition-colors">
              FAQ
            </a>
            <a href="/#contacto" className="text-sm text-rose-700 hover:text-rose-600 transition-colors">
              Contacto
            </a>
            */}
          </nav>
        </div>
      </div>
    </header>
  )
}
