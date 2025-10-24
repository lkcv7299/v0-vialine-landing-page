import { sql } from "@vercel/postgres"
import { readFileSync } from "fs"

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

async function updateBlacklistTable() {
  try {
    console.log("🔄 Actualizando tabla session_blacklist...")

    // Borrar tabla anterior
    await sql`DROP TABLE IF EXISTS session_blacklist`
    console.log("✅ Tabla anterior eliminada")

    // Crear nueva tabla (más simple)
    await sql`
      CREATE TABLE session_blacklist (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL,
        blacklisted_at TIMESTAMP DEFAULT NOW()
      )
    `
    console.log("✅ Nueva tabla creada")

    // Índice para búsqueda rápida por user_id
    await sql`
      CREATE INDEX idx_blacklist_user_id 
      ON session_blacklist(user_id)
    `
    console.log("✅ Índice creado")

    console.log("")
    console.log("🎉 ¡Tabla actualizada!")
    console.log("")
    console.log("Nueva estructura:")
    console.log("✅ user_id (en lugar de jti)")
    console.log("✅ blacklisted_at")
    console.log("✅ Cierra TODAS las sesiones del usuario")

  } catch (error) {
    console.error("❌ Error:", error.message)
    process.exit(1)
  }
}

updateBlacklistTable()