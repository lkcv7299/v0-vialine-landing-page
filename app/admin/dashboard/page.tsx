"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Package, Search, LogOut, TrendingUp, Clock, CheckCircle, Truck } from "lucide-react"

type Order = {
  id: number
  order_id: string
  customer_first_name: string
  customer_last_name: string
  customer_email: string
  customer_phone: string
  total: string | number  // ✅ Puede venir como string desde PostgreSQL
  status: string
  payment_method: string
  payment_status: string
  created_at: string
  items: any[]
}

export default function AdminDashboard() {
  const router = useRouter()
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null)

  useEffect(() => {
    const token = localStorage.getItem("adminToken")
    if (!token) {
      router.push("/admin")
      return
    }
    loadOrders()
  }, [])

  const loadOrders = async () => {
    try {
      const response = await fetch("/api/admin/orders")
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`)
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
        loadOrders()
        alert("Estado actualizado exitosamente")
      } else {
        alert("Error al actualizar el estado")
      }
    } catch (error) {
      console.error("Error actualizando estado:", error)
      alert("Error al actualizar el estado")
    }
  }

  // ✅ HELPER: Parsear número seguro
  const parseNumber = (value: string | number): number => {
    if (typeof value === 'number') return value
    return parseFloat(value) || 0
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
    pending: orders.filter(o => o.status === "pending_payment" || o.status === "paid").length,
    processing: orders.filter(o => o.status === "processing").length,
    shipped: orders.filter(o => o.status === "shipped").length,
    delivered: orders.filter(o => o.status === "delivered").length,
  }

  const getStatusBadge = (status: string) => {
    const styles = {
      pending_payment: "bg-yellow-100 text-yellow-800",
      paid: "bg-green-100 text-green-800",
      processing: "bg-blue-100 text-blue-800",
      shipped: "bg-purple-100 text-purple-800",
      delivered: "bg-green-100 text-green-800",
      cancelled: "bg-red-100 text-red-800",
    }
    const labels = {
      pending_payment: "Pendiente Pago",
      paid: "Pagada",
      processing: "En Preparación",
      shipped: "Enviada",
      delivered: "Entregada",
      cancelled: "Cancelada",
    }
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${styles[status as keyof typeof styles] || "bg-neutral-100 text-neutral-800"}`}>
        {labels[status as keyof typeof labels] || status}
      </span>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-600 mx-auto mb-4"></div>
          <p className="text-neutral-600">Cargando órdenes...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <div className="bg-white border-b border-neutral-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Package className="w-8 h-8 text-rose-600" />
              <div>
                <h1 className="text-2xl font-bold text-neutral-900">Admin Dashboard</h1>
                <p className="text-sm text-neutral-600">Gestión de órdenes Vialine</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-neutral-700 hover:bg-neutral-100 rounded-lg transition"
            >
              <LogOut className="w-4 h-4" />
              <span>Cerrar sesión</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-neutral-600">Total</span>
              <TrendingUp className="w-5 h-5 text-neutral-400" />
            </div>
            <p className="text-2xl font-bold text-neutral-900">{stats.total}</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-neutral-600">Nuevas</span>
              <Clock className="w-5 h-5 text-yellow-500" />
            </div>
            <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-neutral-600">Preparando</span>
              <Package className="w-5 h-5 text-blue-500" />
            </div>
            <p className="text-2xl font-bold text-blue-600">{stats.processing}</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-neutral-600">Enviadas</span>
              <Truck className="w-5 h-5 text-purple-500" />
            </div>
            <p className="text-2xl font-bold text-purple-600">{stats.shipped}</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-neutral-600">Entregadas</span>
              <CheckCircle className="w-5 h-5 text-green-500" />
            </div>
            <p className="text-2xl font-bold text-green-600">{stats.delivered}</p>
          </div>
        </div>

        {/* Filtros */}
        <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
              <input
                type="text"
                placeholder="Buscar por orden, nombre, email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none"
            >
              <option value="all">Todos los estados</option>
              <option value="pending_payment">Pendiente Pago</option>
              <option value="paid">Pagada</option>
              <option value="processing">En Preparación</option>
              <option value="shipped">Enviada</option>
              <option value="delivered">Entregada</option>
              <option value="cancelled">Cancelada</option>
            </select>
          </div>
        </div>

        {/* Tabla de órdenes */}
        <div className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4">
              <p className="text-red-800">{error}</p>
            </div>
          )}

          {filteredOrders.length === 0 ? (
            <div className="text-center py-12">
              <Package className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
              <p className="text-neutral-600">No se encontraron órdenes</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-neutral-50 border-b border-neutral-200">
                  <tr>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-neutral-600 uppercase">Orden</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-neutral-600 uppercase">Cliente</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-neutral-600 uppercase">Total</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-neutral-600 uppercase">Estado</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-neutral-600 uppercase">Cambiar Estado</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-neutral-600 uppercase">Fecha</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-neutral-600 uppercase">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200">
                  {filteredOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-neutral-50 transition">
                      <td className="px-6 py-4">
                        <p className="font-mono text-sm font-semibold text-neutral-900">
                          {order.order_id}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium text-neutral-900">
                            {order.customer_first_name} {order.customer_last_name}
                          </p>
                          <p className="text-sm text-neutral-600">{order.customer_email}</p>
                          <p className="text-sm text-neutral-600">{order.customer_phone}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {/* ✅ PARSEANDO NÚMERO CORRECTAMENTE */}
                        <p className="font-semibold text-neutral-900">
                          S/ {parseNumber(order.total).toFixed(2)}
                        </p>
                        <p className="text-xs text-neutral-600 capitalize">{order.payment_method}</p>
                      </td>
                      <td className="px-6 py-4">
                        {getStatusBadge(order.status)}
                      </td>
                      <td className="px-6 py-4">
                        <select
                          value={order.status}
                          onChange={(e) => updateOrderStatus(order.order_id, e.target.value)}
                          className="px-3 py-1 border border-neutral-300 rounded-lg text-sm focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none"
                        >
                          <option value="pending_payment">Pendiente Pago</option>
                          <option value="paid">Pagada</option>
                          <option value="processing">En Preparación</option>
                          <option value="shipped">Enviada</option>
                          <option value="delivered">Entregada</option>
                          <option value="cancelled">Cancelada</option>
                        </select>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-neutral-600">
                          {new Date(order.created_at).toLocaleDateString("es-PE")}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => setExpandedOrderId(expandedOrderId === order.order_id ? null : order.order_id)}
                          className="text-rose-600 hover:text-rose-700 font-medium text-sm"
                        >
                          {expandedOrderId === order.order_id ? "Ocultar" : "Ver detalles"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Detalles expandidos */}
          {expandedOrderId && (
            <div className="border-t border-neutral-200 bg-neutral-50 p-6">
              {filteredOrders
                .filter(o => o.order_id === expandedOrderId)
                .map(order => (
                  <div key={order.id} className="space-y-4">
                    <h3 className="font-semibold text-lg text-neutral-900">
                      Productos de la orden {order.order_id}
                    </h3>
                    <div className="bg-white rounded-lg p-4 space-y-3">
                      {order.items.map((item: any, idx: number) => (
                        <div key={idx} className="flex justify-between items-start pb-3 border-b border-neutral-200 last:border-0">
                          <div>
                            <p className="font-medium text-neutral-900">{item.productTitle}</p>
                            <p className="text-sm text-neutral-600">
                              Color: {item.selectedColor} | Talla: {item.selectedSize}
                            </p>
                            <p className="text-sm text-neutral-600">Cantidad: {item.quantity}</p>
                          </div>
                          {/* ✅ PARSEANDO NÚMEROS CORRECTAMENTE */}
                          <p className="font-semibold text-neutral-900">
                            S/ {(parseNumber(item.productPrice) * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>

      </div>
    </div>
  )
}