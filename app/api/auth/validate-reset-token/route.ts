// ====================================
// ARCHIVO DEPRECADO - MIGRADO A SUPABASE AUTH
// ====================================
//
// La validación de tokens de reset ahora es manejada automáticamente
// por Supabase Auth a través del callback.
//
// Flujo:
// 1. Usuario hace clic en el link del email
// 2. Supabase valida el token internamente
// 3. Redirige a /auth/callback con session válida
// 4. La página /restablecer-contrasena puede usar la sesión
//
// Ver: app/auth/callback/route.ts
//
// Fecha de migración: 2026-01-09
//

import { NextResponse } from "next/server"

export async function POST() {
  return NextResponse.json(
    {
      error: "Esta ruta ya no está en uso.",
      hint: "La validación de tokens es manejada automáticamente por Supabase Auth"
    },
    { status: 410 }
  )
}
