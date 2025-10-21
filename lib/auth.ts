import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import Google from "next-auth/providers/google"
import { sql } from "@vercel/postgres"
import bcrypt from "bcryptjs"

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

          // Verificar password
          const isValid = await bcrypt.compare(
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
          console.error("❌ Auth error:", error)
          return null
        }
      },
    }),

    // ===================================
    // PROVIDER 2: Google OAuth (CONDICIONAL)
    // ✅ FIX: Solo habilitar si existen credenciales
    // ===================================
    ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
      ? [
          Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            authorization: {
              params: {
                prompt: "consent",
                access_type: "offline",
                response_type: "code",
              },
            },
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
          // ✅ FIX: Usar UPSERT para evitar race conditions
          const userResult = await sql`
            INSERT INTO users (
              name, 
              email, 
              email_verified, 
              image, 
              created_at, 
              updated_at
            )
            VALUES (
              ${user.name || "Usuario Google"},
              ${user.email},
              NOW(),
              ${user.image || null},
              NOW(),
              NOW()
            )
            ON CONFLICT (email) 
            DO UPDATE SET
              name = COALESCE(EXCLUDED.name, users.name),
              image = COALESCE(EXCLUDED.image, users.image),
              email_verified = EXCLUDED.email_verified,
              updated_at = NOW()
            RETURNING id
          `

          const userId = userResult.rows[0].id
          user.id = userId.toString()

          // ✅ FIX: UPSERT en accounts table también
          // ✅ FIX: Incluir refresh_token
          await sql`
            INSERT INTO accounts (
              user_id,
              type,
              provider,
              provider_account_id,
              access_token,
              expires_at,
              token_type,
              scope,
              id_token,
              refresh_token
            )
            VALUES (
              ${userId},
              'oauth',
              ${account.provider},
              ${account.providerAccountId},
              ${account.access_token || null},
              ${account.expires_at || null},
              ${account.token_type || null},
              ${account.scope || null},
              ${account.id_token || null},
              ${account.refresh_token || null}
            )
            ON CONFLICT (provider, provider_account_id)
            DO UPDATE SET
              access_token = EXCLUDED.access_token,
              expires_at = EXCLUDED.expires_at,
              token_type = EXCLUDED.token_type,
              scope = EXCLUDED.scope,
              id_token = EXCLUDED.id_token,
              refresh_token = EXCLUDED.refresh_token,
              updated_at = NOW()
          `

          return true
        } catch (error) {
          console.error("❌ Google signIn error:", error)
          return false
        }
      }

      // Para credentials provider, continuar normalmente
      return true
    },

    async jwt({ token, user }) {
      // En primer login, agregar id al token
      if (user) {
        token.id = user.id
      }
      return token
    },

    async session({ session, token }) {
      // Agregar id del usuario a la session
      if (session.user && token.id) {
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
  // SESSION STRATEGY
  // ===================================
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 días
  },

  // ===================================
  // SECRET (Para producción)
  // ===================================
  secret: process.env.NEXTAUTH_SECRET,

  // ===================================
  // ✅ CONFIGURACIÓN PARA DESARROLLO Y PRODUCCIÓN
  // ===================================
  trustHost: true,

  // ===================================
  // DEBUG (solo en desarrollo)
  // ===================================
  debug: process.env.NODE_ENV === "development",
})