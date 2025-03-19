API Automation Using Playwright & Cucumber Framework (JavaScript)

This project implements an API automation framework using Playwright and Cucumber with JavaScript. The framework is designed to perform automated testing of RESTful APIs with a focus on flexibility, reusability, 
and maintainability.

Key Features:
Playwright is used to handle HTTP requests and responses efficiently, allowing for seamless integration with the API endpoints.
Cucumber enables Behavior-Driven Development (BDD), which allows writing test cases in plain language, making them easy to understand for both technical and non-technical stakeholders.
Test scenarios are defined in feature files, and step definitions are linked with API calls, making it easy to follow the given-when-then testing flow.
AJV (Another JSON Schema Validator) is integrated to validate API responses against predefined JSON schemas, ensuring that the structure of the data is correct.

Benefits:
Scalability: The framework is built to handle a wide range of API testing, from simple GET requests to complex POST, PUT, and DELETE requests.
The framework supports passing custom headers and dynamic payloads, making it suitable for testing various APIs that require authentication or special parameters.
Clear and Concise Reporting: Detailed test results are provided with easy-to-understand pass/fail outcomes, making it easier to track the progress of your tests.

Framework Structure:
Tests: Step definitions that interact with the API client to perform the desired actions.
API Client: A utility that handles the HTTP requests, including GET, POST, PUT, and DELETE operations.
Schemas: JSON schema files used to validate API responses and ensure data integrity.

Use Cases:
Automated testing for REST APIs.
Validating JSON responses against schemas.
Performing CRUD operations through API testing.
This framework offers an efficient and organized way to automate API testing, ensuring robustness, reliability, and faster delivery cycles in API-driven applications.
