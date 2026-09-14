class PunchPage {
  constructor(page) {
    this.page = page;
    this.checkInButton = 'button:has-text("Check in")';
    this.checkOutButton = 'button:has-text("Check out")';
    this.captureAndPunchButton = 'button:has-text("Capture & punch")';
  }

  async clickCheckIn() {
    if (await this.page.isVisible(this.checkInButton)) {
      await this.page.click(this.checkInButton);
      if (await this.page.isVisible(this.captureAndPunchButton)) {
        await this.page.click(this.captureAndPunchButton);
      }
    }
  }

  async clickCheckOut() {
    if (await this.page.isVisible(this.checkOutButton)) {
      await this.page.click(this.checkOutButton);
      if (await this.page.isVisible(this.captureAndPunchButton)) {
        await this.page.click(this.captureAndPunchButton);
      }
    }
  }
}

module.exports = PunchPage;