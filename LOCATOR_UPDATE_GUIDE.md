# 🔍 How to Update Locators for Your BpmSquare Application

This guide shows you how to find and update the element locators in the Page Object files to match your specific BpmSquare application.

## **Overview of the Task**

The framework currently has **placeholder locators** that work with generic applications. You need to:
1. Inspect your BpmSquare app's HTML
2. Find the actual element selectors (CSS, XPath, etc.)
3. Update the locators in `pages/*.js` files
4. Test to ensure they work

---

## **🛠️ 4-Step Process**

### **Step 1: Open Your BpmSquare Application**

1. Start your BpmSquare app in a browser
2. Right-click on an element (e.g., login button) and select **"Inspect"** or **"Inspect Element"**
3. The browser's Developer Tools will open with the HTML highlighted

```
Example: Right-clicking a login button shows:
<button type="submit" class="btn btn-primary" id="loginBtn">
  Login
</button>
```

---

### **Step 2: Identify the Selector Type**

You can locate elements using different methods. Pick the BEST one for each element:

#### **Option A: CSS Selectors (Recommended - Fastest)**
```javascript
// By ID
'#loginBtn'                                    // id="loginBtn"

// By class
'.btn.btn-primary'                             // class="btn btn-primary"
'button.btn-primary'                           // <button class="btn-primary">

// By attribute
'input[name="username"]'                       // name="username"
'input[type="password"]'                       // type="password"

// By text content
'button:has-text("Login")'                     // Button containing text "Login"
'a:has-text("Dashboard")'                      // Link containing text "Dashboard"

// Complex selectors
'div.form-group input[type="email"]'           // Nested selector
'form#loginForm button[type="submit"]'         // Form + button
```

#### **Option B: XPath (More Powerful)**
```javascript
// By text
'//button[contains(text(), "Login")]'
'//a[text()="Dashboard"]'

// By attribute
'//input[@name="username"]'
'//input[@type="password"]'

// By multiple conditions
'//button[@class="btn" and @type="submit"]'
'//div[@class="modal"]//input[@name="email"]'
```

#### **Option C: Data Attributes (Best for Complex UIs)**
```javascript
// Modern apps often have data-testid
'[data-testid="login-button"]'
'[data-testid="username-input"]'
'[data-qa="submit-btn"]'
```

---

### **Step 3: Update Each Page File**

Here's what needs updating in each file:

#### **📄 `pages/loginPage.js`**

**CURRENT (Placeholder):**
```javascript
this.usernameInput = 'input[name="username"]';
this.passwordInput = 'input[name="password"]';
this.loginButton = 'button[type="submit"]:has-text("Login")';
this.errorMessage = '.error-message, .alert-danger';
this.pageTitle = 'text=Login to BpmSquare';
```

**STEPS TO UPDATE:**

1. Open your BpmSquare login page in browser
2. Inspect the **username input field**
   - Look for: `<input ... >` element
   - Copy its `name`, `id`, `class`, or `data-*` attribute
   
3. Inspect the **password input field**
   - Look for: `<input type="password" ... >` element
   
4. Inspect the **login button**
   - Look for: `<button ... >Login</button>` or `<input type="submit" ... />`
   
5. Inspect the **error message area**
   - Look for: `<div class="error">`, `<p class="alert">`, etc.

**EXAMPLE UPDATE:**
```javascript
// If your BpmSquare has this HTML:
// <input id="user-email" type="text" placeholder="Email">
// <input id="user-password" type="password">
// <button id="btn-login" class="primary-action">Sign In</button>
// <div class="alert alert-error" id="login-error"></div>

this.usernameInput = '#user-email';           // Changed!
this.passwordInput = '#user-password';        // Changed!
this.loginButton = '#btn-login';              // Changed!
this.errorMessage = '#login-error';           // Changed!
this.pageTitle = 'text=Sign In';              // Changed to match your button text!
```

---

