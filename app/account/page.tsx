"use client"

import { useSession, signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { User, Package, MapPin, Heart, LogOut, Mail, Calendar, Loader2 } from "lucide-react"
import { useState, useEffect } from "react"
import { useWishlist } from "@/components/providers/WishlistContext"

export default function AccountDashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const { items: wishlistItems } = useWishlist()
  
  const [stats, setStats] = useState({
    orders: 0,
    addresses: 0,
    wishlist: 0
  })
  const [loading, setLoading] = useState(true)

  // Redirect si no está autenticado
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login")
    }
  }, [status, router])

  // Cargar estadísticas reales
  useEffect(() => {
    if (status === "authenticated") {
      fetchStats()
    }
  }, [status])

  // Actualizar contador de wishlist cuando cambia
  useEffect(() => {
    setStats(prev => ({ ...prev, wishlist: wishlistItems.length }))
  }, [wishlistItems])

  const fetchStats = async () => {
    try {
      const response = await fetch("/api/account/stats")
      if (response.ok) {
        const data = await response.json()
        setStats(prev => ({
          orders: data.stats.orders,
          addresses: data.stats.addresses,
          wishlist: prev.wishlist
        }))
      }
    } catch (error) {
      console.error("Error al cargar estadísticas:", error)
    } finally {
      setLoading(false)
    }
  }

  // Loading state
  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-rose-600" />
      </div>
    )
  }

  // ✅ FIX DEFINITIVO: Borrar cookies manualmente + signOut
  const handleSignOut = async () => {
    try {
      // PASO 1: Borrar TODAS las cookies de next-auth manualmente
      const cookiesToDelete = [
        'next-auth.session-token',
        '__Secure-next-auth.session-token',
        'next-auth.csrf-token',
        '__Host-next-auth.csrf-token',
        'next-auth.callback-url',
        '__Secure-next-auth.callback-url'
      ]

      cookiesToDelete.forEach(cookieName => {
        // Borrar en todos los paths posibles
        document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
        document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${window.location.hostname};`
      })

      // PASO 2: Llamar a signOut de NextAuth
      await signOut({ 
        redirect: false  // No redirect automático
      })

      // PASO 3: Limpiar localStorage/sessionStorage
      if (typeof window !== 'undefined') {
        sessionStorage.clear()
      }

      // PASO 4: Forzar redirect con window.location (hard navigation)
      window.location.href = "/"
      
    } catch (error) {
      console.error("Error en signOut:", error)
      // Fallback: forzar redirect de todas formas
      window.location.href = "/"
    }
  }

  if (status === "unauthenticated") {
    return null
  }

  return (
    <div className="min-h-screen bg-neutral-50 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-neutral-900 mb-2">Mi Cuenta</h1>
          <p className="text-neutral-600">Gestiona tu información y pedidos</p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl border border-neutral-200 p-6">
              {/* User Info */}
              <div className="mb-6">
                <div className="w-20 h-20 bg-rose-100 rounded-full flex items-center justify-center mb-4">
                  <User className="w-10 h-10 text-rose-600" />
                </div>
                <h2 className="text-lg font-semibold text-neutral-900 mb-1">
                  {session?.user?.name || "Usuario"}
                </h2>
                <p className="text-sm text-neutral-600 flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  {session?.user?.email}
                </p>
              </div>

              {/* Navigation */}
              <nav className="space-y-1 mb-6">
                <Link
                  href="/account"
                  className="flex items-center gap-3 px-4 py-3 rounded-lg bg-rose-50 text-rose-600 font-medium"
                >
                  <User className="w-5 h-5" />
                  Inicio
                </Link>
                <Link
                  href="/account/pedidos"
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-neutral-700 hover:bg-neutral-50 transition"
                >
                  <Package className="w-5 h-5" />
                  Mis pedidos
                </Link>
                <Link
                  href="/account/direcciones"
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-neutral-700 hover:bg-neutral-50 transition"
                >
                  <MapPin className="w-5 h-5" />
                  Direcciones
                </Link>
                <Link
                  href="/wishlist"
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-neutral-700 hover:bg-neutral-50 transition"
                >
                  <Heart className="w-5 h-5" />
                  Lista de deseos
                </Link>
              </nav>

              {/* Logout */}
              <button
                onClick={handleSignOut}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-neutral-700 hover:bg-neutral-50 transition border-t border-neutral-200 pt-4"
              >
                <LogOut className="w-5 h-5" />
                Cerrar sesión
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Welcome Card */}
            <div className="bg-gradient-to-br from-rose-600 to-rose-700 rounded-xl p-8 text-white">
              <h2 className="text-2xl font-bold mb-2">
                ¡Hola, {session?.user?.name?.split(" ")[0] || "Usuario"}!
              </h2>
              <p className="text-rose-100 mb-4">
                Estamos felices de tenerte aquí. Explora nuestras últimas colecciones de activewear.
              </p>
              <Link
                href="/mujer"
                className="inline-block bg-white text-rose-600 px-6 py-3 rounded-lg font-medium hover:bg-rose-50 transition"
              >
                Ver productos
              </Link>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-4">
              {/* Orders */}
              <div className="bg-white rounded-xl border border-neutral-200 p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center">
                    <Package className="w-6 h-6 text-rose-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-neutral-900">{stats.orders}</p>
                    <p className="text-sm text-neutral-600">Pedidos</p>
                  </div>
                </div>
              </div>

              {/* Favorites */}
              <div className="bg-white rounded-xl border border-neutral-200 p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center">
                    <Heart className="w-6 h-6 text-rose-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-neutral-900">{stats.wishlist}</p>
                    <p className="text-sm text-neutral-600">Favoritos</p>
                  </div>
                </div>
              </div>

              {/* Addresses */}
              <div className="bg-white rounded-xl border border-neutral-200 p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-rose-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-neutral-900">{stats.addresses}</p>
                    <p className="text-sm text-neutral-600">Direcciones</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Account Info */}
            <div className="bg-white rounded-xl border border-neutral-200 p-6">
              <h3 className="text-lg font-semibold text-neutral-900 mb-4">
                Información de la cuenta
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-neutral-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-neutral-600 mb-1">Email</p>
                    <p className="font-medium text-neutral-900">{session?.user?.email}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-neutral-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-neutral-600 mb-1">Miembro desde</p>
                    <p className="font-medium text-neutral-900">24 de octubre de 2025</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}