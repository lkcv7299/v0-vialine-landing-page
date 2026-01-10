"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import {
  ShoppingCart,
  Package,
  Users,
  Star,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  DollarSign,
  ArrowUpRight,
  Loader2
} from "lucide-react"

type Stats = {
  totalOrders: number
  pendingOrders: number
  completedOrders: number
  cancelledOrders: number
  totalRevenue: number
  totalProducts: number
  totalUsers: number
  pendingReviews: number
  recentOrders: Array<{
    id: string
    order_number: string
    customer_name: string
    total: number
    status: string | null
    created_at: string | null
  }>
}

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  pending_payment: "bg-orange-100 text-orange-800",
  paid: "bg-green-100 text-green-800",
  processing: "bg-blue-100 text-blue-800",
  shipped: "bg-purple-100 text-purple-800",
  delivered: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
}

const statusLabels: Record<string, string> = {
  pending: "Pendiente",
  pending_payment: "Pago pendiente",
  paid: "Pagado",
  processing: "Procesando",
  shipped: "Enviado",
  delivered: "Entregado",
  cancelled: "Cancelado",
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      const supabase = createClient()

      try {
        // Fetch all stats in parallel
        const [
          ordersResult,
          productsResult,
          usersResult,
          reviewsResult,
          recentOrdersResult
        ] = await Promise.all([
          supabase.from("orders").select("status, total"),
          supabase.from("products").select("id", { count: "exact", head: true }),
          supabase.from("profiles").select("id", { count: "exact", head: true }),
          supabase.from("reviews").select("id", { count: "exact", head: true }).eq("is_approved", false),
          supabase.from("orders").select("id, order_number, customer_name, total, status, created_at").order("created_at", { ascending: false }).limit(5)
        ])

        const orders = ordersResult.data || []
        const totalRevenue = orders
          .filter(o => o.status === "paid" || o.status === "delivered")
          .reduce((sum, o) => sum + (o.total || 0), 0)

        setStats({
          totalOrders: orders.length,
          pendingOrders: orders.filter(o => o.status === "pending" || o.status === "pending_payment").length,
          completedOrders: orders.filter(o => o.status === "delivered").length,
          cancelledOrders: orders.filter(o => o.status === "cancelled").length,
          totalRevenue,
          totalProducts: productsResult.count || 0,
          totalUsers: usersResult.count || 0,
          pendingReviews: reviewsResult.count || 0,
          recentOrders: recentOrdersResult.data || []
        })
      } catch (error) {
        console.error("Error fetching stats:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-pink-600" />
      </div>
    )
  }

  if (!stats) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Error al cargar estadísticas</p>
      </div>
    )
  }

  const statCards = [
    {
      label: "Ingresos Totales",
      value: `S/ ${stats.totalRevenue.toFixed(2)}`,
      icon: DollarSign,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      label: "Total Órdenes",
      value: stats.totalOrders,
      icon: ShoppingCart,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      label: "Órdenes Pendientes",
      value: stats.pendingOrders,
      icon: Clock,
      color: "text-yellow-600",
      bgColor: "bg-yellow-100",
    },
    {
      label: "Órdenes Completadas",
      value: stats.completedOrders,
      icon: CheckCircle,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      label: "Productos",
      value: stats.totalProducts,
      icon: Package,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      label: "Usuarios",
      value: stats.totalUsers,
      icon: Users,
      color: "text-indigo-600",
      bgColor: "bg-indigo-100",
    },
    {
      label: "Reviews Pendientes",
      value: stats.pendingReviews,
      icon: Star,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
    {
      label: "Órdenes Canceladas",
      value: stats.cancelledOrders,
      icon: XCircle,
      color: "text-red-600",
      bgColor: "bg-red-100",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, index) => {
          const Icon = stat.icon
          return (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <Icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Órdenes Recientes</h2>
          <Link
            href="/admin/ordenes"
            className="text-sm text-pink-600 hover:text-pink-700 flex items-center gap-1"
          >
            Ver todas
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Orden
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cliente
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fecha
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {stats.recentOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Link
                      href={`/admin/ordenes/${order.order_number}`}
                      className="text-sm font-medium text-pink-600 hover:text-pink-700"
                    >
                      {order.order_number}
                    </Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-900">{order.customer_name}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-medium text-gray-900">
                      S/ {order.total?.toFixed(2)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${order.status ? statusColors[order.status] || "bg-gray-100 text-gray-800" : "bg-gray-100 text-gray-800"}`}>
                      {order.status ? statusLabels[order.status] || order.status : "-"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.created_at ? new Date(order.created_at).toLocaleDateString("es-PE", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric"
                    }) : "-"}
                  </td>
                </tr>
              ))}
              {stats.recentOrders.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                    No hay órdenes recientes
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link
          href="/admin/ordenes?status=pending"
          className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:border-pink-200 transition-colors"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-yellow-100 rounded-lg">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
            <div>
              <p className="font-medium text-gray-900">Órdenes Pendientes</p>
              <p className="text-sm text-gray-500">{stats.pendingOrders} órdenes por procesar</p>
            </div>
          </div>
        </Link>

        <Link
          href="/admin/reviews"
          className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:border-pink-200 transition-colors"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-orange-100 rounded-lg">
              <Star className="h-6 w-6 text-orange-600" />
            </div>
            <div>
              <p className="font-medium text-gray-900">Moderar Reviews</p>
              <p className="text-sm text-gray-500">{stats.pendingReviews} reviews pendientes</p>
            </div>
          </div>
        </Link>

        <Link
          href="/admin/productos"
          className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:border-pink-200 transition-colors"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Package className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="font-medium text-gray-900">Gestionar Productos</p>
              <p className="text-sm text-gray-500">{stats.totalProducts} productos activos</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  )
}
