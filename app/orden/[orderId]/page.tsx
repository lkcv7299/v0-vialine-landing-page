"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { Package, CheckCircle, Clock, Truck, Home, MapPin, Phone, Mail, CreditCard, MessageSquare } from "lucide-react"

type OrderItem = {
  productTitle: string
  productPrice: number
  quantity: number
  selectedColor: string
  selectedSize: string
}

type Order = {
  order_id: string
  status: string
  customer_first_name: string
  customer_last_name: string
  customer_email: string
  customer_phone: string
  shipping_address: string
  shipping_district: string
  shipping_city: string
  shipping_postal_code: string
  shipping_reference: string
  items: OrderItem[]
  subtotal: number | string
  shipping_cost: number | string
  total: number | string
  payment_method: string
  payment_status: string
  notes: string
  created_at: string
  updated_at: string
}

export default function OrderTrackingPage() {
  const params = useParams()
  const orderId = params.orderId as string

  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  // ✅ HELPER: Parsear números de forma segura
  const parseNumber = (value: number | string): number => {
    if (typeof value === 'number') return value
    return parseFloat(value) || 0
  }

  useEffect(() => {
    loadOrder()
  }, [orderId])

  const loadOrder = async () => {
    try {
      const response = await fetch(`/api/orders/${orderId}`)
      
      if (!response.ok) {
        setError("Orden no encontrada")
        setLoading(false)
        return
      }

      const data = await response.json()
      setOrder(data.order)
    } catch (err) {
      console.error("Error cargando orden:", err)
      setError("Error al cargar la orden")
    } finally {
      setLoading(false)
    }
  }

  // Estados y sus configuraciones
  const orderStatuses = {
    pending_payment: {
      label: "Pendiente de Pago",
      color: "text-yellow-600",
      bg: "bg-yellow-50",
      icon: Clock,
      description: "Esperando confirmación del pago"
    },
    paid: {
      label: "Pagada",
      color: "text-green-600",
      bg: "bg-green-50",
      icon: CheckCircle,
      description: "Pago confirmado exitosamente"
    },
    processing: {
      label: "En Preparación",
      color: "text-blue-600",
      bg: "bg-blue-50",
      icon: Package,
      description: "Estamos preparando tu pedido"
    },
    shipped: {
      label: "Enviada",
      color: "text-purple-600",
      bg: "bg-purple-50",
      icon: Truck,
      description: "Tu pedido está en camino"
    },
    delivered: {
      label: "Entregada",
      color: "text-green-600",
      bg: "bg-green-50",
      icon: Home,
      description: "Pedido entregado exitosamente"
    },
    cancelled: {
      label: "Cancelada",
      color: "text-red-600",
      bg: "bg-red-50",
      icon: Package,
      description: "Orden cancelada"
    }
  }

  const getStatusConfig = (status: string) => {
    return orderStatuses[status as keyof typeof orderStatuses] || orderStatuses.pending_payment
  }

  // Timeline de estados
  const getTimeline = () => {
    const allSteps = [
      { key: "paid", label: "Pagada", icon: CheckCircle },
      { key: "processing", label: "En Preparación", icon: Package },
      { key: "shipped", label: "Enviada", icon: Truck },
      { key: "delivered", label: "Entregada", icon: Home }
    ]

    const currentStatusIndex = allSteps.findIndex(step => step.key === order?.status)
    
    return allSteps.map((step, index) => ({
      ...step,
      completed: index <= currentStatusIndex,
      active: step.key === order?.status
    }))
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-white pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-8 bg-neutral-200 rounded w-1/3 mb-4"></div>
            <div className="h-64 bg-neutral-100 rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !order) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-white pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Package className="w-16 h-16 text-neutral-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-neutral-900 mb-2">
            Orden no encontrada
          </h1>
          <p className="text-neutral-600 mb-8">
            No pudimos encontrar la orden #{orderId}
          </p>
          <Link
            href="/"
            className="inline-block px-6 py-3 bg-rose-600 text-white rounded-lg font-semibold hover:bg-rose-700 transition"
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    )
  }

  const statusConfig = getStatusConfig(order.status)
  const StatusIcon = statusConfig.icon

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-white pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4">
        
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/"
            className="text-rose-600 hover:text-rose-700 font-medium mb-4 inline-block"
          >
            ← Volver al inicio
          </Link>
          <h1 className="text-3xl font-bold text-neutral-900 mb-2">
            Seguimiento de Orden
          </h1>
          <p className="text-neutral-600">
            Orden #{order.order_id}
          </p>
        </div>

        {/* Estado actual */}
        <div className={`${statusConfig.bg} rounded-2xl p-6 mb-6 border border-${statusConfig.color.replace('text-', '')}-200`}>
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 ${statusConfig.bg} rounded-full flex items-center justify-center`}>
              <StatusIcon className={`w-6 h-6 ${statusConfig.color}`} />
            </div>
            <div>
              <h2 className={`text-xl font-semibold ${statusConfig.color}`}>
                {statusConfig.label}
              </h2>
              <p className="text-neutral-600">{statusConfig.description}</p>
            </div>
          </div>
        </div>

        {/* Timeline - Solo si no está cancelada */}
        {order.status !== "cancelled" && order.status !== "pending_payment" && (
          <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-6 mb-6">
            <h3 className="text-lg font-semibold mb-6">Progreso del Pedido</h3>
            <div className="relative">
              {/* Línea de progreso */}
              <div className="absolute top-5 left-0 right-0 h-1 bg-neutral-200">
                <div 
                  className="h-full bg-rose-600 transition-all duration-500"
                  style={{ width: `${(getTimeline().filter(s => s.completed).length - 1) / (getTimeline().length - 1) * 100}%` }}
                />
              </div>

              {/* Steps */}
              <div className="relative flex justify-between">
                {getTimeline().map((step, index) => {
                  const StepIcon = step.icon
                  return (
                    <div key={step.key} className="flex flex-col items-center">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-all ${
                          step.completed
                            ? "bg-rose-600 text-white"
                            : "bg-neutral-200 text-neutral-400"
                        } ${step.active ? "ring-4 ring-rose-200" : ""}`}
                      >
                        <StepIcon className="w-5 h-5" />
                      </div>
                      <span className={`text-xs text-center font-medium ${
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Información del cliente */}
          <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-6">
            <h3 className="text-lg font-semibold mb-4">Información de Contacto</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-neutral-400 mt-0.5" />
                <div>
                  <p className="text-sm text-neutral-600">Email</p>
                  <p className="font-medium">{order.customer_email}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-neutral-400 mt-0.5" />
                <div>
                  <p className="text-sm text-neutral-600">Teléfono</p>
                  <p className="font-medium">{order.customer_phone}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Dirección de envío */}
          <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-6">
            <h3 className="text-lg font-semibold mb-4">Dirección de Envío</h3>
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-neutral-400 mt-0.5" />
              <div>
                <p className="font-medium">{order.shipping_address}</p>
                <p className="text-neutral-600">{order.shipping_district}</p>
                <p className="text-neutral-600">{order.shipping_city} - {order.shipping_postal_code}</p>
                {order.shipping_reference && (
                  <p className="text-sm text-neutral-500 mt-2">
                    Referencia: {order.shipping_reference}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Productos */}
        <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-6 mb-6">
          <h3 className="text-lg font-semibold mb-4">Productos</h3>
          <div className="space-y-4">
            {order.items && order.items.map((item, index) => (
              <div key={index} className="flex justify-between items-start pb-4 border-b border-neutral-200 last:border-0">
                <div className="flex-1">
                  <h4 className="font-medium text-neutral-900">{item.productTitle}</h4>
                  <p className="text-sm text-neutral-600">
                    Color: {item.selectedColor} | Talla: {item.selectedSize}
                  </p>
                  <p className="text-sm text-neutral-600">Cantidad: {item.quantity}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-neutral-900">
                    S/ {(parseNumber(item.productPrice) * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-neutral-200 space-y-2">
            <div className="flex justify-between text-neutral-600">
              <span>Subtotal</span>
              <span>S/ {parseNumber(order.subtotal).toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-neutral-600">
              <span>Envío</span>
              <span>{parseNumber(order.shipping_cost) === 0 ? "GRATIS" : `S/ ${parseNumber(order.shipping_cost).toFixed(2)}`}</span>
            </div>
            <div className="flex justify-between text-lg font-bold text-neutral-900 pt-2 border-t border-neutral-200">
              <span>Total</span>
              <span>S/ {parseNumber(order.total).toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Información adicional */}
        <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-6">
          <h3 className="text-lg font-semibold mb-4">Información Adicional</h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <CreditCard className="w-5 h-5 text-neutral-400 mt-0.5" />
              <div>
                <p className="text-sm text-neutral-600">Método de pago</p>
                <p className="font-medium capitalize">{order.payment_method}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-neutral-400 mt-0.5" />
              <div>
                <p className="text-sm text-neutral-600">Fecha de orden</p>
                <p className="font-medium">
                  {new Date(order.created_at).toLocaleDateString("es-PE", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit"
                  })}
                </p>
              </div>
            </div>
            {order.notes && (
              <div className="flex items-start gap-3">
                <MessageSquare className="w-5 h-5 text-neutral-400 mt-0.5" />
                <div>
                  <p className="text-sm text-neutral-600">Notas</p>
                  <p className="font-medium">{order.notes}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Botón de contacto */}
        <div className="mt-6 text-center">
          <p className="text-neutral-600 mb-4">¿Necesitas ayuda con tu pedido?</p>
          <a
            href="https://wa.me/51972327236"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#25D366] text-white rounded-lg font-semibold hover:bg-[#20BA5A] transition"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
            Contactar por WhatsApp
          </a>
        </div>

      </div>
    </div>
  )
}