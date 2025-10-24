import { auth } from "@/lib/auth"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { sql } from "@vercel/postgres"
import { decode } from "next-auth/jwt"

export default async function middleware(req: NextRequest) {
  // ===================================
  // PASO 1: Verificar si el token está blacklisted
  // ===================================
  const token = req.cookies.get("next-auth.session-token")?.value

  if (token) {
    try {
      // Decodificar el JWT para obtener el jti
      const decoded = await decode({
        token,
        secret: process.env.NEXTAUTH_SECRET!,
        salt: "authjs.session-token", // ✅ AGREGADO: salt requerido
      })

      if (decoded?.jti) {
        // Verificar si está en la blacklist
        const result = await sql`
          SELECT * FROM session_blacklist 
          WHERE jti = ${decoded.jti}
          AND expires_at > NOW()
          LIMIT 1
        `

        if (result.rows.length > 0) {
          console.log("🚫 Token blacklisted detectado en middleware:", decoded.jti)
          
          // Token está blacklisted - borrar cookie y redirigir
          const response = NextResponse.redirect(new URL("/login", req.url))
          
          // Borrar TODAS las cookies de next-auth
          response.cookies.delete("next-auth.session-token")
          response.cookies.delete("next-auth.csrf-token")
          response.cookies.delete("next-auth.callback-url")
          
          return response
        }
      }
    } catch (error) {
      console.error("Error verificando blacklist en middleware:", error)
    }
  }

  // ===================================
  // PASO 2: Verificar autenticación normal
  // ===================================
  const session = await auth()

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
    /*
     * Match all request paths except:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public folder)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
}