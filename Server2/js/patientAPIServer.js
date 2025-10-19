const http = require('http');
const url = require('url');
const { MESSAGES } = require('./config');
const RequestHandler = require('./requestHandler');

// Server Class - Main API server that handles routing and server lifecycle
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

module.exports = PatientAPIServer;