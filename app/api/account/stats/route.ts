import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { sql } from "@vercel/postgres"

/**
 * GET /api/account/stats
 * Retorna estadísticas del usuario: pedidos, favoritos, direcciones
 */
export async function GET(request: NextRequest) {
  try {
    // Verificar autenticación
    const session = await auth()
    
    if (!session || !session.user?.email) {
      return NextResponse.json(
        { error: "No autorizado" },
        { status: 401 }
      )
    }

    const userEmail = session.user.email

    // Obtener user_id desde la tabla users
    const userResult = await sql`
      SELECT id FROM users WHERE email = ${userEmail} LIMIT 1
    `

    if (userResult.rows.length === 0) {
      return NextResponse.json(
        { error: "Usuario no encontrado" },
        { status: 404 }
      )
    }

    const userId = userResult.rows[0].id

    // Contar pedidos del usuario
    const ordersResult = await sql`
      SELECT COUNT(*) as count 
      FROM orders 
      WHERE customer_email = ${userEmail}
    `
    const ordersCount = parseInt(ordersResult.rows[0].count) || 0

    // Contar direcciones del usuario
    const addressesResult = await sql`
      SELECT COUNT(*) as count 
      FROM user_addresses 
      WHERE user_id = ${userId}
    `
    const addressesCount = parseInt(addressesResult.rows[0].count) || 0

    // Para wishlist: usamos localStorage del cliente
    // No se cuenta en el backend, se cuenta en el cliente

    return NextResponse.json({
      success: true,
      stats: {
        orders: ordersCount,
        addresses: addressesCount,
        // wishlist se cuenta en el cliente con localStorage
      }
    })

  } catch (error) {
    console.error("Error en /api/account/stats:", error)
    return NextResponse.json(
      { error: "Error al obtener estadísticas" },
      { status: 500 }
    )
  }
}