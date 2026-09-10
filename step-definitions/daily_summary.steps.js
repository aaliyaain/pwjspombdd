const { Given, When, Then } = require('@cucumber/cucumber');
const DailySummaryPage = require('../pages/dailySummaryPage');
const LoginPage = require('../pages/loginPage');

Given('user is on workforce page', async function () {
  const loginPage = new LoginPage(this.page);
  await loginPage.navigate();
  await loginPage.login('aliyaain2207@gmail.com', '12345678');
});

When('user navigates to Time tab', async function () {
  const dailyPage = new DailySummaryPage(this.page);
  await dailyPage.navigateToTimeTab();
});

When('user selects Daily detailed summary view', async function () {
  const dailyPage = new DailySummaryPage(this.page);
  await dailyPage.selectDailyToggle();
});

Then('daily attendance records table should be visible', async function () {
  const dailyPage = new DailySummaryPage(this.page);
  await dailyPage.verifyDailySummaryLoaded();
});