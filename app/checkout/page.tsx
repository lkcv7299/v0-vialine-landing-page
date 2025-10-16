"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useCart } from "@/contexts/CartContext"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import Image from "next/image"
import Link from "next/link"
import { toast } from "sonner"
import { ShoppingBag, Truck, CreditCard, ArrowLeft } from "lucide-react"

// ====================================
// SCHEMA DE VALIDACIÓN
// ====================================

const checkoutSchema = z.object({
  // Información personal
  firstName: z.string().min(2, "Nombre debe tener al menos 2 caracteres"),
  lastName: z.string().min(2, "Apellido debe tener al menos 2 caracteres"),
  email: z.string().email("Email inválido"),
  phone: z.string().min(9, "Teléfono debe tener al menos 9 dígitos"),
  
  // Dirección de envío
  address: z.string().min(10, "Dirección debe tener al menos 10 caracteres"),
  district: z.string().min(2, "Distrito es requerido"),
  city: z.string().default("Lima"),
  postalCode: z.string().optional(),
  reference: z.string().optional(),
  
  // Método de pago
  paymentMethod: z.enum(["culqi", "yape", "contraentrega"], {
    required_error: "Selecciona un método de pago",
  }),
  
  // Notas adicionales
  notes: z.string().optional(),
})

type CheckoutFormData = z.infer<typeof checkoutSchema>

// ====================================
// COMPONENTE PRINCIPAL
// ====================================

