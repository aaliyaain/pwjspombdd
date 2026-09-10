const { Given, When, Then } = require('@cucumber/cucumber');

Given('user is on the login page', async function () {
  await this.loginPage.navigate();
});

When('user logs in with credentials {string} and {string}', async function (username, password) {
  await this.loginPage.login(username, password);
});

Then('dashboard navigation menu should be visible', async function () {
  await this.page.waitForTimeout(1000);
});