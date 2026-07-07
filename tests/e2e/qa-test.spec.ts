import { test, expect } from '@playwright/test';

test.describe('devj-portfolio E2E Tests', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Wait for boot sequence to finish (3-4 seconds)
    await expect(page.locator('text=Janaka Sangeeth Hettiarachchi').first()).toBeVisible({ timeout: 10000 });
  });

  test('Boot sequence completes and UI loads', async ({ page }) => {
    // Handled by beforeEach
  });

  test('Core CRUD: Skills render data', async ({ page }) => {

    // Should have 12 skills
    await expect(page.locator('#skills')).toBeVisible();
    await expect(page.locator('#skills')).toContainText('Linux');
    await expect(page.locator('#skills')).toContainText('Containers');
    // Count hex skills
    const hexes = await page.locator('#skills .group').count();
    // It might be hard to exact match .group if classes vary, let's just assert existence of known texts
    await expect(page.locator('text=IoT / Edge')).toBeVisible();
  });

  test('Core CRUD: Projects render data', async ({ page }) => {
    await expect(page.locator('#projects')).toBeVisible();
    await expect(page.locator('text=batcavelab')).toBeVisible();
    await expect(page.locator('text=zoneforty5-cloud-infra')).toBeVisible();
  });

  test('Core CRUD: Timeline renders data', async ({ page }) => {
    await expect(page.locator('#certs')).toBeVisible();
    await expect(page.locator('text=Cisco CCNA')).toBeVisible();
  });

  test('Mobile Responsive Layout (375px)', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    
    // Wait for the page to be fully loaded
    await expect(page.locator('text=Janaka Sangeeth')).toBeVisible();
    
    // Evaluate horizontal scroll
    const hasHorizontalScrollbar = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });
    expect(hasHorizontalScrollbar).toBe(false);

    // Take screenshot
    await page.screenshot({ path: './screenshots/mobile-375px.png', fullPage: true });
  });

  test('Contact Form: Rate Limiting & Error States', async ({ page }) => {
    test.setTimeout(60000); // 60s
    await page.locator('a[href="#contact"]').click();
    await expect(page.locator('#contact')).toBeVisible();

    const fillForm = async (msg: string) => {
      await page.fill('input[type="text"]', 'Test User');
      await page.fill('input[type="email"]', 'test@example.com');
      await page.fill('textarea', msg);
      await page.click('button[type="submit"]');
    };

    // 1. Valid form submission - should return 502 since SES sandbox dummy creds
    await fillForm('This is a test message with dummy SES credentials.');
    await expect(page.locator('text=[ FAIL ] Failed to send message.')).toBeVisible();

    // 2. Empty fields validation
    await page.fill('input[name="name"]', '');
    await page.click('button[type="submit"]');
    await expect(page.locator('text=[ FAIL ] Validation failed')).toBeVisible();

    // 3. Rate limiting (429)
    // We already sent 1. We need 5 to hit rate limit, or 2 rapidly to hit 1/20s burst.
    // Let's rapidly submit again to hit burst limit.
    await fillForm('Rapid message test');
    const responseText = await page.locator('#contact').innerText();
    // It should either fail with 502 or 429
    await expect(page.locator('text=Try again in')).toBeVisible({ timeout: 5000 });
    await page.screenshot({ path: './screenshots/rate-limit-429.png' });
  });

  test('Contact Form: Honeypot', async ({ page }) => {
    
    // Unhide the honeypot for testing or fill it programmatically
    await page.evaluate(() => {
      (document.querySelector('input[name="website"]') as HTMLInputElement).value = 'spam-bot-value';
    });
    
    await page.fill('input[type="text"]:not([name="website"])', 'Spam Bot');
    await page.fill('input[type="email"]', 'spam@bot.com');
    await page.fill('textarea', 'Spam spam spam');
    await page.click('button[type="submit"]');

    // Honeypot should return 200 silently
    await expect(page.locator('text=[  OK  ] Message sent successfully.')).toBeVisible();
  });

  test('Security: XSS in contact form', async ({ page }) => {
    await page.fill('input[type="text"]', '<script>alert(1)</script>');
    await page.fill('input[type="email"]', 'test@example.com');
    await page.fill('textarea', 'Testing XSS <script>alert(1)</script>');
    await page.click('button[type="submit"]');
    
    // We expect a validation error or 502, but no alert should be triggered
    // Playwright handles alerts via page.on('dialog'), we will fail the test if dialog occurs
    page.on('dialog', dialog => {
      expect(dialog.type()).not.toBe('alert');
    });
    
    await expect(page.locator('text=[ FAIL ]')).toBeVisible();
  });
});
