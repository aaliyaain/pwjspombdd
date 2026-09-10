Feature: Quotation Management
  As a logged-in user
  I want to create and manage quotations
  So that I can generate client quotes

  @smoke @quotation
  Scenario: User creates a new quotation successfully
    Given user is logged in and on dashboard
    When user clicks create quotation button
    And user enters quotation details:
      | Client Name | ACME Corporation    |
      | Amount      | 5000.00             |
      | Description | Website Development |
    Then quotation should be created successfully
    And success message should contain "created"

  @quotation
  Scenario: User creates quotation with minimum details
    Given user is logged in and on dashboard
    When user clicks create quotation button
    And user creates quotation for "Test Client" with amount 1000.50
    Then quotation should be created successfully

  @quotation @negative
  Scenario: Quotation creation fails with empty client name
    Given user is logged in and on dashboard
    When user clicks create quotation button
    And user enters quotation details:
      | Client Name |                |
      | Amount      | 5000.00        |
      | Description | Test quotation |
    Then quotation error message should contain "Client Name is required"

  @quotation @negative
  Scenario: Quotation creation fails with invalid amount
    Given user is logged in and on dashboard
    When user clicks create quotation button
    And user enters quotation details:
      | Client Name | Test Client    |
      | Amount      | invalid        |
      | Description | Test quotation |
    Then quotation error message should contain "valid amount"

  @quotation
  Scenario Outline: Create quotations for multiple clients
    Given user is logged in and on dashboard
    When user clicks create quotation button
    And user creates quotation for "<client_name>" with amount <amount>
    Then quotation should be created successfully

    Examples:
      | client_name         | amount   |
      | Acme Corp           | 5000.00  |
      | Beta Industries     | 7500.00  |
      | Gamma Tech          | 3200.50  |
      | Delta Solutions     | 12000.00 |
