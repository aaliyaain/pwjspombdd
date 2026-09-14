// support/world.js
const { setWorldConstructor, World } = require('@cucumber/cucumber');
const LoginPage = require('../pages/loginPage');
const DashboardPage = require('../pages/dashboardPage');
const PunchPage = require('../pages/punchPage');

class CustomWorld extends World {
  constructor(options) {
    super(options);
    this.browser = null;
    this.context = null;
    this.page = null;
    this.loginPage = null;
    this.dashboardPage = null;
    this.punchPage = null;
  }

  async init() {
    // Initialization logic here
  }
}

setWorldConstructor(CustomWorld);