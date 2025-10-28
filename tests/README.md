# Playwright Testing Guide

Esta carpeta contiene las pruebas E2E (end-to-end) de Vialine usando Playwright.

## 🚀 Comandos disponibles

```bash
# Ejecutar todas las pruebas (sin interfaz gráfica)
npm test

# Ejecutar pruebas con interfaz gráfica (modo debug)
npm run test:ui

# Ejecutar pruebas viendo el navegador
npm run test:headed

# Ver reporte de la última ejecución
npm run test:report
```

## 📝 Cómo escribir pruebas

Las pruebas están en archivos con extensión `.spec.ts`. Ejemplo:

```typescript
import { test, expect } from '@playwright/test'

test('mi primera prueba', async ({ page }) => {
  // 1. Navegar a una página
  await page.goto('/')

  // 2. Interactuar con elementos
  await page.click('button')
  await page.fill('input[name="email"]', 'test@example.com')

  // 3. Verificar resultados
  await expect(page).toHaveURL('/success')
  await expect(page.locator('h1')).toContainText('Éxito')
})
```

## 🎯 Qué pruebas están incluidas

El archivo `example.spec.ts` incluye pruebas básicas para:

- ✅ Carga de página principal
- ✅ Navegación a categoría Mujer
- ✅ Navegación a categoría Niña
- ✅ Acceso al carrito

## 📚 Recursos útiles

- [Documentación oficial de Playwright](https://playwright.dev)
- [Guía de selectores](https://playwright.dev/docs/selectors)
- [API Reference](https://playwright.dev/docs/api/class-playwright)

## 🔍 Navegadores configurados

Las pruebas se ejecutan en:

- **Desktop:** Chrome, Firefox, Safari (WebKit)
- **Mobile:** Chrome (Pixel 5), Safari (iPhone 12)

## ⚙️ Configuración

La configuración está en `playwright.config.ts` en la raíz del proyecto.

**Importante:** Las pruebas automáticamente inician el servidor de desarrollo (`npm run dev`) antes de ejecutarse, y lo detienen al finalizar.
