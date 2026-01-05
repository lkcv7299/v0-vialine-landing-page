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
import { getProductColorImage } from "@/lib/assets"
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
  ArrowRight,
  Home,
  Briefcase,
  Check,
  ChevronLeft,
  Tag,
} from "lucide-react"

// ====================================
// VALIDACIÓN CON ZOD
// ====================================
const checkoutSchema = z.object({
  firstName: z.string().min(2, "Nombre debe tener al menos 2 caracteres"),
  lastName: z.string().min(2, "Apellido debe tener al menos 2 caracteres"),
  dni: z.string()
    .regex(/^\d*$/, "El DNI solo debe contener números")
    .optional()
    .refine((val) => !val || val.length === 8, {
      message: "El DNI debe tener 8 dígitos si lo proporcionas",
    }),
  email: z.string().email("Email inválido"),
  phone: z.string()
    .min(9, "Teléfono inválido")
    .regex(/^\d+$/, "El teléfono solo debe contener números"),
  address: z.string().min(5, "Dirección inválida"),
  district: z.string().min(2, "Distrito requerido"),
  city: z.string().min(2, "Ciudad requerida"),
  postalCode: z.string()
    .regex(/^\d*$/, "El código postal solo debe contener números")
    .optional(),
  reference: z.string().optional(),
  paymentMethod: z.enum(["culqi", "contra_entrega"]),
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
    vialineOrderId?: string
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
  const { items, total, clearCart, appliedCoupon, removeCoupon } = useCart()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [culqiLoaded, setCulqiLoaded] = useState(false)
  const [currentOrderId, setCurrentOrderId] = useState<string | null>(null)
  const [savedAddresses, setSavedAddresses] = useState<SavedAddress[]>([])
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null)
  const [loadingAddresses, setLoadingAddresses] = useState(false)
  const [useNewAddress, setUseNewAddress] = useState(false)

  // ✅ NUEVO: Estado para controlar el paso actual
  const [currentStep, setCurrentStep] = useState(1)
  const totalSteps = 3

  // React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    trigger,
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      paymentMethod: "culqi",
    },
  })

  const paymentMethod = watch("paymentMethod")

  // ✅ Calcular descuento si hay cupón aplicado
  const discount = appliedCoupon
    ? appliedCoupon.type === "percentage"
      ? total * (appliedCoupon.discount / 100)
      : appliedCoupon.discount
    : 0

  const subtotalAfterDiscount = total - discount

  // Calcular costos (usar subtotalAfterDiscount para evaluar envío gratis)
  const shippingCost = subtotalAfterDiscount > 269 ? 0 : 15
  const finalTotal = subtotalAfterDiscount + shippingCost

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

      window.culqi = async function() {
        if (window.Culqi.token) {
          const token = window.Culqi.token.id
          console.log('🎫 Token Culqi obtenido:', token)
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
  // GENERAR ORDER ID (formato simplificado: VL-XXXXX)
  // ====================================
  const generateOrderId = () => {
    const random = Math.random().toString(36).substring(2, 7).toUpperCase()
    return `VL-${random}`
  }

  // ====================================
  // PROCESAR PAGO CON CULQI
  // ====================================
  const processCulqiPayment = async (token: string) => {
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
          amount: Math.round(finalTotal * 100),
          email: watch('email'),
          orderId: orderId,
        })
      })

      const result = await response.json()

      if (result.success) {
        console.log('✅ Pago exitoso! Charge ID:', result.chargeId)

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

        if (window.Culqi && window.Culqi.close) {
          window.Culqi.close()
        }

        clearCart()
        delete window.vialineOrderId
        toast.success('¡Pago exitoso!')
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

    window.Culqi.settings({
      title: 'Vialine',
      currency: 'PEN',
      amount: Math.round(finalTotal * 100),
    })

    window.Culqi.open()
  }

  // ====================================
  // NAVEGACIÓN ENTRE PASOS
  // ====================================
  const nextStep = async () => {
    let fieldsToValidate: (keyof CheckoutFormData)[] = []

    // Validar solo los campos del paso actual
    if (currentStep === 1) {
      fieldsToValidate = ['firstName', 'lastName', 'email', 'phone']
    } else if (currentStep === 2) {
      fieldsToValidate = ['address', 'district', 'city']
    }

    const isValid = await trigger(fieldsToValidate)

    if (isValid) {
      setCurrentStep(prev => Math.min(prev + 1, totalSteps))
      // Scroll to top en móvil
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      toast.error('Por favor completa todos los campos requeridos')
    }
  }

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // ====================================
  // HANDLER DEL SUBMIT
  // ====================================
  const onSubmit = async (data: CheckoutFormData) => {
    setIsSubmitting(true)

    try {
      console.log('📝 Iniciando proceso de checkout...')

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
          productImage: getProductColorImage(item.product, item.selectedColor, 0),
          quantity: item.quantity,
          selectedColor: item.selectedColor,
          selectedSize: item.selectedSize,
        })),
        subtotal: total,
        discount: discount,
        couponCode: appliedCoupon?.code || null,
        shippingCost: shippingCost,
        total: finalTotal,
        paymentMethod: data.paymentMethod,
        notes: data.notes || "",
      }

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

      window.vialineOrderId = orderId
      setCurrentOrderId(orderId)

      // Si es pago contra entrega, completar directamente
      if (data.paymentMethod === 'contra_entrega') {
        console.log('🚚 Pago contra entrega seleccionado')
        clearCart()
        toast.success('¡Pedido creado! Te contactaremos pronto.')
        router.push(`/checkout/confirmacion?orderId=${orderId}`)
        return
      }

      console.log('💳 Método Culqi seleccionado, abriendo modal...')
      openCulqiCheckout()

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
            className="inline-flex items-center px-6 py-3 bg-neutral-900 text-white rounded-lg hover:bg-neutral-800 transition"
          >
            Ir a comprar
          </Link>
        </div>
      </div>
    )
  }

  // ====================================
  // RENDERIZADO DEL PASO ACTUAL
  // ====================================
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-6">
            <div className="flex items-center gap-2 mb-6">
              <User className="w-5 h-5 text-neutral-900" />
              <h2 className="text-xl font-semibold">Información Personal</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Nombre *
                </label>
                <input
                  {...register("firstName")}
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-600 focus:border-transparent outline-none"
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
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-600 focus:border-transparent outline-none"
                  placeholder="Pérez"
                />
                {errors.lastName && (
                  <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  DNI <span className="text-neutral-400 font-normal">(opcional, para boleta)</span>
                </label>
                <input
                  {...register("dni")}
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-600 focus:border-transparent outline-none"
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
                  readOnly={!!session?.user?.email}
                  className={`w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-600 focus:border-transparent outline-none ${
                    session?.user?.email ? 'bg-neutral-50 cursor-not-allowed' : ''
                  }`}
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
                  inputMode="numeric"
                  pattern="[0-9]*"
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-600 focus:border-transparent outline-none"
                  placeholder="999 999 999"
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                )}
              </div>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-6">
            <div className="flex items-center gap-2 mb-6">
              <MapPin className="w-5 h-5 text-neutral-900" />
              <h2 className="text-xl font-semibold">Dirección de Envío</h2>
            </div>

            {/* Toggle: Dirección guardada vs Nueva */}
            {session?.user && savedAddresses.length > 0 && (
              <div className="mb-6">
                <div className="flex gap-3 mb-4">
                  <button
                    type="button"
                    onClick={() => setUseNewAddress(false)}
                    className={`flex-1 py-3 px-4 rounded-lg font-medium transition ${
                      !useNewAddress
                        ? 'bg-neutral-900 text-white'
                        : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                    }`}
                  >
                    Usar dirección guardada
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setUseNewAddress(true)
                      setSelectedAddressId(null)
                    }}
                    className={`flex-1 py-3 px-4 rounded-lg font-medium transition ${
                      useNewAddress
                        ? 'bg-neutral-900 text-white'
                        : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                    }`}
                  >
                    Usar nueva dirección
                  </button>
                </div>

                {/* Direcciones guardadas */}
                {!useNewAddress && (
                  <div className="p-4 bg-neutral-50 rounded-lg border border-neutral-200 mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {savedAddresses.map((addr) => (
                        <button
                          key={addr.id}
                          type="button"
                          onClick={() => handleAddressSelect(addr.id)}
                          className={`p-3 border-2 rounded-lg text-left transition ${
                            selectedAddressId === addr.id
                              ? 'border-neutral-900 bg-neutral-50'
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
                  </div>
                )}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Dirección *
                </label>
                <input
                  {...register("address")}
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-600 focus:border-transparent outline-none"
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
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-600 focus:border-transparent outline-none"
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
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-600 focus:border-transparent outline-none"
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
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-600 focus:border-transparent outline-none"
                    placeholder="15074"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Referencia (opcional)
                  </label>
                  <input
                    {...register("reference")}
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-600 focus:border-transparent outline-none"
                    placeholder="Casa verde, 2do piso"
                  />
                </div>
              </div>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            {/* Método de pago */}
            <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-6">
              <div className="flex items-center gap-2 mb-6">
                <CreditCard className="w-5 h-5 text-neutral-900" />
                <h2 className="text-xl font-semibold">Método de Pago</h2>
              </div>

              <div className="space-y-3">
                <label className={`flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition ${
                  paymentMethod === 'culqi' ? 'border-neutral-900 bg-neutral-50' : 'border-neutral-200 hover:border-neutral-400'
                }`}>
                  <input
                    {...register("paymentMethod")}
                    type="radio"
                    value="culqi"
                    className="w-4 h-4 text-neutral-900"
                  />
                  <div className="flex-1">
                    <span className="font-medium">💳 Tarjeta de crédito/débito / Yape</span>
                    <p className="text-xs text-neutral-500 mt-1">Pago seguro con Culqi (incluye Yape)</p>
                  </div>
                </label>

                <label className={`flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition ${
                  paymentMethod === 'contra_entrega' ? 'border-neutral-900 bg-neutral-50' : 'border-neutral-200 hover:border-neutral-400'
                }`}>
                  <input
                    {...register("paymentMethod")}
                    type="radio"
                    value="contra_entrega"
                    className="w-4 h-4 text-neutral-900"
                  />
                  <div className="flex-1">
                    <span className="font-medium">🚚 Pago contra entrega</span>
                    <p className="text-xs text-neutral-500 mt-1">Paga en efectivo o Yape/Plin cuando recibas tu pedido</p>
                  </div>
                  <span className="bg-green-100 text-green-700 text-xs font-semibold px-2 py-1 rounded-full">
                    Popular
                  </span>
                </label>
              </div>
            </div>

            {/* Checkbox términos y condiciones */}
            <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-6">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  {...register("acceptTerms")}
                  type="checkbox"
                  className="mt-1 w-4 h-4 text-neutral-900 border-neutral-300 rounded focus:ring-neutral-600"
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
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-600 focus:border-transparent outline-none resize-none"
                placeholder="Instrucciones especiales para la entrega..."
              />
            </div>
          </div>
        )

      default:
        return null
    }
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
            <p className="text-neutral-600">Paso {currentStep} de {totalSteps}</p>
          </div>

          {/* Stepper / Breadcrumb */}
          <div className="mb-8">
            <div className="flex items-center justify-center gap-2 sm:gap-4">
              {/* Paso 1 */}
              <div className="flex items-center">
                <div className="flex flex-col items-center">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full font-semibold shadow-md transition ${
                    currentStep >= 1
                      ? 'bg-neutral-900 text-white'
                      : 'bg-neutral-200 text-neutral-500'
                  }`}>
                    {currentStep > 1 ? <Check className="w-5 h-5" /> : <User className="w-5 h-5" />}
                  </div>
                  <span className={`mt-2 text-xs sm:text-sm font-medium ${
                    currentStep >= 1 ? 'text-neutral-900' : 'text-neutral-500'
                  }`}>
                    Información
                  </span>
                </div>
              </div>

              {/* Línea divisoria */}
              <div className={`h-[2px] w-12 sm:w-24 transition ${
                currentStep > 1 ? 'bg-neutral-900' : 'bg-neutral-300'
              }`}></div>

              {/* Paso 2 */}
              <div className="flex items-center">
                <div className="flex flex-col items-center">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full font-semibold shadow-md transition ${
                    currentStep >= 2
                      ? 'bg-neutral-900 text-white'
                      : 'bg-neutral-200 text-neutral-500'
                  }`}>
                    {currentStep > 2 ? <Check className="w-5 h-5" /> : <MapPin className="w-5 h-5" />}
                  </div>
                  <span className={`mt-2 text-xs sm:text-sm font-medium ${
                    currentStep >= 2 ? 'text-neutral-900' : 'text-neutral-500'
                  }`}>
                    Dirección
                  </span>
                </div>
              </div>

              {/* Línea divisoria */}
              <div className={`h-[2px] w-12 sm:w-24 transition ${
                currentStep > 2 ? 'bg-rose-600' : 'bg-neutral-300'
              }`}></div>

              {/* Paso 3 */}
              <div className="flex items-center">
                <div className="flex flex-col items-center">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full font-semibold shadow-md transition ${
                    currentStep >= 3
                      ? 'bg-neutral-900 text-white'
                      : 'bg-neutral-200 text-neutral-500'
                  }`}>
                    <Package className="w-5 h-5" />
                  </div>
                  <span className={`mt-2 text-xs sm:text-sm font-medium ${
                    currentStep >= 3 ? 'text-neutral-900' : 'text-neutral-500'
                  }`}>
                    Pago
                  </span>
                </div>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Columna izquierda - Formulario */}
              <div className="lg:col-span-2 space-y-6">
                {/* Renderizar paso actual */}
                {renderStep()}

                {/* Botones de navegación */}
                <div className="flex gap-4">
                  {currentStep > 1 && (
                    <button
                      type="button"
                      onClick={prevStep}
                      className="flex-1 px-6 py-3 border-2 border-neutral-300 text-neutral-700 rounded-lg font-semibold hover:border-neutral-400 hover:bg-neutral-50 transition flex items-center justify-center gap-2"
                    >
                      <ChevronLeft className="w-5 h-5" />
                      Atrás
                    </button>
                  )}

                  {currentStep < totalSteps ? (
                    <button
                      type="button"
                      onClick={nextStep}
                      className="flex-1 px-6 py-3 bg-neutral-900 text-white rounded-lg font-semibold hover:bg-neutral-800 transition flex items-center justify-center gap-2"
                    >
                      Siguiente
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 px-6 py-3 bg-neutral-900 text-white rounded-lg font-semibold hover:bg-neutral-800 transition disabled:bg-neutral-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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
                  )}
                </div>
              </div>

              {/* Columna derecha - Resumen */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-6 sticky top-24">
                  <h2 className="text-xl font-semibold mb-6">Resumen de la Orden</h2>

                  {/* Items */}
                  <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
                    {items.map((item) => {
                      const imagePath = getProductColorImage(item.product, item.selectedColor, 0)
                      return (
                      <div key={`${item.product.slug}-${item.selectedColor}-${item.selectedSize}`} className="flex gap-3">
                        <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                          <Image
                            src={imagePath}
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
                      )
                    })}
                  </div>

                  {/* Totales */}
                  <div className="space-y-2 border-t border-neutral-200 pt-4">
                    <div className="flex justify-between text-neutral-700">
                      <span>Subtotal</span>
                      <span>S/ {total.toFixed(2)}</span>
                    </div>

                    {/* ✅ Mostrar cupón aplicado */}
                    {appliedCoupon && discount > 0 && (
                      <div className="bg-green-50 border border-green-200 rounded-lg p-3 -mx-2">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <Tag className="w-4 h-4 text-green-600" />
                              <span className="text-sm font-semibold text-green-700">
                                Cupón: {appliedCoupon.code}
                              </span>
                            </div>
                            <p className="text-xs text-green-600 mt-1">
                              {appliedCoupon.type === "percentage"
                                ? `${appliedCoupon.discount}% de descuento`
                                : `S/ ${appliedCoupon.discount} de descuento`}
                            </p>
                          </div>
                          <div className="text-right">
                            <span className="text-sm font-semibold text-green-700">
                              - S/ {discount.toFixed(2)}
                            </span>
                            <button
                              onClick={removeCoupon}
                              className="block text-xs text-green-600 hover:text-green-700 mt-1"
                            >
                              Quitar
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="flex justify-between text-neutral-700">
                      <span className="flex items-center gap-2">
                        <Truck className="w-4 h-4" />
                        Envío
                      </span>
                      <span>{shippingCost === 0 ? "GRATIS" : `S/ ${shippingCost.toFixed(2)}`}</span>
                    </div>
                    {subtotalAfterDiscount <= 269 && (
                      <p className="text-sm text-green-600">
                        Te faltan S/ {(269 - subtotalAfterDiscount).toFixed(2)} para envío gratis
                      </p>
                    )}
                    <div className="flex justify-between text-lg font-bold pt-2 border-t border-neutral-200">
                      <span>Total</span>
                      <span>S/ {finalTotal.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
