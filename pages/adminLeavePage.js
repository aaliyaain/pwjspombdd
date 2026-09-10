const { expect } = require('@playwright/test');

class AdminLeavePage {
    constructor(page) {
        this.page = page;

        // Exact locators from video trace (0:14 - 0:20)
        this.leaveHolidaysMenu = page.locator('a[href*="/wfm/leave"]').or(page.locator('a:has-text("Leave & Holidays")')).first();
        this.approveBtn = page.locator('button:has-text("Approve")').first();
    }

    async navigateToLeaveHolidays() {
        // Step 1: Click Leave & Holidays in sidebar
        await this.leaveHolidaysMenu.waitFor({ state: 'visible', timeout: 15000 });
        await this.leaveHolidaysMenu.click();

        // SPA Navigation check
        if (!this.page.url().includes('/wfm/leave')) {
            await this.page.goto('https://bim.bpmsquare.com/wfm/leave');
        }
        await this.page.waitForTimeout(1500);
    }

    async approveFirstPendingLeave() {
        // Step 2: Click Approve green button on the pending leave row
        await this.approveBtn.waitFor({ state: 'visible', timeout: 15000 });
        await this.approveBtn.click();
        await this.page.waitForTimeout(2000);
    }
}

module.exports = AdminLeavePage;