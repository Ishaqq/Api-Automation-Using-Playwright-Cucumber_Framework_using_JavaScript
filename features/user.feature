Feature: API Testing with Playwright

  Scenario: Validate Schema for GET Users API
    Given I send a GET request to "/users"
    Then the response status should be "200"
    And the response should match the user schema

  Scenario: Create a New Post
    Given I send a POST request to "/posts" with the following data:
      | title                  | body                   | userId        |
      | Playwright API Test    | This is a sample post. | 1             |             
    Then the response status should be "201"
    And the response should contain the same data
