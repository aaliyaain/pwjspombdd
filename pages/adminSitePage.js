const { expect } = require('@playwright/test');

class AdminSitePage {
    constructor(page) {
        this.page = page;

        // Navigation elements
        this.settingsMenu = page.locator('aside a[href="/settings"], .sidebar a[href="/settings"], a[href="/settings"]').first();
        this.workforceCard = page.locator('a[href*="workforce"], div').filter({ hasText: /^Workforce$/i }).first();
        this.sitesTab = page.locator('a[href*="sites"], button, div').filter({ hasText: /^Sites$/i }).first();
        
        // Site creation form elements
        this.addSiteBtn = page.locator('button').filter({ hasText: /\+ Add site/i }).first();
        this.locationSearchInput = page.locator('input[placeholder*="Search an address" i]').first();
        this.searchBtn = page.locator('button').filter({ hasText: /^Search$/i }).first();
        this.siteNameInput = page.locator('input[placeholder*="Site Name" i], input[name="siteName"]').first();
        this.confirmAddSiteBtn = page.locator('button').filter({ hasText: /^Add site$/i }).last();
    }

    async navigateToSitesTab() {
        // Step 1: Open Settings page
        await this.settingsMenu.waitFor({ state: 'visible', timeout: 15000 });
        await this.settingsMenu.click();
        await this.page.waitForTimeout(1000);

        // Step 2: Navigate into Workforce settings
        if (await this.workforceCard.isVisible().catch(() => false)) {
            await this.workforceCard.click();
            await this.page.waitForTimeout(1500);
        }

        // SPA Fallback: If URL is not on workforce settings, navigate directly
        if (!this.page.url().includes('workforce')) {
            await this.page.goto('https://bim.bpmsquare.com/settings/workforce');
            await this.page.waitForTimeout(1500);
        }

        // Step 3: Click Sites Tab
        await this.sitesTab.waitFor({ state: 'visible', timeout: 15000 });
        await this.sitesTab.click();

        // Verify + Add site button is rendered
        await this.addSiteBtn.waitFor({ state: 'visible', timeout: 15000 });
    }

    async addSite(addressQuery, siteName) {
        await this.addSiteBtn.click();

        await this.locationSearchInput.waitFor({ state: 'visible', timeout: 15000 });
        await this.locationSearchInput.fill(addressQuery);
        await this.searchBtn.click();
        await this.page.waitForTimeout(2000);

        if (await this.siteNameInput.isVisible().catch(() => false)) {
            await this.siteNameInput.fill(siteName);
        }

        await this.confirmAddSiteBtn.click();
        await this.page.waitForTimeout(2000);
    }
}

module.exports = AdminSitePage;