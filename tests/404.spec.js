import { test, expect } from '@playwright/test';

test('404 page displays correctly for non-existent routes', async ({ page }) => {
  await page.goto('/non-existent-page');
  await expect(page.getByText('404')).toBeVisible();
  await expect(page.getByRole('heading', { name: /Page not found/i })).toBeVisible();
  await expect(page.getByText(/Sorry, the page you're looking for doesn't exist/i)).toBeVisible();
  await expect(page.getByRole('link', { name: /Return to homepage/i })).toBeVisible();
});

test('404 page back button navigates to homepage', async ({ page }) => {
  await page.goto('/non-existent-page');
  
  await page.getByRole('link', { name: /Return to homepage/i }).click();
  
  await expect(page).toHaveURL('/');
});
