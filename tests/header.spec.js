// tests/header.spec.ts
import { test, expect } from '@playwright/test';

const NAV_LINKS = [
  { href: '/case-studies', text: 'Case Studies' },
  { href: '/how-we-work', text: 'How We Work' },
  { href: '/advice-service', text: 'Advice Service' },
];

test.describe('Header', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('renders logo', async ({ page }) => {
    // Logo image 
    await expect(page.locator('img[alt*="Neontribe" i]')).toBeVisible();
  });

  test('shows desktop nav links and CTA on desktop', async ({ page }) => {
    // Desktop layout
    await page.setViewportSize({ width: 1280, height: 800 });

    const desktopNav = page.locator('nav[aria-label="Main navigation"]');
    await expect(desktopNav).toBeVisible();

    // 3 links present and visible
    await expect(desktopNav.locator('a')).toHaveCount(3);
    for (const { href, text } of NAV_LINKS) {
      await expect(desktopNav.locator(`a[href="${href}"]`)).toHaveText(text);
      await expect(desktopNav.locator(`a[href="${href}"]`)).toBeVisible();
    }

    // CTA button present
    await expect(desktopNav.getByRole('button', { name: 'Talk to us' })).toBeVisible();
  });

  test('hamburger hidden on desktop, visible on mobile', async ({ page }) => {
    const toggle = page.locator('.mobile-toggle');

    // Desktop
    await page.setViewportSize({ width: 1280, height: 800 });
    await expect(toggle).toBeHidden();

    // Mobile
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(toggle).toBeVisible();
    await expect(toggle).toHaveAttribute('aria-controls', 'mobile-menu');
    await expect(toggle).toHaveAttribute('aria-label', 'Toggle navigation menu');
    await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  });

  test('mobile menu opens & closes, updates ARIA, locks body scroll', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });

    const toggle = page.locator('.mobile-toggle');
    const menu = page.locator('#mobile-menu');
    const body = page.locator('body');

    // Initially closed
    await expect(menu).toHaveClass(/hidden/);
    await expect(menu).toHaveAttribute('aria-hidden', 'true');
    await expect(toggle).toHaveAttribute('aria-expanded', 'false');

    // Open
    await toggle.click();
    await expect(menu).not.toHaveClass(/hidden/);
    await expect(menu).toHaveAttribute('aria-hidden', 'false');
    await expect(toggle).toHaveAttribute('aria-expanded', 'true');
    await expect(body).toHaveClass(/menu-open/);

    // Menu links present
    const mobileLinks = page.locator('.mobile-link');
    await expect(mobileLinks).toHaveCount(3);
    for (const { href, text } of NAV_LINKS) {
      const link = page.locator(`.mobile-link[href="${href}"]`);
      await expect(link).toBeVisible();
      await expect(link).toHaveText(text);
    }
    // CTA visible in overlay
    const mobileCta = page.locator('.mobile-cta').locator('button, a', { hasText: /talk to us/i });
    await expect(mobileCta.first()).toBeVisible();

    // Close by clicking backdrop
    await toggle.click();
    await expect(menu).toHaveClass(/hidden/);
    await expect(toggle).toHaveAttribute('aria-expanded', 'false');
    await expect(body).not.toHaveClass(/menu-open/);
  });

  test.describe('active state on desktop', () => {
    for (const { href } of NAV_LINKS) {
      test(`marks "${href}" as active when on that page`, async ({ page }) => {
        await page.setViewportSize({ width: 1280, height: 800 });
        await page.goto(href);

        const active = page.locator(
          `nav[aria-label="Main navigation"] a[href="${href}"]`
        );
        await expect(active).toBeVisible();
        await expect(active).toHaveAttribute('aria-current', 'page');
        // class "active" is added in the component
        await expect(active).toHaveClass(/active/);
      });
    }
  });
});
