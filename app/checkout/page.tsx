"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { useCart } from "@/contexts/CartContext"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import Link from "next/link"
import Image from "next/image"
import Script from "next/script"
import { toast } from "sonner"
import {
  ShoppingBag,
  Truck,
  CreditCard,
  Phone,
  MapPin,
  Mail,
  User,
  Package,
  ArrowLeft,
  Home,
  Briefcase,
  Check,
} from "lucide-react"

// ====================================
// VALIDACIÓN CON ZOD
// ====================================
const checkoutSchema = z.object({
  firstName: z.string().min(2, "Nombre debe tener al menos 2 caracteres"),
  lastName: z.string().min(2, "Apellido debe tener al menos 2 caracteres"),
  dni: z.string()
    .length(8, "El DNI debe tener exactamente 8 dígitos")
    .regex(/^\d+$/, "El DNI solo debe contener números"),
  email: z.string().email("Email inválido"),
  phone: z.string().min(9, "Teléfono inválido"),
  address: z.string().min(5, "Dirección inválida"),
  district: z.string().min(2, "Distrito requerido"),
  city: z.string().min(2, "Ciudad requerida"),
  postalCode: z.string().optional(),
  reference: z.string().optional(),
  paymentMethod: z.enum(["culqi", "yape", "contraentrega"]),
  notes: z.string().optional(),
  acceptTerms: z.boolean().refine((val) => val === true, {
    message: "Debes aceptar los términos y condiciones",
  }),
})

type CheckoutFormData = z.infer<typeof checkoutSchema>

// ====================================
// TYPE PARA CULQI
// ====================================
declare global {
  interface Window {
    Culqi: any
    culqi: () => void
    vialineOrderId?: string // ✅ Agregamos esta variable global
  }
}

interface SavedAddress {
  id: string
  label: string
  full_name: string
  phone: string
  street: string
  city: string
  state: string
  postal_code: string
  reference?: string
  is_default: boolean
}

