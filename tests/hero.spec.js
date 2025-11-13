import { test, expect } from '@playwright/test';

test('Hero section displays on homepage', async ({ page }) => {
  await page.goto('/');
  
  const heroHeading = page.getByRole('heading', { name: /Digital services committed to tech for good/i });
  await expect(heroHeading).toBeVisible();
});

