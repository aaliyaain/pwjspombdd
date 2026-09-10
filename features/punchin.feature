Feature: Workforce Punch

  Background:
    Given user is logged in
    And user is on the workforce punch screen

  Scenario: User successfully punches in with selfie capture
    When user clicks green punch button
    And user captures selfie and punches in
    Then punch in status should be updated to checked in

  Scenario: User successfully punches out with selfie capture
    When user clicks red punch button
    And user captures selfie and punches out
    Then punch out status should be updated to checked out