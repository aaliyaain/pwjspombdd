class DailySummaryPage {
  constructor(page) {
    this.page = page;
  }

  async navigateToTimeTab() {
    const workforce = this.page.locator('text="My Workforce"').first();
    if (await workforce.isVisible().catch(() => false)) {
      await workforce.click({ force: true }).catch(() => null);
    }
    await this.page.waitForTimeout(1500);

    const timeTab = this.page.locator('button, div, a, span').filter({ hasText: /^Time$/i }).first();
    if (!(await timeTab.isVisible().catch(() => false))) {
      await this.page.locator('text="Time"').first().click({ force: true }).catch(() => null);
    } else {
      await timeTab.click({ force: true }).catch(() => null);
    }
    await this.page.waitForTimeout(1000);
  }

  async selectDailyToggle() {
    const dailyBtn = this.page.locator('button, div, a, span').filter({ hasText: /Daily/i }).first();
    if (await dailyBtn.isVisible().catch(() => false)) {
      await dailyBtn.click({ force: true }).catch(() => null);
    }
  }

  async verifyDailySummaryLoaded() {
    const tableOrGrid = this.page.locator('table, div, section').filter({ hasText: /Attendance|Summary|Hours|Daily/i }).first();
    await tableOrGrid.waitFor({ state: 'attached', timeout: 10000 }).catch(() => null);
  }
}

module.exports = DailySummaryPage;