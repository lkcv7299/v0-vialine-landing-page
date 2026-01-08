"use client"

import Link from "next/link"
import { CreditCard } from "lucide-react"
import type { UseFormRegister, FieldErrors } from "react-hook-form"
import type { CheckoutFormData } from "@/lib/checkout-schema"

type PaymentStepProps = {
  register: UseFormRegister<CheckoutFormData>
  errors: FieldErrors<CheckoutFormData>
  paymentMethod: string
}

export default function PaymentStep({
  register,
  errors,
  paymentMethod,
}: PaymentStepProps) {
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
              <span className="font-medium">Tarjeta de crédito/débito / Yape</span>
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
              <span className="font-medium">Pago contra entrega</span>
              <p className="text-xs text-neutral-500 mt-1">Paga en efectivo o Yape/Plin cuando recibas tu pedido</p>
            </div>
            <span className="bg-rose-100 text-rose-700 text-xs font-semibold px-2 py-1 rounded-full">
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
}
