// ====================================
// ARCHIVO DEPRECADO - MIGRADO A SUPABASE AUTH
// ====================================
//
// El restablecimiento de contraseña ahora usa Supabase Auth directamente.
//
// Flujo actual:
// 1. Usuario solicita reset → /api/auth/forgot-password
// 2. Supabase genera link → Usuario hace clic
// 3. Callback maneja el token → /auth/callback
// 4. Página muestra form → /restablecer-contrasena
// 5. Frontend llama supabase.auth.updateUser({ password })
//
// Ver: hooks/use-supabase-auth.ts
//
// Fecha de migración: 2026-01-09
//

import { NextResponse } from "next/server"

export async function POST() {
  return NextResponse.json(
    {
      error: "Esta ruta ya no está en uso.",
      hint: "Usa supabase.auth.updateUser({ password }) desde el cliente después del callback de Supabase"
    },
    { status: 410 }
  )
}
