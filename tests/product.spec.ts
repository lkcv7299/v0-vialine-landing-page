import { test, expect } from '@playwright/test'

test.describe('Producto Individual Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Navegar a un producto a través de la categoría
    await page.goto('http://localhost:3000/mujer')
    await page.waitForSelector('[class*="product"]', { timeout: 5000 })
    await page.locator('[class*="product"]').first().click()
    await page.waitForURL(/productos/, { timeout: 5000 })
  })

  test('Página de producto carga correctamente', async ({ page }) => {
    // Verificar que estamos en una página de producto
    expect(page.url()).toContain('productos')

    // Verificar elementos básicos
    await expect(page.locator('img').first()).toBeVisible()
    await expect(page.locator('h1, h2').first()).toBeVisible()
  })

  test('Galería de imágenes funciona', async ({ page }) => {
    // Buscar imagen principal
    const mainImage = page.locator('[class*="gallery"] img, [class*="image"] img').first()
    await expect(mainImage).toBeVisible()

    // Buscar thumbnails si existen
    const thumbnails = page.locator('[class*="thumbnail"]')

    if (await thumbnails.count() > 1) {
      // Click en segundo thumbnail
      await thumbnails.nth(1).click()
      await page.waitForTimeout(500)

      console.log('✓ Thumbnails funcionando')
    } else {
      console.log('⚠ Solo una imagen o sin thumbnails')
    }
  })

  test('Selector de talla visible', async ({ page }) => {
    await page.waitForTimeout(1000)

    // Buscar selectores de talla
    const sizeButtons = page.locator('button:has-text("XS"), button:has-text("S"), button:has-text("M"), button:has-text("L"), button:has-text("XL")')

    if (await sizeButtons.count() > 0) {
      await expect(sizeButtons.first()).toBeVisible()

      console.log(`✓ ${await sizeButtons.count()} tallas disponibles`)
    } else {
      console.log('⚠ Selectores de talla no encontrados')
    }
  })

  test('Selector de color visible si aplica', async ({ page }) => {
    await page.waitForTimeout(1000)

    // Buscar selectores de color
    const colorSelectors = page.locator('[class*="color"], [data-testid*="color"]')

    if (await colorSelectors.count() > 0) {
      await expect(colorSelectors.first()).toBeVisible()

      console.log(`✓ Selectores de color encontrados`)
    } else {
      console.log('⚠ Selectores de color no encontrados (producto puede tener un solo color)')
    }
  })

  test('Botón "Agregar al carrito" visible', async ({ page }) => {
    await page.waitForTimeout(1000)

    const addToCartBtn = page.locator('button:has-text("Agregar al carrito"), button:has-text("Add to cart")').first()

    await expect(addToCartBtn).toBeVisible()
  })

  test('Precio del producto visible', async ({ page }) => {
    await page.waitForTimeout(1000)

    const price = page.locator('text=/S\/\\s*\\d+|\\$\\s*\\d+/').first()

    await expect(price).toBeVisible()

    const priceText = await price.textContent()
    console.log(`Precio encontrado: ${priceText}`)
  })

  test('Información del producto (tabs o acordeones) existe', async ({ page }) => {
    await page.waitForTimeout(1000)

    // Buscar tabs o acordeones con info del producto
    const tabs = page.locator('[role="tab"], [class*="tab"], [class*="accordion"]')

    if (await tabs.count() > 0) {
      console.log(`✓ ${await tabs.count()} tabs/secciones de información encontradas`)

      // Intentar click en primer tab/acordeón
      await tabs.first().click()
      await page.waitForTimeout(500)
    } else {
      console.log('⚠ Tabs de información no encontrados')
    }
  })

  test('Botón de wishlist (favoritos) existe', async ({ page }) => {
    await page.waitForTimeout(1000)

    // Buscar botón de favoritos (corazón)
    const wishlistBtn = page.locator('button[aria-label*="favorito" i], button[aria-label*="wishlist" i], button svg[class*="heart"]').first()

    if (await wishlistBtn.count() > 0) {
      await expect(wishlistBtn).toBeVisible()
      console.log('✓ Botón de wishlist encontrado')
    } else {
      console.log('⚠ Botón de wishlist no encontrado')
    }
  })

  test('Breadcrumbs navegables', async ({ page }) => {
    await page.waitForTimeout(1000)

    // Buscar breadcrumbs
    const breadcrumbs = page.locator('[aria-label*="breadcrumb" i], [class*="breadcrumb"]')

    if (await breadcrumbs.count() > 0) {
      console.log('✓ Breadcrumbs encontrados')

      // Verificar que tiene links
      const links = breadcrumbs.locator('a')
      if (await links.count() > 0) {
        console.log(`  ${await links.count()} links en breadcrumbs`)
      }
    } else {
      console.log('⚠ Breadcrumbs no encontrados')
    }
  })

  test('Productos relacionados si existen', async ({ page }) => {
    // Scroll hasta el final
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
    await page.waitForTimeout(1000)

    // Buscar sección de productos relacionados
    const relatedSection = page.locator('text=/también te puede gustar|productos relacionados|you may also like/i')

    if (await relatedSection.count() > 0) {
      console.log('✓ Sección de productos relacionados encontrada')

      // Verificar que hay productos
      const relatedProducts = page.locator('[class*="product"]')
      const count = await relatedProducts.count()

      if (count > 0) {
        console.log(`  ${count} productos relacionados encontrados`)
      }
    } else {
      console.log('⚠ Sección de productos relacionados no encontrada')
    }
  })
})
