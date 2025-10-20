import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { sql } from "@vercel/postgres"

/**
 * GET /api/account/addresses
 * Lista todas las direcciones del usuario
 */
export async function GET(request: NextRequest) {
  try {
    const session = await auth()
    
    if (!session || !session.user?.email) {
      return NextResponse.json(
        { error: "No autorizado" },
        { status: 401 }
      )
    }

    // Obtener user_id
    const userResult = await sql`
      SELECT id FROM users WHERE email = ${session.user.email} LIMIT 1
    `

    if (userResult.rows.length === 0) {
      return NextResponse.json(
        { error: "Usuario no encontrado" },
        { status: 404 }
      )
    }

    const userId = userResult.rows[0].id

    // Obtener todas las direcciones del usuario
    const addressesResult = await sql`
      SELECT * FROM user_addresses 
      WHERE user_id = ${userId}
      ORDER BY is_default DESC, created_at DESC
    `

    const addresses = addressesResult.rows.map(addr => ({
      id: addr.id,
      label: addr.label,
      full_name: addr.full_name,
      phone: addr.phone,
      street: addr.street,
      city: addr.city,
      state: addr.state,
      postal_code: addr.postal_code,
      is_default: addr.is_default,
      created_at: addr.created_at,
    }))

    return NextResponse.json({
      success: true,
      addresses
    })

  } catch (error) {
    console.error("Error en GET /api/account/addresses:", error)
    return NextResponse.json(
      { error: "Error al obtener direcciones" },
      { status: 500 }
    )
  }
}

/**
 * POST /api/account/addresses
 * Crea una nueva dirección
 */
export async function POST(request: NextRequest) {
  try {
    const session = await auth()
    
    if (!session || !session.user?.email) {
      return NextResponse.json(
        { error: "No autorizado" },
        { status: 401 }
      )
    }

    // Obtener user_id
    const userResult = await sql`
      SELECT id FROM users WHERE email = ${session.user.email} LIMIT 1
    `

    if (userResult.rows.length === 0) {
      return NextResponse.json(
        { error: "Usuario no encontrado" },
        { status: 404 }
      )
    }

    const userId = userResult.rows[0].id

    // Obtener datos del body
    const body = await request.json()
    const { label, full_name, phone, street, city, state, postal_code, is_default } = body

    // Validar campos requeridos
    if (!label || !full_name || !phone || !street || !city) {
      return NextResponse.json(
        { error: "Faltan campos requeridos" },
        { status: 400 }
      )
    }

    // Si es_default es true, desmarcar las demás como default
    if (is_default) {
      await sql`
        UPDATE user_addresses 
        SET is_default = false 
        WHERE user_id = ${userId}
      `
    }

    // Insertar nueva dirección
    const result = await sql`
      INSERT INTO user_addresses (
        user_id, label, full_name, phone, street, city, state, postal_code, is_default
      )
      VALUES (
        ${userId}, ${label}, ${full_name}, ${phone}, ${street}, ${city}, 
        ${state || ''}, ${postal_code || ''}, ${is_default || false}
      )
      RETURNING *
    `

    const newAddress = result.rows[0]

    return NextResponse.json({
      success: true,
      address: {
        id: newAddress.id,
        label: newAddress.label,
        full_name: newAddress.full_name,
        phone: newAddress.phone,
        street: newAddress.street,
        city: newAddress.city,
        state: newAddress.state,
        postal_code: newAddress.postal_code,
        is_default: newAddress.is_default,
      }
    }, { status: 201 })

  } catch (error) {
    console.error("Error en POST /api/account/addresses:", error)
    return NextResponse.json(
      { error: "Error al crear dirección" },
      { status: 500 }
    )
  }
}

/**
 * DELETE /api/account/addresses?id=XXX
 * Elimina una dirección
 */
export async function DELETE(request: NextRequest) {
  try {
    const session = await auth()
    
    if (!session || !session.user?.email) {
      return NextResponse.json(
        { error: "No autorizado" },
        { status: 401 }
      )
    }

    // Obtener user_id
    const userResult = await sql`
      SELECT id FROM users WHERE email = ${session.user.email} LIMIT 1
    `

    if (userResult.rows.length === 0) {
      return NextResponse.json(
        { error: "Usuario no encontrado" },
        { status: 404 }
      )
    }

    const userId = userResult.rows[0].id

    // Obtener id de la dirección desde query params
    const { searchParams } = new URL(request.url)
    const addressId = searchParams.get('id')

    if (!addressId) {
      return NextResponse.json(
        { error: "ID de dirección requerido" },
        { status: 400 }
      )
    }

    // Verificar que la dirección pertenece al usuario
    const addressResult = await sql`
      SELECT * FROM user_addresses 
      WHERE id = ${parseInt(addressId)} AND user_id = ${userId}
      LIMIT 1
    `

    if (addressResult.rows.length === 0) {
      return NextResponse.json(
        { error: "Dirección no encontrada" },
        { status: 404 }
      )
    }

    // Eliminar dirección
    await sql`
      DELETE FROM user_addresses 
      WHERE id = ${parseInt(addressId)} AND user_id = ${userId}
    `

    return NextResponse.json({
      success: true,
      message: "Dirección eliminada"
    })

  } catch (error) {
    console.error("Error en DELETE /api/account/addresses:", error)
    return NextResponse.json(
      { error: "Error al eliminar dirección" },
      { status: 500 }
    )
  }
}

/**
 * PATCH /api/account/addresses?id=XXX
 * Marca una dirección como predeterminada
 */
export async function PATCH(request: NextRequest) {
  try {
    const session = await auth()
    
    if (!session || !session.user?.email) {
      return NextResponse.json(
        { error: "No autorizado" },
        { status: 401 }
      )
    }

    // Obtener user_id
    const userResult = await sql`
      SELECT id FROM users WHERE email = ${session.user.email} LIMIT 1
    `

    if (userResult.rows.length === 0) {
      return NextResponse.json(
        { error: "Usuario no encontrado" },
        { status: 404 }
      )
    }

    const userId = userResult.rows[0].id

    // Obtener id de la dirección desde query params
    const { searchParams } = new URL(request.url)
    const addressId = searchParams.get('id')

    if (!addressId) {
      return NextResponse.json(
        { error: "ID de dirección requerido" },
        { status: 400 }
      )
    }

    // Verificar que la dirección pertenece al usuario
    const addressResult = await sql`
      SELECT * FROM user_addresses 
      WHERE id = ${parseInt(addressId)} AND user_id = ${userId}
      LIMIT 1
    `

    if (addressResult.rows.length === 0) {
      return NextResponse.json(
        { error: "Dirección no encontrada" },
        { status: 404 }
      )
    }

    // Desmarcar todas las direcciones del usuario como default
    await sql`
      UPDATE user_addresses 
      SET is_default = false 
      WHERE user_id = ${userId}
    `

    // Marcar la dirección seleccionada como default
    await sql`
      UPDATE user_addresses 
      SET is_default = true 
      WHERE id = ${parseInt(addressId)} AND user_id = ${userId}
    `

    return NextResponse.json({
      success: true,
      message: "Dirección marcada como predeterminada"
    })

  } catch (error) {
    console.error("Error en PATCH /api/account/addresses:", error)
    return NextResponse.json(
      { error: "Error al actualizar dirección" },
      { status: 500 }
    )
  }
}