const reporter = require("cucumber-html-reporter");

const options = {
  theme: "bootstrap",
  jsonFile: "reports/cucumber_report.json",
  output: "reports/cucumber_report.html",
  reportSuiteAsScenarios: true,
  launchReport: false,
  metadata: {
    "Project": "Ecommerce App",
    "Execution Date": new Date().toLocaleString(),
    "Tester": "Muhammad Ishaq",
    "Environment": "Staging",
    "Browser": "Chrome",
    "Platform": process.platform
  }
};

reporter.generate(options);
console.log("✅ Cucumber HTML report generated successfully!");
