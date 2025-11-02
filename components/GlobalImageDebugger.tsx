"use client"

import { useState, useEffect } from "react"
import { ChevronDown, ChevronUp, Copy, Target } from "lucide-react"
import { useImageDebug } from "@/contexts/ImageDebugContext"

export default function GlobalImageDebugger() {
  const { values, setValues, currentProduct, productOverrides, setProductOverride, getProductOverride, isEnabled } = useImageDebug()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [mode, setMode] = useState<"global" | "product">("product")

  // Estado local para controles específicos del producto
  const [productScale, setProductScale] = useState(1.0)
  const [productTranslateY, setProductTranslateY] = useState(-20)
  const [productTranslateX, setProductTranslateX] = useState(0)

  if (!isEnabled) return null

  // ✅ Cargar valores del producto cuando cambia
  useEffect(() => {
    if (currentProduct) {
      const override = getProductOverride(currentProduct)
      if (override) {
        setProductScale(override.scale)
        setProductTranslateY(override.translateY)
        setProductTranslateX(override.translateX)
      } else {
        // Reset a valores por defecto si no hay override
        setProductScale(1.0)
        setProductTranslateY(-20)
        setProductTranslateX(0)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentProduct])

  // ✅ Aplicar cambios en tiempo real
  useEffect(() => {
    if (currentProduct && mode === "product") {
      setProductOverride(currentProduct, {
        scale: productScale,
        translateY: productTranslateY,
        translateX: productTranslateX
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productScale, productTranslateY, productTranslateX, currentProduct, mode])

  const copyValues = () => {
    const productOverridesCode = Object.entries(productOverrides)
      .map(([slug, override]) => `  "${slug}": { scale: ${override.scale.toFixed(2)}, translateY: ${override.translateY}, translateX: ${override.translateX} }`)
      .join(',\n')

    const code = `// VALORES AJUSTADOS VISUALMENTE:

// Valores globales por defecto:
ProductCard (/mujer):
  Tops - scale: ${values.cardTopScale}, translateY: ${values.cardTopTranslateY}%, translateX: ${values.cardTopTranslateX}%
  Bottoms - scale: ${values.cardBottomScale}, translateY: ${values.cardBottomTranslateY}%, translateX: ${values.cardBottomTranslateX}%

GymRail (carruseles home):
  Tops - scale: ${values.railTopScale}, translateY: ${values.railTopTranslateY}%, translateX: ${values.railTopTranslateX}%
  Bottoms - scale: ${values.railBottomScale}, translateY: ${values.railBottomTranslateY}%, translateX: ${values.railBottomTranslateX}%

ProductCard (/nina):
  Tops - scale: ${values.girlTopScale}, translateY: ${values.girlTopTranslateY}%, translateX: ${values.girlTopTranslateX}%
  Bottoms - scale: ${values.girlBottomScale}, translateY: ${values.girlBottomTranslateY}%, translateX: ${values.girlBottomTranslateX}%

// Overrides específicos por producto (${Object.keys(productOverrides).length} productos):
${productOverridesCode || '  // No hay overrides específicos'}`

    navigator.clipboard.writeText(code)
    alert(`✅ Valores copiados! (${Object.keys(productOverrides).length} productos con override)`)
  }

  return (
    <div className="fixed bottom-4 right-4 z-[9999] bg-black/95 text-white rounded-lg shadow-2xl w-[420px] font-mono text-xs">
      {/* Header colapsable */}
      <div
        className="flex items-center justify-between p-4 cursor-pointer hover:bg-white/10 transition rounded-t-lg"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <h3 className="text-sm font-bold">🎨 IMAGE DEBUG CONTROLS</h3>
        {isCollapsed ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </div>

      {/* Contenido */}
      {!isCollapsed && (
        <div className="p-6 pt-0 max-h-[80vh] overflow-y-auto">
          {/* Selector de modo */}
          <div className="mb-4 flex gap-2">
            <button
              onClick={() => setMode("product")}
              className={`flex-1 py-2 px-3 rounded transition ${
                mode === "product"
                  ? "bg-rose-600 text-white"
                  : "bg-white/10 hover:bg-white/20"
              }`}
            >
              <Target className="w-3 h-3 inline mr-1" />
              Por Producto
            </button>
            <button
              onClick={() => setMode("global")}
              className={`flex-1 py-2 px-3 rounded transition ${
                mode === "global"
                  ? "bg-rose-600 text-white"
                  : "bg-white/10 hover:bg-white/20"
              }`}
            >
              🌍 Global
            </button>
          </div>

          {mode === "product" ? (
            /* MODO ESPECÍFICO POR PRODUCTO */
            <div>
              {currentProduct ? (
                <div className="mb-6 p-4 bg-rose-600/20 border-2 border-rose-600/50 rounded">
                  <div className="text-rose-400 font-bold mb-3 text-center">
                    🎯 {currentProduct}
                  </div>
                  <div className="text-white/60 text-[10px] mb-4 text-center">
                    Valores específicos para este producto
                  </div>

                  <div className="mb-2">
                    <label className="flex justify-between mb-1">
                      <span>Scale:</span>
                      <span className="text-green-400">{productScale.toFixed(2)}</span>
                    </label>
                    <input
                      type="range"
                      min="0.5"
                      max="2.5"
                      step="0.05"
                      value={productScale}
                      onChange={(e) => setProductScale(parseFloat(e.target.value))}
                      className="w-full"
                    />
                  </div>

                  <div className="mb-2">
                    <label className="flex justify-between mb-1">
                      <span>TranslateY:</span>
                      <span className="text-green-400">{productTranslateY}%</span>
                    </label>
                    <input
                      type="range"
                      min="-100"
                      max="50"
                      step="1"
                      value={productTranslateY}
                      onChange={(e) => setProductTranslateY(parseInt(e.target.value))}
                      className="w-full"
                    />
                  </div>

                  <div className="mb-2">
                    <label className="flex justify-between mb-1">
                      <span>TranslateX:</span>
                      <span className="text-green-400">{productTranslateX}%</span>
                    </label>
                    <input
                      type="range"
                      min="-50"
                      max="50"
                      step="1"
                      value={productTranslateX}
                      onChange={(e) => setProductTranslateX(parseInt(e.target.value))}
                      className="w-full"
                    />
                  </div>
                </div>
              ) : (
                <div className="mb-6 p-4 bg-yellow-600/20 border-2 border-yellow-600/50 rounded text-center">
                  <div className="text-yellow-400 mb-2">⚠️ No hay producto visible</div>
                  <div className="text-white/60 text-[10px]">
                    Haz scroll para que un producto esté en el centro de la pantalla
                  </div>
                </div>
              )}

              {/* Mostrar lista de productos con override */}
              {Object.keys(productOverrides).length > 0 && (
                <div className="mb-4 p-3 bg-white/5 rounded">
                  <div className="text-white/70 text-[10px] mb-2">
                    📦 {Object.keys(productOverrides).length} producto(s) con override:
                  </div>
                  <div className="max-h-[100px] overflow-y-auto text-[10px] text-white/50 space-y-1">
                    {Object.keys(productOverrides).map((slug) => (
                      <div key={slug} className="truncate">• {slug}</div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* MODO GLOBAL */
            <div>
              {/* PRODUCT CARD MUJER */}
              <div className="mb-6 p-4 bg-white/10 rounded">
                <div className="text-yellow-400 font-bold mb-3">📦 PRODUCT CARD (/mujer)</div>

                {/* Tops */}
                <div className="mb-4 pl-2 border-l-2 border-yellow-400/50">
                  <div className="text-white/70 text-[10px] mb-2">👕 TOPS/CAMISETAS</div>

                  <div className="mb-2">
                    <label className="flex justify-between mb-1">
                      <span>Scale:</span>
                      <span className="text-green-400">{values.cardTopScale.toFixed(2)}</span>
                    </label>
                    <input
                      type="range"
                      min="0.5"
                      max="2.5"
                      step="0.05"
                      value={values.cardTopScale}
                      onChange={(e) =>
                        setValues({ ...values, cardTopScale: parseFloat(e.target.value) })
                      }
                      className="w-full"
                    />
                  </div>

                  <div className="mb-2">
                    <label className="flex justify-between mb-1">
                      <span>TranslateY:</span>
                      <span className="text-green-400">{values.cardTopTranslateY}%</span>
                    </label>
                    <input
                      type="range"
                      min="-100"
                      max="50"
                      step="1"
                      value={values.cardTopTranslateY}
                      onChange={(e) =>
                        setValues({ ...values, cardTopTranslateY: parseInt(e.target.value) })
                      }
                      className="w-full"
                    />
                  </div>

                  <div className="mb-2">
                    <label className="flex justify-between mb-1">
                      <span>TranslateX:</span>
                      <span className="text-green-400">{values.cardTopTranslateX}%</span>
                    </label>
                    <input
                      type="range"
                      min="-50"
                      max="50"
                      step="1"
                      value={values.cardTopTranslateX}
                      onChange={(e) =>
                        setValues({ ...values, cardTopTranslateX: parseInt(e.target.value) })
                      }
                      className="w-full"
                    />
                  </div>
                </div>

                {/* Bottoms */}
                <div className="pl-2 border-l-2 border-pink-400/50">
                  <div className="text-white/70 text-[10px] mb-2">🩳 LEGGINGS/SHORTS</div>

                  <div className="mb-2">
                    <label className="flex justify-between mb-1">
                      <span>Scale:</span>
                      <span className="text-green-400">{values.cardBottomScale.toFixed(2)}</span>
                    </label>
                    <input
                      type="range"
                      min="0.5"
                      max="2.5"
                      step="0.05"
                      value={values.cardBottomScale}
                      onChange={(e) =>
                        setValues({ ...values, cardBottomScale: parseFloat(e.target.value) })
                      }
                      className="w-full"
                    />
                  </div>

                  <div className="mb-2">
                    <label className="flex justify-between mb-1">
                      <span>TranslateY:</span>
                      <span className="text-green-400">{values.cardBottomTranslateY}%</span>
                    </label>
                    <input
                      type="range"
                      min="-50"
                      max="50"
                      step="1"
                      value={values.cardBottomTranslateY}
                      onChange={(e) =>
                        setValues({ ...values, cardBottomTranslateY: parseInt(e.target.value) })
                      }
                      className="w-full"
                    />
                  </div>

                  <div className="mb-2">
                    <label className="flex justify-between mb-1">
                      <span>TranslateX:</span>
                      <span className="text-green-400">{values.cardBottomTranslateX}%</span>
                    </label>
                    <input
                      type="range"
                      min="-50"
                      max="50"
                      step="1"
                      value={values.cardBottomTranslateX}
                      onChange={(e) =>
                        setValues({ ...values, cardBottomTranslateX: parseInt(e.target.value) })
                      }
                      className="w-full"
                    />
                  </div>
                </div>
              </div>

              {/* GYM RAIL */}
              <div className="mb-6 p-4 bg-white/10 rounded">
                <div className="text-blue-400 font-bold mb-3">🎠 GYM RAIL (carruseles home)</div>

                <div className="mb-4 pl-2 border-l-2 border-yellow-400/50">
                  <div className="text-white/70 text-[10px] mb-2">👕 TOPS/CAMISETAS</div>

                  <div className="mb-2">
                    <label className="flex justify-between mb-1">
                      <span>Scale:</span>
                      <span className="text-green-400">{values.railTopScale.toFixed(2)}</span>
                    </label>
                    <input
                      type="range"
                      min="0.5"
                      max="2.5"
                      step="0.05"
                      value={values.railTopScale}
                      onChange={(e) =>
                        setValues({ ...values, railTopScale: parseFloat(e.target.value) })
                      }
                      className="w-full"
                    />
                  </div>

                  <div className="mb-2">
                    <label className="flex justify-between mb-1">
                      <span>TranslateY:</span>
                      <span className="text-green-400">{values.railTopTranslateY}%</span>
                    </label>
                    <input
                      type="range"
                      min="-100"
                      max="50"
                      step="1"
                      value={values.railTopTranslateY}
                      onChange={(e) =>
                        setValues({ ...values, railTopTranslateY: parseInt(e.target.value) })
                      }
                      className="w-full"
                    />
                  </div>

                  <div className="mb-2">
                    <label className="flex justify-between mb-1">
                      <span>TranslateX:</span>
                      <span className="text-green-400">{values.railTopTranslateX}%</span>
                    </label>
                    <input
                      type="range"
                      min="-50"
                      max="50"
                      step="1"
                      value={values.railTopTranslateX}
                      onChange={(e) =>
                        setValues({ ...values, railTopTranslateX: parseInt(e.target.value) })
                      }
                      className="w-full"
                    />
                  </div>
                </div>

                <div className="pl-2 border-l-2 border-pink-400/50">
                  <div className="text-white/70 text-[10px] mb-2">🩳 LEGGINGS/SHORTS</div>

                  <div className="mb-2">
                    <label className="flex justify-between mb-1">
                      <span>Scale:</span>
                      <span className="text-green-400">{values.railBottomScale.toFixed(2)}</span>
                    </label>
                    <input
                      type="range"
                      min="0.5"
                      max="2.5"
                      step="0.05"
                      value={values.railBottomScale}
                      onChange={(e) =>
                        setValues({ ...values, railBottomScale: parseFloat(e.target.value) })
                      }
                      className="w-full"
                    />
                  </div>

                  <div className="mb-2">
                    <label className="flex justify-between mb-1">
                      <span>TranslateY:</span>
                      <span className="text-green-400">{values.railBottomTranslateY}%</span>
                    </label>
                    <input
                      type="range"
                      min="-50"
                      max="50"
                      step="1"
                      value={values.railBottomTranslateY}
                      onChange={(e) =>
                        setValues({ ...values, railBottomTranslateY: parseInt(e.target.value) })
                      }
                      className="w-full"
                    />
                  </div>

                  <div className="mb-2">
                    <label className="flex justify-between mb-1">
                      <span>TranslateX:</span>
                      <span className="text-green-400">{values.railBottomTranslateX}%</span>
                    </label>
                    <input
                      type="range"
                      min="-50"
                      max="50"
                      step="1"
                      value={values.railBottomTranslateX}
                      onChange={(e) =>
                        setValues({ ...values, railBottomTranslateX: parseInt(e.target.value) })
                      }
                      className="w-full"
                    />
                  </div>
                </div>
              </div>

              {/* PRODUCT CARD NIÑA */}
              <div className="mb-6 p-4 bg-white/10 rounded">
                <div className="text-purple-400 font-bold mb-3">👧 PRODUCT CARD (/nina)</div>

                <div className="mb-4 pl-2 border-l-2 border-yellow-400/50">
                  <div className="text-white/70 text-[10px] mb-2">👕 TOPS/CAMISETAS</div>

                  <div className="mb-2">
                    <label className="flex justify-between mb-1">
                      <span>Scale:</span>
                      <span className="text-green-400">{values.girlTopScale.toFixed(2)}</span>
                    </label>
                    <input
                      type="range"
                      min="0.5"
                      max="2.5"
                      step="0.05"
                      value={values.girlTopScale}
                      onChange={(e) =>
                        setValues({ ...values, girlTopScale: parseFloat(e.target.value) })
                      }
                      className="w-full"
                    />
                  </div>

                  <div className="mb-2">
                    <label className="flex justify-between mb-1">
                      <span>TranslateY:</span>
                      <span className="text-green-400">{values.girlTopTranslateY}%</span>
                    </label>
                    <input
                      type="range"
                      min="-100"
                      max="50"
                      step="1"
                      value={values.girlTopTranslateY}
                      onChange={(e) =>
                        setValues({ ...values, girlTopTranslateY: parseInt(e.target.value) })
                      }
                      className="w-full"
                    />
                  </div>

                  <div className="mb-2">
                    <label className="flex justify-between mb-1">
                      <span>TranslateX:</span>
                      <span className="text-green-400">{values.girlTopTranslateX}%</span>
                    </label>
                    <input
                      type="range"
                      min="-50"
                      max="50"
                      step="1"
                      value={values.girlTopTranslateX}
                      onChange={(e) =>
                        setValues({ ...values, girlTopTranslateX: parseInt(e.target.value) })
                      }
                      className="w-full"
                    />
                  </div>
                </div>

                <div className="pl-2 border-l-2 border-pink-400/50">
                  <div className="text-white/70 text-[10px] mb-2">🩳 LEGGINGS/SHORTS</div>

                  <div className="mb-2">
                    <label className="flex justify-between mb-1">
                      <span>Scale:</span>
                      <span className="text-green-400">{values.girlBottomScale.toFixed(2)}</span>
                    </label>
                    <input
                      type="range"
                      min="0.5"
                      max="2.5"
                      step="0.05"
                      value={values.girlBottomScale}
                      onChange={(e) =>
                        setValues({ ...values, girlBottomScale: parseFloat(e.target.value) })
                      }
                      className="w-full"
                    />
                  </div>

                  <div className="mb-2">
                    <label className="flex justify-between mb-1">
                      <span>TranslateY:</span>
                      <span className="text-green-400">{values.girlBottomTranslateY}%</span>
                    </label>
                    <input
                      type="range"
                      min="-50"
                      max="50"
                      step="1"
                      value={values.girlBottomTranslateY}
                      onChange={(e) =>
                        setValues({ ...values, girlBottomTranslateY: parseInt(e.target.value) })
                      }
                      className="w-full"
                    />
                  </div>

                  <div className="mb-2">
                    <label className="flex justify-between mb-1">
                      <span>TranslateX:</span>
                      <span className="text-green-400">{values.girlBottomTranslateX}%</span>
                    </label>
                    <input
                      type="range"
                      min="-50"
                      max="50"
                      step="1"
                      value={values.girlBottomTranslateX}
                      onChange={(e) =>
                        setValues({ ...values, girlBottomTranslateX: parseInt(e.target.value) })
                      }
                      className="w-full"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* BOTÓN COPIAR */}
          <button
            onClick={copyValues}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded transition flex items-center justify-center gap-2"
          >
            <Copy className="w-4 h-4" />
            Copiar Valores ({Object.keys(productOverrides).length} overrides)
          </button>

          <div className="mt-3 text-[10px] text-white/60 text-center">
            {mode === "product"
              ? "Ajustando producto específico • Click en header para colapsar"
              : "Ajustando valores globales • Click en header para colapsar"}
          </div>
        </div>
      )}
    </div>
  )
}
