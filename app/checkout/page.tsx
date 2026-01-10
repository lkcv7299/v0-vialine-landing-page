"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSupabaseAuth } from "@/hooks/use-supabase-auth"
import { useCart } from "@/contexts/CartContext"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import Script from "next/script"
import { toast } from "sonner"
import { getProductColorImage } from "@/lib/assets"
import { ArrowLeft, ArrowRight, ChevronLeft, Package } from "lucide-react"
import { trackBeginCheckout, trackPurchase } from "@/lib/analytics"

// Schema y tipos
import {
  checkoutSchema,
  type CheckoutFormData,
  type SavedAddress,
  TOTAL_STEPS,
  FREE_SHIPPING_THRESHOLD,
  SHIPPING_COST,
} from "@/lib/checkout-schema"

// Componentes
import {
  CheckoutStepper,
  OrderSummary,
  PersonalInfoStep,
  AddressStep,
  PaymentStep,
  EmptyCart,
} from "@/components/checkout"

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

export default function CheckoutPage() {
  const router = useRouter()
  const { user } = useSupabaseAuth()
  const { items, total, clearCart, appliedCoupon, removeCoupon } = useCart()

  // Estados
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [culqiLoaded, setCulqiLoaded] = useState(false)
  const [currentOrderId, setCurrentOrderId] = useState<string | null>(null)
  const [savedAddresses, setSavedAddresses] = useState<SavedAddress[]>([])
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null)
  const [loadingAddresses, setLoadingAddresses] = useState(false)
  const [useNewAddress, setUseNewAddress] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)

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
    defaultValues: { paymentMethod: "culqi" },
  })

  const paymentMethod = watch("paymentMethod")

  // Calcular descuento si hay cupón aplicado
  const discount = appliedCoupon
    ? appliedCoupon.type === "percentage"
      ? total * (appliedCoupon.discount / 100)
      : appliedCoupon.discount
    : 0

  const subtotalAfterDiscount = total - discount
  const shippingCost = subtotalAfterDiscount > FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST
  const finalTotal = subtotalAfterDiscount + shippingCost

  // ====================================
  // EFECTOS
  // ====================================

  // Pre-llenar email y nombre si hay sesión
  useEffect(() => {
    if (user?.email) {
      setValue("email", user.email)
    }
    const userName = user?.user_metadata?.full_name || user?.user_metadata?.name
    if (userName) {
      const nameParts = userName.split(" ")
      setValue("firstName", nameParts[0] || "")
      setValue("lastName", nameParts.slice(1).join(" ") || "")
    }
  }, [user, setValue])

  // Track begin checkout cuando el usuario entra a la página
  useEffect(() => {
    if (items.length > 0) {
      trackBeginCheckout(
        items.map((item) => ({
          id: item.product.slug,
          name: item.product.title,
          price: item.product.price,
          quantity: item.quantity,
        }))
      )
    }
  }, []) // Solo al montar el componente

  // Cargar direcciones guardadas si hay sesión
  useEffect(() => {
    if (user) {
      loadSavedAddresses()
    }
  }, [user])

  // Configurar Culqi cuando se cargue
  useEffect(() => {
    if (culqiLoaded && window.Culqi) {
      window.Culqi.publicKey = process.env.NEXT_PUBLIC_CULQI_PUBLIC_KEY || ''

      window.culqi = async function() {
        if (window.Culqi.token) {
          const token = window.Culqi.token.id
          await processCulqiPayment(token)
        } else if (window.Culqi.error) {
          toast.error(window.Culqi.error.user_message || 'Error al procesar el pago')
          setIsSubmitting(false)
        }
      }
    }
  }, [culqiLoaded])

  // ====================================
  // FUNCIONES AUXILIARES
  // ====================================

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
  // CULQI
  // ====================================

  const processCulqiPayment = async (token: string) => {
    const orderId = window.vialineOrderId

    if (!orderId) {
      toast.error('Error: No se pudo obtener el ID de la orden')
      setIsSubmitting(false)
      return
    }

    try {
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
        await fetch('/api/checkout', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            orderId: orderId,
            paymentId: result.chargeId,
            status: 'paid'
          })
        })

        if (window.Culqi?.close) {
          window.Culqi.close()
        }

        // Track purchase event for Culqi payments
        trackPurchase(
          orderId,
          items.map((item) => ({
            id: item.product.slug,
            name: item.product.title,
            price: item.product.price,
            quantity: item.quantity,
          })),
          finalTotal
        )

        clearCart()
        delete window.vialineOrderId
        toast.success('¡Pago exitoso!')
        router.push(`/checkout/confirmacion?orderId=${orderId}`)
      } else {
        throw new Error(result.error || 'Error al procesar el pago')
      }
    } catch (error) {
      console.error('Error procesando pago:', error)
      toast.error('Error al procesar el pago. Por favor intenta nuevamente.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const openCulqiCheckout = () => {
    if (!window.Culqi) {
      toast.error('Error al cargar Culqi. Por favor recarga la página.')
      setIsSubmitting(false)
      return
    }

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

    if (currentStep === 1) {
      fieldsToValidate = ['firstName', 'lastName', 'email', 'phone']
    } else if (currentStep === 2) {
      fieldsToValidate = ['address', 'district', 'city']
    }

    const isValid = await trigger(fieldsToValidate)

    if (isValid) {
      setCurrentStep(prev => Math.min(prev + 1, TOTAL_STEPS))
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
      window.vialineOrderId = orderId
      setCurrentOrderId(orderId)

      // Si es pago contra entrega, completar directamente
      if (data.paymentMethod === 'contra_entrega') {
        // Track purchase event
        trackPurchase(
          orderId,
          items.map((item) => ({
            id: item.product.slug,
            name: item.product.title,
            price: item.product.price,
            quantity: item.quantity,
          })),
          finalTotal
        )

        clearCart()
        toast.success('¡Pedido creado! Te contactaremos pronto.')
        router.push(`/checkout/confirmacion?orderId=${orderId}`)
        return
      }

      // Método Culqi
      openCulqiCheckout()

    } catch (error) {
      console.error('Error en checkout:', error)
      toast.error('Error al procesar tu orden. Por favor intenta nuevamente.')
      setIsSubmitting(false)
    }
  }

  // Si no hay items, mostrar mensaje
  if (items.length === 0) {
    return <EmptyCart />
  }

  // ====================================
  // RENDERIZADO DEL PASO ACTUAL
  // ====================================

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <PersonalInfoStep
            register={register}
            errors={errors}
            isEmailReadOnly={!!user?.email}
          />
        )
      case 2:
        return (
          <AddressStep
            register={register}
            errors={errors}
            hasSession={!!user}
            savedAddresses={savedAddresses}
            selectedAddressId={selectedAddressId}
            useNewAddress={useNewAddress}
            setUseNewAddress={setUseNewAddress}
            onAddressSelect={handleAddressSelect}
            setSelectedAddressId={setSelectedAddressId}
          />
        )
      case 3:
        return (
          <PaymentStep
            register={register}
            errors={errors}
            paymentMethod={paymentMethod}
          />
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
        onLoad={() => setCulqiLoaded(true)}
        onError={() => toast.error('Error cargando el sistema de pagos')}
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
            <p className="text-neutral-600">Paso {currentStep} de {TOTAL_STEPS}</p>
          </div>

          {/* Stepper */}
          <div className="mb-8">
            <CheckoutStepper currentStep={currentStep} totalSteps={TOTAL_STEPS} />
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Columna izquierda - Formulario */}
              <div className="lg:col-span-2 space-y-6">
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

                  {currentStep < TOTAL_STEPS ? (
                    <button
                      type="button"
                      onClick={nextStep}
                      className="flex-1 px-6 py-3 bg-rose-600 text-white rounded-lg font-semibold hover:bg-rose-700 transition flex items-center justify-center gap-2"
                    >
                      Siguiente
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 px-6 py-3 bg-rose-600 text-white rounded-lg font-semibold hover:bg-rose-700 transition disabled:bg-neutral-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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
                <OrderSummary
                  items={items}
                  total={total}
                  discount={discount}
                  shippingCost={shippingCost}
                  finalTotal={finalTotal}
                  subtotalAfterDiscount={subtotalAfterDiscount}
                  appliedCoupon={appliedCoupon}
                  removeCoupon={removeCoupon}
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
