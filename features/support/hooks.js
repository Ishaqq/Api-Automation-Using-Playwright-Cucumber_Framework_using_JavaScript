const { Before, After } = require('@cucumber/cucumber');

Before(async function () {
    console.log('Starting test...');
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
});
