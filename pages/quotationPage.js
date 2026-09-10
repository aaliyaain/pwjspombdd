// pages/quotationPage.js
const { expect } = require('@playwright/test');

class QuotationPage {
  constructor(page) {
    this.page = page;
    this.clientInput = page.locator('#client-name');
    this.amountInput = page.locator('#quote-amount');
    this.submitBtn = page.locator('#submit-quote');
    this.successAlert = page.locator('.alert-success');
  }

  async createQuotation(client, amount) {
    await this.clientInput.fill(client);
    await this.amountInput.fill(amount);
    await this.submitBtn.click();
  }

  // --- ASSERTIONS ---
  async verifyQuotationCreated() {
    await expect(this.successAlert).toBeVisible();
  }
}

module.exports = { QuotationPage };