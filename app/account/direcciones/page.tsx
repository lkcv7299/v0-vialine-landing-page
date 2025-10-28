// app/account/direcciones/page.tsx
"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useState, useEffect } from "react"
import { MapPin, Loader2, Plus, Edit2, Trash2, Home, Briefcase, X, Check } from "lucide-react"
import AccountSidebar from "@/components/AccountSidebar"
import { toast } from "sonner"

interface Address {
  id: string
  label: string
  full_name: string
  phone: string
  street: string
  city: string
  state: string
  postal_code: string
  reference?: string
  is_default: boolean
}

interface FormData {
  label: string
  full_name: string
  phone: string
  street: string
  city: string
  state: string
  postal_code: string
  reference: string
  is_default: boolean
}

const initialFormData: FormData = {
  label: "home",
  full_name: "",
  phone: "",
  street: "",
  city: "",
  state: "Lima",
  postal_code: "",
  reference: "",
  is_default: false,
}

export default function DireccionesPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [addresses, setAddresses] = useState<Address[]>([])
  const [loading, setLoading] = useState(true)
  const [showAddForm, setShowAddForm] = useState(false)
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [submitting, setSubmitting] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)

  useEffect(() => {
    if (status === "authenticated") {
      fetchAddresses()
    }
  }, [status])

  // Fetch direcciones del usuario
  const fetchAddresses = async () => {
    try {
      const res = await fetch("/api/addresses")
      const data = await res.json()

      if (data.success) {
        setAddresses(data.addresses)
      }
    } catch (error) {
      console.error("Error fetching addresses:", error)
      toast.error("Error al cargar direcciones")
    } finally {
      setLoading(false)
    }
  }

  // Guardar dirección (crear o editar)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      const method = editingId ? "PATCH" : "POST"
      const body = editingId
        ? { ...formData, id: editingId }
        : formData

      const res = await fetch("/api/addresses", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })

      const data = await res.json()

      if (data.success) {
        toast.success(data.message)
        setShowAddForm(false)
        setFormData(initialFormData)
        setEditingId(null)
        fetchAddresses()
      } else {
        toast.error(data.error || "Error al guardar dirección")
      }
    } catch (error) {
      console.error("Error saving address:", error)
      toast.error("Error al guardar dirección")
    } finally {
      setSubmitting(false)
    }
  }

  // Marcar como predeterminada
  const handleSetDefault = async (id: string) => {
    try {
      const res = await fetch("/api/addresses", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, is_default: true }),
      })

      const data = await res.json()

      if (data.success) {
        toast.success("Dirección predeterminada actualizada")
        fetchAddresses()
      } else {
        toast.error(data.error)
      }
    } catch (error) {
      console.error("Error setting default:", error)
      toast.error("Error al actualizar dirección")
    }
  }

  // Editar dirección
  const handleEdit = (address: Address) => {
    setEditingId(address.id)
    setFormData({
      label: address.label,
      full_name: address.full_name,
      phone: address.phone,
      street: address.street,
      city: address.city,
      state: address.state,
      postal_code: address.postal_code,
      reference: address.reference || "",
      is_default: address.is_default,
    })
    setShowAddForm(true)
  }

  // Eliminar dirección
  const handleDelete = async (id: string) => {
    if (!confirm("¿Estás seguro de eliminar esta dirección?")) return

    try {
      const res = await fetch(`/api/addresses?id=${id}`, {
        method: "DELETE",
      })

      const data = await res.json()

      if (data.success) {
        toast.success("Dirección eliminada")
        fetchAddresses()
      } else {
        toast.error(data.error)
      }
    } catch (error) {
      console.error("Error deleting address:", error)
      toast.error("Error al eliminar dirección")
    }
  }

  // Cancelar formulario
  const handleCancel = () => {
    setShowAddForm(false)
    setFormData(initialFormData)
    setEditingId(null)
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
            {/* ✅ FIXED: Removed currentPage prop - component uses usePathname() */}
            <AccountSidebar />
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
              // Addresses List
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
                      address.is_default
                        ? "border-rose-600"
                        : "border-neutral-200"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        {/* Label + Default Badge */}
                        <div className="flex items-center gap-2 mb-3">
                          <span className="inline-flex items-center gap-1 px-3 py-1 bg-neutral-100 rounded-full text-sm font-medium text-neutral-700">
                            {getLabelIcon(address.label)}
                            {getLabelText(address.label)}
                          </span>
                          {address.is_default && (
                            <span className="inline-flex items-center gap-1 px-3 py-1 bg-rose-100 text-rose-700 rounded-full text-xs font-medium">
                              <Check className="w-3 h-3" />
                              Predeterminada
                            </span>
                          )}
                        </div>

                        {/* Address Info */}
                        <p className="font-medium text-neutral-900">{address.full_name}</p>
                        <p className="text-neutral-600">{address.street}</p>
                        <p className="text-neutral-600">
                          {address.city}, {address.state} {address.postal_code}
                        </p>
                        {address.reference && (
                          <p className="text-sm text-neutral-500 mt-1">Ref: {address.reference}</p>
                        )}
                        <p className="text-neutral-600 mt-1">Tel: {address.phone}</p>
                      </div>

                      {/* Actions */}
                      <div className="flex flex-col gap-2">
                        <button
                          onClick={() => handleEdit(address)}
                          className="p-2 hover:bg-neutral-100 rounded-lg transition"
                          title="Editar"
                        >
                          <Edit2 className="w-4 h-4 text-neutral-600" />
                        </button>
                        <button
                          onClick={() => handleDelete(address.id)}
                          className="p-2 hover:bg-red-100 rounded-lg transition"
                          title="Eliminar"
                        >
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </button>
                      </div>
                    </div>

                    {!address.is_default && (
                      <button
                        onClick={() => handleSetDefault(address.id)}
                        className="mt-4 text-sm text-rose-600 hover:text-rose-700 font-medium"
                      >
                        Establecer como predeterminada
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add/Edit Address Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-neutral-900">
                {editingId ? "Editar dirección" : "Nueva dirección"}
              </h2>
              <button
                onClick={handleCancel}
                className="p-2 hover:bg-neutral-100 rounded-lg transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Label */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Tipo de dirección
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { value: "home", label: "Casa", icon: Home },
                    { value: "work", label: "Trabajo", icon: Briefcase },
                    { value: "other", label: "Otro", icon: MapPin },
                  ].map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setFormData({ ...formData, label: option.value })}
                      className={`flex flex-col items-center gap-2 p-4 border-2 rounded-lg transition ${
                        formData.label === option.value
                          ? "border-rose-600 bg-rose-50"
                          : "border-neutral-200 hover:border-neutral-300"
                      }`}
                    >
                      <option.icon className="w-5 h-5" />
                      <span className="text-sm font-medium">{option.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Nombre y Teléfono */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Nombre completo *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.full_name}
                    onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-600"
                    placeholder="María García"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Teléfono *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-600"
                    placeholder="999 999 999"
                  />
                </div>
              </div>

              {/* Dirección completa */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Dirección completa *
                </label>
                <input
                  type="text"
                  required
                  value={formData.street}
                  onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-600"
                  placeholder="Av. Primavera 123, Surco"
                />
              </div>

              {/* Ciudad, Distrito, Código Postal */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Distrito *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-600"
                    placeholder="Surco"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Departamento *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-600"
                    placeholder="Lima"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Código Postal *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.postal_code}
                    onChange={(e) => setFormData({ ...formData, postal_code: e.target.value })}
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-600"
                    placeholder="15023"
                  />
                </div>
              </div>

              {/* Referencia */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Referencia (opcional)
                </label>
                <input
                  type="text"
                  value={formData.reference}
                  onChange={(e) => setFormData({ ...formData, reference: e.target.value })}
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-600"
                  placeholder="Casa blanca con portón negro"
                />
              </div>

              {/* Checkbox predeterminada */}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="is_default"
                  checked={formData.is_default}
                  onChange={(e) => setFormData({ ...formData, is_default: e.target.checked })}
                  className="w-4 h-4 text-rose-600 border-neutral-300 rounded focus:ring-rose-600"
                />
                <label htmlFor="is_default" className="text-sm text-neutral-700">
                  Establecer como dirección predeterminada
                </label>
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="flex-1 px-6 py-3 border border-neutral-300 rounded-lg font-medium hover:bg-neutral-50 transition"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 px-6 py-3 bg-rose-600 text-white rounded-lg font-medium hover:bg-rose-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Guardando...
                    </>
                  ) : (
                    editingId ? "Actualizar" : "Guardar dirección"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}