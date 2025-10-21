import { auth } from "@/lib/auth"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Función helper para convertir a slug (del middleware original)
const toSlug = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")

export default auth((req) => {
  const { pathname, searchParams } = req.nextUrl
  const isLoggedIn = !!req.auth

  // ====================================
  // ✅ FIX: EXCLUIR RUTAS DE NEXTAUTH
  // ====================================
  // NextAuth.js maneja estas rutas internamente
  // No debemos procesarlas en el middleware
  if (pathname.startsWith("/api/auth")) {
    return NextResponse.next()
  }

  // ====================================
  // FUNCIONALIDAD 1: Redirects de productos
  // ====================================
  if (pathname === "/productos") {
    const genero = toSlug(searchParams.get("genero") ?? "")
    const categoria = toSlug(searchParams.get("categoria") ?? "")
    if (genero && categoria) {
      const url = req.nextUrl.clone()
      url.pathname = `/shop/${genero}/${categoria}`
      url.search = ""
      return NextResponse.redirect(url, 308)
    }
  }

  // ====================================
  // FUNCIONALIDAD 2: Protección de rutas con Auth
  // ====================================
  
  // Rutas protegidas que requieren autenticación
  const protectedRoutes = ["/account", "/account/pedidos", "/account/direcciones"]
  const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route))

  // Si la ruta es protegida y el usuario NO está logueado → redirect a login
  if (isProtectedRoute && !isLoggedIn) {
    const loginUrl = new URL("/login", req.url)
    // Opcional: guardar la URL original para redirect después del login
    loginUrl.searchParams.set("callbackUrl", pathname)
    return NextResponse.redirect(loginUrl)
  }

  // Si el usuario está logueado y trata de ir a /login o /registro → redirect a account
  if (isLoggedIn && (pathname === "/login" || pathname === "/registro")) {
    return NextResponse.redirect(new URL("/account", req.url))
  }

  // Continuar normalmente
  return NextResponse.next()
})

// ====================================
// ✅ FIX: MATCHER MEJORADO
// ====================================
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api/auth (NextAuth.js routes - EXCLUIDO EXPLÍCITAMENTE)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, etc)
     */
    "/((?!api/auth|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
}