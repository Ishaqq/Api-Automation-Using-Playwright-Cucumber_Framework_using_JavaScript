const report = require("multiple-cucumber-html-reporter");
const path = require("path");

report.generate({
  jsonDir: "reports", // Path where JSON reports are stored
  reportPath: "reports/html_report", // Output folder for the HTML report
  metadata: {
    browser: {
      name: "chrome",
      version: "latest",
    },
    device: "Local Test Machine",
    platform: {
      name: "Windows",
      version: "10",
    },
  },
  customData: {
    title: "Test Execution Report",
    data: [
      { label: "Project", value: "Ecommerce App" },
      { label: "Execution Date", value: new Date().toLocaleString() },
      { label: "Tester", value: "Muhammad Ishaq" },  // ✅ Fixed key "label"
      { label: "Environment", value: "Staging" },     // ✅ Add environment details
      { label: "Browser", value: "Chrome" },         // ✅ Add browser details
      { label: "Platform", value: process.platform }
    ],
  },
  displayDuration: true,
  openReportInBrowser: true, // Opens report automatically after generation
  screenshotsDirectory: path.join(__dirname, "reports/screenshots"), // Ensure correct screenshot path
});
