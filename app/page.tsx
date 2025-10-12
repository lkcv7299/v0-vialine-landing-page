import Image from "next/image"

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section
        className="relative py-20 md:py-32"
        style={{
          background: "linear-gradient(135deg, #FFF7FB 0%, #FFEAF4 50%, #FFD0E7 100%)",
        }}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 text-balance">
              Activewear que se siente como segunda piel.
            </h2>
            <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed max-w-3xl mx-auto text-pretty">
              Ropa deportiva e interior para mujer hecha en Perú, pensada para moverte con confianza todos los días.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="https://wa.me/51972327236?text=Hola%20Vialine"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-5 py-3 rounded-2xl bg-rose-600 text-white font-semibold tracking-wide uppercase shadow-lg hover:bg-rose-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-700 transition"
              >
                Comprar por WhatsApp
              </a>
              <a
                href="#colecciones"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-rose-700 border-2 border-pink-300 rounded-2xl hover:bg-pink-50 transition-colors text-base font-semibold uppercase tracking-wide shadow"
              >
                Ver colecciones
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Value Props */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {/* Hecho en Perú */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="w-12 h-12 rounded-full bg-pink-50 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Hecho en Perú</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Orgullosamente fabricado en Lima con mano de obra local
              </p>
            </div>

            {/* Envíos a todo el país */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="w-12 h-12 rounded-full bg-pink-50 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Envíos a todo el país</h3>
              <p className="text-sm text-gray-600 leading-relaxed">Entrega rápida y segura en todo el Perú</p>
            </div>

            {/* Cambios fáciles */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="w-12 h-12 rounded-full bg-pink-50 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Cambios fáciles</h3>
              <p className="text-sm text-gray-600 leading-relaxed">Proceso de cambio simple y sin complicaciones</p>
            </div>

            {/* Telas premium */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="w-12 h-12 rounded-full bg-pink-50 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Telas premium</h3>
              <p className="text-sm text-gray-600 leading-relaxed">Materiales de alta calidad para máxima comodidad</p>
            </div>
          </div>
        </div>
      </section>

      {/* Collections Grid */}
      <section id="colecciones" className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Nuestras Colecciones</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explora nuestra selección de prendas diseñadas para acompañarte en cada momento
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Camisetas */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow h-full flex flex-col">
              <div className="aspect-[3/4] overflow-hidden bg-gray-100 relative">
                <Image
                  src="/vialine-camisetas.jpg"
                  alt="Camisetas deportivas Vialine"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Camisetas</h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-4 flex-1">
                  Suaves, elásticas y respirables para tu día a día.
                </p>
                <a
                  href="/colecciones/camisetas"
                  className="inline-flex items-center text-sm font-medium text-gray-900 hover:text-gray-600 transition-colors"
                >
                  Ver más
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Línea Suplex */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow h-full flex flex-col">
              <div className="aspect-[3/4] overflow-hidden bg-gray-100 relative">
                <Image
                  src="/vialine-tops-algodon.jpg"
                  alt="Línea Suplex Vialine"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Línea Suplex</h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-4 flex-1">
                  Soporte y compresión justa. Fresca, versátil y estiliza.
                </p>
                <a
                  href="/colecciones/linea-suplex"
                  className="inline-flex items-center text-sm font-medium text-gray-900 hover:text-gray-600 transition-colors"
                >
                  Ver más
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Bodys */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow h-full flex flex-col">
              <div className="aspect-[3/4] overflow-hidden bg-gray-100 relative">
                <Image
                  src="/vialine-bodys.jpg"
                  alt="Bodys Vialine"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Bodys</h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-4 flex-1">
                  Ajuste perfecto que define tu silueta.
                </p>
                <a
                  href="/colecciones/bodys"
                  className="inline-flex items-center text-sm font-medium text-gray-900 hover:text-gray-600 transition-colors"
                >
                  Ver más
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Tops de algodón */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow h-full flex flex-col">
              <div className="aspect-[3/4] overflow-hidden bg-gray-100 relative">
                <Image
                  src="/vialine-linea-suplex.jpg"
                  alt="Tops de algodón Vialine"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Tops de algodón</h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-4 flex-1">
                  Comodidad absoluta y soporte ligero.
                </p>
                <a
                  href="/colecciones/tops-algodon"
                  className="inline-flex items-center text-sm font-medium text-gray-900 hover:text-gray-600 transition-colors"
                >
                  Ver más
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section id="galeria" className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Galería</h2>
            <p className="text-lg text-gray-600">Descubre el estilo Vialine</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
              <div key={item} className="aspect-square rounded-2xl overflow-hidden bg-gray-100 relative group">
                <Image
                  src="/women-s-activewear-lifestyle-.jpg"
                  alt={`Galería Vialine ${item}`}
                  fill
                  loading="lazy"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="opiniones" className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Lo que dicen nuestras clientas
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-600 leading-relaxed mb-4 italic">
                &ldquo;La tela es increíble, no transparenta.&rdquo;
              </p>
              <div>
                <p className="font-medium text-gray-900">María A.</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-600 leading-relaxed mb-4 italic">
                &ldquo;Compré por WhatsApp y llegó rapidísimo.&rdquo;
              </p>
              <div>
                <p className="font-medium text-gray-900">Karina V.</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-600 leading-relaxed mb-4 italic">
                &ldquo;El body queda hermoso y no aprieta.&rdquo;
              </p>
              <div>
                <p className="font-medium text-gray-900">Daniela R.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Preguntas Frecuentes</h2>
            </div>

            <div className="space-y-4">
              <details className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100 group">
                <summary className="px-6 py-4 cursor-pointer list-none flex items-center justify-between hover:bg-gray-50 transition-colors">
                  <span className="font-medium text-gray-900 pr-4">¿Hacen envíos a todo el Perú?</span>
                  <svg
                    className="w-5 h-5 text-gray-600 transition-transform group-open:rotate-180"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-6 pb-4">
                  <p className="text-gray-600 leading-relaxed">
                    Sí, realizamos envíos a todo el Perú. Los tiempos de entrega varían según la ubicación.
                  </p>
                </div>
              </details>

              <details className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100 group">
                <summary className="px-6 py-4 cursor-pointer list-none flex items-center justify-between hover:bg-gray-50 transition-colors">
                  <span className="font-medium text-gray-900 pr-4">¿Cambios o devoluciones?</span>
                  <svg
                    className="w-5 h-5 text-gray-600 transition-transform group-open:rotate-180"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-6 pb-4">
                  <p className="text-gray-600 leading-relaxed">
                    Aceptamos cambios dentro de los 15 días posteriores a la compra. El producto debe estar sin usar,
                    con etiquetas y en su empaque original.
                  </p>
                </div>
              </details>

              <details className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100 group">
                <summary className="px-6 py-4 cursor-pointer list-none flex items-center justify-between hover:bg-gray-50 transition-colors">
                  <span className="font-medium text-gray-900 pr-4">¿Qué tallas manejan?</span>
                  <svg
                    className="w-5 h-5 text-gray-600 transition-transform group-open:rotate-180"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-6 pb-4">
                  <p className="text-gray-600 leading-relaxed">
                    Manejamos tallas desde XS hasta XL. Cada producto tiene una guía de tallas detallada.
                  </p>
                </div>
              </details>

              <details className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100 group">
                <summary className="px-6 py-4 cursor-pointer list-none flex items-center justify-between hover:bg-gray-50 transition-colors">
                  <span className="font-medium text-gray-900 pr-4">¿Cómo cuido mis prendas?</span>
                  <svg
                    className="w-5 h-5 text-gray-600 transition-transform group-open:rotate-180"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-6 pb-4">
                  <p className="text-gray-600 leading-relaxed">
                    Recomendamos lavar a mano o en ciclo delicado con agua fría. No usar blanqueador y secar a la
                    sombra.
                  </p>
                </div>
              </details>

              <details className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100 group">
                <summary className="px-6 py-4 cursor-pointer list-none flex items-center justify-between hover:bg-gray-50 transition-colors">
                  <span className="font-medium text-gray-900 pr-4">¿Medios de pago?</span>
                  <svg
                    className="w-5 h-5 text-gray-600 transition-transform group-open:rotate-180"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-6 pb-4">
                  <p className="text-gray-600 leading-relaxed">
                    Aceptamos transferencias bancarias, Yape, Plin y pago contra entrega en Lima metropolitana.
                  </p>
                </div>
              </details>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contacto" className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Contáctanos</h2>
            <p className="text-lg text-gray-600 mb-6">Lima, Perú</p>
            <a
              href="https://wa.me/51972327236?text=Hola%20Vialine"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-colors text-base font-semibold uppercase tracking-wide shadow-lg"
            >
              Escríbenos por WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Vialine</h3>
            <p className="text-sm text-gray-600 mb-6">
              Ropa deportiva y ropa interior femenina de alta calidad, hecha en Perú con amor y dedicación.
            </p>
            <p className="text-sm text-gray-500">
              &copy; {new Date().getFullYear()} Vialine. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>
    </>
  )
}
