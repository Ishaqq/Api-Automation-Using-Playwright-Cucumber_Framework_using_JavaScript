const postSchema = {
    type: "object",
    properties: {
        title: { type: "string" },
        body: { type: "string" },
        userId: { 
            oneOf: [
                { type: "integer" },
                { type: "string", pattern: "^[0-9]+$" } // Allows numeric strings like "1"
            ]
        },
        id: { type: "integer" }
    },
    required: ["title", "body", "userId", "id"]
};

module.exports = postSchema;