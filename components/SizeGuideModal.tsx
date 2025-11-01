"use client"

import { useState } from "react"
import { X, Ruler } from "lucide-react"
import Link from "next/link"

type ProductCategory = "leggings" | "bikers" | "shorts" | "tops" | "bodys" | "camisetas" | "enterizos" | "pescador" | "torero"

interface SizeGuideModalProps {
  category?: ProductCategory
}

// ✅ Mapear categorías a tipos de tabla
function getSizeGuideType(category: ProductCategory): "bottoms" | "tops" | "all" {
  const bottomsCategories: ProductCategory[] = ["leggings", "bikers", "shorts", "pescador", "torero"]
  const topsCategories: ProductCategory[] = ["tops", "bodys", "camisetas"]

  if (bottomsCategories.includes(category)) return "bottoms"
  if (topsCategories.includes(category)) return "tops"
  return "all" // enterizos u otros
}

export default function SizeGuideModal({ category }: SizeGuideModalProps) {
  const [isOpen, setIsOpen] = useState(false)

  const guideType = category ? getSizeGuideType(category) : "all"

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 text-sm text-neutral-600 hover:text-rose-600 transition"
      >
        <Ruler className="w-4 h-4" />
        Guía de tallas
      </button>
    )
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-neutral-200 p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-neutral-900">Guía de Tallas</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-neutral-100 rounded-full transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Cómo medir */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Cómo Medir Correctamente</h3>
            <div className="grid grid-cols-3 gap-4 text-center text-sm">
              <div>
                <div className="w-16 h-16 mx-auto mb-2 bg-rose-100 rounded-full flex items-center justify-center text-2xl">
                  📏
                </div>
                <p className="font-medium mb-1">Busto/Pecho</p>
                <p className="text-xs text-neutral-600">Parte más ancha</p>
              </div>
              <div>
                <div className="w-16 h-16 mx-auto mb-2 bg-rose-100 rounded-full flex items-center justify-center text-2xl">
                  ⚖️
                </div>
                <p className="font-medium mb-1">Cintura</p>
                <p className="text-xs text-neutral-600">Parte más estrecha</p>
              </div>
              <div>
                <div className="w-16 h-16 mx-auto mb-2 bg-rose-100 rounded-full flex items-center justify-center text-2xl">
                  🍑
                </div>
                <p className="font-medium mb-1">Cadera</p>
                <p className="text-xs text-neutral-600">Parte más ancha</p>
              </div>
            </div>
          </div>

          {/* ✅ Tabla Leggings y Bottoms */}
          {(guideType === "bottoms" || guideType === "all") && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                Leggings, Bikers, Shorts
                {guideType === "bottoms" && (
                  <span className="text-xs font-normal bg-rose-100 text-rose-700 px-2 py-1 rounded">
                    Para este producto
                  </span>
                )}
              </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-neutral-200">
                    <th className="text-left py-2 px-3">Talla</th>
                    <th className="text-left py-2 px-3">Cintura</th>
                    <th className="text-left py-2 px-3">Cadera</th>
                    <th className="text-left py-2 px-3">Largo</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b hover:bg-neutral-50">
                    <td className="py-2 px-3 font-medium">XS</td>
                    <td className="py-2 px-3">58-63 cm</td>
                    <td className="py-2 px-3">83-88 cm</td>
                    <td className="py-2 px-3">92 cm</td>
                  </tr>
                  <tr className="border-b hover:bg-neutral-50">
                    <td className="py-2 px-3 font-medium">S</td>
                    <td className="py-2 px-3">63-68 cm</td>
                    <td className="py-2 px-3">88-93 cm</td>
                    <td className="py-2 px-3">94 cm</td>
                  </tr>
                  <tr className="border-b hover:bg-neutral-50">
                    <td className="py-2 px-3 font-medium">M</td>
                    <td className="py-2 px-3">68-73 cm</td>
                    <td className="py-2 px-3">93-98 cm</td>
                    <td className="py-2 px-3">96 cm</td>
                  </tr>
                  <tr className="border-b hover:bg-neutral-50">
                    <td className="py-2 px-3 font-medium">L</td>
                    <td className="py-2 px-3">73-78 cm</td>
                    <td className="py-2 px-3">98-103 cm</td>
                    <td className="py-2 px-3">98 cm</td>
                  </tr>
                  <tr className="hover:bg-neutral-50">
                    <td className="py-2 px-3 font-medium">XL</td>
                    <td className="py-2 px-3">78-85 cm</td>
                    <td className="py-2 px-3">103-110 cm</td>
                    <td className="py-2 px-3">100 cm</td>
                  </tr>
                </tbody>
              </table>
            </div>
            </div>
          )}

          {/* ✅ Tabla Tops */}
          {(guideType === "tops" || guideType === "all") && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                Tops, Bodys y Camisetas
                {guideType === "tops" && (
                  <span className="text-xs font-normal bg-rose-100 text-rose-700 px-2 py-1 rounded">
                    Para este producto
                  </span>
                )}
              </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-neutral-200">
                    <th className="text-left py-2 px-3">Talla</th>
                    <th className="text-left py-2 px-3">Busto</th>
                    <th className="text-left py-2 px-3">Cintura</th>
                    <th className="text-left py-2 px-3">Largo</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b hover:bg-neutral-50">
                    <td className="py-2 px-3 font-medium">XS</td>
                    <td className="py-2 px-3">78-83 cm</td>
                    <td className="py-2 px-3">58-63 cm</td>
                    <td className="py-2 px-3">38 cm</td>
                  </tr>
                  <tr className="border-b hover:bg-neutral-50">
                    <td className="py-2 px-3 font-medium">S</td>
                    <td className="py-2 px-3">83-88 cm</td>
                    <td className="py-2 px-3">63-68 cm</td>
                    <td className="py-2 px-3">40 cm</td>
                  </tr>
                  <tr className="border-b hover:bg-neutral-50">
                    <td className="py-2 px-3 font-medium">M</td>
                    <td className="py-2 px-3">88-93 cm</td>
                    <td className="py-2 px-3">68-73 cm</td>
                    <td className="py-2 px-3">42 cm</td>
                  </tr>
                  <tr className="border-b hover:bg-neutral-50">
                    <td className="py-2 px-3 font-medium">L</td>
                    <td className="py-2 px-3">93-98 cm</td>
                    <td className="py-2 px-3">73-78 cm</td>
                    <td className="py-2 px-3">44 cm</td>
                  </tr>
                  <tr className="hover:bg-neutral-50">
                    <td className="py-2 px-3 font-medium">XL</td>
                    <td className="py-2 px-3">98-105 cm</td>
                    <td className="py-2 px-3">78-85 cm</td>
                    <td className="py-2 px-3">46 cm</td>
                  </tr>
                </tbody>
              </table>
            </div>
            </div>
          )}

          {/* Link a página completa */}
          <div className="mt-6 text-center">
            <Link
              href="/tallas"
              onClick={() => setIsOpen(false)}
              className="text-rose-600 hover:underline text-sm font-medium"
            >
              Ver guía completa con todas las categorías →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}