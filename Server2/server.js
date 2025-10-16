// Attribution: Parts of this code structure were developed with assistance from ChatGPT
// for database connection setup and CORS handling

const http = require('http');
const url = require('url');
const mysql = require('mysql2/promise');

// Configuration strings at the top
const CONFIG = {
    PORT: 3000,
    DB_HOST: 'localhost',
    DB_USER: 'root',      // ← CHANGE THIS
    DB_PASSWORD: 'joey44',  // ← CHANGE THIS
    DB_NAME: 'patient_db',
    ALLOWED_ORIGIN: '*'
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
      patient_id INT AUTO_INCREMENT PRIMARY KEY,
      first_name VARCHAR(50) NOT NULL,
      last_name VARCHAR(50) NOT NULL,
      date_of_birth DATE NOT NULL,
      gender ENUM('Male', 'Female', 'Other') NOT NULL,
      email VARCHAR(100),
      phone VARCHAR(20),
      address TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB;
  `,
  DANGEROUS_KEYWORDS: ['DROP', 'DELETE', 'UPDATE', 'ALTER', 'TRUNCATE', 'CREATE', 'GRANT', 'REVOKE'],
  ALLOWED_KEYWORDS: ['SELECT', 'INSERT']
};

// Database Manager Class
class DatabaseManager {
  constructor(config) {
    this.pool = mysql.createPool({
      host: config.DB_HOST,
      user: config.DB_USER,
      password: config.DB_PASSWORD,
      database: config.DB_NAME,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    });
  }

  async initialize() {
    try {
      const connection = await this.pool.getConnection();
      await connection.query(SQL_CONFIG.CREATE_TABLE);
      console.log(MESSAGES.TABLE_CREATED);
      connection.release();
    } catch (error) {
      console.error(MESSAGES.DB_ERROR, error);
      throw error;
    }
  }

  async executeQuery(query) {
    try {
      const connection = await this.pool.getConnection();
      const [results] = await connection.query(query);
      connection.release();
      return { success: true, data: results };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}

// Query Validator Class
class QueryValidator {
  static validate(query) {
    const trimmedQuery = query.trim().toUpperCase();

    for (let keyword of SQL_CONFIG.DANGEROUS_KEYWORDS) {
      if (trimmedQuery.includes(keyword)) {
        return false;
      }
    }

    const startsWithAllowed = SQL_CONFIG.ALLOWED_KEYWORDS.some(
      keyword => trimmedQuery.startsWith(keyword)
    );

    return startsWithAllowed;
  }
}

// Request Handler Class
class RequestHandler {
  constructor(dbManager) {
    this.dbManager = dbManager;
  }

  parsePostBody(req) {
    return new Promise((resolve, reject) => {
      let body = '';
      req.on('data', chunk => {
        body += chunk.toString();
      });
      req.on('end', () => {
        try {
          resolve(JSON.parse(body));
        } catch (error) {
          resolve({ query: body });
        }
      });
      req.on('error', reject);
    });
  }

  setCorsHeaders(res) {
    res.setHeader('Access-Control-Allow-Origin', CONFIG.ALLOWED_ORIGIN);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  }

  sendJsonResponse(res, statusCode, data) {
    res.writeHead(statusCode, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(data));
  }

  async handleGetRequest(res, sqlQuery) {
    if (!QueryValidator.validate(sqlQuery)) {
      this.sendJsonResponse(res, 403, { error: MESSAGES.INVALID_QUERY });
      return;
    }

    const result = await this.dbManager.executeQuery(sqlQuery);

    if (result.success) {
      this.sendJsonResponse(res, 200, { success: true, data: result.data });
    } else {
      this.sendJsonResponse(res, 400, { success: false, error: result.error });
    }
  }

  async handlePostRequest(req, res) {
    const body = await this.parsePostBody(req);
    const sqlQuery = body.query || body;

    if (!QueryValidator.validate(sqlQuery)) {
      this.sendJsonResponse(res, 403, { error: MESSAGES.INVALID_QUERY });
      return;
    }

    const result = await this.dbManager.executeQuery(sqlQuery);

    if (result.success) {
      this.sendJsonResponse(res, 200, {
        success: true,
        data: result.data,
        message: MESSAGES.QUERY_SUCCESS
      });
    } else {
      this.sendJsonResponse(res, 400, { success: false, error: result.error });
    }
  }

  handleOptionsRequest(res) {
    res.writeHead(200);
    res.end();
  }
}

// Server Class
class PatientAPIServer {
  constructor(config, dbManager) {
    this.config = config;
    this.dbManager = dbManager;
    this.requestHandler = new RequestHandler(dbManager);
    this.server = null;
  }

  async handleRequest(req, res) {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;

    this.requestHandler.setCorsHeaders(res);

    if (req.method === 'OPTIONS') {
      this.requestHandler.handleOptionsRequest(res);
      return;
    }

    if (pathname.startsWith('/api/v1/sql')) {
      if (req.method === 'GET') {
        const queryPath = pathname.substring('/api/v1/sql/'.length);
        const sqlQuery = decodeURIComponent(queryPath);
        await this.requestHandler.handleGetRequest(res, sqlQuery);
      } else if (req.method === 'POST') {
        await this.requestHandler.handlePostRequest(req, res);
      } else {
        this.requestHandler.sendJsonResponse(res, 405, {
          error: MESSAGES.METHOD_NOT_ALLOWED
        });
      }
    } else {
      this.requestHandler.sendJsonResponse(res, 404, {
        error: MESSAGES.NOT_FOUND
      });
    }
  }

  async start() {
    try {
      await this.dbManager.initialize();

      this.server = http.createServer((req, res) => {
        this.handleRequest(req, res);
      });

      this.server.listen(this.config.PORT, () => {
        console.log(MESSAGES.SERVER_START);
      });
    } catch (error) {
      console.error('Failed to start server:', error);
      process.exit(1);
    }
  }
}

// Initialize and start the application
const dbManager = new DatabaseManager(CONFIG);
const apiServer = new PatientAPIServer(CONFIG, dbManager);
apiServer.start();