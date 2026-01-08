"use client"

import { User, Mail, Phone } from "lucide-react"
import type { UseFormRegister, FieldErrors } from "react-hook-form"
import type { CheckoutFormData } from "@/lib/checkout-schema"

type PersonalInfoStepProps = {
  register: UseFormRegister<CheckoutFormData>
  errors: FieldErrors<CheckoutFormData>
  isEmailReadOnly: boolean
}

export default function PersonalInfoStep({
  register,
  errors,
  isEmailReadOnly,
}: PersonalInfoStepProps) {
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
            readOnly={isEmailReadOnly}
            className={`w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-600 focus:border-transparent outline-none ${
              isEmailReadOnly ? 'bg-neutral-50 cursor-not-allowed' : ''
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
}
