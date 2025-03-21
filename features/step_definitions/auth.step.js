const { Given, Then, Before } = require("@cucumber/cucumber");
const { expect } = require("chai");
const apiClient = require("../utils/apiClient");
const Ajv = require("ajv");
const userSchema = require("../schemas/userSchema.js");
const fs = require("fs");
const path = require("path");

let response, responseBody, authToken;

// Before(async function () {
//   await apiClient.init();
// });

Given("I send a POST request to {string} with the following data:", async function (endpoint, dataTable) {
  const jsonFilePath="payloads/login.json"

  const fullPath = path.join(__dirname, "../", jsonFilePath);
  const payload = JSON.parse(fs.readFileSync(fullPath, "utf-8"));
  const headers = {
    "Content-Type": "application/json",
    "Custom-Header": "your-header-value", // Example custom header
  };
    
  // const requestData = dataTable.hashes(); // Converts to an array of objects
  //   console.log("Parsed Data:", requestData);

  //response = await apiClient.post(endpoint, requestData[0]);
  response = await apiClient.post(endpoint, payload, headers);
  responseBody = await response.json();
  
  console.log("Response Status:", response.status());
  console.log("Response Body:", responseBody);  // Debugging

  expect(response.status()).to.equal(200);
});

Then("the response status should be {int}", function (expectedStatus) {
  expect(response.status()).to.equal(expectedStatus);
});

Then("I store the access token", function () {
  authToken = responseBody.token;
  console.log("Stored Token:", authToken); 

});

Given("I send a GET request to {string} with the stored token", async function (endpoint) {
  response = await apiClient.get(endpoint, {
    Authorization: `Bearer ${authToken}`,
  });
  responseBody = await response.json();
  console.log(responseBody);

  //
// Access page and per_page
const page = responseBody.page;
const perPage = responseBody.per_page;

// Access data (first user)
const firstUser = responseBody.data[0]; // First user object
const firstUserId = firstUser.id;
const firstUserEmail = firstUser.email;
const firstUserName = firstUser.first_name;
const firstUserAvatar = firstUser.avatar;

// Access support section
const supportUrl = responseBody.support.url;
const supportText = responseBody.support.text;

// Example output
console.log("Page:", page);
console.log("Per Page:", perPage);
console.log("First User ID:", firstUserId);
console.log("First User Email:", firstUserEmail);
console.log("Support URL:", supportUrl);
expect(supportUrl).to.equal('https://contentcaddy.io?utm_source=reqres&utm_medium=json&utm_campaign=referral');

});

Then("the response should contain a list of users", function () {
  expect(responseBody.data).to.be.an("array");

  //validating schema
  
  const ajv = new Ajv();
  ajv.addFormat('uri', {
    type: 'string',
    validate: function (data) {
      // Simple regex for URL validation
      const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
      return urlPattern.test(data);
    },
  });
const validate = ajv.compile(userSchema);
  const valid = validate(responseBody);
  this.attach(JSON.stringify(responseBody, null, 2), "application/json");
 // this.attach(`Status Code: ${statusCode}`, "text/plain");
expect(valid, `Data is invalid: ${JSON.stringify(validate.errors)}`).to.be.true;
if (valid) {
  console.log("Data is valid");
} else {
  console.log("Data is invalid", validate.errors);
}
});

Given("I send a POST request to {string} with headers and the following data:", async function (endpoint, dataTable) {
  //const data = dataTable.rowsHash();
  const requestData = {};
dataTable.raw().forEach((row, index) => {
    if (index > 0) { // Skipping the header row
        requestData[row[0]] = row[1]; 
    }
});
  response = await apiClient.post(endpoint, requestData, {
    Authorization: `Bearer ${authToken}`,
  });
  responseBody = await response.json();
});

Then("the response should contain the same post data", function () {
  expect(responseBody.title).to.equal("New API Post");
  expect(responseBody.body).to.equal("Sample Content");
  this.attach(`Status Code: ${authToken}`, "text/plain");
  // expect(responseBody.userId).to.equal(2);
});
