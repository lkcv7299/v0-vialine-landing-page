import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import Google from "next-auth/providers/google"
import { sql } from "@vercel/postgres"

// ✅ OPTIMIZATION: Dynamic import to avoid Edge Runtime warnings
// bcryptjs uses Node.js APIs that aren't available in Edge Runtime
// By lazy loading it, middleware.ts won't trigger runtime errors
//
// ⚠️ NOTE: Build warnings about bcryptjs/Edge Runtime are EXPECTED and SAFE
// These warnings appear because Next.js analyzes imports at build time,
// but the dynamic imports prevent actual runtime issues in Edge Runtime
async function compareBcrypt(password: string, hash: string): Promise<boolean> {
  const bcrypt = await import("bcryptjs")
  return bcrypt.default.compare(password, hash)
}

async function hashBcrypt(password: string): Promise<string> {
  const bcrypt = await import("bcryptjs")
  return bcrypt.default.hash(password, 10)
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    // ===================================
    // PROVIDER 1: Email/Password
    // ===================================
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        try {
          // Buscar usuario en DB
          const result = await sql`
            SELECT * FROM users 
            WHERE email = ${credentials.email as string}
            LIMIT 1
          `

          const user = result.rows[0]

          if (!user || !user.password_hash) {
            return null
          }

          // ✅ FIXED: Use dynamic import to avoid Edge Runtime warnings
          const isValid = await compareBcrypt(
            credentials.password as string,
            user.password_hash
          )

          if (!isValid) {
            return null
          }

          // Retornar usuario
          return {
            id: user.id.toString(),
            email: user.email,
            name: user.name,
            image: user.image,
          }
        } catch (error) {
          console.error("Auth error:", error)
          return null
        }
      },
    }),

    // ===================================
    // PROVIDER 2: Google OAuth (CONDICIONAL)
    // ===================================
    ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
      ? [
          Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          }),
        ]
      : []),
  ],

  // ===================================
  // CALLBACKS
  // ===================================
  callbacks: {
    async signIn({ user, account }) {
      // Para OAuth (Google), crear/actualizar usuario
      if (account?.provider === "google") {
        try {
          console.log("🔵 [OAuth] Iniciando flujo Google OAuth para:", user.email)

          // Verificar si usuario existe
          const existingUser = await sql`
            SELECT * FROM users
            WHERE email = ${user.email}
            LIMIT 1
          `
          console.log("🔍 [OAuth] Usuario existente encontrado:", existingUser.rows.length > 0)

          if (existingUser.rows.length === 0) {
            console.log("➕ [OAuth] Creando nuevo usuario...")
            // Crear nuevo usuario
            const newUser = await sql`
              INSERT INTO users (name, email, email_verified, image)
              VALUES (${user.name}, ${user.email}, NOW(), ${user.image})
              RETURNING *
            `
            console.log("✅ [OAuth] Usuario creado con ID:", newUser.rows[0].id)

            user.id = newUser.rows[0].id.toString()

            console.log("➕ [OAuth] Creando registro en accounts...")
            // Crear account record
            await sql`
              INSERT INTO accounts (
                user_id, type, provider, provider_account_id,
                access_token, expires_at, token_type, scope, id_token
              )
              VALUES (
                ${newUser.rows[0].id},
                'oauth',
                ${account.provider},
                ${account.providerAccountId},
                ${account.access_token || null},
                ${account.expires_at || null},
                ${account.token_type || null},
                ${account.scope || null},
                ${account.id_token || null}
              )
            `
            console.log("✅ [OAuth] Account record creado")
          } else {
            console.log("🔄 [OAuth] Usuario existente, usando ID:", existingUser.rows[0].id)
            user.id = existingUser.rows[0].id.toString()

            // Verificar si ya existe el account record
            console.log("🔍 [OAuth] Verificando account record...")
            const existingAccount = await sql`
              SELECT * FROM accounts
              WHERE user_id = ${existingUser.rows[0].id}
              AND provider = ${account.provider}
              LIMIT 1
            `

            if (existingAccount.rows.length === 0) {
              console.log("➕ [OAuth] Account record no existe, creándolo...")
              await sql`
                INSERT INTO accounts (
                  user_id, type, provider, provider_account_id,
                  access_token, expires_at, token_type, scope, id_token
                )
                VALUES (
                  ${existingUser.rows[0].id},
                  'oauth',
                  ${account.provider},
                  ${account.providerAccountId},
                  ${account.access_token || null},
                  ${account.expires_at || null},
                  ${account.token_type || null},
                  ${account.scope || null},
                  ${account.id_token || null}
                )
              `
              console.log("✅ [OAuth] Account record creado para usuario existente")
            } else {
              console.log("✅ [OAuth] Account record ya existe")
            }
          }

          console.log("✅ [OAuth] Flujo completado exitosamente")

          // ✅ LIMPIAR blacklist DESPUÉS de crear/verificar usuario
          // Esto permite nueva sesión después de logout
          if (user?.id) {
            try {
              await sql`
                DELETE FROM session_blacklist
                WHERE user_id = ${parseInt(user.id)}
              `
              console.log("✅ [OAuth] Blacklist limpiada para usuario:", user.id)
            } catch (error) {
              console.error("⚠️ [OAuth] Error limpiando blacklist:", error)
              // No bloqueamos el login si falla la limpieza
            }
          }

          return true
        } catch (error) {
          console.error("❌ [OAuth] Error en signIn callback:", error)
          console.error("❌ [OAuth] Detalles del error:", {
            message: error instanceof Error ? error.message : 'Unknown error',
            stack: error instanceof Error ? error.stack : undefined,
            user: user.email,
            provider: account?.provider
          })
          return false
        }
      }

      // ✅ Para login con Credentials, limpiar blacklist
      // En OAuth el user.id ya está asignado en el bloque anterior
      if (user?.id && account?.provider === "credentials") {
        try {
          await sql`
            DELETE FROM session_blacklist
            WHERE user_id = ${parseInt(user.id)}
          `
          console.log("✅ Blacklist limpiada para usuario credentials:", user.id)
        } catch (error) {
          console.error("Error limpiando blacklist:", error)
        }
      }

      return true
    },

    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      
      // ✅ La verificación de blacklist ahora está en middleware
      // Esto es más confiable porque se ejecuta en CADA request
      
      return token
    },

    async session({ session, token }) {
      if (token.id && session.user) {
        session.user.id = token.id as string
      }
      return session
    },
  },

  // ===================================
  // PAGES CUSTOMIZADAS
  // ===================================
  pages: {
    signIn: "/login",
    error: "/login",
  },

  // ===================================
  // SESSION CONFIGURATION - ✅ JWT (requerido por Credentials)
  // ===================================
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24 horas
  },

  // ===================================
  // JWT CONFIGURATION - ✅ Generar JTI para blacklist
  // ===================================
  jwt: {
    maxAge: 24 * 60 * 60, // 24 horas
  },

  // ===================================
  // COOKIES CONFIGURATION
  // ===================================
  cookies: {
    sessionToken: {
      name: `next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === "production",
      },
    },
  },

  // ===================================
  // EVENTOS - Logging
  // ===================================
  events: {
    async signOut(message: any) {
      console.log("✅ SignOut event triggered")
      
      // ✅ Agregar USER_ID a blacklist (no JTI)
      const token = message.token
      if (token?.id) {
        try {
          await sql`
            INSERT INTO session_blacklist (user_id, blacklisted_at)
            VALUES (
              ${parseInt(token.id)},
              NOW()
            )
          `
          console.log("🚫 Usuario agregado a blacklist:", token.id)
        } catch (error) {
          console.error("Error adding to blacklist:", error)
        }
      }
    },
  },

  // ===================================
  // SECRET
  // ===================================
  secret: process.env.NEXTAUTH_SECRET,

  // ===================================
  // TRUST HOST
  // ===================================
  trustHost: true,

  // ===================================
  // DEBUG MODE
  // ===================================
  debug: process.env.NODE_ENV === "development",
})