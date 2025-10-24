"use client"

import { usePathname, useRouter } from "next/navigation"
import { signOut } from "next-auth/react"
import { User, Package, MapPin, Heart, LogOut } from "lucide-react"

export default function AccountSidebar() {
  const pathname = usePathname()
  const router = useRouter()

  // ✅ Logout simplificado - el middleware maneja todo
  const handleSignOut = async () => {
    try {
      console.log("🔄 Cerrando sesión...")
      
      // Ejecutar signOut (agrega user a blacklist)
      await signOut({ redirect: false })
      
      console.log("✅ SignOut completado, redirigiendo...")
      
      // Hard navigation para limpiar cache
      window.location.href = "/"
      
    } catch (error) {
      console.error("❌ Error:", error)
      window.location.href = "/"
    }
  }

  const menuItems = [
    {
      icon: User,
      label: "Mi Cuenta",
      href: "/account",
    },
    {
      icon: Package,
      label: "Mis Pedidos",
      href: "/account/pedidos",
    },
    {
      icon: MapPin,
      label: "Direcciones",
      href: "/account/direcciones",
    },
    {
      icon: Heart,
      label: "Lista de Deseos",
      href: "/wishlist",
    },
  ]

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-4 bg-gray-50 border-b border-gray-200">
        <h3 className="font-semibold text-gray-900">Mi Cuenta</h3>
      </div>

      <nav className="p-2">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href

          return (
            <button
              key={item.href}
              onClick={() => router.push(item.href)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? "bg-rose-50 text-rose-600"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              <Icon className="h-5 w-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          )
        })}

        {/* Logout Button */}
        <button
          onClick={handleSignOut}
          className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors mt-2"
        >
          <LogOut className="h-5 w-5" />
          <span className="font-medium">Cerrar Sesión</span>
        </button>
      </nav>
    </div>
  )
}