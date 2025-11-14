import { test, expect } from '@playwright/test';

test('OurLatestWork section displays latest case study on homepage', async ({ page }) => {
  await page.goto('/');
  
  // Verify section heading
  await expect(page.getByText(/Our latest work/i)).toBeVisible();
  
  // Verify button links to case study
  const button = page.getByRole('link', { name: /read full case study/i });
  await expect(button).toBeVisible();
  const href = await button.getAttribute('href');
  expect(href).toMatch(/^\/case-studies\/.+/);
});

