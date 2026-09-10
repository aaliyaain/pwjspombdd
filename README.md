# BpmSquare QA Automation Framework

A complete **Behavior-Driven Development (BDD)** automation framework for testing BpmSquare using **Playwright** and **Cucumber.js**.

## 🏗️ Project Structure

```
pwjspombdd/
├── features/                 # Gherkin feature files (business-readable scenarios)
│   ├── login.feature
│   ├── quotation.feature
│   └── reports.feature
├── step-definitions/         # Glue code linking Gherkin to Page Objects
│   ├── login.steps.js
│   ├── quotation.steps.js
│   └── reports.steps.js
├── pages/                    # Page Object Model classes (locators + methods)
│   ├── loginPage.js
│   ├── dashboardPage.js
│   ├── quotationPage.js
│   └── reportPage.js
├── support/                  # Cucumber lifecycle & Page Object instantiation
│   ├── world.js              # Custom World class (browser + page instances)
│   └── hooks.js              # Before/After hooks (setup/cleanup)
├── utils/                    # Test utilities
│   ├── testData.js           # Test data & credentials
│   └── helpers.js            # Helper functions
├── reports/                  # Test execution reports (generated)
├── .env.example              # Environment configuration template
├── .gitignore                # Git ignore rules
├── cucumber.js               # Cucumber configuration
└── package.json              # Dependencies & npm scripts

```

## 🚀 Quick Start

### **Step 1: Initialize the Project**
```bash
npm init -y
```

### **Step 2: Install Dependencies**
```bash
npm i -D @playwright/test playwright @cucumber/cucumber cucumber-html-reporter dotenv
npx playwright install
```

### **Step 3: Configure Environment**
Copy the example environment file and update with your credentials:
```bash
cp .env.example .env
```

Edit `.env` and set:
```
BASE_URL=http://your-bpmsquare-url.com
LOGIN_URL=http://your-bpmsquare-url.com/login
TEST_USERNAME=your-test-username@example.com
TEST_PASSWORD=your-test-password
HEADLESS=true
BROWSER=chromium
```

### **Step 4: Run Tests**

**All tests:**
```bash
npm test
```

**Run specific feature:**
```bash
npx cucumber-js features/login.feature
```

**Run by tags (e.g., @smoke):**
```bash
npx cucumber-js --tags "@smoke"
```

**Run specific scenario:**
```bash
npx cucumber-js features/login.feature:5
```

**Parallel execution (2 workers):**
```bash
npm run test:parallel
```

## 📋 Feature Files (Gherkin)

### **Login Feature** (`features/login.feature`)
- ✅ Valid login
- ❌ Invalid password
- ❌ Empty credentials
- 📊 Login outline with multiple scenarios

### **Quotation Feature** (`features/quotation.feature`)
- ✅ Create quotation successfully
- ✅ Create with minimum details
- ❌ Missing client name
- ❌ Invalid amount
- 📊 Quotation outline for multiple clients

### **Reports Feature** (`features/reports.feature`)
- ✅ View reports page
- 🔍 Filter reports by date
- 📤 Export reports
- 📊 Reports data display

## 🏗️ Page Object Model (POM)

Each page has a dedicated class with:
- **Locators** - CSS selectors, XPath, or Playwright locators
- **Methods** - User actions (click, fill, submit)
- **Assertions** - Visibility checks, text validation

### Example: LoginPage
```javascript
class LoginPage {
  constructor(page) {
    this.page = page;
    this.usernameInput = 'input[name="username"]';
    this.passwordInput = 'input[name="password"]';
    this.loginButton = 'button[type="submit"]';
  }

  async login(username, password) {
    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);
  }
}
```

## 🔗 Step Definitions

Maps Gherkin to Page Object methods. Thin orchestration layer — no locators here.

```javascript
When('user logs in with credentials {string} and {string}', 
  async function(username, password) {
    await this.loginPage.login(username, password);
  }
);
```

## 🌍 World Class (`support/world.js`)

Custom Cucumber World that:
1. **Launches browser** (Chromium, Firefox, WebKit)
2. **Instantiates Page Objects** (`this.loginPage`, `this.dashboardPage`, etc.)
3. **Provides screenshot capability** for failure debugging

## 🎣 Hooks (`support/hooks.js`)

- **Before:** Initializes browser & navigates to base URL
- **After:** Takes screenshot on failure, cleans up resources

```javascript
Before(async function() {
  await this.init();
  await this.page.goto(process.env.BASE_URL);
});

After(async function(scenario) {
  if (scenario.result.status === 'FAILED') {
    await this.takeScreenshot(scenario.pickle.name);
  }
  await this.cleanup();
});
```

