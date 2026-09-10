# ⚡ Quick Start Guide - 5 Minutes to Automation

## **Step 1: Open Terminal**
Navigate to this folder:
```bash
cd "C:\Users\aliya\OneDrive\Desktop\BPMSqaure QA evidence\pwjspombdd"
```

## **Step 2: Install Dependencies** (2 min)
```bash
npm install
npx playwright install
```

## **Step 3: Configure Your Environment** (1 min)
Create `.env` file from the template:
```bash
copy .env.example .env
```

Edit `.env` and update these values with YOUR BpmSquare details:
```
BASE_URL=http://your-app-url.com
LOGIN_URL=http://your-app-url.com/login
TEST_USERNAME=your-username@example.com
TEST_PASSWORD=your-password
HEADLESS=true
```

## **Step 4: Run Tests** (2 min)
```bash
npm test
```

You'll see:
- ✅ Tests running in your browser (if HEADLESS=false)
- 📊 Results in the terminal
- 📄 HTML report generated at: `reports/cucumber-report.html`

## 🎯 Common Commands

```bash
# Run all tests
npm test

# Run only smoke tests
npx cucumber-js --tags "@smoke"

# Run in headed mode (see browser)
HEADLESS=false npm test

# Run specific feature
npx cucumber-js features/login.feature

# Run with slow motion (debug mode)
SLOW_MO=500 npm test

# Run parallel
npm run test:parallel
```

## 📂 What's Included

| Folder | Purpose |
|--------|---------|
| `features/` | Business-readable test scenarios (Gherkin) |
| `step-definitions/` | Test code mapping scenarios to Page Objects |
| `pages/` | Page Object Model (UI locators + methods) |
| `support/` | Browser setup & test lifecycle (hooks) |
| `utils/` | Test data & helper functions |
| `reports/` | Test results & HTML reports |

## 🔍 Locate Your Test Results

After running `npm test`:
1. **Terminal output** - Shows pass/fail summary
2. **HTML Report** - Open `reports/cucumber-report.html` in browser for detailed view
3. **JSON Report** - `reports/cucumber-report.json` for CI/CD tools

## 🆘 Troubleshooting

**Tests won't run?**
```bash
npx playwright install
```

**Browser won't open?**
```bash
HEADLESS=false npm test  # To see what's happening
```

**Locators not found?**
- Update selectors in `pages/*.js` to match YOUR application's HTML
- Use Playwright Inspector: `PWDEBUG=1 npx cucumber-js features/login.feature`

**Tests timeout?**
- Increase TIMEOUT in `.env`: `TIMEOUT=60000`
- Or increase individual page load waits in `pages/*.js`

## 📝 Add Your Own Tests

### 1. Create Feature File
```gherkin
# features/myfeature.feature
Feature: My Feature
  Scenario: My Test
    Given user is logged in and on dashboard
    When user performs action
    Then something should happen
```

### 2. Add Step Definition
```javascript
// step-definitions/myfeature.steps.js
When('user performs action', async function() {
  // Write automation code here
});
```

### 3. Run It
```bash
npx cucumber-js features/myfeature.feature
```

## 📊 Understanding the Framework

```
Gherkin (.feature)  →  Step Definition (.steps.js)  →  Page Object (.js)
↓                       ↓                              ↓
"When user clicks    "await this.loginPage       "async click() {
 the login button"     .clickLogin()"              this.page.click(...)"
```

The **World** class (`support/world.js`) connects everything by providing:
- `this.page` - The browser page
- `this.loginPage` - Page Object instance
- `this.dashboardPage` - Another page instance
- etc.

## ✨ Key Features

✅ **Page Object Model** - Clean, reusable locator management  
✅ **Gherkin Scenarios** - Business-readable test cases  
✅ **Multi-browser** - Test on Chromium, Firefox, or WebKit  
✅ **Parallel Execution** - Run tests faster  
✅ **Screenshot Capture** - Debug failures easily  
✅ **HTML Reports** - Beautiful test reports  
✅ **Environment Config** - Swap URLs/credentials per environment  
✅ **Tag Filtering** - Run specific test categories  

## 🎓 Next Steps

1. **Customize Pages** - Update `pages/*.js` with YOUR app's locators
2. **Update Credentials** - Set correct TEST_USERNAME/PASSWORD in `.env`
3. **Create Features** - Write your own `.feature` files in `features/`
4. **Run & Iterate** - Execute tests and refine as needed

---

**Questions?** Read the full [README.md](README.md) for detailed documentation.

**Let's automate! 🚀**
