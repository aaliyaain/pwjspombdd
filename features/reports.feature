Feature: Reporting and Analytics
  As a logged-in user
  I want to view and export quotation reports
  So that I can track business metrics

  @smoke @reports
  Scenario: User views quotation reports
    Given user is logged in and on dashboard
    When user clicks view reports button
    Then user should see the reports page
    And reports should not be empty

  @reports
  Scenario: User filters reports by date
    Given user is logged in and on dashboard
    When user clicks view reports button
    And user filters reports by date
    Then reports should not be empty

  @reports
  Scenario: User exports reports
    Given user is logged in and on dashboard
    When user clicks view reports button
    And user exports the reports
    Then user should see quotation report data

  @reports
  Scenario: Reports page displays correctly
    Given user is logged in and on dashboard
    When user clicks view reports button
    Then user should see the reports page
    And reports should not be empty
    And user should see quotation report data
