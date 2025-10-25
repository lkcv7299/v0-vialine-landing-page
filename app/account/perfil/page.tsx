// app/account/perfil/page.tsx
"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useState, useEffect } from "react"
import { User, Mail, Lock, Save, Loader2, CheckCircle } from "lucide-react"
import AccountSidebar from "@/components/AccountSidebar"
import { toast } from "sonner"

interface ProfileData {
  name: string
  email: string
}

interface PasswordData {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}

export default function PerfilPage() {
  const { data: session, status, update } = useSession()
  const router = useRouter()

  // Estado de formulario de perfil
  const [profileData, setProfileData] = useState<ProfileData>({
    name: "",
    email: "",
  })

  // Estado de formulario de contraseña
  const [passwordData, setPasswordData] = useState<PasswordData>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const [savingProfile, setSavingProfile] = useState(false)
  const [savingPassword, setSavingPassword] = useState(false)
  const [showPasswordForm, setShowPasswordForm] = useState(false)

  // Cargar datos del usuario
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login")
    }

    if (session?.user) {
      setProfileData({
        name: session.user.name || "",
        email: session.user.email || "",
      })
    }
  }, [status, session, router])

  // Guardar cambios de perfil
  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!profileData.name.trim()) {
      toast.error("El nombre es requerido")
      return
    }

    if (!profileData.email.trim()) {
      toast.error("El email es requerido")
      return
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(profileData.email)) {
      toast.error("Email inválido")
      return
    }

    setSavingProfile(true)

    try {
      const res = await fetch("/api/account/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profileData),
      })

      const data = await res.json()

      if (data.success) {
        // Actualizar sesión con nuevos datos
        await update({
          name: profileData.name,
          email: profileData.email,
        })

        toast.success("Perfil actualizado correctamente")
      } else {
        toast.error(data.error || "Error al actualizar perfil")
      }
    } catch (error) {
      console.error("Error updating profile:", error)
      toast.error("Error al actualizar perfil")
    } finally {
      setSavingProfile(false)
    }
  }

  // Cambiar contraseña
  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validaciones
    if (!passwordData.currentPassword) {
      toast.error("Ingresa tu contraseña actual")
      return
    }

    if (!passwordData.newPassword) {
      toast.error("Ingresa una nueva contraseña")
      return
    }

    if (passwordData.newPassword.length < 6) {
      toast.error("La nueva contraseña debe tener al menos 6 caracteres")
      return
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("Las contraseñas no coinciden")
      return
    }

    if (passwordData.currentPassword === passwordData.newPassword) {
      toast.error("La nueva contraseña debe ser diferente a la actual")
      return
    }

    setSavingPassword(true)

    try {
      const res = await fetch("/api/account/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword,
        }),
      })

      const data = await res.json()

      if (data.success) {
        toast.success("Contraseña actualizada correctamente")
        // Limpiar formulario
        setPasswordData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        })
        setShowPasswordForm(false)
      } else {
        toast.error(data.error || "Error al cambiar contraseña")
      }
    } catch (error) {
      console.error("Error changing password:", error)
      toast.error("Error al cambiar contraseña")
    } finally {
      setSavingPassword(false)
    }
  }

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-rose-600" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <div className="bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-neutral-900">Mi Perfil</h1>
              <p className="text-sm text-neutral-600 mt-1">
                Gestiona tu información personal
              </p>
            </div>
            <Link
              href="/account"
              className="text-sm text-neutral-600 hover:text-neutral-900 underline underline-offset-4"
            >
              ← Volver a mi cuenta
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <AccountSidebar />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Información Personal */}
            <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 overflow-hidden">
              <div className="p-6 border-b border-neutral-200 bg-neutral-50">
                <div className="flex items-center gap-3">
                  <User className="w-6 h-6 text-rose-600" />
                  <h2 className="text-xl font-semibold text-neutral-900">
                    Información Personal
                  </h2>
                </div>
              </div>

              <form onSubmit={handleSaveProfile} className="p-6 space-y-6">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Nombre completo *
                  </label>
                  <input
                    type="text"
                    required
                    value={profileData.name}
                    onChange={(e) =>
                      setProfileData({ ...profileData, name: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-600"
                    placeholder="María García"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Email *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                    <input
                      type="email"
                      required
                      value={profileData.email}
                      onChange={(e) =>
                        setProfileData({ ...profileData, email: e.target.value })
                      }
                      className="w-full pl-11 pr-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-600"
                      placeholder="tu@email.com"
                    />
                  </div>
                  <p className="mt-2 text-xs text-neutral-600">
                    Este email se usará para todas las comunicaciones
                  </p>
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={savingProfile}
                    className="flex items-center gap-2 px-6 py-3 bg-rose-600 text-white font-semibold rounded-lg hover:bg-rose-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {savingProfile ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Guardando...
                      </>
                    ) : (
                      <>
                        <Save className="w-5 h-5" />
                        Guardar cambios
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>

            {/* Cambiar Contraseña */}
            <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 overflow-hidden">
              <div className="p-6 border-b border-neutral-200 bg-neutral-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Lock className="w-6 h-6 text-rose-600" />
                    <h2 className="text-xl font-semibold text-neutral-900">
                      Seguridad
                    </h2>
                  </div>
                  {!showPasswordForm && (
                    <button
                      onClick={() => setShowPasswordForm(true)}
                      className="text-sm text-rose-600 hover:text-rose-700 font-medium"
                    >
                      Cambiar contraseña
                    </button>
                  )}
                </div>
              </div>

              {!showPasswordForm ? (
                <div className="p-6">
                  <div className="flex items-center gap-3 text-green-600">
                    <CheckCircle className="w-5 h-5" />
                    <p className="text-sm">Tu contraseña está configurada y segura</p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleChangePassword} className="p-6 space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Contraseña actual *
                    </label>
                    <input
                      type="password"
                      required
                      value={passwordData.currentPassword}
                      onChange={(e) =>
                        setPasswordData({
                          ...passwordData,
                          currentPassword: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-600"
                      placeholder="••••••••"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Nueva contraseña *
                    </label>
                    <input
                      type="password"
                      required
                      value={passwordData.newPassword}
                      onChange={(e) =>
                        setPasswordData({
                          ...passwordData,
                          newPassword: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-600"
                      placeholder="••••••••"
                      minLength={6}
                    />
                    <p className="mt-2 text-xs text-neutral-600">
                      Mínimo 6 caracteres
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Confirmar nueva contraseña *
                    </label>
                    <input
                      type="password"
                      required
                      value={passwordData.confirmPassword}
                      onChange={(e) =>
                        setPasswordData({
                          ...passwordData,
                          confirmPassword: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-600"
                      placeholder="••••••••"
                    />
                  </div>

                  <div className="flex gap-3 justify-end">
                    <button
                      type="button"
                      onClick={() => {
                        setShowPasswordForm(false)
                        setPasswordData({
                          currentPassword: "",
                          newPassword: "",
                          confirmPassword: "",
                        })
                      }}
                      className="px-6 py-3 border-2 border-neutral-300 text-neutral-700 font-semibold rounded-lg hover:border-neutral-400 transition-colors"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      disabled={savingPassword}
                      className="flex items-center gap-2 px-6 py-3 bg-rose-600 text-white font-semibold rounded-lg hover:bg-rose-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {savingPassword ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Cambiando...
                        </>
                      ) : (
                        <>
                          <Lock className="w-5 h-5" />
                          Cambiar contraseña
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}