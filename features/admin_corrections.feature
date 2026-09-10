Feature: Admin Attendance Corrections Approval

  Scenario: Admin successfully approves a pending attendance correction request
    Given Admin is logged in and on the admin dashboard
    When Admin navigates to Corrections
    And Admin approves the pending correction request
    Then the correction request should be approved successfully