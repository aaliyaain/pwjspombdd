require('dotenv').config();
const { Before, After, Status, setDefaultTimeout } = require('@cucumber/cucumber');

// Global step execution budget set to 60 seconds
setDefaultTimeout(60000);

Before(async function () {
  await this.init();
});

After(async function (scenario) {
  if (scenario.result?.status === Status.FAILED && this.page) {
    const screenshot = await this.page.screenshot({ 
      path: `screenshots/failed-${Date.now()}.png`, 
      fullPage: true 
    }).catch(() => null);
    
    if (screenshot) {
      this.attach(screenshot, 'image/png');
    }
  }

  await this.cleanup();
});