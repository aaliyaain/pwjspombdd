Feature: Admin Roster Schedule Management

  Scenario: Admin views and manages workforce roster shifts
    Given Admin is logged in and on the admin dashboard
    When Admin navigates to Roster Management
    Then the employee roster matrix table should be displayed successfully