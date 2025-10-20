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

            // Insert sample data for deliverable 2.2 requirement
            await this.insertSampleDataIfEmpty();
        } catch (error) {
            console.error(MESSAGES.DB_ERROR, error);
            throw error;
        }
    }

    async insertSampleDataIfEmpty() {
        try {
            // Check if table is empty
            const countStmt = this.db.prepare('SELECT COUNT(*) as count FROM patient');
            const result = countStmt.get();

            if (result.count === 0) {
                console.log('Inserting sample patients for deliverable 2.2...');

                // Insert the 4 required sample patients
                const insertStmt = this.db.prepare(`
                    INSERT INTO patient (first_name, last_name, date_of_birth, gender, email, phone, address) 
                    VALUES (?, ?, ?, ?, ?, ?, ?)
                `);

                const samplePatients = [
                    ['Sara', 'Brown', '1981-01-01', 'Female', 'sara.brown@email.com', '555-0201', '123 Oak St, City, State'],
                    ['John', 'Smith', '1941-01-01', 'Male', 'john.smith@email.com', '555-0202', '456 Pine Ave, City, State'],
                    ['Jack', 'Ma', '1961-01-30', 'Male', 'jack.ma@email.com', '555-0203', '789 Cedar Rd, City, State'],
                    ['Elon', 'Musk', '1999-01-01', 'Male', 'elon.musk@email.com', '555-0204', '321 Elm Dr, City, State']
                ];

                for (let patient of samplePatients) {
                    insertStmt.run(...patient);
                }

                console.log('Sample patients inserted successfully');
            }
        } catch (error) {
            console.error('Error inserting sample data:', error);
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