export default function CheckoutPage() {
  const router = useRouter()
  const { data: session } = useSession()
  const { items, total, clearCart } = useCart()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [culqiLoaded, setCulqiLoaded] = useState(false)
  const [currentOrderId, setCurrentOrderId] = useState<string | null>(null)
  const [savedAddresses, setSavedAddresses] = useState<SavedAddress[]>([])
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null)
  const [loadingAddresses, setLoadingAddresses] = useState(false)

  // React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      paymentMethod: "culqi",
    },
  })

  const paymentMethod = watch("paymentMethod")

  // Calcular costos
  const shippingCost = total > 269 ? 0 : 15
  const cashOnDeliverySurcharge = paymentMethod === "contraentrega" ? 5 : 0
  const finalTotal = total + shippingCost + cashOnDeliverySurcharge

  // ====================================
  // PRE-LLENAR EMAIL Y NOMBRE SI HAY SESIÓN
  // ====================================
  useEffect(() => {
    if (session?.user?.email) {
      setValue("email", session.user.email)
    }
    if (session?.user?.name) {
      const nameParts = session.user.name.split(" ")
      setValue("firstName", nameParts[0] || "")
      setValue("lastName", nameParts.slice(1).join(" ") || "")
    }
  }, [session, setValue])

  // ====================================
  // CARGAR DIRECCIONES GUARDADAS SI HAY SESIÓN
  // ====================================
  useEffect(() => {
    if (session?.user) {
      loadSavedAddresses()
    }
  }, [session])

  const loadSavedAddresses = async () => {
    setLoadingAddresses(true)
    try {
      const res = await fetch('/api/addresses')
      const data = await res.json()

      if (data.success && data.addresses) {
        setSavedAddresses(data.addresses)

        // Auto-seleccionar la dirección predeterminada
        const defaultAddress = data.addresses.find((addr: SavedAddress) => addr.is_default)
        if (defaultAddress) {
          setSelectedAddressId(defaultAddress.id)
          fillFormWithAddress(defaultAddress)
        }
      }
    } catch (error) {
      console.error('Error loading addresses:', error)
    } finally {
      setLoadingAddresses(false)
    }
  }

  const fillFormWithAddress = (address: SavedAddress) => {
    // Separar nombre completo en firstName y lastName
    const nameParts = address.full_name.trim().split(' ')
    const firstName = nameParts[0] || ''
    const lastName = nameParts.slice(1).join(' ') || ''

    setValue('firstName', firstName)
    setValue('lastName', lastName)
    setValue('phone', address.phone)
    setValue('address', address.street)
    setValue('city', address.city)
    setValue('district', address.state)
    setValue('postalCode', address.postal_code)
    setValue('reference', address.reference || '')
  }

  const handleAddressSelect = (addressId: string) => {
    setSelectedAddressId(addressId)
    const address = savedAddresses.find(addr => addr.id === addressId)
    if (address) {
      fillFormWithAddress(address)
    }
  }

  // ====================================
  // CONFIGURAR CULQI CUANDO SE CARGUE
  // ====================================
  useEffect(() => {
    if (culqiLoaded && window.Culqi) {
      window.Culqi.publicKey = process.env.NEXT_PUBLIC_CULQI_PUBLIC_KEY || ''
      
      // Configurar el callback de Culqi
      window.culqi = async function() {
        if (window.Culqi.token) {
          const token = window.Culqi.token.id
          console.log('🎫 Token Culqi obtenido:', token)
          
          // Procesar pago con Culqi
          await processCulqiPayment(token)
        } else if (window.Culqi.error) {
          console.error('❌ Error Culqi:', window.Culqi.error)
          toast.error(window.Culqi.error.user_message || 'Error al procesar el pago')
          setIsSubmitting(false)
        }
      }
    }
  }, [culqiLoaded])

  // ====================================
  // GENERAR ORDER ID
  // ====================================
  const generateOrderId = () => {
    const timestamp = Date.now().toString().slice(-8)
    const random = Math.random().toString(36).substring(2, 6).toUpperCase()
    return `VL${timestamp}${random}`
  }

  // ====================================
  // PROCESAR PAGO CON CULQI
  // ====================================
  const processCulqiPayment = async (token: string) => {
    // ✅ Obtener orderId desde window en lugar del estado
    const orderId = window.vialineOrderId

    if (!orderId) {
      console.error('❌ No hay orderId almacenado')
      toast.error('Error: No se pudo obtener el ID de la orden')
      setIsSubmitting(false)
      return
    }

    try {
      console.log(`💳 Procesando cargo en Culqi para orden: ${orderId}`)
      
      const response = await fetch('/api/culqi/charge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token,
          amount: Math.round(finalTotal * 100), // Culqi usa centavos
          email: watch('email'),
          orderId: orderId,
        })
      })

      const result = await response.json()

      if (result.success) {
        console.log('✅ Pago exitoso! Charge ID:', result.chargeId)
        
        // Actualizar orden en base de datos con payment_id
        console.log('🔄 Actualizando orden en base de datos...')
        await fetch('/api/checkout', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            orderId: orderId,
            paymentId: result.chargeId,
            status: 'paid'
          })
        })

        console.log('✅ Orden actualizada exitosamente')
        
        // Cerrar modal de Culqi
        if (window.Culqi && window.Culqi.close) {
          window.Culqi.close()
        }

        // Limpiar carrito
        clearCart()
        
        // Limpiar orderId global
        delete window.vialineOrderId
        
        // Mostrar mensaje de éxito
        toast.success('¡Pago exitoso!')
        
        // Redirigir a página de confirmación
        console.log('🔄 Redirigiendo a confirmación...')
        router.push(`/checkout/confirmacion?orderId=${orderId}`)
      } else {
        throw new Error(result.error || 'Error al procesar el pago')
      }
    } catch (error) {
      console.error('❌ Error procesando pago:', error)
      toast.error('Error al procesar el pago. Por favor intenta nuevamente.')
    } finally {
      setIsSubmitting(false)
    }
  }

  // ====================================
  // ABRIR MODAL DE CULQI
  // ====================================
  const openCulqiCheckout = () => {
    if (!window.Culqi) {
      toast.error('Error al cargar Culqi. Por favor recarga la página.')
      setIsSubmitting(false)
      return
    }

    console.log('🎨 Abriendo modal de Culqi...')

    // Configurar Culqi Checkout
    // IMPORTANTE: Para pagos con tarjeta, NO se debe enviar el parámetro "order"
    // El parámetro "order" solo es para Yape, PagoEfectivo, billeteras
    window.Culqi.settings({
      title: 'Vialine',
      currency: 'PEN',
      amount: Math.round(finalTotal * 100),
      // NO incluir 'order' para pagos con tarjeta
    })

    // Abrir modal de Culqi
    window.Culqi.open()
  }

  // ====================================
  // HANDLER DEL SUBMIT - ✅ FLUJO CORREGIDO
  // ====================================
  const onSubmit = async (data: CheckoutFormData) => {
    setIsSubmitting(true)
    
    try {
      console.log('📝 Iniciando proceso de checkout...')

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
      }

      // ====================================
      // PASO 1: GUARDAR ORDEN EN BD (SIEMPRE)
      // ====================================
      console.log('💾 Guardando orden en base de datos...')
      
      const createResponse = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      })

      const createResult = await createResponse.json()

      if (!createResult.success) {
        throw new Error('Error al crear la orden')
      }

      const orderId = createResult.orderId
      console.log(`✅ Orden creada: ${orderId}`)
      
      // ✅ Guardar orderId en variable global para que esté disponible en el callback de Culqi
      window.vialineOrderId = orderId
      setCurrentOrderId(orderId)

      // ====================================
      // PASO 2: PROCESAR SEGÚN MÉTODO DE PAGO
      // ====================================
      if (data.paymentMethod === "culqi") {
        // Para Culqi: Abrir modal
        console.log('💳 Método Culqi seleccionado, abriendo modal...')
        openCulqiCheckout()
        // El flujo continúa en processCulqiPayment()
        
      } else if (data.paymentMethod === "yape" || data.paymentMethod === "contraentrega") {
        // Para otros métodos: marcar como pendiente y redirigir
        console.log(`📱 Método ${data.paymentMethod} seleccionado`)
        
        // Limpiar orderId global ya que no se usará Culqi
        delete window.vialineOrderId
        
        clearCart()
        toast.success('Orden creada exitosamente')
        router.push(`/checkout/confirmacion?orderId=${orderId}`)
        setIsSubmitting(false)
      }

    } catch (error) {
      console.error('❌ Error en checkout:', error)
      toast.error('Error al procesar tu orden. Por favor intenta nuevamente.')
      setIsSubmitting(false)
    }
  }

  // Si no hay items, mostrar mensaje
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

  return (
    <>
      {/* Script de Culqi */}
      <Script
        src="https://checkout.culqi.com/js/v4"
        onLoad={() => {
          console.log('✅ Culqi script cargado')
          setCulqiLoaded(true)
        }}
        onError={() => {
          console.error('❌ Error cargando script de Culqi')
          toast.error('Error cargando el sistema de pagos')
        }}
      />

      <div className="min-h-screen bg-neutral-50 py-8 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Link
              href="/carrito"
              className="inline-flex items-center gap-2 text-neutral-700 hover:text-neutral-900 mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              Volver al carrito
            </Link>
            <h1 className="text-3xl font-bold text-neutral-900">Checkout</h1>
            <p className="text-neutral-600">Completa tu información para finalizar la compra</p>
          </div>

          {/* Stepper / Breadcrumb */}
          <div className="mb-8">
            <div className="flex items-center justify-center gap-2 sm:gap-4">
              {/* Paso 1: Envío y Pago (Activo) */}
              <div className="flex items-center">
                <div className="flex flex-col items-center">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-rose-600 text-white font-semibold shadow-md">
                    <Package className="w-5 h-5" />
                  </div>
                  <span className="mt-2 text-sm font-semibold text-rose-600">Envío y Pago</span>
                </div>
              </div>

              {/* Línea divisoria */}
              <div className="h-[2px] w-12 sm:w-24 bg-neutral-300"></div>

              {/* Paso 2: Confirmación (Inactivo) */}
              <div className="flex items-center">
                <div className="flex flex-col items-center">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-neutral-200 text-neutral-500 font-semibold">
                    <Check className="w-5 h-5" />
                  </div>
                  <span className="mt-2 text-sm text-neutral-500">Confirmación</span>
                </div>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Columna izquierda - Formulario */}
              <div className="lg:col-span-2 space-y-6">
                {/* Información personal */}
                <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-6">
                  <div className="flex items-center gap-2 mb-6">
                    <User className="w-5 h-5 text-rose-600" />
                    <h2 className="text-xl font-semibold">Información Personal</h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Nombre *
                      </label>
                      <input
                        {...register("firstName")}
                        className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none"
                        placeholder="Juan"
                      />
                      {errors.firstName && (
                        <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Apellido *
                      </label>
                      <input
                        {...register("lastName")}
                        className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none"
                        placeholder="Pérez"
                      />
                      {errors.lastName && (
                        <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        DNI *
                      </label>
                      <input
                        {...register("dni")}
                        className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none"
                        placeholder="12345678"
                        maxLength={8}
                      />
                      {errors.dni && (
                        <p className="text-red-500 text-sm mt-1">{errors.dni.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        <Mail className="w-4 h-4 inline mr-2" />
                        Email *
                      </label>
                      <input
                        {...register("email")}
                        type="email"
                        className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none"
                        placeholder="juan@ejemplo.com"
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        <Phone className="w-4 h-4 inline mr-2" />
                        Teléfono *
                      </label>
                      <input
                        {...register("phone")}
                        type="tel"
                        className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none"
                        placeholder="999 999 999"
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Dirección de envío */}
                <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-6">
                  <div className="flex items-center gap-2 mb-6">
                    <MapPin className="w-5 h-5 text-rose-600" />
                    <h2 className="text-xl font-semibold">Dirección de Envío</h2>
                  </div>

                  {/* Selector de direcciones guardadas */}
                  {session?.user && savedAddresses.length > 0 && (
                    <div className="mb-6 p-4 bg-neutral-50 rounded-lg border border-neutral-200">
                      <label className="block text-sm font-medium text-neutral-700 mb-3">
                        Usar dirección guardada
                      </label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {savedAddresses.map((addr) => (
                          <button
                            key={addr.id}
                            type="button"
                            onClick={() => handleAddressSelect(addr.id)}
                            className={`p-3 border-2 rounded-lg text-left transition ${
                              selectedAddressId === addr.id
                                ? 'border-rose-600 bg-rose-50'
                                : 'border-neutral-300 bg-white hover:border-neutral-400'
                            }`}
                          >
                            <div className="flex items-start gap-2">
                              {addr.label === 'home' ? (
                                <Home className="w-4 h-4 text-neutral-600 mt-1" />
                              ) : (
                                <Briefcase className="w-4 h-4 text-neutral-600 mt-1" />
                              )}
                              <div className="flex-1">
                                <p className="font-medium text-sm text-neutral-900">
                                  {addr.full_name}
                                  {addr.is_default && (
                                    <span className="ml-2 text-xs bg-rose-100 text-rose-600 px-2 py-0.5 rounded">
                                      Principal
                                    </span>
                                  )}
                                </p>
                                <p className="text-xs text-neutral-600 mt-1">
                                  {addr.street}, {addr.state}
                                </p>
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                      <p className="text-xs text-neutral-500 mt-3">
                        O completa manualmente una nueva dirección abajo
                      </p>
                    </div>
                  )}

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Dirección *
                      </label>
                      <input
                        {...register("address")}
                        className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none"
                        placeholder="Av. Principal 123"
                      />
                      {errors.address && (
                        <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-2">
                          Distrito *
                        </label>
                        <input
                          {...register("district")}
                          className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none"
                          placeholder="Miraflores"
                        />
                        {errors.district && (
                          <p className="text-red-500 text-sm mt-1">{errors.district.message}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-2">
                          Ciudad *
                        </label>
                        <input
                          {...register("city")}
                          className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none"
                          placeholder="Lima"
                        />
                        {errors.city && (
                          <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-2">
                          Código Postal (opcional)
                        </label>
                        <input
                          {...register("postalCode")}
                          className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none"
                          placeholder="15074"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-2">
                          Referencia (opcional)
                        </label>
                        <input
                          {...register("reference")}
                          className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none"
                          placeholder="Casa verde, 2do piso"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Método de pago */}
                <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-6">
                  <div className="flex items-center gap-2 mb-6">
                    <CreditCard className="w-5 h-5 text-rose-600" />
                    <h2 className="text-xl font-semibold">Método de Pago</h2>
                  </div>

                  <div className="space-y-3">
                    <label className="flex items-center gap-3 p-4 border-2 border-neutral-200 rounded-lg cursor-pointer hover:border-rose-500 transition">
                      <input
                        {...register("paymentMethod")}
                        type="radio"
                        value="culqi"
                        className="w-4 h-4 text-rose-600"
                      />
                      <span className="font-medium">💳 Tarjeta de crédito/débito (Culqi)</span>
                    </label>

                    <label className="flex items-center gap-3 p-4 border-2 border-neutral-200 rounded-lg cursor-pointer hover:border-rose-500 transition">
                      <input
                        {...register("paymentMethod")}
                        type="radio"
                        value="yape"
                        className="w-4 h-4 text-rose-600"
                      />
                      <span className="font-medium">📱 Yape</span>
                    </label>

                    {/* Instrucciones de Yape */}
                    {paymentMethod === "yape" && (
                      <div className="mt-3 p-4 bg-purple-50 border border-purple-200 rounded-lg">
                        <p className="text-sm font-semibold text-purple-900 mb-2">
                          Instrucciones de pago por Yape:
                        </p>
                        <ol className="text-sm text-purple-800 space-y-2 mb-3">
                          <li>1. Abre tu app de Yape</li>
                          <li>2. Yapea a: <strong>972 327 236</strong></li>
                          <li>3. Monto: <strong>S/ {finalTotal.toFixed(2)}</strong></li>
                          <li>4. Envía el comprobante por WhatsApp</li>
                        </ol>
                        <a
                          href={`https://wa.me/51972327236?text=${encodeURIComponent(`Hola, he realizado el pago por Yape de S/ ${finalTotal.toFixed(2)}. Adjunto comprobante.`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-sm font-medium"
                        >
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                          </svg>
                          Enviar comprobante por WhatsApp
                        </a>
                      </div>
                    )}

                    <label className="flex items-center gap-3 p-4 border-2 border-neutral-200 rounded-lg cursor-pointer hover:border-rose-500 transition">
                      <input
                        {...register("paymentMethod")}
                        type="radio"
                        value="contraentrega"
                        className="w-4 h-4 text-rose-600"
                      />
                      <span className="font-medium">💵 Pago contra entrega</span>
                    </label>
                  </div>
                </div>

                {/* Información sobre contra entrega */}
                {paymentMethod === "contraentrega" && (
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                    <p className="text-sm text-amber-800">
                      <strong>💵 Pago contra entrega:</strong> Pagarás en efectivo al recibir tu pedido. Se aplica un recargo de S/ 5.00 por este servicio.
                    </p>
                  </div>
                )}

                {/* Checkbox términos y condiciones */}
                <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-6">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      {...register("acceptTerms")}
                      type="checkbox"
                      className="mt-1 w-4 h-4 text-rose-600 border-neutral-300 rounded focus:ring-rose-600"
                    />
                    <span className="text-sm text-neutral-700">
                      Acepto los{" "}
                      <Link href="/terminos" target="_blank" className="text-rose-600 hover:text-rose-700 font-medium underline">
                        términos y condiciones
                      </Link>
                      {" "}y la{" "}
                      <Link href="/privacidad" target="_blank" className="text-rose-600 hover:text-rose-700 font-medium underline">
                        política de privacidad
                      </Link>
                    </span>
                  </label>
                  {errors.acceptTerms && (
                    <p className="text-red-500 text-sm mt-2">{errors.acceptTerms.message}</p>
                  )}
                </div>

                {/* Notas adicionales */}
                <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-6">
                  <h2 className="text-lg font-semibold mb-4">Notas adicionales (opcional)</h2>
                  <textarea
                    {...register("notes")}
                    rows={4}
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none resize-none"
                    placeholder="Instrucciones especiales para la entrega..."
                  />
                </div>
              </div>

              {/* Columna derecha - Resumen */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-6 sticky top-24">
                  <h2 className="text-xl font-semibold mb-6">Resumen de la Orden</h2>

                  {/* Items */}
                  <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
                    {items.map((item) => (
                      <div key={`${item.product.slug}-${item.selectedColor}-${item.selectedSize}`} className="flex gap-3">
                        <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                          <Image
                            src={item.product.image}
                            alt={item.product.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-sm truncate">{item.product.title}</h3>
                          <p className="text-xs text-neutral-600">
                            {item.selectedColor} • {item.selectedSize}
                          </p>
                          <p className="text-sm font-medium">
                            S/ {item.product.price} x {item.quantity}
                          </p>
                        </div>
                        <div className="font-semibold">
                          S/ {(item.product.price * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Totales */}
                  <div className="space-y-2 border-t border-neutral-200 pt-4">
                    <div className="flex justify-between text-neutral-700">
                      <span>Subtotal</span>
                      <span>S/ {total.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-neutral-700">
                      <span className="flex items-center gap-2">
                        <Truck className="w-4 h-4" />
                        Envío
                      </span>
                      <span>{shippingCost === 0 ? "GRATIS" : `S/ ${shippingCost.toFixed(2)}`}</span>
                    </div>
                    {cashOnDeliverySurcharge > 0 && (
                      <div className="flex justify-between text-amber-700">
                        <span className="text-sm">Recargo contra entrega</span>
                        <span className="text-sm">S/ {cashOnDeliverySurcharge.toFixed(2)}</span>
                      </div>
                    )}
                    {total <= 269 && (
                      <p className="text-sm text-green-600">
                        Te faltan S/ {(269 - total).toFixed(2)} para envío gratis
                      </p>
                    )}
                    <div className="flex justify-between text-lg font-bold pt-2 border-t border-neutral-200">
                      <span>Total</span>
                      <span>S/ {finalTotal.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Botón de pago */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full mt-6 px-6 py-4 bg-rose-600 text-white rounded-lg font-semibold hover:bg-rose-700 transition disabled:bg-neutral-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Procesando...
                      </>
                    ) : (
                      <>
                        <Package className="w-5 h-5" />
                        Realizar Pedido
                      </>
                    )}
                  </button>

                  <p className="text-xs text-neutral-600 text-center mt-4">
                    Al realizar el pedido, aceptas nuestros{" "}
                    <Link href="/pages/terminos-y-condiciones" className="underline">
                      términos y condiciones
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}