import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

/**
 * GET /api/account/pedidos
 *
 * Obtiene todas las órdenes del usuario autenticado con sus items
 *
 * Query params opcionales:
 * - limit: Número de órdenes a retornar (default: 50, max: 100)
 * - offset: Para paginación (default: 0)
 * - status: Filtrar por estado (opcional)
 *
 * @returns {object} { success: true, orders: Order[], pagination: {...} }
 */
export async function GET(request: Request) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user?.id) {
      return NextResponse.json(
        { error: "No autenticado" },
        { status: 401 }
      )
    }

    // Parsear query params
    const { searchParams } = new URL(request.url)

    let limit = parseInt(searchParams.get("limit") || "50")
    if (limit < 1) limit = 50
    if (limit > 100) limit = 100

    const offset = parseInt(searchParams.get("offset") || "0")
    const statusFilter = searchParams.get("status")

    // Contar total de órdenes
    let countQuery = supabase
      .from('orders')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id)

    if (statusFilter) {
      countQuery = countQuery.eq('status', statusFilter)
    }

    const { count: total } = await countQuery

    // Obtener órdenes
    let ordersQuery = supabase
      .from('orders')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1)

    if (statusFilter) {
      ordersQuery = ordersQuery.eq('status', statusFilter)
    }

    const { data: orders, error: ordersError } = await ordersQuery

    if (ordersError) throw ordersError

    // Obtener items de cada orden
    const ordersWithItems = await Promise.all(
      (orders || []).map(async (order) => {
        const { data: items } = await supabase
          .from('order_items')
          .select('*')
          .eq('order_id', order.id)
          .order('id', { ascending: true })

        const itemsWithParsedNumbers = (items || []).map(item => ({
          id: item.id,
          order_id: item.order_id,
          product_slug: item.product_slug,
          product_name: item.product_title,
          unit_price: item.product_price || 0,
          product_image: item.product_image,
          variant_color: item.color_name,
          variant_size: item.size,
          quantity: item.quantity || 0,
          total_price: item.item_total || 0,
        }))

        // Parse customer name into first/last for frontend compatibility
        const nameParts = (order.customer_name || '').trim().split(' ')
        const customerFirstName = nameParts[0] || ''
        const customerLastName = nameParts.slice(1).join(' ') || ''

        // Parse shipping address JSON
        const shippingAddr = order.shipping_address as any || {}

        return {
          id: order.id,
          order_number: order.order_number,
          user_id: order.user_id,
          customer_email: order.customer_email,
          customer_name: customerFirstName,
          customer_lastname: customerLastName,
          customer_phone: order.customer_phone,
          shipping_address: shippingAddr.address || '',
          shipping_district: shippingAddr.district || '',
          shipping_city: shippingAddr.city || '',
          shipping_postal_code: shippingAddr.postalCode || '',
          shipping_reference: shippingAddr.reference || '',
          payment_method: order.payment_method,
          subtotal: order.subtotal || 0,
          shipping_cost: order.shipping_cost || 0,
          total: order.total || 0,
          status: order.status,
          payment_id: order.payment_id,
          payment_status: order.payment_status,
          notes: order.customer_notes,
          created_at: order.created_at,
          updated_at: order.updated_at,
          order_id: order.order_number,
          items: itemsWithParsedNumbers,
        }
      })
    )

    return NextResponse.json({
      success: true,
      orders: ordersWithItems,
      pagination: {
        total: total || 0,
        limit,
        offset,
        hasMore: offset + limit < (total || 0),
        currentPage: Math.floor(offset / limit) + 1,
        totalPages: Math.ceil((total || 0) / limit),
      },
    })
  } catch (error) {
    console.error("❌ Error en GET /api/account/pedidos:", error)

    return NextResponse.json(
      {
        error: "Error al obtener pedidos",
        details: process.env.NODE_ENV === "development" ? String(error) : undefined
      },
      { status: 500 }
    )
  }
}
