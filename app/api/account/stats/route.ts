import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

/**
 * GET /api/account/stats
 *
 * Obtiene estadísticas del usuario autenticado:
 * - Número de órdenes totales
 * - Número de direcciones guardadas
 * - Wishlist items
 * - Pedidos pendientes
 *
 * @returns {object} { totalOrders, totalSpent, savedAddresses, wishlistItems, pendingOrders }
 */
export async function GET() {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user?.id) {
      return NextResponse.json(
        { error: "No autenticado" },
        { status: 401 }
      )
    }

    // Contar órdenes y calcular total gastado
    const { data: orders } = await supabase
      .from('orders')
      .select('total')
      .eq('user_id', user.id)

    const totalOrders = orders?.length || 0
    const totalSpent = orders?.reduce((sum, order) => sum + (order.total || 0), 0) || 0

    // Contar pedidos pendientes
    const { count: pendingOrders } = await supabase
      .from('orders')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id)
      .in('status', ['pending_payment', 'pending'])

    // Contar direcciones del usuario
    const { count: savedAddresses } = await supabase
      .from('addresses')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id)

    // Contar items en wishlist
    const { count: wishlistItems } = await supabase
      .from('wishlist')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id)

    return NextResponse.json({
      totalOrders,
      totalSpent,
      savedAddresses: savedAddresses || 0,
      wishlistItems: wishlistItems || 0,
      pendingOrders: pendingOrders || 0,
    })
  } catch (error) {
    console.error("❌ Error en GET /api/account/stats:", error)

    return NextResponse.json(
      {
        error: "Error al obtener estadísticas",
        details: process.env.NODE_ENV === "development" ? String(error) : undefined
      },
      { status: 500 }
    )
  }
}
