const { expect } = require('@playwright/test');

class LoginPage {
  constructor(page) {
    this.page = page;
  }

  async navigate() {
    const url = process.env.LOGIN_URL || 'https://bim.bpmsquare.com/login';
    await this.page.goto(url, { waitUntil: 'load', timeout: 30000 });
    await this.page.waitForTimeout(2000); // Gives dynamic SPA/React forms time to render
  }

  async login(username, password) {
    // 1. Target email/username field across common input variations
    const emailLocator = this.page.locator('input[type="email"], input[name="email"], input[name="username"], input[name="login"], input:not([type="hidden"])').first();
    await emailLocator.waitFor({ state: 'visible', timeout: 15000 });
    await emailLocator.fill(username);

    // 2. Target password field
    const passwordLocator = this.page.locator('input[type="password"], input[name="password"]').first();
    await passwordLocator.waitFor({ state: 'visible', timeout: 15000 });
    await passwordLocator.fill(password);

    // 3. Target submit button
    const submitBtn = this.page.locator('button[type="submit"], input[type="submit"], button:has-text("Login"), button:has-text("Sign In"), button:has-text("Log In")').first();
    await submitBtn.click();

    // 4. Wait for redirection or network load after submit
    await this.page.waitForLoadState('domcontentloaded').catch(() => null);
    await this.page.waitForTimeout(2000);
  }

  async verifyErrorMessage() {
    const errorMessage = this.page.getByText(/incorrect id or password/i).first();
    await expect(errorMessage).toBeVisible({ timeout: 10000 });
  }
}

module.exports = LoginPage;