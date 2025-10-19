const { CONFIG, MESSAGES } = require('./config');
const QueryValidator = require('./queryValidator');

// Request Handler Class - Processes HTTP requests and responses
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

module.exports = RequestHandler;