export default function CheckoutPage() {
  const router = useRouter()
  const { items, total, clearCart } = useCart()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      city: "Lima",
      paymentMethod: "culqi",
    },
  })

  const selectedPaymentMethod = watch("paymentMethod")

  // Calcular envío (gratis si > S/269)
  const shippingCost = total >= 269 ? 0 : 15
  const finalTotal = total + shippingCost

  // Si no hay items, redirigir
  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <ShoppingBag className="w-16 h-16 mx-auto text-neutral-300 mb-4" />
          <h2 className="text-2xl font-semibold mb-2">Tu carrito está vacío</h2>
          <p className="text-neutral-600 mb-6">Agrega productos para continuar con tu compra</p>
          <Link
            href="/mujer"
            className="inline-flex items-center px-6 py-3 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition"
          >
            Ir a comprar
          </Link>
        </div>
      </div>
    )
  }

  // Handler del submit
  const onSubmit = async (data: CheckoutFormData) => {
    setIsSubmitting(true)
    
    try {
      // Preparar datos de la orden usando TU estructura actual
      const orderData = {
        customer: {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phone: data.phone,
        },
        shippingAddress: {
          address: data.address,
          district: data.district,
          city: data.city,
          postalCode: data.postalCode || "",
          reference: data.reference || "",
        },
        items: items.map((item) => ({
          productSlug: item.product.slug,
          productTitle: item.product.title,
          productPrice: item.product.price,
          productImage: item.product.image,
          quantity: item.quantity,
          selectedColor: item.selectedColor,
          selectedSize: item.selectedSize,
        })),
        subtotal: total,
        shippingCost: shippingCost,
        total: finalTotal,
        paymentMethod: data.paymentMethod,
        notes: data.notes || "",
        createdAt: new Date().toISOString(),
      }

      // Enviar orden al API
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      })

      if (!response.ok) {
        throw new Error("Error al procesar la orden")
      }

      const result = await response.json()

      // Dependiendo del método de pago, redirigir
      if (data.paymentMethod === "culqi") {
        // Redirigir a Culqi checkout
        window.location.href = result.paymentUrl
      } else if (data.paymentMethod === "yape") {
        // Mostrar QR de Yape
        router.push(`/checkout/yape?orderId=${result.orderId}`)
      } else {
        // Pago contra entrega - ir directo a confirmación
        clearCart()
        router.push(`/checkout/confirmacion?orderId=${result.orderId}`)
      }
    } catch (error) {
      console.error("Error:", error)
      toast.error("Hubo un error al procesar tu orden. Por favor intenta nuevamente.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-neutral-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/mujer"
            className="inline-flex items-center text-sm text-neutral-600 hover:text-neutral-900 mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Seguir comprando
          </Link>
          <h1 className="text-3xl font-bold">Checkout</h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* FORMULARIO - 2 columnas */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Información Personal */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <span className="w-8 h-8 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center text-sm font-bold mr-3">
                    1
                  </span>
                  Información personal
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Nombre *</label>
                    <input
                      {...register("firstName")}
                      className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                      placeholder="María"
                    />
                    {errors.firstName && (
                      <p className="text-red-600 text-sm mt-1">{errors.firstName.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Apellido *</label>
                    <input
                      {...register("lastName")}
                      className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                      placeholder="García"
                    />
                    {errors.lastName && (
                      <p className="text-red-600 text-sm mt-1">{errors.lastName.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email *</label>
                    <input
                      {...register("email")}
                      type="email"
                      className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                      placeholder="maria@example.com"
                    />
                    {errors.email && (
                      <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Teléfono *</label>
                    <input
                      {...register("phone")}
                      type="tel"
                      className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                      placeholder="+51 972 327 236"
                    />
                    {errors.phone && (
                      <p className="text-red-600 text-sm mt-1">{errors.phone.message}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Dirección de Envío */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <span className="w-8 h-8 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center text-sm font-bold mr-3">
                    2
                  </span>
                  Dirección de envío
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Dirección *</label>
                    <input
                      {...register("address")}
                      className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                      placeholder="Av. Javier Prado Este 123"
                    />
                    {errors.address && (
                      <p className="text-red-600 text-sm mt-1">{errors.address.message}</p>
                    )}
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Distrito *</label>
                      <input
                        {...register("district")}
                        className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                        placeholder="San Isidro"
                      />
                      {errors.district && (
                        <p className="text-red-600 text-sm mt-1">{errors.district.message}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Ciudad</label>
                      <input
                        {...register("city")}
                        className="w-full px-4 py-2 border border-neutral-300 rounded-lg bg-neutral-50"
                        readOnly
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Referencia (opcional)</label>
                    <input
                      {...register("reference")}
                      className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                      placeholder="Casa blanca, portón negro"
                    />
                  </div>
                </div>
              </div>

              {/* Método de Pago */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <span className="w-8 h-8 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center text-sm font-bold mr-3">
                    3
                  </span>
                  Método de pago
                </h2>
                <div className="space-y-3">
                  {/* Culqi */}
                  <label className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition ${
                    selectedPaymentMethod === "culqi"
                      ? "border-rose-600 bg-rose-50"
                      : "border-neutral-200 hover:border-neutral-300"
                  }`}>
                    <input
                      {...register("paymentMethod")}
                      type="radio"
                      value="culqi"
                      className="w-5 h-5 text-rose-600"
                    />
                    <CreditCard className="w-5 h-5 ml-3 mr-2 text-neutral-600" />
                    <div className="flex-1">
                      <p className="font-medium">Tarjeta de crédito/débito</p>
                      <p className="text-sm text-neutral-600">Pago seguro con Culqi</p>
                    </div>
                    <div className="flex gap-2">
                      <div className="w-10 h-6 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">
                        VISA
                      </div>
                      <div className="w-10 h-6 bg-orange-500 rounded text-white text-xs flex items-center justify-center font-bold">
                        MC
                      </div>
                    </div>
                  </label>

                  {/* Yape */}
                  <label className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition ${
                    selectedPaymentMethod === "yape"
                      ? "border-rose-600 bg-rose-50"
                      : "border-neutral-200 hover:border-neutral-300"
                  }`}>
                    <input
                      {...register("paymentMethod")}
                      type="radio"
                      value="yape"
                      className="w-5 h-5 text-rose-600"
                    />
                    <div className="ml-3 mr-2 w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-xs">
                      Y
                    </div>
                    <div>
                      <p className="font-medium">Yape</p>
                      <p className="text-sm text-neutral-600">Pago con código QR</p>
                    </div>
                  </label>

                  {/* Contra Entrega */}
                  <label className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition ${
                    selectedPaymentMethod === "contraentrega"
                      ? "border-rose-600 bg-rose-50"
                      : "border-neutral-200 hover:border-neutral-300"
                  }`}>
                    <input
                      {...register("paymentMethod")}
                      type="radio"
                      value="contraentrega"
                      className="w-5 h-5 text-rose-600"
                    />
                    <Truck className="w-5 h-5 ml-3 mr-2 text-neutral-600" />
                    <div>
                      <p className="font-medium">Pago contra entrega</p>
                      <p className="text-sm text-neutral-600">Paga en efectivo al recibir</p>
                    </div>
                  </label>
                </div>
                {errors.paymentMethod && (
                  <p className="text-red-600 text-sm mt-2">{errors.paymentMethod.message}</p>
                )}
              </div>

              {/* Notas adicionales */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
                <label className="block text-sm font-medium mb-2">
                  Notas adicionales (opcional)
                </label>
                <textarea
                  {...register("notes")}
                  rows={3}
                  className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  placeholder="Ej: Horario preferido para entrega"
                />
              </div>

              {/* Botón Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-rose-600 text-white rounded-lg font-semibold hover:bg-rose-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Procesando..." : `Finalizar compra - S/ ${finalTotal.toFixed(2)}`}
              </button>
            </form>
          </div>

          {/* RESUMEN - 1 columna */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200 sticky top-4">
              <h2 className="text-xl font-semibold mb-4">Resumen de orden</h2>
              
              {/* Items */}
              <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
                {items.map((item, idx) => (
                  <div key={idx} className="flex gap-3">
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-neutral-100 flex-shrink-0">
                      <Image
                        src={item.product.image || "/placeholder.svg"}
                        alt={item.product.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute top-0 right-0 bg-rose-600 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                        {item.quantity}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{item.product.title}</p>
                      <p className="text-xs text-neutral-600">
                        {item.selectedColor} / {item.selectedSize}
                      </p>
                      <p className="text-sm font-semibold">S/ {item.product.price.toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-neutral-200 pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>S/ {total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Envío</span>
                  <span className={shippingCost === 0 ? "text-green-600 font-semibold" : ""}>
                    {shippingCost === 0 ? "¡GRATIS!" : `S/ ${shippingCost.toFixed(2)}`}
                  </span>
                </div>
                {total < 269 && (
                  <p className="text-xs text-neutral-600">
                    Agrega S/ {(269 - total).toFixed(2)} más para envío gratis
                  </p>
                )}
                <div className="border-t border-neutral-200 pt-2 flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>S/ {finalTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Trust badges */}
              <div className="mt-6 pt-6 border-t border-neutral-200 space-y-3 text-sm">
                <div className="flex items-center gap-2 text-neutral-600">
                  <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Pago 100% seguro</span>
                </div>
                <div className="flex items-center gap-2 text-neutral-600">
                  <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Envío 24-48h en Lima</span>
                </div>
                <div className="flex items-center gap-2 text-neutral-600">
                  <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Cambios y devoluciones fáciles</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