#### **📄 `pages/dashboardPage.js`**

**CURRENT (Placeholder):**
```javascript
this.userGreeting = 'text=Welcome';
this.dashboardTitle = 'h1:has-text("Dashboard")';
this.logoutButton = 'button:has-text("Logout")';
this.createQuotationBtn = 'button:has-text("Create Quotation")';
this.viewReportsBtn = 'button:has-text("Reports")';
this.quotationsList = 'table tbody tr';
```

**STEPS TO UPDATE:**

1. Login to BpmSquare and go to dashboard
2. Inspect each element:
   - Welcome/greeting message
   - Dashboard title/heading
   - Logout button
   - Create Quotation button
   - Reports/View Reports button
   - Quotations table (if exists)

**EXAMPLE UPDATE:**
```javascript
// If your dashboard has:
// <span class="user-name">Welcome, John</span>
// <h2>My Dashboard</h2>
// <button data-testid="nav-logout">Exit</button>
// <a class="nav-link" href="/quotations">New Quotation</a>
// <a class="nav-link" href="/reports">View Analytics</a>
// <div class="quotations-grid"></div>

this.userGreeting = '.user-name';
this.dashboardTitle = 'h2';                   // Or 'h2:has-text("Dashboard")'
this.logoutButton = '[data-testid="nav-logout"]';
this.createQuotationBtn = 'a[href="/quotations"]';
this.viewReportsBtn = 'a[href="/reports"]';
this.quotationsList = '.quotations-grid .item';
```

---

#### **📄 `pages/quotationPage.js`**

**CURRENT (Placeholder):**
```javascript
this.quotationTitle = 'h1:has-text("Create Quotation")';
this.clientNameInput = 'input[name="clientName"]';
this.amountInput = 'input[name="amount"]';
this.descriptionInput = 'textarea[name="description"]';
this.submitButton = 'button[type="submit"]:has-text("Submit")';
this.successMessage = '.success-message, .alert-success';
this.errorMessage = '.error-message, .alert-danger';
```

**STEPS TO UPDATE:**

1. Navigate to Create Quotation page
2. Inspect each form field
3. Check success/error message containers

**EXAMPLE UPDATE:**
```javascript
// If your form has:
// <h1>New Quote</h1>
// <input id="clientName" class="form-input" required>
// <input id="quoteAmount" type="number" step="0.01">
// <textarea id="quoteDesc"></textarea>
// <button class="btn-submit">Create Quote</button>
// <div id="toast-success"></div>
// <div id="toast-error"></div>

this.quotationTitle = 'h1';
this.clientNameInput = '#clientName';
this.amountInput = '#quoteAmount';
this.descriptionInput = '#quoteDesc';
this.submitButton = '.btn-submit';
this.successMessage = '#toast-success';
this.errorMessage = '#toast-error';
```

---

#### **📄 `pages/reportPage.js`**

**CURRENT (Placeholder):**
```javascript
this.reportTitle = 'h1:has-text("Reports")';
this.filterByDateBtn = 'button:has-text("Filter by Date")';
this.exportBtn = 'button:has-text("Export")';
this.reportTable = 'table tbody tr';
this.noDataMessage = 'text=No data available';
```

**STEPS TO UPDATE:**

1. Navigate to Reports page
2. Inspect the page title
3. Find filter buttons
4. Find export button
5. Inspect the report table/grid structure
6. Check empty state message

**EXAMPLE UPDATE:**
```javascript
// If your reports page has:
// <h2>Quotation Reports</h2>
// <button class="filter-btn" data-type="date">Filter by Date Range</button>
// <button class="export-btn" id="exportPDF">Download as PDF</button>
// <table class="reports-table">
// <tr class="report-row">...
// <div class="empty-state">No records found</div>

this.reportTitle = 'h2';
this.filterByDateBtn = '[data-type="date"]';
this.exportBtn = '#exportPDF';
this.reportTable = '.report-row';
this.noDataMessage = '.empty-state';
```

