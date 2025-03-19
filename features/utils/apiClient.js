const { request } = require("@playwright/test");
require("dotenv").config();

class APIClient {
    constructor() {
        this.apiContext = null;
        this.baseUrl = process.env.BASE_URL;
    }

    async init() {
        this.apiContext = await request.newContext();
    }

    async get(endpoint, headers = {}) {
        const response = await this.apiContext.get(`${this.baseUrl}${endpoint}`, {
            headers,
        });
        return response;
    }

    async post(endpoint, data, headers = {}) {
        const response = await this.apiContext.post(`${this.baseUrl}${endpoint}`, {
            //  data,
            data: JSON.stringify(data),
            headers: { "Content-Type": "application/json", ...headers },
        });
        return response;
    }

    // Adding PUT method
    async put(endpoint, data, headers = {}) {
        const response = await this.apiContext.put(`${this.baseUrl}${endpoint}`, {
            data: JSON.stringify(data),
            headers: { "Content-Type": "application/json", ...headers },
        });
        return response;
    }

    // Adding PATCH method
    async patch(endpoint, data, headers = {}) {
        const response = await this.apiContext.patch(`${this.baseUrl}${endpoint}`, {
            data: JSON.stringify(data),
            headers: { "Content-Type": "application/json", ...headers },
        });
        return response;
    }

    // Adding DELETE method
    async delete(endpoint, headers = {}) {
        const response = await this.apiContext.delete(`${this.baseUrl}${endpoint}`, {
            headers,
        });
        return response;
    }
}

module.exports = new APIClient();
