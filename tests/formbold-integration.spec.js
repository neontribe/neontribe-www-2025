import { test, expect } from '@playwright/test';

test.describe('FormBold Integration', () => {
  test('Talk to us form submits to FormBold and shows success message', async ({ page }) => {
    await page.goto('/talk-to-us');
    
    // Mock FormBold response
    await page.route('**/formbold.com/**', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'text/html',
        body: '<html><body>Success</body></html>',
      });
    });

    // Fill out and submit the form
    await page.locator('input[name="name"]').fill('Test User');
    await page.locator('input[name="email"]').fill('test@example.com');
    await page.locator('textarea[name="message"]').fill('Test message');
    await page.getByRole('button', { name: /^Submit$/i }).click();
    
    // Check success message appears
    const successMessage = page.locator('.form-message-success');
    await expect(successMessage).toBeVisible({ timeout: 5000 });
  });

  test('Advice service form submits to FormBold and shows success message', async ({ page }) => {
    await page.goto('/advice-service');
    
    // Mock FormBold response
    await page.route('**/formbold.com/**', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'text/html',
        body: '<html><body>Success</body></html>',
      });
    });

    // Fill out and submit the form
    await page.locator('input[name="name"]').fill('Test User');
    await page.locator('input[name="email"]').fill('test@example.com');
    await page.locator('input[name="contact_preference"]').fill('Email');
    await page.locator('input[name="organisation"]').fill('Test Org');
    await page.locator('textarea[name="problem"]').fill('Test problem');
    await page.getByRole('button', { name: /^Submit$/i }).click();
    
    // Check success message appears
    const successMessage = page.locator('.form-message-success');
    await expect(successMessage).toBeVisible({ timeout: 5000 });
  });

  test('Forms use FormBold endpoint', async ({ page }) => {
    await page.goto('/talk-to-us');
    
    const form = page.locator('form[data-formbold-form]');
    const action = await form.getAttribute('action');
    
    expect(action).toContain('formbold.com');
    await expect(form).toHaveAttribute('method', 'post');
  });
});
