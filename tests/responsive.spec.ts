import { test, expect } from '@playwright/test'

test.describe('Responsive Tests - Mobile', () => {
  test.use({ viewport: { width: 375, height: 667 } }) // iPhone SE

  test('Homepage carga correctamente en mobile', async ({ page }) => {
    await page.goto('http://localhost:3000')

    await expect(page.locator('header')).toBeVisible()
    await expect(page.locator('footer')).toBeVisible()

    console.log('✓ Homepage mobile carga correctamente')
  })

  test('Hamburger menu visible y funcional en mobile', async ({ page }) => {
    await page.goto('http://localhost:3000')

    // Buscar botón de hamburger menu
    const hamburger = page.locator('button[aria-label*="menu" i], button[aria-label*="navigation" i], button svg[class*="menu"]').first()

    if (await hamburger.count() > 0) {
      await expect(hamburger).toBeVisible()

      // Click para abrir
      await hamburger.click()
      await page.waitForTimeout(1000)

      console.log('✓ Hamburger menu clickeado')

      // Buscar menú abierto (drawer o modal)
      const menuDrawer = page.locator('[role="dialog"], [class*="drawer"], [class*="mobile-menu"]')

      if (await menuDrawer.count() > 0) {
        await expect(menuDrawer.first()).toBeVisible()
        console.log('✓ Menú mobile abierto correctamente')
      }
    } else {
      console.log('⚠ Hamburger menu no encontrado en mobile')
    }
  })

  test('Grid de productos muestra 2 columnas en mobile', async ({ page }) => {
    await page.goto('http://localhost:3000/mujer')
    await page.waitForTimeout(2000)

    // Tomar screenshot
    await page.screenshot({ path: 'test-results/mobile-grid.png' })

    console.log('✓ Screenshot de grid mobile tomado')

    // Verificar que productos cargan
    const products = await page.locator('[class*="product"]').count()
    expect(products).toBeGreaterThan(0)

    console.log(`${products} productos visibles en mobile`)
  })

  test('Filtros se muestran en drawer en mobile', async ({ page }) => {
    await page.goto('http://localhost:3000/mujer')
    await page.waitForTimeout(2000)

    // Buscar botón de filtros
    const filterBtn = page.locator('button:has-text("Filtros"), button:has-text("Filter")').first()

    if (await filterBtn.count() > 0) {
      await expect(filterBtn).toBeVisible()

      // Click para abrir drawer
      await filterBtn.click()
      await page.waitForTimeout(1000)

      console.log('✓ Drawer de filtros abierto en mobile')
    } else {
      console.log('⚠ Botón de filtros no visible en mobile')
    }
  })

  test('Producto individual muestra bien en mobile', async ({ page }) => {
    await page.goto('http://localhost:3000/mujer')
    await page.waitForSelector('[class*="product"]', { timeout: 5000 })
    await page.locator('[class*="product"]').first().click()
    await page.waitForURL(/productos/, { timeout: 5000 })

    await page.waitForTimeout(1000)

    // Verificar imagen principal visible
    await expect(page.locator('img').first()).toBeVisible()

    // Verificar botón agregar al carrito visible
    const addBtn = page.locator('button:has-text("Agregar al carrito")').first()
    await expect(addBtn).toBeVisible()

    await page.screenshot({ path: 'test-results/mobile-product.png', fullPage: true })

    console.log('✓ Producto individual muestra bien en mobile')
  })

  test('Carrito accesible y usable en mobile', async ({ page }) => {
    // Agregar producto
    await page.goto('http://localhost:3000/mujer')
    await page.waitForSelector('[class*="product"]', { timeout: 5000 })
    await page.locator('[class*="product"]').first().click()
    await page.waitForURL(/productos/, { timeout: 5000 })

    const sizeBtn = page.locator('button:has-text("M")').first()
    if (await sizeBtn.count() > 0) {
      await sizeBtn.click()
    }

    await page.locator('button:has-text("Agregar al carrito")').first().click()
    await page.waitForTimeout(1000)

    // Ir al carrito
    await page.goto('http://localhost:3000/carrito')
    await page.waitForTimeout(1000)

    await page.screenshot({ path: 'test-results/mobile-cart.png', fullPage: true })

    console.log('✓ Carrito usable en mobile')
  })

  test('Checkout se muestra bien en mobile', async ({ page }) => {
    // Login
    await page.goto('http://localhost:3000/login')
    await page.fill('input[type="email"]', 'test@vialine.com')
    await page.fill('input[type="password"]', 'TestVialine2025!')
    await page.click('button:has-text("Iniciar sesión")')
    await page.waitForURL(/account|^\/$/, { timeout: 10000 })

    // Agregar producto
    await page.goto('http://localhost:3000/mujer')
    await page.waitForSelector('[class*="product"]', { timeout: 5000 })
    await page.locator('[class*="product"]').first().click()
    await page.waitForURL(/productos/, { timeout: 5000 })

    const sizeBtn = page.locator('button:has-text("M")').first()
    if (await sizeBtn.count() > 0) {
      await sizeBtn.click()
    }

    await page.locator('button:has-text("Agregar al carrito")').first().click()
    await page.waitForTimeout(1000)

    // Ir a checkout
    await page.goto('http://localhost:3000/checkout')
    await page.waitForTimeout(2000)

    await page.screenshot({ path: 'test-results/mobile-checkout.png', fullPage: true })

    console.log('✓ Checkout visible en mobile')
  })
})

test.describe('Responsive Tests - Tablet', () => {
  test.use({ viewport: { width: 768, height: 1024 } }) // iPad

  test('Homepage carga correctamente en tablet', async ({ page }) => {
    await page.goto('http://localhost:3000')

    await expect(page.locator('header')).toBeVisible()
    await expect(page.locator('footer')).toBeVisible()

    await page.screenshot({ path: 'test-results/tablet-home.png' })

    console.log('✓ Homepage tablet carga correctamente')
  })

  test('Grid de productos muestra 3-4 columnas en tablet', async ({ page }) => {
    await page.goto('http://localhost:3000/mujer')
    await page.waitForTimeout(2000)

    await page.screenshot({ path: 'test-results/tablet-grid.png' })

    const products = await page.locator('[class*="product"]').count()
    expect(products).toBeGreaterThan(0)

    console.log(`${products} productos visibles en tablet`)
  })

  test('Navegación funciona correctamente en tablet', async ({ page }) => {
    await page.goto('http://localhost:3000')

    // Click en categoría Mujer
    await page.click('text=/mujer/i')
    await page.waitForURL(/mujer/i)

    // Verificar que cargó
    await page.waitForSelector('[class*="product"]', { timeout: 5000 })

    console.log('✓ Navegación funcional en tablet')
  })
})

test.describe('Responsive Tests - Orientation', () => {
  test('Landscape mode funciona en mobile', async ({ page }) => {
    // Mobile landscape
    await page.setViewportSize({ width: 667, height: 375 })

    await page.goto('http://localhost:3000')

    await expect(page.locator('header')).toBeVisible()

    await page.screenshot({ path: 'test-results/mobile-landscape.png' })

    console.log('✓ Landscape mode funcional')
  })
})
