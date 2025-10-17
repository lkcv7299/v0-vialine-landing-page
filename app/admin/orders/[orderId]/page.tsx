"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, Package, User, MapPin, CreditCard, Phone, Mail } from "lucide-react"

type OrderDetail = {
  order_id: string
  customer_first_name: string
  customer_last_name: string
  customer_email: string
  customer_phone: string
  shipping_address: string
  shipping_district: string
  shipping_city: string
  shipping_reference: string
  subtotal: number
  shipping_cost: number
  total: number
  payment_method: string
  notes: string
  status: string
  created_at: string
  items: Array<{
    product_title: string
    product_price: number
    selected_color: string
    selected_size: string
    quantity: number
    item_total: number
  }>
}

export default function OrderDetailPage() {
  const params = useParams()
  const router = useRouter()
  const orderId = params.orderId as string

  const [order, setOrder] = useState<OrderDetail | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadOrderDetail()
  }, [orderId])

  const loadOrderDetail = async () => {
    try {
      const response = await fetch(`/api/admin/orders/${orderId}`)
      if (response.ok) {
        const data = await response.json()
        setOrder(data.order)
      }
    } catch (error) {
      console.error("Error cargando orden:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-rose-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-neutral-600">Cargando orden...</p>
        </div>
      </div>
    )
  }

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Package className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold mb-2">Orden no encontrada</h2>
          <button
            onClick={() => router.push("/admin/dashboard")}
            className="text-rose-600 hover:underline"
          >
            Volver al dashboard
          </button>
        </div>
      </div>
    )
  }

  const getPaymentMethodLabel = (method: string) => {
    const labels = {
      culqi: "💳 Tarjeta de crédito/débito",
      yape: "📱 Yape",
      contraentrega: "💵 Contra entrega"
    }
    return labels[method as keyof typeof labels] || method
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <header className="bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <button
            onClick={() => router.push("/admin/dashboard")}
            className="flex items-center gap-2 text-neutral-700 hover:text-neutral-900 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al dashboard
          </button>
          <h1 className="text-2xl font-bold text-neutral-900">
            Orden #{order.order_id}
          </h1>
          <p className="text-sm text-neutral-600">
            {new Date(order.created_at).toLocaleString("es-PE", {
              dateStyle: "full",
              timeStyle: "short"
            })}
          </p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Columna izquierda - Información */}
          <div className="lg:col-span-2 space-y-6">
            {/* Cliente */}
            <div className="bg-white rounded-lg border border-neutral-200 p-6">
              <div className="flex items-center gap-2 mb-4">
                <User className="w-5 h-5 text-rose-600" />
                <h2 className="text-lg font-semibold">Información del Cliente</h2>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-neutral-600">Nombre completo</p>
                  <p className="font-medium">
                    {order.customer_first_name} {order.customer_last_name}
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-neutral-600 flex items-center gap-2">
                      <Mail className="w-4 h-4" /> Email
                    </p>
                    <a href={`mailto:${order.customer_email}`} className="text-rose-600 hover:underline">
                      {order.customer_email}
                    </a>
                  </div>
                  <div>
                    <p className="text-sm text-neutral-600 flex items-center gap-2">
                      <Phone className="w-4 h-4" /> Teléfono
                    </p>
                    <a
                      href={`https://wa.me/51${order.customer_phone.replace(/\D/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-rose-600 hover:underline"
                    >
                      {order.customer_phone}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Dirección */}
            <div className="bg-white rounded-lg border border-neutral-200 p-6">
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="w-5 h-5 text-rose-600" />
                <h2 className="text-lg font-semibold">Dirección de Envío</h2>
              </div>
              <div className="space-y-2">
                <p className="font-medium">{order.shipping_address}</p>
                <p className="text-neutral-600">
                  {order.shipping_district}, {order.shipping_city}
                </p>
                {order.shipping_reference && (
                  <div className="bg-neutral-50 p-3 rounded-lg mt-3">
                    <p className="text-sm text-neutral-600">Referencia:</p>
                    <p className="text-sm">{order.shipping_reference}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Productos */}
            <div className="bg-white rounded-lg border border-neutral-200 p-6">
              <div className="flex items-center gap-2 mb-4">
                <Package className="w-5 h-5 text-rose-600" />
                <h2 className="text-lg font-semibold">Productos ({order.items.length})</h2>
              </div>
              <div className="space-y-4">
                {order.items.map((item, index) => (
                  <div key={index} className="flex justify-between items-start pb-4 border-b border-neutral-200 last:border-0">
                    <div className="flex-1">
                      <p className="font-medium">{item.product_title}</p>
                      <p className="text-sm text-neutral-600">
                        Color: {item.selected_color} • Talla: {item.selected_size}
                      </p>
                      <p className="text-sm text-neutral-600">
                        Cantidad: {item.quantity}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">S/ {Number(item.item_total).toFixed(2)}</p>
                      <p className="text-sm text-neutral-600">
                        S/ {Number(item.product_price).toFixed(2)} c/u
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Notas */}
            {order.notes && (
              <div className="bg-amber-50 rounded-lg border border-amber-200 p-6">
                <h3 className="font-semibold text-amber-900 mb-2">📝 Notas del Cliente</h3>
                <p className="text-amber-800">{order.notes}</p>
              </div>
            )}
          </div>

          {/* Columna derecha - Resumen */}
          <div className="space-y-6">
            {/* Resumen */}
            <div className="bg-white rounded-lg border border-neutral-200 p-6 sticky top-4">
              <h2 className="text-lg font-semibold mb-4">Resumen de Orden</h2>
              
              <div className="space-y-3 mb-4 pb-4 border-b border-neutral-200">
                <div className="flex justify-between">
                  <span className="text-neutral-600">Subtotal</span>
                  <span className="font-medium">S/ {Number(order.subtotal).toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600">Envío</span>
                  <span className="font-medium">
{Number(order.shipping_cost) === 0 ? (
    <span className="text-green-600">¡GRATIS!</span>
  ) : (
    <>S/ {Number(order.shipping_cost).toFixed(2)}</>
  )}
</span>
                </div>
              </div>

              <div className="flex justify-between text-lg font-bold mb-6">
                <span>Total</span>
                <span className="text-rose-600">S/ {Number(order.total).toFixed(2)}</span>
              </div>

              {/* Método de pago */}
              <div className="bg-neutral-50 rounded-lg p-4 mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <CreditCard className="w-4 h-4 text-neutral-600" />
                  <span className="text-sm text-neutral-600">Método de pago</span>
                </div>
                <p className="font-medium">{getPaymentMethodLabel(order.payment_method)}</p>
              </div>

              {/* Acciones rápidas */}
              <div className="space-y-3">
                <a
                  href={`https://wa.me/51${order.customer_phone.replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition"
                >
                  Contactar por WhatsApp
                </a>
                <a
                  href={`mailto:${order.customer_email}`}
                  className="block w-full text-center bg-neutral-100 text-neutral-900 py-3 rounded-lg font-semibold hover:bg-neutral-200 transition"
                >
                  Enviar Email
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}