const User = require('./User');
const Support = require('./Support');

class UserResponse {
    constructor(page, perPage, total, totalPages, data, support) {
        this.page = page;
        this.perPage = perPage;
        this.total = total;
        this.totalPages = totalPages;
        this.data = data; // Array of User instances
        this.support = support; // Support instance
    }
}

module.exports = UserResponse;
