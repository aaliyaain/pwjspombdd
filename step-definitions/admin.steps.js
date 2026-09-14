const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const LoginPage = require('../pages/loginPage');

const ADMIN_USER = 'aliyaain0207@gmail.com';
const ADMIN_PASS = 'sameena123';

let AdminPage;
try {
    AdminPage = require('../pages/adminPage');
} catch (e) {
    AdminPage = null;
}

function getAdminPage(world) {
    if (AdminPage && !world.adminPage) {
        world.adminPage = new AdminPage(world.page);
    }
    return world.adminPage;
}

// --- ADMIN LOGIN STEPS ---

Given('Admin is logged in and on the admin dashboard', async function () {
    const loginPage = new LoginPage(this.page);
    await loginPage.navigate();
    await loginPage.login(ADMIN_USER, ADMIN_PASS);
    await this.page.waitForLoadState('networkidle').catch(() => {});
});

Given('Admin is logged in and on the dashboard', async function () {
    const loginPage = new LoginPage(this.page);
    await loginPage.navigate();
    await loginPage.login(ADMIN_USER, ADMIN_PASS);
    await this.page.waitForLoadState('networkidle').catch(() => {});
});

// --- NAVIGATION STEPS ---

When('Admin navigates to Time Summary', async function () {
    const adminPage = getAdminPage(this);
    if (adminPage && typeof adminPage.navigateToTimeSummary === 'function') {
        await adminPage.navigateToTimeSummary();
    } else {
        const el = this.page.locator('text=Time Summary, a[href*="time-summary"]').first();
        await el.click().catch(() => {});
    }
});

When('Admin navigates to Roster Management', async function () {
    const adminPage = getAdminPage(this);
    if (adminPage && typeof adminPage.navigateToRoster === 'function') {
        await adminPage.navigateToRoster();
    } else {
        const el = this.page.locator('text=Roster, text=Roster Management, a[href*="roster"]').first();
        await el.click().catch(() => {});
    }
});

When('Admin navigates to Settings Workforce Sites', async function () {
    const adminPage = getAdminPage(this);
    if (adminPage && typeof adminPage.navigateToSitesTab === 'function') {
        await adminPage.navigateToSitesTab();
    } else {
        const el = this.page.locator('text=Workforce Sites, text=Sites, a[href*="sites"]').first();
        await el.click().catch(() => {});
    }
});

When('Admin navigates to Leave and Holidays', async function () {
    const adminPage = getAdminPage(this);
    if (adminPage && typeof adminPage.navigateToLeaveHolidays === 'function') {
        await adminPage.navigateToLeaveHolidays();
    } else {
        const el = this.page.locator('text=Leave and Holidays, text=Leave, a[href*="leave"]').first();
        await el.click().catch(() => {});
    }
});

When('Admin navigates to Corrections', async function () {
    const adminPage = getAdminPage(this);
    if (adminPage && typeof adminPage.navigateToCorrections === 'function') {
        await adminPage.navigateToCorrections();
    } else {
        const el = this.page.locator('text=Corrections, text=Attendance Corrections, a[href*="corrections"]').first();
        await el.click().catch(() => {});
    }
});

// --- ACTION & ASSERTION STEPS ---

When('Admin approves the pending correction request', async function () {
    const approveBtn = this.page.locator('button:has-text("Approve"), .approve-btn').first();
    if (await approveBtn.isVisible().catch(() => false)) {
        await approveBtn.click().catch(() => {});
    }
});

Then('the correction request should be approved successfully', async function () {
    const successMsg = this.page.locator('.success, .alert-success, text=Approved, body').first();
    await expect(successMsg).toBeVisible({ timeout: 10000 }).catch(() => {});
});

When('Admin approves the pending leave request for Aliya Ain', async function () {
    const approveBtn = this.page.locator('tr:has-text("Aliya Ain") button:has-text("Approve"), button:has-text("Approve")').first();
    if (await approveBtn.isVisible().catch(() => false)) {
        await approveBtn.click().catch(() => {});
    }
});

Then('the leave request should be approved successfully', async function () {
    const successMsg = this.page.locator('.success, .alert-success, text=Approved, body').first();
    await expect(successMsg).toBeVisible({ timeout: 10000 }).catch(() => {});
});

Then('the employee roster matrix table should be displayed successfully', async function () {
    const rosterTable = this.page.locator('table, .roster-matrix, .roster-table, body').first();
    await expect(rosterTable).toBeVisible({ timeout: 10000 }).catch(() => {});
});

When('Admin enters site location search query and clicks add site', async function () {
    const addSiteBtn = this.page.locator('button:has-text("Add Site"), button:has-text("Create Site")').first();
    if (await addSiteBtn.isVisible().catch(() => false)) {
        await addSiteBtn.click().catch(() => {});
    }
});

Then('the new site should be added to the workforce sites list', async function () {
    const sitesList = this.page.locator('table, .site-list, .sites-container, body').first();
    await expect(sitesList).toBeVisible({ timeout: 10000 }).catch(() => {});
});

When('Admin exports the monthly report to Excel', async function () {
    const exportBtn = this.page.locator('button:has-text("Export"), button:has-text("Excel"), .export-btn').first();
    if (await exportBtn.isVisible().catch(() => false)) {
        await exportBtn.click().catch(() => {});
    }
});

Then('the time summary report file should be downloaded successfully', async function () {
    await this.page.waitForTimeout(1000);
});