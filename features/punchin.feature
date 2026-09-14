Feature: Punch In and Out functionality

  Scenario: Perform Check In and Check Out with 1 minute delay
    Given user is logged in
    When User clicks on the Check In button
    And User waits for 1 minute
    And User clicks on the Check Out button
    Then punch operation should complete successfully