import { test, expect } from '@playwright/test';

test.describe('Form validation', () => {
  test('Talk to us form shows validation errors for empty required fields', async ({ page }) => {
    await page.goto('/talk-to-us');
    await page.getByRole('button', { name: /^Submit$/i }).click();
    
    await expect(page.getByText(/please enter your name/i)).toBeVisible();
    await expect(page.getByText(/please enter your email address/i)).toBeVisible();
    await expect(page.getByText(/please enter your your enquiry/i)).toBeVisible();
    
    // Fields should be marked as invalid
    const nameInput = page.locator('input[name="name"]');
    await expect(nameInput).toHaveAttribute('aria-invalid', 'true');
  });

  test('validates email format', async ({ page }) => {
    await page.goto('/talk-to-us');
    await page.locator('input[name="name"]').fill('Test User');
    await page.locator('input[name="email"]').fill('invalid-email');
    await page.locator('textarea[name="message"]').fill('Test message');
    await page.getByRole('button', { name: /^Submit$/i }).click();
    
    await expect(page.getByText(/please enter a valid email address/i)).toBeVisible();
  });

  test('clears error message when user starts typing', async ({ page }) => {
    await page.goto('/talk-to-us');
    await page.getByRole('button', { name: /^Submit$/i }).click();
    await expect(page.getByText(/please enter your name/i)).toBeVisible();
    
    // Start typing - error should clear
    await page.locator('input[name="name"]').fill('T');
    await expect(page.getByText(/please enter your name/i)).not.toBeVisible();
  });

  test('Advice service form shows validation errors', async ({ page }) => {
    await page.goto('/advice-service');
    await page.getByRole('button', { name: /^Submit$/i }).click();
    
    // Should show errors for all required fields
    await expect(page.getByText(/please enter your name/i)).toBeVisible();
    await expect(page.getByText(/please enter your email address/i)).toBeVisible();
  });
});

test.describe('Form accessibility', () => {
  test('has proper ARIA attributes and label associations', async ({ page }) => {
    await page.goto('/talk-to-us');
    
    // Check labels are linked 
    const nameInput = page.locator('input[name="name"]');
    await expect(nameInput).toHaveAttribute('aria-required', 'true');
    
    // Check error messages have proper ARIA
    await page.getByRole('button', { name: /^Submit$/i }).click();
    const errorMessage = page.locator('.form-field-error[role="alert"]').first();
    await expect(errorMessage).toHaveAttribute('aria-live', 'polite');
  });
});

