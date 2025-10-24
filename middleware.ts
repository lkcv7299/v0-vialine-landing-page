import { auth } from "@/lib/auth"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { sql } from "@vercel/postgres"

export default async function middleware(req: NextRequest) {
  // ===================================
  // PASO 1: Obtener sesión
  // ===================================
  const session = await auth()

  // ===================================
  // PASO 2: Si hay sesión, verificar blacklist
  // ===================================
  if (session?.user?.id) {
    try {
      const result = await sql`
        SELECT * FROM session_blacklist 
        WHERE user_id = ${parseInt(session.user.id)}
        ORDER BY blacklisted_at DESC
        LIMIT 1
      `

      if (result.rows.length > 0) {
        console.log("🚫 Usuario blacklisted detectado:", session.user.id)
        
        // Usuario está blacklisted - borrar cookie y redirigir
        const response = NextResponse.redirect(new URL("/login", req.url))
        
        // Borrar TODAS las cookies de next-auth
        response.cookies.delete("next-auth.session-token")
        response.cookies.delete("__Secure-next-auth.session-token")
        response.cookies.delete("next-auth.csrf-token")
        response.cookies.delete("__Secure-next-auth.csrf-token")
        response.cookies.delete("next-auth.callback-url")
        response.cookies.delete("__Secure-next-auth.callback-url")
        
        return response
      }
    } catch (error) {
      console.error("Error verificando blacklist:", error)
    }
  }

  // ===================================
  // PASO 3: Lógica normal de autenticación
  // ===================================
  const isAuthPage =
    req.nextUrl.pathname === "/login" ||
    req.nextUrl.pathname === "/registro"

  const isProtectedPage =
    req.nextUrl.pathname.startsWith("/account") ||
    req.nextUrl.pathname === "/checkout"

  // Si está en página de auth y tiene sesión, redirigir a home
  if (isAuthPage && session) {
    return NextResponse.redirect(new URL("/", req.url))
  }

  // Si está en página protegida y NO tiene sesión, redirigir a login
  if (isProtectedPage && !session) {
    return NextResponse.redirect(new URL("/login", req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
}