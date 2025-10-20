// Application Initialization
class App {
    constructor() {

        this.languageManager = new LanguageManager();
        this.apiService = new APIService(CONFIG.API_BASE_URL);
        this.uiManager = null;
        this.controller = null;
    }

    async initialize() {
        try {
            console.log('Initializing app...');

            // Load language first
            console.log('Loading language...');
            await this.languageManager.loadLanguage('en');

            // Initialize UI Manager with language support
            console.log('Creating UI Manager...');
            this.uiManager = new UIManager(this.languageManager);

            // Update page text with translations
            console.log('Updating page text...');
            this.uiManager.updatePageText();

            // Show initial status message
            console.log('Showing initial status...');
            this.uiManager.showResponse('Application loaded successfully. Ready to interact with database.');

            // Initialize controller
            console.log('Creating controller...');
            this.controller = new PatientDatabaseController(
                this.apiService,
                this.uiManager,
                this.languageManager
            );

            console.log('App initialization complete!');
        } catch (error) {
            console.error('App initialization failed:', error);
            // Try to show error in UI if possible
            const responseDiv = document.getElementById('response');
            if (responseDiv) {
                responseDiv.textContent = 'Initialization Error: ' + error.message;
                responseDiv.style.display = 'block';
                responseDiv.style.backgroundColor = '#ffebee';
                responseDiv.style.borderLeftColor = '#f44336';
            }
        }
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', async () => {

    const app = new App();

    await app.initialize();
});