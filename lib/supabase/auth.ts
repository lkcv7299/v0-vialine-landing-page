'use server'

import { createClient } from './server'
import { redirect } from 'next/navigation'
import { headers } from 'next/headers'

// ===================================
// SIGN IN CON EMAIL/PASSWORD
// ===================================
export async function signInWithEmail(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const redirectTo = formData.get('redirectTo') as string || '/account'

  const supabase = await createClient()

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return { error: error.message }
  }

  redirect(redirectTo)
}

// ===================================
// SIGN UP CON EMAIL/PASSWORD
// ===================================
export async function signUpWithEmail(formData: FormData) {
  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const phone = formData.get('phone') as string | null

  const supabase = await createClient()

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: name,
        phone: phone,
      },
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
    },
  })

  if (error) {
    return { error: error.message }
  }

  // Si el email necesita confirmación
  if (data.user && !data.session) {
    return {
      success: true,
      message: 'Revisa tu correo para confirmar tu cuenta'
    }
  }

  redirect('/account')
}

// ===================================
// SIGN IN CON GOOGLE
// ===================================
export async function signInWithGoogle(redirectTo?: string) {
  const supabase = await createClient()
  const headersList = await headers()
  const origin = headersList.get('origin') || process.env.NEXT_PUBLIC_SITE_URL

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${origin}/auth/callback?next=${redirectTo || '/account'}`,
      queryParams: {
        access_type: 'offline',
        prompt: 'consent',
      },
    },
  })

  if (error) {
    return { error: error.message }
  }

  if (data.url) {
    redirect(data.url)
  }
}

// ===================================
// SIGN OUT
// ===================================
export async function signOut() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/login')
}

// ===================================
// GET USER (for server components)
// ===================================
export async function getUser() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

// ===================================
// GET SESSION (for server components)
// ===================================
export async function getSession() {
  const supabase = await createClient()
  const { data: { session } } = await supabase.auth.getSession()
  return session
}

// ===================================
// RESET PASSWORD
// ===================================
export async function resetPassword(formData: FormData) {
  const email = formData.get('email') as string

  const supabase = await createClient()

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback?next=/account/reset-password`,
  })

  if (error) {
    return { error: error.message }
  }

  return {
    success: true,
    message: 'Revisa tu correo para restablecer tu contraseña'
  }
}

// ===================================
// UPDATE PASSWORD
// ===================================
export async function updatePassword(formData: FormData) {
  const password = formData.get('password') as string

  const supabase = await createClient()

  const { error } = await supabase.auth.updateUser({
    password,
  })

  if (error) {
    return { error: error.message }
  }

  redirect('/account')
}

// ===================================
// GET USER WITH PROFILE
// ===================================
export async function getUserWithProfile() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return null

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  return {
    ...user,
    profile,
  }
}
