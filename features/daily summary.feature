Feature: Daily Summary

  Scenario: User views daily detailed attendance records
    Given user is on workforce page
    When user navigates to Time tab
    And user selects Daily detailed summary view
    Then daily attendance records table should be visible