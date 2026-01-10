// ====================================
// ARCHIVO DEPRECADO - MIGRADO A SUPABASE AUTH
// ====================================
//
// La autenticación ahora usa Supabase Auth.
// Este archivo se mantiene solo por compatibilidad con posibles
// referencias pendientes en el código.
//
// La nueva autenticación está en:
// - lib/supabase/client.ts (cliente browser)
// - lib/supabase/server.ts (cliente server)
// - hooks/use-supabase-auth.ts (hook de React)
//
// Fecha de migración: 2026-01-09
//

// Export vacío para evitar errores de importación
export const auth = async () => null
export const signIn = async () => null
export const signOut = async () => null
export const handlers = {
  GET: async () => new Response("Deprecated - Use Supabase Auth", { status: 410 }),
  POST: async () => new Response("Deprecated - Use Supabase Auth", { status: 410 }),
}
