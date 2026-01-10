// app/account/pedidos/page.tsx
"use client"

import { useSupabaseAuth } from "@/hooks/use-supabase-auth"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useState, useEffect } from "react"
import { Package, Loader2, Filter } from "lucide-react"
import AccountSidebar from "@/components/AccountSidebar"
import OrderCard from "@/components/account/OrderCard"
import OrderDetailsModal from "@/components/account/OrderDetailsModal"
import { toast } from "sonner"

interface OrderItem {
  id: string
  product_name: string
  product_slug: string
  product_image: string
  variant_color: string
  variant_size: string
  quantity: number
  unit_price: number
  total_price: number
}

interface Order {
  id: string
  order_number: string
  customer_email: string
  customer_name: string
  customer_lastname: string
  customer_phone: string
  shipping_address: string
  shipping_district: string
  shipping_city: string
  shipping_postal_code?: string
  shipping_reference?: string
  subtotal: number
  shipping_cost: number
  total: number
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  payment_method: string
  created_at: string
  items: OrderItem[]
  notes?: string
}

type StatusFilter = "all" | "pending" | "processing" | "shipped" | "delivered" | "cancelled"

export default function PedidosPage() {
  const { user, loading: authLoading } = useSupabaseAuth()
  const router = useRouter()
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all")
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login")
    }
  }, [authLoading, user, router])

  useEffect(() => {
    if (user?.id) {
      fetchOrders()
    }
  }, [user, statusFilter])

  // Fetch órdenes del usuario
  const fetchOrders = async () => {
    try {
      setLoading(true)
      const url =
        statusFilter === "all"
          ? "/api/account/pedidos"
          : `/api/account/pedidos?status=${statusFilter}`

      const res = await fetch(url)
      const data = await res.json()

      if (data.success) {
        setOrders(data.orders)
      } else {
        toast.error("Error al cargar pedidos")
      }
    } catch (error) {
      console.error("Error fetching orders:", error)
      toast.error("Error al cargar pedidos")
    } finally {
      setLoading(false)
    }
  }

  // Abrir modal de detalles
  const handleViewDetails = (order: Order) => {
    setSelectedOrder(order)
    setIsModalOpen(true)
  }

  // Cerrar modal
  const handleCloseModal = () => {
    setIsModalOpen(false)
    setTimeout(() => setSelectedOrder(null), 300)
  }

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-rose-600" />
      </div>
    )
  }

  if (!user) {
    return null
  }

  // Filtros de estado
  const statusFilters: { value: StatusFilter; label: string; count?: number }[] = [
    { value: "all", label: "Todos" },
    { value: "pending", label: "Pendientes" },
    { value: "processing", label: "Procesando" },
    { value: "shipped", label: "Enviados" },
    { value: "delivered", label: "Entregados" },
    { value: "cancelled", label: "Cancelados" },
  ]

  return (
    <>
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
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <AccountSidebar />
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Filtros de estado */}
              <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-4 mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <Filter className="w-5 h-5 text-neutral-600" />
                  <span className="text-sm font-medium text-neutral-900">
                    Filtrar por estado
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {statusFilters.map((filter) => (
                    <button
                      key={filter.value}
                      onClick={() => setStatusFilter(filter.value)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                        statusFilter === filter.value
                          ? "bg-rose-600 text-white"
                          : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                      }`}
                    >
                      {filter.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Lista de pedidos */}
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
                    {statusFilter === "all"
                      ? "No tienes pedidos aún"
                      : `No tienes pedidos ${statusFilters.find((f) => f.value === statusFilter)?.label.toLowerCase()}`}
                  </h3>
                  <p className="text-neutral-600 mb-6 max-w-md mx-auto">
                    {statusFilter === "all"
                      ? "Explora nuestra colección de activewear y haz tu primera compra. ¡Envíos gratis en compras mayores a S/ 269!"
                      : "Intenta con otro filtro o continúa comprando."}
                  </p>
                  <div className="flex gap-4 justify-center">
                    {statusFilter !== "all" && (
                      <button
                        onClick={() => setStatusFilter("all")}
                        className="px-6 py-3 border-2 border-neutral-300 text-neutral-700 font-semibold rounded-full hover:border-neutral-400 transition-colors"
                      >
                        Ver todos
                      </button>
                    )}
                    <Link
                      href="/mujer"
                      className="px-6 py-3 bg-rose-600 text-white font-semibold rounded-full hover:bg-rose-700 transition-colors"
                    >
                      Seguir comprando
                    </Link>
                  </div>
                </div>
              ) : (
                // Grid de pedidos
                <div className="space-y-6">
                  {orders.map((order) => (
                    <OrderCard
                      key={order.id}
                      order={order}
                      onViewDetails={handleViewDetails}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal de detalles */}
      <OrderDetailsModal
        order={selectedOrder}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  )
}