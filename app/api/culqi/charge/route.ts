import { NextRequest, NextResponse } from 'next/server'

// IMPORTANTE: Esta es la URL de Culqi API
const CULQI_API_URL = 'https://api.culqi.com/v2/charges'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { token, amount, email, orderId } = body

    // Validar datos requeridos
    if (!token || !amount || !email) {
      return NextResponse.json(
        { success: false, error: 'Faltan datos requeridos' },
        { status: 400 }
      )
    }

    // Validar que exista la secret key
    const secretKey = process.env.CULQI_SECRET_KEY
    if (!secretKey) {
      console.error('ERROR: CULQI_SECRET_KEY no configurada en .env.local')
      return NextResponse.json(
        { success: false, error: 'Configuración de pagos incompleta' },
        { status: 500 }
      )
    }

    // Preparar el cargo a Culqi
    const chargeData = {
      amount: amount, // En centavos (ej: 10000 = S/ 100.00)
      currency_code: 'PEN',
      email: email,
      source_id: token,
      description: `Orden Vialine ${orderId}`,
    }

    console.log('Procesando cargo Culqi:', {
      amount: amount / 100,
      email,
      orderId,
    })

    // Hacer el cargo a Culqi
    const culqiResponse = await fetch(CULQI_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${secretKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(chargeData),
    })

    const culqiResult = await culqiResponse.json()

    // Si Culqi respondió con error
    if (!culqiResponse.ok) {
      console.error('Error de Culqi:', culqiResult)
      return NextResponse.json(
        {
          success: false,
          error: culqiResult.user_message || 'Error al procesar el pago',
        },
        { status: 400 }
      )
    }

    // ✅ Pago exitoso
    console.log('✅ Pago exitoso:', culqiResult.id)

    // Aquí deberías guardar la orden en tu base de datos
    // con el estado "paid" y el charge_id de Culqi

    // TODO: Guardar en base de datos
    // await saveOrderToDatabase({
    //   orderId,
    //   chargeId: culqiResult.id,
    //   amount,
    //   email,
    //   status: 'paid',
    // })

    return NextResponse.json({
      success: true,
      orderId: orderId,
      chargeId: culqiResult.id,
      amount: culqiResult.amount,
    })

  } catch (error) {
    console.error('Error procesando pago:', error)
    return NextResponse.json(
      { success: false, error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}