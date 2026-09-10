Feature: Admin Time Summary Report Export

  Scenario: Admin successfully exports the monthly time summary excel report
    Given Admin is logged in and on the admin dashboard
    When Admin navigates to Time Summary
    And Admin exports the monthly report to Excel
    Then the time summary report file should be downloaded successfully