"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useCart } from "@/contexts/CartContext"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import Image from "next/image"
import Link from "next/link"
import { toast } from "sonner"
import { ShoppingBag, Truck, CreditCard, ArrowLeft } from "lucide-react"
import Script from "next/script"

// ====================================
// DECLARACIÓN DE CULQI (TypeScript)
// ====================================
declare global {
  interface Window {
    Culqi: any
    culqi: () => void
  }
}

// ====================================
// SCHEMA DE VALIDACIÓN - CORREGIDO
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
  city: z.string(), // ✅ CORREGIDO: Removido .default() para evitar conflicto de tipos
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
  const [culqiLoaded, setCulqiLoaded] = useState(false)

  // ✅ CORREGIDO: Removido tipo genérico explícito, dejamos que TypeScript lo infiera
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      city: "Lima", // ✅ Ahora el default está AQUÍ, no en el schema
      paymentMethod: "culqi" as const,
    },
  })

  const selectedPaymentMethod = watch("paymentMethod")

  // Calcular envío (gratis si > S/269)
  const shippingCost = total >= 269 ? 0 : 15
  const finalTotal = total + shippingCost

  // ====================================
  // CONFIGURAR CULQI CUANDO SE CARGUE
  // ====================================
  useEffect(() => {
    if (culqiLoaded && window.Culqi) {
      window.Culqi.publicKey = process.env.NEXT_PUBLIC_CULQI_PUBLIC_KEY || 'pk_test_TU_KEY_AQUI'
      
      // Configurar el callback de Culqi
      window.culqi = function() {
        if (window.Culqi.token) {
          const token = window.Culqi.token.id
          console.log('Token Culqi obtenido:', token)
          
          // Enviar token al backend para procesar el cargo
          processCulqiPayment(token)
        } else if (window.Culqi.error) {
          console.error('Error Culqi:', window.Culqi.error)
          toast.error(window.Culqi.error.user_message || 'Error al procesar el pago')
          setIsSubmitting(false)
        }
      }
    }
  }, [culqiLoaded])

  // ====================================
  // PROCESAR PAGO CON CULQI
  // ====================================
  const processCulqiPayment = async (token: string) => {
    try {
      const response = await fetch('/api/culqi/charge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token,
          amount: Math.round(finalTotal * 100), // Culqi usa centavos
          email: watch('email'),
          orderId: 'VL-' + Date.now(),
        })
      })

      const result = await response.json()

      if (result.success) {
        toast.success('¡Pago exitoso!')
        clearCart()
        router.push(`/checkout/confirmacion?orderId=${result.orderId}`)
      } else {
        throw new Error(result.error || 'Error al procesar el pago')
      }
    } catch (error) {
      console.error('Error:', error)
      toast.error('Error al procesar el pago. Por favor intenta nuevamente.')
    } finally {
      setIsSubmitting(false)
    }
  }

  // ====================================
  // ABRIR FORMULARIO DE CULQI
  // ====================================
  const generateOrderId = () => {
  const timestamp = Date.now().toString().slice(-8)
  const random = Math.random().toString(36).substring(2, 6).toUpperCase()
  return `VL${timestamp}${random}`
}
  const openCulqiCheckout = () => {
    if (!window.Culqi) {
      toast.error('Error al cargar Culqi. Por favor recarga la página.')
      setIsSubmitting(false)
      return
    }

    // Configurar Culqi Checkout
    window.Culqi.settings({
  title: 'Vialine',
  currency: 'PEN',
  amount: Math.round(finalTotal * 100),
  order: generateOrderId(), // ✅ Formato válido
})

    // Abrir modal de Culqi
    window.Culqi.open()
  }

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

  // ====================================
  // HANDLER DEL SUBMIT - ✅ CORREGIDO
  // ====================================
  const onSubmit = async (data: CheckoutFormData) => {
    setIsSubmitting(true)
    
    try {
      // Preparar datos de la orden
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

      if (data.paymentMethod === "culqi") {
        // Abrir Culqi Checkout
        openCulqiCheckout()
      } else if (data.paymentMethod === "yape") {
        // Guardar orden y mostrar QR de Yape
        const response = await fetch("/api/checkout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(orderData),
        })

        if (!response.ok) throw new Error("Error al procesar la orden")
        
        const result = await response.json()
        router.push(`/checkout/yape?orderId=${result.orderId}`)
      } else {
        // Contra entrega
        const response = await fetch("/api/checkout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(orderData),
        })

        if (!response.ok) throw new Error("Error al procesar la orden")
        
        const result = await response.json()
        clearCart()
        router.push(`/checkout/confirmacion?orderId=${result.orderId}`)
      }
    } catch (error) {
      console.error("Error:", error)
      toast.error("Hubo un error al procesar tu orden. Por favor intenta nuevamente.")
      setIsSubmitting(false)
    }
  }

  return (
    <>
      {/* CARGAR CULQI DESDE CDN */}
      <Script
        src="https://checkout.culqi.com/js/v4"
        onLoad={() => {
          console.log('Culqi cargado correctamente')
          setCulqiLoaded(true)
        }}
        onError={() => {
          console.error('Error al cargar Culqi')
          toast.error('Error al cargar el sistema de pagos')
        }}
      />

      <div className="min-h-screen bg-neutral-50 py-8 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Link
              href="/carrito"
              className="inline-flex items-center text-neutral-600 hover:text-neutral-900 mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver al carrito
            </Link>
            <h1 className="text-3xl font-bold">Finalizar compra</h1>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="grid lg:grid-cols-3 gap-8">
            {/* Columna izquierda - Formulario */}
            <div className="lg:col-span-2 space-y-6">
              {/* Información Personal */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <span className="w-8 h-8 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center text-sm font-bold mr-3">
                    1
                  </span>
                  Información de contacto
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
                      placeholder="maria@ejemplo.com"
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
                      placeholder="999 999 999"
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
                    <label className="block text-sm font-medium mb-2">Dirección completa *</label>
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
                      <p className="text-sm text-neutral-600">Paga cuando recibas tu pedido</p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Notas adicionales */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
                <label className="block text-sm font-medium mb-2">
                  Notas adicionales (opcional)
                </label>
                <textarea
                  {...register("notes")}
                  rows={3}
                  className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent resize-none"
                  placeholder="Ej: Tocar timbre, dejar con el portero, etc."
                />
              </div>
            </div>

            {/* Columna derecha - Resumen */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200 sticky top-4">
                <h2 className="text-xl font-semibold mb-4">Resumen del pedido</h2>
                
                {/* Productos */}
                <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
                  {items.map((item) => (
                    <div key={`${item.product.slug}-${item.selectedColor}-${item.selectedSize}`} className="flex gap-3">
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-neutral-100 flex-shrink-0">
                        <Image
                          src={item.product.image}
                          alt={item.product.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{item.product.title}</p>
                        <p className="text-xs text-neutral-600">
                          {item.selectedColor} · {item.selectedSize}
                        </p>
                        <p className="text-xs text-neutral-600">Cantidad: {item.quantity}</p>
                      </div>
                      <p className="text-sm font-semibold whitespace-nowrap">
                        S/ {(item.product.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Totales */}
                <div className="border-t border-neutral-200 pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-600">Subtotal</span>
                    <span className="font-medium">S/ {total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-600">Envío</span>
                    {shippingCost === 0 ? (
                      <span className="font-medium text-green-600">¡GRATIS!</span>
                    ) : (
                      <span className="font-medium">S/ {shippingCost.toFixed(2)}</span>
                    )}
                  </div>
                  <div className="border-t border-neutral-200 pt-2 flex justify-between">
                    <span className="font-semibold">Total</span>
                    <span className="text-xl font-bold text-rose-600">
                      S/ {finalTotal.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Botón de pago */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full mt-6 bg-rose-600 text-white py-3 rounded-lg font-semibold hover:bg-rose-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  {isSubmitting ? "Procesando..." : "Finalizar compra"}
                </button>

                {/* Info envío gratis */}
                {shippingCost > 0 && (
                  <p className="text-xs text-center text-neutral-500 mt-3">
                    Envío gratis en compras mayores a S/ 269
                  </p>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}