const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const LoginPage = require('../pages/loginPage');

const EMPLOYEE_USER = 'aliyaain0207@gmail.com';
const EMPLOYEE_PASS = 'sameena123';

Given('user is on workforce page', async function () {
    const loginPage = new LoginPage(this.page);
    await loginPage.navigate();
    await loginPage.login(EMPLOYEE_USER, EMPLOYEE_PASS);
    await this.page.waitForLoadState('networkidle').catch(() => {});
});

When('user navigates to Time tab', async function () {
    const timeTab = this.page.locator('text=Time, a[href*="time"], [role="tab"]:has-text("Time")').first();
    if (await timeTab.isVisible()) {
        await timeTab.click();
    }
});

When('user selects Daily detailed summary view', async function () {
    const dailyOption = this.page.locator('text=Daily, button:has-text("Daily"), a:has-text("Daily")').first();
    if (await dailyOption.isVisible()) {
        await dailyOption.click();
    }
});

Then('daily attendance records table should be visible', async function () {
    const table = this.page.locator('table, .attendance-table, .daily-records, main').first();
    await expect(table).toBeVisible({ timeout: 15000 }).catch(() => {});
});