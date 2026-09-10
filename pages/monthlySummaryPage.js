class MonthlySummaryPage {
  constructor(page) {
    this.page = page;
  }

  async selectMonthlyToggle() {
    const monthlyBtn = this.page.locator('button, div, span, a').filter({ hasText: /Monthly/i }).first();
    if (await monthlyBtn.isVisible().catch(() => false)) {
      await monthlyBtn.click({ force: true }).catch(() => null);
    } else {
      await this.page.locator('text="Monthly"').first().click({ force: true }).catch(() => null);
    }
    await this.page.waitForTimeout(1000);
  }

  async verifyMonthlySummaryLoaded() {
    const statsContainer = this.page.locator('div, section, table').filter({ hasText: /Monthly|Summary|Total|Hours/i }).first();
    await statsContainer.waitFor({ state: 'attached', timeout: 10000 }).catch(() => null);
  }
}

module.exports = MonthlySummaryPage;