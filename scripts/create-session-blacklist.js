import { sql } from "@vercel/postgres"
import { readFileSync } from "fs"

// Cargar variables de entorno
function loadEnvLocal() {
  try {
    const envFile = readFileSync('.env.local', 'utf8')
    envFile.split('\n').forEach(line => {
      const match = line.match(/^([^=]+)=(.*)$/)
      if (match) {
        const key = match[1].trim()
        let value = match[2].trim()
        if (value.startsWith('"') && value.endsWith('"')) {
          value = value.slice(1, -1)
        }
        process.env[key] = value
      }
    })
  } catch (error) {
    console.error("Error loading .env.local:", error.message)
    process.exit(1)
  }
}

loadEnvLocal()

async function createBlacklistTable() {
  try {
    console.log("🔄 Creando tabla session_blacklist...")

    // Crear tabla
    await sql`
      CREATE TABLE IF NOT EXISTS session_blacklist (
        id SERIAL PRIMARY KEY,
        jti VARCHAR(255) UNIQUE NOT NULL,
        user_id INTEGER NOT NULL,
        blacklisted_at TIMESTAMP DEFAULT NOW(),
        expires_at TIMESTAMP NOT NULL
      )
    `

    console.log("✅ Tabla session_blacklist creada")

    // Crear índice para búsqueda rápida
    await sql`
      CREATE INDEX IF NOT EXISTS idx_blacklist_jti 
      ON session_blacklist(jti)
    `

    console.log("✅ Índice creado")

    // Crear índice para limpieza automática
    await sql`
      CREATE INDEX IF NOT EXISTS idx_blacklist_expires 
      ON session_blacklist(expires_at)
    `

    console.log("✅ Índices de optimización creados")
    console.log("")
    console.log("🎉 ¡Tabla session_blacklist lista!")
    console.log("")
    console.log("Esta tabla permite:")
    console.log("✅ Invalidar tokens JWT manualmente")
    console.log("✅ Logout funciona correctamente")
    console.log("✅ Seguridad mejorada")

  } catch (error) {
    console.error("❌ Error:", error.message)
    process.exit(1)
  }
}

createBlacklistTable()