const { BeforeAll, AfterAll, Before } = require("@cucumber/cucumber");
const apiClient = require("../utils/apiClient");

BeforeAll(async function () {
  await apiClient.init();
});

Before(async function () {
    await apiClient.init();
  });

AfterAll(async function () {
  console.log("Test Execution Completed");
});
