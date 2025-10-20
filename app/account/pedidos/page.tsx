// app/account/pedidos/page.tsx
"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useState, useEffect } from "react"
import { Package, Loader2, Calendar } from "lucide-react"
import AccountSidebar from "@/components/AccountSidebar"

interface Order {
  id: number
  order_number: string
  first_name: string
  last_name: string
  email: string
  phone: string
  total: number
  status: string
  items_count: number
  created_at: string
}

export default function PedidosPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === "authenticated") {
      fetchOrders()
    }
  }, [status])

  const fetchOrders = async () => {
    try {
      // Fetch orders del usuario actual
      const res = await fetch(`/api/orders?email=${session?.user?.email}`)
      const data = await res.json()

      if (data.success) {
        setOrders(data.orders)
      }
    } catch (error) {
      console.error("Error fetching orders:", error)
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
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${styles[status as keyof typeof styles]}`}>
        {labels[status as keyof typeof labels]}
      </span>
    )
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <div className="bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-neutral-900">Mis Pedidos</h1>
              <p className="text-sm text-neutral-600 mt-1">
                Revisa el estado de tus pedidos
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
          {/* Sidebar - Ahora usa componente reutilizable con logout correcto */}
          <div className="lg:col-span-1">
            <AccountSidebar currentPage="pedidos" />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            {loading ? (
              <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-12 text-center">
                <Loader2 className="w-8 h-8 animate-spin text-rose-600 mx-auto" />
                <p className="mt-4 text-neutral-600">Cargando pedidos...</p>
              </div>
            ) : orders.length === 0 ? (
              // Empty State
              <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-12 text-center">
                <div className="w-24 h-24 mx-auto bg-neutral-100 rounded-full flex items-center justify-center mb-6">
                  <Package className="w-12 h-12 text-neutral-400" />
                </div>
                <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                  No tienes pedidos aún
                </h3>
                <p className="text-neutral-600 mb-6 max-w-md mx-auto">
                  Explora nuestra colección de activewear y haz tu primera compra. ¡Envíos gratis en compras mayores a S/ 269!
                </p>
                <Link
                  href="/mujer"
                  className="inline-block px-6 py-3 bg-rose-600 text-white rounded-lg font-medium hover:bg-rose-700 transition"
                >
                  Explorar productos
                </Link>
              </div>
            ) : (
              // Orders List
              <div className="space-y-4">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-6 hover:shadow-md transition"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                      <div>
                        <h3 className="font-semibold text-neutral-900">
                          Pedido #{order.order_number}
                        </h3>
                        <div className="flex items-center gap-2 mt-1 text-sm text-neutral-600">
                          <Calendar className="w-4 h-4" />
                          {new Date(order.created_at).toLocaleDateString("es-PE", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </div>
                      </div>
                      {getStatusBadge(order.status)}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-neutral-200">
                      <div>
                        <p className="text-sm text-neutral-600">
                          {order.items_count} {order.items_count === 1 ? "producto" : "productos"}
                        </p>
                        <p className="text-lg font-semibold text-neutral-900">
                          S/ {order.total.toFixed(2)}
                        </p>
                      </div>
                      {/* ✅ FIX #3: Link corregido a /orden/{order_number} */}
                      <Link
                        href={`/orden/${order.order_number}`}
                        className="px-4 py-2 border border-neutral-300 rounded-lg text-sm font-medium hover:bg-neutral-50 transition"
                      >
                        Ver detalles
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}