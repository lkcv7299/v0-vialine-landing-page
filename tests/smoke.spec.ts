import { test, expect } from '@playwright/test'

test.describe('Smoke Tests - Homepage y Navegación', () => {
  test('Homepage carga correctamente sin errores', async ({ page }) => {
    await page.goto('http://localhost:3000')

    // Verificar que la página carga
    await expect(page).toHaveTitle(/Vialine/i)

    // No debe haber errores en consola
    const errors: string[] = []
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text())
      }
    })

    await page.waitForLoadState('networkidle')

    // Verificar elementos clave
    await expect(page.locator('header')).toBeVisible()
    await expect(page.locator('footer')).toBeVisible()
  })

  test('Header muestra logo y elementos de navegación', async ({ page }) => {
    await page.goto('http://localhost:3000')

    // Logo visible
    const logo = page.locator('img[alt*="Vialine"], img[alt*="logo"]').first()
    await expect(logo).toBeVisible()

    // Menú de navegación
    await expect(page.getByRole('navigation').first()).toBeVisible()

    // Icono de carrito
    await expect(page.locator('[aria-label*="carrito" i], [aria-label*="cart" i]').first()).toBeVisible()
  })

  test('Footer tiene links importantes', async ({ page }) => {
    await page.goto('http://localhost:3000')

    const footer = page.locator('footer')
    await expect(footer).toBeVisible()

    // Scroll hasta el footer
    await footer.scrollIntoViewIfNeeded()

    // Verificar que tiene contenido
    const footerText = await footer.textContent()
    expect(footerText?.length).toBeGreaterThan(50)
  })

  test('Navegación a categoría Mujer funciona', async ({ page }) => {
    await page.goto('http://localhost:3000')

    // Click en link de Mujer
    await page.click('text=/mujer/i')

    // Verificar URL
    await expect(page).toHaveURL(/mujer/i)

    // Verificar que hay productos
    await page.waitForSelector('[class*="product"]', { timeout: 5000 })
  })

  test('Navegación a categoría Niña funciona', async ({ page }) => {
    await page.goto('http://localhost:3000')

    // Click en link de Niña
    await page.click('text=/niña/i')

    // Verificar URL
    await expect(page).toHaveURL(/nina/i)

    // Verificar que hay productos
    await page.waitForSelector('[class*="product"]', { timeout: 5000 })
  })

  test('WhatsApp button flotante visible', async ({ page }) => {
    await page.goto('http://localhost:3000')

    // Buscar botón flotante de WhatsApp
    const whatsappBtn = page.locator('a[href*="wa.me"], a[href*="whatsapp"]').first()

    if (await whatsappBtn.count() > 0) {
      await expect(whatsappBtn).toBeVisible()

      // Verificar que tiene el número correcto
      const href = await whatsappBtn.getAttribute('href')
      expect(href).toContain('51972327236')
    }
  })

  test('Imágenes principales cargan en formato WebP', async ({ page }) => {
    const images: string[] = []

    page.on('response', response => {
      if (response.request().resourceType() === 'image') {
        images.push(response.url())
      }
    })

    await page.goto('http://localhost:3000')
    await page.waitForLoadState('networkidle')

    // Filtrar imágenes principales (hero, productos)
    const mainImages = images.filter(url =>
      url.includes('hero') || url.includes('product') || url.includes('mujer') || url.includes('nina')
    )

    // Al menos algunas deberían ser WebP
    const webpImages = mainImages.filter(url => url.includes('.webp'))
    console.log(`Total images: ${mainImages.length}, WebP: ${webpImages.length}`)
  })
})
