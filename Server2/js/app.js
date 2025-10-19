// Application Entry Point - Initializes and starts the Patient API Server
const { CONFIG } = require('./config');
const DatabaseManager = require('./databaseManager');
const PatientAPIServer = require('./patientAPIServer');

// Initialize and start the application
const dbManager = new DatabaseManager(CONFIG);
const apiServer = new PatientAPIServer(CONFIG, dbManager);
apiServer.start();