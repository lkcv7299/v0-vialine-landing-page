import { NextRequest, NextResponse } from "next/server"

// Cupones de prueba - En producción esto debería estar en una base de datos
const COUPONS = [
  { code: "DESCUENTO10", discount: 10, type: "percentage" as const, active: true },
  { code: "VIALINE15", discount: 15, type: "percentage" as const, active: true },
  { code: "BIENVENIDA20", discount: 20, type: "percentage" as const, active: true },
  { code: "VERANO25", discount: 25, type: "percentage" as const, active: true },
  { code: "ENVIOGRATIS", discount: 15, type: "fixed" as const, active: true }, // Descuento fijo de S/ 15 (costo de envío)
  { code: "PRIMERACOMPRA", discount: 50, type: "fixed" as const, active: true },
]

/**
 * POST /api/validate-coupon
 * Valida un código de cupón y retorna el descuento
 */
export async function POST(request: NextRequest) {
  try {
    const { code } = await request.json()

    if (!code) {
      return NextResponse.json(
        { valid: false, error: "Código de cupón requerido" },
        { status: 400 }
      )
    }

    // Buscar el cupón
    const coupon = COUPONS.find(
      (c) => c.code.toUpperCase() === code.toUpperCase() && c.active
    )

    if (!coupon) {
      return NextResponse.json({
        valid: false,
        error: "Cupón inválido o expirado",
      })
    }

    return NextResponse.json({
      valid: true,
      code: coupon.code,
      discount: coupon.discount,
      type: coupon.type,
    })
  } catch (error) {
    console.error("Error validating coupon:", error)
    return NextResponse.json(
      { valid: false, error: "Error al validar cupón" },
      { status: 500 }
    )
  }
}
