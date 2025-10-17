import { Ruler, TrendingUp, Package } from "lucide-react"

export default function SizeGuidePage() {
  return (
    <div className="min-h-screen bg-neutral-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-neutral-900 mb-4">
            Guía de Tallas Vialine
          </h1>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            Encuentra tu talla perfecta con nuestras tablas de medidas detalladas. 
            Si tienes dudas, contáctanos por WhatsApp.
          </p>
        </div>

        {/* Cómo Medir */}
        <div className="bg-white rounded-2xl shadow-lg border border-neutral-200 p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Ruler className="w-6 h-6 text-rose-600" />
            <h2 className="text-2xl font-bold text-neutral-900">Cómo Medir Correctamente</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-24 h-24 mx-auto mb-4 bg-rose-100 rounded-full flex items-center justify-center">
                <span className="text-4xl">📏</span>
              </div>
              <h3 className="font-semibold mb-2">1. Busto/Pecho</h3>
              <p className="text-sm text-neutral-600">
                Mide alrededor de la parte más ancha del pecho, manteniendo la cinta horizontal
              </p>
            </div>

            <div className="text-center">
              <div className="w-24 h-24 mx-auto mb-4 bg-rose-100 rounded-full flex items-center justify-center">
                <span className="text-4xl">⚖️</span>
              </div>
              <h3 className="font-semibold mb-2">2. Cintura</h3>
              <p className="text-sm text-neutral-600">
                Mide la parte más estrecha de tu cintura natural, donde se dobla el torso
              </p>
            </div>

            <div className="text-center">
              <div className="w-24 h-24 mx-auto mb-4 bg-rose-100 rounded-full flex items-center justify-center">
                <span className="text-4xl">🍑</span>
              </div>
              <h3 className="font-semibold mb-2">3. Cadera</h3>
              <p className="text-sm text-neutral-600">
                Mide alrededor de la parte más ancha de tus caderas, mantén la cinta recta
              </p>
            </div>
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-sm text-blue-900">
              <strong>💡 Tip:</strong> Usa una cinta métrica flexible y no aprietes demasiado. 
              Mide sobre ropa interior ligera para mayor precisión.
            </p>
          </div>
        </div>

        {/* Leggings */}
        <div className="bg-white rounded-2xl shadow-lg border border-neutral-200 p-8 mb-8">
          <h2 className="text-2xl font-bold text-neutral-900 mb-6">Leggings</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-neutral-200">
                  <th className="text-left py-3 px-4 font-semibold">Talla</th>
                  <th className="text-left py-3 px-4 font-semibold">Cintura (cm)</th>
                  <th className="text-left py-3 px-4 font-semibold">Cadera (cm)</th>
                  <th className="text-left py-3 px-4 font-semibold">Largo (cm)</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-neutral-100 hover:bg-neutral-50">
                  <td className="py-3 px-4 font-medium">XS</td>
                  <td className="py-3 px-4">58-63</td>
                  <td className="py-3 px-4">83-88</td>
                  <td className="py-3 px-4">92</td>
                </tr>
                <tr className="border-b border-neutral-100 hover:bg-neutral-50">
                  <td className="py-3 px-4 font-medium">S</td>
                  <td className="py-3 px-4">63-68</td>
                  <td className="py-3 px-4">88-93</td>
                  <td className="py-3 px-4">94</td>
                </tr>
                <tr className="border-b border-neutral-100 hover:bg-neutral-50">
                  <td className="py-3 px-4 font-medium">M</td>
                  <td className="py-3 px-4">68-73</td>
                  <td className="py-3 px-4">93-98</td>
                  <td className="py-3 px-4">96</td>
                </tr>
                <tr className="border-b border-neutral-100 hover:bg-neutral-50">
                  <td className="py-3 px-4 font-medium">L</td>
                  <td className="py-3 px-4">73-78</td>
                  <td className="py-3 px-4">98-103</td>
                  <td className="py-3 px-4">98</td>
                </tr>
                <tr className="hover:bg-neutral-50">
                  <td className="py-3 px-4 font-medium">XL</td>
                  <td className="py-3 px-4">78-85</td>
                  <td className="py-3 px-4">103-110</td>
                  <td className="py-3 px-4">100</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-4 flex items-start gap-2 text-sm text-neutral-600">
            <TrendingUp className="w-4 h-4 mt-0.5 flex-shrink-0 text-green-600" />
            <p><strong>Fit:</strong> Ajuste compresivo (true to size). Si estás entre dos tallas, elige la mayor para más comodidad.</p>
          </div>
        </div>

        {/* Tops */}
        <div className="bg-white rounded-2xl shadow-lg border border-neutral-200 p-8 mb-8">
          <h2 className="text-2xl font-bold text-neutral-900 mb-6">Tops y Bras</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-neutral-200">
                  <th className="text-left py-3 px-4 font-semibold">Talla</th>
                  <th className="text-left py-3 px-4 font-semibold">Busto (cm)</th>
                  <th className="text-left py-3 px-4 font-semibold">Cintura (cm)</th>
                  <th className="text-left py-3 px-4 font-semibold">Largo (cm)</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-neutral-100 hover:bg-neutral-50">
                  <td className="py-3 px-4 font-medium">XS</td>
                  <td className="py-3 px-4">78-83</td>
                  <td className="py-3 px-4">58-63</td>
                  <td className="py-3 px-4">38</td>
                </tr>
                <tr className="border-b border-neutral-100 hover:bg-neutral-50">
                  <td className="py-3 px-4 font-medium">S</td>
                  <td className="py-3 px-4">83-88</td>
                  <td className="py-3 px-4">63-68</td>
                  <td className="py-3 px-4">40</td>
                </tr>
                <tr className="border-b border-neutral-100 hover:bg-neutral-50">
                  <td className="py-3 px-4 font-medium">M</td>
                  <td className="py-3 px-4">88-93</td>
                  <td className="py-3 px-4">68-73</td>
                  <td className="py-3 px-4">42</td>
                </tr>
                <tr className="border-b border-neutral-100 hover:bg-neutral-50">
                  <td className="py-3 px-4 font-medium">L</td>
                  <td className="py-3 px-4">93-98</td>
                  <td className="py-3 px-4">73-78</td>
                  <td className="py-3 px-4">44</td>
                </tr>
                <tr className="hover:bg-neutral-50">
                  <td className="py-3 px-4 font-medium">XL</td>
                  <td className="py-3 px-4">98-105</td>
                  <td className="py-3 px-4">78-85</td>
                  <td className="py-3 px-4">46</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-4 flex items-start gap-2 text-sm text-neutral-600">
            <TrendingUp className="w-4 h-4 mt-0.5 flex-shrink-0 text-green-600" />
            <p><strong>Fit:</strong> Ajuste ceñido al cuerpo (true to size). Soporte medio a alto según modelo.</p>
          </div>
        </div>

        {/* Shorts */}
        <div className="bg-white rounded-2xl shadow-lg border border-neutral-200 p-8 mb-8">
          <h2 className="text-2xl font-bold text-neutral-900 mb-6">Shorts</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-neutral-200">
                  <th className="text-left py-3 px-4 font-semibold">Talla</th>
                  <th className="text-left py-3 px-4 font-semibold">Cintura (cm)</th>
                  <th className="text-left py-3 px-4 font-semibold">Cadera (cm)</th>
                  <th className="text-left py-3 px-4 font-semibold">Largo (cm)</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-neutral-100 hover:bg-neutral-50">
                  <td className="py-3 px-4 font-medium">XS</td>
                  <td className="py-3 px-4">58-63</td>
                  <td className="py-3 px-4">83-88</td>
                  <td className="py-3 px-4">30</td>
                </tr>
                <tr className="border-b border-neutral-100 hover:bg-neutral-50">
                  <td className="py-3 px-4 font-medium">S</td>
                  <td className="py-3 px-4">63-68</td>
                  <td className="py-3 px-4">88-93</td>
                  <td className="py-3 px-4">32</td>
                </tr>
                <tr className="border-b border-neutral-100 hover:bg-neutral-50">
                  <td className="py-3 px-4 font-medium">M</td>
                  <td className="py-3 px-4">68-73</td>
                  <td className="py-3 px-4">93-98</td>
                  <td className="py-3 px-4">34</td>
                </tr>
                <tr className="border-b border-neutral-100 hover:bg-neutral-50">
                  <td className="py-3 px-4 font-medium">L</td>
                  <td className="py-3 px-4">73-78</td>
                  <td className="py-3 px-4">98-103</td>
                  <td className="py-3 px-4">36</td>
                </tr>
                <tr className="hover:bg-neutral-50">
                  <td className="py-3 px-4 font-medium">XL</td>
                  <td className="py-3 px-4">78-85</td>
                  <td className="py-3 px-4">103-110</td>
                  <td className="py-3 px-4">38</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-4 flex items-start gap-2 text-sm text-neutral-600">
            <TrendingUp className="w-4 h-4 mt-0.5 flex-shrink-0 text-green-600" />
            <p><strong>Fit:</strong> Ajuste cómodo (true to size). Perfecto para entrenamientos de alta intensidad.</p>
          </div>
        </div>

        {/* Niña */}
        <div className="bg-white rounded-2xl shadow-lg border border-neutral-200 p-8 mb-8">
          <h2 className="text-2xl font-bold text-neutral-900 mb-6">Línea Niña</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-neutral-200">
                  <th className="text-left py-3 px-4 font-semibold">Talla</th>
                  <th className="text-left py-3 px-4 font-semibold">Edad</th>
                  <th className="text-left py-3 px-4 font-semibold">Altura (cm)</th>
                  <th className="text-left py-3 px-4 font-semibold">Pecho (cm)</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-neutral-100 hover:bg-neutral-50">
                  <td className="py-3 px-4 font-medium">4</td>
                  <td className="py-3 px-4">3-4 años</td>
                  <td className="py-3 px-4">98-104</td>
                  <td className="py-3 px-4">53-56</td>
                </tr>
                <tr className="border-b border-neutral-100 hover:bg-neutral-50">
                  <td className="py-3 px-4 font-medium">6</td>
                  <td className="py-3 px-4">5-6 años</td>
                  <td className="py-3 px-4">110-116</td>
                  <td className="py-3 px-4">57-60</td>
                </tr>
                <tr className="border-b border-neutral-100 hover:bg-neutral-50">
                  <td className="py-3 px-4 font-medium">8</td>
                  <td className="py-3 px-4">7-8 años</td>
                  <td className="py-3 px-4">122-128</td>
                  <td className="py-3 px-4">61-64</td>
                </tr>
                <tr className="border-b border-neutral-100 hover:bg-neutral-50">
                  <td className="py-3 px-4 font-medium">10</td>
                  <td className="py-3 px-4">9-10 años</td>
                  <td className="py-3 px-4">134-140</td>
                  <td className="py-3 px-4">65-70</td>
                </tr>
                <tr className="hover:bg-neutral-50">
                  <td className="py-3 px-4 font-medium">12</td>
                  <td className="py-3 px-4">11-12 años</td>
                  <td className="py-3 px-4">146-152</td>
                  <td className="py-3 px-4">71-76</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-4 flex items-start gap-2 text-sm text-neutral-600">
            <Package className="w-4 h-4 mt-0.5 flex-shrink-0 text-purple-600" />
            <p><strong>Nota:</strong> Las tallas son aproximadas según edad promedio. Siempre revisa las medidas para mayor precisión.</p>
          </div>
        </div>

        {/* FAQs */}
        <div className="bg-gradient-to-br from-rose-50 to-neutral-50 rounded-2xl border border-rose-200 p-8">
          <h2 className="text-2xl font-bold text-neutral-900 mb-6">Preguntas Frecuentes</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-neutral-900 mb-2">
                ¿Qué hago si estoy entre dos tallas?
              </h3>
              <p className="text-neutral-600">
                Si estás entre dos tallas, te recomendamos elegir la talla mayor para mayor comodidad. 
                Nuestros productos tienen un buen stretch y se adaptan al cuerpo.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-neutral-900 mb-2">
                ¿Las prendas encogen al lavarlas?
              </h3>
              <p className="text-neutral-600">
                No, nuestros tejidos están pre-encogidos. Sigue las instrucciones de lavado 
                (lavar en frío, no usar secadora) y mantendrán su forma original.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-neutral-900 mb-2">
                ¿Puedo cambiar por otra talla?
              </h3>
              <p className="text-neutral-600">
                Sí, aceptamos cambios dentro de los 30 días posteriores a la compra. 
                El producto debe estar sin usar con etiquetas originales.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-neutral-900 mb-2">
                ¿Tienen tallaje inclusivo?
              </h3>
              <p className="text-neutral-600">
                Actualmente manejamos tallas XS a XL. Estamos trabajando en expandir nuestro 
                rango de tallas para ser más inclusivos.
              </p>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-neutral-700 mb-4">
              ¿Aún tienes dudas sobre tu talla?
            </p>
            <a
              href="https://wa.me/51972327236"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition"
            >
              <span>📱</span>
              Contáctanos por WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}