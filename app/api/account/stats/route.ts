import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { sql } from "@vercel/postgres"

/**
 * GET /api/account/stats
 * 
 * Obtiene estadísticas del usuario autenticado:
 * - Número de órdenes totales
 * - Número de direcciones guardadas
 * 
 * Wishlist se cuenta del lado del cliente (localStorage)
 * 
 * @returns {object} { success: true, stats: { orders: number, addresses: number } }
 */
export async function GET() {
  try {
    // ====================================
    // PASO 1: VALIDAR SESIÓN
    // ====================================
    const session = await auth()

    if (!session || !session.user?.email) {
      return NextResponse.json(
        { error: "No autenticado" },
        { status: 401 }
      )
    }

    // ====================================
    // PASO 2: OBTENER USER_ID
    // ====================================
    const userResult = await sql`
      SELECT id FROM users 
      WHERE email = ${session.user.email}
      LIMIT 1
    `

    if (userResult.rows.length === 0) {
      return NextResponse.json(
        { error: "Usuario no encontrado" },
        { status: 404 }
      )
    }

    const userId = userResult.rows[0].id

    // ====================================
    // PASO 3: CONTAR ÓRDENES DEL USUARIO
    // ====================================
    const ordersResult = await sql`
      SELECT COUNT(*) as total
      FROM orders
      WHERE user_id = ${userId}
    `

    const ordersCount = parseInt(ordersResult.rows[0].total) || 0

    // ====================================
    // PASO 4: CONTAR DIRECCIONES DEL USUARIO
    // ====================================
    const addressesResult = await sql`
      SELECT COUNT(*) as total
      FROM user_addresses
      WHERE user_id = ${userId}
    `

    const addressesCount = parseInt(addressesResult.rows[0].total) || 0

    // ====================================
    // PASO 5: RETORNAR ESTADÍSTICAS
    // ====================================
    return NextResponse.json({
      success: true,
      stats: {
        orders: ordersCount,
        addresses: addressesCount,
        // wishlist se cuenta del lado del cliente (WishlistContext)
      },
    })
  } catch (error) {
    console.error("❌ Error en GET /api/account/stats:", error)
    
    return NextResponse.json(
      { 
        error: "Error al obtener estadísticas",
        // Solo mostrar detalles en desarrollo
        details: process.env.NODE_ENV === "development" ? String(error) : undefined
      },
      { status: 500 }
    )
  }
}