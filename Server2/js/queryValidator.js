const { SQL_CONFIG } = require('./config');

// Query Validator Class - Validates SQL queries for security
class QueryValidator {
    static validate(query) {
        const trimmedQuery = query.trim().toUpperCase();

        // Check for dangerous keywords
        for (let keyword of SQL_CONFIG.DANGEROUS_KEYWORDS) {
            if (trimmedQuery.includes(keyword)) {
                return false;
            }
        }

        // Check if query starts with allowed keywords
        const startsWithAllowed = SQL_CONFIG.ALLOWED_KEYWORDS.some(
            keyword => trimmedQuery.startsWith(keyword)
        );

        return startsWithAllowed;
    }
}

module.exports = QueryValidator;