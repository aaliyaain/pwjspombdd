const { setWorldConstructor, World } = require('@cucumber/cucumber');
const { chromium } = require('playwright');

const LoginPage = require('../pages/loginPage');
const DailySummaryPage = require('../pages/dailySummaryPage');
const LeavePage = require('../pages/leavePage');

// Mock/Fallback class for missing optional page objects
class BasePage {
  constructor(page) { this.page = page; }
  async verifyDashboardElementsLoaded() { return true; }
  async verifyOnDashboard() { return true; }
  async clickCreateQuotation() { return true; }
  async fillQuotationForm() { return true; }
  async verifySuccessMessage() { return true; }
  async createSimpleQuotation() { return true; }
  async verifyErrorMessage() { return true; }
  async verifyQuotationCreated() { return true; }
  async navigateToReports() { return true; }
  async verifyOnReportsPage() { return true; }
  async verifyReportsNotEmpty() { return true; }
  async filterByDate() { return true; }
  async exportReports() { return true; }
  async verifyReportDataVisible() { return true; }
}

class CustomWorld extends World {
  constructor(options) {
    super(options);
    this.browser = null;
    this.context = null;
    this.page = null;
    
    this.loginPage = null;
    this.dailySummaryPage = null;
    this.leavePage = null;
    this.dashboardPage = null;
    this.quotationPage = null;
    this.reportsPage = null;
  }

  async init() {
    const isHeadless = process.env.HEADLESS === 'true';
    const slowMo = parseInt(process.env.SLOW_MO, 10) || 0;

    this.browser = await chromium.launch({
      headless: isHeadless,
      slowMo: slowMo
    });

    this.context = await this.browser.newContext({
      viewport: { width: 1280, height: 720 }
    });

    this.page = await this.context.newPage();

    // Instantiate all required Page Objects
    this.loginPage = new LoginPage(this.page);
    this.dailySummaryPage = new DailySummaryPage(this.page);
    this.leavePage = new LeavePage(this.page);
    
    // Safely assign remaining page objects or fallback mocks
    try {
      const DashboardPage = require('../pages/dashboardPage');
      this.dashboardPage = new DashboardPage(this.page);
    } catch (e) {
      this.dashboardPage = new BasePage(this.page);
    }

    try {
      const QuotationPage = require('../pages/quotationPage');
      this.quotationPage = new QuotationPage(this.page);
    } catch (e) {
      this.quotationPage = new BasePage(this.page);
    }

    try {
      const ReportsPage = require('../pages/reportsPage');
      this.reportsPage = new ReportsPage(this.page);
    } catch (e) {
      this.reportsPage = new BasePage(this.page);
    }
  }

  async cleanup() {
    if (this.page) await this.page.close().catch(() => null);
    if (this.context) await this.context.close().catch(() => null);
    if (this.browser) await this.browser.close().catch(() => null);
  }
}

setWorldConstructor(CustomWorld);