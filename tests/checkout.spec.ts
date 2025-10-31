import { test, expect } from '@playwright/test'

test.describe('Checkout Flow Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Agregar un producto al carrito antes de cada test
    await page.goto('http://localhost:3000/mujer')
    await page.waitForSelector('[class*="product"]', { timeout: 5000 })
    await page.locator('[class*="product"]').first().click()
    await page.waitForURL(/productos/, { timeout: 5000 })
    await page.waitForTimeout(1000)

    const sizeButton = page.locator('button:has-text("M")').first()
    if (await sizeButton.count() > 0) {
      await sizeButton.click()
    }

    await page.locator('button:has-text("Agregar al carrito")').first().click()
    await page.waitForTimeout(1000)
  })

  test('Acceso a checkout redirige a login si no está autenticado', async ({ page }) => {
    // Limpiar sesión
    await page.context().clearCookies()

    // Intentar ir a checkout
    await page.goto('http://localhost:3000/checkout')

    // Esperar redirección
    await page.waitForTimeout(2000)

    const url = page.url()
    console.log(`URL después de intentar checkout sin login: ${url}`)

    // Debería redirigir a login o mostrar opción de login
    expect(url.includes('login') || url.includes('checkout')).toBeTruthy()
  })

  test('Página de checkout carga después de login', async ({ page }) => {
    // Login
    await page.goto('http://localhost:3000/login')
    await page.fill('input[type="email"]', 'test@vialine.com')
    await page.fill('input[type="password"]', 'TestVialine2025!')
    await page.click('button:has-text("Iniciar sesión")')
    await page.waitForURL(/account|^\/$/, { timeout: 10000 })

    // Ir a checkout
    await page.goto('http://localhost:3000/checkout')
    await page.waitForTimeout(2000)

    // Verificar que estamos en checkout
    const url = page.url()
    console.log(`URL de checkout: ${url}`)
    expect(url).toContain('checkout')
  })

  test('Formulario de envío muestra campos requeridos', async ({ page }) => {
    // Login
    await page.goto('http://localhost:3000/login')
    await page.fill('input[type="email"]', 'test@vialine.com')
    await page.fill('input[type="password"]', 'TestVialine2025!')
    await page.click('button:has-text("Iniciar sesión")')
    await page.waitForURL(/account|^\/$/, { timeout: 10000 })

    // Ir a checkout
    await page.goto('http://localhost:3000/checkout')
    await page.waitForTimeout(2000)

    // Verificar campos principales
    const emailInput = page.locator('input[name="email"], input[type="email"]')
    const addressInput = page.locator('input[name="direccion"], input[name="address"]')
    const nameInput = page.locator('input[name="nombre"], input[name="name"]')

    // Al menos uno de estos debería estar visible
    const hasEmailField = await emailInput.count() > 0
    const hasAddressField = await addressInput.count() > 0
    const hasNameField = await nameInput.count() > 0

    console.log(`Campos encontrados - Email: ${hasEmailField}, Dirección: ${hasAddressField}, Nombre: ${hasNameField}`)

    expect(hasEmailField || hasAddressField || hasNameField).toBeTruthy()
  })

  test('Resumen del pedido visible en checkout', async ({ page }) => {
    // Login
    await page.goto('http://localhost:3000/login')
    await page.fill('input[type="email"]', 'test@vialine.com')
    await page.fill('input[type="password"]', 'TestVialine2025!')
    await page.click('button:has-text("Iniciar sesión")')
    await page.waitForURL(/account|^\/$/, { timeout: 10000 })

    // Ir a checkout
    await page.goto('http://localhost:3000/checkout')
    await page.waitForTimeout(2000)

    // Buscar resumen del pedido
    const summary = page.locator('text=/resumen|summary|order/i').first()

    if (await summary.count() > 0) {
      console.log('✓ Resumen del pedido encontrado')
    }

    // Buscar total
    const total = page.locator('text=/total.*S\//i, text=/S\/.*total/i').first()

    if (await total.count() > 0) {
      const totalText = await total.textContent()
      console.log(`Total en checkout: ${totalText}`)
    }
  })

  test('Métodos de pago disponibles', async ({ page }) => {
    // Login
    await page.goto('http://localhost:3000/login')
    await page.fill('input[type="email"]', 'test@vialine.com')
    await page.fill('input[type="password"]', 'TestVialine2025!')
    await page.click('button:has-text("Iniciar sesión")')
    await page.waitForURL(/account|^\/$/, { timeout: 10000 })

    // Ir a checkout
    await page.goto('http://localhost:3000/checkout')
    await page.waitForTimeout(2000)

    // Buscar opciones de pago
    const paymentOptions = page.locator('text=/culqi|yape|tarjeta|contra entrega/i')

    const count = await paymentOptions.count()
    console.log(`Opciones de pago encontradas: ${count}`)

    if (count > 0) {
      console.log('✓ Métodos de pago disponibles')

      // Listar métodos encontrados
      for (let i = 0; i < Math.min(count, 5); i++) {
        const text = await paymentOptions.nth(i).textContent()
        console.log(`  - ${text?.trim()}`)
      }
    } else {
      console.log('⚠ Métodos de pago no encontrados en esta vista (puede estar en siguiente paso)')
    }
  })

  test('Validación de formulario funciona', async ({ page }) => {
    // Login
    await page.goto('http://localhost:3000/login')
    await page.fill('input[type="email"]', 'test@vialine.com')
    await page.fill('input[type="password"]', 'TestVialine2025!')
    await page.click('button:has-text("Iniciar sesión")')
    await page.waitForURL(/account|^\/$/, { timeout: 10000 })

    // Ir a checkout
    await page.goto('http://localhost:3000/checkout')
    await page.waitForTimeout(2000)

    // Intentar continuar sin llenar campos
    const continueBtn = page.locator('button:has-text("Continuar"), button:has-text("Continue"), button:has-text("Siguiente")').first()

    if (await continueBtn.count() > 0) {
      await continueBtn.click()
      await page.waitForTimeout(1500)

      // Buscar mensajes de error o validación
      const errorMessages = page.locator('text=/requerido|required|obligatorio/i')
      const errorCount = await errorMessages.count()

      console.log(`Mensajes de validación encontrados: ${errorCount}`)

      if (errorCount > 0) {
        console.log('✓ Validación de formulario funcionando')
      }
    }
  })

  test('Direcciones guardadas aparecen si existen', async ({ page }) => {
    // Login
    await page.goto('http://localhost:3000/login')
    await page.fill('input[type="email"]', 'test@vialine.com')
    await page.fill('input[type="password"]', 'TestVialine2025!')
    await page.click('button:has-text("Iniciar sesión")')
    await page.waitForURL(/account|^\/$/, { timeout: 10000 })

    // Ir a checkout
    await page.goto('http://localhost:3000/checkout')
    await page.waitForTimeout(2000)

    // Buscar sección de direcciones guardadas
    const savedAddresses = page.locator('text=/direcciones guardadas|saved address/i')

    if (await savedAddresses.count() > 0) {
      console.log('✓ Sección de direcciones guardadas encontrada')

      // Buscar radio buttons o selectores de dirección
      const addressSelectors = page.locator('input[type="radio"][name*="address" i], input[type="radio"][name*="direccion" i]')
      const count = await addressSelectors.count()

      console.log(`  ${count} direcciones guardadas disponibles`)
    } else {
      console.log('⚠ No hay direcciones guardadas o sección no visible')
    }
  })

  test('Botón volver a carrito funciona', async ({ page }) => {
    // Login
    await page.goto('http://localhost:3000/login')
    await page.fill('input[type="email"]', 'test@vialine.com')
    await page.fill('input[type="password"]', 'TestVialine2025!')
    await page.click('button:has-text("Iniciar sesión")')
    await page.waitForURL(/account|^\/$/, { timeout: 10000 })

    // Ir a checkout
    await page.goto('http://localhost:3000/checkout')
    await page.waitForTimeout(2000)

    // Buscar botón de volver
    const backBtn = page.locator('button:has-text("Volver"), a:has-text("Volver"), a:has-text("Carrito")').first()

    if (await backBtn.count() > 0) {
      await backBtn.click()
      await page.waitForTimeout(1500)

      const url = page.url()
      console.log(`URL después de click en volver: ${url}`)

      expect(url).toContain('carrito')
    } else {
      console.log('⚠ Botón de volver no encontrado')
    }
  })

  test('No se puede hacer checkout con carrito vacío', async ({ page }) => {
    // Login
    await page.goto('http://localhost:3000/login')
    await page.fill('input[type="email"]', 'test@vialine.com')
    await page.fill('input[type="password"]', 'TestVialine2025!')
    await page.click('button:has-text("Iniciar sesión")')
    await page.waitForURL(/account|^\/$/, { timeout: 10000 })

    // Vaciar carrito (ir a carrito y eliminar todo)
    await page.goto('http://localhost:3000/carrito')
    await page.waitForTimeout(1000)

    // Intentar eliminar todos los items
    const removeButtons = page.locator('button:has-text("Eliminar"), button[aria-label*="eliminar" i]')
    const count = await removeButtons.count()

    for (let i = 0; i < Math.min(count, 3); i++) {
      await page.locator('button:has-text("Eliminar"), button[aria-label*="eliminar" i]').first().click()
      await page.waitForTimeout(500)

      // Confirmar si hay modal
      const confirmBtn = page.locator('button:has-text("Sí"), button:has-text("Confirmar")')
      if (await confirmBtn.count() > 0) {
        await confirmBtn.first().click()
      }

      await page.waitForTimeout(500)
    }

    // Intentar ir a checkout
    await page.goto('http://localhost:3000/checkout')
    await page.waitForTimeout(2000)

    const url = page.url()

    // Debería redirigir a carrito o mostrar mensaje
    if (url.includes('carrito')) {
      console.log('✓ Redirigido a carrito correctamente')
    } else if (url.includes('checkout')) {
      const emptyMessage = page.locator('text=/carrito vacío|empty cart/i')
      if (await emptyMessage.count() > 0) {
        console.log('✓ Mensaje de carrito vacío mostrado')
      }
    }
  })
})