## 📊 Reports

After running tests:
```bash
npm test
```

Reports are generated in:
- **HTML:** `reports/cucumber-report.html` (user-friendly)
- **JSON:** `reports/cucumber-report.json` (CI/CD integration)

View the HTML report in a browser:
```bash
start reports/cucumber-report.html
```

## 🏷️ Tags & Filtering

Run only critical tests:
```bash
npx cucumber-js --tags "@smoke"
```

Run auth + quotation tests:
```bash
npx cucumber-js --tags "@auth or @quotation"
```

Skip negative tests:
```bash
npx cucumber-js --tags "not @negative"
```

Available tags:
- `@smoke` - Critical/smoke tests
- `@auth` - Authentication tests
- `@quotation` - Quotation management tests
- `@reports` - Reporting tests
- `@negative` - Negative/error scenarios

## 🛠️ Utilities

### Test Data (`utils/testData.js`)
Pre-defined test users and client data:
```javascript
const { testUsers, testClients } = require('./utils/testData');
```

### Helpers (`utils/helpers.js`)
- `generateRandomEmail()` - Create unique test emails
- `generateRandomString()` - Generate random strings
- `formatCurrency()` - Format monetary values
- `wait(ms)` - Wait for milliseconds
- `retry(fn, retries)` - Retry failed operations

## 📝 Environment Variables

Create `.env` based on `.env.example`:

```env
# BpmSquare URLs
BASE_URL=https://bim.bpmsquare.com
LOGIN_URL=https://bim.bpmsquare.com/login

# Test Credentials
TEST_USERNAME=aliyaain0207@gmail.com
TEST_PASSWORD=sameena123

# Playwright Config
HEADLESS=true
BROWSER=chromium
SLOW_MO=0
TIMEOUT=30000

# Screenshots
SCREENSHOT_ON_FAILURE=true
VIDEO_ON_FAILURE=false
```

## 🐛 Debugging

### Run in headed mode (see browser):
```bash
HEADLESS=false npm test
```

### Run with slow motion (500ms between actions):
```bash
SLOW_MO=500 npm test
```

### Run specific scenario with debug:
```bash
DEBUG=pw:api npx cucumber-js features/login.feature:5
```

### View test with playwright inspector:
```bash
PWDEBUG=1 npx cucumber-js features/login.feature:5
```

## 🔄 Continuous Integration (CI/CD)

### GitHub Actions Example
```yaml
name: Automation Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm install
      - run: npx playwright install
      - run: npm test
      - uses: actions/upload-artifact@v2
        if: always()
        with:
          name: test-reports
          path: reports/
```

## ✅ Best Practices

1. **Keep Page Objects focused** - One class per page/module
2. **Use descriptive step names** - Gherkin should be business-readable
3. **Avoid locator hardcoding** - Define in POM classes
4. **Use data tables** - For complex test data
5. **Tag scenarios** - For easy filtering & CI integration
6. **Keep steps thin** - Orchestration only, logic in POM
7. **Environment-specific config** - Use `.env` for URLs/credentials
8. **Screenshot on failure** - Aids debugging

## 🆘 Troubleshooting

### Tests won't run
```bash
# Verify Playwright is installed
npx playwright install

# Check Node version (need 14+)
node --version

# Install dependencies fresh
rm -rf node_modules package-lock.json
npm install
```

### Browser won't launch
```bash
# Install system dependencies (Linux)
npx playwright install-deps

# Try different browser
BROWSER=firefox npm test
```

### Locators not found
```bash
# Run in headed mode to see what's on screen
HEADLESS=false npm test

# Use Playwright Inspector
PWDEBUG=1 npx cucumber-js features/login.feature
```

### Tests timeout
```bash
# Increase timeout in .env
TIMEOUT=60000

# Or for specific step (in step definition):
await this.page.waitForSelector(selector, { timeout: 60000 });
```

## 📚 Resources

- [Playwright Docs](https://playwright.dev)
- [Cucumber.js Docs](https://github.com/cucumber/cucumber-js)
- [BDD Best Practices](https://cucumber.io/docs/bdd/)
- [Page Object Model](https://playwright.dev/docs/pom)

## 👥 Contributing

1. Create feature branches for new scenarios
2. Follow Gherkin best practices
3. Update page objects for new UI changes
4. Add appropriate tags
5. Test locally before committing

## 📄 License

ISC

---

**Ready to run!** Execute `npm test` and watch your automation suite in action. 🎯
