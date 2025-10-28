import { NextRequest, NextResponse } from 'next/server'

const CULQI_API_URL = 'https://api.culqi.com/v2/charges'

export async function POST(request: NextRequest) {
  // ✅ FIXED: Solo log en desarrollo
  if (process.env.NODE_ENV === 'development') {
    console.log('🔔 API /culqi/charge llamada')
  }

  try {
    const body = await request.json()
    const { token, amount, email, orderId } = body

    // ✅ FIXED: Solo log en desarrollo
    if (process.env.NODE_ENV === 'development') {
      console.log('📥 Datos recibidos:', {
        token: token ? token.substring(0, 20) + '...' : 'MISSING',
        amount,
        email,
        orderId,
      })
    }

    // ====================================
    // VALIDACIONES
    // ====================================
    if (!token) {
      console.error('❌ Token faltante')
      return NextResponse.json(
        { success: false, error: 'Token de pago es requerido' },
        { status: 400 }
      )
    }

    if (!amount || amount <= 0) {
      console.error('❌ Monto inválido:', amount)
      return NextResponse.json(
        { success: false, error: 'Monto inválido' },
        { status: 400 }
      )
    }

    if (!email) {
      console.error('❌ Email faltante')
      return NextResponse.json(
        { success: false, error: 'Email es requerido' },
        { status: 400 }
      )
    }

    // Validar Secret Key
    const secretKey = process.env.CULQI_SECRET_KEY
    
    if (!secretKey) {
      console.error('❌ CULQI_SECRET_KEY no configurada en variables de entorno')
      return NextResponse.json(
        { success: false, error: 'Configuración de pagos incompleta' },
        { status: 500 }
      )
    }

    if (!secretKey.startsWith('sk_test_') && !secretKey.startsWith('sk_live_')) {
      console.error('❌ Secret Key inválida (debe empezar con sk_test_ o sk_live_)')
      return NextResponse.json(
        { success: false, error: 'Configuración de pagos inválida' },
        { status: 500 }
      )
    }

    // ✅ FIXED: No exponer Secret Key en logs de producción
    if (process.env.NODE_ENV === 'development') {
      console.log('✅ Validaciones pasadas')
      console.log('🔑 Secret Key:', secretKey.substring(0, 15) + '...')
    }

    // ====================================
    // PREPARAR CARGO PARA CULQI
    // ====================================
    const chargeData = {
      amount: amount,
      currency_code: 'PEN',
      email: email,
      source_id: token,
      description: `Vialine - Orden ${orderId || 'N/A'}`,
    }

    // ✅ FIXED: Solo log en desarrollo
    if (process.env.NODE_ENV === 'development') {
      console.log('📤 Enviando cargo a Culqi:', {
        amount: amount / 100,
        currency: 'PEN',
        email,
        description: chargeData.description,
      })
    }

    // ====================================
    // HACER CARGO A CULQI
    // ====================================
    const culqiResponse = await fetch(CULQI_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${secretKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(chargeData),
    })

    const culqiResult = await culqiResponse.json()

    // ✅ FIXED: Solo log en desarrollo
    if (process.env.NODE_ENV === 'development') {
      console.log('📥 Respuesta de Culqi:', {
        status: culqiResponse.status,
        statusText: culqiResponse.statusText,
      })
    }

    // ====================================
    // MANEJAR RESPUESTA DE CULQI
    // ====================================
    if (!culqiResponse.ok) {
      console.error('❌ Error de Culqi:', culqiResult)
      
      // Extraer mensaje de error
      const errorMessage = culqiResult.user_message || 
                          culqiResult.merchant_message || 
                          culqiResult.message ||
                          'Error al procesar el pago'
      
      const errorCode = culqiResult.type || 
                       culqiResult.error_code || 
                       'unknown_error'

      console.error('❌ Error Code:', errorCode)
      console.error('❌ Error Message:', errorMessage)

      return NextResponse.json(
        {
          success: false,
          error: errorMessage,
          errorCode: errorCode,
        },
        { status: 400 }
      )
    }

    // ====================================
    // PAGO EXITOSO
    // ====================================
    // ✅ FIXED: Solo log en desarrollo
    if (process.env.NODE_ENV === 'development') {
      console.log('✅ Pago exitoso!')
      console.log('🆔 Charge ID:', culqiResult.id)
      console.log('💰 Monto:', culqiResult.amount / 100, 'PEN')
    }

    // TODO: Guardar en base de datos
    // Aquí deberías guardar la transacción en tu DB
    /*
    await sql`
      UPDATE orders 
      SET 
        status = 'paid',
        payment_id = ${culqiResult.id},
        updated_at = NOW()
      WHERE order_id = ${orderId}
    `
    */

    return NextResponse.json({
      success: true,
      orderId: orderId,
      chargeId: culqiResult.id,
      amount: culqiResult.amount,
      currency: culqiResult.currency_code,
      email: culqiResult.email,
    })

  } catch (error) {
    console.error('❌ Error fatal procesando pago:', error)
    
    const errorMessage = error instanceof Error ? error.message : 'Error desconocido'
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Error interno del servidor',
        details: errorMessage,
      },
      { status: 500 }
    )
  }
}