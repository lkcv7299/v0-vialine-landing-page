"use client"

import { useEffect, useState, use } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { createClient } from "@/lib/supabase/client"
import {
  ArrowLeft,
  Package,
  User,
  MapPin,
  CreditCard,
  Clock,
  CheckCircle,
  Truck,
  XCircle,
  Loader2,
  Phone,
  Mail,
  FileText,
  Save
} from "lucide-react"

type OrderItem = {
  id: string
  product_slug: string
  product_title: string
  product_price: number
  product_image: string | null
  color_name: string | null
  size: string | null
  quantity: number
  item_total: number
}

type Order = {
  id: string
  order_number: string
  customer_name: string
  customer_email: string
  customer_phone: string | null
  shipping_address: any
  subtotal: number
  shipping_cost: number
  total: number
  status: string | null
  payment_method: string | null
  payment_status: string | null
  customer_notes: string | null
  created_at: string | null
  updated_at: string | null
  items: OrderItem[]
}

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
  pending_payment: "bg-orange-100 text-orange-800 border-orange-200",
  paid: "bg-green-100 text-green-800 border-green-200",
  processing: "bg-blue-100 text-blue-800 border-blue-200",
  shipped: "bg-purple-100 text-purple-800 border-purple-200",
  delivered: "bg-green-100 text-green-800 border-green-200",
  cancelled: "bg-red-100 text-red-800 border-red-200",
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

const statusFlow = ["pending", "paid", "processing", "shipped", "delivered"]

