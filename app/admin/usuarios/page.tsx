"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import {
  Search,
  User,
  Mail,
  Phone,
  ShoppingCart,
  Calendar,
  Loader2,
  ChevronLeft,
  ChevronRight,
  X,
  Shield,
  ShieldCheck
} from "lucide-react"

type UserProfile = {
  id: string
  email: string
  full_name: string | null
  phone: string | null
  role: string | null
  created_at: string | null
  orders_count?: number
  total_spent?: number
}

export default function UsersPage() {
  const [users, setUsers] = useState<UserProfile[]>([])
  const [loading, setLoading] = useState(true)
  const [totalCount, setTotalCount] = useState(0)
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)
  const perPage = 20

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true)
      const supabase = createClient()

      // First get users
      let query = supabase
        .from("profiles")
        .select("id, full_name, phone, role, created_at", { count: "exact" })
        .order("created_at", { ascending: false })
        .range((page - 1) * perPage, page * perPage - 1)

      if (search) {
        query = query.or(`full_name.ilike.%${search}%,phone.ilike.%${search}%`)
      }

      const { data: usersData, count, error } = await query

      if (error) {
        console.error("Error fetching users:", error)
        setLoading(false)
        return
      }

      if (!usersData || usersData.length === 0) {
        setUsers([])
        setTotalCount(0)
        setLoading(false)
        return
      }

      // Get auth.users emails (we need to fetch from orders as we can't query auth.users directly)
      // Instead, we'll use the email from orders table or leave it empty
      const userIds = usersData.map(u => u.id)

      // Get order stats for each user
      const { data: orderStats } = await supabase
        .from("orders")
        .select("user_id, total")
        .in("user_id", userIds)

      // Aggregate order data
      const userOrderStats = new Map<string, { count: number; total: number }>()
      orderStats?.forEach(order => {
        if (!order.user_id) return
        const current = userOrderStats.get(order.user_id) || { count: 0, total: 0 }
        userOrderStats.set(order.user_id, {
          count: current.count + 1,
          total: current.total + (order.total || 0)
        })
      })

      // Get emails from orders (as a workaround)
      const { data: orderEmails } = await supabase
        .from("orders")
        .select("user_id, customer_email")
        .in("user_id", userIds)

      const userEmails = new Map<string, string>()
      orderEmails?.forEach(order => {
        if (order.user_id && order.customer_email && !userEmails.has(order.user_id)) {
          userEmails.set(order.user_id, order.customer_email)
        }
      })

      // Combine data
      const enrichedUsers = usersData.map(user => ({
        ...user,
        email: userEmails.get(user.id) || `${user.id.slice(0, 8)}@...`,
        orders_count: userOrderStats.get(user.id)?.count || 0,
        total_spent: userOrderStats.get(user.id)?.total || 0
      }))

      setUsers(enrichedUsers)
      setTotalCount(count || 0)
      setLoading(false)
    }

    fetchUsers()
  }, [page, search])

  const toggleAdmin = async (userId: string, currentRole: string | null) => {
    const newRole = currentRole === "admin" ? "user" : "admin"
    const supabase = createClient()

    const { error } = await supabase
      .from("profiles")
      .update({ role: newRole })
      .eq("id", userId)

    if (!error) {
      setUsers(users.map(u =>
        u.id === userId ? { ...u, role: newRole } : u
      ))
    }
  }

  const totalPages = Math.ceil(totalCount / perPage)

  return (
    <div className="space-y-6">
      {/* Search */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar por nombre o teléfono..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value)
              setPage(1)
            }}
            className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-pink-600" />
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Usuario
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Contacto
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Órdenes
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total Gastado
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Registrado
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Rol
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {users.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-pink-100 flex items-center justify-center flex-shrink-0">
                            <span className="text-pink-600 font-medium">
                              {(user.full_name || user.email || "U").charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">
                              {user.full_name || "Sin nombre"}
                            </p>
                            <p className="text-xs text-gray-500 truncate max-w-xs">{user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Mail className="h-4 w-4 text-gray-400" />
                            <span className="truncate max-w-[200px]">{user.email}</span>
                          </div>
                          {user.phone && (
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Phone className="h-4 w-4 text-gray-400" />
                              <span>{user.phone}</span>
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <ShoppingCart className="h-4 w-4 text-gray-400" />
                          <span className="text-sm font-medium text-gray-900">
                            {user.orders_count}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-medium text-gray-900">
                          S/ {user.total_spent?.toFixed(2)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Calendar className="h-4 w-4" />
                          {user.created_at ? new Date(user.created_at).toLocaleDateString("es-PE", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric"
                          }) : "-"}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => toggleAdmin(user.id, user.role)}
                          className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                            user.role === "admin"
                              ? "bg-purple-100 text-purple-800 hover:bg-purple-200"
                              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                          }`}
                        >
                          {user.role === "admin" ? (
                            <>
                              <ShieldCheck className="h-3 w-3" />
                              Admin
                            </>
                          ) : (
                            <>
                              <User className="h-3 w-3" />
                              Usuario
                            </>
                          )}
                        </button>
                      </td>
                    </tr>
                  ))}
                  {users.length === 0 && (
                    <tr>
                      <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                        No se encontraron usuarios
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100">
                <p className="text-sm text-gray-500">
                  Mostrando {(page - 1) * perPage + 1} - {Math.min(page * perPage, totalCount)} de {totalCount}
                </p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setPage(page - 1)}
                    disabled={page === 1}
                    className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <span className="text-sm text-gray-600">
                    Página {page} de {totalPages}
                  </span>
                  <button
                    onClick={() => setPage(page + 1)}
                    disabled={page === totalPages}
                    className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
