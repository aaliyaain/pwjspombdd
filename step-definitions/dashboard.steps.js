const { When, Then } = require('@cucumber/cucumber');

When('user checks dashboard elements', async function () {
  await this.dashboardPage.verifyOnDashboard();
});

Then('dashboard widgets should be visible', async function () {
  await this.dashboardPage.verifyOnDashboard();
});