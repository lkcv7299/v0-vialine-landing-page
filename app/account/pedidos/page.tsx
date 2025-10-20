"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useState, useEffect } from "react"
import { Package, MapPin, User, Heart, LogOut, Loader2, Calendar, Truck, CheckCircle2 } from "lucide-react"

interface Order {
  id: string
  order_number: string
  status: string
  total: number
  created_at: string
  items_count: number
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
    const response = await fetch("/api/account/orders")
    if (response.ok) {
      const data = await response.json()
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
      pending: "bg-yellow-100 text-yellow-700",
      processing: "bg-blue-100 text-blue-700",
      shipped: "bg-purple-100 text-purple-700",
      delivered: "bg-green-100 text-green-700",
      cancelled: "bg-red-100 text-red-700",
    }
    const labels = {
      pending: "Pendiente",
      processing: "Procesando",
      shipped: "Enviado",
      delivered: "Entregado",
      cancelled: "Cancelado",
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
                  className="flex items-center gap-3 px-4 py-3 rounded-lg bg-rose-50 text-rose-600 font-medium"
                >
                  <Package className="w-5 h-5" />
                  Mis pedidos
                </Link>
                <Link
                  href="/account/direcciones"
                  className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-neutral-50 text-neutral-700 transition"
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
              // Orders List (cuando haya pedidos)
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
                      <Link
                        href={`/account/pedidos/${order.id}`}
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