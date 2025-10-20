// app/api/addresses/route.ts
import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { sql } from "@vercel/postgres"

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

    // ✅ CORREGIDO: Columnas reales de la tabla user_addresses
    const result = await sql`
      SELECT 
        id,
        user_id,
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

    return NextResponse.json({
      success: true,
      addresses: result.rows,
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

    // ✅ CORREGIDO: Validar campos reales
    const requiredFields = ["first_name", "last_name", "phone", "address", "district", "city", "postal_code"]
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `El campo ${field} es requerido` },
          { status: 400 }
        )
      }
    }

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

    // ✅ CORREGIDO: Columnas reales de la tabla
    const result = await sql`
      INSERT INTO user_addresses (
        user_id,
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
        ${body.first_name},
        ${body.last_name},
        ${body.phone},
        ${body.address},
        ${body.district},
        ${body.city},
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
      address: result.rows[0],
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

    // ✅ CORREGIDO: Columnas reales
    const result = await sql`
      UPDATE user_addresses
      SET
        first_name = COALESCE(${body.first_name}, first_name),
        last_name = COALESCE(${body.last_name}, last_name),
        phone = COALESCE(${body.phone}, phone),
        address = COALESCE(${body.address}, address),
        district = COALESCE(${body.district}, district),
        city = COALESCE(${body.city}, city),
        postal_code = COALESCE(${body.postal_code}, postal_code),
        reference = COALESCE(${body.reference}, reference),
        is_default = COALESCE(${body.is_default}, is_default),
        updated_at = NOW()
      WHERE id = ${body.id} AND user_id = ${userId}
      RETURNING *
    `

    return NextResponse.json({
      success: true,
      address: result.rows[0],
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