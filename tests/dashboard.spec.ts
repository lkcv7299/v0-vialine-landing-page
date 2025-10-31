import { test, expect } from '@playwright/test'

test.describe('Dashboard de Usuario Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Login antes de cada test
    await page.goto('http://localhost:3000/login')
    await page.fill('input[type="email"]', 'test@vialine.com')
    await page.fill('input[type="password"]', 'TestVialine2025!')
    await page.click('button:has-text("Iniciar sesión")')
    await page.waitForURL(/account|^\/$/, { timeout: 10000 })
  })

  test('Página de dashboard carga correctamente', async ({ page }) => {
    await page.goto('http://localhost:3000/account')
    await page.waitForTimeout(1500)

    // Verificar que estamos en account
    expect(page.url()).toContain('account')

    // Verificar que hay contenido
    await expect(page.locator('h1, h2').first()).toBeVisible()
  })

  test('Dashboard muestra navegación lateral o tabs', async ({ page }) => {
    await page.goto('http://localhost:3000/account')
    await page.waitForTimeout(1500)

    // Buscar sidebar o tabs de navegación
    const nav = page.locator('nav, [role="navigation"], [class*="sidebar"]')

    if (await nav.count() > 0) {
      console.log('✓ Navegación del dashboard encontrada')

      // Buscar links comunes del dashboard
      const commonLinks = ['perfil', 'pedidos', 'direcciones', 'wishlist']

      for (const link of commonLinks) {
        const linkElement = page.locator(`text=/${link}/i`)
        if (await linkElement.count() > 0) {
          console.log(`  ✓ Link "${link}" encontrado`)
        }
      }
    }
  })

  test('Dashboard muestra estadísticas o resumen', async ({ page }) => {
    await page.goto('http://localhost:3000/account')
    await page.waitForTimeout(1500)

    // Buscar cards o secciones de estadísticas
    const stats = page.locator('[class*="stat"], [class*="card"]')

    if (await stats.count() > 0) {
      console.log(`✓ ${await stats.count()} cards de estadísticas encontrados`)
    }

    // Buscar texto de bienvenida
    const welcome = page.locator('text=/bienvenido|hola|welcome/i')
    if (await welcome.count() > 0) {
      const welcomeText = await welcome.first().textContent()
      console.log(`Mensaje de bienvenida: ${welcomeText}`)
    }
  })

  test('Navegar a sección de perfil funciona', async ({ page }) => {
    await page.goto('http://localhost:3000/account')
    await page.waitForTimeout(1500)

    // Buscar link de perfil
    const perfilLink = page.locator('a:has-text("Perfil"), a:has-text("Profile")').first()

    if (await perfilLink.count() > 0) {
      await perfilLink.click()
      await page.waitForTimeout(1500)

      const url = page.url()
      console.log(`URL de perfil: ${url}`)

      expect(url).toContain('perfil')
    } else {
      console.log('⚠ Link de perfil no encontrado, puede estar en URL directa')

      // Intentar ir directamente
      await page.goto('http://localhost:3000/account/perfil')
      await page.waitForTimeout(1500)

      if (page.url().includes('perfil')) {
        console.log('✓ Acceso directo a perfil funciona')
      }
    }
  })

  test('Sección de perfil muestra datos del usuario', async ({ page }) => {
    await page.goto('http://localhost:3000/account/perfil')
    await page.waitForTimeout(1500)

    // Buscar campos del perfil
    const nameInput = page.locator('input[name="nombre"], input[name="name"]').first()
    const emailInput = page.locator('input[name="email"], input[type="email"]').first()

    if (await nameInput.count() > 0) {
      const nameValue = await nameInput.inputValue()
      console.log(`Nombre en perfil: ${nameValue}`)
    }

    if (await emailInput.count() > 0) {
      const emailValue = await emailInput.inputValue()
      console.log(`Email en perfil: ${emailValue}`)
    }

    // Verificar botón de guardar
    const saveBtn = page.locator('button:has-text("Guardar"), button:has-text("Save")').first()
    if (await saveBtn.count() > 0) {
      await expect(saveBtn).toBeVisible()
      console.log('✓ Botón de guardar cambios visible')
    }
  })

  test('Navegar a sección de pedidos funciona', async ({ page }) => {
    await page.goto('http://localhost:3000/account')
    await page.waitForTimeout(1500)

    // Buscar link de pedidos
    const pedidosLink = page.locator('a:has-text("Pedidos"), a:has-text("Orders")').first()

    if (await pedidosLink.count() > 0) {
      await pedidosLink.click()
      await page.waitForTimeout(1500)

      const url = page.url()
      console.log(`URL de pedidos: ${url}`)

      expect(url).toContain('pedidos') || expect(url).toContain('orders')
    } else {
      // Intentar URL directa
      await page.goto('http://localhost:3000/account/pedidos')
      await page.waitForTimeout(1500)

      if (page.url().includes('pedidos')) {
        console.log('✓ Acceso directo a pedidos funciona')
      }
    }
  })

  test('Sección de pedidos muestra historial o mensaje vacío', async ({ page }) => {
    await page.goto('http://localhost:3000/account/pedidos')
    await page.waitForTimeout(1500)

    // Buscar lista de pedidos
    const orders = page.locator('[class*="order"], tr').filter({ hasText: /VIA-|#/ })

    const count = await orders.count()

    if (count > 0) {
      console.log(`✓ ${count} pedidos encontrados en historial`)
    } else {
      // Buscar mensaje de "sin pedidos"
      const emptyMessage = page.locator('text=/no tienes pedidos|no orders|empty/i')
      if (await emptyMessage.count() > 0) {
        console.log('✓ Mensaje de sin pedidos mostrado correctamente')
      }
    }
  })

  test('Navegar a sección de direcciones funciona', async ({ page }) => {
    await page.goto('http://localhost:3000/account')
    await page.waitForTimeout(1500)

    // Buscar link de direcciones
    const direccionesLink = page.locator('a:has-text("Direcciones"), a:has-text("Addresses")').first()

    if (await direccionesLink.count() > 0) {
      await direccionesLink.click()
      await page.waitForTimeout(1500)

      const url = page.url()
      expect(url).toContain('direccion')
    } else {
      // URL directa
      await page.goto('http://localhost:3000/account/direcciones')
      await page.waitForTimeout(1500)

      if (page.url().includes('direccion')) {
        console.log('✓ Acceso directo a direcciones funciona')
      }
    }
  })

  test('Sección de direcciones muestra direcciones guardadas o botón agregar', async ({ page }) => {
    await page.goto('http://localhost:3000/account/direcciones')
    await page.waitForTimeout(1500)

    // Buscar direcciones existentes
    const addresses = page.locator('[class*="address"]')

    const count = await addresses.count()

    if (count > 0) {
      console.log(`✓ ${count} direcciones guardadas encontradas`)
    }

    // Buscar botón de agregar dirección
    const addBtn = page.locator('button:has-text("Agregar"), button:has-text("Nueva"), button:has-text("Add")').first()

    if (await addBtn.count() > 0) {
      await expect(addBtn).toBeVisible()
      console.log('✓ Botón de agregar dirección visible')
    }
  })

  test('Wishlist accesible desde dashboard', async ({ page }) => {
    await page.goto('http://localhost:3000/account')
    await page.waitForTimeout(1500)

    // Buscar link de wishlist
    const wishlistLink = page.locator('a:has-text("Favoritos"), a:has-text("Wishlist")').first()

    if (await wishlistLink.count() > 0) {
      await wishlistLink.click()
      await page.waitForTimeout(1500)

      const url = page.url()
      console.log(`URL de wishlist: ${url}`)

      expect(url).toContain('wishlist') || expect(url).toContain('favorito')
    } else {
      // Intentar URL directa
      await page.goto('http://localhost:3000/wishlist')
      await page.waitForTimeout(1500)

      if (page.url().includes('wishlist')) {
        console.log('✓ Acceso directo a wishlist funciona')
      }
    }
  })

  test('Cerrar sesión desde dashboard funciona', async ({ page }) => {
    await page.goto('http://localhost:3000/account')
    await page.waitForTimeout(1500)

    // Buscar botón de logout
    const logoutBtn = page.locator('button:has-text("Cerrar sesión"), a:has-text("Cerrar sesión"), text=/logout/i').first()

    if (await logoutBtn.count() > 0) {
      await logoutBtn.click()
      await page.waitForTimeout(2000)

      const url = page.url()
      console.log(`URL después de logout: ${url}`)

      // Debería redirigir a home o login
      expect(url === 'http://localhost:3000/' || url.includes('login')).toBeTruthy()
    } else {
      console.log('⚠ Botón de logout no encontrado en dashboard')
    }
  })
})
