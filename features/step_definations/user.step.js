const { Given, Then } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");
const UserPage = require("../pages/userPage");
const userSchema = require("../schemas/userSchema");
const postSchema = require("../schemas/postSchema");
const Ajv = require("ajv");
const ajv = new Ajv();

let userPage;
let response;
let requestData;

Given('I send a GET request to {string}', async function (endpoint) {
    const response = await this.userPage.getUsers();
    this.response = response;
});

Then('the response status should be {int}', async function (statusCode) {
    expect(this.response.status()).toBe(statusCode);
});

Then('the response should match the user schema', async function () {
    const responseBody = await this.response.json();
    console.log("Response Body:", responseBody);

    const validate = ajv.compile(userSchema);
    const isValid = validate(responseBody);

    if (!isValid) {
        console.error("Schema validation errors:", validate.errors);
    }

    expect(isValid).toBeTruthy();
});

// Then("the response should match the user schema", async () => {
//     const users = await response.json();
//     console.log("Return Response " + users);
//     const validate = ajv.compile(userSchema);

//     for (const user of users) {
//         const valid = validate(user);
//         expect(valid).toBe(true);
//         console.log("User Id " + user.id);
//     }
// });

Given('I send a POST request to {string} with the following data:', async function (endpoint, dataTable) {
    const requestData = dataTable.hashes(); // Converts to an array of objects
    console.log("Parsed Data:", requestData);

    const response = await this.userPage.createPost(requestData[0]); // Use first object
    this.response = response;
    // const requestData = {
    //     title: data.title,
    //     body: data.body,
    //     userId: parseInt(data.userId),
    // };
 //   this.response = await this.userPage.createPost(requestData);
});

Then('the response should contain the same data', async function () {
    if (!this.response) {
        throw new Error("Response is undefined");
    }
    
    const responseBody = await this.response.json(); // Ensure response exists before calling json()
    console.log("Get Response Body:", responseBody);

    expect(responseBody).toBeDefined();
    expect(responseBody.title).toBeDefined(); // Ensure title exists
    expect(responseBody.body).toBeDefined();
    expect(responseBody.userId).toBeDefined();

   //schema validation
      //  const responseBody = await this.response.json();
        console.log("Response Body:", responseBody);
    
        const validate = ajv.compile(postSchema);
        const isValid = validate(responseBody);
    
        if (!isValid) {
            console.error("Schema validation errors:", validate.errors);
        }
    
        expect(isValid).toBeTruthy();
});
