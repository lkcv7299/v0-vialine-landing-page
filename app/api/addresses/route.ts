// app/api/addresses/route.ts
import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { sql } from "@vercel/postgres"

// ====================================
// HELPER: Transform DB to Frontend
// ====================================
function transformToFrontend(dbAddress: any) {
  return {
    id: dbAddress.id.toString(),
    label: dbAddress.label || 'home',
    full_name: `${dbAddress.first_name} ${dbAddress.last_name}`.trim(),
    phone: dbAddress.phone,
    street: dbAddress.address,
    city: dbAddress.district,
    state: dbAddress.city,
    postal_code: dbAddress.postal_code,
    reference: dbAddress.reference,
    is_default: dbAddress.is_default,
  }
}

// ====================================
// HELPER: Parse full_name into first/last
// ====================================
function parseFullName(fullName: string) {
  const parts = fullName.trim().split(' ')
  if (parts.length === 1) {
    return { first_name: parts[0], last_name: '' }
  }
  const last_name = parts.pop() || ''
  const first_name = parts.join(' ')
  return { first_name, last_name }
}

// ====================================
// GET - OBTENER DIRECCIONES DEL USUARIO
// ====================================
export async function GET(request: NextRequest) {
  try {
    const session = await auth()

    if (!session || !session.user?.id) {
      return NextResponse.json(
        { error: "No autenticado" },
        { status: 401 }
      )
    }

    const userId = session.user.id

    const result = await sql`
      SELECT
        id,
        user_id,
        label,
        first_name,
        last_name,
        phone,
        address,
        district,
        city,
        postal_code,
        reference,
        is_default,
        created_at,
        updated_at
      FROM user_addresses
      WHERE user_id = ${userId}
      ORDER BY is_default DESC, created_at DESC
    `

    // Transform to frontend format
    const addresses = result.rows.map(transformToFrontend)

    return NextResponse.json({
      success: true,
      addresses,
    })
  } catch (error) {
    console.error("❌ Error en GET /api/addresses:", error)
    return NextResponse.json(
      { error: "Error al obtener direcciones" },
      { status: 500 }
    )
  }
}

// ====================================
// POST - CREAR NUEVA DIRECCIÓN
// ====================================
export async function POST(request: NextRequest) {
  try {
    const session = await auth()

    if (!session || !session.user?.id) {
      return NextResponse.json(
        { error: "No autenticado" },
        { status: 401 }
      )
    }

    const userId = session.user.id
    const body = await request.json()

    // Validar campos requeridos del frontend
    const requiredFields = ["full_name", "phone", "street", "city", "postal_code"]
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `El campo ${field} es requerido` },
          { status: 400 }
        )
      }
    }

    // Parse full_name into first_name and last_name
    const { first_name, last_name } = parseFullName(body.full_name)

    // Si es la primera dirección O se marca como default, actualizar otras
    if (body.is_default) {
      await sql`
        UPDATE user_addresses
        SET is_default = false
        WHERE user_id = ${userId}
      `
    }

    // Si es la primera dirección del usuario, hacerla default automáticamente
    const existingAddresses = await sql`
      SELECT COUNT(*) as count
      FROM user_addresses
      WHERE user_id = ${userId}
    `
    const isFirstAddress = existingAddresses.rows[0].count === "0"

    const result = await sql`
      INSERT INTO user_addresses (
        user_id,
        label,
        first_name,
        last_name,
        phone,
        address,
        district,
        city,
        postal_code,
        reference,
        is_default,
        created_at,
        updated_at
      ) VALUES (
        ${userId},
        ${body.label || 'home'},
        ${first_name},
        ${last_name},
        ${body.phone},
        ${body.street},
        ${body.city},
        ${body.state || 'Lima'},
        ${body.postal_code},
        ${body.reference || ""},
        ${body.is_default || isFirstAddress},
        NOW(),
        NOW()
      )
      RETURNING *
    `

    return NextResponse.json({
      success: true,
      address: transformToFrontend(result.rows[0]),
      message: "Dirección agregada exitosamente",
    })
  } catch (error) {
    console.error("❌ Error en POST /api/addresses:", error)
    return NextResponse.json(
      { error: "Error al crear dirección" },
      { status: 500 }
    )
  }
}

