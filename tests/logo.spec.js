import { test, expect } from '@playwright/test';

test.describe('Logo Component', () => {
  test('renders logo image with correct alt text', async ({ page }) => {
    // Check if logo component is used on a page (via Footer which uses neontribe-logo)
    await page.goto('/');
    
    const logo = page.locator('footer img[alt="Neontribe logo"]');
    await expect(logo).toBeVisible();
  });

  test('logo has proper accessibility attributes', async ({ page }) => {
    await page.goto('/');
    
    const logo = page.locator('footer img[alt="Neontribe logo"]');
    await expect(logo).toHaveAttribute('alt', 'Neontribe logo');
  });

  test('logo is properly sized', async ({ page }) => {
    await page.goto('/');
    
    const logo = page.locator('footer img[alt="Neontribe logo"]');
    await expect(logo).toHaveClass(/h-8/);
  });
});

