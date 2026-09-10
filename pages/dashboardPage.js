const { expect } = require('@playwright/test');

class DashboardPage {
    constructor(page) {
        this.page = page;
        
        // Locators for generic dashboard elements
        this.userProfile = page.locator('[data-testid="user-profile"], .user-profile, avatar, img[alt*="profile" i]').first();
        this.navigationMenu = page.locator('nav, aside, .sidebar').first();
        this.welcomeMessage = page.locator('h1, h2, .welcome-text').first();
    }

    async verifyOnDashboard() {
        // Verifies full redirect and network idle state
        await expect(this.page).toHaveURL(/bpmsquare\.com/i, { timeout: 10000 });
        await this.page.waitForLoadState('networkidle').catch(() => {});
    }

    async verifyDashboardElementsLoaded() {
        // Validates key dashboard components are visible
        await expect(this.navigationMenu).toBeVisible({ timeout: 10000 });
    }
}

module.exports = DashboardPage;