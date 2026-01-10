/**
 * Script para migrar usuarios de Neon a Supabase Auth
 *
 * IMPORTANTE: Este script requiere acceso a ambas bases de datos:
 * - Neon (fuente) - usando POSTGRES_URL de @vercel/postgres
 * - Supabase (destino) - usando SUPABASE_SERVICE_ROLE_KEY
 *
 * Ejecutar con: npx tsx scripts/migrate-users-to-supabase.ts
 *
 * NOTA: Las contraseñas bcrypt de Neon NO pueden migrarse directamente
 * a Supabase porque usa un formato diferente. Los usuarios deberán:
 * 1. Usar "Olvidé mi contraseña" para crear una nueva
 * 2. O registrarse nuevamente con Google OAuth
 */

import { createClient } from '@supabase/supabase-js'
import { sql } from '@vercel/postgres'

interface NeonUser {
  id: number
  name: string
  email: string
  email_verified: Date | null
  image: string | null
  password_hash: string | null
  created_at: Date
}

async function migrateUsers() {
  console.log('🚀 Iniciando migración de usuarios Neon → Supabase...\n')

  // Verificar variables de entorno
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !supabaseServiceKey) {
    console.error('❌ Faltan variables de entorno:')
    console.error('   - NEXT_PUBLIC_SUPABASE_URL')
    console.error('   - SUPABASE_SERVICE_ROLE_KEY')
    process.exit(1)
  }

  // Cliente Supabase con service role (admin)
  const supabase = createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  })

  try {
    // 1. Obtener usuarios de Neon
    console.log('📖 Leyendo usuarios de Neon...')
    const neonResult = await sql`
      SELECT id, name, email, email_verified, image, password_hash, created_at
      FROM users
      ORDER BY created_at ASC
    `

    const neonUsers = neonResult.rows as NeonUser[]
    console.log(`   Encontrados: ${neonUsers.length} usuarios\n`)

    if (neonUsers.length === 0) {
      console.log('✅ No hay usuarios para migrar.')
      return
    }

    let migrated = 0
    let skipped = 0
    let errors = 0

    // 2. Migrar cada usuario
    for (const neonUser of neonUsers) {
      console.log(`\n👤 Procesando: ${neonUser.email}`)

      try {
        // Verificar si ya existe en Supabase
        const { data: existingUsers } = await supabase.auth.admin.listUsers()
        const exists = existingUsers?.users?.some(u => u.email === neonUser.email)

        if (exists) {
          console.log(`   ⏭️  Ya existe en Supabase, saltando...`)
          skipped++
          continue
        }

        // Crear usuario en Supabase Auth
        // NOTA: La contraseña será temporal, el usuario debe resetearla
        const tempPassword = `Temp_${Date.now()}_${Math.random().toString(36).substring(7)}`

        const { data: authData, error: authError } = await supabase.auth.admin.createUser({
          email: neonUser.email,
          password: tempPassword,
          email_confirm: neonUser.email_verified !== null,
          user_metadata: {
            full_name: neonUser.name,
            avatar_url: neonUser.image,
            migrated_from_neon: true,
            neon_id: neonUser.id
          }
        })

        if (authError) {
          console.error(`   ❌ Error creando auth user: ${authError.message}`)
          errors++
          continue
        }

        // Crear perfil en tabla profiles
        const { error: profileError } = await supabase
          .from('profiles')
          .upsert({
            id: authData.user.id,
            full_name: neonUser.name,
            avatar_url: neonUser.image,
            role: 'customer',
            created_at: neonUser.created_at.toISOString(),
            updated_at: new Date().toISOString()
          })

        if (profileError) {
          console.error(`   ⚠️  Error creando profile: ${profileError.message}`)
        }

        console.log(`   ✅ Migrado con ID: ${authData.user.id}`)
        migrated++

      } catch (error) {
        console.error(`   ❌ Error: ${error}`)
        errors++
      }
    }

    // 3. Resumen
    console.log('\n' + '='.repeat(50))
    console.log('📊 RESUMEN DE MIGRACIÓN')
    console.log('='.repeat(50))
    console.log(`   Total procesados: ${neonUsers.length}`)
    console.log(`   ✅ Migrados: ${migrated}`)
    console.log(`   ⏭️  Saltados (ya existían): ${skipped}`)
    console.log(`   ❌ Errores: ${errors}`)
    console.log('')
    console.log('⚠️  IMPORTANTE:')
    console.log('   Los usuarios migrados deben usar "Olvidé mi contraseña"')
    console.log('   para crear una nueva contraseña en Supabase.')
    console.log('')

  } catch (error) {
    console.error('\n❌ Error fatal:', error)
    process.exit(1)
  }
}

// Ejecutar
migrateUsers()
