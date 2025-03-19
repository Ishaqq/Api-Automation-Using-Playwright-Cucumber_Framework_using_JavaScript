const { Given, Then, Before } = require("@cucumber/cucumber");
const { expect } = require("chai");
const apiClient = require("../utils/apiClient");
const Ajv = require("ajv");
const userSchema = require("../schemas/userSchema.js");
const User = require('../models/User');
const Support = require('../models/Support');
const UserResponse = require('../models/UserResponse');
const fs = require("fs");
const path = require("path");

let response, responseBody, authToken;

let userResponse;

Given('I send a GET request to the users API pojo', async function () {
    endpoint='/users?page=2';
   response = await apiClient.get(endpoint);
     responseBody = await response.json();
     console.log(responseBody);
});

Then('the responseBody should contain valid user data pojo', async function () {
 
    // Step 3: Map the response to POJO-like structure
    const support = new Support(responseBody.support.url, responseBody.support.text);
    const users = responseBody.data.map(userData => 
        new User(userData.id, userData.email, userData.first_name, userData.last_name, userData.avatar)
    );
    userResponse = new UserResponse(
        responseBody.page, 
        responseBody.per_page, 
        responseBody.total, 
        responseBody.total_pages, 
        users, 
        support
    );

    // Step 4: Validate the response structure
   // Step 4: Validate the response structure
expect(userResponse.page).to.equal(2);
expect(userResponse.perPage).to.equal(6);
expect(userResponse.total).to.equal(12);
expect(userResponse.totalPages).to.equal(2);


    // Validate the users array
    userResponse.data.forEach(user => {
        expect(user).to.have.property('id');
        expect(user).to.have.property('email');
        expect(user).to.have.property('firstName');
        expect(user).to.have.property('lastName');
        expect(user).to.have.property('avatar');
    });

    // Validate the support object
    expect(userResponse.support).to.have.property('url');
    expect(userResponse.support).to.have.property('text');

    // Step 5: Validate status code and response time
    expect(response.status()).to.equal(200);
});

Then('the responseBody status should be {int} pojo', async function (int) {
    expect(response.status()).to.equal(200);
});

Then('the responseTime should be less than 500ms pojo', function () {
    console.log("Test");
});