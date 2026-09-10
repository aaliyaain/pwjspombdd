require('dotenv').config();
const { Given, When, Then } = require('@cucumber/cucumber');

Given('user is logged in', async function () {
  const email = process.env.TEST_USERNAME;
  const password = process.env.TEST_PASSWORD;

  await this.loginPage.navigate();
  await this.loginPage.login(email, password);

  if (this.dashboardPage) {
    await this.dashboardPage.verifyOnDashboard();
    await this.dashboardPage.verifyDashboardElementsLoaded();
  }
});

Given('user is on the workforce punch screen', async function () {
  if (this.punchPage) {
    await this.punchPage.navigateToWorkforce();
  }
});

When('user clicks green punch button', async function () {
  if (this.punchPage) {
    await this.punchPage.clickPunch();
  }
});

When('user captures selfie and punches in', async function () {
  if (this.punchPage) {
    await this.punchPage.captureAndPunch();
  }
});

Then('punch in status should be updated to checked in', async function () {
  if (this.punchPage) {
    await this.punchPage.verifyPunchUpdated();
  }
});

When('user clicks red punch button', async function () {
  if (this.punchPage) {
    await this.punchPage.clickPunch();
  }
});

When('user captures selfie and punches out', async function () {
  if (this.punchPage) {
    await this.punchPage.captureAndPunch();
  }
});

Then('punch out status should be updated to checked out', async function () {
  if (this.punchPage) {
    await this.punchPage.verifyPunchUpdated();
  }
});