// app/api/admin/orders/[orderId]/route.ts
import { NextRequest, NextResponse } from "next/server"
import { createClient, createServiceClient } from "@/lib/supabase/server"

// Lista de emails de administradores
const ADMIN_EMAILS = [
  "admin@vialineperu.com",
  // Agregar más emails de admins aquí
]

/**
 * Verifica si el usuario actual es administrador
 */
async function isAdmin(): Promise<boolean> {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user?.email) return false

    // Verificar por email
    if (ADMIN_EMAILS.includes(user.email)) return true

    // Verificar por metadata (role: admin)
    if (user.user_metadata?.role === 'admin') return true
    if (user.app_metadata?.role === 'admin') return true

    return false
  } catch {
    return false
  }
}

// ====================================
// GET - Obtener detalle de una orden específica
// ====================================
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ orderId: string }> }
) {
  try {
    // Verificar permisos de admin
    const adminCheck = await isAdmin()
    if (!adminCheck) {
      return NextResponse.json(
        { error: "No autorizado" },
        { status: 403 }
      )
    }

    const { orderId } = await params

    const supabase = await createServiceClient()

    // Obtener orden principal por order_number
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .select('*')
      .eq('order_number', orderId)
      .single()

    if (orderError || !order) {
      return NextResponse.json(
        { error: "Orden no encontrada" },
        { status: 404 }
      )
    }

    // Obtener items de la orden usando el UUID interno
    const { data: items } = await supabase
      .from('order_items')
      .select('*')
      .eq('order_id', order.id)

    // Combinar datos con order_id para compatibilidad frontend
    const orderWithItems = {
      ...order,
      order_id: order.order_number,
      items: (items || []).map(item => ({
        ...item,
        selectedColor: item.color_name,
        selectedSize: item.size
      }))
    }

    return NextResponse.json({
      success: true,
      order: orderWithItems
    })
  } catch (error) {
    console.error("Error obteniendo detalle de orden:", error)
    return NextResponse.json(
      { error: "Error obteniendo detalle" },
      { status: 500 }
    )
  }
}
