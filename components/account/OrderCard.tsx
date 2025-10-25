// components/account/OrderCard.tsx
"use client"

import { Package, Truck, CheckCircle, Clock, XCircle, Eye } from "lucide-react"
import Image from "next/image"

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
  subtotal: number
  shipping_cost: number
  total: number
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  payment_method: string
  created_at: string
  items: OrderItem[]
}

interface OrderCardProps {
  order: Order
  onViewDetails: (order: Order) => void
}

export default function OrderCard({ order, onViewDetails }: OrderCardProps) {
  // Función para obtener color y texto del estado
  const getStatusInfo = (status: string) => {
    switch (status) {
      case "pending":
        return {
          icon: Clock,
          text: "Pendiente",
          color: "text-yellow-600",
          bg: "bg-yellow-50",
          border: "border-yellow-200",
        }
      case "processing":
        return {
          icon: Package,
          text: "Procesando",
          color: "text-blue-600",
          bg: "bg-blue-50",
          border: "border-blue-200",
        }
      case "shipped":
        return {
          icon: Truck,
          text: "Enviado",
          color: "text-purple-600",
          bg: "bg-purple-50",
          border: "border-purple-200",
        }
      case "delivered":
        return {
          icon: CheckCircle,
          text: "Entregado",
          color: "text-green-600",
          bg: "bg-green-50",
          border: "border-green-200",
        }
      case "cancelled":
        return {
          icon: XCircle,
          text: "Cancelado",
          color: "text-red-600",
          bg: "bg-red-50",
          border: "border-red-200",
        }
      default:
        return {
          icon: Package,
          text: "Desconocido",
          color: "text-gray-600",
          bg: "bg-gray-50",
          border: "border-gray-200",
        }
    }
  }

  const statusInfo = getStatusInfo(order.status)
  const StatusIcon = statusInfo.icon

  // Formatear fecha
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("es-PE", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  // Calcular total de items
  const totalItems = order.items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 overflow-hidden hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="p-6 border-b border-neutral-200">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3">
              <h3 className="text-lg font-semibold text-neutral-900">
                Pedido #{order.order_number}
              </h3>
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium border ${statusInfo.bg} ${statusInfo.color} ${statusInfo.border}`}
              >
                <StatusIcon className="w-4 h-4" />
                {statusInfo.text}
              </span>
            </div>
            <p className="text-sm text-neutral-600 mt-1">
              {formatDate(order.created_at)}
            </p>
          </div>

          <button
            onClick={() => onViewDetails(order)}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
          >
            <Eye className="w-4 h-4" />
            Ver detalles
          </button>
        </div>
      </div>

      {/* Productos */}
      <div className="p-6">
        <div className="space-y-3">
          {order.items.slice(0, 3).map((item) => (
            <div key={item.id} className="flex items-center gap-4">
              <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-neutral-100 flex-shrink-0">
                <Image
                  src={item.product_image}
                  alt={item.product_name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-neutral-900 truncate">
                  {item.product_name}
                </h4>
                <p className="text-xs text-neutral-600">
                  {item.variant_color} • Talla {item.variant_size} • Cant. {item.quantity}
                </p>
              </div>
              <div className="text-sm font-semibold text-neutral-900">
                S/ {item.total_price.toFixed(2)}
              </div>
            </div>
          ))}

          {order.items.length > 3 && (
            <p className="text-sm text-neutral-600 italic">
              + {order.items.length - 3} producto(s) más
            </p>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="px-6 py-4 bg-neutral-50 border-t border-neutral-200">
        <div className="flex items-center justify-between">
          <div className="text-sm text-neutral-600">
            <span className="font-medium">{totalItems}</span> producto
            {totalItems !== 1 ? "s" : ""}
          </div>
          <div className="text-right">
            <p className="text-xs text-neutral-600">Total</p>
            <p className="text-xl font-bold text-neutral-900">
              S/ {order.total.toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}