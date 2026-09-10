Feature: Dashboard Navigation

  Scenario: Verify dashboard elements after successful login
    Given user is on the login page
    When user logs in with credentials "aliyaain0207@gmail.com" and "sameena123"
    Then user should see the dashboard
    And dashboard navigation menu should be visible