const { expect } = require('@playwright/test');

class AdminTimeSummaryPage {
    constructor(page) {
        this.page = page;

        // Workforce accordion menu parent
        this.workforceAccordion = page.locator('aside, .sidebar').locator('text=/Workforce/i').first();
        
        // Exact locators matching your UI
        this.timeSummaryMenu = page.locator('a[href*="/wfm/summary"]').or(page.locator('a').filter({ hasText: /^Time Summary$/i })).first();
        this.exportBtn = page.locator('a, button').filter({ hasText: /Export to Excel/i }).first();
    }

    async navigateToTimeSummary() {
        // Step 1: Ensure Workforce menu section is expanded if closed
        if (await this.workforceAccordion.isVisible().catch(() => false)) {
            await this.workforceAccordion.click().catch(() => {});
            await this.page.waitForTimeout(500);
        }

        // Step 2: Click Time Summary item
        if (await this.timeSummaryMenu.isVisible().catch(() => false)) {
            await this.timeSummaryMenu.click();
            await this.page.waitForTimeout(1500);
        }

        // SPA Direct Route Fallback (Guarantees navigation without sidebar dependency)
        if (!this.page.url().includes('/wfm/summary')) {
            await this.page.goto('https://bim.bpmsquare.com/wfm/summary');
            await this.page.waitForTimeout(1500);
        }

        // Verify page loads by waiting for Export button container
        await this.exportBtn.waitFor({ state: 'visible', timeout: 15000 });
    }

    async exportToExcel() {
        // Step 3: Trigger download listener before clicking Export button
        const [download] = await Promise.all([
            this.page.waitForEvent('download', { timeout: 30000 }),
            this.exportBtn.click()
        ]);

        this.downloadedFilePath = await download.path();
        this.suggestedFileName = download.suggestedFilename();
    }

    async verifyDownload() {
        expect(this.downloadedFilePath).toBeTruthy();
        expect(this.suggestedFileName).toMatch(/\.xlsx$/i);
    }
}

module.exports = AdminTimeSummaryPage;