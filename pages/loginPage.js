class LoginPage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;
        // Robust selectors for BPMSquare Login inputs
        this.usernameInput = page.locator('input[name="username"], input[name="email"], input[type="text"], input[type="email"]').first();
        this.passwordInput = page.locator('input[name="password"], input[type="password"]').first();
        this.loginButton = page.locator('button[type="submit"], input[type="submit"]').first();
        
        // Assertions elements
        this.dashboardElement = page.locator('.dashboard, #dashboard, nav, header, main').first();
        this.errorMessage = page.locator('.error, .alert, .alert-danger, [role="alert"]').first();
    }

    async navigate() {
        await this.page.goto('https://bim.bpmsquare.com/login', { waitUntil: 'domcontentloaded' });
    }

    async login(username, password) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }
}

// Support both export models to avoid "is not a constructor" issues across files
module.exports = LoginPage;
module.exports.LoginPage = LoginPage;