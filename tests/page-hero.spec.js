import { test, expect } from '@playwright/test';

test('PageHero displays title and subtitle on case studies page', async ({ page }) => {
  await page.goto('/case-studies');
  
  const heading = page.getByRole('heading', { name: 'Case studies' });
  await expect(heading).toBeVisible();
  
  const subtitle = page.getByText(/A brief description of the case studies/i);
  await expect(subtitle).toBeVisible();
});

test('PageHero displays correctly on how-we-work page', async ({ page }) => {
  await page.goto('/how-we-work');
  
  const heading = page.getByRole('heading', { name: 'How we work' });
  await expect(heading).toBeVisible();
});

test('PageHero displays correctly on advice-service page', async ({ page }) => {
  await page.goto('/advice-service');
  
  const heading = page.getByRole('heading', { name: 'Advice service' });
  await expect(heading).toBeVisible();
});

test('PageHero displays correctly on talk-to-us page', async ({ page }) => {
  await page.goto('/talk-to-us');
  
  const heading = page.getByRole('heading', { name: 'Talk to us' });
  await expect(heading).toBeVisible();
});

