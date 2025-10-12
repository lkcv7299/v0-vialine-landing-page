import Image from "next/image"

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white backdrop-blur-sm border-b border-neutral-200 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Image src="/logo-vialine.png" alt="Vialine" height={40} width={120} priority />
          <nav className="hidden md:flex items-center gap-8">
            <a href="#colecciones" className="text-sm text-rose-700 hover:text-rose-600 transition-colors">
              Colecciones
            </a>
            <a href="#galeria" className="text-sm text-rose-700 hover:text-rose-600 transition-colors">
              Galería
            </a>
            <a href="#opiniones" className="text-sm text-rose-700 hover:text-rose-600 transition-colors">
              Opiniones
            </a>
            <a href="#faq" className="text-sm text-rose-700 hover:text-rose-600 transition-colors">
              FAQ
            </a>
            <a href="#contacto" className="text-sm text-rose-700 hover:text-rose-600 transition-colors">
              Contacto
            </a>
          </nav>
        </div>
      </div>
    </header>
  )
}
