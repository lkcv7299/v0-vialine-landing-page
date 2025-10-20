// components/AccountSidebar.tsx
"use client"

import { signOut, useSession } from "next-auth/react"
import Link from "next/link"
import { User, Package, MapPin, Heart, LogOut } from "lucide-react"

interface AccountSidebarProps {
  currentPage: "inicio" | "pedidos" | "direcciones" | "wishlist"
}

export default function AccountSidebar({ currentPage }: AccountSidebarProps) {
  const { data: session } = useSession()

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/" })
  }

  const navItems = [
    { id: "inicio", href: "/account", icon: User, label: "Inicio" },
    { id: "pedidos", href: "/account/pedidos", icon: Package, label: "Mis pedidos" },
    { id: "direcciones", href: "/account/direcciones", icon: MapPin, label: "Direcciones" },
    { id: "wishlist", href: "/wishlist", icon: Heart, label: "Lista de deseos" },
  ]

  return (
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
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = currentPage === item.id

          return (
            <Link
              key={item.id}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                isActive
                  ? "bg-rose-50 text-rose-600 font-medium"
                  : "hover:bg-neutral-50 text-neutral-700"
              }`}
            >
              <Icon className="w-5 h-5" />
              {item.label}
            </Link>
          )
        })}
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
  )
}