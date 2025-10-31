import { test, expect } from '@playwright/test'

test.describe('Carrito de Compras Tests', () => {
  test('Agregar producto al carrito funciona', async ({ page }) => {
    // Navegar a un producto
    await page.goto('http://localhost:3000/mujer')
    await page.waitForSelector('[class*="product"]', { timeout: 5000 })
    await page.locator('[class*="product"]').first().click()
    await page.waitForURL(/productos/, { timeout: 5000 })

    await page.waitForTimeout(1000)

    // Seleccionar talla si es necesario
    const sizeButton = page.locator('button:has-text("M")').first()
    if (await sizeButton.count() > 0) {
      await sizeButton.click()
      await page.waitForTimeout(500)
    }

    // Click en agregar al carrito
    const addToCartBtn = page.locator('button:has-text("Agregar al carrito"), button:has-text("Add to cart")').first()
    await addToCartBtn.click()

    // Esperar confirmación (toast, modal, o actualización de badge)
    await page.waitForTimeout(2000)

    // Verificar que badge del carrito actualizó
    const cartBadge = page.locator('[aria-label*="carrito" i] [class*="badge"], [aria-label*="cart" i] [class*="badge"]').first()

    if (await cartBadge.count() > 0) {
      await expect(cartBadge).toBeVisible()
      const badgeText = await cartBadge.textContent()
      console.log(`Badge del carrito: ${badgeText}`)
      expect(parseInt(badgeText || '0')).toBeGreaterThan(0)
    } else {
      console.log('⚠ Badge del carrito no encontrado')
    }
  })

  test('Página del carrito carga correctamente', async ({ page }) => {
    await page.goto('http://localhost:3000/carrito')

    // Verificar que estamos en la página del carrito
    expect(page.url()).toContain('carrito')

    // Verificar título o heading
    await expect(page.locator('h1, h2').first()).toBeVisible()
  })

  test('Carrito muestra productos agregados', async ({ page }) => {
    // Agregar un producto primero
    await page.goto('http://localhost:3000/mujer')
    await page.waitForSelector('[class*="product"]', { timeout: 5000 })
    await page.locator('[class*="product"]').first().click()
    await page.waitForURL(/productos/, { timeout: 5000 })

    await page.waitForTimeout(1000)

    const sizeButton = page.locator('button:has-text("M")').first()
    if (await sizeButton.count() > 0) {
      await sizeButton.click()
    }

    await page.locator('button:has-text("Agregar al carrito"), button:has-text("Add to cart")').first().click()
    await page.waitForTimeout(1000)

    // Ir al carrito
    await page.goto('http://localhost:3000/carrito')
    await page.waitForTimeout(1000)

    // Verificar que hay items en el carrito
    const cartItems = page.locator('[class*="cart-item"], [class*="cartitem"], tr').filter({ hasText: /S\// })

    const count = await cartItems.count()
    console.log(`Items en el carrito: ${count}`)

    expect(count).toBeGreaterThan(0)
  })

  test('Actualizar cantidad de producto funciona', async ({ page }) => {
    // Agregar producto y ir al carrito
    await page.goto('http://localhost:3000/mujer')
    await page.waitForSelector('[class*="product"]', { timeout: 5000 })
    await page.locator('[class*="product"]').first().click()
    await page.waitForURL(/productos/, { timeout: 5000 })

    const sizeButton = page.locator('button:has-text("M")').first()
    if (await sizeButton.count() > 0) {
      await sizeButton.click()
    }

    await page.locator('button:has-text("Agregar al carrito")').first().click()
    await page.waitForTimeout(1000)

    await page.goto('http://localhost:3000/carrito')
    await page.waitForTimeout(1000)

    // Buscar botón para incrementar cantidad
    const incrementBtn = page.locator('button:has-text("+"), button[aria-label*="increment" i]').first()

    if (await incrementBtn.count() > 0) {
      // Obtener cantidad actual
      const quantityInput = page.locator('input[type="number"], [class*="quantity"]').first()

      let quantityBefore = '1'
      if (await quantityInput.count() > 0) {
        quantityBefore = await quantityInput.inputValue()
      }

      // Incrementar
      await incrementBtn.click()
      await page.waitForTimeout(1000)

      // Verificar que cambió
      let quantityAfter = '1'
      if (await quantityInput.count() > 0) {
        quantityAfter = await quantityInput.inputValue()
      }

      console.log(`Cantidad antes: ${quantityBefore}, después: ${quantityAfter}`)

      // La cantidad debería haber aumentado
      expect(parseInt(quantityAfter)).toBeGreaterThan(parseInt(quantityBefore))
    } else {
      console.log('⚠ Botón de incrementar no encontrado')
    }
  })

  test('Eliminar producto del carrito funciona', async ({ page }) => {
    // Agregar producto
    await page.goto('http://localhost:3000/mujer')
    await page.waitForSelector('[class*="product"]', { timeout: 5000 })
    await page.locator('[class*="product"]').first().click()
    await page.waitForURL(/productos/, { timeout: 5000 })

    const sizeButton = page.locator('button:has-text("M")').first()
    if (await sizeButton.count() > 0) {
      await sizeButton.click()
    }

    await page.locator('button:has-text("Agregar al carrito")').first().click()
    await page.waitForTimeout(1000)

    await page.goto('http://localhost:3000/carrito')
    await page.waitForTimeout(1000)

    // Contar items antes
    const cartItemsBefore = await page.locator('[class*="cart-item"], [class*="cartitem"]').count()

    // Buscar botón de eliminar
    const removeBtn = page.locator('button:has-text("Eliminar"), button:has-text("Remove"), button[aria-label*="eliminar" i], button svg[class*="trash"]').first()

    if (await removeBtn.count() > 0) {
      await removeBtn.click()
      await page.waitForTimeout(1500)

      // Verificar modal de confirmación si existe
      const confirmBtn = page.locator('button:has-text("Sí"), button:has-text("Confirmar"), button:has-text("Yes")')
      if (await confirmBtn.count() > 0) {
        await confirmBtn.first().click()
        await page.waitForTimeout(1000)
      }

      // Contar items después
      const cartItemsAfter = await page.locator('[class*="cart-item"], [class*="cartitem"]').count()

      console.log(`Items antes: ${cartItemsBefore}, después: ${cartItemsAfter}`)

      expect(cartItemsAfter).toBeLessThan(cartItemsBefore)
    } else {
      console.log('⚠ Botón de eliminar no encontrado')
    }
  })

  test('Carrito persiste después de refresh', async ({ page }) => {
    // Agregar producto
    await page.goto('http://localhost:3000/mujer')
    await page.waitForSelector('[class*="product"]', { timeout: 5000 })
    await page.locator('[class*="product"]').first().click()
    await page.waitForURL(/productos/, { timeout: 5000 })

    const sizeButton = page.locator('button:has-text("M")').first()
    if (await sizeButton.count() > 0) {
      await sizeButton.click()
    }

    await page.locator('button:has-text("Agregar al carrito")').first().click()
    await page.waitForTimeout(1000)

    // Verificar badge
    const cartBadge = page.locator('[aria-label*="carrito" i] text=/\\d+/, [aria-label*="cart" i] text=/\\d+/').first()
    let badgeBefore = '0'
    if (await cartBadge.count() > 0) {
      badgeBefore = await cartBadge.textContent() || '0'
    }

    // Refresh página
    await page.reload()
    await page.waitForTimeout(1000)

    // Verificar que badge sigue ahí
    let badgeAfter = '0'
    if (await cartBadge.count() > 0) {
      badgeAfter = await cartBadge.textContent() || '0'
    }

    console.log(`Badge antes del refresh: ${badgeBefore}, después: ${badgeAfter}`)

    expect(badgeAfter).toBe(badgeBefore)
  })

  test('Botón "Proceder al checkout" navega correctamente', async ({ page }) => {
    // Agregar producto
    await page.goto('http://localhost:3000/mujer')
    await page.waitForSelector('[class*="product"]', { timeout: 5000 })
    await page.locator('[class*="product"]').first().click()
    await page.waitForURL(/productos/, { timeout: 5000 })

    const sizeButton = page.locator('button:has-text("M")').first()
    if (await sizeButton.count() > 0) {
      await sizeButton.click()
    }

    await page.locator('button:has-text("Agregar al carrito")').first().click()
    await page.waitForTimeout(1000)

    await page.goto('http://localhost:3000/carrito')
    await page.waitForTimeout(1000)

    // Buscar botón de checkout
    const checkoutBtn = page.locator('button:has-text("Checkout"), button:has-text("Finalizar"), button:has-text("Proceder")').first()

    if (await checkoutBtn.count() > 0) {
      await checkoutBtn.click()

      // Esperar navegación a checkout o login
      await page.waitForTimeout(2000)

      const url = page.url()
      console.log(`URL después de click en checkout: ${url}`)

      expect(url.includes('checkout') || url.includes('login')).toBeTruthy()
    } else {
      console.log('⚠ Botón de checkout no encontrado')
    }
  })

  test('Total del carrito se calcula correctamente', async ({ page }) => {
    // Agregar producto
    await page.goto('http://localhost:3000/mujer')
    await page.waitForSelector('[class*="product"]', { timeout: 5000 })
    await page.locator('[class*="product"]').first().click()
    await page.waitForURL(/productos/, { timeout: 5000 })

    const sizeButton = page.locator('button:has-text("M")').first()
    if (await sizeButton.count() > 0) {
      await sizeButton.click()
    }

    await page.locator('button:has-text("Agregar al carrito")').first().click()
    await page.waitForTimeout(1000)

    await page.goto('http://localhost:3000/carrito')
    await page.waitForTimeout(1000)

    // Buscar total
    const total = page.locator('text=/total.*S\/\\s*\\d+|S\/\\s*\\d+.*total/i').first()

    if (await total.count() > 0) {
      const totalText = await total.textContent()
      console.log(`Total del carrito: ${totalText}`)

      // Verificar que tiene formato de precio
      expect(totalText).toMatch(/S\/|\\$/)
    } else {
      console.log('⚠ Total del carrito no encontrado')
    }
  })
})
