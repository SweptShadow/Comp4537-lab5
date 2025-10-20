// Config strings at the top
const CONFIG = {
    // LOCAL DEPLOYMENT (for testing locally)
    // PORT: 3000,
    // DB_PATH: './patient_database.db',
    // ALLOWED_ORIGIN: '*',

    // PRODUCTION DEPLOYMENT (for deploying to server), frontend url
    PORT: process.env.PORT || 3000,
    DB_PATH: './patient_database.db',
    ALLOWED_ORIGIN: 'https://comp4537lab5s7frontend.netlify.app',
};

const MESSAGES = {

    SERVER_START: `Server running on port ${CONFIG.PORT}`,
    DB_CONNECTED: 'Database connected successfully',
    DB_ERROR: 'Database connection error',
    TABLE_CREATED: 'Patient table created or already exists',
    INVALID_QUERY: 'Only SELECT and INSERT queries are allowed',
    QUERY_SUCCESS: 'Query executed successfully',
    QUERY_ERROR: 'Query execution error',
    METHOD_NOT_ALLOWED: 'Method not allowed',
    NOT_FOUND: 'Not found'
};

const SQL_CONFIG = {

    CREATE_TABLE: `
        CREATE TABLE IF NOT EXISTS patient (
            patient_id INTEGER PRIMARY KEY AUTOINCREMENT,
            first_name TEXT NOT NULL,
            last_name TEXT NOT NULL,
            date_of_birth DATE NOT NULL,
            gender TEXT CHECK(gender IN ('Male', 'Female', 'Other')) NOT NULL,
            email TEXT,
            phone TEXT,
            address TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );
    `,
    DANGEROUS_KEYWORDS: ['DROP', 'DELETE', 'UPDATE', 'ALTER', 'TRUNCATE', 'CREATE', 'GRANT', 'REVOKE'],
    ALLOWED_KEYWORDS: ['SELECT', 'INSERT']
};

module.exports = { CONFIG, MESSAGES, SQL_CONFIG };