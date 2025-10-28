import { test, expect } from '@playwright/test'

test.describe('Home Page', () => {
  test('should load the home page successfully', async ({ page }) => {
    await page.goto('/')

    // Wait for the page to load
    await page.waitForLoadState('networkidle')

    // Check if the page has a title
    await expect(page).toHaveTitle(/Vialine/i)
  })

  test('should display the main navigation', async ({ page }) => {
    await page.goto('/')

    // Check if header/navigation is visible
    const navigation = page.locator('header, nav')
    await expect(navigation.first()).toBeVisible()
  })
})

test.describe('Product Pages', () => {
  test('should navigate to Mujer category', async ({ page }) => {
    // Navigate directly to Mujer category page
    await page.goto('/mujer')

    // Wait for page to load
    await page.waitForLoadState('networkidle')

    // Verify URL
    await expect(page).toHaveURL(/.*mujer/)

    // Verify page loaded - check for heading or products
    // Use a more specific selector that works on both desktop and mobile
    const pageContent = page.locator('h1, h2, [class*="product"]')
    await expect(pageContent.first()).toBeVisible()
  })

  test('should navigate to Niña category', async ({ page }) => {
    // Navigate directly to Niña category page
    await page.goto('/nina')

    // Wait for page to load
    await page.waitForLoadState('networkidle')

    // Verify URL
    await expect(page).toHaveURL(/.*nina/)

    // Verify page loaded - check for heading or products
    // Use a more specific selector that works on both desktop and mobile
    const pageContent = page.locator('h1, h2, [class*="product"]')
    await expect(pageContent.first()).toBeVisible()
  })
})

test.describe('Shopping Cart', () => {
  test('should be able to access cart page', async ({ page }) => {
    await page.goto('/carrito')

    // Wait for the page to load
    await page.waitForLoadState('networkidle')

    // Verify we're on the cart page
    await expect(page).toHaveURL(/.*carrito/)
  })
})
