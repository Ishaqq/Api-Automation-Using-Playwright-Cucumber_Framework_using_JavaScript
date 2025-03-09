

const { request } = require("@playwright/test");

class UserPage {
    constructor() {
        this.apiContext = null;
    }

    async init() {
        this.apiContext = await request.newContext({
            baseURL: "https://jsonplaceholder.typicode.com",
        });
    }

    async getUsers() {
        if (!this.apiContext) throw new Error("API context not initialized");
        return await this.apiContext.get("/users");
    }

    async createPost(postData) {
        if (!this.apiContext) throw new Error("API context not initialized");
        return await this.apiContext.post("/posts", { data: postData });
    }
}

module.exports = UserPage;