export default function OrderDetailPage({ params }: { params: Promise<{ orderId: string }> }) {
  const { orderId } = use(params)
  const router = useRouter()
  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)
  const [newStatus, setNewStatus] = useState("")

  useEffect(() => {
    const fetchOrder = async () => {
      const supabase = createClient()

      // Get order
      const { data: orderData, error: orderError } = await supabase
        .from("orders")
        .select("*")
        .eq("order_number", orderId)
        .single()

      if (orderError || !orderData) {
        console.error("Error fetching order:", orderError)
        setLoading(false)
        return
      }

      // Get order items
      const { data: itemsData } = await supabase
        .from("order_items")
        .select("*")
        .eq("order_id", orderData.id)

      setOrder({
        ...orderData,
        items: itemsData || []
      })
      setNewStatus(orderData.status || "pending")
      setLoading(false)
    }

    fetchOrder()
  }, [orderId])

  const updateStatus = async () => {
    if (!order || newStatus === order.status) return

    setUpdating(true)
    const supabase = createClient()

    const { error } = await supabase
      .from("orders")
      .update({
        status: newStatus,
        updated_at: new Date().toISOString()
      })
      .eq("id", order.id)

    if (error) {
      console.error("Error updating status:", error)
      alert("Error al actualizar el estado")
    } else {
      setOrder({ ...order, status: newStatus })
      // Optionally trigger email notification here
    }

    setUpdating(false)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-pink-600" />
      </div>
    )
  }

  if (!order) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 mb-4">Orden no encontrada</p>
        <Link href="/admin/ordenes" className="text-pink-600 hover:text-pink-700">
          ← Volver a órdenes
        </Link>
      </div>
    )
  }

  const shippingAddr = order.shipping_address || {}

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/ordenes"
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Orden {order.order_number}</h1>
            <p className="text-sm text-gray-500">
              Creada el {order.created_at ? new Date(order.created_at).toLocaleDateString("es-PE", {
                day: "2-digit",
                month: "long",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit"
              }) : "-"}
            </p>
          </div>
        </div>
        <span className={`px-4 py-2 rounded-full text-sm font-medium border ${order.status ? statusColors[order.status] || "bg-gray-100 text-gray-800 border-gray-200" : "bg-gray-100 text-gray-800 border-gray-200"}`}>
          {order.status ? statusLabels[order.status] || order.status : "-"}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Order Items */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-4 border-b border-gray-100 flex items-center gap-2">
              <Package className="h-5 w-5 text-gray-400" />
              <h2 className="font-semibold text-gray-900">Productos ({order.items.length})</h2>
            </div>
            <div className="divide-y divide-gray-100">
              {order.items.map((item) => (
                <div key={item.id} className="p-4 flex gap-4">
                  <div className="relative h-20 w-20 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                    {item.product_image ? (
                      <Image
                        src={item.product_image}
                        alt={item.product_title}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Package className="h-8 w-8 text-gray-300" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/producto/${item.product_slug}`}
                      target="_blank"
                      className="font-medium text-gray-900 hover:text-pink-600"
                    >
                      {item.product_title}
                    </Link>
                    <div className="mt-1 text-sm text-gray-500">
                      {item.color_name && <span>Color: {item.color_name}</span>}
                      {item.color_name && item.size && <span className="mx-2">•</span>}
                      {item.size && <span>Talla: {item.size}</span>}
                    </div>
                    <div className="mt-1 text-sm">
                      <span className="text-gray-600">S/ {item.product_price?.toFixed(2)}</span>
                      <span className="text-gray-400 mx-2">×</span>
                      <span className="text-gray-600">{item.quantity}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">
                      S/ {item.item_total?.toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            {/* Order totals */}
            <div className="p-4 bg-gray-50 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span className="text-gray-900">S/ {order.subtotal?.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Envío</span>
                <span className="text-gray-900">S/ {order.shipping_cost?.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-base font-semibold pt-2 border-t border-gray-200">
                <span className="text-gray-900">Total</span>
                <span className="text-pink-600">S/ {order.total?.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Customer Notes */}
          {order.customer_notes && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
              <div className="flex items-center gap-2 mb-2">
                <FileText className="h-5 w-5 text-gray-400" />
                <h2 className="font-semibold text-gray-900">Notas del cliente</h2>
              </div>
              <p className="text-gray-600 text-sm">{order.customer_notes}</p>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Update Status */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
            <h2 className="font-semibold text-gray-900 mb-4">Actualizar Estado</h2>
            <select
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent mb-3"
            >
              {Object.entries(statusLabels).map(([value, label]) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
            <button
              onClick={updateStatus}
              disabled={updating || newStatus === order.status}
              className="w-full py-2 px-4 bg-pink-600 hover:bg-pink-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {updating ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Actualizando...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  Guardar cambios
                </>
              )}
            </button>
          </div>

          {/* Customer Info */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
            <div className="flex items-center gap-2 mb-4">
              <User className="h-5 w-5 text-gray-400" />
              <h2 className="font-semibold text-gray-900">Cliente</h2>
            </div>
            <div className="space-y-3">
              <p className="font-medium text-gray-900">{order.customer_name}</p>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Mail className="h-4 w-4" />
                <a href={`mailto:${order.customer_email}`} className="hover:text-pink-600">
                  {order.customer_email}
                </a>
              </div>
              {order.customer_phone && (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Phone className="h-4 w-4" />
                  <a href={`tel:${order.customer_phone}`} className="hover:text-pink-600">
                    {order.customer_phone}
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Shipping Address */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="h-5 w-5 text-gray-400" />
              <h2 className="font-semibold text-gray-900">Dirección de envío</h2>
            </div>
            <div className="text-sm text-gray-600 space-y-1">
              <p>{shippingAddr.address}</p>
              <p>{shippingAddr.district}, {shippingAddr.city}</p>
              {shippingAddr.postalCode && <p>CP: {shippingAddr.postalCode}</p>}
              {shippingAddr.reference && (
                <p className="text-gray-500 italic mt-2">Ref: {shippingAddr.reference}</p>
              )}
            </div>
          </div>

          {/* Payment Info */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
            <div className="flex items-center gap-2 mb-4">
              <CreditCard className="h-5 w-5 text-gray-400" />
              <h2 className="font-semibold text-gray-900">Pago</h2>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Método</span>
                <span className="text-gray-900">
                  {order.payment_method === "culqi" ? "Tarjeta (Culqi)" : "Contra entrega"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Estado</span>
                <span className={order.payment_status === "paid" ? "text-green-600" : "text-orange-600"}>
                  {order.payment_status === "paid" ? "Pagado" : "Pendiente"}
                </span>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
            <div className="flex items-center gap-2 mb-4">
              <Clock className="h-5 w-5 text-gray-400" />
              <h2 className="font-semibold text-gray-900">Historial</h2>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <div className="h-2 w-2 rounded-full bg-green-500" />
                <span className="text-gray-600">Orden creada</span>
                <span className="text-gray-400 ml-auto">
                  {order.created_at ? new Date(order.created_at).toLocaleDateString("es-PE") : "-"}
                </span>
              </div>
              {order.updated_at && order.updated_at !== order.created_at && (
                <div className="flex items-center gap-3 text-sm">
                  <div className="h-2 w-2 rounded-full bg-blue-500" />
                  <span className="text-gray-600">Última actualización</span>
                  <span className="text-gray-400 ml-auto">
                    {new Date(order.updated_at).toLocaleDateString("es-PE")}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
