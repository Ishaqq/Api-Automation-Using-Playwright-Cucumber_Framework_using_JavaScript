

class UserPage {
    constructor() {
        this.apiContext = null; // API context will be injected from hooks.js
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
