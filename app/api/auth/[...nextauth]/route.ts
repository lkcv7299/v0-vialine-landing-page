// ====================================
// ARCHIVO DEPRECADO - MIGRADO A SUPABASE AUTH
// ====================================
//
// La autenticación ahora usa Supabase Auth.
// Las rutas de auth son manejadas por:
// - /api/auth/callback (Supabase OAuth callback)
// - Supabase JS Client directamente
//
// Ver: hooks/use-supabase-auth.ts
//
// Fecha de migración: 2026-01-09
//

import { NextResponse } from "next/server"

// Redirigir cualquier request a esta ruta obsoleta
export async function GET() {
  return NextResponse.redirect(new URL("/login", process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"))
}

export async function POST() {
  return NextResponse.json(
    { error: "Esta ruta ya no está en uso. Por favor usa Supabase Auth." },
    { status: 410 }
  )
}
