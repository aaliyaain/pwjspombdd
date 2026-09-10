Feature: Login functionality

  Scenario: Successful login with valid credentials
    Given user is on login page
    When user enters valid env credentials
    Then user should see the dashboard

  Scenario Outline: Login validation with invalid credentials
    Given user is on login page
    When user enters username "<username>" and password "<password>"
    Then error message should be displayed

    Examples:
      | username              | password   |
      | wronguser@gmail.com   | wrongpass  |
      | invaliduser@gmail.com | sameena123 |