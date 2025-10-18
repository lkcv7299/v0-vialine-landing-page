import { readFileSync } from 'fs'
import { join } from 'path'
import { sql } from '@vercel/postgres'

// 🔧 Leer .env.local manualmente (SIN dependencias)
function loadEnvLocal() {
  try {
    const envPath = join(process.cwd(), '.env.local')
    const envFile = readFileSync(envPath, 'utf8')
    
    // Parsear línea por línea
    envFile.split('\n').forEach(line => {
      line = line.trim()
      // Ignorar comentarios y líneas vacías
      if (!line || line.startsWith('#')) return
      
      // Parsear KEY=VALUE
      const match = line.match(/^([^=]+)=(.*)$/)
      if (match) {
        const key = match[1].trim()
        let value = match[2].trim()
        
        // Remover comillas si existen
        if (value.startsWith('"') && value.endsWith('"')) {
          value = value.slice(1, -1)
        }
        
        // Solo establecer si no existe ya
        if (!process.env[key]) {
          process.env[key] = value
        }
      }
    })
    
    console.log('✅ Variables de entorno cargadas desde .env.local')
  } catch (error) {
    console.error('❌ Error leyendo .env.local:', error)
    process.exit(1)
  }
}

// Cargar variables ANTES de todo
loadEnvLocal()

async function runMigration() {
  console.log('🔄 Ejecutando migración...')
  
  try {
    // Verificar que tenemos la URL de la base de datos
    if (!process.env.POSTGRES_URL && !process.env.DATABASE_URL) {
      throw new Error('No se encontró POSTGRES_URL ni DATABASE_URL en las variables de entorno')
    }
    
    console.log('✅ Conexión a base de datos OK')
    
    // Agregar columna payment_id si no existe
    console.log('📝 Agregando columna payment_id...')
    await sql`
      ALTER TABLE orders 
      ADD COLUMN IF NOT EXISTS payment_id VARCHAR(255)
    `
    console.log('✅ Columna payment_id agregada')
    
    // Agregar columna payment_method si no existe
    console.log('📝 Agregando columna payment_method...')
    await sql`
      ALTER TABLE orders 
      ADD COLUMN IF NOT EXISTS payment_method VARCHAR(50)
    `
    console.log('✅ Columna payment_method agregada')
    
    // Agregar columna payment_status si no existe
    console.log('📝 Agregando columna payment_status...')
    await sql`
      ALTER TABLE orders 
      ADD COLUMN IF NOT EXISTS payment_status VARCHAR(50) DEFAULT 'pending'
    `
    console.log('✅ Columna payment_status agregada')
    
    console.log('🎉 ¡Migración completada exitosamente!')
    process.exit(0)
  } catch (error) {
    console.error('❌ Error en migración:', error)
    process.exit(1)
  }
}

// Ejecutar la migración
runMigration()