"use client"

/**
 * SessionProvider - Supabase Auth Provider
 *
 * Este componente ahora es solo un passthrough ya que Supabase
 * maneja las sesiones automáticamente a través de cookies.
 * Lo mantenemos para compatibilidad y por si necesitamos
 * agregar lógica de contexto en el futuro.
 */
export default function SessionProvider({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
