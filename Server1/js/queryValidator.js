// Query Validator Class
class QueryValidator {
    
    static validate(query) {

        const trimmedQuery = query.trim().toUpperCase();
        return trimmedQuery.startsWith('SELECT') || trimmedQuery.startsWith('INSERT');
    }

    static getQueryType(query) {

        const trimmedQuery = query.trim().toUpperCase();

        if (trimmedQuery.startsWith('SELECT')) {
            return 'GET';
        } else if (trimmedQuery.startsWith('INSERT')) {
            return 'POST';
        }
        return null;
    }
}