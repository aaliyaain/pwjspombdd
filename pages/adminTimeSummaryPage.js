class AdminTimeSummaryPage {
  constructor(page) {
    this.page = page;
    this.timeSummaryTab = 'a[href*="/wfm/time-summary"]';
    this.exportButton = 'button:has-text("Export"), button:has-text("Excel")';
  }

  async navigateToTimeSummary() {
    await this.page.click(this.timeSummaryTab);
  }

  async exportToExcel() {
    const [download] = await Promise.all([
      this.page.waitForEvent('download', { timeout: 30000 }),
      this.page.click(this.exportButton)
    ]);
    this.downloadedFile = await download.path();
  }

  async verifyDownload() {
    if (!this.downloadedFile) {
      throw new Error("File export download failed.");
    }
  }
}

module.exports = AdminTimeSummaryPage;