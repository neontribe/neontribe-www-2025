import { test, expect } from '@playwright/test';

test('Logo component renders correctly', async ({ page }) => {
  await page.goto('/');
  
  // Check if logo container is visible
  await expect(page.locator('.logo')).toBeVisible();
  
  // Check if all text letters are present
  const logoTexts = page.locator('.logo-text');
  await expect(logoTexts).toHaveCount(8); 
  
  // Check specific letters
  await expect(logoTexts.nth(0)).toHaveText('n');
  await expect(logoTexts.nth(1)).toHaveText('e');
  await expect(logoTexts.nth(2)).toHaveText('n');
  await expect(logoTexts.nth(3)).toHaveText('t');
  await expect(logoTexts.nth(4)).toHaveText('r');
  await expect(logoTexts.nth(5)).toHaveText('i');
  await expect(logoTexts.nth(6)).toHaveText('b');
  await expect(logoTexts.nth(7)).toHaveText('e');
  
  // Check if O halves are present
  await expect(page.locator('.logo-o-half')).toHaveCount(2);
  
  // Check if O halves have correct classes
  await expect(page.locator('.logo-o-left')).toBeVisible();
  await expect(page.locator('.logo-o-right')).toBeVisible();
});

