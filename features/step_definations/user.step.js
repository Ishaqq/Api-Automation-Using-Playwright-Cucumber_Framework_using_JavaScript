const { Given, Then } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");
const UserPage = require("../pages/userPage");
const userSchema = require("../schemas/userSchema");
const Ajv = require("ajv");
const ajv = new Ajv();

let userPage;
let response;
let requestData;

Given("I send a GET request to {string}", async (endpoint) => {
    userPage = new UserPage();
    await userPage.init(); // Ensure API context is initialized
    response = await userPage.getUsers();
});

Then("the response status should be {int}", async (statusCode) => {
    expect(response.status()).toBe(statusCode);
});

Then("the response should match the user schema", async () => {
    const users = await response.json();
    const validate = ajv.compile(userSchema);

    for (const user of users) {
        const valid = validate(user);
        expect(valid).toBe(true);
        console.log("User Id " + user.id);
    }
});

Given("I send a POST request to {string} with the following data:", async (endpoint, dataTable) => {
    userPage = new UserPage();
    await userPage.init(); // Ensure API context is initialized

    const data = dataTable.hashes()[0]; // Use hashes() for multi-column tables
    
    requestData = {
        title: data.title,
        body: data.body,
        userId: parseInt(data.userId),
    };
    
    response = await userPage.createPost(requestData);
});

Then("the response should contain the same data", async () => {
    const responseBody = await response.json();

    console.log("Response Body:", responseBody); // Debugging

    expect(responseBody.id).toBeDefined(); // ID should always be present
    expect(responseBody.title).toBe(requestData.title);
    expect(responseBody.body).toBe(requestData.body);
    console.log("This is response Id "+responseBody.id);

    // if (responseBody.userId !== null && responseBody.userId !== undefined) {
    //     expect(responseBody.userId).toBe(requestData.id);
    // } else {
    //     console.warn("⚠️ Warning: userId is missing in response, skipping validation.");
    // }
});
