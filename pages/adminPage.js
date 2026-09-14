class AdminPage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;
    }

    async navigateToTimeSummary() {
        const item = this.page.locator('text=Time Summary, a[href*="time-summary"]').first();
        await item.click().catch(() => {});
    }

    async navigateToRoster() {
        const item = this.page.locator('text=Roster, a[href*="roster"]').first();
        await item.click().catch(() => {});
    }

    async navigateToSitesTab() {
        const item = this.page.locator('text=Workforce Sites, text=Sites, a[href*="sites"]').first();
        await item.click().catch(() => {});
    }

    async navigateToLeaveHolidays() {
        const item = this.page.locator('text=Leave and Holidays, text=Leave, a[href*="leave"]').first();
        await item.click().catch(() => {});
    }

    async navigateToCorrections() {
        const item = this.page.locator('text=Corrections, text=Attendance Corrections, a[href*="corrections"]').first();
        await item.click().catch(() => {});
    }
}

module.exports = AdminPage;
module.exports.AdminPage = AdminPage;