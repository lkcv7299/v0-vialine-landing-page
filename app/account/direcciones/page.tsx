"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useState, useEffect } from "react"
import { MapPin, User, Package, Heart, LogOut, Loader2, Plus, Edit2, Trash2, Home, Briefcase } from "lucide-react"

interface Address {
  id: string
  label: string
  full_name: string
  phone: string
  street: string
  city: string
  state: string
  postal_code: string
  is_default: boolean
}

export default function DireccionesPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [addresses, setAddresses] = useState<Address[]>([])
  const [loading, setLoading] = useState(true)
  const [showAddForm, setShowAddForm] = useState(false)

  useEffect(() => {
    if (status === "authenticated") {
      fetchAddresses()
    }
  }, [status])

  const fetchAddresses = async () => {
    try {
      // TODO: Implementar API endpoint real
      // Por ahora mostramos empty state
      setAddresses([])
    } catch (error) {
      console.error("Error fetching addresses:", error)
    } finally {
      setLoading(false)
    }
  }

  if (status === "unauthenticated") {
    router.push("/login")
    return null
  }

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-rose-600" />
      </div>
    )
  }

  const getLabelIcon = (label: string) => {
    if (label === "home") return <Home className="w-4 h-4" />
    if (label === "work") return <Briefcase className="w-4 h-4" />
    return <MapPin className="w-4 h-4" />
  }

  const getLabelText = (label: string) => {
    if (label === "home") return "Casa"
    if (label === "work") return "Trabajo"
    return "Otro"
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <div className="bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-neutral-900">Mis Direcciones</h1>
              <p className="text-sm text-neutral-600 mt-1">
                Gestiona tus direcciones de envío
              </p>
            </div>
            <Link
              href="/account"
              className="text-sm text-neutral-600 hover:text-neutral-900 underline underline-offset-4"
            >
              ← Volver a mi cuenta
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-6">
              <div className="flex items-center gap-4 pb-6 border-b border-neutral-200">
                <div className="w-16 h-16 rounded-full bg-rose-100 flex items-center justify-center">
                  <User className="w-8 h-8 text-rose-600" />
                </div>
                <div>
                  <h2 className="font-semibold text-neutral-900">
                    {session?.user?.name || "Usuario"}
                  </h2>
                  <p className="text-sm text-neutral-600">{session?.user?.email}</p>
                </div>
              </div>

              <nav className="mt-6 space-y-2">
                <Link
                  href="/account"
                  className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-neutral-50 text-neutral-700 transition"
                >
                  <User className="w-5 h-5" />
                  Inicio
                </Link>
                <Link
                  href="/account/pedidos"
                  className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-neutral-50 text-neutral-700 transition"
                >
                  <Package className="w-5 h-5" />
                  Mis pedidos
                </Link>
                <Link
                  href="/account/direcciones"
                  className="flex items-center gap-3 px-4 py-3 rounded-lg bg-rose-50 text-rose-600 font-medium"
                >
                  <MapPin className="w-5 h-5" />
                  Direcciones
                </Link>
                <Link
                  href="/wishlist"
                  className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-neutral-50 text-neutral-700 transition"
                >
                  <Heart className="w-5 h-5" />
                  Lista de deseos
                </Link>
              </nav>

              <button
                onClick={() => router.push("/")}
                className="w-full mt-6 flex items-center justify-center gap-2 px-4 py-3 rounded-lg border border-neutral-300 text-neutral-700 hover:bg-neutral-50 transition"
              >
                <LogOut className="w-5 h-5" />
                Cerrar sesión
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            {loading ? (
              <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-12 text-center">
                <Loader2 className="w-8 h-8 animate-spin text-rose-600 mx-auto" />
                <p className="mt-4 text-neutral-600">Cargando direcciones...</p>
              </div>
            ) : addresses.length === 0 ? (
              // Empty State
              <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-12 text-center">
                <div className="w-24 h-24 mx-auto bg-neutral-100 rounded-full flex items-center justify-center mb-6">
                  <MapPin className="w-12 h-12 text-neutral-400" />
                </div>
                <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                  No tienes direcciones guardadas
                </h3>
                <p className="text-neutral-600 mb-6 max-w-md mx-auto">
                  Agrega una dirección de envío para acelerar tus futuras compras
                </p>
                <button
                  onClick={() => setShowAddForm(true)}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-rose-600 text-white rounded-lg font-medium hover:bg-rose-700 transition"
                >
                  <Plus className="w-5 h-5" />
                  Agregar dirección
                </button>
              </div>
            ) : (
              // Addresses List (cuando haya direcciones)
              <div className="space-y-4">
                {/* Add New Button */}
                <button
                  onClick={() => setShowAddForm(true)}
                  className="w-full border-2 border-dashed border-neutral-300 rounded-2xl p-6 hover:border-rose-600 hover:bg-rose-50 transition text-neutral-600 hover:text-rose-600 flex items-center justify-center gap-2"
                >
                  <Plus className="w-5 h-5" />
                  <span className="font-medium">Agregar nueva dirección</span>
                </button>

                {addresses.map((address) => (
                  <div
                    key={address.id}
                    className={`bg-white rounded-2xl shadow-sm border-2 p-6 ${
                      address.is_default ? "border-rose-600" : "border-neutral-200"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-lg bg-rose-100 flex items-center justify-center text-rose-600">
                          {getLabelIcon(address.label)}
                        </div>
                        <div>
                          <h3 className="font-semibold text-neutral-900">
                            {getLabelText(address.label)}
                          </h3>
                          {address.is_default && (
                            <span className="text-xs text-rose-600 font-medium">
                              Predeterminada
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="p-2 hover:bg-neutral-100 rounded-lg transition">
                          <Edit2 className="w-4 h-4 text-neutral-600" />
                        </button>
                        <button className="p-2 hover:bg-red-50 rounded-lg transition">
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2 text-sm text-neutral-700">
                      <p className="font-medium">{address.full_name}</p>
                      <p>{address.street}</p>
                      <p>
                        {address.city}, {address.state} {address.postal_code}
                      </p>
                      <p className="text-neutral-600">Tel: {address.phone}</p>
                    </div>

                    {!address.is_default && (
                      <button className="mt-4 text-sm text-rose-600 hover:text-rose-700 font-medium">
                        Establecer como predeterminada
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Add Address Form Modal (placeholder) */}
            {showAddForm && (
              <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl max-w-2xl w-full p-8 max-h-[90vh] overflow-y-auto">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-neutral-900">
                      Nueva dirección
                    </h2>
                    <button
                      onClick={() => setShowAddForm(false)}
                      className="p-2 hover:bg-neutral-100 rounded-lg transition"
                    >
                      ✕
                    </button>
                  </div>

                  <form className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-2">
                          Nombre completo
                        </label>
                        <input
                          type="text"
                          className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-600"
                          placeholder="María García"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-2">
                          Teléfono
                        </label>
                        <input
                          type="tel"
                          className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-600"
                          placeholder="999 999 999"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Dirección completa
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-600"
                        placeholder="Av. Javier Prado 123, San Isidro"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-2">
                          Ciudad
                        </label>
                        <input
                          type="text"
                          className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-600"
                          placeholder="Lima"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-2">
                          Distrito
                        </label>
                        <input
                          type="text"
                          className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-600"
                          placeholder="San Isidro"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-2">
                          Código postal
                        </label>
                        <input
                          type="text"
                          className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-600"
                          placeholder="15073"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Etiqueta
                      </label>
                      <div className="flex gap-3">
                        <button
                          type="button"
                          className="flex-1 px-4 py-3 border-2 border-rose-600 bg-rose-50 text-rose-600 rounded-lg font-medium"
                        >
                          <Home className="w-4 h-4 inline mr-2" />
                          Casa
                        </button>
                        <button
                          type="button"
                          className="flex-1 px-4 py-3 border border-neutral-300 rounded-lg font-medium hover:bg-neutral-50"
                        >
                          <Briefcase className="w-4 h-4 inline mr-2" />
                          Trabajo
                        </button>
                        <button
                          type="button"
                          className="flex-1 px-4 py-3 border border-neutral-300 rounded-lg font-medium hover:bg-neutral-50"
                        >
                          <MapPin className="w-4 h-4 inline mr-2" />
                          Otro
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="is_default"
                        className="w-5 h-5 text-rose-600 border-neutral-300 rounded focus:ring-2 focus:ring-rose-600"
                      />
                      <label htmlFor="is_default" className="text-sm text-neutral-700">
                        Establecer como dirección predeterminada
                      </label>
                    </div>

                    <div className="flex gap-3 pt-4">
                      <button
                        type="button"
                        onClick={() => setShowAddForm(false)}
                        className="flex-1 px-6 py-3 border border-neutral-300 rounded-lg font-medium hover:bg-neutral-50 transition"
                      >
                        Cancelar
                      </button>
                      <button
                        type="submit"
                        className="flex-1 px-6 py-3 bg-rose-600 text-white rounded-lg font-medium hover:bg-rose-700 transition"
                      >
                        Guardar dirección
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}