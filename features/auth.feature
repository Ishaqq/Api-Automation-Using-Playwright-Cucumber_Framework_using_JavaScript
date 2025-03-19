Feature: API Authentication & Data Retrieval

    Scenario: Login and Get Token
        Given I send a POST request to "/login" with the following data:
            | email              | password   |
            | eve.holt@reqres.in | cityslicka |
        Then the response status should be 200
        And I store the access token

    Scenario: Fetch Users Using Token
        Given I send a GET request to "/users?page=2" with the stored token
        Then the response status should be 200
        And the response should contain a list of users

    Scenario: Create a Post with Headers and Query Params
        Given I send a POST request to "/posts?draft=true" with headers and the following data:
            | key    | value          |
            | title  | New API Post   |
            | body   | Sample Content |
            | userId | 2              |
        Then the response status should be 201
        And the response should contain the same post data
