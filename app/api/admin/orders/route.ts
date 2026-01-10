// app/api/admin/orders/route.ts
import { NextRequest, NextResponse } from "next/server"
import { createClient, createServiceClient } from "@/lib/supabase/server"
import { sendOrderStatusEmail } from "@/lib/order-status-email"

// Lista de emails de administradores (también verificar en user_metadata)
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
// GET - Obtener todas las órdenes CON sus items
// ====================================
export async function GET() {
  try {
    // Verificar permisos de admin
    const adminCheck = await isAdmin()
    if (!adminCheck) {
      return NextResponse.json(
        { error: "No autorizado" },
        { status: 403 }
      )
    }

    console.log("📦 Consultando todas las órdenes...")

    // Usar service client para bypass de RLS
    const supabase = await createServiceClient()

    // Obtener todas las órdenes
    const { data: orders, error: ordersError } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false })

    if (ordersError) throw ordersError

    // Para cada orden, obtener sus items
    const ordersWithItems = await Promise.all(
      (orders || []).map(async (order) => {
        const { data: items } = await supabase
          .from('order_items')
          .select('*')
          .eq('order_id', order.id)

        return {
          ...order,
          // Agregar order_id para compatibilidad con frontend
          order_id: order.order_number,
          items: (items || []).map((item) => ({
            productTitle: item.product_title,
            productPrice: item.product_price || 0,
            quantity: item.quantity,
            selectedColor: item.color_name,
            selectedSize: item.size,
            productImage: item.product_image,
            productSlug: item.product_slug
          }))
        }
      })
    )

    console.log(`✅ Se encontraron ${ordersWithItems.length} órdenes`)

    return NextResponse.json({
      success: true,
      orders: ordersWithItems
    })
  } catch (error) {
    console.error("❌ Error obteniendo órdenes:", error)
    return NextResponse.json(
      { error: "Error al obtener órdenes" },
      { status: 500 }
    )
  }
}

// ====================================
// PATCH - Actualizar estado de una orden
// ====================================
export async function PATCH(request: NextRequest) {
  try {
    // Verificar permisos de admin
    const adminCheck = await isAdmin()
    if (!adminCheck) {
      return NextResponse.json(
        { error: "No autorizado" },
        { status: 403 }
      )
    }

    const body = await request.json()
    const { orderId, status } = body

    if (!orderId || !status) {
      return NextResponse.json(
        { error: "orderId y status son requeridos" },
        { status: 400 }
      )
    }

    console.log(`🔄 Actualizando orden ${orderId} a estado: ${status}`)

    const supabase = await createServiceClient()

    // Primero obtener los datos de la orden para el email
    const { data: order, error: fetchError } = await supabase
      .from('orders')
      .select('id, order_number, customer_name, customer_email')
      .eq('order_number', orderId)
      .single()

    if (fetchError || !order) {
      return NextResponse.json(
        { error: "Orden no encontrada" },
        { status: 404 }
      )
    }

    // Actualizar el estado en la base de datos
    const { error: updateError } = await supabase
      .from('orders')
      .update({
        status: status,
        updated_at: new Date().toISOString()
      })
      .eq('id', order.id)

    if (updateError) throw updateError

    console.log(`✅ Estado actualizado - Orden ${orderId}`)

    // Enviar email de notificación al cliente
    const trackingUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'https://vialineperu.com'}/orden/${order.order_number}`

    sendOrderStatusEmail({
      orderId: order.order_number,
      customerName: order.customer_name,
      customerEmail: order.customer_email,
      status: status,
      trackingUrl: trackingUrl
    })
      .then(success => {
        if (success) {
          console.log(`✅ Email de actualización enviado - Orden ${orderId}`)
        } else {
          console.log(`⚠️ No se pudo enviar email de actualización - Orden ${orderId}`)
        }
      })
      .catch(err => console.error(`❌ Error enviando email de actualización:`, err))

    return NextResponse.json({
      success: true,
      message: "Estado actualizado exitosamente",
      orderId: orderId,
      newStatus: status
    })
  } catch (error) {
    console.error("❌ Error actualizando estado:", error)
    return NextResponse.json(
      { error: "Error al actualizar el estado" },
      { status: 500 }
    )
  }
}
