const { Given, When, Then } = require('@cucumber/cucumber');
const MonthlySummaryPage = require('../pages/monthlySummaryPage');
const LoginPage = require('../pages/loginPage');

Given('user is on workforce dashboard', async function () {
  const loginPage = new LoginPage(this.page);
  await loginPage.navigate();
  await loginPage.login('aliyaain2207@gmail.com', '12345678');
});

When('selects Monthly summary toggle', async function () {
  const monthlyPage = new MonthlySummaryPage(this.page);
  await monthlyPage.selectMonthlyToggle();
});

Then('monthly statistics cards should be displayed', async function () {
  const monthlyPage = new MonthlySummaryPage(this.page);
  await monthlyPage.verifyMonthlySummaryLoaded();
});
