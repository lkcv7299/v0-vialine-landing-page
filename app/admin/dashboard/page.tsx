"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Package, Search, Filter, LogOut, Eye, ExternalLink } from "lucide-react"

type Order = {
  id: number
  order_id: string
  customer_first_name: string
  customer_last_name: string
  customer_email: string
  customer_phone: string
  total: string | number
  status: string
  payment_method: string
  created_at: string
}

export default function AdminDashboard() {
  const router = useRouter()
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  // Cargar órdenes al montar
  useEffect(() => {
    loadOrders()
  }, [])

  const loadOrders = async () => {
    try {
      setLoading(true)
      setError("")
      
      const response = await fetch("/api/admin/orders")
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      console.log("Órdenes cargadas:", data)
      
      if (data.orders && Array.isArray(data.orders)) {
        setOrders(data.orders)
      } else {
        setOrders([])
      }
    } catch (error) {
      console.error("Error cargando órdenes:", error)
      setError("Error cargando órdenes. Por favor recarga la página.")
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("adminToken")
    router.push("/admin")
  }

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      const response = await fetch("/api/admin/orders", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId, status: newStatus })
      })

      if (response.ok) {
        loadOrders() // Recargar
      }
    } catch (error) {
      console.error("Error actualizando estado:", error)
    }
  }

  // Filtrar órdenes
  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.order_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer_first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer_last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer_email.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || order.status === statusFilter

    return matchesSearch && matchesStatus
  })

  // Stats
  const stats = {
    total: orders.length,
    pending: orders.filter(o => o.status === "pending").length,
    processing: orders.filter(o => o.status === "processing").length,
    shipped: orders.filter(o => o.status === "shipped").length,
    delivered: orders.filter(o => o.status === "delivered").length,
  }

  const getStatusBadge = (status: string) => {
    const styles = {
      pending: "bg-yellow-100 text-yellow-800",
      processing: "bg-blue-100 text-blue-800",
      shipped: "bg-purple-100 text-purple-800",
      delivered: "bg-green-100 text-green-800",
      cancelled: "bg-red-100 text-red-800",
    }
    const labels = {
      pending: "Pendiente",
      processing: "En preparación",
      shipped: "Enviada",
      delivered: "Entregada",
      cancelled: "Cancelada",
    }
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${styles[status as keyof typeof styles] || styles.pending}`}>
        {labels[status as keyof typeof labels] || status}
      </span>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-rose-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-neutral-600">Cargando órdenes...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <header className="bg-white border-b border-neutral-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-neutral-900">Vialine Admin</h1>
            <p className="text-sm text-neutral-600">Panel de gestión de órdenes</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 text-neutral-700 hover:bg-neutral-100 rounded-lg transition"
          >
            <LogOut className="w-4 h-4" />
            Salir
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
            <button onClick={loadOrders} className="ml-4 underline">
              Reintentar
            </button>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-white rounded-lg border border-neutral-200 p-4">
            <p className="text-sm text-neutral-600">Total</p>
            <p className="text-2xl font-bold text-neutral-900">{stats.total}</p>
          </div>
          <div className="bg-yellow-50 rounded-lg border border-yellow-200 p-4">
            <p className="text-sm text-yellow-800">Pendientes</p>
            <p className="text-2xl font-bold text-yellow-900">{stats.pending}</p>
          </div>
          <div className="bg-blue-50 rounded-lg border border-blue-200 p-4">
            <p className="text-sm text-blue-800">En preparación</p>
            <p className="text-2xl font-bold text-blue-900">{stats.processing}</p>
          </div>
          <div className="bg-purple-50 rounded-lg border border-purple-200 p-4">
            <p className="text-sm text-purple-800">Enviadas</p>
            <p className="text-2xl font-bold text-purple-900">{stats.shipped}</p>
          </div>
          <div className="bg-green-50 rounded-lg border border-green-200 p-4">
            <p className="text-sm text-green-800">Entregadas</p>
            <p className="text-2xl font-bold text-green-900">{stats.delivered}</p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg border border-neutral-200 p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar por orden, cliente, email..."
                className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
              />
            </div>

            {/* Status Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
              >
                <option value="all">Todos los estados</option>
                <option value="pending">Pendiente</option>
                <option value="processing">En preparación</option>
                <option value="shipped">Enviada</option>
                <option value="delivered">Entregada</option>
                <option value="cancelled">Cancelada</option>
              </select>
            </div>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-lg border border-neutral-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-neutral-50 border-b border-neutral-200">
                <tr>
                  <th className="text-left px-4 py-3 text-sm font-semibold text-neutral-700">Orden</th>
                  <th className="text-left px-4 py-3 text-sm font-semibold text-neutral-700">Cliente</th>
                  <th className="text-left px-4 py-3 text-sm font-semibold text-neutral-700">Email</th>
                  <th className="text-left px-4 py-3 text-sm font-semibold text-neutral-700">Total</th>
                  <th className="text-left px-4 py-3 text-sm font-semibold text-neutral-700">Estado</th>
                  <th className="text-left px-4 py-3 text-sm font-semibold text-neutral-700">Fecha</th>
                  <th className="text-left px-4 py-3 text-sm font-semibold text-neutral-700">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200">
                {filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-4 py-8 text-center text-neutral-500">
                      <Package className="w-12 h-12 mx-auto mb-2 text-neutral-300" />
                      {orders.length === 0 ? "No hay órdenes aún" : "No hay órdenes que coincidan con tu búsqueda"}
                    </td>
                  </tr>
                ) : (
                  filteredOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-neutral-50 transition">
                      <td className="px-4 py-3">
                        <span className="font-mono text-sm font-semibold text-rose-600">
                          {order.order_id}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <p className="font-medium text-neutral-900">
                          {order.customer_first_name} {order.customer_last_name}
                        </p>
                        <p className="text-sm text-neutral-500">{order.customer_phone}</p>
                      </td>
                      <td className="px-4 py-3 text-sm text-neutral-600">{order.customer_email}</td>
                      <td className="px-4 py-3">
                        <span className="font-semibold text-neutral-900">
                          S/ {typeof order.total === 'number' ? order.total.toFixed(2) : parseFloat(order.total).toFixed(2)}
                        </span>
                      </td>
                      <td className="px-4 py-3">{getStatusBadge(order.status)}</td>
                      <td className="px-4 py-3 text-sm text-neutral-600">
                        {new Date(order.created_at).toLocaleDateString("es-PE", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          {/* Cambiar estado */}
                          <select
                            value={order.status}
                            onChange={(e) => updateOrderStatus(order.order_id, e.target.value)}
                            className="text-sm border border-neutral-300 rounded px-2 py-1 focus:ring-2 focus:ring-rose-500"
                          >
                            <option value="pending">Pendiente</option>
                            <option value="processing">En preparación</option>
                            <option value="shipped">Enviada</option>
                            <option value="delivered">Entregada</option>
                            <option value="cancelled">Cancelada</option>
                          </select>

                          {/* WhatsApp */}
                          <a
                            href={`https://wa.me/51${order.customer_phone.replace(/\D/g, "")}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 text-green-600 hover:bg-green-50 rounded transition"
                            title="Contactar por WhatsApp"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>

                          {/* Ver detalles */}
                          <button
                            onClick={() => router.push(`/admin/orders/${order.order_id}`)}
                            className="p-2 text-rose-600 hover:bg-rose-50 rounded transition"
                            title="Ver detalles"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}