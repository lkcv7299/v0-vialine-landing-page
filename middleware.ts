import { auth } from "@/lib/auth"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { sql } from "@vercel/postgres"

// ✅ OPTIMIZATION: In-memory cache para blacklist checks
// Evita queries SQL en cada request
const blacklistCache = new Map<string, { isBlacklisted: boolean; timestamp: number }>()
const CACHE_TTL_MS = 60000 // 60 segundos

function isBlacklistedCached(userId: string): boolean | null {
  const cached = blacklistCache.get(userId)
  if (!cached) return null

  const isExpired = Date.now() - cached.timestamp > CACHE_TTL_MS
  if (isExpired) {
    blacklistCache.delete(userId)
    return null
  }

  return cached.isBlacklisted
}

function cacheBlacklistStatus(userId: string, isBlacklisted: boolean) {
  blacklistCache.set(userId, {
    isBlacklisted,
    timestamp: Date.now(),
  })
}

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
      // ✅ OPTIMIZATION: Check cache first
      const cachedStatus = isBlacklistedCached(session.user.id)

      let isBlacklisted: boolean

      if (cachedStatus !== null) {
        // Cache hit - no SQL query needed
        isBlacklisted = cachedStatus
      } else {
        // Cache miss - query database
        const result = await sql`
          SELECT * FROM session_blacklist
          WHERE user_id = ${parseInt(session.user.id)}
          ORDER BY blacklisted_at DESC
          LIMIT 1
        `

        isBlacklisted = result.rows.length > 0

        // Store in cache
        cacheBlacklistStatus(session.user.id, isBlacklisted)
      }

      if (isBlacklisted) {
        // ✅ FIXED: Only log in development
        if (process.env.NODE_ENV === 'development') {
          console.log("🚫 Usuario blacklisted detectado:", session.user.id)
        }

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
