import { test, expect } from '@playwright/test';

test.describe('Header Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('renders logo and tagline correctly', async ({ page }) => {
    // Check logo is present
    const logo = page.locator('.logo img[alt="neontribe"]');
    await expect(logo).toBeVisible();
    
    // Check tagline is present
    const tagline = page.locator('text=Part of the dxw family');
    await expect(tagline).toBeVisible();
    
    // Check separator
    const separator = page.locator('text=|');
    await expect(separator).toBeVisible();
  });

  test('displays all navigation links', async ({ page }) => {
    const navLinks = page.locator('nav[aria-label="Main navigation"] a');
    await expect(navLinks).toHaveCount(3);
    
    // Check specific links in desktop navigation
    await expect(page.locator('nav[aria-label="Main navigation"] a[href="/case-studies"]')).toBeVisible();
    await expect(page.locator('nav[aria-label="Main navigation"] a[href="/how-we-work"]')).toBeVisible();
    await expect(page.locator('nav[aria-label="Main navigation"] a[href="/advice-service"]')).toBeVisible();
  });

  test('displays Talk to us button', async ({ page }) => {
    const button = page.locator('nav[aria-label="Main navigation"] button:has-text("Talk to us")');
    await expect(button).toBeVisible();
  });

  test('shows active page indication', async ({ page }) => {
    // On home page, no nav links should be active
    const activeLinks = page.locator('.nav-link.active');
    await expect(activeLinks).toHaveCount(0);
  });

  test('shows active page indication on case studies page', async ({ page }) => {
    await page.goto('/case-studies');
    
    const activeLink = page.locator('nav[aria-label="Main navigation"] a[href="/case-studies"].active');
    await expect(activeLink).toBeVisible();
    await expect(activeLink).toHaveAttribute('aria-current', 'page');
  });

  test('shows active page indication on how we work page', async ({ page }) => {
    await page.goto('/how-we-work');
    
    const activeLink = page.locator('nav[aria-label="Main navigation"] a[href="/how-we-work"].active');
    await expect(activeLink).toBeVisible();
    await expect(activeLink).toHaveAttribute('aria-current', 'page');
  });

  test('shows active page indication on advice service page', async ({ page }) => {
    await page.goto('/advice-service');
    
    const activeLink = page.locator('nav[aria-label="Main navigation"] a[href="/advice-service"].active');
    await expect(activeLink).toBeVisible();
    await expect(activeLink).toHaveAttribute('aria-current', 'page');
  });

  test('navigation is keyboard accessible', async ({ page }) => {
    // Tab to first nav link
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    
    const firstNavLink = page.locator('nav[aria-label="Main navigation"] a[href="/case-studies"]');
    await expect(firstNavLink).toBeFocused();
    
    // Tab through all nav links
    await page.keyboard.press('Tab');
    const secondNavLink = page.locator('nav[aria-label="Main navigation"] a[href="/how-we-work"]');
    await expect(secondNavLink).toBeFocused();
    
    await page.keyboard.press('Tab');
    const thirdNavLink = page.locator('nav[aria-label="Main navigation"] a[href="/advice-service"]');
    await expect(thirdNavLink).toBeFocused();
  });

  test('mobile menu toggle button is hidden on desktop', async ({ page }) => {
    const toggleButton = page.locator('.mobile-menu-toggle');
    await expect(toggleButton).not.toBeVisible();
  });

  test('mobile menu toggle button is present on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    
    const toggleButton = page.locator('.mobile-menu-toggle');
    await expect(toggleButton).toBeVisible();
    await expect(toggleButton).toHaveAttribute('aria-expanded', 'false');
    await expect(toggleButton).toHaveAttribute('aria-controls', 'mobile-menu');
    await expect(toggleButton).toHaveAttribute('aria-label', 'Toggle navigation menu');
  });

  test('desktop navigation is hidden on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    
    const desktopNav = page.locator('nav[aria-label="Main navigation"]');
    await expect(desktopNav).toHaveClass(/hidden/);
  });

  test('mobile menu opens and closes correctly', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    
    const toggleButton = page.locator('.mobile-menu-toggle');
    const mobileMenu = page.locator('#mobile-menu');
    
    // Menu should be hidden initially
    await expect(mobileMenu).toHaveClass(/hidden/);
    await expect(mobileMenu).toHaveAttribute('aria-hidden', 'true');
    
    // Click toggle button
    await toggleButton.click();
    
    // Menu should be visible
    await expect(mobileMenu).not.toHaveClass(/hidden/);
    await expect(mobileMenu).toHaveAttribute('aria-hidden', 'false');
    await expect(toggleButton).toHaveAttribute('aria-expanded', 'true');
    
    // Click toggle button again
    await toggleButton.click();
    
    // Menu should be hidden again
    await expect(mobileMenu).toHaveClass(/hidden/);
    await expect(mobileMenu).toHaveAttribute('aria-hidden', 'true');
    await expect(toggleButton).toHaveAttribute('aria-expanded', 'false');
  });

  test('mobile menu has all navigation links', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    
    const toggleButton = page.locator('.mobile-menu-toggle');
    await toggleButton.click();
    
    const mobileNavLinks = page.locator('.mobile-nav-link');
    await expect(mobileNavLinks).toHaveCount(3);
    
    await expect(page.locator('.mobile-nav-link[href="/case-studies"]')).toBeVisible();
    await expect(page.locator('.mobile-nav-link[href="/how-we-work"]')).toBeVisible();
    await expect(page.locator('.mobile-nav-link[href="/advice-service"]')).toBeVisible();
  });

  test('mobile menu has Talk to us button', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    
    const toggleButton = page.locator('.mobile-menu-toggle');
    await toggleButton.click();
    
    const mobileButton = page.locator('.mobile-cta button:has-text("Talk to us")');
    await expect(mobileButton).toBeVisible();
  });

  test('mobile menu closes when clicking on links', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    
    const toggleButton = page.locator('.mobile-menu-toggle');
    const mobileMenu = page.locator('#mobile-menu');
    
    // Open menu
    await toggleButton.click();
    await expect(mobileMenu).not.toHaveClass(/hidden/);
    
    // Click on a link
    const firstLink = page.locator('.mobile-nav-link[href="/case-studies"]');
    await firstLink.click();
    
    // Menu should be closed
    await expect(mobileMenu).toHaveClass(/hidden/);
    await expect(toggleButton).toHaveAttribute('aria-expanded', 'false');
  });

  test('mobile menu closes with Escape key', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    
    const toggleButton = page.locator('.mobile-menu-toggle');
    const mobileMenu = page.locator('#mobile-menu');
    
    // Open menu
    await toggleButton.click();
    await expect(mobileMenu).not.toHaveClass(/hidden/);
    
    // Press Escape
    await page.keyboard.press('Escape');
    
    // Menu should be closed
    await expect(mobileMenu).toHaveClass(/hidden/);
    await expect(toggleButton).toHaveAttribute('aria-expanded', 'false');
  });

  test('mobile menu closes when clicking outside', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    
    const toggleButton = page.locator('.mobile-menu-toggle');
    const mobileMenu = page.locator('#mobile-menu');
    
    // Open menu
    await toggleButton.click();
    await expect(mobileMenu).not.toHaveClass(/hidden/);
    
    // Click on the backdrop (outside the menu content)
    await mobileMenu.click({ position: { x: 10, y: 10 } });
    
    // Menu should be closed
    await expect(mobileMenu).toHaveClass(/hidden/);
    await expect(toggleButton).toHaveAttribute('aria-expanded', 'false');
  });

  test('mobile menu closes on window resize to desktop', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    
    const toggleButton = page.locator('.mobile-menu-toggle');
    const mobileMenu = page.locator('#mobile-menu');
    
    // Open menu
    await toggleButton.click();
    await expect(mobileMenu).not.toHaveClass(/hidden/);
    
    // Resize to desktop
    await page.setViewportSize({ width: 1024, height: 768 });
    
    // Menu should be closed
    await expect(mobileMenu).toHaveClass(/hidden/);
    await expect(toggleButton).toHaveAttribute('aria-expanded', 'false');
  });

  test('focus trap works in mobile menu', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    
    const toggleButton = page.locator('.mobile-menu-toggle');
    const mobileMenu = page.locator('#mobile-menu');
    
    // Open menu
    await toggleButton.click();
    
    // Focus should be on first mobile nav link
    const firstLink = page.locator('.mobile-nav-link[href="/case-studies"]');
    await expect(firstLink).toBeFocused();
    
    // Tab through all links
    await page.keyboard.press('Tab');
    const secondLink = page.locator('.mobile-nav-link[href="/how-we-work"]');
    await expect(secondLink).toBeFocused();
    
    await page.keyboard.press('Tab');
    const thirdLink = page.locator('.mobile-nav-link[href="/advice-service"]');
    await expect(thirdLink).toBeFocused();
    
    await page.keyboard.press('Tab');
    const button = page.locator('.mobile-cta button');
    await expect(button).toBeFocused();
    
    // Tab again should cycle back to first link
    await page.keyboard.press('Tab');
    await expect(firstLink).toBeFocused();
  });

  test('body scroll is prevented when mobile menu is open', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    
    const toggleButton = page.locator('.mobile-menu-toggle');
    
    // Open menu
    await toggleButton.click();
    
    // Check that body has overflow hidden
    const body = page.locator('body');
    await expect(body).toHaveCSS('overflow', 'hidden');
    
    // Close menu
    await toggleButton.click();
    
    // Check that body overflow is restored (empty string or visible)
    const overflowValue = await body.evaluate(el => getComputedStyle(el).overflow);
    expect(overflowValue).toBe('visible');
  });

  test('skip link is accessible', async ({ page }) => {
    // Skip link should be hidden by default
    const skipLink = page.locator('.skip-link');
    await expect(skipLink).toHaveCSS('top', '-40px');
    
    // Focus skip link
    await skipLink.focus();
    
    // Skip link should be visible when focused
    await expect(skipLink).toHaveCSS('top', '6px');
  });

  test('touch targets meet minimum size requirements', async ({ page }) => {
    // Check mobile menu toggle button
    const toggleButton = page.locator('.mobile-menu-toggle');
    const toggleBox = await toggleButton.boundingBox();
    expect(toggleBox.width).toBeGreaterThanOrEqual(44);
    expect(toggleBox.height).toBeGreaterThanOrEqual(44);
    
    // Check desktop nav links
    const navLinks = page.locator('.nav-link');
    const linkCount = await navLinks.count();
    
    for (let i = 0; i < linkCount; i++) {
      const link = navLinks.nth(i);
      const linkBox = await link.boundingBox();
      expect(linkBox.height).toBeGreaterThanOrEqual(44);
    }
  });

  test('mobile menu shows active page indication', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/case-studies');
    
    const toggleButton = page.locator('.mobile-menu-toggle');
    await toggleButton.click();
    
    const activeLink = page.locator('.mobile-nav-link[href="/case-studies"].active');
    await expect(activeLink).toBeVisible();
    await expect(activeLink).toHaveAttribute('aria-current', 'page');
  });

  test('hamburger icon animates correctly', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    
    const toggleButton = page.locator('.mobile-menu-toggle');
    const hamburgerLines = page.locator('.hamburger-line');
    
    // Initially, lines should be in hamburger state
    await expect(hamburgerLines.nth(0)).toHaveCSS('transform', 'none');
    await expect(hamburgerLines.nth(1)).toHaveCSS('opacity', '1');
    await expect(hamburgerLines.nth(2)).toHaveCSS('transform', 'none');
    
    // Click to open menu
    await toggleButton.click();
    
    // Lines should animate to X state
    await expect(hamburgerLines.nth(0)).toHaveCSS('transform', /matrix\(0.707107, 0.707107, -0.707107, 0.707107, 0, 0\)/);
    await expect(hamburgerLines.nth(1)).toHaveCSS('opacity', '0');
    await expect(hamburgerLines.nth(2)).toHaveCSS('transform', /matrix\(0.707107, -0.707107, 0.707107, 0.707107, 0, 0\)/);
  });
});
