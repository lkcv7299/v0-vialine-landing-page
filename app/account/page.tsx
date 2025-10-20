"use client"

import { useSession, signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { User, Package, MapPin, Heart, LogOut, Mail, Calendar, Loader2 } from "lucide-react"

export default function AccountDashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()

  // Redirect si no está autenticado (backup, el middleware ya lo maneja)
  if (status === "unauthenticated") {
    router.push("/login")
    return null
  }

  // Loading state
  if (status === "loading") {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-rose-600" />
      </div>
    )
  }

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/" })
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <div className="bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-neutral-900">Mi Cuenta</h1>
              <p className="text-sm text-neutral-600 mt-1">
                Gestiona tu información y pedidos
              </p>
            </div>
            <Link
              href="/"
              className="text-sm text-neutral-600 hover:text-neutral-900 underline underline-offset-4"
            >
              ← Volver a la tienda
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-6">
              {/* User Info */}
              <div className="flex items-center gap-4 pb-6 border-b border-neutral-200">
                <div className="w-16 h-16 rounded-full bg-rose-100 flex items-center justify-center">
                  <User className="w-8 h-8 text-rose-600" />
                </div>
                <div>
                  <h2 className="font-semibold text-neutral-900">
                    {session?.user?.name || "Usuario"}
                  </h2>
                  <p className="text-sm text-neutral-600">{session?.user?.email}</p>
                </div>
              </div>

              {/* Navigation */}
              <nav className="mt-6 space-y-2">
                <Link
                  href="/account"
                  className="flex items-center gap-3 px-4 py-3 rounded-lg bg-rose-50 text-rose-600 font-medium"
                >
                  <User className="w-5 h-5" />
                  Inicio
                </Link>
                <Link
                  href="/account/pedidos"
                  className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-neutral-50 text-neutral-700 transition"
                >
                  <Package className="w-5 h-5" />
                  Mis pedidos
                </Link>
                <Link
                  href="/account/direcciones"
                  className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-neutral-50 text-neutral-700 transition"
                >
                  <MapPin className="w-5 h-5" />
                  Direcciones
                </Link>
                <Link
                  href="/wishlist"
                  className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-neutral-50 text-neutral-700 transition"
                >
                  <Heart className="w-5 h-5" />
                  Lista de deseos
                </Link>
              </nav>

              {/* Sign Out Button */}
              <button
                onClick={handleSignOut}
                className="w-full mt-6 flex items-center justify-center gap-2 px-4 py-3 rounded-lg border border-neutral-300 text-neutral-700 hover:bg-neutral-50 transition"
              >
                <LogOut className="w-5 h-5" />
                Cerrar sesión
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Welcome Card */}
            <div className="bg-gradient-to-r from-rose-600 to-rose-700 rounded-2xl shadow-sm p-8 text-white">
              <h2 className="text-2xl font-bold mb-2">
  ¡Hola, {session?.user?.name?.split(" ")[0]}!
</h2>
              <p className="text-rose-100">
                Estamos felices de tenerte aquí. Explora nuestras últimas colecciones de activewear.
              </p>
              <Link
                href="/mujer"
                className="inline-block mt-4 px-6 py-2 bg-white text-rose-600 rounded-lg font-medium hover:bg-rose-50 transition"
              >
                Ver productos
              </Link>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-rose-100 flex items-center justify-center">
                    <Package className="w-6 h-6 text-rose-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-neutral-900">0</p>
                    <p className="text-sm text-neutral-600">Pedidos</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-rose-100 flex items-center justify-center">
                    <Heart className="w-6 h-6 text-rose-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-neutral-900">0</p>
                    <p className="text-sm text-neutral-600">Favoritos</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-rose-100 flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-rose-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-neutral-900">0</p>
                    <p className="text-sm text-neutral-600">Direcciones</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Account Details */}
            <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-6">
              <h3 className="text-lg font-semibold text-neutral-900 mb-4">
                Información de la cuenta
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3 pb-4 border-b border-neutral-200">
                  <Mail className="w-5 h-5 text-neutral-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-neutral-600">Email</p>
                    <p className="font-medium text-neutral-900">{session?.user?.email}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-neutral-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-neutral-600">Miembro desde</p>
                    <p className="font-medium text-neutral-900">
                      {new Date().toLocaleDateString("es-PE", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Orders Empty State */}
            <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-8 text-center">
              <div className="w-16 h-16 mx-auto bg-neutral-100 rounded-full flex items-center justify-center mb-4">
                <Package className="w-8 h-8 text-neutral-400" />
              </div>
              <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                Aún no tienes pedidos
              </h3>
              <p className="text-neutral-600 mb-4">
                Descubre nuestra colección de activewear y haz tu primera compra
              </p>
              <Link
                href="/mujer"
                className="inline-block px-6 py-3 bg-rose-600 text-white rounded-lg font-medium hover:bg-rose-700 transition"
              >
                Explorar productos
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}