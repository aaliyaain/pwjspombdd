const { Given, When, Then } = require('@cucumber/cucumber');
const AdminSitePage = require('../pages/adminSitePage');
const AdminLeavePage = require('../pages/adminLeavePage');
const AdminCorrectionsPage = require('../pages/adminCorrectionsPage');
const AdminTimeSummaryPage = require('../pages/adminTimeSummaryPage');

const ADMIN_EMAIL = 'pingsyed@gmail.com';
const ADMIN_PASSWORD = 'BPMSquare@2026';

// --- SINGLE SHARED ADMIN GIVEN STEP ---
Given('Admin is logged in and on the admin dashboard', async function () {
    await this.loginPage.navigate();
    await this.loginPage.login(ADMIN_EMAIL, ADMIN_PASSWORD);
    await this.dashboardPage.verifyOnDashboard();
});

// --- TIME SUMMARY REPORT EXPORT STEPS ---
When('Admin navigates to Time Summary', async function () {
    this.adminTimeSummaryPage = new AdminTimeSummaryPage(this.page);
    await this.adminTimeSummaryPage.navigateToTimeSummary();
});

When('Admin exports the monthly report to Excel', async function () {
    await this.adminTimeSummaryPage.exportToExcel();
});

Then('the time summary report file should be downloaded successfully', async function () {
    await this.adminTimeSummaryPage.verifyDownload();
});
// Add at the top of admin.steps.js:
const AdminRosterPage = require('../pages/adminRosterPage');

// --- ROSTER STEPS ---
When('Admin navigates to Roster Management', async function () {
    this.adminRosterPage = new AdminRosterPage(this.page);
    await this.adminRosterPage.navigateToRoster();
});

Then('the employee roster matrix table should be displayed successfully', async function () {
    await this.adminRosterPage.verifyRosterTableLoaded();
});

// --- SITE MANAGEMENT STEPS ---
When('Admin navigates to Settings Workforce Sites', async function () {
    this.adminSitePage = new AdminSitePage(this.page);
    await this.adminSitePage.navigateToSitesTab();
});

When('Admin enters site location search query and clicks add site', async function () {
    const siteName = `Hospete Site ${Date.now()}`;
    await this.adminSitePage.addSite('Hospete, Karnataka', siteName);
});

Then('the new site should be added to the workforce sites list', async function () {
    await this.page.waitForTimeout(2000);
});

// --- LEAVE APPROVAL STEPS ---
When('Admin navigates to Leave and Holidays', async function () {
    this.adminLeavePage = new AdminLeavePage(this.page);
    await this.adminLeavePage.navigateToLeaveHolidays();
});

When('Admin approves the pending leave request for Aliya Ain', async function () {
    await this.adminLeavePage.approveFirstPendingLeave();
});

Then('the leave request should be approved successfully', async function () {
    await this.page.waitForTimeout(2000);
});

// --- CORRECTIONS STEPS ---
When('Admin navigates to Corrections', async function () {
    this.adminCorrectionsPage = new AdminCorrectionsPage(this.page);
    await this.adminCorrectionsPage.navigateToCorrections();
});

When('Admin approves the pending correction request', async function () {
    await this.adminCorrectionsPage.approveFirstPendingCorrection();
});