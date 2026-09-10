module.exports = {
  default: {
    require: ['step-definitions/**/*.js', 'support/**/*.js'],
    format: ['progress', 'html:reports/cucumber-report.html'],
    timeout: 30000
  }
};