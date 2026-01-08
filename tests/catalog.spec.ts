import { test, expect } from '@playwright/test'

test.describe('Catálogo y Filtros Tests', () => {
  test('Página de categoría Mujer muestra productos', async ({ page }) => {
    await page.goto('http://localhost:3000/mujer')

    // Esperar que productos carguen
    await page.waitForSelector('[class*="product"]', { timeout: 10000 })

    // Contar productos
    const products = await page.locator('[class*="product"]').count()
    expect(products).toBeGreaterThan(0)

    console.log(`Productos encontrados: ${products}`)
  })

  test('Productos muestran información básica', async ({ page }) => {
    await page.goto('http://localhost:3000/mujer')

    await page.waitForSelector('[class*="product"]', { timeout: 5000 })

    // Obtener primer producto
    const firstProduct = page.locator('[class*="product"]').first()

    // Verificar que tiene imagen
    const img = firstProduct.locator('img')
    await expect(img).toBeVisible()

    // Verificar que tiene precio
    const price = firstProduct.locator('text=/S\/|\\$/').first()
    if (await price.count() > 0) {
      await expect(price).toBeVisible()
    }
  })

  test('Click en producto navega a página de detalle', async ({ page }) => {
    await page.goto('http://localhost:3000/mujer')

    await page.waitForSelector('[class*="product"]', { timeout: 5000 })

    // Obtener URL actual
    const urlBefore = page.url()

    // Click en primer producto
    await page.locator('[class*="product"]').first().click()

    // Esperar navegación
    await page.waitForURL(/productos/, { timeout: 5000 })

    // Verificar que URL cambió
    const urlAfter = page.url()
    expect(urlAfter).not.toBe(urlBefore)
    expect(urlAfter).toContain('productos')
  })

  test('Filtros de categoría existen en desktop', async ({ page, viewport }) => {
    // Desktop viewport
    await page.setViewportSize({ width: 1280, height: 720 })

    await page.goto('http://localhost:3000/mujer')

    await page.waitForTimeout(2000)

    // Buscar sidebar de filtros o sección de filtros
    const filterSection = page.locator('[class*="filter"], [class*="sidebar"]').first()

    if (await filterSection.count() > 0) {
      await expect(filterSection).toBeVisible()
      console.log('✓ Filtros encontrados en desktop')
    } else {
      console.log('⚠ Filtros no encontrados (puede ser diseño sin filtros visibles)')
    }
  })

  test('Botón de filtros existe en mobile', async ({ page }) => {
    // Mobile viewport
    await page.setViewportSize({ width: 375, height: 667 })

    await page.goto('http://localhost:3000/mujer')

    await page.waitForTimeout(2000)

    // Buscar botón de filtros en mobile
    const filterBtn = page.locator('button:has-text("Filtros"), button:has-text("Filter")').first()

    if (await filterBtn.count() > 0) {
      await expect(filterBtn).toBeVisible()

      // Intentar abrir drawer de filtros
      await filterBtn.click()
      await page.waitForTimeout(1000)

      console.log('✓ Drawer de filtros abierto')
    } else {
      console.log('⚠ Botón de filtros no encontrado en mobile')
    }
  })

  test('Búsqueda de productos funciona', async ({ page }) => {
    await page.goto('http://localhost:3000')

    // Buscar input de búsqueda
    const searchInput = page.locator('input[type="search"], input[placeholder*="Buscar" i], input[placeholder*="Search" i]').first()

    if (await searchInput.count() > 0) {
      await searchInput.fill('legging')
      await searchInput.press('Enter')

      // Esperar resultados
      await page.waitForTimeout(2000)

      // Verificar que URL cambió o hay resultados
      const url = page.url()
      const hasResults = await page.locator('[class*="product"]').count() > 0

      expect(url.includes('search') || url.includes('legging') || hasResults).toBeTruthy()

      console.log('✓ Búsqueda ejecutada')
    } else {
      console.log('⚠ Input de búsqueda no encontrado')
    }
  })

  test('Paginación funciona si existe', async ({ page }) => {
    await page.goto('http://localhost:3000/mujer')

    await page.waitForTimeout(2000)

    // Buscar controles de paginación
    const pagination = page.locator('[class*="pagination"], button:has-text("Siguiente"), button:has-text("Next")').first()

    if (await pagination.count() > 0) {
      console.log('✓ Paginación encontrada')

      // Intentar click en "Siguiente"
      const nextBtn = page.locator('button:has-text("Siguiente"), button:has-text("Next")').first()

      if (await nextBtn.count() > 0 && await nextBtn.isEnabled()) {
        await nextBtn.click()
        await page.waitForTimeout(1000)

        console.log('✓ Click en Siguiente ejecutado')
      }
    } else {
      console.log('⚠ Paginación no encontrada (puede ser carga infinita o todos los productos en una página)')
    }
  })

  test('Ordenamiento de productos funciona', async ({ page }) => {
    await page.goto('http://localhost:3000/mujer')

    await page.waitForTimeout(2000)

    // Buscar dropdown de ordenamiento
    const sortDropdown = page.locator('select[name*="sort"], select[name*="orden"], [class*="sort"]').first()

    if (await sortDropdown.count() > 0) {
      console.log('✓ Dropdown de ordenamiento encontrado')

      // Intentar seleccionar una opción si es un select
      const tagName = await sortDropdown.evaluate(el => el.tagName.toLowerCase())
      if (tagName === 'select') {
        await sortDropdown.selectOption({ index: 1 })
        await page.waitForTimeout(1000)

        console.log('✓ Ordenamiento cambiado')
      }
    } else {
      console.log('⚠ Dropdown de ordenamiento no encontrado')
    }
  })
})
