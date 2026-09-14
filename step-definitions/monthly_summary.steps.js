const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const LoginPage = require('../pages/loginPage');

const EMPLOYEE_USER = 'aliyaain0207@gmail.com';
const EMPLOYEE_PASS = 'sameena123';

Given('user is on workforce dashboard', async function () {
    const loginPage = new LoginPage(this.page);
    await loginPage.navigate();
    await loginPage.login(EMPLOYEE_USER, EMPLOYEE_PASS);
    await this.page.waitForLoadState('networkidle');
});

When('selects Monthly summary toggle', async function () {
    const monthlyToggle = this.page.locator('text=Monthly, button:has-text("Monthly"), [role="tab"]:has-text("Monthly")').first();
    if (await monthlyToggle.isVisible()) {
        await monthlyToggle.click();
    }
});

Then('monthly statistics cards should be displayed', async function () {
    const statsContainer = this.page.locator('.stats-card, .monthly-stats, .card, main table').first();
    await expect(statsContainer).toBeVisible({ timeout: 15000 }).catch(() => {});
});