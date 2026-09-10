// Helper utilities for test automation

class TestHelpers {
  /**
   * Wait for a specific number of milliseconds
   */
  static wait(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
  }

  /**
   * Generate a random email address
   */
  static generateRandomEmail(prefix = 'test') {
    const timestamp = Date.now();
    return `${prefix}-${timestamp}@bpmsquare.test`;
  }

  /**
   * Generate a random alphanumeric string
   */
  static generateRandomString(length = 10) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  /**
   * Format currency
   */
  static formatCurrency(amount, currency = 'USD') {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(amount);
  }

  /**
   * Get current date as string
   */
  static getCurrentDate(format = 'yyyy-mm-dd') {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    
    if (format === 'yyyy-mm-dd') {
      return `${year}-${month}-${day}`;
    }
    return new Date().toISOString();
  }

  /**
   * Retry a function n times
   */
  static async retry(fn, retries = 3, delay = 1000) {
    for (let i = 0; i < retries; i++) {
      try {
        return await fn();
      } catch (error) {
        if (i === retries - 1) throw error;
        await this.wait(delay);
      }
    }
  }
}

module.exports = TestHelpers;
