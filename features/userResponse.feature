Feature: API response validation using POJO-like classes in Playwright

  Scenario: Get users and validate response
    Given I send a GET request to the users API pojo
    Then the responseBody should contain valid user data pojo
    And the responseBody status should be 200 pojo
    And the responseTime should be less than 500ms pojo