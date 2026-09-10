const { When, Then } = require('@cucumber/cucumber');
const LeavePage = require('../pages/leavePage');

When('user navigates to Leave tab', async function () {
  const leavePage = new LeavePage(this.page);
  await leavePage.navigateToLeave();
});

When('user fills out the leave application form', async function () {
  const leavePage = new LeavePage(this.page);
  await leavePage.fillLeaveForm();
});

When('user submits the leave request', async function () {
  const leavePage = new LeavePage(this.page);
  await leavePage.submitLeave();
});

Then('leave application should be visible in pending status', async function () {
  const leavePage = new LeavePage(this.page);
  await leavePage.verifyLeaveStatus();
});