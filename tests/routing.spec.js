import { test, expect } from '@playwright/test';

test('core routes load successfully', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Neontribe/);
  

  await page.goto('/case-studies');
  await expect(page.getByRole('heading', { name: 'Case studies' })).toBeVisible();
  await page.goto('/how-we-work');
  await expect(page.getByRole('heading', { name: 'How we work' })).toBeVisible();
  
 
  await page.goto('/advice-service');
  await expect(page.getByRole('heading', { name: 'Advice service' })).toBeVisible();
  
  await page.goto('/talk-to-us');
  await expect(page.getByRole('heading', { name: 'Talk to us' })).toBeVisible();

  await page.goto('/case-studies/arc');
  await expect(page.getByRole('heading', { name: 'Helping Alexandra Rose Charity support vulnerable families' })).toBeVisible();
});

test('navigation links work', async ({ page }) => {
  await page.goto('/');
  
  // Test header navigation
  await page.click('a[href="/case-studies"]');
  await expect(page.getByRole('heading', { name: 'Case studies' })).toBeVisible();
  
  await page.click('a[href="/how-we-work"]');
  await expect(page.getByRole('heading', { name: 'How we work' })).toBeVisible();
  
  await page.click('a[href="/advice-service"]');
  await expect(page.getByRole('heading', { name: 'Advice service' })).toBeVisible();
});

test('case study link from listing page', async ({ page }) => {
  await page.goto('/case-studies');
  

  await page.click('a[href="/case-studies/arc"]');
  await expect(page.getByRole('heading', { name: 'Helping Alexandra Rose Charity support vulnerable families' })).toBeVisible();
});

