const { expect } = require('@playwright/test');

class PunchPage {
    constructor(page) {
        this.page = page;

        this.myWorkforceSidebar = page.locator('aside, nav, div').filter({ hasText: /^My Workforce$/i }).first();
        this.punchButton = page.locator('button, [role="button"]').filter({ hasText: /Punch In|Punch Out|Check In|Check Out/i }).first();
        this.captureButton = page.locator('button, [role="button"]').filter({ hasText: /Capture|Take Selfie/i }).first();
        this.punchRecordStatus = page.locator('text=/TODAY\'S PUNCHES|CHECK IN|CHECK OUT|RECORDED/i').first();
    }

    async navigateToWorkforce() {
        await this.page.waitForLoadState('domcontentloaded');
        await this.myWorkforceSidebar.waitFor({ state: 'visible', timeout: 15000 });
        await this.myWorkforceSidebar.click();
        await this.page.waitForLoadState('networkidle').catch(() => {});
    }

    async clickPunch() {
        await this.punchButton.waitFor({ state: 'visible', timeout: 15000 });
        await this.punchButton.click();
    }

    async captureAndPunch() {
        if (await this.captureButton.isVisible({ timeout: 5000 }).catch(() => false)) {
            await this.captureButton.click();
        }
        await this.clickPunch();
    }

    async verifyPunchUpdated() {
        await expect(this.punchRecordStatus).toBeVisible({ timeout: 15000 });
    }
}

module.exports = PunchPage;