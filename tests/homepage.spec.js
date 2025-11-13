import { test, expect } from '@playwright/test';

test('Homepage displays all main sections', async ({ page }) => {
  await page.goto('/');
  
  // Hero section
  await expect(page.getByRole('heading', { name: /Digital services committed to tech for good/i })).toBeVisible();
  
  // OurLatestWork section
  await expect(page.getByText(/Our latest work/i)).toBeVisible();
  
  // HowWeCanHelp section
  await expect(page.getByRole('heading', { name: /How we can help/i })).toBeVisible();
  
  // QuoteSection
  await expect(page.getByRole('heading', { name: /Who we've been working with/i })).toBeVisible();
  
  // GetInTouch section
  await expect(page.getByRole('heading', { name: /Get in touch/i })).toBeVisible();
});

