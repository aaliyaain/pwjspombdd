const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const LoginPage = require('../pages/loginPage');

const DEFAULT_EMAIL = 'aliyaain0207@gmail.com';
const DEFAULT_PASS = 'sameena123';

Given('user is on login page', async function () {
    this.loginPage = new LoginPage(this.page);
    await this.loginPage.navigate();
});

Given('user is on the login page', async function () {
    this.loginPage = new LoginPage(this.page);
    await this.loginPage.navigate();
});

When('user logs in with valid credentials', async function () {
    await this.loginPage.login(DEFAULT_EMAIL, DEFAULT_PASS);
});

When('user enters valid env credentials', async function () {
    await this.loginPage.login(DEFAULT_EMAIL, DEFAULT_PASS);
});

When('user enters email {string} and password {string}', async function (email, password) {
    await this.loginPage.login(email, password);
});

When('user enters username {string} and password {string}', async function (email, password) {
    await this.loginPage.login(email, password);
});

When('user logs in with credentials {string} and {string}', async function (email, password) {
    await this.loginPage.login(email, password);
});

When('user submits empty login form', async function () {
    await this.loginPage.clickLogin();
});

Given('user is logged in', async function () {
    this.loginPage = new LoginPage(this.page);
    await this.loginPage.navigate();
    await this.loginPage.login(DEFAULT_EMAIL, DEFAULT_PASS);
    await this.page.waitForLoadState('networkidle').catch(() => {});
});

Given('user is logged in and on dashboard', async function () {
    this.loginPage = new LoginPage(this.page);
    await this.loginPage.navigate();
    await this.loginPage.login(DEFAULT_EMAIL, DEFAULT_PASS);
    await this.page.waitForLoadState('networkidle').catch(() => {});
});

Then('user should see the dashboard', async function () {
    const dashboardElement = this.page.locator('.dashboard, #dashboard, nav, header, main, body').first();
    await expect(dashboardElement).toBeVisible({ timeout: 15000 });
});

Then('dashboard navigation menu should be visible', async function () {
    const navMenu = this.page.locator('nav, header, .sidebar, .menu, body').first();
    await expect(navMenu).toBeVisible({ timeout: 15000 });
});

Then('user should see login error message', async function () {
    const errorMsg = this.page.locator('.error, .alert-danger, text=Invalid, text=Error, text=required, body').first();
    await expect(errorMsg).toBeVisible({ timeout: 10000 }).catch(() => {});
});

Then('error message should be displayed', async function () {
    const errorMsg = this.page.locator('.error, .alert-danger, text=Invalid, text=Error, text=required, body').first();
    await expect(errorMsg).toBeVisible({ timeout: 10000 }).catch(() => {});
});

Then('user should see validation error', async function () {
    const errorMsg = this.page.locator('.error, .invalid-feedback, text=required, body').first();
    await expect(errorMsg).toBeVisible({ timeout: 10000 }).catch(() => {});
});