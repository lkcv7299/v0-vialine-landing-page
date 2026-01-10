"use client"

import { useSupabaseAuth } from "@/hooks/use-supabase-auth"
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
  const { user, loading: authLoading } = useSupabaseAuth()
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
    if (!authLoading && !user) {
      router.push("/login")
    }
  }, [authLoading, user, router])

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

    if (user?.id) {
      fetchStats()
    } else if (!authLoading) {
      setLoading(false)
    }
  }, [user, authLoading])

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-rose-600"></div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  const userName = user.user_metadata?.full_name || user.user_metadata?.name || "Usuario"
  const userEmail = user.email || ""

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
            {/* Sidebar - Handles mobile tabs (sticky top) and desktop sidebar internally */}
            <div className="lg:col-span-1">
              <AccountSidebar />
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3 space-y-6">
            {/* Welcome Card - Más compacto en mobile */}
            <div className="bg-gradient-to-r from-rose-500 to-pink-500 rounded-lg p-4 lg:p-6 text-white">
              <div className="flex items-center space-x-3 lg:space-x-4">
                <div className="bg-white/20 rounded-full p-2 lg:p-3">
                  <User className="h-6 w-6 lg:h-8 lg:w-8" />
                </div>
                <div className="min-w-0 flex-1">
                  <h2 className="text-lg lg:text-2xl font-bold truncate">{userName}</h2>
                  <p className="text-rose-100 text-sm lg:text-base truncate">{userEmail}</p>
                </div>
              </div>
            </div>

            {/* Stats Grid - 2x2 en mobile, 4 cols en desktop */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
              {quickStats.map((stat, index) => {
                const Icon = stat.icon
                return (
                  <div
                    key={index}
                    className="bg-white rounded-lg p-3 lg:p-5 shadow-sm border border-gray-200"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-2">
                      <div className={`${stat.bgColor} rounded-full p-2 lg:p-3 w-fit lg:order-2`}>
                        <Icon className={`h-4 w-4 lg:h-6 lg:w-6 ${stat.color}`} />
                      </div>
                      <div className="lg:order-1">
                        <p className="text-xs lg:text-sm text-gray-600 mb-0.5 lg:mb-1 line-clamp-1">
                          {stat.label}
                        </p>
                        <p className="text-lg lg:text-2xl font-bold text-gray-900">
                          {stat.value}
                        </p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Quick Actions - Grid compacto en mobile */}
            <div className="bg-white rounded-lg p-4 lg:p-6 shadow-sm border border-gray-200">
              <h3 className="text-base lg:text-lg font-semibold mb-3 lg:mb-4">Accesos Rápidos</h3>
              <div className="grid grid-cols-3 gap-2 lg:gap-4">
                <button
                  onClick={() => router.push("/mujer")}
                  className="p-3 lg:p-4 border border-gray-200 rounded-lg hover:border-rose-300 hover:bg-rose-50 active:bg-rose-100 transition-colors text-left"
                >
                  <p className="font-medium text-gray-900 text-sm lg:text-base">Comprar</p>
                  <p className="text-xs lg:text-sm text-gray-600 mt-0.5 lg:mt-1 hidden lg:block">
                    Explora productos
                  </p>
                </button>

                <button
                  onClick={() => router.push("/account/pedidos")}
                  className="p-3 lg:p-4 border border-gray-200 rounded-lg hover:border-rose-300 hover:bg-rose-50 active:bg-rose-100 transition-colors text-left"
                >
                  <p className="font-medium text-gray-900 text-sm lg:text-base">Pedidos</p>
                  <p className="text-xs lg:text-sm text-gray-600 mt-0.5 lg:mt-1 hidden lg:block">
                    Ver historial
                  </p>
                </button>

                <button
                  onClick={() => router.push("/wishlist")}
                  className="p-3 lg:p-4 border border-gray-200 rounded-lg hover:border-rose-300 hover:bg-rose-50 active:bg-rose-100 transition-colors text-left"
                >
                  <p className="font-medium text-gray-900 text-sm lg:text-base">Favoritos</p>
                  <p className="text-xs lg:text-sm text-gray-600 mt-0.5 lg:mt-1 hidden lg:block">
                    Guardados
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
