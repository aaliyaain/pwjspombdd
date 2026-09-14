class AdminLeavePage {
  constructor(page) {
    this.page = page;
    this.leaveTab = 'a[href*="/wfm/leave"]';
    this.approveButton = 'button:has-text("Approve")';
  }

  async navigateToLeaveHolidays() {
    await this.page.click(this.leaveTab);
    await this.page.waitForLoadState('networkidle');
  }

  async approveFirstPendingLeave() {
    const approveBtn = this.page.locator(this.approveButton).first();
    if (await approveBtn.isVisible()) {
      await approveBtn.click();
    }
  }
}

module.exports = AdminLeavePage;