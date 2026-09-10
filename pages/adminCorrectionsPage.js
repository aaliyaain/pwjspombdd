const { expect } = require('@playwright/test');

class AdminCorrectionsPage {
    constructor(page) {
        this.page = page;

        // Locators based on video trace (0:03 - 0:09)
        this.correctionsMenu = page.locator('a[href*="/wfm/corrections"]').or(page.locator('a:has-text("Corrections")')).first();
        this.approveBtn = page.locator('button:has-text("Approve")').first();
    }

    async navigateToCorrections() {
        // Step 1: Click Corrections in sidebar under Workforce
        await this.correctionsMenu.waitFor({ state: 'visible', timeout: 15000 });
        await this.correctionsMenu.click();

        // Fallback for SPA routing
        if (!this.page.url().includes('/wfm/corrections')) {
            await this.page.goto('https://bim.bpmsquare.com/wfm/corrections');
        }
        await this.page.waitForTimeout(1500);
    }

    async approveFirstPendingCorrection() {
        // Step 2: Click Approve green button on the pending correction record
        await this.approveBtn.waitFor({ state: 'visible', timeout: 15000 });
        await this.approveBtn.click();
        await this.page.waitForTimeout(2000);
    }
}

module.exports = AdminCorrectionsPage;