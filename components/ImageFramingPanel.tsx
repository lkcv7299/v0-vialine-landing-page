'use client'

import { useImageFraming } from '@/contexts/ImageFramingContext'
import { useImageDebug } from '@/contexts/ImageDebugContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { X, RotateCcw, Copy, Download, Maximize2, Settings2 } from 'lucide-react'
import { useState } from 'react'

export function ImageFramingPanel() {
  const {
    isFramingMode,
    setIsFramingMode,
    selectedImage,
    setSelectedImage,
    currentTransform,
    setCurrentTransform,
  } = useImageFraming()

  const { values, updateValue } = useImageDebug()
  const [showGlobalControls, setShowGlobalControls] = useState(false)

  if (!isFramingMode) return null

  const resetTransform = () => {
    setCurrentTransform({ x: 0, y: 0, scale: 1 })
  }

  const copyConfig = () => {
    if (!selectedImage) return

    const config = {
      product: selectedImage.productSlug,
      color: selectedImage.colorSlug,
      imageIndex: selectedImage.imageIndex,
      transform: currentTransform,
    }

    navigator.clipboard.writeText(JSON.stringify(config, null, 2))
    alert('✅ Configuración copiada')
  }

  const exportAll = () => {
    const saved = localStorage.getItem('imageTransforms')
    if (saved) {
      const blob = new Blob([saved], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'image-transforms.json'
      a.click()
    }
  }

  const clearAll = () => {
    if (confirm('¿Estás seguro de que quieres eliminar TODOS los transforms guardados? Esta acción no se puede deshacer.')) {
      localStorage.removeItem('imageTransforms')
      window.dispatchEvent(new CustomEvent('imageTransformsUpdated'))
      alert('✅ Todos los transforms han sido eliminados')
    }
  }

  return (
    <>
      {/* Banner superior */}
      <div className="fixed top-0 left-0 right-0 bg-blue-600 text-white px-4 py-2 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Maximize2 className="w-5 h-5" />
            <div>
              <p className="font-semibold text-sm">Modo Framing Activo</p>
              <p className="text-xs opacity-90">
                Click en cualquier producto • Los ajustes se guardan por contexto (Tarjeta/Carrusel/Galería) • Ctrl+Shift+F para salir
              </p>
            </div>
          </div>
          <Button
            onClick={() => {
              setIsFramingMode(false)
              setSelectedImage(null)
            }}
            variant="ghost"
            size="sm"
            className="text-white hover:bg-white/20"
          >
            <X className="w-4 h-4 mr-1" />
            Salir
          </Button>
        </div>
      </div>

      {/* Panel de controles flotante */}
      {selectedImage && (
        <div className="fixed bottom-6 right-6 w-96 bg-white rounded-lg shadow-2xl border-2 border-blue-500 z-50 overflow-hidden">
          {/* Header */}
          <div className="bg-blue-500 text-white px-4 py-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-sm">{selectedImage.productSlug}</p>
                <p className="text-xs opacity-90">
                  {selectedImage.colorSlug} • Imagen {selectedImage.imageIndex + 1}
                </p>
                <p className="text-xs mt-1 bg-white/20 px-2 py-0.5 rounded inline-block">
                  Contexto: <strong>{selectedImage.context === 'card' ? 'Tarjeta (/mujer)' : selectedImage.context === 'rail' ? 'Carrusel (home)' : 'Galería (detalle)'}</strong>
                </p>
              </div>
              <button
                onClick={() => setSelectedImage(null)}
                className="hover:bg-white/20 p-1 rounded"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Controles */}
          <div className="p-4 space-y-4 max-h-[70vh] overflow-y-auto">
            {/* Posición X */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label className="text-sm font-medium">Posición X</Label>
                <span className="text-xs text-gray-500">{currentTransform.x}px</span>
              </div>
              <Slider
                value={[currentTransform.x]}
                onValueChange={([val]) =>
                  setCurrentTransform({ ...currentTransform, x: val })
                }
                min={-500}
                max={500}
                step={1}
                className="w-full"
              />
              <Input
                type="number"
                value={currentTransform.x}
                onChange={(e) =>
                  setCurrentTransform({
                    ...currentTransform,
                    x: parseFloat(e.target.value) || 0,
                  })
                }
                className="h-8 text-sm"
              />
            </div>

            {/* Posición Y */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label className="text-sm font-medium">Posición Y</Label>
                <span className="text-xs text-gray-500">{currentTransform.y}px</span>
              </div>
              <Slider
                value={[currentTransform.y]}
                onValueChange={([val]) =>
                  setCurrentTransform({ ...currentTransform, y: val })
                }
                min={-500}
                max={500}
                step={1}
                className="w-full"
              />
              <Input
                type="number"
                value={currentTransform.y}
                onChange={(e) =>
                  setCurrentTransform({
                    ...currentTransform,
                    y: parseFloat(e.target.value) || 0,
                  })
                }
                className="h-8 text-sm"
              />
            </div>

            {/* Escala */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label className="text-sm font-medium">Escala</Label>
                <span className="text-xs text-gray-500">
                  {currentTransform.scale.toFixed(2)}x
                </span>
              </div>
              <Slider
                value={[currentTransform.scale]}
                onValueChange={([val]) =>
                  setCurrentTransform({ ...currentTransform, scale: val })
                }
                min={0.5}
                max={3}
                step={0.01}
                className="w-full"
              />
              <Input
                type="number"
                value={currentTransform.scale}
                onChange={(e) =>
                  setCurrentTransform({
                    ...currentTransform,
                    scale: parseFloat(e.target.value) || 1,
                  })
                }
                step={0.01}
                className="h-8 text-sm"
              />
            </div>

            {/* Acciones */}
            <div className="pt-2 space-y-2 border-t">
              <Button onClick={resetTransform} variant="outline" className="w-full" size="sm">
                <RotateCcw className="w-3 h-3 mr-2" />
                Resetear
              </Button>
              <div className="grid grid-cols-2 gap-2">
                <Button onClick={copyConfig} variant="outline" size="sm">
                  <Copy className="w-3 h-3 mr-1" />
                  Copiar
                </Button>
                <Button onClick={exportAll} variant="outline" size="sm">
                  <Download className="w-3 h-3 mr-1" />
                  Exportar
                </Button>
              </div>
              <Button onClick={clearAll} variant="outline" size="sm" className="w-full border-red-600 text-red-600 hover:bg-red-50">
                🗑️ Limpiar Todo
              </Button>
            </div>

            {/* Info actual */}
            <div className="bg-gray-50 p-2 rounded text-xs font-mono">
              <pre className="text-[10px]">
                {JSON.stringify(currentTransform, null, 2)}
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* Floating button para activar cuando no hay producto seleccionado */}
      {!selectedImage && (
        <div className="fixed bottom-6 right-6 bg-white rounded-lg shadow-lg border border-gray-200 p-4 z-50">
          <div className="text-center">
            <Maximize2 className="w-8 h-8 mx-auto mb-2 text-blue-500" />
            <p className="text-sm font-medium text-gray-900">Selecciona un producto</p>
            <p className="text-xs text-gray-500 mt-1">
              Click en cualquier imagen para ajustarla
            </p>
            <div className="flex flex-col gap-2 mt-3">
              <Button
                onClick={() => setShowGlobalControls(!showGlobalControls)}
                variant="default"
                size="sm"
                className="w-full"
              >
                <Settings2 className="w-3 h-3 mr-1" />
                {showGlobalControls ? 'Ocultar' : 'Ajustes'} Globales
              </Button>
              <Button onClick={exportAll} variant="outline" size="sm" className="w-full">
                <Download className="w-3 h-3 mr-1" />
                Exportar Todo
              </Button>
              <Button onClick={clearAll} variant="outline" size="sm" className="w-full border-red-600 text-red-600 hover:bg-red-50">
                🗑️ Limpiar Todo
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Panel de Ajustes Globales */}
      {showGlobalControls && !selectedImage && (
        <div className="fixed bottom-6 left-6 w-96 bg-white rounded-lg shadow-2xl border-2 border-green-500 z-50 overflow-hidden max-h-[80vh]">
          {/* Header */}
          <div className="bg-green-500 text-white px-4 py-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-sm">Ajustes Globales - Carrusel Home</p>
                <p className="text-xs opacity-90">
                  Afecta TODOS los productos (prioridad baja)
                </p>
              </div>
              <button
                onClick={() => setShowGlobalControls(false)}
                className="hover:bg-white/20 p-1 rounded"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Controles */}
          <div className="p-4 space-y-6 overflow-y-auto max-h-[calc(80vh-60px)]">
            {/* TOPS / CAMISETAS / BODIES */}
            <div className="border-b pb-4">
              <h3 className="font-semibold text-sm mb-3 text-green-700">
                📦 TOPS / CAMISETAS / BODIES
              </h3>

              {/* Scale */}
              <div className="space-y-2 mb-3">
                <div className="flex justify-between items-center">
                  <Label className="text-xs font-medium">Escala</Label>
                  <span className="text-xs text-gray-500">{values.railTopScale.toFixed(2)}x</span>
                </div>
                <Slider
                  value={[values.railTopScale]}
                  onValueChange={([val]) => updateValue('railTopScale', val)}
                  min={0.5}
                  max={2}
                  step={0.01}
                  className="w-full"
                />
              </div>

              {/* Translate Y */}
              <div className="space-y-2 mb-3">
                <div className="flex justify-between items-center">
                  <Label className="text-xs font-medium">Posición Y</Label>
                  <span className="text-xs text-gray-500">{values.railTopTranslateY}%</span>
                </div>
                <Slider
                  value={[values.railTopTranslateY]}
                  onValueChange={([val]) => updateValue('railTopTranslateY', val)}
                  min={-50}
                  max={50}
                  step={1}
                  className="w-full"
                />
              </div>

              {/* Translate X */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label className="text-xs font-medium">Posición X</Label>
                  <span className="text-xs text-gray-500">{values.railTopTranslateX}%</span>
                </div>
                <Slider
                  value={[values.railTopTranslateX]}
                  onValueChange={([val]) => updateValue('railTopTranslateX', val)}
                  min={-50}
                  max={50}
                  step={1}
                  className="w-full"
                />
              </div>
            </div>

            {/* LEGGINGS / SHORTS / BOTTOMS */}
            <div className="border-b pb-4">
              <h3 className="font-semibold text-sm mb-3 text-green-700">
                📦 LEGGINGS / SHORTS / BOTTOMS
              </h3>

              {/* Scale */}
              <div className="space-y-2 mb-3">
                <div className="flex justify-between items-center">
                  <Label className="text-xs font-medium">Escala</Label>
                  <span className="text-xs text-gray-500">{values.railBottomScale.toFixed(2)}x</span>
                </div>
                <Slider
                  value={[values.railBottomScale]}
                  onValueChange={([val]) => updateValue('railBottomScale', val)}
                  min={0.5}
                  max={2}
                  step={0.01}
                  className="w-full"
                />
              </div>

              {/* Translate Y */}
              <div className="space-y-2 mb-3">
                <div className="flex justify-between items-center">
                  <Label className="text-xs font-medium">Posición Y</Label>
                  <span className="text-xs text-gray-500">{values.railBottomTranslateY}%</span>
                </div>
                <Slider
                  value={[values.railBottomTranslateY]}
                  onValueChange={([val]) => updateValue('railBottomTranslateY', val)}
                  min={-50}
                  max={50}
                  step={1}
                  className="w-full"
                />
              </div>

              {/* Translate X */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label className="text-xs font-medium">Posición X</Label>
                  <span className="text-xs text-gray-500">{values.railBottomTranslateX}%</span>
                </div>
                <Slider
                  value={[values.railBottomTranslateX]}
                  onValueChange={([val]) => updateValue('railBottomTranslateX', val)}
                  min={-50}
                  max={50}
                  step={1}
                  className="w-full"
                />
              </div>
            </div>

            {/* Nota */}
            <div className="bg-green-50 p-3 rounded text-xs">
              <p className="text-green-800 font-medium mb-1">💡 Nota Importante:</p>
              <p className="text-green-700">
                Estos ajustes afectan TODOS los productos del carrusel, pero tienen MENOR prioridad que los ajustes individuales por producto.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
