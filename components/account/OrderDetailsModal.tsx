// components/account/OrderDetailsModal.tsx
"use client"

import { X, Package, MapPin, CreditCard, Calendar, Truck, Phone, Mail, CheckCircle, Clock, Home } from "lucide-react"
import Image from "next/image"
import { useEffect } from "react"

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
  status: string
  payment_method: string
  created_at: string
  items: OrderItem[]
  notes?: string
}

interface OrderDetailsModalProps {
  order: Order | null
  isOpen: boolean
  onClose: () => void
}

export default function OrderDetailsModal({ order, isOpen, onClose }: OrderDetailsModalProps) {
  // Cerrar con ESC
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    if (isOpen) {
      window.addEventListener("keydown", handleEsc)
      document.body.style.overflow = "hidden"
    }
    return () => {
      window.removeEventListener("keydown", handleEsc)
      document.body.style.overflow = "unset"
    }
  }, [isOpen, onClose])

  if (!isOpen || !order) return null

  // Formatear fecha
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("es-PE", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  // Traducir método de pago
  const getPaymentMethodText = (method: string) => {
    switch (method) {
      case "culqi":
        return "Tarjeta de crédito/débito"
      case "yape":
        return "Yape"
      case "contraentrega":
        return "Pago contra entrega"
      default:
        return method
    }
  }

  // Traducir estado
  const getStatusText = (status: string) => {
    switch (status) {
      case "pending":
        return "Pendiente"
      case "processing":
        return "Procesando"
      case "shipped":
        return "Enviado"
      case "delivered":
        return "Entregado"
      case "cancelled":
        return "Cancelado"
      default:
        return status
    }
  }

  // Timeline de estados
  const getTimeline = () => {
    const allSteps = [
      { key: "paid", label: "Pagada", icon: CheckCircle },
      { key: "processing", label: "En Preparación", icon: Package },
      { key: "shipped", label: "Enviada", icon: Truck },
      { key: "delivered", label: "Entregada", icon: Home }
    ]

    // Mapear estados de la DB a estados del timeline
    const statusMapping: Record<string, string> = {
      "pending": "paid",
      "processing": "processing",
      "shipped": "shipped",
      "delivered": "delivered"
    }

    const mappedStatus = statusMapping[order.status] || "paid"
    const currentStatusIndex = allSteps.findIndex(step => step.key === mappedStatus)

    return allSteps.map((step, index) => ({
      ...step,
      completed: index <= currentStatusIndex,
      active: step.key === mappedStatus
    }))
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-50 transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div
          className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto pointer-events-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-neutral-200 p-6 flex items-center justify-between z-10">
            <div>
              <h2 className="text-2xl font-bold text-neutral-900">
                Pedido #{order.order_number}
              </h2>
              <p className="text-sm text-neutral-600 mt-1">
                Realizado el {formatDate(order.created_at)}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-neutral-100 rounded-full transition-colors"
            >
              <X className="w-6 h-6 text-neutral-600" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Estado del pedido */}
            <div className="bg-rose-50 border border-rose-200 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <Package className="w-6 h-6 text-rose-600" />
                <div>
                  <p className="text-sm font-medium text-rose-900">
                    Estado actual
                  </p>
                  <p className="text-lg font-bold text-rose-600">
                    {getStatusText(order.status)}
                  </p>
                </div>
              </div>
            </div>

            {/* Timeline - Solo si no está cancelada */}
            {order.status !== "cancelled" && (
              <div className="bg-white rounded-lg border border-neutral-200 p-6">
                <h3 className="text-lg font-semibold mb-6 text-neutral-900">Progreso del Pedido</h3>
                <div className="relative">
                  {/* Línea de progreso */}
                  <div className="absolute top-5 left-0 right-0 h-1 bg-neutral-200">
                    <div
                      className="h-full bg-rose-600 transition-all duration-500"
                      style={{
                        width: `${(getTimeline().filter(s => s.completed).length - 1) / (getTimeline().length - 1) * 100}%`
                      }}
                    />
                  </div>

                  {/* Steps */}
                  <div className="relative flex justify-between">
                    {getTimeline().map((step) => {
                      const StepIcon = step.icon
                      return (
                        <div key={step.key} className="flex flex-col items-center flex-1 max-w-[100px]">
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-all ${
                              step.completed
                                ? "bg-rose-600 text-white"
                                : "bg-neutral-200 text-neutral-400"
                            } ${step.active ? "ring-4 ring-rose-200" : ""}`}
                          >
                            <StepIcon className="w-5 h-5" />
                          </div>
                          <span className={`text-xs text-center font-medium leading-tight ${
                            step.completed ? "text-neutral-900" : "text-neutral-400"
                          }`}>
                            {step.label}
                          </span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* Grid de información */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Información de contacto */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-neutral-900 flex items-center gap-2">
                  <Mail className="w-5 h-5 text-rose-600" />
                  Información de contacto
                </h3>
                <div className="bg-neutral-50 rounded-lg p-4 space-y-2">
                  <div>
                    <p className="text-xs text-neutral-600">Nombre</p>
                    <p className="font-medium text-neutral-900">
                      {order.customer_name} {order.customer_lastname}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-neutral-600">Email</p>
                    <p className="font-medium text-neutral-900">
                      {order.customer_email}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-neutral-600">Teléfono</p>
                    <p className="font-medium text-neutral-900">
                      {order.customer_phone}
                    </p>
                  </div>
                </div>
              </div>

              {/* Dirección de envío */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-neutral-900 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-rose-600" />
                  Dirección de envío
                </h3>
                <div className="bg-neutral-50 rounded-lg p-4 space-y-2">
                  <p className="font-medium text-neutral-900">
                    {order.shipping_address}
                  </p>
                  <p className="text-neutral-700">
                    {order.shipping_district}, {order.shipping_city}
                  </p>
                  {order.shipping_postal_code && (
                    <p className="text-neutral-700">
                      C.P. {order.shipping_postal_code}
                    </p>
                  )}
                  {order.shipping_reference && (
                    <div className="pt-2 border-t border-neutral-200">
                      <p className="text-xs text-neutral-600">Referencia</p>
                      <p className="text-sm text-neutral-700">
                        {order.shipping_reference}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Método de pago */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-neutral-900 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-rose-600" />
                Método de pago
              </h3>
              <div className="bg-neutral-50 rounded-lg p-4">
                <p className="font-medium text-neutral-900">
                  {getPaymentMethodText(order.payment_method)}
                </p>
              </div>
            </div>

            {/* Productos */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-neutral-900 flex items-center gap-2">
                <Package className="w-5 h-5 text-rose-600" />
                Productos ({order.items.length})
              </h3>
              <div className="border border-neutral-200 rounded-lg overflow-hidden">
                <div className="divide-y divide-neutral-200">
                  {order.items.map((item) => (
                    <div key={item.id} className="p-4 flex items-center gap-4">
                      <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-neutral-100 flex-shrink-0">
                        <Image
                          src={item.product_image}
                          alt={item.product_name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-neutral-900">
                          {item.product_name}
                        </h4>
                        <p className="text-sm text-neutral-600">
                          Color: {item.variant_color} • Talla: {item.variant_size}
                        </p>
                        <p className="text-sm text-neutral-600">
                          Cantidad: {item.quantity}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-neutral-600">
                          S/ {item.unit_price.toFixed(2)} c/u
                        </p>
                        <p className="font-semibold text-neutral-900">
                          S/ {item.total_price.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Resumen de costos */}
            <div className="bg-neutral-50 rounded-lg p-6 space-y-3">
              <div className="flex justify-between text-neutral-700">
                <span>Subtotal</span>
                <span>S/ {order.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-neutral-700">
                <span>Envío</span>
                <span>
                  {order.shipping_cost === 0
                    ? "Gratis"
                    : `S/ ${order.shipping_cost.toFixed(2)}`}
                </span>
              </div>
              <div className="pt-3 border-t-2 border-neutral-300 flex justify-between">
                <span className="text-lg font-bold text-neutral-900">Total</span>
                <span className="text-2xl font-bold text-rose-600">
                  S/ {order.total.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Notas (si hay) */}
            {order.notes && (
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-neutral-900">
                  Notas adicionales
                </h3>
                <div className="bg-neutral-50 rounded-lg p-4">
                  <p className="text-neutral-700">{order.notes}</p>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="sticky bottom-0 bg-white border-t border-neutral-200 p-6">
            <button
              onClick={onClose}
              className="w-full py-3 px-6 bg-rose-600 text-white font-semibold rounded-lg hover:bg-rose-700 transition-colors"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </>
  )
}