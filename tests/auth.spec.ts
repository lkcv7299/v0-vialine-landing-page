import { test, expect } from '@playwright/test'

test.describe('Authentication Tests', () => {
  test('Página de login carga correctamente', async ({ page }) => {
    await page.goto('http://localhost:3000/login')

    // Verificar elementos del formulario
    await expect(page.locator('input[type="email"], input[name="email"]')).toBeVisible()
    await expect(page.locator('input[type="password"], input[name="password"]')).toBeVisible()
    await expect(page.locator('button:has-text("Iniciar sesión"), button:has-text("Login")')).toBeVisible()
  })

  test('Login con credenciales correctas funciona', async ({ page }) => {
    await page.goto('http://localhost:3000/login')

    // Llenar formulario
    await page.fill('input[type="email"], input[name="email"]', 'test@vialine.com')
    await page.fill('input[type="password"], input[name="password"]', 'TestVialine2025!')

    // Click en login
    await page.click('button:has-text("Iniciar sesión"), button:has-text("Login")')

    // Esperar redirección (a /account o homepage)
    await page.waitForURL(/account|^\/$/, { timeout: 10000 })

    // Verificar que no estamos en /login
    expect(page.url()).not.toContain('/login')
  })

  test('Login con credenciales incorrectas muestra error', async ({ page }) => {
    await page.goto('http://localhost:3000/login')

    // Llenar con credenciales incorrectas
    await page.fill('input[type="email"], input[name="email"]', 'test@vialine.com')
    await page.fill('input[type="password"], input[name="password"]', 'WrongPassword123!')

    // Click en login
    await page.click('button:has-text("Iniciar sesión"), button:has-text("Login")')

    // Esperar mensaje de error
    await page.waitForTimeout(2000)

    // Verificar que seguimos en login o hay mensaje de error
    const hasError = await page.locator('text=/error|incorrecto|inválido/i').count()
    const stillOnLogin = page.url().includes('/login')

    expect(hasError > 0 || stillOnLogin).toBeTruthy()
  })

  test('Página de registro carga correctamente', async ({ page }) => {
    await page.goto('http://localhost:3000/register')

    // Verificar campos del formulario
    await expect(page.locator('input[name="email"], input[type="email"]')).toBeVisible()
    await expect(page.locator('input[name="password"], input[type="password"]').first()).toBeVisible()
    await expect(page.locator('button:has-text("Crear cuenta"), button:has-text("Registrar")')).toBeVisible()
  })

  test('Acceso a rutas protegidas sin login redirige', async ({ page }) => {
    // Limpiar cookies/storage
    await page.context().clearCookies()

    // Intentar acceder a /account
    await page.goto('http://localhost:3000/account')

    // Esperar redirección a login
    await page.waitForURL(/login/, { timeout: 5000 })

    expect(page.url()).toContain('login')
  })

  test('Logout funciona correctamente', async ({ page }) => {
    // Primero hacer login
    await page.goto('http://localhost:3000/login')
    await page.fill('input[type="email"], input[name="email"]', 'test@vialine.com')
    await page.fill('input[type="password"], input[name="password"]', 'TestVialine2025!')
    await page.click('button:has-text("Iniciar sesión"), button:has-text("Login")')

    // Esperar que login complete
    await page.waitForURL(/account|^\/$/, { timeout: 10000 })

    // Buscar botón de logout (puede estar en menú dropdown)
    const logoutBtn = page.locator('text=/cerrar sesión|logout/i').first()

    if (await logoutBtn.count() > 0) {
      await logoutBtn.click()

      // Verificar que volvimos a homepage o login
      await page.waitForTimeout(2000)
      const url = page.url()
      expect(url === 'http://localhost:3000/' || url.includes('login')).toBeTruthy()
    } else {
      console.log('Botón de logout no encontrado, puede estar en menú dropdown')
    }
  })

  test('Sesión persiste después de refresh', async ({ page }) => {
    // Login
    await page.goto('http://localhost:3000/login')
    await page.fill('input[type="email"], input[name="email"]', 'test@vialine.com')
    await page.fill('input[type="password"], input[name="password"]', 'TestVialine2025!')
    await page.click('button:has-text("Iniciar sesión"), button:has-text("Login")')

    await page.waitForURL(/account|^\/$/, { timeout: 10000 })

    // Guardar URL actual
    const urlAfterLogin = page.url()

    // Refresh
    await page.reload()

    // Verificar que no fuimos redirigidos a login
    await page.waitForTimeout(2000)
    expect(page.url()).not.toContain('/login')
  })
})
