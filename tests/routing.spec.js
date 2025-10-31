import { test, expect } from '@playwright/test';

test('core routes load successfully', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Neontribe/);
  

  await page.goto('/case-studies');
  await expect(page.getByRole('heading')).toHaveText('Case studies');
  
  
  await page.goto('/how-we-work');
  await expect(page.getByRole('heading')).toHaveText('How we work');
  
 
  await page.goto('/advice-service');
  await expect(page.getByRole('heading')).toHaveText('Advice service');
  
  await page.goto('/talk-to-us');
  await expect(page.getByRole('heading', { name: 'Talk to us' })).toBeVisible();

  await page.goto('/case-studies/arc');
  await expect(page.locator('h1.text-4xl')).toHaveText('Helping Alexandra Rose Charity support vulnerable families');
});

test('navigation links work', async ({ page }) => {
  await page.goto('/');
  
  // Test header navigation
  await page.click('a[href="/case-studies"]');
  await expect(page.getByRole('heading')).toHaveText('Case studies');
  
  await page.click('a[href="/how-we-work"]');
  await expect(page.getByRole('heading')).toHaveText('How we work');
  
  await page.click('a[href="/advice-service"]');
  await expect(page.getByRole('heading')).toHaveText('Advice service');
});

test('case study link from listing page', async ({ page }) => {
  await page.goto('/case-studies');
  

  await page.click('a[href="/case-studies/arc"]');
  await expect(page.locator('h1.text-4xl')).toHaveText('Helping Alexandra Rose Charity support vulnerable families');
});

