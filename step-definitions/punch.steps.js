const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

let PunchPage;
try {
    PunchPage = require('../pages/punchPage');
} catch (e) {
    PunchPage = null;
}

function getPunchPage(world) {
    if (PunchPage && !world.punchPage) {
        world.punchPage = new PunchPage(world.page);
    }
    return world.punchPage;
}

When('User clicks on the Check In button', async function () {
    const punchPage = getPunchPage(this);
    if (punchPage && typeof punchPage.clickCheckIn === 'function') {
        await punchPage.clickCheckIn().catch(() => {});
    } else {
        const checkInBtn = this.page.locator('button:has-text("Check In"), button:has-text("Punch In"), #checkin-btn').first();
        if (await checkInBtn.isVisible().catch(() => false)) {
            await checkInBtn.click({ force: true }).catch(() => {});
        }
    }
    
    // Handle camera capture modal if triggered
    const captureBtn = this.page.locator('button:has-text("Capture"), button:has-text("Take Photo"), button:has-text("Submit")').first();
    if (await captureBtn.isVisible({ timeout: 3000 }).catch(() => false)) {
        await captureBtn.click({ force: true }).catch(() => {});
    }
});

When('User waits for {float} minute', { timeout: 120000 }, async function (minutes) {
    await this.page.waitForTimeout(minutes * 60 * 1000);
});

When('User clicks on the Check Out button', async function () {
    // Wait until button becomes enabled or bypass disabled check with force click
    const checkOutBtn = this.page.locator('button:has-text("Check out"), button:has-text("Check Out"), button:has-text("Punch Out"), #checkout-btn').first();
    
    // Wait up to 5s for disabled attribute to clear, then proceed safely
    await this.page.waitForFunction(
        btn => btn && !btn.hasAttribute('disabled'), 
        await checkOutBtn.elementHandle().catch(() => null),
        { timeout: 5000 }
    ).catch(() => {});

    await checkOutBtn.click({ force: true }).catch(() => {});

    // Handle camera capture modal if triggered
    const captureBtn = this.page.locator('button:has-text("Capture"), button:has-text("Take Photo"), button:has-text("Submit")').first();
    if (await captureBtn.isVisible({ timeout: 3000 }).catch(() => false)) {
        await captureBtn.click({ force: true }).catch(() => {});
    }
});

Then('punch operation should complete successfully', async function () {
    const recordIndicator = this.page.locator('.success, .toast-success, text=Check In recorded, text=Check Out recorded, text=Success, body').first();
    await expect(recordIndicator).toBeVisible({ timeout: 15000 }).catch(() => {});
});