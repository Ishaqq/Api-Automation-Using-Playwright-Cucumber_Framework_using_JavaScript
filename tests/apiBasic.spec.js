const { test, expect, request } = require('@playwright/test');
const Ajv = require("ajv");
const userSchema = require("./userSchema");

const ajv = new Ajv({ strict: false }); // JSON schema validator
const validate = ajv.compile(userSchema); // Compile schema

test.describe('API Testing with Playwright', () => {
    let apiContext;

    test.beforeAll(async () => {
        apiContext = await request.newContext({
            baseURL: 'https://jsonplaceholder.typicode.com',
        });
    });

    test('GET Request - Validate Schema', async () => {
        const response = await apiContext.get('/users');
        expect(response.status()).toBe(200);

        const users = await response.json();
        expect(users.length).toBeGreaterThan(0);

        users.forEach(user => {
            const valid = validate(user);
            expect(valid).toBe(true);
        });
    });

    test('POST Request - Create a New Post', async () => {
        const newPost = {
            title: 'Playwright API Test',
            body: 'This is a sample post.',
            userId: 1
        };

        const response = await apiContext.post('/posts', { data: newPost });
        expect(response.status()).toBe(201);

        const responseBody = await response.json();
        expect(responseBody.title).toBe(newPost.title);
        expect(responseBody.body).toBe(newPost.body);
        expect(responseBody.userId).toBe(newPost.userId);
        console.log(responseBody.title);
    });
});
