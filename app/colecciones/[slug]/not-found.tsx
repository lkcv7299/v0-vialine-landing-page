export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center px-4">
        <h1 className="text-4xl md:text-5xl font-serif text-gray-900 mb-4">Colección no encontrada</h1>
        <p className="text-lg text-gray-600 mb-8">La colección que buscas no existe.</p>
        <a
          href="/"
          className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-colors text-base font-medium"
        >
          Volver al inicio
        </a>
      </div>
    </div>
  )
}