// ====================================
// PATCH - ACTUALIZAR DIRECCIÓN
// ====================================
export async function PATCH(request: NextRequest) {
  try {
    const session = await auth()

    if (!session || !session.user?.id) {
      return NextResponse.json(
        { error: "No autenticado" },
        { status: 401 }
      )
    }

    const userId = session.user.id
    const body = await request.json()

    if (!body.id) {
      return NextResponse.json(
        { error: "ID de dirección requerido" },
        { status: 400 }
      )
    }

    // Verificar que la dirección pertenezca al usuario
    const ownership = await sql`
      SELECT id FROM user_addresses
      WHERE id = ${body.id} AND user_id = ${userId}
    `

    if (ownership.rows.length === 0) {
      return NextResponse.json(
        { error: "Dirección no encontrada o no autorizada" },
        { status: 404 }
      )
    }

    // Si se marca como default, actualizar otras primero
    if (body.is_default === true) {
      await sql`
        UPDATE user_addresses
        SET is_default = false
        WHERE user_id = ${userId}
      `
    }

    // Parse full_name if provided
    let updateFields: any = {}

    if (body.full_name) {
      const { first_name, last_name } = parseFullName(body.full_name)
      updateFields.first_name = first_name
      updateFields.last_name = last_name
    }

    if (body.label) updateFields.label = body.label
    if (body.phone) updateFields.phone = body.phone
    if (body.street) updateFields.address = body.street
    if (body.city) updateFields.district = body.city
    if (body.state) updateFields.city = body.state
    if (body.postal_code) updateFields.postal_code = body.postal_code
    if (body.reference !== undefined) updateFields.reference = body.reference
    if (body.is_default !== undefined) updateFields.is_default = body.is_default

    const result = await sql`
      UPDATE user_addresses
      SET
        label = COALESCE(${updateFields.label}, label),
        first_name = COALESCE(${updateFields.first_name}, first_name),
        last_name = COALESCE(${updateFields.last_name}, last_name),
        phone = COALESCE(${updateFields.phone}, phone),
        address = COALESCE(${updateFields.address}, address),
        district = COALESCE(${updateFields.district}, district),
        city = COALESCE(${updateFields.city}, city),
        postal_code = COALESCE(${updateFields.postal_code}, postal_code),
        reference = COALESCE(${updateFields.reference}, reference),
        is_default = COALESCE(${updateFields.is_default}, is_default),
        updated_at = NOW()
      WHERE id = ${body.id} AND user_id = ${userId}
      RETURNING *
    `

    return NextResponse.json({
      success: true,
      address: transformToFrontend(result.rows[0]),
      message: "Dirección actualizada exitosamente",
    })
  } catch (error) {
    console.error("❌ Error en PATCH /api/addresses:", error)
    return NextResponse.json(
      { error: "Error al actualizar dirección" },
      { status: 500 }
    )
  }
}

// ====================================
// DELETE - ELIMINAR DIRECCIÓN
// ====================================
export async function DELETE(request: NextRequest) {
  try {
    const session = await auth()

    if (!session || !session.user?.id) {
      return NextResponse.json(
        { error: "No autenticado" },
        { status: 401 }
      )
    }

    const userId = session.user.id
    const { searchParams } = new URL(request.url)
    const addressId = searchParams.get("id")

    if (!addressId) {
      return NextResponse.json(
        { error: "ID de dirección requerido" },
        { status: 400 }
      )
    }

    // Verificar ownership y si es default
    const address = await sql`
      SELECT is_default FROM user_addresses
      WHERE id = ${addressId} AND user_id = ${userId}
    `

    if (address.rows.length === 0) {
      return NextResponse.json(
        { error: "Dirección no encontrada" },
        { status: 404 }
      )
    }

    const wasDefault = address.rows[0].is_default

    // Eliminar dirección
    await sql`
      DELETE FROM user_addresses
      WHERE id = ${addressId} AND user_id = ${userId}
    `

    // Si era default, marcar otra como default
    if (wasDefault) {
      await sql`
        UPDATE user_addresses
        SET is_default = true
        WHERE user_id = ${userId}
        AND id = (
          SELECT id FROM user_addresses
          WHERE user_id = ${userId}
          ORDER BY created_at DESC
          LIMIT 1
        )
      `
    }

    return NextResponse.json({
      success: true,
      message: "Dirección eliminada exitosamente",
    })
  } catch (error) {
    console.error("❌ Error en DELETE /api/addresses:", error)
    return NextResponse.json(
      { error: "Error al eliminar dirección" },
      { status: 500 }
    )
  }
}
