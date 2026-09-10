Feature: Monthly Attendance Summary

  Scenario: User views overall monthly summary statistics
    Given user is on workforce dashboard
    When user navigates to Time tab
    And selects Monthly summary toggle
    Then monthly statistics cards should be displayed