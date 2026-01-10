// app/api/addresses/route.ts
import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

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
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user?.id) {
      return NextResponse.json(
        { error: "No autenticado" },
        { status: 401 }
      )
    }

    const { data: addressesData, error } = await supabase
      .from('addresses')
      .select('*')
      .eq('user_id', user.id)
      .order('is_default', { ascending: false })
      .order('created_at', { ascending: false })

    if (error) throw error

    // Transform to frontend format
    const addresses = (addressesData || []).map(transformToFrontend)

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
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user?.id) {
      return NextResponse.json(
        { error: "No autenticado" },
        { status: 401 }
      )
    }

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

    // Si se marca como default, actualizar otras primero
    if (body.is_default) {
      await supabase
        .from('addresses')
        .update({ is_default: false })
        .eq('user_id', user.id)
    }

    // Si es la primera dirección del usuario, hacerla default automáticamente
    const { count } = await supabase
      .from('addresses')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id)

    const isFirstAddress = count === 0

    const { data: newAddress, error } = await supabase
      .from('addresses')
      .insert({
        user_id: user.id,
        label: body.label || 'home',
        first_name,
        last_name,
        phone: body.phone,
        address: body.street,
        district: body.city,
        city: body.state || 'Lima',
        postal_code: body.postal_code,
        reference: body.reference || "",
        is_default: body.is_default || isFirstAddress
      })
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({
      success: true,
      address: transformToFrontend(newAddress),
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
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user?.id) {
      return NextResponse.json(
        { error: "No autenticado" },
        { status: 401 }
      )
    }

    const body = await request.json()

    if (!body.id) {
      return NextResponse.json(
        { error: "ID de dirección requerido" },
        { status: 400 }
      )
    }

    // Verificar que la dirección pertenezca al usuario
    const { data: existing } = await supabase
      .from('addresses')
      .select('id')
      .eq('id', body.id)
      .eq('user_id', user.id)
      .single()

    if (!existing) {
      return NextResponse.json(
        { error: "Dirección no encontrada o no autorizada" },
        { status: 404 }
      )
    }

    // Si se marca como default, actualizar otras primero
    if (body.is_default === true) {
      await supabase
        .from('addresses')
        .update({ is_default: false })
        .eq('user_id', user.id)
    }

    // Parse full_name if provided
    let updateFields: any = { updated_at: new Date().toISOString() }

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

    const { data: updatedAddress, error } = await supabase
      .from('addresses')
      .update(updateFields)
      .eq('id', body.id)
      .eq('user_id', user.id)
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({
      success: true,
      address: transformToFrontend(updatedAddress),
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
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user?.id) {
      return NextResponse.json(
        { error: "No autenticado" },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const addressId = searchParams.get("id")

    if (!addressId) {
      return NextResponse.json(
        { error: "ID de dirección requerido" },
        { status: 400 }
      )
    }

    // Verificar ownership y si es default
    const { data: address } = await supabase
      .from('addresses')
      .select('is_default')
      .eq('id', addressId)
      .eq('user_id', user.id)
      .single()

    if (!address) {
      return NextResponse.json(
        { error: "Dirección no encontrada" },
        { status: 404 }
      )
    }

    const wasDefault = address.is_default

    // Eliminar dirección
    const { error: deleteError } = await supabase
      .from('addresses')
      .delete()
      .eq('id', addressId)
      .eq('user_id', user.id)

    if (deleteError) throw deleteError

    // Si era default, marcar otra como default
    if (wasDefault) {
      const { data: nextAddress } = await supabase
        .from('addresses')
        .select('id')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(1)
        .single()

      if (nextAddress) {
        await supabase
          .from('addresses')
          .update({ is_default: true })
          .eq('id', nextAddress.id)
      }
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
