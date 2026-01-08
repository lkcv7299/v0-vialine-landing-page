import * as z from "zod"

// ====================================
// VALIDACIÓN CON ZOD
// ====================================
export const checkoutSchema = z.object({
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

export type CheckoutFormData = z.infer<typeof checkoutSchema>

// ====================================
// TIPOS
// ====================================
export interface SavedAddress {
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

// ====================================
// CONSTANTES
// ====================================
export const TOTAL_STEPS = 3
export const FREE_SHIPPING_THRESHOLD = 269
export const SHIPPING_COST = 15
