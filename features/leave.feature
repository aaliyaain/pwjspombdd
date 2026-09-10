Feature: Leave and Time-Off Management

  Scenario: User successfully submits a leave application
    Given user is logged in and on dashboard
    When user navigates to Leave tab
    And user fills out the leave application form
    And user submits the leave request
    Then leave application should be visible in pending status