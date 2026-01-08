import { Check, User, MapPin, Package } from "lucide-react"

type CheckoutStepperProps = {
  currentStep: number
  totalSteps: number
}

export default function CheckoutStepper({ currentStep, totalSteps }: CheckoutStepperProps) {
  return (
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
  )
}
