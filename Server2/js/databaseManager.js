const { DatabaseSync } = require('node:sqlite');
const { CONFIG, MESSAGES, SQL_CONFIG } = require('./config');

// Database Manager Class - Handles all SQLite database operations
class DatabaseManager {
    constructor(config) {
        this.db = new DatabaseSync(config.DB_PATH);
    }

    async initialize() {
        try {
            // Create the patient table if it doesn't exist
            this.db.exec(SQL_CONFIG.CREATE_TABLE);
            console.log(MESSAGES.TABLE_CREATED);
        } catch (error) {
            console.error(MESSAGES.DB_ERROR, error);
            throw error;
        }
    }

    async executeQuery(query) {
        try {
            const trimmedQuery = query.trim().toUpperCase();

            if (trimmedQuery.startsWith('SELECT')) {
                // For SELECT queries, return all rows
                const stmt = this.db.prepare(query);
                const results = stmt.all();
                return { success: true, data: results };
            } else if (trimmedQuery.startsWith('INSERT')) {
                // For INSERT queries, execute and return info
                const stmt = this.db.prepare(query);
                const result = stmt.run();
                return {
                    success: true,
                    data: {
                        insertId: result.lastInsertRowid,
                        affectedRows: result.changes
                    }
                };
            } else {
                return { success: false, error: 'Unsupported query type' };
            }
        } catch (error) {
            return { success: false, error: error.message };
        }
    }
}

module.exports = DatabaseManager;