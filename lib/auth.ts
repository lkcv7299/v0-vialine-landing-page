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
          console.error("Auth error:", error)
          return null
        }
      },
    }),

    // ===================================
    // PROVIDER 2: Google OAuth
    // ===================================
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  // ===================================
  // CALLBACKS
  // ===================================
  callbacks: {
    async signIn({ user, account }) {
      // Para OAuth (Google), crear/actualizar usuario
      if (account?.provider === "google") {
        try {
          // Verificar si usuario existe
          const existingUser = await sql`
            SELECT * FROM users 
            WHERE email = ${user.email}
            LIMIT 1
          `

          if (existingUser.rows.length === 0) {
            // Crear nuevo usuario
            const newUser = await sql`
              INSERT INTO users (name, email, email_verified, image)
              VALUES (${user.name}, ${user.email}, NOW(), ${user.image})
              RETURNING *
            `

            user.id = newUser.rows[0].id.toString()

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
          } else {
            user.id = existingUser.rows[0].id.toString()
          }

          return true
        } catch (error) {
          console.error("Google signIn error:", error)
          return false
        }
      }

      return true
    },

    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
      }
      return session
    },
  },

  // ===================================
  // PAGES CUSTOMIZADAS - ✅ FIX: URLs RELATIVAS
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
  },

  // ===================================
  // SECRET (Para producción)
  // ===================================
  secret: process.env.NEXTAUTH_SECRET,

  // ===================================
  // ✅ FIX: CONFIGURACIÓN PARA CODESPACES
  // ===================================
  trustHost: true, // Confiar en el host del request
})