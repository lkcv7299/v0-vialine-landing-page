"use client"

import { MapPin, Home, Briefcase } from "lucide-react"
import type { UseFormRegister, FieldErrors } from "react-hook-form"
import type { CheckoutFormData, SavedAddress } from "@/lib/checkout-schema"

type AddressStepProps = {
  register: UseFormRegister<CheckoutFormData>
  errors: FieldErrors<CheckoutFormData>
  hasSession: boolean
  savedAddresses: SavedAddress[]
  selectedAddressId: string | null
  useNewAddress: boolean
  setUseNewAddress: (value: boolean) => void
  onAddressSelect: (addressId: string) => void
  setSelectedAddressId: (value: string | null) => void
}

export default function AddressStep({
  register,
  errors,
  hasSession,
  savedAddresses,
  selectedAddressId,
  useNewAddress,
  setUseNewAddress,
  onAddressSelect,
  setSelectedAddressId,
}: AddressStepProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-6">
      <div className="flex items-center gap-2 mb-6">
        <MapPin className="w-5 h-5 text-neutral-900" />
        <h2 className="text-xl font-semibold">Dirección de Envío</h2>
      </div>

      {/* Toggle: Dirección guardada vs Nueva */}
      {hasSession && savedAddresses.length > 0 && (
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
                    onClick={() => onAddressSelect(addr.id)}
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
}
