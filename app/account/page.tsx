"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import AccountSidebar from "@/components/AccountSidebar"
import { Package, MapPin, Heart, User, TrendingUp } from "lucide-react"

interface AccountStats {
  totalOrders: number
  totalSpent: number
  savedAddresses: number
  wishlistItems: number
  pendingOrders: number
}

export default function AccountPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [stats, setStats] = useState<AccountStats>({
    totalOrders: 0,
    totalSpent: 0,
    savedAddresses: 0,
    wishlistItems: 0,
    pendingOrders: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login")
    }
  }, [status, router])

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("/api/account/stats")
        if (response.ok) {
          const data = await response.json()
          setStats(data)
        }
      } catch (error) {
        console.error("Error fetching stats:", error)
      } finally {
        setLoading(false)
      }
    }

    if (session?.user?.id) {
      fetchStats()
    }
  }, [session])

  // ✅ Ya no necesitamos handleSignOut aquí
  // AccountSidebar maneja el logout por sí mismo

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-rose-600"></div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  const userName = session.user?.name || "Usuario"

  const quickStats = [
    {
      icon: Package,
      label: "Pedidos pendientes",
      value: stats.pendingOrders || 0,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      icon: TrendingUp,
      label: "Total gastado",
      value: `S/ ${(stats.totalSpent || 0).toFixed(2)}`,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      icon: MapPin,
      label: "Direcciones guardadas",
      value: stats.savedAddresses || 0,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      icon: Heart,
      label: "Productos favoritos",
      value: stats.wishlistItems || 0,
      color: "text-rose-600",
      bgColor: "bg-rose-50",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Navigation - Sticky at top */}
      <AccountSidebar />

      <div className="py-8 lg:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header - Hidden on mobile to save space */}
          <div className="mb-8 hidden lg:block">
            <h1 className="text-3xl font-bold text-gray-900">Mi Cuenta</h1>
            <p className="mt-2 text-gray-600">
              Bienvenida de vuelta, {userName}
            </p>
          </div>

          {/* Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Desktop Sidebar - Hidden on mobile (handled by AccountSidebar) */}
            <div className="lg:col-span-1">
              <AccountSidebar />
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3 space-y-6">
            {/* Welcome Card */}
            <div className="bg-gradient-to-r from-rose-500 to-pink-500 rounded-lg p-6 text-white">
              <div className="flex items-center space-x-4">
                <div className="bg-white/20 rounded-full p-3">
                  <User className="h-8 w-8" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">{userName}</h2>
                  <p className="text-rose-100">{session.user?.email}</p>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {quickStats.map((stat, index) => {
                const Icon = stat.icon
                return (
                  <div
                    key={index}
                    className="bg-white rounded-lg p-6 shadow-sm border border-gray-200"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">
                          {stat.label}
                        </p>
                        <p className="text-2xl font-bold text-gray-900">
                          {stat.value}
                        </p>
                      </div>
                      <div className={`${stat.bgColor} rounded-full p-3`}>
                        <Icon className={`h-6 w-6 ${stat.color}`} />
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold mb-4">Accesos Rápidos</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button
                  onClick={() => router.push("/mujer")}
                  className="p-4 border border-gray-200 rounded-lg hover:border-rose-300 hover:bg-rose-50 transition-colors"
                >
                  <p className="font-medium text-gray-900">Seguir comprando</p>
                  <p className="text-sm text-gray-600 mt-1">
                    Explora nuestros productos
                  </p>
                </button>

                <button
                  onClick={() => router.push("/account/pedidos")}
                  className="p-4 border border-gray-200 rounded-lg hover:border-rose-300 hover:bg-rose-50 transition-colors"
                >
                  <p className="font-medium text-gray-900">Mis Pedidos</p>
                  <p className="text-sm text-gray-600 mt-1">
                    Ver historial completo
                  </p>
                </button>

                <button
                  onClick={() => router.push("/wishlist")}
                  className="p-4 border border-gray-200 rounded-lg hover:border-rose-300 hover:bg-rose-50 transition-colors"
                >
                  <p className="font-medium text-gray-900">Favoritos</p>
                  <p className="text-sm text-gray-600 mt-1">
                    Productos guardados
                  </p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}