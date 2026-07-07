import { test, expect } from '@playwright/test';

test.describe('devj-portfolio Error States and APIs', () => {

  test('Actuator endpoint returns 404', async ({ request }) => {
    // curl /actuator/env should 404, not 200
    // backend is on localhost:8080 (or through proxy /api)
    // we can request the backend directly since it's mapped to 8080 in dev compose or we can request through frontend dev server proxy
    // frontend dev server proxy maps /api to backend, but not /actuator
    // So if someone accesses /actuator on frontend it should 404
    const response = await request.get('http://localhost:8080/actuator/env');
    expect(response.status()).toBe(404);
  });

  test('Graceful error if backend is down', async ({ page }) => {
    // Route block /api to simulate backend down
    await page.route('/api/**', route => route.abort());
    
    await page.goto('/');
    await expect(page.locator('text=Janaka Sangeeth').first()).toBeVisible({ timeout: 10000 });

    // Ensure error states show up in the sections
    await expect(page.locator('#skills').locator('text=[ FAIL ] Failed to load')).toBeVisible();
    await expect(page.locator('#projects').locator('text=[ FAIL ] Failed to load')).toBeVisible();
    await expect(page.locator('#certs').locator('text=[ FAIL ] Failed to load')).toBeVisible();

    // Check skeleton clipping or horizontal overflow on error state (mobile)
    await page.setViewportSize({ width: 375, height: 667 });
    const hasHorizontalScrollbar = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });
    expect(hasHorizontalScrollbar).toBe(false);

    await page.screenshot({ path: './screenshots/backend-down-error-mobile.png' });
  });
});
