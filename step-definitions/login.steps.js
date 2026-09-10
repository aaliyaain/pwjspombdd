const { Given, When, Then } = require('@cucumber/cucumber');
const LoginPage = require('../pages/loginPage');
require('dotenv').config();

Given('user is on login page', async function () {
  const loginPage = new LoginPage(this.page);
  await loginPage.navigate();
});

Given('user is logged in and on dashboard', async function () {
  const loginPage = new LoginPage(this.page);
  await loginPage.navigate();
  await loginPage.login(process.env.TEST_USERNAME, process.env.TEST_PASSWORD);
  // Wait for post-login dashboard layout to mount
  await this.page.waitForLoadState('networkidle');
  await this.page.waitForTimeout(2000);
});

When('user enters username {string} and password {string}', async function (username, password) {
  const loginPage = new LoginPage(this.page);
  await loginPage.login(username, password);
});

When('user enters valid env credentials', async function () {
  const loginPage = new LoginPage(this.page);
  await loginPage.login(process.env.TEST_USERNAME, process.env.TEST_PASSWORD);
});

When('user clicks login button', async function () {
  // Action handled inside login function
});

Then('user should see the dashboard', async function () {
  await this.page.waitForFunction(() => !window.location.href.includes('/login'), { timeout: 20000 });
});

Then('error message should be displayed', async function () {
  const loginPage = new LoginPage(this.page);
  await loginPage.verifyErrorMessage();
});

Then('error message should contain {string}', async function (expectedText) {
  const loginPage = new LoginPage(this.page);
  await loginPage.verifyErrorMessageText(expectedText);
});