Feature: Admin Leave Request Approval

  Scenario: Admin successfully approves a pending leave request
    Given Admin is logged in and on the admin dashboard
    When Admin navigates to Leave and Holidays
    And Admin approves the pending leave request for Aliya Ain
    Then the leave request should be approved successfully