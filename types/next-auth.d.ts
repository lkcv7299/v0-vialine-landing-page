import { DefaultSession } from "next-auth"

// ====================================
// EXTENSIÓN DE TIPOS NEXTAUTH
// ====================================

/**
 * Extender el módulo next-auth para agregar campos personalizados
 * 
 * Esto permite que TypeScript reconozca:
 * - session.user.id
 * - user.id en callbacks
 * - token.id en JWT
 */

declare module "next-auth" {
  /**
   * ✅ Extender User interface
   * Se usa en:
   * - authorize() callback del Credentials provider
   * - signIn() callback
   */
  interface User {
    id: string
  }

  /**
   * ✅ Extender Session interface
   * Se usa en:
   * - useSession() hook
   * - auth() function en Server Components
   * - getServerSession()
   */
  interface Session {
    user: {
      id: string
    } & DefaultSession["user"]
  }
}

/**
 * ✅ Extender JWT interface
 * Se usa en:
 * - jwt() callback
 * - session() callback
 */
declare module "@auth/core/jwt" {
  interface JWT {
    id: string
  }
}