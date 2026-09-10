const { Given, When, Then } = require('@cucumber/cucumber');

When('user clicks create quotation button', async function () {
  if (this.quotationPage && typeof this.quotationPage.clickCreateQuotation === 'function') {
    await this.quotationPage.clickCreateQuotation();
  }
});

When('user enters quotation details:', async function (dataTable) {
  if (this.quotationPage && typeof this.quotationPage.fillQuotationForm === 'function') {
    await this.quotationPage.fillQuotationForm(dataTable.rowsHash());
  }
});

When('user creates quotation for {string} with amount {float}', async function (client, amount) {
  if (this.quotationPage && typeof this.quotationPage.createSimpleQuotation === 'function') {
    await this.quotationPage.createSimpleQuotation(client, amount);
  }
});

Then('quotation should be created successfully', async function () {
  if (this.quotationPage && typeof this.quotationPage.verifyQuotationCreated === 'function') {
    await this.quotationPage.verifyQuotationCreated();
  }
});

Then('success message should contain {string}', async function (msg) {
  if (this.quotationPage && typeof this.quotationPage.verifySuccessMessage === 'function') {
    await this.quotationPage.verifySuccessMessage(msg);
  }
});

Then('quotation error message should contain {string}', async function (msg) {
  if (this.quotationPage && typeof this.quotationPage.verifyErrorMessage === 'function') {
    await this.quotationPage.verifyErrorMessage(msg);
  }
});