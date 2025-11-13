import { test, expect } from '@playwright/test';

test('Footer displays on all pages', async ({ page }) => {
  await page.goto('/');
  
  const footer = page.locator('footer.section.section-dark');
  await expect(footer).toBeVisible();
  
  // Verify logo link
  const logoLink = footer.getByRole('link', { name: /Go to homepage/i });
  await expect(logoLink).toBeVisible();
  await expect(logoLink).toHaveAttribute('href', '/');
  
  // Verify footer links exist
  await expect(page.getByRole('link', { name: /social links/i })).toBeVisible();
  await expect(page.getByRole('link', { name: /privacy policy/i })).toBeVisible();
});

