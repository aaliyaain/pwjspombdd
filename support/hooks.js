const { Before, After, BeforeAll, AfterAll, setDefaultTimeout } = require('@cucumber/cucumber');
const { chromium } = require('@playwright/test');
const LoginPage = require('../pages/loginPage');

setDefaultTimeout(60000);

let browser;

BeforeAll(async function () {
    browser = await chromium.launch({ 
        headless: false,
        args: ['--start-maximized', '--use-fake-ui-for-media-stream'] 
    });
});

Before(async function () {
    this.context = await browser.newContext({ 
        viewport: null,
        permissions: ['camera', 'geolocation']
    });
    this.page = await this.context.newPage();
    this.loginPage = new LoginPage(this.page);
});

After(async function () {
    if (this.page) await this.page.close();
    if (this.context) await this.context.close();
});

AfterAll(async function () {
    if (browser) await browser.close();
});