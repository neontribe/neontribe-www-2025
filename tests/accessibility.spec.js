import { test, expect } from '@playwright/test';

test.describe('Accessibility Tests', () => {
  test('skip link functionality', async ({ page }) => {
    await page.goto('/');
    
    // Check that skip link exists and is hidden by default
    const skipLink = page.locator('a[href="#content"]');
    await expect(skipLink).toBeVisible();
  
    await expect(skipLink).toHaveClass(/sr-only/);
    await skipLink.focus();
    await expect(skipLink).toHaveClass(/focus:not-sr-only/);
  });

  test('semantic HTML structure', async ({ page }) => {
    await page.goto('/');
    
    const main = page.locator('main#content');
    await expect(main).toBeVisible();
    
    const header = page.locator('header').first();
    await expect(header).toBeVisible();
    
    const footer = page.locator('footer').first();
    await expect(footer).toBeVisible();
    
    const nav = page.locator('nav').first();
    await expect(nav).toBeVisible();
  });

});
