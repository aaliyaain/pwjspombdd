// pages/reportPage.js
const { expect } = require('@playwright/test');

class ReportPage {
  constructor(page) {
    this.page = page;
    this.dailyReportTab = page.locator('#daily-report-tab');
    this.monthlyReportTab = page.locator('#monthly-report-tab');
    this.dateInput = page.locator('#report-date-picker');
    this.generateBtn = page.locator('#generate-btn');
    this.reportTable = page.locator('.report-table');
  }

  async selectReportType(type) {
    if (type === 'daily') await this.dailyReportTab.click();
    if (type === 'monthly') await this.monthlyReportTab.click();
  }

  async generateReportForDate(dateStr) {
    await this.dateInput.fill(dateStr);
    await this.generateBtn.click();
  }

  // --- ASSERTIONS ---
  async verifyReportIsGenerated() {
    await expect(this.reportTable).toBeVisible();
  }
}

module.exports = { ReportPage };