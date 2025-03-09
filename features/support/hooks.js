const { Before, After, setWorldConstructor } = require('@cucumber/cucumber');
const { request } = require('@playwright/test');
const UserPage = require('../pages/userPage');

// Set up custom world constructor
setWorldConstructor(function () {
    this.userPage = new UserPage();
    this.apiContext = null;
});

Before(async function () {
    // Initialize API context before each scenario
    this.apiContext = await request.newContext({
        baseURL: "https://jsonplaceholder.typicode.com",
    });
    this.userPage.apiContext = this.apiContext; // Pass the apiContext to UserPage
});


After(async function () {
    if (this.response && this.response.json) {
        console.log(this.response);
        try {
            const responseBody = await this.response.json();
            console.log("Response Body:", responseBody); // Debugging

            if (!responseBody.userId) {
                console.warn("⚠️ Warning: userId is missing or null in response!");
            }
        } catch (error) {
            console.error("❌ Error parsing response JSON:", error);
        }
    } else {
        console.warn("⚠️ Warning: this.response is undefined or not a valid response object.");
    }
    if (this.apiContext) {
        await this.apiContext.dispose();
    }
});
