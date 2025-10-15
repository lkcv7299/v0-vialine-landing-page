"use client"

import { useState } from "react"
import { X, Mail, Gift, Sparkles, Lock } from "lucide-react"
import { useNewsletter } from "./providers/NewsletterContext"
import { subscribeToNewsletter } from "@/lib/brevo"

export default function NewsletterPopup() {
  const { showPopup, dismissPopup, markAsSubscribed } = useNewsletter()
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle")
  const [message, setMessage] = useState("")
  const [couponCode, setCouponCode] = useState("")

  // Si no debe mostrarse, no renderizar nada
  if (!showPopup) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email) {
      setStatus("error")
      setMessage("Por favor ingresa tu email")
      return
    }

    setIsLoading(true)
    setStatus("idle")
    
    try {
      const result = await subscribeToNewsletter(email)
      
      if (result.success) {
        setStatus("success")
        setMessage(result.message)
        setCouponCode(result.couponCode || "")
        markAsSubscribed()
        
        // Auto-cerrar después de 5 segundos
        setTimeout(() => {
          dismissPopup()
        }, 5000)
      } else {
        setStatus("error")
        setMessage(result.message)
      }
    } catch (error) {
      setStatus("error")
      setMessage("Error al procesar tu suscripción. Intenta nuevamente.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleClose = () => {
    dismissPopup()
  }

  return (
    <>
      {/* Overlay oscuro */}
      <div 
        className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={handleClose}
      />
      
      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div 
          className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full pointer-events-auto animate-in zoom-in-95 duration-300"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Botón cerrar */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-neutral-100 transition-colors z-10"
            aria-label="Cerrar"
          >
            <X className="w-5 h-5 text-neutral-600" />
          </button>

          {/* Contenido */}
          <div className="p-8">
            {status === "success" ? (
              // Estado de éxito
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <Gift className="w-8 h-8 text-green-600" />
                </div>
                
                <h2 className="text-2xl font-bold text-neutral-900">
                  ¡Bienvenida a Vialine! 🎉
                </h2>
                
                <p className="text-neutral-600">
                  {message}
                </p>
                
                {couponCode && (
                  <div className="bg-rose-50 border-2 border-rose-600 rounded-xl p-4">
                    <p className="text-sm text-neutral-600 mb-2">Tu cupón de descuento:</p>
                    <p className="text-2xl font-bold text-rose-600 tracking-wider">
                      {couponCode}
                    </p>
                    <p className="text-xs text-neutral-500 mt-2">
                      Copia este código y úsalo en el checkout
                    </p>
                  </div>
                )}
                
                <p className="text-sm text-neutral-500">
                  También lo enviamos a tu email 📧
                </p>
              </div>
            ) : (
              // Estado inicial / form
              <>
                {/* Header con ícono */}
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-rose-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Gift className="w-8 h-8 text-rose-600" />
                  </div>
                  
                  <h2 className="text-3xl font-bold text-neutral-900 mb-2">
                    ¡Bienvenida! 🎁
                  </h2>
                  
                  <p className="text-lg text-neutral-600">
                    <strong className="text-rose-600">10% OFF</strong> en tu primera compra
                    <br />
                    <span className="text-base">+ envío gratis</span>
                  </p>
                </div>

                {/* Beneficios */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-start gap-3">
                    <Sparkles className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-neutral-700">
                      Descuentos exclusivos para suscriptoras
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-neutral-700">
                      Acceso anticipado a nuevas colecciones
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Gift className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-neutral-700">
                      Tips y guías de activewear
                    </p>
                  </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="tu@email.com"
                      className="w-full px-4 py-3.5 border border-neutral-300 rounded-full focus:outline-none focus:ring-2 focus:ring-rose-600 focus:border-transparent transition-all text-neutral-900 placeholder:text-neutral-400"
                      disabled={isLoading}
                    />
                  </div>

                  {/* Mensaje de error */}
                  {status === "error" && (
                    <p className="text-sm text-red-600 text-center">
                      {message}
                    </p>
                  )}

                  {/* Botón submit */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full py-3.5 rounded-full font-semibold transition-all ${
                      isLoading
                        ? "bg-neutral-300 text-neutral-500 cursor-not-allowed"
                        : "bg-rose-600 text-white hover:bg-rose-700 active:scale-95"
                    }`}
                  >
                    {isLoading ? "Suscribiendo..." : "Quiero mi descuento"}
                  </button>
                </form>

                {/* Privacidad */}
                <div className="mt-4 flex items-start gap-2 text-xs text-neutral-500">
                  <Lock className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                  <p>
                    Tu privacidad es importante. No spam.
                    <br />
                    Puedes darte de baja en cualquier momento.
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  )
}