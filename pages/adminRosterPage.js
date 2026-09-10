const { expect } = require('@playwright/test');

class AdminRosterPage {
    constructor(page) {
        this.page = page;

        // Locators
        this.workforceAccordion = page.locator('aside, .sidebar').locator('text=/Workforce/i').first();
        this.rosterMenu = page.locator('a[href*="/wfm/roster"]').or(page.locator('a').filter({ hasText: /^Roster$/i })).first();
        this.rosterHeader = page.locator('h1, h2, div').filter({ hasText: /^Roster$/i }).first();
        this.rosterTable = page.locator('table, [role="grid"]').first();
    }

    async navigateToRoster() {
        // Step 1: Expand Workforce section if closed
        if (await this.workforceAccordion.isVisible().catch(() => false)) {
            await this.workforceAccordion.click().catch(() => {});
            await this.page.waitForTimeout(500);
        }

        // Step 2: Click Roster menu item
        if (await this.rosterMenu.isVisible().catch(() => false)) {
            await this.rosterMenu.click();
            await this.page.waitForTimeout(1500);
        }

        // Direct Route Fallback (guarantees SPA navigation)
        if (!this.page.url().includes('/wfm/roster')) {
            await this.page.goto('https://bim.bpmsquare.com/wfm/roster');
            await this.page.waitForTimeout(1500);
        }

        // Verify page loads
        await this.rosterHeader.waitFor({ state: 'visible', timeout: 15000 });
    }

    async verifyRosterTableLoaded() {
        await expect(this.rosterTable).toBeVisible({ timeout: 15000 });
    }
}

module.exports = AdminRosterPage;