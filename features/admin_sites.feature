Feature: Admin Site Creation Management

  Scenario: Admin successfully navigates to settings and adds a new site
    Given Admin is logged in and on the dashboard
    When Admin navigates to Settings Workforce Sites
    And Admin enters site location search query and clicks add site
    Then the new site should be added to the workforce sites list