---

### **Step 4: Test the Locators**

#### **Method 1: Use Playwright Inspector (Recommended)**

This lets you test locators visually:

```bash
# Run in debug mode
PWDEBUG=1 npx cucumber-js features/login.feature
```

This opens Playwright Inspector. You can:
- Type locators in the "Selector" box at the top
- See if elements highlight on the page
- Adjust until it works

#### **Method 2: Quick Manual Test**

1. Run tests and see which ones fail
2. Check error messages for missing elements
3. Update locators and re-run

```bash
npm test
```

#### **Method 3: Validate Selectors in Browser Console**

Open browser DevTools > Console and test your selector:

```javascript
// Test CSS selector
document.querySelector('button.login-btn')    // Should return the element
document.querySelectorAll('table tbody tr')    // Should return all rows

// Test if element exists
if (document.querySelector('#loginBtn')) {
  console.log('✓ Selector works!')
} else {
  console.log('✗ Selector not found')
}
```

---

## **📋 Quick Reference Checklist**

- [ ] **loginPage.js** - Username, password, login button, error message
- [ ] **dashboardPage.js** - Welcome text, dashboard title, logout, buttons, table
- [ ] **quotationPage.js** - Form title, input fields, submit button, messages
- [ ] **reportPage.js** - Page title, filter buttons, export button, table, empty state
- [ ] Run `PWDEBUG=1 npx cucumber-js features/login.feature` to test
- [ ] Run `npm test` to execute full suite
- [ ] Check reports: `reports/cucumber-report.html`

---

## **🐛 Troubleshooting**

### **"Element not found" Error**
```
Error: Timeout 30000ms exceeded.
```
**Solution:**
1. Make sure the locator matches your app's HTML exactly
2. Use browser DevTools to inspect the element
3. Try a different selector (ID instead of class, or XPath instead of CSS)
4. Check if element loads dynamically (might need to wait for it)

### **Multiple Elements Match Selector**
```javascript
// If multiple buttons say "Submit", be more specific:
'form#quotationForm button[type="submit"]'  // Add parent context
'button.btn-primary:first-of-type'          // Get first one
'//button[@class="submit" and @id="btn-submit"]'  // XPath with multiple conditions
```

### **Element is Hidden/Not Visible**
```javascript
// Element exists but is not displayed
// Solution: Check if it needs scrolling or clicking parent element first
await this.page.locator(selector).scrollIntoViewIfNeeded();
```

### **Text-Based Selectors Not Working**
```javascript
// If `:has-text()` doesn't work, try exact match:
'button:has-text("Exact Text Here")'

// Or use XPath:
'//button[contains(text(), "Submit")]'
```

---

## **💡 Pro Tips**

1. **Use IDs when available** - They're the fastest and most reliable
   ```javascript
   '#loginBtn'  // Much better than complex CSS
   ```

2. **Avoid long class lists** - Pick the most unique class
   ```javascript
   '.btn-primary'  // Good
   '.btn.btn-primary.btn-lg.btn-active'  // Too complex
   ```

3. **Use data attributes** - Many modern apps provide these for testing
   ```javascript
   '[data-testid="submit-button"]'
   ```

4. **Test in multiple states** - Login, dashboard, different scenarios
   ```bash
   npx cucumber-js --tags "@login"
   npx cucumber-js --tags "@quotation"
   ```

5. **Keep a browser window open** - Use DevTools inspector while updating code

---

## **📚 Selector Resources**

- [Playwright Locators](https://playwright.dev/docs/locators)
- [CSS Selectors Reference](https://www.w3schools.com/cssref/selectors.asp)
- [XPath Tutorial](https://www.w3schools.com/xml/xpath_intro.asp)
- [Playwright Inspector Guide](https://playwright.dev/docs/inspector)

---

**Once you update all locators and tests pass, you're ready to integrate with your CI/CD pipeline!** ✨
