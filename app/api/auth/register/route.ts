// ====================================
// ARCHIVO DEPRECADO - MIGRADO A SUPABASE AUTH
// ====================================
//
// El registro de usuarios ahora usa Supabase Auth directamente.
// Ver: hooks/use-supabase-auth.ts → signUp()
//
// El cliente debe usar:
//   const { signUp } = useSupabaseAuth()
//   await signUp(email, password, name)
//
// Fecha de migración: 2026-01-09
//

import { NextResponse } from "next/server"

export async function POST() {
  return NextResponse.json(
    {
      error: "Esta ruta ya no está en uso. Por favor usa Supabase Auth para registro.",
      hint: "Usa supabase.auth.signUp() desde el cliente"
    },
    { status: 410 } // 410 Gone
  )
}
