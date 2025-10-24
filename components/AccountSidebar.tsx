"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { signOut } from "next-auth/react"
import { User, Package, MapPin, Heart, LogOut } from "lucide-react"

export default function AccountSidebar() {
  const pathname = usePathname()

  // ✅ SOLUCIÓN DEFINITIVA: Simple y efectivo
  const handleSignOut = async () => {
    await signOut({ 
      callbackUrl: "/",
      redirect: true 
    })
  }

  const menuItems = [
    {
      href: "/account",
      label: "Inicio",
      icon: User,
      active: pathname === "/account",
    },
    {
      href: "/account/pedidos",
      label: "Mis pedidos",
      icon: Package,
      active: pathname === "/account/pedidos",
    },
    {
      href: "/account/direcciones",
      label: "Direcciones",
      icon: MapPin,
      active: pathname === "/account/direcciones",
    },
    {
      href: "/wishlist",
      label: "Lista de deseos",
      icon: Heart,
      active: pathname === "/wishlist",
    },
  ]

  return (
    <aside className="w-full lg:w-64 bg-white rounded-lg border border-neutral-200 p-6">
      <nav className="space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                item.active
                  ? "bg-rose-50 text-rose-600 font-medium"
                  : "text-neutral-700 hover:bg-neutral-50"
              }`}
            >
              <Icon className="w-5 h-5" />
              {item.label}
            </Link>
          )
        })}

        {/* Divider */}
        <div className="my-4 border-t border-neutral-200"></div>

        {/* Logout Button */}
        <button
          onClick={handleSignOut}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-neutral-700 hover:bg-neutral-50 transition"
        >
          <LogOut className="w-5 h-5" />
          Cerrar sesión
        </button>
      </nav>
    </aside>
  )
}